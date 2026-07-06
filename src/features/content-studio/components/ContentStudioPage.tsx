"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/core/PageHeader";
import { topics } from "@/data/kpss-history";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

/**
 * İçerik ekleme stüdyosu.
 * Finalde taslaklar not olarak localStorage'a kaydedilir.
 */
export function ContentStudioPage() {
  const [type, setType] = useState("Konu Özeti");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topicId, setTopicId] = useState("");
  const addNote = useStudyProgressStore((state) => state.addNote);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error("Başlık ve açıklama zorunlu.");
      return;
    }

    addNote({
      title: `${type}: ${title}`,
      body,
      topicId: topicId || undefined
    });

    setTitle("");
    setBody("");
    setTopicId("");
    toast.success(`${type} taslağı notlara kaydedildi.`);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="İçerik Stüdyosu"
        title="Yeni konu, soru, flashcard veya timeline taslağı ekle."
        description="Proje tek başına kullanılabilir olduğu için içerik üretim alanı da ayrı ve düzenli bir modül olarak tamamlandı."
      />

      <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-xl parchment-surface p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#f6c465]">İçerik Türü</p>
          <div className="mt-5 space-y-2">
            {["Konu Özeti", "Test Sorusu", "Flashcard", "Timeline Olayı", "Deneme", "Kişisel Not"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setType(item)}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold ${type === item ? "bg-[#f2c15f] text-[#120b07]" : "bg-white/[0.06]"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-xl parchment-surface p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#f6c465]">{type}</p>
          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold">Başlık</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 outline-none focus:border-[#f2c15f]" placeholder="Örn: Amasya Genelgesi'nin Önemi" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold">Bağlı konu</span>
              <select value={topicId} onChange={(event) => setTopicId(event.target.value)} className="rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 outline-none focus:border-[#f2c15f]">
                <option value="">Genel</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>{topic.title}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold">İçerik</span>
              <textarea value={body} onChange={(event) => setBody(event.target.value)} className="min-h-40 rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 outline-none focus:border-[#f2c15f]" placeholder="İçeriğin açıklamasını yaz..." />
            </label>
            <button className="w-fit rounded-full bg-[#f2c15f] px-6 py-3 font-semibold text-[#120b07]">
              Taslağı kaydet
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
