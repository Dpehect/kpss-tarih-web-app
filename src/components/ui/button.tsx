"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "gold" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseProps & Omit<HTMLMotionProps<"button">, keyof BaseProps>;
type ButtonLinkProps = BaseProps & Omit<HTMLMotionProps<"a">, keyof BaseProps>;

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  gold: "btn-gold",
  ghost: "btn-ghost"
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
}: ButtonProps) {
  const isDark = variant === "primary";

  return (
    <motion.button
      data-dark-button={isDark ? "true" : undefined}
      whileHover={{ y: -2, scale: 1.012 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn("transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(36,63,115,.35)]", variants[variant], sizes[size], className)}
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
}: ButtonLinkProps) {
  const isDark = variant === "primary";

  return (
    <motion.a
      data-dark-button={isDark ? "true" : undefined}
      whileHover={{ y: -2, scale: 1.012 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn("transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(36,63,115,.35)]", variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
