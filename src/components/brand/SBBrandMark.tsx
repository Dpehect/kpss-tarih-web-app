"use client";

import type { CSSProperties } from "react";

type BrandSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

type SBBrandMarkProps = {
  className?: string;
  size?: BrandSize;
  title?: string;
};

const sizeClassMap: Record<Exclude<BrandSize, number>, string> = {
  xs: "size-8",
  sm: "size-10",
  md: "size-11",
  lg: "size-12",
  xl: "size-14",
};

function resolveSize(size: BrandSize): { className?: string; style?: CSSProperties } {
  if (typeof size === "number") {
    const value = Number.isFinite(size) && size > 0 ? size : 44;
    return { style: { width: value, height: value } };
  }

  return { className: sizeClassMap[size] ?? sizeClassMap.md };
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SBBrandMark({ className, size = "md", title = "KPSS Tarih Akademi" }: SBBrandMarkProps) {
  const resolvedSize = resolveSize(size);

  return (
    <div
      aria-label={title}
      role="img"
      style={resolvedSize.style}
      className={cx(
        resolvedSize.className,
        "relative shrink-0 overflow-hidden rounded-[1.15rem] border border-white/60 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.10)] ring-1 ring-slate-950/5",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.95),rgba(255,255,255,0)_38%),linear-gradient(135deg,#2563eb_0%,#16a34a_58%,#f59e0b_100%)]" />
      <div className="absolute inset-[18%] rounded-full bg-white/20 blur-[1px]" />
      <div className="relative grid h-full w-full place-items-center text-white">
        <span className="select-none text-[0.72rem] font-black leading-none tracking-[-0.08em] drop-shadow-sm sm:text-sm">
          TA
        </span>
      </div>
      <span className="absolute bottom-1 right-1 size-1.5 rounded-full bg-white/90 shadow-sm" />
    </div>
  );
}
