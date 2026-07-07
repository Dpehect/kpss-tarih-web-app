"use client";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  FileQuestion,
  Trophy
} from "lucide-react";
import { exams, flashcards, topics } from "@/data/kpss-history";
import { expandedQuestions } from "@/data/generated-30-question-tests";
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
  const answeredQuestions = mounted ? latestAttempts.length : 0;
  const correctAnswers = latestAttempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = answeredQuestions ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;
  const reviewedCards = mounted ? new Set(reviews.map((review) => review.cardId)).size : 0;
  const completedExams = mounted ? new Set(examResults.map((result) => result.examId)).size : 0;
  const topicProgress = Math.round((uniqueCompletedTopics / topics.length) * 100);
  const questionProgress = Math.min(100, Math.round((answeredQuestions / expandedQuestions.length) * 100));
  const cardProgress = Math.round((reviewedCards / flashcards.length) * 100);
  const examProgress = Math.round((completedExams / exams.length) * 100);
  const overallProgress = Math.round((topicProgress + questionProgress + cardProgress + examProgress) / 4);
  const nextTopic = topics.find((topic) => !completedTopicIds.includes(topic.id)) ?? topics[0];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[#e4d8c8] bg-white/78 p-6 shadow-[0_28px_100px_rgba(16,24,40,.08)] backdrop-blur-2xl md:p-8">
        <div className="absolute right-[-8rem] top-[-8rem] size-72 rounded-full bg-[#b4232a]/12 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[20%] size-80 rounded-full bg-[#0f766e]/10 blur-3xl" />

        <div className="relative z-10 grid gap-7 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4d8c8] bg-white/86 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">
              <Trophy size={15} />
              {answeredQuestions} soru çözüldü
            </div>

            <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-[-0.08em] text-[#101828] md:text-6xl">
              Hoş geldin. Bugün kısa ve net ilerleyelim.
            </h1>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
              Sıradaki konuyu aç, açıklamalı test çöz ve yanlışlarını aynı panelden takip et. Her şey okunaklı ve tek akışta.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="/question-bank/all?level=kolay"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[#b4232a] px-6 text-sm font-black text-white shadow-[0_20px_70px_rgba(180,35,42,.20)]"
              >
                Teste başla
                <ArrowRight size={17} />
              </a>
              <a
                href="/topics"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-[#e4d8c8] bg-white/86 px-6 text-sm font-black text-[#101828]"
              >
                Konuları gör
                <BookOpen size={17} />
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#101828] p-5 text-white shadow-[0_26px_90px_rgba(16,24,40,.22)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/48">Genel durum</p>
            <p className="mt-3 text-6xl font-black tracking-[-0.08em]">{overallProgress}%</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/64">Konu, soru, kart ve deneme ilerlemesinin birleşik özeti.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={<BookOpen size={21} />} label="Konu" value={`${uniqueCompletedTopics}/${topics.length}`} helper={`${topicProgress}% tamamlandı`} />
        <MetricCard icon={<FileQuestion size={21} />} label="Soru" value={String(answeredQuestions)} helper={`${accuracy}% doğruluk`} />
        <MetricCard icon={<BrainCircuit size={21} />} label="Kart" value={`${reviewedCards}/${flashcards.length}`} helper="Tekrar edilen kart" />
        <MetricCard icon={<CheckCircle2 size={21} />} label="Deneme" value={`${completedExams}/${exams.length}`} helper="Tamamlanan deneme" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-[2.25rem] border border-[#e4d8c8] bg-white/78 p-6 shadow-[0_24px_80px_rgba(16,24,40,.07)] backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Sıradaki konu</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[#101828]">{nextTopic.title}</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{nextTopic.shortDescription}</p>
          <a href={`/topics/${nextTopic.slug}`} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#101828] px-5 text-sm font-black text-white">
            Konuyu aç
            <ArrowRight size={17} />
          </a>
        </div>

        <div className="rounded-[2.25rem] border border-[#e4d8c8] bg-white/78 p-6 shadow-[0_24px_80px_rgba(16,24,40,.07)] backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Çalışma rotası</p>
          <div className="mt-5 space-y-3">
            <ProgressRow icon={<BookOpen size={18} />} label="Konu özetleri" value={topicProgress} href="/topics" />
            <ProgressRow icon={<FileQuestion size={18} />} label="Konu testleri" value={questionProgress} href="/question-bank" />
            <ProgressRow icon={<BrainCircuit size={18} />} label="Flashcard tekrarı" value={cardProgress} href="/flashcards" />
            <ProgressRow icon={<BarChart3 size={18} />} label="Denemeler" value={examProgress} href="/exams" />
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ icon, label, value, helper }: { icon: React.ReactNode; label: string; value: string; helper: string }) {
  return (
    <div className="rounded-[2rem] border border-[#e4d8c8] bg-white/78 p-5 shadow-sm backdrop-blur-xl">
      <span className="grid size-12 place-items-center rounded-2xl bg-[#101828] text-white">{icon}</span>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-[#101828]">{value}</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{helper}</p>
    </div>
  );
}

function ProgressRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: number; href: string }) {
  return (
    <a href={href} className="block rounded-2xl border border-[#eadfce] bg-white/76 p-4 transition hover:bg-white">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-black text-[#101828]">
          {icon}
          {label}
        </span>
        <span className="text-sm font-black text-[#b4232a]">%{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#eee2d4]">
        <div className="h-full rounded-full bg-[#b4232a]" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </a>
  );
}
