"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { FoxBrandMark } from "@/components/brand/FoxBrandMark";
import { AdminQuickLink } from "@/features/auth/components/AdminQuickLink";
import { AuthStatusButton } from "@/features/auth/components/AuthStatusButton";
import { useUIStore } from "@/store/useUIStore";

export function TopNav() {
  const setNavigationOpen = useUIStore((state) => state.setNavigationOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e4d8c8] bg-[#f8f1e7]/86 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[76px] w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
          <FoxBrandMark className="size-11 shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-base font-black tracking-[-0.035em] text-[#101828]">Softbridge Akademi</p>
            <p className="truncate text-xs font-semibold text-slate-500">KPSS Tarih Çalışma Platformu</p>
          </div>
        </Link>

        <Link
          href="/search"
          className="hidden min-h-11 w-full max-w-sm items-center gap-3 rounded-2xl border border-[#e4d8c8] bg-white/76 px-4 text-sm font-semibold text-slate-500 shadow-sm backdrop-blur-xl transition hover:bg-white hover:text-[#101828] md:flex"
        >
          <Search size={17} />
          İçerikte ara
        </Link>

        <div className="flex items-center gap-2">
          <AdminQuickLink />
          <AuthStatusButton />
          <button
            type="button"
            onClick={() => setNavigationOpen(true)}
            className="grid size-10 place-items-center rounded-2xl border border-[#e4d8c8] bg-white/76 text-[#101828] shadow-sm lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}
