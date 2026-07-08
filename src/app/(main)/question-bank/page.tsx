import type { Metadata } from "next";
import { QuestionBankPage } from "@/features/question-bank/components/QuestionBankPage";

export const metadata: Metadata = {
  title: "Soru Bankası",
  description: "KPSS Tarih soru bankası."
};

export default async function QuestionBankRoute() {
  return <QuestionBankPage />;
}
