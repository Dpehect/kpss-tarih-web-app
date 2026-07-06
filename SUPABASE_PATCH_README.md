# Supabase Online Progress Patch

Bu patch, KPSS Tarih projesine Google giriş ve online kullanıcı istatistiği ekler.

## Güvenlik

Database password hiçbir dosyaya eklenmedi. GitHub'a asla database password, service_role key veya connection string koyma.

Kullanılan public bilgiler:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rsxufbiqlrpxkkbfzzun.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_mxtyqyAqEmo9b5WCH5pl5A_DfKQpqYw
```

## Kurulum

```bash
npm install @supabase/supabase-js @supabase/ssr
cp .env.local.example .env.local
npm run dev
```

Windows PowerShell:

```powershell
Copy-Item .env.local.example .env.local
npm run dev
```

## Supabase SQL

Supabase Dashboard'da:

```txt
SQL Editor → New query
```

Şu dosyadaki SQL'i çalıştır:

```txt
supabase/migrations/202607060001_kpss_tarih_user_progress.sql
```

Bu SQL şunları oluşturur:

- profiles
- user_topic_progress
- question_attempts
- flashcard_reviews
- exam_results
- user_notes
- RLS policies
- Google user profile trigger

## Google Login

Supabase Dashboard:

```txt
Authentication → Providers → Google
```

Google provider'ı aç.

Redirect allow list / site URL tarafında şunları ekle:

```txt
http://localhost:3000/auth/callback
https://senin-domainin.vercel.app/auth/callback
```

Google Cloud Console tarafında Supabase'in verdiği callback URL de Google OAuth redirect URI listesine eklenmelidir:

```txt
https://rsxufbiqlrpxkkbfzzun.supabase.co/auth/v1/callback
```

## Ne online kaydolur?

- Konu tamamlama
- Soru cevapları
- Flashcard tekrarları
- Deneme sonuçları
- Kullanıcı notları

## JSON'da kalmaya devam edenler

- Konular
- Sorular
- Flashcard içerikleri
- Deneme şablonları
- Timeline
- Kavram sözlüğü
