"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import {
  BarChart3,
  BookOpen,
  CalendarClock,
  ClipboardList,
  CreditCard,
  Home,
  Layers3,
  Menu,
  NotebookPen,
  ShieldCheck,
  Target,
  Trophy,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { SBBrandMark } from "@/components/brand/SBBrandMark";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { cn } from "@/lib/cn";

type NavGroup = "Öğrenme" | "Pratik" | "Takip" | "Hesap";

type NavItem = {
  label: string;
  shortLabel: string;
  href: string;
  icon: LucideIcon;
  group: NavGroup;
  mobile?: boolean;
};

const navGroups: NavGroup[] = ["Öğrenme", "Pratik", "Takip", "Hesap"];

const mainNavItems: NavItem[] = [
  { label: "Kontrol Paneli", shortLabel: "Panel", href: "/dashboard", icon: Home, group: "Takip", mobile: true },
  { label: "Konu Akademisi", shortLabel: "Konu", href: "/topics", icon: BookOpen, group: "Öğrenme", mobile: true },
  { label: "Soru Bankası", shortLabel: "Test", href: "/question-bank", icon: ClipboardList, group: "Pratik", mobile: true },
  { label: "Deneme Merkezi", shortLabel: "Deneme", href: "/exams", icon: Target, group: "Pratik" },
  { label: "Flashcard Tekrar", shortLabel: "Kart", href: "/flashcards", icon: Layers3, group: "Öğrenme", mobile: true },
  { label: "Kronoloji Atlası", shortLabel: "Zaman", href: "/timeline", icon: CalendarClock, group: "Öğrenme" },
  { label: "Analiz Raporu", shortLabel: "Analiz", href: "/analytics", icon: BarChart3, group: "Takip", mobile: true },
  { label: "Yanlış Defteri", shortLabel: "Yanlış", href: "/mistakes", icon: ShieldCheck, group: "Takip" },
  { label: "Notlar", shortLabel: "Not", href: "/notes", icon: NotebookPen, group: "Öğrenme" },
  { label: "Başarılar", shortLabel: "Rozet", href: "/achievements", icon: Trophy, group: "Takip" },
  { label: "Profil", shortLabel: "Profil", href: "/profile", icon: UserRound, group: "Hesap" },
  { label: "Yönetim", shortLabel: "Admin", href: "/admin", icon: CreditCard, group: "Hesap" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/dashboard";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileNavItems = useMemo(() => mainNavItems.filter((item) => item.mobile), []);

  function closeMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_34%),linear-gradient(135deg,#fffaf0_0%,#f4fbff_46%,#f8fff5_100%)] text-[var(--bureau-ink)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-2xl focus:bg-[#101828] focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-white"
      >
        İçeriğe geç
      </a>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute bottom-20 right-[-7rem] h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <DesktopSidebar pathname={pathname} onNavigate={closeMenu} />

      <header className="sticky top-0 z-40 border-b border-[var(--bureau-line)] bg-white/78 backdrop-blur-2xl lg:ml-80 lg:hidden">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4">
          <Link href={asRoute("/dashboard")} onClick={closeMenu} className="flex min-w-0 items-center gap-3">
            <SBBrandMark size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-[#101828]">KPSS Tarih Akademi</p>
              <p className="truncate text-[11px] font-bold text-[#667085]">Profesyonel çalışma paneli</p>
            </div>
          </Link>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="grid size-12 place-items-center rounded-2xl border border-[var(--bureau-line)] bg-white text-[#101828] shadow-[var(--shadow-paper)] transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Mobil menüyü kapat"
            className="absolute inset-0 bg-[#101828]/35 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <aside className="absolute left-3 right-3 top-3 max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-[2rem] border border-white/70 bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Link href={asRoute("/dashboard")} onClick={closeMenu} className="flex items-center gap-3">
                <SBBrandMark size="sm" />
                <div>
                  <p className="text-sm font-black text-[#101828]">KPSS Tarih Akademi</p>
                  <p className="text-[11px] font-bold text-[#667085]">Çalışma paneli</p>
                </div>
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                className="grid size-11 place-items-center rounded-2xl border border-[var(--bureau-line)] bg-[#f8fafc] text-[#101828]"
                aria-label="Menüyü kapat"
              >
                <X className="size-5" />
              </button>
            </div>
            <ShellNav pathname={pathname} items={mainNavItems} onNavigate={closeMenu} />
            <div className="mt-5 rounded-[1.5rem] border border-[#dbeafe] bg-[#eff6ff] p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2563eb]">Akıllı akış</p>
              <p className="mt-2 text-sm font-bold leading-6 text-[#1d2939]">
                Konu anlatımı, açıklamalı test ve analiz adımlarını tek sırada takip et.
              </p>
            </div>
          </aside>
        </div>
      ) : null}

      <main id="main-content" className="min-h-screen pb-28 lg:ml-80 lg:pb-0">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 rounded-[1.75rem] border border-white/70 bg-white/92 p-2 shadow-[0_20px_70px_rgba(16,24,40,0.18)] backdrop-blur-2xl lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileNavItems.map((item) => {
            const active = isActive(pathname, item.href);
            return <MobileNavItem key={item.href} item={item} active={active} />;
          })}
        </div>
      </nav>
    </div>
  );
}

