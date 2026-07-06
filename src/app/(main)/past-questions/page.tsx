import type { Metadata } from "next";
import { PastQuestionsPage } from "@/features/past-questions/components/PastQuestionsPage";

export const metadata: Metadata = {
  title: "Çıkmış Sorular",
  description: "KPSS Tarih için son 15 yıl çıkmış soru eğilimleri, resmi ÖSYM arşivi bağlantısı ve özgünleştirilmiş pratik sorular."
};

type PageProps = {
  searchParams: Promise<{
    year?: string;
  }>;
};

export default async function PastQuestionsRoute({ searchParams }: PageProps) {
  const params = await searchParams;
  return <PastQuestionsPage selectedYear={params.year ? Number(params.year) : undefined} />;
}
