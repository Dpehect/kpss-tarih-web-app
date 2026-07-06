"use client";

import { ArrowRight, CalendarDays, Clock3, ListChecks } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { Card } from "@/components/ui/card";
import { recommendations, topics } from "@/data/kpss-history";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function StudyPlanPage() {
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const remainingTopics = topics.filter((topic) => !completedTopicIds.includes(topic.id)).slice(0, 6);
  const totalMinutes = recommendations.reduce((sum, item) => sum + item.minutes, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Çalışma Planı"
        title="Bugünkü akışı gereksiz karmaşadan arındır."
        description="Önerilen çalışma blokları ve tamamlanmamış konular tek bir düzenli plan halinde görünür."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <PlanMetric icon={<CalendarDays size={20} />} label="Öneri" value={String(recommendations.length)} helper="Hazır çalışma bloğu" />
        <PlanMetric icon={<Clock3 size={20} />} label="Toplam süre" value={`${totalMinutes} dk`} helper="Önerilen mikro akış" />
        <PlanMetric icon={<ListChecks size={20} />} label="Kalan konu" value={String(remainingTopics.length)} helper="İlk sıradaki hedefler" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <p className="kicker">Önerilen Akış</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--navy-900)]">Bugün ne çalışayım?</h2>
          <div className="mt-7 space-y-3">
            {recommendations.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                className="group flex items-center justify-between gap-4 rounded-[1.35rem] border border-[var(--border-soft)] bg-white/74 p-4 transition hover:bg-white"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--navy-900)] text-sm font-black text-[var(--text-inverse)]">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-black text-[var(--navy-900)]">{item.title}</span>
                    <span className="block text-sm text-[var(--text-secondary)]">{item.minutes} dk · Öncelik: {item.priority}</span>
                  </span>
                </span>
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </Card>

        <Card>
          <p className="kicker">Kalan Konular</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--navy-900)]">Sıradaki konu sırası</h2>
          <div className="mt-7 grid gap-3">
            {remainingTopics.map((topic) => (
              <a
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="rounded-[1.35rem] border border-[var(--border-soft)] bg-white/74 p-4 transition hover:bg-white"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8d6500]">{topic.era}</p>
                <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-[var(--navy-900)]">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{topic.shortDescription}</p>
              </a>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

function PlanMetric({ icon, label, value, helper }: { icon: React.ReactNode; label: string; value: string; helper: string }) {
  return (
    <div className="rounded-[2rem] border border-[var(--border-soft)] bg-white/74 p-5 shadow-[var(--shadow-xs)] backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--text-muted)]">{label}</p>
        <span className="grid size-10 place-items-center rounded-2xl bg-[var(--gold-soft)] text-[#8d6500]">{icon}</span>
      </div>
      <p className="mt-4 text-4xl font-black tracking-[-0.08em] text-[var(--navy-900)]">{value}</p>
      <p className="mt-2 text-sm font-semibold text-[var(--text-secondary)]">{helper}</p>
    </div>
  );
}