function DesktopSidebar({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-80 border-r border-white/70 bg-white/86 p-4 shadow-[20px_0_80px_rgba(16,24,40,0.08)] backdrop-blur-2xl lg:flex lg:flex-col">
      <Link href={asRoute("/dashboard")} onClick={onNavigate} className="mb-6 flex items-center gap-3 rounded-[1.75rem] px-2 py-2 transition hover:bg-white">
        <SBBrandMark size="lg" />
        <div className="min-w-0">
          <p className="truncate text-base font-black text-[#101828]">KPSS Tarih Akademi</p>
          <p className="truncate text-xs font-bold text-[#667085]">Sınav odaklı öğrenme sistemi</p>
        </div>
      </Link>

      <ShellNav pathname={pathname} items={mainNavItems} onNavigate={onNavigate} />

      <div className="mt-auto space-y-4 pt-6">
        <div className="rounded-[1.75rem] border border-[#dbeafe] bg-gradient-to-br from-[#eff6ff] to-[#f0fdf4] p-4 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2563eb]">Bugünün odağı</p>
          <p className="mt-2 text-sm font-black text-[#101828]">Konu → Test → Analiz</p>
          <p className="mt-2 text-xs font-semibold leading-5 text-[#475467]">
            Önce konuyu kavra, ardından açıklamalı testle eksiklerini ölç.
          </p>
          <Link
            href={asRoute("/question-bank")}
            onClick={onNavigate}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-[#101828] px-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            30 soruluk teste başla
          </Link>
        </div>
        <AuthStatusButton />
      </div>
    </aside>
  );
}

function ShellNav({ pathname, items, onNavigate }: { pathname: string; items: NavItem[]; onNavigate: () => void }) {
  return (
    <div className="space-y-5">
      {navGroups.map((group) => {
        const groupItems = items.filter((item) => item.group === group);
        if (!groupItems.length) return null;

        return (
          <section key={group} aria-label={group} className="space-y-2">
            <p className="px-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#98a2b3]">{group}</p>
            <div className="space-y-1">
              {groupItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={asRoute(item.href)}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    data-active={active ? "true" : undefined}
                    className={cn(
                      "group flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-black text-[#344054] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2",
                      "hover:-translate-y-0.5 hover:bg-white hover:text-[#101828] hover:shadow-[0_12px_30px_rgba(16,24,40,0.08)]",
                      active && "bg-[#101828] text-white shadow-[0_12px_30px_rgba(16,24,40,0.18)] hover:bg-[#101828] hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-xl bg-[#f2f4f7] text-[#475467] transition",
                        active && "bg-white/14 text-white",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function MobileNavItem({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={asRoute(item.href)}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-black text-[#667085] transition",
        active && "bg-[#101828] text-white shadow-sm",
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="max-w-full truncate px-1">{item.shortLabel}</span>
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/" || pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function asRoute(href: string) {
  return href as Route;
}
