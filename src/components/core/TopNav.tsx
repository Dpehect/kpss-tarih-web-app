"use client";

import { Menu, Search } from "lucide-react";
import { AdminQuickLink } from "@/features/auth/components/AdminQuickLink";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { useUIStore } from "@/store/useUIStore";

export function TopNav() {
  const setNavigationOpen = useUIStore((state) => state.setNavigationOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-[#0f172a]/10 bg-[#fffaf0]/90 backdrop-blur-2xl">
      <div className="content-shell flex min-h-18 items-center justify-between gap-4 py-3">
        <a href="/dashboard" className="group flex items-center gap-3" aria-label="Dashboard'a git">
          <span className="grid size-11 place-items-center rounded-[1.1rem] bg-[#0b1220] font-black text-[#fff8ea] shadow-[0_18px_50px_rgba(11,18,32,0.16)] transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
            T
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-black tracking-[-0.02em] text-[#0b1220]">KPSS Tarih Akademi</p>
            <p className="text-xs font-semibold text-[#475569]">Profesyonel çalışma atlası</p>
          </div>
        </a>

        <form
          action="/search"
          className="hidden max-w-xl flex-1 items-center gap-3 rounded-full border border-[#0f172a]/12 bg-white/88 px-4 py-2.5 text-sm font-semibold text-[#334155] shadow-[0_12px_38px_rgba(15,23,42,0.045)] transition focus-within:bg-white focus-within:shadow-[0_18px_60px_rgba(15,23,42,0.10)] md:flex"
        >
          <Search size={16} className="text-[#334155]" />
          <input
            name="q"
            className="min-w-0 flex-1 bg-transparent text-[#0b1220] outline-none placeholder:text-[#64748b]"
            placeholder="Kavram, dönem veya belge ara"
            autoComplete="off"
          />
          <button
            type="submit"
            className="inline-flex min-w-12 items-center justify-center rounded-full bg-[#0b1220] px-4 py-1.5 text-xs font-black text-[#fff8ea]"
          >
            Ara
          </button>
        </form>

        <div className="flex items-center gap-2">
          <a
            href="/search"
            className="grid size-10 place-items-center rounded-full border border-[#0f172a]/10 bg-white/88 text-[#0b1220] md:hidden"
            aria-label="Arama"
          >
            <Search size={17} />
          </a>
          <AdminQuickLink />
          <AuthStatusButton />

          <button
            type="button"
            onClick={() => setNavigationOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-[#0f172a]/10 bg-white/88 text-[#0b1220] lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
