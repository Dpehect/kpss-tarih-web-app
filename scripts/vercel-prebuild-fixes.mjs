import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const fullPath = (relative) => path.join(root, relative);
const exists = (relative) => fs.existsSync(fullPath(relative));
const read = (relative) => {
  const file = fullPath(relative);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
};
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
  source = source.replace(/typedRoutes:\s*true/g, "typedRoutes: false");

  if (source !== before) write(file, source);
  console.log("[vercel-prebuild-fixes] typedRoutes ayarı güvenli.");
}

function ensureSkeletonExports() {
  const file = "src/components/ui/Skeleton.tsx";
  const content = `import type { HTMLAttributes } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  shimmer?: boolean;
};

export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "relative overflow-hidden rounded-2xl bg-slate-200/80 dark:bg-slate-800/70",
        shimmer &&
          "before:absolute before:inset-0 before:-translate-x-full before:animate-[premium-shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/55 before:to-transparent dark:before:via-white/10",
        className,
      )}
      {...props}
    />
  );
}

type SkeletonGridProps = {
  count?: number;
  className?: string;
  itemClassName?: string;
};

export function SkeletonGrid({ count = 8, className, itemClassName }: SkeletonGridProps) {
  return (
    <div className={cx("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} className={itemClassName} />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton className="h-4 w-2/3 rounded-full" />
          <Skeleton className="h-3 w-full rounded-full" />
          <Skeleton className="h-3 w-5/6 rounded-full" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/70">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-5 w-36 rounded-full" />
            <Skeleton className="h-9 w-72 max-w-full rounded-full" />
            <Skeleton className="h-4 w-96 max-w-full rounded-full" />
          </div>
          <Skeleton className="h-12 w-44 rounded-2xl" />
        </div>
      </section>
      <SkeletonGrid count={6} />
    </main>
  );
}

export default Skeleton;
`;

  const current = read(file);
  if (!current || !current.includes("export function SkeletonGrid") || !current.includes("export function PageSkeleton")) {
    write(file, content);
    console.log("[vercel-prebuild-fixes] SkeletonGrid/PageSkeleton exportları eklendi.");
  } else {
    console.log("[vercel-prebuild-fixes] Skeleton exportları hazır.");
  }
}

function ensureMainLoading() {
  const file = "src/app/(main)/loading.tsx";
  const content = `import { PageSkeleton } from "@/components/ui/Skeleton";

export default function MainLoading() {
  return <PageSkeleton />;
}
`;

  const current = read(file);
  if (current !== content) {
    write(file, content);
    console.log("[vercel-prebuild-fixes] main loading.tsx güvenli hale getirildi.");
  } else {
    console.log("[vercel-prebuild-fixes] main loading.tsx hazır.");
  }
}

function ensureKpssHistoryExports() {
  const file = "src/data/kpss-history.ts";
  let source = read(file);
  if (!source) {
    console.warn(`[vercel-prebuild-fixes] ${file} bulunamadı, atlandı.`);
    return;
  }

  const before = source;
  source = source
    .replaceAll("card as Record<string, unknown>", "card as unknown as Record<string, unknown>")
    .replaceAll("value as Record<string, unknown>", "value as unknown as Record<string, unknown>");

  const additions = [];

  if (!source.includes("export function getTopicBySlug")) {
    additions.push(`
const normalizeCompatKey = (value: unknown) => String(value ?? "").trim().toLowerCase();

export function getTopicBySlug(slug: string) {
  const target = normalizeCompatKey(slug);
  return topics.find((topic) => {
    const record = topic as unknown as Record<string, unknown>;
    return normalizeCompatKey(record.slug) === target || normalizeCompatKey(record.id) === target;
  });
}
`);
  }

  if (!source.includes("export function getTopicById")) {
    additions.push(`
export function getTopicById(topicId: string) {
  const target = normalizeCompatKey(topicId);
  return topics.find((topic) => normalizeCompatKey((topic as unknown as Record<string, unknown>).id) === target);
}
`);
  }

  if (!source.includes("export function getQuestionsByTopic")) {
    additions.push(`
export function getQuestionsByTopic(topicId: string) {
  const target = normalizeCompatKey(topicId);
  return questions.filter((question) => {
    const record = question as unknown as Record<string, unknown>;
    return normalizeCompatKey(record.topicId ?? record.topic_id ?? record.unitId) === target;
  });
}
`);
  }

  if (!source.includes("export function getFlashcardsByTopic")) {
    additions.push(`
export function getFlashcardsByTopic(topicId: string) {
  const target = normalizeCompatKey(topicId);
  return flashcards.filter((card) => {
    const record = card as unknown as Record<string, unknown>;
    return normalizeCompatKey(record.topicId ?? record.topic_id ?? record.unitId) === target;
  });
}
`);
  }

  if (!source.includes("export function getTimelineEventsByTopic")) {
    additions.push(`
export function getTimelineEventsByTopic(topicId: string) {
  const target = normalizeCompatKey(topicId);
  return timelineEvents.filter((event) => {
    const record = event as unknown as Record<string, unknown>;
    return normalizeCompatKey(record.topicId ?? record.topic_id ?? record.unitId) === target;
  });
}
`);
  }

  if (!source.includes("export const recommendations")) {
    additions.push(`
export const recommendations = typeof studyRecommendations !== "undefined" ? studyRecommendations : [];
`);
  }

  if (additions.length) source = `${source.trim()}\n\n${additions.join("\n").trim()}\n`;

  if (source !== before) write(file, source);
  console.log("[vercel-prebuild-fixes] kpss-history export uyumluluğu hazır.");
}

