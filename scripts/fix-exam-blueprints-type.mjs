import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const filePath = path.join(root, "src/data/kpss-exam-blueprints.ts");

if (!fs.existsSync(filePath)) {
  console.error("src/data/kpss-exam-blueprints.ts bulunamadi. Bu komutu proje kok klasorunde calistir.");
  process.exit(1);
}

let source = fs.readFileSync(filePath, "utf8");

const fixedLine = "const pool = expandedQuestions as Array<Record<string, unknown> & { topicId: string }>;";

if (source.includes(fixedLine)) {
  console.log("src/data/kpss-exam-blueprints.ts zaten typefix uygulanmis.");
  process.exit(0);
}

const exact = `function getQuestionPool(topicId: string) {
  return expandedQuestions.filter((question) => question.topicId === topicId);
}`;

const replacement = `function getQuestionPool(topicId: string) {
  ${fixedLine}
  return pool.filter((question) => question.topicId === topicId);
}`;

if (source.includes(exact)) {
  source = source.replace(exact, replacement);
} else {
  const pattern = /function\s+getQuestionPool\s*\(\s*topicId:\s*string\s*\)\s*\{\s*return\s+expandedQuestions\.filter\(\s*\(\s*question\s*\)\s*=>\s*question\.topicId\s*===\s*topicId\s*\)\s*;\s*\}/m;

  if (!pattern.test(source)) {
    console.error("getQuestionPool fonksiyonu beklenen formatta bulunamadi. Dosyanin ilgili hata kismini bana gonder.");
    process.exit(1);
  }

  source = source.replace(pattern, replacement);
}

fs.writeFileSync(filePath, source, "utf8");
console.log("src/data/kpss-exam-blueprints.ts typefix tamamlandi.");
