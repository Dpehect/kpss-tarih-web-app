import { flashcards as baseFlashcards, topics } from "@/data/kpss-history";

export const TESTS_PER_LEVEL = 20;
export const QUESTIONS_PER_TEST = 30;
export const LEVEL_COUNT = 3;

export const TOPIC_COUNT = topics.length;
export const TOPIC_TEST_COUNT = TOPIC_COUNT * LEVEL_COUNT * TESTS_PER_LEVEL;
export const MIXED_TEST_COUNT = LEVEL_COUNT * TESTS_PER_LEVEL;
export const ALL_TEST_COUNT = TOPIC_TEST_COUNT + MIXED_TEST_COUNT;
export const EXPANDED_QUESTION_COUNT = TOPIC_COUNT * LEVEL_COUNT * TESTS_PER_LEVEL * QUESTIONS_PER_TEST;

function clean(value: string | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function unique(values: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const item = clean(value);
    const key = item.toLocaleLowerCase("tr-TR");

    if (!item || seen.has(key)) continue;

    seen.add(key);
    result.push(item);
  }

  return result;
}

function generatedFlashcardCountForTopic(topic: (typeof topics)[number]) {
  const concepts = unique([...topic.mustKnow, ...topic.keywords]);
  const summaryCount = topic.summary.reduce((total, block) => total + 1 + block.bullets.length, 0);
  const timelineCount = topic.quickTimeline.length;
  const mistakeCount = topic.commonMistakes.length;
  const comparisonCount = Math.max(0, concepts.length - 1);
  const examTipCount = 2;

  return Math.max(18, concepts.length + summaryCount + timelineCount + mistakeCount + comparisonCount + examTipCount);
}

export const GENERATED_FLASHCARD_COUNT = topics.reduce(
  (total, topic) => total + generatedFlashcardCountForTopic(topic),
  0
);

export const EXPANDED_FLASHCARD_COUNT = baseFlashcards.length + GENERATED_FLASHCARD_COUNT;

export const SITE_METRICS = {
  topicCount: TOPIC_COUNT,
  topicTestCount: TOPIC_TEST_COUNT,
  mixedTestCount: MIXED_TEST_COUNT,
  allTestCount: ALL_TEST_COUNT,
  expandedQuestionCount: EXPANDED_QUESTION_COUNT,
  baseFlashcardCount: baseFlashcards.length,
  generatedFlashcardCount: GENERATED_FLASHCARD_COUNT,
  expandedFlashcardCount: EXPANDED_FLASHCARD_COUNT
};
