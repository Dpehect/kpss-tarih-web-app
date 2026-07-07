import type { ReactNode } from "react";

export function AuroraBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060914] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(239,68,68,.24),transparent_30rem),radial-gradient(circle_at_80%_20%,rgba(59,130,246,.20),transparent_28rem),radial-gradient(circle_at_50%_100%,rgba(20,184,166,.14),transparent_30rem)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.055)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_74%)]" />
        <div className="absolute left-1/2 top-0 h-px w-[78vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />
        <div className="absolute left-[12%] top-[12%] h-72 w-72 rounded-full bg-red-500/15 blur-3xl" />
        <div className="absolute right-[8%] top-[22%] h-80 w-80 rounded-full bg-blue-500/12 blur-3xl" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
