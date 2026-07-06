"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { topics } from "@/data/kpss-history";

const containerVariants: Variants = {
  hidden: {
    opacity: 1
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.055
    }
  }
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: "easeOut"
    }
  }
};

const clampThreeLines: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden"
};

export function TopicsPage() {
  return (
    <div className="mx-auto w-full max-w-[1420px] px-1 pb-10 pt-1 sm:px-2 lg:px-3">
      <section className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-[rgba(11,18,32,.08)] bg-[#fffaf2] px-6 py-8 shadow-[0_14px_50px_rgba(11,18,32,.055)] sm:px-8 sm:py-10 lg:mb-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(11,18,32,.18)] to-transparent" />

        <div className="relative z-10 max-w-5xl">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#8f6b19]">
            Konu Özetleri
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.065em] text-[#0b1220] sm:text-5xl lg:text-6xl">
            KPSS Tarih konularını temiz, düzenli ve odaklı bir akışla çalış.
          </h1>

          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[#475569] sm:text-lg">
            Müfredattaki her konu kısa özetiyle ayrı kartlarda sunulur; istediğin başlıktan başlayıp konu detayına geçebilirsin.
          </p>
        </div>
      </section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        aria-label="KPSS Tarih konuları"
      >
        {topics.map((topic, index) => (
          <motion.a
            key={topic.id}
            variants={cardVariants}
            href={`/topics/${topic.slug}`}
            whileHover={{
              y: -7,
              scale: 1.003
            }}
            transition={{
              duration: 0.24,
              ease: "easeOut"
            }}
            className="group flex min-h-[268px] flex-col justify-between rounded-[1.45rem] border border-[rgba(11,18,32,.09)] bg-[#fffdf8] p-6 text-[#0b1220] shadow-[0_10px_36px_rgba(11,18,32,.05)] outline-none transition-shadow duration-300 ease-out hover:shadow-[0_30px_90px_rgba(11,18,32,.14)] focus-visible:ring-4 focus-visible:ring-[rgba(76,141,255,.26)] sm:p-7"
          >
            <div>
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-xs font-black tracking-[0.22em] text-[#8f6b19]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-[rgba(11,18,32,.08)]" />
              </div>

              <h2 className="text-[1.45rem] font-black leading-[1.12] tracking-[-0.045em] text-[#0b1220] sm:text-[1.6rem]">
                {topic.title}
              </h2>

              <p
                className="mt-4 text-[15px] font-medium leading-7 text-[#475569]"
                style={clampThreeLines}
              >
                {topic.shortDescription}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[rgba(11,18,32,.08)] pt-5">
              <span className="text-sm font-black text-[#64748b]">
                Konuyu incele
              </span>

              <span className="grid size-9 place-items-center rounded-full border border-[rgba(11,18,32,.10)] bg-[#f7efe0] text-[#0b1220] transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowRight size={17} />
              </span>
            </div>
          </motion.a>
        ))}
      </motion.section>
    </div>
  );
}
