import { unstable_cache } from "next/cache";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Exam, Flashcard, Question, StudyRecommendation, TimelineEvent, Topic } from "@/types/study";
import {
  exams as fallbackExams,
  flashcards as fallbackFlashcards,
  getFlashcardsByTopic as fallbackFlashcardsByTopic,
  getGlossaryByTopic as fallbackGlossaryByTopic,
  getQuestionsByTopic as fallbackQuestionsByTopic,
  getTimelineEventsByTopic as fallbackTimelineByTopic,
  getTopicBySlug as fallbackTopicBySlug,
  glossary as fallbackGlossary,
  questions as fallbackQuestions,
  recommendations as fallbackRecommendations,
  timelineEvents as fallbackTimelineEvents,
  topics as fallbackTopics,
} from "@/data/kpss-history";

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

type KpssContentKind =
  | "topic"
  | "question"
  | "flashcard"
  | "timeline_event"
  | "glossary"
  | "exam"
  | "recommendation"
  | "question_test";

type KpssContentRow<T> = {
  kind: KpssContentKind;
  key: string;
  payload: T;
  updated_at?: string;
};

type GlossaryItem = {
  id: string;
  topicId?: string;
  term: string;
  definition: string;
  period?: string;
};

export const QUESTIONS_PER_TEST = 20;
export const TESTS_PER_LEVEL = 10;

const LEVEL_LABELS: Record<TestLevel, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor",
};

let client: SupabaseClient | null = null;

function createSupabaseContentClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  client = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "x-softbridge-content-client": "supabase-first",
      },
    },
  });

  return client;
}

async function readRows<T>(kind: KpssContentKind): Promise<T[]> {
  const supabase = createSupabaseContentClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("kpss_content_bundles")
    .select("payload")
    .eq("kind", kind)
    .order("key", { ascending: true });

  if (error) {
    console.warn(`[kpss-content] Supabase ${kind} okuma hatası:`, error.message);
    return [];
  }

  return (data ?? []).map((row) => (row as { payload: T }).payload).filter(Boolean);
}

async function readRow<T>(kind: KpssContentKind, key: string): Promise<T | null> {
  const supabase = createSupabaseContentClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("kpss_content_bundles")
    .select("payload")
    .eq("kind", kind)
    .eq("key", key)
    .maybeSingle();

  if (error) {
    console.warn(`[kpss-content] Supabase ${kind}/${key} okuma hatası:`, error.message);
    return null;
  }

  return data ? ((data as { payload: T }).payload ?? null) : null;
}

export const getSupabaseTopics = unstable_cache(
  async (): Promise<Topic[]> => {
    const rows = await readRows<Topic>("topic");
    return rows.length ? sortTopics(rows) : fallbackTopics;
  },
  ["kpss-content-topics-v2"],
  { revalidate: 60 * 60, tags: ["kpss-content", "kpss-topics"] },
);

export const getSupabaseQuestions = unstable_cache(
  async (): Promise<Question[]> => {
    const rows = await readRows<Question>("question");
    return rows.length ? rows : fallbackQuestions;
  },
  ["kpss-content-questions-v2"],
  { revalidate: 60 * 60, tags: ["kpss-content", "kpss-questions"] },
);

export const getSupabaseFlashcards = unstable_cache(
  async (): Promise<Flashcard[]> => {
    const rows = await readRows<Flashcard>("flashcard");
    return rows.length ? rows : fallbackFlashcards;
  },
  ["kpss-content-flashcards-v2"],
  { revalidate: 60 * 60, tags: ["kpss-content", "kpss-flashcards"] },
);

export const getSupabaseTimelineEvents = unstable_cache(
  async (): Promise<TimelineEvent[]> => {
    const rows = await readRows<TimelineEvent>("timeline_event");
    return rows.length ? rows : fallbackTimelineEvents;
  },
  ["kpss-content-timeline-v2"],
  { revalidate: 60 * 60, tags: ["kpss-content", "kpss-timeline"] },
);

export const getSupabaseGlossary = unstable_cache(
  async (): Promise<GlossaryItem[]> => {
    const rows = await readRows<GlossaryItem>("glossary");
    return rows.length ? rows : (fallbackGlossary as GlossaryItem[]);
  },
  ["kpss-content-glossary-v2"],
  { revalidate: 60 * 60, tags: ["kpss-content", "kpss-glossary"] },
);

export const getSupabaseRecommendations = unstable_cache(
  async (): Promise<StudyRecommendation[]> => {
    const rows = await readRows<StudyRecommendation>("recommendation");
    return rows.length ? rows : fallbackRecommendations;
  },
  ["kpss-content-recommendations-v2"],
  { revalidate: 60 * 60, tags: ["kpss-content", "kpss-recommendations"] },
);

