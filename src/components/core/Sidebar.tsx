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
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/topics", label: "Konu Özetleri", icon: BookOpen },
  { href: "/question-bank", label: "Konu Testleri", icon: FileQuestion },
  { href: "/past-questions", label: "Çıkmış Sorular", icon: Archive },
  { href: "/exams", label: "Denemeler", icon: Trophy },
  { href: "/flashcards", label: "Flashcard", icon: CreditCard },
  { href: "/timeline", label: "Timeline", icon: CalendarClock },
  { href: "/analytics", label: "Analiz", icon: BarChart3 },
  { href: "/mistakes", label: "Yanlışlarım", icon: XCircle },
  { href: "/glossary", label: "Kavram Sözlüğü", icon: LibraryBig },
  { href: "/study-plan", label: "Çalışma Planı", icon: ListChecks },
  { href: "/notes", label: "Notlar", icon: ScrollText },
  { href: "/achievements", label: "Rozetler", icon: ShieldCheck },
  { href: "/profile", label: "Profil", icon: User }
];

export function Sidebar() {
  const pathname = usePathname();
  const isOpen = useUIStore((state) => state.isNavigationOpen);
  const setOpen = useUIStore((state) => state.setNavigationOpen);
  const { isAdmin } = useAdminSession();

  const items = isAdmin
    ? [...baseItems, { href: "/admin", label: "Admin Panel", icon: UsersRound }]
    : baseItems;

  const nav = (
    <nav className="space-y-1.5" aria-label="Ana menü">
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
              "group flex min-h-12 items-center gap-3 rounded-[1rem] px-4 py-3 text-sm font-black transition duration-200",
              active
                ? "bg-[var(--atlas-ink)] text-[var(--text-inverse)] shadow-[0_16px_50px_rgba(7,11,22,.16)]"
                : "text-[var(--text-secondary)] hover:bg-[rgba(7,11,22,.055)] hover:text-[var(--atlas-ink)]"
            )}
          >
            <Icon size={18} className={cn("shrink-0 transition group-hover:scale-110", active ? "text-[var(--text-inverse)]" : "text-[var(--text-secondary)]")} />
            <span className={cn("min-w-0 truncate", active ? "text-[var(--text-inverse)]" : "text-[var(--atlas-ink)]")}>
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="sticky top-24 z-20 hidden h-[calc(100vh-7rem)] overflow-y-auto rounded-[1.75rem] border border-[rgba(7,11,22,.08)] bg-[rgba(255,250,240,.80)] p-3 shadow-[var(--shadow-sm)] backdrop-blur-2xl lg:block scrollbar-clean">
        <div className="mb-4 overflow-hidden rounded-[1.35rem] bg-[var(--atlas-ink)] p-4 text-[var(--text-inverse)] shadow-[0_16px_50px_rgba(7,11,22,.16)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--atlas-copper-2)]">Arşiv Masası</p>
          <p className="mt-2 text-2xl font-black tracking-[-0.06em] text-[var(--text-inverse)]">Çalışma rotası</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-inverse-muted)]">
            Konu, test, tekrar ve analiz tek akışta.
          </p>
        </div>
        {nav}
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <aside
            className="h-full w-[86vw] max-w-sm overflow-y-auto border-r border-[var(--border-soft)] bg-[var(--atlas-paper)] p-4 scrollbar-clean"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-[var(--atlas-ink)] font-black text-[var(--text-inverse)]">T</span>
              <div>
                <p className="font-black text-[var(--atlas-ink)]">KPSS Tarih</p>
                <p className="text-xs text-[var(--atlas-muted)]">Çalışma menüsü</p>
              </div>
            </div>
            {nav}
          </aside>
        </div>
      ) : null}
    </>
  );
}
