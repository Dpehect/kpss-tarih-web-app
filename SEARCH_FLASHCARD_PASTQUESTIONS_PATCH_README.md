# KPSS Tarih — Search + Flashcard Motion + Çıkmış Sorular + QA Patch

## Yapılanlar

- Flashcard yeni kart geçişindeki dönerek gelme hissi kaldırıldı.
- Yeni kart artık yandan ekrana girip hafif aşağı düşen smooth spring animasyonuyla gelir.
- Drag sırasında rotation kaldırıldı.
- Platform içi arama gerçekten çalışır hale getirildi.
- `/search` sayfası eklendi.
- Topbar search formu `/search?q=...` olarak çalışır.
- Sidebar'a `Çıkmış Sorular` eklendi.
- `/past-questions` sayfası eklendi.
- Son 15 yıl için yıl/yıl çıkmış soru eğilimi ve özgünleştirilmiş pratik sorular eklendi.
- QA audit dokümanı eklendi.
- Smoke-check script'i eklendi.

## Yeni route'lar

```txt
/search
/past-questions
```

## Test

```bash
npm run build
node scripts/qa-smoke-check.mjs
```

## Önemli telif notu

ÖSYM çıkmış soruları birebir kopyalanmadı. Uygulamada resmi ÖSYM arşiv linki, yıl/yıl eğilim analizi ve ÖSYM tarzı özgünleştirilmiş pratik sorular vardır.
