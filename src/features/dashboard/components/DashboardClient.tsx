"use client";

import { MetricCard } from "@/components/common/MetricCard";
import type { StudyRecommendation } from "@/types/study";
import { useMounted } from "@/hooks/useMounted";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";
import { ProgressRings } from "@/features/dashboard/components/ProgressRings";
import { RecommendationList } from "@/features/dashboard/components/RecommendationList";
import { WeeklyTrend } from "@/features/dashboard/components/WeeklyTrend";

/**
 * Local progress verisini dashboard'a bağlar.
 */
type DashboardClientProps = {
  totalTopics: number;
  totalQuestions: number;
  totalFlashcards: number;
  totalExams: number;
  recommendations: StudyRecommendation[];
};

export function DashboardClient({
  totalTopics,
  totalQuestions,
  totalFlashcards,
  totalExams,
  recommendations
}: DashboardClientProps) {
  const mounted = useMounted();
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const flashcardReviews = useStudyProgressStore((state) => state.flashcardReviews);
  const examResults = useStudyProgressStore((state) => state.examResults);

  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
  const topicProgress = Math.round((completedTopicIds.length / totalTopics) * 100);
  const flashcardProgress = Math.min(100, Math.round((flashcardReviews.length / totalFlashcards) * 100));
  const examProgress = Math.min(100, Math.round((examResults.length / totalExams) * 100));

  if (!mounted) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Yükleniyor" value="..." helper="İlerleme verileri hazırlanıyor." />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Konu" value={`${completedTopicIds.length}/${totalTopics}`} helper="Tamamlanan konu sayısı." />
        <MetricCard label="Soru" value={`${attempts.length}/${totalQuestions}`} helper={`Doğruluk: %${accuracy}`} tone="turquoise" />
        <MetricCard label="Flashcard" value={`${flashcardReviews.length}`} helper="Tekrar edilen kart sayısı." tone="crimson" />
        <MetricCard label="Deneme" value={`${examResults.length}/${totalExams}`} helper="Bitirilen deneme sayısı." />
      </div>

      <ProgressRings
        rings={[
          { label: "Konu", value: topicProgress, color: "#f2c15f" },
          { label: "Test", value: accuracy, color: "#52f2d0" },
          { label: "Tekrar", value: flashcardProgress, color: "#ff7968" },
          { label: "Deneme", value: examProgress, color: "#fff1cf" }
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <WeeklyTrend attempts={attempts} />
        <RecommendationList items={recommendations} />
      </div>
    </>
  );
}
