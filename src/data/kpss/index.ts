import { modularTopics } from "./topics";
import { modularQuestions } from "./questions";
import { modularFlashcards } from "./flashcards";
import { modularTimelineEvents } from "./timeline";
import { modularGlossary } from "./glossary";

export const topics = modularTopics;
export const questions = modularQuestions;
export const flashcards = modularFlashcards;
export const timelineEvents = modularTimelineEvents;
export const glossary = modularGlossary;

export const exams = [];
export const recommendations = [
  {
    id: "daily-kpss-history-book-flow",
    title: "Bugünün KPSS Tarih çalışma akışı",
    description: "Bir konu anlatım bloğu oku, 20 soru çöz, 10 flashcard tekrar et ve kronolojiyi kapat.",
    href: "/dashboard",
    minutes: 45,
    priority: "yüksek",
  },
  {
    id: "weak-topic-revision",
    title: "Zayıf konu tamiri",
    description: "Yanlış yaptığın başlığın konu anlatımı, sık hata ve timeline alanlarını tekrar et.",
    href: "/analytics",
    minutes: 25,
    priority: "orta",
  },
];

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR");
}

export function getTopicBySlug(slug: string) {
  const key = normalize(slug);
  return topics.find((topic) => normalize(topic.slug) === key || normalize(topic.id) === key);
}

export function getTopicById(id: string) {
  const key = normalize(id);
  return topics.find((topic) => normalize(topic.id) === key || normalize(topic.slug) === key);
}

export function getQuestionsByTopic(topicId: string) {
  const topic = getTopicById(topicId);
  const id = topic?.id ?? topicId;
  const slug = topic?.slug ?? topicId;
  return questions.filter((question) => {
    const topicSlug = (question as { topicSlug?: string }).topicSlug;
    return question.topicId === id || topicSlug === slug || topicSlug === id || question.topicId === slug;
  });
}

export function getFlashcardsByTopic(topicId: string) {
  const topic = getTopicById(topicId);
  const id = topic?.id ?? topicId;
  const slug = topic?.slug ?? topicId;
  return flashcards.filter((card) => {
    const topicSlug = (card as { topicSlug?: string }).topicSlug;
    return card.topicId === id || topicSlug === slug || topicSlug === id || card.topicId === slug;
  });
}

export function getTimelineEventsByTopic(topicId: string) {
  const topic = getTopicById(topicId);
  const id = topic?.id ?? topicId;
  const slug = topic?.slug ?? topicId;
  return timelineEvents.filter((event) => {
    const topicSlug = (event as { topicSlug?: string }).topicSlug;
    return event.topicId === id || topicSlug === slug || topicSlug === id || event.topicId === slug;
  });
}

export function getGlossaryByTopic(topicId: string) {
  const topic = getTopicById(topicId);
  const id = topic?.id ?? topicId;
  const slug = topic?.slug ?? topicId;
  return glossary.filter((item) => {
    const topicSlug = (item as { topicSlug?: string }).topicSlug;
    return item.topicId === id || item.topicId === slug || topicSlug === slug || topicSlug === id || item.period === topic?.title;
  });
}

export const modularData = {
  topics,
  questions,
  flashcards,
  timelineEvents,
  glossary,
  exams,
  recommendations,
};

export { modularTopics, modularQuestions, modularFlashcards, modularTimelineEvents, modularGlossary };
