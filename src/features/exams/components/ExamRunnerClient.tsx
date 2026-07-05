"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Exam, Question } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

/**
 * Süreli deneme mantığı.
 * Sonuçlar dashboard ve analiz sayfasına bağlanır.
 */
export function ExamRunnerClient({ exam, questions }: { exam: Exam; questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const recordExamResult = useStudyProgressStore((state) => state.recordExamResult);

  const correct = questions.filter((question) => answers[question.id] === question.correctChoiceId).length;

  function finishExam() {
    if (!finished) {
      recordExamResult({
        examId: exam.id,
        score: correct,
        total: questions.length
      });
      toast.success("Deneme sonucu kaydedildi");
    }
    setFinished(true);
  }

  return (
    <section className="space-y-4">
      <div className="rounded-[2rem] parchment-surface p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-black">{Object.keys(answers).length} / {questions.length} soru işaretlendi</p>
          <button onClick={finishExam} className="rounded-full bg-[#f2c15f] px-5 py-3 font-black text-[#120b07]">
            Denemeyi bitir
          </button>
        </div>
      </div>

      {finished ? (
        <div className="rounded-[2rem] bg-[#52f2d0] p-6 text-[#120b07]">
          <p className="text-xs font-black uppercase tracking-[0.24em] opacity-70">Sonuç</p>
          <h2 className="mt-3 text-5xl font-black tracking-[-0.08em]">{correct} / {questions.length}</h2>
          <p className="mt-3 font-semibold">Doğruluk: %{Math.round((correct / questions.length) * 100)}</p>
        </div>
      ) : null}

      {questions.map((question, index) => (
        <article key={question.id} className="rounded-[2rem] parchment-surface p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f6c465]">Soru {index + 1}</p>
          <h3 className="mt-3 text-xl font-black">{question.stem}</h3>
          <div className="mt-5 grid gap-3">
            {question.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => setAnswers((state) => ({ ...state, [question.id]: choice.id }))}
                className={`rounded-[1.25rem] border p-4 text-left ${
                  answers[question.id] === choice.id
                    ? "border-[#f2c15f] bg-[#f2c15f]/16"
                    : "border-white/10 bg-white/[0.05]"
                }`}
              >
                <span className="mr-3 font-black text-[#f6c465]">{choice.id}</span>
                {choice.text}
              </button>
            ))}
          </div>

          {finished ? (
            <p className="mt-4 rounded-2xl bg-[#120b07]/52 p-4 text-sm leading-6 text-[#ead7b7]/72">
              <strong className="text-[#f6c465]">Açıklama:</strong> {question.explanation}
            </p>
          ) : null}
        </article>
      ))}
    </section>
  );
}
