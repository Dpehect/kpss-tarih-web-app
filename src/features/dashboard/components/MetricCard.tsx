"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { cn } from "@/lib/cn";

type MetricCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  helper: string;
  progress: number;
  trend?: "up" | "down" | "flat";
  trendLabel?: string;
  className?: string;
};

export function MetricCard({ icon: Icon, label, value, helper, progress, trend = "up", trendLabel = "bu hafta", className }: MetricCardProps) {
  const TrendIcon = trend === "down" ? ArrowDownRight : ArrowUpRight;
  const safeProgress = Math.max(0, Math.min(100, Number.isFinite(progress) ? progress : 0));

  return (
    <PremiumCard interactive className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-blue-700/10 text-[var(--sb-primary)]">
          <Icon size={22} />
        </div>
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black", trend === "down" ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300")}>
          <TrendIcon size={13} /> {trendLabel}
        </span>
      </div>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-[var(--sb-text-muted)]">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-3xl font-black tracking-tight text-[var(--sb-text)]">{value}</p>
        <p className="pb-1 text-xs font-bold text-[var(--sb-text-muted)]">%{safeProgress}</p>
      </div>
      <div className="progress-track mt-4">
        <div className="progress-fill" style={{ width: `${safeProgress}%` }} />
      </div>
      <p className="mt-3 text-sm font-semibold leading-6 text-[var(--sb-text-soft)]">{helper}</p>
    </PremiumCard>
  );
}
