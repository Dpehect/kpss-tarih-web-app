"use client";

import { Menu, Search } from "lucide-react";
import { AdminQuickLink } from "@/features/auth/components/AdminQuickLink";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { useUIStore } from "@/store/useUIStore";

export function TopNav() {
  const setNavigationOpen = useUIStore((state) => state.setNavigationOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-[rgba(255,248,234,.88)] backdrop-blur-2xl">
      <div className="content-shell flex min-h-18 items-center justify-between gap-4 py-3">
        <a href="/dashboard" className="group flex items-center gap-3" aria-label="Dashboard'a git">
          <span className="grid size-11 place-items-center rounded-[1.1rem] bg-[var(--navy-900)] font-black text-[var(--text-inverse)] shadow-[0_18px_50px_rgba(11,18,32,.16)] transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
            T
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-black tracking-[-0.02em] text-[var(--navy-900)]">KPSS Tarih Akademi</p>
            <p className="text-xs font-semibold text-[var(--text-muted)]">Profesyonel çalışma atlası</p>
          </div>
        </a>

        <form
          action="/search"
          className="hidden max-w-xl flex-1 items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/88 px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-xs)] transition focus-within:bg-white focus-within:shadow-[var(--shadow-sm)] md:flex"
        >
          <Search size={16} className="text-[var(--text-secondary)]" />
          <input
            name="q"
            className="min-w-0 flex-1 bg-transparent text-[var(--navy-900)] outline-none placeholder:text-[var(--text-muted)]"
            placeholder="Kavram, dönem veya belge ara"
            autoComplete="off"
          />
          <button type="submit" className="inline-flex min-w-12 items-center justify-center rounded-full bg-[var(--navy-900)] px-4 py-1.5 text-xs font-black text-[var(--text-inverse)]">
            Ara
          </button>
        </form>

        <div className="flex items-center gap-2">
          <a
            href="/search"
            className="grid size-10 place-items-center rounded-full border border-[var(--border-soft)] bg-white/88 text-[var(--navy-900)] md:hidden"
            aria-label="Arama"
          >
            <Search size={17} />
          </a>
          <AdminQuickLink />
          <AuthStatusButton />
          <button
            type="button"
            onClick={() => setNavigationOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-[var(--border-soft)] bg-white/88 text-[var(--navy-900)] lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
