import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type StatsCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
  tone?: "gold" | "sky" | "mint" | "rose";
};

const toneClasses = {
  gold: "from-[rgba(200,135,30,0.16)]",
  sky: "from-[rgba(37,99,235,0.13)]",
  mint: "from-[rgba(15,143,114,0.14)]",
  rose: "from-[rgba(194,65,12,0.12)]"
};

const iconClasses = {
  gold: "bg-[rgba(200,135,30,0.16)] text-[#a76400]",
  sky: "bg-[rgba(37,99,235,0.14)] text-[#1d4ed8]",
  mint: "bg-[rgba(15,143,114,0.14)] text-[#047857]",
  rose: "bg-[rgba(194,65,12,0.13)] text-[#9a3412]"
};

export function StatsCard({ icon, label, value, helper, tone = "gold" }: StatsCardProps) {
  return (
    <motion.article
      data-premium-reveal
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[#0f172a]/10 bg-gradient-to-br to-white/78 p-6 text-[#0b1220] shadow-[0_22px_72px_rgba(15,23,42,0.10)] backdrop-blur-2xl",
        toneClasses[tone]
      )}
    >
      <div className="absolute -right-12 -top-12 size-36 rounded-full bg-current opacity-[0.035] blur-3xl" />
      <div className={cn("grid size-12 place-items-center rounded-2xl", iconClasses[tone])}>
        {icon}
      </div>
      <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#475569]">
        {label}
      </p>
      <p className="mt-3 text-4xl font-black tracking-[-0.08em] text-[#0b1220] md:text-5xl">
        {value}
      </p>
      <p className="mt-3 text-sm font-medium leading-6 text-[#334155]">{helper}</p>
    </motion.article>
  );
}
