import { Navbar } from "@/components/core/Navbar";
import { Sidebar } from "@/components/core/Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
