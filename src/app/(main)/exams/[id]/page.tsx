import { ExamRunnerShell } from "@/features/exams/components/ExamRunnerShell";

type ExamPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ExamPage({ params }: ExamPageProps) {
  const { id } = await params;
  return <ExamRunnerShell examId={id} />;
}
