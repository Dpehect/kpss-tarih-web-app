import { cn } from "@/lib/cn";

type BrandMarkSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

type SBBrandMarkProps = {
  className?: string;
  size?: BrandMarkSize;
};

const sizeClassMap: Record<Exclude<BrandMarkSize, number>, string> = {
  xs: "size-8 rounded-2xl",
  sm: "size-10 rounded-2xl",
  md: "size-12 rounded-[1.25rem]",
  lg: "size-14 rounded-[1.35rem]",
  xl: "size-16 rounded-[1.5rem]",
};

export function SBBrandMark({ className, size = "md" }: SBBrandMarkProps) {
  const numericSize = typeof size === "number" ? size : undefined;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative isolate grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1d4ed8] to-[#059669] text-white shadow-[0_16px_40px_rgba(16,24,40,0.22)] ring-1 ring-white/60",
        typeof size === "number" ? "rounded-[1.25rem]" : sizeClassMap[size],
        className,
      )}
      style={numericSize ? { width: numericSize, height: numericSize } : undefined}
    >
      <span className="pointer-events-none absolute -left-5 -top-6 size-12 rounded-full bg-white/28 blur-xl" />
      <span className="pointer-events-none absolute bottom-0 right-0 size-7 rounded-tl-full bg-emerald-300/45" />
      <span className="relative text-[0.78em] font-black tracking-[-0.08em]">TA</span>
    </span>
  );
}
