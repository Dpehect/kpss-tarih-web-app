"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Tone = "gold" | "sky" | "mint" | "rose";

const toneClasses: Record<Tone, string> = {
  gold: "from-[rgba(201,162,39,.18)]",
  sky: "from-[rgba(76,141,255,.14)]",
  mint: "from-[rgba(88,191,163,.15)]",
  rose: "from-[rgba(110,30,46,.13)]"
};

const iconClasses: Record<Tone, string> = {
  gold: "bg-[rgba(201,162,39,.18)] text-[#8d6500]",
  sky: "bg-[rgba(76,141,255,.15)] text-[#1d4ed8]",
  mint: "bg-[rgba(88,191,163,.16)] text-[#047857]",
  rose: "bg-[rgba(110,30,46,.13)] text-[#7f1d1d]"
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
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-gradient-to-br to-white/80 p-6 text-[var(--ink)] shadow-[var(--shadow-sm)] backdrop-blur-2xl",
        toneClasses[tone],
        className
      )}
    >
      <div className="absolute -right-12 -top-12 size-36 rounded-full bg-current opacity-[0.035] blur-3xl" />
      <div className={cn("grid size-12 place-items-center rounded-2xl", iconClasses[tone])}>
        {icon}
      </div>
      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slate)]">
        {label}
      </p>
      <p className="mt-3 text-4xl font-semibold tracking-[-0.08em] text-[var(--ink)] md:text-5xl">
        {value}
      </p>
      <p className="mt-3 text-sm font-medium leading-6 text-[var(--graphite)]">{helper}</p>
    </motion.article>
  );
}
