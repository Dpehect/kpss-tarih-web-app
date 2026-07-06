"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "gold" | "ghost" | "accent";
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
  gold: "btn-accent",
  ghost: "btn-ghost",
  accent: "btn-accent"
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3.5 py-1.5 text-[13px]",
  md: "min-h-10 px-4 py-2 text-[13px]",
  lg: "min-h-11 px-5 py-2.5 text-[14px]"
};

const hoverAnim = { y: -1 };
const tapAnim = { scale: 0.98 };
const springTransition = { duration: 0.2, ease: "easeOut" as const };

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const isDark = variant === "primary" || variant === "gold" || variant === "accent";

  return (
    <motion.button
      data-dark-button={isDark ? "true" : undefined}
      whileHover={hoverAnim}
      whileTap={tapAnim}
      transition={springTransition}
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function ButtonLink({ variant = "primary", size = "md", className, children, ...props }: ButtonLinkProps) {
  const isDark = variant === "primary" || variant === "gold" || variant === "accent";

  return (
    <motion.a
      data-dark-button={isDark ? "true" : undefined}
      whileHover={hoverAnim}
      whileTap={tapAnim}
      transition={springTransition}
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
