# KPSS Tarih — Admin Panel Patch

Bu patch sadece admin Google hesabı giriş yaptığında görünen admin paneli ekler.

## Admin hesap

Kodda admin email şu şekilde tanımlandı:

```txt
gurlekyunusemre2@gmail.com
```

Dosya:

```txt
src/lib/admin/admin-config.ts
```

Email farklıysa bu dosyadaki değeri değiştir.

## Database migration

Supabase SQL Editor'da şu dosyanın içindeki SQL'i çalıştır:

```txt
supabase/migrations/202607060002_admin_panel.sql
```

Bu migration şunları yapar:

- `public.is_admin()` fonksiyonu oluşturur.
- `admin_content_items` tablosu oluşturur.
- Admin kullanıcının tüm kullanıcı istatistiklerini okuyabilmesi için RLS SELECT policy'leri ekler.
- Admin içerik ekleyebilir, yayınlayabilir, arşivleyebilir ve silebilir.

## Yeni sayfa

```txt
/admin
```

Admin değilse sayfa yetkisiz görünür. Giriş yapılmamışsa giriş ister. Sadece admin email ile giriş yapılırsa panel açılır.

## Panel yetenekleri

- Toplam kullanıcı sayısı
- Aktif kullanıcı sayısı
- Toplam çözülen soru
- Toplam doğru cevap
- Flashcard tekrarları
- Deneme sonuçları
- Not sayıları
- Kullanıcı bazlı istatistik tablosu
- Admin içerik ekleme/silme/yayınlama/arşivleme

## Güvenlik

Sadece UI gizleme yapılmadı. Supabase RLS policy tarafında da admin kontrolü var. Böylece admin olmayan kullanıcı frontend'i değiştirerek diğer kullanıcıların verisini okuyamaz.
