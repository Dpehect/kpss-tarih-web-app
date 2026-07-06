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
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-[1.5rem] border border-[rgba(14,17,23,.10)] bg-[rgba(246,239,227,.92)] p-2 shadow-[var(--shadow-float)] backdrop-blur-2xl lg:hidden" aria-label="Mobil hızlı menü">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              data-dark-button={active ? "true" : undefined}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-[1.05rem] text-[11px] font-black transition",
                active ? "bg-[var(--bureau-ink)] text-[var(--bureau-inverse)] shadow-[var(--shadow-paper)]" : "text-[var(--bureau-copy)] hover:bg-white hover:text-[var(--bureau-ink)]"
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
