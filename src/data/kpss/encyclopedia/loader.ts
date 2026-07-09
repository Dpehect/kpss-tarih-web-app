import fs from "fs";
import path from "path";
import type { EncyclopediaEntry } from "./types";

let encyclopediaCache: EncyclopediaEntry[] | null = null;

export function loadEncyclopedia(): EncyclopediaEntry[] {
  if (encyclopediaCache) return encyclopediaCache;

  try {
    const seedsDir = path.join(process.cwd(), "src", "data", "kpss", "encyclopedia", "seeds");
    const files = fs.readdirSync(seedsDir).filter(f => f.endsWith(".json"));
    
    const entries: EncyclopediaEntry[] = [];
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(seedsDir, file), "utf8");
      const parsed = JSON.parse(content) as EncyclopediaEntry[];
      entries.push(...parsed);
    }
    
    encyclopediaCache = entries;
    return entries;
  } catch (error) {
    console.error("[Encyclopedia Loader] Failed to load local JSON files:", error);
    return [];
  }
}
