import { questions, topics } from "@/data/kpss-history";
import type { Difficulty, Question } from "@/types/study";

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

const LEVELS: TestLevel[] = ["kolay", "orta", "zor"];

const levelLabels: Record<TestLevel, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor",
};

const difficultyByLevel: Record<TestLevel, Difficulty> = {
  kolay: "temel",
  orta: "orta",
  zor: "ileri",
};

const orderedQuestions = [...questions].sort((a, b) => a.id.localeCompare(b.id, "tr"));

function safeQuestionsForTopic(topicId: string | "all", level: TestLevel): Question[] {
  const byTopic = topicId === "all" ? orderedQuestions : orderedQuestions.filter((question) => question.topicId === topicId);
  const byLevel = byTopic.filter((question) => question.difficulty === difficultyByLevel[level]);

  if (byLevel.length > 0) return byLevel;
  if (byTopic.length > 0) return byTopic;
  return orderedQuestions;
}

function rotate<T>(items: T[], count: number, offset: number): T[] {
  if (items.length === 0) return [];

  return Array.from({ length: count }, (_, index) => items[(index + offset) % items.length]);
}

function createTest(topicId: string | "all", level: TestLevel, testNo: number): GeneratedQuestionTest {
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const source = safeQuestionsForTopic(topicId, level);
  const offset = (testNo - 1) * 7 + LEVELS.indexOf(level) * 13;
  const selected = rotate(source, QUESTIONS_PER_TEST, offset);
  const titlePrefix = topic ? topic.title : "Karma KPSS Tarih";

  return {
    id: `${topicId}-${level}-${String(testNo).padStart(2, "0")}`,
    topicId,
    title: `${titlePrefix} · ${levelLabels[level]} Test ${testNo}`,
    level,
    levelLabel: levelLabels[level],
    testNo,
    questionCount: selected.length,
    questionIds: selected.map((question) => question.id),
  };
}

function buildTopicTests(): GeneratedQuestionTest[] {
  return topics.flatMap((topic) =>
    LEVELS.flatMap((level) =>
      Array.from({ length: TESTS_PER_LEVEL }, (_, index) => createTest(topic.id, level, index + 1)),
    ),
  );
}

function buildMixedTests(): GeneratedQuestionTest[] {
  return LEVELS.flatMap((level) =>
    Array.from({ length: TESTS_PER_LEVEL }, (_, index) => createTest("all", level, index + 1)),
  );
}

export const topicQuestionTests: GeneratedQuestionTest[] = buildTopicTests();
export const mixedQuestionTests: GeneratedQuestionTest[] = buildMixedTests();
export const allQuestionTests: GeneratedQuestionTest[] = [...topicQuestionTests, ...mixedQuestionTests];

// Compatibility export used by exam blueprints and legacy screens.
export const expandedQuestions: Question[] = orderedQuestions;

export function getTestsForTopic(topicId: string | "all" = "all", level?: TestLevel): GeneratedQuestionTest[] {
  const pool = topicId === "all" ? mixedQuestionTests : topicQuestionTests.filter((test) => test.topicId === topicId);
  return level ? pool.filter((test) => test.level === level) : pool;
}

export function getQuestionsForTest(testId: string): Question[] {
  const test = allQuestionTests.find((item) => item.id === testId);
  if (!test) return [];

  const sourceById = new Map(orderedQuestions.map((question) => [question.id, question]));

  return test.questionIds
    .map((questionId, index) => {
      const original = sourceById.get(questionId);
      if (!original) return null;

      return {
        ...original,
        id: `${original.id}__${test.id}__${index + 1}`,
      } satisfies Question;
    })
    .filter((question): question is Question => Boolean(question));
}

export function getTestCountsForTopic(topicId: string | "all" = "all") {
  const tests = getTestsForTopic(topicId);

  return {
    kolay: tests.filter((test) => test.level === "kolay").length,
    orta: tests.filter((test) => test.level === "orta").length,
    zor: tests.filter((test) => test.level === "zor").length,
    totalTests: tests.length,
    totalQuestions: tests.reduce((sum, test) => sum + test.questionCount, 0),
  };
}

export function getQuestionBankQualityReport() {
  return {
    totalQuestions: orderedQuestions.length,
    totalTests: allQuestionTests.length,
    topicTests: topicQuestionTests.length,
    mixedTests: mixedQuestionTests.length,
    questionsPerTest: QUESTIONS_PER_TEST,
    testsPerLevel: TESTS_PER_LEVEL,
    mode: "local-json-fallback",
  };
}

export function getStrictQuestionBankAuditReport() {
  const emptyTests = allQuestionTests.filter((test) => test.questionIds.length === 0);
  const shortTests = allQuestionTests.filter((test) => test.questionIds.length < QUESTIONS_PER_TEST);

  return {
    ...getQuestionBankQualityReport(),
    emptyTests: emptyTests.length,
    shortTests: shortTests.length,
    passed: emptyTests.length === 0 && shortTests.length === 0 && orderedQuestions.length > 0,
  };
}
