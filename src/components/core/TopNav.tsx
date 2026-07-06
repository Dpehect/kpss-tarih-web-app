"use client";

import { Menu, Search } from "lucide-react";
import { AdminQuickLink } from "@/features/auth/components/AdminQuickLink";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { useUIStore } from "@/store/useUIStore";

export function TopNav() {
  const setNavigationOpen = useUIStore((state) => state.setNavigationOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(7,11,22,.08)] bg-[rgba(251,241,220,.80)] backdrop-blur-2xl">
      <div className="content-shell flex min-h-18 items-center justify-between gap-4 py-3">
        <a href="/dashboard" className="group flex items-center gap-3" aria-label="Dashboard'a git">
          <span className="relative grid size-11 place-items-center overflow-hidden rounded-[1.05rem] bg-[var(--atlas-ink)] font-black text-[var(--text-inverse)] shadow-[0_18px_50px_rgba(7,11,22,.16)] transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
            <span className="absolute inset-x-2 top-2 h-px bg-[rgba(255,248,234,.30)]" />
            T
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-black tracking-[-0.02em] text-[var(--atlas-ink)]">KPSS Tarih Akademi</p>
            <p className="text-xs font-semibold text-[var(--atlas-muted)]">Dijital tarih atlası</p>
          </div>
        </a>

        <form
          action="/search"
          className="hidden max-w-xl flex-1 items-center gap-3 rounded-full border border-[rgba(7,11,22,.10)] bg-[rgba(255,250,240,.84)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-xs)] transition focus-within:bg-white focus-within:shadow-[var(--shadow-sm)] md:flex"
        >
          <Search size={16} className="text-[var(--text-secondary)]" />
          <input
            name="q"
            className="min-w-0 flex-1 bg-transparent text-[var(--atlas-ink)] outline-none placeholder:text-[var(--atlas-muted)]"
            placeholder="Dönem, kavram veya soru ara"
            autoComplete="off"
          />
          <button type="submit" className="btn-primary min-w-12 px-4 py-1.5 text-xs" data-dark-button="true">
            Ara
          </button>
        </form>

        <div className="flex items-center gap-2">
          <a
            href="/search"
            className="grid size-10 place-items-center rounded-full border border-[rgba(7,11,22,.10)] bg-[rgba(255,250,240,.84)] text-[var(--atlas-ink)] md:hidden"
            aria-label="Arama"
          >
            <Search size={17} />
          </a>
          <AdminQuickLink />
          <AuthStatusButton />
          <button
            type="button"
            onClick={() => setNavigationOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-[rgba(7,11,22,.10)] bg-[rgba(255,250,240,.84)] text-[var(--atlas-ink)] lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
