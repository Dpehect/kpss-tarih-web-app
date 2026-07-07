"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Lightbulb, ListChecks } from "lucide-react";
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
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const filtered = useMemo(
    () => pastQuestionTrends.filter((question) => question.year === year),
    [year]
  );

  const topicSummary = useMemo(() => getPastQuestionTopicSummary(year), [year]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Çıkmış Sorular"
        title="Yıllara göre KPSS Tarih çalışması"
        description="Her yıl için 27 tarih sorusu gösterilir. Sorular birebir ÖSYM metni değildir; çıkmış soru kapsamına uygun özgün pratiklerdir."
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
              Seçtiğin yılın 27 tarih sorusu aşağıda listelenir.
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
                onClick={() => setYear(item)}
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

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          {filtered.map((question) => {
            const selected = selectedAnswers[question.id];
            const answered = Boolean(selected);
            const isCorrect = selected === question.correctChoiceId;
            const showHint = showHints[question.id];

            return (
              <article key={question.id} className="bureau-card rounded-[1.75rem] p-5 md:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="bureau-kicker">
                      {question.year} · Soru {question.questionNo}
                    </p>
                    <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--bureau-ink)]">
                      {question.stem}
                    </h2>
                  </div>

                  <span className="shrink-0 rounded-full bg-[var(--bureau-blue-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-blue)]">
                    {question.topicTitle}
                  </span>
                </div>

                <p className="mt-4 rounded-[1.15rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] px-4 py-3 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
                  Soru tipi: {question.pattern}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowHints((state) => ({
                      ...state,
                      [question.id]: !state[question.id]
                    }))
                  }
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(4,126,137,.24)] bg-[var(--bureau-teal-soft)] px-4 py-2 text-sm font-black text-[var(--bureau-teal)]"
                >
                  <Lightbulb size={17} />
                  {showHint ? "İpucunu gizle" : "İpucu göster"}
                </button>

                {showHint ? (
                  <div className="mt-4 rounded-[1.25rem] border border-[rgba(4,126,137,.24)] bg-[var(--bureau-teal-soft)] p-4">
                    <p className="text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
                      {question.hint}
                    </p>
                  </div>
                ) : null}

                <div className="mt-5 grid gap-3">
                  {question.choices.map((choice) => {
                    const isCorrectChoice = answered && choice.id === question.correctChoiceId;
                    const isWrongChoice = selected === choice.id && choice.id !== question.correctChoiceId;

                    return (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() =>
                          setSelectedAnswers((state) => ({
                            ...state,
                            [question.id]: choice.id
                          }))
                        }
                        className={`flex items-start gap-4 rounded-[1.25rem] border p-4 text-left transition ${
                          isCorrectChoice
                            ? "border-[rgba(4,126,137,.34)] bg-[var(--bureau-teal-soft)]"
                            : isWrongChoice
                              ? "border-[rgba(158,63,63,.34)] bg-[var(--bureau-rust-soft)]"
                              : "border-[var(--bureau-line)] bg-[rgba(255,250,242,.70)] hover:bg-white"
                        }`}
                      >
                        <span
                          className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-black ${
                            isCorrectChoice
                              ? "bg-[var(--bureau-teal)] text-[var(--bureau-inverse)]"
                              : isWrongChoice
                                ? "bg-[var(--bureau-rust)] text-[var(--bureau-inverse)]"
                                : "bg-[var(--bureau-blue-soft)] text-[var(--bureau-blue)]"
                          }`}
                        >
                          {choice.id}
                        </span>
                        <span className="pt-1 text-sm font-semibold leading-7 text-[var(--bureau-ink)]">
                          {choice.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {answered ? (
                  <div
                    className={`mt-5 rounded-[1.35rem] border p-4 ${
                      isCorrect
                        ? "border-[rgba(4,126,137,.34)] bg-[var(--bureau-teal-soft)]"
                        : "border-[rgba(158,63,63,.34)] bg-[var(--bureau-rust-soft)]"
                    }`}
                  >
                    <p className={`text-sm font-black ${isCorrect ? "text-[var(--bureau-teal)]" : "text-[var(--bureau-rust)]"}`}>
                      {isCorrect ? "Doğru" : "Yanlış"}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
                      {question.explanation}
                    </p>
                  </div>
                ) : null}

                <p className="mt-5 border-t border-[var(--bureau-line)] pt-4 text-xs font-semibold leading-6 text-[var(--bureau-muted)]">
                  {question.legalNote}
                </p>
              </article>
            );
          })}
        </div>

        <aside className="self-start xl:sticky xl:top-24">
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

            <div className="mt-5 grid grid-cols-2 gap-3">
              <SummaryBox label="Tarih sorusu" value={filtered.length} />
              <SummaryBox label="Konu başlığı" value={topicSummary.length} />
            </div>

            <div className="mt-5 space-y-2">
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

            <p className="mt-5 text-xs font-semibold leading-6 text-[var(--bureau-muted)]">
              Birebir resmi soru metni için ÖSYM arşivi kullanılmalıdır. Bu bölüm çalışma ve tekrar amacıyla özgün hazırlanmıştır.
            </p>
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
