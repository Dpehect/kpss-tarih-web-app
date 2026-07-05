import type { QuestionAttempt } from "@/types/study";

/**
 * Haftalık trend grafiği.
 * Çözülen soru denemelerini son 7 gün içinde gruplar.
 */
export function WeeklyTrend({ attempts }: { attempts: QuestionAttempt[] }) {
  const days = buildLastSevenDays(attempts);
  const max = Math.max(...days.map((d) => d.value), 1);

  return (
    <section className="rounded-[2rem] parchment-surface p-6">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#f6c465]">Haftalık Trend</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">Çözülen soru ritmi</h2>
      <div className="mt-8 flex h-64 items-end gap-3">
        {days.map((day) => (
          <div key={day.day} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-48 w-full items-end rounded-full bg-white/[0.06] p-1">
              <div
                className="w-full rounded-full bg-gradient-to-t from-[#f2c15f] to-[#52f2d0]"
                style={{ height: `${Math.max(8, (day.value / max) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-[#ead7b7]/62">{day.day}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function buildLastSevenDays(attempts: QuestionAttempt[]) {
  const formatter = new Intl.DateTimeFormat("tr-TR", { weekday: "short" });
  const now = new Date();

  return Array.from({ length: 7 }).map((_, reverseIndex) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - reverseIndex));
    const key = date.toISOString().slice(0, 10);
    const value = attempts.filter((attempt) => attempt.answeredAt.slice(0, 10) === key).length;

    return {
      day: formatter.format(date),
      value
    };
  });
}
