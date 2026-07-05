import type { DailyStudyRecommendation } from "@/types/dashboard";

type RecommendedStudyPlanProps = {
  recommendations: DailyStudyRecommendation[];
};

const priorityLabel: Record<DailyStudyRecommendation["priority"], string> = {
  high: "Öncelikli",
  medium: "Dengeli",
  low: "Tamamlayıcı"
};

export function RecommendedStudyPlan({ recommendations }: RecommendedStudyPlanProps) {
  return (
    <section className="rounded-[2rem] border border-black/5 bg-neutral-950 p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.15)]">
      <p className="text-sm font-medium tracking-[0.18em] text-white/45 uppercase">Bugünkü akış</p>
      <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Ne çalışayım? sorusunu kaldır.</h3>

      <div className="mt-7 space-y-3">
        {recommendations.map((item) => (
          <a
            key={item.id}
            href={item.actionHref}
            className="block rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 transition hover:bg-white/[0.10]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                  {priorityLabel[item.priority]} · {item.estimatedMinutes} dk
                </span>
                <h4 className="mt-4 text-lg font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/62">{item.description}</p>
              </div>
              <span aria-hidden="true" className="text-white/40">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
