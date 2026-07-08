import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";
import {
  exams,
  flashcards,
  glossary,
  questions,
  recommendations,
  timelineEvents,
  topics,
} from "../src/data/kpss-history";
import type { Exam, Question, Topic } from "../src/types/study";

type TestLevel = "kolay" | "orta" | "zor";

type GeneratedQuestionTest = {
  id: string;
  topicId: string | "all";
  title: string;
  level: TestLevel;
  levelLabel: string;
  testNo: number;
  questionCount: number;
  questionIds: string[];
};

type ContentRow = {
  id: string;
  kind: string;
  key: string;
  payload: unknown;
  checksum: string;
  source: string;
};

const QUESTIONS_PER_TEST = 20;
const TESTS_PER_LEVEL = 10;
const LEVEL_LABELS: Record<TestLevel, string> = { kolay: "Kolay", orta: "Orta", zor: "Zor" };

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const dbUrl = process.env.SUPABASE_DB_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL;
  const shouldBootstrap = process.env.SUPABASE_BOOTSTRAP_SCHEMA !== "false";

  if (!url || !serviceKey) {
    console.log("[seed-supabase-kpss-content] NEXT_PUBLIC_SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY yok; seed atlandı.");
    return;
  }

  if (shouldBootstrap && dbUrl) {
    await bootstrapSchema(dbUrl);
  } else if (shouldBootstrap && !dbUrl) {
    console.log("[seed-supabase-kpss-content] SUPABASE_DB_URL yok; tablo zaten varsa upsert yapılacak.");
  }

  const tests = buildStaticQuestionTests(topics, questions);
  const finalExams = exams.length ? exams : buildStaticExams(questions);
  const rows = buildRows(tests, finalExams);

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  for (const chunk of chunkRows(rows, 500)) {
    const { error } = await supabase.from("kpss_content_bundles").upsert(chunk, { onConflict: "kind,key" });
    if (error) {
      console.error("[seed-supabase-kpss-content] Upsert hatası:", error.message);
      process.exit(1);
    }
  }

  console.log(
    `[seed-supabase-kpss-content] OK: ${topics.length} konu, ${questions.length} soru, ${tests.length} hazır test, ${finalExams.length} deneme Supabase'e işlendi.`,
  );
}

async function bootstrapSchema(dbUrl: string) {
  const migrationPath = path.join(process.cwd(), "supabase/migrations/20260709_kpss_content_bundles.sql");
  if (!fs.existsSync(migrationPath)) {
    console.log("[seed-supabase-kpss-content] Migration dosyası bulunamadı; bootstrap atlandı.");
    return;
  }

  const sql = postgres(dbUrl, {
    max: 1,
    ssl: dbUrl.includes("sslmode=disable") ? false : "require",
  });

  try {
    await sql.unsafe(fs.readFileSync(migrationPath, "utf8"));
    console.log("[seed-supabase-kpss-content] Supabase tablo/RLS şeması hazır.");
  } finally {
    await sql.end();
  }
}

function buildRows(tests: GeneratedQuestionTest[], finalExams: Exam[]): ContentRow[] {
  return [
    ...topics.map((topic) => row("topic", topic.slug, topic)),
    ...questions.map((question) => row("question", question.id, question)),
    ...flashcards.map((card) => row("flashcard", card.id, card)),
    ...timelineEvents.map((event) => row("timeline_event", event.id, event)),
    ...glossary.map((item) => row("glossary", item.id, item)),
    ...recommendations.map((item) => row("recommendation", item.id, item)),
    ...tests.map((test) => row("question_test", test.id, test)),
    ...finalExams.map((exam) => row("exam", exam.id, exam)),
  ];
}

function row(kind: string, key: string, payload: unknown): ContentRow {
  const checksum = crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  return {
    id: `${kind}:${key}`,
    kind,
    key,
    payload,
    checksum,
    source: "repo-seed-supabase-first",
  };
}

