#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import ts from "typescript";

const root = process.cwd();
const migrationPath = path.join(root, "supabase/migrations/20260709_kpss_preloaded_content.sql");
const table = "kpss_content_bundles";
const seedVersion = "kpss-history-preloaded-v1";

const env = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "",
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  dbUrl: process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || "",
};

function log(message) {
  console.log(`[seed-supabase-preloaded-content] ${message}`);
}

function hash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function stableString(value) {
  return JSON.stringify(value, Object.keys(value || {}).sort());
}

async function ensureTable() {
  if (!env.dbUrl) {
    log("SUPABASE_DB_URL yok; tablo migration'ı önceden uygulanmış varsayılıyor.");
    return;
  }
  let pg;
  try {
    pg = await import("pg");
  } catch {
    log("pg paketi yok; tablo migration'ı atlandı. package.json içindeki pg dependency'sini push ettiğinden emin ol.");
    return;
  }
  const sql = fs.readFileSync(migrationPath, "utf8");
  const client = new pg.Client({ connectionString: env.dbUrl, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query(sql);
    log("Supabase tablo migration'ı hazır.");
  } finally {
    await client.end();
  }
}

function transpileAndEvaluateTs(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
    },
    fileName: filePath,
  }).outputText;

  const module = { exports: {} };
  const sandbox = {
    module,
    exports: module.exports,
    require(request) {
      if (request.startsWith("@/types/")) return {};
      if (request.startsWith("@/data/")) {
        const rel = request.replace("@/", "src/");
        const target = path.join(root, `${rel}.ts`);
        if (fs.existsSync(target)) return transpileAndEvaluateTs(target);
      }
      if (request.startsWith("./") || request.startsWith("../")) {
        const target = path.resolve(path.dirname(filePath), request);
        for (const candidate of [target, `${target}.ts`, `${target}.tsx`, path.join(target, "index.ts")]) {
          if (fs.existsSync(candidate)) return transpileAndEvaluateTs(candidate);
        }
      }
      return {};
    },
    console,
    process: { env: {} },
  };
  vm.runInNewContext(output, sandbox, { filename: filePath });
  return module.exports;
}

function loadLocalData() {
  const candidates = [
    path.join(root, "src/data/kpss-history.ts"),
    path.join(root, "src/data/kpss/index.ts"),
  ];
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue;
    try {
      const exports = transpileAndEvaluateTs(candidate);
      if (Array.isArray(exports.topics) && exports.topics.length) {
        return {
          topics: exports.topics || [],
          questions: exports.questions || [],
          flashcards: exports.flashcards || [],
          timelineEvents: exports.timelineEvents || exports.timeline || [],
          glossary: exports.glossary || [],
          exams: exports.exams || [],
          recommendations: exports.recommendations || [],
        };
      }
    } catch (error) {
      log(`${path.relative(root, candidate)} okunamadı: ${error.message}`);
    }
  }
  throw new Error("Yerel KPSS veri havuzu bulunamadı. src/data/kpss-history.ts veya src/data/kpss/index.ts gerekli.");
}

const levelMap = {
  temel: "kolay",
  orta: "orta",
  ileri: "zor",
};

function createStaticTests(data) {
  const topics = data.topics || [];
  const questions = data.questions || [];
  const tests = [];
  const usedGlobal = new Set();

  function pick(topicId, desiredDifficulty, limit = 20) {
    const byTopic = questions.filter((q) => q.topicId === topicId);
    const exact = byTopic.filter((q) => levelMap[q.difficulty] === desiredDifficulty);
    const rest = byTopic.filter((q) => levelMap[q.difficulty] !== desiredDifficulty);
    return [...exact, ...rest].slice(0, limit);
  }

  for (const topic of topics) {
    for (const level of ["kolay", "orta", "zor"]) {
      const selected = pick(topic.id, level, 20);
      if (!selected.length) continue;
      tests.push({
        id: `${topic.id}-${level}-1`,
        topicId: topic.id,
        level,
        testNo: 1,
        title: `${topic.title} ${level[0].toLocaleUpperCase("tr-TR") + level.slice(1)} Testi`,
        questionIds: selected.map((q) => q.id),
        questionCount: selected.length,
        source: "supabase-preloaded",
      });
    }
  }

  for (const level of ["kolay", "orta", "zor"]) {
    const selected = [];
    for (const topic of topics) {
      const one = pick(topic.id, level, 3).find((q) => !selected.some((s) => s.id === q.id));
      if (one) selected.push(one);
    }
    const more = questions
      .filter((q) => levelMap[q.difficulty] === level && !selected.some((s) => s.id === q.id))
      .slice(0, Math.max(0, 27 - selected.length));
    const final = [...selected, ...more].slice(0, 27);
    if (final.length) {
      tests.push({
        id: `all-${level}-1`,
        topicId: "all",
        level,
        testNo: 1,
        title: `Karma KPSS Tarih ${level[0].toLocaleUpperCase("tr-TR") + level.slice(1)} Testi`,
        questionIds: final.map((q) => q.id),
        questionCount: final.length,
        source: "supabase-preloaded",
      });
    }
  }

  return tests;
}

