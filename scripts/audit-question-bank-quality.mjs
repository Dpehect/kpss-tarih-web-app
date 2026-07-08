import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const candidateFiles = [
  "src/data/kpss-history.ts",
  "src/data/static-questions.ts",
  "src/data/generated-30-question-tests.ts",
  "src/data/kpss-exam-blueprints.ts",
  "src/lib/ai/kpss-tutor.ts",
];

const existingFiles = candidateFiles
  .map((file) => path.join(root, file))
  .filter((file) => fs.existsSync(file));

if (!existingFiles.length) {
  console.error("[audit-question-bank-quality] Veri dosyası bulunamadı.");
  process.exit(1);
}

const rawCorpus = existingFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");

function normalizeText(value) {
  return String(value)
    .replace(/\\n/g, " ")
    .replace(/\r?\n/g, " ")
    .toLocaleLowerCase("tr-TR")
    // Turkish locale lowercases ASCII I as dotless ı. For audit matching we normalize ı/i.
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9çğıöşü\s.-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const corpus = normalizeText(rawCorpus);

function hasAny(variants) {
  return variants.some((variant) => corpus.includes(normalizeText(variant)));
}

const requiredGroups = [
  {
    label: "Gazneli Mahmut",
    variants: ["gazneli mahmut", "gazneli sultan mahmut", "sultan mahmut", "gazneli mahmud"],
  },
  {
    label: "Put Kırıcı",
    variants: ["put kırıcı", "put kirici", "putkırıcı", "putkirici"],
  },
  {
    label: "Artuklular",
    variants: ["artuklular", "artuklu"],
  },
  {
    label: "Malabadi Köprüsü",
    variants: ["malabadi", "malabadi köprüsü", "malabadi koprusu"],
  },
  {
    label: "Sened-i İttifak",
    variants: ["sened-i ittifak", "senedi ittifak", "sened i ittifak"],
  },
  {
    label: "Tanzimat",
    variants: ["tanzimat", "tanzimat fermanı", "tanzimat fermani"],
  },
  {
    label: "I. Meşrutiyet / Kanun-i Esasi",
    variants: [
      "I. Meşrutiyet",
      "i. meşrutiyet",
      "1. Meşrutiyet",
      "Birinci Meşrutiyet",
      "Kanun-i Esasi",
      "Kanuni Esasi",
      "1876 Meşrutiyet",
    ],
  },
  {
    label: "Miryokefalon",
    variants: ["miryokefalon", "myriokephalon"],
  },
  {
    label: "Kösedağ",
    variants: ["kösedağ", "kosedag"],
  },
  {
    label: "Lozan",
    variants: ["lozan", "lozan barış", "lozan baris"],
  },
];

const missing = requiredGroups
  .filter((group) => !hasAny(group.variants))
  .map((group) => group.label);

const correctChoiceCount = (rawCorpus.match(/correctChoiceId\s*:/g) || []).length;
const explanationCount = (rawCorpus.match(/explanation\s*:/g) || []).length;

const problems = [];
if (missing.length) {
  problems.push(`Eksik kritik bilgi: ${missing.join(", ")}`);
}

if (correctChoiceCount < 50) {
  problems.push(`Soru havuzu zayıf görünüyor: correctChoiceId sayısı ${correctChoiceCount}. En az 50 bekleniyor.`);
}

if (explanationCount < 50) {
  problems.push(`Açıklamalı soru sayısı zayıf görünüyor: explanation sayısı ${explanationCount}. En az 50 bekleniyor.`);
}

// High-risk factual guards. These are intentionally broad and Turkish-locale-safe.
const putKiriciOk = corpus.includes("put kirici") && corpus.includes("gazneli mahmut");
if (!putKiriciOk) {
  problems.push("Put Kırıcı bilgisinin Gazneli Mahmut ile birlikte bulunduğu doğrulanamadı.");
}

const mesrutiyetOk = hasAny(["sened-i ittifak"]) && hasAny(["tanzimat"]) && hasAny(["I. Meşrutiyet", "Kanun-i Esasi", "Birinci Meşrutiyet"]);
if (!mesrutiyetOk) {
  problems.push("Osmanlı demokratikleşme kronolojisi için Sened-i İttifak/Tanzimat/I. Meşrutiyet ekseni doğrulanamadı.");
}

if (problems.length) {
  for (const problem of problems) {
    console.error(`[audit-question-bank-quality] ${problem}`);
  }
  process.exit(1);
}

console.log(
  `[audit-question-bank-quality] OK: Kritik KPSS bilgiler, Türkçe I/İ uyumluluğu, ${correctChoiceCount} correctChoiceId ve ${explanationCount} açıklama kontrolü geçti.`
);
