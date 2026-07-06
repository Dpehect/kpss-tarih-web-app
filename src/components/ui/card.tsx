import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  elevated?: boolean;
};

export function Card({ children, className, elevated = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "premium-card premium-hover p-6 text-[#0b1220]",
        elevated && "shadow-[var(--shadow-md)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("mb-5 flex items-start justify-between gap-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: CardProps) {
  return (
    <h3 className={cn("text-2xl font-black tracking-[-0.055em] text-[#0b1220]", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }: CardProps) {
  return (
    <p className={cn("mt-2 text-sm font-medium leading-7 text-[#334155]", className)} {...props}>
      {children}
    </p>
  );
}
