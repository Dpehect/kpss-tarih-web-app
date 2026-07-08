"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type PremiumCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  interactive?: boolean;
  tone?: "default" | "elevated" | "dark" | "accent";
};

const tones = {
  default: "border-[var(--sb-line)] bg-[var(--sb-surface)] text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)]",
  elevated: "border-[var(--sb-line)] bg-[var(--sb-surface-strong)] text-[var(--sb-text)] shadow-[var(--sb-shadow-md)]",
  dark: "border-white/10 bg-[linear-gradient(135deg,#0f172a,#111827_54%,#1e293b)] text-white shadow-[var(--sb-shadow-lg)]",
  accent: "border-amber-500/20 bg-[linear-gradient(135deg,rgba(217,119,6,.12),rgba(255,255,255,.88))] text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)]",
};

export function PremiumCard({ children, className, interactive = false, tone = "default", ...props }: PremiumCardProps) {
  return (
    <motion.div
      initial={props.initial ?? { opacity: 0, y: 10 }}
      animate={props.animate ?? { opacity: 1, y: 0 }}
      transition={props.transition ?? { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      whileHover={interactive ? { y: -4 } : undefined}
      className={cn(
        "relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl transition-colors duration-300",
        tones[tone],
        interactive && "hover:border-blue-700/25 hover:shadow-[var(--sb-shadow-md)]",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
