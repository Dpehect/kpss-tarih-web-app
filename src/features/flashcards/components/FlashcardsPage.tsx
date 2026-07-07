import { expandedFlashcards as flashcards } from "@/data/expanded-flashcards";
import { topics } from "@/data/kpss-history";
import { FlashcardTrainer } from "@/features/flashcards/components/FlashcardTrainer";

export function FlashcardsPage() {
  return <FlashcardTrainer cards={flashcards} topics={topics} />;
}
