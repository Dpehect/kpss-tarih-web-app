# KPSS Tarih Apple Study — Final Faz

Bu proje, Next.js 15, React 19, Tailwind CSS, Framer Motion ve GSAP/ScrollTrigger ile tasarlanmış Apple-esque KPSS Tarih hazırlık platformu mimarisidir.

## İçerik

- Modüler Next.js App Router yapısı
- Feature-first klasörleme
- JSON-first veri katmanı
- Adaptif öğrenme çekirdeği
- Weighted random soru seçimi
- 3D flip flashcard mimarisi
- GSAP ScrollTrigger scrollytelling timeline
- Lenis smooth scroll
- Apple Fitness estetiğinde dashboard halkaları
- Streaming/loading stratejisi
- Final System Design Document

## Kurulum

```bash
npm install
npm run dev
```

## shadcn/ui

```bash
npm run shadcn:init
npm run shadcn:add
```

## Önemli route'lar

```txt
/
 /topics
 /timeline
 /flashcards
 /question-bank
 /exams
```

## Klasörler

```txt
src/
  app/
  components/
  features/
    dashboard/
    topics/
    flashcards/
    questions/
    exams/
    scrollytelling/
  lib/
    adaptive/
  store/
  types/
  data/
docs/
```

## Dokümanlar

- `docs/SYSTEM_DESIGN_DOCUMENT.md`
- `docs/PERFORMANCE_STRATEGY.md`
- `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `docs/ADAPTIVE_LEARNING_FINAL_SPEC.md`
- `docs/PHASE_1_SYSTEM_DESIGN.md`
- `docs/PHASE_2_SYSTEM_DESIGN.md`
- `docs/ANIMATION_GUIDELINES.md`
- `docs/SCROLLYTELLING_DATA_MODEL.md`

## Fazlar

1. Faz 1: Mimari iskelet + veri modelleri + adaptive core
2. Faz 2: Scrollytelling + GSAP + Framer Motion + 3D flashcard
3. Final Faz: Dashboard halkaları + streaming/performance strategy + final SDD
