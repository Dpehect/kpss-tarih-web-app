"use client";

import { useReducer } from "react";
import {
  flashcardFlipReducer,
  type FlashcardFlipEvent,
  type FlashcardFlipState
} from "@/features/flashcards/state-machines/flashcardFlipMachine";

export function useFlashcardFlip(initialState: FlashcardFlipState = "front") {
  const [state, dispatch] = useReducer(flashcardFlipReducer, initialState);

  const send = (event: FlashcardFlipEvent) => dispatch(event);

  return {
    state,
    isFront: state === "front",
    isBack: state === "back",
    isRating: state === "rating",
    flip: () => send({ type: "FLIP" }),
    showRating: () => send({ type: "SHOW_RATING" }),
    reset: () => send({ type: "RESET" })
  };
}
