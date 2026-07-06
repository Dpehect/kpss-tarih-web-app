"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/motion/PageTransition";
import { Sidebar } from "@/components/core/Sidebar";
import { TopNav } from "@/components/core/TopNav";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) {
    return <PageTransition>{children}</PageTransition>;
  }

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="content-shell grid gap-6 py-6 lg:grid-cols-[286px_minmax(0,1fr)]">
        <Sidebar />
        <section className="min-w-0 rounded-[2.6rem] editorial-shell p-3 md:p-5">
          <div className="page-noise min-h-[calc(100vh-7.25rem)] rounded-[2rem] border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-strong),transparent_32%)] p-4 md:p-7">
            <PageTransition>{children}</PageTransition>
          </div>
        </section>
      </main>
    </div>
  );
}
