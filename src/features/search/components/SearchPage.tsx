"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/core/PageHeader";
import { searchKpssHistory } from "@/lib/search/global-search";

export function SearchPage({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchKpssHistory(query), [query]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Arama"
        title="Platform içi arama artık çalışıyor."
        description="Konu, soru, flashcard, deneme, timeline, kavram ve çıkmış soru eğilimi tek arama ekranında bulunur."
      />

      <form action="/search" className="rounded-[2rem] border border-black/[0.08] bg-[#fffaf0]/88 p-4 shadow-[0_18px_70px_rgba(18,24,38,0.08)]">
        <div className="flex items-center gap-3 rounded-[1.4rem] border border-black/[0.08] bg-white px-4 py-3">
          <Search size={20} className="text-[#425066]" />
          <input
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Örn: Tanzimat, Orhun, Lozan, NATO..."
            className="min-w-0 flex-1 bg-transparent text-base font-semibold text-[#111827] outline-none placeholder:text-[#425066]/55"
          />
          <button className="btn-primary px-5 py-2.5" type="submit">
            Ara
          </button>
        </div>
      </form>

      <section className="rounded-[2rem] border border-black/[0.08] bg-[#fffaf0]/76 p-5">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="kicker">Sonuçlar</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em]">
              {query.trim() ? `${results.length} sonuç` : "Arama bekleniyor"}
            </h2>
          </div>
          {query.trim() ? (
            <p className="text-sm font-semibold text-[#425066]">Aranan: {query}</p>
          ) : null}
        </div>

        {!query.trim() ? (
          <p className="rounded-[1.4rem] bg-white/60 p-5 text-[#425066]">
            Bir kavram, dönem, olay veya konu adı yaz.
          </p>
        ) : results.length === 0 ? (
          <p className="rounded-[1.4rem] bg-white/60 p-5 text-[#425066]">
            Sonuç bulunamadı. Daha kısa bir kavramla tekrar dene.
          </p>
        ) : (
          <div className="grid gap-3">
            {results.map((result) => (
              <a
                key={`${result.type}-${result.id}`}
                href={result.href}
                className="group rounded-[1.45rem] border border-black/[0.08] bg-white/62 p-5 transition hover:-translate-y-0.5 hover:bg-white"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2447d8]">{result.type}</p>
                    <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-[#111827]">{result.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#425066]">{result.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#111827] px-3 py-1 text-xs font-black text-[#fffaf0]">
                    Aç
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
