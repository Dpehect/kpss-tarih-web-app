"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "accent" | "gold" | "ghost" | "light" | "outline" | "secondary";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseProps &
  Omit<HTMLMotionProps<"button">, keyof BaseProps | "children"> &
  ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = BaseProps &
  Omit<HTMLMotionProps<"a">, keyof BaseProps | "children"> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClasses: Record<Variant, string> = {
  primary: "btn-primary bg-[var(--bureau-ink,#0e1117)] text-[var(--bureau-inverse,#fffaf2)] border-[var(--bureau-ink,#0e1117)]",
  dark: "btn-dark bg-[var(--bureau-ink,#0e1117)] text-[var(--bureau-inverse,#fffaf2)] border-[var(--bureau-ink,#0e1117)]",
  accent: "btn-accent bg-[var(--bureau-teal,#047e89)] text-[var(--bureau-inverse,#fffaf2)] border-[var(--bureau-teal,#047e89)]",
  gold: "btn-accent bg-[var(--bureau-teal,#047e89)] text-[var(--bureau-inverse,#fffaf2)] border-[var(--bureau-teal,#047e89)]",
  ghost: "btn-ghost bg-[rgba(255,250,242,.88)] text-[var(--bureau-ink,#0e1117)] border-[var(--bureau-line,rgba(14,17,23,.12))]",
  light: "btn-light bg-[rgba(255,250,242,.92)] text-[var(--bureau-ink,#0e1117)] border-[var(--bureau-line,rgba(14,17,23,.12))]",
  outline: "btn-outline bg-transparent text-[var(--bureau-ink,#0e1117)] border-[var(--bureau-line-2,rgba(14,17,23,.18))]",
  secondary: "btn-light bg-[rgba(246,239,227,.86)] text-[var(--bureau-ink,#0e1117)] border-[var(--bureau-line,rgba(14,17,23,.12))]",
};

const sizeClasses: Record<Size, string> = {
  sm: "min-h-9 px-3.5 py-1.5 text-[13px]",
  md: "min-h-10 px-4 py-2 text-[13px]",
  lg: "min-h-11 px-5 py-2.5 text-[14px]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-[14px] border font-[780] tracking-[-0.01em] shadow-[var(--shadow-paper,0_8px_24px_rgba(14,17,23,.045))] transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-55 [&_svg]:size-4 [&_svg]:shrink-0 [&_*]:text-current";

const darkVariants = new Set<Variant>(["primary", "dark", "accent", "gold"]);
const hoverAnim = { y: -1 };
const tapAnim = { scale: 0.985 };
const springTransition = { duration: 0.2, ease: "easeOut" as const };

function contrastAttrs(variant: Variant) {
  const surface = darkVariants.has(variant) ? "dark" : "light";
  return {
    "data-button-surface": surface,
    "data-dark-button": surface === "dark" ? "true" : undefined,
    "data-light-button": surface === "light" ? "true" : undefined,
  } as const;
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={hoverAnim}
      whileTap={tapAnim}
      transition={springTransition}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...contrastAttrs(variant)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function ButtonLink({ variant = "primary", size = "md", className, children, ...props }: ButtonLinkProps) {
  return (
    <motion.a
      whileHover={hoverAnim}
      whileTap={tapAnim}
      transition={springTransition}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...contrastAttrs(variant)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
