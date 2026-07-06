"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { saveOnlineExamResult } from "@/lib/progress/online-progress";
import { getSubtleQuestionHint } from "@/lib/questions/subtle-hint";
import type { Exam, Question } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function ExamRunnerClient({ exam, questions }: { exam: Exam; questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const recordExamResult = useStudyProgressStore((state) => state.recordExamResult);

  const current = questions[currentIndex];
  const correct = questions.filter((question) => answers[question.id] === question.correctChoiceId).length;
  const answered = Object.keys(answers).length;
  const subtleHint = getSubtleQuestionHint(current);

  function choose(choiceId: string) {
    if (finished) return;
    setAnswers((state) => ({ ...state, [current.id]: choiceId }));
  }

  function goTo(index: number) {
    setShowHint(false);
    setCurrentIndex((index + questions.length) % questions.length);
  }

  async function finishExam() {
    if (!finished) {
      recordExamResult({ examId: exam.id, score: correct, total: questions.length });
      void saveOnlineExamResult({ examId: exam.id, score: correct, total: questions.length });
      toast.success("Deneme sonucu kaydedildi");
    }

    setFinished(true);
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-xl border border-[var(--border-soft)] bg-[rgba(255,248,234,.92)] p-6 text-[var(--ink)] shadow-[var(--shadow-sm)]">
        <div className="flex flex-col gap-4 border-b border-[var(--border-soft)] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8d6500]">{exam.title}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)]">
              Soru {currentIndex + 1} / {questions.length}
            </h2>
          </div>
          <button onClick={finishExam} className="btn-primary">
            Denemeyi bitir
          </button>
        </div>

        {finished ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-6 rounded-[1.6rem] bg-[#dff8ef] p-5 text-[var(--ink)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#047857]">Sonuç</p>
            <h3 className="mt-3 text-5xl font-semibold tracking-tight text-[var(--ink)]">{correct} / {questions.length}</h3>
            <p className="mt-2 font-semibold text-[var(--graphite)]">Doğruluk: %{Math.round((correct / questions.length) * 100)}</p>
          </motion.div>
        ) : null}

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
                const selected = answers[current.id] === choice.id;
                const revealCorrect = finished && choice.id === current.correctChoiceId;
                const revealWrong = finished && selected && choice.id !== current.correctChoiceId;

                return (
                  <motion.button
                    key={choice.id}
                    onClick={() => choose(choice.id)}
                    whileHover={{ y: finished ? 0 : -2 }}
                    whileTap={{ scale: finished ? 1 : 0.99 }}
                    className={`flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                      revealCorrect
                        ? "border-[#047857]/30 bg-[#dff8ef]"
                        : revealWrong
                          ? "border-[#9a3412]/30 bg-[#fff0e9]"
                          : selected
                            ? "border-[var(--ink)] bg-white"
                            : "border-[var(--border-soft)] bg-white/84 hover:bg-white"
                    }`}
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                      revealCorrect
                        ? "bg-[#047857] text-white"
                        : revealWrong
                          ? "bg-[#9a3412] text-white"
                          : selected
                            ? "bg-[var(--navy)] text-white"
                            : "bg-[var(--ink)] text-[white]"
                    }`}>
                      {choice.id}
                    </span>
                    <span className="pt-2 font-semibold leading-7 text-[var(--ink)]">{choice.text}</span>
                  </motion.button>
                );
              })}
            </div>

            {finished ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border border-[var(--border-soft)] bg-white/84 p-5 text-[var(--ink)]"
              >
                <p className="font-semibold text-[var(--ink)]">Açıklama</p>
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
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--sage)]">Deneme Özeti</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MiniStat label="İşaretli" value={answered} />
            <MiniStat label="Doğru" value={finished ? correct : 0} />
          </div>
          <p className="mt-5 text-sm font-medium leading-7 text-[var(--text-inverse-muted)]">
            Denemeyi bitirince açıklamalar ve sonuç ekranı açılır.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border-soft)] bg-[rgba(255,248,234,.92)] p-5 text-[var(--ink)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--slate)]">Soru Haritası</p>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {questions.map((question, index) => (
              <button
                key={question.id}
                type="button"
                onClick={() => goTo(index)}
                className={`grid size-10 place-items-center rounded-full text-sm font-semibold transition ${
                  index === currentIndex
                    ? "bg-[var(--ink)] text-[white]"
                    : answers[question.id]
                      ? "bg-[rgba(76,141,255,.12)] text-[var(--navy)]"
                      : "bg-white text-[var(--ink)]"
                }`}
              >
                {index + 1}
              </button>
            ))}
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
