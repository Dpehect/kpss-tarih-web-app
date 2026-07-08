#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataRoot = path.join(root, "src/data/kpss");
const manifestPath = path.join(dataRoot, "manifest.json");

function fail(message) {
  console.error(`[audit-modular-kpss-data] ${message}`);
  process.exit(1);
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

if (!fs.existsSync(manifestPath)) {
  fail("src/data/kpss/manifest.json bulunamadı. Önce scripts/modularize-kpss-history.mjs çalışmalı.");
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const counts = manifest.counts ?? {};

if ((counts.topics ?? 0) < 10) fail(`konu sayısı düşük: ${counts.topics}`);
if ((counts.questions ?? 0) < 100) fail(`soru sayısı düşük: ${counts.questions}`);
if ((counts.flashcards ?? 0) < 50) fail(`flashcard sayısı düşük: ${counts.flashcards}`);

const required = [
  "src/data/kpss/index.ts",
  "src/data/kpss/topics/index.ts",
  "src/data/kpss/questions/index.ts",
  "src/data/kpss/flashcards/index.ts",
  "src/data/kpss/timeline/index.ts",
  "src/data/kpss/glossary/index.ts",
  "src/data/kpss/exams.ts",
  "src/data/kpss/recommendations.ts",
];

for (const file of required) {
  if (!exists(file)) fail(`eksik dosya: ${file}`);
}

for (const topic of manifest.topicFiles ?? []) {
  const topicFile = `src/data/kpss/topics/${topic.file}`;
  if (!exists(topicFile)) fail(`eksik konu dosyası: ${topicFile}`);
}

const bridgePath = path.join(root, "src/data/kpss-history.ts");
const bridge = fs.existsSync(bridgePath) ? fs.readFileSync(bridgePath, "utf8") : "";
if (!bridge.includes("AUTO-GENERATED MODULAR DATA BRIDGE")) {
  fail("src/data/kpss-history.ts modular bridge olarak güncellenmemiş.");
}

console.log(
  `[audit-modular-kpss-data] OK: ${counts.topics} konu, ${counts.questions} soru, ${counts.flashcards} flashcard modüler yapıda.`,
);
