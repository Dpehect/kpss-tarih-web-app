# İslamiyet Öncesi Türk Tarihi — Derin Modüler Veri Güncellemesi

Bu paket ilk konu olan **İslamiyet Öncesi Türk Tarihi** için veri dosyalarını modüler yapıda doldurur.

## Eklenen modüler dosyalar

```txt
src/data/kpss/topics/islamiyet-oncesi-turk-tarihi.ts
src/data/kpss/questions/islamiyet-oncesi-turk-tarihi.ts
src/data/kpss/flashcards/islamiyet-oncesi-turk-tarihi.ts
src/data/kpss/timeline/islamiyet-oncesi-turk-tarihi.ts
src/data/kpss/glossary/islamiyet-oncesi-turk-tarihi.ts
```

## İçerik hacmi

- 14 uzun konu anlatımı bölümü
- 49 açıklamalı soru
- 46 flashcard
- 28 timeline olayı
- 41 kavram/sözlük maddesi

## Build otomasyonu

`vercel.json` içine şu adımlar eklendi:

1. `scripts/merge-islamiyet-oncesi-modular-data.mjs`
2. mevcut Vercel prebuild fixleri
3. soru bankası üretimi
4. audit kontrolleri
5. `next build`

Bu sayede modüler dosyalara eklenen ilk konu bilgisi, eski `src/data/kpss-history.ts` importlarını kullanan sayfalara da otomatik işlenir.

## Telif notu

İçerik doğrudan yayıncı notlarından veya telifli ders kitaplarından kopyalanmamıştır. Tarihsel olgular ve KPSS konu kapsamı özgün anlatımla yeniden yapılandırılmıştır.
