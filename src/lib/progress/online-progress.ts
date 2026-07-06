import type {
  ExamResult,
  FlashcardReview,
  QuestionAttempt,
  StudyNote
} from "@/types/study";
import { createClient } from "@/lib/supabase/client";

export type RemoteProgressPayload = {
  completedTopicIds: string[];
  questionAttempts: QuestionAttempt[];
  flashcardReviews: FlashcardReview[];
  examResults: ExamResult[];
  notes: StudyNote[];
};

async function getUserId() {
  const supabase = createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user.id;
}

export async function fetchOnlineProgress(): Promise<RemoteProgressPayload | null> {
  const supabase = createClient();
  const userId = await getUserId();

  if (!userId) {
    return null;
  }

  const [
    topicProgress,
    questionAttempts,
    flashcardReviews,
    examResults,
    notes
  ] = await Promise.all([
    supabase
      .from("user_topic_progress")
      .select("topic_id, completed")
      .eq("user_id", userId)
      .eq("completed", true),
    supabase
      .from("question_attempts")
      .select("id, question_id, topic_id, selected_choice_id, correct_choice_id, is_correct, answered_at")
      .eq("user_id", userId)
      .order("answered_at", { ascending: true }),
    supabase
      .from("flashcard_reviews")
      .select("id, card_id, topic_id, remembered, reviewed_at")
      .eq("user_id", userId)
      .order("reviewed_at", { ascending: true }),
    supabase
      .from("exam_results")
      .select("id, exam_id, score, total, completed_at")
      .eq("user_id", userId)
      .order("completed_at", { ascending: true }),
    supabase
      .from("user_notes")
      .select("id, title, body, topic_id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
  ]);

  if (
    topicProgress.error ||
    questionAttempts.error ||
    flashcardReviews.error ||
    examResults.error ||
    notes.error
  ) {
    console.error("Supabase progress fetch error", {
      topicProgress: topicProgress.error,
      questionAttempts: questionAttempts.error,
      flashcardReviews: flashcardReviews.error,
      examResults: examResults.error,
      notes: notes.error
    });

    return null;
  }

  return {
    completedTopicIds: (topicProgress.data ?? []).map((row) => row.topic_id),
    questionAttempts: (questionAttempts.data ?? []).map((row) => ({
      id: row.id,
      questionId: row.question_id,
      topicId: row.topic_id,
      selectedChoiceId: row.selected_choice_id,
      correctChoiceId: row.correct_choice_id,
      isCorrect: row.is_correct,
      answeredAt: row.answered_at
    })),
    flashcardReviews: (flashcardReviews.data ?? []).map((row) => ({
      id: row.id,
      cardId: row.card_id,
      topicId: row.topic_id,
      remembered: row.remembered,
      reviewedAt: row.reviewed_at
    })),
    examResults: (examResults.data ?? []).map((row) => ({
      id: row.id,
      examId: row.exam_id,
      score: row.score,
      total: row.total,
      completedAt: row.completed_at
    })),
    notes: (notes.data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      body: row.body,
      topicId: row.topic_id ?? undefined,
      createdAt: row.created_at
    }))
  };
}

export async function saveOnlineTopicProgress(topicId: string) {
  const supabase = createClient();
  const userId = await getUserId();

  if (!userId) return { ok: false, reason: "signed-out" as const };

  const { error } = await supabase.from("user_topic_progress").upsert(
    {
      user_id: userId,
      topic_id: topicId,
      completed: true,
      completed_at: new Date().toISOString()
    },
    {
      onConflict: "user_id,topic_id"
    }
  );

  if (error) {
    console.error("saveOnlineTopicProgress", error);
    return { ok: false, reason: "error" as const };
  }

  return { ok: true as const };
}

export async function saveOnlineQuestionAttempt(input: {
  questionId: string;
  topicId: string;
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
}) {
  const supabase = createClient();
  const userId = await getUserId();

  if (!userId) return { ok: false, reason: "signed-out" as const };

  const { error } = await supabase.from("question_attempts").insert({
    user_id: userId,
    question_id: input.questionId,
    topic_id: input.topicId,
    selected_choice_id: input.selectedChoiceId,
    correct_choice_id: input.correctChoiceId,
    is_correct: input.isCorrect
  });

  if (error) {
    console.error("saveOnlineQuestionAttempt", error);
    return { ok: false, reason: "error" as const };
  }

  return { ok: true as const };
}

