import { flashcards, glossary, topics } from "@/data/kpss-history";

type ChatRole = "user" | "bot" | "assistant" | "model";

export type KpssTutorHistoryItem = {
  role: ChatRole;
  text: string;
};

export type KpssTutorAnswer = {
  reply: string;
  source: "curated-fact" | "site-pool" | "model" | "safe-fallback";
  confidence: number;
  matchedTitle?: string;
};

type KnowledgeEntry = {
  id: string;
  title: string;
  aliases: string[];
  answer: string;
  examTip: string;
};

type SiteEntry = {
  id: string;
  title: string;
  kind: "Konu" | "Kart" | "Kavram";
  text: string;
  href?: string;
};

const CURATED_FACTS: KnowledgeEntry[] = [
  {
    id: "put-kirici",
    title: "Put Kırıcı",
    aliases: ["put kırıcı", "putkirici", "put kirici", "put kıran", "putkırıcı", "but kırıcı", "put kırıcısı"],
    answer:
      "Put Kırıcı unvanı Gazneli Mahmut için kullanılır. Gazneli Mahmut, Hindistan’a düzenlediği seferlerde putperest tapınakları yıktığı ve İslamiyet’i yayma amacı taşıdığı için bu unvanla anılmıştır. KPSS’de bu bilgi genellikle Gazneliler, Hindistan seferleri ve Sultan unvanı ile birlikte sorulur.",
    examTip:
      "Gazneli Mahmut = Put Kırıcı + Hindistan seferleri + halifeden Sultan unvanını alan ilk Türk hükümdarı. Artuklularla karıştırma; Artuklular Malabadi Köprüsü ve El-Cezeri ile bilinir.",
  },
  {
    id: "artuklular",
    title: "Artuklular",
    aliases: ["artuklular", "artuklu", "malabadi", "el cezeri", "el-cezeri", "diyarbakır artuklu", "mardin artuklu"],
    answer:
      "Artuklular, Malazgirt’ten sonra Anadolu’da kurulan I. Dönem Türk beyliklerindendir. Mardin, Diyarbakır ve Harput çevresinde etkili olmuşlardır. Malabadi Köprüsü ve sibernetik alanındaki çalışmalarıyla tanınan El-Cezeri bu beylikle ilişkilendirilir.",
    examTip:
      "Artuklular sorulunca Malabadi Köprüsü, El-Cezeri, Mardin-Diyarbakır-Harput hattı akla gelmeli. Put Kırıcı unvanı Artuklulara değil Gazneli Mahmut’a aittir.",
  },
  {
    id: "demokratiklesme-sirasi",
    title: "Osmanlı demokratikleşme kronolojisi",
    aliases: ["sened-i ittifak tanzimat meşrutiyet", "senedi ittifak tanzimat", "tanzimat meşrutiyet sırası", "kronolojik sıralanışı", "eskisinden yenisine", "demokratikleşme sırası"],
    answer:
      "Osmanlı demokratikleşme hareketlerinin temel kronolojisi şöyledir: Sened-i İttifak (1808) → Tanzimat Fermanı (1839) → Islahat Fermanı (1856) → I. Meşrutiyet (1876) → II. Meşrutiyet (1908). Eğer seçeneklerde yalnızca Sened-i İttifak, Tanzimat Fermanı ve I. Meşrutiyet varsa doğru sıralama: Sened-i İttifak → Tanzimat Fermanı → I. Meşrutiyet’tir.",
    examTip:
      "KPSS’de tarih sorularında yıl ezberi kadar sıralama da önemlidir: 1808, 1839, 1856, 1876, 1908.",
  },
  {
    id: "kut-anlayisi",
    title: "Kut anlayışı",
    aliases: ["kut", "kut anlayışı", "kut inancı", "ülke hanedanın ortak malıdır", "veraset"],
    answer:
      "Kut anlayışı, hükümdara devleti yönetme yetkisinin Tanrı tarafından verildiğine inanılmasıdır. Kutun hanedan üyelerine geçtiği kabul edildiği için hanedanın erkek üyeleri tahtta hak iddia edebilmiştir. Bu durum veraset belirsizliğine, taht kavgalarına ve devletlerin parçalanmasına yol açmıştır.",
    examTip:
      "Kut anlayışı merkezi otoriteyi meşrulaştırır ama veraset belirsizliği yüzünden siyasi istikrarsızlık doğurur.",
  },
  {
    id: "malazgirt-miryokefalon",
    title: "Malazgirt ve Miryokefalon farkı",
    aliases: ["malazgirt miryokefalon", "malazgirt ile miryokefalon farkı", "anadolu türk yurdu", "anadolu kapıları"],
    answer:
      "Malazgirt Savaşı (1071), Anadolu’nun kapılarını Türklere açmıştır. Miryokefalon Savaşı (1176) ise Bizans’ın Anadolu’yu geri alma umudunu kırmış ve Anadolu’nun Türk yurdu olduğunu kesinleştirmiştir. Kısa formül: Malazgirt kapıyı açar, Miryokefalon tapuyu kesinleştirir.",
    examTip:
      "Malazgirt = giriş/kapı; Miryokefalon = kesin Türk yurdu. Bu iki sonucu karıştırma.",
  },
  {
    id: "kosedag",
    title: "Kösedağ Savaşı",
    aliases: ["kösedağ", "kosedag", "moğol etkisi", "anadolu selçuklu yıkılış", "ikinci beylikler"],
    answer:
      "Kösedağ Savaşı 1243’te Anadolu Selçuklu Devleti ile Moğollar arasında yapılmıştır. Selçukluların yenilmesiyle devlet Moğol egemenliğine girmiş, merkezi otorite zayıflamış ve Anadolu’da II. Beylikler Dönemi’nin oluşmasına zemin hazırlanmıştır.",
    examTip:
      "Kösedağ = Anadolu Selçuklu’nun Moğol etkisine girmesi + II. Beylikler Dönemi’nin başlaması.",
  },
  {
    id: "talas",
    title: "Talas Savaşı",
    aliases: ["talas", "talas savaşı", "751", "karluklar", "islamiyete geçiş"],
    answer:
      "Talas Savaşı 751’de Abbasiler ile Çinliler arasında yapılmıştır. Karluk Türkleri Abbasileri desteklemiştir. Bu savaş Türklerin İslamiyet’i tanımasını ve zamanla kitleler halinde Müslüman olmasını hızlandırmıştır. Ayrıca kağıt üretim tekniği Çin dışına yayılmıştır.",
    examTip:
      "Talas = Türklerin İslamiyet’e geçiş sürecinin hızlanması + Karluklar + kağıt üretiminin yayılması.",
  },
  {
    id: "istiklal-antlasmalar",
    title: "Milli Mücadele antlaşmaları sırası",
    aliases: ["gümrü moskova kars ankara mudanya lozan", "milli mücadele antlaşmaları sırası", "antlaşmalar sırası", "lozan öncesi antlaşmalar"],
    answer:
      "Milli Mücadele antlaşmalarının temel sırası: Gümrü (1920) → Moskova (1921) → Kars (1921) → Ankara (1921) → Mudanya Ateşkesi (1922) → Lozan Barış Antlaşması (1923). Gümrü TBMM’nin ilk diplomatik zaferidir; Lozan ise yeni Türk devletinin uluslararası tanınmasıdır.",
    examTip:
      "Gümrü ilk diplomatik zafer, Kars doğu sınırını kesinleştirir, Ankara güney cephesini kapatır, Mudanya savaşı fiilen bitirir, Lozan nihai bağımsızlıktır.",
  },
  {
    id: "ataturk-ilkeleri",
    title: "Atatürk ilkeleri",
    aliases: ["atatürk ilkeleri", "altı ok", "cumhuriyetçilik", "milliyetçilik", "halkçılık", "devletçilik", "laiklik", "inkılapçılık"],
    answer:
      "Atatürk ilkeleri; Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik ve İnkılapçılıktır. Cumhuriyetçilik milli egemenliği, halkçılık sınıf ayrıcalığına karşı eşitliği, laiklik din ve devlet işlerinin ayrılmasını, devletçilik ekonomik kalkınmada devletin düzenleyici rolünü, inkılapçılık çağdaşlaşmayı ifade eder.",
    examTip:
      "İlke sorularında yapılan inkılabın amacı sorulur: saltanatın kaldırılması cumhuriyetçilik, tekke-zaviyelerin kapatılması laiklik, ölçü-tartı-saat değişiklikleri inkılapçılık/çağdaşlaşma ile ilişkilidir.",
  },
];

