"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/motion/PageTransition";
import { Sidebar } from "@/components/core/Sidebar";
import { TopNav } from "@/components/core/TopNav";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <PageTransition>{children}</PageTransition>;
  }

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="content-shell grid gap-6 py-6 lg:grid-cols-[286px_minmax(0,1fr)]">
        <Sidebar />
        <section className="min-w-0 rounded-[2.75rem] border border-[rgba(11,18,32,.10)] bg-[rgba(255,248,234,.72)] p-3 shadow-[var(--shadow-soft)] backdrop-blur-2xl md:p-5">
          <div className="min-h-[calc(100vh-7.25rem)] rounded-[2.15rem] border border-[rgba(11,18,32,.08)] bg-[rgba(255,255,255,.38)] p-4 md:p-7">
            <PageTransition>{children}</PageTransition>
          </div>
        </section>
      </main>
    </div>
  );
}
