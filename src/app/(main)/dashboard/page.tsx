"use client";

import {
  ArrowRight,
  BookOpen,
  CreditCard,
  FileQuestion,
  Flame,
  Sparkles,
  Trophy
} from "lucide-react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { exams, flashcards, questions, recommendations, topics } from "@/data/kpss-history";
import { useMounted } from "@/hooks/useMounted";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export default function DashboardRoute() {
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
  const averageProgress = Math.round((topicProgress + questionProgress + flashcardProgress + examProgress) / 4);

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="page-noise dark-surface relative overflow-hidden rounded-[2.75rem] p-6 md:p-10 xl:p-12"
      >
        <div data-premium-parallax className="absolute right-[-6rem] top-[-7rem] size-80 rounded-full bg-[rgba(76,141,255,0.26)] blur-3xl" />
        <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_330px] xl:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[var(--accent-gold)]">Kontrol Merkezi</p>
            <h1 className="editorial-title mt-5 max-w-4xl text-balance text-5xl text-[#fff8ea] md:text-6xl 2xl:text-7xl">
              Hoş geldin, bugünkü çalışmanı tek ekranda yönet.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              İlerlemen sade, okunaklı ve eyleme dönük biçimde gösterilir. Soru, tekrar, deneme ve konu akışı tek bir profesyonel çalışma masasında birleşir.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/question-bank" variant="gold" size="lg">
                Teste başla
                <ArrowRight size={19} />
              </ButtonLink>
              <ButtonLink href="/topics" variant="ghost" size="lg" className="border-white/15 bg-white/10 text-white hover:bg-white/15">
                Konuları incele
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/48">Genel ilerleme</p>
            <div className="mt-5 grid place-items-center">
              <ProgressRing value={mounted ? averageProgress : 0} />
            </div>
            <p className="mt-5 text-center text-sm leading-6 text-white/62">
              Konu, test, flashcard ve deneme ilerlemesinin ortalaması.
            </p>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <StatsCard icon={<BookOpen size={21} />} label="Konu" value={`${mounted ? uniqueCompletedTopics : 0}/${topics.length}`} helper="Tamamlanan konu sayısı." tone="gold" />
        <StatsCard icon={<FileQuestion size={21} />} label="Soru" value={`${mounted ? answeredQuestions : 0}/${questions.length}`} helper={`Son denemelere göre doğruluk: %${accuracy}`} tone="sky" />
        <StatsCard icon={<CreditCard size={21} />} label="Flashcard" value={`${mounted ? reviewedCards : 0}/${flashcards.length}`} helper="En az bir kez tekrar edilen kart." tone="rose" />
        <StatsCard icon={<Trophy size={21} />} label="Deneme" value={`${mounted ? completedExams : 0}/${exams.length}`} helper="Bitirilen deneme sayısı." tone="mint" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="kicker">Streak Counter</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--foreground)]">Çalışma ritmi</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                Bugünkü akışını kısa ve sürdürülebilir bloklara böl.
              </p>
            </div>
            <span className="grid size-14 place-items-center rounded-2xl bg-[var(--accent-gold-soft)] text-[color-mix(in_srgb,var(--accent-gold),#6b4d10_34%)]">
              <Flame size={24} />
            </span>
          </div>

          <div className="mt-8 grid gap-4">
            <ProgressLine label="Konu" value={topicProgress} />
            <ProgressLine label="Test" value={questionProgress} />
            <ProgressLine label="Tekrar" value={flashcardProgress} />
            <ProgressLine label="Deneme" value={examProgress} />
          </div>
        </Card>

        <Card className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="kicker">Önerilen Konular</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--foreground)]">Sıradaki çalışma akışı</h2>
            </div>
            <Sparkles className="text-[var(--accent-sky)]" size={26} />
          </div>

          <div className="mt-7 grid gap-3">
            {recommendations.slice(0, 4).map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                whileHover={{ x: 4 }}
                className="group flex items-center justify-between gap-4 rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface-subtle)] p-4 transition hover:bg-[var(--surface-strong)]"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--foreground)] text-sm font-black text-[var(--background)]">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-black text-[var(--foreground)]">{item.title}</span>
                    <span className="mt-1 block truncate text-sm text-[var(--muted-foreground)]">{item.description}</span>
                  </span>
                </span>
                <ArrowRight size={18} className="shrink-0 transition group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <QuickAccess href="/topics" title="Konu Özetleri" icon={<BookOpen size={20} />} />
        <QuickAccess href="/question-bank" title="Konu Testleri" icon={<FileQuestion size={20} />} />
        <QuickAccess href="/flashcards" title="Flashcard" icon={<CreditCard size={20} />} />
        <QuickAccess href="/exams" title="Denemeler" icon={<Trophy size={20} />} />
      </section>
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  const normalized = Math.max(0, Math.min(100, value));
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalized / 100) * circumference;

  return (
    <div className="relative grid size-44 place-items-center">
      <svg viewBox="0 0 160 160" className="size-44 -rotate-90">
        <circle cx="80" cy="80" r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth="12" fill="none" />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="url(#dashboard-progress)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="dashboard-progress" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#4c8dff" />
            <stop offset="52%" stopColor="#6ec4aa" />
            <stop offset="100%" stopColor="#d9aa52" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-5xl font-black tracking-[-0.08em] text-white">{normalized}%</p>
        <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-white/42">Güncel</p>
      </div>
    </div>
  );
}

function ProgressLine({ label, value }: { label: string; value: number }) {
  const normalized = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-black">
        <span className="text-[var(--foreground)]">{label}</span>
        <span className="text-[var(--muted-foreground)]">{normalized}%</span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: "0%" }}
          whileInView={{ width: `${normalized}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function QuickAccess({
  href,
  title,
  icon
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4, scale: 1.02 }}
      className="hover-glow rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] backdrop-blur-2xl transition"
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-[var(--foreground)] text-[var(--background)]">
        {icon}
      </span>
      <h3 className="mt-6 text-xl font-black tracking-[-0.05em] text-[var(--foreground)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">Hızlı erişim</p>
    </motion.a>
  );
}
