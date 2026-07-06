"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function Progress({ value, className }: { value: number; className?: string }) {
  const normalized = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-[rgba(11,18,32,.10)]", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${normalized}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-[var(--sky-500)] via-[var(--mint-500)] to-[var(--gold-500)]"
      />
    </div>
  );
}
