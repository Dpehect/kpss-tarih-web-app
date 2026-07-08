import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const patchRoot = path.dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();

function isProjectRoot(dir) {
  const pkg = path.join(dir, "package.json");
  if (!fs.existsSync(pkg)) return false;
  try {
    const json = JSON.parse(fs.readFileSync(pkg, "utf8"));
    return json.name === "kpss-tarih-web-app" || fs.existsSync(path.join(dir, "src"));
  } catch {
    return fs.existsSync(path.join(dir, "src"));
  }
}

const targetRoot = isProjectRoot(cwd)
  ? cwd
  : isProjectRoot(path.dirname(patchRoot))
    ? path.dirname(patchRoot)
    : cwd;

const filesToCopy = [
  "package.json",
  "vercel.json",
  "scripts/vercel-prebuild-fixes.mjs",
  "src/data/kpss-history.ts",
  "src/proxy.ts",
  "docs/PRODUCTION_FIX_REPORT.md",
  "docs/PROFESSIONAL_POLISH_CHECKLIST.md",
  ".github/workflows/production-check.yml"
];

for (const relative of filesToCopy) {
  const source = path.join(patchRoot, relative);
  const target = path.join(targetRoot, relative);
  if (!fs.existsSync(source)) continue;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  console.log(`copied ${relative}`);
}

const middleware = path.join(targetRoot, "src/middleware.ts");
if (fs.existsSync(middleware)) {
  fs.rmSync(middleware, { force: true });
  console.log("removed src/middleware.ts; Next 16 uses src/proxy.ts");
}

console.log("\nKPSS Tarih production fix uygulandı.");
console.log("Sonraki komutlar:");
console.log("npm install");
console.log("npm run typecheck");
console.log("npm run build");
