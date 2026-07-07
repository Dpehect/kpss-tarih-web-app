import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const sourceDirs = [
  path.join(root, "src/app"),
  path.join(root, "src/components"),
  path.join(root, "src/features")
];

const extensions = new Set([".ts", ".tsx"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(full);
    }
  }

  return files;
}

function patchImport(source) {
  const importRegex = /import\s*\{\s*([^}]+?)\s*\}\s*from\s*["']@\/data\/kpss-history["'];/g;
  let needsExpandedImport = false;

  const next = source.replace(importRegex, (match, specifiers) => {
    const parts = specifiers
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    const hasFlashcards = parts.some((part) => part === "flashcards" || part.startsWith("flashcards as "));

    if (!hasFlashcards) return match;

    needsExpandedImport = true;

    const remaining = parts.filter((part) => part !== "flashcards" && !part.startsWith("flashcards as "));

    if (remaining.length === 0) {
      return "";
    }

    return `import { ${remaining.join(", ")} } from "@/data/kpss-history";`;
  });

  if (!needsExpandedImport) return source;

  if (next.includes('from "@/data/expanded-flashcards"') || next.includes("from '@/data/expanded-flashcards'")) {
    return next;
  }

  return `import { expandedFlashcards as flashcards } from "@/data/expanded-flashcards";\n${next}`;
}

let changed = 0;

for (const file of sourceDirs.flatMap(walk)) {
  const before = fs.readFileSync(file, "utf8");

  if (!before.includes("@/data/kpss-history") || !before.includes("flashcards")) {
    continue;
  }

  const after = patchImport(before)
    .replaceAll("20 flashcard", "genişletilmiş flashcard")
    .replaceAll("20 Flashcard", "Genişletilmiş flashcard");

  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed += 1;
    console.log(`Güncellendi: ${path.relative(root, file)}`);
  }
}

console.log(`Expanded flashcards import dönüşümü tamamlandı. Güncellenen dosya: ${changed}`);
