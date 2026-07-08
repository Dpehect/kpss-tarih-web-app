"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle2, Clock, FileQuestion, Search, Sparkles, Target } from "lucide-react";
import { questions, topics } from "@/data/kpss-history";
import { getTestCountsForTopic } from "@/data/generated-30-question-tests";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";
import { useMounted } from "@/hooks/useMounted";
import type { HistoryEra, Topic } from "@/types/study";

const ERA_FILTERS: Array<{ key: "all" | HistoryEra; label: string; helper: string }> = [
  { key: "all", label: "Tüm Konular", helper: "12 başlık" },
  { key: "islamiyet-oncesi", label: "İslamiyet Öncesi", helper: "Bozkır" },
  { key: "turk-islam", label: "Türk-İslam", helper: "Selçuklu" },
  { key: "osmanli", label: "Osmanlı", helper: "Klasik sistem" },
  { key: "yenilesme", label: "Yenileşme", helper: "Islahat" },
  { key: "milli-mucadele", label: "Millî Mücadele", helper: "Bağımsızlık" },
  { key: "cumhuriyet", label: "Cumhuriyet", helper: "İnkılap" },
  { key: "cagdas", label: "Çağdaş", helper: "Dış politika" },
];

const ERA_META: Record<HistoryEra, { label: string; tone: string; accent: string }> = {
  "islamiyet-oncesi": { label: "Bozkır Dönemi", tone: "bg-[rgba(158,63,63,.10)] text-[var(--bureau-rust)]", accent: "var(--bureau-rust)" },
  "turk-islam": { label: "Türk-İslam Sentezi", tone: "bg-[rgba(4,126,137,.11)] text-[var(--bureau-teal)]", accent: "var(--bureau-teal)" },
  osmanli: { label: "Osmanlı Sistemi", tone: "bg-[rgba(37,63,116,.11)] text-[var(--bureau-blue)]", accent: "var(--bureau-blue)" },
  yenilesme: { label: "Modernleşme", tone: "bg-[rgba(102,52,95,.11)] text-[var(--bureau-plum)]", accent: "var(--bureau-plum)" },
  "milli-mucadele": { label: "Millî Mücadele", tone: "bg-[rgba(158,63,63,.10)] text-[var(--bureau-rust)]", accent: "var(--bureau-rust)" },
  cumhuriyet: { label: "Cumhuriyet", tone: "bg-[rgba(4,126,137,.11)] text-[var(--bureau-teal)]", accent: "var(--bureau-teal)" },
  cagdas: { label: "Çağdaş Dünya", tone: "bg-[rgba(37,63,116,.11)] text-[var(--bureau-blue)]", accent: "var(--bureau-blue)" },
};

const containerVars: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const cardVars: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } } };

