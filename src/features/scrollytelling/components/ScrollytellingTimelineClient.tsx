"use client";

import dynamic from "next/dynamic";
import type { TimelineChapter } from "@/types/timeline";

const ScrollytellingTimeline = dynamic(
  () =>
    import("@/features/scrollytelling/components/ScrollytellingTimeline").then(
      (module) => module.ScrollytellingTimeline
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[70vh] rounded-[2.5rem] border border-black/5 bg-white/60 p-8">
        Timeline deneyimi hazırlanıyor...
      </div>
    )
  }
);

export function ScrollytellingTimelineClient({
  chapters
}: {
  chapters: TimelineChapter[];
}) {
  return <ScrollytellingTimeline chapters={chapters} />;
}
