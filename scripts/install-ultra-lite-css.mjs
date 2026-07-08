import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const layoutFile = path.join(root, "src/app/layout.tsx");
const importLine = 'import "@/app/ultra-lite.css";';

if (!fs.existsSync(layoutFile)) {
  throw new Error("src/app/layout.tsx bulunamadı.");
}

let source = fs.readFileSync(layoutFile, "utf8");

if (!source.includes(importLine)) {
  const globalImport = 'import "@/app/globals.css";';

  if (source.includes(globalImport)) {
    source = source.replace(globalImport, `${globalImport}\n${importLine}`);
  } else {
    source = `${importLine}\n${source}`;
  }
}

source = source.replace(/\n{3,}/g, "\n\n");
fs.writeFileSync(layoutFile, source, "utf8");

console.log("ultra-lite.css layout içine eklendi.");
