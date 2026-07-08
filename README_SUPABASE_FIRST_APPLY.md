# KPSS Tarih Supabase-first içerik paketi

Bu root zip'i proje köküne çıkar.

## Yapılacak işlem

1. Zip içeriğini repo köküne çıkar.
2. Dosyaların üzerine yaz.
3. GitHub'da commit/push yap.
4. Vercel otomatik pipeline çalıştırır.

## Vercel env gerekli

Supabase'den veri çekmek için Vercel Dashboard > Project Settings > Environment Variables kısmına ekle:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Tabloyu Vercel'in otomatik oluşturmasını istiyorsan bunu da ekle:

```txt
SUPABASE_DB_URL
```

`SUPABASE_DB_URL` yoksa migration SQL'i Supabase SQL Editor'da bir kez çalıştırılmalı:

```txt
supabase/migrations/20260709_kpss_content_bundles.sql
```

## Ne değişti?

- Konu, soru, test, deneme, flashcard, timeline ve glossary verileri Supabase tablosundan okunur.
- Soru/test/deneme manifestoları build sırasında yeniden hazırlanmaz; Supabase'e hazır kayıt olarak upsert edilir.
- Sayfalar server component seviyesinde Supabase-first data layer kullanır.
- Chatbot bilgi havuzunu Supabase içerik katmanından okur.
- Local veri sadece env yoksa yedek olarak kalır.
