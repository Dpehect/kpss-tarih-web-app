import { loadEncyclopedia } from "@/data/kpss/encyclopedia/loader";
import { scoreEntries } from "./scorer";
import type { EncyclopediaEntry } from "@/data/kpss/encyclopedia/types";

export function buildStructuredAnswer(entry: EncyclopediaEntry): string {
  const lines = [
    `**${entry.title}**`,
    "",
    `_${entry.shortDefinition}_`,
    "",
    entry.detailedExplanation,
    "",
    "**Önemli Gerçekler:**",
    ...entry.keyFacts.map(fact => `- ${fact}`),
    "",
    `**KPSS İpucu:** ${entry.examImportance}`
  ];

  if (entry.timeline && entry.timeline.length > 0) {
    lines.push("");
    lines.push("**Tarihsel Süreç:**");
    lines.push(...entry.timeline.map(t => `- ${t.year}: ${t.event}`));
  }

  return lines.join("\n");
}

export function searchLocalEncyclopedia(query: string) {
  const entries = loadEncyclopedia();
  const scored = scoreEntries(query, entries);
  
  if (scored.length === 0 || scored[0].score < 5) {
    return null; // Not found or score too low
  }

  const bestMatch = scored[0].entry;
  const answer = buildStructuredAnswer(bestMatch);
  
  return {
    reply: answer,
    answer: answer,
    source: "site-knowledge",
    sourceMode: "site-knowledge",
    confidence: scored[0].score > 50 ? 0.95 : 0.70,
    matchedTitle: bestMatch.title,
    sources: [{ type: "Doğrudan Bilgi", title: bestMatch.category }]
  };
}
