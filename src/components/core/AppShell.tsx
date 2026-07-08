import type { ReactNode } from "react";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FileText,
  Home,
  Layers3,
  NotebookPen,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound
} from "lucide-react";
import { SBBrandMark } from "@/components/brand/SBBrandMark";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";

const navItems = [
  { label: "Panel", href: "/dashboard", icon: Home, mobile: true, hint: "Günlük akış" },
  { label: "Konu", href: "/topics", icon: BookOpen, mobile: true, hint: "Konu atlası" },
  { label: "Test", href: "/question-bank", icon: ClipboardList, mobile: true, hint: "30 soruluk test" },
  { label: "Deneme", href: "/exams", icon: Target, hint: "Süreli ölçüm" },
  { label: "Kart", href: "/flashcards", icon: Layers3, mobile: true, hint: "Aktif hatırlama" },
  { label: "Timeline", href: "/timeline", icon: FileText, hint: "Kronoloji" },
  { label: "Analiz", href: "/analytics", icon: BarChart3, mobile: true, hint: "Performans" },
  { label: "Notlar", href: "/notes", icon: NotebookPen, hint: "Kişisel not" },
  { label: "Başarılar", href: "/achievements", icon: Trophy, hint: "Rozetler" },
  { label: "Profil", href: "/profile", icon: UserRound, hint: "Hesap" },
  { label: "Admin", href: "/admin", icon: ShieldCheck, hint: "Yönetim" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const mobileItems = navItems.filter((item) => item.mobile);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,#fff7ed_0,#f7efe3_34%,#edf4f7_100%)] text-[#101828]" data-ultra-shell="true">
      <div aria-hidden="true" data-decorative="true" className="pointer-events-none fixed left-[18rem] top-[-10rem] z-0 size-[28rem] rounded-full bg-[#fbe4c7]/55 blur-3xl" />
      <div aria-hidden="true" data-decorative="true" className="pointer-events-none fixed bottom-[-12rem] right-[-8rem] z-0 size-[30rem] rounded-full bg-[#dbeafe]/60 blur-3xl" />

      <aside className="fixed bottom-0 left-0 top-0 z-[1000] hidden w-[19rem] overflow-y-auto border-r border-white/70 bg-white/72 p-4 shadow-[18px_0_80px_rgba(16,24,40,.08)] backdrop-blur-xl md:block" data-ultra-sidebar="true">
        <a href="/dashboard" className="mb-4 flex min-h-16 items-center gap-3 rounded-[1.7rem] border border-white/80 bg-white/86 px-3 shadow-[0_16px_45px_rgba(16,24,40,.08)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(16,24,40,.12)]" data-ultra-click="true">
          <SBBrandMark className="size-12 shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-sm font-black tracking-[-0.02em]">Softbridge Akademi</p>
            <p className="truncate text-xs font-bold text-[#667085]">KPSS Tarih</p>
          </div>
        </a>

        <div className="mb-4 rounded-[1.7rem] border border-[#f3dcc7] bg-[#fff7ed] p-4 shadow-[0_14px_40px_rgba(180,35,42,.06)]">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-2xl bg-[#101828] text-white">
              <Sparkles size={17} />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#b4232a]">Odak modu</p>
              <p className="text-xs font-bold text-[#667085]">Hızlı çalışma akışı</p>
            </div>
          </div>
        </div>

        <nav className="grid gap-1.5" aria-label="Ana menü">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                data-ultra-click="true"
                className="group/sidebar relative flex min-h-[58px] w-full items-center gap-3 overflow-hidden rounded-[1.35rem] px-3 text-sm font-black text-[#344054] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#101828] hover:shadow-[0_16px_42px_rgba(16,24,40,.10)] focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b4232a]"
              >
                <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#b4232a] opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100" />
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-[#101828] shadow-[0_8px_22px_rgba(16,24,40,.06)] transition-all duration-200 group-hover/sidebar:scale-105 group-hover/sidebar:bg-[#101828] group-hover/sidebar:text-white">
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{item.label}</span>
                  <span className="block truncate text-[10px] font-black uppercase tracking-[0.10em] text-[#98a2b3] transition group-hover/sidebar:text-[#b4232a]">
                    {item.hint}
                  </span>
                </span>
              </a>
            );
          })}
        </nav>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-[900] border-b border-white/70 bg-white/72 px-4 py-3 shadow-[0_12px_55px_rgba(16,24,40,.07)] backdrop-blur-xl md:left-[19rem] md:px-6">
        <div className="flex min-h-12 items-center gap-3">
          <a href="/dashboard" className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl md:flex-none" data-ultra-click="true">
            <SBBrandMark className="size-11 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-base font-black tracking-[-0.04em] text-[#101828]">Softbridge Akademi</p>
              <p className="truncate text-xs font-bold text-[#667085]">KPSS Tarih Çalışma Platformu</p>
            </div>
          </a>

          <form action="/search" className="relative hidden min-w-[280px] flex-1 lg:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#667085]" />
            <input
              name="q"
              type="search"
              placeholder="Konu, test, kavram ara..."
              className="h-11 w-full rounded-full border border-[#e4d8c8] bg-white/90 px-11 text-sm font-bold text-[#101828] outline-none placeholder:text-[#98a2b3] shadow-[0_10px_28px_rgba(16,24,40,.05)] transition focus:border-[#b4232a] focus:shadow-[0_12px_36px_rgba(180,35,42,.10)]"
            />
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <a href="/admin" className="hidden min-h-11 items-center rounded-full border border-[#e4d8c8] bg-white/85 px-4 text-sm font-black text-[#101828] shadow-[0_10px_28px_rgba(16,24,40,.06)] transition hover:-translate-y-0.5 sm:inline-flex" data-ultra-click="true">
              Admin
            </a>
            <AuthStatusButton />
          </div>
        </div>
      </header>

      <main className="relative z-10 min-h-screen px-4 pb-28 pt-[92px] md:ml-[19rem] md:px-6 md:pt-[96px]" data-ultra-content="true">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-[950] border-t border-white/70 bg-white/82 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_45px_rgba(16,24,40,.07)] backdrop-blur-xl md:hidden" aria-label="Mobil hızlı menü">
        <div className="grid grid-cols-5 gap-1">
          {mobileItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                data-ultra-click="true"
                className="group flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[11px] font-black text-[#101828] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_24px_rgba(16,24,40,.08)]"
              >
                <Icon className="transition group-hover:scale-110" size={21} />
                <span className="truncate">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
