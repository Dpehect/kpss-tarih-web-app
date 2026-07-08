import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicQuestionPage } from "@/features/question-bank/components/TopicQuestionPage";
import { fetchContentTestsForTopic, fetchContentTopicById, type ContentTestLevel } from "@/lib/content/supabase-content-server";

type PageProps = {
  params: Promise<{ topicId: string }>;
  searchParams?: Promise<{ test?: string; level?: string }>;
};

const levels = ["kolay", "orta", "zor"] as const;

function normalizeLevel(value?: string): ContentTestLevel | undefined {
  return levels.includes(value as ContentTestLevel) ? (value as ContentTestLevel) : undefined;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topicId } = await params;
  const topic = await fetchContentTopicById(topicId);
  return {
    title: topic ? `${topic.title} Testleri` : "Konu Testleri",
    description: "Supabase destekli 30 soruluk konu testleri."
  };
}

export default async function TopicQuestionRoute({ params, searchParams }: PageProps) {
  const { topicId } = await params;
  const resolved = searchParams ? await searchParams : {};
  const level = normalizeLevel(resolved.level);
  const topic = await fetchContentTopicById(topicId);

  if (!topic) notFound();

  if (level) {
    const tests = await fetchContentTestsForTopic(topicId, level);
    if (tests.length === 0) notFound();

    if (resolved.test && !tests.some((test) => test.id === resolved.test)) {
      notFound();
    }
  }

  return <TopicQuestionPage topicId={topicId} testId={resolved.test} level={level} />;
}
