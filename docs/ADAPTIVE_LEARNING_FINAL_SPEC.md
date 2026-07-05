# Adaptive Learning Final Spec

## Event model

Her soru cevabı bir attempt event üretir.

```ts
interface UserAttempt {
  id: string;
  userId: string;
  questionId: string;
  topicId: string;
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
  answeredAt: string;
  elapsedSeconds: number;
  confidence: 1 | 2 | 3 | 4 | 5;
  cognitiveSkill: CognitiveSkill;
  misconceptionTags: string[];
}
```

## Güçlü yanlış sinyali

Aşağıdaki durum çok önemlidir:

```txt
isCorrect = false
confidence >= 4
```

Bu, kullanıcının bilmediğini bilmediği anlamına gelir. Sistem bu hatayı dashboard ve soru seçimi tarafında daha güçlü ele almalıdır.

## Weak topic priority

```txt
nextReviewPriority =
  (1 - masteryScore)
  + wrongCount × 0.045
```

## Soru seçimi

Her soru için:

```txt
weight =
  baseWeight
  × weaknessBoost
  × unattemptedBoost
  × misconceptionBoost
  × skillDiversityBoost
```

## Mini set üretimi

Önerilen MVP formatı:

- 5 soruluk hızlı set
- 10 soruluk odak seti
- 20 soruluk karma set

Dağılım:

- %50 zayıf konu
- %25 ilişkili prerequisite konu
- %15 yeni/az çözülmüş konu
- %10 genel tekrar

## Flashcard tekrar

Flashcard tarafında confidence rating:

| Kullanıcı hissi | Sonuç |
|---|---|
| Hiç hatırlamadım | hemen tekrar |
| Zor hatırladım | kısa interval |
| Hatırladım | normal interval |
| Çok kolaydı | interval artar |

## Production geliştirme

MVP algoritması ileride şu tekniklere genişleyebilir:

- Bayesian Knowledge Tracing
- Half-life regression
- Item Response Theory
- Embedding tabanlı misconception clustering
- AI-generated remedial explanation
