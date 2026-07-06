"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  interactive?: boolean;
};

export function Card({ children, className, interactive = false, ...props }: CardProps) {
  const Component = interactive ? motion.div : "div";

  return (
    <Component
      whileHover={interactive ? { y: -5, scale: 1.01 } : undefined}
      transition={interactive ? { duration: 0.22, ease: [0.22, 1, 0.36, 1] } : undefined}
      className={cn(
        "rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-white/78 p-6 text-[var(--text-primary)] shadow-[var(--shadow-sm)] backdrop-blur-2xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-2xl font-black tracking-[-0.055em] text-[var(--navy-900)]", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-2 text-sm font-medium leading-7 text-[var(--text-secondary)]", className)}>
      {children}
    </p>
  );
}
