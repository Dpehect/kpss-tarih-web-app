"use client";

import { ExternalLink, Lightbulb } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/core/PageHeader";
import {
  getPastQuestionYears,
  officialOsymPastQuestionsUrl,
  pastQuestionTrends
} from "@/data/past-questions";

export function PastQuestionsPage({ selectedYear }: { selectedYear?: number }) {
  const years = getPastQuestionYears();
  const [year, setYear] = useState(selectedYear ?? years[0]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const filtered = useMemo(
    () => pastQuestionTrends.filter((question) => question.year === year),
    [year]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Çıkmış Sorular"
        title="Son 15 yılın çıkmış soru eğilimleri."
        description="ÖSYM soruları telifli olduğu için burada birebir kopya soru yayınlanmaz. Resmi arşiv bağlantısı, yıl/yıl eğilim analizi ve ÖSYM tarzı özgünleştirilmiş pratik sorular birlikte sunulur."
        actions={
          <a
            href={officialOsymPastQuestionsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-gold"
          >
            Resmi ÖSYM arşivi
            <ExternalLink size={18} />
          </a>
        }
      />

      <section className="rounded-xl border border-black/[0.08] bg-[white]/84 p-5 shadow-[0_20px_70px_rgba(18,24,38,0.08)]">
        <p className="kicker">Yıl seç</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {years.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setYear(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                year === item
                  ? "bg-[var(--ink)] text-[white]"
                  : "bg-white text-[#425066] hover:bg-[#edf1ff] hover:text-[#2447d8]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          {filtered.map((question) => {
            const selected = selectedAnswers[question.id];
            const answered = Boolean(selected);
            const isCorrect = selected === question.correctChoiceId;
            const showHint = showHints[question.id];

            return (
              <article key={question.id} className="rounded-xl border border-black/[0.08] bg-[white]/88 p-6 shadow-[0_20px_70px_rgba(18,24,38,0.08)]">
                <div className="flex flex-col gap-3 border-b border-black/[0.08] pb-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#2447d8]">
                      {question.year} · {question.topicTitle}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)]">{question.stem}</h2>
                  </div>
                  <span className="w-fit rounded-full bg-[#edf1ff] px-3 py-1 text-xs font-semibold text-[#2447d8]">
                    {question.pattern}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHints((state) => ({ ...state, [question.id]: !state[question.id] }))}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#2447d8]/18 bg-[#edf1ff] px-4 py-2 text-sm font-semibold text-[#2447d8]"
                >
                  <Lightbulb size={16} />
                  {showHint ? "İpucunu gizle" : "İpucu göster"}
                </button>

                {showHint ? (
                  <p className="mt-4 rounded-lg border border-[#2447d8]/18 bg-[#edf1ff] p-4 text-sm font-semibold leading-7 text-[#2447d8]">
                    {question.hint}
                  </p>
                ) : null}

                <div className="mt-6 grid gap-3">
                  {question.choices.map((choice) => {
                    const isCorrectChoice = answered && choice.id === question.correctChoiceId;
                    const isWrongChoice = selected === choice.id && choice.id !== question.correctChoiceId;

                    return (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => setSelectedAnswers((state) => ({ ...state, [question.id]: choice.id }))}
                        className={`flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                          isCorrectChoice
                            ? "border-[#2f8f75]/30 bg-[#dff8ef]"
                            : isWrongChoice
                              ? "border-[#be684b]/30 bg-[#fff0e9]"
                              : "border-black/[0.08] bg-white/58 hover:-translate-y-0.5 hover:bg-white"
                        }`}
                      >
                        <span className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                          isCorrectChoice
                            ? "bg-[#2f8f75] text-white"
                            : isWrongChoice
                              ? "bg-[#be684b] text-white"
                              : "bg-[var(--ink)] text-[white]"
                        }`}>
                          {choice.id}
                        </span>
                        <span className="pt-2 font-semibold leading-7 text-[var(--ink)]">{choice.text}</span>
                      </button>
                    );
                  })}
                </div>

                {answered ? (
                  <div className={`mt-5 rounded-xl border p-5 ${
                    isCorrect ? "border-[#2f8f75]/25 bg-[#dff8ef]" : "border-[#be684b]/25 bg-[#fff0e9]"
                  }`}>
                    <p className="font-semibold text-[var(--ink)]">{isCorrect ? "Doğru" : "Yanlış"}</p>
                    <p className="mt-2 leading-7 text-[#425066]">{question.explanation}</p>
                  </div>
                ) : null}

                <p className="mt-5 text-xs leading-6 text-[#425066]">{question.legalNote}</p>
              </article>
            );
          })}
        </div>

        <aside className="space-y-4">
          <div className="dark-surface rounded-xl p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--sage)]">Telif notu</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Birebir soru değil, eğilim çalışması.</h2>
            <p className="mt-4 text-sm leading-7 text-[white]/68">
              ÖSYM sorularının telif hakları ÖSYM'ye aittir. Bu bölüm resmi arşive yönlendirir ve özgünleştirilmiş pratik üretir.
            </p>
          </div>

          <div className="rounded-xl border border-black/[0.08] bg-[white]/88 p-5">
            <p className="kicker">Yıl özeti</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-[var(--ink)]">{year}</p>
            <p className="mt-3 text-sm leading-7 text-[#425066]">
              Bu yıl için {filtered.length} eğilim/pratik kaydı gösteriliyor.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
