#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "src/data/kpss-history.ts");
const outRoot = path.join(root, "src/data/kpss");
const dryRun = process.argv.includes("--dry-run");

const ARRAY_EXPORTS = ["topics", "questions", "flashcards", "timelineEvents", "glossary", "exams", "recommendations"];

function log(message) {
  console.log(`[modularize-kpss-history] ${message}`);
}

function ensureDir(dir) {
  if (!dryRun) fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  if (dryRun) {
    log(`dry-run yazılacak: ${path.relative(root, filePath)}`);
    return;
  }
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function removeDir(dir) {
  if (dryRun || !fs.existsSync(dir)) return;
  fs.rmSync(dir, { recursive: true, force: true });
}

function sanitizeFileName(value) {
  return String(value || "general")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "general";
}

function toPascalCase(value) {
  return sanitizeFileName(value)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("") || "General";
}

function js(value) {
  return JSON.stringify(value, null, 2).replace(/</g, "\\u003c");
}

function findArrayLiteral(source, exportName) {
  const pattern = new RegExp(`export\\s+const\\s+${exportName}(?:\\s*:[^=]+)?\\s*=\\s*\\[`, "m");
  const match = pattern.exec(source);
  if (!match) return null;

  const start = match.index + match[0].lastIndexOf("[");
  let depth = 0;
  let quote = null;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (inLineComment) {
      if (char === "\n") inLineComment = false;
      continue;
    }

    if (inBlockComment) {
      if (char === "*" && next === "/") {
        inBlockComment = false;
        i += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === "/" && next === "/") {
      inLineComment = true;
      i += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      inBlockComment = true;
      i += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  throw new Error(`${exportName} array literal kapanışı bulunamadı.`);
}

function evaluateArray(exportName, arrayText) {
  if (!arrayText) return [];
  try {
    return Function(`"use strict"; return (${arrayText});`)();
  } catch (error) {
    throw new Error(`${exportName} array literal parse edilemedi: ${error.message}`);
  }
}

function readMonolith() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error("src/data/kpss-history.ts bulunamadı.");
  }

  const source = fs.readFileSync(sourcePath, "utf8");
  if (source.includes("AUTO-GENERATED MODULAR DATA BRIDGE")) {
    log("kpss-history.ts zaten modular bridge; işlem atlandı.");
    return null;
  }

  const arrays = {};
  for (const exportName of ARRAY_EXPORTS) {
    arrays[exportName] = evaluateArray(exportName, findArrayLiteral(source, exportName));
  }

  if (!Array.isArray(arrays.topics) || arrays.topics.length === 0) {
    throw new Error("topics dizisi boş veya okunamadı. Veri kaybını önlemek için işlem durduruldu.");
  }

  return arrays;
}

function topicFile(topic) {
  return sanitizeFileName(topic.slug || topic.id || topic.title);
}

function resolveTopicId(item, topics) {
  if (!item || typeof item !== "object") return "general";
  if (typeof item.topicId === "string" && item.topicId.trim()) return item.topicId.trim();
  if (typeof item.topic === "string" && item.topic.trim()) return item.topic.trim();
  if (typeof item.topicSlug === "string" && item.topicSlug.trim()) {
    const matched = topics.find((topic) => topic.slug === item.topicSlug || topic.id === item.topicSlug);
    return matched?.id || item.topicSlug;
  }
  if (Array.isArray(item.tags)) {
    const matched = item.tags
      .map((tag) => String(tag))
      .map((tag) => topics.find((topic) => topic.id === tag || topic.slug === tag))
      .find(Boolean);
    if (matched) return matched.id;
  }
  return "general";
}

function groupByTopic(items, topics) {
  const groups = new Map();
  for (const topic of topics) groups.set(topic.id, []);
  groups.set("general", []);

  for (const item of items || []) {
    const topicId = resolveTopicId(item, topics);
    if (!groups.has(topicId)) groups.set(topicId, []);
    groups.get(topicId).push(item);
  }

  return groups;
}

function writeTopicModules(topics) {
  const dir = path.join(outRoot, "topics");
  ensureDir(dir);
  const imports = [];
  const vars = [];

  for (const topic of topics) {
    const file = topicFile(topic);
    const varName = `${toPascalCase(topic.id || file)}Topic`;
    imports.push(`import { ${varName} } from "./${file}";`);
    vars.push(varName);
    writeFile(
      path.join(dir, `${file}.ts`),
      `import type { Topic } from "@/types/study";\n\nexport const ${varName} = ${js(topic)} satisfies Topic;\n`,
    );
  }

  writeFile(
    path.join(dir, "index.ts"),
    `import type { Topic } from "@/types/study";\n${imports.join("\n")}\n\nexport const topics = [\n  ${vars.join(",\n  ")}\n] satisfies Topic[];\n`,
  );
}

function writeGroupedModules({ exportName, typeName, folder, suffix, items, topics }) {
  const dir = path.join(outRoot, folder);
  ensureDir(dir);
  const groups = groupByTopic(items, topics);
  const imports = [];
  const vars = [];

  for (const [topicId, groupItems] of groups.entries()) {
    if (groupItems.length === 0 && topicId === "general") continue;
    const file = sanitizeFileName(topicId);
    const varName = `${toPascalCase(topicId)}${suffix}`;
    imports.push(`import { ${varName} } from "./${file}";`);
    vars.push(varName);
    writeFile(
      path.join(dir, `${file}.ts`),
      `import type { ${typeName} } from "@/types/study";\n\nexport const ${varName} = ${js(groupItems)} satisfies ${typeName}[];\n`,
    );
  }

  writeFile(
    path.join(dir, "index.ts"),
    `import type { ${typeName} } from "@/types/study";\n${imports.join("\n")}\n\nexport const ${exportName} = [\n  ${vars.map((name) => `...${name}`).join(",\n  ")}\n] satisfies ${typeName}[];\n`,
  );
}

function writeFlatModule({ fileName, exportName, typeName, items }) {
  writeFile(
    path.join(outRoot, `${fileName}.ts`),
    `import type { ${typeName} } from "@/types/study";\n\nexport const ${exportName} = ${js(items || [])} satisfies ${typeName}[];\n`,
  );
}

function writeIndexAndBridge(data) {
  const index = `import { topics } from "./topics";\nimport { questions } from "./questions";\nimport { flashcards } from "./flashcards";\nimport { timelineEvents } from "./timeline";\nimport { glossary } from "./glossary";\nimport { exams } from "./exams";\nimport { recommendations } from "./recommendations";\nimport type { Flashcard, Question, TimelineEvent, Topic } from "@/types/study";\n\nexport { topics, questions, flashcards, timelineEvents, glossary, exams, recommendations };\n\nexport const getTopicById = (id: string): Topic | undefined =>\n  topics.find((topic) => topic.id === id);\n\nexport const getTopicBySlug = (slug: string): Topic | undefined =>\n  topics.find((topic) => topic.slug === slug || topic.id === slug);\n\nexport const resolveTopicKey = (topicIdOrSlug: string): string =>\n  getTopicBySlug(topicIdOrSlug)?.id ?? topicIdOrSlug;\n\nexport const getQuestionsByTopic = (topicIdOrSlug: string): Question[] => {\n  const topicId = resolveTopicKey(topicIdOrSlug);\n  return questions.filter((question) => question.topicId === topicId || question.tags?.includes(topicId));\n};\n\nexport const getFlashcardsByTopic = (topicIdOrSlug: string): Flashcard[] => {\n  const topicId = resolveTopicKey(topicIdOrSlug);\n  return flashcards.filter((card) => card.topicId === topicId || card.tags?.includes(topicId));\n};\n\nexport const getTimelineEventsByTopic = (topicIdOrSlug: string): TimelineEvent[] => {\n  const topicId = resolveTopicKey(topicIdOrSlug);\n  return timelineEvents.filter((event) => event.topicId === topicId || event.tags?.includes(topicId));\n};\n\nexport const getGlossaryByTopic = (topicIdOrSlug: string) => {\n  const topicId = resolveTopicKey(topicIdOrSlug);\n  return glossary.filter((entry) => entry.topicId === topicId || entry.tags?.includes(topicId));\n};\n\nexport const searchKnowledgeBase = (query: string) => {\n  const normalized = query.toLocaleLowerCase("tr-TR");\n  return {\n    topics: topics.filter((topic) => [topic.title, topic.shortDescription, ...(topic.keywords ?? [])].join(" ").toLocaleLowerCase("tr-TR").includes(normalized)),\n    questions: questions.filter((question) => [question.stem, question.explanation, ...(question.tags ?? [])].join(" ").toLocaleLowerCase("tr-TR").includes(normalized)),\n    flashcards: flashcards.filter((card) => [card.front, card.back, ...(card.tags ?? [])].join(" ").toLocaleLowerCase("tr-TR").includes(normalized)),\n    glossary: glossary.filter((entry) => [entry.term, entry.definition, ...(entry.tags ?? [])].join(" ").toLocaleLowerCase("tr-TR").includes(normalized)),\n  };\n};\n`;

  const bridge = `import type { Exam, Flashcard, Question, StudyRecommendation, TimelineEvent, Topic } from "@/types/study";\n\n/**\n * AUTO-GENERATED MODULAR DATA BRIDGE\n *\n * Asıl veri artık src/data/kpss/* altında konu, soru, flashcard, timeline ve sözlük\n * dosyalarına bölünür. Eski importlar kırılmasın diye bu dosya sadece re-export yapar.\n */\nexport {\n  topics,\n  questions,\n  flashcards,\n  timelineEvents,\n  glossary,\n  exams,\n  recommendations,\n  getTopicById,\n  getTopicBySlug,\n  getQuestionsByTopic,\n  getFlashcardsByTopic,\n  getTimelineEventsByTopic,\n  getGlossaryByTopic,\n  resolveTopicKey,\n  searchKnowledgeBase,\n} from "./kpss";\n\nexport type { Exam, Flashcard, Question, StudyRecommendation, TimelineEvent, Topic };\n`;

  writeFile(path.join(outRoot, "index.ts"), index);
  writeFile(sourcePath, bridge);

  const manifest = {
    generatedAt: new Date().toISOString(),
    architecture: "modular-kpss-data",
    counts: {
      topics: data.topics.length,
      questions: data.questions.length,
      flashcards: data.flashcards.length,
      timelineEvents: data.timelineEvents.length,
      glossary: data.glossary.length,
      exams: data.exams.length,
      recommendations: data.recommendations.length,
    },
    topicFiles: data.topics.map((topic) => ({ id: topic.id, slug: topic.slug, file: `${topicFile(topic)}.ts` })),
  };

  writeFile(path.join(outRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  writeFile(
    path.join(outRoot, "README.md"),
    `# KPSS Tarih Modular Data\n\nBu klasör otomatik oluşturulur. Ana veri kaynağı artık tek dosya yerine konu bazlı modüllere ayrılır.\n\n## Klasörler\n\n- \`topics/\`: konu anlatımları\n- \`questions/\`: konu bazlı sorular\n- \`flashcards/\`: konu bazlı flashcardlar\n- \`timeline/\`: konu bazlı kronoloji\n- \`glossary/\`: konu bazlı kavram sözlüğü\n- \`exams.ts\`: deneme sınavları\n- \`recommendations.ts\`: çalışma önerileri\n\n## Sayılar\n\n- Konu: ${data.topics.length}\n- Soru: ${data.questions.length}\n- Flashcard: ${data.flashcards.length}\n- Timeline: ${data.timelineEvents.length}\n- Sözlük: ${data.glossary.length}\n\nEski \`@/data/kpss-history\` importları korunur; yeni geliştirmelerde doğrudan \`@/data/kpss\` kullanılabilir.\n`,
  );
}

function main() {
  const data = readMonolith();
  if (!data) return;

  removeDir(outRoot);
  ensureDir(outRoot);

  writeTopicModules(data.topics);
  writeGroupedModules({ exportName: "questions", typeName: "Question", folder: "questions", suffix: "Questions", items: data.questions, topics: data.topics });
  writeGroupedModules({ exportName: "flashcards", typeName: "Flashcard", folder: "flashcards", suffix: "Flashcards", items: data.flashcards, topics: data.topics });
  writeGroupedModules({ exportName: "timelineEvents", typeName: "TimelineEvent", folder: "timeline", suffix: "TimelineEvents", items: data.timelineEvents, topics: data.topics });
  writeGroupedModules({ exportName: "glossary", typeName: "Flashcard", folder: "glossary", suffix: "Glossary", items: data.glossary, topics: data.topics });
  writeFlatModule({ fileName: "exams", exportName: "exams", typeName: "Exam", items: data.exams });
  writeFlatModule({ fileName: "recommendations", exportName: "recommendations", typeName: "StudyRecommendation", items: data.recommendations });
  writeIndexAndBridge(data);

  log(`tamamlandı: ${data.topics.length} konu, ${data.questions.length} soru, ${data.flashcards.length} flashcard modüler dosyalara ayrıldı.`);
}

try {
  main();
} catch (error) {
  console.error(`[modularize-kpss-history] HATA: ${error.message}`);
  process.exit(1);
}
