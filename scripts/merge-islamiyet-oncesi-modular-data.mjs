#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const historyPath = path.join(root, "src/data/kpss-history.ts");
const modularRoot = path.join(root, "src/data/kpss");
const topicId = "islamiyet-oncesi";

function log(message) {
  console.log(`[merge-islamiyet-oncesi] ${message}`);
}

function fail(message) {
  console.error(`[merge-islamiyet-oncesi] ${message}`);
  process.exit(1);
}

function findBalanced(source, startIndex) {
  const opener = source[startIndex];
  const closer = opener === "[" ? "]" : "}";
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let i = startIndex; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
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
      lineComment = true;
      i += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      blockComment = true;
      i += 1;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === opener) depth += 1;
    if (char === closer) {
      depth -= 1;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

function readExportLiteral(relativePath, exportName) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) fail(`modüler veri dosyası yok: ${relativePath}`);
  const source = fs.readFileSync(filePath, "utf8");
  const marker = `export const ${exportName}`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) fail(`export bulunamadı: ${exportName}`);
  const equalsIndex = source.indexOf("=", markerIndex);
  if (equalsIndex === -1) fail(`export ataması bulunamadı: ${exportName}`);
  const firstObject = source.indexOf("{", equalsIndex);
  const firstArray = source.indexOf("[", equalsIndex);
  const start = firstArray !== -1 && (firstObject === -1 || firstArray < firstObject) ? firstArray : firstObject;
  if (start === -1) fail(`literal başlangıcı bulunamadı: ${exportName}`);
  const end = findBalanced(source, start);
  if (end === -1) fail(`literal sonu bulunamadı: ${exportName}`);
  const literal = source.slice(start, end);
  try {
    return JSON.parse(literal);
  } catch (error) {
    fail(`${exportName} JSON literal olarak okunamadı: ${error.message}`);
  }
}

function extractArray(source, exportName) {
  const pattern = new RegExp(`export\\s+const\\s+${exportName}(?:\\s*:[^=]+)?\\s*=\\s*\\[`, "m");
  const match = pattern.exec(source);
  if (!match) return { value: [], start: -1, end: -1, prefix: null };
  const start = match.index + match[0].lastIndexOf("[");
  const end = findBalanced(source, start);
  if (end === -1) fail(`${exportName} array sonu bulunamadı.`);
  const literal = source.slice(start, end);
  let value;
  try {
    value = Function(`"use strict"; return (${literal});`)();
  } catch (error) {
    fail(`${exportName} array parse edilemedi: ${error.message}`);
  }
  return { value, start, end, prefix: source.slice(match.index, start) };
}

function replaceArray(source, exportName, newValue) {
  const extracted = extractArray(source, exportName);
  if (extracted.start === -1) {
    const typeMap = {
      topics: "Topic[]",
      questions: "Question[]",
      flashcards: "Flashcard[]",
      timelineEvents: "TimelineEvent[]",
      glossary: "any[]",
    };
    const typeName = typeMap[exportName] ?? "any[]";
    return `${source.trim()}\n\nexport const ${exportName}: ${typeName} = ${JSON.stringify(newValue, null, 2)};\n`;
  }
  return `${source.slice(0, extracted.start)}${JSON.stringify(newValue, null, 2)}${source.slice(extracted.end)}`;
}

function mergeByTopic(existing, incoming) {
  const kept = Array.isArray(existing) ? existing.filter((item) => item?.topicId !== topicId && item?.id !== topicId && item?.slug !== "islamiyet-oncesi-turk-tarihi") : [];
  return [...incoming, ...kept];
}

function uniqueById(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const id = item?.id ?? JSON.stringify(item);
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(item);
  }
  return out;
}

if (!fs.existsSync(historyPath)) fail("src/data/kpss-history.ts bulunamadı.");
let history = fs.readFileSync(historyPath, "utf8");

const deepTopic = readExportLiteral("src/data/kpss/topics/islamiyet-oncesi-turk-tarihi.ts", "islamiyetOncesiTurkTarihiTopic");
const deepQuestions = readExportLiteral("src/data/kpss/questions/islamiyet-oncesi-turk-tarihi.ts", "islamiyetOncesiTurkTarihiQuestions");
const deepFlashcards = readExportLiteral("src/data/kpss/flashcards/islamiyet-oncesi-turk-tarihi.ts", "islamiyetOncesiTurkTarihiFlashcards");
const deepTimeline = readExportLiteral("src/data/kpss/timeline/islamiyet-oncesi-turk-tarihi.ts", "islamiyetOncesiTurkTarihiTimeline");
const deepGlossary = readExportLiteral("src/data/kpss/glossary/islamiyet-oncesi-turk-tarihi.ts", "islamiyetOncesiTurkTarihiGlossary");

const topicsData = extractArray(history, "topics").value;
const questionsData = extractArray(history, "questions").value;
const flashcardsData = extractArray(history, "flashcards").value;
const timelineData = extractArray(history, "timelineEvents").value;
const glossaryData = extractArray(history, "glossary").value;

history = replaceArray(history, "topics", uniqueById([deepTopic, ...topicsData.filter((topic) => topic?.id !== topicId && topic?.slug !== deepTopic.slug)]));
history = replaceArray(history, "questions", uniqueById(mergeByTopic(questionsData, deepQuestions)));
history = replaceArray(history, "flashcards", uniqueById(mergeByTopic(flashcardsData, deepFlashcards)));
history = replaceArray(history, "timelineEvents", uniqueById(mergeByTopic(timelineData, deepTimeline)));
history = replaceArray(history, "glossary", uniqueById(mergeByTopic(glossaryData, deepGlossary)));

fs.writeFileSync(historyPath, history, "utf8");
log(`OK: ${deepTopic.summary?.length ?? 0} anlatım bölümü, ${deepQuestions.length} soru, ${deepFlashcards.length} flashcard, ${deepTimeline.length} timeline, ${deepGlossary.length} kavram monolith veri havuzuna işlendi.`);
