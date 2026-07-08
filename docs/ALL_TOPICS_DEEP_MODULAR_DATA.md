# KPSS Tarih - Tüm Konular Derin Modüler Veri Paketi

Bu paket `src/data/kpss-history.ts` tek dosya yükünü azaltmak için tüm KPSS Tarih verisini konu bazlı modüllere böler.

## Kapsam

- 13 ana konu modülü
- Her konu için ayrı `topics`, `questions`, `flashcards`, `timeline`, `glossary` dosyası
- 300+ açıklamalı ve doğru seçenek id'si tanımlı soru
- 250+ flashcard/kavram/timeline öğesi
- Eski importların kırılmaması için `src/data/kpss-history.ts` bridge dosyası

## Not

Metinler özgün yazılmıştır. Açık web kaynaklarındaki tarihsel olgular ve KPSS müfredat kapsamı dikkate alınmış, telifli ders notu ya da kitaplardan doğrudan kopyalama yapılmamıştır.

## Otomatik Vercel

`vercel.json` build komutunu `node scripts/vercel-build-pipeline.mjs` olarak ayarlar. Pipeline modüler bridge'i kurar, mevcut fix scriptlerini varsa çalıştırır, veri auditini yapar ve Next build başlatır.
