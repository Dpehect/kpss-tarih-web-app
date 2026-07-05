export type KpssHistoryPeriod =
  | "islamiyet-oncesi-turk-tarihi"
  | "ilk-turk-islam-devletleri"
  | "osmanli-kurulus-yukselis"
  | "osmanli-duraklama-gerileme"
  | "yenilesme-ve-demokratiklesme"
  | "kurtulus-savasi"
  | "atatürk-ilke-inkilaplari"
  | "cagdas-turk-dunya-tarihi";

export type CognitiveSkill =
  | "recall"
  | "chronology"
  | "cause_effect"
  | "concept_relation"
  | "source_interpretation"
  | "comparison";

export type DifficultyBand = "foundational" | "standard" | "advanced";

export interface TopicNode {
  id: string;
  slug: string;
  title: string;
  period: KpssHistoryPeriod;
  parentId?: string;
  summary: string;
  prerequisites: string[];
  relatedTopicIds: string[];
  examWeight: number;
  estimatedMinutes: number;
  tags: string[];
}

export interface Flashcard {
  id: string;
  topicId: string;
  period: KpssHistoryPeriod;
  front: {
    prompt: string;
    hint?: string;
    media?: {
      type: "image" | "map" | "timeline";
      src: string;
      alt: string;
    };
  };
  back: {
    answer: string;
    explanation: string;
    memoryHook?: string;
    commonConfusions?: string[];
  };
  cognitiveSkill: CognitiveSkill;
  difficulty: DifficultyBand;
  spacedRepetition: {
    easeFactor: number;
    intervalDays: number;
    repetitions: number;
    dueAt: string;
    lastReviewedAt?: string;
  };
  analytics: {
    totalViews: number;
    correctRecalls: number;
    weakSignals: string[];
  };
}

export interface QuestionChoice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  topicId: string;
  period: KpssHistoryPeriod;
  stem: string;
  choices: QuestionChoice[];
  correctChoiceId: string;
  explanation: {
    correct: string;
    wrongChoiceRationales: Record<string, string>;
    examTip?: string;
  };
  cognitiveSkill: CognitiveSkill;
  difficulty: DifficultyBand;
  tags: string[];
  source: {
    origin: "original" | "past_kpss_style" | "past_question";
    year?: number;
    citation?: string;
  };
  adaptive: {
    baseWeight: number;
    misconceptionTags: string[];
    prerequisiteTopicIds: string[];
  };
}

export interface UserAttempt {
  id: string;
  userId: string;
  questionId: string;
  topicId: string;
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
  answeredAt: string;
  elapsedSeconds: number;
  confidence: 1 | 2 | 3 | 4 | 5;
  cognitiveSkill: CognitiveSkill;
  misconceptionTags: string[];
}

export interface TopicMasterySnapshot {
  topicId: string;
  accuracy: number;
  attemptCount: number;
  wrongCount: number;
  averageConfidence: number;
  recencyPenalty: number;
  masteryScore: number;
  nextReviewPriority: number;
}
