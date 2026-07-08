import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Flashcard, Question, TimelineEvent, Topic } from "@/types/study";
import * as localHistory from "@/data/kpss-history";

type TestLevel = "kolay" | "orta" | "zor";

export type GeneratedQuestionTest = {
  id: string;
  topicId: string;
  level: TestLevel;
  testNo: number;
  title: string;
  questionIds: string[];
  questionCount: number;
  source?: string;
};

type TopicDataBundle = {
  topic: Topic;
  questions: Question[];
  flashcards: Flashcard[];
  timeline: TimelineEvent[];
  glossary: Array<Record<string, unknown>>;
  tests: GeneratedQuestionTest[];
};

type TestBundle = {
  test: GeneratedQuestionTest;
  questions: Question[];
};

const table = "kpss_content_bundles";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

const getBundle = cache(async <T,>(key: string): Promise<T | null> => {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.from(table).select("payload").eq("key", key).maybeSingle();
  if (error || !data) return null;
  return data.payload as T;
});

export async function getTopicsFromContent(): Promise<Topic[]> {
  return (await getBundle<Topic[]>("topics")) ?? localHistory.topics ?? [];
}

export async function getQuestionsFromContent(): Promise<Question[]> {
  return (await getBundle<Question[]>("questions")) ?? localHistory.questions ?? [];
}

export async function getFlashcardsFromContent(): Promise<Flashcard[]> {
  return (await getBundle<Flashcard[]>("flashcards")) ?? localHistory.flashcards ?? [];
}

export async function getTimelineFromContent(): Promise<TimelineEvent[]> {
  return (await getBundle<TimelineEvent[]>("timeline")) ?? localHistory.timelineEvents ?? [];
}

export async function getTestsFromContent(): Promise<GeneratedQuestionTest[]> {
  const fromSupabase = await getBundle<GeneratedQuestionTest[]>("tests");
  if (fromSupabase?.length) return fromSupabase;
  try {
    const generated = await import("@/data/generated-30-question-tests");
    return [...(generated.topicQuestionTests ?? []), ...(generated.mixedQuestionTests ?? [])] as GeneratedQuestionTest[];
  } catch {
    return [];
  }
}

export async function getTopicBySlugFromContent(slug: string): Promise<Topic | null> {
  const direct = await getBundle<Topic>(`topic:${slug}`);
  if (direct) return direct;
  const topics = await getTopicsFromContent();
  return topics.find((topic) => topic.slug === slug) ?? null;
}

export async function getTopicDataBySlug(slug: string): Promise<TopicDataBundle | null> {
  const bundle = await getBundle<TopicDataBundle>(`topic-data:${slug}`);
  if (bundle?.topic) return bundle;
  const topic = await getTopicBySlugFromContent(slug);
  if (!topic) return null;
  const [questions, flashcards, timeline, tests] = await Promise.all([
    getQuestionsFromContent(),
    getFlashcardsFromContent(),
    getTimelineFromContent(),
    getTestsFromContent(),
  ]);
  const glossary = typeof localHistory.getGlossaryByTopic === "function" ? localHistory.getGlossaryByTopic(topic.id) : [];
  return {
    topic,
    questions: questions.filter((question) => question.topicId === topic.id),
    flashcards: flashcards.filter((card) => card.topicId === topic.id),
    timeline: timeline.filter((event) => event.topicId === topic.id),
    glossary,
    tests: tests.filter((test) => test.topicId === topic.id),
  };
}

export async function getTestsForTopicFromContent(topicId: string, level?: TestLevel): Promise<GeneratedQuestionTest[]> {
  const tests = await getTestsFromContent();
  return tests.filter((test) => test.topicId === topicId && (!level || test.level === level));
}

export async function getTestCountsForTopicFromContent(topicId: string) {
  const tests = await getTestsForTopicFromContent(topicId);
  return {
    totalTests: tests.length,
    totalQuestions: tests.reduce((sum, test) => sum + (test.questionCount ?? test.questionIds?.length ?? 0), 0),
  };
}

export async function getTestBundleFromContent(testId: string): Promise<TestBundle | null> {
  const direct = await getBundle<TestBundle>(`test:${testId}`);
  if (direct?.test) return direct;
  const [tests, questions] = await Promise.all([getTestsFromContent(), getQuestionsFromContent()]);
  const test = tests.find((item) => item.id === testId);
  if (!test) return null;
  const qById = new Map(questions.map((question) => [question.id, question]));
  return { test, questions: test.questionIds.map((id) => qById.get(id)).filter(Boolean) as Question[] };
}

export async function getQuestionBankPageData() {
  const [topics, tests] = await Promise.all([getTopicsFromContent(), getTestsFromContent()]);
  return {
    topics,
    topicQuestionTests: tests.filter((test) => test.topicId !== "all"),
    mixedQuestionTests: tests.filter((test) => test.topicId === "all"),
  };
}

export async function getTopicQuestionPageData(topicId: string, testId?: string, level?: TestLevel) {
  const [topics, tests] = await Promise.all([getTopicsFromContent(), getTestsFromContent()]);
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId) ?? null;
  const allTests = tests.filter((test) => test.topicId === topicId);
  const visibleTests = allTests.filter((test) => !level || test.level === level);
  const selected = testId ? await getTestBundleFromContent(testId) : null;
  return { topics, topic, allTests, visibleTests, selected };
}

export async function getTutorKnowledgeText(maxChars = 70000) {
  const [topics, questions] = await Promise.all([getTopicsFromContent(), getQuestionsFromContent()]);
  const topicText = topics
    .map((topic) => {
      const blocks = topic.summary?.map((block) => `${block.heading}: ${block.body}`).join("\n") ?? "";
      return `${topic.title}\n${topic.shortDescription}\n${topic.mustKnow?.join("\n") ?? ""}\n${blocks}`;
    })
    .join("\n\n");
  const questionText = questions
    .slice(0, 140)
    .map((q) => `Soru: ${q.stem}\nDoğru: ${q.correctChoiceId}\nAçıklama: ${q.explanation}`)
    .join("\n\n");
  return `${topicText}\n\n${questionText}`.slice(0, maxChars);
}
