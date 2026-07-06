"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/EmptyState";
import { topics } from "@/data/kpss-history";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function NotesPage() {
  const notes = useStudyProgressStore((state) => state.notes);
  const addNote = useStudyProgressStore((state) => state.addNote);
  const deleteNote = useStudyProgressStore((state) => state.deleteNote);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topicId, setTopicId] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !body.trim()) return;

    addNote({
      title: title.trim(),
      body: body.trim(),
      topicId: topicId || undefined
    });

    setTitle("");
    setBody("");
    setTopicId("");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Notlar"
        title="Kendi tarih defterini oluştur."
        description="Konu çalışırken kritik gördüğün yerleri kısa notlara dönüştür."
      />

      <section className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <form onSubmit={submit} className="rounded-xl border border-[var(--border-soft)] bg-[rgba(255,248,234,.92)] p-6 shadow-[var(--shadow-sm)] backdrop-blur-2xl">
          <p className="kicker">Yeni not</p>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-[var(--ink)]">Başlık</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-[1.15rem] border border-[var(--border-soft)] bg-white px-4 font-semibold text-[var(--ink)] outline-none"
              placeholder="Örn. Islahat Fermanı"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-semibold text-[var(--ink)]">Konu</span>
            <select
              value={topicId}
              onChange={(event) => setTopicId(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-[1.15rem] border border-[var(--border-soft)] bg-white px-4 font-semibold text-[var(--ink)] outline-none"
            >
              <option value="">Konu seçilmedi</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>{topic.title}</option>
              ))}
            </select>
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-semibold text-[var(--ink)]">Not</span>
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={7}
              className="mt-2 w-full resize-none rounded-[1.15rem] border border-[var(--border-soft)] bg-white p-4 font-semibold leading-7 text-[var(--ink)] outline-none"
              placeholder="Kendi cümlelerinle kısa not yaz..."
            />
          </label>

          <Button type="submit" variant="gold" className="mt-5 w-full">
            <Plus size={18} />
            Not ekle
          </Button>
        </form>

        <div className="space-y-4">
          {notes.length === 0 ? (
            <EmptyState title="Henüz not yok." description="İlk notunu eklediğinde burada modern kartlar halinde görünür." />
          ) : (
            notes.map((note) => {
              const topic = topics.find((item) => item.id === note.topicId);

              return (
                <Card key={note.id}>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#8d6500]">{topic?.title ?? "Genel Not"}</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink)]">{note.title}</h2>
                      <p className="mt-3 whitespace-pre-wrap text-sm font-semibold leading-7 text-[var(--graphite)]">{note.body}</p>
                      <p className="mt-4 text-xs font-bold text-[var(--slate)]">{new Date(note.createdAt).toLocaleDateString("tr-TR")}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteNote(note.id)}
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-[#9a3412]/20 bg-[#fff0e9] text-[#9a3412]"
                      aria-label="Notu sil"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