export async function saveOnlineFlashcardReview(input: {
  cardId: string;
  topicId: string;
  remembered: boolean;
}) {
  const supabase = createClient();
  const userId = await getUserId();

  if (!userId) return { ok: false, reason: "signed-out" as const };

  const { error } = await supabase.from("flashcard_reviews").insert({
    user_id: userId,
    card_id: input.cardId,
    topic_id: input.topicId,
    remembered: input.remembered
  });

  if (error) {
    console.error("saveOnlineFlashcardReview", error);
    return { ok: false, reason: "error" as const };
  }

  return { ok: true as const };
}

export async function saveOnlineExamResult(input: {
  examId: string;
  score: number;
  total: number;
}) {
  const supabase = createClient();
  const userId = await getUserId();

  if (!userId) return { ok: false, reason: "signed-out" as const };

  const { error } = await supabase.from("exam_results").insert({
    user_id: userId,
    exam_id: input.examId,
    score: input.score,
    total: input.total
  });

  if (error) {
    console.error("saveOnlineExamResult", error);
    return { ok: false, reason: "error" as const };
  }

  return { ok: true as const };
}

export async function saveOnlineNote(input: {
  id: string;
  title: string;
  body: string;
  topicId?: string;
}) {
  const supabase = createClient();
  const userId = await getUserId();

  if (!userId) return { ok: false, reason: "signed-out" as const };

  const { error } = await supabase.from("user_notes").upsert({
    id: input.id,
    user_id: userId,
    title: input.title,
    body: input.body,
    topic_id: input.topicId ?? null,
    updated_at: new Date().toISOString()
  });

  if (error) {
    console.error("saveOnlineNote", error);
    return { ok: false, reason: "error" as const };
  }

  return { ok: true as const };
}

export async function deleteOnlineNote(id: string) {
  const supabase = createClient();
  const userId = await getUserId();

  if (!userId) return { ok: false, reason: "signed-out" as const };

  const { error } = await supabase
    .from("user_notes")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("deleteOnlineNote", error);
    return { ok: false, reason: "error" as const };
  }

  return { ok: true as const };
}

export async function syncLocalProgressToOnline(input: RemoteProgressPayload) {
  const supabase = createClient();
  const userId = await getUserId();

  if (!userId) return { ok: false, reason: "signed-out" as const };

  const topicRows = input.completedTopicIds.map((topicId) => ({
    user_id: userId,
    topic_id: topicId,
    completed: true
  }));

  const questionRows = input.questionAttempts.map((attempt) => ({
    user_id: userId,
    question_id: attempt.questionId,
    topic_id: attempt.topicId,
    selected_choice_id: attempt.selectedChoiceId,
    correct_choice_id: attempt.correctChoiceId,
    is_correct: attempt.isCorrect,
    answered_at: attempt.answeredAt
  }));

  const flashcardRows = input.flashcardReviews.map((review) => ({
    user_id: userId,
    card_id: review.cardId,
    topic_id: review.topicId,
    remembered: review.remembered,
    reviewed_at: review.reviewedAt
  }));

  const examRows = input.examResults.map((result) => ({
    user_id: userId,
    exam_id: result.examId,
    score: result.score,
    total: result.total,
    completed_at: result.completedAt
  }));

  const noteRows = input.notes.map((note) => ({
    id: note.id,
    user_id: userId,
    topic_id: note.topicId ?? null,
    title: note.title,
    body: note.body,
    created_at: note.createdAt
  }));

  const operations = [];

  if (topicRows.length) {
    operations.push(
      supabase.from("user_topic_progress").upsert(topicRows, {
        onConflict: "user_id,topic_id"
      })
    );
  }

  if (questionRows.length) {
    operations.push(supabase.from("question_attempts").insert(questionRows));
  }

  if (flashcardRows.length) {
    operations.push(supabase.from("flashcard_reviews").insert(flashcardRows));
  }

  if (examRows.length) {
    operations.push(supabase.from("exam_results").insert(examRows));
  }

  if (noteRows.length) {
    operations.push(supabase.from("user_notes").upsert(noteRows));
  }

  const results = await Promise.all(operations);
  const error = results.find((result) => result.error)?.error;

  if (error) {
    console.error("syncLocalProgressToOnline", error);
    return { ok: false, reason: "error" as const };
  }

  return { ok: true as const };
}
