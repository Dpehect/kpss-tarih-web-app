import type {
  Exam,
  Flashcard,
  Question,
  StudyRecommendation,
  TimelineEvent,
  Topic,
} from "@/types/study";

function topic(
  id: string,
  slug: string,
  title: string,
  era: Topic["era"],
  shortDescription: string,
  examImportance = 82,
  estimatedMinutes = 42,
  keywords: string[] = [],
  quickTimeline: Topic["quickTimeline"] = []
): Topic {
  return {
    id,
    slug,
    title,
    era,
    shortDescription,
    examImportance,
    estimatedMinutes,
    keywords,
    quickTimeline,
    summary: [
      {
        heading: "Konu omurgası",
        body: `${title} KPSS Tarih içinde doğrudan bilgi, kronoloji ve neden-sonuç ilişkisiyle birlikte sorulan temel başlıklardan biridir. Bu bölümde olayları ezberlemek yerine aktör, kurum, sonuç ve sınavda karıştırılan ayrımları birlikte öğrenmek gerekir.`,
        bullets: [
          "Önce temel kavramları ve kronolojik sıralamayı yerleştir.",
          "Ardından olayların sonuçlarını ve sınavda gelen ayırt edici bilgileri eşleştir.",
          "Son aşamada konu testiyle yanlış yapılan alt başlıkları tekrar et.",
        ],
      },
      {
        heading: "KPSS'de nasıl sorulur?",
        body: "Sorular çoğunlukla kavram-eşleştirme, gelişme-sonuç, dönem-karşılaştırma ve kronolojik sıralama biçiminde gelir. Bu yüzden sadece tanım ezberi yeterli değildir; konu içindeki bağlantılar görünür olmalıdır.",
        bullets: [
          "Öncüllü sorularda mutlak ifadeleri dikkatle kontrol et.",
          "Benzer kurum, antlaşma ve inkılapları tablo mantığıyla ayır.",
          "Kronoloji sorularında önce yüzyıl/dönem filtresi kur, sonra seçenek ele.",
        ],
      },
    ],
    mustKnow: [
      "Ana kavramların tanımı ve dönem bağlantısı",
      "Olayların kısa-orta-uzun vadeli sonuçları",
      "Sınavda karıştırılan kurum, kişi ve belge ayrımları",
      "Kronolojik önce-sonra ilişkisi",
    ],
    commonMistakes: [
      "Aynı dönemde geçen fakat farklı amaç taşıyan gelişmeleri karıştırmak",
      "Bir olayın nedenini sonucu sanmak",
      "Kişi, kurum ve belge eşleştirmesini ezbere ama bağlamsız öğrenmek",
    ],
  };
}

