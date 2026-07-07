import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { questions, topics } from "@/data/kpss-history";
import { TopicQuestionRunner } from "@/features/question-bank/components/TopicQuestionRunner";

export function TopicQuestionPage({ topicId }: { topicId: string }) {
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const filteredQuestions = topicId === "all" ? questions : questions.filter((question) => question.topicId === topicId);
  const title = topic ? `${topic.title} soru dosyası` : "Karma KPSS Tarih soru dosyası";

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Aktif çözüm oturumu"
        title={title}
        description="Cevap verdikten sonra gerekçe, doğru seçenek ve çözüm yönünü gösteren kısa ipucu görünür."
        actions={
          <a href="/question-bank" className="btn-ghost px-5 py-3">
            <ArrowLeft size={17} />
            Test listesi
          </a>
        }
      />

      <TopicQuestionRunner questions={filteredQuestions} topicTitle={title} />
    </div>
  );
}
