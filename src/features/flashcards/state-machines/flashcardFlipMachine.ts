export type FlashcardFlipState = "front" | "back" | "rating";

export type FlashcardFlipEvent =
  | { type: "FLIP" }
  | { type: "SHOW_RATING" }
  | { type: "RESET" };

export function flashcardFlipReducer(
  state: FlashcardFlipState,
  event: FlashcardFlipEvent
): FlashcardFlipState {
  switch (event.type) {
    case "FLIP":
      return state === "front" ? "back" : "front";
    case "SHOW_RATING":
      return "rating";
    case "RESET":
      return "front";
    default:
      return state;
  }
}
