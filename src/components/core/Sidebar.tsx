"use client";

import {
  Archive,
  BarChart3,
  BookOpen,
  CalendarClock,
  CreditCard,
  FileQuestion,
  Home,
  LibraryBig,
  ListChecks,
  ScrollText,
  ShieldCheck,
  Trophy,
  User,
  UsersRound,
  XCircle
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAdminSession } from "@/hooks/useAdminSession";
import { cn } from "@/lib/cn";
import { useUIStore } from "@/store/useUIStore";

const baseItems = [
  { href: "/dashboard", label: "Panel", icon: Home },
  { href: "/topics", label: "Konular", icon: BookOpen },
  { href: "/question-bank", label: "Test", icon: FileQuestion },
  { href: "/past-questions", label: "Çıkmış", icon: Archive },
  { href: "/exams", label: "Deneme", icon: Trophy },
  { href: "/flashcards", label: "Kart", icon: CreditCard },
  { href: "/timeline", label: "Zaman Çizelgesi", icon: CalendarClock },
  { href: "/analytics", label: "Analiz", icon: BarChart3 },
  { href: "/mistakes", label: "Yanlışlar", icon: XCircle },
  { href: "/glossary", label: "Sözlük", icon: LibraryBig },
  { href: "/study-plan", label: "Plan", icon: ListChecks },
  { href: "/notes", label: "Notlar", icon: ScrollText },
  { href: "/achievements", label: "Başarılar", icon: ShieldCheck },
  { href: "/profile", label: "Profil", icon: User }
];

export function Sidebar() {
  const pathname = usePathname();
  const isOpen = useUIStore((state) => state.isNavigationOpen);
  const setOpen = useUIStore((state) => state.setNavigationOpen);
  const { isAdmin } = useAdminSession();

  const items = isAdmin
    ? [...baseItems, { href: "/admin", label: "Admin", icon: UsersRound }]
    : baseItems;

  const nav = (
    <nav className="flex flex-col gap-0.5" aria-label="Ana menü">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors duration-150",
              active
                ? "border-l-2 border-[var(--sage)] bg-[var(--sage-soft)] font-semibold text-[var(--ink)]"
                : "border-l-2 border-transparent text-[var(--graphite)] hover:bg-[var(--cream)] hover:text-[var(--ink)]"
            )}
          >
            <Icon size={17} className={cn("shrink-0", active ? "text-[var(--sage)]" : "text-[var(--slate)]")} />
            <span className="truncate">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="sticky top-[60px] z-20 hidden h-[calc(100vh-76px)] overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--warm-white)] p-2.5 lg:block scrollbar-clean">
        {nav}
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setOpen(false)}>
          <aside
            className="h-full w-72 overflow-y-auto border-r border-[var(--border)] bg-[var(--stone)] p-4 scrollbar-clean"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-2.5 pb-4 border-b border-[var(--border)]">
              <span className="grid size-9 place-items-center rounded-lg bg-[var(--ink)] text-sm font-semibold text-white">T</span>
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">Tarih</p>
                <p className="text-[11px] text-[var(--slate)]">KPSS Çalışma Platformu</p>
              </div>
            </div>
            {nav}
          </aside>
        </div>
      ) : null}
    </>
  );
}
