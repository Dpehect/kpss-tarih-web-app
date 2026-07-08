"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Flame,
  Layers3,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StreakCounter } from "@/components/ui/StreakCounter";
import { exams, flashcards, topics } from "@/data/kpss-history";
import { expandedQuestions } from "@/data/generated-30-question-tests";
import { useMounted } from "@/hooks/useMounted";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";
import { MetricCard } from "./MetricCard";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] as any } },
};

export function DashboardPage() {
  const mounted = useMounted();
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const reviews = useStudyProgressStore((state) => state.flashcardReviews);
  const examResults = useStudyProgressStore((state) => state.examResults);

  const uniqueCompletedTopics = mounted ? new Set(completedTopicIds).size : 0;
  const latestAttempts = mounted ? Array.from(new Map(attempts.map((attempt) => [attempt.questionId, attempt])).values()) : [];
  const answeredQuestions = latestAttempts.length;
  const correctAnswers = latestAttempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = answeredQuestions ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;
  const reviewedCards = mounted ? new Set(reviews.map((review) => review.cardId)).size : 0;
  const completedExams = mounted ? new Set(examResults.map((result) => result.examId)).size : 0;

  const topicTotal = Math.max(topics.length, 1);
  const questionTotal = Math.max(expandedQuestions.length, 180);
  const flashcardTotal = Math.max(flashcards.length, 72);
  const examTotal = Math.max(exams.length, 12);

  const topicProgress = percent(uniqueCompletedTopics, topicTotal);
  const questionProgress = percent(answeredQuestions, questionTotal);
  const cardProgress = percent(reviewedCards, flashcardTotal);
  const examProgress = percent(completedExams, examTotal);
  const overallProgress = Math.round((topicProgress + questionProgress + cardProgress + examProgress) / 4);
  const streak = Math.max(1, Math.min(21, uniqueCompletedTopics + Math.floor(answeredQuestions / 12) + 4));
  const nextTopic = topics.find((topic) => !completedTopicIds.includes(topic.id)) ?? topics[0];
  const continueTopics = topics.slice(0, 3).map((topic, index) => ({
    ...topic,
    progress: topic.id === nextTopic?.id ? Math.max(18, topicProgress) : Math.min(92, 26 + index * 18 + (completedTopicIds.includes(topic.id) ? 36 : 0)),
  }));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.section variants={item} className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,.8fr)]">
        <PremiumCard tone="dark" className="min-h-[320px] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 size-80 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-black text-white ring-1 ring-white/10">
                <Sparkles size={15} /> Premium çalışma alanı
              </span>
              <StreakCounter value={streak} className="border-white/10 bg-white/10 text-amber-200" />
            </div>
            <div className="max-w-3xl">
              <p className="kicker !text-amber-300">Bugünkü hedef</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Hoş geldin. KPSS Tarih’i daha net, daha ölçülebilir çalışalım.
              </h1>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/76 sm:text-lg">
                Önce kısa konu özeti, ardından açıklamalı test, sonra zayıf alan analizi. Her oturum seni bir sonraki doğru adıma taşır.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={nextTopic ? `/topics/${nextTopic.slug}` : "/topics"} className="btn-accent">
                Devam et <ArrowRight size={17} />
              </Link>
              <Link href="/question-bank" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/10 px-5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-white/15">
                Teste geç <ClipboardList size={17} />
              </Link>
            </div>
          </div>
        </PremiumCard>

        <PremiumCard className="p-6 sm:p-7" tone="elevated">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="kicker">Genel ilerleme</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-[var(--sb-text)]">%{overallProgress}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--sb-text-soft)]">Konu, soru, kart ve deneme ilerlemesinin birleşik özeti.</p>
            </div>
            <div className="grid size-14 place-items-center rounded-3xl bg-blue-700/10 text-[var(--sb-primary)]">
              <Target size={24} />
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <ProgressPill label="Konu hakimiyeti" value={topicProgress} />
            <ProgressPill label="Soru çözümü" value={questionProgress} />
            <ProgressPill label="Aktif tekrar" value={cardProgress} />
            <ProgressPill label="Deneme disiplini" value={examProgress} />
          </div>
        </PremiumCard>
      </motion.section>

      <motion.section variants={item} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={BookOpen} label="Tamamlanan konu" value={`${uniqueCompletedTopics}/${topics.length}`} helper="Konu anlatımı ve özet akışı" progress={topicProgress} trendLabel="planlı" />
        <MetricCard icon={CheckCircle2} label="Soru performansı" value={String(answeredQuestions)} helper={`${accuracy}% doğruluk ile ilerliyorsun`} progress={questionProgress} trendLabel="ölçüldü" />
        <MetricCard icon={Layers3} label="Flashcard tekrar" value={`${reviewedCards}/${flashcardTotal}`} helper="Aktif hatırlama oturumları" progress={cardProgress} trendLabel="SRS" />
        <MetricCard icon={Trophy} label="Deneme" value={`${completedExams}/${examTotal}`} helper="Süreli sınav provası" progress={examProgress} trendLabel="hedef" />
      </motion.section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,.8fr)]">
        <motion.div variants={item} className="space-y-4">
          <SectionHeader eyebrow="Devam et" title="Kaldığın yerden akıllı rota" description="Sistem, konu → test → analiz akışını tek ekranda tutar." />
          <div className="grid gap-4 md:grid-cols-3">
            {continueTopics.length > 0 ? (
              continueTopics.map((topic, index) => (
                <PremiumCard key={topic.id} interactive className="flex min-h-[230px] flex-col justify-between p-5">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-700/10 px-2.5 py-1 text-[11px] font-black text-[var(--sb-primary)]">{index === 0 ? "Sıradaki" : "Önerilen"}</span>
                    <h3 className="mt-4 text-xl font-black tracking-tight text-[var(--sb-text)]">{topic.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[var(--sb-text-soft)]">{topic.shortDescription}</p>
                  </div>
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs font-black text-[var(--sb-text-muted)]">
                      <span>İlerleme</span>
                      <span>%{topic.progress}</span>
                    </div>
                    <div className="progress-track"><div className="progress-fill" style={{ width: `${topic.progress}%` }} /></div>
                    <Link href={`/topics/${topic.slug}`} className="btn-ghost mt-4 w-full justify-center">
                      Konuyu aç <ArrowRight size={16} />
                    </Link>
                  </div>
                </PremiumCard>
              ))
            ) : (
              <EmptyState title="Konu verisi bekleniyor" description="İçerik yüklendiğinde burada sıradaki çalışma önerileri görünecek." href="/topics" actionLabel="Konuları gör" />
            )}
          </div>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <SectionHeader eyebrow="AI önerileri" title="Eksik kapatma planı" description="Zayıf alanları hızlıca toparlamak için kısa aksiyonlar." />
          <PremiumCard className="space-y-4 p-5" tone="elevated">
            <Recommendation icon={BrainCircuit} title="Önce konu kavramlarını sabitle" description={nextTopic ? `${nextTopic.title} için 15 dakikalık özet + 10 flashcard önerilir.` : "Kısa konu özetiyle başla."} href={nextTopic ? `/topics/${nextTopic.slug}` : "/topics"} />
            <Recommendation icon={ClipboardList} title="Açıklamalı test çöz" description="Cevap anahtarından önce gerekçeyi oku; yanlışları deftere düşür." href="/question-bank" />
            <Recommendation icon={BarChart3} title="Analiz raporunu kontrol et" description="Doğruluk oranı ve tekrar ihtiyacı tek panelde görünür." href="/analytics" />
          </PremiumCard>
        </motion.div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
        <motion.div variants={item}>
          <PremiumCard className="p-5 sm:p-6">
            <SectionHeader eyebrow="Çalışma ısı haritası" title="Son 28 gün" description="Küçük ama düzenli ilerleme, KPSS Tarih’te kalıcılığı artırır." />
            <StudyHeatmap seed={answeredQuestions + reviewedCards + completedExams} />
          </PremiumCard>
        </motion.div>
        <motion.div variants={item}>
          <PremiumCard className="p-5 sm:p-6">
            <SectionHeader eyebrow="Rozet önizlemesi" title="Motivasyon panosu" description="Tamamladıkça açılacak başarılar." />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <BadgePreview icon={Flame} title="7 Gün Seri" state={streak >= 7 ? "Açıldı" : "Yakında"} />
              <BadgePreview icon={BookOpen} title="Konu Ustası" state={uniqueCompletedTopics >= 3 ? "Açıldı" : "Yakında"} />
              <BadgePreview icon={Trophy} title="Deneme Disiplini" state={completedExams >= 2 ? "Açıldı" : "Yakında"} />
            </div>
          </PremiumCard>
        </motion.div>
      </section>
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="kicker">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--sb-text)]">{title}</h2>
      <p className="mt-1 text-sm font-semibold leading-6 text-[var(--sb-text-soft)]">{description}</p>
    </div>
  );
}

