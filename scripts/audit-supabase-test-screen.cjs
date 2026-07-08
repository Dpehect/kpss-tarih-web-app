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

const lightweight = read("src/data/lightweight-question-tests.ts");
const service = read("src/lib/content/content-service.server.ts");
const topicPage = read("src/features/question-bank/components/TopicQuestionPage.tsx");
const bankPage = read("src/features/question-bank/components/QuestionBankPage.tsx");
const route = read("src/app/(main)/question-bank/[topicId]/page.tsx");

const checks = [
  {
    label: "Hafif test index'i var",
    ok: lightweight.includes("buildTopicTests") && !lightweight.includes("buildQuestionTests")
  },
  {
    label: "Server Supabase soru fetch servisi var",
    ok: service.includes("fetchQuestionsForTestFromSupabase") && service.includes("content_questions")
  },
  {
    label: "Test açılınca Supabase'den soru çekiliyor",
    ok: topicPage.includes("fetchQuestionsForTestFromSupabase(selectedTest.id)")
  },
  {
    label: "Supabase başarısızsa local fallback var",
    ok: topicPage.includes('await import("@/data/generated-30-question-tests")')
  },
  {
    label: "QuestionBankPage ağır generated soru bankasını import etmiyor",
    ok: !bankPage.includes("@/data/generated-30-question-tests") && bankPage.includes("@/data/lightweight-question-tests")
  },
  {
    label: "Route hafif test index'ini kullanıyor",
    ok: !route.includes("@/data/generated-30-question-tests") && route.includes("@/data/lightweight-question-tests")
  }
];

console.log("Supabase test ekranı denetimi");
console.log("=============================");

let failed = 0;

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("");
console.log("✓ Test ekranı Supabase 30 soru moduna hazır.");
