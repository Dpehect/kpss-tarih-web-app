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
        eyebrow="Zaman dosyası"
        title="Olayları kronolojik iz olarak oku."
        description="Tek tek ezberlemek yerine olayları tarih, bağlam ve konu bağlantısıyla incele."
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="bureau-stage relative overflow-hidden rounded-xl p-5 md:p-8">
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 1100 520" className="h-full w-full">
              <path d="M90 280 C210 190, 330 164, 490 205 C650 246, 760 140, 965 202" fill="none" stroke="rgba(255,250,242,.28)" strokeWidth="2" />
              <path d="M160 322 C340 290, 520 334, 720 285 C840 255, 910 276, 1010 330" fill="none" stroke="rgba(4,126,137,.70)" strokeWidth="2" strokeDasharray="12 16" />
            </svg>
          </div>

          <div className="relative z-10 mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="bureau-kicker">Yatay kayıt masası</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Sürükle, seç, bağı oku.</h2>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[.08] px-4 py-2 text-sm font-semibold text-white">
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
                    className={`group relative w-[230px] shrink-0 snap-start rounded-xl border p-5 text-left transition ${
                      active
                        ? "border-[rgba(4,126,137,.70)] bg-[rgba(4,126,137,.16)] shadow-[0_24px_80px_rgba(4,126,137,.12)]"
                        : "border-white/10 bg-white/[.07] hover:bg-white/[.10]"
                    }`}
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-[var(--sage)] text-sm font-semibold text-white">{index + 1}</span>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/50">{event.date}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{event.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">{event.topicTitle}</p>
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
            className="bureau-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--ink)] text-white">
                <CalendarClock size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--sage)]">{selected.date}</p>
                <p className="text-sm font-semibold text-[var(--slate)]">Seçili kayıt</p>
              </div>
            </div>

            <h2 className="mt-7 text-4xl font-semibold tracking-[-.07em] text-[var(--ink)]">{selected.title}</h2>
            <p className="mt-5 leading-8 text-[var(--graphite)]">{selected.description}</p>

            <div className="mt-7 rounded-xl border border-[var(--border)] bg-[rgba(255,250,242,.76)] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                <MapPinned size={17} />
                İlişkili konu
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--graphite)]">{topics.find((topic) => topic.id === selected.topicId)?.title ?? "Genel Tarih"}</p>
            </div>
          </motion.aside>
        ) : null}
      </section>
    </div>
  );
}
