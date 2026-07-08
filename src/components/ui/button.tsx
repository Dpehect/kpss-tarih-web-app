"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "gold" | "ghost" | "accent" | "danger";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

// motion.button ile uyumlu tip
type ButtonProps = BaseProps & Omit<HTMLMotionProps<"button">, "children">;

type ButtonLinkProps = BaseProps & ComponentPropsWithoutRef<typeof Link>;

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  gold: "btn-accent",
  accent: "btn-accent",
  ghost: "btn-ghost",
  danger: "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-600 shadow-[var(--sb-shadow-sm)] transition hover:-translate-y-0.5 hover:bg-red-500/15",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3.5 py-1.5 text-[13px]",
  md: "min-h-10 px-4 py-2 text-[13px]",
  lg: "min-h-11 px-5 py-2.5 text-[14px]",
};

export function Button({ 
  variant = "primary", 
  size = "md", 
  loading = false, 
  disabled, 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled || loading ? undefined : { y: -1 }}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      disabled={disabled || loading}
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </motion.button>
  );
}

export function ButtonLink({ 
  variant = "primary", 
  size = "md", 
  loading = false, 
  className, 
  children, 
  ...props 
}: ButtonLinkProps) {
  return (
    <motion.span 
      whileHover={{ y: -1 }} 
      whileTap={{ scale: 0.98 }} 
      transition={{ duration: 0.18, ease: "easeOut" }} 
      className="inline-flex"
    >
      <Link className={cn(variants[variant], sizes[size], className)} {...props}>
        {loading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </Link>
    </motion.span>
  );
}
