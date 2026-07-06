"use client";

import { BarChart3, BookOpen, CreditCard, FileQuestion, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/dashboard", label: "Panel", icon: Home },
  { href: "/topics", label: "Konu", icon: BookOpen },
  { href: "/question-bank", label: "Test", icon: FileQuestion },
  { href: "/flashcards", label: "Kart", icon: CreditCard },
  { href: "/analytics", label: "Analiz", icon: BarChart3 }
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-40 rounded-[1.65rem] border border-[var(--border-soft)] bg-[rgba(255,248,234,.90)] p-2 shadow-[var(--shadow-md)] backdrop-blur-2xl lg:hidden"
      aria-label="Mobil hızlı menü"
    >
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-[1.15rem] text-[11px] font-black transition",
                active
                  ? "bg-[var(--navy-900)] text-[var(--text-inverse)] shadow-[var(--shadow-xs)]"
                  : "text-[var(--text-secondary)] hover:bg-white hover:text-[var(--navy-900)]"
              )}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
