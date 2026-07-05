import { PageHeader } from "@/components/core/PageHeader";
import { questions, topics } from "@/data/kpss-history";
import { QuestionBankClient } from "@/features/question-bank/components/QuestionBankClient";

/**
 * Soru bankası sayfası.
 */
export function QuestionBankPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`${questions.length} Açıklamalı Soru`}
        title="Konu konu filtrelenen soru bankası."
        description="Her soruda doğru cevap, gerekçe, KPSS ipucu ve ilerleme kaydı bulunur. Cevapların dashboard, analiz ve yanlışlarım sayfasına bağlanır."
      />
      <QuestionBankClient questions={questions} topics={topics} />
    </div>
  );
}
