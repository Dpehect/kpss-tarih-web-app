import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const targets = [
  "src/lib/ai",
  "src/app/api/chat",
  "src/app/api/kpss-tutor",
  "src/app/api/gemini",
  "src/app/api/ai",
  "src/features/chatbot",
];

const forbidden = [
  "çevrim içi model anahtarı",
  "model anahtarı",
  "GEMINI_API_KEY",
  "GOOGLE_API_KEY",
  "net eşleştiremedim",
  "site bilgi havuzunda net",
  "sallama cevap üretmiyorum",
  ".env.local dosyasına ekleyin",
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) return [full];
    return [];
  });
}

const files = targets.flatMap((target) => walk(path.join(root, target)));
const hits = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8").toLocaleLowerCase("tr-TR");
  for (const phrase of forbidden) {
    if (text.includes(phrase.toLocaleLowerCase("tr-TR"))) {
      hits.push(`${path.relative(root, file)} -> ${phrase}`);
    }
  }
}

if (hits.length) {
  console.error("[audit-chatbot-copy] Chatbot kullanıcıya teknik/amatör fallback metni gösterebilir:");
  for (const hit of hits) console.error(`- ${hit}`);
  process.exit(1);
}

console.log("[audit-chatbot-copy] Chatbot fallback metinleri temiz.");
