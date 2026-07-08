import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const patchRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();

const filesToCopy = [
  "src/components/core/AppShell.tsx",
  "src/components/core/Sidebar.tsx",
  "src/app/(main)/layout.tsx",
  "src/app/(main)/topics/page.tsx",
  "src/app/(main)/topics/[slug]/page.tsx",
  "src/app/(main)/question-bank/page.tsx",
  "src/app/(main)/question-bank/[topicId]/page.tsx",
  "src/app/(main)/timeline/page.tsx",
  "src/features/topics/components/TopicsPage.tsx",
  "src/features/topics/components/TopicDetailPage.tsx",
  "src/features/question-bank/components/QuestionBankPage.tsx",
  "src/features/question-bank/components/TopicQuestionPage.tsx",
  "src/features/timeline/components/TimelinePage.tsx",
  "src/data/generated-30-question-tests.ts",
  "scripts/audit-interactions.mjs",
];

function copyFile(relative) {
  const source = path.join(patchRoot, relative);
  const target = path.join(projectRoot, relative);
  if (!fs.existsSync(source)) throw new Error(`Patch dosyası eksik: ${relative}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  console.log(`updated ${relative}`);
}

function appendCssPatch() {
  const globalsFile = path.join(projectRoot, "src/app/globals.css");
  const cssPatchFile = path.join(patchRoot, "src/app/globals.interaction-fix.css");
  if (!fs.existsSync(globalsFile)) throw new Error("src/app/globals.css bulunamadı.");
  const patch = fs.readFileSync(cssPatchFile, "utf8").trim();
  let current = fs.readFileSync(globalsFile, "utf8");

  if (current.includes("KPSS Tarih interaction hardening patch")) {
    current = current.replace(/\/\* KPSS Tarih interaction hardening patch\.[\s\S]*?stroke: currentColor !important;\s*}\s*$/m, patch);
  } else {
    current = `${current.trim()}\n\n${patch}\n`;
  }

  fs.writeFileSync(globalsFile, current, "utf8");
  console.log("updated src/app/globals.css interaction patch");
}

function updatePackageScripts() {
  const file = path.join(projectRoot, "package.json");
  if (!fs.existsSync(file)) return;
  const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts["audit:interactions"] = "node scripts/audit-interactions.mjs";
  pkg.scripts["verify:ui"] = "npm run typecheck && npm run build && npm run audit:interactions";
  fs.writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
  console.log("updated package.json scripts");
}

function hardenPrebuildScript() {
  const file = path.join(projectRoot, "scripts/force-question-bank-20-tests.mjs");
  if (!fs.existsSync(file)) return;
  let source = fs.readFileSync(file, "utf8");
  const guard = `\n// Professional interaction patch note:\n// generated-30-question-tests.ts now contains deterministic JSON fallback generation.\n// This script only enforces constants/text and must never replace the generated file with empty arrays.\n`;
  if (!source.includes("deterministic JSON fallback generation")) {
    source = `${guard}\n${source}`;
    fs.writeFileSync(file, source, "utf8");
    console.log("annotated scripts/force-question-bank-20-tests.mjs");
  }
}

for (const file of filesToCopy) copyFile(file);
appendCssPatch();
updatePackageScripts();
hardenPrebuildScript();

console.log("\nKPSS Tarih interaction/pro UI fix applied.");
console.log("Next steps:");
console.log("  npm run typecheck");
console.log("  npm run build");
console.log("  npm run audit:interactions");
