import type { Metadata } from "next";
import { FlashcardsPage } from "@/features/flashcards/components/FlashcardsPage";

export const metadata: Metadata = {
  title: "Flashcards",
  description: "KPSS Tarih flashcard tekrarları."
};

export default async function FlashcardsRoute() {
  return <FlashcardsPage />;
}
