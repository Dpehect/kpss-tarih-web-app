"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { saveOnlineQuestionAttempt } from "@/lib/progress/online-progress";
import type { Question } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function TopicQuestionRunner({
  questions,
  topicTitle
}: {
  questions: Question[];
  topicTitle: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, boolean>>({});
  const recordAttempt = useStudyProgressStore((state) => state.recordQuestionAttempt);

  const current = questions[currentIndex];
  const answeredCount = Object.keys(sessionAnswers).length;
  const correctCount = Object.values(sessionAnswers).filter(Boolean).length;
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  const isAnswered = Boolean(selected);
  const selectedChoiceIsCorrect = selected === current.correctChoiceId;

  const questionNumbers = useMemo(
    () => questions.map((question, index) => ({ id: question.id, index })),
    [questions]
  );

  async function answer(choiceId: string) {
    if (selected) return;

    const isCorrect = choiceId === current.correctChoiceId;
    setSelected(choiceId);
    setSessionAnswers((state) => ({
      ...state,
      [current.id]: isCorrect
    }));

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

    if (isCorrect) {
      toast.success("Doğru cevap kaydedildi");
    } else {
      toast.error("Yanlış cevap kaydedildi");
    }
  }

  function nextQuestion() {
    setSelected(null);
    setCurrentIndex((index) => (index + 1) % questions.length);
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-[2rem] border border-black/[0.08] bg-[#fffaf0]/84 p-6 shadow-[0_24px_80px_rgba(18,24,38,0.08)]">
        <div className="flex flex-col gap-4 border-b border-black/[0.08] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">{topicTitle}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">
              Soru {currentIndex + 1} / {questions.length}
            </h2>
          </div>
          <span className="w-fit rounded-full bg-[#111827] px-4 py-2 text-sm font-black text-[#fffaf0]">
            Oturum: {correctCount}/{answeredCount || 0}
          </span>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#111827]/10">
          <div className="h-full rounded-full bg-[#111827]" style={{ width: `${progress}%` }} />
        </div>

        <h1 className="mt-8 max-w-4xl text-3xl font-black leading-tight tracking-[-0.055em] md:text-4xl">
          {current.stem}
        </h1>

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
                    ? "border-[#2f8f75]/30 bg-[#dff8ef]"
                    : isWrongChoice
                      ? "border-[#be684b]/30 bg-[#fff0e9]"
                      : "border-black/[0.08] bg-white/54 hover:-translate-y-0.5 hover:bg-white"
                }`}
              >
                <span className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-black ${
                  isCorrectChoice
                    ? "bg-[#2f8f75] text-white"
                    : isWrongChoice
                      ? "bg-[#be684b] text-white"
                      : "bg-[#111827] text-[#fffaf0]"
                }`}>
                  {choice.id}
                </span>
                <span className="pt-2 font-semibold leading-7 text-[#111827]">{choice.text}</span>
              </button>
            );
          })}
        </div>

        {selected ? (
          <div className={`mt-6 rounded-[1.5rem] border p-5 ${
            selectedChoiceIsCorrect
              ? "border-[#2f8f75]/25 bg-[#dff8ef]"
              : "border-[#be684b]/25 bg-[#fff0e9]"
          }`}>
            <div className="flex items-center gap-3">
              {selectedChoiceIsCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              <p className="font-black">
                {selectedChoiceIsCorrect ? "Doğru cevap" : "Yanlış cevap"}
              </p>
            </div>
            <p className="mt-3 leading-7 text-[#425066]">{current.explanation}</p>
            <p className="mt-4 rounded-2xl bg-white/50 p-4 text-sm font-bold leading-6 text-[#111827]">
              KPSS ipucu: {current.examTip}
            </p>
            <button type="button" onClick={nextQuestion} className="btn-primary mt-5">
              Sonraki soru
              <ArrowRight size={18} />
            </button>
          </div>
        ) : null}
      </div>

      <aside className="space-y-4">
        <div className="dark-surface rounded-[2rem] p-6">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f0bd59]">Oturum Özeti</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MiniStat label="Cevaplanan" value={answeredCount} />
            <MiniStat label="Doğru" value={correctCount} />
          </div>
          <p className="mt-5 text-sm leading-7 text-[#fffaf0]/62">
            Bu ekran tek konuya odaklanır. Konu değiştirmek için test listesine dön.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/[0.08] bg-[#fffaf0]/84 p-5">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#425066]">Soru Haritası</p>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {questionNumbers.map((item) => {
              const isCurrent = item.index === currentIndex;
              const isCorrect = sessionAnswers[questions[item.index].id] === true;
              const isWrong = sessionAnswers[questions[item.index].id] === false;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setCurrentIndex(item.index);
                  }}
                  className={`grid size-10 place-items-center rounded-full text-sm font-black transition ${
                    isCurrent
                      ? "bg-[#111827] text-[#fffaf0]"
                      : isCorrect
                        ? "bg-[#dff8ef] text-[#2f8f75]"
                        : isWrong
                          ? "bg-[#fff0e9] text-[#be684b]"
                          : "bg-white text-[#425066]"
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
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.08] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-[#fffaf0]/46">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-[#fffaf0]">{value}</p>
    </div>
  );
}
