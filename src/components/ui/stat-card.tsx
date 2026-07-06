"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Tone = "gold" | "sky" | "mint" | "rose";

const iconClasses: Record<Tone, string> = {
  gold: "bg-[var(--atlas-copper-soft)] text-[var(--atlas-copper)]",
  sky: "bg-[var(--atlas-blue-soft)] text-[var(--atlas-blue)]",
  mint: "bg-[var(--atlas-teal-soft)] text-[var(--atlas-teal)]",
  rose: "bg-[var(--atlas-wine-soft)] text-[var(--atlas-wine)]"
};

export function StatCard({
  icon,
  label,
  value,
  helper,
  tone = "gold",
  className
}: {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <motion.article
      data-atlas-card="true"
      whileHover={{ y: -6, scale: 1.006 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("atlas-card relative overflow-hidden rounded-[1.65rem] p-6", className)}
    >
      <div className={cn("grid size-12 place-items-center rounded-[1rem]", iconClasses[tone])}>{icon}</div>
      <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[var(--atlas-muted)]">{label}</p>
      <p className="mt-3 text-4xl font-black tracking-[-0.08em] text-[var(--atlas-ink)] md:text-5xl">{value}</p>
      <p className="mt-3 text-sm font-medium leading-6 text-[var(--text-secondary)]">{helper}</p>
    </motion.article>
  );
}
