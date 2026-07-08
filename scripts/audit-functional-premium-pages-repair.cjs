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

function hasNamedExport(source, name) {
  return new RegExp(`export\\s+(?:const|let|var|function|class|type|interface)\\s+${name}\\b`).test(source) ||
    new RegExp(`export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`, "s").test(source);
}

const examsPage = read("src/app/(main)/exams/page.tsx");
const examDetail = read("src/app/(main)/exams/[id]/page.tsx");
const examsComponent = read("src/features/exams/components/ExamsPage.tsx");
const examRunner = read("src/features/exams/components/ExamRunnerPage.tsx");
const service = read("src/lib/content/supabase-content-server.ts");
const questionRoute = read("src/app/(main)/question-bank/[topicId]/page.tsx");
const topicQuestion = read("src/features/question-bank/components/TopicQuestionPage.tsx");
const timeline = read("src/features/timeline/components/TimelinePage.tsx");
const flashcards = read("src/features/flashcards/components/FlashcardTrainer.tsx");
const layout = read("src/app/layout.tsx");
const historyData = read("src/data/kpss-history.ts");

const checks = [
  {
    label: "Denemeler sayfasi yeni calisan componenti kullaniyor",
    ok: examsPage.includes("ExamsPage") && examsComponent.includes("/exams/")
  },
  {
    label: "Deneme detay route'u var ve ExamRunnerPage kullaniyor",
    ok: examDetail.includes("ExamRunnerPage") && examRunner.includes("fetchContentExamQuestions")
  },
  {
    label: "Supabase service deneme sorusu cekebiliyor",
    ok: service.includes("fetchContentExamQuestions") && service.includes("range(offset")
  },
  {
    label: "Test route'u Supabase topic/test dogrulamasi yapiyor",
    ok: questionRoute.includes("fetchContentTopicById") && questionRoute.includes("fetchContentTestsForTopic")
  },
  {
    label: "Test kartlari tiklanabilir href iceriyor",
    ok: topicQuestion.includes("/question-bank/") && topicQuestion.includes("test.id")
  },
  {
    label: "Timeline zengin donemli gorunume alindi",
    ok: timeline.includes("Olayları dönemlere bağla") && timeline.includes("grouped.map")
  },
  {
    label: "Flashcard 'Biliyorum olarak kaydedildi' metni yok",
    ok: !flashcards.includes("Biliyorum olarak kaydedildi") && flashcards.includes("Biliyorum")
  },
  {
    label: "Functional premium CSS layout'a eklenmis",
    ok: layout.includes('import "@/app/functional-premium-fix.css";')
  },
  {
    label: "Build icin eksik data exportlari tamam",
    ok: hasNamedExport(historyData, "glossary") &&
      hasNamedExport(historyData, "getGlossaryByTopic") &&
      hasNamedExport(historyData, "recommendations")
  }
];

let failed = 0;
console.log("Functional premium pages repair denetimi");
console.log("========================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol basarisiz.`);
  process.exit(1);
}

console.log("\n✓ Deneme, test, timeline, flashcard ve build export repair hazir.");
