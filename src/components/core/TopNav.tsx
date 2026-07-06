"use client";

import { Menu, Search } from "lucide-react";
import { AdminQuickLink } from "@/features/auth/components/AdminQuickLink";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { useUIStore } from "@/store/useUIStore";

export function TopNav() {
  const setNavigationOpen = useUIStore((state) => state.setNavigationOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(16,16,16,.08)] bg-[rgba(247,242,232,.76)] backdrop-blur-2xl">
      <div className="content-shell flex min-h-[4.35rem] items-center justify-between gap-4 py-3">
        <a href="/dashboard" className="group flex items-center gap-3" aria-label="Dashboard'a git">
          <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-[var(--lab-ink)] font-black text-[var(--lab-inverse)] shadow-[0_18px_50px_rgba(16,16,16,.16)] transition duration-300 group-hover:scale-105">
            <span className="absolute inset-x-3 top-3 h-px bg-[rgba(215,255,79,.85)]" />
            C
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-black tracking-[-0.02em] text-[var(--lab-ink)]">ChronoLab</p>
            <p className="text-xs font-semibold text-[var(--lab-muted)]">KPSS Tarih deney laboratuvarı</p>
          </div>
        </a>

        <form
          action="/search"
          className="hidden max-w-xl flex-1 items-center gap-3 rounded-full border border-[rgba(16,16,16,.10)] bg-[rgba(255,252,245,.84)] px-4 py-2.5 text-sm font-semibold text-[var(--lab-muted)] shadow-[var(--shadow-thin)] transition focus-within:bg-white focus-within:shadow-[var(--shadow-float)] md:flex"
        >
          <Search size={16} className="text-[var(--lab-muted)]" />
          <input
            name="q"
            className="min-w-0 flex-1 bg-transparent text-[var(--lab-ink)] outline-none placeholder:text-[var(--lab-soft)]"
            placeholder="Dönem, kavram veya soru ara"
            autoComplete="off"
          />
          <button type="submit" className="btn-primary min-w-12 px-4 py-1.5 text-xs" data-dark-button="true">
            Ara
          </button>
        </form>

        <div className="flex items-center gap-2">
          <a href="/search" className="grid size-10 place-items-center rounded-full border border-[rgba(16,16,16,.10)] bg-[rgba(255,252,245,.84)] text-[var(--lab-ink)] md:hidden" aria-label="Arama">
            <Search size={17} />
          </a>
          <AdminQuickLink />
          <AuthStatusButton />
          <button
            type="button"
            onClick={() => setNavigationOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-[rgba(16,16,16,.10)] bg-[rgba(255,252,245,.84)] text-[var(--lab-ink)] lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
