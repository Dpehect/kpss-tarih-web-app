"use client";

import { Menu, Search, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

/**
 * Sticky üst navigasyon.
 */
export function TopNav() {
  const setNavigationOpen = useUIStore((state) => state.setNavigationOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#120b07]/82 backdrop-blur-2xl">
      <div className="content-shell flex h-16 items-center justify-between gap-4">
        <a href="/dashboard" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-[#f2c15f] font-black text-[#120b07]">
            T
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-black tracking-tight">KPSS Tarih Akademi</p>
            <p className="text-xs text-[#ead7b7]/54">Final çalışma platformu</p>
          </div>
        </a>

        <a href="/glossary" className="hidden max-w-md flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-[#ead7b7]/58 transition hover:bg-white/[0.08] md:flex">
          <Search size={16} />
          Kavram sözlüğünde ara, konuya dön...
        </a>

        <div className="flex items-center gap-2">
          <a
            href="/content-studio"
            className="hidden items-center gap-2 rounded-full bg-[#f2c15f] px-4 py-2 text-sm font-bold text-[#120b07] transition hover:-translate-y-0.5 sm:inline-flex"
          >
            <Sparkles size={16} />
            İçerik ekle
          </a>
          <button
            type="button"
            onClick={() => setNavigationOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
