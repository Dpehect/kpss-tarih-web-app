"use client";

type TimelineProgressRailProps = {
  progressRef: React.RefObject<HTMLDivElement | null>;
};

export function TimelineProgressRail({ progressRef }: TimelineProgressRailProps) {
  return (
    <div className="pointer-events-none absolute top-12 bottom-12 left-6 hidden w-px bg-black/10 md:block">
      <div
        ref={progressRef}
        className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-neutral-950"
      />
    </div>
  );
}
