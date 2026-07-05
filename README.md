# KPSS Tarih Web App — Final Faz

Bu sürüm, KPSS Tarih için tek başına kullanılabilir bol sayfalı çalışma platformudur.

## Finalde tamamlananlar

- WebGL destekli yaratıcı landing page
- Sticky navbar + sidebar
- Dashboard
- 12 kapsamlı KPSS Tarih konusu
- Her konu için özet, kritik bilgiler, sık hatalar, mini timeline, kavramlar
- 60 açıklamalı test sorusu
- Konuya göre filtrelenen soru bankası
- Cevap kaydı, doğru/yanlış kontrolü ve KPSS ipucu
- 48 flashcard
- 6 deneme sınavı
- Deneme sonuç kaydı
- Timeline
- Analiz sayfası
- Yanlışlarım sayfası
- Kavram sözlüğü
- Notlar
- Rozetler
- İçerik ekleme stüdyosu
- Profil ve auth placeholder
- Zustand + localStorage ile kalıcı ilerleme takibi

## Kurulum

```bash
npm install
npm run dev
```

## Sayfalar

```txt
/
 /dashboard
 /topics
 /topics/[slug]
 /question-bank
 /exams
 /exams/[id]
 /flashcards
 /timeline
 /analytics
 /mistakes
 /glossary
 /notes
 /achievements
 /study-plan
 /content-studio
 /profile
 /auth
```

## Veri merkezi

```txt
src/data/kpss-history.ts
```

Tüm konu, soru, flashcard, deneme, timeline, kavram sözlüğü ve öneriler tek merkezden yönetilir.

## Progress sistemi

```txt
src/store/useStudyProgressStore.ts
```

Kullanıcının tamamladığı konular, soru cevapları, flashcard tekrarları, deneme sonuçları ve notları localStorage'da saklanır.