export const topics: Topic[] = [
  topic(
    "islamiyet-oncesi",
    "islamiyet-oncesi-turk-tarihi",
    "İslamiyet Öncesi Türk Tarihi",
    "islamiyet-oncesi",
    "İlk Türk devletleri, bozkır kültürü, töre, kut anlayışı ve sosyal yapı.",
    86,
    45,
    ["kut", "töre", "kurultay", "ikili teşkilat", "Orhun Yazıtları"],
    [
      { date: "552", event: "I. Kök Türk Devleti'nin kuruluşu" },
      { date: "732-735", event: "Orhun Yazıtları'nın dikilmesi" },
    ]
  ),
  topic(
    "turk-islam",
    "turk-islam-tarihi",
    "Türk-İslam Tarihi",
    "turk-islam",
    "Karahanlı, Gazneli, Büyük Selçuklu ve Türk-İslam medeniyetinin temel kurumları.",
    84,
    48,
    ["Karahanlılar", "Gazneliler", "Büyük Selçuklu", "ikta", "Nizamiye"],
    [
      { date: "751", event: "Talas Savaşı" },
      { date: "1040", event: "Dandanakan Savaşı" },
      { date: "1071", event: "Malazgirt Savaşı" },
    ]
  ),
  topic(
    "anadolu-selcuklu",
    "anadolu-selcuklu-ve-beylikler",
    "Anadolu Selçuklu ve Beylikler",
    "turk-islam",
    "Anadolu'nun Türkleşmesi, kurumlaşma, ticaret yolları ve beylikler dönemi.",
    78,
    40,
    ["kervansaray", "ahilik", "mirî arazi", "Kösedağ", "beylikler"],
    [
      { date: "1176", event: "Miryokefalon Savaşı" },
      { date: "1243", event: "Kösedağ Savaşı" },
    ]
  ),
  topic(
    "osmanli-kurulus-yukselis",
    "osmanli-kurulus-ve-yukselis",
    "Osmanlı Kuruluş ve Yükseliş",
    "osmanli",
    "Beylikten devlete geçiş, Balkan politikası, İstanbul'un fethi ve merkeziyetçilik.",
    88,
    52,
    ["iskan", "devşirme", "tımar", "İstanbul'un fethi", "merkeziyetçilik"],
    [
      { date: "1299", event: "Osmanlı Beyliği'nin kuruluş süreci" },
      { date: "1453", event: "İstanbul'un fethi" },
      { date: "1517", event: "Mısır Seferi ve halifelik tartışmaları" },
    ]
  ),
  topic(
    "osmanli-kultur-medeniyet",
    "osmanli-kultur-ve-medeniyet",
    "Osmanlı Kültür ve Medeniyet",
    "osmanli",
    "Merkez-taşra teşkilatı, hukuk, eğitim, maliye, ordu ve toplum yapısı.",
    92,
    58,
    ["divan", "tımar", "vakıf", "enderun", "millet sistemi"],
    [
      { date: "Klasik dönem", event: "Merkez-taşra düzeninin olgunlaşması" },
      { date: "XVII. yy", event: "Kurumlarda bozulma ve ıslahat ihtiyacı" },
    ]
  ),
  topic(
    "osmanli-yenilesme",
    "osmanli-yenilesme",
    "Osmanlı Yenileşme ve Demokratikleşme",
    "yenilesme",
    "Lale Devri'nden Meşrutiyet'e uzanan ıslahatlar, anayasal gelişmeler ve modernleşme.",
    90,
    56,
    ["Lale Devri", "Tanzimat", "Islahat", "Kanunuesasi", "Meşrutiyet"],
    [
      { date: "1839", event: "Tanzimat Fermanı" },
      { date: "1856", event: "Islahat Fermanı" },
      { date: "1876", event: "I. Meşrutiyet" },
    ]
  ),
  topic(
    "milli-mucadele-hazirlik",
    "milli-mucadele-hazirlik-donemi",
    "Milli Mücadele Hazırlık Dönemi",
    "milli-mucadele",
    "Mondros sonrası işgaller, cemiyetler, kongreler ve ulusal egemenlik fikrinin oluşumu.",
    94,
    55,
    ["Mondros", "Amasya", "Erzurum", "Sivas", "Misakımilli"],
    [
      { date: "1918", event: "Mondros Ateşkes Antlaşması" },
      { date: "1919", event: "Amasya Genelgesi, Erzurum ve Sivas Kongreleri" },
      { date: "1920", event: "Misakımilli ve TBMM'nin açılması" },
    ]
  ),
  topic(
    "kurtulus-savasi",
    "kurtulus-savasi-ve-antlasmalar",
    "Kurtuluş Savaşı ve Antlaşmalar",
    "milli-mucadele",
    "Cepheler, diplomatik gelişmeler, TBMM'nin otoritesi ve Lozan'a giden süreç.",
    93,
    52,
    ["I. İnönü", "Sakarya", "Büyük Taarruz", "Mudanya", "Lozan"],
    [
      { date: "1921", event: "Sakarya Meydan Muharebesi" },
      { date: "1922", event: "Büyük Taarruz ve Mudanya" },
      { date: "1923", event: "Lozan Barış Antlaşması" },
    ]
  ),
  topic(
    "ataturk-ilke-inkilap",
    "ataturk-ilke-ve-inkilaplari",
    "Atatürk İlke ve İnkılapları",
    "cumhuriyet",
    "Siyasi, hukuk, eğitim, ekonomi ve toplumsal inkılapların ilke bağlantıları.",
    96,
    60,
    ["cumhuriyetçilik", "laiklik", "halkçılık", "devletçilik", "inkılapçılık"],
    [
      { date: "1924", event: "Halifeliğin kaldırılması ve Tevhid-i Tedrisat" },
      { date: "1925", event: "Şapka Kanunu ve tekke-zaviye düzenlemesi" },
      { date: "1934", event: "Soyadı Kanunu" },
    ]
  ),
  topic(
    "cumhuriyet-dis-politika",
    "cumhuriyet-donemi-dis-politika",
    "Cumhuriyet Dönemi Dış Politika",
    "cumhuriyet",
    "Lozan sonrası sorunlar, barışçı dış politika, bölgesel ittifaklar ve II. Dünya Savaşı süreci.",
    82,
    44,
    ["Musul", "Montrö", "Sadabat", "Balkan Antantı", "Hatay"],
    [
      { date: "1934", event: "Balkan Antantı" },
      { date: "1936", event: "Montrö Boğazlar Sözleşmesi" },
      { date: "1939", event: "Hatay'ın Türkiye'ye katılması" },
    ]
  ),
  topic(
    "cagdas-turk-dunya",
    "cagdas-turk-ve-dunya-tarihi",
    "Çağdaş Türk ve Dünya Tarihi",
    "cagdas",
    "Soğuk Savaş, uluslararası örgütler, küresel krizler ve Türkiye'nin yakın dönem politikaları.",
    76,
    42,
    ["Soğuk Savaş", "NATO", "BM", "Kıbrıs", "küreselleşme"],
    [
      { date: "1945", event: "Birleşmiş Milletler'in kurulması" },
      { date: "1952", event: "Türkiye'nin NATO'ya katılması" },
      { date: "1974", event: "Kıbrıs Barış Harekâtı" },
    ]
  ),
  topic(
    "genel-kronoloji",
    "tarih-genel-kronoloji",
    "Tarih Genel Kronoloji ve Karma Tekrar",
    "cagdas",
    "KPSS Tarih genel tekrarında dönemler arası bağlantı, sıralama ve karma soru pratiği.",
    80,
    36,
    ["kronoloji", "karma tekrar", "eşleştirme", "neden-sonuç"],
    [
      { date: "Genel", event: "Dönemler arası bağlantılı tekrar" },
    ]
  ),
];

