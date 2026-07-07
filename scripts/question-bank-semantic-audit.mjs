import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const file = path.join(root, "src", "data", "generated-30-question-tests.ts");

if (!fs.existsSync(file)) {
  console.error("Bulunamadı:", path.relative(root, file));
  process.exit(1);
}

const source = fs.readFileSync(file, "utf8");

const checks = [];
const failures = [];

function ok(label) {
  checks.push(`✓ ${label}`);
}

function fail(label) {
  failures.push(`✗ ${label}`);
}

if (/export\s+const\s+TESTS_PER_LEVEL\s*=\s*20\s*;/.test(source)) ok("20 test/seviye sabiti doğru");
else fail("TESTS_PER_LEVEL 20 değil");

if (/export\s+const\s+QUESTIONS_PER_TEST\s*=\s*30\s*;/.test(source)) ok("30 soru/test sabiti doğru");
else fail("QUESTIONS_PER_TEST 30 değil");

if (source.includes("factsFromOtherTopics") && source.includes("plausibleWrongChoices")) {
  ok("Çeldiriciler başka konuların gerçek bilgilerinden üretiliyor");
} else {
  fail("Çeldirici üretimi yeterince anlamlı değil");
}

if (source.includes("bannedArtificialPhrases")) ok("Yapay/saçma kalıp kontrol listesi var");
else fail("Yapay/saçma kalıp kontrol listesi yok");

const banned = [
  "alfabetik",
  "coğrafya dersi",
  "güncel yorum",
  "paragrafın uzunluğu",
  "tamamen kopuk",
  "hiçbir işlevi yoktur",
  "tüm tarih soruları",
  "her soru çözülebilir",
  "dikkate alınmamalıdır"
];

for (const phrase of banned) {
  const regex = new RegExp(`["'\`]([^"'\`]*${phrase}[^"'\`]*)["'\`]`, "i");

  if (regex.test(source)) fail(`Kaynak içinde doğrudan yapay ifade var: ${phrase}`);
}

if (source.includes("getQuestionBankQualityReport")) ok("Runtime kalite raporu fonksiyonu var");
else fail("Runtime kalite raporu fonksiyonu yok");

if (source.includes("naturalizeMistake")) ok("Sık hata metinleri doğal dile çevriliyor");
else fail("Sık hata metni doğal dil dönüşümü yok");

if (failures.length > 0) {
  console.error("\nAnlam kontrolü başarısız:\n");
  console.error(failures.join("\n"));
  console.error("\nGeçen kontroller:\n");
  console.error(checks.join("\n"));
  process.exit(1);
}

console.log("\nAnlam kontrolü geçti:\n");
console.log(checks.join("\n"));
