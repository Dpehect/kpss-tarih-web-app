# KPSS Tarih — UI değiştirmeden Supabase preload paketi

Bu paket UI/UX tasarım dosyalarına dokunmaz. Aşağıdaki dosyaları **bilerek içermez**:

- `src/app/globals.css`
- `src/components/**`
- `src/features/topics/components/**`
- `src/features/question-bank/components/**`
- dashboard/sidebar/appshell/flashcard UI dosyaları

Amaç: mevcut tasarımı koruyarak hazır veri havuzunu Vercel build sırasında Supabase'e hızlı ve idempotent şekilde yüklemek.

## Mantık

- Veriler her sayfa açılışında generate edilmez.
- Vercel build sırasında mevcut `src/data/kpss-history.ts` veya `src/data/kpss/index.ts` okunur.
- İçerik hash'i değişmemişse Supabase seed işlemi otomatik atlanır.
- Değişmişse Supabase `kpss_content_bundles` tablosuna bundle olarak upsert edilir.
- Site UI değişmez.
- Supabase env yoksa seed/audit güvenli şekilde atlanır; build kırılmaz.

## Vercel Environment Variables

Zorunlu:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Tabloyu build sırasında otomatik oluşturmak için önerilir:

```txt
SUPABASE_DB_URL
```

`SUPABASE_DB_URL` yoksa Supabase SQL Editor'da şu dosyayı bir kez çalıştır:

```txt
supabase/migrations/20260709_kpss_preloaded_content.sql
```

## Vercel build komutu

`vercel.json` şu komutu kullanır:

```bash
node scripts/vercel-supabase-preloaded-pipeline.mjs
```

Bu pipeline:

1. prebuild fixleri çalıştırır,
2. duplicate route temizliğini çalıştırır,
3. hazır veriyi Supabase'e seed/upsert eder,
4. Supabase içerik audit'i yapar,
5. mevcut soru/chatbot auditleri varsa çalıştırır,
6. `next build` yapar.

## Önemli

Bu paket UI'ı Supabase data layer'a bağlamak için component markup değiştirmez. Mevcut sayfaların tasarımı aynı kalır. Veriyi Supabase'e hazır yükler ve chatbot bilgi havuzunda Supabase repository katmanını kullanır.
