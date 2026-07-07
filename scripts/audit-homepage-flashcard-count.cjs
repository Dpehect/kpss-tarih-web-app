const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");

const root = process.cwd();
const homepage = path.join(root, "src/app/page.tsx");

if (!fs.existsSync(homepage)) {
  console.error("src/app/page.tsx bulunamadı.");
  process.exit(1);
}

const homepageSource = fs.readFileSync(homepage, "utf8");

if (!homepageSource.includes("@/data/expanded-flashcards")) {
  console.error("Ana sayfa hâlâ expanded-flashcards kullanmıyor.");
  process.exit(1);
}

if (/import\s*\{[^}]*flashcards[^}]*\}\s*from\s*["']@\/data\/kpss-history["']/.test(homepageSource)) {
  console.error("Ana sayfada hâlâ eski kpss-history flashcards import'u var.");
  process.exit(1);
}

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
      if (fs.existsSync(candidate)) return candidate;
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

const expanded = require(path.join(root, "src/data/expanded-flashcards.ts"));

if (!Array.isArray(expanded.expandedFlashcards)) {
  console.error("expandedFlashcards export'u bulunamadı.");
  process.exit(1);
}

console.log("Ana sayfa flashcard sayısı kontrolü");
console.log("===================================");
console.log(`Ana sayfanın kullandığı kart sayısı: ${expanded.expandedFlashcards.length}`);

if (expanded.expandedFlashcards.length <= 48) {
  console.error("Kart sayısı hâlâ 48 veya daha az görünüyor.");
  process.exit(1);
}

console.log("✓ Ana sayfa genişletilmiş kart sayısını kullanıyor.");
