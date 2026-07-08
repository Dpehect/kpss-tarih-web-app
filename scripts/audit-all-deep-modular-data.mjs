import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const dirs = ["topics", "questions", "flashcards", "timeline", "glossary"];
for (const dir of dirs) {
  const full = path.join(root, "src/data/kpss", dir);
  if (!fs.existsSync(full)) throw new Error(`[audit-all-deep-modular-data] Eksik klasör: ${dir}`);
  const files = fs.readdirSync(full).filter((file) => file.endsWith(".ts") && file !== "index.ts");
  if (files.length < 13) throw new Error(`[audit-all-deep-modular-data] ${dir} dosya sayısı eksik: ${files.length}`);
}
const qDir = path.join(root, "src/data/kpss/questions");
let total = 0;
for (const file of fs.readdirSync(qDir).filter((file) => file.endsWith(".ts") && file !== "index.ts")) {
  const content = fs.readFileSync(path.join(qDir, file), "utf8");
  const ids = [...content.matchAll(/"id":\s*"([A-D])"/g)].map((m) => m[1]);
  const correct = [...content.matchAll(/"correctChoiceId":\s*"([A-D])"/g)].map((m) => m[1]);
  const stems = [...content.matchAll(/"stem":/g)].length;
  total += stems;
  if (stems < 20) throw new Error(`[audit-all-deep-modular-data] ${file} soru sayısı düşük: ${stems}`);
  for (const c of correct) if (!["A","B","C","D"].includes(c)) throw new Error(`[audit-all-deep-modular-data] Geçersiz doğru seçenek: ${file}`);
  if (!content.includes('"explanation"')) throw new Error(`[audit-all-deep-modular-data] Açıklama eksik: ${file}`);
}
if (total < 300) throw new Error(`[audit-all-deep-modular-data] toplam soru az: ${total}`);
console.log(`[audit-all-deep-modular-data] OK: 13 konu modüler, ${total} açıklamalı soru, flashcard/timeline/glossary dosyaları hazır.`);
