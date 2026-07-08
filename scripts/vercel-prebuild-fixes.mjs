import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function fullPath(relative) {
  return path.join(root, relative);
}

function exists(relative) {
  return fs.existsSync(fullPath(relative));
}

function read(relative) {
  const file = fullPath(relative);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

function write(relative, content) {
  const file = fullPath(relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function remove(relative) {
  const file = fullPath(relative);
  if (fs.existsSync(file)) fs.rmSync(file, { force: true });
}

function renameIfExists(from, to) {
  const source = fullPath(from);
  const target = fullPath(to);
  if (!fs.existsSync(source)) return false;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (fs.existsSync(target)) fs.rmSync(target, { force: true });
  fs.renameSync(source, target);
  return true;
}

function ensureKpssHistoryExports() {
  const file = "src/data/kpss-history.ts";
  let source = read(file);

  if (!source) {
    console.warn(`[vercel-prebuild-fixes] ${file} bulunamadı, atlandı.`);
    return;
  }

  const before = source;

  // Next/TS 5 strict cast fix: typed object -> Record requires unknown bridge.
  source = source.replaceAll(
    "card as Record<string, unknown>",
    "card as unknown as Record<string, unknown>"
  );
  source = source.replaceAll(
    "value as Record<string, unknown>",
    "value as unknown as Record<string, unknown>"
  );
  source = source.replaceAll(
    "const source = card as Record;",
    "const source = card as unknown as Record<string, unknown>;"
  );
  source = source.replaceAll(
    "const record = value as Record<string, unknown>;",
    "const record = value as unknown as Record<string, unknown>;"
  );

  const additions = [];

  if (!source.includes("export const glossary")) {
    additions.push(`
const readCompatText = (value: unknown, keys: string[], fallback = "") => {
  const record = value as unknown as Record<string, unknown>;

  for (const key of keys) {
    const item = record[key];
    if (typeof item === "string" && item.trim()) return item.trim();
    if (typeof item === "number") return String(item);
  }

  return fallback;
};

export const glossary = flashcards.map((card, index) => ({
  id: readCompatText(card, ["id"], \`glossary-\${index + 1}\`),
  term: readCompatText(card, ["term", "front", "question", "title"], \`Kavram \${index + 1}\`),
  definition: readCompatText(card, ["definition", "back", "answer", "content"], ""),
  topicId: readCompatText(card, ["topicId", "topic_id"], topics[0]?.id ?? "general"),
  relatedTerms: [],
  tags: [],
  example: "",
  whyImportant: ""
}));
`);
  }

  if (!source.includes("export function getGlossaryByTopic")) {
    additions.push(`
export function getGlossaryByTopic(topicId: string) {
  return glossary.filter((item) => item.topicId === topicId);
}
`);
  }

  if (!source.includes("export const recommendations")) {
    additions.push(`
export const recommendations = studyRecommendations;
`);
  }

  if (additions.length) {
    source = `${source.trim()}\n\n${additions.join("\n").trim()}\n`;
  }

  if (source !== before) {
    write(file, source);
    console.log("[vercel-prebuild-fixes] kpss-history TypeScript/export fix uygulandı.");
  } else {
    console.log("[vercel-prebuild-fixes] kpss-history export uyumluluğu zaten hazır.");
  }
}

function normalizeStudyTypeImports(source) {
  const lineEnding = source.includes("\r\n") ? "\r\n" : "\n";

  source = source.replace(/^import type \{ Question \} from ["']@\/types\/study["'];\r?\n/gm, "");

  const studyImportRegex = /^import type \{([^}]+)\} from ["']@\/types\/study["'];$/m;
  const match = source.match(studyImportRegex);

  if (match) {
    const names = match[1]
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const required = ["Exam", "Question"];
    const merged = Array.from(new Set([...names, ...required])).sort((a, b) => {
      const order = { Exam: 0, Question: 1 };
      return (order[a] ?? 99) - (order[b] ?? 99) || a.localeCompare(b);
    });

    return source.replace(studyImportRegex, `import type { ${merged.join(", ")} } from "@/types/study";`);
  }

  const generatedImportRegex = /(import\s+\{\s*expandedQuestions\s*\}\s+from\s+["']@\/data\/generated-30-question-tests["'];)/;
  if (generatedImportRegex.test(source)) {
    return source.replace(
      generatedImportRegex,
      `$1${lineEnding}import type { Exam, Question } from "@/types/study";`
    );
  }

  return `import type { Exam, Question } from "@/types/study";${lineEnding}${source}`;
}

function ensureExamQuestionPool(source) {
  source = source.replace(/^const examQuestionPool = expandedQuestions as Question\[\];\r?\n\r?\n/gm, "");
  source = source.replace(/^const examQuestionPool = expandedQuestions as Question\[\];\r?\n/gm, "");

  const marker = "function getQuestionPool(topicId: string) {";

  if (source.includes(marker)) {
    source = source.replace(marker, `const examQuestionPool = expandedQuestions as Question[];\n\n${marker}`);
  } else if (!source.includes("const examQuestionPool = expandedQuestions as Question[];")) {
    source = source.replace(
      /(import type \{[^}]*Question[^}]*\} from ["']@\/types\/study["'];\r?\n)/,
      `$1\nconst examQuestionPool = expandedQuestions as Question[];\n`
    );
  }

  return source;
}

function replaceExpandedQuestionUsages(source) {
  const replacements = [
    [/return expandedQuestions\.filter\(/g, "return examQuestionPool.filter("],
    [/for \(const question of expandedQuestions\)/g, "for (const question of examQuestionPool)"],
    [/expandedQuestions\.map\(/g, "examQuestionPool.map("],
    [/expandedQuestions\.find\(/g, "examQuestionPool.find("],
    [/expandedQuestions\.some\(/g, "examQuestionPool.some("],
    [/expandedQuestions\.slice\(/g, "examQuestionPool.slice("],
    [/expandedQuestions\.length/g, "examQuestionPool.length"]
  ];

  for (const [pattern, replacement] of replacements) {
    source = source.replace(pattern, replacement);
  }

  source = source.replace(
    /const examQuestionPool = examQuestionPool as Question\[\];/g,
    "const examQuestionPool = expandedQuestions as Question[];"
  );

  return source;
}

function ensureExamBlueprintTypes() {
  const file = "src/data/kpss-exam-blueprints.ts";
  let source = read(file);

  if (!source) {
    console.warn(`[vercel-prebuild-fixes] ${file} bulunamadı, atlandı.`);
    return;
  }

  const before = source;
  source = normalizeStudyTypeImports(source);
  source = ensureExamQuestionPool(source);
  source = replaceExpandedQuestionUsages(source);

  if (source !== before) write(file, source);
  console.log("[vercel-prebuild-fixes] kpss-exam-blueprints expandedQuestions/type fix hazır.");
}

function ensureExamsPageRoute() {
  const file = "src/app/(main)/exams/page.tsx";
  const content = `import type { Metadata } from "next";

import { ExamsPage } from "@/features/exams/components/ExamsPage";

export const metadata: Metadata = {
  title: "KPSS Tarih Denemeleri | Sınav Merkezi",
  description: "KPSS Tarih için konu bazlı ve genel deneme sınavları, otomatik puanlama ve performans analizi."
};

export default async function ExamsRoute() {
  return <ExamsPage />;
}
`;

  const current = read(file);
  if (current !== content) {
    write(file, content);
    console.log("[vercel-prebuild-fixes] exams/page.tsx düzeltildi.");
  } else {
    console.log("[vercel-prebuild-fixes] exams/page.tsx zaten hazır.");
  }
}

function ensureProxyConvention() {
  const middlewareFile = "src/middleware.ts";
  const proxyFile = "src/proxy.ts";
  const middleware = read(middlewareFile);

  if (!middleware && exists(proxyFile)) {
    console.log("[vercel-prebuild-fixes] proxy.ts zaten hazır.");
    return;
  }

  if (!middleware) {
    console.log("[vercel-prebuild-fixes] middleware/proxy bulunamadı, atlandı.");
    return;
  }

  let proxy = middleware
    .replace(/export\s+async\s+function\s+middleware\s*\(/, "export async function proxy(")
    .replace(/export\s+function\s+middleware\s*\(/, "export function proxy(");

  if (!proxy.includes("function proxy")) {
    proxy = `import type { NextRequest } from "next/server";\n\n${proxy}\n`;
  }

  write(proxyFile, proxy);
  remove(middlewareFile);
  console.log("[vercel-prebuild-fixes] Next 16 uyumu için middleware.ts -> proxy.ts dönüştürüldü.");
}

function ensureManifestNoDuplicateRoute() {
  const manifestFile = "src/app/manifest.ts";
  const manifestRoute = "src/app/manifest.webmanifest/route.ts";

  if (exists(manifestFile) && exists(manifestRoute)) {
    renameIfExists(manifestRoute, "src/app/manifest.webmanifest/route.ts.disabled");
    console.log("[vercel-prebuild-fixes] duplicate manifest.webmanifest route devre dışı bırakıldı.");
  } else {
    console.log("[vercel-prebuild-fixes] duplicate manifest route yok.");
  }
}

function removeAmbiguousExamRouteIfPresent() {
  const duplicatedDir = "src/app/(main)/exams/[examId]";
  if (fs.existsSync(fullPath(duplicatedDir))) {
    fs.rmSync(fullPath(duplicatedDir), { recursive: true, force: true });
    console.log("[vercel-prebuild-fixes] ambiguous exams/[examId] route kaldırıldı.");
  }
}

function professionalizeObviousPlaceholderCopy() {
  const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".md"]);
  const skipDirs = new Set(["node_modules", ".next", ".git", "dist", "build", "coverage"]);
  const replacements = [
    [/lorem ipsum/gi, "KPSS Tarih çalışma içeriği"],
    [/coming soon/gi, "Yakında aktif olacak"],
    [/demo içerik/gi, "örnek çalışma içeriği"],
    [/test amaçlı/gi, "önizleme amaçlı"],
    [/öğrenci projesi/gi, "profesyonel eğitim platformu"]
  ];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (skipDirs.has(entry.name)) continue;
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(absolute);
        continue;
      }
      if (!extensions.has(path.extname(entry.name))) continue;
      let content = fs.readFileSync(absolute, "utf8");
      const before = content;
      for (const [pattern, replacement] of replacements) {
        content = content.replace(pattern, replacement);
      }
      if (content !== before) fs.writeFileSync(absolute, content, "utf8");
    }
  }

  walk(path.join(root, "src"));
  console.log("[vercel-prebuild-fixes] bariz placeholder/debug copy taraması tamamlandı.");
}

ensureKpssHistoryExports();
ensureExamBlueprintTypes();
ensureExamsPageRoute();
ensureProxyConvention();
ensureManifestNoDuplicateRoute();
removeAmbiguousExamRouteIfPresent();
professionalizeObviousPlaceholderCopy();

console.log("[vercel-prebuild-fixes] tamamlandı.");
