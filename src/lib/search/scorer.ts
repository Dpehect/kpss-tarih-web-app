import type { EncyclopediaEntry } from "@/data/kpss/encyclopedia/types";
import { extractTokens, normalizeText } from "./normalizer";
import { isFuzzyMatch } from "./levenshtein";

export function scoreEntries(query: string, entries: EncyclopediaEntry[]): Array<{ entry: EncyclopediaEntry; score: number }> {
  const queryTokens = extractTokens(query);
  const normalizedQuery = normalizeText(query);
  
  if (queryTokens.length === 0) return [];

  const results = entries.map(entry => {
    let score = 0;
    const normalizedTitle = normalizeText(entry.title);
    
    // 1. Exact Title Match (Highest Score)
    if (normalizedTitle === normalizedQuery) {
      score += 100;
    }
    
    // 2. Exact Alias Match
    const normalizedAliases = entry.aliases.map(a => normalizeText(a));
    if (normalizedAliases.includes(normalizedQuery)) {
      score += 90;
    }

    // 3. Keyword / Token matches
    const entryTokens = [
      ...extractTokens(entry.title),
      ...entry.keywords.map(k => normalizeText(k)),
      ...entry.aliases.flatMap(a => extractTokens(a))
    ];
    
    const uniqueEntryTokens = Array.from(new Set(entryTokens));

    for (const qToken of queryTokens) {
      // Exact token match
      if (uniqueEntryTokens.includes(qToken)) {
        score += 10;
        continue;
      }
      
      // Fuzzy match for typos (e.g. "tlas" -> "talas")
      const maxDist = qToken.length > 5 ? 2 : 1;
      const fuzzyMatch = uniqueEntryTokens.find(eToken => isFuzzyMatch(qToken, eToken, maxDist));
      if (fuzzyMatch) {
        score += 5;
      }
    }
    
    // 4. Full text search fallback (low score)
    const normalizedExplanation = normalizeText(entry.detailedExplanation);
    for (const qToken of queryTokens) {
      if (normalizedExplanation.includes(qToken)) {
        score += 1;
      }
    }

    return { entry, score };
  });

  return results.filter(r => r.score > 0).sort((a, b) => b.score - a.score);
}
