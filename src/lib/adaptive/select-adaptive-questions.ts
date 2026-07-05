import type { Question, UserAttempt } from "@/types/study";
import { buildTopicMastery } from "@/lib/adaptive/mastery";
import { weightedRandomSample } from "@/lib/adaptive/weighted-random";

type SelectAdaptiveQuestionsInput = {
  questions: Question[];
  attempts: UserAttempt[];
  count: number;
  nowIso: string;
};

export function selectAdaptiveQuestions({
  questions,
  attempts,
  count,
  nowIso
}: SelectAdaptiveQuestionsInput): Question[] {
  const mastery = buildTopicMastery({ attempts, nowIso });
  const attemptedQuestionIds = new Set(attempts.map((attempt) => attempt.questionId));

  const weightedQuestions = questions.map((question) => {
    const topicSnapshot = mastery[question.topicId];

    const weaknessBoost = topicSnapshot
      ? topicSnapshot.nextReviewPriority * 4
      : 1.25;

    const unattemptedBoost = attemptedQuestionIds.has(question.id) ? 0.85 : 1.35;
    const misconceptionBoost = question.adaptive.misconceptionTags.some((tag) =>
      attempts.some((attempt) => !attempt.isCorrect && attempt.misconceptionTags.includes(tag))
    )
      ? 1.8
      : 1;

    const skillDiversityBoost = getSkillBoost(question, attempts);

    return {
      item: question,
      weight:
        question.adaptive.baseWeight *
        weaknessBoost *
        unattemptedBoost *
        misconceptionBoost *
        skillDiversityBoost
    };
  });

  return weightedRandomSample({
    items: weightedQuestions,
    count
  });
}

function getSkillBoost(question: Question, attempts: UserAttempt[]): number {
  const recentAttempts = attempts.slice(-20);
  const weakSkillAttempts = recentAttempts.filter(
    (attempt) => attempt.cognitiveSkill === question.cognitiveSkill && !attempt.isCorrect
  );

  return 1 + Math.min(1.2, weakSkillAttempts.length * 0.18);
}
