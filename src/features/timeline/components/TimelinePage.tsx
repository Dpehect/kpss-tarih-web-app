"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Layers3,
  Search,
  Sparkles,
  Target
} from "lucide-react";
import { timelineEvents, topics } from "@/data/kpss-history";
import type { HistoryEra, TimelineEvent, Topic } from "@/types/study";

type TimelineItem = TimelineEvent & {
  topic?: Topic;
  topicTitle: string;
  topicSlug?: string;
  era?: HistoryEra;
  eraLabel: string;
  numericDate: number;
  mustKnow: string[];
  importance: number;
  shortReason: string;
};

const eraLabels: Record<HistoryEra | "all", string> = {
  all: "Tümü",
  "islamiyet-oncesi": "İlk Türk",
  "turk-islam": "Türk-İslam",
  osmanli: "Osmanlı",
  yenilesme: "Yenileşme",
  "milli-mucadele": "Milli Mücadele",
  cumhuriyet: "Cumhuriyet",
  cagdas: "Çağdaş"
};

const eraOrder: Array<HistoryEra | "all"> = [
  "all",
  "islamiyet-oncesi",
  "turk-islam",
  "osmanli",
  "yenilesme",
  "milli-mucadele",
  "cumhuriyet",
  "cagdas"
];

const clampTwo: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden"
};

function parseYear(value: string) {
  const clean = value.trim().toLocaleLowerCase("tr-TR");
  const year = clean.match(/\d{3,4}/);

  if (year) return Number(year[0]);

  const century = clean.match(/(\d{1,2})\s*\.?\s*yy/);

  if (century) return (Number(century[1]) - 1) * 100;

  return 0;
}

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").trim();
}

function makeReason(event: TimelineItem) {
  if (event.mustKnow.length > 0) {
    return `${event.mustKnow[0]} kavramıyla birlikte sorulabilir.`;
  }

  return `${event.topicTitle} konusu içinde kronoloji ve sonuç ilişkisi için önemlidir.`;
}

