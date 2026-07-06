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
        "premium-card premium-hover p-6",
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
    <h3 className={cn("text-2xl font-black tracking-[-0.055em] text-[var(--foreground)]", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }: CardProps) {
  return (
    <p className={cn("mt-2 text-sm leading-7 text-[var(--muted-foreground)]", className)} {...props}>
      {children}
    </p>
  );
}
