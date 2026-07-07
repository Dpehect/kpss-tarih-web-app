import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const targets = [
  "src/app/page.tsx",
  "src/features/dashboard/components/DashboardPage.tsx",
  "src/components/navigation/TopNav.tsx",
  "src/components/layout/TopNav.tsx"
];

const metricImport =
  'import { ALL_TEST_COUNT, EXPANDED_FLASHCARD_COUNT, EXPANDED_QUESTION_COUNT, TOPIC_COUNT } from "@/data/lightweight-site-metrics";';

function removeSpecifierImport(source, moduleName, names) {
  const importRegex = new RegExp(`import\\s*\\{\\s*([^}]*?)\\s*\\}\\s*from\\s*["']${moduleName.replaceAll("/", "\\/")}["'];`, "g");

  return source.replace(importRegex, (match, specifiers) => {
    const parts = specifiers
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    const remaining = parts.filter((part) => {
      const localName = part.includes(" as ") ? part.split(/\s+as\s+/).at(-1)?.trim() : part;
      return !names.includes(localName ?? part) && !names.includes(part);
    });

    if (remaining.length === parts.length) return match;
    if (remaining.length === 0) return "";

    return `import { ${remaining.join(", ")} } from "${moduleName}";`;
  });
}

function needsMetricImport(source) {
  return [
    "EXPANDED_QUESTION_COUNT",
    "ALL_TEST_COUNT",
    "EXPANDED_FLASHCARD_COUNT",
    "TOPIC_COUNT"
  ].some((token) => source.includes(token));
}

let changed = 0;

for (const relative of targets) {
  const file = path.join(root, relative);

  if (!fs.existsSync(file)) continue;

  let source = fs.readFileSync(file, "utf8");
  let next = source;

  next = next
    .replaceAll("expandedQuestions.length", "EXPANDED_QUESTION_COUNT")
    .replaceAll("allQuestionTests.length", "ALL_TEST_COUNT")
    .replaceAll("topicQuestionTests.length", "TOPIC_TEST_COUNT")
    .replaceAll("mixedQuestionTests.length", "MIXED_TEST_COUNT")
    .replaceAll("expandedFlashcards.length", "EXPANDED_FLASHCARD_COUNT")
    .replaceAll("flashcards.length", "EXPANDED_FLASHCARD_COUNT")
    .replaceAll("topics.length", "TOPIC_COUNT");

  next = removeSpecifierImport(next, "@/data/generated-30-question-tests", [
    "expandedQuestions",
    "allQuestionTests",
    "topicQuestionTests",
    "mixedQuestionTests"
  ]);

  next = removeSpecifierImport(next, "@/data/expanded-flashcards", [
    "expandedFlashcards",
    "flashcards"
  ]);

  if (needsMetricImport(next) && !next.includes("@/data/lightweight-site-metrics")) {
    next = `${metricImport}\n${next}`;
  }

  next = next.replace(/\n{3,}/g, "\n\n");

  if (next !== source) {
    fs.writeFileSync(file, next, "utf8");
    changed += 1;
    console.log(`Optimize edildi: ${relative}`);
  }
}

console.log(`Ağır count import optimizasyonu tamamlandı. Güncellenen dosya: ${changed}`);
