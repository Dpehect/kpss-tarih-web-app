import { topics } from "@/data/kpss-history";
import type { Difficulty, Question, QuestionChoice, Topic } from "@/types/study";

export type TestLevel = "kolay" | "orta" | "zor";

type AuditFocus = "bilgi" | "kavram" | "kronoloji" | "yorum" | "ipucu";
type FactKind = "summary" | "bullet" | "timeline" | "concept" | "mistake" | "short";

type TrustedFact = {
  id: string;
  kind: FactKind;
  text: string;
  keyword?: string;
  date?: string;
};

type QuestionModel = {
  focus: AuditFocus;
  stem: string;
  answer: string;
  distractors: string[];
  explanation: string;
  examTip: string;
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

const invalidCrossTopicExamples = [
  "I. Meşrutiyet 1876'da ilan edildi.",
  "II. Meşrutiyet 1908'de ilan edildi.",
  "Tanzimat Fermanı 1839'da ilan edildi.",
  "Islahat Fermanı 1856'da ilan edildi."
];

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

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();
}

function cleanText(value: string | undefined, fallback: string) {
  const text = (value ?? "")
    .replace(/\s+/g, " ")
    .replace(/\bL\d+:\s*/g, "")
    .replace(/["“”]/g, "")
    .trim();

  return text || fallback;
}

function ensureSentence(value: string | undefined, fallback: string) {
  const text = cleanText(value, fallback).replace(/\s+/g, " ");
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function ensureQuestion(value: string | undefined, fallback: string) {
  const text = cleanText(value, fallback).replace(/[.!?]+$/g, "");
  return `${text}?`;
}

function shorten(value: string, max = 145) {
  const text = cleanText(value, "");

  if (text.length <= max) {
    return text;
  }

  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}.`;
}

function pick<T>(items: T[], index: number, fallback: T): T {
  if (items.length === 0) return fallback;
  return items[Math.abs(index) % items.length] ?? fallback;
}

function uniqueTexts(items: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of items) {
    const cleaned = ensureSentence(item, "").trim();
    if (!cleaned) continue;

    const key = normalize(cleaned);
    if (seen.has(key)) continue;

    seen.add(key);
    result.push(shorten(cleaned));
  }

  return result;
}

function topicFactPrefix(topic: Topic, text: string) {
  const cleaned = shorten(text, 140).replace(/[.!?]+$/g, "");
  return ensureSentence(`${topic.title} kapsamında ${cleaned}`, topic.shortDescription);
}

function safeConcepts(topic: Topic) {
  return uniqueTexts([...topic.mustKnow, ...topic.keywords]).map((text) => text.replace(/[.!?]+$/g, ""));
}

function trustedFacts(topic: Topic): TrustedFact[] {
  const facts: TrustedFact[] = [];

  topic.summary.forEach((block, blockIndex) => {
    facts.push({
      id: `${topic.id}-summary-${blockIndex}`,
      kind: "summary",
      text: topicFactPrefix(topic, block.body)
    });

    block.bullets.forEach((bullet, bulletIndex) => {
      facts.push({
        id: `${topic.id}-bullet-${blockIndex}-${bulletIndex}`,
        kind: "bullet",
        text: topicFactPrefix(topic, bullet)
      });
    });
  });

  topic.quickTimeline.forEach((event, index) => {
    facts.push({
      id: `${topic.id}-timeline-${index}`,
      kind: "timeline",
      date: cleanText(event.date, ""),
      text: ensureSentence(`${topic.title} kronolojisinde ${cleanText(event.date, "ilgili dönem")}: ${cleanText(event.event, topic.shortDescription)}`, topic.shortDescription)
    });
  });

  safeConcepts(topic).forEach((concept, index) => {
    facts.push({
      id: `${topic.id}-concept-${index}`,
      kind: "concept",
      keyword: concept,
      text: ensureSentence(`${topic.title} konusunda ${concept} kavramı dönem, kurum ve sonuç ilişkisini kurmak için kullanılan temel başlıklardan biridir`, topic.shortDescription)
    });
  });

  if (topic.shortDescription) {
    facts.push({
      id: `${topic.id}-short`,
      kind: "short",
      text: topicFactPrefix(topic, topic.shortDescription)
    });
  }

  return dedupeFacts(facts);
}

function dedupeFacts(facts: TrustedFact[]) {
  const seen = new Set<string>();
  const result: TrustedFact[] = [];

  for (const fact of facts) {
    const key = normalize(fact.text);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(fact);
  }

  return result;
}

function commonWrongClaims(topic: Topic, seed: number) {
  const concepts = safeConcepts(topic);
  const conceptA = pick(concepts, seed, topic.title);
  const conceptB = pick(concepts, seed + 2, topic.title);
  const timeline = pick(topic.quickTimeline, seed, { date: "ilgili dönem", event: topic.title });

  const mistakeClaims = topic.commonMistakes.map((mistake, index) => {
    const cleaned = cleanText(mistake, "");

    if (!cleaned) {
      return `${topic.title} konusunda dönem, kurum ve sonuç ilişkisi kurulmasına gerek yoktur.`;
    }

    if (cleaned.toLocaleLowerCase("tr-TR").includes("sanmak")) {
      return `${topic.title} konusunda ${cleaned.replace(/\s+sanmak\.?$/i, "")} doğru kabul edilmelidir.`;
    }

    if (cleaned.toLocaleLowerCase("tr-TR").includes("karıştırmak")) {
      return `${topic.title} konusunda ${cleaned.replace(/\s+karıştırmak\.?$/i, "")} arasında ayrım yapılmasına gerek yoktur.`;
    }

    if (cleaned.toLocaleLowerCase("tr-TR").includes("unutmak")) {
      return `${topic.title} konusunda ${cleaned.replace(/\s+unutmak\.?$/i, "")} dikkate alınmaz.`;
    }

    return `${topic.title} konusunda ${cleaned} doğru bir yaklaşımdır.`;
  });

  return uniqueTexts([
    ...mistakeClaims,
    `${topic.title} konusunda ${conceptA} kavramının ait olduğu dönem ve kurum bağlantısı aranmaz.`,
    `${topic.title} başlığında ${conceptB} yalnızca ezberlenecek bir isimdir; tarihsel bağlamı yoktur.`,
    `${topic.title} kronolojisinde ${cleanText(timeline.event, topic.title)} gelişmesi konu bağlamı dışında değerlendirilir.`,
    `${topic.title} sorularında olayların neden-sonuç ilişkisi yerine yalnızca seçenek uzunluğu dikkate alınmalıdır.`,
    `${topic.title} konusunda kavramlar, kurumlar ve olaylar birbirinden tamamen bağımsız kabul edilmelidir.`,
    `${topic.title} başlığında doğru cevabı bulmak için dönem bilgisi kontrol edilmez.`
  ]);
}

function conceptWrongClaims(topic: Topic, keyword: string, seed: number) {
  return uniqueTexts([
    `${topic.title} konusunda ${keyword} kavramı konu dışı bir ayrıntı olarak kabul edilir.`,
    `${topic.title} içinde ${keyword} yalnızca kelime anlamıyla öğrenilir; dönem bağlantısı kurulmaz.`,
    `${topic.title} sorularında ${keyword} kavramı kurum, olay veya sonuç ilişkisiyle birlikte değerlendirilmez.`,
    `${topic.title} başlığında ${keyword} kavramının sınav sorularında ayırt edici değeri yoktur.`,
    ...commonWrongClaims(topic, seed)
  ]);
}

function chronologyFacts(topic: Topic) {
  const source = topic.quickTimeline.length > 0
    ? topic.quickTimeline
    : [{ date: "ilgili dönem", event: topic.shortDescription || topic.title }];

  return source.map((item, index) => ({
    id: `${topic.id}-chronology-${index}`,
    date: cleanText(item.date, "ilgili dönem"),
    event: cleanText(item.event, topic.title),
    text: ensureSentence(`${topic.title} kronolojisinde ${cleanText(item.date, "ilgili dönem")}: ${cleanText(item.event, topic.title)}`, topic.shortDescription)
  }));
}

function chronologyWrongClaims(topic: Topic, correctIndex: number) {
  const facts = chronologyFacts(topic);

  if (facts.length <= 1) {
    return uniqueTexts([
      `${topic.title} kronolojisinde ilgili dönem: Bu gelişme konu dışındaki bağımsız bir olaydır.`,
      `${topic.title} kronolojisinde ilgili dönem: Olayların sıralaması bu konuda belirleyici değildir.`,
      `${topic.title} kronolojisinde ilgili dönem: Bu başlık yalnızca kavram ezberiyle çözülür.`
    ]);
  }

  const shifted = facts
    .filter((_, index) => index !== correctIndex)
    .map((fact, index) => {
      const wrongDate = facts[(index + correctIndex + 1) % facts.length]?.date ?? fact.date;
      return `${topic.title} kronolojisinde ${wrongDate}: ${fact.event}`;
    });

  return uniqueTexts([
    ...shifted,
    `${topic.title} kronolojisinde ${facts[correctIndex]?.date ?? "ilgili dönem"}: Bu gelişme konu dışında kalır.`,
    `${topic.title} kronolojisinde olayların tarihsel sırası ayırt edici değildir.`
  ]);
}

function answerWithThreeDistractors(answer: string, distractors: string[], topic: Topic, seed: number) {
  const correct = ensureSentence(answer, topic.shortDescription);
  const pool = uniqueTexts([
    ...distractors,
    ...commonWrongClaims(topic, seed),
    `${topic.title} konusunda doğru cevap için konu bağlamı kontrol edilmez.`,
    `${topic.title} başlığında kavramların ait olduğu dönem önemli değildir.`
  ]).filter((item) => normalize(item) !== normalize(correct));

  while (pool.length < 3) {
    pool.push(ensureSentence(`${topic.title} kapsamında bu seçenek eksik veya hatalı bağlamda verilmiştir`, topic.shortDescription));
  }

  return [correct, ...pool.slice(0, 3)];
}

function rotateChoices(options: string[], seed: number): { choices: QuestionChoice[]; correctChoiceId: string } {
  const uniqueOptions = uniqueTexts(options).slice(0, 4);

  while (uniqueOptions.length < 4) {
    uniqueOptions.push("Bu seçenek konu bağlamı açısından eksik verilmiştir.");
  }

  const correct = uniqueOptions[0];
  const rotate = Math.abs(seed) % 4;
  const rotated = [...uniqueOptions.slice(rotate), ...uniqueOptions.slice(0, rotate)].slice(0, 4);
  const correctIndex = rotated.findIndex((item) => normalize(item) === normalize(correct));

  return {
    choices: rotated.map((text, index) => ({
      id: choiceIds[index],
      text
    })),
    correctChoiceId: choiceIds[correctIndex >= 0 ? correctIndex : 0]
  };
}

function buildKnowledgeModel(topic: Topic, seed: number): QuestionModel {
  const fact = pick(trustedFacts(topic).filter((item) => item.kind !== "timeline"), seed, {
    id: `${topic.id}-fallback`,
    kind: "short",
    text: topicFactPrefix(topic, topic.shortDescription)
  });

  return {
    focus: "bilgi",
    stem: ensureQuestion(`${topic.title} konusunda aşağıdaki ifadelerden hangisi konu bilgisiyle uyumludur`, `${topic.title} konusunda doğru bilgi hangisidir`),
    answer: fact.text,
    distractors: commonWrongClaims(topic, seed),
    explanation: ensureSentence(`Doğru cevap, ${topic.title} konu anlatımındaki güvenilir bilgiyle aynı bağlamdadır`, "Doğru seçenek konu bilgisiyle uyumludur"),
    examTip: ensureSentence("Bilgi sorularında seçenekleri aynı konu, doğru dönem ve doğru kavram ilişkisiyle kontrol et", "Konu bağlamını kontrol et")
  };
}

function buildConceptModel(topic: Topic, seed: number): QuestionModel {
  const concept = pick(safeConcepts(topic), seed, topic.title);
  const answer = ensureSentence(`${topic.title} konusunda ${concept} kavramı olay, kurum veya sonuç ilişkisini açıklayan temel bir kavramdır`, topic.shortDescription);

  return {
    focus: "kavram",
    stem: ensureQuestion(`${topic.title} içinde ${concept} kavramı hangi açıklamayla daha doğru ilişkilendirilir`, `${topic.title} içinde bu kavram nasıl değerlendirilir`),
    answer,
    distractors: conceptWrongClaims(topic, concept, seed),
    explanation: ensureSentence(`${concept} kavramı ${topic.title} başlığında kendi dönem ve kurum bağlamıyla değerlendirilmelidir`, "Kavram konu bağlamıyla birlikte değerlendirilir"),
    examTip: ensureSentence("Kavram sorularında kavramı doğrudan konu başlığına, döneme ve işlevine bağla", "Kavramı dönem ve işleviyle eşleştir")
  };
}

function buildChronologyModel(topic: Topic, seed: number): QuestionModel {
  const facts = chronologyFacts(topic);
  const index = Math.abs(seed) % facts.length;
  const fact = facts[index];

  return {
    focus: "kronoloji",
    stem: ensureQuestion(`${topic.title} kronolojisi için hangi tarih-olay eşleştirmesi doğrudur`, `${topic.title} kronolojisinde doğru eşleştirme hangisidir`),
    answer: fact.text,
    distractors: chronologyWrongClaims(topic, index),
    explanation: ensureSentence(`Doğru seçenek, ${topic.title} kronolojisindeki tarih ve olay bilgisini aynı bağlamda verir`, "Doğru seçenek tarih-olay uyumunu verir"),
    examTip: ensureSentence("Kronoloji sorularında yıl, olay ve sürecin aynı konu içinde olup olmadığını birlikte kontrol et", "Tarih-olay eşleşmesini birlikte kontrol et")
  };
}

function buildInterpretationModel(topic: Topic, seed: number): QuestionModel {
  const fact = pick(trustedFacts(topic), seed + 3, {
    id: `${topic.id}-fallback-yorum`,
    kind: "short",
    text: topicFactPrefix(topic, topic.shortDescription)
  });

  return {
    focus: "yorum",
    stem: ensureQuestion(`${topic.title} başlığıyla ilgili hangi yorum daha tutarlıdır`, `${topic.title} için doğru yorum hangisidir`),
    answer: ensureSentence(`${fact.text.replace(/[.!?]+$/g, "")}; bu nedenle konu neden-sonuç ilişkisiyle değerlendirilmelidir`, topic.shortDescription),
    distractors: uniqueTexts([
      `${topic.title} konusunda olaylar, kurumlar ve kavramlar birbirinden bağımsız kabul edilmelidir.`,
      `${topic.title} sorularında dönem bilgisi ve sonuç ilişkisi cevap seçimini etkilemez.`,
      `${topic.title} başlığı yalnızca isim ezberiyle öğrenilmelidir; yorum ilişkisi kurulmaz.`,
      ...commonWrongClaims(topic, seed)
    ]),
    explanation: ensureSentence(`Doğru yorum, ${topic.title} konusundaki bilgiyi neden-sonuç ve kavram ilişkisiyle birlikte değerlendirir`, "Doğru yorum bağlam kurar"),
    examTip: ensureSentence("Yorum sorularında seçenekleri olayın sonucu, kavramın işlevi ve dönem bilgisiyle karşılaştır", "Yorumda neden-sonuç bağına bak")
  };
}

function buildStudyTipModel(topic: Topic, seed: number): QuestionModel {
  const concept = pick(safeConcepts(topic), seed + 5, topic.title);

  return {
    focus: "ipucu",
    stem: ensureQuestion(`${topic.title} sorularını çözerken hangi çalışma yaklaşımı daha doğrudur`, `${topic.title} için doğru sınav yaklaşımı hangisidir`),
    answer: ensureSentence(`${topic.title} çalışılırken ${concept} gibi kavramlar dönem, kurum ve sonuç ilişkisiyle birlikte değerlendirilmelidir`, topic.shortDescription),
    distractors: uniqueTexts([
      `${topic.title} çalışılırken kavramların ait olduğu dönem göz ardı edilmelidir.`,
      `${topic.title} sorularında yalnızca seçeneklerin uzunluğu karşılaştırılmalıdır.`,
      `${topic.title} başlığında kronoloji, kurum ve sonuç ilişkisi kurulmadan cevap verilmelidir.`,
      `${topic.title} çalışılırken kavramlar konu başlığından bağımsız ezberlenmelidir.`
    ]),
    explanation: ensureSentence(`Bu yaklaşım, ${topic.title} konusunu ezberden çıkarıp sınavda kullanılan kavram-dönem-sonuç ilişkisine bağlar`, "Doğru yaklaşım kavramları bağlam içinde değerlendirmektir"),
    examTip: ensureSentence("Sınavda önce konu başlığını, sonra kavramın işlevini ve son olarak seçeneklerin dönem uyumunu kontrol et", "Önce bağlamı kur, sonra seçenekleri ele")
  };
}

function modelFor(topic: Topic, level: TestLevel, testNo: number, questionNo: number): QuestionModel {
  const seed = topic.id.length * 13 + testNo * 31 + questionNo * 17;
  const cycle: AuditFocus[] =
    level === "kolay"
      ? ["bilgi", "kavram", "kronoloji", "bilgi", "ipucu"]
      : level === "orta"
        ? ["yorum", "bilgi", "kavram", "kronoloji", "ipucu"]
        : ["yorum", "kronoloji", "kavram", "bilgi", "ipucu"];

  const focus = cycle[(testNo + questionNo + topic.id.length) % cycle.length];

  if (focus === "kavram") return buildConceptModel(topic, seed);
  if (focus === "kronoloji") return buildChronologyModel(topic, seed);
  if (focus === "yorum") return buildInterpretationModel(topic, seed);
  if (focus === "ipucu") return buildStudyTipModel(topic, seed);
  return buildKnowledgeModel(topic, seed);
}

function questionType(focus: AuditFocus): Question["type"] {
  if (focus === "kronoloji") return "chronology";
  if (focus === "yorum") return "case";
  return "single";
}

function buildQuestion(topic: Topic, level: TestLevel, testNo: number, questionNo: number): Question {
  const model = modelFor(topic, level, testNo, questionNo);
  const testId = `test-${topic.id}-${level}-${testNo}`;
  const seed = topic.id.length * 19 + testNo * 37 + questionNo * 23;
  const options = answerWithThreeDistractors(model.answer, model.distractors, topic, seed);
  const { choices, correctChoiceId } = rotateChoices(options, seed);

  return {
    id: `${testId}-q${String(questionNo).padStart(2, "0")}`,
    topicId: topic.id,
    type: questionType(model.focus),
    difficulty: internalDifficulty[level],
    stem: ensureQuestion(model.stem, `${topic.title} konusunda doğru seçenek hangisidir`),
    choices,
    correctChoiceId,
    explanation: ensureSentence(model.explanation, "Doğru seçenek konu bilgisini ve tarihsel bağlamı birlikte verir."),
    examTip: ensureSentence(model.examTip, "Cevap seçerken kavram, dönem ve sonuç ilişkisini birlikte kontrol et."),
    tags: [topic.era, toSlug(topic.title), level, `audit:${model.focus}`]
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
        const sourceQuestionNo = ((index * 7 + testNo) % QUESTIONS_PER_TEST) + 1;
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

function getQuestionTopic(questionItem: Question) {
  return topics.find((topic) => topic.id === questionItem.topicId);
}

function correctChoice(questionItem: Question) {
  return questionItem.choices.find((choice) => choice.id === questionItem.correctChoiceId);
}

function includesTopicTitle(questionItem: Question) {
  const topic = getQuestionTopic(questionItem);
  if (!topic) return false;

  const title = normalize(topic.title);
  const allTexts = [
    questionItem.stem,
    questionItem.explanation,
    questionItem.examTip,
    ...questionItem.choices.map((choice) => choice.text)
  ];

  return allTexts.every((text) => normalize(text).includes(title) || normalize(text).includes("sınavda"));
}

function allChoicesSameFrame(questionItem: Question) {
  if (questionItem.type === "chronology") {
    return questionItem.choices.every((choice) => choice.text.includes("kronolojisinde") && choice.text.includes(":"));
  }

  const topic = getQuestionTopic(questionItem);
  if (!topic) return false;

  return questionItem.choices.every((choice) => normalize(choice.text).includes(normalize(topic.title)));
}

export function getStrictQuestionBankAuditReport() {
  const errors: string[] = [];
  const warnings: string[] = [];
  const questionIds = new Set<string>();
  const expectedTopicQuestionCount = topics.length * 3 * TESTS_PER_LEVEL * QUESTIONS_PER_TEST;
  const expectedTopicTestCount = topics.length * 3 * TESTS_PER_LEVEL;
  const expectedMixedTestCount = 3 * TESTS_PER_LEVEL;

  if (expandedQuestions.length !== expectedTopicQuestionCount) {
    errors.push(`Soru sayısı değişmiş: ${expandedQuestions.length} / beklenen ${expectedTopicQuestionCount}`);
  }

  if (topicQuestionTests.length !== expectedTopicTestCount) {
    errors.push(`Konu test sayısı değişmiş: ${topicQuestionTests.length} / beklenen ${expectedTopicTestCount}`);
  }

  if (mixedQuestionTests.length !== expectedMixedTestCount) {
    errors.push(`Karma test sayısı değişmiş: ${mixedQuestionTests.length} / beklenen ${expectedMixedTestCount}`);
  }

  for (const questionItem of expandedQuestions) {
    const topic = getQuestionTopic(questionItem);

    if (!topic) {
      errors.push(`Konu bulunamadı: ${questionItem.id}`);
      continue;
    }

    if (questionIds.has(questionItem.id)) {
      errors.push(`Tekrarlanan soru id: ${questionItem.id}`);
    }

    questionIds.add(questionItem.id);

    if (!questionItem.stem || questionItem.stem.length < 35) {
      errors.push(`Kısa veya boş soru kökü: ${questionItem.id}`);
    }

    if (questionItem.choices.length !== 4) {
      errors.push(`4 seçenek yok: ${questionItem.id}`);
    }

    const uniqueChoiceTexts = new Set(questionItem.choices.map((choice) => normalize(choice.text)));
    if (uniqueChoiceTexts.size !== questionItem.choices.length) {
      errors.push(`Tekrarlanan seçenek var: ${questionItem.id}`);
    }

    if (!correctChoice(questionItem)) {
      errors.push(`Doğru seçenek id bulunamadı: ${questionItem.id}`);
    }

    if (!questionItem.explanation || questionItem.explanation.length < 45) {
      errors.push(`Açıklama zayıf: ${questionItem.id}`);
    }

    if (!questionItem.examTip || questionItem.examTip.length < 35) {
      errors.push(`İpucu zayıf: ${questionItem.id}`);
    }

    if (!allChoicesSameFrame(questionItem)) {
      errors.push(`Şık formatı soru tipiyle uyumsuz: ${questionItem.id}`);
    }

    if (!includesTopicTitle(questionItem)) {
      warnings.push(`Bazı alanlar konu başlığıyla doğrudan bağ kurmuyor olabilir: ${questionItem.id}`);
    }

    const joined = [
      questionItem.stem,
      questionItem.explanation,
      questionItem.examTip,
      ...questionItem.choices.map((choice) => choice.text)
    ].join(" ");

    for (const phrase of bannedArtificialPhrases) {
      if (normalize(joined).includes(normalize(phrase))) {
        errors.push(`Yapay/uygunsuz kalıp var (${phrase}): ${questionItem.id}`);
      }
    }

    for (const phrase of invalidCrossTopicExamples) {
      if (!normalize(topic.title).includes("meşrutiyet") && normalize(joined).includes(normalize(phrase))) {
        errors.push(`Bağlam dışı örnek sızmış olabilir (${phrase}): ${questionItem.id}`);
      }
    }
  }

  for (const test of allQuestionTests) {
    if (test.questionCount !== QUESTIONS_PER_TEST || test.questionIds.length !== QUESTIONS_PER_TEST) {
      errors.push(`Test soru sayısı hatalı: ${test.id}`);
    }

    if (new Set(test.questionIds).size !== test.questionIds.length) {
      errors.push(`Test içinde tekrar eden soru var: ${test.id}`);
    }

    for (const questionId of test.questionIds) {
      if (!questionMap.has(questionId)) {
        errors.push(`Testte bulunmayan soru id var: ${test.id} -> ${questionId}`);
      }
    }
  }

  return {
    ok: errors.length === 0,
    constants: {
      TESTS_PER_LEVEL,
      QUESTIONS_PER_TEST,
      topicCount: topics.length,
      topicTestCount: topicQuestionTests.length,
      mixedTestCount: mixedQuestionTests.length,
      allTestCount: allQuestionTests.length,
      expandedQuestionCount: expandedQuestions.length,
      expectedTopicQuestionCount,
      expectedTopicTestCount,
      expectedMixedTestCount
    },
    errors,
    warnings
  };
}

export function getQuestionBankQualityReport() {
  return getStrictQuestionBankAuditReport();
}
