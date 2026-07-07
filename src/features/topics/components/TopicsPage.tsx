"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Clock3, FileQuestion, Search, Sparkles, Target } from "lucide-react";
import { getTestCountsForTopic } from "@/data/generated-30-question-tests";
import { topics } from "@/data/kpss-history";
import { getTopicVisual } from "@/data/topic-visuals";
import { useMounted } from "@/hooks/useMounted";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";
import type { HistoryEra, Topic } from "@/types/study";

const eraFilters: Array<{ key: "all" | HistoryEra; label: string }> = [
  { key: "all", label: "Tümü" },
  { key: "islamiyet-oncesi", label: "İlk Türk" },
  { key: "turk-islam", label: "Türk-İslam" },
  { key: "osmanli", label: "Osmanlı" },
  { key: "yenilesme", label: "Yenileşme" },
  { key: "milli-mucadele", label: "Milli Mücadele" },
  { key: "cumhuriyet", label: "Cumhuriyet" },
  { key: "cagdas", label: "Çağdaş" }
];

const eraLabels: Record<HistoryEra, string> = {
  "islamiyet-oncesi": "İslamiyet Öncesi Türk Tarihi",
  "turk-islam": "Türk-İslam Tarihi",
  osmanli: "Osmanlı Tarihi",
  yenilesme: "Yenileşme ve Demokratikleşme",
  "milli-mucadele": "Milli Mücadele",
  cumhuriyet: "Cumhuriyet Dönemi",
  cagdas: "Çağdaş Türk ve Dünya Tarihi"
};

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR");
}

