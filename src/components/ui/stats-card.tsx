import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type StatsCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
  tone?: "gold" | "sky" | "mint" | "rose";
};

const toneClasses = {
  gold: "from-[var(--accent-gold-soft)]",
  sky: "from-[var(--accent-sky-soft)]",
  mint: "from-[var(--accent-mint-soft)]",
  rose: "from-[var(--accent-rose-soft)]"
};

const iconClasses = {
  gold: "bg-[var(--accent-gold-soft)] text-[color-mix(in_srgb,var(--accent-gold),#6b4d10_34%)]",
  sky: "bg-[var(--accent-sky-soft)] text-[var(--accent-sky)]",
  mint: "bg-[var(--accent-mint-soft)] text-[color-mix(in_srgb,var(--accent-mint),#0f513f_34%)]",
  rose: "bg-[var(--accent-rose-soft)] text-[var(--accent-rose)]"
};

export function StatsCard({ icon, label, value, helper, tone = "gold" }: StatsCardProps) {
  return (
    <motion.article
      data-premium-reveal
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-gradient-to-br to-transparent p-6 shadow-[var(--shadow-md)] backdrop-blur-2xl",
        toneClasses[tone]
      )}
    >
      <div className="absolute -right-12 -top-12 size-36 rounded-full bg-current opacity-[0.035] blur-3xl" />
      <div className={cn("grid size-12 place-items-center rounded-2xl", iconClasses[tone])}>
        {icon}
      </div>
      <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
        {label}
      </p>
      <p className="mt-3 text-4xl font-black tracking-[-0.08em] text-[var(--foreground)] md:text-5xl">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{helper}</p>
    </motion.article>
  );
}
