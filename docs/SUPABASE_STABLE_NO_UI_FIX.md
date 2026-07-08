# Supabase Preload Stable Fix

Bu paket UI/UX dosyalarına dokunmaz. Amaç, hazır KPSS veri havuzunu Supabase'e hızlı ve idempotent şekilde yüklemek ve Vercel pipeline'ında tekrar generate edilmesini engellemektir.

## Ne düzeltildi?

- `kpss-history.ts` artık sadece bridge export yapar; prebuild scripti bu dosyaya ikinci kez `getTopicBySlug` gibi helper eklemez.
- `src/data/kpss/index.ts` duplicate export üretmeyecek şekilde sade aggregate dosyasıdır.
- Soru audit scripti doğrudan `kpss-history.ts` importuna kilitlenmez; önce modüler dosyaları okur.
- Supabase seed scripti önce modüler veri dosyasını okur, sonra fallback olarak bridge dosyasını dener.
- Vercel build komutu tek pipeline üzerinden çalışır: `node scripts/vercel-supabase-preloaded-pipeline.mjs`.

## Gerekli Vercel Environment Variables

Seed için:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Client/server okuma için projede kullanılıyorsa:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Tabloyu Vercel'in otomatik oluşturması için:

- `SUPABASE_DB_URL`

`SUPABASE_DB_URL` yoksa tabloyu Supabase SQL Editor'da `supabase/migrations/20260709_kpss_preloaded_content.sql` içeriğiyle bir kez oluştur.
