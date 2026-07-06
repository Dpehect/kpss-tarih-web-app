# Supabase Null Typecheck Fix

## Hata

Vercel build:

```txt
Type error: 'supabase' is possibly 'null'.
src/components/core/OnlineProgressHydrator.tsx
```

Sebep: `createClient()` env eksikken build'in düşmemesi için `null` dönebiliyor. TypeScript, async nested function içinde `if (!supabase) return` kontrolünü her zaman güvenli şekilde daraltmıyor.

## Çözüm

Bu patch şu dosyalarda `const client = supabase` ile type narrowing'i garanti eder:

```txt
src/components/core/OnlineProgressHydrator.tsx
src/features/auth/components/AuthPanel.tsx
src/features/auth/components/AuthStatusButton.tsx
src/hooks/useAdminSession.ts
src/lib/admin/admin-service.ts
```

## Uygulama

ZIP'i proje köküne kopyala, commit et, tekrar deploy al.

Vercel env değerleri yine de eklenmeli:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rsxufbiqlrpxkkbfzzun.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_mxtyqyAqEmo9b5WCH5pl5A_DfKQpqYw
NEXT_PUBLIC_SITE_URL=https://kpss-tarih-web-app.vercel.app
```
