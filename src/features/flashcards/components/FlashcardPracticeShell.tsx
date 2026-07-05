"use client";

import flashcards from "@/data/flashcards.json";
import { Flashcard3D } from "@/features/flashcards/components/Flashcard3D";

export function FlashcardPracticeShell() {
  const first = flashcards[0];

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase">3D Recall</p>
        <h2 className="mt-3 text-5xl font-semibold tracking-[-0.06em]">Flashcard pratiği</h2>
        <p className="mt-4 max-w-2xl text-neutral-600">
          Framer Motion ile 3D flip, sonraki fazda confidence rating ve spaced repetition güncellemesiyle bağlanacak.
        </p>
      </div>
      <Flashcard3D flashcard={first} />
    </section>
  );
}
