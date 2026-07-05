import type { PerformanceRingMetric } from "@/types/dashboard";
import { getRingProgress, getRingLabel } from "@/features/dashboard/lib/ring";

type ProgressRingProps = {
  metric: PerformanceRingMetric;
  size?: number;
  stroke?: number;
};

const toneClassMap: Record<PerformanceRingMetric["tone"], string> = {
  sky: "stroke-sky-400",
  gold: "stroke-amber-400",
  mint: "stroke-emerald-400",
  rose: "stroke-rose-400",
  violet: "stroke-violet-400"
};

export function ProgressRing({ metric, size = 164, stroke = 14 }: ProgressRingProps) {
  const progress = getRingProgress(metric);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <figure
      className="group rounded-[2rem] border border-black/5 bg-white/65 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl"
      aria-label={getRingLabel(metric)}
    >
      <div className="relative mx-auto grid place-items-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} role="img" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="stroke-black/5"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={`${toneClassMap[metric.tone]} transition-all duration-700`}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
        </svg>

        <div className="absolute text-center">
          <p className="text-3xl font-semibold tracking-[-0.06em] text-neutral-950">
            {Math.round(progress * 100)}%
          </p>
          <p className="mt-1 text-xs text-neutral-500">{metric.label}</p>
        </div>
      </div>

      <figcaption className="mt-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-neutral-500">{metric.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {metric.value}
              <span className="ml-1 text-sm font-normal text-neutral-500">/ {metric.target} {metric.unit}</span>
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-neutral-600">{metric.helper}</p>
      </figcaption>
    </figure>
  );
}
