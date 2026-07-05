"use client";

import { motion } from "framer-motion";
import type { TimelineChapter as TimelineChapterType } from "@/types/timeline";
import { ChapterVisual } from "@/features/scrollytelling/components/ChapterVisual";

type TimelineChapterProps = {
  chapter: TimelineChapterType;
  index: number;
  isLast: boolean;
};

export function TimelineChapter({ chapter, index, isLast }: TimelineChapterProps) {
  return (
    <article
      data-timeline-chapter
      className="grid min-h-[82vh] gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:items-center md:pl-10"
    >
      <ChapterVisual chapter={chapter} index={index} />

      <div data-chapter-content className="space-y-7">
        <div>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1">
              {chapter.dateRange}
            </span>
            <span>{chapter.periodLabel}</span>
          </div>

          <h3 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-neutral-950 md:text-6xl">
            {chapter.title}
          </h3>
          <p className="mt-4 max-w-2xl text-xl leading-8 text-neutral-600">
            {chapter.subtitle}
          </p>
        </div>

        <p className="max-w-2xl text-base leading-8 text-neutral-700">
          {chapter.narrative}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {chapter.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              data-chapter-metric
              whileHover={{ y: -4 }}
              className="rounded-[1.5rem] border border-black/5 bg-white/72 p-4 shadow-sm"
            >
              <p className="text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
                {metric.label}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{metric.explanation}</p>
            </motion.div>
          ))}
        </div>

        <div className="rounded-[1.75rem] border border-black/5 bg-neutral-950 p-5 text-white">
          <p className="text-xs font-medium tracking-[0.18em] text-white/50 uppercase">
            KPSS bağlantısı
          </p>
          <p className="mt-3 text-lg leading-7">{chapter.questionBridge.prompt}</p>
        </div>

        {!isLast ? (
          <p className="text-sm text-neutral-500">Kaydırarak sonraki kırılma noktasına geç.</p>
        ) : null}
      </div>
    </article>
  );
}
