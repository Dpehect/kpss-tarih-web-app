# Supabase-first hazır içerik mimarisi

Amaç: KPSS Tarih konu, soru, test, flashcard, timeline ve chatbot bilgi havuzunun her istekte veya her sayfada tekrar generate edilmesini engellemek.

## Mantık

- Veriler repo içindeki mevcut kaynaklardan bir kez okunur.
- Vercel build sırasında `scripts/seed-supabase-preloaded-content.mjs` çalışır.
- Script tüm içeriği JSONB bundle olarak `public.kpss_content_bundles` tablosuna upsert eder.
- İçerik hash'i değişmemişse seed işlemi otomatik atlanır.
- Sayfalar Supabase-first data layer üzerinden veri okur.
- Supabase env yoksa uygulama çökmez; yerel fallback devreye girer.

## Gerekli env değerleri

Vercel Environment Variables:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Tabloyu deploy sırasında otomatik oluşturmak için ayrıca:

```txt
SUPABASE_DB_URL
```

`SUPABASE_DB_URL` yoksa `supabase/migrations/20260709_kpss_preloaded_content.sql` dosyasını Supabase SQL Editor'da bir kez çalıştırmak gerekir.

## Vercel build zinciri

```bash
node scripts/vercel-supabase-preloaded-pipeline.mjs
```

Bu pipeline:

1. prebuild uyumluluğunu hazırlar
2. duplicate route temizler
3. Supabase seed/upsert yapar
4. Supabase içerik audit yapar
5. soru bankası/chatbot auditlerini çalıştırır
6. Next build alır

## Performans

Bu yaklaşımda devasa veri client bundle'a yüklenmez. Server componentler ihtiyaç duyduğu bundle'ı Supabase'den okur. İçerik hash değişmedikçe deploy sırasında yeniden veri yazılmaz.
