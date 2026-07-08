"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";
import { saveOnlineFlashcardReview } from "@/lib/progress/online-progress";
import type { Flashcard, Topic } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";
import { cn } from "@/lib/cn";

type FlashcardTrainerProps = {
  cards: Flashcard[];
  topics: Topic[];
};

export function FlashcardTrainer({ cards, topics }: FlashcardTrainerProps) {
  const [selectedTopicId, setSelectedTopicId] = useState("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const recordReview = useStudyProgressStore((state) => state.recordFlashcardReview);
  const reviews = useStudyProgressStore((state) => state.flashcardReviews);

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
  const againCount = Math.max(reviewCount - rememberedCount, 0);

  const resetVisualState = useCallback(() => {
    setFlipped(false);
    setShowHint(false);
  }, []);

  const goToCard = useCallback(
    (nextIndex: number, nextDirection: 1 | -1) => {
      if (!filteredCards.length) return;
      setDirection(nextDirection);
      setIndex((nextIndex + filteredCards.length) % filteredCards.length);
      resetVisualState();
    },
    [filteredCards.length, resetVisualState],
  );

  const commitReview = useCallback(
    (remembered: boolean) => {
      if (!currentCard) return;

      recordReview({ cardId: currentCard.id, topicId: currentCard.topicId, remembered });
      void saveOnlineFlashcardReview({ cardId: currentCard.id, topicId: currentCard.topicId, remembered });
      toast.success(remembered ? "Kart biliniyor olarak kaydedildi." : "Kart tekrar listesine alındı.");
      goToCard(index + 1, 1);
    },
    [currentCard, goToCard, index, recordReview],
  );

  function handleTopicChange(topicId: string) {
    setSelectedTopicId(topicId);
    setIndex(0);
    setDirection(1);
    resetVisualState();
  }

  if (!currentCard || !currentTopic) {
    return (
      <section className="bureau-card p-8 text-center">
        <p className="kicker">Boş deste</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-.05em]">Bu filtrede kart yok.</h2>
        <p className="mt-2 text-sm font-semibold text-[var(--bureau-muted)]">Başka bir konu seçerek tekrar oturumuna devam edebilirsin.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="bureau-surface overflow-hidden rounded-[2rem] p-4 md:p-6 lg:p-7">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker">Çalışılan deste</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.06em] text-[var(--bureau-ink)] md:text-4xl">{currentTopic.title}</h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[var(--bureau-copy)]">
              Önce kavramı hatırla, sonra kartı çevir. Emin olmadığın kartları tekrar listesine gönder.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => goToCard(index - 1, -1)} className="btn-ghost">
              <ArrowLeft size={16} /> Önceki
            </button>
            <button type="button" onClick={() => goToCard(index + 1, 1)} className="btn-primary" data-dark-button="true">
              Sonraki <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-4">
          <StatBox label="Kart" value={`${index + 1}/${filteredCards.length}`} />
          <StatBox label="İlerleme" value={`%${deckProgress}`} />
          <StatBox label="Hatırlama" value={`%${successRate}`} />
          <StatBox label="Tekrar" value={`${againCount}`} />
        </div>

        <div className="progress-track mb-6">
          <div className="progress-fill" style={{ width: `${deckProgress}%` }} />
        </div>

        <div className="relative min-h-[430px] md:min-h-[500px]">
          <div className="pointer-events-none absolute inset-8 rounded-full bg-[rgba(4,126,137,.12)] blur-3xl" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.button
              key={`${currentCard.id}-${flipped ? "back" : "front"}`}
              type="button"
              onClick={() => setFlipped((value) => !value)}
              initial={{ opacity: 0, x: direction * 44, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -44, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative z-10 flex min-h-[430px] w-full flex-col justify-between rounded-[2rem] border p-6 text-left shadow-[0_38px_120px_rgba(14,17,23,.16)] md:min-h-[500px] md:p-8",
                flipped
                  ? "border-[rgba(255,250,242,.16)] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]"
                  : "kpss-light-container border-[var(--bureau-line)] bg-[linear-gradient(145deg,rgba(255,250,242,.98),rgba(246,239,227,.88))] text-[var(--bureau-ink)]",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[.15em]",
                    flipped ? "bg-[rgba(255,250,242,.12)] text-[var(--bureau-inverse)]" : "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]",
                  )}
                >
                  <BrainCircuit size={14} /> {flipped ? "Cevap" : "Soru"}
                </span>
                <span className={cn("text-xs font-black", flipped ? "text-[var(--bureau-inverse-muted)]" : "text-[var(--bureau-muted)]")}>KPSS Tarih</span>
              </div>

              <div className="py-8">
                <p className={cn("mb-5 text-sm font-black uppercase tracking-[.18em]", flipped ? "text-[var(--bureau-inverse-muted)]" : "text-[var(--bureau-muted)]")}>
                  {currentTopic.title}
                </p>
                <h3 className={cn(getCardTextClass(flipped ? currentCard.back : currentCard.front), "font-black tracking-[-.055em]", flipped ? "text-[var(--bureau-inverse)]" : "text-[var(--bureau-ink)]")}>
                  {flipped ? currentCard.back : currentCard.front}
                </h3>
              </div>

              <div className="space-y-4">
                {showHint ? (
                  <div className={cn("rounded-2xl border p-4", flipped ? "border-[rgba(255,250,242,.16)] bg-[rgba(255,250,242,.08)]" : "border-[var(--bureau-line)] bg-[rgba(4,126,137,.08)]")}>
                    <p className={cn("mb-1 text-[10px] font-black uppercase tracking-[.16em]", flipped ? "text-[var(--bureau-inverse-muted)]" : "text-[var(--bureau-teal)]")}>İpucu</p>
                    <p className={cn("text-sm font-semibold leading-6", flipped ? "text-[var(--bureau-inverse-copy)]" : "text-[var(--bureau-copy)]")}>{currentCard.hint}</p>
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  {currentCard.tags.map((tag) => (
                    <span key={tag} className={cn("rounded-full border px-3 py-1 text-xs font-black", flipped ? "border-[rgba(255,250,242,.14)] bg-[rgba(255,250,242,.08)] text-[var(--bureau-inverse-copy)]" : "border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] text-[var(--bureau-copy)]")}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.button>
          </AnimatePresence>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <button type="button" onClick={() => commitReview(false)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[rgba(158,63,63,.22)] bg-[rgba(158,63,63,.10)] px-4 text-sm font-black text-[var(--bureau-rust)] transition hover:bg-[rgba(158,63,63,.16)]">
            <XCircle size={17} /> Tekrar gerekli
          </button>
          <button type="button" onClick={() => setFlipped((value) => !value)} className="btn-ghost min-h-12">
            <RotateCcw size={17} /> Kartı çevir
          </button>
          <button type="button" onClick={() => setShowHint((value) => !value)} className="btn-ghost min-h-12">
            <Eye size={17} /> İpucu
          </button>
          <button type="button" onClick={() => commitReview(true)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[rgba(4,126,137,.28)] bg-[rgba(4,126,137,.12)] px-4 text-sm font-black text-[var(--bureau-teal)] transition hover:bg-[rgba(4,126,137,.18)]">
            <CheckCircle2 size={17} /> Biliyorum
          </button>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="bureau-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="kicker">Deste filtresi</p>
              <h3 className="mt-1 text-xl font-black tracking-[-.05em]">Konuya göre çalış</h3>
            </div>
            <span className="grid size-11 place-items-center rounded-2xl bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]">
              <Filter size={18} />
            </span>
          </div>

          <div className="scrollbar-clean max-h-[420px] space-y-2 overflow-y-auto pr-1">
            <TopicFilterButton active={selectedTopicId === "all"} label="Tüm kartlar" count={cards.length} onClick={() => handleTopicChange("all")} />
            {deckTopics.map((topic) => {
              const count = cards.filter((card) => card.topicId === topic.id).length;
              return (
                <TopicFilterButton key={topic.id} active={selectedTopicId === topic.id} label={topic.title} count={count} onClick={() => handleTopicChange(topic.id)} />
              );
            })}
          </div>
        </div>

        <div className="bureau-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="kicker">Tekrar durumu</p>
              <h3 className="mt-1 text-xl font-black tracking-[-.05em]">Oturum özeti</h3>
            </div>
            <Sparkles size={18} className="text-[var(--bureau-teal)]" />
          </div>
          <div className="space-y-3">
            <ReviewRow icon={<CheckCircle2 size={16} />} label="Hatırlanan" value={`${rememberedCount}`} />
            <ReviewRow icon={<RotateCcw size={16} />} label="Tekrar gereken" value={`${againCount}`} />
            <ReviewRow icon={<Clock3 size={16} />} label="Bu kart" value={reviewedCardIds.has(currentCard.id) ? "Tekrar edildi" : "İlk görüş"} />
          </div>
        </div>
      </aside>
    </section>
  );
}

function TopicFilterButton({ active, label, count, onClick }: { active: boolean; label: string; count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active ? "true" : undefined}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition",
        active
          ? "border-[var(--bureau-ink)] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)] shadow-[var(--shadow-paper)]"
          : "kpss-light-container border-[var(--bureau-line)] bg-[rgba(255,250,242,.76)] text-[var(--bureau-copy)] hover:bg-[var(--bureau-bone-2)] hover:text-[var(--bureau-ink)]",
      )}
    >
      <span className="truncate text-sm font-black">{label}</span>
      <span className={cn("rounded-full px-2 py-1 text-[11px] font-black", active ? "bg-[rgba(255,250,242,.12)] text-[var(--bureau-inverse)]" : "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]")}>{count}</span>
    </button>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="kpss-light-container rounded-2xl border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-4 shadow-[var(--shadow-paper)]">
      <p className="text-[10px] font-black uppercase tracking-[.16em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-black tracking-[-.06em] text-[var(--bureau-ink)]">{value}</p>
    </div>
  );
}

function ReviewRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="kpss-light-container flex items-center justify-between gap-3 rounded-2xl border border-[var(--bureau-line)] bg-[rgba(255,250,242,.68)] px-4 py-3">
      <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--bureau-copy)]">{icon}{label}</span>
      <span className="text-sm font-black text-[var(--bureau-ink)]">{value}</span>
    </div>
  );
}

function getCardTextClass(text: string) {
  if (text.length > 240) return "text-[clamp(1.35rem,3vw,2.4rem)] leading-[1.18]";
  if (text.length > 150) return "text-[clamp(1.55rem,3.4vw,2.85rem)] leading-[1.12]";
  if (text.length > 90) return "text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.08]";
  return "text-[clamp(2.15rem,5vw,4.4rem)] leading-[1.02]";
}
