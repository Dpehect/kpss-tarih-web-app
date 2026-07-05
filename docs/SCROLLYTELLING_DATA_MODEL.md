# Scrollytelling Data Model

## TimelineChapter

```ts
interface TimelineChapter {
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
  actors: {
    name: string;
    role: string;
  }[];
  metrics: {
    label: string;
    value: string;
    explanation: string;
  }[];
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
```

## Neden JSON?

- İçerik editörü teknik bilgi bilmeden timeline yazabilir.
- Her dönem yeni bir chapter olarak eklenebilir.
- Aynı model ileride interaktif harita, mini quiz veya concept map ile ilişkilendirilebilir.

## İleride eklenecek alanlar

```ts
media?: {
  type: "svg-map" | "image" | "lottie" | "r3f-scene";
  src: string;
  alt: string;
}

quizCheckpoint?: {
  questionIds: string[];
  requiredToContinue: boolean;
}

deepLinks?: {
  topicSlug: string;
  flashcardSetId: string;
}
```
