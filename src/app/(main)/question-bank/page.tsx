import type { Metadata } from "next";
import { QuestionBankPage } from "@/features/question-bank/components/QuestionBankPage";

export const metadata: Metadata = {
  title: "Soru Dosyaları",
  description: "KPSS Tarih konu başlıklarına göre ayrılmış görsel, açıklamalı ve zenginleştirilmiş soru dosyaları."
};

export default function QuestionBankRoute() {
  return <QuestionBankPage />;
}
