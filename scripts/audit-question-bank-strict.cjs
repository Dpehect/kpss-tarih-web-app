const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");

const root = process.cwd();

let ts;
try {
  ts = require("typescript");
} catch {
  console.error("TypeScript paketi bulunamadı. Önce npm install çalıştır.");
  process.exit(1);
}

const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function patchedResolve(request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    const mapped = path.join(root, "src", request.slice(2));
    const candidates = [
      mapped,
      `${mapped}.ts`,
      `${mapped}.tsx`,
      path.join(mapped, "index.ts"),
      path.join(mapped, "index.tsx")
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};

require.extensions[".ts"] = function compileTs(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      skipLibCheck: true
    },
    fileName: filename
  }).outputText;

  module._compile(output, filename);
};

require.extensions[".tsx"] = require.extensions[".ts"];

const bankPath = path.join(root, "src/data/generated-30-question-tests.ts");
const bank = require(bankPath);

if (typeof bank.getStrictQuestionBankAuditReport !== "function") {
  console.error("getStrictQuestionBankAuditReport export'u bulunamadı.");
  process.exit(1);
}

const report = bank.getStrictQuestionBankAuditReport();

console.log("Softbridge soru bankası sıkı denetim raporu");
console.log("===========================================");
console.log(`Konu sayısı: ${report.constants.topicCount}`);
console.log(`Konu testleri: ${report.constants.topicTestCount}`);
console.log(`Karma testler: ${report.constants.mixedTestCount}`);
console.log(`Toplam test: ${report.constants.allTestCount}`);
console.log(`Üretilen konu sorusu: ${report.constants.expandedQuestionCount}`);
console.log(`Test başına soru: ${report.constants.QUESTIONS_PER_TEST}`);
console.log(`Seviye başına test: ${report.constants.TESTS_PER_LEVEL}`);
console.log("");

if (report.warnings.length > 0) {
  console.log(`Uyarı: ${report.warnings.length}`);
  for (const warning of report.warnings.slice(0, 25)) {
    console.log(`- ${warning}`);
  }

  if (report.warnings.length > 25) {
    console.log(`... ${report.warnings.length - 25} uyarı daha var.`);
  }

  console.log("");
}

if (!report.ok) {
  console.error(`Hata: ${report.errors.length}`);
  for (const error of report.errors.slice(0, 50)) {
    console.error(`- ${error}`);
  }

  if (report.errors.length > 50) {
    console.error(`... ${report.errors.length - 50} hata daha var.`);
  }

  process.exit(1);
}

console.log("✓ Tüm sıkı denetimler geçti.");
console.log("✓ Soru sayısı azalmadı.");
console.log("✓ Her soruda 4 benzersiz şık var.");
console.log("✓ Her soruda doğru cevap id'si geçerli.");
console.log("✓ Kronoloji sorularında bütün şıklar tarih-olay formatında.");
console.log("✓ Şıklar konu başlığıyla aynı bağlamda üretiliyor.");
console.log("✓ Açıklama ve ipuçları boş/zayıf değil.");
