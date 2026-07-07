"use client";

import Link from "next/link";
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
import { SBBrandMark } from "@/components/brand/SBBrandMark";
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
] as const;

const adminItem = { href: "/admin", label: "Admin", icon: UsersRound } as const;

export function Sidebar() {
  const pathname = usePathname();
  const isOpen = useUIStore((state) => state.isNavigationOpen);
  const setOpen = useUIStore((state) => state.setNavigationOpen);
  const { isAdmin } = useAdminSession();
  const items = isAdmin ? [...baseItems, adminItem] : baseItems;

  const nav = (
    <nav className="space-y-1">
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
              "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[13px] font-bold transition-colors duration-150",
              active
                ? "bg-[#101828] text-white shadow-[0_12px_34px_rgba(16,24,40,.18)]"
                : "text-slate-600 hover:bg-white hover:text-[#101828]"
            )}
          >
            <Icon size={18} />
            {item.label}
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden border-r border-[#e4d8c8] bg-[#f8f1e7]/82 px-4 py-5 backdrop-blur-2xl lg:block">
        <Link href="/dashboard" className="mb-6 flex items-center gap-3 px-1">
          <SBBrandMark className="size-11" />
          <div>
            <p className="text-sm font-black tracking-[-0.03em] text-[#101828]">Softbridge Akademi</p>
            <p className="text-xs font-semibold text-slate-500">KPSS Tarih</p>
          </div>
        </Link>
        {nav}
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-[#101828]/35 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <aside
            className="h-full w-[310px] max-w-[82vw] border-r border-[#e4d8c8] bg-[#f8f1e7] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Link href="/dashboard" onClick={() => setOpen(false)} className="mb-6 flex items-center gap-3">
              <SBBrandMark className="size-11" />
              <div>
                <p className="text-sm font-black tracking-[-0.03em] text-[#101828]">Softbridge Akademi</p>
                <p className="text-xs font-semibold text-slate-500">KPSS Tarih</p>
              </div>
            </Link>
            {nav}
          </aside>
        </div>
      ) : null}
    </>
  );
}
