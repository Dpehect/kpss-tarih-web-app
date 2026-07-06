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
            className={cn(
              "group flex min-h-12 items-center gap-3 rounded-[1.1rem] px-4 py-3 text-sm font-black transition duration-200",
              active
                ? "bg-[#0b1220] text-[#fff8ea] shadow-[0_16px_50px_rgba(11,18,32,0.18)] hover:bg-[#0b1220] hover:text-[#fff8ea]"
                : "text-[#1f2937] hover:bg-[#0b1220]/[0.055] hover:text-[#0b1220]"
            )}
          >
            <Icon
              size={18}
              className={cn(
                "shrink-0 transition group-hover:scale-110",
                active ? "text-[#fff8ea] opacity-100" : "text-[#334155] opacity-90"
              )}
            />
            <span className={cn("min-w-0 truncate", active ? "text-[#fff8ea]" : "text-[#111827]")}>
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="sticky top-24 z-20 hidden h-[calc(100vh-7rem)] overflow-y-auto rounded-[2rem] border border-[#0f172a]/10 bg-[#fffaf0]/90 p-3 shadow-[0_22px_72px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:block scrollbar-clean">
        <div className="page-noise mb-4 overflow-hidden rounded-[1.55rem] bg-[#0b1220] p-4 text-[#fff8ea] shadow-[0_16px_50px_rgba(11,18,32,0.16)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d9aa52]">Çalışma Atlası</p>
          <p className="mt-2 text-2xl font-black tracking-[-0.06em] text-[#fff8ea]">Tarih masası</p>
          <p className="mt-2 text-sm leading-6 text-[#fff8ea]/72">
            Konu, test, deneme ve analiz için düzenli çalışma merkezi.
          </p>
        </div>
        {nav}
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <aside
            className="h-full w-[86vw] max-w-sm overflow-y-auto border-r border-[#0f172a]/10 bg-[#fffaf0] p-4 scrollbar-clean"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-[#0b1220] font-black text-[#fff8ea]">T</span>
              <div>
                <p className="font-black text-[#0b1220]">KPSS Tarih</p>
                <p className="text-xs text-[#475569]">Çalışma menüsü</p>
              </div>
            </div>
            {nav}
          </aside>
        </div>
      ) : null}
    </>
  );
}
