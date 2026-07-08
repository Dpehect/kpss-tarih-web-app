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

export const expandedQuestions = [];
export const topicQuestionTests: GeneratedQuestionTest[] = [];
export const mixedQuestionTests: GeneratedQuestionTest[] = [];
export const allQuestionTests: GeneratedQuestionTest[] = [];

export function getTestsForTopic() {
  return [];
}

export function getQuestionsForTest() {
  return [];
}

export function getTestCountsForTopic() {
  return {
    kolay: 0,
    orta: 0,
    zor: 0,
    totalTests: 0,
    totalQuestions: 0
  };
}

export function getQuestionBankQualityReport() {
  return {
    totalQuestions: 0,
    totalTests: 0,
    mode: "supabase"
  };
}

export function getStrictQuestionBankAuditReport() {
  return getQuestionBankQualityReport();
}
