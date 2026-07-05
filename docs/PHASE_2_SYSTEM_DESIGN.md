# Faz 2 — Scrollytelling & Animation Architecture

## Faz 2 hedefi

Bu fazda ürünün premium çalışma deneyimi görünür hale gelir:

- Osmanlı dönem akışı scrollytelling biçiminde kurgulandı.
- GSAP ScrollTrigger ile scroll progress, chapter reveal ve sticky visual geçişleri kuruldu.
- Framer Motion ile component-level micro interaction sistemi hazırlandı.
- Lenis ile smooth scroll global provider içine taşındı.
- 3D flashcard flip mimarisi reducer tabanlı state machine olarak ayrıldı.

## Deneyim prensibi

Apple-esque deneyimde animasyon dekor değil, bilgi mimarisinin parçasıdır.

Bu yüzden:
- Her scroll hareketi yeni bir tarihsel ilişki açığa çıkarır.
- Visual blok sticky kalır, metin akarak bağlam üretir.
- Kartlar abartılı değil; yumuşak, fiziksel ve sakin tepki verir.
- `prefers-reduced-motion` kontrolüyle erişilebilirlik korunur.

## Scrollytelling component mimarisi

```txt
src/features/scrollytelling/
├── components/
│   ├── ScrollytellingTimeline.tsx
│   ├── TimelineChapter.tsx
│   ├── TimelineProgressRail.tsx
│   └── ChapterVisual.tsx
├── hooks/
│   └── useTimelineScrollTrigger.ts
└── data/
    └── osmanli-timeline.json
```

### ScrollytellingTimeline

Sorumluluk:
- Ana section scope’unu tutar.
- Timeline chapter’larını sıraya dizer.
- GSAP hook’una DOM scope ve progress ref sağlar.

### TimelineChapter

Sorumluluk:
- Her tarihsel dönemi anlatı kartına dönüştürür.
- Metin, metric, KPSS bağlantısı ve visual alanı tek bir chapter içinde gruplar.
- `data-*` attribute’larıyla GSAP hedeflerini açıkça işaretler.

### ChapterVisual

Sorumluluk:
- Sticky visual yüzey oluşturur.
- Motif, gradient, event chip ve merkez sembolü taşır.
- Gelecekte SVG map, R3F sahne veya Lottie animasyonla değiştirilebilir.

### TimelineProgressRail

Sorumluluk:
- Kullanıcının anlatı içindeki ilerlemesini minimalist bir dikey rail ile gösterir.

## GSAP ScrollTrigger stratejisi

`useTimelineScrollTrigger` içinde:

1. Her chapter için visual scale/opacity/rotateX scroll scrub ile bağlanır.
2. İçerik alanı chapter viewport’a girince blur + y animasyonuyla açılır.
3. Metric kartları stagger ile sıralı görünür.
4. Timeline rail tüm section boyunca scaleY ile dolar.

Bu yapı, animation logic’i UI componentlerinin dışına alır. Böylece:
- TimelineChapter daha okunabilir kalır.
- Animasyon hedefleri `data-*` attribute’larıyla yönetilir.
- Sonradan farklı timeline sayfalarına aynı hook uygulanabilir.

## Framer Motion stratejisi

Framer Motion şu işlerde kullanılır:

- Flashcard 3D flip
- Hover/tap micro interaction
- Text reveal
- ScrollReveal
- State-based UI transitions

GSAP ise timeline gibi scroll-bound, imperative ve çok elementli sahnelerde kullanılır.

## Lenis entegrasyonu

`src/app/providers.tsx` içinde `ReactLenis root` kullanıldı.

Bu kararın sebebi:
- Scroll davranışı tüm app boyunca tutarlı olur.
- ScrollTrigger animasyonları daha premium hisseder.
- Scroll physics tek yerden yönetilir.

## 3D Flashcard mimarisi

```txt
src/features/flashcards/
├── components/
│   └── Flashcard3D.tsx
├── hooks/
│   └── useFlashcardFlip.ts
└── state-machines/
    └── flashcardFlipMachine.ts
```

### State machine

```txt
front → back → rating → front
```

Faz 2’de `front/back` aktif. `rating` state’i Faz 3 için hazır bırakıldı.

Neden reducer?
- Flip davranışı basit görünür ama yakında confidence, next card, spaced repetition ve analytics event ile büyür.
- Reducer, UI karmaşasını önler.
- Test edilebilir bir etkileşim çekirdeği sağlar.

## Route eklemeleri

Yeni route:

```txt
app/(main)/timeline/page.tsx
```

Bu sayfa timeline componentini `dynamic(..., { ssr: false })` ile yükler. Çünkü GSAP ve ScrollTrigger DOM’a ihtiyaç duyar.

## Performans kararları

- Timeline client island olarak izole edildi.
- Server route, JSON veriyi hazırlar; ağır animasyon bileşeni client’ta lazy yüklenir.
- Flashcard bileşeni yalnızca ilgili route’ta çalışır.
- `prefers-reduced-motion` ile gereksiz animasyonlar kapatılabilir.
- 3D/WebGL bu fazda bilinçli olarak kullanılmadı; sahte 3D CSS transform ile premium his korunurken bundle hafif tutuldu.

## Faz 3'e hazırlık

Faz 3’te:
- Dashboard halkaları gerçek progress verisine bağlanacak.
- Flashcard confidence rating attempt event üretecek.
- Timeline chapter’ları soru bankasına deep-link verecek.
- Final SDD içinde Server Components, Streaming ve code-splitting stratejisi resmi hale getirilecek.
