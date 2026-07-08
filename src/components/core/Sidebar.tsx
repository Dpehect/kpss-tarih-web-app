"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Home,
  Layers3,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";
import { SBBrandMark } from "@/components/brand/SBBrandMark";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { cn } from "@/lib/cn";

export type ShellNavGroup = "Ana Akış" | "Öğrenme" | "Pratik" | "Analiz";

export type ShellNavItem = {
  label: string;
  shortLabel: string;
  href: string;
  icon: LucideIcon;
  group: ShellNavGroup;
  description: string;
  mobile?: boolean;
  iconColorClass?: string;
  iconBgClass?: string;
};

export const shellNavItems: ShellNavItem[] = [
  { label: "Dashboard", shortLabel: "Panel", href: "/dashboard", icon: Home, group: "Ana Akış", description: "Günlük plan ve genel durum", mobile: true, iconColorClass: "text-blue-600 dark:text-blue-400", iconBgClass: "bg-blue-500/10 dark:bg-blue-500/15" },
  { label: "Konu Akademisi", shortLabel: "Konu", href: "/topics", icon: BookOpen, group: "Öğrenme", description: "Derin konu anlatımı", mobile: true, iconColorClass: "text-emerald-600 dark:text-emerald-400", iconBgClass: "bg-emerald-500/10 dark:bg-emerald-500/15" },
  { label: "Flashcard", shortLabel: "Kart", href: "/flashcards", icon: Layers3, group: "Öğrenme", description: "Aktif hatırlama ve tekrar", mobile: true, iconColorClass: "text-indigo-600 dark:text-indigo-400", iconBgClass: "bg-indigo-500/10 dark:bg-indigo-500/15" },
  { label: "Kronoloji", shortLabel: "Zaman", href: "/timeline", icon: CalendarClock, group: "Öğrenme", description: "Olayları akışta gör", iconColorClass: "text-amber-600 dark:text-amber-400", iconBgClass: "bg-amber-500/10 dark:bg-amber-500/15" },
  { label: "Soru Bankası", shortLabel: "Test", href: "/question-bank", icon: ClipboardList, group: "Pratik", description: "Konu testleri", mobile: true, iconColorClass: "text-violet-600 dark:text-violet-400", iconBgClass: "bg-violet-500/10 dark:bg-violet-500/15" },
  { label: "Deneme Merkezi", shortLabel: "Deneme", href: "/exams", icon: Target, group: "Pratik", description: "KPSS prova oturumları", iconColorClass: "text-rose-600 dark:text-rose-400", iconBgClass: "bg-rose-500/10 dark:bg-rose-500/15" },
  { label: "Yanlış Defteri", shortLabel: "Yanlış", href: "/mistakes", icon: ShieldCheck, group: "Analiz", description: "Eksiklerini kapat", iconColorClass: "text-red-600 dark:text-red-400", iconBgClass: "bg-red-500/10 dark:bg-red-500/15" },
  { label: "Analiz", shortLabel: "Analiz", href: "/analytics", icon: BarChart3, group: "Analiz", description: "Performans raporu", mobile: true, iconColorClass: "text-cyan-600 dark:text-cyan-400", iconBgClass: "bg-cyan-500/10 dark:bg-cyan-500/15" },
  { label: "Notlar", shortLabel: "Not", href: "/notes", icon: NotebookPen, group: "Öğrenme", description: "Kişisel çalışma notları", iconColorClass: "text-orange-600 dark:text-orange-400", iconBgClass: "bg-orange-500/10 dark:bg-orange-500/15" },
  { label: "Rozetler", shortLabel: "Rozet", href: "/achievements", icon: Trophy, group: "Analiz", description: "Başarı koleksiyonu", iconColorClass: "text-yellow-600 dark:text-yellow-400", iconBgClass: "bg-yellow-500/10 dark:bg-yellow-500/15" },
  { label: "Profil", shortLabel: "Profil", href: "/profile", icon: UserRound, group: "Ana Akış", description: "Hesap ve tercihlerin", iconColorClass: "text-pink-600 dark:text-pink-400", iconBgClass: "bg-pink-500/10 dark:bg-pink-500/15" },
];

const groupOrder: ShellNavGroup[] = ["Ana Akış", "Öğrenme", "Pratik", "Analiz"];

