import { flashcards, glossary, questions, timelineEvents, topics } from "@/data/kpss-history";
import { searchKpssHistory, type SearchResult } from "@/lib/search/global-search";

type ChatRole = "user" | "bot" | "assistant" | "model";

export type KpssTutorHistoryItem = {
  role?: ChatRole;
  text?: string;
  content?: string;
};

export type TutorSource = {
  type: SearchResult["type"] | "Doğrudan Bilgi" | "LLM" | "Yerel Öğretmen";
  title: string;
  href?: string;
  score?: number;
};

export type KpssTutorAnswer = {
  reply: string;
  answer: string;
  source: "site-knowledge" | "direct-fact" | "llm" | "local-teacher";
  sourceMode: "site-knowledge" | "direct-fact" | "llm" | "local-teacher";
  confidence: number;
  matchedTitle?: string;
  sources: TutorSource[];
};

type TutorOptions = {
  history?: KpssTutorHistoryItem[];
};

type DirectFact = {
  aliases: string[];
  title: string;
  answer: string;
  examTip: string;
  relatedTopicId?: string;
};

type KnowledgeChunk = {
  id: string;
  type: TutorSource["type"];
  title: string;
  body: string;
  href?: string;
  tokens: Set<string>;
};

const DIRECT_FACTS: DirectFact[] = [
  {
    aliases: ["put kirici", "putkiran", "put kırıcı", "put kiran", "gazneli mahmut", "sultan mahmut"],
    title: "Put Kırıcı / Gazneli Mahmut",
    answer:
      "Put Kırıcı unvanı Gazneli Mahmut için kullanılır. Gazneli Mahmut, Hindistan'a düzenlediği seferlerle İslamiyet'in Hindistan coğrafyasında yayılmasını hızlandırmış ve putperest merkezlere karşı mücadele ettiği için bu unvanla anılmıştır.",
    examTip:
      "Bu bilgi Artuklularla karıştırılmamalıdır. Artuklular; Mardin, Diyarbakır, Harput, Malabadi Köprüsü ve El-Cezeri ile eşleştirilir.",
    relatedTopicId: "t2",
  },
  {
    aliases: ["kut", "kut anlayisi", "kut inanci", "ülke hanedanın ortak malıdır", "ulke hanedanin ortak malidir"],
    title: "Kut Anlayışı",
    answer:
      "Kut anlayışı, hükümdara devleti yönetme yetkisinin Tanrı tarafından verildiğine inanılmasıdır. Bu yetkinin hanedan üyelerine geçtiği kabul edildiği için hanedan erkeklerinin tahta çıkma hakkı doğmuş, bu da sık sık taht kavgalarına neden olmuştur.",
    examTip:
      "KPSS'de kut anlayışı genellikle veraset belirsizliği, taht kavgaları ve devletlerin kısa ömürlü olmasıyla ilişkilendirilir.",
    relatedTopicId: "t1",
  },
  {
    aliases: ["senedi ittifak", "sened i ittifak", "tanzimat", "1 mesrutiyet", "i mesrutiyet", "kronoloji"],
    title: "Sened-i İttifak → Tanzimat → I. Meşrutiyet",
    answer:
      "Doğru kronolojik sıra Sened-i İttifak (1808), Tanzimat Fermanı (1839), I. Meşrutiyet (1876) şeklindedir.",
    examTip:
      "Sened-i İttifak II. Mahmut, Tanzimat Abdülmecit, I. Meşrutiyet II. Abdülhamit dönemiyle eşleştirilir.",
    relatedTopicId: "t6",
  },
  {
    aliases: ["miriyokefalon", "miryokefalon", "anadolu turk yurdu kesinlesti", "malazgirt miryokefalon farki"],
    title: "Malazgirt - Miryokefalon Farkı",
    answer:
      "Malazgirt Savaşı 1071'de Anadolu'nun kapılarını Türklere açmıştır. Miryokefalon Savaşı ise 1176'da Bizans'ın Anadolu'yu geri alma umudunu büyük ölçüde bitirmiş, Anadolu'nun Türk yurdu olduğunu kesinleştirmiştir.",
    examTip:
      "Kısa ezber: Malazgirt kapıyı açar, Miryokefalon Anadolu'nun Türk yurdu olduğunu kesinleştirir.",
    relatedTopicId: "t3",
  },
  {
    aliases: ["kosedag", "kösedağ", "mogol", "moğol", "anadolu selcuklu yikilis"],
    title: "Kösedağ Savaşı",
    answer:
      "Kösedağ Savaşı 1243'te Türkiye Selçuklu Devleti ile Moğollar arasında yapılmıştır. Selçukluların yenilmesiyle devlet Moğol etkisine girmiş ve Anadolu'da II. Beylikler Dönemi'nin zemini oluşmuştur.",
    examTip:
      "Kösedağ, Anadolu Selçuklu Devleti'nin zayıflama ve yıkılış sürecindeki ana kırılma noktasıdır.",
    relatedTopicId: "t3",
  },
  {
    aliases: ["ilk musluman turk devleti", "karahanlilar", "satuk bugra han"],
    title: "İlk Müslüman Türk Devleti",
    answer:
      "Orta Asya'da kurulan ilk Müslüman Türk devleti Karahanlılardır. Satuk Buğra Han döneminde İslamiyet kabul edilmiş, Türkçe ve milli kimlik korunmuştur.",
    examTip:
      "Karahanlılar; Kutadgu Bilig, Divanü Lügati't-Türk, Atabetü'l-Hakayık ve Divan-ı Hikmet gibi ilk Türk-İslam eserleriyle birlikte sorulur.",
    relatedTopicId: "t2",
  },
  {
    aliases: ["amasya genelgesi", "milletin istiklalini yine milletin azim ve karari kurtaracaktir"],
    title: "Amasya Genelgesi",
    answer:
      "Amasya Genelgesi, Milli Mücadele'nin gerekçesini, amacını ve yöntemini ortaya koymuştur. 'Milletin istiklalini yine milletin azim ve kararı kurtaracaktır' sözü milli egemenlik vurgusudur.",
    examTip:
      "Havza bilinçlendirme, Amasya program niteliği, Erzurum bölgesel toplanıp ulusal karar alma, Sivas ulusal kongre olarak ayrılır.",
    relatedTopicId: "t8",
  },
  {
    aliases: ["lozan", "lozan baris antlasmasi", "sevr", "kapitulasyon"],
    title: "Lozan Barış Antlaşması",
    answer:
      "Lozan Barış Antlaşması 24 Temmuz 1923'te imzalanmış, Türkiye'nin bağımsızlığı uluslararası alanda tanınmış ve Sevr hukuken geçersiz hale gelmiştir. Kapitülasyonlar kaldırılmıştır.",
    examTip:
      "Lozan'da çözülen başlıklar ile daha sonra Montrö'de Türkiye lehine tamamlanan Boğazlar konusu karıştırılmamalıdır.",
    relatedTopicId: "t11",
  },
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

function tokenize(value: string) {
  const stop = new Set([
    "nedir",
    "ne",
    "kimdir",
    "hangi",
    "neden",
    "nasil",
    "nasıl",
    "kpss",
    "tarih",
    "ile",
    "ve",
    "bir",
    "bu",
    "su",
    "şu",
    "mi",
    "mu",
    "mü",
    "mı",
    "de",
    "da",
    "the",
  ]);

  return normalize(value)
    .split(" ")
    .filter((token) => token.length > 2 && !stop.has(token));
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function topicHref(topicId?: string) {
  const topic = topics.find((item) => item.id === topicId || item.slug === topicId);
  return topic ? `/topics/${topic.slug}` : undefined;
}

function findDirectFact(message: string) {
  const normalized = normalize(message);
  return DIRECT_FACTS.find((fact) =>
    fact.aliases.some((alias) => normalized.includes(normalize(alias))),
  );
}

function buildKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  for (const topic of topics) {
    const body = [
      topic.title,
      topic.shortDescription,
      ...topic.keywords,
      ...topic.mustKnow,
      ...topic.commonMistakes,
      ...topic.quickTimeline.map((item) => `${item.date} ${item.event}`),
      ...topic.summary.flatMap((block) => [block.heading, block.body, ...block.bullets]),
    ].join("\n");

    chunks.push({
      id: topic.id,
      type: "Konu",
      title: topic.title,
      body,
      href: `/topics/${topic.slug}`,
      tokens: new Set(tokenize(body)),
    });
  }

  for (const card of flashcards) {
    const body = [card.front, card.back, card.hint, ...card.tags].join("\n");
    chunks.push({
      id: card.id,
      type: "Flashcard",
      title: card.front,
      body,
      href: "/flashcards",
      tokens: new Set(tokenize(body)),
    });
  }

  for (const entry of glossary) {
    const record = entry as unknown as Record<string, unknown>;
    const term = readString(record.term);
    const definition = readString(record.definition);
    const whyImportant = readString(record.whyImportant);
    const body = [term, definition, whyImportant].join("\n");
    chunks.push({
      id: readString(record.id) || term,
      type: "Kavram",
      title: term || "Kavram",
      body,
      href: "/glossary",
      tokens: new Set(tokenize(body)),
    });
  }

  for (const question of questions) {
    const correct = question.choices.find((choice) => choice.id === question.correctChoiceId);
    const body = [
      question.stem,
      ...question.choices.map((choice) => `${choice.id}) ${choice.text}`),
      correct ? `Doğru cevap: ${correct.id}) ${correct.text}` : `Doğru cevap: ${question.correctChoiceId}`,
      question.explanation,
      question.examTip,
      ...question.tags,
    ].join("\n");

    chunks.push({
      id: question.id,
      type: "Soru",
      title: question.stem,
      body,
      href: topicHref(question.topicId) ?? "/question-bank",
      tokens: new Set(tokenize(body)),
    });
  }

  for (const event of timelineEvents) {
    const body = [event.date, event.title, event.description].join("\n");
    chunks.push({
      id: event.id,
      type: "Timeline",
      title: event.title,
      body,
      href: "/timeline",
      tokens: new Set(tokenize(body)),
    });
  }

  return chunks;
}

function scoreChunk(queryTokens: string[], chunk: KnowledgeChunk) {
  if (!queryTokens.length) return 0;

  let score = 0;
  for (const token of queryTokens) {
    if (chunk.tokens.has(token)) score += 10;
    if (normalize(chunk.title).includes(token)) score += 8;
  }

  return score;
}

function retrieveContext(message: string) {
  const queryTokens = unique(tokenize(message));
  const localChunks = buildKnowledgeChunks()
    .map((chunk) => ({ ...chunk, score: scoreChunk(queryTokens, chunk) }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  let searchMatches: SearchResult[] = [];
  try {
    searchMatches = searchKpssHistory(message).slice(0, 5);
  } catch {
    searchMatches = [];
  }

  return { queryTokens, chunks: localChunks, searchMatches };
}

function formatSources(sources: TutorSource[]) {
  if (!sources.length) return "";

  return sources
    .slice(0, 3)
    .map((source) => `- ${source.type}: ${source.title}${source.href ? ` (${source.href})` : ""}`)
    .join("\n");
}

function answerFromDirectFact(fact: DirectFact): KpssTutorAnswer {
  const href = topicHref(fact.relatedTopicId);
  const reply = [
    `**${fact.title}**`,
    "",
    fact.answer,
    "",
    `**KPSS ipucu:** ${fact.examTip}`,
  ].join("\n");

  return {
    reply,
    answer: reply,
    source: "direct-fact",
    sourceMode: "direct-fact",
    confidence: 0.98,
    matchedTitle: fact.title,
    sources: [{ type: "Doğrudan Bilgi", title: fact.title, href }],
  };
}

function answerFromSiteKnowledge(message: string): KpssTutorAnswer | null {
  const { chunks, searchMatches } = retrieveContext(message);
  const best = chunks[0];

  if (!best || best.score < 14) return null;

  const context = best.body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 8);

  const summaryLines = context.slice(0, 4).join(" ");
  const related = chunks
    .slice(1, 4)
    .map((chunk) => `- ${chunk.title}`)
    .join("\n");

  const reply = [
    `**${best.title}**`,
    "",
    summaryLines,
    "",
    `**KPSS yorumu:** Bu başlıkta soru genellikle kavram-dönem, olay-sonuç veya kronolojik sıra ilişkisi üzerinden gelir. Özellikle doğru dönemi ve ayırt edici ipucunu eşleştirmen gerekir.`,
    related ? `\n**Yakın başlıklar:**\n${related}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const sources: TutorSource[] = chunks.slice(0, 3).map((chunk) => ({
    type: chunk.type,
    title: chunk.title,
    href: chunk.href,
    score: chunk.score,
  }));

  if (!sources.length) {
    sources.push(
      ...searchMatches.slice(0, 3).map((match) => ({
        type: match.type,
        title: match.title,
        href: match.href,
        score: match.score,
      })),
    );
  }

  return {
    reply,
    answer: reply,
    source: "site-knowledge",
    sourceMode: "site-knowledge",
    confidence: Math.min(0.92, 0.62 + best.score / 100),
    matchedTitle: best.title,
    sources,
  };
}

function getGeminiApiKey() {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    ""
  ).trim();
}

function buildHistoryText(history: KpssTutorHistoryItem[] = []) {
  return history
    .slice(-6)
    .map((item) => {
      const role = item.role === "user" ? "Öğrenci" : "Asistan";
      const text = item.text ?? item.content ?? "";
      return text.trim() ? `${role}: ${text.trim()}` : "";
    })
    .filter(Boolean)
    .join("\n");
}

async function askGemini(message: string, options: TutorOptions, sources: TutorSource[]) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const { chunks } = retrieveContext(message);
  const context = chunks
    .slice(0, 6)
    .map((chunk, index) => `Kaynak ${index + 1} (${chunk.type} - ${chunk.title}):\n${chunk.body.slice(0, 1500)}`)
    .join("\n\n");

  const historyText = buildHistoryText(options.history);
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `Sen Softbridge Akademi içinde çalışan profesyonel bir KPSS Tarih öğretmenisin.
Türkçe cevap ver. Öğrenciye teknik detay, API, model anahtarı, veri havuzu hatası veya sistem bilgisi söyleme.
Önce verilen uygulama bağlamını kullan. Bağlam yeterli değilse genel tarih bilginle cevapla; emin olmadığın ayrıntılarda kesin konuşma, ama öğrenciye faydalı bir çerçeve ver.
Cevap formatı:
1) Net cevap
2) Kısa açıklama
3) KPSS ipucu
4) Varsa karıştırılan nokta