export const getSupabaseExams = unstable_cache(
  async (): Promise<Exam[]> => {
    const rows = await readRows<Exam>("exam");
    if (rows.length) return rows;
    if (fallbackExams.length) return fallbackExams;
    const questions = await getSupabaseQuestions();
    return buildStaticExams(questions);
  },
  ["kpss-content-exams-v2"],
  { revalidate: 60 * 60, tags: ["kpss-content", "kpss-exams"] },
);

export const getSupabaseQuestionTests = unstable_cache(
  async (): Promise<GeneratedQuestionTest[]> => {
    const rows = await readRows<GeneratedQuestionTest>("question_test");
    if (rows.length) return rows;
    const [topics, questions] = await Promise.all([getSupabaseTopics(), getSupabaseQuestions()]);
    return buildStaticQuestionTests(topics, questions);
  },
  ["kpss-content-question-tests-v2"],
  { revalidate: 60 * 60, tags: ["kpss-content", "kpss-question-tests"] },
);

export async function getSupabaseTopicBySlug(slug: string) {
  const direct = await readRow<Topic>("topic", slug);
  if (direct) return direct;
  const topics = await getSupabaseTopics();
  return topics.find((topic) => topic.slug === slug || topic.id === slug) ?? fallbackTopicBySlug(slug) ?? null;
}

export async function getSupabaseTopicById(topicId: string) {
  const topics = await getSupabaseTopics();
  return topics.find((topic) => topic.id === topicId || topic.slug === topicId) ?? null;
}

export async function getSupabaseQuestionsByTopic(topicId: string) {
  const questions = await getSupabaseQuestions();
  const filtered = questions.filter((question) => question.topicId === topicId);
  return filtered.length ? filtered : fallbackQuestionsByTopic(topicId);
}

export async function getSupabaseFlashcardsByTopic(topicId: string) {
  const flashcards = await getSupabaseFlashcards();
  const filtered = flashcards.filter((card) => card.topicId === topicId);
  return filtered.length ? filtered : fallbackFlashcardsByTopic(topicId);
}

export async function getSupabaseTimelineEventsByTopic(topicId: string) {
  const events = await getSupabaseTimelineEvents();
  const filtered = events.filter((event) => event.topicId === topicId);
  return filtered.length ? filtered : fallbackTimelineByTopic(topicId);
}

export async function getSupabaseGlossaryByTopic(topicId: string) {
  const glossary = await getSupabaseGlossary();
  const filtered = glossary.filter((item) => item.topicId === topicId || item.period === topicId);
  return filtered.length ? filtered : (fallbackGlossaryByTopic(topicId) as GlossaryItem[]);
}

export async function getSupabaseTestsForTopic(topicId: string, level?: TestLevel) {
  const tests = await getSupabaseQuestionTests();
  const source = topicId === "all" ? tests.filter((test) => test.topicId === "all") : tests.filter((test) => test.topicId === topicId);
  return source.filter((test) => !level || test.level === level);
}

export async function getSupabaseQuestionsForTest(testId: string) {
  const [tests, questions] = await Promise.all([getSupabaseQuestionTests(), getSupabaseQuestions()]);
  const test = tests.find((item) => item.id === testId);
  if (!test) return [];
  const questionMap = new Map(questions.map((question) => [question.id, question]));
  return test.questionIds.map((questionId) => questionMap.get(questionId)).filter((question): question is Question => Boolean(question));
}

export async function getSupabaseTestCountsForTopic(topicId: string) {
  const tests = await getSupabaseTestsForTopic(topicId);
  return {
    kolay: tests.filter((test) => test.level === "kolay").length,
    orta: tests.filter((test) => test.level === "orta").length,
    zor: tests.filter((test) => test.level === "zor").length,
    totalTests: tests.length,
    totalQuestions: tests.reduce((total, test) => total + test.questionIds.length, 0),
  };
}

export async function getTopicDetailFromSupabase(slug: string) {
  const topic = await getSupabaseTopicBySlug(slug);
  if (!topic) return null;

  const [questions, flashcards, glossary, timelineEvents, counts] = await Promise.all([
    getSupabaseQuestionsByTopic(topic.id),
    getSupabaseFlashcardsByTopic(topic.id),
    getSupabaseGlossaryByTopic(topic.id),
    getSupabaseTimelineEventsByTopic(topic.id),
    getSupabaseTestCountsForTopic(topic.id),
  ]);

  return { topic, questions, flashcards, glossary, timelineEvents, counts };
}

export async function getQuestionBankOverviewFromSupabase() {
  const [topics, tests] = await Promise.all([getSupabaseTopics(), getSupabaseQuestionTests()]);
  const topicQuestionTests = tests.filter((test) => test.topicId !== "all");
  const mixedQuestionTests = tests.filter((test) => test.topicId === "all");
  return {
    topics,
    topicQuestionTests,
    mixedQuestionTests,
    topicCount: topics.length,
    topicTestCount: topicQuestionTests.length,
    topicQuestionCount: topicQuestionTests.reduce((sum, test) => sum + test.questionIds.length, 0),
    mixedTestCount: mixedQuestionTests.length,
    mixedQuestionCount: mixedQuestionTests.reduce((sum, test) => sum + test.questionIds.length, 0),
  };
}

