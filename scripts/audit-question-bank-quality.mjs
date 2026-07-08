import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const historyPath = path.join(root, "src/data/kpss-history.ts");
const testsPath = path.join(root, "src/data/generated-30-question-tests.ts");

const history = fs.readFileSync(historyPath, "utf8");
const tests = fs.readFileSync(testsPath, "utf8");

const failures = [];

function mustInclude(label, value) {
  if (!history.includes(value) && !tests.includes(value)) failures.push(`${label}: ${value} bulunamadı`);
}

mustInclude("Put Kırıcı doğrusu", "Gazneli Mahmut");
mustInclude("Artuklular ayrımı", "Malabadi Köprüsü");
mustInclude("Kronoloji doğrusu", "Sened-i İttifak");
mustInclude("Kronoloji doğrusu", "Tanzimat Fermanı");
mustInclude("Kronoloji doğrusu", "I. Meşrutiyet");

if (/Put Kırıcı[\s\S]{0,240}Artuklular/.test(history)) {
  failures.push("Put Kırıcı bilgisi Artuklularla yanlış eşleşmiş görünüyor.");
}

const questionCount = (history.match(/stem:/g) ?? []).length + (history.match(/"stem"\s*:/g) ?? []).length;
if (questionCount < 50) failures.push(`Soru sayısı düşük görünüyor: ${questionCount}`);

if (!tests.includes("getQuestionBankQualityReport")) {
  failures.push("Soru bankası kalite raporu fonksiyonu yok.");
}

if (failures.length) {
  console.error("[audit-question-bank-quality] Hata:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`[audit-question-bank-quality] OK · ${questionCount} soru tanımı ve kritik KPSS doğruları kontrol edildi.`);
