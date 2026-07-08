# KPSS Tarih Vercel Export Fix

Bu paket Vercel build logundaki şu hataları kapatır:

- `getFlashcardsByTopic` export bulunamadı
- `getQuestionsByTopic` export bulunamadı
- `getTopicBySlug` export bulunamadı

## Yapılan düzeltme

- `src/data/kpss-history.ts` artık eksik helper exportlarını içerir.
- Local fallback veri boş bırakılmadı: konu, soru, flashcard, timeline ve öneri verileri eklendi.
- `scripts/vercel-prebuild-fixes.mjs` Vercel build başlamadan önce aynı eksik exportları otomatik garanti eder.
- TypeScript strict cast uyumluluğu korunur.

## Kullanım

Terminal komutu gerekmez. Zip içeriğini repo köküne çıkarıp GitHub'da commit/push yapman yeterlidir. Vercel push sonrası build sırasında scriptleri otomatik çalıştırır.