export function TimelinePage() {
  const items = useMemo<TimelineItem[]>(() => {
    return timelineEvents
      .map((event) => {
        const topic = topics.find((item) => item.id === event.topicId);
        const draft = {
          ...event,
          topic,
          topicTitle: topic?.title ?? "Genel Tarih",
          topicSlug: topic?.slug,
          era: topic?.era,
          eraLabel: topic?.era ? eraLabels[topic.era] : "Genel",
          numericDate: parseYear(event.date),
          mustKnow: topic?.mustKnow.slice(0, 4) ?? [],
          importance: topic?.examImportance ?? 60,
          shortReason: ""
        };

        return {
          ...draft,
          shortReason: makeReason(draft)
        };
      })
      .sort((a, b) => a.numericDate - b.numericDate);
  }, []);

  const [query, setQuery] = useState("");
  const [activeEra, setActiveEra] = useState<HistoryEra | "all">("all");
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");

  const filtered = items.filter((item) => {
    const eraMatch = activeEra === "all" || item.era === activeEra;
    const q = normalize(query);

    if (!eraMatch) return false;
    if (!q) return true;

    return [
      item.date,
      item.title,
      item.description,
      item.topicTitle,
      item.eraLabel,
      item.mustKnow.join(" ")
    ]
      .join(" ")
      .toLocaleLowerCase("tr-TR")
      .includes(q);
  });

  const selected =
    filtered.find((item) => item.id === selectedId) ??
    filtered[0] ??
    items.find((item) => item.id === selectedId) ??
    items[0];

  const selectedIndex = selected ? items.findIndex((item) => item.id === selected.id) : 0;
  const filteredSelectedIndex = selected ? filtered.findIndex((item) => item.id === selected.id) : 0;
  const previous = selectedIndex > 0 ? items[selectedIndex - 1] : null;
  const next = selectedIndex < items.length - 1 ? items[selectedIndex + 1] : null;
  const progress = items.length ? Math.round(((selectedIndex + 1) / items.length) * 100) : 0;
  const topicUrl = selected?.topicSlug ? `/topics/${selected.topicSlug}` : "/topics";

  function select(item: TimelineItem) {
    setSelectedId(item.id);
  }

  function move(offset: number) {
    if (!items.length || !selected) return;

    const index = items.findIndex((item) => item.id === selected.id);
    const nextIndex = (index + offset + items.length) % items.length;

    setSelectedId(items[nextIndex].id);
  }

  function startFastRoute() {
    const important = items.find((item) => item.importance >= 85) ?? items[0];

    if (important) {
      setQuery("");
      setActiveEra("all");
      setSelectedId(important.id);
    }
  }

  if (!selected) {
    return (
      <div className="bureau-card rounded-[2rem] p-6">
        <h1 className="text-3xl font-black text-[var(--bureau-ink)]">Timeline verisi bulunamadı</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="bureau-stage relative overflow-hidden rounded-[2.5rem] p-5 md:p-8">
          <BackgroundLines />

          <div className="relative z-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="bureau-kicker">Timeline</p>
                <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.075em] text-[var(--bureau-inverse)] md:text-7xl">
                  Tarihi sırayla, yorulmadan öğren.
                </h1>
                <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[var(--bureau-inverse-copy)]">
                  Tek ekranda bir olay gör. Sonraki olaya geç. Konu bağlantısını ve sınav notunu kaçırma.
                </p>
              </div>

              <button
                type="button"
                onClick={startFastRoute}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[.10] px-5 py-3 text-sm font-black text-[var(--bureau-inverse)] backdrop-blur-xl transition hover:bg-white/[.15]"
              >
                <Sparkles size={18} />
                Hızlı rota
              </button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <HeroStat icon={<CalendarDays size={18} />} label="Olay" value={items.length} />
              <HeroStat icon={<Layers3 size={18} />} label="Dönem" value={new Set(items.map((item) => item.eraLabel)).size} />
              <HeroStat icon={<Target size={18} />} label="İlerleme" value={`%${progress}`} />
            </div>
          </div>
        </div>

        <aside className="bureau-card rounded-[2.5rem] p-5">
          <p className="bureau-kicker">Tembel mod</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.065em] text-[var(--bureau-ink)]">
            Sadece sıradaki olaya bas.
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
            Arama veya filtre kullanmak istemiyorsan tek yapman gereken Sonraki Olay butonuyla ilerlemek.
          </p>

          <div className="mt-5 grid gap-3">
            <button type="button" onClick={() => move(1)} className="btn-primary w-full" data-dark-button="true">
              Sonraki olay
              <ArrowRight size={17} />
            </button>
            <button type="button" onClick={() => move(-1)} className="btn-ghost w-full">
              <ArrowLeft size={17} />
              Önceki olay
            </button>
          </div>
        </aside>
      </section>

      <section className="bureau-surface rounded-[2rem] p-4 md:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <label className="flex min-h-13 items-center gap-3 rounded-[1.15rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.82)] px-4">
            <Search size={18} className="text-[var(--bureau-copy)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Olay, yıl, konu veya kavram ara"
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[var(--bureau-ink)] outline-none placeholder:text-[var(--bureau-muted)]"
            />
          </label>

          <div className="rounded-[1.15rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.82)] px-4 py-3 text-sm font-black text-[var(--bureau-copy)]">
            {filtered.length} sonuç
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-clean">
          {eraOrder.map((era) => {
            const active = activeEra === era;

            return (
              <button
                key={era}
                type="button"
                onClick={() => {
                  setActiveEra(era);
                  const first = items.find((item) => era === "all" || item.era === era);
                  if (first) setSelectedId(first.id);
                }}
                aria-pressed={active}
                data-active={active ? "true" : undefined}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${
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
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <main className="bureau-card overflow-hidden rounded-[2.5rem] p-5 md:p-7">
          <AnimatePresence mode="wait">
            <motion.article
              key={selected.id}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="bureau-kicker">{selected.eraLabel}</p>
                  <h2 className="mt-4 text-5xl font-black tracking-[-0.085em] text-[var(--bureau-ink)] md:text-7xl">
                    {selected.date}
                  </h2>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--bureau-teal-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-teal)]">
                  <Clock3 size={15} />
                  {selectedIndex + 1} / {items.length}
                </span>
              </div>

              <h3 className="mt-8 text-4xl font-black leading-[1.03] tracking-[-0.075em] text-[var(--bureau-ink)] md:text-6xl">
                {selected.title}
              </h3>

              <p className="mt-5 max-w-4xl text-base font-semibold leading-8 text-[var(--bureau-copy)] md:text-lg">
                {selected.description}
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                <InfoCard icon={<BookOpen size={18} />} label="Konu" value={selected.topicTitle} />
                <InfoCard icon={<Target size={18} />} label="Sınav değeri" value={`%${selected.importance}`} />
                <InfoCard icon={<CheckCircle2 size={18} />} label="Akılda tut" value={selected.shortReason} />
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a href={topicUrl} className="btn-primary" data-dark-button="true">
                  Konuya git
                  <ArrowRight size={17} />
                </a>

                <div className="flex gap-3">
                  <button type="button" onClick={() => move(-1)} className="btn-ghost">
                    <ArrowLeft size={17} />
                    Önceki
                  </button>
                  <button type="button" onClick={() => move(1)} className="btn-accent">
                    Sonraki
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </main>

        <aside className="grid gap-5 self-start xl:sticky xl:top-24">
          <div className="bureau-card rounded-[2rem] p-5">
            <p className="bureau-kicker">Sıradaki bağlantı</p>
            <div className="mt-4 grid gap-3">
              <RelationButton label="Önce" item={previous} onClick={() => previous && setSelectedId(previous.id)} />
              <RelationButton label="Sonra" item={next} onClick={() => next && setSelectedId(next.id)} />
            </div>
          </div>

          <div className="bureau-card rounded-[2rem] p-5">
            <p className="bureau-kicker">Kavramlar</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.mustKnow.length > 0 ? (
                selected.mustKnow.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--bureau-line)] bg-[rgba(255,250,242,.80)] px-3 py-1 text-xs font-black text-[var(--bureau-copy)]"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm font-semibold text-[var(--bureau-copy)]">Bu olay için kavram etiketi yok.</span>
              )}
            </div>
          </div>
        </aside>
      </section>

      <section className="bureau-card rounded-[2.25rem] p-5">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="bureau-kicker">Kronoloji şeridi</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.065em] text-[var(--bureau-ink)]">
              Hızlı seçim
            </h2>
          </div>
          <p className="text-sm font-semibold text-[var(--bureau-copy)]">
            Kalabalık liste yok; kısa kartlardan istediğin olaya geç.
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-clean">
          {filtered.map((item, index) => {
            const active = item.id === selected.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => select(item)}
                data-active={active ? "true" : undefined}
                aria-pressed={active}
                className={`min-w-[230px] rounded-[1.4rem] border p-4 text-left transition ${
                  active
                    ? "border-[var(--bureau-ink)] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]"
                    : "border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] text-[var(--bureau-ink)] hover:bg-white"
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-[0.16em] ${active ? "text-[var(--bureau-inverse-muted)]" : "text-[var(--bureau-muted)]"}`}>
                  {String(index + 1).padStart(2, "0")} · {item.eraLabel}
                </span>
                <p className={`mt-2 text-2xl font-black tracking-[-0.06em] ${active ? "text-[var(--bureau-inverse)]" : "text-[var(--bureau-ink)]"}`}>
                  {item.date}
                </p>
                <p className={`mt-2 text-sm font-bold leading-6 ${active ? "text-[var(--bureau-inverse-copy)]" : "text-[var(--bureau-copy)]"}`} style={clampTwo}>
                  {item.title}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function BackgroundLines() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-35">
      <svg viewBox="0 0 1100 620" className="h-full w-full">
        <path d="M80 355 C250 170 420 230 560 300 C710 380 850 230 1040 280" fill="none" stroke="rgba(255,250,242,.26)" strokeWidth="2" />
        <path d="M120 450 C300 330 460 405 640 340 C780 290 910 390 1060 410" fill="none" stroke="rgba(4,126,137,.60)" strokeWidth="2" strokeDasharray="12 16" />
        <circle cx="174" cy="330" r="42" fill="rgba(4,126,137,.16)" />
        <circle cx="835" cy="248" r="78" fill="rgba(37,63,116,.22)" />
        <circle cx="978" cy="440" r="54" fill="rgba(102,52,95,.18)" />
      </svg>
    </div>
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

function InfoCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] p-4">
      <div className="flex items-center gap-2 text-[var(--bureau-teal)]">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bureau-muted)]">
          {label}
        </span>
      </div>
      <p className="mt-3 text-sm font-black leading-6 text-[var(--bureau-ink)]" style={clampTwo}>
        {value}
      </p>
    </div>
  );
}

function RelationButton({
  label,
  item,
  onClick
}: {
  label: string;
  item: TimelineItem | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!item}
      className="rounded-[1.35rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] p-4 text-left transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bureau-muted)]">{label}</span>
      {item ? (
        <>
          <p className="mt-2 text-lg font-black tracking-[-0.045em] text-[var(--bureau-ink)]">{item.date}</p>
          <p className="mt-1 text-sm font-bold leading-6 text-[var(--bureau-copy)]" style={clampTwo}>
            {item.title}
          </p>
        </>
      ) : (
        <p className="mt-2 text-sm font-semibold text-[var(--bureau-copy)]">Başka olay yok.</p>
      )}
    </button>
  );
}
