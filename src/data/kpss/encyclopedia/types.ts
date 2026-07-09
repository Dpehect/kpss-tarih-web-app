export interface EncyclopediaEntry {
  id: string;
  category: string;
  title: string;
  aliases: string[];
  keywords: string[];
  shortDefinition: string;
  detailedExplanation: string;
  keyFacts: string[];
  examImportance: string;
  timeline?: Array<{ year: string; event: string }>;
  relatedEntryIds?: string[];
}
