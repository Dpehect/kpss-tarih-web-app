import type { EncyclopediaEntry } from "@/data/kpss/encyclopedia/types";
import { extractTokens, normalizeText } from "./normalizer";
import { isFuzzyMatch } from "./levenshtein";

const GENERIC_WORDS = new Set([
  "savas", "savasi", "muharebe", "muharebesi", "antlasma", "antlasmasi",
  "donem", "donemi", "devlet", "devleti", "isyan", "isyani", "olay", "olayi",
  "vaka", "vakasi", "tarih", "tarihi", "hukumdar", "hukumdari", "kagan", "kagani",
  "han", "hani", "padisah", "padisahi", "bey", "beyi", "ferman", "fermani",
  "kongre", "kongresi", "genelge", "genelgesi", "meclis", "meclisi"
]);

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
    let matchedNonGenericCount = 0;
    let matchedGenericCount = 0;

    for (const qToken of queryTokens) {
      // Exact token match
      if (uniqueEntryTokens.includes(qToken)) {
        score += 10;
        if (GENERIC_WORDS.has(qToken)) {
          matchedGenericCount++;
        } else {
          matchedNonGenericCount++;
        }
        continue;
      }
      
      // Fuzzy match for typos (e.g. "tlas" -> "talas")
      // Do NOT fuzzy match generic words (like "savasi" -> "sivas")
      if (!GENERIC_WORDS.has(qToken)) {
        const maxDist = qToken.length > 5 ? 2 : 1;
        const fuzzyMatch = uniqueEntryTokens.find(eToken => !GENERIC_WORDS.has(eToken) && isFuzzyMatch(qToken, eToken, maxDist));
        if (fuzzyMatch) {
          score += 5;
          matchedNonGenericCount++;
        }
      }
    }
    
    // 4. Full text search fallback (low score)
    const normalizedExplanation = normalizeText(entry.detailedExplanation);
    let fullTextMatches = 0;
    for (const qToken of queryTokens) {
      if (normalizedExplanation.includes(qToken)) {
        score += 1;
        fullTextMatches++;
      }
    }

    // PENALTY LOGIC:
    // If we only matched generic words (e.g. "savasi") and no specific terms,
    // or if the match overlap is extremely weak for a multi-token query.
    const totalKeywordMatches = matchedNonGenericCount + matchedGenericCount;
    if (queryTokens.length > 1) {
      if (totalKeywordMatches === 0 && fullTextMatches > 0) {
        // Only matched in full text, no title/alias/keyword matches at all
        score = Math.min(score, 4); // Keep below threshold
      } else if (matchedNonGenericCount === 0 && matchedGenericCount > 0) {
        // Only matched generic words in a multi-token query (e.g., matched "savasi" but not "talas")
        score = 0;
      }
    }

    return { entry, score };
  });

  return results.filter(r => r.score > 0).sort((a, b) => b.score - a.score);
}
