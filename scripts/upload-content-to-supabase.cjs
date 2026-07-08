const fs = require("node:fs");
const path = require("node:path");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const root = process.cwd();

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env.migration.local"));

let createClient;
try {
  ({ createClient } = require("@supabase/supabase-js"));
} catch {
  console.error("@supabase/supabase-js paketi bulunamadı. Önce npm install çalıştır.");
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error("NEXT_PUBLIC_SUPABASE_URL bulunamadı. .env.local veya .env.migration.local içine ekle.");
  process.exit(1);
}

if (!serviceRoleKey) {
  console.error("SUPABASE_SERVICE_ROLE_KEY bulunamadı.");
  console.error("Supabase → Project Settings → API → service_role key değerini .env.migration.local içine ekle.");
  process.exit(1);
}

if (serviceRoleKey.startsWith("sb_publishable_") || serviceRoleKey.includes("publishable")) {
  console.error("Service role yerine publishable key kullanmışsın. Bu script SUPABASE_SERVICE_ROLE_KEY ister.");
  process.exit(1);
}

const exportDir = path.join(root, "supabase-export");

const files = {
  content_topics: "content_topics.json",
  content_tests: "content_tests.json",
  content_questions: "content_questions.json",
  content_question_choices: "content_question_choices.json",
  content_flashcards: "content_flashcards.json",
  content_timeline_events: "content_timeline_events.json"
};

for (const filename of Object.values(files)) {
  const full = path.join(exportDir, filename);

  if (!fs.existsSync(full)) {
    console.error(`Eksik export dosyası: supabase-export/${filename}`);
    process.exit(1);
  }
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

function readRows(filename) {
  return JSON.parse(fs.readFileSync(path.join(exportDir, filename), "utf8"));
}

async function assertTablesExist() {
  const { error } = await supabase
    .from("content_topics")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Supabase content tabloları hazır görünmüyor.");
    console.error("Önce Supabase SQL Editor'da supabase/content-schema.sql dosyasını çalıştır.");
    console.error("");
    console.error(error.message);
    process.exit(1);
  }
}

async function clearTable(table) {
  const { error } = await supabase
    .from(table)
    .delete()
    .not("id", "is", null);

  if (error) {
    console.error(`${table} temizlenemedi: ${error.message}`);
    process.exit(1);
  }

  console.log(`Temizlendi: ${table}`);
}

async function clearChoices() {
  const { error } = await supabase
    .from("content_question_choices")
    .delete()
    .not("question_id", "is", null);

  if (error) {
    console.error(`content_question_choices temizlenemedi: ${error.message}`);
    process.exit(1);
  }

  console.log("Temizlendi: content_question_choices");
}

async function insertChunks(table, rows, chunkSize = 500) {
  if (!rows.length) {
    console.log(`${table}: yüklenecek satır yok.`);
    return;
  }

  let inserted = 0;

  for (let index = 0; index < rows.length; index += chunkSize) {
    const chunk = rows.slice(index, index + chunkSize);

    const { error } = await supabase
      .from(table)
      .insert(chunk);

    if (error) {
      console.error(`${table} yüklenemedi.`);
      console.error(`Chunk başlangıcı: ${index}`);
      console.error(error.message);
      process.exit(1);
    }

    inserted += chunk.length;
    console.log(`${table}: ${inserted}/${rows.length}`);
  }
}

async function countTable(table) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(`${table} sayısı alınamadı: ${error.message}`);
    process.exit(1);
  }

  return count ?? 0;
}

async function main() {
  console.log("Supabase content yükleme başlıyor...");
  console.log("URL:", supabaseUrl);
  console.log("");

  await assertTablesExist();

  const rows = {
    content_topics: readRows(files.content_topics),
    content_tests: readRows(files.content_tests),
    content_questions: readRows(files.content_questions),
    content_question_choices: readRows(files.content_question_choices),
    content_flashcards: readRows(files.content_flashcards),
    content_timeline_events: readRows(files.content_timeline_events)
  };

  console.log("Export satırları");
  console.log("---------------");
  for (const [table, tableRows] of Object.entries(rows)) {
    console.log(`${table}: ${tableRows.length}`);
  }
  console.log("");

  const confirm = process.argv.includes("--yes");

  if (!confirm) {
    console.log("Bu işlem content_* tablolarını temizleyip yeniden yükler.");
    console.log("Devam etmek için komutu şöyle çalıştır:");
    console.log("");
    console.log("node scripts/upload-content-to-supabase.cjs --yes");
    process.exit(0);
  }

  console.log("Tablolar temizleniyor...");
  await clearChoices();
  await clearTable("content_questions");
  await clearTable("content_tests");
  await clearTable("content_flashcards");
  await clearTable("content_timeline_events");
  await clearTable("content_topics");
  console.log("");

  console.log("Veriler yükleniyor...");
  await insertChunks("content_topics", rows.content_topics, 200);
  await insertChunks("content_tests", rows.content_tests, 500);
  await insertChunks("content_questions", rows.content_questions, 500);
  await insertChunks("content_question_choices", rows.content_question_choices, 1000);
  await insertChunks("content_flashcards", rows.content_flashcards, 500);
  await insertChunks("content_timeline_events", rows.content_timeline_events, 500);
  console.log("");

  console.log("Supabase tablo sayıları");
  console.log("-----------------------");
  for (const table of Object.keys(rows)) {
    const count = await countTable(table);
    console.log(`${table}: ${count}`);
  }

  console.log("");
  console.log("✓ İçerik Supabase'e yüklendi.");
  console.log("Sıradaki adım: Önce test ekranını Supabase'den sadece 30 soru çekecek hale getirmek.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
