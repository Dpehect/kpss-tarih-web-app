"use client";

import { toast } from "sonner";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

/**
 * Konu tamamlandı butonu.
 */
export function MarkTopicCompleteButton({ topicId }: { topicId: string }) {
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const markTopicComplete = useStudyProgressStore((state) => state.markTopicComplete);
  const isCompleted = completedTopicIds.includes(topicId);

  return (
    <button
      type="button"
      onClick={() => {
        markTopicComplete(topicId);
        toast.success("Konu tamamlandı olarak işaretlendi.");
      }}
      className="inline-flex rounded-full bg-[#f2c15f] px-5 py-3 font-black text-[#120b07] transition hover:-translate-y-1"
    >
      {isCompleted ? "Tamamlandı" : "Konuyu tamamla"}
    </button>
  );
}
