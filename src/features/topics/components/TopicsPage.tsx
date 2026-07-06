"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { topics } from "@/data/kpss-history";

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.055
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
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
      <section className="bureau-surface relative mb-8 overflow-hidden rounded-[1.75rem] px-6 py-8 sm:px-8 sm:py-10 lg:mb-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(14,17,23,.18)] to-transparent" />
        <div className="pointer-events-none absolute right-[-8rem] top-[-8rem] size-72 rounded-full bg-[var(--bureau-teal-soft)] blur-3xl" />

        <div className="relative z-10 max-w-5xl">
          <p className="bureau-kicker">Konu dosyaları</p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.065em] text-[var(--bureau-ink)] sm:text-5xl lg:text-6xl">
            Müfredatı düzenli dosyalara ayır.
          </h1>

          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[var(--bureau-copy)] sm:text-lg">
            Her konu kısa özetiyle ayrı bir dosya kartı olarak sunulur; detay sayfasında test ve tekrar akışına geçebilirsin.
          </p>
        </div>
      </section>

      <motion.section variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="KPSS Tarih konuları">
        {topics.map((topic, index) => (
          <motion.a
            key={topic.id}
            variants={cardVariants}
            href={`/topics/${topic.slug}`}
            whileHover={{ y: -6, scale: 1.003 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="group bureau-card flex min-h-[268px] flex-col justify-between rounded-[1.45rem] p-6 outline-none focus-visible:ring-4 focus-visible:ring-[rgba(4,126,137,.26)] sm:p-7"
          >
            <div>
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-xs font-black tracking-[0.22em] text-[var(--bureau-teal)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="h-px flex-1 bg-[rgba(14,17,23,.08)]" />
              </div>

              <h2 className="text-[1.45rem] font-black leading-[1.12] tracking-[-0.045em] text-[var(--bureau-ink)] sm:text-[1.6rem]">{topic.title}</h2>

              <p className="mt-4 text-[15px] font-medium leading-7 text-[var(--bureau-copy)]" style={clampThreeLines}>
                {topic.shortDescription}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[rgba(14,17,23,.08)] pt-5">
              <span className="text-sm font-black text-[var(--bureau-muted)]">Dosyayı aç</span>

              <span className="grid size-9 place-items-center rounded-full border border-[rgba(14,17,23,.10)] bg-[var(--bureau-teal-soft)] text-[var(--bureau-ink)] transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowRight size={17} />
              </span>
            </div>
          </motion.a>
        ))}
      </motion.section>
    </div>
  );
}
