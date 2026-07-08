import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTopicBySlug, topics } from "@/data/kpss-history";
import { TopicDetailPage } from "@/features/topics/components/TopicDetailPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return { title: "Konu bulunamadı" };
  }

  return {
    title: `${topic.title} | KPSS Tarih Konu Anlatımı`,
    description: `${topic.title} için derin konu anlatımı, anahtar kavramlar, sık hata analizi, mini kronoloji ve açıklamalı KPSS Tarih testleri.`,
  };
}

export default async function TopicDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  return <TopicDetailPage slug={slug} />;
}
