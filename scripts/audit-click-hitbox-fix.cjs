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

const appShell = read("src/components/core/AppShell.tsx");
const css = read("src/app/click-hitbox-fix.css");
const layout = read("src/app/layout.tsx");

const checks = [
  {
    label: "AppShell pointer-safe data attribute kullanıyor",
    ok: appShell.includes('data-app-shell="true"')
  },
  {
    label: "Sidebar z-index yüksek ve fixed",
    ok: appShell.includes("data-app-sidebar") && appShell.includes("z-[70]")
  },
  {
    label: "Ana içerik sidebar üstüne binmeyecek şekilde padding alıyor",
    ok: appShell.includes("md:pl-[19.5rem]")
  },
  {
    label: "Menü linkleri geniş tıklama alanı kullanıyor",
    ok: appShell.includes('data-clickable="true"') && appShell.includes("min-h-12")
  },
  {
    label: "Mobil bottom nav geniş hitbox kullanıyor",
    ok: appShell.includes("min-h-[64px]")
  },
  {
    label: "CSS layout içine import edilmiş",
    ok: layout.includes('import "@/app/click-hitbox-fix.css";')
  },
  {
    label: "Dekoratif blur katmanları tıklama yemiyor",
    ok: css.includes('pointer-events: none !important') && css.includes('[class*="blur-"]')
  }
];

let failed = 0;

console.log("Click hitbox denetimi");
console.log("====================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\nTüm click/hitbox kontrolleri geçti.");
