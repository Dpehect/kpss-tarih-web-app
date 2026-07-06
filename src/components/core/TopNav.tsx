"use client";

import { Menu, Search } from "lucide-react";
import { AdminQuickLink } from "@/features/auth/components/AdminQuickLink";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { useUIStore } from "@/store/useUIStore";

export function TopNav() {
  const setNavigationOpen = useUIStore((state) => state.setNavigationOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.08] bg-[#fffaf0]/82 backdrop-blur-2xl">
      <div className="content-shell flex min-h-18 items-center justify-between gap-4 py-3">
        <a href="/dashboard" className="group flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-[1.1rem] bg-[#111827] font-black text-[#fffaf0] shadow-[0_18px_50px_rgba(17,24,39,0.16)] transition group-hover:-rotate-3">
            T
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-black tracking-[-0.02em] text-[#111827]">KPSS Tarih Akademi</p>
            <p className="text-xs text-[#425066]">Profesyonel çalışma atlası</p>
          </div>
        </a>

        <form
          action="/search"
          className="hidden max-w-xl flex-1 items-center gap-3 rounded-full border border-black/[0.08] bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#425066] transition focus-within:bg-white md:flex"
        >
          <Search size={16} />
          <input
            name="q"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#425066]/55"
            placeholder="Kavram, dönem veya belge ara"
            autoComplete="off"
          />
          <button type="submit" className="rounded-full bg-[#111827] px-3 py-1 text-xs font-black text-[#fffaf0]">
            Ara
          </button>
        </form>

        <div className="flex items-center gap-2">
          <a
            href="/search"
            className="grid size-10 place-items-center rounded-full border border-black/[0.08] bg-white/70 md:hidden"
            aria-label="Arama"
          >
            <Search size={17} />
          </a>
          <AdminQuickLink />
          <AuthStatusButton />

          <button
            type="button"
            onClick={() => setNavigationOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-black/[0.08] bg-white/70 lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