Önceki konuşma:
${historyText || "Yok"}

Uygulama bağlamı:
${context || "Bu soru için doğrudan bağlam bulunamadı."}

Öğrenci sorusu: ${message}`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim();

    if (!reply) return null;

    return {
      reply,
      answer: reply,
      source: "llm" as const,
      sourceMode: "llm" as const,
      confidence: chunks.length ? 0.82 : 0.7,
      matchedTitle: chunks[0]?.title,
      sources: sources.length
        ? sources
        : chunks.slice(0, 3).map((chunk) => ({
            type: chunk.type,
            title: chunk.title,
            href: chunk.href,
            score: chunk.score,
          })),
    } satisfies KpssTutorAnswer;
  } catch {
    return null;
  }
}

function localTeacherAnswer(message: string): KpssTutorAnswer {
  const { chunks } = retrieveContext(message);
  const best = chunks[0];
  const title = best?.title || "KPSS Tarih";
  const useful = best?.body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 5)
    .join(" ");

  const reply = useful
    ? [
        `**${title}**`,
        "",
        useful,
        "",
        "**KPSS ipucu:** Bu konuyu çalışırken kişi-olay-dönem eşleştirmesi yap. Sınavda çoğu soru doğrudan ezberden çok ayırt edici ipucunu yakalamayı ölçer.",
      ].join("\n")
    : [
        "**KPSS Tarih açısından yaklaşım**",
        "",
        `Bu soruyu sınav mantığıyla ele alırken önce kavramın hangi dönem, kişi veya olayla ilişkili olduğunu belirlemek gerekir. Ardından sonuç, neden ve kronolojik konum üzerinden yorum yapılır.`,
        "",
        "**KPSS ipucu:** Soruyu kişi/olay/dönem adıyla biraz daha netleştirirsen cevabı doğrudan o başlık üzerinden, kısa ve sınav odaklı şekilde açabilirim.",
      ].join("\n");

  return {
    reply,
    answer: reply,
    source: "local-teacher",
    sourceMode: "local-teacher",
    confidence: best ? 0.58 : 0.35,
    matchedTitle: best?.title,
    sources: best
      ? [
          {
            type: best.type,
            title: best.title,
            href: best.href,
            score: best.score,
          },
        ]
      : [{ type: "Yerel Öğretmen", title: "KPSS Tarih açıklama modu" }],
  };
}

export async function answerKpssQuestion(
  message: string,
  options: TutorOptions = {},
): Promise<KpssTutorAnswer> {
  const clean = message.trim();

  if (!clean) {
    const reply = "Bir kavram, olay, kişi, antlaşma ya da soru kökü yaz; KPSS mantığıyla kısa ve net açıklayayım.";
    return {
      reply,
      answer: reply,
      source: "local-teacher",
      sourceMode: "local-teacher",
      confidence: 0.4,
      sources: [{ type: "Yerel Öğretmen", title: "Karşılama" }],
    };
  }

  const greeting = ["selam", "merhaba", "slm", "mrb", "günaydın", "iyi akşamlar", "iyi aksamlar"].some(
    (item) => normalize(clean) === normalize(item),
  );

  if (greeting) {
    const reply = "Merhaba. Bana KPSS Tarih’ten bir kavram, olay, antlaşma, kişi veya soru kökü yazabilirsin. Cevabı önce netleştirir, sonra KPSS’de nasıl sorulacağını kısaca gösteririm.";
    return {
      reply,
      answer: reply,
      source: "local-teacher",
      sourceMode: "local-teacher",
      confidence: 0.85,
      sources: [{ type: "Yerel Öğretmen", title: "Karşılama" }],
    };
  }

  const direct = findDirectFact(clean);
  if (direct) return answerFromDirectFact(direct);

  const siteAnswer = answerFromSiteKnowledge(clean);
  const sources = siteAnswer?.sources ?? [];

  const llmAnswer = await askGemini(clean, options, sources);
  if (llmAnswer) {
    return llmAnswer;
  }

  if (siteAnswer) return siteAnswer;

  return localTeacherAnswer(clean);
}

export async function answerKpssTutor(
  message: string,
  options: TutorOptions = {},
): Promise<KpssTutorAnswer> {
  return answerKpssQuestion(message, options);
}

export { formatSources };
