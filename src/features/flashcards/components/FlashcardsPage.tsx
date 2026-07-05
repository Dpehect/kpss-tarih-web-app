import { PageHeader } from "@/components/core/PageHeader";
import { flashcards, topics } from "@/data/kpss-history";
import { FlashcardTrainer } from "@/features/flashcards/components/FlashcardTrainer";

/**
 * Flashcard sayfası.
 */
export function FlashcardsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`${flashcards.length} Flashcard`}
        title="Kısa bilgi kartlarıyla aktif hatırlama."
        description="Kartları çevir, hatırlama durumunu kaydet, dashboard'daki tekrar ilerlemeni gerçek zamanlı güncelle."
      />
      <FlashcardTrainer cards={flashcards} topics={topics} />
    </div>
  );
}
