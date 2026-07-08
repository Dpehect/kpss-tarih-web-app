import type { Metadata } from "next";
import { TimelinePage } from "@/features/timeline/components/TimelinePage";
import { fetchContentTimelineEvents, fetchContentTopics } from "@/lib/content/supabase-content-server";

export const metadata: Metadata = {
  title: "Timeline",
  description: "KPSS Tarih timeline."
};

export default async function TimelineRoute() {
  const [topics, events] = await Promise.all([fetchContentTopics(), fetchContentTimelineEvents()]);
  return <TimelinePage topics={topics} events={events} />;
}
