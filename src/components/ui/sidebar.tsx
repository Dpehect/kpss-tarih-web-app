"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export type SidebarItem = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

export function PremiumSidebar({
  items,
  header,
  onNavigate
}: {
  items: SidebarItem[];
  header?: React.ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="group/sidebar h-full overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong),transparent_18%)] p-3 shadow-[var(--shadow-md)] backdrop-blur-2xl transition-all duration-300 lg:w-[86px] lg:hover:w-[286px]">
      {header ? (
        <div className="mb-4 overflow-hidden rounded-[1.5rem] bg-[var(--surface-dark)] p-4 text-[#fff8ea]">
          {header}
        </div>
      ) : null}

      <nav className="space-y-1.5" aria-label="Ana menü">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              whileHover={{ x: 3 }}
              className={cn(
                "hover-glow flex items-center gap-3 rounded-[1.12rem] px-4 py-3 text-sm font-black text-[var(--muted-foreground)] transition hover:bg-[color-mix(in_srgb,var(--foreground),transparent_94%)] hover:text-[var(--foreground)]",
                active && "bg-[var(--foreground)] text-[var(--background)] shadow-[0_16px_50px_color-mix(in_srgb,var(--foreground),transparent_84%)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
              )}
            >
              <Icon size={18} className="shrink-0 opacity-85" />
              <span className="whitespace-nowrap opacity-100 lg:opacity-0 lg:transition-opacity lg:duration-200 lg:group-hover/sidebar:opacity-100">
                {item.label}
              </span>
            </motion.a>
          );
        })}
      </nav>
    </aside>
  );
}
