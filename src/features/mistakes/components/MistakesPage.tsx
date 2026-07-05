"use client";

import { PageHeader } from "@/components/core/PageHeader";
import { questions, getTopicById } from "@/data/kpss-history";
import { useMounted } from "@/hooks/useMounted";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

/**
 * Yanlışlarım sayfası.
 * Kullanıcının hatalarını tek yerde toplar.
 */
export function MistakesPage() {
  const mounted = useMounted();
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const wrongAttempts = attempts.filter((attempt) => !attempt.isCorrect).slice().reverse();

  if (!mounted) {
    return <PageHeader eyebrow="Yanlışlarım" title="Veriler hazırlanıyor." description="Yanlış kayıtları okunuyor." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Yanlışlarım"
        title="Hatalarını tekrar alanına çevir."
        description="Yanlış yaptığın sorular, konu bağlantıları ve açıklamalarıyla birlikte burada listelenir."
      />

      <section className="grid gap-4">
        {wrongAttempts.length === 0 ? (
          <div className="rounded-[2rem] parchment-surface p-6">
            <h2 className="text-2xl font-black">Henüz yanlış kaydı yok.</h2>
            <p className="mt-3 text-[#ead7b7]/66">Soru bankasında test çözmeye başladığında hataların burada görünecek.</p>
          </div>
        ) : wrongAttempts.map((attempt) => {
          const question = questions.find((item) => item.id === attempt.questionId);
          const topic = getTopicById(attempt.topicId);
          if (!question) return null;

          return (
            <article key={attempt.id} className="rounded-[2rem] parchment-surface p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f6c465]">{topic?.title}</p>
              <h2 className="mt-3 text-xl font-black">{question.stem}</h2>
              <p className="mt-4 text-sm text-[#ff7968]">Senin cevabın: {attempt.selectedChoiceId} · Doğru cevap: {attempt.correctChoiceId}</p>
              <p className="mt-4 leading-7 text-[#ead7b7]/70">{question.explanation}</p>
              <p className="mt-3 text-sm font-bold text-[#52f2d0]">İpucu: {question.examTip}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
