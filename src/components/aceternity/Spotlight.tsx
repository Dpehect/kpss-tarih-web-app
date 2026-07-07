export function Spotlight() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-10%] top-[-25%] h-[42rem] w-[42rem] rotate-12 rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,rgba(248,113,113,.24),rgba(96,165,250,.10),transparent,rgba(248,113,113,.24))] blur-3xl" />
      <div className="absolute right-[-12%] top-[-18%] h-[34rem] w-[34rem] rounded-full bg-white/[.035] blur-2xl" />
    </div>
  );
}
