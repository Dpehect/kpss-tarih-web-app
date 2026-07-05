"use client";

import { create } from "zustand";

/**
 * Global UI state.
 * Faz 2'de sidebar, command menu ve mobil navigasyon state'i burada genişletilecek.
 */
type UIState = {
  isNavigationOpen: boolean;
  setNavigationOpen: (value: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isNavigationOpen: false,
  setNavigationOpen: (value) => set({ isNavigationOpen: value })
}));
