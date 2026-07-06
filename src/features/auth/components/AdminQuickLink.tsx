"use client";

import { useAdminSession } from "@/hooks/useAdminSession";

export function AdminQuickLink() {
  const { isAdmin } = useAdminSession();

  if (!isAdmin) return null;

  return (
    <a
      href="/admin"
      className="hidden rounded-full border border-[#f2c15f]/30 bg-[#f2c15f]/12 px-4 py-2 text-sm font-semibold text-[#f6c465] transition hover:-translate-y-0.5 sm:inline-flex"
    >
      Admin
    </a>
  );
}
