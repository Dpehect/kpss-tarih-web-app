import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ScrollReveal({ children, className }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={cn(className)}>{children}</div>;
}
