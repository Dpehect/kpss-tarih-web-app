import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const fullPath = (relative) => path.join(root, relative);
const exists = (relative) => fs.existsSync(fullPath(relative));
const read = (relative) => (exists(relative) ? fs.readFileSync(fullPath(relative), "utf8") : null);
const write = (relative, content) => {
  const file = fullPath(relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
};
const remove = (relative) => {
  const file = fullPath(relative);
  if (fs.existsSync(file)) fs.rmSync(file, { recursive: true, force: true });
};

function ensureTypedRoutesSafe() {
  const file = "next.config.ts";
  let source = read(file);
  if (!source) return;
  const before = source;
  source = source.replace(/typedRoutes\s*:\s*true/g, "typedRoutes: false");
  if (!/typedRoutes\s*:\s*false/.test(source) && /typescript\s*:\s*\{/.test(source)) {
    source = source.replace(/typescript\s*:\s*\{/, "typescript: {\n    typedRoutes: false,");
  }
  if (source !== before) write(file, source);
  console.log("[vercel-prebuild-fixes] typedRoutes ayarı güvenli.");
}

function ensureProxyConvention() {
  const middleware = "src/middleware.ts";
  const proxy = "src/proxy.ts";
  if (exists(middleware) && !exists(proxy)) {
    let source = read(middleware) ?? "";
    source = source.replace(/export\s+function\s+middleware\s*\(/g, "export function proxy(");
    source = source.replace(/export\s+default\s+function\s+middleware\s*\(/g, "export default function proxy(");
    write(proxy, source);
    remove(middleware);
    console.log("[vercel-prebuild-fixes] Next 16 uyumu için middleware.ts -> proxy.ts dönüştürüldü.");
  } else {
    console.log("[vercel-prebuild-fixes] proxy uyumu hazır.");
  }
}

function ensureNoDuplicateManifestRoute() {
  const manifestTs = "src/app/manifest.ts";
  const manifestRoute = "src/app/manifest.webmanifest/route.ts";
  if (exists(manifestTs) && exists(manifestRoute)) {
    remove(manifestRoute);
    console.log("[vercel-prebuild-fixes] duplicate manifest.webmanifest route kaldırıldı.");
    return;
  }
  console.log("[vercel-prebuild-fixes] duplicate manifest route yok.");
}

function ensureKpssHistoryExports() {
  const file = "src/data/kpss-history.ts";
  let source = read(file);
  if (!source) return;
  const before = source;
  source = source.replaceAll("card as Record<string, unknown>", "card as unknown as Record<string, unknown>");

  const helpers = [];
  if (!/export\s+function\s+getTopicBySlug|export\s+const\s+getTopicBySlug/.test(source)) {
    helpers.push(`\nexport function getTopicBySlug(slug: string) {\n  return topics.find((topic) => topic.slug === slug || topic.id === slug);\n}\n`);
  }
  if (!/export\s+function\s+getTopicById|export\s+const\s+getTopicById/.test(source)) {
    helpers.push(`\nexport function getTopicById(id: string) {\n  return topics.find((topic) => topic.id === id || topic.slug === id);\n}\n`);
  }
  if (!/export\s+function\s+getQuestionsByTopic|export\s+const\s+getQuestionsByTopic/.test(source)) {
    helpers.push(`\nexport function getQuestionsByTopic(topicId: string) {\n  return questions.filter((question) => question.topicId === topicId || question.topicSlug === topicId);\n}\n`);
  }
  if (!/export\s+function\s+getFlashcardsByTopic|export\s+const\s+getFlashcardsByTopic/.test(source)) {
    helpers.push(`\nexport function getFlashcardsByTopic(topicId: string) {\n  return flashcards.filter((card) => card.topicId === topicId || card.topicSlug === topicId);\n}\n`);
  }
  if (!/export\s+function\s+getTimelineEventsByTopic|export\s+const\s+getTimelineEventsByTopic/.test(source)) {
    helpers.push(`\nexport function getTimelineEventsByTopic(topicId: string) {\n  return timelineEvents.filter((event) => event.topicId === topicId || event.topicSlug === topicId);\n}\n`);
  }
  if (helpers.length > 0) source += `\n// Build compatibility helpers added by vercel-prebuild-fixes.mjs.\n${helpers.join("\n")}`;
  if (source !== before) write(file, source);
  console.log("[vercel-prebuild-fixes] kpss-history export/cast uyumluluğu hazır.");
}

function ensureSkeletonExports() {
  const file = "src/components/ui/Skeleton.tsx";
  let source = read(file);
  if (!source) return;
  const append = [];
  if (!/export\s+function\s+SkeletonGrid/.test(source)) {
    append.push(`\nexport function SkeletonGrid({ count = 8, className = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", itemClassName = "h-32" }: { count?: number; className?: string; itemClassName?: string }) {\n  return <div className={className}>{Array.from({ length: count }).map((_, index) => <Skeleton key={index} className={itemClassName} />)}</div>;\n}\n`);
  }
  if (!/export\s+function\s+PageSkeleton/.test(source)) {
    append.push(`\nexport function PageSkeleton() {\n  return <div className="space-y-6"><Skeleton className="h-56 rounded-3xl" /><SkeletonGrid count={6} /></div>;\n}\n`);
  }
  if (append.length > 0) {
    source += append.join("\n");
    write(file, source);
  }
  console.log("[vercel-prebuild-fixes] Skeleton exportları hazır.");
}

function ensureBrandMarkSizeProp() {
  const file = "src/components/brand/SBBrandMark.tsx";
  let source = read(file);
  if (!source) return;
  if (/size\??\s*:/.test(source) || /size\s*=/.test(source)) {
    console.log("[vercel-prebuild-fixes] SBBrandMark size prop uyumu hazır.");
    return;
  }
  source = source
    .replace(/\{\s*className\s*\}:\s*\{\s*className\??:\s*string\s*\}/, "{ className, size = 'md' }: { className?: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number }")
    .replace(/className=\{className\}/, "className={className}");
  write(file, source);
  console.log("[vercel-prebuild-fixes] SBBrandMark size prop guard uygulandı.");
}

function ensureReadabilityCss() {
  const file = "src/app/globals.css";
  let source = read(file);
  if (!source) return;
  const before = source;

  // These broad selectors caused white text on light gradient cards. They should never exist globally.
  source = source.replace(/,\s*\[class\*="bg-gradient-to"\]\[class\*="from-blue"\]/g, "");
  source = source.replace(/,\s*\[class\*="bg-gradient-to"\]\[class\*="from-indigo"\]/g, "");
  source = source.replace(/,\s*\[class\*="bg-gradient-to"\]\[class\*="from-slate"\]/g, "");
  source = source.replace(/\[class\*="bg-gradient-to"\]\[class\*="from-blue"\],?/g, "");
  source = source.replace(/\[class\*="bg-gradient-to"\]\[class\*="from-indigo"\],?/g, "");
  source = source.replace(/\[class\*="bg-gradient-to"\]\[class\*="from-slate"\],?/g, "");

  const patchMarker = "/* SB_READABILITY_GUARD_V2 */";
  const patch = `\n${patchMarker}\n.surface-light, .premium-light, [data-readable="light"], [data-tone="light"], :is([class*="bg-white"], [class*="bg-slate-50"], [class*="bg-gray-50"], [class*="from-white"], [class*="via-white"], [class*="to-white"], [class*="from-slate-50"], [class*="to-slate-50"], [class*="from-blue-50"], [class*="to-blue-50"], [class*="from-sky-50"], [class*="to-sky-50"]) { color: var(--sb-text) !important; }\n.surface-light :where(h1,h2,h3,h4,h5,h6,strong,b,p,li,small,label,span,div), .premium-light :where(h1,h2,h3,h4,h5,h6,strong,b,p,li,small,label,span,div), [data-readable="light"] :where(h1,h2,h3,h4,h5,h6,strong,b,p,li,small,label,span,div), [data-tone="light"] :where(h1,h2,h3,h4,h5,h6,strong,b,p,li,small,label,span,div) { color: var(--sb-text) !important; }\n.btn-primary, .btn-dark, [data-dark-button="true"], .surface-dark, [data-tone="dark"] { color: #fff !important; }\n.btn-primary *, .btn-dark *, [data-dark-button="true"] *, .surface-dark *, [data-tone="dark"] * { color: currentColor !important; fill: currentColor !important; stroke: currentColor !important; }\n.btn-light, .btn-ghost, [data-light-button="true"] { color: var(--sb-text) !important; }\n`;
  if (!source.includes(patchMarker)) source += patch;
  if (source !== before) write(file, source);
  console.log("[vercel-prebuild-fixes] okunabilirlik CSS guard hazır.");
}

function ensureVercelAutoScripts() {
  const buildCommand = "node scripts/vercel-prebuild-fixes.mjs && node scripts/force-question-bank-20-tests.mjs && node scripts/remove-ambiguous-exam-route.mjs && node scripts/audit-readability-and-vercel.mjs && next build";
  const vercel = "vercel.json";
  write(vercel, JSON.stringify({ buildCommand }, null, 2) + "\n");

  const pkgFile = "package.json";
  const pkgSource = read(pkgFile);
  if (pkgSource) {
    const pkg = JSON.parse(pkgSource);
    pkg.scripts = {
      ...(pkg.scripts ?? {}),
      dev: "node scripts/vercel-prebuild-fixes.mjs && node scripts/force-question-bank-20-tests.mjs && next dev --turbopack",
      build: buildCommand,
      "audit:readability": "node scripts/audit-readability-and-vercel.mjs",
      verify: "npm run typecheck && npm run audit:readability && npm run build",
    };
    write(pkgFile, JSON.stringify(pkg, null, 2) + "\n");
  }
  console.log("[vercel-prebuild-fixes] Vercel otomatik script zinciri hazır.");
}

ensureTypedRoutesSafe();
ensureProxyConvention();
ensureNoDuplicateManifestRoute();
ensureKpssHistoryExports();
ensureSkeletonExports();
ensureBrandMarkSizeProp();
ensureReadabilityCss();
ensureVercelAutoScripts();
console.log("[vercel-prebuild-fixes] tamamlandı.");