const choiceIds = ["A", "B", "C", "D", "E"] as const;

function makeQuestion(topicItem: Topic, index: number): Question {
  const correctChoiceId = choiceIds[index % choiceIds.length];
  
  // Konunun anahtar bilgilerinden benzersiz doğru cevap metni üret
  const getCorrectText = () => {
    const rawCorrect = topicItem.mustKnow[index % topicItem.mustKnow.length];
    return `${topicItem.title} konusunda en kritik eşik; ${rawCorrect.charAt(0).toLowerCase() + rawCorrect.slice(1)} ve bunun dönem koşullarıyla ilişkilendirilmesidir.`;
  };

  // Konuyla ilgili çeldirici havuzu
  const wrongAnswersPool = [
    ...(topicItem.keywords || []),
    ...(topicItem.commonMistakes || []),
    "Tarihsel gelişmelerin neden-sonuç ilişkisini göz ardı eden kronolojik ezberler.",
    "Dönemin şartlarını dikkate almadan günümüz değer yargılarıyla yapılan öznel analizler.",
    "Olayların gelişim süreçlerinden bağımsız, sadece kavram odaklı dar yorumlar.",
    "Siyasi ve askeri gelişmeleri sosyal/kültürel hayattan tamamen kopuk ele alma.",
    "Tarihsel olayların coğrafi çevre ile olan doğrudan etkileşimini reddetme."
  ];

  // Her şık için mantıklı ve farklı bir tarihi çeldirici metni oluştur (indis kaydırma ile çakışmayı önle)
  const getWrongText = (choiceIndex: number) => {
    const salt = topicItem.title.charCodeAt(0) + topicItem.id.charCodeAt(topicItem.id.length - 1);
    const uniqueIndex = (choiceIndex * 7 + index * 13 + salt) % wrongAnswersPool.length;
    const rawVal = wrongAnswersPool[uniqueIndex];
    if (rawVal.length < 15) {
      return `${rawVal} kavramının veya olayının tarihsel bağlamdan kopuk şekilde değerlendirilmesi.`;
    }
    return rawVal;
  };

  return {
    id: `${topicItem.id}-q-${index + 1}`,
    topicId: topicItem.id,
    type: index % 3 === 0 ? "chronology" : index % 2 === 0 ? "case" : "single",
    difficulty: index % 3 === 0 ? "ileri" : index % 2 === 0 ? "orta" : "temel",
    stem: `${topicItem.title} konusunda KPSS sınavı açısından en doğru ve belirleyici analiz aşağıdakilerden hangisidir?`,
    choices: choiceIds.map((id, choiceIndex) => ({
      id,
      text:
        id === correctChoiceId
          ? getCorrectText()
          : getWrongText(choiceIndex),
    })),
    correctChoiceId,
    explanation: `${topicItem.title} sorularında doğru analiz, kavramı dönemin sosyal, askeri ve kültürel dinamikleriyle birlikte yorumlamaktır. Sadece tanım ezberi sınav sorularında yanıltıcı olabilir.`,
    examTip: "Soruyu okurken önce dönemin genel karakteristiğini (örneğin bozkır kültürü, merkeziyetçilik, ıslahat dönemi vb.) hatırla.",
    tags: topicItem.keywords.slice(0, 4),
  };
}

export const questions: Question[] = topics.flatMap((topicItem) =>
  Array.from({ length: 4 }, (_, index) => makeQuestion(topicItem, index))
);

