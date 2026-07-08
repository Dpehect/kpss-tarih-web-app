import type { Metadata } from "next";
import { ExamRunnerPage } from "@/features/exams/components/ExamRunnerPage";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Deneme ${id.replace("deneme-", "")}`,
    description: "KPSS Tarih süreli deneme."
  };
}

export default async function ExamDetailRoute({ params }: PageProps) {
  const { id } = await params;
  return <ExamRunnerPage examId={id} />;
}
