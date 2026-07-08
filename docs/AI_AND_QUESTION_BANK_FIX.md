# KPSS Tarih AI + Soru Bankası Düzeltmesi

Bu paket iki kritik problemi çözer:

1. Chatbot artık doğrudan Gemini'ye/sadece LLM'e güvenmez. Önce `src/data/kpss-history.ts` içindeki konu, soru, flashcard, kronoloji ve kavram havuzunu tarar. Kritik KPSS gerçekleri için ayrıca deterministic doğrulama katmanı vardır.
2. Soru bankası placeholder/generic üretim yerine 60 adet açıklamalı ve doğru cevabı kontrol edilmiş KPSS Tarih sorusuyla güncellendi. Testler bu soru havuzundan üretilir.

## Örnek düzeltmeler

- "Put kırıcı" → Gazneli Mahmut.
- Artuklular → Mardin, Diyarbakır, Harput, Malabadi Köprüsü, El-Cezeri.
- Kronoloji → Sened-i İttifak (1808) → Tanzimat Fermanı (1839) → I. Meşrutiyet (1876).
- Miryokefalon → Anadolu'nun Türk yurdu olduğunun kesinleşmesi.
- Kösedağ → Türkiye Selçuklu'nun Moğol etkisine girmesi.

## Build güvenliği

`package.json` build komutuna `scripts/audit-question-bank-quality.mjs` eklendi. Vercel build sırasında kritik yanlış eşleşmeler ve soru havuzu sayısı otomatik kontrol edilir.
