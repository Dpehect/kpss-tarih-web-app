import { cn } from "@/lib/cn";

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  tone?: "gold" | "turquoise" | "crimson";
};

const toneClasses = {
  gold: "from-[var(--accent-gold-soft)] to-transparent",
  turquoise: "from-[var(--accent-sky-soft)] to-transparent",
  crimson: "from-[var(--accent-rose-soft)] to-transparent"
};

const orbClasses = {
  gold: "bg-[var(--accent-gold)]",
  turquoise: "bg-[var(--accent-sky)]",
  crimson: "bg-[var(--accent-rose)]"
};

export function MetricCard({ label, value, helper, tone = "gold" }: MetricCardProps) {
  return (
    <article
      data-premium-reveal
      className={cn(
        "premium-hover group relative overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-gradient-to-br p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl",
        toneClasses[tone]
      )}
    >
      <span
        className={cn(
          "absolute right-5 top-5 size-2.5 rounded-full shadow-[0_0_40px_currentColor]",
          orbClasses[tone]
        )}
      />
      <div className="absolute -right-12 -top-12 size-36 rounded-full bg-current opacity-[0.04] blur-3xl transition group-hover:opacity-[0.08]" />

      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
        {label}
      </p>
      <p className="mt-5 text-4xl font-black tracking-[-0.08em] text-[var(--foreground)] md:text-5xl">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
        {helper}
      </p>
    </article>
  );
}
