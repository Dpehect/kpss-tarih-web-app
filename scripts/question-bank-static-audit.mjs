import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checks = [];
const failures = [];

function read(relativePath) {
  const absolute = path.join(root, relativePath);

  if (!fs.existsSync(absolute)) {
    failures.push(`Dosya bulunamadı: ${relativePath}`);
    return "";
  }

  return fs.readFileSync(absolute, "utf8");
}

function pass(label) {
  checks.push(`✓ ${label}`);
}

function fail(label) {
  failures.push(`✗ ${label}`);
}

const generated = read("src/data/generated-30-question-tests.ts");
const topicPage = read("src/features/question-bank/components/TopicQuestionPage.tsx");
const runner = read("src/features/question-bank/components/TopicQuestionRunner.tsx");

if (/export\s+const\s+TESTS_PER_LEVEL\s*=\s*20\s*;/.test(generated)) pass("TESTS_PER_LEVEL 20");
else fail("TESTS_PER_LEVEL 20 değil");

if (/export\s+const\s+QUESTIONS_PER_TEST\s*=\s*30\s*;/.test(generated)) pass("QUESTIONS_PER_TEST 30");
else fail("QUESTIONS_PER_TEST 30 değil");

if (generated.includes("getQuestionBankQualityReport")) pass("Kalite raporu fonksiyonu var");
else fail("Kalite raporu fonksiyonu yok");

if (generated.includes("mixedTests") && generated.includes('topicId: "all"')) pass("Karma test üretimi var");
else fail("Karma test üretimi eksik");

if (!topicPage.includes("300 soru") && !topicPage.includes("10 test")) pass("TopicQuestionPage sabit 10/300 metni içermiyor");
else fail("TopicQuestionPage içinde eski 10 test / 300 soru metni var");

if (topicPage.includes("tests.length * QUESTIONS_PER_TEST")) pass("Seviye soru sayısı dinamik hesaplanıyor");
else fail("Seviye soru sayısı dinamik değil");

if (runner.includes("selectedChoices") && runner.includes("goNextUnanswered")) pass("Runner cevapları koruyor ve cevapsız soruya geçiyor");
else fail("Runner işleyiş hardening eksik");

if (failures.length > 0) {
  console.error("\nSoru bankası kalite kontrol başarısız:\n");
  console.error(failures.join("\n"));
  console.error("\nGeçen kontroller:\n");
  console.error(checks.join("\n"));
  process.exit(1);
}

console.log("\nSoru bankası statik kalite kontrol geçti:\n");
console.log(checks.join("\n"));
