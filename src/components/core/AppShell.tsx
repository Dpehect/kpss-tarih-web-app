"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FileText,
  Home,
  Layers3,
  Menu,
  NotebookPen,
  Search,
  ShieldCheck,
  Target,
  Trophy,
  UserRound,
  X
} from "lucide-react";
import { SBBrandMark } from "@/components/brand/SBBrandMark";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";

type NavItem = {
  label: string;
  href: string;
  icon: typeof Home;
  mobile?: boolean;
};

const mainNavItems: NavItem[] = [
  { label: "Panel", href: "/dashboard", icon: Home, mobile: true },
  { label: "Konu", href: "/topics", icon: BookOpen, mobile: true },
  { label: "Test", href: "/question-bank", icon: ClipboardList, mobile: true },
  { label: "Deneme", href: "/exams", icon: Target },
  { label: "Kart", href: "/flashcards", icon: Layers3, mobile: true },
  { label: "Timeline", href: "/timeline", icon: FileText },
  { label: "Analiz", href: "/analytics", icon: BarChart3, mobile: true },
  { label: "Yanlışlar", href: "/mistakes", icon: ShieldCheck },
  { label: "Notlar", href: "/notes", icon: NotebookPen },
  { label: "Başarılar", href: "/achievements", icon: Trophy },
  { label: "Profil", href: "/profile", icon: UserRound },
  { label: "Admin", href: "/admin", icon: ShieldCheck }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileNavItems = useMemo(() => mainNavItems.filter((item) => item.mobile), []);

  function closeMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div data-app-shell="true" className="min-h-screen bg-[#f7efe3] text-[#101828]">
      <a
        href="#app-content"
        data-clickable="true"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#101828] focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-white"
      >
        İçeriğe geç
      </a>

      <DesktopSidebar pathname={pathname} onNavigate={closeMenu} />

      <header
        data-app-topbar="true"
        className="fixed left-0 right-0 top-0 z-[60] border-b border-[#e4d8c8] bg-[#f7efe3]/94 px-4 py-3 backdrop-blur-xl md:left-72 md:px-6"
      >
        <div className="flex min-h-12 items-center gap-3">
          <button
            type="button"
            data-clickable="true"
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="inline-grid size-12 shrink-0 place-items-center rounded-2xl border border-[#e4d8c8] bg-white text-[#101828] shadow-[0_10px_30px_rgba(16,24,40,.08)] md:hidden"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a
            href="/dashboard"
            data-clickable="true"
            className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-1 py-1 md:flex-none"
          >
            <SBBrandMark className="size-11 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-base font-black tracking-[-0.04em] text-[#101828]">Softbridge Akademi</p>
              <p className="truncate text-xs font-bold text-[#667085]">KPSS Tarih Çalışma Platformu</p>
            </div>
          </a>

          <form
            action="/search"
            className="relative hidden min-w-[260px] flex-1 lg:block"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#667085]" />
            <input
              name="q"
              type="search"
              placeholder="Sitede ara..."
              className="h-11 w-full rounded-full border border-[#e4d8c8] bg-white px-11 text-sm font-bold text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#b4232a]"
            />
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <a
              href="/admin"
              data-clickable="true"
              className="hidden min-h-11 items-center rounded-full border border-[#e4d8c8] bg-white px-4 text-sm font-black text-[#101828] shadow-[0_10px_30px_rgba(16,24,40,.06)] sm:inline-flex"
            >
              Admin
            </a>
            <AuthStatusButton />
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-[80] md:hidden" data-mobile-menu-layer="true">
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={closeMenu}
            className="absolute inset-0 bg-[#101828]/35"
          />
          <aside className="absolute left-0 top-0 h-full w-[min(330px,88vw)] overflow-y-auto border-r border-[#e4d8c8] bg-[#f7efe3] p-4 shadow-[30px_0_90px_rgba(16,24,40,.28)]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <a href="/dashboard" onClick={closeMenu} data-clickable="true" className="flex min-h-12 items-center gap-3 rounded-2xl">
                <SBBrandMark className="size-11" />
                <div>
                  <p className="text-sm font-black text-[#101828]">Softbridge Akademi</p>
                  <p className="text-xs font-bold text-[#667085]">Çalışma paneli</p>
                </div>
              </a>

              <button
                type="button"
                data-clickable="true"
                aria-label="Menüyü kapat"
                onClick={closeMenu}
                className="grid size-11 place-items-center rounded-2xl border border-[#e4d8c8] bg-white text-[#101828]"
              >
                <X size={20} />
              </button>
            </div>

            <ShellNav pathname={pathname} items={mainNavItems} onNavigate={closeMenu} />
          </aside>
        </div>
      ) : null}

      <main
        id="app-content"
        data-app-content="true"
        className="relative z-10 min-h-screen px-4 pb-28 pt-[88px] md:pl-[19.5rem] md:pr-6 md:pt-[92px]"
      >
        {children}
      </main>

      <nav
        data-mobile-bottom-nav="true"
        aria-label="Mobil hızlı menü"
        className="fixed bottom-0 left-0 right-0 z-[70] border-t border-[#e4d8c8] bg-[#f7efe3]/96 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-18px_50px_rgba(16,24,40,.12)] backdrop-blur-xl md:hidden"
      >
        <div className="grid grid-cols-5 gap-1">
          {mobileNavItems.map((item) => (
            <MobileNavItem key={item.href} item={item} active={isActive(pathname, item.href)} />
          ))}
        </div>
      </nav>
    </div>
  );
}

