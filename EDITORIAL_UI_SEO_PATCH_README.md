# KPSS Tarih — Editorial UI + SEO Patch

Bu patch iki ana şeyi düzeltir:

1. `Online ilerleme senkronize edildi.` toast mesajı kaldırıldı.
2. Genel arayüz daha profesyonel, editorial ve SEO uyumlu hale getirildi.

## Değişen ana dosyalar

```txt
src/components/core/OnlineProgressHydrator.tsx
src/app/globals.css
src/app/layout.tsx
src/components/core/AppShell.tsx
src/components/core/TopNav.tsx
src/components/core/Sidebar.tsx
src/components/core/PageHeader.tsx
src/components/common/MetricCard.tsx
src/features/landing/components/LandingPage.tsx
src/components/seo/StructuredData.tsx
```

## Tasarım yönü

Eski görünümdeki "hazır AI template / öğrenci projesi" hissi azaltıldı.

Yeni dil:

- Editorial çalışma atlası hissi
- Daha sakin ama daha kaliteli renk sistemi
- Daha güçlü sayfa başlıkları
- Daha profesyonel navigasyon
- Daha kurumsal dashboard kartları
- Daha iyi spacing ve layout
- SEO metadata
- Open Graph / Twitter metadata
- Türkçe canonical yapı
- JSON-LD için hazır component

## Not

İçerikler değişmedi. Konu, soru, deneme, flashcard ve timeline verileri aynı kalır.
