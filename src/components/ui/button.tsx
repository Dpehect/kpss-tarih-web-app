"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "gold" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary: "border-[var(--navy-900)] bg-[var(--navy-900)] text-[var(--text-inverse)] shadow-[var(--shadow-sm)]",
  gold: "border-[var(--gold-500)] bg-[var(--gold-500)] text-[var(--navy-900)] shadow-[var(--shadow-gold)]",
  ghost: "border-[var(--border-soft)] bg-white/75 text-[var(--navy-900)] shadow-[var(--shadow-xs)]"
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-3 text-sm",
  lg: "min-h-14 px-7 py-4 text-base"
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border font-black transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(76,141,255,.35)]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <motion.a
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border font-black transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(76,141,255,.35)]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}
