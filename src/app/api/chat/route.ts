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

import { searchKpssHistory } from "@/lib/search/global-search";
import { topics, flashcards, glossary } from "@/data/kpss-history";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const lowerMsg = message.toLowerCase().trim();
    
    // ─── 0. GREETING (SELAMLAŞMA) KONTROLÜ ───
    const isGreeting = ["selam", "merhaba", "slm", "günaydın", "merhabalar", "hey", "mrb", "iyi günler", "iyi çalışmalar"].some(greet => lowerMsg.startsWith(greet) || lowerMsg === greet);
    if (isGreeting) {
      return NextResponse.json({ reply: "Merhaba! Ben KPSS Tarih yapay zeka asistanın. KPSS Tarih müfredatına dair konuları, kavramları veya kronolojik bilgileri sorabilirsin. Sana nasıl yardımcı olabilirim? 🎯" });
    }

    // ─── 1. VERİTABANI / ARŞİV ARAMASI (ÖNCELİKLİ) ───
    const searchResults = searchKpssHistory(message);
    const bestMatch = searchResults[0];

    // Eğer güçlü bir konu veya kavram eşleşmesi varsa (> 12 puan) doğrudan resmi bilgiyi dön
    if (bestMatch && bestMatch.score >= 12) {
      console.log(`[chat-api] Strong local search match found: ${bestMatch.title} (${bestMatch.type})`);
      
      let answerText = "";
      if (bestMatch.type === "Konu") {
        const t = topics.find((item) => item.id === bestMatch.id);
        if (t) {
          const firstSummary = t.summary?.[0];
          const bulletList = firstSummary?.bullets?.map(b => `• ${b}`).join("\n") ?? "";
          answerText = `📍 **${t.title}** hakkında aradığın bilgiler burada:\n\n${t.shortDescription}\n\n${firstSummary?.body ?? ""}\n${bulletList}\n\n📌 Sınavda dikkat: ${t.commonMistakes?.[0] ?? "Konudaki kavram eşleştirmelerine dikkat et."}\n\n🔗 **Bu konuyu daha detaylı çalışmak ister misin?**\n[👉 Konu Akademisi'nde Çalışmaya Başla](/topics)`;
        }
      } else if (bestMatch.type === "Flashcard") {
        const card = flashcards.find((item) => item.id === bestMatch.id);
        if (card) {
          answerText = `💡 **${card.front}** kavramının açıklaması:\n\n${card.back}\n\n📌 İpucu: ${card.hint}`;
        }
      } else if (bestMatch.type === "Kavram") {
        const term = glossary.find((item) => item.id === bestMatch.id);
        if (term) {
          answerText = `📖 **${term.term}** teriminin sözlük anlamı:\n\n${term.definition}\n\n📌 Neden Önemli: ${term.whyImportant}`;
        }
      }

      if (answerText) {
        return NextResponse.json({ reply: answerText });
      }
    }

    // ─── 2. YAPAY ZEKA DEVREYE GİRİYOR ───
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY ayarlanmamış. .env.local dosyasına GEMINI_API_KEY ekleyin." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-8b",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Konuşma geçmişini Gemini formatına çevir
    const chatHistory = (history ?? []).map((msg: { role: string; text: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    let text = "";
    try {
      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(message);
      text = result.response.text();
    } catch (apiError: any) {
      console.warn("[chat-api] Gemini API error, falling back to local database helper...", apiError.message || apiError);
      
      // Hata durumunda (429 gibi) arama sonucunu (bestMatch) kullan. Skor 12'den düşük olsa bile en yüksek olanı sun.
      let matchedTip = "";
      if (bestMatch && bestMatch.score > 0) {
        if (bestMatch.type === "Konu") {
          const t = topics.find((item) => item.id === bestMatch.id);
          if (t) {
            const firstSummary = t.summary?.[0];
            const bulletList = firstSummary?.bullets?.map(b => `• ${b}`).join("\n") ?? "";
            matchedTip = `📍 **${t.title}** hakkında aradığın bilgiler burada:\n\n${t.shortDescription}\n\n${firstSummary?.body ?? ""}\n${bulletList}\n\n📌 Sınavda dikkat: ${t.commonMistakes?.[0] ?? "Konudaki kavram eşleştirmelerine dikkat et."}\n\n🔗 **Bu konuyu daha detaylı çalışmak ister misin?**\n[👉 Konu Akademisi'nde Çalışmaya Başla](/topics)`;
          }
        } else if (bestMatch.type === "Flashcard") {
          const card = flashcards.find((item) => item.id === bestMatch.id);
          if (card) {
            matchedTip = `💡 **${card.front}** kavramının açıklaması:\n\n${card.back}\n\n📌 İpucu: ${card.hint}`;
          }
        } else if (bestMatch.type === "Kavram") {
          const term = glossary.find((item) => item.id === bestMatch.id);
          if (term) {
            matchedTip = `📖 **${term.term}** teriminin sözlük anlamı:\n\n${term.definition}\n\n📌 Neden Önemli: ${term.whyImportant}`;
          }
        }
      }
      
      // Eğer arama sonucu tamamen boşsa, genel ve kaliteli bir KPSS Tarih başlangıç rehberi sun
      if (!matchedTip) {
        matchedTip = "Sorduğun soruya dair doğrudan bir eşleşme bulamadım, ancak KPSS Tarih sınavında en sık sorulan başlıklardan biri olan **Osmanlı Kuruluş Dönemi** hakkında şunları bilmelisin:\n\nOsmanlı Devleti, 1299 yılında Osman Bey tarafından Söğüt ve Domaniç çevresinde kurulmuştur. Bizans sınırındaki jeopolitik konumu (uç beyliği) ve gaza ideolojisi sayesinde kısa sürede büyümüştür.\n\n📌 Sınavda dikkat: Osmanlı'nın büyümesinde iskan ve istimalet (hoşgörü) politikaları en belirleyici unsurlardır.";
      }
      
      text = matchedTip;
    }

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[chat-api]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
