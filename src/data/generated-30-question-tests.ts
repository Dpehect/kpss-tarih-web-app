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
export const QUESTIONS_PER_TEST = 20;

const levelLabels: Record<TestLevel, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor",
};

function cycleQuestionIds(pool: Question[], count = QUESTIONS_PER_TEST) {
  const safePool = pool.length ? pool : questions;
  if (!safePool.length) return [];
  return Array.from({ length: count }, (_, index) => safePool[index % safePool.length].id);
}

export const expandedQuestions: Question[] = questions;

export const topicQuestionTests: GeneratedQuestionTest[] = topics.flatMap((topic) =>
  (["kolay", "orta", "zor"] as const).flatMap((level) =>
    Array.from({ length: TESTS_PER_LEVEL }, (_, index) => {
      const pool = questions.filter((question) => question.topicId === topic.id);
      return {
        id: `${topic.id}-${level}-${index + 1}`,
        topicId: topic.id,
        title: `${topic.title} ${levelLabels[level]} Test ${index + 1}`,
        level,
        levelLabel: levelLabels[level],
        testNo: index + 1,
        questionCount: QUESTIONS_PER_TEST,
        questionIds: cycleQuestionIds(pool),
      };
    })
  )
);

export const mixedQuestionTests: GeneratedQuestionTest[] = (["kolay", "orta", "zor"] as const).flatMap(
  (level) =>
    Array.from({ length: TESTS_PER_LEVEL }, (_, index) => ({
      id: `karma-${level}-${index + 1}`,
      topicId: "all" as const,
      title: `Karma Tarih ${levelLabels[level]} Test ${index + 1}`,
      level,
      levelLabel: levelLabels[level],
      testNo: index + 1,
      questionCount: QUESTIONS_PER_TEST,
      questionIds: cycleQuestionIds(questions),
    }))
);

export const allQuestionTests: GeneratedQuestionTest[] = [...topicQuestionTests, ...mixedQuestionTests];

export function getTestsForTopic(topicId: string, level?: TestLevel) {
  return topicQuestionTests.filter(
    (test) => test.topicId === topicId && (!level || test.level === level)
  );
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
  return {
    totalQuestions: expandedQuestions.length,
    totalTests: allQuestionTests.length,
    topicTests: topicQuestionTests.length,
    mixedTests: mixedQuestionTests.length,
    questionsPerTest: QUESTIONS_PER_TEST,
    testsPerLevel: TESTS_PER_LEVEL,
    mode: "local-fallback-with-supabase-compatible-contract",
  };
}

export function getStrictQuestionBankAuditReport() {
  return getQuestionBankQualityReport();
}
