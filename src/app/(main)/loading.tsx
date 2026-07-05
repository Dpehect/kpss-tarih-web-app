export default function MainLoading() {
  return (
    <div className="space-y-6">
      <div className="h-48 animate-pulse rounded-[2.5rem] bg-black/[0.04]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-[2rem] bg-black/[0.04]" />
        ))}
      </div>
    </div>
  );
}
