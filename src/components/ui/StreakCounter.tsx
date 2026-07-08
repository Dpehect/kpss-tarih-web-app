"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/cn";

export function StreakCounter({ value = 4, compact = false, className }: { value?: number; compact?: boolean; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm font-black text-amber-700 shadow-sm dark:text-amber-300", className)}>
      <Flame size={compact ? 16 : 18} className="fill-current" />
      <span>{value}</span>
      {!compact ? <span className="text-xs font-bold text-[var(--sb-text-muted)]">gün seri</span> : null}
    </div>
  );
}
