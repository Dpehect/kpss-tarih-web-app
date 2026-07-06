"use client";

import { Menu, Search } from "lucide-react";
import { AdminQuickLink } from "@/features/auth/components/AdminQuickLink";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { useUIStore } from "@/store/useUIStore";

export function TopNav() {
  const setNavigationOpen = useUIStore((state) => state.setNavigationOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(14,17,23,.08)] bg-[rgba(246,239,227,.78)] backdrop-blur-2xl">
      <div className="content-shell flex min-h-[4.35rem] items-center justify-between gap-4 py-3">
        <a href="/dashboard" className="group flex items-center gap-3" aria-label="Dashboard'a git">
          <span className="relative grid size-11 place-items-center overflow-hidden rounded-[1.05rem] bg-[var(--bureau-ink)] font-black text-[var(--bureau-inverse)] shadow-[0_18px_50px_rgba(14,17,23,.16)] transition duration-300 group-hover:-rotate-2 group-hover:scale-105">
            <span className="absolute inset-x-3 top-3 h-px bg-[rgba(255,250,242,.32)]" />
            D
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-black tracking-[-0.02em] text-[var(--bureau-ink)]">Dossier Bureau</p>
            <p className="text-xs font-semibold text-[var(--bureau-muted)]">KPSS Tarih çalışma dosyaları</p>
          </div>
        </a>

        <form
          action="/search"
          className="hidden max-w-xl flex-1 items-center gap-3 rounded-full border border-[rgba(14,17,23,.10)] bg-[rgba(255,250,242,.86)] px-4 py-2.5 text-sm font-semibold text-[var(--bureau-copy)] shadow-[var(--shadow-paper)] transition focus-within:bg-white focus-within:shadow-[var(--shadow-float)] md:flex"
        >
          <Search size={16} className="text-[var(--bureau-copy)]" />
          <input
            name="q"
            className="min-w-0 flex-1 bg-transparent text-[var(--bureau-ink)] outline-none placeholder:text-[var(--bureau-muted)]"
            placeholder="Dönem, kavram veya soru ara"
            autoComplete="off"
          />
          <button type="submit" className="btn-primary min-w-12 px-4 py-1.5 text-xs" data-dark-button="true">
            Ara
          </button>
        </form>

        <div className="flex items-center gap-2">
          <a href="/search" className="grid size-10 place-items-center rounded-full border border-[rgba(14,17,23,.10)] bg-[rgba(255,250,242,.86)] text-[var(--bureau-ink)] md:hidden" aria-label="Arama">
            <Search size={17} />
          </a>
          <AdminQuickLink />
          <AuthStatusButton />
          <button
            type="button"
            onClick={() => setNavigationOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-[rgba(14,17,23,.10)] bg-[rgba(255,250,242,.86)] text-[var(--bureau-ink)] lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
