import { NextRequest, NextResponse } from "next/server";
import { answerKpssTutor, type KpssTutorAnswer } from "@/lib/ai/kpss-tutor";

export async function handleKpssTutorPost(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message : "";

    const localAnswer = await answerKpssTutor(message);
    return NextResponse.json(localAnswer);
  } catch {
    const reply = "Şu an cevabı hazırlarken kısa bir aksaklık yaşadım. Sorunu aynı şekilde tekrar gönder; doğrudan KPSS odaklı yanıtlayacağım.";
    return NextResponse.json({ reply, answer: reply, sourceMode: "local-teacher", sources: [] }, { status: 200 });
  }
}

export function handleKpssTutorGet() {
  return NextResponse.json({ ok: true, service: "kpss-tarih-rehberi", mode: "knowledge-first" });
}
