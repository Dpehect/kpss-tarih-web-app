import { PageHeader } from "@/components/core/PageHeader";
import { questions, flashcards, recommendations, topics, exams } from "@/data/kpss-history";
import { DashboardClient } from "@/features/dashboard/components/DashboardClient";

/**
 * Final dashboard.
 * Server tarafında veri setlerini hazırlar, client tarafında local progress ile birleştirir.
 */
export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Kontrol Merkezi"
        title="KPSS Tarih çalışma üssün hazır."
        description="Konu özetleri, testler, denemeler, flashcard, yanlış analizi, notlar ve rozetler tek platformda toplandı."
        actions={
          <a href="/question-bank" className="inline-flex rounded-full bg-[#f2c15f] px-5 py-3 font-black text-[#120b07] transition hover:-translate-y-1">
            Teste başla
          </a>
        }
      />

      <DashboardClient
        totalTopics={topics.length}
        totalQuestions={questions.length}
        totalFlashcards={flashcards.length}
        totalExams={exams.length}
        recommendations={recommendations}
      />
    </div>
  );
}
