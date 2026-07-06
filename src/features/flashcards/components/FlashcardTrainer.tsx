"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  animate,
  motion,
  type PanInfo,
  useMotionValue,
  useTransform
} from "framer-motion";
import { toast } from "sonner";
import { saveOnlineFlashcardReview } from "@/lib/progress/online-progress";
import type { Flashcard, Topic } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

/**
 * Flashcard trainer.
 * Giriş varsa tekrar sonuçlarını Supabase'e de kaydeder.
 */
type FlashcardTrainerProps = {
  cards: Flashcard[];
  topics: Topic[];
};

const SWIPE_THRESHOLD = 120;

export function FlashcardTrainer({ cards, topics }: FlashcardTrainerProps) {
  const [selectedTopicId, setSelectedTopicId] = useState("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const recordReview = useStudyProgressStore((state) => state.recordFlashcardReview);
  const reviews = useStudyProgressStore((state) => state.flashcardReviews);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-9, 0, 9]);
  const knowOpacity = useTransform(x, [24, 150], [0, 1]);
  const againOpacity = useTransform(x, [-150, -24], [1, 0]);

  const filteredCards = useMemo(() => {
    if (selectedTopicId === "all") return cards;
    return cards.filter((card) => card.topicId === selectedTopicId);
  }, [cards, selectedTopicId]);

  const deckTopics = useMemo(() => {
    const topicIds = new Set(cards.map((card) => card.topicId));
    return topics.filter((topic) => topicIds.has(topic.id));
  }, [cards, topics]);

  const currentCard = filteredCards[index] ?? filteredCards[0];
  const currentTopic = topics.find((topic) => topic.id === currentCard?.topicId);

  const reviewedCardIds = useMemo(
    () => new Set(reviews.map((review) => review.cardId)),
    [reviews]
  );

  const rememberedCount = reviews.filter((review) => review.remembered).length;
  const reviewCount = reviews.length;
  const successRate = reviewCount ? Math.round((rememberedCount / reviewCount) * 100) : 0;
  const deckProgress = filteredCards.length
    ? Math.round(((index + 1) / filteredCards.length) * 100)
    : 0;

  const frontTextClass = getCardTextClass(currentCard?.front ?? "");
  const backTextClass = getCardTextClass(currentCard?.back ?? "");

  const resetCardVisualState = useCallback(() => {
    setFlipped(false);
    setShowHint(false);
    x.set(0);
  }, [x]);

  const goToNextCard = useCallback(() => {
    setIndex((previousIndex) => {
      if (filteredCards.length === 0) return 0;
      return (previousIndex + 1) % filteredCards.length;
    });
    resetCardVisualState();
  }, [filteredCards.length, resetCardVisualState]);

  const commitReview = useCallback(
    async (remembered: boolean, direction: 1 | -1) => {
      if (!currentCard || isAnimatingOut) return;

      setIsAnimatingOut(true);

      recordReview({
        cardId: currentCard.id,
        topicId: currentCard.topicId,
        remembered
      });

      void saveOnlineFlashcardReview({
        cardId: currentCard.id,
        topicId: currentCard.topicId,
        remembered
      });

      toast.success(
        remembered
          ? "Biliyorum olarak kaydedildi"
          : "Tekrar gerekli olarak kaydedildi"
      );

      await animate(x, direction * 640, {
        duration: 0.24,
        ease: [0.22, 1, 0.36, 1]
      });

      setIndex((previousIndex) => {
        if (filteredCards.length === 0) return 0;
        return (previousIndex + 1) % filteredCards.length;
      });

      resetCardVisualState();
      setIsAnimatingOut(false);
    },
    [
      currentCard,
      filteredCards.length,
      isAnimatingOut,
      recordReview,
      resetCardVisualState,
      x
    ]
  );

  function handleTopicChange(topicId: string) {
    setSelectedTopicId(topicId);
    setIndex(0);
    resetCardVisualState();
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (isAnimatingOut) return;

    if (info.offset.x > SWIPE_THRESHOLD) {
      void commitReview(true, 1);
      return;
    }

    if (info.offset.x < -SWIPE_THRESHOLD) {
      void commitReview(false, -1);
      return;
    }

    void animate(x, 0, {
      type: "spring",
      stiffness: 420,
      damping: 32
    });
  }

  function shuffleDeck() {
    if (filteredCards.length <= 1) return;
    setIndex(Math.floor(Math.random() * filteredCards.length));
    resetCardVisualState();
    toast.success("Kart destesi karıştırıldı");
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (isTyping || !currentCard) return;

      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        setFlipped((value) => !value);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        void commitReview(true, 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        void commitReview(false, -1);
      }

      if (event.key.toLowerCase() === "h") {
        setShowHint((value) => !value);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commitReview, currentCard]);

  if (!currentCard || !currentTopic) {
    return (
      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-8 text-center backdrop-blur-2xl">
        <h2 className="text-3xl font-black tracking-[-0.05em]">Bu filtrede kart yok.</h2>
        <p className="mt-3 text-[#ead7b7]/64">Başka bir konu seçerek devam et.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-5">
        <div className="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(242,193,95,0.18),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(82,242,208,0.10),transparent_28%),rgba(255,255,255,0.055)] p-4 shadow-[0_28px_110px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-6">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f6c465]">
                {currentTopic.title}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] md:text-3xl">
                Kart {index + 1} / {filteredCards.length}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={shuffleDeck}
                className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-bold text-[#ead7b7] transition hover:bg-white/[0.12]"
              >
                Karıştır
              </button>
              <button
                type="button"
                onClick={goToNextCard}
                className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-bold text-[#ead7b7] transition hover:bg-white/[0.12]"
              >
                Atla
              </button>
            </div>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#f2c15f] via-[#ff8b3d] to-[#52f2d0]"
              style={{ width: `${deckProgress}%` }}
            />
          </div>

          <div className="relative mx-auto grid min-h-[520px] max-w-3xl place-items-center overflow-hidden rounded-[2.25rem] bg-[#120b07]/40 p-4">
            <motion.div
              style={{ opacity: againOpacity }}
              className="pointer-events-none absolute left-8 top-8 z-20 rounded-2xl border border-[#ff7968]/40 bg-[#ff7968]/18 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#ffb4aa]"
            >
              Tekrar
            </motion.div>

            <motion.div
              style={{ opacity: knowOpacity }}
              className="pointer-events-none absolute right-8 top-8 z-20 rounded-2xl border border-[#52f2d0]/40 bg-[#52f2d0]/18 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#b8fff1]"
            >
              Biliyorum
            </motion.div>

            <motion.div
              drag="x"
              dragElastic={0.18}
              dragMomentum={false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.025, cursor: "grabbing" }}
              style={{ x, rotate }}
              className="relative h-[460px] w-full max-w-[680px] cursor-grab touch-pan-y select-none"
              role="group"
              aria-label="Sürüklenebilir flashcard"
            >
              <motion.div
                onClick={() => setFlipped((value) => !value)}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 grid grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[2.25rem] border border-[#f2c15f]/24 bg-[radial-gradient(circle_at_20%_10%,rgba(242,193,95,0.24),transparent_34%),linear-gradient(135deg,rgba(255,248,232,0.16),rgba(255,255,255,0.045))] p-7 shadow-[0_36px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <CardHeader
                    side="Ön yüz"
                    subtitle={currentTopic.title}
                    accent="gold"
                  />

                  <div className="flex min-h-0 items-center justify-center overflow-y-auto px-1 py-5">
                    <h3 className={`${frontTextClass} max-w-[18ch] break-words text-center font-black tracking-[-0.06em] text-[#fff8e8]`}>
                      {currentCard.front}
                    </h3>
                  </div>
                </div>

                <div
                  className="absolute inset-0 grid grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[2.25rem] border border-[#52f2d0]/24 bg-[radial-gradient(circle_at_80%_10%,rgba(82,242,208,0.18),transparent_34%),linear-gradient(135deg,rgba(18,11,7,0.92),rgba(52,24,15,0.72))] p-7 shadow-[0_36px_120px_rgba(0,0,0,0.44)] backdrop-blur-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <CardHeader
                    side="Arka yüz"
                    subtitle="Cevap"
                    accent="turquoise"
                  />

                  <div className="flex min-h-0 items-center justify-center overflow-y-auto px-1 py-5">
                    <h3 className={`${backTextClass} max-w-[20ch] break-words text-center font-black tracking-[-0.055em] text-[#fff8e8]`}>
                      {currentCard.back}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {showHint ? (
            <div className="mt-5 rounded-[1.5rem] border border-[#f2c15f]/20 bg-[#f2c15f]/10 p-4">
              <p className="text-sm font-black text-[#f6c465]">İpucu</p>
              <p className="mt-2 text-sm leading-7 text-[#ead7b7]/72">
                {currentCard.hint}
              </p>
            </div>
          ) : null}

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <button
              type="button"
              onClick={() => void commitReview(false, -1)}
              className="rounded-[1.25rem] border border-[#ff7968]/30 bg-[#ff7968]/14 px-5 py-4 font-black text-[#ffc0b8] transition hover:-translate-y-0.5 hover:bg-[#ff7968]/20"
            >
              Tekrar gerekli
            </button>

            <button
              type="button"
              onClick={() => setFlipped((value) => !value)}
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.08] px-5 py-4 font-black text-[#fff8e8] transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
            >
              Kartı çevir
            </button>

            <button
              type="button"
              onClick={() => setShowHint((value) => !value)}
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.08] px-5 py-4 font-black text-[#fff8e8] transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
            >
              İpucu
            </button>

            <button
              type="button"
              onClick={() => void commitReview(true, 1)}
              className="rounded-[1.25rem] border border-[#52f2d0]/30 bg-[#52f2d0]/14 px-5 py-4 font-black text-[#b8fff1] transition hover:-translate-y-0.5 hover:bg-[#52f2d0]/20"
            >
              Biliyorum
            </button>
          </div>
        </div>
      </div>

      <aside className="space-y-5">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f6c465]">
            Deste filtresi
          </p>

          <div className="mt-5 max-h-[420px] space-y-2 overflow-y-auto pr-1">
            <button
              type="button"
              onClick={() => handleTopicChange("all")}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                selectedTopicId === "all"
                  ? "bg-[#f2c15f] text-[#120b07]"
                  : "bg-white/[0.06] text-[#ead7b7]/70 hover:bg-white/[0.1]"
              }`}
            >
              Tüm kartlar
              <span className="ml-2 opacity-60">({cards.length})</span>
            </button>

            {deckTopics.map((topic) => {
              const count = cards.filter((card) => card.topicId === topic.id).length;

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleTopicChange(topic.id)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                    selectedTopicId === topic.id
                      ? "bg-[#f2c15f] text-[#120b07]"
                      : "bg-white/[0.06] text-[#ead7b7]/70 hover:bg-white/[0.1]"
                  }`}
                >
                  {topic.title}
                  <span className="ml-2 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(242,193,95,0.16),rgba(255,255,255,0.055))] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f6c465]">
            Tekrar istatistiği
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <StatBox label="Başarı" value={`%${successRate}`} />
            <StatBox label="Kayıt" value={String(reviewCount)} />
            <StatBox label="Hatırlanan" value={String(rememberedCount)} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f6c465]">
            Kart etiketleri
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {currentCard.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs font-bold text-[#ead7b7]/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#ead7b7]/46">
              Bu kart durumu
            </p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-black ${
                reviewedCardIds.has(currentCard.id)
                  ? "bg-[#52f2d0] text-[#120b07]"
                  : "bg-white/[0.08] text-[#ead7b7]/64"
              }`}
            >
              {reviewedCardIds.has(currentCard.id) ? "tekrar edildi" : "ilk kez görülüyor"}
            </span>
          </div>
        </section>
      </aside>
    </section>
  );
}

function CardHeader({
  side,
  subtitle,
  accent
}: {
  side: string;
  subtitle: string;
  accent: "gold" | "turquoise";
}) {
  const accentClass = accent === "gold" ? "text-[#f6c465]" : "text-[#52f2d0]";

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className={`text-xs font-black uppercase tracking-[0.28em] ${accentClass}`}>
          {side}
        </p>
        <p className="mt-2 text-sm text-[#ead7b7]/58">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ead7b7]/62">
        KPSS
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.07] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-[#ead7b7]/44">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function getCardTextClass(text: string) {
  if (text.length > 220) {
    return "text-[clamp(1.05rem,3.2vw,2rem)] leading-[1.2]";
  }

  if (text.length > 150) {
    return "text-[clamp(1.15rem,3.7vw,2.25rem)] leading-[1.18]";
  }

  if (text.length > 90) {
    return "text-[clamp(1.35rem,4.3vw,2.7rem)] leading-[1.14]";
  }

  return "text-[clamp(1.75rem,5.2vw,3.65rem)] leading-[1.05]";
}
