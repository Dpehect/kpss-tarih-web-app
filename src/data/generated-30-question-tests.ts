import { topics } from "@/data/kpss-history";
import type { Difficulty, Question, QuestionChoice, Topic } from "@/types/study";

export type TestLevel = "kolay" | "orta" | "zor";

export type GeneratedQuestionTest = {
  id: string;
  topicId: string | "all";
  title: string;
  level: TestLevel;
  levelLabel: string;
  testNo: number;
  questionCount: number;
  questionIds: string[];
};

const levelLabels: Record<TestLevel, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor"
};

const internalDifficulty: Record<TestLevel, Difficulty> = {
  kolay: "temel",
  orta: "orta",
  zor: "ileri"
};

const choiceIds = ["A", "B", "C", "D"] as const;

function toSlug(value: string) {
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

function pick<T>(items: T[], index: number, fallback: T): T {
  if (items.length === 0) return fallback;
  return items[Math.abs(index) % items.length] ?? fallback;
}

function topicBullets(topic: Topic) {
  return topic.summary.flatMap((block) => block.bullets);
}

function naturalMistake(raw: string | undefined, topicTitle: string) {
  if (!raw) return `${topicTitle} sorularında kavramların hangi döneme ait olduğuna dikkat etmek gerekir.`;

  const text = raw.toLocaleLowerCase("tr-TR");

  if (text.includes("tımar") && text.includes("özel mülkiyet")) {
    return "Tımar sistemi özel mülkiyet değildi; toprak devlete aitti, gelirler hizmet karşılığı kullanılırdı.";
  }

  if (text.includes("sanmak")) {
    const cleaned = raw.replace(/\s+sanmak\.?$/i, "").trim();
    return `${cleaned} şeklinde düşünmek yanıltır; kavramın dönemdeki işlevine bakmak gerekir.`;
  }

  if (text.includes("karıştırmak")) {
    const cleaned = raw.replace(/\s+karıştırmak\.?$/i, "").trim();
    return `${cleaned} ayrımı bu konuda sık karıştırılır; soruda verilen bağlam dikkatle okunmalıdır.`;
  }

  if (text.includes("unutmak")) {
    const cleaned = raw.replace(/\s+unutmak\.?$/i, "").trim();
    return `${cleaned} çoğu soruda belirleyici olabilir; cevabı seçmeden önce bu noktayı kontrol etmek gerekir.`;
  }

  return raw.endsWith(".") ? raw : `${raw}.`;
}

function makeChoices(correct: string, wrongs: string[], seed: number): { choices: QuestionChoice[]; correctChoiceId: string } {
  const normalizedWrongs = [
    ...wrongs,
    "Bu bilgi verilen konuyla doğrudan ilgili değildir.",
    "Bu seçenek konunun temel sonucunu doğru açıklamaz.",
    "Bu ifade dönem ve kavram ilişkisini hatalı kurar."
  ].filter((item, index, array) => array.indexOf(item) === index && item !== correct);

  const options = [correct, ...normalizedWrongs.slice(0, 3)];
  const rotate = seed % 4;
  const rotated = [...options.slice(rotate), ...options.slice(0, rotate)];

  const choices = rotated.map((text, index) => ({
    id: choiceIds[index],
    text
  }));

  const correctIndex = rotated.indexOf(correct);

  return {
    choices,
    correctChoiceId: choiceIds[correctIndex]
  };
}

function easyQuestion(topic: Topic, testNo: number, questionNo: number): Omit<Question, "id" | "topicId" | "type" | "difficulty" | "choices" | "correctChoiceId"> & { correct: string; wrongs: string[] } {
  const bullets = topicBullets(topic);
  const keyword = pick(topic.mustKnow, questionNo + testNo, topic.keywords[0] ?? topic.title);
  const bullet = pick(bullets, questionNo + testNo, `${keyword} bu konunun temel bilgilerinden biridir.`);
  const timeline = pick(topic.quickTimeline, questionNo + testNo, { date: "", event: "" });

  const variants = [
    {
      stem: `${topic.title} konusunda aşağıdaki bilgilerden hangisi doğrudur?`,
      correct: bullet,
      wrongs: [
        "Bu konu yalnızca bir antlaşma maddesinden ibarettir.",
        "Bu başlıkta kurumlar ve kavramlar sınav açısından önemli değildir.",
        "Bu konudaki gelişmelerin kronolojiyle ilgisi yoktur."
      ],
      explanation: `${topic.title} başlığında ${keyword} ve ilgili kavramlar temel bilgi düzeyinde bilinmelidir.`,
      examTip: `${keyword} kavramını konu içindeki görev veya sonucuyla birlikte öğren.`
    },
    {
      stem: `${keyword} kavramı bu konuda neden önemlidir?`,
      correct: `${keyword}, ${topic.title} konusunun ayırt edici kavramlarından biridir.`,
      wrongs: [
        `${keyword} yalnızca çağdaş Türk tarihiyle ilgilidir.`,
        `${keyword} bu konunun dışında kalan bir coğrafya terimidir.`,
        `${keyword} sınavlarda herhangi bir tarihsel bağlam taşımaz.`
      ],
      explanation: `${keyword}, bu başlıkta diğer kavramlarla birlikte sorulabilecek temel bir ipucudur.`,
      examTip: `Kavramı ezberlemek yerine hangi kurum, olay veya sonuçla birlikte kullanıldığını kontrol et.`
    },
    {
      stem: `${timeline.date ? `${timeline.date} tarihiyle verilen ${timeline.event} bilgisi` : `${topic.title} kronolojisi`} için aşağıdakilerden hangisi söylenebilir?`,
      correct: timeline.event ? `${timeline.event}, ${topic.title} kronolojisinde yer alan önemli gelişmelerden biridir.` : bullet,
      wrongs: [
        "Bu bilgi ilgili dönemin kronolojisiyle bağlantılı değildir.",
        "Bu gelişme yalnızca ekonomik bir kavram olarak değerlendirilir.",
        "Bu olay konunun temel çerçevesi dışında kalır."
      ],
      explanation: `Bu soru, konunun temel kronolojisini ve ana kavramlarını birlikte yoklar.`,
      examTip: `Tarihleri olay adıyla birlikte öğrenmek soru çözümünü hızlandırır.`
    }
  ];

  return variants[(questionNo + testNo) % variants.length];
}

function mediumQuestion(topic: Topic, testNo: number, questionNo: number): Omit<Question, "id" | "topicId" | "type" | "difficulty" | "choices" | "correctChoiceId"> & { correct: string; wrongs: string[] } {
  const blocks = topic.summary;
  const block = pick(blocks, questionNo + testNo, blocks[0]);
  const bullet = pick(block?.bullets ?? [], questionNo, topic.shortDescription);
  const keyword = pick(topic.mustKnow, questionNo, topic.keywords[0] ?? topic.title);
  const mistake = naturalMistake(pick(topic.commonMistakes, questionNo, ""), topic.title);

  const variants = [
    {
      stem: `Bir KPSS sorusunda ${topic.title} başlığıyla birlikte ${keyword} vurgulanıyorsa hangi yorum daha uygundur?`,
      correct: bullet,
      wrongs: [
        "Sorunun çözümünde yalnızca tarih ezberi yeterlidir.",
        "Bu bilgi konunun siyasi, sosyal veya kurumsal yönleriyle ilişkilendirilemez.",
        "Bu kavramın dönemin genel yapısıyla bağlantısı yoktur."
      ],
      explanation: `${block?.heading ?? topic.title} bölümündeki temel bağlantı, sorunun ana ipucunu verir.`,
      examTip: `Orta düzey sorularda kavramın yanında verilen bağlama bak.`
    },
    {
      stem: `${topic.title} konusunda öğrencinin dikkat etmesi gereken nokta aşağıdakilerden hangisidir?`,
      correct: mistake,
      wrongs: [
        "Kavramlar arasındaki farklar sınavda belirleyici değildir.",
        "Bu konuda kronoloji bilgisi hiçbir soruda kullanılmaz.",
        "Bütün gelişmeler aynı sonuçla açıklanabilir."
      ],
      explanation: `Bu tür sorular genellikle benzer kavramları ayırmayı gerektirir.`,
      examTip: `Yanlış seçenekler çoğu zaman kavramları birbirinin yerine kullanır.`
    },
    {
      stem: `${topic.title} ile ilgili verilen kısa açıklamadan hangi sonuca ulaşılabilir?`,
      correct: topic.shortDescription,
      wrongs: [
        "Bu konu yalnızca Cumhuriyet dönemi inkılaplarıyla ilgilidir.",
        "Bu başlık, KPSS tarihinde bağımsız bir konu olarak değerlendirilmez.",
        "Bu bilgiler sadece coğrafya konularıyla ilişkilidir."
      ],
      explanation: `Konu açıklaması, başlığın sınavdaki kapsamını gösterir.`,
      examTip: `Kapsam sorularında anahtar kavramları birlikte düşün.`
    }
  ];

  return variants[(questionNo + testNo) % variants.length];
}

function hardQuestion(topic: Topic, testNo: number, questionNo: number): Omit<Question, "id" | "topicId" | "type" | "difficulty" | "choices" | "correctChoiceId"> & { correct: string; wrongs: string[] } {
  const mustKnow = pick(topic.mustKnow, questionNo + testNo, topic.keywords[0] ?? topic.title);
  const mistake = naturalMistake(pick(topic.commonMistakes, questionNo + testNo, ""), topic.title);
  const timeline = pick(topic.quickTimeline, questionNo + testNo, { date: "", event: "" });
  const bullet = pick(topicBullets(topic), questionNo + testNo, topic.shortDescription);

  const variants = [
    {
      stem: `${topic.title} konusunda seçici bir soruda hangi ayrım doğru kurulmuştur?`,
      correct: mistake,
      wrongs: [
        `${mustKnow} kavramı her dönemde aynı anlama gelir ve bağlama göre değişmez.`,
        "Benzer kavramlar arasında ayrım yapmak sınav için gerekli değildir.",
        "Soru kökündeki dönem bilgisi dikkate alınmadan cevap seçilebilir."
      ],
      explanation: `Zor sorular genellikle kavramı doğrudan sormaz; kavramın sınırını ve dönem içindeki işlevini yoklar.`,
      examTip: `Önce kavramın hangi dönemde ve hangi amaçla kullanıldığını belirle.`
    },
    {
      stem: `${timeline.event ? `${timeline.date} - ${timeline.event}` : topic.title} bilgisinden hareketle hangi değerlendirme yapılabilir?`,
      correct: bullet,
      wrongs: [
        "Bu bilgi konunun temel sonuçlarından bağımsızdır.",
        "Olayın kronolojideki yeri cevap için önemsizdir.",
        "Bu gelişme yalnızca kültürel bir ayrıntı olarak kalır."
      ],
      explanation: `Seçici sorularda olayın tarihsel yeri ile kavramsal sonucu birlikte düşünülmelidir.`,
      examTip: `Olay, sonuç ve kavram üçlüsünü birlikte kur.`
    },
    {
      stem: `${topic.title} başlığında verilen bir paragrafta ${mustKnow} geçiyorsa hangi cevap daha güçlüdür?`,
      correct: `${mustKnow}, bu konunun ana kavramlarıyla birlikte değerlendirilmelidir; tek başına ezberlenmesi yeterli değildir.`,
      wrongs: [
        `${mustKnow} yalnızca isim olarak bilinirse tüm sorular çözülebilir.`,
        `${mustKnow} bu konuyla bağlantısı olmayan bir ayrıntıdır.`,
        "Paragraf sorularında kavramın işlevi dikkate alınmaz."
      ],
      explanation: `Paragraf tipi tarih sorularında kavramın görevi ve bağlamı doğru okunmalıdır.`,
      examTip: `Kavramı, soruda verilen olay veya kurumla eşleştir.`
    }
  ];

  return variants[(questionNo + testNo) % variants.length];
}

function buildQuestion(topic: Topic, level: TestLevel, testNo: number, questionNo: number): Question {
  const base =
    level === "kolay"
      ? easyQuestion(topic, testNo, questionNo)
      : level === "orta"
        ? mediumQuestion(topic, testNo, questionNo)
        : hardQuestion(topic, testNo, questionNo);

  const testId = `test-${topic.id}-${level}-${testNo}`;
  const { choices, correctChoiceId } = makeChoices(base.correct, base.wrongs, topic.id.length + testNo + questionNo);

  return {
    id: `${testId}-q${String(questionNo).padStart(2, "0")}`,
    topicId: topic.id,
    type: "single",
    difficulty: internalDifficulty[level],
    stem: base.stem,
    choices,
    correctChoiceId,
    explanation: base.explanation,
    examTip: base.examTip,
    tags: [topic.era, toSlug(topic.title), level]
  };
}

function buildQuestionTests() {
  const questions: Question[] = [];
  const tests: GeneratedQuestionTest[] = [];

  for (const topic of topics) {
    for (const level of ["kolay", "orta", "zor"] as const) {
      for (let testNo = 1; testNo <= 5; testNo += 1) {
        const testId = `test-${topic.id}-${level}-${testNo}`;
        const questionIds: string[] = [];

        for (let questionNo = 1; questionNo <= 30; questionNo += 1) {
          const question = buildQuestion(topic, level, testNo, questionNo);
          questions.push(question);
          questionIds.push(question.id);
        }

        tests.push({
          id: testId,
          topicId: topic.id,
          title: `${topic.title} ${levelLabels[level]} Test ${testNo}`,
          level,
          levelLabel: levelLabels[level],
          testNo,
          questionCount: 30,
          questionIds
        });
      }
    }
  }

  const mixedTests: GeneratedQuestionTest[] = [];

  for (const level of ["kolay", "orta", "zor"] as const) {
    for (let testNo = 1; testNo <= 5; testNo += 1) {
      const questionIds = Array.from({ length: 30 }, (_, index) => {
        const topic = topics[index % topics.length];
        const sourceQuestionNo = (index % 30) + 1;
        return `test-${topic.id}-${level}-${testNo}-q${String(sourceQuestionNo).padStart(2, "0")}`;
      });

      mixedTests.push({
        id: `mixed-${level}-${testNo}`,
        topicId: "all",
        title: `Karma ${levelLabels[level]} Test ${testNo}`,
        level,
        levelLabel: levelLabels[level],
        testNo,
        questionCount: 30,
        questionIds
      });
    }
  }

  return {
    questions,
    tests,
    mixedTests
  };
}

const generated = buildQuestionTests();

export const expandedQuestions = generated.questions;
export const topicQuestionTests = generated.tests;
export const mixedQuestionTests = generated.mixedTests;
export const allQuestionTests = [...topicQuestionTests, ...mixedQuestionTests];

const questionMap = new Map(expandedQuestions.map((question) => [question.id, question]));

export function getTestsForTopic(topicId: string) {
  if (topicId === "all") return mixedQuestionTests;
  return topicQuestionTests.filter((test) => test.topicId === topicId);
}

export function getQuestionsForTest(testId: string) {
  const test = allQuestionTests.find((item) => item.id === testId);

  if (!test) return [];

  return test.questionIds
    .map((questionId) => questionMap.get(questionId))
    .filter((question): question is Question => Boolean(question));
}

export function getTestCountsForTopic(topicId: string) {
  const tests = getTestsForTopic(topicId);

  return {
    kolay: tests.filter((test) => test.level === "kolay").length,
    orta: tests.filter((test) => test.level === "orta").length,
    zor: tests.filter((test) => test.level === "zor").length,
    totalTests: tests.length,
    totalQuestions: tests.reduce((sum, test) => sum + test.questionCount, 0)
  };
}
