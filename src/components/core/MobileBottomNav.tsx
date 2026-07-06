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
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--stone)] px-2 pb-[env(safe-area-inset-bottom)] lg:hidden" aria-label="Mobil hızlı menü">
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
                active ? "text-[var(--sage)]" : "text-[var(--slate)]"
              )}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
              <span>{item.label}</span>
              {active && <span className="h-0.5 w-4 rounded-full bg-[var(--sage)]" />}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
