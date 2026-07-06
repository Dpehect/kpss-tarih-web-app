"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ToastAction({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}) {
  return (
    <button
      className={cn(
        "rounded-full bg-[var(--ink)] px-3 py-1.5 text-xs font-semibold text-[white] transition hover:scale-105",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
