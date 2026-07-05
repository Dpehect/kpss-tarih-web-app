"use client";

import {
  BarChart3,
  BookOpen,
  CalendarClock,
  CreditCard,
  FileQuestion,
  Home,
  LibraryBig,
  PlusCircle,
  ListChecks,
  ScrollText,
  ShieldCheck,
  Trophy,
  User,
  XCircle
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useUIStore } from "@/store/useUIStore";

/**
 * Sol navigasyon.
 * Tüm modüller ayrı ve düzenli sayfalarda toplandı.
 */
const items = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/topics", label: "Konu Özetleri", icon: BookOpen },
  { href: "/question-bank", label: "Soru Bankası", icon: FileQuestion },
  { href: "/exams", label: "Denemeler", icon: Trophy },
  { href: "/flashcards", label: "Flashcard", icon: CreditCard },
  { href: "/timeline", label: "Timeline", icon: CalendarClock },
  { href: "/analytics", label: "Analiz", icon: BarChart3 },
  { href: "/mistakes", label: "Yanlışlarım", icon: XCircle },
  { href: "/glossary", label: "Kavram Sözlüğü", icon: LibraryBig },
  { href: "/study-plan", label: "Çalışma Planı", icon: ListChecks },
  { href: "/notes", label: "Notlar", icon: ScrollText },
  { href: "/achievements", label: "Rozetler", icon: ShieldCheck },
  { href: "/content-studio", label: "İçerik Ekle", icon: PlusCircle },
  { href: "/profile", label: "Profil", icon: User }
];

export function Sidebar() {
  const pathname = usePathname();
  const isOpen = useUIStore((state) => state.isNavigationOpen);
  const setOpen = useUIStore((state) => state.setNavigationOpen);

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
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#ead7b7]/68 transition hover:bg-white/[0.08] hover:text-[#fff8e8]",
              active && "bg-[#f2c15f] text-[#120b07] hover:bg-[#f2c15f] hover:text-[#120b07]"
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
      <aside className="sticky top-20 z-20 hidden h-[calc(100vh-6rem)] overflow-y-auto rounded-[2rem] border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl lg:block">
        <div className="mb-4 rounded-[1.5rem] bg-[#120b07]/58 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[#f6c465]">Final Sürüm</p>
          <p className="mt-2 text-2xl font-black tracking-[-0.05em]">Tam platform</p>
          <p className="mt-1 text-sm text-[#ead7b7]/58">Konu, test, deneme, analiz, not.</p>
        </div>
        {nav}
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <aside
            className="h-full w-[86vw] max-w-sm overflow-y-auto border-r border-white/10 bg-[#120b07] p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-[#f2c15f] font-black text-[#120b07]">T</span>
              <div>
                <p className="font-black">KPSS Tarih</p>
                <p className="text-xs text-[#ead7b7]/54">Final menü</p>
              </div>
            </div>
            {nav}
          </aside>
        </div>
      ) : null}
    </>
  );
}
