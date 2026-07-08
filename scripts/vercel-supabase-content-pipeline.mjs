import { spawnSync } from "node:child_process";
import fs from "node:fs";

const steps = [
  ["node", ["scripts/vercel-prebuild-fixes.mjs"], "prebuild uyumluluğu"],
  ["node", ["scripts/remove-ambiguous-exam-route.mjs"], "duplicate exam route temizliği"],
  ["npx", ["tsx", "scripts/seed-supabase-kpss-content.ts"], "Supabase içerik seed/upsert"],
  ["npx", ["tsx", "scripts/audit-supabase-content.ts"], "Supabase hazır içerik audit"],
  ["node", ["scripts/audit-question-bank-quality.mjs"], "soru bankası kalite audit"],
  ["node", ["scripts/audit-chatbot-llm.mjs"], "chatbot kalite audit"],
  ["npx", ["next", "build"], "Next.js production build"],
];

for (const [command, args, label] of steps) {
  if (!shouldRun(command, args)) {
    console.log(`[vercel-supabase-content-pipeline] ${label} atlandı: dosya yok.`);
    continue;
  }

  console.log(`[vercel-supabase-content-pipeline] ${label} başlıyor...`);
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) {
    console.error(`[vercel-supabase-content-pipeline] ${label} başarısız.`);
    process.exit(result.status ?? 1);
  }
}

console.log("[vercel-supabase-content-pipeline] tamamlandı.");

function shouldRun(command, args) {
  const last = args[args.length - 1];
  if (typeof last === "string" && last.startsWith("scripts/") && !fs.existsSync(last)) return false;
  return true;
}
