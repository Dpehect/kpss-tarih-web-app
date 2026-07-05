export interface TimelineActor {
  name: string;
  role: string;
}

export interface TimelineMetric {
  label: string;
  value: string;
  explanation: string;
}

export interface TimelineChapter {
  id: string;
  order: number;
  periodLabel: string;
  dateRange: string;
  title: string;
  subtitle: string;
  narrative: string;
  keyEvents: string[];
  causeEffect: {
    cause: string;
    effect: string;
  }[];
  actors: TimelineActor[];
  metrics: TimelineMetric[];
  visual: {
    motif: "map" | "seal" | "battle" | "reform" | "treaty" | "assembly";
    gradient: string;
    focusLabel: string;
  };
  questionBridge: {
    prompt: string;
    targetTopicId: string;
  };
}
