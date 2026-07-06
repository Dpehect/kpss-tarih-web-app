"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, MapPinned, MoveHorizontal } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { timelineEvents, topics } from "@/data/kpss-history";

export function TimelinePage() {
  const [selectedId, setSelectedId] = useState(timelineEvents[0]?.id ?? "");
  const selected = timelineEvents.find((event) => event.id === selectedId) ?? timelineEvents[0];

  const enriched = useMemo(
    () =>
      timelineEvents.map((event) => ({
        ...event,
        topicTitle: topics.find((topic) => topic.id === event.topicId)?.title ?? "Genel Tarih"
      })),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Temporal scanner"
        title="Tarih akışını tarayarak ilerle."
        description="Olayları tek tek ezberlemek yerine dönemler arası ilişkiyi görerek seç, incele ve bağlam kur."
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="lab-stage relative overflow-hidden rounded-[2.35rem] p-5 md:p-8">
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 1100 520" className="h-full w-full">
              <path d="M90 280 C210 190, 330 164, 490 205 C650 246, 760 140, 965 202" fill="none" stroke="rgba(255,250,240,.28)" strokeWidth="2" />
              <path d="M160 322 C340 290, 520 334, 720 285 C840 255, 910 276, 1010 330" fill="none" stroke="rgba(215,255,79,.70)" strokeWidth="2" strokeDasharray="12 16" />
            </svg>
          </div>

          <div className="relative z-10 mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="lab-kicker">Yatay zaman masası</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--lab-inverse)]">Sürükle, seç, sinyali oku.</h2>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[.08] px-4 py-2 text-sm font-black text-[var(--lab-inverse)]">
              <MoveHorizontal size={16} />
              Yatay kaydır
            </div>
          </div>

          <div className="relative z-10 overflow-x-auto pb-6 scrollbar-clean">
            <div className="flex min-w-[980px] snap-x items-stretch gap-4">
              {enriched.map((event, index) => {
                const active = event.id === selected?.id;

                return (
                  <motion.button
                    key={event.id}
                    type="button"
                    onClick={() => setSelectedId(event.id)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: .18, ease: "easeOut" }}
                    className={`group relative w-[230px] shrink-0 snap-start rounded-[1.5rem] border p-5 text-left transition ${
                      active
                        ? "border-[rgba(215,255,79,.80)] bg-[rgba(215,255,79,.14)] shadow-[0_24px_80px_rgba(215,255,79,.12)]"
                        : "border-white/10 bg-white/[.07] hover:bg-white/[.10]"
                    }`}
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-[var(--lab-acid)] text-sm font-black text-[var(--lab-ink)]">{index + 1}</span>
                    <p className="mt-6 text-xs font-black uppercase tracking-[.22em] text-[rgba(255,250,240,.62)]">{event.date}</p>
                    <h3 className="mt-3 text-xl font-black tracking-[-.04em] text-[var(--lab-inverse)]">{event.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[rgba(255,250,240,.74)]">{event.topicTitle}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {selected ? (
          <motion.aside
            key={selected.id}
            initial={{ opacity: 0, x: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="lab-card rounded-[2rem] p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--lab-ink)] text-[var(--lab-inverse)]">
                <CalendarClock size={20} />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[.22em] text-[var(--lab-cyan)]">{selected.date}</p>
                <p className="text-sm font-semibold text-[var(--lab-soft)]">Seçili sinyal</p>
              </div>
            </div>

            <h2 className="mt-7 text-4xl font-black tracking-[-.07em] text-[var(--lab-ink)]">{selected.title}</h2>
            <p className="mt-5 leading-8 text-[var(--lab-muted)]">{selected.description}</p>

            <div className="mt-7 rounded-[1.35rem] border border-[var(--lab-line)] bg-[rgba(255,252,245,.74)] p-4">
              <div className="flex items-center gap-2 text-sm font-black text-[var(--lab-ink)]">
                <MapPinned size={17} />
                İlişkili konu
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--lab-muted)]">{topics.find((topic) => topic.id === selected.topicId)?.title ?? "Genel Tarih"}</p>
            </div>
          </motion.aside>
        ) : null}
      </section>
    </div>
  );
}
