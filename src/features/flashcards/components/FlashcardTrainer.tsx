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
      <section className="rounded-[2rem] border border-[rgba(11,18,32,.10)] bg-[rgba(255,248,234,.92)] p-8 text-center">
        <h2 className="text-3xl font-black tracking-[-0.05em] text-[var(--museum-navy-2)]">Bu filtrede kart yok.</h2>
        <p className="mt-3 text-[#334155]">Başka bir konu seçerek devam et.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-[2.5rem] border border-[rgba(11,18,32,.10)] bg-[rgba(255,248,234,.92)] p-5 shadow-[var(--shadow-soft)] md:p-7">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="kicker">{currentTopic.title}</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--museum-navy-2)]">
              Kart {index + 1} / {filteredCards.length}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => goToCard(index - 1, -1)} className="btn-ghost px-4 py-2 text-sm">
              Önceki
            </button>
            <button type="button" onClick={() => goToCard(index + 1, 1)} className="btn-primary px-4 py-2 text-sm">
              Sonraki
            </button>
          </div>
        </div>

        <div className="mb-6 h-2 overflow-hidden rounded-full bg-[rgba(11,18,32,.10)]">
          <div className="h-full rounded-full bg-[var(--museum-navy-2)]" style={{ width: `${deckProgress}%` }} />
        </div>

        <div className="relative mx-auto grid min-h-[520px] max-w-3xl place-items-center overflow-hidden rounded-[2rem] bg-[rgba(11,18,32,.04)] p-4">
          <motion.div style={{ opacity: againOpacity }} className="pointer-events-none absolute left-8 top-8 z-20 rounded-2xl border border-[#9a3412]/30 bg-[#fff0e9] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#9a3412]">
            Tekrar
          </motion.div>
          <motion.div style={{ opacity: knowOpacity }} className="pointer-events-none absolute right-8 top-8 z-20 rounded-2xl border border-[#047857]/30 bg-[#dff8ef] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#047857]">
            Biliyorum
          </motion.div>

          <motion.div
            key={currentCard.id}
            initial={{ x: entryDirection * 180, y: -28, opacity: 0, scale: 0.985 }}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 145, damping: 22, mass: 0.9 }}
            className="w-full max-w-[680px]"
          >
            <motion.div
              drag="x"
              dragElastic={0.16}
              dragMomentum={false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.018, cursor: "grabbing" }}
              style={{ x }}
              className="relative h-[460px] w-full cursor-grab touch-pan-y select-none"
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
          <div className="mt-5 rounded-[1.5rem] border border-[rgba(76,141,255,.22)] bg-[rgba(76,141,255,.10)] p-4">
            <p className="text-sm font-black text-[#1d4ed8]">İpucu</p>
            <p className="mt-2 text-sm leading-7 text-[#1d4ed8]">{currentCard.hint}</p>
          </div>
        ) : null}

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <button type="button" onClick={() => void commitReview(false, -1)} className="rounded-[1.25rem] border border-[#9a3412]/30 bg-[#fff0e9] px-5 py-4 font-black text-[#9a3412] transition hover:-translate-y-0.5">
            Tekrar gerekli
          </button>
          <button type="button" onClick={() => setFlipped((value) => !value)} className="btn-ghost">
            Kartı çevir
          </button>
          <button type="button" onClick={() => setShowHint((value) => !value)} className="btn-ghost">
            İpucu
          </button>
          <button type="button" onClick={() => void commitReview(true, 1)} className="rounded-[1.25rem] border border-[#047857]/30 bg-[#dff8ef] px-5 py-4 font-black text-[#047857] transition hover:-translate-y-0.5">
            Biliyorum
          </button>
        </div>
      </div>

      <aside className="space-y-5">
        <section className="rounded-[2rem] border border-[rgba(11,18,32,.10)] bg-[rgba(255,248,234,.92)] p-5 shadow-[var(--shadow-soft)]">
          <p className="kicker">Deste filtresi</p>
          <div className="mt-5 max-h-[420px] space-y-2 overflow-y-auto pr-1 scrollbar-clean">
            <button type="button" onClick={() => handleTopicChange("all")} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${selectedTopicId === "all" ? "bg-[var(--museum-navy-2)] text-[var(--museum-cream)]" : "bg-white text-[#334155] hover:bg-white"}`}>
              Tüm kartlar <span className="ml-2 opacity-70">({cards.length})</span>
            </button>
            {deckTopics.map((topic) => {
              const count = cards.filter((card) => card.topicId === topic.id).length;
              return (
                <button key={topic.id} type="button" onClick={() => handleTopicChange(topic.id)} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${selectedTopicId === topic.id ? "bg-[var(--museum-navy-2)] text-[var(--museum-cream)]" : "bg-white text-[#334155] hover:bg-white"}`}>
                  {topic.title}<span className="ml-2 opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="museum-dark rounded-[2rem] p-5">
          <p className="kicker">Tekrar istatistiği</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <StatBox label="Başarı" value={`%${successRate}`} />
            <StatBox label="Kayıt" value={String(reviewCount)} />
            <StatBox label="Hatırlanan" value={String(rememberedCount)} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[rgba(11,18,32,.10)] bg-[rgba(255,248,234,.92)] p-5">
          <p className="kicker">Kart etiketleri</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {currentCard.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[rgba(11,18,32,.10)] bg-white px-3 py-1 text-xs font-bold text-[#475569]">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#475569]">Bu kart durumu</p>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${reviewedCardIds.has(currentCard.id) ? "bg-[#dff8ef] text-[#047857]" : "bg-white text-[#475569]"}`}>
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
      className={`absolute inset-0 grid grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[2rem] border p-7 shadow-[0_30px_100px_rgba(11,18,32,.18)] ${
        dark ? "border-white/10 bg-[var(--museum-navy-2)] text-[var(--museum-cream)]" : "border-[rgba(11,18,32,.10)] bg-[var(--museum-cream)] text-[var(--museum-navy-2)]"
      }`}
      style={{ backfaceVisibility: "hidden", transform: back ? "rotateY(180deg)" : undefined }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-black uppercase tracking-[0.28em] ${dark ? "text-[var(--museum-gold)]" : "text-[#1d4ed8]"}`}>{side}</p>
          <p className={`mt-2 text-sm ${dark ? "text-[rgba(255,248,234,.70)]" : "text-[#475569]"}`}>{subtitle}</p>
        </div>
        <div className={`rounded-2xl border px-3 py-2 text-xs font-black uppercase tracking-[0.18em] ${dark ? "border-white/10 bg-white/[.06] text-[var(--museum-cream)]" : "border-[rgba(11,18,32,.10)] bg-white text-[var(--museum-navy-2)]"}`}>
          KPSS
        </div>
      </div>
      <div className="flex min-h-0 items-center justify-center overflow-y-auto px-1 py-5">
        <h3 className={`${getCardTextClass(title)} max-w-[20ch] break-words text-center font-black tracking-[-0.055em] ${dark ? "text-[var(--museum-cream)]" : "text-[var(--museum-navy-2)]"}`}>
          {title}
        </h3>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-[rgba(255,248,234,.58)]">{label}</p>
      <p className="mt-2 text-2xl font-black text-[var(--museum-cream)]">{value}</p>
    </div>
  );
}

function getCardTextClass(text: string) {
  if (text.length > 220) return "text-[clamp(1.05rem,3.2vw,2rem)] leading-[1.2]";
  if (text.length > 150) return "text-[clamp(1.15rem,3.7vw,2.25rem)] leading-[1.18]";
  if (text.length > 90) return "text-[clamp(1.35rem,4.3vw,2.7rem)] leading-[1.14]";
  return "text-[clamp(1.75rem,5.2vw,3.65rem)] leading-[1.05]";
}
