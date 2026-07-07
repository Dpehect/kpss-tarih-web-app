import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const layoutFile = path.join(root, "src/app/layout.tsx");
const importLine = 'import "@/app/click-hitbox-fix.css";';

if (!fs.existsSync(layoutFile)) {
  throw new Error("src/app/layout.tsx bulunamadı.");
}

let source = fs.readFileSync(layoutFile, "utf8");

if (!source.includes(importLine)) {
  const anchors = [
    'import "@/app/admin-hard-contrast.css";',
    'import "@/app/admin-readable-fix.css";',
    'import "@/app/cta-white-text-fix.css";',
    'import "@/app/contrast-fixes.css";',
    'import "@/app/globals.css";'
  ];

  let inserted = false;

  for (const anchor of anchors) {
    if (source.includes(anchor)) {
      source = source.replace(anchor, `${anchor}\n${importLine}`);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    source = `${importLine}\n${source}`;
  }
}

source = source.replace(/\n{3,}/g, "\n\n");
fs.writeFileSync(layoutFile, source, "utf8");

console.log("click-hitbox-fix.css layout içine eklendi.");
