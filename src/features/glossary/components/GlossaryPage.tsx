"use client";

import { useMemo, useState } from "react";
import { BookMarked, Search } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { Card } from "@/components/ui/card";
import { glossary, topics } from "@/data/kpss-history";

export function GlossaryPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.toLocaleLowerCase("tr-TR").trim();

    if (!normalized) return glossary;

    return glossary.filter((item) => {
      const topicTitle = topics.find((topic) => topic.id === item.topicId)?.title ?? "";
      return `${item.term} ${item.definition} ${topicTitle}`.toLocaleLowerCase("tr-TR").includes(normalized);
    });
  }, [query]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Kavram Sözlüğü"
        title="Tarih kavramlarını hızlı bul."
        description="Kavramları konu bağlamıyla birlikte arayabilir, test öncesi kısa tekrar yapabilirsin."
      />

      <div className="rounded-xl border border-[var(--border-soft)] bg-white/78 p-3 shadow-[var(--shadow-xs)] backdrop-blur-2xl">
        <label className="flex min-h-14 items-center gap-3 rounded-xl bg-[rgba(11,18,32,.045)] px-4">
          <Search size={18} className="text-[var(--graphite)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Kavram, açıklama veya konu ara"
            className="min-w-0 flex-1 bg-transparent font-semibold text-[var(--ink)] outline-none placeholder:text-[var(--slate)]"
          />
        </label>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => {
          const topic = topics.find((topicItem) => topicItem.id === item.topicId);

          return (
            <Card key={`${item.term}-${item.topicId}`} interactive>
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--gold-soft)] text-[#8d6500]">
                  <BookMarked size={19} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8d6500]">{topic?.title ?? "Genel"}</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink)]">{item.term}</h2>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[var(--graphite)]">{item.definition}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
