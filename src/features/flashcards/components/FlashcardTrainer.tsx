"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Layers3, RotateCcw, Sparkles } from "lucide-react";
import type { Flashcard, Topic } from "@/types/study";

export function FlashcardTrainer({
  cards,
  topics
}: {
  cards: Flashcard[];
  topics: Topic[];
}) {
  const [topicId, setTopicId] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState<Set<string>>(() => new Set());

  const filteredCards = useMemo(() => {
    if (topicId === "all") return cards;
    return cards.filter((card) => card.topicId === topicId);
  }, [cards, topicId]);

  const safeIndex = filteredCards.length ? Math.min(index, filteredCards.length - 1) : 0;
  const current = filteredCards[safeIndex];
  const topicTitle = current ? topics.find((topic) => topic.id === current.topicId)?.title : null;
  const progress = filteredCards.length ? Math.round(((safeIndex + 1) / filteredCards.length) * 100) : 0;

  function nextCard() {
    setFlipped(false);
    setIndex((value) => (filteredCards.length ? (value + 1) % filteredCards.length : 0));
  }

  function previousCard() {
    setFlipped(false);
    setIndex((value) => (filteredCards.length ? (value - 1 + filteredCards.length) % filteredCards.length : 0));
  }

  function markKnown() {
    if (!current) return;

    setKnownIds((value) => {
      const next = new Set(value);
      next.add(current.id);
      return next;
    });

    nextCard();
  }

  function selectTopic(value: string) {
    setTopicId(value);
    setIndex(0);
    setFlipped(false);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-white/75 bg-white/78 p-6 shadow-[0_32px_105px_rgba(16,24,40,.12)] backdrop-blur-xl md:p-8">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#fed7aa]/70 blur-3xl" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Aktif hatırlama</p>
            <h1 className="mt-3 text-5xl font-black leading-[0.92] tracking-[-0.08em] text-[#101828] md:text-7xl">
              Kartlarla hızlı tekrar.
            </h1>
            <p className="mt-5 max-w-3xl text-sm font-bold leading-7 text-[#475467]">
              Kavramı gör, cevabı çevir, biliyorsan bir sonraki karta geç. Gereksiz bildirim yok; akış kesilmez.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Metric label="Kart" value={filteredCards.length} />
            <Metric label="Bilinen" value={knownIds.size} />
          </div>
        </div>
      </section>

      <section className="flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => selectTopic("all")}
          className={[
            "shrink-0 rounded-full border px-4 py-2 text-sm font-black transition",
            topicId === "all" ? "border-[#101828] bg-[#101828] text-white" : "border-[#e4d8c8] bg-white/82 text-[#101828] hover:bg-white"
          ].join(" ")}
        >
          Tüm kartlar
        </button>
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => selectTopic(topic.id)}
            className={[
              "shrink-0 rounded-full border px-4 py-2 text-sm font-black transition",
              topicId === topic.id ? "border-[#101828] bg-[#101828] text-white" : "border-[#e4d8c8] bg-white/82 text-[#101828] hover:bg-white"
            ].join(" ")}
          >
            {topic.title}
          </button>
        ))}
      </section>

      {current ? (
        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <button
            type="button"
            onClick={() => setFlipped((value) => !value)}
            className="group min-h-[420px] rounded-[2.5rem] border border-white/75 bg-white/84 p-8 text-left shadow-[0_30px_95px_rgba(16,24,40,.11)] backdrop-blur-xl transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fffaf3] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#b4232a]">
                <Layers3 size={15} />
                {topicTitle ?? "Kart"}
              </span>
              <span className="text-xs font-black text-[#667085]">{safeIndex + 1}/{filteredCards.length}</span>
            </div>

            <div className="grid min-h-[260px] place-items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#667085]">
                  {flipped ? "Cevap" : "Soru"}
                </p>
                <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.06em] text-[#101828]">
                  {flipped ? current.back : current.front}
                </h2>
                {!flipped && current.hint ? (
                  <p className="mt-5 rounded-2xl bg-[#fffaf3] p-4 text-sm font-bold leading-7 text-[#475467]">
                    İpucu: {current.hint}
                  </p>
                ) : null}
              </div>
            </div>

            <p className="text-center text-xs font-black uppercase tracking-[0.16em] text-[#98a2b3]">
              Kartı çevirmek için tıkla
            </p>
          </button>

          <aside className="grid content-start gap-3 rounded-[2rem] border border-white/75 bg-white/78 p-5 shadow-[0_22px_70px_rgba(16,24,40,.08)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-[#e4d8c8] bg-[#fffaf3] p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#b4232a]">İlerleme</p>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-[#101828]" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-xs font-bold text-[#667085]">%{progress} tamamlandı</p>
            </div>

            <button type="button" onClick={previousCard} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#e4d8c8] bg-white px-5 text-sm font-black text-[#101828]">
              <ArrowLeft size={17} />
              Önceki
            </button>
            <button type="button" onClick={() => setFlipped((value) => !value)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#e4d8c8] bg-[#fffaf3] px-5 text-sm font-black text-[#101828]">
              <RotateCcw size={17} />
              Çevir
            </button>
            <button type="button" onClick={markKnown} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#101828] px-5 text-sm font-black text-white">
              <CheckCircle2 size={17} />
              Biliyorum
            </button>
            <button type="button" onClick={nextCard} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#e4d8c8] bg-white px-5 text-sm font-black text-[#101828]">
              Sonraki
              <ArrowRight size={17} />
            </button>

            <div className="rounded-[1.5rem] border border-[#e4d8c8] bg-white p-4">
              <div className="flex items-start gap-2">
                <Sparkles size={17} className="mt-0.5 text-[#b4232a]" />
                <p className="text-xs font-bold leading-5 text-[#667085]">
                  “Biliyorum” kartı sessizce tamamlar ve bir sonraki karta geçer.
                </p>
              </div>
            </div>
          </aside>
        </section>
      ) : (
        <section className="rounded-[2rem] border border-[#f7b2b7] bg-[#fff1f2] p-6 text-sm font-black text-[#b4232a]">
          Bu filtrede kart bulunamadı.
        </section>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-3xl border border-white/80 bg-white/84 p-4 shadow-[0_16px_44px_rgba(16,24,40,.08)]">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#667085]">{label}</p>
      <p className="mt-1 text-2xl font-black text-[#101828]">{value}</p>
    </div>
  );
}
