import { cn } from "@/lib/cn";

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  tone?: "gold" | "turquoise" | "crimson";
};

const toneClasses = {
  gold: "border-[#c9912f]/20 bg-[#fffaf0]",
  turquoise: "border-[#2447d8]/18 bg-[#f4f7ff]",
  crimson: "border-[#be684b]/20 bg-[#fff4ef]"
};

const dotClasses = {
  gold: "bg-[#c9912f]",
  turquoise: "bg-[#2447d8]",
  crimson: "bg-[#be684b]"
};

export function MetricCard({ label, value, helper, tone = "gold" }: MetricCardProps) {
  return (
    <article className={cn(
      "group relative overflow-hidden rounded-[1.8rem] border p-5 shadow-[0_18px_60px_rgba(18,24,38,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(18,24,38,0.12)]",
      toneClasses[tone]
    )}>
      <span className={cn("absolute right-5 top-5 size-2.5 rounded-full", dotClasses[tone])} />
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#425066]/70">{label}</p>
      <p className="mt-5 text-4xl font-black tracking-[-0.08em] text-[#111827]">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[#425066]">{helper}</p>
    </article>
  );
}
