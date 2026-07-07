import { topics } from "@/data/kpss-history";
import type { Difficulty, Question, QuestionChoice, Topic } from "@/types/study";

export type TestLevel = "kolay" | "orta" | "zor";

type QuestionModel = {
  stem: string;
  correct: string;
  explanation: string;
  examTip: string;
  focus: "bilgi" | "kavram" | "kronoloji" | "yorum" | "ayrim";
};

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

export const TESTS_PER_LEVEL = 20;
export const QUESTIONS_PER_TEST = 30;

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

const bannedArtificialPhrases = [
  "alfabetik",
  "coğrafya dersi",
  "güncel yorum",
  "paragrafın uzunluğu",
  "tamamen kopuk",
  "hiçbir işlevi yoktur",
  "tüm tarih soruları",
  "her soru çözülebilir",
  "önemsizdir",
  "gerekli değildir",
  "dikkate alınmamalıdır"
];

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

function cleanSentence(value: string, fallback: string) {
  const text = value.replace(/\s+/g, " ").trim();

  if (!text) return fallback;
  return text.endsWith(".") || text.endsWith("?") || text.endsWith("!") ? text : `${text}.`;
}

function pick<T>(items: T[], index: number, fallback: T): T {
  if (items.length === 0) return fallback;
  return items[Math.abs(index) % items.length] ?? fallback;
}

function topicBullets(topic: Topic) {
  return topic.summary.flatMap((block) => block.bullets);
}

function topicFacts(topic: Topic) {
  const bullets = topicBullets(topic);
  const timelineFacts = topic.quickTimeline.map((item) => `${item.date} - ${item.event}`);
  const kavramFacts = topic.mustKnow.map((item) => `${item}, ${topic.title} başlığı içinde bilinmesi gereken temel kavramlardan biridir.`);
  const summaryFacts = topic.summary.map((item) => cleanSentence(item.body, topic.shortDescription));

  return [...bullets, ...timelineFacts, ...kavramFacts, ...summaryFacts]
    .map((item) => cleanSentence(item, topic.shortDescription))
    .filter((item, index, array) => item.length > 18 && array.indexOf(item) === index);
}

function factsFromOtherTopics(topicId: string) {
  return topics
    .filter((topic) => topic.id !== topicId)
    .flatMap((topic) => topicFacts(topic).map((fact) => ({ topic, fact })));
}

function naturalizeMistake(raw: string | undefined, topic: Topic) {
  if (!raw) {
    return `${topic.title} sorularında kavramın dönemini ve kurumla bağlantısını karıştırmamak gerekir.`;
  }

  const lower = raw.toLocaleLowerCase("tr-TR");

  if (lower.includes("tımar") && lower.includes("özel mülkiyet")) {
    return "Tımar sistemi özel mülkiyet değildir; toprak devlete ait olup dirlik gelirleri hizmet karşılığı kullanılır.";
  }

  if (lower.includes("modern parlamento")) {
    return "Kurultay, modern anlamda yasama yetkisine sahip parlamento değildir; danışma ve karar alma geleneğiyle değerlendirilmelidir.";
  }

  if (lower.includes("sanmak")) {
    const cleaned = raw.replace(/\s+sanmak\.?$/i, "").trim();

    return `${cleaned} şeklinde düşünmek hatalıdır; kavramın dönemdeki işlevi dikkate alınmalıdır.`;
  }

  if (lower.includes("karıştırmak")) {
    const cleaned = raw.replace(/\s+karıştırmak\.?$/i, "").trim();

    return `${cleaned} ayrımı sınavda önemlidir; iki kavramın dönem ve işlev farkı kontrol edilmelidir.`;
  }

  if (lower.includes("unutmak")) {
    const cleaned = raw.replace(/\s+unutmak\.?$/i, "").trim();

    return `${cleaned} bilgisi cevap seçiminde belirleyici olabilir.`;
  }

  return cleanSentence(raw, `${topic.title} için sık karıştırılan bilgiye dikkat edilmelidir.`);
}

