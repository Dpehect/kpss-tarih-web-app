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
  { href: "/timeline", label: "Zaman", icon: CalendarClock },
  { href: "/analytics", label: "Analiz", icon: BarChart3 },
  { href: "/mistakes", label: "Yanlış", icon: XCircle },
  { href: "/glossary", label: "Sözlük", icon: LibraryBig },
  { href: "/study-plan", label: "Plan", icon: ListChecks },
  { href: "/notes", label: "Not", icon: ScrollText },
  { href: "/achievements", label: "Rozet", icon: ShieldCheck },
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
    <nav className="grid gap-1.5" aria-label="Ana menü">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            title={item.label}
            aria-current={active ? "page" : undefined}
            data-dark-button={active ? "true" : undefined}
            className={cn(
              "group flex min-h-14 items-center justify-center gap-3 rounded-[1.2rem] px-3 py-3 text-xs font-black transition duration-200 xl:justify-start xl:px-4",
              active
                ? "bg-[var(--lab-ink)] text-[var(--lab-inverse)] shadow-[0_16px_50px_rgba(16,16,16,.16)]"
                : "text-[var(--lab-muted)] hover:bg-[rgba(16,16,16,.055)] hover:text-[var(--lab-ink)]"
            )}
          >
            <Icon size={19} className={cn("shrink-0 transition group-hover:scale-110", active ? "text-[var(--lab-inverse)]" : "text-[var(--lab-muted)]")} />
            <span className={cn("hidden min-w-0 truncate xl:block", active ? "text-[var(--lab-inverse)]" : "text-[var(--lab-ink)]")}>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="sticky top-[5.4rem] z-20 hidden h-[calc(100vh-6.4rem)] overflow-y-auto rounded-[2rem] border border-[rgba(16,16,16,.08)] bg-[rgba(255,252,245,.66)] p-2 shadow-[var(--shadow-thin)] backdrop-blur-2xl lg:block scrollbar-clean">
        <div className="mb-3 grid place-items-center rounded-[1.45rem] bg-[var(--lab-ink)] px-2 py-4 text-[var(--lab-inverse)] xl:place-items-start xl:p-4">
          <p className="hidden text-xs font-black uppercase tracking-[0.22em] text-[var(--lab-acid)] xl:block">Lab Rail</p>
          <p className="text-xl font-black tracking-[-0.06em] text-[var(--lab-inverse)] xl:mt-2">C</p>
          <p className="mt-1 hidden text-xs leading-5 text-[var(--lab-inverse-muted)] xl:block">Modüller arası hızlı geçiş.</p>
        </div>
        {nav}
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <aside className="h-full w-[86vw] max-w-sm overflow-y-auto border-r border-[var(--lab-line)] bg-[var(--lab-bg)] p-4 scrollbar-clean" onClick={(event) => event.stopPropagation()}>
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-[var(--lab-ink)] font-black text-[var(--lab-inverse)]">C</span>
              <div>
                <p className="font-black text-[var(--lab-ink)]">ChronoLab</p>
                <p className="text-xs text-[var(--lab-muted)]">Çalışma menüsü</p>
              </div>
            </div>
            {nav}
          </aside>
        </div>
      ) : null}
    </>
  );
}
