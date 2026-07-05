import type { DashboardSnapshot } from "@/types/dashboard";

type WeakTopicsPanelProps = {
  topics: DashboardSnapshot["weakTopics"];
};

export function WeakTopicsPanel({ topics }: WeakTopicsPanelProps) {
  return (
    <section className="rounded-[2rem] border border-black/5 bg-white/65 p-6 shadow-sm backdrop-blur-xl">
      <p className="text-sm font-medium tracking-[0.18em] text-neutral-500 uppercase">Zayıf sinyaller</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight">Tekrar öncelikleri</h3>

      <div className="mt-6 space-y-4">
        {topics.map((topic) => (
          <article key={topic.topicId} className="rounded-[1.5rem] border border-black/5 bg-white/70 p-4">
            <div className="flex items-center justify-between gap-4">
              <h4 className="font-semibold tracking-tight">{topic.title}</h4>
              <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs text-neutral-600">
                {Math.round(topic.masteryScore * 100)}%
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/[0.05]">
              <div
                className="h-full rounded-full bg-neutral-950"
                style={{ width: `${Math.round(topic.masteryScore * 100)}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-600">{topic.reason}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
