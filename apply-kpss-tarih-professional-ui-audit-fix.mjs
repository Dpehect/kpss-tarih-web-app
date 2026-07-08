#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const patchRoot = path.dirname(new URL(import.meta.url).pathname);
const stamp = "/* KPSS_TARIH_PROFESSIONAL_BUTTON_CONTRAST_GUARD */";

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function copyFile(relativePath) {
  const from = path.join(patchRoot, relativePath);
  const to = path.join(root, relativePath);
  ensureDir(to);
  if (fs.existsSync(to) && relativePath === "src/components/ui/button.tsx") {
    const backup = `${to}.backup-${Date.now()}`;
    fs.copyFileSync(to, backup);
    console.log(`backup: ${path.relative(root, backup)}`);
  }
  fs.copyFileSync(from, to);
  console.log(`wrote: ${relativePath}`);
}

function appendContrastCss() {
  const globalsPath = path.join(root, "src/app/globals.css");
  const cssPath = path.join(patchRoot, "src/styles/professional-button-contrast.css");
  ensureDir(globalsPath);
  let globals = fs.existsSync(globalsPath) ? fs.readFileSync(globalsPath, "utf8") : "@import \"tailwindcss\";\n";
  const css = fs.readFileSync(cssPath, "utf8");
  if (!globals.includes(stamp)) {
    globals += `\n\n${stamp}\n${css}\n`;
    fs.writeFileSync(globalsPath, globals);
    console.log("updated: src/app/globals.css button contrast guard appended");
  } else {
    console.log("skip: src/app/globals.css already has contrast guard");
  }
}

function safeTypeFix() {
  const historyPath = path.join(root, "src/data/kpss-history.ts");
  if (!fs.existsSync(historyPath)) return;
  let source = fs.readFileSync(historyPath, "utf8");
  const before = source;
  source = source.replaceAll("card as Record<string, unknown>", "card as unknown as Record<string, unknown>");
  source = source.replaceAll("item as Record<string, unknown>", "item as unknown as Record<string, unknown>");
  source = source.replaceAll("entry as Record<string, unknown>", "entry as unknown as Record<string, unknown>");
  if (source !== before) {
    fs.writeFileSync(historyPath, source);
    console.log("fixed: src/data/kpss-history.ts unsafe Record casts");
  }
}

function updatePackageJson() {
  const pkgPath = path.join(root, "package.json");
  if (!fs.existsSync(pkgPath)) return;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts["audit:prod"] = "node scripts/audit-data-and-performance.mjs";
  pkg.scripts["smoke:prod"] = "node scripts/smoke-production-pages.mjs";
  pkg.scripts["verify:prod"] = "npm run typecheck && npm run build && npm run audit:prod";
  if (!pkg.scripts.typecheck) pkg.scripts.typecheck = "tsc --noEmit";
  if (pkg.scripts.lint === "next lint") pkg.scripts.lint = "eslint .";
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log("updated: package.json scripts");
}

copyFile("src/components/ui/button.tsx");
copyFile("src/styles/professional-button-contrast.css");
copyFile("scripts/audit-data-and-performance.mjs");
copyFile("scripts/smoke-production-pages.mjs");
appendContrastCss();
safeTypeFix();
updatePackageJson();

console.log("\nDone. Run:");
console.log("  npm run typecheck");
console.log("  npm run build");
console.log("  npm run audit:prod");
console.log("  SMOKE_BASE_URL=https://kpss-tarih-web-app.vercel.app npm run smoke:prod\n");
