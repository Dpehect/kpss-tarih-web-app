"use client";

import { toast } from "sonner";
import { saveOnlineTopicProgress } from "@/lib/progress/online-progress";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function MarkTopicCompleteButton({ topicId }: { topicId: string }) {
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const markTopicComplete = useStudyProgressStore((state) => state.markTopicComplete);
  const isCompleted = completedTopicIds.includes(topicId);

  async function completeTopic() {
    markTopicComplete(topicId);
    const result = await saveOnlineTopicProgress(topicId);

    if (result.ok) {
      toast.success("Konu online kaydedildi.");
      return;
    }

    toast.success("Konu tamamlandı. Giriş yaparsan ilerleme online saklanır.");
  }

  return (
    <button
      type="button"
      onClick={completeTopic}
      className="inline-flex rounded-full bg-[#f2c15f] px-5 py-3 font-black text-[#120b07] transition hover:-translate-y-1"
    >
      {isCompleted ? "Tamamlandı" : "Konuyu tamamla"}
    </button>
  );
}
