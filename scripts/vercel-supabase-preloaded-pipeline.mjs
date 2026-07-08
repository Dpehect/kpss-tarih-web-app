#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";

const steps = [
  ["node", ["scripts/vercel-prebuild-fixes.mjs"], false],
  ["node", ["scripts/remove-ambiguous-exam-route.mjs"], true],
  ["node", ["scripts/seed-supabase-preloaded-content.mjs"], false],
  ["node", ["scripts/audit-supabase-preloaded-content.mjs"], false],
  ["node", ["scripts/audit-question-bank-quality.mjs"], false],
  ["node", ["scripts/audit-chatbot-llm.mjs"], true],
  ["npx", ["next", "build"], false],
];

function run(command, args, optional) {
  if (command === "node" && optional && !fs.existsSync(args[0])) {
    console.log(`[vercel-supabase-preloaded-pipeline] Opsiyonel adım yok: ${args[0]}`);
    return;
  }
  console.log(`[vercel-supabase-preloaded-pipeline] Çalışıyor: ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

for (const [command, args, optional] of steps) run(command, args, optional);
