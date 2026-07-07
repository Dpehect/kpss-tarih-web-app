import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getKpssHistoryExamById,
  getKpssHistoryExamQuestions,
  kpssHistoryExams
} from "@/data/kpss-exam-blueprints";
import { ExamRunnerClient } from "@/features/exams/components/ExamRunnerClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    timer?: string;
  }>;
};

export function generateStaticParams() {
  return kpssHistoryExams.map((exam) => ({
    id: exam.id
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const exam = getKpssHistoryExamById(id);

  if (!exam) {
    return {
      title: "Deneme bulunamadı"
    };
  }

  return {
    title: exam.title,
    description: `${exam.title}: 27 soruluk KPSS Tarih denemesi.`
  };
}

export default async function ExamDetailRoute({ params, searchParams }: PageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const exam = getKpssHistoryExamById(id);
  const questions = getKpssHistoryExamQuestions(id);
  const enableTimer = resolvedSearchParams.timer !== "off";

  if (!exam || questions.length === 0) {
    notFound();
  }

  return <ExamRunnerClient exam={exam} questions={questions} enableTimer={enableTimer} />;
}
