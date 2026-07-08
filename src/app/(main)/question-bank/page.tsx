import type { Metadata } from "next";
import { QuestionBankPage } from "@/features/question-bank/components/QuestionBankPage";

export const metadata: Metadata = {
  title: "KPSS Tarih Soru Bankası",
  description: "KPSS Tarih konularına göre ayrılmış kolay, orta, zor seviyeli açıklamalı 30 soruluk testler.",
};

export default function QuestionBankRoute() {
  return <QuestionBankPage />;
}
