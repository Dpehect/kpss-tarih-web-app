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
      <header className="bureau-stage relative overflow-hidden rounded-[2.35rem] p-6 md:p-9 xl:p-11">
        <div className="absolute right-[-9rem] top-[-9rem] size-80 rounded-full bg-[rgba(37,63,116,.22)] blur-3xl" />
        <div className="absolute bottom-[-9rem] left-[20%] size-96 rounded-full bg-[rgba(4,126,137,.16)] blur-3xl" />

        <svg className="absolute right-8 top-8 hidden h-36 w-36 opacity-[.16] md:block" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="66" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M21 92 C50 52 92 38 138 62" fill="none" stroke="#047e89" strokeWidth="2" strokeDasharray="7 9" />
          <circle cx="45" cy="76" r="4" fill="#047e89" />
          <circle cx="103" cy="51" r="4" fill="#66345f" />
        </svg>

        <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-5xl">
            <p className="bureau-kicker">{eyebrow}</p>
            <h1 className="bureau-display mt-4 max-w-5xl text-balance text-4xl text-[var(--bureau-inverse)] md:text-6xl xl:text-7xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[var(--bureau-inverse-copy)] md:text-lg">{description}</p>
          </div>
          {actions ? <div className="relative z-10 shrink-0">{actions}</div> : null}
        </div>
      </header>
    </ScrollReveal>
  );
}
