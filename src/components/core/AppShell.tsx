"use client";

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
  Search,
  ShieldCheck,
  Target,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import { SBBrandMark } from "@/components/brand/SBBrandMark";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { cn } from "@/lib/cn";

type NavItem = {
  label: string;
  shortLabel: string;
  href: string;
  icon: typeof Home;
  group: "Öğrenme" | "Pratik" | "Takip" | "Hesap";
  mobile?: boolean;
};

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
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileNavItems = useMemo(() => mainNavItems.filter((item) => item.mobile), []);

  function closeMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[var(--bureau-bone)] text-[var(--bureau-ink)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-2xl focus:bg-[var(--bureau-ink)] focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-[var(--bureau-inverse)]"
      >
        İçeriğe geç
      </a>

      <div aria-hidden="true" data-decorative="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[8%] top-[-12rem] h-[28rem] w-[28rem] rounded-full bg-[rgba(4,126,137,.12)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[20%] h-[24rem] w-[24rem] rounded-full bg-[rgba(37,63,116,.10)] blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[35%] h-[28rem] w-[28rem] rounded-full bg-[rgba(102,52,95,.08)] blur-3xl" />
      </div>

      <DesktopSidebar pathname={pathname} onNavigate={closeMenu} />

      <header className="sticky top-0 z-40 border-b border-[var(--bureau-line)] bg-[rgba(255,250,242,.86)] px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="grid size-12 place-items-center rounded-2xl border border-[var(--bureau-line)] bg-white text-[var(--bureau-ink)] shadow-[var(--shadow-paper)]"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/dashboard" onClick={closeMenu} className="flex min-w-0 items-center gap-3">
            <SBBrandMark size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-black">KPSS Tarih Akademi</p>
              <p className="truncate text-[11px] font-bold text-[var(--bureau-muted)]">Profesyonel çalışma paneli</p>
            </div>
          </Link>

          <Link
            href="/search"
            onClick={closeMenu}
            className="grid size-12 place-items-center rounded-2xl border border-[var(--bureau-line)] bg-white text-[var(--bureau-ink)] shadow-[var(--shadow-paper)]"
            aria-label="Ara"
          >
            <Search size={19} />
          </Link>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Mobil menüyü kapat"
            onClick={closeMenu}
            className="absolute inset-0 h-full w-full cursor-default bg-[rgba(14,17,23,.34)] backdrop-blur-sm"
          />
          <aside className="relative z-10 h-full w-[min(86vw,360px)] overflow-y-auto border-r border-[var(--bureau-line)] bg-[var(--bureau-bone-2)] p-5 shadow-[var(--shadow-stage)]">
            <div className="mb-6 flex items-center justify-between gap-3">
              <Link href="/dashboard" onClick={closeMenu} className="flex items-center gap-3">
                <SBBrandMark size="md" />
                <div>
                  <p className="text-sm font-black">KPSS Tarih Akademi</p>
                  <p className="text-xs font-bold text-[var(--bureau-muted)]">Çalışma paneli</p>
                </div>
              </Link>
              <button
                type="button"
                aria-label="Menüyü kapat"
                onClick={closeMenu}
                className="grid size-10 place-items-center rounded-2xl border border-[var(--bureau-line)] bg-white text-[var(--bureau-ink)]"
              >
                <X size={18} />
              </button>
            </div>
            <ShellNav pathname={pathname} items={mainNavItems} onNavigate={closeMenu} />
          </aside>
        </div>
      ) : null}

      <main id="main-content" className="relative z-10 pb-28 lg:ml-[304px] lg:pb-10">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 rounded-[1.6rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.94)] p-2 shadow-[0_22px_70px_rgba(14,17,23,.16)] backdrop-blur-xl lg:hidden" aria-label="Alt menü">
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
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[304px] border-r border-[var(--bureau-line)] bg-[rgba(255,250,242,.88)] p-5 shadow-[18px_0_80px_rgba(14,17,23,.06)] backdrop-blur-2xl lg:flex lg:flex-col">
      <Link href="/dashboard" onClick={onNavigate} className="mb-7 flex items-center gap-3 rounded-[1.4rem] border border-[var(--bureau-line)] bg-white/70 p-3 shadow-[var(--shadow-paper)]">
        <SBBrandMark size="md" />
        <div>
          <p className="text-[15px] font-black tracking-[-.02em]">KPSS Tarih Akademi</p>
          <p className="text-xs font-bold text-[var(--bureau-muted)]">Sınav odaklı öğrenme sistemi</p>
        </div>
      </Link>

      <div className="mb-5 rounded-[1.35rem] border border-[rgba(4,126,137,.18)] bg-[rgba(4,126,137,.08)] p-4">
        <p className="text-[11px] font-black uppercase tracking-[.16em] text-[var(--bureau-teal)]">Bugünün odağı</p>
        <p className="mt-2 text-sm font-black text-[var(--bureau-ink)]">Konu → Test → Analiz</p>
        <p className="mt-1 text-xs leading-5 text-[var(--bureau-copy)]">Önce konuyu kavra, ardından açıklamalı testle eksiklerini ölç.</p>
      </div>

      <ShellNav pathname={pathname} items={mainNavItems} onNavigate={onNavigate} />

      <div className="mt-auto space-y-3 pt-5">
        <AuthStatusButton />
        <Link
          href="/question-bank"
          className="flex items-center justify-between rounded-[1.25rem] bg-[var(--bureau-ink)] px-4 py-3 text-sm font-black text-[var(--bureau-inverse)] shadow-[var(--shadow-float)]"
        >
          30 soruluk teste başla
          <Target size={17} />
        </Link>
      </div>
    </aside>
  );
}

function ShellNav({ pathname, items, onNavigate }: { pathname: string; items: NavItem[]; onNavigate: () => void }) {
  const grouped = items.reduce<Record<NavItem["group"], NavItem[]>>(
    (acc, item) => {
      acc[item.group].push(item);
      return acc;
    },
    { Öğrenme: [], Pratik: [], Takip: [], Hesap: [] },
  );

  return (
    <nav className="space-y-5" aria-label="Ana menü">
      {(Object.keys(grouped) as NavItem["group"][]).map((group) => (
        <div key={group}>
          <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-[.18em] text-[var(--bureau-muted)]">{group}</p>
          <div className="space-y-1">
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
                    "group flex items-center gap-3 rounded-[1.05rem] px-3.5 py-3 text-sm font-extrabold transition-all duration-200",
                    active
                      ? "bg-[var(--bureau-ink)] text-[var(--bureau-inverse)] shadow-[0_16px_45px_rgba(14,17,23,.18)]"
                      : "text-[var(--bureau-copy)] hover:bg-white hover:text-[var(--bureau-ink)] hover:shadow-[var(--shadow-paper)]",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-2xl transition-colors",
                      active ? "bg-white/12 text-[var(--bureau-inverse)]" : "bg-[rgba(14,17,23,.05)] text-[var(--bureau-muted)] group-hover:text-[var(--bureau-ink)]",
                    )}
                  >
                    <Icon size={17} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
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
        "flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-[1.15rem] text-[10px] font-black transition-all",
        active ? "bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]" : "text-[var(--bureau-muted)] hover:bg-white hover:text-[var(--bureau-ink)]",
      )}
    >
      <Icon size={18} />
      <span>{item.shortLabel}</span>
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}
