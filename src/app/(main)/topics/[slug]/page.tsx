import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topics as fallbackTopics } from "@/data/kpss-history";
import { TopicDetailPage } from "@/features/topics/components/TopicDetailPage";
import { fetchContentTopicBySlug } from "@/lib/content/supabase-content-server";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = (await fetchContentTopicBySlug(slug)) ?? fallbackTopics.find((item) => item.slug === slug);
  return { title: topic?.title ?? "Konu bulunamadı", description: topic?.shortDescription };
}

export default async function TopicDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const topic = (await fetchContentTopicBySlug(slug)) ?? fallbackTopics.find((item) => item.slug === slug);
  if (!topic) notFound();
  return <TopicDetailPage topic={topic} />;
}
