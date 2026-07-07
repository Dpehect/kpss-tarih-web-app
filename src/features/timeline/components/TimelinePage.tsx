"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarClock,
  GitBranch,
  MapPinned,
  Search
} from "lucide-react";
import { timelineEvents, topics } from "@/data/kpss-history";
import type { HistoryEra, TimelineEvent, Topic } from "@/types/study";

type EnrichedTimelineEvent = TimelineEvent & {
  topic?: Topic;
  topicTitle: string;
  topicSlug?: string;
  era?: HistoryEra;
  numericDate: number;
  eraLabel: string;
  mustKnow: string[];
  examImportance: number;
};

const eraLabels: Record<HistoryEra | "all", string> = {
  all: "Tüm dönemler",
  "islamiyet-oncesi": "İslamiyet öncesi",
  "turk-islam": "Türk-İslam",
  osmanli: "Osmanlı",
  yenilesme: "Yenileşme",
  "milli-mucadele": "Milli Mücadele",
  cumhuriyet: "Cumhuriyet",
  cagdas: "Çağdaş"
};

const eraFilters: Array<HistoryEra | "all"> = [
  "all",
  "islamiyet-oncesi",
  "turk-islam",
  "osmanli",
  "yenilesme",
  "milli-mucadele",
  "cumhuriyet",
  "cagdas"
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: "easeOut" } }
};

const clampTwo: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden"
};

function parseTimelineDate(value: string) {
  const clean = value.trim().toLocaleLowerCase("tr-TR");
  const yearMatch = clean.match(/\d{3,4}/);

  if (yearMatch) return Number(yearMatch[0]);

  const centuryMatch = clean.match(/(\d{1,2})\s*\.?\s*yy/);

  if (centuryMatch) {
    const century = Number(centuryMatch[1]);
    return (century - 1) * 100;
  }

  return 0;
}

function normalizeText(value: string) {
  return value.toLocaleLowerCase("tr-TR").trim();
}