function plausibleWrongChoices(topic: Topic, correct: string, seed: number) {
  const foreignFacts = factsFromOtherTopics(topic.id);
  const topicKeywords = topic.mustKnow.concat(topic.keywords).filter(Boolean);
  const wrongs: string[] = [];

  for (let i = 0; i < foreignFacts.length && wrongs.length < 3; i += 1) {
    const item = foreignFacts[(seed * 7 + i * 5) % foreignFacts.length];

    if (!item) continue;

    const fact = item.fact;
    const tooSimilar = fact === correct || correct.includes(fact) || fact.includes(correct);
    const tooLong = fact.length > 180;

    if (!tooSimilar && !tooLong) {
      wrongs.push(fact);
    }
  }

  const contextualWrongs = [
    `${pick(topicKeywords, seed, topic.title)} kavramı bu konuda yalnızca sonuçlarıyla değil, geçtiği dönem ve kurumla birlikte değerlendirilmelidir.`,
    `${topic.title} başlığında doğru cevap, olayın sadece adıyla değil neden-sonuç bağlantısıyla bulunur.`,
    `${topic.title} sorularında benzer kavramlar aynı anlamda kabul edilmemelidir.`
  ];

  for (const item of contextualWrongs) {
    if (wrongs.length >= 3) break;
    if (item !== correct && !wrongs.includes(item)) wrongs.push(item);
  }

  return wrongs.slice(0, 3);
}

function makeChoices(topic: Topic, correct: string, seed: number): { choices: QuestionChoice[]; correctChoiceId: string } {
  const correctText = cleanSentence(correct, topic.shortDescription);
  const wrongs = plausibleWrongChoices(topic, correctText, seed)
    .map((item) => cleanSentence(item, ""))
    .filter((item) => item && item !== correctText)
    .filter((item, index, array) => array.indexOf(item) === index)
    .slice(0, 3);

  while (wrongs.length < 3) {
    wrongs.push(`${topic.title} kapsamında bu ifade eksik veya yanlış bağlamda kullanılmıştır.`);
  }

  const options = [correctText, ...wrongs.slice(0, 3)];
  const rotate = Math.abs(seed) % 4;
  const rotated = [...options.slice(rotate), ...options.slice(0, rotate)];
  const choices = rotated.map((text, index) => ({
    id: choiceIds[index],
    text
  }));

  return {
    choices,
    correctChoiceId: choiceIds[rotated.indexOf(correctText)]
  };
}

function easyModel(topic: Topic, testNo: number, questionNo: number): QuestionModel {
  const facts = topicFacts(topic);
  const bullet = pick(facts, testNo + questionNo, topic.shortDescription);
  const keyword = pick(topic.mustKnow, testNo + questionNo, topic.keywords[0] ?? topic.title);
  const timeline = pick(topic.quickTimeline, testNo + questionNo, { date: "", event: "" });

  const models: QuestionModel[] = [
    {
      stem: `${topic.title} konusunda aşağıdaki bilgilerden hangisi doğrudur?`,
      correct: bullet,
      explanation: `Doğru seçenek, ${topic.title} başlığının temel bilgisini verir. Bu düzeyde amaç kavramı veya olayı doğru tanımaktır.`,
      examTip: `${keyword} kavramını ait olduğu dönem ve sonuçla birlikte öğren.`,
      focus: "bilgi"
    },
    {
      stem: `${keyword} kavramı aşağıdaki açıklamalardan hangisiyle daha doğru ilişkilendirilir?`,
      correct: `${keyword}, ${topic.title} konusu içinde bilinmesi gereken ana kavramlardan biridir.`,
      explanation: `Bu soru kavramın hangi konu başlığına ait olduğunu ve nasıl kullanılacağını ölçer.`,
      examTip: "Kavram sorularında önce kavramın geçtiği dönemi bul.",
      focus: "kavram"
    },
    {
      stem: `${timeline.date ? `${timeline.date} - ${timeline.event}` : topic.title} bilgisi için hangi ifade doğrudur?`,
      correct: timeline.event ? `${timeline.event}, ${topic.title} kronolojisinde yer alan önemli gelişmelerden biridir.` : bullet,
      explanation: `Kronoloji sorularında olayın yılı, adı ve hangi konuyla bağlantılı olduğu birlikte düşünülmelidir.`,
      examTip: "Tarihi tek başına değil, olay adıyla beraber tekrar et.",
      focus: "kronoloji"
    }
  ];

  return models[(testNo + questionNo) % models.length];
}

