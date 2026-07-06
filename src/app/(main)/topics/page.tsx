import type { Metadata } from "next";
import { TopicsPage } from "@/features/topics/components/TopicsPage";

export const metadata: Metadata = {
  title: "Konu Özetleri",
  description: "KPSS Tarih konularını temiz, düzenli ve odaklı bir grid yapısında çalış."
};

export default function TopicsRoute() {
  return <TopicsPage />;
}
