#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";

const table = "kpss_content_bundles";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function log(message) {
  console.log(`[audit-supabase-preloaded-content] ${message}`);
}

function fail(message) {
  console.error(`[audit-supabase-preloaded-content] ${message}`);
  process.exit(1);
}

if (!url || !key) {
  log("Supabase env eksik; audit atlandı. Env eklenince deploy sırasında otomatik kontrol edilir.");
  process.exit(0);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });
const required = ["_meta:seed", "topics", "questions", "tests"];

const { data, error } = await supabase.from(table).select("key,kind,payload").in("key", required);
if (error) fail(error.message);

const map = new Map((data || []).map((row) => [row.key, row]));
for (const keyName of required) {
  if (!map.has(keyName)) fail(`Eksik Supabase bundle: ${keyName}`);
}

const topics = map.get("topics")?.payload || [];
const questions = map.get("questions")?.payload || [];
const tests = map.get("tests")?.payload || [];

if (!Array.isArray(topics) || topics.length < 10) fail(`Konu sayısı düşük: ${topics.length}`);
if (!Array.isArray(questions) || questions.length < 100) fail(`Soru sayısı düşük: ${questions.length}`);
if (!Array.isArray(tests) || tests.length < topics.length) fail(`Test sayısı düşük: ${tests.length}`);

const qById = new Map(questions.map((q) => [q.id, q]));
let invalidAnswers = 0;
let duplicateInTests = 0;
for (const question of questions) {
  if (!question?.choices?.some((choice) => choice.id === question.correctChoiceId)) invalidAnswers += 1;
}
for (const test of tests) {
  const ids = test.questionIds || [];
  if (new Set(ids).size !== ids.length) duplicateInTests += 1;
  for (const id of ids) {
    if (!qById.has(id)) fail(`Testte bulunmayan soru id: ${test.id} -> ${id}`);
  }
}
if (invalidAnswers) fail(`${invalidAnswers} soruda correctChoiceId seçeneklerle eşleşmiyor.`);
if (duplicateInTests) fail(`${duplicateInTests} testte tekrar eden soru var.`);

log(`OK: Supabase hazır. ${topics.length} konu, ${questions.length} soru, ${tests.length} test.`);
