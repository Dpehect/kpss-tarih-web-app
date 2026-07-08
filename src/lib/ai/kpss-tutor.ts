import { flashcards, glossary, questions, timelineEvents, topics } from "@/data/kpss-history";
import { searchKpssHistory, type SearchResult } from "@/lib/search/global-search";

export type TutorSource = {
  type: SearchResult["type"] | "Doğrudan Bilgi";
  title: string;
  href?: string;
  score?: number;
};

export type TutorAnswer = {
  reply: string;
  answer: string;
  sourceMode: "site-knowledge" | "direct-fact" | "safe-fallback";
  sources: TutorSource[];
};

type DirectFact = {
  aliases: string[];
  title: string;
  answer: string;
  examTip: string;
  relatedTopicId?: string;
};

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const DIRECT_FACTS: DirectFact[] = [
  {
    aliases: ["put kirici", "putkiran", "put kırıcı", "sultan mahmut", "gazneli mahmut"],
    title: "Put Kırıcı / Gazneli Mahmut",
    answer:
      "Put Kırıcı unvanı Gazneli Mahmut için kullanılır. Gazneli Mahmut Hindistan'a düzenlediği seferlerle İslamiyet'in Hindistan coğrafyasında yayılmasını sağlamış, Hindistan'daki bazı putperest merkezlere karşı mücadele ettiği için bu unvanla anılmıştır.",
    examTip:
      "KPSS'de bu bilgi Artuklularla değil Gaznelilerle ilişkilendirilir. Artuklular; Mardin, Diyarbakır, Harput çevresi, Malabadi Köprüsü ve El-Cezeri ile eşleştirilmelidir.",
    relatedTopicId: "turk-islam",
  },
  {
    aliases: ["artuklular", "malabadi", "el cezeri", "cezeri", "mardin harput diyarbakir"],
    title: "Artuklular",
    answer:
      "Artuklular, Anadolu'da Mardin, Diyarbakır ve Harput çevresinde hüküm süren bir Türk beyliğidir. Malabadi Köprüsü ve El-Cezeri'nin çalışmaları bu beylikle birlikte hatırlanır.",
    examTip:
      "Artuklular sorularında 'Malabadi Köprüsü', 'El-Cezeri', 'Mardin-Diyarbakır-Harput' ipuçları belirleyicidir. 'Put Kırıcı' ise Gazneli Mahmut'tur.",
    relatedTopicId: "anadolu-selcuklu",
  },
  {
    aliases: ["senedi ittifak", "sened i ittifak", "tanzimat", "1 mesrutiyet", "i mesrutiyet", "kronolojik siralama"],
    title: "Sened-i İttifak → Tanzimat → I. Meşrutiyet",
    answer:
      "Bu üç gelişmenin doğru kronolojik sırası Sened-i İttifak (1808), Tanzimat Fermanı (1839), I. Meşrutiyet (1876) şeklindedir.",
    examTip:
      "Sened-i İttifak II. Mahmut döneminde ayanlarla yapılır; Tanzimat Abdülmecit döneminde ilan edilir; I. Meşrutiyet II. Abdülhamit döneminde Kanun-i Esasi ile başlar.",
    relatedTopicId: "osmanli-yenilesme",
  },
  {
    aliases: ["ilk musluman turk devleti", "karahanlilar", "satuk bugra han"],
    title: "İlk Müslüman Türk Devleti",
    answer:
      "Orta Asya'da kurulan ilk Müslüman Türk devleti Karahanlılardır. Satuk Buğra Han döneminde İslamiyet kabul edilmiştir.",
    examTip:
      "Karahanlılar halkı ve yöneticileri Türk olan, Türkçeyi koruyan ilk Türk-İslam devletidir.",
    relatedTopicId: "turk-islam",
  },
  {
    aliases: ["miriyokefalon", "miryokefalon", "anadolu turk yurdu kesinlesti"],
    title: "Miryokefalon Savaşı",
    answer:
      "Miryokefalon Savaşı 1176'da Türkiye Selçuklu Devleti ile Bizans arasında yapılmış, Bizans'ın Anadolu'yu Türklerden geri alma umudu büyük ölçüde sona ermiştir.",
    examTip:
      "Malazgirt Anadolu'nun kapılarını açar; Miryokefalon Anadolu'nun Türk yurdu olduğunu kesinleştirir.",
    relatedTopicId: "anadolu-selcuklu",
  },
  {
    aliases: ["kosedag", "kösedağ", "mogol hakimiyeti"],
    title: "Kösedağ Savaşı",
    answer:
      "Kösedağ Savaşı 1243'te Türkiye Selçuklu Devleti ile Moğollar arasında yapılmış, Selçuklular yenilerek Moğol etkisine girmiş ve Anadolu'da II. Beylikler Dönemi'nin zemini oluşmuştur.",
    examTip:
      "Kösedağ, Anadolu Selçuklu Devleti'nin zayıflama/yıkılış sürecinin ana kırılma noktasıdır.",
    relatedTopicId: "anadolu-selcuklu",
  },
  {
    aliases: ["amasya genelgesi", "milletin istiklalini yine milletin azim ve karari kurtaracaktir"],
    title: "Amasya Genelgesi",
    answer:
      "Amasya Genelgesi'nde Milli Mücadele'nin gerekçesi, amacı ve yöntemi açıklanmıştır. 'Milletin istiklalini yine milletin azim ve kararı kurtaracaktır' sözü milli egemenlik vurgusudur.",
    examTip:
      "Havza bilinçlendirme, Amasya program niteliği, Erzurum bölgesel toplanıp ulusal karar alma, Sivas ulusal kongre olarak ayrılır.",
    relatedTopicId: "milli-mucadele-hazirlik",
  },
  {
    aliases: ["lozan", "lozan baris antlasmasi", "sevrin gecersizligi"],
    title: "Lozan Barış Antlaşması",
    answer:
      "Lozan Barış Antlaşması 24 Temmuz 1923'te imzalanmış, Türkiye'nin bağımsızlığı uluslararası alanda tanınmış ve Sevr hukuken geçersiz hale gelmiştir.",
    examTip:
      "Lozan'da kapitülasyonlar kaldırılmış, dış borçlar ve azınlıklar gibi başlıklar çözümlenmiştir; Boğazlar konusu ise 1936 Montrö ile Türkiye lehine tamamlanmıştır.",
    relatedTopicId: "cumhuriyet-dis-politika",
  },
];

