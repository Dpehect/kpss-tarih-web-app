import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const file = path.join(root, "src/app/layout.tsx");

if (!fs.existsSync(file)) {
  throw new Error("src/app/layout.tsx bulunamadı.");
}

let source = fs.readFileSync(file, "utf8");

const cssImport = 'import "@/app/admin-hard-contrast.css";';
const componentImport = 'import { RouteBodyClass } from "@/components/system/RouteBodyClass";';

if (!source.includes(cssImport)) {
  const anchors = [
    'import "@/app/admin-readable-fix.css";',
    'import "@/app/cta-white-text-fix.css";',
    'import "@/app/contrast-fixes.css";',
    'import "@/app/globals.css";'
  ];

  let inserted = false;

  for (const anchor of anchors) {
    if (source.includes(anchor)) {
      source = source.replace(anchor, `${anchor}\n${cssImport}`);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    source = `${cssImport}\n${source}`;
  }
}

if (!source.includes(componentImport)) {
  const importMatches = [...source.matchAll(/^import .+;$/gm)];

  if (importMatches.length > 0) {
    const lastImport = importMatches[importMatches.length - 1];
    const insertAt = (lastImport.index ?? 0) + lastImport[0].length;
    source = `${source.slice(0, insertAt)}\n${componentImport}${source.slice(insertAt)}`;
  } else {
    source = `${componentImport}\n${source}`;
  }
}

if (!source.includes("<RouteBodyClass />")) {
  const bodyOpenRegex = /(<body\b[^>]*>)/;

  if (!bodyOpenRegex.test(source)) {
    throw new Error("layout.tsx içinde <body> etiketi bulunamadı.");
  }

  source = source.replace(bodyOpenRegex, "$1\n        <RouteBodyClass />");
}

source = source.replace(/\n{3,}/g, "\n\n");

fs.writeFileSync(file, source, "utf8");

console.log("Admin hard contrast kurulumu tamamlandı.");
console.log("- admin-hard-contrast.css import edildi.");
console.log("- RouteBodyClass layout içine eklendi.");
console.log("- /admin route açılınca body.route-admin class'ı otomatik eklenecek.");
