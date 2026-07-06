import type { Metadata } from "next";
import { SearchPage } from "@/features/search/components/SearchPage";

export const metadata: Metadata = {
  title: "Arama",
  description: "KPSS Tarih Akademi içinde konu, soru, flashcard, deneme, timeline ve çıkmış soru eğilimlerini ara."
};

type PageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchRoute({ searchParams }: PageProps) {
  const params = await searchParams;
  return <SearchPage initialQuery={params.q ?? ""} />;
}
