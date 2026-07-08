import { ArrowRight, CalendarDays, Clock, Flag, Landmark, Layers3, Milestone, Sparkles } from "lucide-react";
import type { TimelineEvent, Topic } from "@/types/study";

const toneClasses: Record<TimelineEvent["tone"], string> = {
  gold: "bg-[#fff7ed] text-[#9a3412] border-[#fed7aa]",
  turquoise: "bg-[#ecfeff] text-[#0e7490] border-[#a5f3fc]",
  crimson: "bg-[#fff1f2] text-[#be123c] border-[#fecdd3]",
  parchment: "bg-[#fffbeb] text-[#92400e] border-[#fde68a]"
};

export function TimelinePage({ events, topics }: { events: TimelineEvent[]; topics: Topic[] }) {
  const topicMap = new Map(topics.map((topic) => [topic.id, topic.title]));
  const grouped = topics
    .map((topic) => ({
      topic,
      events: events.filter((event) => event.topicId === topic.id)
    }))
    .filter((group) => group.events.length > 0);

  const highlighted = events.slice(0, 4);

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-white/75 bg-white/78 p-6 shadow-[0_32px_105px_rgba(16,24,40,.12)] backdrop-blur-xl md:p-8">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#fed7aa]/70 blur-3xl" />
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute bottom-[-10rem] left-20 size-80 rounded-full bg-[#bfdbfe]/70 blur-3xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Tarih rotası</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] text-[#101828] md:text-7xl">
              Olayları dönemlere bağla.
            </h1>
            <p className="mt-5 max-w-3xl text-sm font-bold leading-7 text-[#475467]">
              Kronoloji ezberi yerine olay, dönem ve sonuç ilişkisini birlikte gör. Her olay ilgili konu başlığıyla eşleşir.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Metric icon={<CalendarDays size={18} />} label="Olay" value={events.length} />
            <Metric icon={<Layers3 size={18} />} label="Dönem" value={grouped.length || topics.length} />
            <Metric icon={<Clock size={18} />} label="Akış" value="Kronolojik" />
            <Metric icon={<Flag size={18} />} label="Odak" value="KPSS" />
          </div>
        </div>
      </section>

      {highlighted.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {highlighted.map((event) => (
            <article key={event.id} className={`rounded-[1.7rem] border p-4 shadow-[0_18px_55px_rgba(16,24,40,.07)] ${toneClasses[event.tone]}`}>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-black">
                <Sparkles size={13} />
                {event.date}
              </div>
              <h2 className="text-lg font-black tracking-[-0.03em]">{event.title}</h2>
              <p className="mt-2 text-xs font-bold leading-5 opacity-80">{event.description}</p>
            </article>
          ))}
        </section>
      ) : null}

      <section className="grid gap-5">
        {grouped.map((group, groupIndex) => (
          <article key={group.topic.id} className="rounded-[2.2rem] border border-white/75 bg-white/80 p-5 shadow-[0_20px_65px_rgba(16,24,40,.08)] backdrop-blur-xl">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#b4232a]">Dönem {String(groupIndex + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.055em] text-[#101828]">{group.topic.title}</h2>
              </div>
              <span className="rounded-full bg-[#101828] px-4 py-2 text-xs font-black text-white">
                {group.events.length} olay
              </span>
            </div>

            <div className="relative grid gap-4">
              <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute bottom-5 left-[1.15rem] top-5 hidden w-px bg-[#e4d8c8] md:block" />
              {group.events.map((event) => (
                <div key={event.id} className="relative grid gap-3 rounded-[1.5rem] border border-[#e4d8c8] bg-[#fffaf3] p-4 md:grid-cols-[120px_1fr]">
                  <div className="flex items-start gap-3">
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-2xl bg-[#101828] text-white shadow-[0_10px_28px_rgba(16,24,40,.14)]">
                      <Milestone size={17} />
                    </span>
                    <div className="md:hidden">
                      <p className="text-xs font-black text-[#b4232a]">{event.date}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 hidden items-center gap-2 md:flex">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#b4232a]">{event.date}</span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#667085]">{topicMap.get(event.topicId) ?? group.topic.title}</span>
                    </div>
                    <h3 className="text-xl font-black tracking-[-0.035em] text-[#101828]">{event.title}</h3>
                    <p className="mt-2 text-sm font-bold leading-7 text-[#475467]">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      {events.length === 0 ? (
        <section className="rounded-[2rem] border border-[#f7b2b7] bg-[#fff1f2] p-6 text-sm font-black text-[#b4232a]">
          Timeline verisi bulunamadı. Supabase content_timeline_events tablosunu kontrol et.
        </section>
      ) : null}
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-white/80 bg-white/84 p-4 shadow-[0_16px_44px_rgba(16,24,40,.08)]">
      <div className="mb-3 inline-grid size-10 place-items-center rounded-2xl bg-[#101828] text-white">{icon}</div>
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#667085]">{label}</p>
      <p className="mt-1 text-2xl font-black text-[#101828]">{value}</p>
    </div>
  );
}
