import { NextRequest, NextResponse } from "next/server";
import { answerKpssTutor } from "@/lib/ai/kpss-tutor";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, service: "kpss-tarih-retrieval-first-tutor" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message : "";
    const result = answerKpssTutor(message);

    return NextResponse.json({
      reply: result.reply,
      answer: result.answer,
      sourceMode: result.sourceMode,
      sources: result.sources,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bilinmeyen hata";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
