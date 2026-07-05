export type RingTone = "sky" | "gold" | "mint" | "rose" | "violet";

export interface PerformanceRingMetric {
  id: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  tone: RingTone;
  helper: string;
}

export interface DailyStudyRecommendation {
  id: string;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  estimatedMinutes: number;
  targetTopicId: string;
  actionHref: string;
}

export interface DashboardSnapshot {
  dateIso: string;
  rings: PerformanceRingMetric[];
  weeklyTrend: {
    dayLabel: string;
    questionsSolved: number;
    accuracy: number;
    studyMinutes: number;
  }[];
  weakTopics: {
    topicId: string;
    title: string;
    masteryScore: number;
    reason: string;
  }[];
  recommendations: DailyStudyRecommendation[];
}
