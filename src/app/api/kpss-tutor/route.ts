import { NextRequest, NextResponse } from "next/server";
import { answerKpssQuestion, type KpssTutorHistoryItem } from "@/lib/ai/kpss-tutor";

export const runtime = "nodejs";

type ChatPayload = {
  message?: unknown;
  prompt?: unknown;
  question?: unknown;
  history?: KpssTutorHistoryItem[];
};

export async function GET() {
  return NextResponse.json({ ok: true, service: "softbridge-kpss-tarih-llm-tutor" });
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json().catch(() => ({}))) as ChatPayload;
    const message = String(payload.message ?? payload.prompt ?? payload.question ?? "").trim();

    const answer = await answerKpssQuestion(message, {
      history: Array.isArray(payload.history) ? payload.history : [],
    });

    return NextResponse.json({
      reply: answer.reply,
      answer: answer.answer,
      source: answer.source,
      sourceMode: answer.sourceMode,
      confidence: answer.confidence,
      matchedTitle: answer.matchedTitle ?? null,
      sources: answer.sources,
    });
  } catch (error) {
    console.error("[softbridge-kpss-tutor]", error);

    return NextResponse.json({
      reply:
        "Şu an kısa bir bağlantı gecikmesi var. Sorunu tekrar gönder; KPSS Tarih açısından net cevap, kısa açıklama ve sınav ipucuyla yanıtlayayım.",
      source: "local-teacher",
      sourceMode: "local-teacher",
      confidence: 0.3,
      sources: [],
    });
  }
}
