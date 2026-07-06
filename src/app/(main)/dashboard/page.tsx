"use client";

import type { ReactNode } from "react";
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
      <section className="bureau-stage relative overflow-hidden rounded-[2.35rem] p-6 md:p-9 xl:p-11">
        <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-center">
          <div>
            <p className="bureau-kicker">Bureau dashboard</p>
            <h1 className="bureau-display mt-5 max-w-5xl text-balance text-5xl text-[var(--bureau-inverse)] md:text-6xl 2xl:text-7xl">
              Bugünkü çalışma dosyanı aç.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--bureau-inverse-copy)] md:text-lg">
              Konu, test, tekrar ve deneme kayıtları aynı masada. Ne çalışacağını tek bakışta seç.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/question-bank" variant="gold" size="lg">
                Test kaydı aç
                <ArrowRight size={19} />
              </ButtonLink>
              <ButtonLink href="/topics" variant="ghost" size="lg">
                Konu dosyaları
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/12 bg-white/[.08] p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--bureau-inverse-muted)]">Genel skor</p>
            <div className="mt-5 grid place-items-center">
              <ProgressRing value={mounted ? averageProgress : 0} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <Metric icon={<BookOpen size={21} />} label="Konu" value={`${mounted ? uniqueCompletedTopics : 0}/${topics.length}`} helper="Tamamlanan başlık" tone="teal" />
        <Metric icon={<FileQuestion size={21} />} label="Soru" value={`${mounted ? answeredQuestions : 0}/${questions.length}`} helper={`Doğruluk: %${accuracy}`} tone="blue" />
        <Metric icon={<CreditCard size={21} />} label="Kart" value={`${mounted ? reviewedCards : 0}/${flashcards.length}`} helper="Tekrar edilen kart" tone="plum" />
        <Metric icon={<Trophy size={21} />} label="Deneme" value={`${mounted ? completedExams : 0}/${exams.length}`} helper="Tamamlanan deneme" tone="rust" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="bureau-card rounded-[2rem] p-6 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="bureau-kicker">Dosya dengesi</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--bureau-ink)]">Modül ilerlemesi</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--bureau-copy)]">Her modül için ilerleme oranını temiz şekilde izle.</p>
            </div>
            <span className="grid size-14 place-items-center rounded-[1.15rem] bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]">
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

        <div className="bureau-card rounded-[2rem] p-6 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="bureau-kicker">Sıradaki kayıt</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--bureau-ink)]">Sonraki hamle</h2>
            </div>
            <Sparkles className="text-[var(--bureau-teal)]" size={26} />
          </div>

          <div className="mt-7 grid gap-3">
            {recommendations.slice(0, 4).map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                whileHover={{ x: 4 }}
                transition={{ duration: .18, ease: "easeOut" }}
                className="group flex items-center justify-between gap-4 rounded-[1.2rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-4 transition hover:bg-[rgba(255,250,242,.96)]"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--bureau-ink)] text-sm font-black text-[var(--bureau-inverse)]">{index + 1}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-black text-[var(--bureau-ink)]">{item.title}</span>
                    <span className="mt-1 block truncate text-sm text-[var(--bureau-copy)]">{item.description}</span>
                  </span>
                </span>
                <ArrowRight size={18} className="shrink-0 text-[var(--bureau-ink)] transition group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ icon, label, value, helper, tone }: { icon: ReactNode; label: string; value: string; helper: string; tone: "blue" | "teal" | "plum" | "rust" }) {
  const tones = {
    blue: "bg-[var(--bureau-blue-soft)] text-[var(--bureau-blue)]",
    teal: "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]",
    plum: "bg-[var(--bureau-plum-soft)] text-[var(--bureau-plum)]",
    rust: "bg-[var(--bureau-rust-soft)] text-[var(--bureau-rust)]"
  };

  return (
    <article className="bureau-card rounded-[1.65rem] p-6">
      <div className={`grid size-12 place-items-center rounded-[1rem] ${tones[tone]}`}>{icon}</div>
      <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-3 text-4xl font-black tracking-[-0.08em] text-[var(--bureau-ink)] md:text-5xl">{value}</p>
      <p className="mt-3 text-sm font-medium leading-6 text-[var(--bureau-copy)]">{helper}</p>
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
        <circle cx="80" cy="80" r={radius} stroke="rgba(255,250,242,.14)" strokeWidth="12" fill="none" />
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
            <stop offset="0%" stopColor="#253f74" />
            <stop offset="58%" stopColor="#047e89" />
            <stop offset="100%" stopColor="#66345f" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-5xl font-black tracking-[-0.08em] text-[var(--bureau-inverse)]">{normalized}%</p>
        <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-[var(--bureau-inverse-muted)]">Güncel</p>
      </div>
    </div>
  );
}

function ProgressLine({ label, value }: { label: string; value: number }) {
  const normalized = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-black">
        <span className="text-[var(--bureau-ink)]">{label}</span>
        <span className="text-[var(--bureau-muted)]">{normalized}%</span>
      </div>
      <div className="progress-track">
        <motion.div className="progress-fill" initial={{ width: "0%" }} whileInView={{ width: `${normalized}%` }} viewport={{ once: true }} transition={{ duration: .72, ease: "easeOut" }} />
      </div>
    </div>
  );
}
