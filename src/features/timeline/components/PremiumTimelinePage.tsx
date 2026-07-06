"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, MapPinned } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { timelineEvents, topics } from "@/data/kpss-history";

export function PremiumTimelinePage() {
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
        eyebrow="Timeline"
        title="Tarih akışını müze vitrininde keşfet."
        description="Olayları tek tek ezberlemek yerine dönemler arası bağlantıyı görerek çalış."
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="museum-dark relative overflow-hidden rounded-[2.75rem] p-6 md:p-8">
          <div className="absolute inset-0 opacity-25">
            <svg viewBox="0 0 1100 520" className="h-full w-full">
              <path d="M90 280 C210 190, 330 164, 490 205 C650 246, 760 140, 965 202" fill="none" stroke="rgba(255,248,234,.28)" strokeWidth="2" />
              <path d="M160 322 C340 290, 520 334, 720 285 C840 255, 910 276, 1010 330" fill="none" stroke="rgba(201,162,39,.42)" strokeWidth="2" strokeDasharray="12 16" />
            </svg>
          </div>

          <div className="relative z-10 overflow-x-auto pb-6 scrollbar-clean">
            <div className="flex min-w-[980px] items-center gap-4">
              {enriched.map((event, index) => {
                const active = event.id === selected?.id;

                return (
                  <motion.button
                    key={event.id}
                    type="button"
                    onClick={() => setSelectedId(event.id)}
                    whileHover={{ y: -4 }}
                    className={`group relative w-[220px] shrink-0 rounded-[1.7rem] border p-4 text-left transition ${
                      active
                        ? "border-[rgba(201,162,39,.70)] bg-[rgba(201,162,39,.16)]"
                        : "border-white/10 bg-white/[.07] hover:bg-white/[.10]"
                    }`}
                  >
                    <span className="mb-5 grid size-10 place-items-center rounded-full bg-[var(--museum-gold)] text-sm font-black text-[var(--museum-navy-2)]">
                      {index + 1}
                    </span>
                    <p className="text-xs font-black uppercase tracking-[.22em] text-[rgba(255,248,234,.62)]">{event.date}</p>
                    <h3 className="mt-3 line-clamp-2 text-xl font-black tracking-[-.04em] text-[var(--museum-cream)]">{event.title}</h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[rgba(255,248,234,.74)]">{event.topicTitle}</p>
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
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2.25rem] border border-[rgba(11,18,32,.10)] bg-[rgba(255,248,234,.92)] p-6 text-[var(--museum-navy-2)] shadow-[var(--shadow-soft)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-[var(--museum-navy-2)] text-[var(--museum-cream)]">
                <CalendarClock size={20} />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[.22em] text-[#8d6500]">{selected.date}</p>
                <p className="text-sm font-semibold text-[#475569]">Seçili olay</p>
              </div>
            </div>

            <h2 className="mt-7 text-4xl font-black tracking-[-.07em] text-[var(--museum-navy-2)]">{selected.title}</h2>
            <p className="mt-5 leading-8 text-[#334155]">{selected.description}</p>

            <div className="mt-7 rounded-[1.5rem] border border-[rgba(11,18,32,.10)] bg-white/72 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-[var(--museum-navy-2)]">
                <MapPinned size={17} />
                İlişkili konu
              </div>
              <p className="mt-2 text-sm text-[#334155]">
                {topics.find((topic) => topic.id === selected.topicId)?.title ?? "Genel Tarih"}
              </p>
            </div>
          </motion.aside>
        ) : null}
      </section>
    </div>
  );
}
