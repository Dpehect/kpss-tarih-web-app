"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type PremiumCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  interactive?: boolean;
  tone?: "default" | "elevated" | "light" | "dark" | "accent";
};

const tones: Record<NonNullable<PremiumCardProps["tone"]>, string> = {
  default: "border-[var(--sb-line)] bg-[var(--sb-surface)] text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)]",
  elevated: "border-[var(--sb-line)] bg-[var(--sb-surface-strong)] text-[var(--sb-text)] shadow-[var(--sb-shadow-md)]",
  light: "border-[var(--sb-line)] bg-white/92 text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)]",
  dark: "border-white/10 bg-[linear-gradient(135deg,#0f172a,#111827_52%,#1e293b)] text-white shadow-[var(--sb-shadow-md)]",
  accent: "border-amber-500/20 bg-[linear-gradient(135deg,rgba(217,119,6,.12),rgba(255,255,255,.94))] text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)]",
};

export function PremiumCard({
  children,
  className,
  interactive = false,
  tone = "default",
  ...props
}: PremiumCardProps) {
  return (
    <motion.div
      data-tone={tone === "dark" ? "dark" : "light"}
      data-readable={tone === "dark" ? undefined : "light"}
      whileHover={interactive ? { y: -4 } : undefined}
      whileTap={interactive ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-2xl border p-5 backdrop-blur-xl transition-colors duration-200",
        tones[tone],
        interactive && "cursor-pointer hover:border-[rgba(30,58,138,.28)] hover:shadow-[var(--sb-shadow-md)]",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
