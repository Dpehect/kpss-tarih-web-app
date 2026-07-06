# QA Audit & Fixes — KPSS Tarih

Bu patch kapsamında test engineer bakışıyla ele alınan kritik noktalar:

## Düzeltilenler

### 1. Arama çalışmıyordu
Sorun: Topbar arama alanı yalnızca görsel link gibi davranıyordu.
Çözüm:
- `/search` route'u eklendi.
- Global search index eklendi.
- Konu, soru, flashcard, deneme, timeline, kavram ve çıkmış soru eğilimleri aranabilir hale geldi.
- Topbar gerçek form olarak çalışır.

### 2. Flashcard yeni kart animasyonu dönerek geliyordu
Sorun: Yeni karta geçerken rotation hissi kullanıcıyı yoruyordu.
Çözüm:
- Yeni kart giriş animasyonu yandan gelirken hafif aşağı düşen spring motion'a çevrildi.
- Drag sırasında kart artık rotate edilmez.
- Flip animasyonu sadece kullanıcı kartı çevirdiğinde çalışır.

### 3. Çıkmış sorular bölümü yoktu
Çözüm:
- `/past-questions` route'u eklendi.
- Son 15 yıl için yıl/yıl soru eğilimi ve özgünleştirilmiş pratik sorular eklendi.
- Resmi ÖSYM arşivine link eklendi.
- Telif notu UI içine yerleştirildi.

### 4. Mobil arama eksikti
Çözüm:
- Mobilde topbar arama ikonuyla `/search` sayfasına gidilir.

### 5. Menüde çıkmış sorular yoktu
Çözüm:
- Sidebar'a `Çıkmış Sorular` eklendi.

## Bilerek yapılmayan

ÖSYM'nin birebir çıkmış soruları kopyalanmadı. ÖSYM sayfasında soruların telif haklarının ÖSYM'ye ait olduğu belirtilir. Bu nedenle uygulamada:
- resmi arşiv bağlantısı,
- yıl/yıl eğilim,
- ÖSYM tarzı özgünleştirilmiş pratik
kullanıldı.

## Sonraki QA önerileri

- `npm run build`
- `/search?q=Lozan`
- `/search?q=Tanzimat`
- `/past-questions`
- `/flashcards`
- `/question-bank/t01`
- `/mistakes`
- Google giriş sonrası Supabase kayıt testi
