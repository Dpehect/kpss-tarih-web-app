import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const MIN_TOPICS = 13;
const MIN_QUESTIONS = 150;
const MIN_TESTS = 20;

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (process.env.REQUIRE_SUPABASE_CONTENT === "true") {
      throw new Error("REQUIRE_SUPABASE_CONTENT=true ama Supabase env değişkenleri eksik.");
    }
    console.log("[audit-supabase-content] Supabase env yok; local fallback modunda build devam ediyor.");
    return;
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const counts = await Promise.all([
    countKind(supabase, "topic"),
    countKind(supabase, "question"),
    countKind(supabase, "question_test"),
    countKind(supabase, "exam"),
  ]);

  const [topics, questions, tests, exams] = counts;

  if (topics < MIN_TOPICS) throw new Error(`Supabase konu sayısı düşük: ${topics}/${MIN_TOPICS}`);
  if (questions < MIN_QUESTIONS) throw new Error(`Supabase soru sayısı düşük: ${questions}/${MIN_QUESTIONS}`);
  if (tests < MIN_TESTS) throw new Error(`Supabase hazır test sayısı düşük: ${tests}/${MIN_TESTS}`);
  if (exams < 1) throw new Error("Supabase deneme kaydı bulunamadı.");

  const badTests = await findBadTests(supabase);
  if (badTests.length) {
    throw new Error(`Tekrar eden soru içeren testler: ${badTests.slice(0, 5).join(", ")}`);
  }

  console.log(`[audit-supabase-content] OK: ${topics} konu, ${questions} soru, ${tests} hazır test, ${exams} deneme Supabase'de hazır.`);
}

async function countKind(supabase: ReturnType<typeof createClient>, kind: string) {
  const { count, error } = await supabase
    .from("kpss_content_bundles")
    .select("id", { count: "exact", head: true })
    .eq("kind", kind);

  if (error) throw new Error(`${kind} sayımı yapılamadı: ${error.message}`);
  return count ?? 0;
}

async function findBadTests(supabase: ReturnType<typeof createClient>) {
  const { data, error } = await supabase
    .from("kpss_content_bundles")
    .select("key,payload")
    .eq("kind", "question_test");

  if (error) throw new Error(`question_test okunamadı: ${error.message}`);

  return (data ?? [])
    .filter((row) => {
      const ids = ((row.payload as { questionIds?: string[] })?.questionIds ?? []).filter(Boolean);
      return ids.length !== new Set(ids).size;
    })
    .map((row) => row.key as string);
}

main().catch((error) => {
  console.error("[audit-supabase-content] Hata:", error.message ?? error);
  process.exit(1);
});
