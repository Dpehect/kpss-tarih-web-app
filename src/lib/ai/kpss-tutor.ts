import { getTutorKnowledgeText } from "@/lib/kpss/supabase-content-repository";
import Groq from "groq-sdk";

type ChatRole = "user" | "bot" | "assistant" | "model";
export type KpssTutorHistoryItem = { role?: ChatRole; text?: string; content?: string };
export type TutorSource = { type: "Supabase" | "LLM" | "Öğretmen" | "Doğrudan Bilgi"; title: string; href?: string; score?: number };
export type KpssTutorAnswer = {
  reply: string;
  answer: string;
  source: "site-knowledge" | "direct-fact" | "llm" | "local-teacher";
  sourceMode: "site-knowledge" | "direct-fact" | "llm" | "local-teacher";
  confidence: number;
  matchedTitle?: string;
  sources: TutorSource[];
};

type TutorOptions = { history?: KpssTutorHistoryItem[] };

type DirectFact = { aliases: string[]; title: string; answer: string; examTip: string };

const DIRECT_FACTS: DirectFact[] = [
  { aliases: ["put kirici", "put kırıcı", "putkiran", "put kıran", "gazneli mahmut"], title: "Put Kırıcı / Gazneli Mahmut", answer: "Put Kırıcı unvanı Gazneli Mahmut için kullanılır. Gazneli Mahmut Hindistan seferleriyle tanınır ve putperest merkezlere karşı mücadelesi sebebiyle bu unvanla anılır.", examTip: "Artuklular; Mardin, Diyarbakır, Harput, Malabadi Köprüsü ve El-Cezeri ile eşleştirilir. Put Kırıcı Artuklular değildir." },
  { aliases: ["kut", "kut anlayisi", "kut anlayışı", "kut inanci"], title: "Kut Anlayışı", answer: "Kut anlayışı, hükümdara devleti yönetme yetkisinin Tanrı tarafından verildiğine inanılmasıdır. Bu anlayış hanedan üyelerine tahta çıkma hakkı verdiği için veraset belirsizliği ve taht kavgalarına zemin hazırlamıştır.", examTip: "KPSS'de kut anlayışı genellikle ülke hanedanın ortak malıdır anlayışı ve devletlerin kısa ömürlü olmasıyla ilişkilendirilir." },
  { aliases: ["senedi ittifak", "sened i ittifak", "tanzimat", "i mesrutiyet", "1 mesrutiyet", "meşrutiyet kronoloji"], title: "Sened-i İttifak → Tanzimat → I. Meşrutiyet", answer: "Doğru kronolojik sıra Sened-i İttifak (1808), Tanzimat Fermanı (1839), Islahat Fermanı (1856), I. Meşrutiyet ve Kanun-i Esasi (1876) şeklindedir.", examTip: "Sened-i İttifak II. Mahmut, Tanzimat ve Islahat Abdülmecit, I. Meşrutiyet II. Abdülhamit dönemiyle eşleştirilir." },
  { aliases: ["miryokefalon", "miriyokefalon", "malazgirt miryokefalon", "anadolu turk yurdu"], title: "Malazgirt - Miryokefalon Farkı", answer: "Malazgirt Savaşı 1071'de Anadolu'nun kapılarını Türklere açmıştır. Miryokefalon Savaşı 1176'da Bizans'ın Anadolu'yu geri alma umudunu kırmış ve Anadolu'nun Türk yurdu oluşunu kesinleştirmiştir.", examTip: "Kısa ezber: Malazgirt kapıyı açar, Miryokefalon Türk yurdu olduğunu kesinleştirir." },
  { aliases: ["kosedag", "kösedağ", "mogol", "moğol", "anadolu selcuklu yikilis"], title: "Kösedağ Savaşı", answer: "Kösedağ Savaşı 1243'te Türkiye Selçuklu Devleti ile Moğollar arasında yapılmıştır. Selçukluların yenilmesiyle devlet Moğol etkisine girmiş, merkezi otorite zayıflamış ve Anadolu'da beylikler güçlenmiştir.", examTip: "Kösedağ, Türkiye Selçuklu Devleti'nin zayıflama sürecindeki ana kırılma noktasıdır." },
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/[ıİ]/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getGroqApiKey() {
  return (process.env.GROQ_API_KEY || "").trim();
}

function buildHistoryText(history: KpssTutorHistoryItem[] = []) {
  return history
    .slice(-6)
    .map((item) => `${item.role === "user" ? "Öğrenci" : "Asistan"}: ${(item.text ?? item.content ?? "").trim()}`)
    .filter((line) => !line.endsWith(":"))
    .join("\n");
}

function findDirectFact(message: string) {
  const normalized = normalize(message);
  return DIRECT_FACTS.find((fact) => fact.aliases.some((alias) => normalized.includes(normalize(alias))));
}

function directAnswer(fact: DirectFact): KpssTutorAnswer {
  const reply = [`**${fact.title}**`, "", fact.answer, "", `**KPSS ipucu:** ${fact.examTip}`].join("\n");
  return { reply, answer: reply, source: "direct-fact", sourceMode: "direct-fact", confidence: 0.98, matchedTitle: fact.title, sources: [{ type: "Doğrudan Bilgi", title: fact.title }] };
}

async function askLlm(message: string, options: TutorOptions, knowledge: string): Promise<KpssTutorAnswer | null> {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    const errReply = "Sistem Debug Logu: `process.env.GROQ_API_KEY` Vercel'de bulunamadı. Lütfen Vercel Environment Variables kısmına GROQ_API_KEY eklediğinizden emin olun.";
    return { reply: errReply, answer: errReply, source: "local-teacher", sourceMode: "local-teacher", confidence: 0.1, sources: [{ type: "Öğretmen", title: "Hata" }] };
  }
  
  try {
    const groq = new Groq({ apiKey });
    
    const systemPrompt = `Sen Softbridge Akademi içinde çalışan profesyonel bir KPSS Tarih öğretmeni ve genel amaçlı yardımcı asistansın.
Türkçe cevap ver. Teknik sorun, servis bağlantısı, sistem ayarları, veri havuzu veya sistem içeriği gibi ifadeleri kullanıcıya söyleme.
KPSS Tarih sorularında önce aşağıdaki uygulama bilgisini kullan. Alakasız/genel sorularda normal asistan gibi doğru ve net cevap ver.
Cevap formatı kısa, net ve öğretici olsun: Net cevap, açıklama, gerekirse KPSS ipucu.

Uygulama bilgi havuzu:
${knowledge.slice(0, 50000)}

Önceki konuşma:
${buildHistoryText(options.history)}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
    });

    const reply = chatCompletion.choices[0]?.message?.content?.trim();
    if (!reply) {
      const errReply = "Sistem Debug Logu: Groq'tan boş yanıt geldi.";
      return { reply: errReply, answer: errReply, source: "local-teacher", sourceMode: "local-teacher", confidence: 0.1, sources: [{ type: "Öğretmen", title: "Hata" }] };
    }
    
    return { reply, answer: reply, source: "llm", sourceMode: "llm", confidence: 0.86, sources: [{ type: "LLM", title: "Llama 3 + Supabase bilgi havuzu" }] };
  } catch (error: any) {
    const errReply = `Sistem Debug Logu: Groq API Hatası! Detay: ${error?.message || String(error)}`;
    return { reply: errReply, answer: errReply, source: "local-teacher", sourceMode: "local-teacher", confidence: 0.1, sources: [{ type: "Öğretmen", title: "Hata" }] };
  }
}

export async function answerKpssQuestion(message: string, options: TutorOptions = {}): Promise<KpssTutorAnswer> {
  const clean = message.trim();
  if (!clean) {
    const reply = "Bir soru, kavram, olay veya konu başlığı yaz; net cevap ve kısa açıklama ile yardımcı olayım.";
    return { reply, answer: reply, source: "local-teacher", sourceMode: "local-teacher", confidence: 0.5, sources: [{ type: "Öğretmen", title: "Karşılama" }] };
  }
  const greeting = ["selam", "merhaba", "slm", "mrb", "günaydın", "iyi akşamlar", "iyi aksamlar"].includes(normalize(clean));
  if (greeting) {
    const reply = "Merhaba. KPSS Tarih’ten bir soru, kavram, antlaşma, kişi veya konu başlığı yazabilirsin; net cevap, kısa açıklama ve sınav ipucuyla yanıtlayayım.";
    return { reply, answer: reply, source: "local-teacher", sourceMode: "local-teacher", confidence: 0.9, sources: [{ type: "Öğretmen", title: "Karşılama" }] };
  }

  const direct = findDirectFact(clean);
  if (direct) return directAnswer(direct);

  const knowledge = await getTutorKnowledgeText();
  const llm = await askLlm(clean, options, knowledge);
  if (llm) return llm;
  
  // LLM failed or API key missing
  const reply = "Şu an sunucuya erişimde kısa bir yoğunluk yaşıyorum. Lütfen sorunu tekrar gönder, sana KPSS Tarih açısından en net cevabı hazırlayayım.";
  return { reply, answer: reply, source: "local-teacher", sourceMode: "local-teacher", confidence: 0.1, sources: [{ type: "Öğretmen", title: "Bağlantı Gecikmesi" }] };
}

export async function answerKpssTutor(message: string, options: TutorOptions = {}) {
  return answerKpssQuestion(message, options);
}
