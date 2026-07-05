"use client";

import type { TimelineChapter as TimelineChapterType } from "@/types/timeline";
import { useTimelineScrollTrigger } from "@/features/scrollytelling/hooks/useTimelineScrollTrigger";
import { TimelineChapter } from "@/features/scrollytelling/components/TimelineChapter";
import { TimelineProgressRail } from "@/features/scrollytelling/components/TimelineProgressRail";

type ScrollytellingTimelineProps = {
  chapters: TimelineChapterType[];
};

export function ScrollytellingTimeline({ chapters }: ScrollytellingTimelineProps) {
  const { scopeRef, progressRef } = useTimelineScrollTrigger();

  return (
    <section
      ref={scopeRef}
      className="relative rounded-[3rem] border border-black/5 bg-white/50 px-4 py-10 shadow-[0_40px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:px-10"
    >
      <TimelineProgressRail progressRef={progressRef} />

      <div className="space-y-20">
        {chapters
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((chapter, index) => (
            <TimelineChapter
              key={chapter.id}
              chapter={chapter}
              index={index}
              isLast={index === chapters.length - 1}
            />
          ))}
      </div>
    </section>
  );
}
