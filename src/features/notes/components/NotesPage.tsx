"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/core/PageHeader";
import { topics } from "@/data/kpss-history";
import { deleteOnlineNote, saveOnlineNote } from "@/lib/progress/online-progress";
import { useMounted } from "@/hooks/useMounted";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function NotesPage() {
  const mounted = useMounted();
  const notes = useStudyProgressStore((state) => state.notes);
  const addNote = useStudyProgressStore((state) => state.addNote);
  const deleteNote = useStudyProgressStore((state) => state.deleteNote);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topicId, setTopicId] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      toast.error("Başlık ve not alanı zorunlu.");
      return;
    }

    const noteId = addNote({ title, body, topicId: topicId || undefined });

    void saveOnlineNote({
      id: noteId,
      title,
      body,
      topicId: topicId || undefined
    });

    setTitle("");
    setBody("");
    setTopicId("");
    toast.success("Not eklendi");
  }

  async function removeNote(id: string) {
    deleteNote(id);
    void deleteOnlineNote(id);
    toast.success("Not silindi");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Notlar"
        title="Kendi kısa tekrar defterin."
        description="Google ile giriş yaptıysan notların Supabase'de saklanır ve tekrar girişte yüklenir."
      />

      <form onSubmit={submit} className="rounded-[2rem] parchment-surface p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 outline-none focus:border-[#f2c15f]" placeholder="Not başlığı" />
          <select value={topicId} onChange={(event) => setTopicId(event.target.value)} className="rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 outline-none focus:border-[#f2c15f]">
            <option value="">Konu seçmeden kaydet</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.title}</option>
            ))}
          </select>
        </div>
        <textarea value={body} onChange={(event) => setBody(event.target.value)} className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-[#120b07]/50 px-4 py-3 outline-none focus:border-[#f2c15f]" placeholder="Kendi notunu yaz..." />
        <button className="mt-4 rounded-full bg-[#f2c15f] px-6 py-3 font-black text-[#120b07]">Not ekle</button>
      </form>

      <section className="grid gap-4 md:grid-cols-2">
        {!mounted || notes.length === 0 ? (
          <div className="rounded-[2rem] parchment-surface p-6">
            <h2 className="text-2xl font-black">Henüz not yok.</h2>
            <p className="mt-3 text-[#ead7b7]/66">İlk tekrar notunu yukarıdan ekle.</p>
          </div>
        ) : notes.map((note) => {
          const topic = topics.find((item) => item.id === note.topicId);
          return (
            <article key={note.id} className="rounded-[2rem] parchment-surface p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f6c465]">{topic?.title ?? "Genel not"}</p>
              <h2 className="mt-3 text-2xl font-black">{note.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#ead7b7]/70">{note.body}</p>
              <button onClick={() => removeNote(note.id)} className="mt-5 rounded-full bg-white/[0.08] px-4 py-2 text-sm font-bold">
                Sil
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}
