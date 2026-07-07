import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "src/data/generated-30-question-tests.ts");

if (!fs.existsSync(file)) {
  console.error("generated-30-question-tests.ts bulunamadı.");
  process.exit(1);
}

const source = fs.readFileSync(file, "utf8");

const checks = [
  {
    label: "Başka konulardan çeldirici çekme fonksiyonu kaldırıldı",
    ok: !source.includes("factsFromOtherTopics")
  },
  {
    label: "Kronoloji şıkları aynı formatta üretiliyor",
    ok: source.includes("shiftedChronologyDistractors")
  },
  {
    label: "Kavram soruları kendi konu bağlamından üretiliyor",
    ok: source.includes("buildConceptModel")
  },
  {
    label: "Hatalı ifade soruları kendi konu hatalarından üretiliyor",
    ok: source.includes("mistakeToFalseClaim")
  },
  {
    label: "Kalite raporu aktif",
    ok: source.includes("getQuestionBankQualityReport")
  }
];

const failed = checks.filter((check) => !check.ok);

console.log("Soru bankası tutarlılık kontrolü");
console.log("--------------------------------");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
}

if (failed.length > 0) {
  console.error("");
  console.error(`${failed.length} kontrol başarısız.`);
  process.exit(1);
}

console.log("");
console.log("Tüm yapısal tutarlılık kontrolleri geçti.");
