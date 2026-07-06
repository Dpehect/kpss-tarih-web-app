"use client";

import { Menu, Search } from "lucide-react";
import { AdminQuickLink } from "@/features/auth/components/AdminQuickLink";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { useUIStore } from "@/store/useUIStore";

export function TopNav() {
  const setNavigationOpen = useUIStore((state) => state.setNavigationOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--background),transparent_14%)] backdrop-blur-2xl">
      <div className="content-shell flex min-h-18 items-center justify-between gap-4 py-3">
        <a href="/dashboard" className="group flex items-center gap-3" aria-label="Dashboard'a git">
          <span className="grid size-11 place-items-center rounded-[1.1rem] bg-[var(--foreground)] font-black text-[var(--background)] shadow-[0_18px_50px_color-mix(in_srgb,var(--foreground),transparent_84%)] transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
            T
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-black tracking-[-0.02em] text-[var(--foreground)]">KPSS Tarih Akademi</p>
            <p className="text-xs text-[var(--muted-foreground)]">Profesyonel çalışma atlası</p>
          </div>
        </a>

        <form
          action="/search"
          className="hidden max-w-xl flex-1 items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-strong),transparent_26%)] px-4 py-2.5 text-sm font-semibold text-[var(--muted-foreground)] shadow-[0_12px_38px_rgba(15,23,42,0.045)] transition focus-within:bg-[var(--surface-strong)] focus-within:shadow-[var(--shadow-soft)] md:flex"
        >
          <Search size={16} />
          <input
            name="q"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[color-mix(in_srgb,var(--muted-foreground),transparent_34%)]"
            placeholder="Kavram, dönem veya belge ara"
            autoComplete="off"
          />
          <button type="submit" className="rounded-full bg-[var(--foreground)] px-3 py-1 text-xs font-black text-[var(--background)]">
            Ara
          </button>
        </form>

        <div className="flex items-center gap-2">
          <a
            href="/search"
            className="grid size-10 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] md:hidden"
            aria-label="Arama"
          >
            <Search size={17} />
          </a>
          <AdminQuickLink />
          <AuthStatusButton />

          <button
            type="button"
            onClick={() => setNavigationOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
