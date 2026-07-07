import { flashcards as baseFlashcards, topics } from "@/data/kpss-history";
import type { Flashcard, Topic } from "@/types/study";

type CardSeed = {
  front: string;
  back: string;
  hint: string;
  tags: string[];
};

const MIN_GENERATED_CARDS_PER_TOPIC = 18;

function clean(value: string | undefined, fallback = "") {
  const text = (value ?? "")
    .replace(/\s+/g, " ")
    .replace(/\bL\d+:\s*/g, "")
    .replace(/["“”]/g, "")
    .trim();

  return text || fallback;
}

function sentence(value: string | undefined, fallback: string) {
  const text = clean(value, fallback).replace(/[.!?]+$/g, "");
  return `${text}.`;
}

function question(value: string | undefined, fallback: string) {
  const text = clean(value, fallback).replace(/[.!?]+$/g, "");
  return `${text}?`;
}

function short(value: string, max = 230) {
  const text = clean(value);

  if (text.length <= max) return text;

  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}.`;
}

function slug(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function unique(values: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const cleaned = clean(value);
    const key = cleaned.toLocaleLowerCase("tr-TR");

    if (!cleaned || seen.has(key)) continue;

    seen.add(key);
    result.push(cleaned);
  }

  return result;
}

function topicConcepts(topic: Topic) {
  return unique([...topic.mustKnow, ...topic.keywords]);
}

function summaryFacts(topic: Topic) {
  return topic.summary.flatMap((block) => [
    {
      title: block.heading,
      body: block.body
    },
    ...block.bullets.map((bullet) => ({
      title: block.heading,
      body: bullet
    }))
  ]);
}

function mistakeCorrection(mistake: string, topic: Topic) {
  const cleaned = clean(mistake);

  if (!cleaned) {
    return `${topic.title} konusunda kavramları dönem, kurum ve sonuç ilişkisiyle birlikte değerlendirmek gerekir.`;
  }

  if (cleaned.toLocaleLowerCase("tr-TR").includes("sanmak")) {
    return `${cleaned.replace(/\s+sanmak\.?$/i, "")} şeklindeki yorum hatalıdır; ${topic.title} içinde kavramın gerçek işlevi ve dönem bağlantısı kontrol edilmelidir.`;
  }

  if (cleaned.toLocaleLowerCase("tr-TR").includes("karıştırmak")) {
    return `${cleaned.replace(/\s+karıştırmak\.?$/i, "")} karıştırılmamalıdır; ${topic.title} içinde her kavram kendi görevi ve dönemiyle ayırt edilir.`;
  }

  if (cleaned.toLocaleLowerCase("tr-TR").includes("unutmak")) {
    return `${cleaned.replace(/\s+unutmak\.?$/i, "")} unutulmamalıdır; bu bilgi ${topic.title} sorularında ayırt edici olabilir.`;
  }

  return `${cleaned} ifadesi ${topic.title} çalışılırken özellikle kontrol edilmelidir.`;
}

function conceptCards(topic: Topic): CardSeed[] {
  return topicConcepts(topic).map((concept) => ({
    front: question(`${concept} kavramı ${topic.title} içinde nasıl bilinmeli`, `${topic.title} içinde bu kavram nasıl öğrenilmeli`),
    back: short(
      sentence(
        `${concept}, ${topic.title} kapsamında dönem, kurum, olay veya sonuç ilişkisini kurmak için kullanılan temel kavramlardan biridir. ${topic.shortDescription}`,
        topic.shortDescription
      )
    ),
    hint: `${concept} kavramını tek başına değil, ${topic.title} başlığının ana fikriyle birlikte düşün.`,
    tags: [topic.era, slug(topic.title), slug(concept), "kavram"]
  }));
}

function summaryCards(topic: Topic): CardSeed[] {
  return summaryFacts(topic).map((fact, index) => ({
    front: question(`${topic.title} konusunda ${clean(fact.title)} başlığının ana fikri nedir`, `${topic.title} konusunda ana fikir nedir`),
    back: short(sentence(`${topic.title} içinde ${fact.body}`, topic.shortDescription)),
    hint: `${clean(fact.title)} başlığını konu özetiyle eşleştir.`,
    tags: [topic.era, slug(topic.title), `ozet-${index + 1}`]
  }));
}

function timelineCards(topic: Topic): CardSeed[] {
  return topic.quickTimeline.map((event) => ({
    front: question(`${topic.title} kronolojisinde ${clean(event.date)} hangi gelişmeyle ilişkilidir`, `${topic.title} kronolojisinde bu tarih neyi ifade eder`),
    back: short(sentence(`${clean(event.date)} tarihi ${topic.title} içinde ${clean(event.event)} gelişmesiyle ilişkilidir`, topic.shortDescription)),
    hint: "Tarih ve olayı birlikte hatırla; sadece yılı ezberleme.",
    tags: [topic.era, slug(topic.title), "kronoloji", slug(event.date)]
  }));
}

function mistakeCards(topic: Topic): CardSeed[] {
  return topic.commonMistakes.map((mistake) => ({
    front: question(`${topic.title} konusunda sık yapılan hata nasıl düzeltilir: ${clean(mistake)}`, `${topic.title} konusunda sık hata nedir`),
    back: short(sentence(mistakeCorrection(mistake, topic), topic.shortDescription)),
    hint: "Bu kart çeldirici mantığını yakalamak için tasarlandı.",
    tags: [topic.era, slug(topic.title), "sik-hata"]
  }));
}

function comparisonCards(topic: Topic): CardSeed[] {
  const concepts = topicConcepts(topic);
  const cards: CardSeed[] = [];

  for (let index = 0; index < concepts.length - 1; index += 1) {
    const first = concepts[index];
    const second = concepts[index + 1];

    cards.push({
      front: question(`${topic.title} çalışırken ${first} ve ${second} birlikte nasıl düşünülmeli`, `${topic.title} içinde bu kavramlar nasıl ilişkilendirilmeli`),
      back: short(
        sentence(
          `${first} ve ${second}, ${topic.title} içinde aynı konu bağlamının farklı parçalarıdır. Sınavda bu kavramları dönem, kurum, olay ve sonuç ilişkisiyle ayırt etmek gerekir`,
          topic.shortDescription
        )
      ),
      hint: "İki kavramı aynı konu haritasında konumlandır.",
      tags: [topic.era, slug(topic.title), slug(first), slug(second), "iliski"]
    });
  }

  return cards;
}

function examTipCards(topic: Topic): CardSeed[] {
  const concepts = topicConcepts(topic).slice(0, 3);

  return [
    {
      front: question(`${topic.title} sorularında ilk kontrol edilmesi gereken şey nedir`, `${topic.title} sınavda nasıl çözülür`),
      back: short(
        sentence(
          `${topic.title} sorularında önce dönem ve konu başlığı belirlenmeli, ardından ${concepts.join(", ")} gibi ana kavramların işlevi kontrol edilmelidir`,
          topic.shortDescription
        )
      ),
      hint: "Önce dönem, sonra kavram, en son sonuç ilişkisi.",
      tags: [topic.era, slug(topic.title), "sinav-taktigi"]
    },
    {
      front: question(`${topic.title} konusunda çeldiriciler genellikle nereden gelir`, `${topic.title} çeldirici mantığı nedir`),
      back: short(
        sentence(
          `Bu konuda çeldiriciler genellikle benzer kavramları karıştırmaktan, olayları yanlış döneme yerleştirmekten veya sonucu eksik yorumlamaktan gelir`,
          topic.shortDescription
        )
      ),
      hint: "Şıkta verilen bilginin doğru konuya ve doğru döneme ait olup olmadığını kontrol et.",
      tags: [topic.era, slug(topic.title), "celdirici"]
    }
  ];
}

function ensureMinimumCards(topic: Topic, seeds: CardSeed[]) {
  const result = [...seeds];

  let index = 0;

  while (result.length < MIN_GENERATED_CARDS_PER_TOPIC) {
    const concept = topicConcepts(topic)[index % Math.max(1, topicConcepts(topic).length)] ?? topic.title;

    result.push({
      front: question(`${topic.title} konusunda ${concept} neden ayırt edici kabul edilir`, `${topic.title} konusunda bu kavram neden önemlidir`),
      back: short(
        sentence(
          `${concept}, ${topic.title} içinde sınavda kavram-dönem-sonuç ilişkisi kurmak için kullanılan ayırt edici başlıklardan biridir`,
          topic.shortDescription
        )
      ),
      hint: "Kavramı konu başlığından koparma.",
      tags: [topic.era, slug(topic.title), slug(concept), "tamamlama"]
    });

    index += 1;
  }

  return result;
}

function dedupeCards(cards: CardSeed[]) {
  const seen = new Set<string>();
  const result: CardSeed[] = [];

  for (const card of cards) {
    const key = `${clean(card.front).toLocaleLowerCase("tr-TR")}::${clean(card.back).toLocaleLowerCase("tr-TR")}`;

    if (seen.has(key)) continue;

    seen.add(key);
    result.push(card);
  }

  return result;
}

function buildTopicCards(topic: Topic) {
  const seeds = dedupeCards([
    ...conceptCards(topic),
    ...summaryCards(topic),
    ...timelineCards(topic),
    ...mistakeCards(topic),
    ...comparisonCards(topic),
    ...examTipCards(topic)
  ]);

  return ensureMinimumCards(topic, seeds).map((card, index): Flashcard => ({
    id: `gf-${topic.id}-${String(index + 1).padStart(2, "0")}`,
    topicId: topic.id,
    front: card.front,
    back: card.back,
    hint: card.hint,
    tags: unique([topic.era, slug(topic.title), ...card.tags])
  }));
}

const generatedFlashcards = topics.flatMap(buildTopicCards);

const baseIds = new Set(baseFlashcards.map((card) => card.id));

export const generatedTopicFlashcards = generatedFlashcards.filter((card) => !baseIds.has(card.id));

export const expandedFlashcards: Flashcard[] = [
  ...baseFlashcards,
  ...generatedTopicFlashcards
];

export const flashcards = expandedFlashcards;

export function getFlashcardsForTopic(topicId: string) {
  return expandedFlashcards.filter((card) => card.topicId === topicId);
}

export function getExpandedFlashcardAuditReport() {
  const errors: string[] = [];
  const warnings: string[] = [];
  const validTopicIds = new Set(topics.map((topic) => topic.id));
  const ids = new Set<string>();
  const byTopic = new Map<string, Flashcard[]>();

  for (const topic of topics) {
    byTopic.set(topic.id, []);
  }

  if (expandedFlashcards.length < baseFlashcards.length * 2) {
    errors.push(`Kart sayısı iki katına çıkmamış: ${expandedFlashcards.length} / taban ${baseFlashcards.length}`);
  }

  for (const card of expandedFlashcards) {
    if (ids.has(card.id)) {
      errors.push(`Tekrarlanan kart id: ${card.id}`);
    }

    ids.add(card.id);

    if (!validTopicIds.has(card.topicId)) {
      errors.push(`Geçersiz topicId: ${card.id} -> ${card.topicId}`);
      continue;
    }

    byTopic.get(card.topicId)?.push(card);

    if (clean(card.front).length < 18) {
      errors.push(`Ön yüz zayıf: ${card.id}`);
    }

    if (clean(card.back).length < 45) {
      errors.push(`Arka yüz zayıf: ${card.id}`);
    }

    if (clean(card.hint).length < 15) {
      errors.push(`İpucu zayıf: ${card.id}`);
    }

    if (!Array.isArray(card.tags) || card.tags.length < 2) {
      errors.push(`Etiket eksik: ${card.id}`);
    }
  }

  for (const topic of topics) {
    const cards = byTopic.get(topic.id) ?? [];

    if (cards.length < MIN_GENERATED_CARDS_PER_TOPIC) {
      errors.push(`${topic.title} için kart sayısı düşük: ${cards.length}`);
    }

    const topicTitle = topic.title.toLocaleLowerCase("tr-TR");
    const relatedCards = cards.filter((card) => {
      const joined = `${card.front} ${card.back} ${card.hint}`.toLocaleLowerCase("tr-TR");
      return joined.includes(topicTitle) || topic.keywords.some((keyword) => joined.includes(keyword.toLocaleLowerCase("tr-TR"))) || topic.mustKnow.some((item) => joined.includes(item.toLocaleLowerCase("tr-TR")));
    });

    if (relatedCards.length < Math.ceil(cards.length * 0.8)) {
      warnings.push(`${topic.title} kartlarının bir kısmı konu başlığı/kavram ile zayıf bağ kuruyor olabilir.`);
    }

    const frontSet = new Set(cards.map((card) => clean(card.front).toLocaleLowerCase("tr-TR")));
    if (frontSet.size !== cards.length) {
      warnings.push(`${topic.title} içinde benzer ön yüzler olabilir.`);
    }
  }

  return {
    ok: errors.length === 0,
    constants: {
      baseFlashcardCount: baseFlashcards.length,
      generatedFlashcardCount: generatedTopicFlashcards.length,
      expandedFlashcardCount: expandedFlashcards.length,
      topicCount: topics.length,
      minGeneratedCardsPerTopic: MIN_GENERATED_CARDS_PER_TOPIC
    },
    errors,
    warnings
  };
}
