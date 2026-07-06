"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tabs({
  value,
  onChange,
  items,
  className
}: {
  value: string;
  onChange: (value: string) => void;
  items: { value: string; label: string; icon?: ReactNode }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-[var(--border-soft)] bg-white/72 p-1 shadow-[var(--shadow-xs)] backdrop-blur-2xl scrollbar-clean",
        className
      )}
      role="tablist"
    >
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition",
              active
                ? "bg-[var(--navy-900)] text-[var(--text-inverse)] shadow-[var(--shadow-xs)]"
                : "text-[var(--text-secondary)] hover:bg-white hover:text-[var(--navy-900)]"
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
