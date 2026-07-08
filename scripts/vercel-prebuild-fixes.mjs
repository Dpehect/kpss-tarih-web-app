import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relative) {
  const full = path.join(root, relative);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, "utf8");
}

function write(relative, content) {
  const full = path.join(root, relative);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
}

function ensureKpssHistoryExports() {
  const file = "src/data/kpss-history.ts";
  let source = read(file);

  if (!source) {
    console.warn(`[vercel-prebuild-fixes] ${file} bulunamadı, atlandı.`);
    return;
  }

  const additions = [];

  if (!source.includes("export const glossary")) {
    additions.push(`
const readCompatText = (value: unknown, keys: string[], fallback = "") => {
  const record = value as Record<string, unknown>;

  for (const key of keys) {
    const item = record[key];

    if (typeof item === "string" && item.trim()) return item;
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
    write(file, source);
    console.log("[vercel-prebuild-fixes] kpss-history export uyumluluğu eklendi.");
  } else {
    console.log("[vercel-prebuild-fixes] kpss-history export uyumluluğu zaten hazır.");
  }
}

function normalizeStudyTypeImports(source) {
  const lineEnding = source.includes("\r\n") ? "\r\n" : "\n";

  // Önce tekil Question importlarını kaldır. Dosyada Exam, Question birlikte varsa duplicate patlamasın.
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

    source = source.replace(studyImportRegex, `import type { ${merged.join(", ")} } from "@/types/study";`);
    return source;
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

function ensureSingleExamQuestionPool(source) {
  // Önce eski/çoğalmış pool tanımlarını temizle.
  source = source.replace(/^const examQuestionPool = expandedQuestions as Question\[\];\r?\n\r?\n/gm, "");
  source = source.replace(/^const examQuestionPool = expandedQuestions as Question\[\];\r?\n/gm, "");

  const marker = "function getQuestionPool(topicId: string) {";
  if (source.includes(marker)) {
    source = source.replace(marker, `const examQuestionPool = expandedQuestions as Question[];\n\n${marker}`);
  }

  source = source.replace(
    /return expandedQuestions\.filter\(\(question\) => question\.topicId === topicId\);/g,
    "return examQuestionPool.filter((question) => question.topicId === topicId);"
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

  source = normalizeStudyTypeImports(source);
  source = ensureSingleExamQuestionPool(source);

  write(file, source);
  console.log("[vercel-prebuild-fixes] kpss-exam-blueprints import/type fix hazır.");
}

function ensureExamsPageRoute() {
  const file = "src/app/(main)/exams/page.tsx";
  const content = `import type { Metadata } from "next";
import { ExamsPage } from "@/features/exams/components/ExamsPage";

export const metadata: Metadata = {
  title: "Denemeler",
  description: "KPSS Tarih deneme merkezi."
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

ensureKpssHistoryExports();
ensureExamBlueprintTypes();
ensureExamsPageRoute();

console.log("[vercel-prebuild-fixes] tamamlandı.");
