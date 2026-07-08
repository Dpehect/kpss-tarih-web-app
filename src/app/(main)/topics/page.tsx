import type { Metadata } from "next";
import { TopicsPage } from "@/features/topics/components/TopicsPage";

export const metadata: Metadata = {
  title: "KPSS Tarih Konu Akademisi",
  description: "KPSS Tarih konularını derin anlatım, kavram ilişkisi, kronoloji, sık hata ve açıklamalı test akışıyla çalış.",
};

export default function TopicsRoute() {
  return <TopicsPage />;
}
