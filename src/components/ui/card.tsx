"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  interactive?: boolean;
  className?: string;
};

type StaticCardProps = CardProps & Omit<HTMLAttributes<HTMLDivElement>, keyof CardProps>;
type MotionCardProps = CardProps & Omit<HTMLMotionProps<"div">, keyof CardProps>;

export function Card({ children, className, interactive = false, ...props }: StaticCardProps | MotionCardProps) {
  if (interactive) {
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-white/78 p-6 text-[var(--text-primary)] shadow-[var(--shadow-sm)] backdrop-blur-2xl",
          className
        )}
        {...(props as MotionCardProps)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-white/78 p-6 text-[var(--text-primary)] shadow-[var(--shadow-sm)] backdrop-blur-2xl",
        className
      )}
      {...(props as StaticCardProps)}
    >
      {children}
    </div>
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
