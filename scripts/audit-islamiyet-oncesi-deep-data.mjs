#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const topicPath = path.join(root, "src/data/kpss/topics/islamiyet-oncesi-turk-tarihi.ts");
const questionPath = path.join(root, "src/data/kpss/questions/islamiyet-oncesi-turk-tarihi.ts");

function fail(message) {
  console.error(`[audit-islamiyet-oncesi] ${message}`);
  process.exit(1);
}
function read(file) {
  if (!fs.existsSync(file)) fail(`eksik dosya: ${path.relative(root, file)}`);
  return fs.readFileSync(file, "utf8");
}
function extract(source, exportName) {
  const marker = `export const ${exportName}`;
  const index = source.indexOf(marker);
  if (index === -1) fail(`export yok: ${exportName}`);
  const equals = source.indexOf("=", index);
  const firstObject = source.indexOf("{", equals);
  const firstArray = source.indexOf("[", equals);
  const start = firstArray !== -1 && (firstObject === -1 || firstArray < firstObject) ? firstArray : firstObject;
  const opener = source[start];
  const closer = opener === "[" ? "]" : "}";
  let depth = 0, quote = null, escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === "\\") { escaped = true; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { quote = ch; continue; }
    if (ch === opener) depth += 1;
    if (ch === closer) {
      depth -= 1;
      if (depth === 0) return JSON.parse(source.slice(start, i + 1));
    }
  }
  fail(`literal okunamadı: ${exportName}`);
}

const topic = extract(read(topicPath), "islamiyetOncesiTurkTarihiTopic");
const questions = extract(read(questionPath), "islamiyetOncesiTurkTarihiQuestions");
const combined = `${JSON.stringify(topic)} ${JSON.stringify(questions)}`.toLocaleLowerCase("tr-TR");

const required = [
  "asya hun", "mete han", "onlu sistem", "göktürk", "orhun yazıtları", "uygurlar", "kut", "töre", "kurultay", "ikili teşkilat", "balbal", "yuğ", "kurgan", "gök tanrı", "kavimler göçü", "hazar", "kırgız", "türgiş", "karluk"
];
for (const token of required) {
  if (!combined.includes(token.toLocaleLowerCase("tr-TR"))) fail(`kritik bilgi eksik: ${token}`);
}
if ((topic.summary ?? []).length < 12) fail("konu anlatımı yeterince derin değil: summary bölümü 12'den az");
if (questions.length < 45) fail(`soru sayısı düşük: ${questions.length}`);
for (const q of questions) {
  if (!q.correctChoiceId) fail(`correctChoiceId eksik: ${q.id}`);
  if (!q.explanation || q.explanation.length < 50) fail(`açıklama zayıf: ${q.id}`);
  if (!q.choices?.some((c) => c.id === q.correctChoiceId)) fail(`correctChoiceId choices içinde yok: ${q.id}`);
}
console.log(`[audit-islamiyet-oncesi] OK: ${topic.summary.length} anlatım bölümü, ${questions.length} kontrollü soru.`);
