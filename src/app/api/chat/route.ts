import { NextRequest, NextResponse } from "next/server";
import { answerKpssQuestion, type KpssTutorHistoryItem } from "@/lib/ai/kpss-tutor";

export const runtime = "nodejs";

type ChatPayload = {
  message?: unknown;
  prompt?: unknown;
  question?: unknown;
  history?: KpssTutorHistoryItem[];
};

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json().catch(() => ({}))) as ChatPayload;
    const message = String(payload.message ?? payload.prompt ?? payload.question ?? "").trim();

    if (!message) {
      return NextResponse.json(
        { error: "Mesaj boş olamaz. Lütfen KPSS Tarih ile ilgili bir soru yaz." },
        { status: 400 }
      );
    }

    const answer = await answerKpssQuestion(message, {
      history: Array.isArray(payload.history) ? payload.history : [],
    });

    return NextResponse.json({
      reply: answer.reply,
      source: answer.source,
      confidence: answer.confidence,
      matchedTitle: answer.matchedTitle ?? null,
    });
  } catch (error) {
    console.error("[kpss-tutor-api]", error);
    return NextResponse.json(
      { error: "Asistan cevabı hazırlanırken beklenmeyen bir hata oluştu." },
      { status: 500 }
    );
  }
}
