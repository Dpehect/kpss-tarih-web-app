import { notFound } from "next/navigation";
import { getExamById, getQuestionsByIds } from "@/data/kpss-history";
import { PageHeader } from "@/components/core/PageHeader";
import { ExamRunnerClient } from "@/features/exams/components/ExamRunnerClient";

/**
 * Tek deneme çalıştırıcı sayfası.
 */
export function ExamRunnerPage({ examId }: { examId: string }) {
  const exam = getExamById(examId);

  if (!exam) {
    notFound();
  }

  const examQuestions = getQuestionsByIds(exam.questionIds);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Deneme"
        title={exam.title}
        description={`${exam.description} Süre: ${exam.durationMinutes} dakika.`}
      />
      <ExamRunnerClient exam={exam} questions={examQuestions} />
    </div>
  );
}
