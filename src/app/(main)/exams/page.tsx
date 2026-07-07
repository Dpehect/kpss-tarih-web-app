import type { Metadata } from "next";
import { ExamsPage } from "@/features/exams/components/ExamsPage";

export const metadata: Metadata = {
  title: "KPSS Tarih Denemeleri",
  description: "KPSS Genel Kültür içindeki 27 tarih sorusuna göre hazırlanmış süreli ve süresiz tarih denemeleri."
};

export default function ExamsRoute() {
  return <ExamsPage />;
}
