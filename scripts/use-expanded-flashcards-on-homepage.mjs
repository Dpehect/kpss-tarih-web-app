import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const file = path.join(root, "src/app/page.tsx");

if (!fs.existsSync(file)) {
  throw new Error("src/app/page.tsx bulunamadı.");
}

let source = fs.readFileSync(file, "utf8");

const expandedImport = 'import { expandedFlashcards as flashcards } from "@/data/expanded-flashcards";';

if (!source.includes(expandedImport)) {
  source = `${expandedImport}\n${source}`;
}

source = source.replace(
  /import\s*\{\s*([^}]*?)\s*\}\s*from\s*["']@\/data\/kpss-history["'];/g,
  (match, specifiers) => {
    const parts = specifiers
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    const withoutFlashcards = parts.filter((part) => part !== "flashcards" && !part.startsWith("flashcards as "));

    if (withoutFlashcards.length === 0) {
      return "";
    }

    return `import { ${withoutFlashcards.join(", ")} } from "@/data/kpss-history";`;
  }
);

source = source.replace(/\n{3,}/g, "\n\n");

fs.writeFileSync(file, source, "utf8");

console.log("Ana sayfa flashcard sayısı expandedFlashcards verisine bağlandı.");
console.log("Artık ana sayfadaki Kart istatistiği 48 yerine genişletilmiş kart sayısını gösterecek.");
