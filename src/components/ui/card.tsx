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
        data-bureau-card="true"
        whileHover={{ y: -6, scale: 1.004 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={cn("bureau-card rounded-[1.65rem] p-6", className)}
        {...(props as MotionCardProps)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div data-bureau-card="true" className={cn("bureau-card rounded-[1.65rem] p-6", className)} {...(props as StaticCardProps)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-2xl font-black tracking-[-0.055em] text-[var(--bureau-ink)]", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-2 text-sm font-medium leading-7 text-[var(--bureau-copy)]", className)}>{children}</p>;
}
