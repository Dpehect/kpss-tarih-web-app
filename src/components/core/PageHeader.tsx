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
      <header className="page-noise relative overflow-hidden rounded-[2.75rem] border border-white/16 bg-[#0b1220] p-6 text-[#fff8ea] shadow-[0_42px_140px_rgba(11,18,32,0.22)] md:p-9 xl:p-11">
        <div
          data-premium-parallax
          className="absolute right-[-6rem] top-[-7rem] size-80 rounded-full bg-[rgba(37,99,235,0.28)] blur-3xl"
        />
        <div
          data-premium-parallax
          className="absolute bottom-[-8rem] left-[20%] size-96 rounded-full bg-[rgba(200,135,30,0.18)] blur-3xl"
        />
        <div className="absolute right-8 top-8 hidden size-28 rounded-full border border-white/10 md:block" />
        <div className="absolute right-16 top-16 hidden size-16 rounded-full border border-white/10 md:block" />

        <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#d9aa52]">
              {eyebrow}
            </p>
            <h1 className="editorial-title mt-4 max-w-5xl text-balance text-4xl text-[#fff8ea] md:text-6xl xl:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[#fff8ea]/78 md:text-lg">
              {description}
            </p>
          </div>
          {actions ? <div className="relative z-10 shrink-0">{actions}</div> : null}
        </div>
      </header>
    </ScrollReveal>
  );
}