export const flashcards: Flashcard[] = topics.flatMap((topicItem) =>
  topicItem.keywords.slice(0, 4).map((keyword, index) => ({
    id: `${topicItem.id}-card-${index + 1}`,
    topicId: topicItem.id,
    front: keyword,
    back: `${keyword}, ${topicItem.title} başlığı içinde KPSS'de kavram, dönem ve sonuç ilişkisiyle birlikte düşünülmesi gereken anahtar bir bilgidir.`,
    hint: `${topicItem.title} konusundaki kullanım bağlamını hatırla.`,
    tags: [topicItem.title, keyword],
  }))
);

export const timelineEvents: TimelineEvent[] = topics.flatMap((topicItem, topicIndex) =>
  topicItem.quickTimeline.map((item, index) => ({
    id: `${topicItem.id}-event-${index + 1}`,
    topicId: topicItem.id,
    date: item.date,
    title: item.event,
    description: `${item.event}, ${topicItem.title} başlığında kronoloji ve neden-sonuç ilişkisini kurmak için kritik bir referans noktasıdır.`,
    tone: (["gold", "turquoise", "crimson", "parchment"] as const)[(topicIndex + index) % 4],
  }))
);

export const exams: Exam[] = [
  {
    id: "kpss-tarih-genel-deneme-1",
    title: "KPSS Tarih Genel Deneme 1",
    durationMinutes: 45,
    questionIds: questions.slice(0, 30).map((question) => question.id),
    description: "Tüm ana dönemlerden dengeli seçilmiş açıklamalı genel tekrar denemesi.",
  },
];

export const studyRecommendations: StudyRecommendation[] = [
  {
    id: "daily-topic-review",
    title: "Günün konu tekrarı",
    description: "Önce yüksek ağırlıklı konuyu oku, ardından aynı başlıktan açıklamalı test çöz.",
    href: "/topics",
    minutes: 25,
    priority: "yüksek",
  },
  {
    id: "question-bank-focus",
    title: "Soru bankası odak oturumu",
    description: "Yanlış yaptığın başlıklarda 20 dakikalık hedefli test oturumu başlat.",
    href: "/question-bank",
    minutes: 20,
    priority: "orta",
  },
];

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function topicMatches(topicItem: Topic, value: string) {
  const key = normalize(value);
  return (
    topicItem.id === value ||
    topicItem.slug === value ||
    normalize(topicItem.id) === key ||
    normalize(topicItem.slug) === key ||
    normalize(topicItem.title) === key
  );
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topicItem) => topicMatches(topicItem, slug));
}

export function getTopicById(topicId: string): Topic | undefined {
  return topics.find((topicItem) => topicMatches(topicItem, topicId));
}

export function getQuestionsByTopic(topicIdOrSlug: string): Question[] {
  const topicItem = getTopicById(topicIdOrSlug) ?? getTopicBySlug(topicIdOrSlug);
  if (!topicItem) return [];
  return questions.filter((question) => question.topicId === topicItem.id);
}

export function getFlashcardsByTopic(topicIdOrSlug: string): Flashcard[] {
  const topicItem = getTopicById(topicIdOrSlug) ?? getTopicBySlug(topicIdOrSlug);
  if (!topicItem) return [];
  return flashcards.filter((card) => card.topicId === topicItem.id);
}

export function getTimelineEventsByTopic(topicIdOrSlug: string): TimelineEvent[] {
  const topicItem = getTopicById(topicIdOrSlug) ?? getTopicBySlug(topicIdOrSlug);
  if (!topicItem) return [];
  return timelineEvents.filter((event) => event.topicId === topicItem.id);
}

const readCompatText = (value: unknown, keys: string[], fallback = "") => {
  const record = value as unknown as Record<string, unknown>;
  for (const key of keys) {
    const item = record[key];
    if (typeof item === "string" && item.trim()) return item.trim();
    if (typeof item === "number") return String(item);
  }
  return fallback;
};

export const glossary = flashcards.map((card, index) => ({
  id: readCompatText(card, ["id"], `glossary-${index + 1}`),
  term: readCompatText(card, ["term", "front", "question", "title"], `Kavram ${index + 1}`),
  definition: readCompatText(card, ["definition", "back", "answer", "content"], ""),
  topicId: readCompatText(card, ["topicId", "topic_id"], topics[0]?.id ?? "general"),
  relatedTerms: card.tags ?? [],
  tags: card.tags ?? [],
  example: card.hint ?? "",
  whyImportant: "KPSS'de kavramı doğru dönemle eşleştirmek soru eleme hızını artırır.",
}));

export function getGlossaryByTopic(topicIdOrSlug: string) {
  const topicItem = getTopicById(topicIdOrSlug) ?? getTopicBySlug(topicIdOrSlug);
  if (!topicItem) return [];
  return glossary.filter((item) => item.topicId === topicItem.id);
}

export const recommendations = studyRecommendations;
