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
  const baseClass = "rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface-strong)] p-5 text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)] transition-all duration-300";

  if (interactive) {
    return (
      <motion.div
        data-readable="light"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.99 }}
        className={cn(baseClass, "cursor-pointer hover:shadow-[var(--sb-shadow-md)]", className)}
        {...(props as MotionCardProps)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div data-readable="light" className={cn(baseClass, className)} {...(props as StaticCardProps)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-black tracking-tight text-[var(--sb-text)]", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-2 text-sm leading-6 text-[var(--sb-text-soft)]", className)}>{children}</p>;
}
