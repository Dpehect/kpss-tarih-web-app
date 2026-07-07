import type { Flashcard, Question, QuestionChoice, TimelineEvent, Topic } from "@/types/study";
import { createClient } from "@/lib/supabase/client";

type ContentQuestionRow = {
  id: string;
  topic_id: string;
  type: Question["type"];
  difficulty: Question["difficulty"];
  stem: string;
  correct_choice_id: string;
  explanation: string;
  exam_tip: string;
  tags: string[];
  content_question_choices?: {
    choice_id: string;
    text: string;
    sort_order: number;
  }[];
};

type ContentTopicRow = {
  id: string;
  slug: string;
  title: string;
  era: Topic["era"];
  short_description: string;
  exam_importance: number;
  estimated_minutes: number;
  keywords: string[];
  summary: Topic["summary"];
  must_know: string[];
  common_mistakes: string[];
  quick_timeline: Topic["quickTimeline"];
};

type ContentFlashcardRow = {
  id: string;
  topic_id: string;
  front: string;
  back: string;
  hint: string;
  tags: string[];
};

type ContentTimelineRow = {
  id: string;
  topic_id: string;
  date: string;
  title: string;
  description: string;
  tone: TimelineEvent["tone"];
};

export async function fetchTopicsFromSupabase(): Promise<Topic[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("content_topics")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return ((data ?? []) as ContentTopicRow[]).map(mapTopic);
}

export async function fetchTopicBySlugFromSupabase(slug: string): Promise<Topic | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("content_topics")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapTopic(data as ContentTopicRow);
}

export async function fetchTestsForTopicFromSupabase(topicId: string, level?: "kolay" | "orta" | "zor") {
  const supabase = createClient();
  if (!supabase) return [];

  let query = supabase
    .from("content_tests")
    .select("id, topic_id, title, level, level_label, test_no, question_count")
    .eq("topic_id", topicId)
    .eq("is_published", true)
    .order("level", { ascending: true })
    .order("test_no", { ascending: true });

  if (level) {
    query = query.eq("level", level);
  }

  const { data, error } = await query;

  if (error) throw error;

  return (data ?? []).map((item) => ({
    id: item.id,
    topicId: item.topic_id,
    title: item.title,
    level: item.level,
    levelLabel: item.level_label,
    testNo: item.test_no,
    questionCount: item.question_count,
    questionIds: [] as string[]
  }));
}

export async function fetchQuestionsForTestFromSupabase(testId: string): Promise<Question[]> {
  const supabase = createClient();
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
    .order("sort_order", { referencedTable: "content_question_choices", ascending: true });

  if (error) throw error;

  return ((data ?? []) as ContentQuestionRow[]).map(mapQuestion);
}

export async function fetchFlashcardsForTopicFromSupabase(topicId?: string): Promise<Flashcard[]> {
  const supabase = createClient();
  if (!supabase) return [];

  let query = supabase
    .from("content_flashcards")
    .select("id, topic_id, front, back, hint, tags")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (topicId) {
    query = query.eq("topic_id", topicId);
  }

  const { data, error } = await query;

  if (error) throw error;

  return ((data ?? []) as ContentFlashcardRow[]).map(mapFlashcard);
}

export async function fetchTimelineEventsFromSupabase(topicId?: string): Promise<TimelineEvent[]> {
  const supabase = createClient();
  if (!supabase) return [];

  let query = supabase
    .from("content_timeline_events")
    .select("id, topic_id, date, title, description, tone")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (topicId) {
    query = query.eq("topic_id", topicId);
  }

  const { data, error } = await query;

  if (error) throw error;

  return ((data ?? []) as ContentTimelineRow[]).map(mapTimelineEvent);
}

function mapTopic(row: ContentTopicRow): Topic {
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

function mapQuestion(row: ContentQuestionRow): Question {
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

function mapFlashcard(row: ContentFlashcardRow): Flashcard {
  return {
    id: row.id,
    topicId: row.topic_id,
    front: row.front,
    back: row.back,
    hint: row.hint,
    tags: row.tags ?? []
  };
}

function mapTimelineEvent(row: ContentTimelineRow): TimelineEvent {
  return {
    id: row.id,
    topicId: row.topic_id,
    date: row.date,
    title: row.title,
    description: row.description,
    tone: row.tone
  };
}
