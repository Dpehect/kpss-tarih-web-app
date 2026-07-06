"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { toast } from "sonner";
import { saveOnlineQuestionAttempt } from "@/lib/progress/online-progress";
import { getSubtleQuestionHint } from "@/lib/questions/subtle-hint";
import type { Question } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function TopicQuestionRunner({ questions, topicTitle }: { questions: Question[]; topicTitle: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, boolean>>({});
  const recordAttempt = useStudyProgressStore((state) => state.recordQuestionAttempt);

  const current = questions[currentIndex];
  const answeredCount = Object.keys(sessionAnswers).length;
  const correctCount = Object.values(sessionAnswers).filter(Boolean).length;
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);
  const isAnswered = Boolean(selected);
  const selectedChoiceIsCorrect = selected === current.correctChoiceId;
  const subtleHint = getSubtleQuestionHint(current);

  const questionNumbers = useMemo(() => questions.map((question, index) => ({ id: question.id, index })), [questions]);

  async function answer(choiceId: string) {
    if (selected) return;
    const isCorrect = choiceId === current.correctChoiceId;

    setSelected(choiceId);
    setSessionAnswers((state) => ({ ...state, [current.id]: isCorrect }));

    recordAttempt({
      questionId: current.id,
      topicId: current.topicId,
      selectedChoiceId: choiceId,
      correctChoiceId: current.correctChoiceId,
      isCorrect
    });

    void saveOnlineQuestionAttempt({
      questionId: current.id,
      topicId: current.topicId,
      selectedChoiceId: choiceId,
      correctChoiceId: current.correctChoiceId,
      isCorrect
    });

    toast[isCorrect ? "success" : "error"](isCorrect ? "Doğru cevap kaydedildi" : "Yanlış cevap kaydedildi");
  }

  function goTo(index: number) {
    setSelected(null);
    setShowHint(false);
    setCurrentIndex((index + questions.length) % questions.length);
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-[2rem] border border-[rgba(11,18,32,.10)] bg-[rgba(255,248,234,.92)] p-6 text-[var(--museum-navy-2)] shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-4 border-b border-[rgba(11,18,32,.10)] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8d6500]">{topicTitle}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-[var(--museum-navy-2)]">
              Soru {currentIndex + 1} / {questions.length}
            </h2>
          </div>
          <span className="w-fit rounded-full bg-[var(--museum-navy-2)] px-4 py-2 text-sm font-black text-[var(--museum-cream)]">
            Oturum: {correctCount}/{answeredCount || 0}
          </span>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[rgba(11,18,32,.10)]">
          <div className="h-full rounded-full bg-[var(--museum-navy-2)]" style={{ width: `${progress}%` }} />
        </div>

        <h1 className="mt-8 max-w-4xl text-3xl font-black leading-tight tracking-[-0.055em] text-[var(--museum-navy-2)] md:text-4xl">
          {current.stem}
        </h1>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setShowHint((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(76,141,255,.24)] bg-[rgba(76,141,255,.10)] px-4 py-2 text-sm font-black text-[#1d4ed8]"
          >
            <Lightbulb size={16} />
            {showHint ? "İpucunu gizle" : "İpucu göster"}
          </button>

          {showHint ? (
            <div className="mt-4 rounded-[1.25rem] border border-[rgba(76,141,255,.24)] bg-[rgba(76,141,255,.10)] p-4 text-sm font-semibold leading-7 text-[#1d4ed8]">
              {subtleHint}
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid gap-3">
          {current.choices.map((choice) => {
            const isCorrectChoice = isAnswered && choice.id === current.correctChoiceId;
            const isWrongChoice = selected === choice.id && choice.id !== current.correctChoiceId;

            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => answer(choice.id)}
                className={`group flex items-start gap-4 rounded-[1.35rem] border p-4 text-left transition ${
                  isCorrectChoice
                    ? "border-[#047857]/30 bg-[#dff8ef]"
                    : isWrongChoice
                      ? "border-[#9a3412]/30 bg-[#fff0e9]"
                      : "border-[rgba(11,18,32,.10)] bg-white/84 hover:-translate-y-0.5 hover:bg-white"
                }`}
              >
                <span className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-black ${
                  isCorrectChoice
                    ? "bg-[#047857] text-white"
                    : isWrongChoice
                      ? "bg-[#9a3412] text-white"
                      : "bg-[var(--museum-navy-2)] text-[var(--museum-cream)]"
                }`}>
                  {choice.id}
                </span>
                <span className="pt-2 font-semibold leading-7 text-[var(--museum-navy-2)]">{choice.text}</span>
              </button>
            );
          })}
        </div>

        {selected ? (
          <div className={`mt-6 rounded-[1.5rem] border p-5 ${
            selectedChoiceIsCorrect ? "border-[#047857]/25 bg-[#dff8ef]" : "border-[#9a3412]/25 bg-[#fff0e9]"
          }`}>
            <div className="flex items-center gap-3">
              {selectedChoiceIsCorrect ? <CheckCircle2 size={20} className="text-[#047857]" /> : <XCircle size={20} className="text-[#9a3412]" />}
              <p className="font-black text-[var(--museum-navy-2)]">{selectedChoiceIsCorrect ? "Doğru cevap" : "Yanlış cevap"}</p>
            </div>
            <p className="mt-3 leading-7 text-[#334155]">{current.explanation}</p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button type="button" onClick={() => goTo(currentIndex - 1)} className="btn-ghost">
            <ArrowLeft size={18} />
            Önceki soru
          </button>
          <button type="button" onClick={() => goTo(currentIndex + 1)} className="btn-primary">
            Sonraki soru
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-[2rem] border border-white/12 bg-[var(--museum-navy-2)] p-6 text-[var(--museum-cream)] shadow-[var(--shadow-deep)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--museum-gold)]">Oturum Özeti</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MiniStat label="Cevaplanan" value={answeredCount} />
            <MiniStat label="Doğru" value={correctCount} />
          </div>
          <p className="mt-5 text-sm font-medium leading-7 text-[rgba(255,248,234,.80)]">
            İpucu artık cevabı söylemez; yalnızca çözüm yönünü hatırlatır.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[rgba(11,18,32,.10)] bg-[rgba(255,248,234,.92)] p-5 text-[var(--museum-navy-2)]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#475569]">Soru Haritası</p>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {questionNumbers.map((item) => {
              const isCurrent = item.index === currentIndex;
              const isCorrect = sessionAnswers[questions[item.index].id] === true;
              const isWrong = sessionAnswers[questions[item.index].id] === false;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.index)}
                  className={`grid size-10 place-items-center rounded-full text-sm font-black transition ${
                    isCurrent
                      ? "bg-[var(--museum-navy-2)] text-[var(--museum-cream)]"
                      : isCorrect
                        ? "bg-[#dff8ef] text-[#047857]"
                        : isWrong
                          ? "bg-[#fff0e9] text-[#9a3412]"
                          : "bg-white text-[var(--museum-navy-2)]"
                  }`}
                >
                  {item.index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.25rem] border border-white/14 bg-white/[0.10] p-4 text-[var(--museum-cream)]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[rgba(255,248,234,.74)]">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--museum-cream)]">{value}</p>
    </div>
  );
}
