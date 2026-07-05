import type { DashboardSnapshot } from "@/types/dashboard";

type WeeklyTrendProps = {
  trend: DashboardSnapshot["weeklyTrend"];
};

export function WeeklyTrend({ trend }: WeeklyTrendProps) {
  const maxQuestions = Math.max(...trend.map((day) => day.questionsSolved), 1);

  return (
    <section className="rounded-[2rem] border border-black/5 bg-white/65 p-6 shadow-sm backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-[0.18em] text-neutral-500 uppercase">Haftalık ritim</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Çalışma temposu</h3>
        </div>
        <p className="rounded-full bg-neutral-950 px-3 py-1 text-xs text-white">
          son 7 gün
        </p>
      </div>

      <div className="mt-8 flex h-56 items-end gap-3">
        {trend.map((day) => {
          const height = Math.max(16, (day.questionsSolved / maxQuestions) * 100);
          return (
            <div key={day.dayLabel} className="flex flex-1 flex-col items-center gap-3">
              <div className="flex h-40 w-full items-end rounded-full bg-black/[0.035] p-1">
                <div
                  className="w-full rounded-full bg-neutral-950 transition-all duration-700"
                  style={{ height: `${height}%` }}
                  aria-label={`${day.dayLabel}: ${day.questionsSolved} soru`}
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-neutral-900">{day.dayLabel}</p>
                <p className="text-[11px] text-neutral-500">{Math.round(day.accuracy * 100)}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
