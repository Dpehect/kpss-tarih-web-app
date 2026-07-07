import { topics } from "@/data/kpss-history";

export type PastQuestionTrend = {
  id: string;
  year: number;
  exam: string;
  topicId: string;
  topicTitle: string;
  sourceType: "trend";
  legalNote: string;
  pattern: string;
  stem: string;
  choices: Array<{
    id: string;
    text: string;
  }>;
  correctChoiceId: string;
  explanation: string;
  hint: string;
  questionNo: number;
};

export const officialOsymPastQuestionsUrl = "https://www.osym.gov.tr/TR,15071/kpss-cikmis-sorular.html";

const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];

const choiceIds = ["A", "B", "C", "D"] as const;

function pick<T>(items: T[], index: number, fallback: T): T {
  if (items.length === 0) return fallback;
  return items[Math.abs(index) % items.length] ?? fallback;
}

function topicBullets(topic: (typeof topics)[number]) {
  return topic.summary.flatMap((block) => block.bullets);
}

function makeChoices(correct: string, wrongs: string[], seed: number) {
  const safeWrongs = [
    ...wrongs,
    "Bu bilgi ilgili dönemin temel çerçevesiyle uyuşmaz.",
    "Bu seçenek konu ile dönem bağlantısını hatalı kurar.",
    "Bu ifade soruda verilen tarihsel bağlama uygun değildir."
  ].filter((item, index, array) => array.indexOf(item) === index && item !== correct);

  const options = [correct, ...safeWrongs.slice(0, 3)];
  const rotate = seed % 4;
  const rotated = [...options.slice(rotate), ...options.slice(0, rotate)];
  const correctIndex = rotated.indexOf(correct);

  return {
    choices: rotated.map((text, index) => ({
      id: choiceIds[index],
      text
    })),
    correctChoiceId: choiceIds[correctIndex]
  };
}

function naturalMistake(raw: string | undefined, topicTitle: string) {
  if (!raw) return `${topicTitle} sorularında kavramın hangi dönemde geçtiğine dikkat etmek gerekir.`;

  const lower = raw.toLocaleLowerCase("tr-TR");

  if (lower.includes("tımar") && lower.includes("özel mülkiyet")) {
    return "Tımar sistemi özel mülkiyet değildi; toprak devlete aitti, gelirleri hizmet karşılığı kullanılırdı.";
  }

  if (lower.includes("sanmak")) {
    const cleaned = raw.replace(/\s+sanmak\.?$/i, "").trim();
    return `${cleaned} şeklinde düşünmek yanıltır; kavramın dönemdeki işlevine bakmak gerekir.`;
  }

  if (lower.includes("karıştırmak")) {
    const cleaned = raw.replace(/\s+karıştırmak\.?$/i, "").trim();
    return `${cleaned} ayrımı sık karıştırılır; soruda verilen bağlam belirleyicidir.`;
  }

  return raw.endsWith(".") ? raw : `${raw}.`;
}

