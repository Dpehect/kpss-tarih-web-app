import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Flashcard, Question, QuestionChoice, TimelineEvent, Topic } from "@/types/study";

export type ContentTestLevel = "kolay" | "orta" | "zor";

export type ContentTest = {
  id: string;
  topicId: string;
  title: string;
  level: ContentTestLevel;
  levelLabel: string;
  testNo: number;
  questionCount: number;
};

type TopicRow = {
  id: string;
  slug: string;
  title: string;
  era: Topic["era"];
  short_description: string;
  exam_importance: number;
  estimated_minutes: number;
  keywords: string[] | null;
  summary: Topic["summary"] | null;
  must_know: string[] | null;
  common_mistakes: string[] | null;
  quick_timeline: Topic["quickTimeline"] | null;
};

type TestRow = {
  id: string;
  topic_id: string;
  title: string;
  level: ContentTestLevel;
  level_label: string;
  test_no: number;
  question_count: number;
};

type FlashcardRow = {
  id: string;
  topic_id: string;
  front: string;
  back: string;
  hint: string;
  tags: string[] | null;
};

type TimelineRow = {
  id: string;
  topic_id: string;
  date: string;
  title: string;
  description: string;
  tone: TimelineEvent["tone"];
};

type ChoiceRow = {
  choice_id: string;
  text: string;
  sort_order: number;
};

type QuestionRow = {
  id: string;
  topic_id: string;
  type: Question["type"];
  difficulty: Question["difficulty"];
  stem: string;
  correct_choice_id: string;
  explanation: string;
  exam_tip: string;
  tags: string[] | null;
  content_question_choices?: ChoiceRow[];
};

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        "x-application-name": "softbridge-functional-content"
      }
    }
  });
}

export const fetchContentTopics = cache(async (): Promise<Topic[]> => {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("content_topics")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.warn("[content] topics alınamadı:", error.message);
    return [];
  }

  return ((data ?? []) as TopicRow[]).map(mapTopic);
});

export const fetchContentTopicBySlug = cache(async (slug: string): Promise<Topic | null> => {
  const supabase = getClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("content_topics")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.warn("[content] topic alınamadı:", error.message);
    return null;
  }

  return data ? mapTopic(data as TopicRow) : null;
});

export const fetchContentTopicById = cache(async (topicId: string): Promise<Topic | null> => {
  const supabase = getClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("content_topics")
    .select("*")
    .eq("id", topicId)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.warn("[content] topic id alınamadı:", error.message);
    return null;
  }

  return data ? mapTopic(data as TopicRow) : null;
});

export const fetchContentTestsForTopic = cache(async (
  topicId: string,
  level?: ContentTestLevel
): Promise<ContentTest[]> => {
  const supabase = getClient();
  if (!supabase || topicId === "all") return [];

  let query = supabase
    .from("content_tests")
    .select("id, topic_id, title, level, level_label, test_no, question_count")
    .eq("topic_id", topicId)
    .eq("is_published", true)
    .order("level", { ascending: true })
    .order("test_no", { ascending: true });

  if (level) query = query.eq("level", level);

  const { data, error } = await query;

  if (error) {
    console.warn("[content] tests alınamadı:", error.message);
    return [];
  }

  return ((data ?? []) as TestRow[]).map(mapTest);
});

export const fetchContentTests = cache(async (): Promise<ContentTest[]> => {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("content_tests")
    .select("id, topic_id, title, level, level_label, test_no, question_count")
    .eq("is_published", true)
    .order("topic_id", { ascending: true })
    .order("level", { ascending: true })
    .order("test_no", { ascending: true });

  if (error) {
    console.warn("[content] all tests alınamadı:", error.message);
    return [];
  }

  return ((data ?? []) as TestRow[]).map(mapTest);
});

export const fetchContentQuestionsForTest = cache(async (testId: string): Promise<Question[]> => {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("content_questions")
    .select(`
      id,
      topic_id,
      type,
      difficulty,
      stem,
      correct_choice_id,
      explanation,
      exam_tip,
      tags,
      content_question_choices (
        choice_id,
        text,
        sort_order
      )
    `)
    .eq("test_id", testId)
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("sort_order", {
      referencedTable: "content_question_choices",
      ascending: true
    });

  if (error) {
    console.warn("[content] questions alınamadı:", error.message);
    return [];
  }

  return ((data ?? []) as QuestionRow[]).map(mapQuestion);
});

