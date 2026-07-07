"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, Map, Target, XCircle } from "lucide-react";
import { toast } from "sonner";
import { saveOnlineQuestionAttempt } from "@/lib/progress/online-progress";
import { getSubtleQuestionHint } from "@/lib/questions/subtle-hint";
import type { Question } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function TopicQuestionRunner({ questions, topicTitle }: { questions: Question[]; topicTitle: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);

  const recordAttempt = useStudyProgressStore((state) => state.recordQuestionAttempt);
  const current = questions[currentIndex];
  const selected = current ? selectedChoices[current.id] ?? null : null;
  const answeredCount = Object.keys(selectedChoices).length;
  const correctCount = questions.filter((question) => selectedChoices[question.id] === question.correctChoiceId).length;
  const wrongCount = answeredCount - correctCount;
  const progress = questions.length ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;
  const isAnswered = Boolean(selected);
  const selectedChoiceIsCorrect = current ? selected === current.correctChoiceId : false;
  const subtleHint = current ? getSubtleQuestionHint(current) : "";
  const questionNumbers = useMemo(
    () =>
      questions.map((question, index) => ({
        id: question.id,
        index
      })),
    [questions]
  );

  if (!current) {
    return (
      <div className="bureau-card rounded-[2rem] p-6">
        <h2 className="text-3xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">Bu testte soru bulunamadı</h2>
        <a href="/question-bank" className="btn-primary mt-5" data-dark-button="true">
          Soru bankasına dön
          <ArrowRight size={17} />
        </a>
      </div>
    );
  }

  async function answer(choiceId: string) {
    if (!current || selectedChoices[current.id]) return;

    const isCorrect = choiceId === current.correctChoiceId;

    setSelectedChoices((state) => ({
      ...state,
      [current.id]: choiceId
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

    toast[isCorrect ? "success" : "error"](isCorrect ? "Doğru cevap kaydedildi" : "Yanlış cevap kaydedildi");
  }

  function goTo(index: number) {
    setShowHint(false);
    setCurrentIndex((index + questions.length) % questions.length);
  }

  function goNextUnanswered() {
    const nextUnanswered = questions.findIndex((question, index) => index > currentIndex && !selectedChoices[question.id]);

    if (nextUnanswered >= 0) {
      goTo(nextUnanswered);
      return;
    }

    const firstUnanswered = questions.findIndex((question) => !selectedChoices[question.id]);

    if (firstUnanswered >= 0) {
      goTo(firstUnanswered);
      return;
    }

    toast.success("Bu testteki tüm sorular cevaplandı.");
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
            <p className="bureau-kicker">{topicTitle}</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--bureau-inverse)]">
              Soru {currentIndex + 1} / {questions.length}
            </h1>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-white/[.08] px-4 py-3 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-inverse-muted)]">Oturum</p>
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
            const isCorrectChoice = isAnswered && choice.id === current.correctChoiceId;
            const isWrongChoice = selected === choice.id && choice.id !== current.correctChoiceId;
            const isSelectedButWaiting = selected === choice.id && !isAnswered;

            return (
              <motion.button
                key={choice.id}
                type="button"
                onClick={() => void answer(choice.id)}
                disabled={isAnswered}
                whileHover={{ y: isAnswered ? 0 : -2 }}
                whileTap={{ scale: isAnswered ? 1 : 0.99 }}
                className={`group flex items-start gap-4 rounded-[1.35rem] border p-4 text-left transition disabled:cursor-default ${
                  isCorrectChoice
                    ? "border-[rgba(4,126,137,.40)] bg-[rgba(4,126,137,.18)]"
                    : isWrongChoice
                      ? "border-[rgba(158,63,63,.42)] bg-[rgba(158,63,63,.18)]"
                      : isSelectedButWaiting
                        ? "border-white/30 bg-white/[.14]"
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
              </motion.button>
            );
          })}
        </div>

        {selected ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative z-10 mt-5 rounded-[1.6rem] border p-5 ${
              selectedChoiceIsCorrect
                ? "border-[rgba(4,126,137,.38)] bg-[rgba(4,126,137,.14)]"
                : "border-[rgba(158,63,63,.38)] bg-[rgba(158,63,63,.14)]"
            }`}
          >
            <div className="flex items-center gap-3">
              {selectedChoiceIsCorrect ? (
                <CheckCircle2 className="text-[var(--bureau-teal)]" size={24} />
              ) : (
                <XCircle className="text-[var(--bureau-rust)]" size={24} />
              )}
              <h3 className="text-xl font-black text-[var(--bureau-inverse)]">
                {selectedChoiceIsCorrect ? "Doğru cevap" : "Yanlış cevap"}
              </h3>
            </div>
            <p className="mt-3 text-sm font-semibold leading-7 text-[var(--bureau-inverse-copy)]">{current.explanation}</p>
            <p className="mt-3 rounded-[1rem] border border-white/10 bg-white/[.07] px-4 py-3 text-sm font-semibold leading-7 text-[var(--bureau-inverse-copy)]">
              <strong className="text-[var(--bureau-inverse)]">Sınav notu:</strong> {current.examTip}
            </p>
          </motion.div>
        ) : null}

        <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={() => goTo(currentIndex - 1)} className="btn-ghost">
            <ArrowLeft size={17} />
            Önceki soru
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={goNextUnanswered} className="btn-accent">
              Cevapsız soruya git
              <Target size={17} />
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
              <Target size={20} />
            </span>
            <div>
              <p className="bureau-kicker">Oturum Özeti</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--bureau-ink)]">
                Canlı durum
              </h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <MiniStat label="Doğru" value={correctCount} />
            <MiniStat label="Yanlış" value={wrongCount} />
            <MiniStat label="Cevap" value={answeredCount} />
          </div>

          <p className="mt-5 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
            İpucu cevabı söylemez; yalnızca çözüm yönünü hatırlatır. Cevaplanan soruya geri dönünce işaretlediğin seçenek korunur.
          </p>
        </div>

        <div className="bureau-card rounded-[2rem] p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]">
              <Map size={20} />
            </span>
            <div>
              <p className="bureau-kicker">Soru Haritası</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--bureau-ink)]">
                Kayıt izi
              </h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2">
            {questionNumbers.map((item) => {
              const question = questions[item.index];
              const isCurrent = item.index === currentIndex;
              const selectedChoice = selectedChoices[question.id];
              const isCorrect = selectedChoice === question.correctChoiceId;
              const isWrong = Boolean(selectedChoice) && !isCorrect;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.index)}
                  data-active={isCurrent ? "true" : undefined}
                  aria-pressed={isCurrent}
                  className={`grid size-10 place-items-center rounded-full text-sm font-black transition ${
                    isCurrent
                      ? "bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]"
                      : isCorrect
                        ? "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]"
                        : isWrong
                          ? "bg-[var(--bureau-rust-soft)] text-[var(--bureau-rust)]"
                          : "bg-[rgba(255,250,242,.82)] text-[var(--bureau-ink)]"
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
    <div className="rounded-[1rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">{value}</p>
    </div>
  );
}
