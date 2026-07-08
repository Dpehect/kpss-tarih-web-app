import type { HTMLAttributes } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  shimmer?: boolean;
};

export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "relative overflow-hidden rounded-2xl bg-slate-200/80 dark:bg-slate-800/70",
        shimmer &&
          "before:absolute before:inset-0 before:-translate-x-full before:animate-[premium-shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/55 before:to-transparent dark:before:via-white/10",
        className,
      )}
      {...props}
    />
  );
}

type SkeletonGridProps = {
  count?: number;
  className?: string;
  itemClassName?: string;
};

export function SkeletonGrid({ count = 8, className, itemClassName }: SkeletonGridProps) {
  return (
    <div className={cx("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} className={itemClassName} />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton className="h-4 w-2/3 rounded-full" />
          <Skeleton className="h-3 w-full rounded-full" />
          <Skeleton className="h-3 w-5/6 rounded-full" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/70">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-5 w-36 rounded-full" />
            <Skeleton className="h-9 w-72 max-w-full rounded-full" />
            <Skeleton className="h-4 w-96 max-w-full rounded-full" />
          </div>
          <Skeleton className="h-12 w-44 rounded-2xl" />
        </div>
      </section>
      <SkeletonGrid count={6} />
    </main>
  );
}

export default Skeleton;