function mediumModel(topic: Topic, testNo: number, questionNo: number): QuestionModel {
  const facts = topicFacts(topic);
  const bullet = pick(facts, testNo * 2 + questionNo, topic.shortDescription);
  const keyword = pick(topic.mustKnow, testNo + questionNo, topic.keywords[0] ?? topic.title);
  const secondKeyword = pick(topic.mustKnow, testNo + questionNo + 2, topic.keywords[1] ?? keyword);
  const mistake = naturalizeMistake(pick(topic.commonMistakes, testNo + questionNo, ""), topic);

  const models: QuestionModel[] = [
    {
      stem: `${topic.title} başlığında verilen bir soruda hangi yorum daha tutarlıdır?`,
      correct: bullet,
      explanation: `Orta düzey sorularda bilgi yalnızca ezber olarak değil, konu içindeki yeriyle birlikte sorulur.`,
      examTip: "Doğru cevap genellikle kavram + olay + sonuç ilişkisini birlikte verir.",
      focus: "yorum"
    },
    {
      stem: `${keyword} ve ${secondKeyword} birlikte düşünülürse hangi ifade daha anlamlıdır?`,
      correct: `${keyword} ve ${secondKeyword}, ${topic.title} konusu içinde dönem ve kavram ilişkisi kurmak için birlikte değerlendirilebilir.`,
      explanation: `Bu soru iki kavram arasında konu bağı kurmayı ölçer.`,
      examTip: "İki kavram aynı soruda verilirse önce ortak konu başlığını belirle.",
      focus: "kavram"
    },
    {
      stem: `${topic.title} konusunda sık yapılan hatalardan kaçınmak için hangi bilgi dikkate alınmalıdır?`,
      correct: mistake,
      explanation: `Orta düzey sorular çoğu zaman benzer kavramları birbirinden ayırmayı gerektirir.`,
      examTip: "Çeldiriciler genellikle doğru kavramı yanlış dönem veya yanlış kurumla verir.",
      focus: "ayrim"
    }
  ];

  return models[(testNo * 2 + questionNo) % models.length];
}

function hardModel(topic: Topic, testNo: number, questionNo: number): QuestionModel {
  const facts = topicFacts(topic);
  const bullet = pick(facts, testNo * 3 + questionNo, topic.shortDescription);
  const timeline = pick(topic.quickTimeline, testNo + questionNo, { date: "", event: "" });
  const keyword = pick(topic.mustKnow, testNo + questionNo, topic.keywords[0] ?? topic.title);
  const mistake = naturalizeMistake(pick(topic.commonMistakes, testNo + questionNo, ""), topic);

  const models: QuestionModel[] = [
    {
      stem: `${topic.title} konusunda seçici bir soruda hangi çıkarım yapılabilir?`,
      correct: bullet,
      explanation: `Zor düzeyde doğru cevap, bilgiyi doğrudan tekrar etmekten çok olayın bağlamını ve sonucunu doğru kurar.`,
      examTip: "Çıkarım sorusunda seçenekleri konu başlığının ana sonucu ile karşılaştır.",
      focus: "yorum"
    },
    {
      stem: `${timeline.event ? `${timeline.date} - ${timeline.event}` : keyword} bilgisinden hareketle hangi değerlendirme daha doğrudur?`,
      correct: timeline.event ? `${timeline.event}, ${topic.title} içinde kronolojik ve kavramsal bağ kurmak için kullanılabilecek bir gelişmedir.` : bullet,
      explanation: `Zor kronoloji soruları olayın tarihini değil, olayın hangi süreç içinde anlam kazandığını ölçer.`,
      examTip: "Olayın öncesini, sonrasını ve hangi kavramla bağlandığını kontrol et.",
      focus: "kronoloji"
    },
    {
      stem: `${topic.title} başlığında çeldiriciyi ayırmak için hangi bilgi daha belirleyicidir?`,
      correct: mistake,
      explanation: `Seçici sorularda çeldirici tamamen uydurma olmayabilir; doğru kavram yanlış bağlama yerleştirilir.`,
      examTip: "Kavramın hem dönemini hem işlevini kontrol etmeden cevap verme.",
      focus: "ayrim"
    }
  ];

  return models[(testNo * 3 + questionNo) % models.length];
}

function questionModel(topic: Topic, level: TestLevel, testNo: number, questionNo: number) {
  if (level === "kolay") return easyModel(topic, testNo, questionNo);
  if (level === "orta") return mediumModel(topic, testNo, questionNo);
  return hardModel(topic, testNo, questionNo);
}

function questionType(focus: QuestionModel["focus"], questionNo: number): Question["type"] {
  if (focus === "kronoloji") return "chronology";
  if (focus === "yorum" || questionNo % 8 === 0) return "case";
  return "single";
}

