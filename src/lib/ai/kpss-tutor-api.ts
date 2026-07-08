import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { answerKpssTutor, type TutorAnswer } from "@/lib/ai/kpss-tutor";

const MODEL_SYSTEM_PROMPT = `Sen KPSS Tarih alanında uzman, güvenilir ve net cevap veren bir öğretmensin.
Kurallar:
- Türkçe cevap ver.
- Cevabı doğrudan ver; gereksiz özür, sistem detayı, API anahtarı, model durumu veya teknik açıklama yazma.
- Emin olmadığın noktada uydurma yapma; kısa bir netleştirme sorusu sor.
- KPSS için dönem, kişi, olay, sonuç ve sınav tuzağı ilişkisini mutlaka açıkla.
- Son bölümde "Sınavda dikkat:" başlığı kullan.`;

function buildModelPrompt(message: string) {
  return `Kullanıcı sorusu: ${message}\n\nBu soruyu KPSS Tarih öğrencisine uygun şekilde doğru, anlaşılır ve sınav odaklı cevapla.`;
}

async function modelFallback(message: string): Promise<TutorAnswer | null> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: MODEL_SYSTEM_PROMPT });
    const result = await model.generateContent(buildModelPrompt(message));
    const text = result.response.text()?.trim();
    if (!text) return null;

    return {
      reply: text,
      answer: text,
      sourceMode: "model-fallback",
      sources: [{ type: "Model", title: "KPSS Tarih açıklaması" }],
    };
  } catch {
    return null;
  }
}

export async function handleKpssTutorPost(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message : "";

    const localAnswer = answerKpssTutor(message);
    if (localAnswer.sourceMode !== "safe-fallback" || message.trim().length < 3) {
      return NextResponse.json(localAnswer);
    }

    const modelAnswer = await modelFallback(message);
    return NextResponse.json(modelAnswer ?? localAnswer);
  } catch {
    const reply = "Şu an cevabı hazırlarken kısa bir aksaklık yaşadım. Sorunu aynı şekilde tekrar gönder; doğrudan KPSS odaklı yanıtlayacağım.";
    return NextResponse.json({ reply, answer: reply, sourceMode: "safe-fallback", sources: [] }, { status: 200 });
  }
}

export function handleKpssTutorGet() {
  return NextResponse.json({ ok: true, service: "kpss-tarih-rehberi", mode: "knowledge-first" });
}
