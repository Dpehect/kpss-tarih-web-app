"use client";

import { ArrowRight, BookOpen, CreditCard, FileQuestion, Flame, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
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
    <div className="space-y-7">
      <section className="lab-stage relative overflow-hidden rounded-[2.35rem] p-6 md:p-9 xl:p-11">
        <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-center">
          <div>
            <p className="lab-kicker">Lab dashboard</p>
            <h1 className="lab-display mt-5 max-w-5xl text-balance text-5xl text-[var(--lab-inverse)] md:text-6xl 2xl:text-7xl">
              Bugünkü çalışma deneyini başlat.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--lab-inverse-muted)] md:text-lg">
              Konu, test, tekrar ve deneme sinyalleri aynı masada. Ne çalışacağını tek bakışta seç.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/question-bank" variant="gold" size="lg">
                Teste başla
                <ArrowRight size={19} />
              </ButtonLink>
              <ButtonLink href="/topics" variant="ghost" size="lg">
                Konuları aç
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/12 bg-white/[.08] p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[rgba(255,250,240,.62)]">Genel skor</p>
            <div className="mt-5 grid place-items-center">
              <ProgressRing value={mounted ? averageProgress : 0} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <Metric icon={<BookOpen size={21} />} label="Konu" value={`${mounted ? uniqueCompletedTopics : 0}/${topics.length}`} helper="Tamamlanan başlık" tone="acid" />
        <Metric icon={<FileQuestion size={21} />} label="Soru" value={`${mounted ? answeredQuestions : 0}/${questions.length}`} helper={`Doğruluk: %${accuracy}`} tone="blue" />
        <Metric icon={<CreditCard size={21} />} label="Kart" value={`${mounted ? reviewedCards : 0}/${flashcards.length}`} helper="Tekrar edilen kart" tone="violet" />
        <Metric icon={<Trophy size={21} />} label="Deneme" value={`${mounted ? completedExams : 0}/${exams.length}`} helper="Tamamlanan deneme" tone="cyan" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="lab-card rounded-[2rem] p-6 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="lab-kicker">Rhythm</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--lab-ink)]">Modül dengesi</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--lab-muted)]">Her modül için ilerleme oranını temiz şekilde izle.</p>
            </div>
            <span className="grid size-14 place-items-center rounded-[1.15rem] bg-[rgba(215,255,79,.42)] text-[var(--lab-ink)]">
              <Flame size={24} />
            </span>
          </div>

          <div className="mt-8 grid gap-4">
            <ProgressLine label="Konu" value={topicProgress} />
            <ProgressLine label="Test" value={questionProgress} />
            <ProgressLine label="Tekrar" value={flashcardProgress} />
            <ProgressLine label="Deneme" value={examProgress} />
          </div>
        </div>

        <div className="lab-card rounded-[2rem] p-6 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="lab-kicker">Next action</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--lab-ink)]">Sıradaki hamle</h2>
            </div>
            <Sparkles className="text-[var(--lab-cyan)]" size={26} />
          </div>

          <div className="mt-7 grid gap-3">
            {recommendations.slice(0, 4).map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                whileHover={{ x: 4 }}
                transition={{ duration: .18, ease: "easeOut" }}
                className="group flex items-center justify-between gap-4 rounded-[1.2rem] border border-[var(--lab-line)] bg-[rgba(255,252,245,.70)] p-4 transition hover:bg-[rgba(255,252,245,.95)]"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--lab-ink)] text-sm font-black text-[var(--lab-inverse)]">{index + 1}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-black text-[var(--lab-ink)]">{item.title}</span>
                    <span className="mt-1 block truncate text-sm text-[var(--lab-muted)]">{item.description}</span>
                  </span>
                </span>
                <ArrowRight size={18} className="shrink-0 text-[var(--lab-ink)] transition group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ icon, label, value, helper, tone }: { icon: React.ReactNode; label: string; value: string; helper: string; tone: "acid" | "blue" | "violet" | "cyan" }) {
  const tones = {
    acid: "bg-[rgba(215,255,79,.42)] text-[var(--lab-ink)]",
    blue: "bg-[rgba(43,74,134,.13)] text-[var(--lab-blue)]",
    violet: "bg-[rgba(108,59,209,.13)] text-[var(--lab-violet)]",
    cyan: "bg-[rgba(0,166,180,.14)] text-[var(--lab-cyan)]"
  };

  return (
    <article className="lab-card rounded-[1.65rem] p-6">
      <div className={`grid size-12 place-items-center rounded-[1rem] ${tones[tone]}`}>{icon}</div>
      <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[var(--lab-soft)]">{label}</p>
      <p className="mt-3 text-4xl font-black tracking-[-0.08em] text-[var(--lab-ink)] md:text-5xl">{value}</p>
      <p className="mt-3 text-sm font-medium leading-6 text-[var(--lab-muted)]">{helper}</p>
    </article>
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
        <circle cx="80" cy="80" r={radius} stroke="rgba(255,250,240,.14)" strokeWidth="12" fill="none" />
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
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="dashboard-progress" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#d7ff4f" />
            <stop offset="58%" stopColor="#00a6b4" />
            <stop offset="100%" stopColor="#6c3bd1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-5xl font-black tracking-[-0.08em] text-[var(--lab-inverse)]">{normalized}%</p>
        <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-[rgba(255,250,240,.58)]">Güncel</p>
      </div>
    </div>
  );
}

function ProgressLine({ label, value }: { label: string; value: number }) {
  const normalized = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-black">
        <span className="text-[var(--lab-ink)]">{label}</span>
        <span className="text-[var(--lab-soft)]">{normalized}%</span>
      </div>
      <div className="progress-track">
        <motion.div className="progress-fill" initial={{ width: "0%" }} whileInView={{ width: `${normalized}%` }} viewport={{ once: true }} transition={{ duration: .72, ease: "easeOut" }} />
      </div>
    </div>
  );
}
