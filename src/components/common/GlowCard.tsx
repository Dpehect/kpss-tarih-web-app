import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Glowing kart yüzeyi.
 * HTMLAttributes desteği sayesinde data-* attribute'ları, aria etiketleri ve test id'leri dışarıdan verilebilir.
 */
type GlowCardProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  glow?: "gold" | "turquoise" | "crimson";
};

const glowMap = {
  gold: "before:bg-[radial-gradient(circle,rgba(230,184,92,0.28),transparent_62%)]",
  turquoise: "before:bg-[radial-gradient(circle,rgba(82,242,208,0.18),transparent_62%)]",
  crimson: "before:bg-[radial-gradient(circle,rgba(221,75,57,0.20),transparent_62%)]"
};

export function GlowCard({
  children,
  className,
  glow = "gold",
  ...props
}: GlowCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] parchment-surface p-6 transition duration-500 hover:-translate-y-1",
        "before:pointer-events-none before:absolute before:-right-16 before:-top-16 before:size-44 before:opacity-0 before:blur-xl before:transition before:duration-500 group-hover:before:opacity-100",
        glowMap[glow],
        className
      )}
    >
      {children}
    </div>
  );
}
