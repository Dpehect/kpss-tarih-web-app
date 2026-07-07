import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "src/app/layout.tsx");
const importLine = 'import "@/app/admin-readable-fix.css";';

if (!fs.existsSync(file)) {
  throw new Error("src/app/layout.tsx bulunamadı.");
}

let source = fs.readFileSync(file, "utf8");

if (source.includes(importLine)) {
  console.log("admin-readable-fix.css zaten import edilmiş.");
  process.exit(0);
}

const preferredAnchors = [
  'import "@/app/cta-white-text-fix.css";',
  'import "@/app/contrast-fixes.css";',
  'import "@/app/globals.css";'
];

let inserted = false;

for (const anchor of preferredAnchors) {
  if (source.includes(anchor)) {
    source = source.replace(anchor, `${anchor}\n${importLine}`);
    inserted = true;
    break;
  }
}

if (!inserted) {
  source = `${importLine}\n${source}`;
}

fs.writeFileSync(file, source, "utf8");
console.log("admin-readable-fix.css layout içine eklendi.");
