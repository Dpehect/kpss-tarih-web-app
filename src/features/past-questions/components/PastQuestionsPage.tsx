"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Lightbulb,
  ListChecks,
  Map,
  RotateCcw
} from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import {
  getPastQuestionTopicSummary,
  getPastQuestionYears,
  officialOsymPastQuestionsUrl,
  pastQuestionTrends
} from "@/data/past-questions";

export function PastQuestionsPage({ selectedYear }: { selectedYear?: number }) {
  const years = getPastQuestionYears();
  const [year, setYear] = useState(selectedYear && years.includes(selectedYear) ? selectedYear : years[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const filtered = useMemo(
    () => pastQuestionTrends.filter((question) => question.year === year),
    [year]
  );

  const topicSummary = useMemo(() => getPastQuestionTopicSummary(year), [year]);
  const current = filtered[currentIndex] ?? filtered[0];
  const selected = current ? selectedAnswers[current.id] : undefined;
  const answered = Boolean(selected);
  const isCorrect = selected === current?.correctChoiceId;
  const progress = filtered.length ? Math.round(((currentIndex + 1) / filtered.length) * 100) : 0;
  const answeredCount = filtered.filter((question) => selectedAnswers[question.id]).length;
  const correctCount = filtered.filter((question) => selectedAnswers[question.id] === question.correctChoiceId).length;
  const wrongCount = answeredCount - correctCount;

  function changeYear(nextYear: number) {
    setYear(nextYear);
    setCurrentIndex(0);
  }

  function goTo(index: number) {
    if (filtered.length === 0) return;
    setCurrentIndex((index + filtered.length) % filtered.length);
  }

  function resetYearAnswers() {
    const next = { ...selectedAnswers };

    for (const question of filtered) {
      delete next[question.id];
    }

    setSelectedAnswers(next);
    setShowHints({});
    setCurrentIndex(0);
  }

  if (!current) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Çıkmış Sorular"
          title="Soru bulunamadı"
          description="Seçilen yıl için soru verisi bulunamadı."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Çıkmış Sorular"
        title="Yıllara göre KPSS Tarih çalışması"
        description="Her yıl için sorular tek tek ilerler. Cevapladıktan sonra açıklamayı okuyup sonraki soruya geçebilirsin."
        actions={
          <a
            href={officialOsymPastQuestionsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost px-5 py-3"
          >
            Resmi ÖSYM arşivi
            <ExternalLink size={17} />
          </a>
        }
      />

      <section className="bureau-card rounded-[1.75rem] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="bureau-kicker">Yıl seç</p>
            <p className="mt-2 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
              Yılı seçtikten sonra sorular test ekranı gibi tek tek ilerler.
            </p>
          </div>
          <span className="hidden rounded-full bg-[var(--bureau-teal-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-teal)] sm:inline-flex">
            {filtered.length} soru
          </span>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-clean">
          {years.map((item) => {
            const active = year === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => changeYear(item)}
                aria-pressed={active}
                data-active={active ? "true" : undefined}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black transition ${
                  active
                    ? "border-[var(--bureau-ink)] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]"
                    : "border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] text-[var(--bureau-ink)] hover:bg-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="bureau-stage relative overflow-hidden rounded-[2.25rem] p-5 md:p-7">
          <div className="absolute inset-0 opacity-25">
            <svg viewBox="0 0 980 620" className="h-full w-full">
              <path d="M100 350 C214 210 362 196 520 252 C660 302 760 215 884 286" fill="none" stroke="rgba(255,250,242,.24)" strokeWidth="2" />
              <path d="M142 430 C308 338 444 370 606 330 C716 302 790 338 890 382" fill="none" stroke="rgba(4,126,137,.62)" strokeWidth="2" strokeDasharray="12 16" />
            </svg>
          </div>

          <div className="relative z-10 mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="bureau-kicker">
                {year} · Çıkmış soru çalışması
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--bureau-inverse)]">
                Soru {currentIndex + 1} / {filtered.length}
              </h2>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-white/[.08] px-4 py-3 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-inverse-muted)]">Durum</p>
              <p className="mt-1 text-2xl font-black text-[var(--bureau-inverse)]">
                {correctCount}/{answeredCount || 0}
              </p>
            </div>
          </div>

          <div className="relative z-10 mb-6">
            <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-inverse-muted)]">
              <span>İlerleme</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[.12]">
              <div
                className="h-full rounded-full bg-[var(--bureau-teal)] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <article className="relative z-10 rounded-[2rem] border border-white/10 bg-white/[.08] p-5 backdrop-blur-2xl md:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-inverse-muted)]">
                  {current.exam}
                </p>
                <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.055em] text-[var(--bureau-inverse)] md:text-4xl">
                  {current.stem}
                </h3>
              </div>

              <span className="shrink-0 rounded-full border border-white/10 bg-white/[.08] px-3 py-1 text-xs font-black text-[var(--bureau-inverse)]">
                {current.topicTitle}
              </span>
            </div>

            <p className="mt-5 rounded-[1.2rem] border border-white/10 bg-white/[.07] px-4 py-3 text-sm font-semibold leading-7 text-[var(--bureau-inverse-copy)]">
              Soru tipi: {current.pattern}
            </p>

            <button
              type="button"
              onClick={() =>
                setShowHints((state) => ({
                  ...state,
                  [current.id]: !state[current.id]
                }))
              }
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(4,126,137,.34)] bg-[rgba(4,126,137,.16)] px-4 py-2 text-sm font-black text-[var(--bureau-inverse)]"
            >
              <Lightbulb size={17} />
              {showHints[current.id] ? "İpucunu gizle" : "İpucu göster"}
            </button>

            {showHints[current.id] ? (
              <div className="mt-4 rounded-[1.35rem] border border-[rgba(4,126,137,.30)] bg-[rgba(4,126,137,.12)] p-4">
                <p className="text-sm font-semibold leading-7 text-[var(--bureau-inverse-copy)]">{current.hint}</p>
              </div>
            ) : null}
          </article>

          <div className="relative z-10 mt-5 grid gap-3">
            {current.choices.map((choice) => {
              const isCorrectChoice = answered && choice.id === current.correctChoiceId;
              const isWrongChoice = selected === choice.id && choice.id !== current.correctChoiceId;

              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() =>
                    setSelectedAnswers((state) => ({
                      ...state,
                      [current.id]: choice.id
                    }))
                  }
                  className={`flex items-start gap-4 rounded-[1.35rem] border p-4 text-left transition ${
                    isCorrectChoice
                      ? "border-[rgba(4,126,137,.40)] bg-[rgba(4,126,137,.18)]"
                      : isWrongChoice
                        ? "border-[rgba(158,63,63,.42)] bg-[rgba(158,63,63,.18)]"
                        : "border-white/10 bg-white/[.08] hover:bg-white/[.12]"
                  }`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-black ${
                      isCorrectChoice
                        ? "bg-[var(--bureau-teal)] text-[var(--bureau-inverse)]"
                        : isWrongChoice
                          ? "bg-[var(--bureau-rust)] text-[var(--bureau-inverse)]"
                          : "bg-white/[.12] text-[var(--bureau-inverse)]"
                    }`}
                  >
                    {choice.id}
                  </span>
                  <span className="pt-2 font-semibold leading-7 text-[var(--bureau-inverse)]">{choice.text}</span>
                </button>
              );
            })}
          </div>

          {answered ? (
            <div
              className={`relative z-10 mt-5 rounded-[1.6rem] border p-5 ${
                isCorrect
                  ? "border-[rgba(4,126,137,.38)] bg-[rgba(4,126,137,.14)]"
                  : "border-[rgba(158,63,63,.38)] bg-[rgba(158,63,63,.14)]"
              }`}
            >
              <h4 className="text-xl font-black text-[var(--bureau-inverse)]">
                {isCorrect ? "Doğru cevap" : "Yanlış cevap"}
              </h4>
              <p className="mt-3 text-sm font-semibold leading-7 text-[var(--bureau-inverse-copy)]">
                {current.explanation}
              </p>
            </div>
          ) : null}

          <p className="relative z-10 mt-5 border-t border-white/10 pt-4 text-xs font-semibold leading-6 text-[var(--bureau-inverse-muted)]">
            {current.legalNote}
          </p>

          <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => goTo(currentIndex - 1)} className="btn-ghost">
              <ArrowLeft size={17} />
              Önceki soru
            </button>

            <button type="button" onClick={() => goTo(currentIndex + 1)} className="btn-primary" data-dark-button="true">
              Sonraki soru
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <aside className="grid gap-5 self-start xl:sticky xl:top-24">
          <div className="bureau-card rounded-[1.75rem] p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]">
                <ListChecks size={20} />
              </span>
              <div>
                <p className="bureau-kicker">Yıl özeti</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--bureau-ink)]">
                  {year}
                </h2>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <SummaryBox label="Doğru" value={correctCount} />
              <SummaryBox label="Yanlış" value={wrongCount} />
              <SummaryBox label="Cevap" value={answeredCount} />
            </div>

            <button type="button" onClick={resetYearAnswers} className="btn-ghost mt-4 w-full">
              <RotateCcw size={17} />
              Bu yılı sıfırla
            </button>
          </div>

          <div className="bureau-card rounded-[1.75rem] p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]">
                <Map size={20} />
              </span>
              <div>
                <p className="bureau-kicker">Soru Haritası</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--bureau-ink)]">
                  {filtered.length} soru
                </h2>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-2">
              {filtered.map((question, index) => {
                const active = index === currentIndex;
                const userAnswer = selectedAnswers[question.id];
                const correct = userAnswer === question.correctChoiceId;
                const wrong = Boolean(userAnswer) && !correct;

                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => goTo(index)}
                    data-active={active ? "true" : undefined}
                    aria-pressed={active}
                    className={`grid size-10 place-items-center rounded-full text-sm font-black transition ${
                      active
                        ? "bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]"
                        : correct
                          ? "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]"
                          : wrong
                            ? "bg-[var(--bureau-rust-soft)] text-[var(--bureau-rust)]"
                            : "bg-[rgba(255,250,242,.82)] text-[var(--bureau-ink)]"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bureau-card rounded-[1.75rem] p-5">
            <p className="bureau-kicker">Konu dağılımı</p>
            <div className="mt-4 space-y-2">
              {topicSummary.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] px-3 py-2"
                >
                  <span className="text-xs font-bold leading-5 text-[var(--bureau-copy)]">{item.title}</span>
                  <span className="rounded-full bg-[var(--bureau-blue-soft)] px-2.5 py-1 text-xs font-black text-[var(--bureau-blue)]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function SummaryBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">{value}</p>
    </div>
  );
}
