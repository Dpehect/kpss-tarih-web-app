#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcDir = path.join(root, "src");
const publicDir = path.join(root, "public");
const issues = [];
const warnings = [];
const notes = [];

function exists(p) {
  return fs.existsSync(p);
}

function read(p) {
  return fs.readFileSync(p, "utf8");
}

function walk(dir, exts = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".json"])) {
  const result = [];
  if (!exists(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...walk(p, exts));
    else if (exts.has(path.extname(entry.name))) result.push(p);
  }
  return result;
}

function rel(p) {
  return path.relative(root, p).replaceAll(path.sep, "/");
}

function countLiteralArrayObjects(source, exportName) {
  const marker = new RegExp(`export\\s+const\\s+${exportName}\\b`);
  const match = marker.exec(source);
  if (!match) return null;
  const start = source.indexOf("[", match.index);
  if (start < 0) return null;
  let depth = 0;
  let end = -1;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (ch === "[") depth++;
    if (ch === "]") depth--;
    if (depth === 0) {
      end = i;
      break;
    }
  }
  if (end < 0) return null;
  const body = source.slice(start + 1, end);
  const objectStarts = body.match(/(^|[,\n]\s*)\{/g);
  return objectStarts?.length ?? 0;
}

function checkFile(pathName, message, severity = "issue") {
  if (!exists(path.join(root, pathName))) {
    (severity === "issue" ? issues : warnings).push(`${pathName}: ${message}`);
  }
}

checkFile("src/data/kpss-history.ts", "KPSS history data source not found.");
checkFile("src/app/page.tsx", "home page not found.");
checkFile("src/app/globals.css", "global stylesheet not found.");
checkFile("src/components/ui/button.tsx", "shared button component not found.", "warning");

const dataPath = path.join(root, "src/data/kpss-history.ts");
if (exists(dataPath)) {
  const source = read(dataPath);
  if (source.includes("as Record<string, unknown>") && !source.includes("as unknown as Record<string, unknown>")) {
    issues.push("src/data/kpss-history.ts: unsafe Record<string, unknown> cast can break Vercel strict TypeScript build.");
  }
  const topicCount = countLiteralArrayObjects(source, "topics");
  const flashcardCount = countLiteralArrayObjects(source, "flashcards");
  if (topicCount !== null) notes.push(`topics literal count: ${topicCount}`);
  if (flashcardCount !== null) notes.push(`flashcards literal count: ${flashcardCount}`);
  if (topicCount !== null && topicCount < 12) warnings.push(`src/data/kpss-history.ts: topic count looks low (${topicCount}). KPSS Tarih scope should cover the full 12-topic map.`);
  if (flashcardCount !== null && flashcardCount < 40) warnings.push(`src/data/kpss-history.ts: flashcard count looks low (${flashcardCount}).`);
}

const files = walk(root);
const amateurPatterns = [
  /lorem\s+ipsum/i,
  /coming\s+soon/i,
  /placeholder/i,
  /dummy/i,
  /öğrenci\s+projesi/i,
  /test amaçlı/i,
  /buraya/i,
  /TODO\b/i,
  /FIXME\b/i,
];

const riskyContrastPatterns = [
  { re: /bg-(white|slate-50|slate-100|gray-50|gray-100|zinc-50|zinc-100|neutral-50|neutral-100|stone-50|stone-100)[^"'`]*text-(white|slate-50|gray-50|zinc-50|neutral-50|stone-50)/, msg: "light background with light text" },
  { re: /bg-(black|slate-900|gray-900|zinc-900|neutral-900|stone-900)[^"'`]*text-(black|slate-900|gray-900|zinc-900|neutral-900|stone-900)/, msg: "dark background with dark text" },
  { re: /text-white[^"'`]*(bg-white|bg-slate-50|bg-gray-50|bg-zinc-50|bg-neutral-50|bg-stone-50)/, msg: "white text near white background" },
];

for (const file of files) {
  const source = read(file);
  for (const pattern of amateurPatterns) {
    if (pattern.test(source)) warnings.push(`${rel(file)}: professional copy cleanup needed (${pattern.source}).`);
  }
  for (const pattern of riskyContrastPatterns) {
    if (pattern.re.test(source)) warnings.push(`${rel(file)}: possible button/text contrast issue (${pattern.msg}).`);
  }
  if (/console\.log\(/.test(source) && !rel(file).startsWith("scripts/")) warnings.push(`${rel(file)}: console.log left in app source.`);
}

if (exists(publicDir)) {
  for (const file of walk(publicDir, new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]))) {
    const stat = fs.statSync(file);
    const kb = Math.round(stat.size / 1024);
    if (kb > 700 && !file.endsWith(".svg")) warnings.push(`${rel(file)}: large image (${kb} KB). Consider WebP/AVIF and responsive dimensions.`);
  }
}

const pkgPath = path.join(root, "package.json");
if (exists(pkgPath)) {
  const pkg = JSON.parse(read(pkgPath));
  if (!pkg.scripts?.typecheck) warnings.push("package.json: add typecheck script: tsc --noEmit");
  if (!pkg.scripts?.build) issues.push("package.json: build script missing.");
}

console.log("\nKPSS Tarih production audit");
console.log("==========================");
if (notes.length) {
  console.log("\nNotes:");
  for (const note of notes) console.log(`  - ${note}`);
}
if (warnings.length) {
  console.log("\nWarnings:");
  for (const warning of warnings) console.log(`  - ${warning}`);
}
if (issues.length) {
  console.log("\nBlocking issues:");
  for (const issue of issues) console.log(`  - ${issue}`);
  process.exit(1);
}
console.log("\nNo blocking structural/data/performance issues found by static audit.");
console.log("Run npm run build and optionally SMOKE_BASE_URL=https://your-vercel-url npm run smoke:prod for runtime verification.\n");
