import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const fail = (message) => {
  console.error(`[audit-readability] ${message}`);
  process.exitCode = 1;
};

const globals = read("src/app/globals.css");
const forbidden = [
  '[class*="bg-gradient-to"][class*="from-blue"]',
  '[class*="bg-gradient-to"][class*="from-indigo"]',
  '[class*="bg-gradient-to"][class*="from-slate"]',
];
for (const token of forbidden) {
  if (globals.includes(token)) fail(`Okunabilirliği bozan geniş seçici bulundu: ${token}`);
}
if (!globals.includes("SB_READABILITY_GUARD_V2") && !globals.includes("data-readable=\"light\"")) {
  fail("Readability guard CSS eksik.");
}

const vercel = JSON.parse(read("vercel.json"));
const command = vercel.buildCommand ?? "";
for (const required of [
  "node scripts/vercel-prebuild-fixes.mjs",
  "node scripts/force-question-bank-20-tests.mjs",
  "node scripts/remove-ambiguous-exam-route.mjs",
  "node scripts/audit-readability-and-vercel.mjs",
  "next build",
]) {
  if (!command.includes(required)) fail(`vercel.json buildCommand içinde eksik: ${required}`);
}

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts?.build?.includes("audit-readability-and-vercel.mjs")) {
  fail("package.json build scripti readability audit çalıştırmıyor.");
}

if (process.exitCode) process.exit(process.exitCode);
console.log("[audit-readability] CSS okunabilirlik ve Vercel otomatik script zinciri temiz.");
