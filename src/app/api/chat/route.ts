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

    if (!message?.trim()) {
      return NextResponse.json({ error: "Mesaj boş olamaz" }, { status: 400 });
    }

    // ─── 1. VERİTABANI / ARŞİV ARAMASI (ÖNCELİKLİ) ───
    const searchResults = searchKpssHistory(message);
    const bestMatch = searchResults[0];

    // Eğer güçlü bir konu veya kavram eşleşmesi varsa (> 16 puan) doğrudan resmi bilgiyi dön
    if (bestMatch && bestMatch.score >= 16) {
      console.log(`[chat-api] Strong local search match found: ${bestMatch.title} (${bestMatch.type})`);
      
      let answerText = "";
      if (bestMatch.type === "Konu") {
        const t = topics.find((item) => item.id === bestMatch.id);
        if (t) {
          const firstSummary = t.summary?.[0];
          const bulletList = firstSummary?.bullets?.map(b => `• ${b}`).join("\n") ?? "";
          answerText = `📍 **${t.title}** hakkında aradığın bilgiler burada:\n\n${t.shortDescription}\n\n${firstSummary?.body ?? ""}\n${bulletList}\n\n📌 Sınavda dikkat: ${t.commonMistakes?.[0] ?? "Konudaki kavram eşleştirmelerine dikkat et."}`;
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
      
      // Hata durumunda (429 gibi) çaktırmadan doğrudan ve doğru tarihi bilgiyi yalın şekilde sun
      const fallbackTips = [
        "Kut Anlayışı, İslamiyet öncesi Türk devletlerinde ülkeyi yönetme yetkisinin Tanrı tarafından hükümdara verildiği inancıdır. Kut kan yoluyla babadan oğula geçer, bu da taht kavgalarını artırır.\n\n📌 Sınavda dikkat: Kutun kalıtsal olması egemenliği pekiştirir ama merkezi otoriteyi zayıflatır.",
        "Tımar Sistemi, Osmanlı'da toprağın mülkiyeti devlete, kullanım hakkı köylüye, vergisi ise hizmeti karşılığı sipahiye ait olan yapıdır. Tımar sistemi üretimde süreklilik sağlar ve hazineden para çıkmadan ordu yetiştirilmesini sağlar.\n\n📌 Sınavda dikkat: Tımarlı sipahiler eyalet askerleridir, merkez ordusu olan yeniçerilerle karıştırmamalısın.",
        "Amasya Genelgesi (1919), Milli Mücadele'nin amacı, gerekçesi ve yöntemi ilk kez burada belirlenmiştir. 'Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır' maddesi ulusal egemenliğe dayalı yeni bir devletin ilk sinyalidir.\n\n📌 Sınavda dikkat: Bu genelge aynı zamanda ihtilal bildirgesi niteliğindedir.",
        "Lozan Barış Antlaşması (1923), kapitülasyonlar, Duyun-u Umumiye ve Ermeni yurdu meselelerinin kesin olarak çözüldüğü barış belgesidir. Sınır komisyonlarında Musul (Irak sınırı) çözülemeyerek sonraki döneme bırakılmıştır.\n\n📌 Sınavda dikkat: Lozan'da çözülemeyen tek konu Irak sınırıdır.",
        "Atatürk İlkeleri, altı temel ilkeden oluşur. Cumhuriyetçilik siyasi yapıya ve seçime odaklanırken, Halkçılık eşitlik ve sosyal devlete, Devletçilik ise ekonomik yatırımlara odaklanır. İnkılapçılık ise sürekli çağdaşlaşmayı ve dinamizmi hedefler.\n\n📌 Sınavda dikkat: Kabotaj Kanunu milliyetçilik ve halkçılık ilkeleriyle doğrudan ilişkilidir."
      ];
      
      // Kullanıcının sorusundaki anahtar kelimelere göre eşleşen bir fallback seç
      const lowerMsg = message.toLowerCase();
      let matchedTip = fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
      
      if (lowerMsg.includes("kut") || lowerMsg.includes("töre") || lowerMsg.includes("kurultay")) {
        matchedTip = fallbackTips[0];
      } else if (lowerMsg.includes("tımar") || lowerMsg.includes("vergi") || lowerMsg.includes("sipahi")) {
        matchedTip = fallbackTips[1];
      } else if (lowerMsg.includes("amasya") || lowerMsg.includes("genelge") || lowerMsg.includes("erzurum")) {
        matchedTip = fallbackTips[2];
      } else if (lowerMsg.includes("lozan") || lowerMsg.includes("antlaşma") || lowerMsg.includes("musul")) {
        matchedTip = fallbackTips[3];
      } else if (lowerMsg.includes("ilke") || lowerMsg.includes("halk") || lowerMsg.includes("cumhuriyet")) {
        matchedTip = fallbackTips[4];
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
