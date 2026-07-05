import { TopicDetailPage } from "@/features/topics/components/TopicDetailPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TopicDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  return <TopicDetailPage slug={slug} />;
}
