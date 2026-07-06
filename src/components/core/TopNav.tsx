"use client";

import { Menu, Search } from "lucide-react";
import { AdminQuickLink } from "@/features/auth/components/AdminQuickLink";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { useUIStore } from "@/store/useUIStore";

export function TopNav() {
  const setNavigationOpen = useUIStore((state) => state.setNavigationOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--stone)]">
      <div className="content-shell flex min-h-[56px] items-center justify-between gap-4 py-2.5">
        <a href="/dashboard" className="flex items-center gap-2.5" aria-label="Dashboard'a git">
          <span className="grid size-9 place-items-center rounded-lg bg-[var(--ink)] text-sm font-semibold text-white">
            T
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[var(--ink)]">Tarih</p>
            <p className="text-[11px] text-[var(--slate)]">KPSS Çalışma Platformu</p>
          </div>
        </a>

        <form
          action="/search"
          className="hidden max-w-md flex-1 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--warm-white)] px-3 py-2 text-sm text-[var(--graphite)] transition focus-within:border-[var(--border-strong)] md:flex"
        >
          <Search size={15} className="shrink-0 text-[var(--slate)]" />
          <input
            name="q"
            className="min-w-0 flex-1 bg-transparent text-[var(--ink)] outline-none placeholder:text-[var(--slate)]"
            placeholder="Dönem, kavram veya soru ara…"
            autoComplete="off"
          />
          <button type="submit" className="btn-primary px-3 py-1 text-xs">
            Ara
          </button>
        </form>

        <div className="flex items-center gap-1.5">
          <a href="/search" className="grid size-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--graphite)] md:hidden" aria-label="Arama">
            <Search size={16} />
          </a>
          <AdminQuickLink />
          <AuthStatusButton />
          <button
            type="button"
            onClick={() => setNavigationOpen(true)}
            className="grid size-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--graphite)] lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
