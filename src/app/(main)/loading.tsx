/**
 * Ana app segment loading skeleton.
 */
export default function MainLoading() {
  return (
    <div className="content-shell py-6">
      <div className="h-48 animate-pulse rounded-[2.5rem] bg-white/[0.06]" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="h-40 animate-pulse rounded-[2rem] bg-white/[0.06]" />
        <div className="h-40 animate-pulse rounded-[2rem] bg-white/[0.06]" />
        <div className="h-40 animate-pulse rounded-[2rem] bg-white/[0.06]" />
      </div>
    </div>
  );
}
