import type { Question } from "@/types/study";

/**
 * Data içindeki examTip bazen cevabı doğrudan söyleyebildiği için,
 * kullanıcıya gösterilen ipucunu küçük ve yönlendirici tutar.
 * Veri yapısı değiştirilmez; sadece UI'da gösterilecek hint yumuşatılır.
 */
export function getSubtleQuestionHint(question: Question) {
  const stem = question.stem.toLocaleLowerCase("tr-TR");
  const questionType = String(question.type ?? "");

  if (questionType.includes("chronology") || stem.includes("sıralama") || stem.includes("kronoloji")) {
    return "Olayların önce-sonra ilişkisini ve dönemin genel akışını düşün.";
  }

  if (questionType.includes("case") || stem.includes("durum") || stem.includes("sonuç")) {
    return "Soru kökündeki dönem, kurum ve sonuç ipuçlarını ayrı ayrı değerlendir.";
  }

  if (stem.includes("hangisi değildir") || stem.includes("değildir")) {
    return "Olumsuz soru köküne dikkat et; seçenekleri eleyerek ilerle.";
  }

  if (stem.includes("hangisidir")) {
    return "Anahtar kavramı bulup ilgili dönem veya kurumla eşleştir.";
  }

  if (question.tags?.length > 0) {
    return `Önce kavram alanını belirle: ${question.tags.slice(0, 2).join(", ")}.`;
  }

  return "Soru kökündeki anahtar kavramı yakala ve dönem bağlamını kontrol et.";
}
