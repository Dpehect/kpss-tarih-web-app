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
    <nav className="space-y-1.5">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "group flex items-center gap-3 rounded-[1.05rem] px-4 py-3 text-sm font-black text-[#425066] transition hover:bg-[#111827]/[0.055] hover:text-[#111827]",
              active && "bg-[#111827] text-[#fffaf0] shadow-[0_16px_50px_rgba(17,24,39,0.16)] hover:bg-[#111827] hover:text-[#fffaf0]"
            )}
          >
            <Icon size={18} className="opacity-80" />
            {item.label}
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="sticky top-24 z-20 hidden h-[calc(100vh-7rem)] overflow-y-auto rounded-[1.8rem] border border-black/[0.08] bg-[#fffaf0]/72 p-3 shadow-[0_24px_70px_rgba(18,24,38,0.08)] backdrop-blur-2xl lg:block scrollbar-clean">
        <div className="mb-4 rounded-[1.45rem] bg-[#111827] p-4 text-[#fffaf0]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f0bd59]">Çalışma Atlası</p>
          <p className="mt-2 text-2xl font-black tracking-[-0.06em]">Tarih masası</p>
          <p className="mt-2 text-sm leading-6 text-[#fffaf0]/62">
            Konu, test, deneme ve analiz için düzenli çalışma merkezi.
          </p>
        </div>
        {nav}
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <aside
            className="h-full w-[86vw] max-w-sm overflow-y-auto border-r border-black/[0.08] bg-[#fffaf0] p-4 scrollbar-clean"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-[#111827] font-black text-[#fffaf0]">T</span>
              <div>
                <p className="font-black text-[#111827]">KPSS Tarih</p>
                <p className="text-xs text-[#425066]">Çalışma menüsü</p>
              </div>
            </div>
            {nav}
          </aside>
        </div>
      ) : null}
    </>
  );
}
