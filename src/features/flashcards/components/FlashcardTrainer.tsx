"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import type { Flashcard, Topic } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";
import { Button } from "@/components/ui/button";

interface Props {
  cards: Flashcard[];
  topics: Topic[];
}

export function FlashcardTrainer({ cards, topics }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const recordReview = useStudyProgressStore((state) => state.recordFlashcardReview);

  const currentCard = cards[index];
  const currentTopic = topics.find((t) => t.id === currentCard.topicId);

  const handleReview = useCallback((remembered: boolean) => {
    recordReview({
      cardId: currentCard.id,
      topicId: currentCard.topicId,
      remembered,
    });
    toast.success(remembered ? "✅ Harika!" : "🔄 Tekrarlanacak");
    setFlipped(false);
    setShowHint(false);
    setIndex((prev) => (prev + 1) % cards.length);
  }, [currentCard, recordReview, cards.length]);

  const toggleFlip = () => {
    setFlipped(!flipped);
    setShowHint(false);
  };

  // Klavye desteği
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") toggleFlip();
      if (e.key === "ArrowRight") handleReview(true);
      if (e.key === "ArrowLeft") handleReview(false);
      if (e.key.toLowerCase() === "h") setShowHint(!showHint);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleReview, showHint]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleReview(false),
    onSwipedRight: () => handleReview(true),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Kart {index + 1} / {cards.length}</p>
          <h2 className="text-2xl font-semibold text-foreground">{currentTopic?.title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">Sola = Bilmiyorum • Sağa = Biliyorum</p>
      </div>

      {/* Quizlet Tarzı Kart */}
      <div className="relative h-[520px] mb-10" {...swipeHandlers}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 preserve-3d cursor-pointer"
            onClick={toggleFlip}
          >
            {/* Ön Yüz */}
            <div className={`absolute inset-0 backface-hidden rounded-3xl bg-white shadow-xl border p-16 flex flex-col items-center justify-center text-center ${flipped ? 'hidden' : ''}`}>
              <p className="text-5xl font-semibold leading-tight tracking-tight text-neutral-900">
                {currentCard.front}
              </p>
              <Button 
                variant="ghost" 
                className="mt-10 text-amber-600"
                onClick={(e) => { e.stopPropagation(); setShowHint(!showHint); }}
              >
                💡 İpucu
              </Button>
              {showHint && (
                <p className="mt-8 text-lg text-amber-600 italic">{currentCard.hint}</p>
              )}
            </div>

            {/* Arka Yüz */}
            <div className={`absolute inset-0 backface-hidden rounded-3xl bg-white shadow-xl border p-16 flex flex-col items-center justify-center text-center rotate-y-180 ${!flipped ? 'hidden' : ''}`}>
              <p className="text-5xl font-semibold leading-tight tracking-tight text-neutral-900">
                {currentCard.back}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Kontrol Butonları */}
      <div className="flex justify-center gap-6">
        <Button 
          size="lg" 
          variant="outline" 
          className="px-10"
          onClick={() => handleReview(false)}
        >
          Bilmiyorum
        </Button>

        <Button 
          size="lg" 
          variant="default" 
          className="px-10"
          onClick={toggleFlip}
        >
          Kartı Çevir
        </Button>

        <Button 
          size="lg" 
          className="px-10 bg-emerald-600 hover:bg-emerald-700"
          onClick={() => handleReview(true)}
        >
          Biliyorum
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-12">
        Klavye Kısayolları: Boşluk = Çevir • Sağ Ok = Biliyorum • Sol Ok = Bilmiyorum • H = İpucu
      </p>
    </div>
  );
}