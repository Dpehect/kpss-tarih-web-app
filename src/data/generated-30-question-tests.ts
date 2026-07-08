import { questions, topics } from "@/data/kpss-history";
import type { Question } from "@/types/study";

export type TestLevel = "kolay" | "orta" | "zor";
export type GeneratedQuestionTest = {
  id: string;
  topicId: string | "all";
  title: string;
  level: TestLevel;
  levelLabel: string;
  testNo: number;
  questionCount: number;
  questionIds: string[];
};

export const TESTS_PER_LEVEL = 10;
export const QUESTIONS_PER_TEST = 20;

const levelLabels: Record<TestLevel, string> = { kolay: "Kolay", orta: "Orta", zor: "Zor" };
function levelToDifficulty(level: TestLevel) {
  if (level === "kolay") return "temel";
  if (level === "orta") return "orta";
  return "ileri";
}
function deterministicPick(pool: Question[], count = QUESTIONS_PER_TEST, seed = 1) {
  const safePool = pool.length ? pool : questions;
  if (!safePool.length) return [];
  const rotated = [...safePool].sort((a, b) => {
    const left = Math.sin(seed + a.id.length + a.stem.length) * 10000;
    const right = Math.sin(seed + b.id.length + b.stem.length) * 10000;
    return left - right;
  });
  return Array.from({ length: count }, (_, index) => rotated[index % rotated.length].id);
}
export const expandedQuestions: Question[] = questions;
export const topicQuestionTests: GeneratedQuestionTest[] = topics.flatMap((topic, topicIndex) =>
  (["kolay", "orta", "zor"] as const).flatMap((level, levelIndex) =>
    Array.from({ length: TESTS_PER_LEVEL }, (_, index) => {
      const difficulty = levelToDifficulty(level);
      const topicPool = questions.filter((question) => question.topicId === topic.id);
      const levelPool = topicPool.filter((question) => question.difficulty === difficulty);
      const pool = levelPool.length >= 4 ? levelPool : topicPool;
      return {
        id: `${topic.id}-${level}-${index + 1}`,
        topicId: topic.id,
        title: `${topic.title} ${levelLabels[level]} Test ${index + 1}`,
        level,
        levelLabel: levelLabels[level],
        testNo: index + 1,
        questionCount: QUESTIONS_PER_TEST,
        questionIds: deterministicPick(pool, QUESTIONS_PER_TEST, topicIndex * 100 + levelIndex * 20 + index + 1),
      } satisfies GeneratedQuestionTest;
    }),
  ),
);
export const mixedQuestionTests: GeneratedQuestionTest[] = (["kolay", "orta", "zor"] as const).flatMap((level, levelIndex) =>
  Array.from({ length: TESTS_PER_LEVEL }, (_, index) => {
    const difficulty = levelToDifficulty(level);
    const levelPool = questions.filter((question) => question.difficulty === difficulty);
    const pool = levelPool.length >= QUESTIONS_PER_TEST ? levelPool : questions;
    return {
      id: `karma-${level}-${index + 1}`,
      topicId: "all" as const,
      title: `Karma Tarih ${levelLabels[level]} Test ${index + 1}`,
      level,
      levelLabel: levelLabels[level],
      testNo: index + 1,
      questionCount: QUESTIONS_PER_TEST,
      questionIds: deterministicPick(pool, QUESTIONS_PER_TEST, 900 + levelIndex * 50 + index + 1),
    } satisfies GeneratedQuestionTest;
  }),
);
export const allQuestionTests: GeneratedQuestionTest[] = [...topicQuestionTests, ...mixedQuestionTests];
export function getTestsForTopic(topicId: string, level?: TestLevel) {
  const source = topicId === "all" ? mixedQuestionTests : topicQuestionTests.filter((test) => test.topicId === topicId);
  return source.filter((test) => !level || test.level === level);
}
export function getQuestionsForTest(testId: string) {
  const test = allQuestionTests.find((item) => item.id === testId);
  if (!test) return [];
  const questionMap = new Map(expandedQuestions.map((question) => [question.id, question]));
  return test.questionIds.map((questionId) => questionMap.get(questionId)).filter((question): question is Question => Boolean(question));
}
export function getTestCountsForTopic(topicId: string) {
  const tests = getTestsForTopic(topicId);
  return {
    kolay: tests.filter((test) => test.level === "kolay").length,
    orta: tests.filter((test) => test.level === "orta").length,
    zor: tests.filter((test) => test.level === "zor").length,
    totalTests: tests.length,
    totalQuestions: tests.reduce((total, test) => total + test.questionCount, 0),
  };
}
export function getQuestionBankQualityReport() {
  return { totalQuestions: expandedQuestions.length, totalTests: allQuestionTests.length, topicTests: topicQuestionTests.length, mixedTests: mixedQuestionTests.length, questionsPerTest: QUESTIONS_PER_TEST, testsPerLevel: TESTS_PER_LEVEL, mode: "all-topics-deep-modular" };
}
