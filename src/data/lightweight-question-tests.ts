import { topics } from "@/data/kpss-history";

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

const levels = ["kolay", "orta", "zor"] as const;

const levelLabels: Record<TestLevel, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor"
};

function buildTopicTests() {
  const tests: GeneratedQuestionTest[] = [];

  for (const topic of topics) {
    for (const level of levels) {
      for (let testNo = 1; testNo <= TESTS_PER_LEVEL; testNo += 1) {
        const id = `test-${topic.id}-${level}-${testNo}`;

        tests.push({
          id,
          topicId: topic.id,
          title: `${topic.title} ${levelLabels[level]} Test ${testNo}`,
          level,
          levelLabel: levelLabels[level],
          testNo,
          questionCount: QUESTIONS_PER_TEST,
          questionIds: Array.from(
            { length: QUESTIONS_PER_TEST },
            (_, index) => `${id}-q${String(index + 1).padStart(2, "0")}`
          )
        });
      }
    }
  }

  return tests;
}

function buildMixedTests() {
  const tests: GeneratedQuestionTest[] = [];

  for (const level of levels) {
    for (let testNo = 1; testNo <= TESTS_PER_LEVEL; testNo += 1) {
      tests.push({
        id: `mixed-${level}-${testNo}`,
        topicId: "all",
        title: `Karma ${levelLabels[level]} Test ${testNo}`,
        level,
        levelLabel: levelLabels[level],
        testNo,
        questionCount: QUESTIONS_PER_TEST,
        questionIds: Array.from({ length: QUESTIONS_PER_TEST }, (_, index) => {
          const topic = topics[(index + testNo) % topics.length];
          const sourceQuestionNo = ((index * 7 + testNo) % QUESTIONS_PER_TEST) + 1;
          return `test-${topic.id}-${level}-${testNo}-q${String(sourceQuestionNo).padStart(2, "0")}`;
        })
      });
    }
  }

  return tests;
}

export const topicQuestionTests = buildTopicTests();
export const mixedQuestionTests = buildMixedTests();
export const allQuestionTests = [...topicQuestionTests, ...mixedQuestionTests];

export function getTestsForTopic(topicId: string, level?: TestLevel) {
  const tests = topicId === "all"
    ? mixedQuestionTests
    : topicQuestionTests.filter((test) => test.topicId === topicId);

  if (!level) return tests;

  return tests.filter((test) => test.level === level);
}

export function getTestById(testId: string) {
  return allQuestionTests.find((test) => test.id === testId) ?? null;
}

export function getTestCountsForTopic(topicId: string) {
  const tests = getTestsForTopic(topicId);

  return {
    kolay: tests.filter((test) => test.level === "kolay").length,
    orta: tests.filter((test) => test.level === "orta").length,
    zor: tests.filter((test) => test.level === "zor").length,
    totalTests: tests.length,
    totalQuestions: tests.reduce((sum, test) => sum + test.questionCount, 0)
  };
}

export const LIGHTWEIGHT_TEST_METRICS = {
  testsPerLevel: TESTS_PER_LEVEL,
  questionsPerTest: QUESTIONS_PER_TEST,
  topicTestCount: topicQuestionTests.length,
  mixedTestCount: mixedQuestionTests.length,
  allTestCount: allQuestionTests.length,
  topicQuestionCount: topicQuestionTests.reduce((sum, test) => sum + test.questionCount, 0),
  mixedQuestionCount: mixedQuestionTests.reduce((sum, test) => sum + test.questionCount, 0)
};
