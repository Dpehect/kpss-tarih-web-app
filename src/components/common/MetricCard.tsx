import { cn } from "@/lib/cn";

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  tone?: "gold" | "turquoise" | "crimson";
};

const borderTone = {
  gold: "border-l-[var(--sage)]",
  turquoise: "border-l-[var(--navy)]",
  crimson: "border-l-[var(--terracotta)]"
};

export function MetricCard({ label, value, helper, tone = "gold" }: MetricCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-[var(--border)] border-l-2 bg-[var(--warm-white)] p-5 shadow-[var(--shadow-xs)]",
        borderTone[tone]
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--slate)]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--ink)]">
        {value}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--slate)]">
        {helper}
      </p>
    </article>
  );
}
