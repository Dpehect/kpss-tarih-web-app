import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { questions, topics } from "@/data/kpss-history";
import { TopicQuestionRunner } from "@/features/question-bank/components/TopicQuestionRunner";

export function TopicQuestionPage({ topicId }: { topicId: string }) {
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const filteredQuestions = topicId === "all"
    ? questions
    : questions.filter((question) => question.topicId === topicId);

  const title = topic ? `${topic.title} testi` : "Karma KPSS Tarih testi";

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Test Ekranı"
        title={title}
        description="Bu sayfa yalnızca seçilen test akışına odaklanır. Yan panel, filtre kalabalığı ve gereksiz görsel yük kaldırıldı."
        actions={
          <a href="/question-bank" className="btn-gold">
            <ArrowLeft size={18} />
            Test listesi
          </a>
        }
      />

      <TopicQuestionRunner questions={filteredQuestions} topicTitle={topic?.title ?? "Karma test"} />
    </div>
  );
}
