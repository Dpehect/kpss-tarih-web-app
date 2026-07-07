import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const files = {
  generated: path.join(root, "src", "data", "generated-30-question-tests.ts"),
  questionBankPage: path.join(root, "src", "features", "question-bank", "components", "QuestionBankPage.tsx"),
  topicQuestionPage: path.join(root, "src", "features", "question-bank", "components", "TopicQuestionPage.tsx")
};

function read(file) {
  if (!fs.existsSync(file)) {
    console.warn("Bulunamadı:", path.relative(root, file));
    return "";
  }

  return fs.readFileSync(file, "utf8");
}

function writeIfChanged(file, before, after) {
  if (!before || before === after) return false;

  fs.writeFileSync(file, after, "utf8");
  console.log("Güncellendi:", path.relative(root, file));
  return true;
}

const TESTS_PER_LEVEL = 20;
const QUESTIONS_PER_TEST = 30;
const TOTAL_PER_TOPIC = TESTS_PER_LEVEL * 3;
const QUESTIONS_PER_LEVEL = TESTS_PER_LEVEL * QUESTIONS_PER_TEST;
const QUESTIONS_PER_TOPIC = TOTAL_PER_TOPIC * QUESTIONS_PER_TEST;

// 1) Data üretimini doğrudan 20'ye zorla.
{
  const file = files.generated;
  const before = read(file);
  let after = before;

  after = after.replace(
    /const\s+TESTS_PER_LEVEL\s*=\s*\d+\s*;/,
    `const TESTS_PER_LEVEL = ${TESTS_PER_LEVEL};`
  );

  after = after.replace(
    /const\s+QUESTIONS_PER_TEST\s*=\s*\d+\s*;/,
    `const QUESTIONS_PER_TEST = ${QUESTIONS_PER_TEST};`
  );

  writeIfChanged(file, before, after);
}

// 2) Ana soru bankası kartındaki sabit "30 test" metnini dinamik yap.
{
  const file = files.questionBankPage;
  const before = read(file);
  let after = before;

  after = after.replaceAll("30 test", `${TOTAL_PER_TOPIC} test`);
  after = after.replaceAll("900 soru", `${QUESTIONS_PER_TOPIC} soru`);
  after = after.replaceAll("10 kolay", `${TESTS_PER_LEVEL} kolay`);
  after = after.replaceAll("10 orta", `${TESTS_PER_LEVEL} orta`);
  after = after.replaceAll("10 zor", `${TESTS_PER_LEVEL} zor`);

  writeIfChanged(file, before, after);
}

// 3) Zorluk seçim kartındaki sabit "300 soru" metnini 600 yap.
{
  const file = files.topicQuestionPage;
  const before = read(file);
  let after = before;

  after = after.replaceAll("300 soru", `${QUESTIONS_PER_LEVEL} soru`);
  after = after.replaceAll("30 test", `${TOTAL_PER_TOPIC} test`);
  after = after.replaceAll("10 test", `${TESTS_PER_LEVEL} test`);
  after = after.replaceAll("10 kolay", `${TESTS_PER_LEVEL} kolay`);
  after = after.replaceAll("10 orta", `${TESTS_PER_LEVEL} orta`);
  after = after.replaceAll("10 zor", `${TESTS_PER_LEVEL} zor`);

  writeIfChanged(file, before, after);
}

console.log("");
console.log("Soru bankası zorlandı:");
console.log(`- Seviye başına test: ${TESTS_PER_LEVEL}`);
console.log(`- Seviye başına soru: ${QUESTIONS_PER_LEVEL}`);
console.log(`- Konu başına test: ${TOTAL_PER_TOPIC}`);
console.log(`- Konu başına soru: ${QUESTIONS_PER_TOPIC}`);
console.log(`- Karma testler: ${TESTS_PER_LEVEL} kolay + ${TESTS_PER_LEVEL} orta + ${TESTS_PER_LEVEL} zor`);