function findDirectFact(message: string) {
  const normalized = normalize(message);
  return DIRECT_FACTS.find((fact) => fact.aliases.some((alias) => normalized.includes(normalize(alias))));
}

function extractUsefulMatches(message: string) {
  return searchKpssHistory(message)
    .filter((result) => result.score >= 18)
    .slice(0, 5);
}

function topicLink(topicId?: string) {
  const topic = topics.find((item) => item.id === topicId);
  return topic ? `/topics/${topic.slug}` : undefined;
}

function fromDirectFact(fact: DirectFact): TutorAnswer {
  const href = topicLink(fact.relatedTopicId);
  const reply = [
    `**${fact.title}**`,
    "",
    fact.answer,
    "",
    `**Sınavda dikkat:** ${fact.examTip}`,
    href ? `\nBu başlığı çalışmak için ilgili konuya geçebilirsin: ${href}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    reply,
    answer: reply,
    sourceMode: "direct-fact",
    sources: [{ type: "Doğrudan Bilgi", title: fact.title, href }],
  };
}

function fromFlashcard(id: string): TutorAnswer | null {
  const card = flashcards.find((item) => item.id === id);
  if (!card) return null;
  const topic = topics.find((item) => item.id === card.topicId);
  const reply = [
    `**${card.front}**`,
    "",
    card.back,
    "",
    `**Sınavda dikkat:** ${card.hint}`,
    topic ? `\nİlgili konu: /topics/${topic.slug}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  return {
    reply,
    answer: reply,
    sourceMode: "site-knowledge",
    sources: [{ type: "Flashcard", title: card.front, href: "/flashcards" }],
  };
}

function fromGlossary(id: string): TutorAnswer | null {
  const item = glossary.find((entry) => entry.id === id);
  if (!item) return null;
  const reply = [`**${item.term}**`, "", item.definition, "", `**Neden önemli?** ${item.whyImportant}`].join("\n");
  return {
    reply,
    answer: reply,
    sourceMode: "site-knowledge",
    sources: [{ type: "Kavram", title: item.term, href: "/glossary" }],
  };
}

function fromQuestion(id: string): TutorAnswer | null {
  const question = questions.find((item) => item.id === id);
  if (!question) return null;
  const correct = question.choices.find((choice) => choice.id === question.correctChoiceId);
  const topic = topics.find((item) => item.id === question.topicId);
  const reply = [
    `Bu soru **${topic?.title ?? "KPSS Tarih"}** başlığıyla ilgilidir.`,
    "",
    question.stem,
    "",
    `**Doğru cevap:** ${correct ? `${correct.id}) ${correct.text}` : question.correctChoiceId}`,
    "",
    `**Açıklama:** ${question.explanation}`,
    `**Sınavda dikkat:** ${question.examTip}`,
  ].join("\n");
  return {
    reply,
    answer: reply,
    sourceMode: "site-knowledge",
    sources: [{ type: "Soru", title: question.stem, href: topic ? `/question-bank/${topic.id}` : "/question-bank" }],
  };
}

