"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BureauAmbient } from "@/components/core/BureauAmbient";
import { MobileBottomNav } from "@/components/core/MobileBottomNav";
import { PageTransition } from "@/components/motion/PageTransition";
import { Sidebar } from "@/components/core/Sidebar";
import { SkipToContent } from "@/components/core/SkipToContent";
import { TopNav } from "@/components/core/TopNav";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <>
        <BureauAmbient />
        <PageTransition>{children}</PageTransition>
      </>
    );
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      <BureauAmbient />
      <SkipToContent />
      <TopNav />
      <main id="main-content" className="content-shell grid gap-5 py-5 lg:grid-cols-[92px_minmax(0,1fr)] xl:grid-cols-[118px_minmax(0,1fr)]" tabIndex={-1}>
        <Sidebar />
        <section className="bureau-frame min-w-0 rounded-[2rem] p-2 md:p-3 xl:rounded-[2.65rem]">
          <div className="min-h-[calc(100vh-6.6rem)] rounded-[1.55rem] border border-[rgba(14,17,23,.06)] bg-[rgba(255,255,255,.18)] p-4 md:p-7 xl:rounded-[2.25rem]">
            <PageTransition>{children}</PageTransition>
          </div>
        </section>
      </main>
      <MobileBottomNav />
    </div>
  );
}
