import { getTutorKnowledgeText } from "@/lib/kpss/supabase-content-repository";

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

function getGeminiApiKey() {
  return (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "").trim();
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

function buildLocalTeacherAnswer(message: string, knowledge: string): KpssTutorAnswer {
  const tokens = normalize(message).split(" ").filter((token) => token.length > 3);
  
  // Metni cümlelere bölelim ki paragraf yığılması olmasın
  const sentences = knowledge.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
  
  const matched = sentences
    .map((sentence) => ({ sentence, score: tokens.reduce((sum, token) => sum + (normalize(sentence).includes(token) ? 1 : 0), 0) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.sentence);

  const body = matched.length
    ? "Şu an **Yapay Zeka (LLM) API anahtarım** sisteme eklenmediği için sorularını analiz edip doğrudan cevaplayamıyorum. Ancak senin için ders havuzumda şu cümleleri buldum:\n\n" + matched.map(m => "• " + m).join("\n\n")
    : "Şu an Yapay Zeka (LLM) bağlantım yok (API anahtarı eksik) ve sistemde bu soruyla ilgili direkt bir not bulamadım.";
    
  const reply = [`**Otomatik Arama Sonucu**`, "", body].join("\n");
  
  return { 
    reply, 
    answer: reply, 
    source: "local-teacher", 
    sourceMode: "local-teacher", 
    confidence: matched.length ? 0.6 : 0.3, 
    matchedTitle: matched[0]?.slice(0, 90), 
    sources: [{ type: "Öğretmen", title: "Sistem Uyarı Mesajı" }] 
  };
}

async function askGemini(message: string, options: TutorOptions, knowledge: string): Promise<KpssTutorAnswer | null> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;
  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-flash" });
    const prompt = `Sen Softbridge Akademi içinde çalışan profesyonel bir KPSS Tarih öğretmeni ve genel amaçlı yardımcı asistansın.
Türkçe cevap ver. Teknik sorun, servis bağlantısı, sistem ayarları, veri havuzu veya sistem içeriği gibi ifadeleri kullanıcıya söyleme.
KPSS Tarih sorularında önce aşağıdaki uygulama bilgisini kullan. Alakasız/genel sorularda normal asistan gibi doğru ve net cevap ver.
Cevap formatı kısa, net ve öğretici olsun: Net cevap, açıklama, gerekirse KPSS ipucu.

Önceki konuşma:
${buildHistoryText(options.history)}

Uygulama bilgi havuzu:
${knowledge.slice(0, 60000)}

Kullanıcı sorusu:
${message}`;
    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim();
    if (!reply) return null;
    return { reply, answer: reply, source: "llm", sourceMode: "llm", confidence: 0.86, sources: [{ type: "LLM", title: "Gemini + Supabase bilgi havuzu" }] };
  } catch {
    return null;
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
  const llm = await askGemini(clean, options, knowledge);
  if (llm) return llm;
  return buildLocalTeacherAnswer(clean, knowledge);
}

export async function answerKpssTutor(message: string, options: TutorOptions = {}) {
  return answerKpssQuestion(message, options);
}
