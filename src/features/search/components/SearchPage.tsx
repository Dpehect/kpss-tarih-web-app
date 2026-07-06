"use client";

import { useMemo, useState } from "react";
import { BookOpen, CreditCard, FileQuestion, LibraryBig, Search } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { Card } from "@/components/ui/card";
import { flashcards, getGlossaryByTopic, questions, topics } from "@/data/kpss-history";

type SearchResult = {
  id: string;
  type: "Konu" | "Soru" | "Flashcard" | "Kavram";
  title: string;
  description: string;
  href: string;
};

const glossaryItems = topics.flatMap((topic) =>
  getGlossaryByTopic(topic.id).map((item) => ({
    ...item,
    topicTitle: topic.title
  }))
);

export function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo<SearchResult[]>(() => {
    const normalized = query.toLocaleLowerCase("tr-TR").trim();

    if (!normalized) return [];

    const topicResults = topics
      .filter((topic) => `${topic.title} ${topic.shortDescription} ${topic.keywords.join(" ")}`.toLocaleLowerCase("tr-TR").includes(normalized))
      .map((topic) => ({ id: `topic-${topic.id}`, type: "Konu" as const, title: topic.title, description: topic.shortDescription, href: `/topics/${topic.slug}` }));

    const questionResults = questions
      .filter((question) => `${question.stem} ${question.explanation} ${question.tags.join(" ")}`.toLocaleLowerCase("tr-TR").includes(normalized))
      .slice(0, 12)
      .map((question) => {
        const topic = topics.find((item) => item.id === question.topicId);
        return { id: `question-${question.id}`, type: "Soru" as const, title: question.stem, description: topic?.title ?? "Konu testi", href: `/question-bank?topic=${question.topicId}` };
      });

    const flashcardResults = flashcards
      .filter((card) => `${card.front} ${card.back} ${card.tags.join(" ")}`.toLocaleLowerCase("tr-TR").includes(normalized))
      .slice(0, 12)
      .map((card) => {
        const topic = topics.find((item) => item.id === card.topicId);
        return { id: `flashcard-${card.id}`, type: "Flashcard" as const, title: card.front, description: topic?.title ?? "Flashcard", href: "/flashcards" };
      });

    const glossaryResults = glossaryItems
      .filter((item) => `${item.term} ${item.definition}`.toLocaleLowerCase("tr-TR").includes(normalized))
      .map((item) => ({
        id: `glossary-${item.term}-${item.topicId}`,
        type: "Kavram" as const,
        title: item.term,
        description: `${item.definition} · ${item.topicTitle}`,
        href: "/glossary"
      }));

    return [...topicResults, ...glossaryResults, ...questionResults, ...flashcardResults].slice(0, 30);
  }, [query]);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Arama dosyası" title="Bilgiyi tek taramada bul." description="Konu, kavram, soru ve flashcard içerikleri arasında hızlı arama yap." />

      <div className="bureau-surface rounded-xl p-3">
        <label className="flex min-h-14 items-center gap-3 rounded-[1.3rem] bg-[rgba(14,17,23,.045)] px-4">
          <Search size={18} className="text-[var(--graphite)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Örn. Malazgirt, Ahilik, Tanzimat, Lozan..."
            className="min-w-0 flex-1 bg-transparent font-semibold text-[var(--ink)] outline-none placeholder:text-[var(--slate)]"
            autoFocus
          />
        </label>
      </div>

      {query.trim() ? (
        <section className="grid gap-4">
          {results.length > 0 ? (
            results.map((result) => <ResultCard key={result.id} result={result} />)
          ) : (
            <Card>
              <p className="text-xl font-semibold text-[var(--ink)]">Sonuç bulunamadı.</p>
              <p className="mt-2 text-sm leading-7 text-[var(--graphite)]">Daha kısa bir kavram veya dönem adıyla tekrar dene.</p>
            </Card>
          )}
        </section>
      ) : (
        <Card>
          <p className="text-xl font-semibold text-[var(--ink)]">Aramaya başla.</p>
          <p className="mt-2 text-sm leading-7 text-[var(--graphite)]">Konu, kavram, soru veya flashcard metni yazabilirsin.</p>
        </Card>
      )}
    </div>
  );
}

function ResultCard({ result }: { result: SearchResult }) {
  const icon = {
    Konu: <BookOpen size={18} />,
    Soru: <FileQuestion size={18} />,
    Flashcard: <CreditCard size={18} />,
    Kavram: <LibraryBig size={18} />
  }[result.type];

  return (
    <a href={result.href} className="group bureau-card block rounded-xl p-5">
      <div className="flex gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-[1rem] bg-[var(--ink)] text-white">{icon}</span>
        <span className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--sage)]">{result.type}</span>
          <span className="mt-2 block text-xl font-semibold tracking-tight text-[var(--ink)]">{result.title}</span>
          <span className="mt-2 block text-sm font-semibold leading-7 text-[var(--graphite)]">{result.description}</span>
        </span>
      </div>
    </a>
  );
}
