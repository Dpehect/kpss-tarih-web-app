"use client";

import { motion } from "framer-motion";
import type { Flashcard } from "@/types/study";
import { useFlashcardFlip } from "@/features/flashcards/hooks/useFlashcardFlip";

type Flashcard3DProps = {
  flashcard: Flashcard;
};

export function Flashcard3D({ flashcard }: Flashcard3DProps) {
  const flip = useFlashcardFlip();

  return (
    <div className="perspective-[1600px]">
      <motion.button
        type="button"
        onClick={flip.flip}
        className="relative min-h-96 w-full cursor-pointer rounded-[2.5rem] text-left outline-none"
        animate={{ rotateY: flip.isBack ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        aria-label="Flashcard çevir"
      >
        <div className="absolute inset-0 rounded-[2.5rem] border border-black/5 bg-white/75 p-8 shadow-[0_34px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl [backface-visibility:hidden]">
          <p className="text-sm font-medium tracking-[0.2em] text-neutral-500 uppercase">
            Aktif Hatırlama
          </p>
          <h3 className="mt-8 text-4xl font-semibold tracking-[-0.055em] text-neutral-950">
            {flashcard.front.prompt}
          </h3>
          {flashcard.front.hint ? (
            <p className="mt-8 rounded-2xl bg-neutral-950 p-4 text-sm leading-6 text-white">
              İpucu: {flashcard.front.hint}
            </p>
          ) : null}
          <p className="absolute bottom-8 left-8 text-sm text-neutral-500">
            Cevabı görmek için karta tıkla.
          </p>
        </div>

        <div className="absolute inset-0 rounded-[2.5rem] border border-black/5 bg-neutral-950 p-8 text-white shadow-[0_34px_100px_rgba(15,23,42,0.16)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm font-medium tracking-[0.2em] text-white/50 uppercase">
            Cevap ve Gerekçe
          </p>
          <h3 className="mt-8 text-3xl font-semibold tracking-tight">
            {flashcard.back.answer}
          </h3>
          <p className="mt-6 text-base leading-8 text-white/72">
            {flashcard.back.explanation}
          </p>
          {flashcard.back.memoryHook ? (
            <p className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-white/82">
              Hafıza kancası: {flashcard.back.memoryHook}
            </p>
          ) : null}
        </div>
      </motion.button>
    </div>
  );
}
