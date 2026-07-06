"use client";

import { ArrowRight, BookOpen, CreditCard, FileQuestion, Flame, MoreHorizontal, RefreshCw, Trophy } from "lucide-react";
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
  const latestAttempts = Array.from(new Map(attempts.map((a) => [a.questionId, a])).values());
  const answeredQuestions = latestAttempts.length;
  const correctAnswers = latestAttempts.filter((a) => a.isCorrect).length;
  const accuracy = answeredQuestions ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;
  const reviewedCards = new Set(reviews.map((r) => r.cardId)).size;
  const completedExams = new Set(examResults.map((r) => r.examId)).size;

  const overallProgress = Math.round(
    ((uniqueCompletedTopics / topics.length) * 25 +
      (answeredQuestions / questions.length) * 25 +
      (reviewedCards / flashcards.length) * 25 +
      (completedExams / exams.length) * 25)
  );

  const topicProgress = Math.round((uniqueCompletedTopics / topics.length) * 100);

  // Pick a featured topic (first incomplete or first)
  const featuredTopic = topics.find((t) => !completedTopicIds.includes(t.id)) ?? topics[0];

  return (
    <div className="space-y-5">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden rounded-2xl bg-[#1a1a1a]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-steppe.png"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8 lg:p-10">
          <div className="max-w-lg">
            <a
              href="/study-plan"
              className="inline-flex items-center gap-2 rounded-full border border-[#c8a44e]/30 bg-[#c8a44e]/10 px-3.5 py-1.5 text-xs font-medium text-[#c8a44e] transition hover:bg-[#c8a44e]/20"
            >
              <Flame size={13} />
              <span>{mounted ? answeredQuestions : 0} soru çözüldü</span>
              <ArrowRight size={12} />
            </a>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Hoş geldin!
            </h1>
            <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">
              Bozkırın kadim ruhu ve kut anlayışı bugün seninle.
              Hadi tarihi yolculuğuna devam edelim.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href="/question-bank"
                className="inline-flex items-center gap-2 rounded-lg bg-[#c8a44e] px-4 py-2.5 text-[13px] font-medium text-[#1a1a1a] shadow-lg shadow-[#c8a44e]/20 transition hover:bg-[#d4b058]"
              >
                Teste başla
                <ArrowRight size={14} />
              </a>
              <a
                href="/topics"
                className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-4 py-2.5 text-[13px] font-medium text-white/80 transition hover:bg-white/10"
              >
                Konuları gör
              </a>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg width="160" height="160" viewBox="0 0 160 160" className="drop-shadow-2xl">
                <circle
                  cx="80" cy="80" r="68"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="10"
                />
                <circle
                  cx="80" cy="80" r="68"
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 68}`}
                  strokeDashoffset={`${2 * Math.PI * 68 * (1 - (mounted ? overallProgress : 0) / 100)}`}
                  transform="rotate(-90 80 80)"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{mounted ? overallProgress : 0}%</span>
                <span className="text-[11px] text-white/40">genel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat Cards ── */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Genel İlerleme"
          value={`${mounted ? overallProgress : 0}%`}
          helper="Hedef: %85"
          ringValue={mounted ? overallProgress : 0}
          ringColor="#22c55e"
        />
        <StatCard
          label="Doğruluk"
          value={`%${mounted ? accuracy : 0}`}
          helper={`${mounted ? correctAnswers : 0} doğru`}
          ringValue={mounted ? accuracy : 0}
          ringColor="#c8a44e"
        />
        <StatCard
          label="Tamamlanan Konu"
          value={`${mounted ? uniqueCompletedTopics : 0}/${topics.length}`}
          helper={`%${topicProgress} tamamlandı`}
        />
        <StatCard
          label="Çözülen Soru"
          value={`${mounted ? answeredQuestions : 0}`}
          helper={`${questions.length} soruda`}
        />
      </section>

      {/* ── Featured Topic + Quick Actions ── */}
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Featured Topic */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a]">
          <img
            src="/images/featured-topic.png"
            alt={featuredTopic?.title ?? "Öne çıkan konu"}
            className="h-64 w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-70 lg:h-72"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#c8a44e]">Öne Çıkan Konu</p>
                <h2 className="mt-2 text-xl font-bold text-white md:text-2xl">{featuredTopic?.title ?? "Konu"}</h2>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/55">
                  {featuredTopic?.shortDescription ?? ""}
                </p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button className="grid size-9 place-items-center rounded-lg border border-white/10 text-white/50 transition hover:bg-white/10 hover:text-white" aria-label="Yenile">
                  <RefreshCw size={15} />
                </button>
                <button className="grid size-9 place-items-center rounded-lg border border-white/10 text-white/50 transition hover:bg-white/10 hover:text-white" aria-label="Daha fazla">
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>
            <a
              href={featuredTopic ? `/topics/${featuredTopic.slug}` : "/topics"}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#c8a44e] px-4 py-2 text-[13px] font-medium text-[#1a1a1a] transition hover:bg-[#d4b058]"
            >
              Konuyu incele
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-[#1a1a1a] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#c8a44e]">Hızlı Aksiyon</p>
          <h2 className="mt-1.5 text-lg font-bold text-white">Bugün ne çalışmak istersin?</h2>

          <div className="mt-5 space-y-2.5">
            <ActionCard
              icon={<BookOpen size={18} />}
              title="Konuları çalış"
              desc="Konu özetlerini oku ve pekiştir."
              href="/topics"
              accent="#22c55e"
            />
            <ActionCard
              icon={<FileQuestion size={18} />}
              title="Test çöz"
              desc="Konu testleriyle bilgini sına."
              href="/question-bank"
              accent="#3b82f6"
            />
            <ActionCard
              icon={<CreditCard size={18} />}
              title="Flashcard tekrarı"
              desc="Hızlı kartlarla hafıza tazele."
              href="/flashcards"
              accent="#c8a44e"
            />
            <ActionCard
              icon={<Trophy size={18} />}
              title="Deneme sınavı"
              desc="Gerçek sınav formatında pratik yap."
              href="/exams"
              accent="#a855f7"
            />
          </div>
        </div>
      </section>

      {/* ── Progress Overview ── */}
      <section className="rounded-2xl bg-[#1a1a1a] p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#c8a44e]">Haftalık Akış</p>
            <h2 className="mt-1 text-lg font-bold text-white">Çalışma rotası</h2>
          </div>
          <span className="rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/70">
            %{Math.max(
              Math.round((uniqueCompletedTopics / topics.length) * 100),
              Math.round((answeredQuestions / questions.length) * 100),
              Math.round((reviewedCards / flashcards.length) * 100),
              Math.round((completedExams / exams.length) * 100)
            )}
          </span>
        </div>

        <div className="mt-4 grid gap-2.5">
          <ProgressRow icon={<BookOpen size={15} />} label="Konu özetleri" value={Math.round((uniqueCompletedTopics / topics.length) * 100)} href="/topics" color="#22c55e" />
          <ProgressRow icon={<FileQuestion size={15} />} label="Konu testleri" value={Math.round((answeredQuestions / questions.length) * 100)} href="/question-bank" color="#3b82f6" />
          <ProgressRow icon={<CreditCard size={15} />} label="Flashcard tekrarı" value={Math.round((reviewedCards / flashcards.length) * 100)} href="/flashcards" color="#c8a44e" />
          <ProgressRow icon={<Trophy size={15} />} label="Denemeler" value={Math.round((completedExams / exams.length) * 100)} href="/exams" color="#a855f7" />
        </div>
      </section>
    </div>
  );
}

/* ── Stat Card with optional mini ring ── */
function StatCard({
  label,
  value,
  helper,
  ringValue,
  ringColor
}: {
  label: string;
  value: string;
  helper: string;
  ringValue?: number;
  ringColor?: string;
}) {
  return (
    <div className="rounded-xl border border-white/6 bg-[#1a1a1a] p-4 transition hover:border-white/12">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium uppercase tracking-wider text-white/40">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-white">{value}</p>
          <p className="mt-1 text-xs text-white/35">{helper}</p>
        </div>
        {ringValue !== undefined && ringColor && (
          <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0">
            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <circle
              cx="22" cy="22" r="18"
              fill="none"
              stroke={ringColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 18}`}
              strokeDashoffset={`${2 * Math.PI * 18 * (1 - ringValue / 100)}`}
              transform="rotate(-90 22 22)"
              className="transition-all duration-700"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

/* ── Action Card ── */
function ActionCard({
  icon,
  title,
  desc,
  href,
  accent
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  accent: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3.5 rounded-xl border border-white/6 bg-white/[.03] p-3.5 transition hover:border-white/12 hover:bg-white/[.06]"
    >
      <span
        className="grid size-10 shrink-0 place-items-center rounded-lg text-white"
        style={{ backgroundColor: `${accent}20`, color: accent }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-0.5 truncate text-xs text-white/40">{desc}</p>
      </div>
      <ArrowRight size={14} className="shrink-0 text-white/20 transition group-hover:translate-x-0.5 group-hover:text-white/50" />
    </a>
  );
}

/* ── Progress Row ── */
function ProgressRow({
  icon,
  label,
  value,
  href,
  color
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  href: string;
  color: string;
}) {
  return (
    <a href={href} className="group flex items-center gap-3.5 rounded-xl border border-white/6 bg-white/[.02] p-3.5 transition hover:border-white/12 hover:bg-white/[.05]">
      <span
        className="grid size-9 shrink-0 place-items-center rounded-lg"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-white/80">{label}</p>
          <p className="text-sm font-bold text-white">%{value}</p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${value}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </a>
  );
}
