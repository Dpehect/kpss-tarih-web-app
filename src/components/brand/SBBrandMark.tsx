import { cn } from "@/lib/cn";

type BrandSize = "xs" | "sm" | "md" | "lg" | "xl";

type SBBrandMarkProps = {
  className?: string;
  size?: BrandSize | number;
  title?: string;
};

const sizeClassMap: Record<BrandSize, string> = {
  xs: "size-8 text-[10px]",
  sm: "size-10 text-xs",
  md: "size-12 text-sm",
  lg: "size-14 text-base",
  xl: "size-16 text-lg",
};

export function SBBrandMark({ className, size = "md", title = "Softbridge Akademi" }: SBBrandMarkProps) {
  const isNumericSize = typeof size === "number";

  return (
    <div
      aria-label={title}
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-[1.05rem] border border-[rgba(14,17,23,.12)] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)] shadow-[0_18px_52px_rgba(14,17,23,.18)]",
        !isNumericSize && sizeClassMap[size],
        className,
      )}
      style={isNumericSize ? { width: size, height: size } : undefined}
    >
      <span className="pointer-events-none absolute -left-1 top-0 h-8 w-8 rounded-full bg-[rgba(255,250,242,.16)] blur-[2px]" />
      <span className="pointer-events-none absolute -bottom-4 -right-3 h-10 w-10 rounded-full bg-[rgba(4,126,137,.45)] blur-sm" />
      <span className="relative z-10 font-black leading-none tracking-[-.08em] text-[var(--bureau-inverse)]">SB</span>
      <span className="absolute bottom-2 left-1/2 h-[2px] w-1/2 -translate-x-1/2 rounded-full bg-[var(--bureau-teal)]" />
    </div>
  );
}
