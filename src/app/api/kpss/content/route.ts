import { NextResponse } from "next/server";
import {
  getQuestionBankOverviewFromSupabase,
  getSupabaseContentMode,
  getSupabaseExams,
  getSupabaseFlashcards,
  getSupabaseGlossary,
  getSupabaseQuestions,
  getSupabaseQuestionTests,
  getSupabaseTimelineEvents,
  getSupabaseTopics,
} from "@/lib/kpss/supabase-content";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") ?? "overview";

  if (kind === "topics") return NextResponse.json({ mode: getSupabaseContentMode(), data: await getSupabaseTopics() });
  if (kind === "questions") return NextResponse.json({ mode: getSupabaseContentMode(), data: await getSupabaseQuestions() });
  if (kind === "tests") return NextResponse.json({ mode: getSupabaseContentMode(), data: await getSupabaseQuestionTests() });
  if (kind === "exams") return NextResponse.json({ mode: getSupabaseContentMode(), data: await getSupabaseExams() });
  if (kind === "flashcards") return NextResponse.json({ mode: getSupabaseContentMode(), data: await getSupabaseFlashcards() });
  if (kind === "timeline") return NextResponse.json({ mode: getSupabaseContentMode(), data: await getSupabaseTimelineEvents() });
  if (kind === "glossary") return NextResponse.json({ mode: getSupabaseContentMode(), data: await getSupabaseGlossary() });

  return NextResponse.json({ mode: getSupabaseContentMode(), data: await getQuestionBankOverviewFromSupabase() });
}
