"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/core/Sidebar";
import { TopNav } from "@/components/core/TopNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="content-shell grid gap-6 py-6 lg:grid-cols-[278px_minmax(0,1fr)]">
        <Sidebar />
        <section className="min-w-0 rounded-[2rem] editorial-shell p-3 md:p-5">
          <div className="page-noise min-h-[calc(100vh-7rem)] rounded-[1.55rem] border border-black/[0.06] bg-[#fffaf0]/45 p-4 md:p-7">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
