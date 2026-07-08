"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  interactive?: boolean;
  className?: string;
};

type StaticCardProps = CardProps & HTMLAttributes<HTMLDivElement>;
type MotionCardProps = CardProps & HTMLMotionProps<"div">;

export function Card({ children, className, interactive = false, ...props }: StaticCardProps | MotionCardProps) {
  const baseClass = "rounded-3xl border border-[var(--sb-line)] bg-[var(--sb-surface)] p-5 text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)] backdrop-blur-xl transition duration-300";

  if (interactive) {
    return (
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.22, ease: "easeOut" }} className={cn(baseClass, "hover:border-blue-700/25 hover:shadow-[var(--sb-shadow-md)]", className)} {...(props as MotionCardProps)}>
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
  return <h3 className={cn("text-lg font-black tracking-tight text-[var(--sb-text)]", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-1 text-sm font-semibold leading-6 text-[var(--sb-text-soft)]", className)}>{children}</p>;
}