export function Sidebar({
  pathname,
  collapsed = false,
  mobile = false,
  onCollapseChange,
  onNavigate,
}: {
  pathname: string;
  collapsed?: boolean;
  mobile?: boolean;
  onCollapseChange?: (value: boolean) => void;
  onNavigate?: () => void;
}) {
  const grouped = groupOrder.map((group) => ({ group, items: shellNavItems.filter((item) => item.group === group) }));

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-[var(--sb-line)] bg-[var(--sb-surface)] shadow-[var(--sb-shadow-sm)] backdrop-blur-2xl",
        collapsed && !mobile ? "w-[88px]" : "w-[292px]",
        mobile && "w-full border-r-0 shadow-none",
      )}
    >
      <div className="flex h-20 items-center justify-between gap-3 border-b border-[var(--sb-line)] px-4">
        <Link href="/dashboard" onClick={onNavigate} className="group flex min-w-0 items-center gap-3">
          <SBBrandMark size={collapsed && !mobile ? "sm" : "md"} />
          {!collapsed || mobile ? (
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-black tracking-tight text-[var(--sb-text)]">Softbridge Akademi</span>
              <span className="block truncate text-[11px] font-bold text-[var(--sb-text-muted)]">KPSS Tarih çalışma sistemi</span>
            </span>
          ) : null}
        </Link>
        {!mobile ? (
          <button
            type="button"
            onClick={() => onCollapseChange?.(!collapsed)}
            className="grid size-10 shrink-0 place-items-center rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface-strong)] text-[var(--sb-text-muted)] transition hover:-translate-y-0.5 hover:text-[var(--sb-text)] hover:shadow-[var(--sb-shadow-sm)]"
            aria-label={collapsed ? "Sidebar genişlet" : "Sidebar daralt"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        ) : null}
      </div>

      <nav className="scrollbar-clean flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {grouped.map(({ group, items }) => (
          <div key={group} className="space-y-2">
            {!collapsed || mobile ? <p className="px-3 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--sb-text-muted)]">{group}</p> : null}
            <div className="space-y-1">
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href as any}
                    onClick={onNavigate}
                    data-active={active ? "true" : undefined}
                    aria-current={active ? "page" : undefined}
                    title={collapsed && !mobile ? item.label : undefined}
                    className={cn(
                      "group relative flex min-h-12 items-center gap-3 rounded-2xl border border-transparent px-3 text-sm font-extrabold text-[var(--sb-text-soft)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--sb-line)] hover:bg-[var(--sb-surface-strong)] hover:text-[var(--sb-text)] hover:shadow-[var(--sb-shadow-sm)]",
                      collapsed && !mobile && "justify-center px-0",
                      active && "border-blue-700/20 bg-blue-700/10 text-[var(--sb-primary)] shadow-[var(--sb-shadow-sm)]",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-transparent transition",
                        active && "bg-[var(--sb-primary)]",
                      )}
                    />
                    <span className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-xl transition",
                      active 
                        ? "bg-blue-700/10 text-[var(--sb-primary)]" 
                        : `${item.iconBgClass} ${item.iconColorClass}`
                    )}>
                      <Icon size={18} className="kpss-custom-icon" />
                    </span>
                    {!collapsed || mobile ? (
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{item.label}</span>
                        <span className="block truncate text-[11px] font-semibold text-[var(--sb-text-muted)]">{item.description}</span>
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-[var(--sb-line)] p-3">
        {!collapsed || mobile ? (
          <div className="mb-3 rounded-3xl border border-blue-700/10 bg-[linear-gradient(135deg,rgba(30,58,138,.09),rgba(217,119,6,.09))] p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-white/70 text-[var(--sb-primary)] shadow-sm dark:bg-white/10">
                <Sparkles size={18} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-[var(--sb-text)]">AI çalışma koçu</p>
                <p className="truncate text-xs font-semibold text-[var(--sb-text-muted)]">Sıradaki en etkili adımı önerir.</p>
              </div>
            </div>
            <Link href="/analytics" onClick={onNavigate} className="btn-ghost mt-4 w-full justify-center text-xs">
              Önerileri gör
            </Link>
          </div>
        ) : null}
        <AuthStatusButton compact={collapsed && !mobile} />
      </div>
    </aside>
  );
}

export function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/" || pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}
