# Supabase-first KPSS içerik mimarisi

Bu paket konu anlatımı, soru bankası, deneme, flashcard, timeline ve sözlük verilerini Supabase'de hazır bekleyen `kpss_content_bundles` tablosundan okur.

## Neden bu yapı?

- Build sırasında test/soru üretimi yapılmaz.
- Hazır soru ve deneme manifestoları Supabase'e idempotent upsert edilir.
- Sayfalar server component seviyesinde Supabase'den okur.
- İçerik Next cache ile 1 saat revalidate edilir.
- Supabase env yoksa geliştirme ortamında local fallback çalışır.

## Gerekli Vercel Environment Variables

Minimum:

```txt
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Otomatik tablo oluşturma için ayrıca:

```txt
SUPABASE_DB_URL=postgresql://postgres...sslmode=require
SUPABASE_BOOTSTRAP_SCHEMA=true
```

Tabloyu elle Supabase SQL Editor'da oluşturacaksan `supabase/migrations/20260709_kpss_content_bundles.sql` dosyasındaki SQL'i çalıştırman yeterli. Sonra Vercel seed scripti service role key ile upsert yapar.

## Vercel pipeline

`vercel.json` artık şunu çalıştırır:

```bash
node scripts/vercel-supabase-content-pipeline.mjs
```

Pipeline sırası:

1. prebuild uyumluluk fixleri
2. duplicate route temizliği
3. Supabase içerik seed/upsert
4. Supabase içerik audit
5. soru bankası kalite audit
6. chatbot kalite audit
7. next build

## Supabase tablo modeli

Tek tablo / JSONB bundle yaklaşımı kullanıldı:

```txt
kpss_content_bundles
  id: topic:islamiyet-oncesi-turk-tarihi
  kind: topic | question | question_test | exam | flashcard | timeline_event | glossary | recommendation
  key: slug veya id
  payload: gerçek içerik JSON'u
  checksum: içerik değişim hash'i
```

Bu yapı ileride tam ilişkisel modele geçişi engellemez; fakat şu aşamada hızlı, güvenli ve bakım kolaydır.
