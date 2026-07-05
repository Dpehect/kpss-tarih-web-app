"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/core/Sidebar";
import { TopNav } from "@/components/core/TopNav";

/**
 * Uygulama kabuğu.
 * Landing sayfasında tam ekran deneyim korunur; diğer sayfalarda düzenli navbar + sidebar yapısı kullanılır.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <div className="noise-overlay" aria-hidden="true" />
      <TopNav />
      <div className="content-shell grid gap-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <main className="relative z-10 min-w-0">{children}</main>
      </div>
    </div>
  );
}
