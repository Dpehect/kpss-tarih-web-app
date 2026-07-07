import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { questions, topics } from "@/data/kpss-history";
import { TopicQuestionPage } from "@/features/question-bank/components/TopicQuestionPage";

type PageProps = {
  params: Promise<{
    topicId: string;
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topicId } = await params;
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);

  if (topicId !== "all" && !topic) {
    return { title: "Test bulunamadı" };
  }

  const title = topic ? `${topic.title} Testi` : "Karma KPSS Tarih Testi";

  return {
    title,
    description: `${title} için açıklamalı KPSS Tarih soruları.`
  };
}

export default async function TopicQuestionRoute({ params }: PageProps) {
  const { topicId } = await params;
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const filteredQuestions = topicId === "all" ? questions : questions.filter((question) => question.topicId === topicId);

  if (topicId !== "all" && !topic) {
    notFound();
  }

  if (filteredQuestions.length === 0) {
    notFound();
  }

  return <TopicQuestionPage topicId={topicId} />;
}
