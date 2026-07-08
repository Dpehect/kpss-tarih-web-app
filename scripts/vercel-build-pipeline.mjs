import { spawnSync } from "node:child_process";
import fs from "node:fs";
const steps = [
  ["node", ["scripts/merge-all-deep-modular-data.mjs"]],
  fs.existsSync("scripts/vercel-prebuild-fixes.mjs") ? ["node", ["scripts/vercel-prebuild-fixes.mjs"]] : null,
  fs.existsSync("scripts/force-question-bank-20-tests.mjs") ? ["node", ["scripts/force-question-bank-20-tests.mjs"]] : null,
  fs.existsSync("scripts/remove-ambiguous-exam-route.mjs") ? ["node", ["scripts/remove-ambiguous-exam-route.mjs"]] : null,
  ["node", ["scripts/audit-all-deep-modular-data.mjs"]],
  ["npx", ["next", "build"]],
].filter(Boolean);
for (const [cmd,args] of steps) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
