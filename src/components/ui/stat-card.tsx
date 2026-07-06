"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Tone = "gold" | "sky" | "mint" | "rose";

const iconClasses: Record<Tone, string> = {
  gold: "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]",
  sky: "bg-[var(--bureau-blue-soft)] text-[var(--bureau-blue)]",
  mint: "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]",
  rose: "bg-[var(--bureau-rust-soft)] text-[var(--bureau-rust)]"
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
      data-bureau-card="true"
      whileHover={{ y: -6, scale: 1.004 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("bureau-card relative overflow-hidden rounded-[1.65rem] p-6", className)}
    >
      <div className={cn("grid size-12 place-items-center rounded-[1rem]", iconClasses[tone])}>{icon}</div>
      <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-3 text-4xl font-black tracking-[-0.08em] text-[var(--bureau-ink)] md:text-5xl">{value}</p>
      <p className="mt-3 text-sm font-medium leading-6 text-[var(--bureau-copy)]">{helper}</p>
    </motion.article>
  );
}
