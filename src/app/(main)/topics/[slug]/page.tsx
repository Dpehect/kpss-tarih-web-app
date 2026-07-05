import { TopicDetailShell } from "@/features/topics/components/TopicDetailShell";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  return <TopicDetailShell slug={slug} />;
}
