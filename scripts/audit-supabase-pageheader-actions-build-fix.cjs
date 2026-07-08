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

const hydrator = read("src/components/core/OnlineProgressHydrator.tsx");
const topicPage = read("src/features/question-bank/components/TopicQuestionPage.tsx");

const checks = [
  {
    label: "OnlineProgressHydrator hatalı store importu içermiyor",
    ok: !hydrator.includes("stores/progress") && !hydrator.includes("useProgress")
  },
  {
    label: "OnlineProgressHydrator hafif session warmup yapıyor",
    ok: hydrator.includes("warmupSession") && hydrator.includes("getSession")
  },
  {
    label: "TopicQuestionPage PageHeader için actions prop kullanıyor",
    ok: topicPage.includes("actions={") && !topicPage.includes("action={")
  },
  {
    label: "Supabase terminal logu korunuyor",
    ok: topicPage.includes("Supabase’den parça parça yükleniyor")
  }
];

let failed = 0;

console.log("Supabase PageHeader actions build fix denetimi");
console.log("==============================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\n✓ Build fix kontrolleri geçti.");