function DesktopSidebar({
  pathname,
  onNavigate
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <aside
      data-app-sidebar="true"
      className="fixed bottom-0 left-0 top-0 z-[70] hidden w-72 border-r border-[#e4d8c8] bg-[#f7efe3]/96 p-4 shadow-[18px_0_60px_rgba(16,24,40,.08)] backdrop-blur-xl md:block"
    >
      <a href="/dashboard" data-clickable="true" className="mb-6 flex min-h-14 items-center gap-3 rounded-[1.25rem] px-2">
        <SBBrandMark className="size-12 shrink-0" />
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-[#101828]">Softbridge Akademi</p>
          <p className="truncate text-xs font-bold text-[#667085]">KPSS Tarih</p>
        </div>
      </a>

      <ShellNav pathname={pathname} items={mainNavItems} onNavigate={onNavigate} />
    </aside>
  );
}

function ShellNav({
  pathname,
  items,
  onNavigate
}: {
  pathname: string;
  items: NavItem[];
  onNavigate: () => void;
}) {
  return (
    <nav className="grid gap-1.5" aria-label="Ana menü">
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);

        return (
          <a
            key={item.href}
            href={item.href}
            data-clickable="true"
            data-active={active ? "true" : "false"}
            onClick={onNavigate}
            className={[
              "group relative flex min-h-12 w-full items-center gap-3 rounded-2xl px-3 text-sm font-black transition",
              "outline-none focus-visible:ring-2 focus-visible:ring-[#b4232a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7efe3]",
              active
                ? "bg-[#101828] text-white shadow-[0_18px_45px_rgba(16,24,40,.18)]"
                : "bg-transparent text-[#344054] hover:bg-white hover:text-[#101828]"
            ].join(" ")}
          >
            <span
              className={[
                "grid size-9 shrink-0 place-items-center rounded-xl transition",
                active ? "bg-white/12 text-white" : "bg-white text-[#101828] group-hover:bg-[#fffaf3]"
              ].join(" ")}
            >
              <Icon size={18} />
            </span>
            <span className="truncate">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function MobileNavItem({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      data-clickable="true"
      data-active={active ? "true" : "false"}
      className={[
        "flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[11px] font-black transition",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#b4232a]",
        active ? "bg-[#101828] text-white" : "text-[#101828] hover:bg-white"
      ].join(" ")}
    >
      <Icon size={21} />
      <span className="truncate">{item.label}</span>
    </a>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}
