"use client";

import { RotateCcw, User } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { exams, flashcards, questions, topics } from "@/data/kpss-history";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function ProfilePage() {
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const reviews = useStudyProgressStore((state) => state.flashcardReviews);
  const examResults = useStudyProgressStore((state) => state.examResults);
  const notes = useStudyProgressStore((state) => state.notes);
  const resetProgress = useStudyProgressStore((state) => state.resetProgress);

  const latestAttempts = Array.from(new Map(attempts.map((attempt) => [attempt.questionId, attempt])).values());
  const correct = latestAttempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = latestAttempts.length ? Math.round((correct / latestAttempts.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Profil"
        title="Çalışma profilin."
        description="Bu ekranda local/online senkronize çalışma istatistiklerinin genel özetini görebilirsin."
      />

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <div className="flex items-center gap-4">
            <span className="grid size-16 place-items-center rounded-[1.5rem] bg-[var(--navy-900)] text-2xl font-black text-[var(--text-inverse)]">
              <User size={28} />
            </span>
            <div>
              <p className="kicker">KPSS Tarih Akademi</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--navy-900)]">Çalışma hesabı</h2>
            </div>
          </div>

          <p className="mt-6 rounded-[1.5rem] border border-[var(--border-soft)] bg-white/72 p-4 text-sm font-semibold leading-7 text-[var(--text-secondary)]">
            Google ile giriş yaptıysan ilerleme Supabase tarafında senkronize edilir. Giriş yapmadan da localStorage üzerinden çalışmaya devam edebilirsin.
          </p>

          <Button variant="ghost" className="mt-5 w-full border-[#9a3412]/20 bg-[#fff0e9] text-[#9a3412]" onClick={resetProgress}>
            <RotateCcw size={18} />
            Tüm ilerlemeyi sıfırla
          </Button>
        </Card>

        <Card>
          <p className="kicker">Özet</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--navy-900)]">İstatistikler</h2>

          <div className="mt-7 grid gap-3 md:grid-cols-2">
            <ProfileMetric label="Konu" value={`${completedTopicIds.length}/${topics.length}`} />
            <ProfileMetric label="Soru" value={`${latestAttempts.length}/${questions.length}`} />
            <ProfileMetric label="Doğruluk" value={`%${accuracy}`} />
            <ProfileMetric label="Flashcard" value={`${new Set(reviews.map((review) => review.cardId)).size}/${flashcards.length}`} />
            <ProfileMetric label="Deneme" value={`${examResults.length}/${exams.length}`} />
            <ProfileMetric label="Not" value={String(notes.length)} />
          </div>
        </Card>
      </section>
    </div>
  );
}

function ProfileMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[var(--border-soft)] bg-white/74 p-4">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.07em] text-[var(--navy-900)]">{value}</p>
    </div>
  );
}
