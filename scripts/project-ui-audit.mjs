import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checks = [
  "src/components/core/MobileBottomNav.tsx",
  "src/components/core/SkipToContent.tsx",
  "src/app/(main)/error.tsx",
  "src/app/(main)/not-found.tsx",
  "src/app/(main)/loading.tsx",
  "src/app/not-found.tsx",
  "src/app/error.tsx",
  "src/components/ui/Skeleton.tsx",
  "src/components/ui/EmptyState.tsx"
];

const missing = checks.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error("Eksik production UI dosyaları:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

console.log("Project UI audit başarılı.");
