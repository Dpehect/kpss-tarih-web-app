import { cn } from "@/lib/cn";

type BrandSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

type SBBrandMarkProps = {
  className?: string;
  size?: BrandSize;
  label?: string;
  showWordmark?: boolean;
};

const sizeClass: Record<Exclude<BrandSize, number>, string> = {
  xs: "size-8 text-[11px]",
  sm: "size-10 text-xs",
  md: "size-12 text-sm",
  lg: "size-14 text-base",
  xl: "size-16 text-lg",
};

export function SBBrandMark({ className, size = "md", label = "SB", showWordmark = false }: SBBrandMarkProps) {
  const numericSize = typeof size === "number" ? { width: size, height: size } : undefined;
  const classForSize = typeof size === "number" ? "text-sm" : sizeClass[size];

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        style={numericSize}
        className={cn(
          "relative isolate grid shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/40 bg-[linear-gradient(135deg,#1E3A8A_0%,#2563EB_58%,#D97706_100%)] font-black tracking-tight text-white shadow-[0_18px_42px_rgba(30,58,138,.24)] ring-1 ring-slate-900/5",
          classForSize,
        )}
      >
        <span className="absolute -right-4 -top-4 size-9 rounded-full bg-white/20 blur-sm" />
        <span className="relative">{label}</span>
      </span>
      {showWordmark ? (
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-black tracking-tight text-[var(--sb-text)]">Softbridge Akademi</span>
          <span className="block truncate text-[11px] font-bold text-[var(--sb-text-muted)]">KPSS Tarih</span>
        </span>
      ) : null}
    </span>
  );
}
