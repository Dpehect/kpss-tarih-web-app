import type { Question } from "@/types/study";

/**
 * Data içindeki examTip bazen cevabı doğrudan söyleyebildiği için,
 * kullanıcıya gösterilen ipucunu küçük ve yönlendirici tutar.
 * Veri yapısı değiştirilmez; sadece UI'da gösterilecek hint yumuşatılır.
 */
export function getSubtleQuestionHint(question: Question) {
  if (question.type === "chronology") {
    return "Olayların tarihsel sırasını ve önce/sonra ilişkisini düşün.";
  }

  if (question.type === "case") {
    return "Soru kökündeki dönem, kurum ve sonuç ipuçlarını ayır.";
  }

  const normalizedStem = question.stem.toLocaleLowerCase("tr-TR");

  if (normalizedStem.includes("hangisi değildir") || normalizedStem.includes("değildir")) {
    return "Olumsuz soru köküne dikkat et; seçenekleri tek tek ele.";
  }

  if (question.tags.length > 0) {
    return `Önce kavram alanını belirle: ${question.tags.slice(0, 2).join(", ")}.`;
  }

  if (question.difficulty === "ileri") {
    return "Benzer kavramları karıştırmadan dönem bağlamını kontrol et.";
  }

  if (question.difficulty === "orta") {
    return "Anahtar kavramı bulup ilgili dönemle eşleştir.";
  }

  return "Soru kökündeki anahtar kavramı yakala.";
}