function ProgressPill({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-black text-[var(--sb-text)]">
        <span>{label}</span>
        <span>%{value}</span>
      </div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function Recommendation({ icon: Icon, title, description, href }: { icon: typeof BrainCircuit; title: string; description: string; href: string }) {
  return (
    <Link href={href as any} className="group flex items-start gap-4 rounded-3xl border border-[var(--sb-line)] bg-[var(--sb-surface-muted)] p-4 transition hover:-translate-y-0.5 hover:border-blue-700/20 hover:bg-blue-700/5">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-700/10 text-[var(--sb-primary)]"><Icon size={20} /></span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black text-[var(--sb-text)]">{title}</span>
        <span className="mt-1 block text-sm font-semibold leading-6 text-[var(--sb-text-soft)]">{description}</span>
      </span>
      <ArrowRight size={17} className="mt-3 text-[var(--sb-text-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--sb-primary)]" />
    </Link>
  );
}

function StudyHeatmap({ seed }: { seed: number }) {
  const days = Array.from({ length: 28 }, (_, index) => {
    const value = (seed + index * 7) % 5;
    return value;
  });
  return (
    <div className="mt-5 grid grid-cols-7 gap-2" aria-label="Son 28 gün çalışma yoğunluğu">
      {days.map((value, index) => (
        <span
          key={index}
          title={`${index + 1}. gün yoğunluk: ${value}`}
          className="aspect-square rounded-xl border border-[var(--sb-line)]"
          style={{ background: value === 0 ? "var(--sb-surface-muted)" : `rgba(30, 58, 138, ${0.14 + value * 0.14})` }}
        />
      ))}
    </div>
  );
}

function BadgePreview({ icon: Icon, title, state }: { icon: typeof Trophy; title: string; state: string }) {
  return (
    <div className="rounded-3xl border border-[var(--sb-line)] bg-[var(--sb-surface-muted)] p-4">
      <div className="grid size-12 place-items-center rounded-2xl bg-amber-500/12 text-amber-700 dark:text-amber-300"><Icon size={22} /></div>
      <p className="mt-4 text-sm font-black text-[var(--sb-text)]">{title}</p>
      <p className="mt-1 text-xs font-bold text-[var(--sb-text-muted)]">{state}</p>
    </div>
  );
}

function percent(value: number, total: number) {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((value / total) * 100)));
}
