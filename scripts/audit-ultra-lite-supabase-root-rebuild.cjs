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

const forceScript = read("scripts/force-question-bank-20-tests.mjs");
const history = read("src/data/kpss-history.ts");
const generated = read("src/data/generated-30-question-tests.ts");
const service = read("src/lib/content/supabase-content-server.ts");
const appShell = read("src/components/core/AppShell.tsx");
const providers = read("src/app/providers.tsx");
const callback = read("src/app/auth/callback/route.ts");
const middleware = read("src/lib/supabase/middleware.ts");
const topicQuestion = read("src/features/question-bank/components/TopicQuestionPage.tsx");
const layout = read("src/app/layout.tsx");

const checks = [
  {
    label: "Build sırasında devasa local soru bankası üretilmiyor",
    ok: forceScript.includes("Ultra-lite mode") && !forceScript.includes("questionTypes")
  },
  {
    label: "kpss-history local fallback küçük",
    ok: history.includes("Ultra-lite local fallback") && history.includes("export const questions: Question[] = []")
  },
  {
    label: "generated-30-question-tests ağır soru üretmiyor",
    ok: generated.includes("expandedQuestions = []") && !generated.includes("expandedQuestions.push")
  },
  {
    label: "Supabase service topics/tests/questions/cards/timeline okuyor",
    ok:
      service.includes("fetchContentTopics") &&
      service.includes("fetchContentTestsForTopic") &&
      service.includes("fetchContentQuestionsForTest") &&
      service.includes("fetchContentFlashcards") &&
      service.includes("fetchContentTimelineEvents")
  },
  {
    label: "AppShell server/static ve hooksuz",
    ok: !appShell.includes('"use client"') && !appShell.includes("usePathname") && !appShell.includes("useState")
  },
  {
    label: "Providers global hydrator çalıştırmıyor",
    ok: !providers.includes("OnlineProgressHydrator") && !providers.includes("DeferredOnlineProgressHydrator")
  },
  {
    label: "Auth callback her zaman dashboard'a yönlendiriyor",
    ok: callback.includes('new URL("/dashboard"')
  },
  {
    label: "Middleware oturum varsa / ve /login için dashboard'a atıyor",
    ok: middleware.includes('pathname === "/"') && middleware.includes('url.pathname = "/dashboard"')
  },
  {
    label: "Konu testi sadece Supabase'den soru çekiyor",
    ok: topicQuestion.includes("fetchContentQuestionsForTest") && !topicQuestion.includes('import("@/data/generated-30-question-tests")')
  },
  {
    label: "Ultra lite CSS layout'a import edilmiş",
    ok: layout.includes('import "@/app/ultra-lite.css";')
  }
];

let failed = 0;
console.log("Ultra-lite Supabase root rebuild denetimi");
console.log("========================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\n✓ Ultra-lite Supabase root rebuild hazır.");
