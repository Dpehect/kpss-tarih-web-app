"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      <div className="rounded-xl border border-[var(--border-soft)] bg-[rgba(255,248,234,.92)] p-6 text-[var(--ink)] shadow-[var(--shadow-sm)]">
        <div className="flex flex-col gap-4 border-b border-[var(--border-soft)] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8d6500]">{topicTitle}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)]">
              Soru {currentIndex + 1} / {questions.length}
            </h2>
          </div>
          <span className="w-fit rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-[white]">
            Oturum: {correctCount}/{answeredCount || 0}
          </span>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[rgba(11,18,32,.10)]">
          <motion.div
            className="h-full rounded-full bg-[var(--ink)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 34, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -28, filter: "blur(8px)" }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="mt-8 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[var(--ink)] md:text-4xl">
              {current.stem}
            </h1>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowHint((value) => !value)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(76,141,255,.24)] bg-[rgba(76,141,255,.10)] px-4 py-2 text-sm font-semibold text-[var(--navy)]"
              >
                <Lightbulb size={16} />
                {showHint ? "İpucunu gizle" : "İpucu göster"}
              </button>

              {showHint ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-lg border border-[rgba(76,141,255,.24)] bg-[rgba(76,141,255,.10)] p-4 text-sm font-semibold leading-7 text-[var(--navy)]"
                >
                  {subtleHint}
                </motion.div>
              ) : null}
            </div>

            <div className="mt-8 grid gap-3">
              {current.choices.map((choice) => {
                const isCorrectChoice = isAnswered && choice.id === current.correctChoiceId;
                const isWrongChoice = selected === choice.id && choice.id !== current.correctChoiceId;

                return (
                  <motion.button
                    key={choice.id}
                    type="button"
                    onClick={() => answer(choice.id)}
                    whileHover={{ y: selected ? 0 : -2 }}
                    whileTap={{ scale: selected ? 1 : 0.99 }}
                    className={`group flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                      isCorrectChoice
                        ? "border-[#047857]/30 bg-[#dff8ef]"
                        : isWrongChoice
                          ? "border-[#9a3412]/30 bg-[#fff0e9]"
                          : "border-[var(--border-soft)] bg-white/84 hover:bg-white"
                    }`}
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                      isCorrectChoice
                        ? "bg-[#047857] text-white"
                        : isWrongChoice
                          ? "bg-[#9a3412] text-white"
                          : "bg-[var(--ink)] text-[white]"
                    }`}>
                      {choice.id}
                    </span>
                    <span className="pt-2 font-semibold leading-7 text-[var(--ink)]">{choice.text}</span>
                  </motion.button>
                );
              })}
            </div>

            {selected ? (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`mt-6 rounded-xl border p-5 ${
                  selectedChoiceIsCorrect ? "border-[#047857]/25 bg-[#dff8ef]" : "border-[#9a3412]/25 bg-[#fff0e9]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {selectedChoiceIsCorrect ? <CheckCircle2 size={20} className="text-[#047857]" /> : <XCircle size={20} className="text-[#9a3412]" />}
                  <p className="font-semibold text-[var(--ink)]">{selectedChoiceIsCorrect ? "Doğru cevap" : "Yanlış cevap"}</p>
                </div>
                <p className="mt-3 leading-7 text-[var(--graphite)]">{current.explanation}</p>
              </motion.div>
            ) : null}
          </motion.div>
        </AnimatePresence>

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
        <div className="rounded-xl border border-white/12 bg-[var(--ink)] p-6 text-[white] shadow-[var(--shadow-lg)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--sage)]">Oturum Özeti</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MiniStat label="Cevaplanan" value={answeredCount} />
            <MiniStat label="Doğru" value={correctCount} />
          </div>
          <p className="mt-5 text-sm font-medium leading-7 text-[var(--text-inverse-muted)]">
            İpucu cevabı söylemez; yalnızca çözüm yönünü hatırlatır.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border-soft)] bg-[rgba(255,248,234,.92)] p-5 text-[var(--ink)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--slate)]">Soru Haritası</p>
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
                  className={`grid size-10 place-items-center rounded-full text-sm font-semibold transition ${
                    isCurrent
                      ? "bg-[var(--ink)] text-[white]"
                      : isCorrect
                        ? "bg-[#dff8ef] text-[#047857]"
                        : isWrong
                          ? "bg-[#fff0e9] text-[#9a3412]"
                          : "bg-white text-[var(--ink)]"
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
    <div className="rounded-lg border border-white/14 bg-white/[0.10] p-4 text-[white]">
      <p className="text-xs font-semibold uppercase tracking-wider text-[rgba(255,248,234,.74)]">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-[white]">{value}</p>
    </div>
  );
}
