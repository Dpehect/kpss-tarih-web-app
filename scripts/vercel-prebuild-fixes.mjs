import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const log = (message) => console.log(`[vercel-prebuild-fixes] ${message}`);

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function writeIfChanged(file, next) {
  const current = read(file);
  if (current !== next) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, next);
    return true;
  }
  return false;
}

function ensureTypedRoutesDisabled() {
  const file = path.join(root, "next.config.ts");
  let source = read(file);
  if (!source) return;

  if (/typedRoutes\s*:\s*true/.test(source)) {
    source = source.replace(/typedRoutes\s*:\s*true/g, "typedRoutes: false");
    writeIfChanged(file, source);
    log("typedRoutes false yapıldı; dinamik JSON linkleri RouteImpl hatası üretmez.");
    return;
  }

  if (!/typedRoutes\s*:/.test(source)) {
    source = source.replace(/const\s+nextConfig\s*:\s*NextConfig\s*=\s*{/, "const nextConfig: NextConfig = {\n  typedRoutes: false,");
    writeIfChanged(file, source);
    log("typedRoutes güvenli varsayılan olarak eklendi.");
    return;
  }

  log("typedRoutes ayarı güvenli.");
}

function ensureNextProxyConvention() {
  const middlewareFile = path.join(root, "src", "middleware.ts");
  const proxyFile = path.join(root, "src", "proxy.ts");
  if (!fs.existsSync(middlewareFile)) {
    log("middleware.ts yok; proxy uyumu kontrolü geçildi.");
    return;
  }

  let source = read(middlewareFile).replace(/export\s+function\s+middleware/g, "export function proxy");
  if (!fs.existsSync(proxyFile)) writeIfChanged(proxyFile, source);
  fs.rmSync(middlewareFile, { force: true });
  log("Next 16 uyumu için middleware.ts -> proxy.ts dönüştürüldü.");
}

function ensureHistoryExports() {
  const file = path.join(root, "src", "data", "kpss-history.ts");
  let source = read(file);
  if (!source) return;

  source = source.replace(/as\s+Record<string,\s*unknown>/g, "as unknown as Record<string, unknown>");
  source = source.replace(/as\s+Record(?!<)/g, "as unknown as Record<string, unknown>");

  const additions = [];
  if (!/export\s+function\s+getTopicBySlug/.test(source)) {
    additions.push(`export function getTopicBySlug(slug: string) {\n  return topics.find((topic) => topic.slug === slug);\n}`);
  }
  if (!/export\s+function\s+getTopicById/.test(source)) {
    additions.push(`export function getTopicById(topicId: string) {\n  return topics.find((topic) => topic.id === topicId);\n}`);
  }
  if (!/export\s+function\s+getQuestionsByTopic/.test(source)) {
    additions.push(`export function getQuestionsByTopic(topicId: string) {\n  return questions.filter((question) => question.topicId === topicId);\n}`);
  }
  if (!/export\s+function\s+getFlashcardsByTopic/.test(source)) {
    additions.push(`export function getFlashcardsByTopic(topicId: string) {\n  return flashcards.filter((card) => card.topicId === topicId);\n}`);
  }
  if (!/export\s+function\s+getTimelineEventsByTopic/.test(source)) {
    additions.push(`export function getTimelineEventsByTopic(topicId: string) {\n  return timelineEvents.filter((event) => event.topicId === topicId);\n}`);
  }

  if (additions.length > 0) source = `${source.trim()}\n\n${additions.join("\n\n")}\n`;
  writeIfChanged(file, source);
  log("kpss-history export uyumluluğu hazır.");
}

function removeDuplicateManifestRoute() {
  const manifestRoute = path.join(root, "src", "app", "manifest.webmanifest", "route.ts");
  const manifestTs = path.join(root, "src", "app", "manifest.ts");
  if (fs.existsSync(manifestRoute) && fs.existsSync(manifestTs)) {
    fs.rmSync(path.dirname(manifestRoute), { recursive: true, force: true });
    log("duplicate manifest route kaldırıldı.");
    return;
  }
  log("duplicate manifest route yok.");
}

function guardBrandMarkSizeProp() {
  const file = path.join(root, "src", "components", "brand", "SBBrandMark.tsx");
  const source = read(file);
  if (!source) return;
  if (source.includes("size?:")) {
    log("SBBrandMark size prop uyumu hazır.");
    return;
  }
  const next = `import { cn } from "@/lib/cn";\n\nexport function SBBrandMark({ className, size = "md" }: { className?: string; size?: "xs" | "sm" | "md" | "lg" | "xl" | number }) {\n  const classes = typeof size === "number" ? "text-sm" : ({ xs: "size-8 text-[11px]", sm: "size-10 text-xs", md: "size-12 text-sm", lg: "size-14 text-base", xl: "size-16 text-lg" } as const)[size];\n  const style = typeof size === "number" ? { width: size, height: size } : undefined;\n  return <span style={style} className={cn("grid place-items-center rounded-2xl bg-[linear-gradient(135deg,#1E3A8A,#2563EB_58%,#D97706)] font-black text-white shadow-[0_18px_42px_rgba(30,58,138,.24)]", classes, className)}>SB</span>;\n}\n`;
  writeIfChanged(file, next);
  log("SBBrandMark size prop uyumu eklendi.");
}

ensureTypedRoutesDisabled();
ensureNextProxyConvention();
ensureHistoryExports();
removeDuplicateManifestRoute();
guardBrandMarkSizeProp();
log("tamamlandı.");
