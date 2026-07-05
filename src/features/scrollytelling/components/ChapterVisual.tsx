"use client";

import type { TimelineChapter } from "@/types/timeline";

const motifMap = {
  map: "△",
  seal: "◉",
  battle: "✦",
  reform: "◇",
  treaty: "⌁",
  assembly: "◎"
} as const;

type ChapterVisualProps = {
  chapter: TimelineChapter;
  index: number;
};

export function ChapterVisual({ chapter, index }: ChapterVisualProps) {
  return (
    <div
      data-chapter-visual
      className={`sticky top-24 min-h-[26rem] rounded-[2.5rem] border border-black/5 bg-gradient-to-br ${chapter.visual.gradient} p-6 shadow-[0_32px_100px_rgba(15,23,42,0.10)]`}
    >
      <div className="flex h-full min-h-[23rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/70 bg-white/38 p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-neutral-500">Chapter {String(index + 1).padStart(2, "0")}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{chapter.visual.focusLabel}</p>
          </div>
          <span className="flex size-12 items-center justify-center rounded-full bg-white/70 text-2xl shadow-sm">
            {motifMap[chapter.visual.motif]}
          </span>
        </div>

        <div className="relative grid place-items-center py-10">
          <div className="absolute size-56 rounded-full border border-black/10" />
          <div className="absolute size-40 rounded-full border border-black/10" />
          <div className="absolute size-24 rounded-full border border-black/10" />
          <div className="relative z-10 flex size-28 items-center justify-center rounded-full bg-neutral-950 text-4xl text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
            {motifMap[chapter.visual.motif]}
          </div>
        </div>

        <div className="grid gap-2">
          {chapter.keyEvents.map((event) => (
            <div
              key={event}
              className="rounded-2xl border border-black/5 bg-white/58 px-4 py-3 text-sm text-neutral-700"
            >
              {event}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
