import { expandedQuestions } from "@/data/generated-30-question-tests";
import { topics } from "@/data/kpss-history";
import type { Exam, Question } from "@/types/study";

export type OsymSection = {
  id: string;
  title: string;
  count: number;
};

export type KpssExamBlueprint = Exam & {
  label: string;
  examType: "history-osym" | "full-gy-gk-reference";
  mode: "ÖSYM formatı";
  historyQuestionCount: number;
  fullExamQuestionCount: number;
  fullExamMinutes: number;
  sections: OsymSection[];
  topicTitles: string[];
};

export const kpssGyGkSections: OsymSection[] = [
  { id: "turkce", title: "Türkçe", count: 30 },
  { id: "matematik", title: "Matematik", count: 30 },
  { id: "tarih", title: "Tarih", count: 27 },
  { id: "cografya", title: "Coğrafya", count: 18 },
  { id: "vatandaslik", title: "Vatandaşlık", count: 9 },
  { id: "guncel", title: "Güncel Bilgiler", count: 6 }
];

export const kpssExamReference = {
  title: "KPSS Genel Yetenek - Genel Kültür",
  totalQuestions: 120,
  totalMinutes: 130,
  generalAbilityQuestions: 60,
  generalCultureQuestions: 60,
  historyQuestions: 27,
  recommendedHistoryMinutes: 30,
  sections: kpssGyGkSections
};

const historyTopicPlan = [
  { topicId: "t1", count: 2 },
  { topicId: "t2", count: 2 },
  { topicId: "t3", count: 2 },
  { topicId: "t4", count: 3 },
  { topicId: "t5", count: 3 },
  { topicId: "t6", count: 3 },
  { topicId: "t7", count: 3 },
  { topicId: "t8", count: 2 },
  { topicId: "t9", count: 3 },
  { topicId: "t10", count: 2 },
  { topicId: "t11", count: 1 },
  { topicId: "t12", count: 1 }
];

function getQuestionPool(topicId: string) {
  return expandedQuestions.filter((question) => question.topicId === topicId);
}

function pickQuestion(topicId: string, order: number, examNo: number) {
  const pool = getQuestionPool(topicId);
  const fallback = expandedQuestions[0];

  if (!pool.length) return fallback;

  return pool[(examNo * 17 + order * 7) % pool.length] ?? fallback;
}

function buildHistoryExamQuestionIds(examNo: number) {
  const used = new Set<string>();
  const questionIds: string[] = [];

  for (const plan of historyTopicPlan) {
    for (let index = 0; index < plan.count; index += 1) {
      const question = pickQuestion(plan.topicId, index + questionIds.length, examNo);

      if (question && !used.has(question.id)) {
        used.add(question.id);
        questionIds.push(question.id);
      }
    }
  }

  if (questionIds.length < kpssExamReference.historyQuestions) {
    for (const question of expandedQuestions) {
      if (questionIds.length >= kpssExamReference.historyQuestions) break;
      if (!used.has(question.id)) {
        used.add(question.id);
        questionIds.push(question.id);
      }
    }
  }

  return questionIds.slice(0, kpssExamReference.historyQuestions);
}

export const kpssHistoryExams: KpssExamBlueprint[] = Array.from({ length: 12 }, (_, index) => {
  const examNo = index + 1;
  const questionIds = buildHistoryExamQuestionIds(examNo);

  return {
    id: `kpss-history-osym-${examNo}`,
    label: `Deneme ${examNo}`,
    title: `KPSS Tarih Denemesi ${examNo}`,
    description: "Genel Kültür içindeki Tarih bölümüne göre hazırlanmış 27 soruluk deneme.",
    durationMinutes: kpssExamReference.recommendedHistoryMinutes,
    questionIds,
    examType: "history-osym",
    mode: "ÖSYM formatı",
    historyQuestionCount: kpssExamReference.historyQuestions,
    fullExamQuestionCount: kpssExamReference.totalQuestions,
    fullExamMinutes: kpssExamReference.totalMinutes,
    sections: kpssGyGkSections,
    topicTitles: topics.map((topic) => topic.title)
  };
});

export function getKpssHistoryExamById(examId: string) {
  return kpssHistoryExams.find((exam) => exam.id === examId);
}

export function getKpssHistoryExamQuestions(examId: string): Question[] {
  const exam = getKpssHistoryExamById(examId);

  if (!exam) return [];

  const questionMap = new Map(expandedQuestions.map((question) => [question.id, question]));

  return exam.questionIds
    .map((questionId) => questionMap.get(questionId))
    .filter((question): question is Question => Boolean(question));
}

export function getHistoryExamTopicBreakdown(exam: KpssExamBlueprint) {
  const questions = getKpssHistoryExamQuestions(exam.id);
  const counts = new Map<string, number>();

  for (const question of questions) {
    const topic = topics.find((item) => item.id === question.topicId);
    const title = topic?.title ?? "Diğer";
    counts.set(title, (counts.get(title) ?? 0) + 1);
  }

  return Array.from(counts.entries()).map(([title, count]) => ({
    title,
    count
  }));
}
