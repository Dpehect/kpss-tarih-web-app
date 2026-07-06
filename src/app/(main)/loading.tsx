import { SkeletonGrid } from "@/components/ui/Skeleton";

export default function MainLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <section className="surface-dark rounded-[2.75rem] p-8">
        <div className="h-3 w-36 animate-pulse rounded-full bg-white/20" />
        <div className="mt-6 h-14 w-2/3 animate-pulse rounded-full bg-white/16" />
        <div className="mt-4 h-4 w-1/2 animate-pulse rounded-full bg-white/14" />
      </section>
      <SkeletonGrid count={6} />
    </div>
  );
}
