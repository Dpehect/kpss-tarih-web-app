"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { saveOnlineQuestionAttempt } from "@/lib/progress/online-progress";
import type { Question, Topic } from "@/types/study";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function QuestionBankClient({ questions, topics }: { questions: Question[]; topics: Topic[] }) {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get("topic") ?? "all";
  const [topicId, setTopicId] = useState(initialTopic);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const recordAttempt = useStudyProgressStore((state) => state.recordQuestionAttempt);

  const filteredQuestions = useMemo(
    () => topicId === "all" ? questions : questions.filter((question) => question.topicId === topicId),
    [questions, topicId]
  );

  const current = filteredQuestions[currentIndex] ?? filteredQuestions[0];
  const topic = topics.find((item) => item.id === current?.topicId);

  async function answer(choiceId: string) {
    if (!current || selected) return;

    setSelected(choiceId);
    const isCorrect = choiceId === current.correctChoiceId;

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
      setScore((value) => value + 1);
      toast.success("Doğru cevap kaydedildi");
    } else {
      toast.error("Yanlış cevap kaydedildi, açıklamayı incele");
    }
  }

  function nextQuestion() {
    setSelected(null);
    setCurrentIndex((index) => (index + 1) % filteredQuestions.length);
  }

  function resetFilter(nextTopicId: string) {
    setTopicId(nextTopicId);
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
  }

  if (!current) return null;

  return (
    <section className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="rounded-[2rem] parchment-surface p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f6c465]">Filtre</p>
        <div className="mt-5 space-y-2">
          <button onClick={() => resetFilter("all")} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold ${topicId === "all" ? "bg-[#f2c15f] text-[#120b07]" : "bg-white/[0.06]"}`}>
            Tüm sorular
          </button>
          {topics.map((topic) => (
            <button key={topic.id} onClick={() => resetFilter(topic.id)} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold ${topicId === topic.id ? "bg-[#f2c15f] text-[#120b07]" : "bg-white/[0.06]"}`}>
              {topic.title}
            </button>
          ))}
        </div>
      </aside>

      <div className="rounded-[2rem] parchment-surface p-6">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-[#ead7b7]/58">{topic?.title}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#f6c465]">
              Soru {currentIndex + 1} / {filteredQuestions.length} · Bu oturum skoru {score}
            </p>
          </div>
          <span className="w-fit rounded-full bg-white/[0.08] px-3 py-1 text-xs">{current.difficulty}</span>
        </div>

        <h2 className="mt-7 text-2xl font-black leading-tight tracking-[-0.04em]">{current.stem}</h2>

        <div className="mt-7 grid gap-3">
          {current.choices.map((choice) => {
            const isCorrect = selected && choice.id === current.correctChoiceId;
            const isWrong = selected === choice.id && choice.id !== current.correctChoiceId;

            return (
              <button
                key={choice.id}
                onClick={() => answer(choice.id)}
                className={`rounded-[1.4rem] border p-4 text-left transition ${
                  isCorrect
                    ? "border-[#52f2d0] bg-[#52f2d0]/14"
                    : isWrong
                      ? "border-[#ff7968] bg-[#ff7968]/14"
                      : "border-white/10 bg-white/[0.055] hover:bg-white/[0.09]"
                }`}
              >
                <span className="mr-3 font-black text-[#f6c465]">{choice.id}</span>
                {choice.text}
              </button>
            );
          })}
        </div>

        {selected ? (
          <div className="mt-6 rounded-[1.5rem] bg-[#120b07]/56 p-5">
            <p className="font-black text-[#f6c465]">Açıklama</p>
            <p className="mt-2 leading-7 text-[#ead7b7]/72">{current.explanation}</p>
            <p className="mt-4 text-sm font-bold text-[#52f2d0]">KPSS ipucu: {current.examTip}</p>
            <button onClick={nextQuestion} className="mt-5 rounded-full bg-[#f2c15f] px-5 py-3 font-black text-[#120b07]">
              Sonraki soru
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