export async function getQuestionSessionFromSupabase(topicId: string, testId?: string, level?: TestLevel) {
  const [topics, tests] = await Promise.all([getSupabaseTopics(), getSupabaseTestsForTopic(topicId, level)]);
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const allTests = await getSupabaseTestsForTopic(topicId);
  const selectedTest = testId ? allTests.find((test) => test.id === testId) ?? null : null;
  const selectedQuestions = selectedTest ? await getSupabaseQuestionsForTest(selectedTest.id) : [];
  const counts = await getSupabaseTestCountsForTopic(topicId);

  return {
    topics,
    topic,
    isMixed: topicId === "all",
    tests,
    allTests,
    selectedTest,
    selectedQuestions,
    counts,
  };
}

function sortTopics(topics: Topic[]) {
  const fallbackOrder = new Map(fallbackTopics.map((topic, index) => [topic.id, index]));
  return [...topics].sort((a, b) => (fallbackOrder.get(a.id) ?? 999) - (fallbackOrder.get(b.id) ?? 999));
}

function buildStaticQuestionTests(topics: Topic[], questions: Question[]) {
  const tests: GeneratedQuestionTest[] = [];

  for (const topic of topics) {
    const pool = questions.filter((question) => question.topicId === topic.id);
    for (const level of ["kolay", "orta", "zor"] as TestLevel[]) {
      const levelPool = filterByLevel(pool, level);
      const testCount = Math.max(1, Math.min(TESTS_PER_LEVEL, Math.ceil(levelPool.length / QUESTIONS_PER_TEST) || 1));
      for (let index = 0; index < testCount; index += 1) {
        const ids = selectUniqueQuestionIds(levelPool, QUESTIONS_PER_TEST, index + topic.id.length);
        if (!ids.length) continue;
        tests.push({
          id: `${topic.id}-${level}-${index + 1}`,
          topicId: topic.id,
          title: `${topic.title} ${LEVEL_LABELS[level]} Test ${index + 1}`,
          level,
          levelLabel: LEVEL_LABELS[level],
          testNo: index + 1,
          questionCount: ids.length,
          questionIds: ids,
        });
      }
    }
  }

  for (const level of ["kolay", "orta", "zor"] as TestLevel[]) {
    const levelPool = filterByLevel(questions, level);
    for (let index = 0; index < TESTS_PER_LEVEL; index += 1) {
      const ids = selectUniqueQuestionIds(levelPool, QUESTIONS_PER_TEST, index + 41);
      if (!ids.length) continue;
      tests.push({
        id: `karma-${level}-${index + 1}`,
        topicId: "all",
        title: `Karma Tarih ${LEVEL_LABELS[level]} Test ${index + 1}`,
        level,
        levelLabel: LEVEL_LABELS[level],
        testNo: index + 1,
        questionCount: ids.length,
        questionIds: ids,
      });
    }
  }

  return tests;
}

function buildStaticExams(questions: Question[]) {
  return Array.from({ length: 12 }, (_, index) => {
    const ids = selectUniqueQuestionIds(questions, 27, index * 17 + 3);
    return {
      id: `kpss-tarih-deneme-${index + 1}`,
      title: `KPSS Tarih Denemesi ${index + 1}`,
      durationMinutes: 30,
      questionIds: ids,
      description: "27 soruluk KPSS Tarih formatına yakın kapsamlı deneme.",
    } satisfies Exam;
  });
}

function filterByLevel(questions: Question[], level: TestLevel) {
  const difficultyMap: Record<TestLevel, Question["difficulty"]> = {
    kolay: "temel",
    orta: "orta",
    zor: "ileri",
  };
  const primary = questions.filter((question) => question.difficulty === difficultyMap[level]);
  if (primary.length >= Math.min(QUESTIONS_PER_TEST, questions.length)) return primary;
  return [...primary, ...questions.filter((question) => question.difficulty !== difficultyMap[level])];
}

function selectUniqueQuestionIds(pool: Question[], count: number, seed: number) {
  const unique = new Map(pool.map((question) => [question.id, question]));
  const items = Array.from(unique.values());
  const ordered = [...items].sort((a, b) => seededScore(a.id, seed) - seededScore(b.id, seed));
  return ordered.slice(0, Math.min(count, ordered.length)).map((question) => question.id);
}

function seededScore(value: string, seed: number) {
  let hash = seed || 1;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 1000003;
  }
  return hash;
}

export function getSupabaseContentMode() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
    return "supabase-first" as const;
  }
  return "local-fallback" as const;
}
