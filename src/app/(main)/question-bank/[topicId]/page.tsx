import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topics } from "@/data/kpss-history";
import { getTestsForTopic } from "@/data/generated-30-question-tests";
import { TopicQuestionPage } from "@/features/question-bank/components/TopicQuestionPage";

type PageProps = {
  params: Promise<{
    topicId: string;
  }>;
  searchParams?: Promise<{
    test?: string;
  }>;
};

export function generateStaticParams() {
  return [
    { topicId: "all" },
    ...topics.map((topic) => ({
      topicId: topic.id
    }))
  ];
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { topicId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const tests = getTestsForTopic(topicId);
  const selectedTest = resolvedSearchParams.test ? tests.find((test) => test.id === resolvedSearchParams.test) : null;

  if (topicId !== "all" && !topic) {
    return { title: "Test bulunamadı" };
  }

  const title = selectedTest?.title ?? (topic ? `${topic.title} Testleri` : "Karma KPSS Tarih Testleri");

  return {
    title,
    description: `${title} için 30 soruluk açıklamalı KPSS Tarih testleri.`
  };
}

export default async function TopicQuestionRoute({ params, searchParams }: PageProps) {
  const { topicId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const tests = getTestsForTopic(topicId);

  if (topicId !== "all" && !topic) {
    notFound();
  }

  if (tests.length === 0) {
    notFound();
  }

  return <TopicQuestionPage topicId={topicId} testId={resolvedSearchParams.test} />;
}
