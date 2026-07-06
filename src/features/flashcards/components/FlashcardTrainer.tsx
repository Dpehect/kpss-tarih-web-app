"use client";

import { useCallback, useMemo, useState } from "react";
import { animate, motion, type PanInfo, useMotionValue, useTransform } from "framer-motion";
import { toast } from "sonner";
import { saveOnlineFlashcardReview } from "@/lib/progress/online-progress";
import type { Flashcard, Topic } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

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
  const [entryDirection, setEntryDirection] = useState<1 | -1>(1);

  const recordReview = useStudyProgressStore((state) => state.recordFlashcardReview);
  const reviews = useStudyProgressStore((state) => state.flashcardReviews);

  const x = useMotionValue(0);
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
  const reviewedCardIds = useMemo(() => new Set(reviews.map((review) => review.cardId)), [reviews]);

  const rememberedCount = reviews.filter((review) => review.remembered).length;
  const reviewCount = reviews.length;
  const successRate = reviewCount ? Math.round((rememberedCount / reviewCount) * 100) : 0;
  const deckProgress = filteredCards.length ? Math.round(((index + 1) / filteredCards.length) * 100) : 0;

  const resetCardVisualState = useCallback(() => {
    setFlipped(false);
    setShowHint(false);
    x.set(0);
  }, [x]);

  const goToCard = useCallback(
    (nextIndex: number, direction: 1 | -1) => {
      if (filteredCards.length === 0) return;
      setEntryDirection(direction);
      setIndex((nextIndex + filteredCards.length) % filteredCards.length);
      resetCardVisualState();
    },
    [filteredCards.length, resetCardVisualState]
  );

  const commitReview = useCallback(
    async (remembered: boolean, direction: 1 | -1) => {
      if (!currentCard || isAnimatingOut) return;

      setIsAnimatingOut(true);

      recordReview({ cardId: currentCard.id, topicId: currentCard.topicId, remembered });
      void saveOnlineFlashcardReview({ cardId: currentCard.id, topicId: currentCard.topicId, remembered });

      toast.success(remembered ? "Biliyorum olarak kaydedildi" : "Tekrar gerekli olarak kaydedildi");

      await animate(x, direction * 560, { duration: 0.22, ease: [0.22, 1, 0.36, 1] });

      goToCard(index + 1, 1);
      setIsAnimatingOut(false);
    },
    [currentCard, goToCard, index, isAnimatingOut, recordReview, x]
  );

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

    void animate(x, 0, { type: "spring", stiffness: 420, damping: 32 });
  }

  function handleTopicChange(topicId: string) {
    setSelectedTopicId(topicId);
    setEntryDirection(1);
    setIndex(0);
    resetCardVisualState();
  }

  if (!currentCard || !currentTopic) {
    return (
      <section className="rounded-xl border border-[var(--border)] bg-[var(--warm-white)] p-8 text-center">
        <h2 className="text-xl font-bold text-[var(--ink)]">Bu filtrede kart yok.</h2>
        <p className="mt-2 text-sm text-[var(--graphite)]">Başka bir konu seçerek devam et.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--warm-white)] p-5 shadow-[var(--shadow-xs)]">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="kicker">{currentTopic.title}</p>
            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-[var(--ink)]">
              Kart {index + 1} / {filteredCards.length}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => goToCard(index - 1, -1)} className="btn-ghost px-3 py-1.5 text-[13px]">
              Önceki
            </button>
            <button type="button" onClick={() => goToCard(index + 1, 1)} className="btn-primary px-3 py-1.5 text-[13px]" data-dark-button="true">
              Sonraki
            </button>
          </div>
        </div>

        <div className="progress-track mb-5">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${deckProgress}%` }}
            transition={{ duration: 0.55 }}
          />
        </div>

        <div className="relative mx-auto grid min-h-[460px] max-w-2xl place-items-center overflow-hidden rounded-xl bg-[var(--cream)] p-4">
          <motion.div style={{ opacity: againOpacity }} className="pointer-events-none absolute left-6 top-6 z-20 rounded-lg border border-[var(--terracotta)]/30 bg-[var(--terracotta-soft)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--terracotta)]">
            Tekrar
          </motion.div>
          <motion.div style={{ opacity: knowOpacity }} className="pointer-events-none absolute right-6 top-6 z-20 rounded-lg border border-[var(--sage)]/30 bg-[var(--sage-soft)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--sage)]">
            Biliyorum
          </motion.div>

          <motion.div
            key={currentCard.id}
            initial={{ x: entryDirection * 180, y: -20, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 145, damping: 22, mass: 0.9 }}
            className="w-full max-w-[600px]"
          >
            <motion.div
              drag="x"
              dragElastic={0.16}
              dragMomentum={false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.01, cursor: "grabbing" }}
              style={{ x }}
              className="relative h-[400px] w-full cursor-grab touch-pan-y select-none"
            >
              <motion.div
                onClick={() => setFlipped((value) => !value)}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <CardFace side="Ön yüz" title={currentCard.front} subtitle={currentTopic.title} dark />
                <CardFace side="Arka yüz" title={currentCard.back} subtitle="Cevap" back />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {showHint ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-[var(--navy)]/15 bg-[var(--navy-soft)] p-4"
          >
            <p className="text-sm font-semibold text-[var(--navy)]">İpucu</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--navy)]">{currentCard.hint}</p>
          </motion.div>
        ) : null}

        <div className="mt-4 grid gap-2 md:grid-cols-4">
          <button type="button" onClick={() => void commitReview(false, -1)} className="rounded-lg border border-[var(--terracotta)]/20 bg-[var(--terracotta-soft)] px-4 py-3 text-[13px] font-medium text-[var(--terracotta)] transition hover:bg-[var(--terracotta)]/10">
            Tekrar gerekli
          </button>
          <button type="button" onClick={() => setFlipped((value) => !value)} className="btn-ghost py-3 text-[13px]">
            Kartı çevir
          </button>
          <button type="button" onClick={() => setShowHint((value) => !value)} className="btn-ghost py-3 text-[13px]">
            İpucu
          </button>
          <button type="button" onClick={() => void commitReview(true, 1)} className="rounded-lg border border-[var(--sage)]/20 bg-[var(--sage-soft)] px-4 py-3 text-[13px] font-medium text-[var(--sage)] transition hover:bg-[var(--sage)]/10">
            Biliyorum
          </button>
        </div>
      </div>

      <aside className="space-y-4">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--warm-white)] p-4 shadow-[var(--shadow-xs)]">
          <p className="kicker">Deste filtresi</p>
          <div className="mt-4 max-h-[380px] space-y-1.5 overflow-y-auto pr-1 scrollbar-clean">
            <button
              type="button"
              onClick={() => handleTopicChange("all")}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-[13px] transition ${
                selectedTopicId === "all"
                  ? "bg-[var(--ink)] font-medium text-white"
                  : "font-normal text-[var(--graphite)] hover:bg-[var(--cream)]"
              }`}
            >
              Tüm kartlar <span className="opacity-60">({cards.length})</span>
            </button>
            {deckTopics.map((topic) => {
              const count = cards.filter((card) => card.topicId === topic.id).length;
              const active = selectedTopicId === topic.id;

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleTopicChange(topic.id)}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-[13px] transition ${
                    active
                      ? "bg-[var(--ink)] font-medium text-white"
                      : "font-normal text-[var(--graphite)] hover:bg-[var(--cream)]"
                  }`}
                >
                  {topic.title} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl bg-[var(--ink)] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--sage)]">Tekrar istatistiği</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <StatBox label="Başarı" value={`%${successRate}`} />
            <StatBox label="Kayıt" value={String(reviewCount)} />
            <StatBox label="Hatırlanan" value={String(rememberedCount)} />
          </div>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--warm-white)] p-4">
          <p className="kicker">Kart etiketleri</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {currentCard.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-[var(--border)] bg-[var(--stone)] px-2.5 py-1 text-xs text-[var(--graphite)]">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-[var(--slate)]">Bu kart durumu</p>
            <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${reviewedCardIds.has(currentCard.id) ? "bg-[var(--sage-soft)] text-[var(--sage)]" : "bg-[var(--cream)] text-[var(--slate)]"}`}>
              {reviewedCardIds.has(currentCard.id) ? "tekrar edildi" : "ilk kez görülüyor"}
            </span>
          </div>
        </section>
      </aside>
    </section>
  );
}

