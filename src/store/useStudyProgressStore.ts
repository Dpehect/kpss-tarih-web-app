"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  ExamResult,
  FlashcardReview,
  QuestionAttempt,
  StudyNote
} from "@/types/study";
import type { RemoteProgressPayload } from "@/lib/progress/online-progress";

type StudyProgressState = {
  completedTopicIds: string[];
  questionAttempts: QuestionAttempt[];
  flashcardReviews: FlashcardReview[];
  examResults: ExamResult[];
  notes: StudyNote[];
  hasHydratedFromRemote: boolean;
  markTopicComplete: (topicId: string) => void;
  recordQuestionAttempt: (attempt: Omit<QuestionAttempt, "id" | "answeredAt">) => string;
  recordFlashcardReview: (review: Omit<FlashcardReview, "id" | "reviewedAt">) => string;
  recordExamResult: (result: Omit<ExamResult, "id" | "completedAt">) => string;
  addNote: (note: Omit<StudyNote, "id" | "createdAt">) => string;
  addNoteWithId: (note: StudyNote) => void;
  deleteNote: (id: string) => void;
  hydrateFromRemote: (payload: RemoteProgressPayload) => void;
  getSnapshot: () => RemoteProgressPayload;
  resetProgress: () => void;
};

const initialState = {
  completedTopicIds: [],
  questionAttempts: [],
  flashcardReviews: [],
  examResults: [],
  notes: [],
  hasHydratedFromRemote: false
};

export const useStudyProgressStore = create<StudyProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,
      markTopicComplete: (topicId) =>
        set((state) => ({
          completedTopicIds: state.completedTopicIds.includes(topicId)
            ? state.completedTopicIds
            : [...state.completedTopicIds, topicId]
        })),
      recordQuestionAttempt: (attempt) => {
        const id = crypto.randomUUID();

        set((state) => ({
          questionAttempts: [
            ...state.questionAttempts,
            {
              ...attempt,
              id,
              answeredAt: new Date().toISOString()
            }
          ]
        }));

        return id;
      },
      recordFlashcardReview: (review) => {
        const id = crypto.randomUUID();

        set((state) => ({
          flashcardReviews: [
            ...state.flashcardReviews,
            {
              ...review,
              id,
              reviewedAt: new Date().toISOString()
            }
          ]
        }));

        return id;
      },
      recordExamResult: (result) => {
        const id = crypto.randomUUID();

        set((state) => ({
          examResults: [
            ...state.examResults,
            {
              ...result,
              id,
              completedAt: new Date().toISOString()
            }
          ]
        }));

        return id;
      },
      addNote: (note) => {
        const id = crypto.randomUUID();

        set((state) => ({
          notes: [
            {
              ...note,
              id,
              createdAt: new Date().toISOString()
            },
            ...state.notes
          ]
        }));

        return id;
      },
      addNoteWithId: (note) =>
        set((state) => ({
          notes: [note, ...state.notes.filter((item) => item.id !== note.id)]
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id)
        })),
      hydrateFromRemote: (payload) =>
        set({
          completedTopicIds: payload.completedTopicIds,
          questionAttempts: payload.questionAttempts,
          flashcardReviews: payload.flashcardReviews,
          examResults: payload.examResults,
          notes: payload.notes,
          hasHydratedFromRemote: true
        }),
      getSnapshot: () => {
        const state = get();

        return {
          completedTopicIds: state.completedTopicIds,
          questionAttempts: state.questionAttempts,
          flashcardReviews: state.flashcardReviews,
          examResults: state.examResults,
          notes: state.notes
        };
      },
      resetProgress: () => set(initialState)
    }),
    {
      name: "kpss-tarih-progress",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
