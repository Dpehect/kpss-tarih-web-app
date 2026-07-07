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

const flashcardModule = require(path.join(root, "src/data/expanded-flashcards.ts"));

if (typeof flashcardModule.getExpandedFlashcardAuditReport !== "function") {
  console.error("getExpandedFlashcardAuditReport export'u bulunamadı.");
  process.exit(1);
}

const report = flashcardModule.getExpandedFlashcardAuditReport();

console.log("Softbridge genişletilmiş flashcard denetimi");
console.log("===========================================");
console.log(`Eski kart sayısı: ${report.constants.baseFlashcardCount}`);
console.log(`Üretilen yeni kart: ${report.constants.generatedFlashcardCount}`);
console.log(`Toplam kart: ${report.constants.expandedFlashcardCount}`);
console.log(`Konu sayısı: ${report.constants.topicCount}`);
console.log(`Konu başına minimum üretilen kart: ${report.constants.minGeneratedCardsPerTopic}`);
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

console.log("✓ Kart sayısı en az iki katına çıkarıldı.");
console.log("✓ Her kart geçerli bir konuya bağlı.");
console.log("✓ Ön yüz, arka yüz ve ipuçları boş/zayıf değil.");
console.log("✓ Konu başına yeterli yeni kart üretildi.");
console.log("✓ Kavram, özet, timeline ve sık hata kartları birlikte üretildi.");
