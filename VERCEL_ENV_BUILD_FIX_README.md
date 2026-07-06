# Vercel Env Build Fix

## Asıl sorun

Build log'daki hata:

```txt
Error: NEXT_PUBLIC_SUPABASE_URL eksik.
```

Vercel, local `.env.local` dosyanı otomatik kullanmaz. Environment Variables Vercel panelinde ayrıca girilmelidir.

## Vercel'de eklenecek env değerleri

Vercel Dashboard:

```txt
Project → Settings → Environment Variables
```

Şunları ekle:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rsxufbiqlrpxkkbfzzun.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_mxtyqyAqEmo9b5WCH5pl5A_DfKQpqYw
NEXT_PUBLIC_SITE_URL=https://kendi-vercel-domainin.vercel.app
```

Environment olarak Production, Preview ve Development seç.

Sonra:

```txt
Deployments → Redeploy → Clear build cache seçili
```

## Bu patch ne yapar?

Env değişkenleri eksikken build'in `_not-found` prerender aşamasında çökmesini engeller.

Ama Google login ve online kayıtların çalışması için Vercel env değerlerini yine de eklemen gerekir.

## Güvenlik

Database password, service_role key veya connection string Vercel frontend env'e eklenmez.
