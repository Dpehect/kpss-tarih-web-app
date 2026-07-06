import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <ScrollReveal>
      <header className="mb-8 pb-6 border-b border-[var(--border)]">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="kicker">{eyebrow}</p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)] md:text-3xl">{title}</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--graphite)]">{description}</p>
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      </header>
    </ScrollReveal>
  );
}
