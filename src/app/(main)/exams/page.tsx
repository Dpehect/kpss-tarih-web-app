import type { Metadata } from "next";
import { ExamsPage } from "@/features/exams/components/ExamsPage";

export const metadata: Metadata = {
  title: "Denemeler",
  description: "KPSS Tarih deneme merkezi."
};

export default async function ExamsRoute() {
  return <ExamsPage />;
}
