import { MetricCard } from "@/components/common/MetricCard";
import type { AdminOverview } from "@/lib/admin/admin-service";

export function AdminMetricGrid({ overview }: { overview: AdminOverview }) {
  const accuracy = overview.totalQuestionAttempts
    ? Math.round((overview.totalCorrectAnswers / overview.totalQuestionAttempts) * 100)
    : 0;

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Toplam kullanıcı" value={String(overview.totalUsers)} helper={`${overview.activeUsers} aktif kullanıcı`} />
      <MetricCard label="Çözülen soru" value={String(overview.totalQuestionAttempts)} helper={`Genel doğruluk: %${accuracy}`} tone="turquoise" />
      <MetricCard label="Flashcard tekrar" value={String(overview.totalFlashcardReviews)} helper="Tüm kullanıcı tekrarları" tone="crimson" />
      <MetricCard label="Deneme sonucu" value={String(overview.totalExamResults)} helper={`${overview.totalCompletedTopics} konu tamamlandı`} />
    </section>
  );
}
