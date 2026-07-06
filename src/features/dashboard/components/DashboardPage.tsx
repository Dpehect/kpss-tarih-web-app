"use client";

import { ArrowRight, BookOpen, CheckCircle2, CreditCard, FileQuestion, Trophy } from "lucide-react";
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
        description="İlerlemen sade, okunaklı ve eyleme dönük biçimde gösterilir. Soru, tekrar, deneme ve konu akışı tek bir profesyonel çalışma masasında birleşir."
        actions={
          <a href="/question-bank" className="btn-gold">
            Teste başla
            <ArrowRight size={18} />
          </a>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Konu" value={`${mounted ? uniqueCompletedTopics : 0}/${topics.length}`} helper="Tamamlanan konu sayısı." />
        <MetricCard label="Soru" value={`${mounted ? answeredQuestions : 0}/${questions.length}`} helper={`Son denemelere göre doğruluk: %${accuracy}`} tone="turquoise" />
        <MetricCard label="Flashcard" value={`${mounted ? reviewedCards : 0}/${flashcards.length}`} helper="En az bir kez tekrar edilen kart." tone="crimson" />
        <MetricCard label="Deneme" value={`${mounted ? completedExams : 0}/${exams.length}`} helper="Bitirilen deneme sayısı." />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-black/[0.08] bg-[#fffaf0]/82 p-6 shadow-[0_24px_80px_rgba(18,24,38,0.08)]">
          <div className="flex items-end justify-between gap-5 border-b border-black/[0.08] pb-5">
            <div>
              <p className="kicker">Haftalık Akış</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em]">Çalışma rotası</h2>
            </div>
            <span className="rounded-full bg-[#111827] px-4 py-2 text-sm font-black text-[#fffaf0]">
              %{Math.max(topicProgress, questionProgress, flashcardProgress, examProgress)}
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            <ProgressRow icon={<BookOpen size={18} />} label="Konu özetleri" value={topicProgress} href="/topics" />
            <ProgressRow icon={<FileQuestion size={18} />} label="Konu testleri" value={questionProgress} href="/question-bank" />
            <ProgressRow icon={<CreditCard size={18} />} label="Flashcard tekrarı" value={flashcardProgress} href="/flashcards" />
            <ProgressRow icon={<Trophy size={18} />} label="Denemeler" value={examProgress} href="/exams" />
          </div>
        </div>

        <div className="dark-surface rounded-[2rem] p-6">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f0bd59]">Önerilen Akış</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.07em]">Bugün üç hamle yeter.</h2>
          <div className="mt-6 space-y-3">
            <ActionLine label="1" title="Bir konu seç" body="Önce konu özetini oku, kritik notları belirle." href="/topics" />
            <ActionLine label="2" title="Konu testine gir" body="Artık testler ayrı sayfalarda; odak kaybı yok." href="/question-bank" />
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
    <a href={href} className="group rounded-[1.35rem] border border-black/[0.08] bg-white/50 p-4 transition hover:-translate-y-0.5 hover:bg-white">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-[#111827] text-[#fffaf0]">{icon}</span>
          <p className="font-black">{label}</p>
        </div>
        <p className="text-2xl font-black tracking-[-0.05em]">%{value}</p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#111827]/10">
        <div className="h-full rounded-full bg-[#111827] transition-all group-hover:bg-[#2447d8]" style={{ width: `${value}%` }} />
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
    <a href={href} className="flex gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-4 transition hover:bg-white/[0.1]">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f0bd59] font-black text-[#111827]">{label}</span>
      <span>
        <span className="block font-black text-[#fffaf0]">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-[#fffaf0]/62">{body}</span>
      </span>
    </a>
  );
}
