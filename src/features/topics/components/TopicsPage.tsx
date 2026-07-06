"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { topics } from "@/data/kpss-history";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 22
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function TopicsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-1 py-1 sm:px-2">
      <section className="mb-8 rounded-[1.75rem] border border-[var(--border-soft)] bg-white/75 px-6 py-8 shadow-[var(--shadow-xs)] backdrop-blur-xl sm:px-8 sm:py-10 lg:mb-10 lg:px-10">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8d6500]">
          Konu Özetleri
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.06em] text-[var(--navy-900)] sm:text-5xl lg:text-6xl">
          KPSS Tarih konularını düzenli ve sade bir akışla çalış.
        </h1>
        <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[var(--text-secondary)] sm:text-lg">
          Müfredattaki tüm konular kısa özetleriyle birlikte kartlara ayrıldı; istediğin konudan başlayıp test ve tekrar akışına geçebilirsin.
        </p>
      </section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {topics.map((topic) => (
          <motion.a
            key={topic.id}
            variants={cardVariants}
            href={`/topics/${topic.slug}`}
            whileHover={{
              y: -6,
              scale: 1.005,
              boxShadow: "0 28px 80px rgba(11, 18, 32, 0.13)"
            }}
            transition={{
              duration: 0.24,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="group flex min-h-[250px] flex-col justify-between rounded-[1.5rem] border border-[var(--border-soft)] bg-white p-6 text-[var(--navy-900)] shadow-[var(--shadow-xs)] outline-none transition-shadow focus-visible:ring-4 focus-visible:ring-[rgba(76,141,255,.28)] sm:p-7"
          >
            <div>
              <h2 className="text-2xl font-black leading-tight tracking-[-0.045em] text-[var(--navy-900)]">
                {topic.title}
              </h2>

              <p className="mt-4 line-clamp-3 text-[15px] font-medium leading-7 text-[var(--text-secondary)]">
                {topic.shortDescription}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[var(--border-soft)] pt-5">
              <span className="text-sm font-black text-[var(--text-muted)]">
                Konuyu incele
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-[var(--border-soft)] bg-[rgba(11,18,32,.035)] text-[var(--navy-900)] transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight size={17} />
              </span>
            </div>
          </motion.a>
        ))}
      </motion.section>
    </div>
  );
}
