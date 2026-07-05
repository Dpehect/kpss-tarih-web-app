export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/58 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div>
          <p className="text-sm text-neutral-500">KPSS Tarih</p>
          <h1 className="text-lg font-semibold tracking-tight">Tarih Akademi</h1>
        </div>
        <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm">
          Bugünkü çalışma: 38 dk
        </div>
      </div>
    </header>
  );
}
