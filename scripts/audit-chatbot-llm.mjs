import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "src/features/chatbot/components/ChatbotWidget.tsx",
  "src/lib/ai/kpss-tutor.ts",
  "src/app/api/chat/route.ts",
  "src/app/api/kpss-tutor/route.ts",
  "src/app/api/gemini/route.ts",
  "src/app/api/ai/route.ts",
];

const forbidden = [
  /model anahtar/i,
  /site bilgi havuzunda net eşleştiremedim/i,
  /çevrim içi model anahtarı/i,
  /sallama cevap üret/i,
  /Yanlış eşleşmeye kilit/i,
];

for (const file of files) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) {
    throw new Error(`[audit-chatbot-llm] Eksik dosya: ${file}`);
  }

  const content = fs.readFileSync(abs, "utf8");
  for (const pattern of forbidden) {
    if (pattern.test(content)) {
      throw new Error(`[audit-chatbot-llm] Kullanıcıya gösterilmemesi gereken metin bulundu: ${file} -> ${pattern}`);
    }
  }
}

const tutor = fs.readFileSync(path.join(root, "src/lib/ai/kpss-tutor.ts"), "utf8");
if (!tutor.includes("@google/generative-ai")) {
  throw new Error("[audit-chatbot-llm] Gemini LLM fallback bağlantısı yok.");
}
if (!tutor.includes("answerKpssQuestion")) {
  throw new Error("[audit-chatbot-llm] answerKpssQuestion exportu yok.");
}

const widget = fs.readFileSync(path.join(root, "src/features/chatbot/components/ChatbotWidget.tsx"), "utf8");
if (!widget.includes("LLM destekli sınav öğretmeni")) {
  throw new Error("[audit-chatbot-llm] Premium chatbot başlığı güncel değil.");
}
if (!widget.includes("textarea")) {
  throw new Error("[audit-chatbot-llm] Yazılabilir textarea inputu yok.");
}

console.log("[audit-chatbot-llm] Chatbot LLM, okunabilirlik ve kötü fallback kontrolleri geçti.");
