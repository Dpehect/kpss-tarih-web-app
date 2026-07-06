import { PageHeader } from "@/components/core/PageHeader";
import { flashcards, topics } from "@/data/kpss-history";
import { FlashcardTrainer } from "@/features/flashcards/components/FlashcardTrainer";

export function FlashcardsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Flashcard"
        title="Aktif hatırlama kartları."
        description="Kartları çevir, sürükle, hatırlama durumunu kaydet ve tekrar akışını düzenli takip et."
      />

      <FlashcardTrainer cards={flashcards} topics={topics} />
    </div>
  );
}
