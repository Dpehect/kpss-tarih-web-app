export function SkeletonCard() {
  return (
    <div className="rounded-[2rem] border border-[var(--border-soft)] bg-white/70 p-6 shadow-[var(--shadow-xs)]">
      <div className="h-3 w-24 animate-pulse rounded-full bg-black/10" />
      <div className="mt-5 h-8 w-2/3 animate-pulse rounded-full bg-black/10" />
      <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-black/10" />
      <div className="mt-2 h-4 w-4/5 animate-pulse rounded-full bg-black/10" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
