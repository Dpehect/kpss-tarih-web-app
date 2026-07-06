"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/core/PageHeader";
import { useAdminSession } from "@/hooks/useAdminSession";
import {
  fetchAdminOverview,
  fetchAdminContentItems,
  type AdminContentItem,
  type AdminOverview
} from "@/lib/admin/admin-service";
import { AdminContentManager } from "@/features/admin/components/AdminContentManager";
import { AdminMetricGrid } from "@/features/admin/components/AdminMetricGrid";
import { AdminUserTable } from "@/features/admin/components/AdminUserTable";

/**
 * Admin paneli sadece ADMIN_EMAILS içindeki hesapla görünür.
 */
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
      <div className="space-y-6">
        <PageHeader eyebrow="Admin" title="Oturum kontrol ediliyor." description="Admin yetkisi doğrulanıyor." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Admin"
          title="Admin paneli için giriş gerekiyor."
          description="Bu alan yalnızca yetkili Google hesabı ile giriş yapıldığında açılır."
          actions={
            <a href="/auth" className="rounded-full bg-[#f2c15f] px-5 py-3 font-semibold text-[#120b07]">
              Google ile giriş yap
            </a>
          }
        />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Yetkisiz"
          title="Bu hesap admin değil."
          description="Admin paneli yalnızca tanımlı yönetici hesabı ile kullanılabilir."
        />
        <section className="rounded-xl parchment-surface p-6">
          <p className="text-[#ead7b7]/70">Giriş yapılan hesap: {user.email}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin Panel"
        title="Kullanıcı verileri ve içerik yönetimi."
        description="Aktif kullanıcıları, öğrenme istatistiklerini, not sayılarını, deneme sonuçlarını ve admin içerik taslaklarını buradan yönetebilirsin."
        actions={
          <button
            type="button"
            onClick={() => void loadAdminData()}
            className="rounded-full bg-[#f2c15f] px-5 py-3 font-semibold text-[#120b07]"
          >
            Yenile
          </button>
        }
      />

      {error ? (
        <section className="rounded-xl border border-[#ff7968]/30 bg-[#ff7968]/10 p-6 text-[#ffb4aa]">
          {error}
        </section>
      ) : null}

      {isDataLoading && !overview ? (
        <section className="rounded-xl parchment-surface p-6">
          <p className="text-[#ead7b7]/70">Admin verileri yükleniyor...</p>
        </section>
      ) : null}

      {overview ? (
        <>
          <AdminMetricGrid overview={overview} />
          <AdminUserTable users={overview.users} />
        </>
      ) : null}

      <AdminContentManager items={items} onChange={() => void loadAdminData()} />
    </div>
  );
}
