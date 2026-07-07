const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

const requiredFiles = [
  "src/components/system/RouteBodyClass.tsx",
  "src/app/admin-hard-contrast.css",
  "src/app/layout.tsx"
];

for (const relative of requiredFiles) {
  const full = path.join(root, relative);

  if (!fs.existsSync(full)) {
    console.error(`Eksik dosya: ${relative}`);
    process.exit(1);
  }
}

const layout = fs.readFileSync(path.join(root, "src/app/layout.tsx"), "utf8");

if (!layout.includes('import "@/app/admin-hard-contrast.css";')) {
  console.error("layout.tsx içinde admin-hard-contrast.css import'u yok.");
  process.exit(1);
}

if (!layout.includes('import { RouteBodyClass } from "@/components/system/RouteBodyClass";')) {
  console.error("layout.tsx içinde RouteBodyClass import'u yok.");
  process.exit(1);
}

if (!layout.includes("<RouteBodyClass />")) {
  console.error("layout.tsx içinde <RouteBodyClass /> yok.");
  process.exit(1);
}

const css = fs.readFileSync(path.join(root, "src/app/admin-hard-contrast.css"), "utf8");

for (const selector of ["body.route-admin main table", "body.route-admin main td", "body.route-admin main th"]) {
  if (!css.includes(selector)) {
    console.error(`CSS içinde kritik selector eksik: ${selector}`);
    process.exit(1);
  }
}

console.log("Admin kontrast denetimi geçti.");
console.log("✓ /admin route class sistemi kurulu.");
console.log("✓ Admin CSS layout'a import edilmiş.");
console.log("✓ Tablo th/td kontrast selectorleri mevcut.");