function buildQuestion(topic: Topic, level: TestLevel, testNo: number, questionNo: number): Question {
  const model = questionModel(topic, level, testNo, questionNo);
  const testId = `test-${topic.id}-${level}-${testNo}`;
  const { choices, correctChoiceId } = makeChoices(topic, model.correct, topic.id.length + testNo * 17 + questionNo * 11);

  return {
    id: `${testId}-q${String(questionNo).padStart(2, "0")}`,
    topicId: topic.id,
    type: questionType(model.focus, questionNo),
    difficulty: internalDifficulty[level],
    stem: cleanSentence(model.stem, `${topic.title} konusunda doğru bilgi hangisidir?`).replace(/\.$/, "?"),
    choices,
    correctChoiceId,
    explanation: cleanSentence(model.explanation, "Doğru cevap konu bilgisini ve tarihsel bağlamı birlikte verir."),
    examTip: cleanSentence(model.examTip, "Cevap seçerken kavram, dönem ve sonuç ilişkisini birlikte kontrol et."),
    tags: [topic.era, toSlug(topic.title), level]
  };
}

function buildQuestionTests() {
  const questions: Question[] = [];
  const tests: GeneratedQuestionTest[] = [];

  for (const topic of topics) {
    for (const level of ["kolay", "orta", "zor"] as const) {
      for (let testNo = 1; testNo <= TESTS_PER_LEVEL; testNo += 1) {
        const testId = `test-${topic.id}-${level}-${testNo}`;
        const questionIds: string[] = [];

        for (let questionNo = 1; questionNo <= QUESTIONS_PER_TEST; questionNo += 1) {
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
          questionCount: QUESTIONS_PER_TEST,
          questionIds
        });
      }
    }
  }

  const mixedTests: GeneratedQuestionTest[] = [];

  for (const level of ["kolay", "orta", "zor"] as const) {
    for (let testNo = 1; testNo <= TESTS_PER_LEVEL; testNo += 1) {
      const questionIds = Array.from({ length: QUESTIONS_PER_TEST }, (_, index) => {
        const topic = topics[(index + testNo) % topics.length];
        const sourceQuestionNo = ((index * 5 + testNo) % QUESTIONS_PER_TEST) + 1;

        return `test-${topic.id}-${level}-${testNo}-q${String(sourceQuestionNo).padStart(2, "0")}`;
      });

      mixedTests.push({
        id: `mixed-${level}-${testNo}`,
        topicId: "all",
        title: `Karma ${levelLabels[level]} Test ${testNo}`,
        level,
        levelLabel: levelLabels[level],
        testNo,
        questionCount: QUESTIONS_PER_TEST,
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

export function getTestsForTopic(topicId: string, level?: TestLevel) {
  const tests = topicId === "all" ? mixedQuestionTests : topicQuestionTests.filter((test) => test.topicId === topicId);

  if (!level) return tests;

  return tests.filter((test) => test.level === level);
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

export function getQuestionBankQualityReport() {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Set<string>();

  for (const question of expandedQuestions) {
    if (ids.has(question.id)) errors.push(`Tekrarlanan soru id: ${question.id}`);
    ids.add(question.id);

    if (!question.stem || question.stem.length < 24) errors.push(`Kısa soru kökü: ${question.id}`);
    if (!question.explanation || question.explanation.length < 35) warnings.push(`Kısa açıklama: ${question.id}`);
    if (!question.examTip || question.examTip.length < 25) warnings.push(`Kısa sınav notu: ${question.id}`);
    if (question.choices.length !== 4) errors.push(`4 seçenek yok: ${question.id}`);

    const choiceTexts = new Set(question.choices.map((choice) => choice.text));

    if (choiceTexts.size !== question.choices.length) errors.push(`Tekrarlanan seçenek: ${question.id}`);
    if (!question.choices.some((choice) => choice.id === question.correctChoiceId)) errors.push(`Doğru seçenek id bulunamadı: ${question.id}`);

    const joined = [question.stem, question.explanation, question.examTip, ...question.choices.map((choice) => choice.text)]
      .join(" ")
      .toLocaleLowerCase("tr-TR");

    for (const phrase of bannedArtificialPhrases) {
      if (joined.includes(phrase)) {
        warnings.push(`Yapay/saçma kalıp olabilir (${phrase}): ${question.id}`);
      }
    }
  }

  for (const test of allQuestionTests) {
    if (test.questionIds.length !== QUESTIONS_PER_TEST) errors.push(`Test soru sayısı hatalı: ${test.id}`);
    if (new Set(test.questionIds).size !== test.questionIds.length) errors.push(`Test içinde tekrar eden soru: ${test.id}`);
  }

  return {
    ok: errors.length === 0 && warnings.length === 0,
    constants: {
      TESTS_PER_LEVEL,
      QUESTIONS_PER_TEST,
      topicCount: topics.length,
      topicTestCount: topicQuestionTests.length,
      mixedTestCount: mixedQuestionTests.length,
      expandedQuestionCount: expandedQuestions.length
    },
    errors,
    warnings
  };
}
