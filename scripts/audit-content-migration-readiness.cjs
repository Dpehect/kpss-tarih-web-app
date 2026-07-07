const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

const checks = [
  {
    label: "Supabase content schema var",
    path: "supabase/content-schema.sql"
  },
  {
    label: "Content service var",
    path: "src/lib/content/content-service.ts"
  },
  {
    label: "Export script var",
    path: "scripts/export-content-json-for-supabase.cjs"
  }
];

let failed = 0;

console.log("Supabase content migration readiness");
console.log("====================================");

for (const check of checks) {
  const exists = fs.existsSync(path.join(root, check.path));
  console.log(`${exists ? "✓" : "✗"} ${check.label}`);
  if (!exists) failed += 1;
}

const service = fs.existsSync(path.join(root, "src/lib/content/content-service.ts"))
  ? fs.readFileSync(path.join(root, "src/lib/content/content-service.ts"), "utf8")
  : "";

for (const token of [
  "fetchTopicsFromSupabase",
  "fetchQuestionsForTestFromSupabase",
  "fetchFlashcardsForTopicFromSupabase"
]) {
  const ok = service.includes(token);
  console.log(`${ok ? "✓" : "✗"} ${token}`);
  if (!ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\n✓ Supabase içerik geçiş altyapısı hazır.");
