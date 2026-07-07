const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

function read(relativePath) {
  const full = path.join(root, relativePath);

  if (!fs.existsSync(full)) {
    console.error(`Eksik dosya: ${relativePath}`);
    process.exit(1);
  }

  return fs.readFileSync(full, "utf8");
}

const providers = read("src/app/providers.tsx");
const orb = read("src/components/home/SoftbridgeOrb.tsx");
const reveal = read("src/components/motion/ScrollReveal.tsx");
const adminPage = read("src/features/admin/components/AdminPage.tsx");
const adminTable = read("src/features/admin/components/AdminUserTable.tsx");
const adminContent = read("src/features/admin/components/AdminContentManager.tsx");

const checks = [
  {
    label: "Global Lenis kaldırıldı",
    ok: !providers.includes("ReactLenis") && !providers.includes("lenis/react")
  },
  {
    label: "Ana sayfa WebGL Canvas kaldırıldı",
    ok: !orb.includes("@react-three/fiber") && !orb.includes("<Canvas")
  },
  {
    label: "ScrollReveal framer-motion kullanmıyor",
    ok: !reveal.includes("framer-motion") && !reveal.includes("motion.")
  },
  {
    label: "Admin shell açık zemin ve koyu yazıyla geliyor",
    ok: adminPage.includes("bg-[#f7efe3]") && adminPage.includes("text-[#101828]")
  },
  {
    label: "Admin kullanıcı tablosu koyu metin kullanıyor",
    ok: adminTable.includes("text-[#101828]") && adminTable.includes("text-[#344054]")
  },
  {
    label: "Admin içerik yönetimi açık/koyu kontrastlı",
    ok: adminContent.includes("bg-white") && adminContent.includes("text-[#101828]")
  }
];

let failed = 0;

console.log("Performans + admin okunabilirlik denetimi");
console.log("========================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\nTüm kontroller geçti.");
