# KPSS Tarih — Chatbot Okunabilirlik ve Soru Bankası Doğruluk Fixi

Bu paket iki ana problemi kapatır:

1. Chatbot panelinde yazıların görünmemesi ve input'a yazılamıyor gibi görünmesi.
2. Chatbot'un yanlış yerel eşleşme yapması ve soru bankasındaki kritik doğru cevap hataları.

## Değişen Dosyalar

- `src/features/chatbot/components/ChatbotWidget.tsx`
- `src/lib/ai/kpss-tutor.ts`
- `src/app/api/chat/route.ts`
- `src/app/api/kpss-tutor/route.ts`
- `src/app/api/ai/route.ts`
- `src/app/api/gemini/route.ts`
- `src/data/static-questions.ts`
- `src/data/generated-30-question-tests.ts`
- `scripts/audit-question-bank-quality.mjs`

## Kritik Düzeltmeler

- Chatbot artık `--sb-*` gibi tanımsız CSS değişkenlerine bağlı değil; panel, mesajlar ve input somut Tailwind renkleriyle görünür.
- Input `onChange`, `value`, `ref`, `placeholder`, `focus` ve `disabled` durumları netleştirildi.
- Quick prompt satırı yatay taşma yapmayacak şekilde kontrollü hale getirildi.
- `/api/chat`, `/api/kpss-tutor`, `/api/ai`, `/api/gemini` aynı güvenli KPSS tutor motoruna bağlandı.
- Tutor önce site bilgi havuzunu ve kürasyonlu kritik KPSS gerçeklerini kontrol eder.
- Put Kırıcı cevabı Gazneli Mahmut olarak sabitlendi.
- Artuklular artık Put Kırıcı ile karıştırılmaz.
- Sened-i İttifak → Tanzimat Fermanı → I. Meşrutiyet kronoloji sorusunda doğru cevap A olarak sabitlendi.
- 56 açıklamalı ve doğru cevaplı soru eklendi.
- Testler temiz soru havuzundan üretilir.

## Not

Bu paket root zip olarak hazırlanmıştır. Repo köküne çıkarıp dosyaların üzerine yazdıktan sonra commit/push yeterlidir. Vercel build otomatik çalışır.