export function TopicsPage() {
  const mounted = useMounted();
  const [selectedEra, setSelectedEra] = useState<"all" | HistoryEra>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const attempts = useStudyProgressStore((state) => state.questionAttempts);

  const completedSet = useMemo(() => new Set(completedTopicIds), [completedTopicIds]);

  const filteredTopics = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("tr-TR");

    return topics.filter((topic) => {
      const matchesEra = selectedEra === "all" || topic.era === selectedEra;
      const matchesQuery =
        !query ||
        [topic.title, topic.shortDescription, ...topic.keywords, ...topic.mustKnow]
          .join(" ")
          .toLocaleLowerCase("tr-TR")
          .includes(query);

      return matchesEra && matchesQuery;
    });
  }, [searchQuery, selectedEra]);

  const completedCount = topics.filter((topic) => completedSet.has(topic.id)).length;
  const totalQuestionCount = questions.length;
  const completionRate = topics.length ? Math.round((completedCount / topics.length) * 100) : 0;

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--bureau-line)] bg-[var(--bureau-ink)] p-6 text-[var(--bureau-inverse)] shadow-[var(--shadow-stage)] sm:p-8 lg:p-10">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(4,126,137,.26)] blur-3xl" />
          <div className="absolute bottom-[-9rem] left-[18%] h-80 w-80 rounded-full bg-[rgba(37,63,116,.30)] blur-3xl" />
          <div className="absolute inset-0 opacity-[.10] [background-image:linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.20)_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="kicker text-[var(--bureau-inverse)]">KPSS Tarih Akademi</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.055em] sm:text-5xl lg:text-6xl">
              Konuları ezber listesi değil, sınav mantığıyla öğren.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--bureau-inverse-copy)] sm:text-lg">
              Her başlıkta kavram ilişkisi, kronoloji, sık hata, sınav ipucu ve açıklamalı test akışı birlikte ilerler. Konu kartına tıklayınca derin anlatım ekranına geçersin.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/question-bank" className="btn-accent">
                Soru bankasına geç <ArrowRight size={17} />
              </Link>
              <Link href="/timeline" className="btn-ghost !bg-white/10 !text-[var(--bureau-inverse)] hover:!bg-white/15">
                Kronoloji atlasını aç
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <HeroMetric icon={<BookOpen size={18} />} label="Konu" value={topics.length} />
            <HeroMetric icon={<CheckCircle2 size={18} />} label="Tamamlanma" value={`%${mounted ? completionRate : 0}`} />
            <HeroMetric icon={<FileQuestion size={18} />} label="Veri havuzu" value={totalQuestionCount} />
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.86)] p-4 shadow-[var(--shadow-paper)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-[var(--bureau-line)] bg-white px-4 text-sm font-bold text-[var(--bureau-ink)] shadow-[var(--shadow-paper)]">
            <Search size={18} className="text-[var(--bureau-muted)]" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Konu, kavram veya dönem ara..."
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--bureau-muted)]"
            />
          </label>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-clean lg:max-w-[58%]">
            {ERA_FILTERS.map((filter) => {
              const active = selectedEra === filter.key;

              return (
                <button
                  key={filter.key}
                  type="button"
                  data-active={active ? "true" : undefined}
                  aria-pressed={active}
                  onClick={() => setSelectedEra(filter.key)}
                  className={
                    active
                      ? "shrink-0 rounded-2xl bg-[var(--bureau-ink)] px-4 py-3 text-left text-sm font-black text-[var(--bureau-inverse)] shadow-[var(--shadow-float)]"
                      : "shrink-0 rounded-2xl border border-[var(--bureau-line)] bg-white px-4 py-3 text-left text-sm font-black text-[var(--bureau-ink)] transition hover:border-[rgba(4,126,137,.25)] hover:shadow-[var(--shadow-paper)]"
                  }
                >
                  <span className="block whitespace-nowrap">{filter.label}</span>
                  <span className="block text-[10px] font-bold opacity-70">{filter.helper}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div variants={containerVars} initial="hidden" animate="show" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredTopics.map((topic, index) => {
          const isCompleted = completedSet.has(topic.id);
          const relatedQuestionCount = questions.filter((question) => question.topicId === topic.id).length;
          const answeredCount = attempts.filter((attempt) => attempt.topicId === topic.id).length;
          const localProgress = relatedQuestionCount ? Math.min(100, Math.round((answeredCount / relatedQuestionCount) * 100)) : 0;

          return (
            <TopicCard
              key={topic.id}
              topic={topic}
              index={index}
              progress={mounted ? localProgress : 0}
              completed={mounted && isCompleted}
              questionCount={relatedQuestionCount}
            />
          );
        })}
      </motion.div>

      {filteredTopics.length === 0 ? (
        <div className="rounded-[1.6rem] border border-dashed border-[var(--bureau-line-2)] bg-white/65 p-8 text-center shadow-[var(--shadow-paper)]">
          <Sparkles className="mx-auto text-[var(--bureau-teal)]" />
          <h2 className="mt-3 text-xl font-black text-[var(--bureau-ink)]">Sonuç bulunamadı</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--bureau-copy)]">Arama terimini sadeleştir veya tüm dönemleri tekrar göster.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedEra("all");
              setSearchQuery("");
            }}
            className="btn-primary mt-5"
            data-dark-button="true"
          >
            Filtreleri temizle
          </button>
        </div>
      ) : null}
    </section>
  );
}

