# KPSS Tarih — Online Database Final Patch

Bu patch Google giriş ve Supabase online progress entegrasyonunu ekler.

## Kurulum

```bash
npm install @supabase/supabase-js @supabase/ssr
```

`.env.local.example` dosyasını `.env.local` olarak kopyala:

```bash
cp .env.local.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.local.example .env.local
```

## Supabase tarafı

SQL tablolarını zaten başarıyla oluşturdun. Google provider da açıldıysa uygulama tarafı hazır.

## Online kaydolacak veriler

- Google kullanıcı oturumu
- Tamamlanan konular
- Çözülen sorular
- Yanlış cevaplar
- Flashcard tekrarları
- Deneme sonuçları
- Kullanıcı notları

## JSON'da kalacak veriler

- Konular
- Sorular
- Flashcard içerikleri
- Timeline
- Deneme şablonları
- Kavram sözlüğü

## Test akışı

1. `npm run dev`
2. `/auth` sayfasına git.
3. Google ile giriş yap.
4. Dashboard'a dön.
5. Bir soru çöz.
6. Bir konu tamamla.
7. Bir not ekle.
8. Supabase Table Editor'da şu tablolara bak:

```txt
profiles
question_attempts
user_topic_progress
user_notes
```

> Not: Flashcard dosyan senin projende en son temiz UI patch'i ile değiştirildiyse `saveOnlineFlashcardReview` importunu ve kayıt çağrısını eklemen gerekir. Önceki Supabase patch’indeki FlashcardTrainer dosyası bunu içeriyordu.
