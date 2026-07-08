"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, FileQuestion, MapPinned, MoveHorizontal, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { timelineEvents, topics } from "@/data/kpss-history";
import type { TimelineEvent } from "@/types/study";

const toneMap: Record<TimelineEvent["tone"], { badge: string; line: string; glow: string }> = {
  gold: { badge: "bg-[rgba(37,63,116,.10)] text-[var(--bureau-blue)]", line: "bg-[var(--bureau-blue)]", glow: "rgba(37,63,116,.18)" },
  turquoise: { badge: "bg-[rgba(4,126,137,.10)] text-[var(--bureau-teal)]", line: "bg-[var(--bureau-teal)]", glow: "rgba(4,126,137,.18)" },
  crimson: { badge: "bg-[rgba(158,63,63,.10)] text-[var(--bureau-rust)]", line: "bg-[var(--bureau-rust)]", glow: "rgba(158,63,63,.18)" },
  parchment: { badge: "bg-[rgba(102,52,95,.10)] text-[var(--bureau-plum)]", line: "bg-[var(--bureau-plum)]", glow: "rgba(102,52,95,.18)" },
};

export function TimelinePage() {
  const enriched = useMemo(
    () =>
      timelineEvents.map((event) => ({
        ...event,
        topic: topics.find((topic) => topic.id === event.topicId) ?? null,
      })),
    [],
  );

  const [selectedId, setSelectedId] = useState(enriched[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");
    if (!normalized) return enriched;

    return enriched.filter((event) =>
      [event.date, event.title, event.description, event.topic?.title ?? ""]
        .join(" ")
        .toLocaleLowerCase("tr-TR")
        .includes(normalized),
    );
  }, [enriched, query]);

  const selected = filtered.find((event) => event.id === selectedId) ?? filtered[0] ?? enriched[0];
  const selectedTone = selected ? toneMap[selected.tone] : toneMap.gold;

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--bureau-line)] bg-[var(--bureau-ink)] p-6 text-[var(--bureau-inverse)] shadow-[var(--shadow-stage)] sm:p-8 lg:p-10">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[rgba(4,126,137,.26)] blur-3xl" />
          <div className="absolute bottom-[-10rem] left-[18%] h-96 w-96 rounded-full bg-[rgba(37,63,116,.30)] blur-3xl" />
          <div className="absolute inset-0 opacity-[.08] [background-image:linear-gradient(90deg,rgba(255,255,255,.28)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.24)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="kicker text-[var(--bureau-inverse)]">Kronoloji Atlası</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.055em] sm:text-5xl lg:text-6xl">
              Olayları sıraya değil, neden-sonuç bağına yerleştir.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--bureau-inverse-copy)]">
              Kartlara tıklayarak seçili olayı aç. Her kayıt ilgili konuya bağlanır; böylece kronoloji, konu anlatımı ve test pratiği tek akışta çalışır.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[.08] p-5">
            <div className="flex items-center gap-3 text-[var(--bureau-inverse-copy)]">
              <MoveHorizontal size={20} />
              <span className="text-sm font-bold">Yatay kaydırılabilir olay masası</span>
            </div>
            <p className="mt-4 text-4xl font-black tracking-[-.05em] text-[var(--bureau-inverse)]">{timelineEvents.length}</p>
            <p className="mt-1 text-sm font-bold text-[var(--bureau-inverse-muted)]">kritik KPSS tarih kaydı</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[1.5rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.86)] p-4 shadow-[var(--shadow-paper)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-[var(--bureau-line)] bg-white px-4 text-sm font-bold text-[var(--bureau-ink)] shadow-[var(--shadow-paper)]">
          <Search size={18} className="text-[var(--bureau-muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Olay, tarih veya konu ara..."
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--bureau-muted)]"
          />
        </label>
        <p className="text-sm font-black text-[var(--bureau-muted)]">{filtered.length} olay gösteriliyor</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-[1.8rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.86)] p-4 shadow-[var(--shadow-paper)]">
          <div className="mb-4 flex items-center justify-between gap-3 px-1">
            <div>
              <p className="kicker">Kronolojik akış</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-.04em] text-[var(--bureau-ink)]">Tıklanabilir olay kartları</h2>
            </div>
            <CalendarClock className="text-[var(--bureau-teal)]" />
          </div>

          {filtered.length > 0 ? (
            <div className="scrollbar-clean flex snap-x gap-4 overflow-x-auto pb-4">
              {filtered.map((event, index) => {
                const active = event.id === selected?.id;
                const tone = toneMap[event.tone];

                return (
                  <motion.button
                    key={event.id}
                    type="button"
                    onClick={() => setSelectedId(event.id)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    data-active={active ? "true" : undefined}
                    aria-pressed={active}
                    className={
                      active
                        ? "relative min-h-[250px] w-[260px] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-[var(--bureau-ink)] bg-[var(--bureau-ink)] p-5 text-left text-[var(--bureau-inverse)] shadow-[var(--shadow-float)]"
                        : "relative min-h-[250px] w-[260px] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-[var(--bureau-line)] bg-white p-5 text-left text-[var(--bureau-ink)] shadow-[var(--shadow-paper)] transition hover:border-[rgba(4,126,137,.28)] hover:shadow-[var(--shadow-float)]"
                    }
                    style={{ boxShadow: active ? `0 28px 80px ${tone.glow}` : undefined }}
                  >
                    <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl" style={{ background: tone.glow }} />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <span className={active ? "rounded-full bg-white/10 px-3 py-1 text-xs font-black text-[var(--bureau-inverse)]" : `rounded-full px-3 py-1 text-xs font-black ${tone.badge}`}>
                          {event.date}
                        </span>
                        <span className="text-xs font-black opacity-70">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="mt-5 text-xl font-black tracking-[-.035em]">{event.title}</h3>
                      <p className={active ? "mt-3 line-clamp-3 text-sm leading-7 text-[var(--bureau-inverse-copy)]" : "mt-3 line-clamp-3 text-sm leading-7 text-[var(--bureau-copy)]"}>
                        {event.description}
                      </p>
                      <div className="mt-auto pt-5">
                        <span className={active ? "text-xs font-black text-[var(--bureau-inverse)]" : "text-xs font-black text-[var(--bureau-teal)]"}>{event.topic?.title ?? "Genel Tarih"}</span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.4rem] border border-dashed border-[var(--bureau-line-2)] bg-white/70 p-8 text-center">
              <Sparkles className="mx-auto text-[var(--bureau-teal)]" />
              <h2 className="mt-3 text-xl font-black text-[var(--bureau-ink)]">Olay bulunamadı</h2>
              <button type="button" onClick={() => setQuery("")} className="btn-primary mt-4" data-dark-button="true">
                Aramayı temizle
              </button>
            </div>
          )}
        </div>

        {selected ? (
          <aside className="relative overflow-hidden rounded-[1.8rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.92)] p-6 shadow-[var(--shadow-float)] xl:sticky xl:top-8 xl:self-start">
            <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl" style={{ background: selectedTone.glow }} />
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${selectedTone.badge}`}>{selected.date}</span>
                  <p className="mt-3 text-xs font-black uppercase tracking-[.16em] text-[var(--bureau-muted)]">Seçili kayıt</p>
                </div>
                <MapPinned className="text-[var(--bureau-teal)]" />
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-[-.045em] text-[var(--bureau-ink)]">{selected.title}</h2>
              <p className="mt-4 text-sm leading-8 text-[var(--bureau-copy)]">{selected.description}</p>

              <div className="mt-6 rounded-[1.25rem] border border-[var(--bureau-line)] bg-white/75 p-4">
                <p className="text-[11px] font-black uppercase tracking-[.16em] text-[var(--bureau-teal)]">İlişkili konu</p>
                <p className="mt-2 text-base font-black text-[var(--bureau-ink)]">{selected.topic?.title ?? "Genel Tarih"}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--bureau-copy)]">{selected.topic?.shortDescription ?? "Bu kayıt genel kronoloji bilgisini destekler."}</p>
              </div>

              <div className="mt-6 grid gap-2">
                {selected.topic ? (
                  <Link href={`/topics/${selected.topic.slug}`} className="btn-primary w-full" data-dark-button="true">
                    Konu anlatımını aç <ArrowRight size={16} />
                  </Link>
                ) : null}
                <Link href={selected.topic ? `/question-bank/${selected.topic.id}` : "/question-bank/all"} className="btn-ghost w-full">
                  İlgili testi çöz <FileQuestion size={16} />
                </Link>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
