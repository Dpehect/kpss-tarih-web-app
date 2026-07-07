import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const generatedFile = path.join(root, "src", "data", "generated-30-question-tests.ts");

if (!fs.existsSync(generatedFile)) {
  console.error("Bulunamadı:", path.relative(root, generatedFile));
  process.exit(1);
}

let source = fs.readFileSync(generatedFile, "utf8");
const match = source.match(/const\s+TESTS_PER_LEVEL\s*=\s*(\d+)\s*;/);

if (!match) {
  console.error("TESTS_PER_LEVEL sabiti bulunamadı.");
  process.exit(1);
}

const current = Number(match[1]);
const next = current >= 20 ? current : current * 2;

if (current === next) {
  console.log(`TESTS_PER_LEVEL zaten ${current}. Değişiklik yapılmadı.`);
} else {
  source = source.replace(/const\s+TESTS_PER_LEVEL\s*=\s*\d+\s*;/, `const TESTS_PER_LEVEL = ${next};`);
  fs.writeFileSync(generatedFile, source, "utf8");
  console.log(`TESTS_PER_LEVEL ${current} -> ${next} olarak güncellendi.`);
}

const filesToUpdate = [
  path.join(root, "src", "features", "question-bank", "components", "QuestionBankPage.tsx"),
  path.join(root, "src", "features", "question-bank", "components", "TopicQuestionPage.tsx"),
  path.join(root, "src", "app", "(main)", "question-bank", "[topicId]", "page.tsx")
];

const totalPerTopic = next * 3;
const questionsPerTopic = totalPerTopic * 30;
const totalTopicTests = totalPerTopic * 12;
const totalTopicQuestions = totalTopicTests * 30;

const replacements = [
  [/10\s+kolay/gi, `${next} kolay`],
  [/10\s+orta/gi, `${next} orta`],
  [/10\s+zor/gi, `${next} zor`],
  [/10\s+test/gi, `${next} test`],
  [/30\s+test/gi, `${totalPerTopic} test`],
  [/900\s+soru/gi, `${questionsPerTopic} soru`],
  [/360\s+test/gi, `${totalTopicTests} test`],
  [/10800\s+soru/gi, `${totalTopicQuestions} soru`],
  [/Her konu:\s*10 kolay \+ 10 orta \+ 10 zor/gi, `Her konu: ${next} kolay + ${next} orta + ${next} zor`],
  [/10 kolay \+ 10 orta \+ 10 zor/gi, `${next} kolay + ${next} orta + ${next} zor`]
];

for (const file of filesToUpdate) {
  if (!fs.existsSync(file)) continue;

  let text = fs.readFileSync(file, "utf8");
  const before = text;

  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, replacement);
  }

  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
    console.log("Metin güncellendi:", path.relative(root, file));
  }
}

console.log("");
console.log("Yeni soru bankası ölçeği:");
console.log(`- Seviye başına test: ${next}`);
console.log(`- Konu başına test: ${totalPerTopic}`);
console.log(`- Konu başına soru: ${questionsPerTopic}`);
console.log(`- 12 konu toplam test: ${totalTopicTests}`);
console.log(`- 12 konu toplam soru: ${totalTopicQuestions}`);
console.log(`- Karma testler: ${next} kolay + ${next} orta + ${next} zor`);
