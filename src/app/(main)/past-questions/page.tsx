import type { Metadata } from "next";
import { PastQuestionsPage } from "@/features/past-questions/components/PastQuestionsPage";

export const metadata: Metadata = {
  title: "Çıkmış Sorular",
  description: "KPSS Tarih için yıllara göre çıkmış soru kapsamına uygun özgünleştirilmiş pratik sorular ve resmi ÖSYM arşivi bağlantısı."
};

type PageProps = {
  searchParams: Promise<{
    year?: string;
  }>;
};

export default async function PastQuestionsRoute({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedYear = params.year ? Number(params.year) : undefined;

  return <PastQuestionsPage selectedYear={selectedYear} />;
}
