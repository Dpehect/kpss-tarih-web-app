const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

const required = [
  "supabase-export/content_topics.json",
  "supabase-export/content_tests.json",
  "supabase-export/content_questions.json",
  "supabase-export/content_question_choices.json",
  "supabase-export/content_flashcards.json",
  "supabase-export/content_timeline_events.json",
  "scripts/upload-content-to-supabase.cjs"
];

console.log("Supabase upload hazırlık denetimi");
console.log("=================================");

let failed = 0;

for (const relative of required) {
  const full = path.join(root, relative);
  const exists = fs.existsSync(full);

  console.log(`${exists ? "✓" : "✗"} ${relative}`);

  if (!exists) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} dosya eksik.`);
  process.exit(1);
}

const files = required.filter((item) => item.endsWith(".json"));

console.log("");
console.log("Export satır sayıları");
console.log("---------------------");

for (const relative of files) {
  const rows = JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));

  if (!Array.isArray(rows)) {
    console.error(`${relative} array değil.`);
    process.exit(1);
  }

  console.log(`${relative}: ${rows.length}`);
}

console.log("");
console.log("✓ Upload hazırlığı tamam.");