function TopicCard({ topic, index, progress, completed, questionCount }: { topic: Topic; index: number; progress: number; completed: boolean; questionCount: number }) {
  const era = ERA_META[topic.era];
  const counts = getTestCountsForTopic(topic.id);
  const firstSummary = topic.summary[0];

  return (
    <motion.article variants={cardVars} className="group relative h-full overflow-hidden rounded-[1.8rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.92)] shadow-[var(--shadow-paper)] transition hover:-translate-y-1 hover:border-[rgba(4,126,137,.26)] hover:shadow-[var(--shadow-float)]">
      <Link href={`/topics/${topic.slug}`} className="block h-full p-5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(4,126,137,.25)]">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: `radial-gradient(circle at 85% 8%, ${era.accent}24, transparent 16rem)` }} />
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-[var(--bureau-ink)] text-sm font-black text-[var(--bureau-inverse)]">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${era.tone}`}>{era.label}</span>
                <p className="mt-2 text-xs font-bold text-[var(--bureau-muted)]">{topic.estimatedMinutes} dk çalışma</p>
              </div>
            </div>
            {completed ? <CheckCircle2 className="text-[var(--bureau-teal)]" size={22} /> : null}
          </div>

          <h2 className="text-2xl font-black tracking-[-.035em] text-[var(--bureau-ink)]">{topic.title}</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--bureau-copy)]">{topic.shortDescription}</p>

          {firstSummary ? (
            <div className="mt-5 rounded-[1.25rem] border border-[var(--bureau-line)] bg-white/70 p-4">
              <p className="text-[11px] font-black uppercase tracking-[.16em] text-[var(--bureau-teal)]">Konu omurgası</p>
              <p className="mt-2 text-sm font-extrabold text-[var(--bureau-ink)]">{firstSummary.heading}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-6 text-[var(--bureau-copy)]">{firstSummary.body}</p>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            {topic.mustKnow.slice(0, 4).map((item) => (
              <span key={item} className="rounded-full border border-[var(--bureau-line)] bg-white px-3 py-1 text-[11px] font-extrabold text-[var(--bureau-copy)]">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="mb-3 grid grid-cols-3 gap-2 text-center">
              <MiniInfo icon={<Target size={14} />} value={`%${topic.examImportance}`} label="Önem" />
              <MiniInfo icon={<FileQuestion size={14} />} value={counts.totalTests || 0} label="Test" />
              <MiniInfo icon={<Clock size={14} />} value={questionCount} label="Soru" />
            </div>
            <div className="progress-track mb-4">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-[var(--bureau-ink)] px-4 py-3 text-sm font-black text-[var(--bureau-inverse)]">
              <span>{completed ? "Tekrar et" : "Derin anlatıma geç"}</span>
              <ArrowRight size={17} />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function HeroMetric({ icon, label, value }: { icon: ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[.08] p-4">
      <div className="flex items-center gap-2 text-[var(--bureau-inverse-copy)]">{icon}<span className="text-xs font-bold">{label}</span></div>
      <p className="mt-3 text-3xl font-black tracking-[-.04em] text-[var(--bureau-inverse)]">{value}</p>
    </div>
  );
}

function MiniInfo({ icon, label, value }: { icon: ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-[var(--bureau-line)] bg-white/70 px-2 py-3">
      <div className="mx-auto flex items-center justify-center gap-1 text-[var(--bureau-teal)]">{icon}<span className="text-sm font-black text-[var(--bureau-ink)]">{value}</span></div>
      <p className="mt-1 text-[10px] font-bold text-[var(--bureau-muted)]">{label}</p>
    </div>
  );
}
