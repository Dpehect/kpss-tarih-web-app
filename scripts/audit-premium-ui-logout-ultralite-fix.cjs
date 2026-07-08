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

const authStatus = read("src/features/auth/components/AuthStatusButton.tsx");
const appShell = read("src/components/core/AppShell.tsx");
const authPanel = read("src/features/auth/components/AuthPanel.tsx");
const dashboard = read("src/features/dashboard/components/DashboardPage.tsx");
const questionBank = read("src/features/question-bank/components/QuestionBankPage.tsx");
const topics = read("src/features/topics/components/TopicsPage.tsx");
const layout = read("src/app/layout.tsx");
const generated = read("src/data/generated-30-question-tests.ts");
const history = read("src/data/kpss-history.ts");

const checks = [
  {
    label: "Çıkış Yap butonu var",
    ok: authStatus.includes("Çıkış Yap") && authStatus.includes("supabase.auth.signOut")
  },
  {
    label: "AppShell tekrar premium görünüme sahip",
    ok: appShell.includes("backdrop-blur-xl") && appShell.includes("shadow-[18px_0_80px")
  },
  {
    label: "AppShell AuthStatusButton kullanıyor",
    ok: appShell.includes("AuthStatusButton")
  },
  {
    label: "Login ekranı premium tasarıma döndü",
    ok: authPanel.includes("Çalışma paneline hızlı giriş yap") && authPanel.includes("shadow-[0_28px_90px")
  },
  {
    label: "Dashboard premium kartlarla zenginleşti",
    ok: dashboard.includes("Komuta paneli") && dashboard.includes("ActionCard")
  },
  {
    label: "Question bank premium hero kullanıyor",
    ok: questionBank.includes("Soru bankası") && questionBank.includes("shadow-[0_28px_90px")
  },
  {
    label: "Topics premium kartlarla zenginleşti",
    ok: topics.includes("Konu atlası") && topics.includes("backdrop-blur-xl")
  },
  {
    label: "Premium CSS layout'a eklendi",
    ok: layout.includes('import "@/app/premium-ultralite-ui.css";')
  },
  {
    label: "Ağır local soru üretimi geri gelmedi",
    ok: generated.includes("expandedQuestions = []") && history.includes("Ultra-lite local fallback")
  }
];

let failed = 0;
console.log("Premium UI + logout ultra-lite denetimi");
console.log("======================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\n✓ Premium UI ve çıkış fix hazır.");
