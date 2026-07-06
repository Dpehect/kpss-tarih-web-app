"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { topics } from "@/data/kpss-history";

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.04, staggerChildren: 0.04 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }
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
    <div className="mx-auto w-full max-w-[1420px] pb-10">
      <section className="mb-8 pb-6 border-b border-[var(--border)]">
        <p className="kicker">Konular</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)] md:text-3xl">
          Müfredatı konulara ayırarak çalış.
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--graphite)]">
          Her konu kısa özetiyle ayrı bir kart olarak sunulur; detay sayfasında test ve tekrar akışına geçebilirsin.
        </p>
      </section>

      <motion.section variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="KPSS Tarih konuları">
        {topics.map((topic, index) => (
          <motion.a
            key={topic.id}
            variants={cardVariants}
            href={`/topics/${topic.slug}`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group flex min-h-[220px] flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--warm-white)] p-5 shadow-[var(--shadow-xs)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)] hover:border-[var(--border-strong)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--sage)]"
          >
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xs font-semibold tracking-wider text-[var(--sage)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="h-px flex-1 bg-[var(--border)]" />
              </div>

              <h2 className="text-lg font-semibold leading-snug tracking-tight text-[var(--ink)]">{topic.title}</h2>

              <p className="mt-3 text-sm leading-relaxed text-[var(--graphite)]" style={clampThreeLines}>
                {topic.shortDescription}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
              <span className="text-[13px] font-medium text-[var(--slate)]">Detayları gör</span>
              <span className="grid size-7 place-items-center rounded-md bg-[var(--cream)] text-[var(--graphite)] transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight size={14} />
              </span>
            </div>
          </motion.a>
        ))}
      </motion.section>
    </div>
  );
}
