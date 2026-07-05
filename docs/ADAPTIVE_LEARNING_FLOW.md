# Adaptive Learning Flow

## Amaç

Kullanıcının sadece daha fazla soru çözmesini değil, doğru soruları doğru sırayla çözmesini sağlamak.

## Temel input

- Soru geçmişi
- Doğru/yanlış durumu
- Yanıt süresi
- Güven skoru
- Konu etiketi
- Kognitif beceri etiketi
- Kavram yanılgısı etiketi

## Örnek attempt

```ts
const attempt = {
  questionId: "q-kur-001",
  topicId: "topic-kurtulus-savasi",
  selectedChoiceId: "D",
  correctChoiceId: "B",
  isCorrect: false,
  confidence: 4,
  cognitiveSkill: "concept_relation",
  misconceptionTags: ["timeline-republic", "concept-egemenlik"]
}
```

Bu örnekte kullanıcı yanlış cevap vermiş ama güveni yüksek. Bu durum güçlü bir kavram yanılgısı sinyalidir. Sistem sonraki testlerde:

- Kurtuluş Savaşı hazırlık dönemi
- Milli egemenlik
- Cumhuriyetin ilanı ile karıştırılan tarihsel gelişmeler
- Kavram ilişkisi ölçen sorular

alanlarına daha fazla ağırlık verir.

## Mastery score

```txt
masteryScore =
  accuracy × 0.72
  + confidenceScore × 0.18
  - recencyPenalty
```

Bu skor MVP için bilinçli olarak basit tutuldu. Ürün büyüdükçe:
- Item Response Theory
- Bayesian Knowledge Tracing
- Half-life regression
- Spaced repetition scheduling

eklenebilir.

## Neden weighted random?

Tam deterministik öneriler kullanıcıya tekrar hissi verir. Weighted random selection:
- Zayıf konulara öncelik verir
- Sürpriz/çeşitlilik hissini korur
- Aynı soruların sürekli gelmesini engeller
- Test setini daha doğal gösterir