export const fetchContentExamQuestions = cache(async (
  examIndex: number,
  limit = 60
): Promise<Question[]> => {
  const supabase = getClient();
  if (!supabase) return [];

  const safeIndex = Number.isFinite(examIndex) && examIndex > 0 ? Math.floor(examIndex) : 1;
  const safeLimit = Math.max(10, Math.min(limit, 120));
  const offset = (safeIndex - 1) * safeLimit;

  const { data, error } = await supabase
    .from("content_questions")
    .select(`
      id,
      topic_id,
      type,
      difficulty,
      stem,
      correct_choice_id,
      explanation,
      exam_tip,
      tags,
      content_question_choices (
        choice_id,
        text,
        sort_order
      )
    `)
    .eq("is_published", true)
    .order("id", { ascending: true })
    .range(offset, offset + safeLimit - 1)
    .order("sort_order", {
      referencedTable: "content_question_choices",
      ascending: true
    });

  if (error) {
    console.warn("[content] exam questions alınamadı:", error.message);
    return [];
  }

  return ((data ?? []) as QuestionRow[]).map(mapQuestion);
});

export const fetchContentFlashcards = cache(async (topicId?: string): Promise<Flashcard[]> => {
  const supabase = getClient();
  if (!supabase) return [];

  let query = supabase
    .from("content_flashcards")
    .select("id, topic_id, front, back, hint, tags")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (topicId) query = query.eq("topic_id", topicId);

  const { data, error } = await query;

  if (error) {
    console.warn("[content] flashcards alınamadı:", error.message);
    return [];
  }

  return ((data ?? []) as FlashcardRow[]).map(mapFlashcard);
});

export const fetchContentTimelineEvents = cache(async (topicId?: string): Promise<TimelineEvent[]> => {
  const supabase = getClient();
  if (!supabase) return [];

  let query = supabase
    .from("content_timeline_events")
    .select("id, topic_id, date, title, description, tone")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (topicId) query = query.eq("topic_id", topicId);

  const { data, error } = await query;

  if (error) {
    console.warn("[content] timeline alınamadı:", error.message);
    return [];
  }

  return ((data ?? []) as TimelineRow[]).map(mapTimeline);
});

function mapTest(row: TestRow): ContentTest {
  return {
    id: row.id,
    topicId: row.topic_id,
    title: row.title,
    level: row.level,
    levelLabel: row.level_label,
    testNo: row.test_no,
    questionCount: row.question_count
  };
}

function mapTopic(row: TopicRow): Topic {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    era: row.era,
    shortDescription: row.short_description,
    examImportance: row.exam_importance,
    estimatedMinutes: row.estimated_minutes,
    keywords: row.keywords ?? [],
    summary: row.summary ?? [],
    mustKnow: row.must_know ?? [],
    commonMistakes: row.common_mistakes ?? [],
    quickTimeline: row.quick_timeline ?? []
  };
}

function mapFlashcard(row: FlashcardRow): Flashcard {
  return {
    id: row.id,
    topicId: row.topic_id,
    front: row.front,
    back: row.back,
    hint: row.hint,
    tags: row.tags ?? []
  };
}

function mapTimeline(row: TimelineRow): TimelineEvent {
  return {
    id: row.id,
    topicId: row.topic_id,
    date: row.date,
    title: row.title,
    description: row.description,
    tone: row.tone
  };
}

function mapQuestion(row: QuestionRow): Question {
  const choices = [...(row.content_question_choices ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((choice): QuestionChoice => ({
      id: choice.choice_id,
      text: choice.text
    }));

  return {
    id: row.id,
    topicId: row.topic_id,
    type: row.type,
    difficulty: row.difficulty,
    stem: row.stem,
    choices,
    correctChoiceId: row.correct_choice_id,
    explanation: row.explanation,
    examTip: row.exam_tip,
    tags: row.tags ?? []
  };
}