export function TimelinePage() {
  const enriched = useMemo<EnrichedTimelineEvent[]>(() => {
    return timelineEvents
      .map((event) => {
        const topic = topics.find((item) => item.id === event.topicId);

        return {
          ...event,
          topic,
          topicTitle: topic?.title ?? "Genel Tarih",
          topicSlug: topic?.slug,
          era: topic?.era,
          numericDate: parseTimelineDate(event.date),
          eraLabel: topic?.era ? eraLabels[topic.era] : "Genel",
          mustKnow: topic?.mustKnow.slice(0, 4) ?? [],
          examImportance: topic?.examImportance ?? 50
        };
      })
      .sort((a, b) => a.numericDate - b.numericDate);
  }, []);

  const [selectedId, setSelectedId] = useState(enriched[0]?.id ?? "");
  const [activeEra, setActiveEra] = useState<HistoryEra | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = enriched.filter((event) => {
    const q = normalizeText(query);
    const matchesEra = activeEra === "all" || event.era === activeEra;

    if (!matchesEra) return false;
    if (!q) return true;

    return [
      event.date,
      event.title,
      event.description,
      event.topicTitle,
      event.mustKnow.join(" ")
    ]
      .join(" ")
      .toLocaleLowerCase("tr-TR")
      .includes(q);
  });

  const selected =
    filtered.find((event) => event.id === selectedId) ??
    enriched.find((event) => event.id === selectedId) ??
    filtered[0] ??
    enriched[0];

  const selectedIndex = selected ? enriched.findIndex((event) => event.id === selected.id) : -1;
  const previous = selectedIndex > 0 ? enriched[selectedIndex - 1] : null;
  const next = selectedIndex >= 0 && selectedIndex < enriched.length - 1 ? enriched[selectedIndex + 1] : null;

  function selectEvent(eventId: string) {
    setSelectedId(eventId);
  }

  function move(offset: number) {
    if (!selected || enriched.length === 0) return;

    const index = enriched.findIndex((event) => event.id === selected.id);
    const nextIndex = (index + offset + enriched.length) % enriched.length;

    setSelectedId(enriched[nextIndex].id);
  }

  if (!selected) {
    return (
      <div className="bureau-card rounded-[2rem] p-6">
        <h1 className="text-3xl font-black text-[var(--bureau-ink)]">Zaman çizelgesi bulunamadı</h1>
      </div>
    );
  }

  const firstYear = enriched[0]?.date ?? "-";
  const lastYear = enriched[enriched.length - 1]?.date ?? "-";
  const selectedTopicUrl = selected.topicSlug ? `/topics/${selected.topicSlug}` : "/topics";

  return (
    <div className="space-y-7">
      <header className="bureau-stage relative overflow-hidden rounded-[2.4rem] p-6 md:p-8">
        <TimelineConstellation events={enriched} selectedId={selected.id} onSelect={selectEvent} />

        <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-end">
          <div>
            <p className="bureau-kicker">Zaman Çizelgesi</p>
            <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.075em] text-[var(--bureau-inverse)] md:text-7xl">
              Olayları tek çizgi değil, bağlantılı bir harita gibi oku.
            </h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[var(--bureau-inverse-copy)] md:text-lg">
              Tarihleri sırayla gör, olayın hangi konuya bağlandığını incele ve önce-sonra ilişkisini kaçırmadan ilerle.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => move(-1)} className="btn-ghost px-5 py-3">
                <ArrowLeft size={17} />
                Önceki olay
              </button>
              <button type="button" onClick={() => move(1)} className="btn-accent px-5 py-3">
                Sonraki olay
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <HeroStat icon={<CalendarClock size={18} />} label="Olay" value={enriched.length} />
            <HeroStat icon={<GitBranch size={18} />} label="Dönem" value={new Set(enriched.map((event) => event.eraLabel)).size} />
            <HeroStat icon={<BookOpen size={18} />} label="İlk kayıt" value={firstYear} />
            <HeroStat icon={<MapPinned size={18} />} label="Son kayıt" value={lastYear} />
          </div>
        </div>
      </header>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="bureau-surface rounded-[2rem] p-4 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="flex min-h-13 flex-1 items-center gap-3 rounded-[1.15rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] px-4">
              <Search size={18} className="text-[var(--bureau-copy)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Olay, tarih, konu veya kavram ara"
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[var(--bureau-ink)] outline-none placeholder:text-[var(--bureau-muted)]"
              />
            </label>

            <div className="rounded-[1.15rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] px-4 py-3 text-sm font-black text-[var(--bureau-copy)]">
              {filtered.length} olay
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-clean">
            {eraFilters.map((era) => {
              const active = activeEra === era;

              return (
                <button
                  key={era}
                  type="button"
                  onClick={() => {
                    setActiveEra(era);
                    const first = enriched.find((event) => era === "all" || event.era === era);
                    if (first) setSelectedId(first.id);
                  }}
                  aria-pressed={active}
                  data-active={active ? "true" : undefined}
                  className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-black transition ${
                    active
                      ? "border-[var(--bureau-ink)] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]"
                      : "border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] text-[var(--bureau-copy)] hover:bg-white hover:text-[var(--bureau-ink)]"
                  }`}
                >
                  {eraLabels[era]}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="bureau-card rounded-[2rem] p-5">
          <p className="bureau-kicker">Seçili olay</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.065em] text-[var(--bureau-ink)]">
            {selected.title}
          </h2>
          <p className="mt-2 text-sm font-black text-[var(--bureau-teal)]">{selected.date}</p>
          <p className="mt-4 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
            {selected.description}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <MiniMetric label="Konu" value={selected.topicTitle} />
            <MiniMetric label="Önem" value={`%${selected.examImportance}`} />
          </div>

          <a href={selectedTopicUrl} className="btn-primary mt-5 w-full" data-dark-button="true">
            Konuya git
            <ArrowRight size={17} />
          </a>
        </aside>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <main className="bureau-card overflow-hidden rounded-[2.2rem] p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="bureau-kicker">Olay akışı</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">
                Kronolojik rota
              </h2>
            </div>
            <span className="hidden rounded-full bg-[var(--bureau-blue-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-blue)] sm:inline-flex">
              Tıkla ve incele
            </span>
          </div>

          <div className="relative max-h-[760px] space-y-3 overflow-y-auto pr-1 scrollbar-clean">
            {filtered.map((event, index) => (
              <TimelineRow
                key={event.id}
                event={event}
                index={index}
                active={event.id === selected.id}
                onClick={() => selectEvent(event.id)}
              />
            ))}
          </div>
        </main>

        <aside className="grid gap-5 self-start xl:sticky xl:top-24">
          <RelationCard title="Önceki olay" event={previous} onClick={() => previous && selectEvent(previous.id)} />
          <RelationCard title="Sonraki olay" event={next} onClick={() => next && selectEvent(next.id)} />

          <div className="bureau-card rounded-[2rem] p-5">
            <p className="bureau-kicker">Kavram izi</p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.055em] text-[var(--bureau-ink)]">
              Bu olayla birlikte bak
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.mustKnow.length > 0 ? (
                selected.mustKnow.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] px-3 py-1 text-xs font-black text-[var(--bureau-copy)]"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm font-semibold text-[var(--bureau-copy)]">Bu olay için kavram etiketi bulunmuyor.</span>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function TimelineConstellation({
  events,
  selectedId,
  onSelect
}: {
  events: EnrichedTimelineEvent[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-45">
      <svg viewBox="0 0 1200 620" className="h-full w-full">
        <path
          d="M90 390 C210 220 382 250 520 310 C706 390 820 210 1110 286"
          fill="none"
          stroke="rgba(255,250,242,.24)"
          strokeWidth="2"
        />
        <path
          d="M106 472 C260 374 410 420 610 350 C792 286 918 390 1110 410"
          fill="none"
          stroke="rgba(4,126,137,.68)"
          strokeWidth="2"
          strokeDasharray="12 16"
        />
      </svg>

      <div className="absolute inset-0">
        {events.slice(0, 28).map((event, index) => {
          const x = 7 + (index % 14) * 6.7;
          const y = index < 14 ? 48 + Math.sin(index * 0.9) * 12 : 68 + Math.sin(index * 0.7) * 10;
          const active = event.id === selectedId;

          return (
            <button
              key={event.id}
              type="button"
              onClick={() => onSelect(event.id)}
              className="pointer-events-auto absolute grid place-items-center rounded-full transition"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: active ? 24 : 14,
                height: active ? 24 : 14,
                background: active ? "var(--bureau-inverse)" : "rgba(4,126,137,.82)",
                boxShadow: active ? "0 0 0 12px rgba(255,250,242,.10)" : "0 0 0 7px rgba(4,126,137,.10)"
              }}
              aria-label={`${event.date} ${event.title}`}
            />
          );
        })}
      </div>
    </div>
  );
}

function TimelineRow({
  event,
  index,
  active,
  onClick
}: {
  event: EnrichedTimelineEvent;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      variants={cardVariants}
      initial="hidden"
      animate="show"
      onClick={onClick}
      data-active={active ? "true" : undefined}
      aria-pressed={active}
      whileHover={{ x: active ? 0 : 4 }}
      className={`group grid w-full gap-4 rounded-[1.4rem] border p-4 text-left transition md:grid-cols-[90px_minmax(0,1fr)_150px] ${
        active
          ? "border-[var(--bureau-ink)] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]"
          : "border-[var(--bureau-line)] bg-[rgba(255,250,242,.74)] text-[var(--bureau-ink)] hover:bg-white"
      }`}
    >
      <div>
        <span className={`text-xs font-black uppercase tracking-[0.18em] ${active ? "text-[var(--bureau-inverse-muted)]" : "text-[var(--bureau-muted)]"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className={`mt-2 text-2xl font-black tracking-[-0.06em] ${active ? "text-[var(--bureau-inverse)]" : "text-[var(--bureau-ink)]"}`}>
          {event.date}
        </p>
      </div>

      <div className="min-w-0">
        <h3 className={`text-xl font-black tracking-[-0.045em] ${active ? "text-[var(--bureau-inverse)]" : "text-[var(--bureau-ink)]"}`}>
          {event.title}
        </h3>
        <p className={`mt-2 text-sm font-semibold leading-6 ${active ? "text-[var(--bureau-inverse-copy)]" : "text-[var(--bureau-copy)]"}`} style={clampTwo}>
          {event.description}
        </p>
      </div>

      <div className="flex items-start md:justify-end">
        <span className={`rounded-full px-3 py-1 text-xs font-black ${active ? "bg-white/[.10] text-[var(--bureau-inverse)]" : "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]"}`}>
          {event.eraLabel}
        </span>
      </div>
    </motion.button>
  );
}

function RelationCard({
  title,
  event,
  onClick
}: {
  title: string;
  event: EnrichedTimelineEvent | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!event}
      className="bureau-card w-full rounded-[2rem] p-5 text-left disabled:cursor-not-allowed disabled:opacity-60"
    >
      <p className="bureau-kicker">{title}</p>
      {event ? (
        <>
          <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.055em] text-[var(--bureau-ink)]">
            {event.title}
          </h3>
          <p className="mt-2 text-sm font-black text-[var(--bureau-teal)]">{event.date}</p>
          <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bureau-copy)]" style={clampTwo}>
            {event.description}
          </p>
        </>
      ) : (
        <p className="mt-3 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
          Bu yönde başka olay bulunmuyor.
        </p>
      )}
    </button>
  );
}

function HeroStat({ icon, label, value }: { icon: ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[.08] p-4 backdrop-blur-2xl">
      <div className="flex items-center gap-2 text-[var(--bureau-inverse)]">
        {icon}
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-inverse-muted)]">
          {label}
        </span>
      </div>
      <p className="mt-3 text-3xl font-black tracking-[-0.07em] text-[var(--bureau-inverse)]">
        {value}
      </p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.74)] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-2 text-sm font-black leading-5 text-[var(--bureau-ink)]">{value}</p>
    </div>
  );
}
