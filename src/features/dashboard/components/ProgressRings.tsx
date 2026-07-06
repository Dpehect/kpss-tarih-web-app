/**
 * Progress ring grubu.
 * SVG kullanıldığı için ekstra grafik kütüphanesine gerek kalmadan performanslı çalışır.
 */
type Ring = {
  label: string;
  value: number;
  color: string;
};

export function ProgressRings({ rings }: { rings: Ring[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {rings.map((ring) => {
        const radius = 58;
        const circumference = 2 * Math.PI * radius;
        const safeValue = Math.max(0, Math.min(100, ring.value));
        const offset = circumference * (1 - safeValue / 100);

        return (
          <article key={ring.label} className="rounded-xl parchment-surface p-6">
            <div className="flex items-center gap-5">
              <svg width="140" height="140" viewBox="0 0 140 140" aria-label={`${ring.label} ilerleme ${safeValue}%`}>
                <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,248,232,0.1)" strokeWidth="12" />
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  transform="rotate(-90 70 70)"
                />
              </svg>
              <div>
                <p className="text-sm uppercase tracking-wider text-[#ead7b7]/48">{ring.label}</p>
                <p className="mt-2 text-4xl font-semibold tracking-tight">{safeValue}%</p>
                <p className="mt-2 text-sm text-[#ead7b7]/62">Güncel ilerleme</p>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