function CardFace({
  side,
  title,
  subtitle,
  dark,
  back
}: {
  side: string;
  title: string;
  subtitle: string;
  dark?: boolean;
  back?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 grid grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-xl border p-6 shadow-[var(--shadow-md)] ${
        dark ? "border-white/10 bg-[var(--ink)] text-white" : "border-[var(--border)] bg-[var(--warm-white)] text-[var(--ink)]"
      }`}
      style={{ backfaceVisibility: "hidden", transform: back ? "rotateY(180deg)" : undefined }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-[11px] font-semibold uppercase tracking-wider ${dark ? "text-[var(--sage)]" : "text-[var(--navy)]"}`}>{side}</p>
          <p className={`mt-1 text-sm ${dark ? "text-white/50" : "text-[var(--slate)]"}`}>{subtitle}</p>
        </div>
        <div className={`rounded-md border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${dark ? "border-white/10 bg-white/[.06] text-white/70" : "border-[var(--border)] bg-[var(--stone)] text-[var(--slate)]"}`}>
          KPSS
        </div>
      </div>
      <div className="flex min-h-0 items-center justify-center overflow-y-auto px-1 py-4">
        <h3 className={`${getCardTextClass(title)} max-w-[20ch] break-words text-center font-bold tracking-tight ${dark ? "text-white" : "text-[var(--ink)]"}`}>
          {title}
        </h3>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.06] p-3">
      <p className="text-[10px] uppercase tracking-wider text-white/45">{label}</p>
      <p className="mt-1.5 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function getCardTextClass(text: string) {
  if (text.length > 220) return "text-[clamp(1rem,3vw,1.75rem)] leading-[1.3]";
  if (text.length > 150) return "text-[clamp(1.1rem,3.5vw,2rem)] leading-[1.25]";
  if (text.length > 90) return "text-[clamp(1.25rem,4vw,2.25rem)] leading-[1.2]";
  return "text-[clamp(1.5rem,4.5vw,3rem)] leading-[1.1]";
}