function buildPastQuestion(year: number, questionNo: number): PastQuestionTrend {
  const topic = topics[(questionNo + year) % topics.length];
  const keyword = pick(topic.mustKnow, questionNo + year, topic.keywords[0] ?? topic.title);
  const bullet = pick(topicBullets(topic), questionNo + year, topic.shortDescription);
  const timeline = pick(topic.quickTimeline, questionNo + year, { date: "", event: "" });
  const mistake = naturalMistake(pick(topic.commonMistakes, questionNo + year, ""), topic.title);

  const variant = questionNo % 4;

  const drafts = [
    {
      pattern: "kavram - dönem ilişkisi",
      stem: `${year} KPSS Tarih çalışması için ${topic.title} başlığında aşağıdaki bilgilerden hangisi doğrudur?`,
      correct: bullet,
      wrongs: [
        "Bu başlık yalnızca tarih ezberiyle çözülebilir; kavram bilgisi gerekmez.",
        "Konu, KPSS Tarih kapsamı dışında kalan bağımsız bir ayrıntıdır.",
        "Bu gelişmelerin dönemin siyasi ve sosyal yapısıyla ilgisi yoktur."
      ],
      explanation: `${topic.title} sorularında ${keyword} ve ilgili kavramların dönem içindeki yeri birlikte düşünülmelidir.`,
      hint: `${keyword} kavramının hangi olay, kurum veya sonuçla birlikte geçtiğine bak.`
    },
    {
      pattern: "kronoloji - sonuç ilişkisi",
      stem: `${timeline.date ? `${timeline.date} - ${timeline.event}` : topic.title} bilgisi dikkate alındığında hangi yorum yapılabilir?`,
      correct: timeline.event ? `${timeline.event}, ${topic.title} konusunun kronolojisi içinde yer alan önemli gelişmelerden biridir.` : bullet,
      wrongs: [
        "Bu bilgi konunun kronolojisiyle ilişkilendirilemez.",
        "Bu olay yalnızca coğrafya dersi kapsamında değerlendirilir.",
        "Soru kökündeki tarih bilgisi cevap için önemsizdir."
      ],
      explanation: `Çıkmış soru tarzında kronoloji bilgisi çoğu zaman olayın sonucuyla birlikte sorulur.`,
      hint: "Önce tarihi, sonra olayın hangi sonuçla bağlantılı olduğunu kontrol et."
    },
    {
      pattern: "sık karıştırılan bilgi",
      stem: `${topic.title} konusuyla ilgili aşağıdaki uyarılardan hangisi daha doğrudur?`,
      correct: mistake,
      wrongs: [
        "Benzer kavramlar arasında ayrım yapmak bu konuda gerekli değildir.",
        "Kavramların hangi döneme ait olduğu soru çözümünde belirleyici olmaz.",
        "Bu konudaki tüm gelişmeler aynı nedenle açıklanabilir."
      ],
      explanation: `Bu soru, ${topic.title} içinde sık karıştırılan noktayı ölçer.`,
      hint: "Yanlış seçenekler genellikle iki yakın kavramı aynı şey gibi gösterir."
    },
    {
      pattern: "anahtar kavram yorumu",
      stem: `${keyword} kavramı bir tarih sorusunda geçiyorsa aşağıdaki yaklaşımlardan hangisi daha uygundur?`,
      correct: `${keyword}, ${topic.title} konusunun ana kavramlarıyla birlikte değerlendirilmelidir.`,
      wrongs: [
        `${keyword} tek başına ezberlenirse her soru çözülebilir.`,
        `${keyword} bu konuyla bağlantısı olmayan güncel bir ifadedir.`,
        "Kavramın geçtiği dönem dikkate alınmadan cevap seçilebilir."
      ],
      explanation: `KPSS tarzı sorularda kavram, dönem ve sonuç ilişkisi birlikte yoklanır.`,
      hint: `${keyword} ifadesinin yanında verilen dönem ipucunu kaçırma.`
    }
  ];

  const draft = drafts[variant];
  const { choices, correctChoiceId } = makeChoices(draft.correct, draft.wrongs, year + questionNo);

  return {
    id: `past-${year}-${String(questionNo).padStart(2, "0")}`,
    year,
    exam: "KPSS Genel Kültür - Tarih",
    topicId: topic.id,
    topicTitle: topic.title,
    sourceType: "trend",
    legalNote: "Birebir ÖSYM sorusu değildir; çıkmış soru kapsamına uygun özgünleştirilmiş pratik sorudur.",
    pattern: draft.pattern,
    stem: draft.stem,
    choices,
    correctChoiceId,
    explanation: draft.explanation,
    hint: draft.hint,
    questionNo
  };
}

export const pastQuestionTrends: PastQuestionTrend[] = years.flatMap((year) =>
  Array.from({ length: 27 }, (_, index) => buildPastQuestion(year, index + 1))
);

export function getPastQuestionYears() {
  return years;
}

export function getPastQuestionsByYear(year: number) {
  return pastQuestionTrends.filter((question) => question.year === year);
}

export function getPastQuestionTopicSummary(year: number) {
  const questions = getPastQuestionsByYear(year);
  const counts = new Map<string, number>();

  for (const question of questions) {
    counts.set(question.topicTitle, (counts.get(question.topicTitle) ?? 0) + 1);
  }

  return Array.from(counts.entries()).map(([title, count]) => ({
    title,
    count
  }));
}
