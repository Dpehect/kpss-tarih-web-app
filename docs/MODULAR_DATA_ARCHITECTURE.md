# KPSS Tarih Modüler Veri Mimarisi

Bu paket, `src/data/kpss-history.ts` içinde tek dosyada biriken KPSS Tarih veri havuzunu konu bazlı modüllere ayırır.

## Neden?

Tek dosyada büyüyen veri:

- geliştirme sırasında yavaş okunur,
- merge conflict üretir,
- soru/konu/flashcard ilişkisini takip etmeyi zorlaştırır,
- chatbot bilgi havuzunu genişletirken kontrolü düşürür.

Yeni yapı:

```txt
src/data/kpss/
  index.ts
  manifest.json
  topics/
    islamiyet-oncesi-turk-tarihi.ts
    turk-islam-tarihi.ts
    ...
  questions/
    islamiyet-oncesi.ts
    turk-islam.ts
    ...
  flashcards/
  timeline/
  glossary/
  exams.ts
  recommendations.ts
```

## Eski importlar kırılmıyor

Uygulamadaki mevcut importlar çalışmaya devam eder:

```ts
import { topics, questions, getTopicBySlug } from "@/data/kpss-history";
```

Çünkü `src/data/kpss-history.ts` artık sadece modular bridge olur.

Yeni geliştirmelerde doğrudan şunu kullanabilirsin:

```ts
import { topics, getQuestionsByTopic } from "@/data/kpss";
```

## Vercel otomasyonu

`vercel.json` artık tek komut çalıştırır:

```bash
node scripts/vercel-build-pipeline.mjs
```

Pipeline sırasıyla:

1. `scripts/modularize-kpss-history.mjs`
2. mevcut prebuild fixleri
3. soru/test üretimi
4. duplicate route temizliği
5. modular data audit
6. varsa diğer kalite auditleri
7. `next build`

## GitHub Actions otomasyonu

`.github/workflows/modularize-kpss-data.yml` workflow'u açıksa, push sonrası monolith dosyayı bölüp `src/data/kpss/*` dosyalarını repo'ya commit eder. Böylece terminal yazmadan GitHub üzerinde de veri dosyaları gerçekten ayrılmış olur.

## Veri kaybı koruması

Script, `topics` dizisini okuyamazsa durur. Konu sayısı 10'dan, soru sayısı 100'den, flashcard sayısı 50'den azsa audit build'i durdurur.
