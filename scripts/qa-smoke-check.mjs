import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "src/app/(main)/search/page.tsx",
  "src/features/search/components/SearchPage.tsx",
  "src/lib/search/global-search.ts",
  "src/app/(main)/past-questions/page.tsx",
  "src/features/past-questions/components/PastQuestionsPage.tsx",
  "src/data/past-questions.ts",
  "src/features/flashcards/components/FlashcardTrainer.tsx"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(process.cwd(), file)));

if (missing.length) {
  console.error("Eksik dosyalar:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const topNav = fs.readFileSync(path.join(process.cwd(), "src/components/core/TopNav.tsx"), "utf8");
if (!topNav.includes('action="/search"')) {
  console.error("TopNav arama formu /search route'una bağlı değil.");
  process.exit(1);
}

const sidebar = fs.readFileSync(path.join(process.cwd(), "src/components/core/Sidebar.tsx"), "utf8");
if (!sidebar.includes("/past-questions")) {
  console.error("Sidebar içinde /past-questions linki bulunamadı.");
  process.exit(1);
}

const flashcard = fs.readFileSync(path.join(process.cwd(), "src/features/flashcards/components/FlashcardTrainer.tsx"), "utf8");
if (flashcard.includes("rotate = useTransform")) {
  console.error("Flashcard drag rotation hâlâ duruyor.");
  process.exit(1);
}

console.log("QA smoke-check başarılı.");
