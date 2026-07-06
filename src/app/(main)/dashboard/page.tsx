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
      <section className="atlas-dark relative overflow-hidden rounded-[2.35rem] p-6 md:p-9 xl:p-11">
        <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-center">
          <div>
            <p className="kicker">Çalışma masası</p>
            <h1 className="heading-display mt-5 max-w-5xl text-balance text-5xl text-[var(--text-inverse)] md:text-6xl 2xl:text-7xl">
              Bugünkü rotanı tek bakışta yönet.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--text-inverse-muted)] md:text-lg">
              Konu, test, tekrar ve deneme ilerlemesi tek masada. Gereksiz gösterge yok; karar vermek için yeterli veri var.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/question-bank" variant="gold" size="lg">
                Teste başla
                <ArrowRight size={19} />
              </ButtonLink>
              <ButtonLink href="/topics" variant="ghost" size="lg">
                Konuları incele
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/12 bg-white/[.08] p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[rgba(255,248,234,.62)]">Genel ilerleme</p>
            <div className="mt-5 grid place-items-center">
              <ProgressRing value={mounted ? averageProgress : 0} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <Metric icon={<BookOpen size={21} />} label="Konu" value={`${mounted ? uniqueCompletedTopics : 0}/${topics.length}`} helper="Tamamlanan başlık" tone="copper" />
        <Metric icon={<FileQuestion size={21} />} label="Soru" value={`${mounted ? answeredQuestions : 0}/${questions.length}`} helper={`Doğruluk: %${accuracy}`} tone="blue" />
        <Metric icon={<CreditCard size={21} />} label="Kart" value={`${mounted ? reviewedCards : 0}/${flashcards.length}`} helper="Tekrar edilen kart" tone="wine" />
        <Metric icon={<Trophy size={21} />} label="Deneme" value={`${mounted ? completedExams : 0}/${exams.length}`} helper="Tamamlanan deneme" tone="teal" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="atlas-card rounded-[2rem] p-6 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="kicker">Study rhythm</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--atlas-ink)]">Çalışma dengesi</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">Her modül için ilerleme oranını sade şekilde izle.</p>
            </div>
            <span className="grid size-14 place-items-center rounded-[1.15rem] bg-[var(--atlas-copper-soft)] text-[var(--atlas-copper)]">
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

        <div className="atlas-card rounded-[2rem] p-6 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="kicker">Next best action</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--atlas-ink)]">Sıradaki en mantıklı adım</h2>
            </div>
            <Sparkles className="text-[var(--atlas-blue)]" size={26} />
          </div>

          <div className="mt-7 grid gap-3">
            {recommendations.slice(0, 4).map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                whileHover={{ x: 4 }}
                transition={{ duration: .18, ease: "easeOut" }}
                className="group flex items-center justify-between gap-4 rounded-[1.2rem] border border-[var(--border-soft)] bg-[rgba(255,250,240,.70)] p-4 transition hover:bg-[rgba(255,250,240,.95)]"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--atlas-ink)] text-sm font-black text-[var(--text-inverse)]">{index + 1}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-black text-[var(--atlas-ink)]">{item.title}</span>
                    <span className="mt-1 block truncate text-sm text-[var(--text-secondary)]">{item.description}</span>
                  </span>
                </span>
                <ArrowRight size={18} className="shrink-0 text-[var(--atlas-ink)] transition group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ icon, label, value, helper, tone }: { icon: React.ReactNode; label: string; value: string; helper: string; tone: "copper" | "blue" | "wine" | "teal" }) {
  const tones = {
    copper: "bg-[var(--atlas-copper-soft)] text-[var(--atlas-copper)]",
    blue: "bg-[var(--atlas-blue-soft)] text-[var(--atlas-blue)]",
    wine: "bg-[var(--atlas-wine-soft)] text-[var(--atlas-wine)]",
    teal: "bg-[var(--atlas-teal-soft)] text-[var(--atlas-teal)]"
  };

  return (
    <article className="atlas-card rounded-[1.65rem] p-6">
      <div className={`grid size-12 place-items-center rounded-[1rem] ${tones[tone]}`}>{icon}</div>
      <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[var(--atlas-muted)]">{label}</p>
      <p className="mt-3 text-4xl font-black tracking-[-0.08em] text-[var(--atlas-ink)] md:text-5xl">{value}</p>
      <p className="mt-3 text-sm font-medium leading-6 text-[var(--text-secondary)]">{helper}</p>
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
        <circle cx="80" cy="80" r={radius} stroke="rgba(255,248,234,.14)" strokeWidth="12" fill="none" />
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
            <stop offset="0%" stopColor="#243f73" />
            <stop offset="58%" stopColor="#138184" />
            <stop offset="100%" stopColor="#dba34a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-5xl font-black tracking-[-0.08em] text-[var(--text-inverse)]">{normalized}%</p>
        <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-[rgba(255,248,234,.58)]">Güncel</p>
      </div>
    </div>
  );
}

function ProgressLine({ label, value }: { label: string; value: number }) {
  const normalized = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-black">
        <span className="text-[var(--atlas-ink)]">{label}</span>
        <span className="text-[var(--atlas-muted)]">{normalized}%</span>
      </div>
      <div className="progress-track">
        <motion.div className="progress-fill" initial={{ width: "0%" }} whileInView={{ width: `${normalized}%` }} viewport={{ once: true }} transition={{ duration: .72, ease: "easeOut" }} />
      </div>
    </div>
  );
}
