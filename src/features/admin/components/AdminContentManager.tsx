"use client";

import { useMemo, useState, type FormEvent } from "react";
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
  const [payloadText, setPayloadText] = useState('{\n  "example": true\n}');
  const [filter, setFilter] = useState<AdminContentType | "all">("all");
  const [isSaving, setIsSaving] = useState(false);

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.type === filter);
  }, [filter, items]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Başlık zorunlu.");
      return;
    }

    let payload: Record<string, unknown>;

    try {
      const parsed = JSON.parse(payloadText) as unknown;

      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        toast.error("Payload JSON object formatında olmalı.");
        return;
      }

      payload = parsed as Record<string, unknown>;
    } catch {
      toast.error("Payload geçerli JSON olmalı.");
      return;
    }

    setIsSaving(true);

    try {
      await createAdminContentItem({ type, title, description, payload, status });
      toast.success("Admin içeriği kaydedildi.");
      setTitle("");
      setDescription("");
      setPayloadText('{\n  "example": true\n}');
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
    <section className="grid gap-6 xl:grid-cols-[minmax(0,420px)_1fr]">
      <form
        onSubmit={(event) => void submit(event)}
        className="rounded-[2rem] border border-[#d8c7ad] bg-white p-5 shadow-[0_24px_80px_rgba(16,24,40,.08)]"
      >
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9a5d13]">İçerik yönetimi</p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.055em] text-[#101828]">Admin içerik ekle</h2>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-black text-[#344054]">İçerik türü</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as AdminContentType)}
              className="rounded-2xl border border-[#d8c7ad] bg-[#fffaf3] px-4 py-3 text-sm font-bold text-[#101828] outline-none focus:border-[#b4232a]"
            >
              {contentTypes.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black text-[#344054]">Durum</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as AdminContentStatus)}
              className="rounded-2xl border border-[#d8c7ad] bg-[#fffaf3] px-4 py-3 text-sm font-bold text-[#101828] outline-none focus:border-[#b4232a]"
            >
              <option value="draft">Taslak</option>
              <option value="published">Yayında</option>
              <option value="archived">Arşiv</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black text-[#344054]">Başlık</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-2xl border border-[#d8c7ad] bg-[#fffaf3] px-4 py-3 text-sm font-bold text-[#101828] outline-none placeholder:text-[#667085] focus:border-[#b4232a]"
              placeholder="Örn: Yeni deneme duyurusu"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black text-[#344054]">Açıklama</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-24 rounded-2xl border border-[#d8c7ad] bg-[#fffaf3] px-4 py-3 text-sm font-bold text-[#101828] outline-none placeholder:text-[#667085] focus:border-[#b4232a]"
              placeholder="Kısa açıklama"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black text-[#344054]">Payload JSON</span>
            <textarea
              value={payloadText}
              onChange={(event) => setPayloadText(event.target.value)}
              className="min-h-44 rounded-2xl border border-[#d8c7ad] bg-[#fffaf3] px-4 py-3 font-mono text-sm font-bold text-[#101828] outline-none focus:border-[#b4232a]"
            />
          </label>

          <button
            disabled={isSaving}
            className="rounded-full bg-[#101828] px-6 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(16,24,40,.18)] disabled:opacity-60"
          >
            {isSaving ? "Kaydediliyor" : "İçeriği kaydet"}
          </button>
        </div>
      </form>

      <div className="rounded-[2rem] border border-[#d8c7ad] bg-white p-5 shadow-[0_24px_80px_rgba(16,24,40,.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9a5d13]">Admin içerikleri</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.055em] text-[#101828]">Taslak ve yayın kontrolü</h2>
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as AdminContentType | "all")}
            className="rounded-full border border-[#d8c7ad] bg-[#fffaf3] px-4 py-3 text-sm font-black text-[#101828] outline-none focus:border-[#b4232a]"
          >
            <option value="all">Tümü</option>
            {contentTypes.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-[#eadfce] bg-[#fffaf3] p-5 text-sm font-bold text-[#475467]">
              Henüz admin içeriği yok.
            </div>
          ) : (
            filteredItems.map((item) => (
              <article key={item.id} className="rounded-2xl border border-[#eadfce] bg-[#fffaf3] p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a5d13]">
                      {item.type} · {item.status}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-[#101828]">{item.title}</h3>
                    {item.description ? (
                      <p className="mt-2 text-sm font-bold leading-6 text-[#475467]">{item.description}</p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void changeStatus(item.id, "published")}
                      className="rounded-full bg-[#0b7a5f] px-3 py-2 text-xs font-black text-white"
                    >
                      Yayına al
                    </button>
                    <button
                      type="button"
                      onClick={() => void changeStatus(item.id, "archived")}
                      className="rounded-full bg-[#101828] px-3 py-2 text-xs font-black text-white"
                    >
                      Arşivle
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(item.id)}
                      className="rounded-full bg-[#b4232a] px-3 py-2 text-xs font-black text-white"
                    >
                      Sil
                    </button>
                  </div>
                </div>

                <pre className="mt-4 max-h-44 overflow-auto rounded-2xl bg-[#101828] p-4 text-xs font-bold leading-6 text-[#f9fafb]">
                  {JSON.stringify(item.payload, null, 2)}
                </pre>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
