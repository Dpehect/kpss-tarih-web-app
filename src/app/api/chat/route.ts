import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `Sen KPSS Tarih ve Genel Tarih alanında uzman bir akademisyen ve yapay zeka asistanısın.

GÖREVİN VE YANIT KURALLARIN:
1. Kullanıcının sorduğu tarihi kavramları, olayları, antlaşmaları, kişileri ve kurumları en ince detayına kadar akademik düzeyde, doğru ve eksiksiz açıkla.
2. Yanıtlarında herhangi bir cümle veya uzunluk sınırı yoktur; bilgiyi tam, doyurucu ve anlaşılır şekilde sun.
3. KPSS sınavına hazırlanan öğrenciler için kritik olan bilgileri, kronolojiyi, neden-sonuç ilişkilerini ve ÖSYM'nin en çok sorduğu noktaları mutlaka vurgula.
4. Karıştırılabilecek benzer kavramları (örneğin Tımar ile İkta, Tanzimat ile Islahat) karşılaştırmalı olarak ayırt et.
5. Kullanıcı genel tarih, kültür veya dünya tarihi hakkında soru sorduğunda da engel koymadan, kapsam dışı demeden en doğru ve detaylı yanıtı üret.
6. Yanıtlarının sonuna mutlaka "📌 Sınavda dikkat:" başlığıyla KPSS sınavında karşılaşılabilecek tuzakları ve altın ipuçlarını ekle.
7. Eğer aşağıda sana bir [Referans Bilgi] verilmişse, öncelikle bu bilgiye sadık kalarak yanıtını zenginleştir ve doğru kaynakları kullan.`;

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

    // ─── 1. VERİTABANI / ARŞİV ARAMASI (BAĞLAM/CONTEXT İÇİN) ───
    const searchResults = searchKpssHistory(message);
    const bestMatch = searchResults[0];

    let localContext = "";
    let deepLink = "";
    let fallbackText = "";

    // En iyi 3 eşleşmeyi toplayarak zengin bir yerel bağlam (localContext) oluşturalım
    const validMatches = searchResults.filter(match => match.score >= 10).slice(0, 3);

    if (validMatches.length > 0) {
      console.log(`[chat-api] Found ${validMatches.length} valid matches for context (threshold >= 10)`);
      const contextBlocks: string[] = [];

      // İlk/en iyi eşleşmeye göre deepLink ve fallbackText hazırlayalım
      const primaryMatch = validMatches[0];
      
      for (const match of validMatches) {
        if (match.type === "Konu") {
          const t = topics.find((item) => item.id === match.id);
          if (t) {
            // Konunun tüm summary başlıklarını ve maddelerini birleştirelim!
            const fullSummaryText = t.summary?.map(s => {
              const bulletsText = s.bullets?.map(b => `• ${b}`).join("\n") ?? "";
              return `Başlık: ${s.heading}\nAçıklama: ${s.body}\nDetaylar:\n${bulletsText}`;
            }).join("\n\n") ?? "";

            contextBlocks.push(`[KONU REHBERİ: ${t.title}]\nKazanım Açıklaması: ${t.shortDescription}\n\n${fullSummaryText}\n\n📌 Mutlaka Bilinmeli: ${t.mustKnow?.join(", ") ?? ""}\nSık Yapılan Hatalar: ${t.commonMistakes?.join(", ") ?? ""}`);
            
            if (match.id === primaryMatch.id) {
              deepLink = `\n\n🔗 **Bu konuyu daha detaylı çalışmak ister misin?**\n[👉 ${t.title} Konusuna Git](/topics/${t.slug})`;
              const firstSummary = t.summary?.[0];
              const bulletList = firstSummary?.bullets?.map(b => `• ${b}`).join("\n") ?? "";
              fallbackText = `📍 **${t.title}** hakkında aradığın bilgiler burada:\n\n${t.shortDescription}\n\n${firstSummary?.body ?? ""}\n${bulletList}\n\n📌 Sınavda dikkat: ${t.commonMistakes?.[0] ?? "Konudaki kavram eşleştirmelerine dikkat et."}${deepLink}`;
            }
          }
        } else if (match.type === "Flashcard") {
          const card = flashcards.find((item) => item.id === match.id);
          if (card) {
            contextBlocks.push(`[FLASHCARD KAVRAMI: ${card.front}]\nTanım/Açıklama: ${card.back}\nSınav İpucu: ${card.hint}`);
            
            if (match.id === primaryMatch.id) {
              fallbackText = `💡 **${card.front}** kavramının açıklaması:\n\n${card.back}\n\n📌 İpucu: ${card.hint}`;
            }
          }
        } else if (match.type === "Kavram") {
          const term = glossary.find((item) => item.id === match.id);
          if (term) {
            contextBlocks.push(`[SÖZLÜK TERİMİ: ${term.term}]\nTanım: ${term.definition}\nNeden Önemli: ${term.whyImportant}`);
            
            if (match.id === primaryMatch.id) {
              fallbackText = `📖 **${term.term}** teriminin sözlük anlamı:\n\n${term.definition}\n\n📌 Neden Önemli: ${term.whyImportant}`;
            }
          }
        }
      }

      localContext = contextBlocks.join("\n\n" + "=".repeat(40) + "\n\n");
    }

    // ─── 2. YAPAY ZEKA DEVREYE GİRİYOR ───
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY veya GOOGLE_API_KEY ayarlanmamış. .env.local dosyasına ekleyin." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro", // Zengin ve derinlemesine yanıtlar için PRO modeli ana model yapıldı!
      systemInstruction: SYSTEM_PROMPT,
    });

    // Konuşma geçmişini Gemini formatına çevir
    const chatHistory = (history ?? []).map((msg: { role: string; text: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Eğer yerel bağlam varsa promptu zenginleştir
    const userPrompt = localContext
      ? `Aşağıda sana verilen [Referans Bilgi]'ye sadık kalarak, kullanıcının [Kullanıcı Sorusu]'ndaki sorusunu nokta atışı, doğru ve sınav odaklı yanıtla. Gereksiz veya alakasız detaylara girme, sadece doğrudan soruyu cevapla.
      
[Referans Bilgi]:
${localContext}

[Kullanıcı Sorusu]:
${message}`
      : message;

    let text = "";
    try {
      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(userPrompt);
      text = result.response.text();

      // Eğer bir konu yönlendirme linki varsa ve Gemini yanıtı bu linki barındırmıyorsa sonuna ekle
      if (deepLink && !text.includes("/topics/")) {
        text = `${text.trim()}${deepLink}`;
      }
    } catch (apiError: any) {
      console.warn("[chat-api] Primary model gemini-1.5-pro failed, trying backup gemini-1.5-flash...", apiError.message || apiError);
      
      try {
        const backupModel = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: SYSTEM_PROMPT,
        });
        const backupChat = backupModel.startChat({ history: chatHistory });
        const backupResult = await backupChat.sendMessage(userPrompt);
        text = backupResult.response.text();
        
        if (deepLink && !text.includes("/topics/")) {
          text = `${text.trim()}${deepLink}`;
        }
      } catch (backupError: any) {
        console.error("[chat-api] All Gemini models failed, falling back to local database helper...", backupError.message || backupError);
        
        // Hata durumunda (429/404 gibi) arama sonucunu (bestMatch) kullan.
        let matchedTip = fallbackText;
        if (!matchedTip && bestMatch && bestMatch.score > 0) {
          if (bestMatch.type === "Konu") {
            const t = topics.find((item) => item.id === bestMatch.id);
            if (t) {
              const firstSummary = t.summary?.[0];
              const bulletList = firstSummary?.bullets?.map(b => `• ${b}`).join("\n") ?? "";
              matchedTip = `📍 **${t.title}** hakkında aradığın bilgiler burada:\n\n${t.shortDescription}\n\n${firstSummary?.body ?? ""}\n${bulletList}\n\n📌 Sınavda dikkat: ${t.commonMistakes?.[0] ?? "Konudaki kavram eşleştirmelerine dikkat et."}\n\n🔗 **Bu konuyu daha detaylı çalışmak ister misin?**\n[👉 ${t.title} Konusuna Git](/topics/${t.slug})`;
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
        
        if (!matchedTip) {
          matchedTip = "Sorduğun soruya dair doğrudan bir eşleşme bulamadım, ancak KPSS Tarih sınavında en sık sorulan başlıklardan biri olan **Osmanlı Kuruluş Dönemi** hakkında şunları bilmelisin:\n\nOsmanlı Devleti, 1299 yılında Osman Bey tarafından Söğüt ve Domaniç çevresinde kurulmuştur. Bizans sınırındaki jeopolitik konumu (uç beyliği) ve gaza ideolojisi sayesinde kısa sürede büyümüştür.\n\n📌 Sınavda dikkat: Osmanlı'nın büyümesinde iskan ve istimalet (hoşgörü) politikaları en belirleyici unsurlardır.";
        }
        
        text = matchedTip;
      }
    }

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[chat-api]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
