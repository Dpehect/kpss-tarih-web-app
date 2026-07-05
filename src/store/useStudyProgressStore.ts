"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ExamResult, FlashcardReview, QuestionAttempt, StudyNote } from "@/types/study";

/**
 * Kullanıcının çalışma ilerlemesini localStorage'da saklayan final faz store'u.
 * Backend olmadan da uygulama tek başına kullanılabilir.
 */
type StudyProgressState = {
  completedTopicIds: string[];
  questionAttempts: QuestionAttempt[];
  flashcardReviews: FlashcardReview[];
  examResults: ExamResult[];
  notes: StudyNote[];
  markTopicComplete: (topicId: string) => void;
  recordQuestionAttempt: (attempt: Omit<QuestionAttempt, "id" | "answeredAt">) => void;
  recordFlashcardReview: (review: Omit<FlashcardReview, "id" | "reviewedAt">) => void;
  recordExamResult: (result: Omit<ExamResult, "id" | "completedAt">) => void;
  addNote: (note: Omit<StudyNote, "id" | "createdAt">) => void;
  deleteNote: (id: string) => void;
  resetProgress: () => void;
};

const initialState = {
  completedTopicIds: [],
  questionAttempts: [],
  flashcardReviews: [],
  examResults: [],
  notes: []
};

export const useStudyProgressStore = create<StudyProgressState>()(
  persist(
    (set) => ({
      ...initialState,
      markTopicComplete: (topicId) =>
        set((state) => ({
          completedTopicIds: state.completedTopicIds.includes(topicId)
            ? state.completedTopicIds
            : [...state.completedTopicIds, topicId]
        })),
      recordQuestionAttempt: (attempt) =>
        set((state) => ({
          questionAttempts: [
            ...state.questionAttempts,
            {
              ...attempt,
              id: crypto.randomUUID(),
              answeredAt: new Date().toISOString()
            }
          ]
        })),
      recordFlashcardReview: (review) =>
        set((state) => ({
          flashcardReviews: [
            ...state.flashcardReviews,
            {
              ...review,
              id: crypto.randomUUID(),
              reviewedAt: new Date().toISOString()
            }
          ]
        })),
      recordExamResult: (result) =>
        set((state) => ({
          examResults: [
            ...state.examResults,
            {
              ...result,
              id: crypto.randomUUID(),
              completedAt: new Date().toISOString()
            }
          ]
        })),
      addNote: (note) =>
        set((state) => ({
          notes: [
            {
              ...note,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString()
            },
            ...state.notes
          ]
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id)
        })),
      resetProgress: () => set(initialState)
    }),
    {
      name: "kpss-tarih-progress",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