function normalize(value: unknown) {
  return String(value ?? "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalize(value)
    .split(" ")
    .filter((token) => token.length >= 3 && !["nedir", "hangisi", "kpss", "tarih", "acikla", "sirasi"].includes(token));
}

function scoreText(query: string, target: string) {
  const normalizedQuery = normalize(query);
  const normalizedTarget = normalize(target);
  if (!normalizedQuery || !normalizedTarget) return 0;

  let score = 0;
  if (normalizedTarget.includes(normalizedQuery)) score += 18;
  if (normalizedQuery.includes(normalizedTarget)) score += 18;

  for (const token of tokenize(query)) {
    if (normalizedTarget.includes(token)) score += token.length >= 6 ? 5 : 3;
  }

  return score;
}

function findCuratedFact(question: string) {
  return CURATED_FACTS.map((fact) => {
    const aliasScore = Math.max(...fact.aliases.map((alias) => scoreText(question, alias)));
    const bodyScore = scoreText(question, `${fact.title} ${fact.answer} ${fact.examTip}`);
    return { fact, score: Math.max(aliasScore * 1.5, bodyScore) };
  }).sort((a, b) => b.score - a.score)[0];
}

function getString(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function buildSiteEntries(): SiteEntry[] {
  const topicEntries: SiteEntry[] = topics.map((topic) => {
    const summary = topic.summary
      .map((block) => `${block.heading}\n${block.body}\n${block.bullets.join("\n")}`)
      .join("\n\n");

    return {
      id: topic.id,
      title: topic.title,
      kind: "Konu",
      href: `/topics/${topic.slug}`,
      text: [topic.title, topic.shortDescription, topic.keywords.join(" "), summary, topic.mustKnow.join(" "), topic.commonMistakes.join(" ")].join("\n"),
    };
  });

  const cardEntries: SiteEntry[] = flashcards.map((card) => {
    const record = card as unknown as Record<string, unknown>;
    const front = getString(record, ["front", "term", "title"]);
    const back = getString(record, ["back", "definition", "body", "answer"]);
    const hint = getString(record, ["hint", "examTip", "whyImportant"]);

    return {
      id: getString(record, ["id"]) || front,
      title: front,
      kind: "Kart",
      text: [front, back, hint].join("\n"),
    };
  });

  const glossaryEntries: SiteEntry[] = glossary.map((item) => {
    const record = item as unknown as Record<string, unknown>;
    const term = getString(record, ["term", "front", "title"]);
    const definition = getString(record, ["definition", "back", "body"]);
    const whyImportant = getString(record, ["whyImportant", "hint", "examTip"]);

    return {
      id: getString(record, ["id"]) || term,
      title: term,
      kind: "Kavram",
      text: [term, definition, whyImportant].join("\n"),
    };
  });

  return [...topicEntries, ...cardEntries, ...glossaryEntries].filter((entry) => entry.title && entry.text.length > 20);
}

function findSiteEntry(question: string) {
  return buildSiteEntries()
    .map((entry) => ({ entry, score: scoreText(question, `${entry.title}\n${entry.text}`) }))
    .sort((a, b) => b.score - a.score)[0];
}

function formatCuratedAnswer(fact: KnowledgeEntry): string {
  return [`**${fact.title}**`, fact.answer, `📌 Sınavda dikkat: ${fact.examTip}`].join("\n\n");
}

function formatSiteAnswer(entry: SiteEntry): string {
  const cleanText = entry.text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 6)
    .join("\n");

  const link = entry.href ? `\n\nDetaylı çalışmak için: ${entry.href}` : "";

  return [
    `**${entry.title}**`,
    `Bu cevabı site bilgi havuzundaki ${entry.kind.toLocaleLowerCase("tr-TR")} içeriğinden derledim:`,
    cleanText,
    "📌 Sınavda dikkat: Kavramı yalnızca ezberleme; dönem, neden-sonuç ve benzer kavramlarla farkını birlikte öğren.",
  ].join("\n\n") + link;
}

function isGreeting(question: string) {
  const normalized = normalize(question);
  return ["selam", "merhaba", "slm", "mrb", "gunaydin", "iyi gunler", "iyi calismalar"].some(
    (item) => normalized === item || normalized.startsWith(`${item} `)
  );
}

function buildModelPrompt(question: string, history: KpssTutorHistoryItem[] = []) {
  const lastTurns = history
    .slice(-6)
    .map((item) => `${item.role === "user" ? "Öğrenci" : "Asistan"}: ${item.text}`)
    .join("\n");

  return `Sen KPSS Tarih alanında uzman, dikkatli ve sınav odaklı bir öğretmensin.
Kurallar:
- Bilmediğin şeyi uydurma.
- Önce kısa ve net cevap ver, sonra sınav ipucu ekle.
- Yanlış eşleşme yapma. Put Kırıcı sorulursa Gazneli Mahmut cevabını ver; Artuklular ile karıştırma.
- Kronoloji sorularında tarihi sırayı açıkça yaz.

Son konuşma:
${lastTurns || "Yok"}

Öğrenci sorusu: ${question}`;
}

async function answerWithModel(question: string, history: KpssTutorHistoryItem[] = []) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(buildModelPrompt(question, history));
    const text = result.response.text().trim();
    return text || null;
  } catch (error) {
    console.error("[kpss-tutor] model fallback failed", error);
    return null;
  }
}

