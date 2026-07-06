"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AtlasAmbient } from "@/components/core/AtlasAmbient";
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
        <AtlasAmbient />
        <PageTransition>{children}</PageTransition>
      </>
    );
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      <AtlasAmbient />
      <SkipToContent />
      <TopNav />
      <main id="main-content" className="content-shell grid gap-6 py-6 lg:grid-cols-[286px_minmax(0,1fr)]" tabIndex={-1}>
        <Sidebar />
        <section className="atlas-frame min-w-0 rounded-[2rem] p-2 md:p-4 xl:rounded-[2.6rem]">
          <div className="min-h-[calc(100vh-7.25rem)] rounded-[1.55rem] border border-[rgba(7,11,22,.06)] bg-[rgba(255,255,255,.26)] p-4 md:p-7 xl:rounded-[2.2rem]">
            <PageTransition>{children}</PageTransition>
          </div>
        </section>
      </main>
      <MobileBottomNav />
    </div>
  );
}
