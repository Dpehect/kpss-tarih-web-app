const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// .env.local dosyasından API anahtarını yükle
const envPath = path.join(process.cwd(), ".env.local");
let apiKey = "";
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const match = envContent.match(/GEMINI_API_KEY=(.*)/);
  if (match) {
    apiKey = match[1].replace(/\r/g, "").trim();
  }
}

if (!apiKey) {
  console.error("HATA: GEMINI_API_KEY .env.local dosyasında bulunamadı.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
// restore gemini-1.5-flash-8b which is active and valid for the api key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

const topics = [
  { id: "t1", name: "İslamiyet Öncesi Türk Tarihi" },
  { id: "t2", name: "Türk-İslam Tarihi" },
  { id: "t3", name: "Anadolu Selçuklu ve Beylikler" },
  { id: "t4", name: "Osmanlı Kuruluş ve Yükseliş" },
  { id: "t5", name: "Osmanlı Kültür ve Medeniyet" },
  { id: "t6", name: "Osmanlı Yenileşme ve Demokratikleşme" },
  { id: "t7", name: "Milli Mücadele Hazırlık Dönemi" },
  { id: "t8", name: "Kurtuluş Savaşı ve Antlaşmalar" },
  { id: "t9", name: "Atatürk İlkeleri ve İnkılaplar" },
  { id: "t10", name: "Cumhuriyet Dönemi Dış Politika" },
  { id: "t11", name: "Çağdaş Türk ve Dünya Tarihi" },
  { id: "t12", name: "Genel Tarih Kronolojisi" }
];

async function generateCardsForTopic(topic) {
  const prompt = `Sen bir KPSS Tarih öğretmenisin. "${topic.name}" konusu ile ilgili KPSS sınavına hazırlanan öğrencilerin bilmesi gereken en önemli kavram, savaş, antlaşma, padişah, unvan, isyan veya kurumlardan oluşan 85 adet benzersiz flashcard verisi üret.
  
GEREKSİNİMLER:
1. Kesinlikle 85 adet kart üret.
2. Kartların "front" (kavram adı), "back" (ayrıntılı, profesyonel, doğru KPSS akademik tanımı) ve "hint" (sınavda işe yarayacak ipucu) alanları olmalıdır.
3. Asla "bu kavram KPSS'de önemlidir" gibi anlamsız, şablon veya tekrarlayan cümleler kurma. Tanım (back) doğrudan o bilginin KPSS standartlarındaki akademik açıklamasını yapmalıdır.
4. Çıktıyı sadece ve sadece geçerli bir JSON array formatında ver. Markdown kod bloğu (örneğin \`\`\`json ... \`\`\`) veya başka bir açıklama metni içermesin. Sadece ham JSON array olsun.

Format örneği:
[
  {
    "front": "Kut",
    "back": "Hükümdarlara yönetme yetkisinin Tanrı tarafından verilmesi inancıdır. Taht kavgalarına yol açmıştır.",
    "hint": "Kan yoluyla hanedan üyelerine geçtiğini unutma."
  }
]`;

  console.log(`[Flashcard Generator] "${topic.name}" için kartlar üretiliyor...`);
  
  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    // Markdown json bloklarını temizle
    if (text.startsWith("```json")) {
      text = text.substring(7);
    }
    if (text.endsWith("```")) {
      text = text.substring(0, text.length - 3);
    }
    text = text.trim();
    
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      throw new Error("Dönen veri bir array değil");
    }
    
    console.log(`[Flashcard Generator] "${topic.name}" için ${parsed.length} adet kart başarıyla üretildi.`);
    return parsed.map(card => ({
      topicId: topic.id,
      front: card.front,
      back: card.back,
      hint: card.hint,
      tags: [topic.name]
    }));
  } catch (err) {
    console.error(`[Flashcard Generator] "${topic.name}" üretilirken hata oluştu:`, err.message);
    // Hata durumunda boş dönüp tekrar deneyebiliriz
    return null;
  }
}

async function main() {
  const allCards = [];
  
  for (const topic of topics) {
    let attempts = 3;
    let cards = null;
    while (attempts > 0 && !cards) {
      cards = await generateCardsForTopic(topic);
      if (!cards) {
        attempts--;
        console.log(`[Flashcard Generator] Yeniden deneniyor... Kalan deneme: ${attempts}`);
        await new Promise(r => setTimeout(r, 4000)); // Rate limit yememek için bekle
      }
    }
    
    if (cards) {
      allCards.push(...cards);
    } else {
      console.error(`HATA: "${topic.name}" konusu için kart üretilemedi.`);
    }
    
    // Her konu arasında rate limit koruması için kısa bekleme
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n[Flashcard Generator] Toplam üretilen kart sayısı: ${allCards.length}`);
  
  // Eğer 1000'den az kart varsa veya üretim başarısızsa koruma
  if (allCards.length < 500) {
    console.error("HATA: Üretilen toplam kart sayısı çok düşük. Dosya güncellenmedi.");
    process.exit(1);
  }

  // TypeScript dosyası olarak kaydet
  const fileContent = `import type { Flashcard } from "@/types/study";

export const staticFlashcards: Omit<Flashcard, "id">[] = ${JSON.stringify(allCards, null, 2)};
`;

  const outputPath = path.join(process.cwd(), "src/data/static-flashcards.ts");
  fs.writeFileSync(outputPath, fileContent, "utf8");
  console.log(`\n[Flashcard Generator] "${outputPath}" dosyası başarıyla güncellendi!`);
}

main();
