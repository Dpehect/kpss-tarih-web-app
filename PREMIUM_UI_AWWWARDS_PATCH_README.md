# KPSS Tarih — Premium UI / Awwwards Presentation Patch

Bu patch yalnızca sunum katmanını değiştirir.

## Kural

Data ve içerik dosyalarına dokunulmadı.

Değiştirilmeyenler:

- Konu metinleri
- Başlıklar
- Açıklamalar
- İstatistik sayılarını üreten data
- Soru/flashcard/deneme içerikleri
- Supabase kayıt mantığı

## Yapılan UI/UX yükseltmeleri

- Premium CSS variable sistemi
- Apple-esque light/dark uyumlu renk paleti
- Glassmorphism yüzeyler
- Daha sofistike global background
- Premium button sistemi
- Pixel-perfect navbar
- Premium sidebar
- Premium page header
- Premium metric cards
- Page transition
- Scroll reveal
- GSAP ScrollTrigger opt-in animasyon altyapısı
- Lenis ayarları rafine edildi
- Skeleton loader componentleri eklendi
- Accessibility focus state'leri iyileştirildi
- Reduced motion desteği eklendi

## Değişen dosyalar

```txt
src/app/globals.css
src/app/providers.tsx
src/components/core/AppShell.tsx
src/components/core/TopNav.tsx
src/components/core/Sidebar.tsx
src/components/core/PageHeader.tsx
src/components/common/MetricCard.tsx
src/components/common/PremiumSkeleton.tsx
src/components/motion/PageTransition.tsx
src/components/motion/ScrollReveal.tsx
src/components/motion/GSAPPremiumEffects.tsx
```

## Kurulum

ZIP içeriğini proje köküne kopyala.

Sonra:

```bash
npm run build
npm run dev
```

## Not

GSAP veya Lenis zaten projede varsa doğrudan çalışır. GSAP runtime'da yüklenemezse uygulama çökmez; sadece scroll-trigger efektleri devre dışı kalır.
