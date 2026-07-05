import { cn } from "@/lib/cn";

/**
 * Dashboard ve modüllerde kullanılan küçük metrik kartı.
 */
type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  tone?: "gold" | "turquoise" | "crimson";
  className?: string;
};

const toneMap = {
  gold: "text-[#f6c465]",
  turquoise: "text-[#52f2d0]",
  crimson: "text-[#ff7968]"
};

export function MetricCard({ label, value, helper, tone = "gold", className }: MetricCardProps) {
  return (
    <article className={cn("rounded-[2rem] parchment-surface p-5", className)}>
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ead7b7]/46">{label}</p>
      <p className={cn("mt-3 text-3xl font-black tracking-[-0.06em]", toneMap[tone])}>{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#ead7b7]/62">{helper}</p>
    </article>
  );
}
