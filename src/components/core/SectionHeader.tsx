import { cn } from "@/lib/cn";

/**
 * Bölüm başlıklarını standartlaştıran prop-driven component.
 */
type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[color:var(--gold)]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-balance text-4xl font-semibold tracking-[-0.07em] text-[color:var(--foreground)] md:text-6xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 text-base leading-8 text-[#e7d4b4]/72 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
