import type { Metadata } from "next";
import { QuestionBankPage } from "@/features/question-bank/components/QuestionBankPage";

export const metadata: Metadata = {
  title: "Konu Testleri",
  description: "KPSS Tarih konu başlıklarına göre ayrılmış test sayfaları."
};

export default function QuestionBankRoute() {
  return <QuestionBankPage />;
}
