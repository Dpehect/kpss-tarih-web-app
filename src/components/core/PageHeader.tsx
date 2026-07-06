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
      <header className="lab-stage relative overflow-hidden rounded-[2.35rem] p-6 md:p-9 xl:p-11">
        <div className="absolute right-[-9rem] top-[-9rem] size-80 rounded-full bg-[rgba(215,255,79,.18)] blur-3xl" />
        <div className="absolute bottom-[-9rem] left-[20%] size-96 rounded-full bg-[rgba(0,166,180,.18)] blur-3xl" />

        <svg className="absolute right-8 top-8 hidden h-36 w-36 opacity-[.16] md:block" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="66" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M21 92 C50 52 92 38 138 62" fill="none" stroke="#d7ff4f" strokeWidth="2" strokeDasharray="7 9" />
          <circle cx="45" cy="76" r="4" fill="#d7ff4f" />
          <circle cx="103" cy="51" r="4" fill="#00a6b4" />
        </svg>

        <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-5xl">
            <p className="lab-kicker">{eyebrow}</p>
            <h1 className="lab-display mt-4 max-w-5xl text-balance text-4xl text-[var(--lab-inverse)] md:text-6xl xl:text-7xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[var(--lab-inverse-muted)] md:text-lg">{description}</p>
          </div>
          {actions ? <div className="relative z-10 shrink-0">{actions}</div> : null}
        </div>
      </header>
    </ScrollReveal>
  );
}
