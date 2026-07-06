"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { saveOnlineExamResult } from "@/lib/progress/online-progress";
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

      toast.success("Deneme sonucu kaydedildi");
    }

    setFinished(true);
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-[2rem] border border-[#0f172a]/10 bg-[#fffaf0]/92 p-6 text-[#0b1220] shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 border-b border-[#0f172a]/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#1d4ed8]">{exam.title}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-[#0b1220]">
              Soru {currentIndex + 1} / {questions.length}
            </h2>
          </div>
          <button onClick={finishExam} className="btn-primary">
            Denemeyi bitir
          </button>
        </div>

        {finished ? (
          <div className="mt-6 rounded-[1.6rem] bg-[#dff8ef] p-5 text-[#0b1220]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#047857]">Sonuç</p>
            <h3 className="mt-3 text-5xl font-black tracking-[-0.08em] text-[#0b1220]">{correct} / {questions.length}</h3>
            <p className="mt-2 font-semibold text-[#334155]">Doğruluk: %{Math.round((correct / questions.length) * 100)}</p>
          </div>
        ) : null}

        <h1 className="mt-8 max-w-4xl text-3xl font-black leading-tight tracking-[-0.055em] text-[#0b1220] md:text-4xl">
          {current.stem}
        </h1>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setShowHint((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/20 bg-[#edf2ff] px-4 py-2 text-sm font-black text-[#1d4ed8]"
          >
            <Lightbulb size={16} />
            {showHint ? "İpucunu gizle" : "İpucu göster"}
          </button>

          {showHint ? (
            <div className="mt-4 rounded-[1.25rem] border border-[#2563eb]/20 bg-[#edf2ff] p-4 text-sm font-semibold leading-7 text-[#1d4ed8]">
              {current.examTip}
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid gap-3">
          {current.choices.map((choice) => {
            const selected = answers[current.id] === choice.id;
            const revealCorrect = finished && choice.id === current.correctChoiceId;
            const revealWrong = finished && selected && choice.id !== current.correctChoiceId;

            return (
              <button
                key={choice.id}
                onClick={() => choose(choice.id)}
                className={`flex items-start gap-4 rounded-[1.35rem] border p-4 text-left transition ${
                  revealCorrect
                    ? "border-[#047857]/30 bg-[#dff8ef]"
                    : revealWrong
                      ? "border-[#9a3412]/30 bg-[#fff0e9]"
                      : selected
                        ? "border-[#0b1220] bg-white"
                        : "border-[#0f172a]/10 bg-white/84 hover:-translate-y-0.5 hover:bg-white"
                }`}
              >
                <span className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-black ${
                  revealCorrect
                    ? "bg-[#047857] text-white"
                    : revealWrong
                      ? "bg-[#9a3412] text-white"
                      : selected
                        ? "bg-[#1d4ed8] text-white"
                        : "bg-[#0b1220] text-[#fff8ea]"
                }`}>
                  {choice.id}
                </span>
                <span className="pt-2 font-semibold leading-7 text-[#0b1220]">{choice.text}</span>
              </button>
            );
          })}
        </div>

        {finished ? (
          <div className="mt-6 rounded-[1.5rem] border border-[#0f172a]/10 bg-white/84 p-5 text-[#0b1220]">
            <p className="font-black text-[#0b1220]">Açıklama</p>
            <p className="mt-3 leading-7 text-[#253246]">{current.explanation}</p>
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
        <div className="rounded-[2rem] border border-white/12 bg-[#0b1220] p-6 text-[#fff8ea] shadow-[0_24px_80px_rgba(11,18,32,0.18)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d9aa52]">Deneme Özeti</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MiniStat label="İşaretli" value={answered} />
            <MiniStat label="Doğru" value={finished ? correct : 0} />
          </div>
          <p className="mt-5 text-sm font-medium leading-7 text-[#fff8ea]/82">
            İleri/geri ile sorular arasında geç. Denemeyi bitirince açıklamalar açılır.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#0f172a]/10 bg-[#fffaf0]/92 p-5 text-[#0b1220]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#475569]">Soru Haritası</p>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {questions.map((question, index) => (
              <button
                key={question.id}
                type="button"
                onClick={() => goTo(index)}
                className={`grid size-10 place-items-center rounded-full text-sm font-black transition ${
                  index === currentIndex
                    ? "bg-[#0b1220] text-[#fff8ea]"
                    : answers[question.id]
                      ? "bg-[#edf2ff] text-[#1d4ed8]"
                      : "bg-white text-[#0b1220]"
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
    <div className="rounded-[1.25rem] border border-white/14 bg-white/[0.10] p-4 text-[#fff8ea]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fff8ea]/74">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-[#fff8ea]">{value}</p>
    </div>
  );
}
