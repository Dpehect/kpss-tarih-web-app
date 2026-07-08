import { flashcards } from "@/data/kpss-history";

export const expandedFlashcards = flashcards;
export const generatedTopicFlashcards = [];

export function getFlashcardsForTopic(topicId?: string) {
  if (!topicId) return expandedFlashcards;
  return expandedFlashcards.filter((card) => card.topicId === topicId);
}

export function getExpandedFlashcardAuditReport() {
  return {
    baseCount: flashcards.length,
    expandedCount: expandedFlashcards.length,
    mode: "supabase"
  };
}
