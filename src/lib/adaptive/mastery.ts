import type { TopicMasterySnapshot, UserAttempt } from "@/types/study";

const DAY_MS = 24 * 60 * 60 * 1000;

type BuildMasteryInput = {
  attempts: UserAttempt[];
  nowIso: string;
};

export function buildTopicMastery({
  attempts,
  nowIso
}: BuildMasteryInput): Record<string, TopicMasterySnapshot> {
  const now = new Date(nowIso).getTime();
  const byTopic = new Map<string, UserAttempt[]>();

  for (const attempt of attempts) {
    const topicAttempts = byTopic.get(attempt.topicId) ?? [];
    topicAttempts.push(attempt);
    byTopic.set(attempt.topicId, topicAttempts);
  }

  const snapshots: Record<string, TopicMasterySnapshot> = {};

  for (const [topicId, topicAttempts] of byTopic.entries()) {
    const attemptCount = topicAttempts.length;
    const wrongCount = topicAttempts.filter((attempt) => !attempt.isCorrect).length;
    const accuracy = attemptCount === 0 ? 0 : (attemptCount - wrongCount) / attemptCount;
    const averageConfidence =
      topicAttempts.reduce((sum, attempt) => sum + attempt.confidence, 0) / attemptCount;

    const latestAttempt = topicAttempts
      .map((attempt) => new Date(attempt.answeredAt).getTime())
      .sort((a, b) => b - a)[0];

    const daysSinceLatest = Math.max(0, Math.floor((now - latestAttempt) / DAY_MS));
    const recencyPenalty = Math.min(0.24, daysSinceLatest * 0.015);

    const confidenceScore = averageConfidence / 5;
    const masteryScore = clamp01(accuracy * 0.72 + confidenceScore * 0.18 - recencyPenalty);
    const weakness = 1 - masteryScore;

    snapshots[topicId] = {
      topicId,
      accuracy,
      attemptCount,
      wrongCount,
      averageConfidence,
      recencyPenalty,
      masteryScore,
      nextReviewPriority: clamp01(weakness + wrongCount * 0.045)
    };
  }

  return snapshots;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}