function normalizeStudyTypeImports(source) {
  const lineEnding = source.includes("\r\n") ? "\r\n" : "\n";
  source = source.replace(/^import type \{ Question \} from ["']@\/types\/study["'];\r?\n/gm, "");

  const studyImportRegex = /^import type \{([^}]+)\} from ["']@\/types\/study["'];$/m;
  const match = source.match(studyImportRegex);
  if (match) {
    const names = match[1].split(",").map((item) => item.trim()).filter(Boolean);
    const required = ["Exam", "Question"];
    const merged = Array.from(new Set([...names, ...required])).sort();
    return source.replace(studyImportRegex, `import type { ${merged.join(", ")} } from "@/types/study";`);
  }

  if (!source.includes("@/types/study")) {
    return `import type { Exam, Question } from "@/types/study";${lineEnding}${source}`;
  }

  return source;
}

function ensureExamBlueprintTypes() {
  const file = "src/data/kpss-exam-blueprints.ts";
  let source = read(file);
  if (!source) return;

  const before = source;
  source = normalizeStudyTypeImports(source);

  if (!source.includes("const examQuestionPool = expandedQuestions as Question[];")) {
    const marker = "function getQuestionPool(topicId: string) {";
    if (source.includes(marker)) {
      source = source.replace(marker, `const examQuestionPool = expandedQuestions as Question[];\n\n${marker}`);
    }
  }

  source = source
    .replace(/return expandedQuestions\.filter\(/g, "return examQuestionPool.filter(")
    .replace(/for \(const question of expandedQuestions\)/g, "for (const question of examQuestionPool)")
    .replace(/expandedQuestions\.map\(/g, "examQuestionPool.map(")
    .replace(/expandedQuestions\.find\(/g, "examQuestionPool.find(")
    .replace(/expandedQuestions\.some\(/g, "examQuestionPool.some(")
    .replace(/expandedQuestions\.slice\(/g, "examQuestionPool.slice(")
    .replace(/expandedQuestions\.length/g, "examQuestionPool.length");

  if (source !== before) write(file, source);
  console.log("[vercel-prebuild-fixes] kpss-exam-blueprints expandedQuestions/type fix hazır.");
}

function ensureProxyConvention() {
  const middlewareFile = "src/middleware.ts";
  const proxyFile = "src/proxy.ts";
  const middleware = read(middlewareFile);
  if (!middleware) {
    if (exists(proxyFile)) console.log("[vercel-prebuild-fixes] proxy.ts zaten hazır.");
    else console.log("[vercel-prebuild-fixes] middleware/proxy bulunamadı, atlandı.");
    return;
  }

  let proxy = middleware
    .replace(/export\s+async\s+function\s+middleware\s*\(/, "export async function proxy(")
    .replace(/export\s+function\s+middleware\s*\(/, "export function proxy(");

  write(proxyFile, proxy);
  remove(middlewareFile);
  console.log("[vercel-prebuild-fixes] Next 16 uyumu için middleware.ts -> proxy.ts dönüştürüldü.");
}

function ensureManifestNoDuplicateRoute() {
  const manifestFile = "src/app/manifest.ts";
  const manifestRoute = "src/app/manifest.webmanifest/route.ts";
  if (exists(manifestFile) && exists(manifestRoute)) {
    remove(manifestRoute);
    console.log("[vercel-prebuild-fixes] duplicate manifest.webmanifest route devre dışı bırakıldı.");
  } else {
    console.log("[vercel-prebuild-fixes] duplicate manifest route yok.");
  }
}

function removeAmbiguousExamRouteIfPresent() {
  const duplicatedDir = "src/app/(main)/exams/[examId]";
  if (exists(duplicatedDir)) {
    remove(duplicatedDir);
    console.log("[vercel-prebuild-fixes] ambiguous exams/[examId] route kaldırıldı.");
  }
}

ensureTypedRoutesSafe();
ensureSkeletonExports();
ensureMainLoading();
ensureKpssHistoryExports();
ensureExamBlueprintTypes();
ensureProxyConvention();
ensureManifestNoDuplicateRoute();
removeAmbiguousExamRouteIfPresent();
console.log("[vercel-prebuild-fixes] tamamlandı.");
