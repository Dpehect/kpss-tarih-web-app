const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");

const root = process.cwd();

let ts;
try {
  ts = require("typescript");
} catch {
  console.error("TypeScript paketi bulunamadı. Önce npm install çalıştır.");
  process.exit(1);
}

const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function patchedResolve(request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    const mapped = path.join(root, "src", request.slice(2));
    const candidates = [
      mapped,
      `${mapped}.ts`,
      `${mapped}.tsx`,
      path.join(mapped, "index.ts"),
      path.join(mapped, "index.tsx")
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) return candidate;
    }
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};

require.extensions[".ts"] = function compileTs(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      skipLibCheck: true
    },
    fileName: filename
  }).outputText;

  module._compile(output, filename);
};

require.extensions[".tsx"] = require.extensions[".ts"];

const history = require(path.join(root, "src/data/kpss-history.ts"));
const generatedTests = require(path.join(root, "src/data/generated-30-question-tests.ts"));

let expandedFlashcards = [];
try {
  expandedFlashcards = require(path.join(root, "src/data/expanded-flashcards.ts")).expandedFlashcards ?? history.flashcards;
} catch {
  expandedFlashcards = history.flashcards;
}

const topics = history.topics ?? [];
const timelineEvents = history.timelineEvents ?? [];
const allQuestionTests = generatedTests.allQuestionTests ?? [];
const expandedQuestions = generatedTests.expandedQuestions ?? [];
const questionMap = new Map(expandedQuestions.map((question) => [question.id, question]));

const outDir = path.join(root, "supabase-export");
fs.mkdirSync(outDir, { recursive: true });

const topicRows = topics.map((topic, index) => ({
  id: topic.id,
  slug: topic.slug,
  title: topic.title,
  era: topic.era,
  short_description: topic.shortDescription,
  exam_importance: topic.examImportance,
  estimated_minutes: topic.estimatedMinutes,
  keywords: topic.keywords,
  summary: topic.summary,
  must_know: topic.mustKnow,
  common_mistakes: topic.commonMistakes,
  quick_timeline: topic.quickTimeline,
  sort_order: index,
  is_published: true
}));

const testRows = allQuestionTests.map((test) => ({
  id: test.id,
  topic_id: test.topicId,
  title: test.title,
  level: test.level,
  level_label: test.levelLabel,
  test_no: test.testNo,
  question_count: test.questionCount,
  is_published: true
})).filter((test) => test.topic_id !== "all");

const questionRows = [];
const choiceRows = [];

for (const test of allQuestionTests) {
  if (test.topicId === "all") continue;

  test.questionIds.forEach((questionId, index) => {
    const question = questionMap.get(questionId);
    if (!question) return;

    questionRows.push({
      id: question.id,
      topic_id: question.topicId,
      test_id: test.id,
      type: question.type,
      difficulty: question.difficulty,
      stem: question.stem,
      correct_choice_id: question.correctChoiceId,
      explanation: question.explanation,
      exam_tip: question.examTip,
      tags: question.tags,
      sort_order: index,
      is_published: true
    });

    question.choices.forEach((choice, choiceIndex) => {
      choiceRows.push({
        question_id: question.id,
        choice_id: choice.id,
        text: choice.text,
        sort_order: choiceIndex
      });
    });
  });
}

const flashcardRows = expandedFlashcards.map((card, index) => ({
  id: card.id,
  topic_id: card.topicId,
  front: card.front,
  back: card.back,
  hint: card.hint,
  tags: card.tags,
  sort_order: index,
  is_published: true
}));

const timelineRows = timelineEvents.map((event, index) => ({
  id: event.id,
  topic_id: event.topicId,
  date: event.date,
  title: event.title,
  description: event.description,
  tone: event.tone,
  sort_order: index,
  is_published: true
}));

const files = {
  "content_topics.json": topicRows,
  "content_tests.json": testRows,
  "content_questions.json": questionRows,
  "content_question_choices.json": choiceRows,
  "content_flashcards.json": flashcardRows,
  "content_timeline_events.json": timelineRows
};

for (const [filename, rows] of Object.entries(files)) {
  fs.writeFileSync(path.join(outDir, filename), JSON.stringify(rows, null, 2), "utf8");
  console.log(`${filename}: ${rows.length}`);
}

console.log("");
console.log(`Export tamamlandı: ${path.relative(root, outDir)}`);
console.log("Bu JSON dosyalarını Supabase Table Editor import veya script ile yükleyebilirsin.");
