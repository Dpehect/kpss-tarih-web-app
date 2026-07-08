import { fetchContentFlashcards, fetchContentTopics } from "@/lib/content/supabase-content-server";
import { FlashcardTrainer } from "@/features/flashcards/components/FlashcardTrainer";

export async function FlashcardsPage() {
  const [topics, cards] = await Promise.all([fetchContentTopics(), fetchContentFlashcards()]);
  return <FlashcardTrainer cards={cards} topics={topics} />;
}
