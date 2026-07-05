import { ExamRunnerPage } from "@/features/exams/components/ExamRunnerPage";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ExamRunnerRoute({ params }: PageProps) {
  const { id } = await params;
  return <ExamRunnerPage examId={id} />;
}