function buildStaticQuestionTests(topicList: Topic[], questionList: Question[]) {
  const tests: GeneratedQuestionTest[] = [];

  for (const topic of topicList) {
    const topicPool = questionList.filter((question) => question.topicId === topic.id);
    for (const level of ["kolay", "orta", "zor"] as TestLevel[]) {
      const levelPool = filterByLevel(topicPool, level);
      const testCount = Math.max(1, Math.min(TESTS_PER_LEVEL, Math.ceil(levelPool.length / QUESTIONS_PER_TEST) || 1));
      for (let index = 0; index < testCount; index += 1) {
        const questionIds = selectUniqueQuestionIds(levelPool, QUESTIONS_PER_TEST, index * 13 + topic.id.length);
        if (!questionIds.length) continue;
        tests.push({
          id: `${topic.id}-${level}-${index + 1}`,
          topicId: topic.id,
          title: `${topic.title} ${LEVEL_LABELS[level]} Test ${index + 1}`,
          level,
          levelLabel: LEVEL_LABELS[level],
          testNo: index + 1,
          questionCount: questionIds.length,
          questionIds,
        });
      }
    }
  }

  for (const level of ["kolay", "orta", "zor"] as TestLevel[]) {
    const pool = filterByLevel(questionList, level);
    for (let index = 0; index < TESTS_PER_LEVEL; index += 1) {
      const questionIds = selectUniqueQuestionIds(pool, QUESTIONS_PER_TEST, index * 19 + 7);
      if (!questionIds.length) continue;
      tests.push({
        id: `karma-${level}-${index + 1}`,
        topicId: "all",
        title: `Karma Tarih ${LEVEL_LABELS[level]} Test ${index + 1}`,
        level,
        levelLabel: LEVEL_LABELS[level],
        testNo: index + 1,
        questionCount: questionIds.length,
        questionIds,
      });
    }
  }

  assertUniqueTests(tests);
  return tests;
}

function buildStaticExams(questionList: Question[]) {
  return Array.from({ length: 12 }, (_, index) => {
    const questionIds = selectUniqueQuestionIds(questionList, 27, index * 37 + 11);
    return {
      id: `kpss-tarih-deneme-${index + 1}`,
      title: `KPSS Tarih Denemesi ${index + 1}`,
      durationMinutes: 30,
      questionIds,
      description: "27 soruluk KPSS Tarih formatına yakın kapsamlı deneme.",
    } satisfies Exam;
  });
}

function filterByLevel(questionList: Question[], level: TestLevel) {
  const difficultyMap: Record<TestLevel, Question["difficulty"]> = {
    kolay: "temel",
    orta: "orta",
    zor: "ileri",
  };
  const primary = questionList.filter((question) => question.difficulty === difficultyMap[level]);
  return [...primary, ...questionList.filter((question) => question.difficulty !== difficultyMap[level])];
}

function selectUniqueQuestionIds(pool: Question[], count: number, seed: number) {
  const unique = new Map(pool.map((question) => [question.id, question]));
  return Array.from(unique.values())
    .sort((a, b) => seededScore(a.id, seed) - seededScore(b.id, seed))
    .slice(0, Math.min(count, unique.size))
    .map((question) => question.id);
}

function seededScore(value: string, seed: number) {
  let hash = seed || 1;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33 + value.charCodeAt(index)) % 10000019;
  }
  return hash;
}

function assertUniqueTests(tests: GeneratedQuestionTest[]) {
  for (const test of tests) {
    const unique = new Set(test.questionIds);
    if (unique.size !== test.questionIds.length) {
      throw new Error(`${test.id} testinde tekrar eden soru var.`);
    }
  }
}

function chunkRows<T>(rows: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < rows.length; index += size) {
    chunks.push(rows.slice(index, index + size));
  }
  return chunks;
}

main().catch((error) => {
  console.error("[seed-supabase-kpss-content] Beklenmeyen hata:", error);
  process.exit(1);
});
