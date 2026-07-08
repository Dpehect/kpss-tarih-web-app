"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Menu, Search, X } from "lucide-react";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { StreakCounter } from "@/components/ui/StreakCounter";
import { cn } from "@/lib/cn";
import { isActive, shellNavItems, Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const mobileNavItems = useMemo(() => shellNavItems.filter((item) => item.mobile), []);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-[var(--sb-bg)] text-[var(--sb-text)]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-[var(--sb-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:text-white">
        İçeriğe geç
      </a>

      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block">
        <Sidebar pathname={pathname} collapsed={collapsed} onCollapseChange={setCollapsed} />
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div className="fixed inset-0 z-[80] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Menüyü kapat" className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={closeMobile} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobil menü"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="absolute inset-y-0 left-0 w-[min(88vw,330px)] overflow-hidden rounded-r-[2rem] border-r border-white/10 bg-[var(--sb-surface-strong)] shadow-2xl"
            >
              <button
                type="button"
                onClick={closeMobile}
                className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface)] text-[var(--sb-text)]"
                aria-label="Menüyü kapat"
              >
                <X size={18} />
              </button>
              <Sidebar pathname={pathname} mobile onNavigate={closeMobile} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={cn("transition-[padding] duration-300", collapsed ? "lg:pl-[88px]" : "lg:pl-[292px]")}>
        <Topbar onOpenMenu={() => setMobileOpen(true)} />

        <main id="main-content" className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-50 rounded-[1.7rem] border border-[var(--sb-line)] bg-[var(--sb-surface)] p-2 shadow-[var(--sb-shadow-lg)] backdrop-blur-2xl lg:hidden" aria-label="Mobil hızlı menü">
        <div className="grid grid-cols-5 gap-1">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href as any}
                aria-current={active ? "page" : undefined}
                data-active={active ? "true" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-black text-[var(--sb-text-muted)] transition",
                  active && "bg-blue-700/10 text-[var(--sb-primary)]",
                )}
              >
                <Icon size={18} />
                <span>{item.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--sb-line)] bg-[var(--sb-bg)]/78 px-4 py-3 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1500px] items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          className="grid size-11 place-items-center rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface)] text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)] lg:hidden"
          aria-label="Menüyü aç"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden min-w-0 flex-1 md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sb-text-muted)]" size={18} />
          <input
            type="search"
            aria-label="Global arama"
            placeholder="Konu, kavram veya test ara..."
            className="h-12 w-full rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface)] pl-11 pr-4 text-sm font-semibold text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)] outline-none transition placeholder:text-[var(--sb-text-muted)] focus:border-blue-700/30 focus:ring-4 focus:ring-blue-700/10"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <StreakCounter compact className="hidden sm:inline-flex" />
          <button type="button" aria-label="Bildirimler" className="grid size-11 place-items-center rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface)] text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--sb-shadow-md)]">
            <Bell size={18} />
          </button>
          <ThemeToggle />
          <div className="hidden sm:block">
            <AuthStatusButton compact />
          </div>
        </div>
      </div>
    </header>
  );
}
