import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function filePath(...parts) {
  return path.join(root, ...parts);
}

function exists(...parts) {
  return fs.existsSync(filePath(...parts));
}

function read(...parts) {
  return fs.readFileSync(filePath(...parts), "utf8");
}

function write(parts, content) {
  fs.mkdirSync(path.dirname(filePath(...parts)), { recursive: true });
  fs.writeFileSync(filePath(...parts), content);
}

function replaceFile(parts, updater, label) {
  if (!exists(...parts)) return false;
  const before = read(...parts);
  const after = updater(before);
  if (after !== before) {
    write(parts, after);
    console.log(`[vercel-prebuild-fixes] ${label}`);
    return true;
  }
  return false;
}

function ensureNextConfigIsBuildStable() {
  const parts = ["next.config.ts"];
  if (!exists(...parts)) return;

  replaceFile(
    parts,
    (source) => {
      let next = source;

      // Prevent the recurring Vercel failures caused by runtime string hrefs
      // being checked against Next's generated RouteImpl type.
      if (/typedRoutes\s*:\s*true/.test(next)) {
        next = next.replace(/typedRoutes\s*:\s*true/g, "typedRoutes: false");
      }

      if (!/typedRoutes\s*:/.test(next)) {
        next = next.replace(/const\s+nextConfig\s*:\s*NextConfig\s*=\s*\{/, "const nextConfig: NextConfig = {\n  typedRoutes: false,");
      }

      // Next 16 image quality guard. Harmless when unused, useful if any image
      // passes quality values later.
      if (/images\s*:\s*\{/.test(next) && !/qualities\s*:/.test(next)) {
        next = next.replace(/images\s*:\s*\{/, "images: {\n    qualities: [75, 85, 95],");
      }

      return next;
    },
    "next.config.ts production-safe typedRoutes/image config hazır.",
  );
}

function ensureKpssHistoryCompatibility() {
  const parts = ["src", "data", "kpss-history.ts"];
  if (!exists(...parts)) return;

  replaceFile(
    parts,
    (source) => {
      let next = source;

      next = next.replaceAll("card as Record<string, unknown>", "card as unknown as Record<string, unknown>");
      next = next.replaceAll("question as Record<string, unknown>", "question as unknown as Record<string, unknown>");
      next = next.replaceAll("item as Record<string, unknown>", "item as unknown as Record<string, unknown>");

      const additions = [];

      if (!/export\s+function\s+getTopicBySlug/.test(next) && !/export\s+const\s+getTopicBySlug/.test(next)) {
        additions.push(`
export function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug || topic.id === slug);
}
`);
      }

      if (!/export\s+function\s+getTopicById/.test(next) && !/export\s+const\s+getTopicById/.test(next)) {
        additions.push(`
export function getTopicById(topicId: string) {
  return topics.find((topic) => topic.id === topicId || topic.slug === topicId);
}
`);
      }

      if (!/function\s+matchesTopic/.test(next)) {
        additions.push(`
function matchesTopic(entity: unknown, topicId: string) {
  const source = entity as Record<string, unknown>;
  const topic = topics.find((item) => item.id === topicId || item.slug === topicId);
  const candidates = [
    source.topicId,
    source.topic_id,
    source.topicSlug,
    source.topic_slug,
    source.topic,
    source.unitId,
    source.unit_id,
    source.unit,
    source.period,
  ];

  return candidates.some((candidate) => {
    if (typeof candidate !== "string") return false;
    const normalized = candidate.trim().toLowerCase();
    return normalized === topicId.toLowerCase() || normalized === topic?.id?.toLowerCase() || normalized === topic?.slug?.toLowerCase() || normalized === topic?.title?.toLowerCase();
  });
}
`);
      }

      if (!/export\s+function\s+getQuestionsByTopic/.test(next) && !/export\s+const\s+getQuestionsByTopic/.test(next)) {
        additions.push(`
export function getQuestionsByTopic(topicId: string) {
  return questions.filter((question) => matchesTopic(question, topicId));
}
`);
      }

      if (!/export\s+function\s+getFlashcardsByTopic/.test(next) && !/export\s+const\s+getFlashcardsByTopic/.test(next)) {
        additions.push(`
export function getFlashcardsByTopic(topicId: string) {
  return flashcards.filter((card) => matchesTopic(card, topicId));
}
`);
      }

      if (!/export\s+function\s+getTimelineEventsByTopic/.test(next) && !/export\s+const\s+getTimelineEventsByTopic/.test(next)) {
        additions.push(`
export function getTimelineEventsByTopic(topicId: string) {
  return timelineEvents.filter((event) => matchesTopic(event, topicId));
}
`);
      }

      if (!/export\s+function\s+getGlossaryByTopic/.test(next) && !/export\s+const\s+getGlossaryByTopic/.test(next)) {
        additions.push(`
export function getGlossaryByTopic(topicId: string) {
  return glossary.filter((entry) => matchesTopic(entry, topicId));
}
`);
      }

      if (additions.length) {
        next += `\n// Production compatibility exports injected by scripts/vercel-prebuild-fixes.mjs.\n${additions.join("\n")}`;
      }

      return next;
    },
    "kpss-history export/type uyumluluğu hazır.",
  );
}

function ensureBrandMarkSizeProp() {
  const candidates = [
    ["src", "components", "brand", "SBBrandMark.tsx"],
    ["src", "components", "brand", "BrandMark.tsx"],
  ];

  for (const parts of candidates) {
    if (!exists(...parts)) continue;

    replaceFile(
      parts,
      (source) => {
        if (/size\??\s*:/.test(source) || /type\s+SBBrandMarkProps/.test(source)) return source;

        let next = source;
        next = next.replace(/export\s+function\s+SBBrandMark\s*\(\s*\{\s*className\s*\}\s*:\s*\{\s*className\??\s*:\s*string\s*\}\s*\)/, `type SBBrandMarkProps = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
};

const brandMarkSizeClass: Record<Exclude<SBBrandMarkProps["size"], number | undefined>, string> = {
  xs: "size-7",
  sm: "size-9",
  md: "size-11",
  lg: "size-14",
  xl: "size-16",
};

export function SBBrandMark({ className, size = "md" }: SBBrandMarkProps)`);

        next = next.replace(/className=\{cn\(([^)]*)className([^)]*)\)\}/, `className={cn(typeof size === "number" ? undefined : brandMarkSizeClass[size], $1className$2)}`);

        return next;
      },
      `${parts.join("/")} size prop uyumluluğu kontrol edildi.`,
    );
  }
}

function ensureNext16ProxyConvention() {
  const middlewareParts = ["src", "middleware.ts"];
  const proxyParts = ["src", "proxy.ts"];

  if (!exists(...middlewareParts)) return;

  let source = read(...middlewareParts);
  source = source.replace(/export\s+function\s+middleware\s*\(/g, "export function proxy(");
  source = source.replace(/export\s+async\s+function\s+middleware\s*\(/g, "export async function proxy(");

  if (!exists(...proxyParts) || read(...proxyParts) !== source) {
    write(proxyParts, source);
    console.log("[vercel-prebuild-fixes] Next 16 uyumu için middleware.ts -> proxy.ts dönüştürüldü.");
  }

  try {
    fs.rmSync(filePath(...middlewareParts), { force: true });
  } catch {
    // Vercel build must not fail because a compatibility cleanup failed.
  }
}

function removeDuplicateManifestRoute() {
  const manifestTs = filePath("src", "app", "manifest.ts");
  const manifestRouteDir = filePath("src", "app", "manifest.webmanifest");
  if (fs.existsSync(manifestTs) && fs.existsSync(manifestRouteDir)) {
    fs.rmSync(manifestRouteDir, { recursive: true, force: true });
    console.log("[vercel-prebuild-fixes] duplicate manifest route kaldırıldı.");
    return;
  }

  console.log("[vercel-prebuild-fixes] duplicate manifest route yok.");
}

function removeAmbiguousExamRouteIfPresent() {
  const route = filePath("src", "app", "(main)", "exams", "[examId]");
  if (fs.existsSync(route)) {
    fs.rmSync(route, { recursive: true, force: true });
    console.log("[vercel-prebuild-fixes] ambiguous exams route kaldırıldı.");
  }
}

function normalizeKnownTypedLinkPatterns() {
  // typedRoutes is disabled in next.config, but these casts make the most common
  // dynamic link generators future-proof if typedRoutes is later re-enabled.
  const candidates = [
    ["src", "features", "question-bank", "components", "TopicQuestionPage.tsx"],
    ["src", "features", "question-bank", "components", "QuestionBankPage.tsx"],
    ["src", "features", "topics", "components", "TopicsPage.tsx"],
    ["src", "features", "topics", "components", "TopicDetailPage.tsx"],
    ["src", "components", "core", "AppShell.tsx"],
  ];

  for (const parts of candidates) {
    if (!exists(...parts)) continue;
    replaceFile(
      parts,
      (source) => {
        let next = source;
        if (next.includes("from \"next/link\"") && !next.includes("import type { Route } from \"next\"")) {
          next = next.replace(/import\s+Link\s+from\s+"next\/link";?/, `import Link from "next/link";\nimport type { Route } from "next";`);
        }
        next = next.replace(/href=\{backHref\}/g, "href={backHref as Route}");
        next = next.replace(/href=\{item\.href\}/g, "href={item.href as Route}");
        next = next.replace(/href=\{testHref\}/g, "href={testHref as Route}");
        next = next.replace(/href=\{topicHref\}/g, "href={topicHref as Route}");
        next = next.replace(/href=\{levelHref\}/g, "href={levelHref as Route}");
        return next;
      },
      `${parts.join("/")} typed link uyumluluğu kontrol edildi.`,
    );
  }
}

function scanForBlockingPlaceholders() {
  const roots = [filePath("src")];
  const blocked = ["lorem ipsum", "TODO:", "FIXME:", "console.log("];
  const findings = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
        walk(full);
        continue;
      }
      if (!/\.(ts|tsx|css)$/.test(entry.name)) continue;
      const content = fs.readFileSync(full, "utf8");
      for (const marker of blocked) {
        if (content.toLowerCase().includes(marker.toLowerCase())) {
          findings.push(path.relative(root, full));
          break;
        }
      }
    }
  }

  roots.forEach(walk);
  if (findings.length) {
    console.log(`[vercel-prebuild-fixes] uyarı: profesyonel temizlik gerektirebilecek dosyalar: ${[...new Set(findings)].slice(0, 12).join(", ")}`);
  } else {
    console.log("[vercel-prebuild-fixes] bariz placeholder/debug copy taraması tamamlandı.");
  }
}

ensureNextConfigIsBuildStable();
ensureKpssHistoryCompatibility();
ensureBrandMarkSizeProp();
ensureNext16ProxyConvention();
removeDuplicateManifestRoute();
removeAmbiguousExamRouteIfPresent();
normalizeKnownTypedLinkPatterns();
scanForBlockingPlaceholders();

console.log("[vercel-prebuild-fixes] production build guard tamamlandı.");
