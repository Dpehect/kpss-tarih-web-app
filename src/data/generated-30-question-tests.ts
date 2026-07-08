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

export const TESTS_PER_LEVEL = 20;
export const QUESTIONS_PER_TEST = 30;

const levelLabels: Record<TestLevel, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor",
};

const difficultyForLevel: Record<TestLevel, Question["difficulty"][]> = {
  kolay: ["temel", "orta"],
  orta: ["orta", "temel", "ileri"],
  zor: ["ileri", "orta"],
};

function stableSeed(value: string) {
  return Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);
}

function getPool(topicId: string | "all", level: TestLevel) {
  const base = topicId === "all" ? questions : questions.filter((question) => question.topicId === topicId);
  const allowed = difficultyForLevel[level];
  const leveled = base.filter((question) => allowed.includes(question.difficulty));
  return leveled.length ? leveled : base.length ? base : questions;
}

function cycleQuestionIds(pool: Question[], count = QUESTIONS_PER_TEST, seed = 0) {
  if (!pool.length) return [];
  return Array.from({ length: count }, (_, index) => pool[(index + seed) % pool.length].id);
}

function buildTestsForTopic(topicId: string | "all", title: string): GeneratedQuestionTest[] {
  return (["kolay", "orta", "zor"] as const).flatMap((level) =>
    Array.from({ length: TESTS_PER_LEVEL }, (_, index) => {
      const testNo = index + 1;
      const seed = stableSeed(`${topicId}-${level}-${testNo}`);
      const pool = getPool(topicId, level);
      return {
        id: `${topicId}-${level}-${testNo}`,
        topicId,
        title: `${title} ${levelLabels[level]} Test ${testNo}`,
        level,
        levelLabel: levelLabels[level],
        testNo,
        questionCount: QUESTIONS_PER_TEST,
        questionIds: cycleQuestionIds(pool, QUESTIONS_PER_TEST, seed % Math.max(1, pool.length)),
      };
    }),
  );
}

export const expandedQuestions: Question[] = questions;

export const topicQuestionTests: GeneratedQuestionTest[] = topics.flatMap((topic) =>
  buildTestsForTopic(topic.id, topic.title),
);

export const mixedQuestionTests: GeneratedQuestionTest[] = buildTestsForTopic("all", "Karma KPSS Tarih");

export const allQuestionTests: GeneratedQuestionTest[] = [...topicQuestionTests, ...mixedQuestionTests];

export function getTestsForTopic(topicId: string, level?: TestLevel) {
  const source = topicId === "all" ? mixedQuestionTests : topicQuestionTests.filter((test) => test.topicId === topicId);
  return source.filter((test) => !level || test.level === level);
}

export function getQuestionsForTest(testId: string) {
  const test = allQuestionTests.find((item) => item.id === testId);
  if (!test) return [];
  const questionMap = new Map(expandedQuestions.map((question) => [question.id, question]));
  return test.questionIds
    .map((questionId) => questionMap.get(questionId))
    .filter((question): question is Question => Boolean(question));
}

export function getTestCountsForTopic(topicId: string) {
  const topicTests = getTestsForTopic(topicId);
  return {
    kolay: topicTests.filter((test) => test.level === "kolay").length,
    orta: topicTests.filter((test) => test.level === "orta").length,
    zor: topicTests.filter((test) => test.level === "zor").length,
    totalTests: topicTests.length,
    totalQuestions: topicTests.reduce((total, test) => total + test.questionCount, 0),
  };
}

export function getQuestionBankQualityReport() {
  const invalidQuestions = expandedQuestions.filter((question) => {
    const ids = new Set(question.choices.map((choice) => choice.id));
    return question.choices.length !== 5 || !ids.has(question.correctChoiceId) || !question.explanation.trim();
  });

  return {
    totalQuestions: expandedQuestions.length,
    totalTests: allQuestionTests.length,
    topicTests: topicQuestionTests.length,
    mixedTests: mixedQuestionTests.length,
    questionsPerTest: QUESTIONS_PER_TEST,
    testsPerLevel: TESTS_PER_LEVEL,
    invalidQuestions: invalidQuestions.map((question) => question.id),
    mode: "curated-kpss-history-question-bank",
  };
}

export function getStrictQuestionBankAuditReport() {
  return getQuestionBankQualityReport();
}
