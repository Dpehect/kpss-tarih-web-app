const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const file = path.join(root, "src/components/core/OnlineProgressHydrator.tsx");

if (!fs.existsSync(file)) {
  console.error("Eksik dosya: src/components/core/OnlineProgressHydrator.tsx");
  process.exit(1);
}

const source = fs.readFileSync(file, "utf8");

const checks = [
  {
    label: "progress-store importu kaldırıldı",
    ok: !source.includes("@/stores/progress-store") && !source.includes("useProgressStore")
  },
  {
    label: "Supabase client importu korunuyor",
    ok: source.includes("@/lib/supabase/client")
  },
  {
    label: "Login sonrası ağır sync yerine hafif session warmup var",
    ok: source.includes("warmupSession") && source.includes("getSession")
  },
  {
    label: "Session warmup timeout ile erteleniyor",
    ok: source.includes("window.setTimeout") && source.includes("900")
  }
];

let failed = 0;

console.log("OnlineProgressHydrator build fix denetimi");
console.log("=========================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\n✓ Missing store build hatası giderildi.");
