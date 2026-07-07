"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Map,
  Timer,
  TimerOff,
  Trophy,
  XCircle
} from "lucide-react";
import { toast } from "sonner";
import { saveOnlineExamResult } from "@/lib/progress/online-progress";
import { getSubtleQuestionHint } from "@/lib/questions/subtle-hint";
import type { Exam, Question } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function ExamRunnerClient({
  exam,
  questions,
  enableTimer = true
}: {
  exam: Exam;
  questions: Question[];
  enableTimer?: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(exam.durationMinutes * 60);

  const recordExamResult = useStudyProgressStore((state) => state.recordExamResult);
  const current = questions[currentIndex];
  const correct = questions.filter((question) => answers[question.id] === question.correctChoiceId).length;
  const answered = Object.keys(answers).length;
  const wrong = answered - correct;
  const subtleHint = getSubtleQuestionHint(current);
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);
  const scorePercent = Math.round((correct / questions.length) * 100);

  const questionMap = useMemo(
    () =>
      questions.map((question, index) => ({
        question,
        index
      })),
    [questions]
  );

  useEffect(() => {
    if (!enableTimer || finished) return;

    const interval = window.setInterval(() => {
      setRemainingSeconds((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [enableTimer, finished]);

  useEffect(() => {
    if (!enableTimer || finished || remainingSeconds > 0) return;

    void finishExam("Süre doldu. Deneme otomatik tamamlandı.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableTimer, finished, remainingSeconds]);

  function choose(choiceId: string) {
    if (finished) return;

    setAnswers((state) => ({
      ...state,
      [current.id]: choiceId
    }));
  }

  function goTo(index: number) {
    setShowHint(false);
    setCurrentIndex((index + questions.length) % questions.length);
  }

  async function finishExam(message = "Deneme sonucu kaydedildi") {
    if (!saved) {
      recordExamResult({
        examId: exam.id,
        score: correct,
        total: questions.length
      });

      void saveOnlineExamResult({
        examId: exam.id,
        score: correct,
        total: questions.length
      });

      setSaved(true);
      toast.success(message);
    }

    setFinished(true);
  }

  function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  if (!current) {
    return (
      <div className="bureau-card rounded-[2rem] p-6">
        <h1 className="text-3xl font-black text-[var(--bureau-ink)]">Soru bulunamadı</h1>
      </div>
    );
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="bureau-stage relative overflow-hidden rounded-[2.35rem] p-5 md:p-7">
        <div className="absolute inset-0 opacity-25">
          <svg viewBox="0 0 980 620" className="h-full w-full">
            <path d="M100 350 C214 210 362 196 520 252 C660 302 760 215 884 286" fill="none" stroke="rgba(255,250,242,.24)" strokeWidth="2" />
            <path d="M142 430 C308 338 444 370 606 330 C716 302 790 338 890 382" fill="none" stroke="rgba(4,126,137,.62)" strokeWidth="2" strokeDasharray="12 16" />
          </svg>
        </div>

        <div className="relative z-10 mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="bureau-kicker">{exam.title}</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--bureau-inverse)]">
              Soru {currentIndex + 1} / {questions.length}
            </h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[.08] px-4 py-3 backdrop-blur-2xl">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-inverse-muted)]">
                {enableTimer ? <Timer size={15} /> : <TimerOff size={15} />}
                {enableTimer ? "Kalan süre" : "Süresiz"}
              </p>
              <p className="mt-1 text-2xl font-black text-[var(--bureau-inverse)]">
                {enableTimer ? formatTime(remainingSeconds) : "Kapalı"}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-white/[.08] px-4 py-3 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-inverse-muted)]">Durum</p>
              <p className="mt-1 text-2xl font-black text-[var(--bureau-inverse)]">
                {correct}/{answered || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mb-6">
          <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-inverse-muted)]">
            <span>İlerleme</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/[.12]">
            <motion.div
              className="h-full rounded-full bg-[var(--bureau-teal)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative z-10 rounded-[2rem] border border-white/10 bg-white/[.08] p-5 backdrop-blur-2xl md:p-7"
          >
            <h2 className="text-3xl font-black leading-tight tracking-[-0.055em] text-[var(--bureau-inverse)] md:text-4xl">
              {current.stem}
            </h2>

            <button
              type="button"
              onClick={() => setShowHint((value) => !value)}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(4,126,137,.34)] bg-[rgba(4,126,137,.16)] px-4 py-2 text-sm font-black text-[var(--bureau-inverse)]"
            >
              <Lightbulb size={17} />
              {showHint ? "İpucunu gizle" : "İpucu göster"}
            </button>

            {showHint ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-[1.35rem] border border-[rgba(4,126,137,.30)] bg-[rgba(4,126,137,.12)] p-4"
              >
                <p className="text-sm font-semibold leading-7 text-[var(--bureau-inverse-copy)]">{subtleHint}</p>
              </motion.div>
            ) : null}
          </motion.article>
        </AnimatePresence>

        <div className="relative z-10 mt-5 grid gap-3">
          {current.choices.map((choice) => {
            const selected = answers[current.id] === choice.id;
            const revealCorrect = finished && choice.id === current.correctChoiceId;
            const revealWrong = finished && selected && choice.id !== current.correctChoiceId;

            return (
              <motion.button
                key={choice.id}
                type="button"
                onClick={() => choose(choice.id)}
                whileHover={{ y: finished ? 0 : -2 }}
                whileTap={{ scale: finished ? 1 : 0.99 }}
                className={`flex items-start gap-4 rounded-[1.35rem] border p-4 text-left transition ${
                  revealCorrect
                    ? "border-[rgba(4,126,137,.40)] bg-[rgba(4,126,137,.18)]"
                    : revealWrong
                      ? "border-[rgba(158,63,63,.42)] bg-[rgba(158,63,63,.18)]"
                      : selected
                        ? "border-white/30 bg-white/[.14]"
                        : "border-white/10 bg-white/[.08] hover:bg-white/[.12]"
                }`}
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-black ${
                    revealCorrect
                      ? "bg-[var(--bureau-teal)] text-[var(--bureau-inverse)]"
                      : revealWrong
                        ? "bg-[var(--bureau-rust)] text-[var(--bureau-inverse)]"
                        : "bg-white/[.12] text-[var(--bureau-inverse)]"
                  }`}
                >
                  {choice.id}
                </span>
                <span className="pt-2 font-semibold leading-7 text-[var(--bureau-inverse)]">{choice.text}</span>
              </motion.button>
            );
          })}
        </div>

        {finished ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 mt-5 rounded-[1.6rem] border border-[rgba(4,126,137,.38)] bg-[rgba(4,126,137,.14)] p-5"
          >
            <div className="flex items-center gap-3">
              {answers[current.id] === current.correctChoiceId ? (
                <CheckCircle2 className="text-[var(--bureau-teal)]" size={24} />
              ) : (
                <XCircle className="text-[var(--bureau-rust)]" size={24} />
              )}
              <h3 className="text-xl font-black text-[var(--bureau-inverse)]">Açıklama</h3>
            </div>
            <p className="mt-3 text-sm font-semibold leading-7 text-[var(--bureau-inverse-copy)]">{current.explanation}</p>
          </motion.div>
        ) : null}

        <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={() => goTo(currentIndex - 1)} className="btn-ghost">
            <ArrowLeft size={17} />
            Önceki soru
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => void finishExam()} className="btn-accent">
              <Trophy size={17} />
              Denemeyi bitir
            </button>
            <button type="button" onClick={() => goTo(currentIndex + 1)} className="btn-primary" data-dark-button="true">
              Sonraki soru
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <aside className="grid gap-5 self-start xl:sticky xl:top-24">
        <div className="bureau-card rounded-[2rem] p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]">
              <Clock3 size={20} />
            </span>
            <div>
              <p className="bureau-kicker">Deneme Özeti</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--bureau-ink)]">
                {enableTimer ? "Süreli mod" : "Süresiz mod"}
              </h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <MiniStat label="Doğru" value={correct} />
            <MiniStat label="Yanlış" value={wrong} />
            <MiniStat label="Cevap" value={answered} />
          </div>

          {finished ? (
            <div className="mt-5 rounded-[1.25rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bureau-muted)]">Sonuç</p>
              <p className="mt-2 text-4xl font-black tracking-[-0.08em] text-[var(--bureau-ink)]">
                %{scorePercent}
              </p>
            </div>
          ) : (
            <p className="mt-5 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
              Denemeyi bitirince doğru cevaplar ve açıklamalar açılır.
            </p>
          )}
        </div>

        <div className="bureau-card rounded-[2rem] p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]">
              <Map size={20} />
            </span>
            <div>
              <p className="bureau-kicker">Soru Haritası</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--bureau-ink)]">
                {questions.length} soru
              </h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2">
            {questionMap.map(({ question, index }) => {
              const active = index === currentIndex;
              const answeredQuestion = Boolean(answers[question.id]);

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
                      : answeredQuestion
                        ? "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]"
                        : "bg-[rgba(255,250,242,.82)] text-[var(--bureau-ink)]"
                  }`}
                >
                  {index + 1}
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
    <div className="rounded-[1rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">{value}</p>
    </div>
  );
}
