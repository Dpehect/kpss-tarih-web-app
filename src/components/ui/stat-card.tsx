"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Tone = "gold" | "sky" | "mint" | "rose";

const iconClasses: Record<Tone, string> = {
  gold: "bg-[rgba(215,255,79,.42)] text-[var(--lab-ink)]",
  sky: "bg-[rgba(43,74,134,.13)] text-[var(--lab-blue)]",
  mint: "bg-[rgba(0,166,180,.14)] text-[var(--lab-cyan)]",
  rose: "bg-[rgba(180,35,54,.12)] text-[var(--lab-red)]"
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
      data-lab-card="true"
      whileHover={{ y: -7, scale: 1.004 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("lab-card relative overflow-hidden rounded-[1.65rem] p-6", className)}
    >
      <div className={cn("grid size-12 place-items-center rounded-[1rem]", iconClasses[tone])}>{icon}</div>
      <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[var(--lab-soft)]">{label}</p>
      <p className="mt-3 text-4xl font-black tracking-[-0.08em] text-[var(--lab-ink)] md:text-5xl">{value}</p>
      <p className="mt-3 text-sm font-medium leading-6 text-[var(--lab-muted)]">{helper}</p>
    </motion.article>
  );
}
