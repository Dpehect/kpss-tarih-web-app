export default function TopicLoading() {
  return (
    <div className="rounded-[2.5rem] border border-black/5 bg-white/60 p-8">
      <div className="h-4 w-32 animate-pulse rounded-full bg-black/[0.06]" />
      <div className="mt-6 h-16 max-w-2xl animate-pulse rounded-3xl bg-black/[0.06]" />
      <div className="mt-8 space-y-3">
        <div className="h-4 animate-pulse rounded-full bg-black/[0.05]" />
        <div className="h-4 w-10/12 animate-pulse rounded-full bg-black/[0.05]" />
        <div className="h-4 w-8/12 animate-pulse rounded-full bg-black/[0.05]" />
      </div>
    </div>
  );
}
