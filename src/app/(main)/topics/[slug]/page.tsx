import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicDetailPage } from "@/features/topics/components/TopicDetailPage";
import { getTopicBySlugFromContent, getTopicsFromContent } from "@/lib/kpss/supabase-content-repository";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const topics = await getTopicsFromContent();
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopicBySlugFromContent(slug);
  if (!topic) return { title: "Konu bulunamadı" };
  return {
    title: `${topic.title} | KPSS Tarih Konu Anlatımı`,
    description: `${topic.title} için Supabase'de hazır tutulan derin konu anlatımı, anahtar kavramlar, sık hata analizi ve açıklamalı KPSS Tarih testleri.`,
  };
}

export default async function TopicDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const topic = await getTopicBySlugFromContent(slug);
  if (!topic) notFound();
  return <TopicDetailPage slug={slug} />;
}
