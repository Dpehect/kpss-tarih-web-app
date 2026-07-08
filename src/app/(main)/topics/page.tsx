import type { Metadata } from "next";
import { topics as fallbackTopics } from "@/data/kpss-history";
import { TopicsPage } from "@/features/topics/components/TopicsPage";
import { fetchContentTopics } from "@/lib/content/supabase-content-server";

export const metadata: Metadata = {
  title: "Konu Özetleri",
  description: "KPSS Tarih konuları."
};

export default async function TopicsRoute() {
  const topics = await fetchContentTopics();
  return <TopicsPage topics={topics.length ? topics : fallbackTopics} />;
}
