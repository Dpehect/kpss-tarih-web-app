import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "src/data/kpss-history.ts",
  "src/data/static-questions.ts",
  "src/data/generated-30-question-tests.ts",
  "src/data/kpss-exam-blueprints.ts",
]
  .map((file) => path.join(root, file))
  .filter((file) => fs.existsSync(file));

const corpus = files.map((file) => fs.readFileSync(file, "utf8")).join("\n").toLocaleLowerCase("tr-TR");
const required = ["gazneli mahmut", "put kırıcı", "artuklular", "malabadi", "sened-i ittifak", "tanzimat", "i. meşrutiyet"];
const missing = required.filter((item) => !corpus.includes(item.toLocaleLowerCase("tr-TR")));

if (missing.length) {
  console.error(`[audit-question-bank-quality] Eksik kritik bilgi: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("[audit-question-bank-quality] Kritik KPSS bilgi kontrolleri geçti.");
