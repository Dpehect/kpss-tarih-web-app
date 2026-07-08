"use client";

import { RotateCcw, Trash2, XCircle } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/EmptyState";
import { questions, topics } from "@/data/kpss-history";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function MistakesPage() {
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const latestAttempts = Array.from(new Map(attempts.map((attempt) => [attempt.questionId, attempt])).values());
  const wrongAttempts = latestAttempts.filter((attempt) => !attempt.isCorrect);

  function clearMistakes() {
    useStudyProgressStore.setState((state) => ({
      questionAttempts: state.questionAttempts.filter((attempt) => attempt.isCorrect)
    }));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Yanlışlarım"
        title="Yanlışları tekrar listesine çevir."
        description="Son cevabına göre yanlış kalan sorular burada görünür. İstersen yanlış listesini sıfırlayıp yeniden başlayabilirsin."
        actions={
          wrongAttempts.length > 0 ? (
            <button type="button" onClick={clearMistakes} className="btn-gold">
              <Trash2 size={18} />
              Yanlışları sıfırla
            </button>
          ) : null
        }
      />

      {wrongAttempts.length === 0 ? (
        <EmptyState
          title="Şu an yanlış listen temiz."
          description="Konu testleri çözdükçe yanlış cevapladığın sorular burada tekrar çalışman için birikir."
          href="/question-bank"
          actionLabel="Konu testi çöz"
        />
      ) : (
        <section className="grid gap-4">
          {wrongAttempts.map((attempt, index) => {
            const question = questions.find((item) => item.id === attempt.questionId);
            const topic = topics.find((item) => item.id === attempt.topicId);

            if (!question || !topic) return null;

            const selectedChoice = question.choices.find((choice) => choice.id === attempt.selectedChoiceId);
            const correctChoice = question.choices.find((choice) => choice.id === question.correctChoiceId);

            return (
              <Card key={attempt.id}>
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#9a3412]">
                      Yanlış {index + 1} / {topic.title}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)]">
                      {question.stem}
                    </h2>
                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg border border-[#9a3412]/25 bg-[#fff0e9] p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#9a3412]">Senin cevabın</p>
                        <p className="mt-2 font-semibold text-[var(--ink)]">{attempt.selectedChoiceId}) {selectedChoice?.text}</p>
                      </div>
                      <div className="rounded-lg border border-[#047857]/25 bg-[#dff8ef] p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#047857]">Doğru cevap</p>
                        <p className="mt-2 font-semibold text-[var(--ink)]">{question.correctChoiceId}) {correctChoice?.text}</p>
                      </div>
                    </div>
                    <p className="mt-5 rounded-lg border border-[var(--border-soft)] bg-white/74 p-4 leading-7 text-[var(--graphite)]">
                      {question.explanation}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <a href={`/topics/${topic.slug}`} className="btn-ghost">
                      Konuya dön
                    </a>
                    <a href={`/question-bank?topic=${topic.id}`} className="btn-primary">
                      <RotateCcw size={18} />
                      Tekrar çöz
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </section>
      )}

      <section className="rounded-xl border border-[var(--border-soft)] bg-[rgba(255,248,234,.82)] p-5 text-[var(--ink)] shadow-[var(--shadow-xs)]">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-[var(--burgundy-soft)] text-[#9a3412]">
            <XCircle size={18} />
          </span>
          <p className="font-semibold">Yanlış sıfırlama sadece yanlış kayıtlarını temizler; konu, flashcard, deneme ve not ilerlemen korunur.</p>
        </div>
      </section>
    </div>
  );
}
