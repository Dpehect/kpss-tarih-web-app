"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  createAdminContentItem,
  deleteAdminContentItem,
  updateAdminContentStatus,
  type AdminContentItem,
  type AdminContentStatus,
  type AdminContentType
} from "@/lib/admin/admin-service";

const contentTypes: { value: AdminContentType; label: string }[] = [
  { value: "topic", label: "Konu" },
  { value: "question", label: "Soru" },
  { value: "flashcard", label: "Flashcard" },
  { value: "exam", label: "Deneme" },
  { value: "timeline", label: "Timeline" },
  { value: "glossary", label: "Kavram" },
  { value: "announcement", label: "Duyuru" }
];

export function AdminContentManager({
  items,
  onChange
}: {
  items: AdminContentItem[];
  onChange: () => void;
}) {
  const [type, setType] = useState<AdminContentType>("topic");
  const [status, setStatus] = useState<AdminContentStatus>("draft");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payloadText, setPayloadText] = useState("{\n  \"example\": true\n}");
  const [filter, setFilter] = useState<AdminContentType | "all">("all");
  const [isSaving, setIsSaving] = useState(false);

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.type === filter);
  }, [filter, items]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Başlık zorunlu.");
      return;
    }

    let payload: Record<string, unknown>;

    try {
      payload = JSON.parse(payloadText);
    } catch {
      toast.error("Payload geçerli JSON olmalı.");
      return;
    }

    setIsSaving(true);

    try {
      await createAdminContentItem({
        type,
        title,
        description,
        payload,
        status
      });

      toast.success("Admin içeriği kaydedildi.");
      setTitle("");
      setDescription("");
      setPayloadText("{\n  \"example\": true\n}");
      onChange();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "İçerik kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  async function changeStatus(id: string, nextStatus: AdminContentStatus) {
    try {
      await updateAdminContentStatus(id, nextStatus);
      toast.success("Durum güncellendi.");
      onChange();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Durum güncellenemedi.");
    }
  }

  async function remove(id: string) {
    const confirmed = window.confirm("Bu admin içeriği silinsin mi?");

    if (!confirmed) return;

    try {
      await deleteAdminContentItem(id);
      toast.success("İçerik silindi.");
      onChange();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "İçerik silinemedi.");
    }
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <form onSubmit={submit} className="rounded-xl parchment-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#f6c465]">İçerik Yönetimi</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Admin içerik ekle</h2>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-bold">İçerik türü</span>
            <select value={type} onChange={(event) => setType(event.target.value as AdminContentType)} className="rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 outline-none focus:border-[#f2c15f]">
              {contentTypes.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold">Durum</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as AdminContentStatus)} className="rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 outline-none focus:border-[#f2c15f]">
              <option value="draft">Taslak</option>
              <option value="published">Yayında</option>
              <option value="archived">Arşiv</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold">Başlık</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 outline-none focus:border-[#f2c15f]" placeholder="Örn: Yeni deneme duyurusu" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold">Açıklama</span>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-24 rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 outline-none focus:border-[#f2c15f]" placeholder="Kısa açıklama" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold">Payload JSON</span>
            <textarea value={payloadText} onChange={(event) => setPayloadText(event.target.value)} className="min-h-44 rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 font-mono text-sm outline-none focus:border-[#f2c15f]" />
          </label>

          <button disabled={isSaving} className="rounded-full bg-[#f2c15f] px-6 py-3 font-semibold text-[#120b07] disabled:opacity-60">
            {isSaving ? "Kaydediliyor" : "İçeriği kaydet"}
          </button>
        </div>
      </form>

      <div className="rounded-xl parchment-surface p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#f6c465]">Admin İçerikleri</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Taslak ve yayın kontrolü</h2>
          </div>
          <select value={filter} onChange={(event) => setFilter(event.target.value as AdminContentType | "all")} className="rounded-full border border-white/10 bg-[#120b07]/50 px-4 py-3 text-sm font-bold outline-none focus:border-[#f2c15f]">
            <option value="all">Tümü</option>
            {contentTypes.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl bg-white/[0.055] p-5 text-[#ead7b7]/64">
              Henüz admin içeriği yok.
            </div>
          ) : filteredItems.map((item) => (
            <article key={item.id} className="rounded-xl bg-white/[0.055] p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#f6c465]">
                    {item.type} · {item.status}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-6 text-[#ead7b7]/62">{item.description}</p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button onClick={() => changeStatus(item.id, "published")} className="rounded-full bg-[#52f2d0]/18 px-3 py-2 text-xs font-semibold text-[#b8fff1]">
                    Yayına al
                  </button>
                  <button onClick={() => changeStatus(item.id, "archived")} className="rounded-full bg-white/[0.08] px-3 py-2 text-xs font-semibold">
                    Arşivle
                  </button>
                  <button onClick={() => remove(item.id)} className="rounded-full bg-[#ff7968]/18 px-3 py-2 text-xs font-semibold text-[#ffc0b8]">
                    Sil
                  </button>
                </div>
              </div>

              <pre className="mt-4 max-h-44 overflow-auto rounded-2xl bg-[#120b07]/60 p-4 text-xs text-[#ead7b7]/64">
                {JSON.stringify(item.payload, null, 2)}
              </pre>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
