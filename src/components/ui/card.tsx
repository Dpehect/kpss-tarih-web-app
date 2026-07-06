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
  const baseClass = "rounded-xl border border-[var(--border)] bg-[var(--warm-white)] p-5 shadow-[var(--shadow-xs)] transition-shadow duration-300";

  if (interactive) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(baseClass, "hover:shadow-[var(--shadow-md)] hover:border-[var(--border-strong)]", className)}
        {...(props as MotionCardProps)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn(baseClass, className)} {...(props as StaticCardProps)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold tracking-tight text-[var(--ink)]", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-1.5 text-sm leading-relaxed text-[var(--graphite)]", className)}>{children}</p>;
}
