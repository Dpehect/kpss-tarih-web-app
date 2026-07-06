export function PremiumSkeletonCard() {
  return (
    <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
      <div className="skeleton h-3 w-24 rounded-full" />
      <div className="skeleton mt-5 h-8 w-2/3 rounded-full" />
      <div className="skeleton mt-4 h-4 w-full rounded-full" />
      <div className="skeleton mt-2 h-4 w-4/5 rounded-full" />
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="skeleton h-16 rounded-2xl" />
        <div className="skeleton h-16 rounded-2xl" />
        <div className="skeleton h-16 rounded-2xl" />
      </div>
    </div>
  );
}

export function PremiumSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <PremiumSkeletonCard key={index} />
      ))}
    </div>
  );
}
