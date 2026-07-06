import { createClient } from "@/lib/supabase/client";

export type AdminContentType =
  | "topic"
  | "question"
  | "flashcard"
  | "exam"
  | "timeline"
  | "glossary"
  | "announcement";

export type AdminContentStatus = "draft" | "published" | "archived";

export type AdminContentItem = {
  id: string;
  type: AdminContentType;
  title: string;
  description: string | null;
  payload: Record<string, unknown>;
  status: AdminContentStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminUserRow = {
  id: string;
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
  completedTopics: number;
  questionAttempts: number;
  correctAnswers: number;
  flashcardReviews: number;
  examResults: number;
  notes: number;
  lastActivity: string | null;
};

export type AdminOverview = {
  totalUsers: number;
  totalQuestionAttempts: number;
  totalCorrectAnswers: number;
  totalFlashcardReviews: number;
  totalExamResults: number;
  totalNotes: number;
  totalCompletedTopics: number;
  activeUsers: number;
  users: AdminUserRow[];
};

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

type AttemptRow = {
  user_id: string;
  is_correct: boolean;
  answered_at: string;
};

type TopicProgressRow = {
  user_id: string;
  completed_at: string;
};

type FlashcardRow = {
  user_id: string;
  reviewed_at: string;
};

type ExamRow = {
  user_id: string;
  completed_at: string;
};

type NoteRow = {
  user_id: string;
  created_at: string;
};

function getAdminSupabaseClient() {
  const supabase = createClient();

  if (!supabase) {
    throw new Error("Supabase environment variables eksik.");
  }

  return supabase;
}

export async function fetchAdminOverview(): Promise<AdminOverview> {
  const supabase = getAdminSupabaseClient();

  const [
    profiles,
    topicProgress,
    questionAttempts,
    flashcardReviews,
    examResults,
    notes
  ] = await Promise.all([
    supabase.from("profiles").select("id, email, full_name, avatar_url, created_at"),
    supabase.from("user_topic_progress").select("user_id, completed_at"),
    supabase.from("question_attempts").select("user_id, is_correct, answered_at"),
    supabase.from("flashcard_reviews").select("user_id, reviewed_at"),
    supabase.from("exam_results").select("user_id, completed_at"),
    supabase.from("user_notes").select("user_id, created_at")
  ]);

  const firstError =
    profiles.error ??
    topicProgress.error ??
    questionAttempts.error ??
    flashcardReviews.error ??
    examResults.error ??
    notes.error;

  if (firstError) {
    throw new Error(firstError.message);
  }

  const profileRows = (profiles.data ?? []) as ProfileRow[];
  const topicRows = (topicProgress.data ?? []) as TopicProgressRow[];
  const attemptRows = (questionAttempts.data ?? []) as AttemptRow[];
  const flashcardRows = (flashcardReviews.data ?? []) as FlashcardRow[];
  const examRows = (examResults.data ?? []) as ExamRow[];
  const noteRows = (notes.data ?? []) as NoteRow[];

  const users = profileRows.map((profile) => {
    const userAttempts = attemptRows.filter((row) => row.user_id === profile.id);
    const userTopics = topicRows.filter((row) => row.user_id === profile.id);
    const userFlashcards = flashcardRows.filter((row) => row.user_id === profile.id);
    const userExams = examRows.filter((row) => row.user_id === profile.id);
    const userNotes = noteRows.filter((row) => row.user_id === profile.id);

    const activityDates = [
      ...userAttempts.map((row) => row.answered_at),
      ...userTopics.map((row) => row.completed_at),
      ...userFlashcards.map((row) => row.reviewed_at),
      ...userExams.map((row) => row.completed_at),
      ...userNotes.map((row) => row.created_at)
    ].filter(Boolean);

    const lastActivity = activityDates.length
      ? activityDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
      : null;

    return {
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name,
      avatarUrl: profile.avatar_url,
      createdAt: profile.created_at,
      completedTopics: userTopics.length,
      questionAttempts: userAttempts.length,
      correctAnswers: userAttempts.filter((row) => row.is_correct).length,
      flashcardReviews: userFlashcards.length,
      examResults: userExams.length,
      notes: userNotes.length,
      lastActivity
    };
  });

  const now = Date.now();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

  return {
    totalUsers: users.length,
    totalQuestionAttempts: attemptRows.length,
    totalCorrectAnswers: attemptRows.filter((row) => row.is_correct).length,
    totalFlashcardReviews: flashcardRows.length,
    totalExamResults: examRows.length,
    totalNotes: noteRows.length,
    totalCompletedTopics: topicRows.length,
    activeUsers: users.filter((user) => {
      if (!user.lastActivity) return false;
      return now - new Date(user.lastActivity).getTime() <= sevenDaysMs;
    }).length,
    users: users.sort((a, b) => {
      const aTime = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
      const bTime = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
      return bTime - aTime;
    })
  };
}

export async function fetchAdminContentItems() {
  const supabase = getAdminSupabaseClient();

  const { data, error } = await supabase
    .from("admin_content_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminContentItem[];
}

export async function createAdminContentItem(input: {
  type: AdminContentType;
  title: string;
  description?: string;
  payload: Record<string, unknown>;
  status: AdminContentStatus;
}) {
  const supabase = getAdminSupabaseClient();
  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase.from("admin_content_items").insert({
    type: input.type,
    title: input.title,
    description: input.description ?? null,
    payload: input.payload,
    status: input.status,
    created_by: userData.user?.id ?? null
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateAdminContentStatus(id: string, status: AdminContentStatus) {
  const supabase = getAdminSupabaseClient();

  const { error } = await supabase
    .from("admin_content_items")
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteAdminContentItem(id: string) {
  const supabase = getAdminSupabaseClient();

  const { error } = await supabase
    .from("admin_content_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
