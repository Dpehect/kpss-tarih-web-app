"use client";

import { useEffect, useState } from "react";
import { AdminContentManager } from "@/features/admin/components/AdminContentManager";
import { AdminMetricGrid } from "@/features/admin/components/AdminMetricGrid";
import { AdminUserTable } from "@/features/admin/components/AdminUserTable";
import { useAdminSession } from "@/hooks/useAdminSession";
import {
  fetchAdminContentItems,
  fetchAdminOverview,
  type AdminContentItem,
  type AdminOverview
} from "@/lib/admin/admin-service";

export function AdminPage() {
  const { isAdmin, isLoading, user } = useAdminSession();
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [items, setItems] = useState<AdminContentItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);

  async function loadAdminData() {
    if (!isAdmin) return;

    setIsDataLoading(true);
    setError(null);

    try {
      const [nextOverview, nextItems] = await Promise.all([
        fetchAdminOverview(),
        fetchAdminContentItems()
      ]);

      setOverview(nextOverview);
      setItems(nextItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Admin verileri alınamadı.");
    } finally {
      setIsDataLoading(false);
    }
  }

  useEffect(() => {
    void loadAdminData();
  }, [isAdmin]);

  if (isLoading) {
    return (
      <AdminShell>
        <StatusCard title="Admin oturumu kontrol ediliyor" body="Yetki bilgisi hazırlanıyor." />
      </AdminShell>
    );
  }

  if (!user) {
    return (
      <AdminShell>
        <StatusCard
          title="Admin paneli için giriş gerekli"
          body="Bu alan sadece yetkili hesaplarla açılır."
          action={<a href="/login" className="rounded-full bg-[#101828] px-5 py-3 text-sm font-black text-white">Giriş yap</a>}
        />
      </AdminShell>
    );
  }

  if (!isAdmin) {
    return (
      <AdminShell>
        <StatusCard
          title="Bu hesap admin yetkisine sahip değil"
          body={`Giriş yapılan hesap: ${user.email ?? "Bilinmeyen hesap"}`}
        />
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <header className="rounded-[2rem] border border-[#d8c7ad] bg-white p-6 shadow-[0_24px_80px_rgba(16,24,40,.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9a5d13]">Admin paneli</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.065em] text-[#101828] md:text-5xl">
              Yönetim merkezi
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-bold leading-7 text-[#475467]">
              Kullanıcı ilerlemesini, soru çözümünü, flashcard tekrarlarını ve admin içeriklerini tek yerden yönet.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadAdminData()}
            className="rounded-full bg-[#101828] px-5 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(16,24,40,.18)]"
          >
            Yenile
          </button>
        </div>

        {error ? (
          <div className="mt-5 rounded-2xl border border-[#f7b2b7] bg-[#fff1f2] p-4 text-sm font-black text-[#b4232a]">
            {error}
          </div>
        ) : null}

        {isDataLoading && !overview ? (
          <div className="mt-5 rounded-2xl border border-[#eadfce] bg-[#fffaf3] p-4 text-sm font-bold text-[#475467]">
            Admin verileri yükleniyor...
          </div>
        ) : null}
      </header>

      {overview ? (
        <>
          <AdminMetricGrid overview={overview} />
          <AdminUserTable users={overview.users} />
        </>
      ) : null}

      <AdminContentManager items={items} onChange={() => void loadAdminData()} />
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f7efe3] px-4 py-6 text-[#101828] md:px-8 md:py-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6">{children}</div>
    </main>
  );
}

function StatusCard({
  title,
  body,
  action
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-[#d8c7ad] bg-white p-6 shadow-[0_24px_80px_rgba(16,24,40,.08)]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9a5d13]">Admin</p>
      <h1 className="mt-2 text-3xl font-black tracking-[-0.055em] text-[#101828]">{title}</h1>
      <p className="mt-3 text-sm font-bold leading-7 text-[#475467]">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  );
}
