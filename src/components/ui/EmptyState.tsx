import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
  className?: string;
};

export function EmptyState({ icon: Icon = Sparkles, title, description, href, actionLabel = "Başla", className }: EmptyStateProps) {
  return (
    <div className={cn("rounded-3xl border border-dashed border-[var(--sb-line-strong)] bg-[var(--sb-surface)] p-8 text-center shadow-[var(--sb-shadow-sm)]", className)}>
      <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-700/10 text-[var(--sb-primary)]">
        <Icon size={22} />
      </div>
      <h3 className="mt-4 text-lg font-black tracking-tight text-[var(--sb-text)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--sb-text-soft)]">{description}</p>
      {href ? (
        <Link href={href as any} className="btn-primary mt-5">
          {actionLabel} <ArrowRight size={16} />
        </Link>
      ) : null}
    </div>
  );
}
