import { exams, flashcards, glossary, questions, timelineEvents, topics } from "@/data/kpss-history";
import { pastQuestionTrends } from "@/data/past-questions";

export type SearchResult = {
  id: string;
  type: "Konu" | "Soru" | "Flashcard" | "Deneme" | "Timeline" | "Kavram" | "Çıkmış Soru";
  title: string;
  description: string;
  href: string;
  score: number;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function scoreText(query: string, ...fields: string[]) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const stopWords = new Set(["nedir", "kimdir", "maddeleri", "hakkında", "nelerdir", "anlaşması", "savaşı", "kanunu", "ve", "ile", "için", "olan", "olayı", "sorusu", "dönemi", "tarihi", "özeti"]);
  const tokens = normalizedQuery.split(/\s+/).filter(token => token.length >= 2 && !stopWords.has(token));
  const haystack = normalize(fields.join(" "));
  const haystackTokens = haystack.split(/\s+/).filter(token => token.length >= 2);
  let score = 0;

  if (tokens.length === 0) {
    // Eğer tüm kelimeler stop word ise, normal token'ları kullan
    const backupTokens = normalizedQuery.split(/\s+/).filter(token => token.length >= 2);
    tokens.push(...backupTokens);
  }

  for (const token of tokens) {
    // Tam veya substring eşleşme
    if (haystack.includes(token)) {
      score += 12; // Puanı 8'den 12'ye çıkardık!
      continue;
    }
    
    // Türkçe ek toleranslı arama (Örn: "lozanı" -> "lozan")
    const match = haystackTokens.some(hToken => {
      if (token.length >= 3 && hToken.length >= 3) {
        const minLen = Math.min(token.length, hToken.length);
        const prefixLen = Math.max(3, minLen - 1);
        return hToken.substring(0, prefixLen) === token.substring(0, prefixLen);
      }
      return false;
    });

    if (match) {
      score += 8; // Puanı 6'dan 8'e çıkardık!
    }
  }

  if (haystack.includes(normalizedQuery)) score += 20;
  if (normalize(fields[0] ?? "").startsWith(normalizedQuery)) score += 25;

  return score;
}

export function searchKpssHistory(query: string): SearchResult[] {
  const q = query.trim();

  if (!q) return [];

  const results: SearchResult[] = [];

  for (const topic of topics) {
    const score = scoreText(q, topic.title, topic.shortDescription, topic.keywords.join(" "), topic.mustKnow.join(" "));
    if (score) {
      results.push({
        id: topic.id,
        type: "Konu",
        title: topic.title,
        description: topic.shortDescription,
        href: `/topics/${topic.slug}`,
        score
      });
    }
  }

  for (const question of questions) {
    const topic = topics.find((item) => item.id === question.topicId);
    const score = scoreText(q, question.stem, question.explanation, question.tags.join(" "), topic?.title ?? "");
    if (score) {
      results.push({
        id: question.id,
        type: "Soru",
        title: question.stem,
        description: topic ? `${topic.title} testine git` : question.explanation,
        href: `/question-bank/${question.topicId}`,
        score
      });
    }
  }

  for (const card of flashcards) {
    const topic = topics.find((item) => item.id === card.topicId);
    let score = scoreText(q, card.front, card.back, card.hint, card.tags.join(" "));
    if (score) {
      const normFront = normalize(card.front);
      const normQ = normalize(q);
      if (normFront.includes(normQ) || normQ.includes(normFront)) {
        score += 30;
      }
      results.push({
        id: card.id,
        type: "Flashcard",
        title: card.front,
        description: topic ? `${topic.title} flashcard destesi` : card.back,
        href: "/flashcards",
        score
      });
    }
  }

  for (const exam of exams) {
    const score = scoreText(q, exam.title, exam.description);
    if (score) {
      results.push({
        id: exam.id,
        type: "Deneme",
        title: exam.title,
        description: exam.description,
        href: `/exams/${exam.id}`,
        score
      });
    }
  }

  for (const event of timelineEvents) {
    const score = scoreText(q, event.title, event.description, event.date);
    if (score) {
      results.push({
        id: event.id,
        type: "Timeline",
        title: event.title,
        description: `${event.date} · ${event.description}`,
        href: "/timeline",
        score
      });
    }
  }

  for (const item of glossary) {
    let score = scoreText(q, item.term, item.definition);
    if (score) {
      const normTerm = normalize(item.term);
      const normQ = normalize(q);
      if (normTerm.includes(normQ) || normQ.includes(normTerm)) {
        score += 40;
      }
      results.push({
        id: item.id,
        type: "Kavram",
        title: item.term,
        description: item.definition,
        href: "/glossary",
        score
      });
    }
  }

  for (const item of pastQuestionTrends) {
    const score = scoreText(q, String(item.year), item.topicTitle, item.pattern, item.stem);
    if (score) {
      results.push({
        id: item.id,
        type: "Çıkmış Soru",
        title: `${item.year} · ${item.topicTitle}`,
        description: item.pattern,
        href: `/past-questions?year=${item.year}`,
        score
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 36);
}