export function TopicsPage() {
  const mounted = useMounted();
  const [selectedEra, setSelectedEra] = useState<"all" | HistoryEra>("all");
  const [query, setQuery] = useState("");
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const completedSet = useMemo(() => new Set(completedTopicIds), [completedTopicIds]);

  const filteredTopics = topics.filter((topic) => {
    const eraMatch = selectedEra === "all" || topic.era === selectedEra;
    const q = normalize(query.trim());

    if (!eraMatch) return false;
    if (!q) return true;

    return normalize(
      [topic.title, topic.shortDescription, topic.keywords.join(" "), topic.mustKnow.join(" "), eraLabels[topic.era]].join(" ")
    ).includes(q);
  });

  const completedCount = topics.filter((topic) => completedSet.has(topic.id)).length;
  const totalQuestions = topics.reduce((sum, topic) => sum + getTestCountsForTopic(topic.id).totalQuestions, 0);
  const totalTests = topics.reduce((sum, topic) => sum + getTestCountsForTopic(topic.id).totalTests, 0);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[#e4d8c8] bg-white/78 p-6 shadow-[0_28px_100px_rgba(16,24,40,.08)] backdrop-blur-2xl md:p-8">
        <div className="absolute right-[-9rem] top-[-8rem] size-80 rounded-full bg-[#b4232a]/12 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[22%] size-80 rounded-full bg-[#0f766e]/10 blur-3xl" />

        <div className="relative z-10 grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4d8c8] bg-white/86 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">
              <Sparkles size={15} />
              Konu atlası
            </div>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.08em] text-[#101828] md:text-7xl">
              Tarihi ezber listesi değil, çalışma haritası olarak gör.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600">
              Her konu; özgün görsel, sınav önemi, anahtar kavramlar, süre, test ve soru sayısıyla birlikte düzenlendi.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <HeroStat label="Konu" value={topics.length} />
            <HeroStat label="Test" value={totalTests} />
            <HeroStat label="Soru" value={totalQuestions} />
            <HeroStat label="Tamamlanan" value={mounted ? completedCount : 0} />
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#e4d8c8] bg-white/74 p-4 shadow-sm backdrop-blur-xl">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-[#e4d8c8] bg-white/82 px-4">
            <Search size={18} className="text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Konu, kavram veya dönem ara..."
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#101828] outline-none placeholder:text-slate-400"
            />
          </label>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-clean">
            {eraFilters.map((filter) => {
              const active = selectedEra === filter.key;

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setSelectedEra(filter.key)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${
                    active
                      ? "border-[#101828] bg-[#101828] text-white"
                      : "border-[#e4d8c8] bg-white/82 text-slate-600 hover:bg-white hover:text-[#101828]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredTopics.map((topic, index) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            index={index}
            completed={completedSet.has(topic.id)}
            attempts={attempts.filter((attempt) => attempt.topicId === topic.id).length}
          />
        ))}
      </section>

      {filteredTopics.length === 0 ? (
        <section className="rounded-[2rem] border border-[#e4d8c8] bg-white/78 p-8 text-center">
          <h2 className="text-3xl font-black tracking-[-0.06em] text-[#101828]">Sonuç bulunamadı</h2>
          <p className="mt-3 text-sm font-semibold text-slate-600">Farklı bir dönem veya arama terimi deneyebilirsin.</p>
        </section>
      ) : null}
    </div>
  );
}

function TopicCard({ topic, index, completed, attempts }: { topic: Topic; index: number; completed: boolean; attempts: number }) {
  const visual = getTopicVisual(topic, index);
  const counts = getTestCountsForTopic(topic.id);
  const progress = Math.min(100, counts.totalQuestions ? Math.round((attempts / counts.totalQuestions) * 100) : 0);

  return (
    <a
      href={`/topics/${topic.slug}`}
      className="group overflow-hidden rounded-[2.25rem] border border-[#e4d8c8] bg-white/78 shadow-[0_24px_80px_rgba(16,24,40,.07)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-2xl"
    >
      <TopicVisual topic={topic} index={index} />

      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-[#e4d8c8] bg-[#fffaf3] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
            {eraLabels[topic.era]}
          </span>
          {completed ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#0f766e]/10 px-3 py-1 text-xs font-black text-[#0f766e]">
              <CheckCircle2 size={14} />
              Tamamlandı
            </span>
          ) : null}
        </div>

        <h2 className="text-3xl font-black leading-tight tracking-[-0.065em] text-[#101828]">{topic.title}</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{topic.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {topic.keywords.slice(0, 4).map((keyword) => (
            <span key={keyword} className="rounded-full bg-[#f3eadc] px-3 py-1 text-xs font-bold text-slate-600">
              {keyword}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <MiniStat icon={<Clock3 size={15} />} label="Süre" value={`${topic.estimatedMinutes} dk`} />
          <MiniStat icon={<FileQuestion size={15} />} label="Test" value={String(counts.totalTests)} />
          <MiniStat icon={<Target size={15} />} label="Soru" value={String(counts.totalQuestions)} />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-slate-400">
            <span>Çalışma izi</span>
            <span>%{progress}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#eee2d4]">
            <div className="h-full rounded-full bg-[#b4232a]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#b4232a]">
          Detaylı konu anlatımına geç
          <ArrowRight className="transition group-hover:translate-x-1" size={17} />
        </span>
      </div>
    </a>
  );
}

function TopicVisual({ topic, index }: { topic: Topic; index: number }) {
  const visual = getTopicVisual(topic, index);

  return (
    <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${visual.gradient}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,40,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-55" />
      <div className="absolute -right-8 -top-10 size-40 rounded-full bg-white/40 blur-2xl" />
      <div className="absolute bottom-5 left-5 right-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="grid size-16 place-items-center rounded-3xl bg-white/76 text-4xl font-black shadow-[0_18px_60px_rgba(16,24,40,.10)]" style={{ color: visual.accent }}>
            {visual.symbol}
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-600">
            {visual.label}
          </span>
        </div>
        <p className="max-w-[16rem] text-sm font-black uppercase tracking-[0.12em] text-[#101828]">{visual.line}</p>
      </div>
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#e4d8c8] bg-white/82 p-4 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.065em] text-[#101828]">{value.toLocaleString("tr-TR")}</p>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#eadfce] bg-[#fffaf3]/76 p-3">
      <span className="text-[#b4232a]">{icon}</span>
      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-black text-[#101828]">{value}</p>
    </div>
  );
}
