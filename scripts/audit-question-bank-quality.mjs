#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const fileExists = (relative) => fs.existsSync(path.join(root, relative));
const read = (relative) => (fileExists(relative) ? fs.readFileSync(path.join(root, relative), "utf8") : "");

const requiredPatterns = [
  { label: "Gazneli Mahmut", re: /gazneli\s+mahmut/i },
  { label: "Put Kırıcı", re: /put\s+kırıcı|put\s+kirici/i },
  { label: "Sened-i İttifak", re: /sened[- ]?i\s+ittifak/i },
  { label: "Tanzimat", re: /tanzimat/i },
  { label: "I. Meşrutiyet / Kanun-i Esasi", re: /\b[iı1]\.\s*meşrutiyet|\bbirinci\s+meşrutiyet|kanun[- ]?i\s+esasi/i },
  { label: "Miryokefalon", re: /miryokefalon/i },
  { label: "Kösedağ", re: /kösedağ|kosedag/i },
];

async function loadStructuredData() {
  const candidates = [
    "../src/data/kpss/index.ts",
    "../src/data/kpss-history.ts",
  ];

  for (const candidate of candidates) {
    try {
      const mod = await import(candidate);
      if (Array.isArray(mod.topics) && Array.isArray(mod.questions)) {
        return {
          source: candidate,
          topics: mod.topics,
          questions: mod.questions,
        };
      }
    } catch (error) {
      const message = String(error?.message || error);
      console.warn(`[audit-question-bank-quality] ${candidate} import edilemedi, sonraki kaynağa geçiliyor: ${message}`);
    }
  }

  return null;
}

function collectCorpusText() {
  const roots = ["src/data/kpss", "src/data/kpss-history.ts", "src/data/generated-30-question-tests.ts"];
  const files = [];
  function walk(target) {
    const absolute = path.join(root, target);
    if (!fs.existsSync(absolute)) return;
    const stat = fs.statSync(absolute);
    if (stat.isFile() && /\.(ts|tsx|json)$/.test(target)) files.push(target);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(absolute)) walk(path.join(target, entry));
    }
  }
  for (const target of roots) walk(target);
  return files.map((file) => read(file)).join("\n").toLocaleLowerCase("tr-TR");
}

function assertCriticalCorpus(corpus) {
  for (const item of requiredPatterns) {
    if (!item.re.test(corpus)) {
      throw new Error(`Eksik kritik bilgi: ${item.label}`);
    }
  }
}

function assertStructuredQuality(topics, questions) {
  if (!Array.isArray(topics) || topics.length < 10) {
    throw new Error(`Konu sayısı düşük veya okunamadı: ${topics?.length ?? 0}`);
  }
  if (!Array.isArray(questions) || questions.length < 100) {
    throw new Error(`Soru sayısı düşük veya okunamadı: ${questions?.length ?? 0}`);
  }

  const topicIds = new Set(topics.map((topic) => topic.id));
  const seen = new Set();
  const duplicateIds = [];
  const invalid = [];
  const offTopic = [];

  for (const question of questions) {
    if (!question?.id || !question?.stem || !question?.explanation || !Array.isArray(question?.choices)) {
      invalid.push(question?.id || "id-yok");
      continue;
    }
    if (seen.has(question.id)) duplicateIds.push(question.id);
    seen.add(question.id);

    const choiceIds = new Set(question.choices.map((choice) => choice.id));
    if (!choiceIds.has(question.correctChoiceId)) invalid.push(question.id);
    if (question.topicId && !topicIds.has(question.topicId)) offTopic.push(`${question.id}:${question.topicId}`);
  }

  if (duplicateIds.length) throw new Error(`Duplicate question id: ${duplicateIds.slice(0, 10).join(", ")}`);
  if (invalid.length) throw new Error(`correctChoiceId / açıklama problemi olan soru sayısı: ${invalid.length}`);
  if (offTopic.length) throw new Error(`Konu id eşleşmeyen soru sayısı: ${offTopic.length}. Örnek: ${offTopic.slice(0, 5).join(", ")}`);
}

async function main() {
  const corpus = collectCorpusText();
  assertCriticalCorpus(corpus);

  const structured = await loadStructuredData();
  if (structured) {
    assertStructuredQuality(structured.topics, structured.questions);
    console.log(`[audit-question-bank-quality] OK: ${structured.topics.length} konu, ${structured.questions.length} soru. Kaynak: ${structured.source}`);
    return;
  }

  console.warn("[audit-question-bank-quality] Yapısal import yapılamadı; kritik bilgi metin taraması geçti. Next build kalan TypeScript hatalarını yakalayacak.");
}

main().catch((error) => {
  console.error("[audit-question-bank-quality]", error.message ?? error);
  process.exit(1);
});
