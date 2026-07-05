/**
 * KPSS Tarih domain tipleri.
 * Tüm modüller aynı veri sözleşmesini kullandığı için proje dağınık değil, tek merkezden genişletilebilir.
 */
export type HistoryEra =
  | "islamiyet-oncesi"
  | "turk-islam"
  | "osmanli"
  | "yenilesme"
  | "milli-mucadele"
  | "cumhuriyet"
  | "cagdas";

export type Difficulty = "temel" | "orta" | "ileri";
export type QuestionType = "single" | "case" | "chronology";

export interface TopicSummaryBlock {
  heading: string;
  body: string;
  bullets: string[];
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  era: HistoryEra;
  shortDescription: string;
  examImportance: number;
  estimatedMinutes: number;
  keywords: string[];
  summary: TopicSummaryBlock[];
  mustKnow: string[];
  commonMistakes: string[];
  quickTimeline: { date: string; event: string }[];
}

export interface QuestionChoice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  topicId: string;
  type: QuestionType;
  difficulty: Difficulty;
  stem: string;
  choices: QuestionChoice[];
  correctChoiceId: string;
  explanation: string;
  examTip: string;
  tags: string[];
}

export interface Flashcard {
  id: string;
  topicId: string;
  front: string;
  back: string;
  hint: string;
  tags: string[];
}

export interface Exam {
  id: string;
  title: string;
  durationMinutes: number;
  questionIds: string[];
  description: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  topicId: string;
  tone: "gold" | "turquoise" | "crimson" | "parchment";
}

export interface StudyRecommendation {
  id: string;
  title: string;
  description: string;
  href: string;
  minutes: number;
  priority: "yüksek" | "orta" | "düşük";
}

export interface QuestionAttempt {
  id: string;
  questionId: string;
  topicId: string;
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
  answeredAt: string;
}

export interface FlashcardReview {
  id: string;
  cardId: string;
  topicId: string;
  remembered: boolean;
  reviewedAt: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  score: number;
  total: number;
  completedAt: string;
}

export interface StudyNote {
  id: string;
  title: string;
  body: string;
  topicId?: string;
  createdAt: string;
}
