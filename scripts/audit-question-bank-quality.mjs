#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const staticQuestions = fs.readFileSync(path.join(root, "src/data/static-questions.ts"), "utf8");
const tutor = fs.readFileSync(path.join(root, "src/lib/ai/kpss-tutor.ts"), "utf8");
const widget = fs.readFileSync(path.join(root, "src/features/chatbot/components/ChatbotWidget.tsx"), "utf8");

const checks = [
  ["Put Kırıcı sorusu Gazneli Mahmut'a bağlı", /Put Kırıcı[\s\S]*Gazneli Mahmut/.test(staticQuestions) && /put-kirici[\s\S]*Gazneli Mahmut/.test(tutor)],
  ["Artuklular Put Kırıcı ile karıştırılmıyor", /Artuklular[\s\S]*Malabadi/.test(tutor) && /Put Kırıcı unvanı Artuklulara değil Gazneli Mahmut/.test(tutor)],
  ["Kronoloji sorusunda doğru cevap A", /Sened-i İttifak → Tanzimat Fermanı → I\. Meşrutiyet[\s\S]*correctChoiceId: "A"/.test(staticQuestions)],
  ["Chat input görünür ve yazılabilir", /ref=\{inputRef\}/.test(widget) && /onChange=\{\(event\) => setInput\(event\.target\.value\)\}/.test(widget) && /text-slate-950/.test(widget)],
];

const failed = checks.filter(([, ok]) => !ok);
for (const [name, ok] of checks) {
  console.log(`${ok ? "✓" : "✗"} ${name}`);
}

if (failed.length) {
  console.error(`\n${failed.length} kritik kalite kontrolü başarısız.`);
  process.exit(1);
}

console.log("\nSoru bankası ve chatbot kritik kalite kontrolleri geçti.");