export async function answerKpssQuestion(
  question: string,
  options: { history?: KpssTutorHistoryItem[] } = {}
): Promise<KpssTutorAnswer> {
  const trimmed = question.trim();

  if (!trimmed) {
    return {
      reply: "Sorunu yazarsan önce site bilgi havuzunda arayıp sonra sınav odaklı şekilde cevaplayabilirim.",
      source: "safe-fallback",
      confidence: 0,
    };
  }

  if (isGreeting(trimmed)) {
    return {
      reply: "Merhaba! KPSS Tarih’te kavram, kronoloji, savaş, antlaşma, padişah, inkılap veya çıkmış soru mantığı sorabilirsin. Önce site bilgi havuzunu tarayıp en güvenilir cevabı vermeye çalışırım.",
      source: "safe-fallback",
      confidence: 1,
    };
  }

  const curatedMatch = findCuratedFact(trimmed);
  if (curatedMatch && curatedMatch.score >= 9) {
    return {
      reply: formatCuratedAnswer(curatedMatch.fact),
      source: "curated-fact",
      confidence: Math.min(1, curatedMatch.score / 30),
      matchedTitle: curatedMatch.fact.title,
    };
  }

  const siteMatch = findSiteEntry(trimmed);
  if (siteMatch && siteMatch.score >= 16) {
    return {
      reply: formatSiteAnswer(siteMatch.entry),
      source: "site-pool",
      confidence: Math.min(1, siteMatch.score / 36),
      matchedTitle: siteMatch.entry.title,
    };
  }

  const modelAnswer = await answerWithModel(trimmed, options.history);
  if (modelAnswer) {
    return {
      reply: `${modelAnswer}\n\n_Not: Bu cevap site havuzunda güçlü eşleşme bulunamadığı için genel tarih modeliyle üretildi._`,
      source: "model",
      confidence: 0.55,
    };
  }

  return {
    reply:
      "Bu soruyu site bilgi havuzunda net eşleştiremedim ve şu anda çevrim içi model anahtarı da aktif görünmüyor. Soruyu biraz daha belirgin yazarsan, örneğin kişi/olay/dönem adıyla sorarsan daha güvenli cevap verebilirim.",
    source: "safe-fallback",
    confidence: 0.2,
  };
}
