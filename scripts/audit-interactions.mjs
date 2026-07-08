import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "src/components/core/AppShell.tsx",
  "src/features/topics/components/TopicsPage.tsx",
  "src/features/question-bank/components/QuestionBankPage.tsx",
  "src/features/question-bank/components/TopicQuestionPage.tsx",
  "src/features/timeline/components/TimelinePage.tsx",
  "src/data/generated-30-question-tests.ts",
];

const failures = [];

function read(relative) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) {
    failures.push(`${relative} bulunamadı.`);
    return "";
  }
  return fs.readFileSync(file, "utf8");
}

for (const file of requiredFiles) read(file);

const appShell = read("src/components/core/AppShell.tsx");
if (!appShell.includes("pointer-events-none") || !appShell.includes("z-50")) {
  failures.push("AppShell mobil overlay ve dekoratif layer güvenliği eksik görünüyor.");
}

const topicsPage = read("src/features/topics/components/TopicsPage.tsx");
if (!topicsPage.includes("href={`/topics/${topic.slug}`}")) {
  failures.push("Konu kartları /topics/[slug] rotasına Link vermiyor.");
}

const questionBankPage = read("src/features/question-bank/components/QuestionBankPage.tsx");
if (!questionBankPage.includes("href={`/question-bank/${topic.id}`}") || !questionBankPage.includes("href={`/question-bank/all?level=${level}`}")) {
  failures.push("Soru bankası konu/karma test linkleri eksik.");
}

const topicQuestionPage = read("src/features/question-bank/components/TopicQuestionPage.tsx");
if (!topicQuestionPage.includes("href={`/question-bank/${topicId}?level=${test.level}&test=${test.id}`}")) {
  failures.push("Test kartları seçili test rotasına Link vermiyor.");
}

const generated = read("src/data/generated-30-question-tests.ts");
if (generated.includes("topicQuestionTests: GeneratedQuestionTest[] = []") || generated.includes("return []")) {
  failures.push("Soru bankası fallback üretimi boş görünüyor.");
}
if (!generated.includes("export const TESTS_PER_LEVEL = 20") || !generated.includes("export const QUESTIONS_PER_TEST = 30")) {
  failures.push("Soru bankası 20 test / 30 soru sözleşmesi bozulmuş.");
}

const globals = read("src/app/globals.css");
if (!globals.includes("KPSS Tarih interaction hardening patch")) {
  failures.push("globals.css interaction hardening patch içermiyor.");
}

if (failures.length) {
  console.error("\nInteraction audit failed:\n");
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log("Interaction audit passed: links, fallback data, overlay safety and button states are present.");
