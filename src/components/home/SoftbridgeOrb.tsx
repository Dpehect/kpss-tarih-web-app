export function SoftbridgeOrb() {
  return (
    <div className="relative grid min-h-[320px] place-items-center overflow-hidden rounded-[2rem] border border-[#e4d8c8] bg-[#fffaf3] shadow-[0_28px_90px_rgba(16,24,40,.08)]">
      <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-[#b4232a]/12 blur-2xl" />
      <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-[#d4a248]/18 blur-2xl" />

      <div className="relative h-52 w-52 rounded-[4rem] border border-[#101828]/10 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_30px_90px_rgba(16,24,40,.13)]">
        <div className="absolute inset-7 rounded-[3rem] bg-[#101828]" />
        <div className="absolute left-10 top-16 h-6 w-32 -rotate-6 rounded-full bg-[#fffaf3]" />
        <div className="absolute left-10 top-24 h-6 w-28 rotate-6 rounded-full bg-[#b4232a]" />
        <div className="absolute left-12 top-32 h-5 w-24 -rotate-6 rounded-full bg-[#d4a248]" />
        <div className="absolute right-9 top-11 h-5 w-5 rounded-full bg-[#fffaf3]" />
        <div className="absolute right-14 bottom-10 h-3 w-16 rounded-full bg-[#101828]/12" />
      </div>

      <div className="absolute bottom-5 left-5 right-5 grid gap-2 rounded-3xl border border-[#e4d8c8] bg-white/80 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Hafif mod</p>
          <p className="rounded-full bg-[#101828] px-3 py-1 text-[11px] font-black text-white">WebGL yok</p>
        </div>
        <p className="text-sm font-bold leading-6 text-[#344054]">
          Mobilde takılmayı azaltmak için ana sayfa görseli artık GPU yoran canvas yerine statik premium marka bloğu kullanır.
        </p>
      </div>
    </div>
  );
}
