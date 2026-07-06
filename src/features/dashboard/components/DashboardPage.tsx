"use client";

import { ArrowRight, BookOpen, CreditCard, FileQuestion, Trophy } from "lucide-react";
import { MetricCard } from "@/components/common/MetricCard";
import { PageHeader } from "@/components/core/PageHeader";
import { exams, flashcards, questions, topics } from "@/data/kpss-history";
import { useMounted } from "@/hooks/useMounted";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function DashboardPage() {
  const mounted = useMounted();
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const reviews = useStudyProgressStore((state) => state.flashcardReviews);
  const examResults = useStudyProgressStore((state) => state.examResults);

  const uniqueCompletedTopics = new Set(completedTopicIds).size;
  const latestAttempts = Array.from(new Map(attempts.map((attempt) => [attempt.questionId, attempt])).values());
  const answeredQuestions = latestAttempts.length;
  const correctAnswers = latestAttempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = answeredQuestions ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;
  const reviewedCards = new Set(reviews.map((review) => review.cardId)).size;
  const completedExams = new Set(examResults.map((result) => result.examId)).size;

  const topicProgress = Math.round((uniqueCompletedTopics / topics.length) * 100);
  const questionProgress = Math.round((answeredQuestions / questions.length) * 100);
  const flashcardProgress = Math.round((reviewedCards / flashcards.length) * 100);
  const examProgress = Math.round((completedExams / exams.length) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Kontrol Merkezi"
        title="Bugünkü çalışmanı tek ekranda yönet."
        description="İlerlemen sade ve okunaklı biçimde gösterilir. Soru, tekrar, deneme ve konu akışını buradan takip et."
        actions={
          <a href="/question-bank" className="btn-accent px-4 py-2 text-[13px]">
            Teste başla
            <ArrowRight size={15} />
          </a>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Konu" value={`${mounted ? uniqueCompletedTopics : 0}/${topics.length}`} helper="Tamamlanan konu sayısı." />
        <MetricCard label="Soru" value={`${mounted ? answeredQuestions : 0}/${questions.length}`} helper={`Doğruluk: %${accuracy}`} tone="turquoise" />
        <MetricCard label="Flashcard" value={`${mounted ? reviewedCards : 0}/${flashcards.length}`} helper="En az bir kez tekrar edilen kart." tone="crimson" />
        <MetricCard label="Deneme" value={`${mounted ? completedExams : 0}/${exams.length}`} helper="Bitirilen deneme sayısı." />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--warm-white)] p-6 shadow-[var(--shadow-xs)]">
          <div className="flex items-end justify-between gap-5 border-b border-[var(--border)] pb-5">
            <div>
              <p className="kicker">Haftalık Akış</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Çalışma rotası</h2>
            </div>
            <span className="rounded-lg bg-[var(--ink)] px-3 py-1.5 text-xs font-medium text-white">
              %{Math.max(topicProgress, questionProgress, flashcardProgress, examProgress)}
            </span>
          </div>

          <div className="mt-5 grid gap-3">
            <ProgressRow icon={<BookOpen size={16} />} label="Konu özetleri" value={topicProgress} href="/topics" />
            <ProgressRow icon={<FileQuestion size={16} />} label="Konu testleri" value={questionProgress} href="/question-bank" />
            <ProgressRow icon={<CreditCard size={16} />} label="Flashcard tekrarı" value={flashcardProgress} href="/flashcards" />
            <ProgressRow icon={<Trophy size={16} />} label="Denemeler" value={examProgress} href="/exams" />
          </div>
        </div>

        <div className="rounded-xl bg-[var(--ink)] p-6 shadow-[var(--shadow-lg)]">
          <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-[var(--sage)]">Önerilen Akış</p>
          <h2 className="mt-2 text-xl font-bold text-white">Bugün üç hamle yeter.</h2>
          <div className="mt-5 space-y-3">
            <ActionLine label="1" title="Bir konu seç" body="Önce konu özetini oku, kritik notları belirle." href="/topics" />
            <ActionLine label="2" title="Konu testine gir" body="Konuya özel test çözerek bilgini pekiştir." href="/question-bank" />
            <ActionLine label="3" title="Yanlışlarını temizle" body="Son yanlışları açıklamayla tekrar et." href="/mistakes" />
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgressRow({
  icon,
  label,
  value,
  href
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <a href={href} className="group rounded-xl border border-[var(--border)] bg-[var(--stone)] p-4 transition-colors hover:bg-[var(--cream)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg bg-[var(--ink)] text-white">{icon}</span>
          <p className="text-sm font-medium text-[var(--ink)]">{label}</p>
        </div>
        <p className="text-lg font-bold tracking-tight text-[var(--ink)]">%{value}</p>
      </div>
      <div className="progress-track mt-3">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </a>
  );
}

function ActionLine({
  label,
  title,
  body,
  href
}: {
  label: string;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <a href={href} className="flex gap-3.5 rounded-xl border border-white/8 bg-white/[.05] p-4 transition-colors hover:bg-white/[.08]">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--sage)] text-sm font-semibold text-white">{label}</span>
      <span>
        <span className="block text-sm font-semibold text-white">{title}</span>
        <span className="mt-0.5 block text-[13px] leading-relaxed text-white/55">{body}</span>
      </span>
    </a>
  );
}
