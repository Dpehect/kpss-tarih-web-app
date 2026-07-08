import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicQuestionPage } from "@/features/question-bank/components/TopicQuestionPage";
import { getSupabaseTestsForTopic, getSupabaseTopicById, getSupabaseTopics, type TestLevel } from "@/lib/kpss/supabase-content";

type PageProps = {
  params: Promise<{ topicId: string }>;
  searchParams?: Promise<{ test?: string; level?: string }>;
};

const levels = ["kolay", "orta", "zor"] as const;

export const revalidate = 3600;

function normalizeLevel(value?: string): TestLevel | undefined {
  return levels.includes(value as TestLevel) ? (value as TestLevel) : undefined;
}

export async function generateStaticParams() {
  const topics = await getSupabaseTopics();
  return [{ topicId: "all" }, ...topics.map((topic) => ({ topicId: topic.id }))];
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { topicId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const level = normalizeLevel(resolvedSearchParams.level);
  const topic = topicId === "all" ? null : await getSupabaseTopicById(topicId);
  const tests = await getSupabaseTestsForTopic(topicId, level);
  const selectedTest = resolvedSearchParams.test ? tests.find((test) => test.id === resolvedSearchParams.test) : null;

  if (topicId !== "all" && !topic) {
    return { title: "Test bulunamadı" };
  }

  const title = selectedTest?.title ?? (topic ? `${topic.title} Testleri` : "Karma KPSS Tarih Testleri");
  return {
    title,
    description: `${title} için Supabase'de hazır bekleyen açıklamalı KPSS Tarih testleri, seviye seçimi ve soru çözüm oturumu.`,
  };
}

export default async function TopicQuestionRoute({ params, searchParams }: PageProps) {
  const { topicId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const level = normalizeLevel(resolvedSearchParams.level);
  const topic = topicId === "all" ? null : await getSupabaseTopicById(topicId);
  const tests = await getSupabaseTestsForTopic(topicId, level);

  if (topicId !== "all" && !topic) notFound();
  if (tests.length === 0) notFound();

  return <TopicQuestionPage topicId={topicId} level={level} testId={resolvedSearchParams.test} />;
}
