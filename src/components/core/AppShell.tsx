"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MobileBottomNav } from "@/components/core/MobileBottomNav";
import { PageTransition } from "@/components/motion/PageTransition";
import { Sidebar } from "@/components/core/Sidebar";
import { TopNav } from "@/components/core/TopNav";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <PageTransition>{children}</PageTransition>;
  }

  return (
    <div className="min-h-screen bg-[var(--stone)] pb-20 lg:pb-0">
      <TopNav />
      <main id="main-content" className="content-shell grid gap-5 py-5 lg:grid-cols-[220px_minmax(0,1fr)]" tabIndex={-1}>
        <Sidebar />
        <section className="min-w-0">
          <PageTransition>{children}</PageTransition>
        </section>
      </main>
      <MobileBottomNav />
    </div>
  );
}
