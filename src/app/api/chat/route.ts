import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `Sen bir KPSS Tarih uzmanı yapay zeka asistanısın. Türkiye'de devlet memurluğu sınavına hazırlanan öğrencilere yardım ediyorsun.

GÖREVIN:
- KPSS Tarih konularında sorulan soruları doğru, net ve anlaşılır şekilde yanıtlamak
- Konuları sınav odaklı anlatmak: hangi bilgiler kritik, neleri ezberlemeli
- Sınavda sık sorulan konuları vurgulamak
- Karıştırılan kavramları açık biçimde ayırt etmek
- Mümkün olduğunda örnekle pekiştirmek

KPSS TARİH KONU BAŞLIKLARI:
1. İslamiyet Öncesi Türk Tarihi (kut, töre, kurultay, ikili teşkilat, Orhun Yazıtları)
2. Türk-İslam Tarihi (Karahanlılar, Gazneliler, Büyük Selçuklu, Nizamiye, Malazgirt)
3. Anadolu Selçuklu ve Beylikler (kervansaray, ahilik, Kösedağ, Osmanlı'nın yükselişi)
4. Osmanlı Kuruluş ve Yükseliş (İstanbul'un fethi, devşirme, tımar sistemi, halifelik)
5. Osmanlı Kültür ve Medeniyet (Divan-ı Hümayun, millet sistemi, vakıf, Enderun)
6. Osmanlı Yenileşme (Lale Devri, Tanzimat, Islahat, Meşrutiyet)
7. Milli Mücadele Hazırlık (Mondros, Amasya, Erzurum, Sivas, Misakımilli)
8. Kurtuluş Savaşı ve Antlaşmalar (İnönü, Sakarya, Büyük Taarruz, Mudanya, Lozan)
9. Atatürk İlke ve İnkılapları (altı ok, saltanat, halifelik, Tevhid-i Tedrisat, devletçilik)
10. Cumhuriyet Dönemi Dış Politika (Montrö, Balkan Antantı, Sadabat, Hatay, II. Dünya Savaşı)
11. Çağdaş Türk ve Dünya Tarihi (NATO, BM, Kıbrıs, Soğuk Savaş)

YANIT KURALLARI:
- Türkçe yanıt ver, sade ve anlaşılır dil kullan
- Önemli tarihleri, isimleri ve kavramları belirt
- KPSS sınavında karıştırılan noktalara dikkat çek
- Yanıtın sonunda "📌 Sınavda dikkat:" başlığıyla kritik hatırlatma ekle
- Yanıtı 3-6 cümle uzunluğunda tut; çok uzun olmasın
- Konuyla ilgili olmayan sorulara nazikçe "Bu soru KPSS Tarih kapsamı dışında, yalnızca tarih konularında yardımcı olabiliyorum." de`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Mesaj boş olamaz" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY ayarlanmamış. .env.local dosyasına GEMINI_API_KEY ekleyin." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Konuşma geçmişini Gemini formatına çevir
    const chatHistory = (history ?? []).map((msg: { role: string; text: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[chat-api]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
