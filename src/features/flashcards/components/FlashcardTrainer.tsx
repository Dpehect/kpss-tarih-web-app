"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Flashcard, Topic } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

/**
 * Etkileşimli flashcard antrenörü.
 */
export function FlashcardTrainer({ cards, topics }: { cards: Flashcard[]; topics: Topic[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const recordReview = useStudyProgressStore((state) => state.recordFlashcardReview);

  const card = cards[index];
  const topic = topics.find((item) => item.id === card.topicId);

  function review(remembered: boolean) {
    recordReview({
      cardId: card.id,
      topicId: card.topicId,
      remembered
    });
    toast.success(remembered ? "Hatırladım olarak kaydedildi" : "Tekrar gerekli olarak kaydedildi");
    setFlipped(false);
    setIndex((value) => (value + 1) % cards.length);
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        className="min-h-[430px] rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#f2c15f]/18 via-white/[0.08] to-[#52f2d0]/10 p-8 text-left shadow-[0_40px_120px_rgba(0,0,0,0.34)] backdrop-blur-2xl transition hover:-translate-y-1"
      >
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f6c465]">{topic?.title}</p>
        <h2 className="mt-10 text-4xl font-black tracking-[-0.06em] md:text-6xl">
          {flipped ? card.back : card.front}
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-8 text-[#ead7b7]/66">
          {flipped ? "Cevabı değerlendirdikten sonra hatırlama durumunu seç." : `İpucu: ${card.hint}`}
        </p>
      </button>

      <aside className="rounded-[2rem] parchment-surface p-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f6c465]">Kart {index + 1} / {cards.length}</p>
        <h3 className="mt-4 text-2xl font-black">Tekrar kontrolü</h3>
        <p className="mt-3 text-sm leading-7 text-[#ead7b7]/66">Kartı çevirip cevabı gördükten sonra durumunu kaydet.</p>
        <div className="mt-6 grid gap-2">
          <button onClick={() => review(true)} className="w-full rounded-full bg-[#52f2d0] px-5 py-3 font-black text-[#120b07]">
            Hatırladım
          </button>
          <button onClick={() => review(false)} className="w-full rounded-full bg-[#ff7968] px-5 py-3 font-black text-[#120b07]">
            Tekrar gerekli
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/[0.08] px-3 py-1 text-xs text-[#ead7b7]/70">
              {tag}
            </span>
          ))}
        </div>
      </aside>
    </section>
  );
}
