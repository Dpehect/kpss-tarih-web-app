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

const providers = read("src/app/providers.tsx");
const idleHydrator = read("src/components/core/IdleOnlineProgressHydrator.tsx");
const orb = read("src/components/home/SoftbridgeOrb.tsx");
const reveal = read("src/components/motion/ScrollReveal.tsx");
const metrics = read("src/data/lightweight-site-metrics.ts");

const checks = [
  {
    label: "Global Lenis kullanılmıyor",
    ok: !providers.includes("ReactLenis") && !providers.includes("lenis/react")
  },
  {
    label: "OnlineProgressHydrator idle sonrası çalışıyor",
    ok: providers.includes("IdleOnlineProgressHydrator") && idleHydrator.includes("requestIdleCallback")
  },
  {
    label: "Ana sayfa orb WebGL/Canvas kullanmıyor",
    ok: !orb.includes("@react-three/fiber") && !orb.includes("<Canvas") && !orb.includes("three")
  },
  {
    label: "ScrollReveal framer-motion kullanmıyor",
    ok: !reveal.includes("framer-motion") && !reveal.includes("motion.")
  },
  {
    label: "Hafif metrik dosyası ağır soru bankasını import etmiyor",
    ok: !metrics.includes("generated-30-question-tests")
  }
];

console.log("Login + dashboard performans denetimi");
console.log("====================================");

let failed = 0;

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\nTüm performans kontrolleri geçti.");
