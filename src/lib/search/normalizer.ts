export function normalizeText(text: string): string {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/[ıİ]/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = new Set([
  "nedir", "kimdir", "ne", "zaman", "kim", "nasil", "neden", "nicin",
  "kac", "hangi", "hangisi", "ile", "ve", "veya", "da", "de", "mi", "mu", "soru", "cevap", "hakkinda"
]);

export function extractTokens(text: string): string[] {
  const words = normalizeText(text).split(" ");
  return words.filter(word => word.length > 2 && !STOP_WORDS.has(word));
}
