const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

function read(relative) {
  const full = path.join(root, relative);

  if (!fs.existsSync(full)) {
    console.error(`Eksik dosya: ${relative}`);
    process.exit(1);
  }

  return fs.readFileSync(full, "utf8");
}

const service = read("src/lib/content/supabase-content-server.ts");
const topicsRoute = read("src/app/(main)/topics/page.tsx");
const topicDetailRoute = read("src/app/(main)/topics/[slug]/page.tsx");
const flashcardsPage = read("src/features/flashcards/components/FlashcardsPage.tsx");
const timelineRoute = read("src/app/(main)/timeline/page.tsx");
const questionBankPage = read("src/features/question-bank/components/QuestionBankPage.tsx");
const topicQuestionPage = read("src/features/question-bank/components/TopicQuestionPage.tsx");

const checks = [
  {
    label: "Server content service topics/flashcards/timeline/questions okuyor",
    ok:
      service.includes("fetchContentTopics") &&
      service.includes("fetchContentFlashcards") &&
      service.includes("fetchContentTimelineEvents") &&
      service.includes("fetchContentQuestionsForTest")
  },
  {
    label: "Topics route Supabase'den okuyor",
    ok: topicsRoute.includes("fetchContentTopics")
  },
  {
    label: "Topic detail route Supabase'den okuyor",
    ok: topicDetailRoute.includes("fetchContentTopicBySlug")
  },
  {
    label: "Flashcards page Supabase'den okuyor",
    ok: flashcardsPage.includes("fetchContentFlashcards")
  },
  {
    label: "Timeline route Supabase'den okuyor",
    ok: timelineRoute.includes("fetchContentTimelineEvents")
  },
  {
    label: "Question bank list Supabase topics kullanıyor",
    ok: questionBankPage.includes("fetchContentTopics")
  },
  {
    label: "Test ekranı sadece test sorularını Supabase'den çekiyor",
    ok: topicQuestionPage.includes("fetchContentQuestionsForTest")
  },
  {
    label: "Local fallback korunuyor",
    ok:
      topicsRoute.includes("fallbackTopics") &&
      flashcardsPage.includes("fallbackFlashcards") &&
      timelineRoute.includes("fallbackEvents")
  }
];

let failed = 0;

console.log("Full Supabase content turbo read denetimi");
console.log("========================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\n✓ İçerik okuma tarafı Supabase'e bağlandı.");