function fromTopic(id: string): TutorAnswer | null {
  const topic = topics.find((item) => item.id === id);
  if (!topic) return null;
  const first = topic.summary[0];
  const bullets = first?.bullets?.slice(0, 4).map((item) => `- ${item}`).join("\n");
  const reply = [
    `**${topic.title}**`,
    "",
    topic.shortDescription,
    "",
    first?.body ?? "",
    bullets ? `\n${bullets}` : "",
    "",
    `**Sınavda dikkat:** ${topic.commonMistakes[0] ?? "Kavramları doğru dönemle eşleştir."}`,
    `\nDetaylı çalışma: /topics/${topic.slug}`,
  ]
    .filter(Boolean)
    .join("\n");
  return {
    reply,
    answer: reply,
    sourceMode: "site-knowledge",
    sources: [{ type: "Konu", title: topic.title, href: `/topics/${topic.slug}` }],
  };
}

function fromTimeline(id: string): TutorAnswer | null {
  const event = timelineEvents.find((item) => item.id === id);
  if (!event) return null;
  const reply = [`**${event.date} · ${event.title}**`, "", event.description, "", "**Sınavda dikkat:** Kronoloji sorularında bu olayın önce/sonra ilişkisini mutlaka kontrol et."].join("\n");
  return {
    reply,
    answer: reply,
    sourceMode: "site-knowledge",
    sources: [{ type: "Timeline", title: event.title, href: "/timeline" }],
  };
}

function answerFromMatch(match: SearchResult): TutorAnswer | null {
  if (match.type === "Flashcard") return fromFlashcard(match.id);
  if (match.type === "Kavram") return fromGlossary(match.id);
  if (match.type === "Soru") return fromQuestion(match.id);
  if (match.type === "Konu") return fromTopic(match.id);
  if (match.type === "Timeline") return fromTimeline(match.id);
  return null;
}

function safeFallback(message: string): TutorAnswer {
  const reply = [
    "Bu soruyu site veri havuzunda birebir güvenilir bir maddeyle eşleştiremedim.",
    "",
    "Yanlış bilgi vermemek için sallama cevap üretmiyorum. Soruyu bir kişi, olay, antlaşma veya kavram adıyla biraz daha net yazarsan önce yerel KPSS Tarih havuzunu tarayıp ardından sınav odaklı açıklayacağım.",
    "",
    `Örnek: “${message.trim()} hangi dönemle ilgilidir?” veya “${message.trim()} KPSS'de nasıl sorulur?”`,
  ].join("\n");

  return {
    reply,
    answer: reply,
    sourceMode: "safe-fallback",
    sources: [],
  };
}

export function answerKpssTutor(message: string): TutorAnswer {
  const clean = message.trim();
  if (!clean) {
    const reply = "KPSS Tarih için bir kavram, olay, kişi, antlaşma veya soru kökü yazabilirsin. Önce site veri havuzunu tararım, sonra sınav odaklı açıklarım.";
    return { reply, answer: reply, sourceMode: "safe-fallback", sources: [] };
  }

  const greeting = ["selam", "merhaba", "slm", "mrb", "günaydın", "iyi akşamlar"].some((item) => normalize(clean) === normalize(item));
  if (greeting) {
    const reply = "Merhaba. Ben KPSS Tarih Rehberi'yim. Bana kavram, kronoloji, antlaşma, kişi veya soru kökü sorabilirsin; önce site veri havuzunu tarayıp güvenli cevap veririm.";
    return { reply, answer: reply, sourceMode: "safe-fallback", sources: [] };
  }

  const direct = findDirectFact(clean);
  if (direct) return fromDirectFact(direct);

  const matches = extractUsefulMatches(clean);
  for (const match of matches) {
    const answer = answerFromMatch(match);
    if (answer) {
      return {
        ...answer,
        sources: matches.slice(0, 3).map((item) => ({ type: item.type, title: item.title, href: item.href, score: item.score })),
      };
    }
  }

  return safeFallback(clean);
}
