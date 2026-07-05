"use client";

import { create } from "zustand";
import type { UserAttempt } from "@/types/study";

type StudySessionState = {
  sessionAttempts: UserAttempt[];
  activeTopicId?: string;
  addAttempt: (attempt: UserAttempt) => void;
  setActiveTopic: (topicId: string) => void;
  resetSession: () => void;
};

export const useStudySessionStore = create<StudySessionState>((set) => ({
  sessionAttempts: [],
  activeTopicId: undefined,
  addAttempt: (attempt) =>
    set((state) => ({
      sessionAttempts: [...state.sessionAttempts, attempt]
    })),
  setActiveTopic: (topicId) => set({ activeTopicId: topicId }),
  resetSession: () => set({ sessionAttempts: [], activeTopicId: undefined })
}));
