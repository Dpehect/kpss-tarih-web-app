import { topics } from "@/data/kpss-history";
import type { Difficulty, Question, QuestionChoice, Topic } from "@/types/study";

export type TestLevel = "kolay" | "orta" | "zor";

type QuestionFocus = "bilgi" | "kavram" | "kronoloji" | "yorum" | "ayrim";

type QuestionModel = {
  stem: string;
  answer: string;
  distractors: string[];
  explanation: string;
  examTip: string;
  focus: QuestionFocus;
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

function cleanText(value: string | undefined, fallback: string) {
  const text = (value ?? "")
    .replace(/\s+/g, " ")
    .replace(/\bL\d+:\s*/g, "")
    .trim();

  return text || fallback;
}

function sentence(value: string | undefined, fallback: string) {
  const text = cleanText(value, fallback);
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function question(value: string | undefined, fallback: string) {
  const text = cleanText(value, fallback).replace(/[.!?]+$/g, "");
  return `${text}?`;
}

function short(value: string, max = 170) {
  const text = cleanText(value, "");
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}.`;
}

function pick<T>(items: T[], index: number, fallback: T): T {
  if (items.length === 0) return fallback;
  return items[Math.abs(index) % items.length] ?? fallback;
}

function unique(items: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of items) {
    const cleaned = sentence(item, "").trim();
    if (!cleaned) continue;
    const key = cleaned.toLocaleLowerCase("tr-TR");
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(short(cleaned));
  }

  return result;
}

function topicBullets(topic: Topic) {
  return topic.summary.flatMap((block) => block.bullets.map((bullet) => sentence(bullet, topic.shortDescription)));
}

function topicBodyFacts(topic: Topic) {
  return topic.summary.map((block) => sentence(block.body, topic.shortDescription));
}

function topicTimelineFacts(topic: Topic) {
  return topic.quickTimeline.map((item) => sentence(`${item.date}: ${item.event}`, topic.shortDescription));
}

function conceptFacts(topic: Topic) {
  const allConcepts = unique([...topic.mustKnow, ...topic.keywords]);

  return allConcepts.map((concept) =>
    sentence(
      `${concept}, ${topic.title} içinde olay, kurum veya sonuç ilişkisini kurmak için kullanılan temel başlıklardan biridir`,
      topic.shortDescription
    )
  );
}

function topicFacts(topic: Topic) {
  return unique([
    ...topicBullets(topic),
    ...topicBodyFacts(topic),
    ...topicTimelineFacts(topic),
    ...conceptFacts(topic),
    topic.shortDescription
  ]).filter((item) => item.length >= 24);
}

function mistakeToFalseClaim(raw: string | undefined, topic: Topic) {
  const text = cleanText(raw, "");

  if (!text) {
    return sentence(`${topic.title} konusundaki kavramların dönem ve işlev farkı yoktur`, topic.shortDescription);
  }

  const lower = text.toLocaleLowerCase("tr-TR");

  if (lower.includes("tımar") && lower.includes("özel mülkiyet")) {
    return "Tımar sistemi özel mülkiyet olarak kabul edilir.";
  }

  if (lower.includes("modern parlamento")) {
    return "Kurultay modern anlamda yasama yetkisine sahip bir parlamento olarak çalışmıştır.";
  }

  if (lower.includes("başkent")) {
    const cleaned = text.replace(/\s+sanmak\.?$/i, "").trim();
    return sentence(`${cleaned} doğru bir bilgidir`, `${topic.title} içinde başkent bilgisi doğru verilmiştir.`);
  }

  if (lower.includes("sadece")) {
    return sentence(text.replace(/\s+sanmak\.?$/i, "").replace(/\s+düşünmek\.?$/i, ""), `${topic.title} yalnızca tek yönlü değerlendirilmelidir`);
  }

  if (lower.includes("sanmak")) {
    const cleaned = text.replace(/\s+sanmak\.?$/i, "").trim();
    return sentence(`${cleaned} doğru bir yorumdur`, `${topic.title} içinde kavram doğru yorumlanmıştır`);
  }

  if (lower.includes("karıştırmak")) {
    const cleaned = text.replace(/\s+karıştırmak\.?$/i, "").trim();
    return sentence(`${cleaned} arasında ayrım yapılmasına gerek yoktur`, `${topic.title} içinde ayrım gerekli değildir`);
  }

  if (lower.includes("unutmak")) {
    const cleaned = text.replace(/\s+unutmak\.?$/i, "").trim();
    return sentence(`${cleaned} bilgisi bu konuda dikkate alınmaz`, `${topic.title} içinde bu bilgi belirleyici değildir`);
  }

  return sentence(`${text} doğru kabul edilmelidir`, `${topic.title} içinde bu yorum doğrudur`);
}

function sameTopicWrongClaims(topic: Topic, seed: number) {
  const keyword = pick(topic.mustKnow.concat(topic.keywords), seed, topic.title);
  const timeline = pick(topic.quickTimeline, seed, { date: "", event: topic.title });
  const mistakeClaims = topic.commonMistakes.map((mistake) => mistakeToFalseClaim(mistake, topic));

  return unique([
    ...mistakeClaims,
    `${keyword}, ${topic.title} konusuyla ilişkilendirilemeyen bağımsız bir kavramdır.`,
    `${topic.title} içinde olay, kurum ve sonuç bağlantısı kurulmasına gerek yoktur.`,
    `${timeline.event}, ${topic.title} kronolojisiyle ilişkilendirilemez.`,
    `${topic.title} yalnızca tarih ezberiyle çözülebilecek bir başlıktır.`,
    `${topic.title} sorularında kavramın hangi döneme ait olduğu belirleyici değildir.`
  ]);
}

function chronologyPairs(topic: Topic) {
  const fallback = [{ date: "", event: topic.title }];
  const source = topic.quickTimeline.length > 0 ? topic.quickTimeline : fallback;

  return source.map((item) => ({
    date: cleanText(item.date, ""),
    event: cleanText(item.event, topic.title)
  }));
}

function shiftedChronologyDistractors(topic: Topic, correctDate: string, correctEvent: string, seed: number) {
  const pairs = chronologyPairs(topic);

  if (pairs.length <= 1) {
    return unique([
      `${correctDate || "Bu dönem"}: Bu gelişme ${topic.title} dışında değerlendirilir.`,
      `${correctDate || "Bu dönem"}: Bu gelişme yalnızca kültürel bir ayrıntıdır.`,
      `${correctDate || "Bu dönem"}: Bu gelişme konu kronolojisinde yer almaz.`
    ]);
  }

  const shifted = pairs
    .filter((pair) => pair.event !== correctEvent || pair.date !== correctDate)
    .map((pair, index) => {
      const dateSource = pairs[(seed + index + 1) % pairs.length] ?? pair;
      const wrongDate = dateSource.date === pair.date ? correctDate : dateSource.date;
      return sentence(`${wrongDate || "Bu dönem"}: ${pair.event}`, `${topic.title} kronolojisinde hatalı eşleştirme`);
    });

  return unique([
    ...shifted,
    `${correctDate || "Bu dönem"}: ${correctEvent} ${topic.title} dışındaki bir gelişmedir.`,
    `${correctDate || "Bu dönem"}: ${correctEvent} kronolojik bağ kurmak için kullanılmaz.`
  ]);
}

function buildConceptModel(topic: Topic, seed: number): QuestionModel {
  const keyword = pick(topic.mustKnow.concat(topic.keywords), seed, topic.title);
  const answer = sentence(
    `${keyword}, ${topic.title} kapsamında olay, kurum veya sonuç ilişkisini açıklayan temel kavramlardan biridir`,
    topic.shortDescription
  );

  const distractors = unique([
    `${keyword}, ${topic.title} başlığıyla ilişkilendirilemeyen bağımsız bir kavramdır.`,
    `${keyword}, yalnızca kelime anlamıyla öğrenilmelidir; tarihsel bağlamı aranmaz.`,
    `${keyword}, bu konuda dönem ve kurum ilişkisi kurmak için kullanılmaz.`,
    ...sameTopicWrongClaims(topic, seed)
  ]);

  return {
    stem: question(`${keyword} kavramı ${topic.title} içinde hangi bağlamda ele alınır`, `${topic.title} içinde bu kavram nasıl değerlendirilir`),
    answer,
    distractors,
    explanation: sentence(`${keyword} kavramı ${topic.title} başlığı içinde dönem, kurum veya sonuç ilişkisiyle anlam kazanır`, "Kavram konu bağlamıyla birlikte değerlendirilmelidir"),
    examTip: sentence("Kavram sorularında önce kavramın hangi döneme ve hangi kuruma bağlandığını belirle", "Kavramı konu başlığıyla eşleştir"),
    focus: "kavram"
  };
}

function buildKnowledgeModel(topic: Topic, seed: number): QuestionModel {
  const fact = pick(topicFacts(topic), seed, topic.shortDescription);
  const distractors = sameTopicWrongClaims(topic, seed);

  return {
    stem: question(`${topic.title} konusunda aşağıdaki bilgilerden hangisi doğrudur`, `${topic.title} konusunda doğru bilgi hangisidir`),
    answer: fact,
    distractors,
    explanation: sentence(`Doğru seçenek ${topic.title} başlığındaki temel bilgiyle ve konu bağlamıyla uyumludur`, "Doğru cevap konu bilgisini verir"),
    examTip: sentence("Bilgi sorularında seçeneğin aynı konu, doğru dönem ve doğru kavramla uyumlu olmasına dikkat et", "Konu-dönem uyumunu kontrol et"),
    focus: "bilgi"
  };
}

function buildChronologyModel(topic: Topic, seed: number): QuestionModel {
  const pairs = chronologyPairs(topic);
  const correct = pick(pairs, seed, pairs[0] ?? { date: "", event: topic.title });
  const answer = sentence(`${correct.date || "Bu dönem"}: ${correct.event}`, topic.shortDescription);

  return {
    stem: question(`${topic.title} kronolojisi için hangi tarih-olay eşleştirmesi doğrudur`, `${topic.title} kronolojisinde doğru eşleştirme hangisidir`),
    answer,
    distractors: shiftedChronologyDistractors(topic, correct.date, correct.event, seed),
    explanation: sentence(`${correct.event}, ${topic.title} kronolojisinde doğru tarihsel bağlamla verilmiştir`, "Doğru seçenek tarih ve olay uyumunu verir"),
    examTip: sentence("Kronoloji sorularında yalnızca yılı değil, olayın hangi süreç içinde yer aldığını da kontrol et", "Tarih-olay eşleşmesini birlikte öğren"),
    focus: "kronoloji"
  };
}

function buildInterpretationModel(topic: Topic, seed: number): QuestionModel {
  const fact = pick(topicFacts(topic), seed * 2, topic.shortDescription);
  const keyword = pick(topic.mustKnow.concat(topic.keywords), seed + 3, topic.title);

  return {
    stem: question(`${topic.title} başlığında verilen bir soruda hangi yorum daha tutarlıdır`, `${topic.title} için doğru yorum hangisidir`),
    answer: sentence(`${fact.replace(/\.$/, "")}; bu bilgi ${topic.title} içinde neden-sonuç ilişkisi kurmak için kullanılabilir`, topic.shortDescription),
    distractors: unique([
      `${keyword} bu konuda yalnızca ezberlenecek bir isimdir; sonuç ilişkisi kurulmaz.`,
      `${topic.title} içinde verilen gelişmeler birbirinden bağımsız kabul edilmelidir.`,
      `${topic.title} sorularında dönem, kurum ve sonuç ilişkisi aranmaz.`,
      ...sameTopicWrongClaims(topic, seed)
    ]),
    explanation: sentence(`Doğru yorum, ${topic.title} bilgisini konu içindeki neden-sonuç ilişkisiyle birlikte değerlendirir`, "Doğru yorum bağlam kurar"),
    examTip: sentence("Yorum sorularında seçenekleri olayın sonucu ve konu başlığının ana fikriyle karşılaştır", "Yorumda neden-sonuç bağına bak"),
    focus: "yorum"
  };
}

function buildMistakeModel(topic: Topic, seed: number): QuestionModel {
  const falseClaim = mistakeToFalseClaim(pick(topic.commonMistakes, seed, ""), topic);
  const trueFacts = topicFacts(topic);

  return {
    stem: question(`${topic.title} konusunda aşağıdaki ifadelerden hangisi hatalıdır`, `${topic.title} konusunda hatalı ifade hangisidir`),
    answer: falseClaim,
    distractors: unique([
      pick(trueFacts, seed, topic.shortDescription),
      pick(trueFacts, seed + 2, topic.shortDescription),
      pick(trueFacts, seed + 4, topic.shortDescription),
      ...conceptFacts(topic)
    ]),
    explanation: sentence(`Doğru cevap, ${topic.title} konusunda sık yapılan bir kavram veya dönem hatasını içerir`, "Seçilen ifade hatalıdır"),
    examTip: sentence("Hatalı ifade sorularında çeldiriciler genellikle doğru kavramı yanlış işlev veya yanlış dönemle verir", "Hatalı ifadede bağlam kaymasına dikkat et"),
    focus: "ayrim"
  };
}

function modelFor(topic: Topic, level: TestLevel, testNo: number, questionNo: number): QuestionModel {
  const seed = testNo * 31 + questionNo * 17 + topic.id.length;
  const cycle = level === "kolay"
    ? ["bilgi", "kavram", "kronoloji", "bilgi", "kavram"]
    : level === "orta"
      ? ["yorum", "bilgi", "kavram", "ayrim", "kronoloji"]
      : ["yorum", "ayrim", "kronoloji", "kavram", "bilgi"];

  const focus = cycle[(testNo + questionNo) % cycle.length];

  if (focus === "kavram") return buildConceptModel(topic, seed);
  if (focus === "kronoloji") return buildChronologyModel(topic, seed);
  if (focus === "yorum") return buildInterpretationModel(topic, seed);
  if (focus === "ayrim") return buildMistakeModel(topic, seed);
  return buildKnowledgeModel(topic, seed);
}

function questionType(focus: QuestionFocus, questionNo: number): Question["type"] {
  if (focus === "kronoloji") return "chronology";
  if (focus === "yorum" || questionNo % 7 === 0) return "case";
  return "single";
}

function enoughDistractors(topic: Topic, model: QuestionModel, seed: number) {
  const pool = unique([
    ...model.distractors,
    ...sameTopicWrongClaims(topic, seed + 9),
    `${topic.title} içinde kavramların ait olduğu dönem önem taşımaz.`,
    `${topic.title} başlığındaki gelişmeler sadece isim ezberiyle değerlendirilmelidir.`,
    `${topic.title} sorularında doğru cevap konu bağlamı kurulmadan bulunur.`
  ]).filter((item) => item !== sentence(model.answer, ""));

  while (pool.length < 3) {
    pool.push(sentence(`${topic.title} kapsamında bu seçenek eksik veya yanlış bağlamda verilmiştir`, topic.shortDescription));
  }

  return pool.slice(0, 3);
}

function makeChoices(topic: Topic, model: QuestionModel, seed: number): { choices: QuestionChoice[]; correctChoiceId: string } {
  const answerText = sentence(model.answer, topic.shortDescription);
  const distractors = enoughDistractors(topic, model, seed)
    .filter((item) => item !== answerText)
    .slice(0, 3);

  const options = unique([answerText, ...distractors]).slice(0, 4);

  while (options.length < 4) {
    options.push(sentence(`${topic.title} kapsamında bu seçenek yanlış bağlamda verilmiştir`, topic.shortDescription));
  }

  const rotate = Math.abs(seed) % 4;
  const rotated = [...options.slice(rotate), ...options.slice(0, rotate)].slice(0, 4);
  const correctIndex = rotated.findIndex((item) => item === answerText);
  const safeCorrectIndex = correctIndex >= 0 ? correctIndex : 0;

  return {
    choices: rotated.map((text, index) => ({
      id: choiceIds[index],
      text
    })),
    correctChoiceId: choiceIds[safeCorrectIndex]
  };
}

function buildQuestion(topic: Topic, level: TestLevel, testNo: number, questionNo: number): Question {
  const model = modelFor(topic, level, testNo, questionNo);
  const testId = `test-${topic.id}-${level}-${testNo}`;
  const seed = topic.id.length + testNo * 17 + questionNo * 11;
  const { choices, correctChoiceId } = makeChoices(topic, model, seed);

  return {
    id: `${testId}-q${String(questionNo).padStart(2, "0")}`,
    topicId: topic.id,
    type: questionType(model.focus, questionNo),
    difficulty: internalDifficulty[level],
    stem: question(model.stem, `${topic.title} konusunda doğru seçenek hangisidir`),
    choices,
    correctChoiceId,
    explanation: sentence(model.explanation, "Doğru cevap konu bilgisini ve tarihsel bağlamı birlikte verir."),
    examTip: sentence(model.examTip, "Cevap seçerken kavram, dönem ve sonuç ilişkisini birlikte kontrol et."),
    tags: [topic.era, toSlug(topic.title), level, model.focus]
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
          const questionItem = buildQuestion(topic, level, testNo, questionNo);
          questions.push(questionItem);
          questionIds.push(questionItem.id);
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

  return { questions, tests, mixedTests };
}

const generated = buildQuestionTests();

export const expandedQuestions = generated.questions;
export const topicQuestionTests = generated.tests;
export const mixedQuestionTests = generated.mixedTests;
export const allQuestionTests = [...topicQuestionTests, ...mixedQuestionTests];

const questionMap = new Map(expandedQuestions.map((questionItem) => [questionItem.id, questionItem]));

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
    .filter((questionItem): questionItem is Question => Boolean(questionItem));
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

  for (const questionItem of expandedQuestions) {
    if (ids.has(questionItem.id)) errors.push(`Tekrarlanan soru id: ${questionItem.id}`);
    ids.add(questionItem.id);

    if (!questionItem.stem || questionItem.stem.length < 24) errors.push(`Kısa soru kökü: ${questionItem.id}`);
    if (!questionItem.explanation || questionItem.explanation.length < 35) warnings.push(`Kısa açıklama: ${questionItem.id}`);
    if (!questionItem.examTip || questionItem.examTip.length < 25) warnings.push(`Kısa sınav notu: ${questionItem.id}`);
    if (questionItem.choices.length !== 4) errors.push(`4 seçenek yok: ${questionItem.id}`);

    const choiceTexts = new Set(questionItem.choices.map((choice) => choice.text));
    if (choiceTexts.size !== questionItem.choices.length) errors.push(`Tekrarlanan seçenek: ${questionItem.id}`);
    if (!questionItem.choices.some((choice) => choice.id === questionItem.correctChoiceId)) {
      errors.push(`Doğru seçenek id bulunamadı: ${questionItem.id}`);
    }

    const joined = [questionItem.stem, questionItem.explanation, questionItem.examTip, ...questionItem.choices.map((choice) => choice.text)]
      .join(" ")
      .toLocaleLowerCase("tr-TR");

    for (const phrase of bannedArtificialPhrases) {
      if (joined.includes(phrase)) {
        warnings.push(`Yapay/saçma kalıp olabilir (${phrase}): ${questionItem.id}`);
      }
    }

    if (questionItem.type === "chronology") {
      const allChoicesLookChronological = questionItem.choices.every((choice) => choice.text.includes(":"));
      if (!allChoicesLookChronological) {
        warnings.push(`Kronoloji sorusunda format uyumsuzluğu olabilir: ${questionItem.id}`);
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
