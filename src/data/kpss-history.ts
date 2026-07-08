import type { Exam, Flashcard, Question, TimelineEvent, Topic } from "@/types/study";

function topic(
  id: string,
  slug: string,
  title: string,
  shortDescription: string,
  examImportance = 80,
  estimatedMinutes = 40
): Topic {
  return {
    id,
    slug,
    title,
    era: "cumhuriyet",
    shortDescription,
    examImportance,
    estimatedMinutes,
    keywords: [],
    summary: [],
    mustKnow: [],
    commonMistakes: [],
    quickTimeline: []
  };
}

/*
  Ultra-lite local fallback.
  Asıl içerik Supabase content_* tablolarından okunur.
  Bu dosya sadece build/generateStaticParams/fallback kırılmasın diye küçük tutulur.
*/
export const topics: Topic[] = [
  topic(
    "islamiyet-oncesi",
    "islamiyet-oncesi-turk-tarihi",
    "İslamiyet Öncesi Türk Tarihi",
    "İlk Türk devletleri, kültür ve teşkilat yapısı."
  ),
  topic(
    "turk-islam",
    "turk-islam-tarihi",
    "Türk-İslam Tarihi",
    "İlk Türk-İslam devletleri ve medeniyet yapısı."
  ),
  topic(
    "osmanli",
    "osmanli-tarihi",
    "Osmanlı Tarihi",
    "Osmanlı siyasi, sosyal ve idari yapısı."
  ),
  topic(
    "yenilesme",
    "osmanli-yenilesme",
    "Osmanlı Yenileşme",
    "Islahatlar, anayasal gelişmeler ve modernleşme."
  ),
  topic(
    "milli-mucadele",
    "milli-mucadele",
    "Milli Mücadele",
    "Kurtuluş Savaşı süreci ve kongreler."
  ),
  topic(
    "cumhuriyet",
    "cumhuriyet-donemi",
    "Cumhuriyet Dönemi",
    "Atatürk ilke ve inkılapları."
  ),
  topic(
    "cagdas",
    "cagdas-turk-ve-dunya-tarihi",
    "Çağdaş Türk ve Dünya Tarihi",
    "20. yüzyıl gelişmeleri."
  )
];

export const questions: Question[] = [];
export const flashcards: Flashcard[] = [];
export const timelineEvents: TimelineEvent[] = [];
export const exams: Exam[] = [];

export const studyRecommendations = [
  {
    id: "supabase-mode",
    title: "Supabase içerik modu",
    description: "Bu sürümde büyük içerik verileri local bundle yerine Supabase'den okunur.",
    href: "/question-bank",
    minutes: 20,
    priority: "yüksek"
  }
];

const readCompatText = (value: unknown, keys: string[], fallback = "") => {
  const record = value as unknown as Record<string, unknown>;

  for (const key of keys) {
    const item = record[key];

    if (typeof item === "string" && item.trim()) return item.trim();
    if (typeof item === "number") return String(item);
  }

  return fallback;
};

// Build compatibility exports.
export const glossary = flashcards.map((card, index) => ({
  id: readCompatText(card, ["id"], `glossary-${index + 1}`),
  term: readCompatText(card, ["term", "front", "question", "title"], `Kavram ${index + 1}`),
  definition: readCompatText(card, ["definition", "back", "answer", "content"], ""),
  topicId: readCompatText(card, ["topicId", "topic_id"], topics[0]?.id ?? "general"),
  relatedTerms: [],
  tags: [],
  example: "",
  whyImportant: ""
}));

export function getGlossaryByTopic(topicId: string) {
  return glossary.filter((item) => item.topicId === topicId);
}

export const recommendations = studyRecommendations;