function buildBundles(data) {
  const tests = createStaticTests(data);
  const questionById = new Map((data.questions || []).map((q) => [q.id, q]));
  const bundles = [];
  const topics = data.topics || [];

  bundles.push({ key: "_meta:seed", kind: "meta", topic_id: null, payload: { seedVersion, generatedAt: new Date().toISOString() } });
  bundles.push({ key: "topics", kind: "topics", topic_id: null, payload: topics });
  bundles.push({ key: "questions", kind: "questions", topic_id: null, payload: data.questions || [] });
  bundles.push({ key: "flashcards", kind: "flashcards", topic_id: null, payload: data.flashcards || [] });
  bundles.push({ key: "timeline", kind: "timeline", topic_id: null, payload: data.timelineEvents || [] });
  bundles.push({ key: "glossary", kind: "glossary", topic_id: null, payload: data.glossary || [] });
  bundles.push({ key: "recommendations", kind: "recommendations", topic_id: null, payload: data.recommendations || [] });
  bundles.push({ key: "tests", kind: "tests", topic_id: null, payload: tests });
  bundles.push({ key: "exams", kind: "exams", topic_id: null, payload: data.exams || [] });

  for (const topic of topics) {
    const topicQuestions = (data.questions || []).filter((q) => q.topicId === topic.id);
    const topicFlashcards = (data.flashcards || []).filter((f) => f.topicId === topic.id);
    const topicTimeline = (data.timelineEvents || []).filter((e) => e.topicId === topic.id);
    const topicGlossary = (data.glossary || []).filter((g) => g.topicId === topic.id || g.topicId === topic.slug);
    const topicTests = tests.filter((test) => test.topicId === topic.id);
    bundles.push({ key: `topic:${topic.slug}`, kind: "topic", topic_id: topic.id, payload: topic });
    bundles.push({ key: `topic-data:${topic.slug}`, kind: "topic-data", topic_id: topic.id, payload: { topic, questions: topicQuestions, flashcards: topicFlashcards, timeline: topicTimeline, glossary: topicGlossary, tests: topicTests } });
  }

  for (const test of tests) {
    bundles.push({
      key: `test:${test.id}`,
      kind: "test",
      topic_id: test.topicId,
      payload: {
        test,
        questions: test.questionIds.map((id) => questionById.get(id)).filter(Boolean),
      },
    });
  }

  const normalized = bundles.map((bundle) => {
    const content_hash = hash(bundle.payload);
    return { ...bundle, content_hash };
  });

  const aggregateHash = hash(normalized.map((b) => [b.key, b.content_hash]));
  normalized[0].payload = { ...normalized[0].payload, aggregateHash, counts: { topics: topics.length, questions: data.questions?.length || 0, tests: tests.length } };
  normalized[0].content_hash = hash(normalized[0].payload);
  return { bundles: normalized, aggregateHash, tests };
}

async function upsertInBatches(supabase, rows, batchSize = 50) {
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from(table).upsert(batch, { onConflict: "key" });
    if (error) throw error;
    log(`${Math.min(i + batchSize, rows.length)}/${rows.length} bundle Supabase'e yazıldı.`);
  }
}

async function main() {
  if (!env.url || !env.serviceKey) {
    log("Supabase env eksik. NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY eklenirse Vercel deploy sırasında otomatik seed yapılır.");
    return;
  }

  await ensureTable();
  const data = loadLocalData();
  const { bundles, aggregateHash, tests } = buildBundles(data);
  const supabase = createClient(env.url, env.serviceKey, { auth: { persistSession: false } });

  const { data: meta, error: metaError } = await supabase.from(table).select("payload,content_hash").eq("key", "_meta:seed").maybeSingle();
  if (metaError && !String(metaError.message || "").includes("does not exist")) {
    throw metaError;
  }

  if (meta?.payload?.aggregateHash === aggregateHash) {
    log(`İçerik değişmemiş. Supabase seed atlandı. Konu: ${data.topics.length}, soru: ${data.questions.length}, test: ${tests.length}`);
    return;
  }

  await upsertInBatches(supabase, bundles);
  log(`Tamamlandı. Supabase hazır: ${data.topics.length} konu, ${data.questions.length} soru, ${tests.length} test, ${bundles.length} bundle.`);
}

main().catch((error) => {
  console.error(`[seed-supabase-preloaded-content] HATA: ${error?.message || error}`);
  process.exit(1);
});
