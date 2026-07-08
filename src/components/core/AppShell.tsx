"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  CalendarClock,
  ChevronRight,
  ClipboardList,
  Home,
  Layers3,
  Menu,
  NotebookPen,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import { SBBrandMark } from "@/components/brand/SBBrandMark";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { cn } from "@/lib/cn";

type NavGroup = "Ana Akış" | "Öğrenme" | "Sınav" | "Hesap";

type NavItem = {
  label: string;
  shortLabel: string;
  href: string;
  icon: LucideIcon;
  group: NavGroup;
  description: string;
  mobile?: boolean;
};

const navItems: NavItem[] = [
  {
    label: "Kontrol Paneli",
    shortLabel: "Panel",
    href: "/dashboard",
    icon: Home,
    group: "Ana Akış",
    description: "Günlük plan, ilerleme ve öneriler",
    mobile: true,
  },
  {
    label: "Konu Akademisi",
    shortLabel: "Konu",
    href: "/topics",
    icon: BookOpen,
    group: "Öğrenme",
    description: "Dönem bazlı derin konu anlatımı",
    mobile: true,
  },
  {
    label: "Soru Bankası",
    shortLabel: "Test",
    href: "/question-bank",
    icon: ClipboardList,
    group: "Sınav",
    description: "Konu testleri ve açıklamalı çözümler",
    mobile: true,
  },
  {
    label: "Deneme Merkezi",
    shortLabel: "Deneme",
    href: "/exams",
    icon: Target,
    group: "Sınav",
    description: "Süreli KPSS simülasyonları",
  },
  {
    label: "Flashcard Tekrar",
    shortLabel: "Kart",
    href: "/flashcards",
    icon: Layers3,
    group: "Öğrenme",
    description: "Aktif hatırlama ve aralıklı tekrar",
    mobile: true,
  },
  {
    label: "Kronoloji Atlası",
    shortLabel: "Zaman",
    href: "/timeline",
    icon: CalendarClock,
    group: "Öğrenme",
    description: "Olay, dönem ve bağlantı haritası",
  },
  {
    label: "Analiz Raporu",
    shortLabel: "Analiz",
    href: "/analytics",
    icon: BarChart3,
    group: "Ana Akış",
    description: "Doğruluk, eksik konu ve trendler",
    mobile: true,
  },
  {
    label: "Yanlış Defteri",
    shortLabel: "Yanlış",
    href: "/mistakes",
    icon: ShieldCheck,
    group: "Ana Akış",
    description: "Tekrar edilmesi gereken hatalar",
  },
  {
    label: "Notlar",
    shortLabel: "Not",
    href: "/notes",
    icon: NotebookPen,
    group: "Öğrenme",
    description: "Kişisel tarih notların",
  },
  {
    label: "Başarılar",
    shortLabel: "Rozet",
    href: "/achievements",
    icon: Trophy,
    group: "Ana Akış",
    description: "Seri, hedef ve çalışma başarıları",
  },
  {
    label: "Profil",
    shortLabel: "Profil",
    href: "/profile",
    icon: UserRound,
    group: "Hesap",
    description: "Hesap ve çalışma tercihleri",
  },
];

const groupOrder: NavGroup[] = ["Ana Akış", "Öğrenme", "Sınav", "Hesap"];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileNavItems = useMemo(() => navItems.filter((item) => item.mobile), []);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-transparent text-[var(--bureau-ink)]">
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[var(--bureau-ink)] focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-[var(--bureau-inverse)]"
      >
        İçeriğe geç
      </Link>

      <DesktopSidebar pathname={pathname} />

      <div className="lg:pl-[304px]">
        <header className="sticky top-0 z-30 border-b border-[var(--bureau-line)] bg-[rgba(255,250,242,.76)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[rgba(255,250,242,.70)]">
          <div className="content-shell flex min-h-[76px] items-center justify-between gap-3 py-3">
            <Link href="/dashboard" className="flex min-w-0 items-center gap-3 lg:hidden">
              <SBBrandMark size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-black tracking-[-.03em]">Softbridge Akademi</p>
                <p className="truncate text-[11px] font-bold text-[var(--bureau-muted)]">KPSS Tarih çalışma paneli</p>
              </div>
            </Link>

            <div className="hidden min-w-0 items-center gap-3 lg:flex">
              <div className="grid size-11 place-items-center rounded-2xl border border-[var(--bureau-line)] bg-[rgba(255,250,242,.82)] shadow-[var(--shadow-paper)]">
                <Search size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[.18em] text-[var(--bureau-teal)]">Çalışma komuta merkezi</p>
                <p className="truncate text-sm font-bold text-[var(--bureau-muted)]">Konu → test → analiz akışına kaldığın yerden devam et.</p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <AuthStatusButton variant="header" className="hidden sm:inline-flex" />
              <button
                type="button"
                aria-label="Menüyü aç veya kapat"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((value) => !value)}
                className="grid size-12 place-items-center rounded-2xl border border-[var(--bureau-line)] bg-[rgba(255,250,242,.88)] text-[var(--bureau-ink)] shadow-[var(--shadow-paper)] lg:hidden"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </header>

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Mobil menüyü kapat"
              className="absolute inset-0 bg-[rgba(14,17,23,.28)] backdrop-blur-sm"
              onClick={closeMobileMenu}
            />
            <aside className="absolute left-3 right-3 top-3 max-h-[calc(100vh-1.5rem)] overflow-hidden rounded-[2rem] border border-[var(--bureau-line)] bg-[var(--bureau-bone-2)] p-4 shadow-[var(--shadow-stage)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <Link href="/dashboard" onClick={closeMobileMenu} className="flex min-w-0 items-center gap-3">
                  <SBBrandMark size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black">Softbridge Akademi</p>
                    <p className="truncate text-[11px] font-bold text-[var(--bureau-muted)]">KPSS Tarih platformu</p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="grid size-10 place-items-center rounded-xl border border-[var(--bureau-line)] bg-white/80"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mb-4">
                <AuthStatusButton variant="sidebar" />
              </div>
              <ShellNav pathname={pathname} items={navItems} onNavigate={closeMobileMenu} compact={false} />
            </aside>
          </div>
        ) : null}

        <main id="main-content" className="content-shell pb-28 pt-6 lg:pb-12 lg:pt-8">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-30 rounded-[1.45rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.88)] p-2 shadow-[0_22px_72px_rgba(14,17,23,.16)] backdrop-blur-2xl lg:hidden">
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

function DesktopSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[304px] border-r border-[var(--bureau-line)] bg-[rgba(255,250,242,.70)] p-4 backdrop-blur-2xl lg:flex lg:flex-col">
      <Link
        href="/dashboard"
        className="mb-5 flex items-center gap-3 rounded-[1.45rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] p-3 shadow-[var(--shadow-paper)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]"
      >
        <SBBrandMark size="md" />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-black tracking-[-.04em]">Softbridge Akademi</p>
          <p className="truncate text-[11px] font-bold uppercase tracking-[.14em] text-[var(--bureau-muted)]">KPSS Tarih</p>
        </div>
      </Link>

      <div className="mb-4 rounded-[1.35rem] border border-[rgba(14,17,23,.08)] bg-[var(--bureau-ink)] p-4 text-[var(--bureau-inverse)] shadow-[0_28px_80px_rgba(14,17,23,.18)]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[rgba(255,250,242,.12)] px-3 py-1 text-[10px] font-black uppercase tracking-[.16em] text-[var(--bureau-inverse)]">
            Bugünün akışı
          </span>
          <Sparkles size={16} className="text-[var(--bureau-inverse)]" />
        </div>
        <p className="text-lg font-black tracking-[-.05em] text-[var(--bureau-inverse)]">Konu → Test → Analiz</p>
        <p className="mt-1 text-xs font-semibold leading-5 text-[var(--bureau-inverse-copy)]">
          Önce kısa özetle kavra, ardından açıklamalı testle eksiklerini gör.
        </p>
        <Link href="/question-bank" className="mt-4 inline-flex w-full items-center justify-between rounded-2xl bg-[var(--bureau-inverse)] px-4 py-3 text-xs font-black text-[var(--bureau-ink)] transition hover:-translate-y-0.5">
          Test merkezine geç <ChevronRight size={16} />
        </Link>
      </div>

      <ShellNav pathname={pathname} items={navItems} onNavigate={() => undefined} compact />

      <div className="mt-auto space-y-3 border-t border-[var(--bureau-line)] pt-4">
        <div className="grid grid-cols-2 gap-2">
          <MetricTile label="Ders" value="Tarih" />
          <MetricTile label="Mod" value="KPSS" />
        </div>
        <AuthStatusButton variant="sidebar" />
        <p className="px-1 text-[10px] font-bold leading-4 text-[var(--bureau-muted)]">
          Bağımsız eğitim platformudur; resmi ÖSYM/MEB ürünü değildir.
        </p>
      </div>
    </aside>
  );
}

function ShellNav({
  pathname,
  items,
  onNavigate,
  compact,
}: {
  pathname: string;
  items: NavItem[];
  onNavigate: () => void;
  compact: boolean;
}) {
  const grouped = items.reduce<Record<NavGroup, NavItem[]>>(
    (acc, item) => {
      acc[item.group].push(item);
      return acc;
    },
    { "Ana Akış": [], Öğrenme: [], Sınav: [], Hesap: [] },
  );

  return (
    <div className={cn("scrollbar-clean flex-1 overflow-y-auto pr-1", compact ? "space-y-4" : "max-h-[65vh] space-y-5")}>
      {groupOrder.map((group) => (
        <section key={group} className="space-y-2">
          <p className="px-3 text-[10px] font-black uppercase tracking-[.18em] text-[var(--bureau-muted)]">{group}</p>
          <div className="space-y-1.5">
            {grouped[group].map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  data-active={active ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-[1.05rem] border px-3 py-3 text-sm font-black transition duration-200",
                    active
                      ? "border-[var(--bureau-ink)] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)] shadow-[0_18px_52px_rgba(14,17,23,.14)]"
                      : "border-transparent text-[var(--bureau-copy)] hover:border-[var(--bureau-line)] hover:bg-[rgba(255,250,242,.72)] hover:text-[var(--bureau-ink)]",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl border transition",
                      active
                        ? "border-[rgba(255,250,242,.20)] bg-[rgba(255,250,242,.12)]"
                        : "border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] group-hover:bg-white",
                    )}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{item.label}</span>
                    <span className={cn("block truncate text-[11px] font-bold", active ? "text-[var(--bureau-inverse-copy)]" : "text-[var(--bureau-muted)]")}>
                      {item.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function MobileNavItem({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      data-active={active ? "true" : undefined}
      className={cn(
        "flex min-h-14 flex-col items-center justify-center gap-1 rounded-[1rem] px-1 text-[10px] font-black transition",
        active ? "bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]" : "text-[var(--bureau-muted)] hover:bg-[rgba(14,17,23,.05)] hover:text-[var(--bureau-ink)]",
      )}
    >
      <Icon size={18} />
      <span className="truncate">{item.shortLabel}</span>
    </Link>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--bureau-line)] bg-[rgba(255,250,242,.74)] p-3 shadow-[var(--shadow-paper)]">
      <p className="text-[10px] font-black uppercase tracking-[.15em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-1 text-sm font-black text-[var(--bureau-ink)]">{value}</p>
    </div>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}
