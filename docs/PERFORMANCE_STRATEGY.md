# Performance Strategy

## Hedef

Zengin animasyonlu bir eğitim platformunu hızlı, hafif ve sürdürülebilir tutmak.

## Temel yaklaşım

```txt
Server-first shell
  + route-based client islands
  + dynamic heavy modules
  + progressive enhancement
  + reduced motion
```

## Server Components

Server Component olarak kalacak parçalar:

| Alan | Neden |
|---|---|
| Layout | Statik shell hızlı gelir |
| Topic index | SEO ve hızlı render |
| Topic detail metinleri | İçerik server tarafında güvenli |
| Dashboard ana shell | İlk boya hızlı |
| Exam metadata | Statik veri server’da hazırlanır |

## Client Components

Client Component yapılacak parçalar:

| Alan | Neden |
|---|---|
| Flashcard3D | Framer Motion ve click state |
| ScrollytellingTimeline | GSAP, DOM, ScrollTrigger |
| Lenis Provider | Browser scroll API |
| Session store | Zustand |
| Interactive dashboard controls | User interaction |

## Dynamic import

Kullanılacak yerler:

```ts
const ScrollytellingTimeline = dynamic(() => import("./ScrollytellingTimeline"), {
  ssr: false
});
```

Ağır modüller:

- GSAP ScrollTrigger
- React Three Fiber
- Postprocessing
- Large map visualizations
- Swiper galleries

## Streaming

App Router segment loading:

```txt
app/(main)/loading.tsx
app/(main)/topics/[slug]/loading.tsx
app/(main)/timeline/loading.tsx
```

Strateji:

1. Ana layout hemen görünür.
2. Kritik başlık ve açıklama önce render edilir.
3. Ağır interaktif alan skeleton ile bekler.
4. Client island hydrate olduğunda animasyon başlar.

## Bundle budget

Önerilen sınırlar:

| Parça | Hedef |
|---|---|
| Initial JS | Mümkün olduğunca düşük |
| Timeline route | GSAP sadece burada |
| Flashcard route | Framer Motion burada kabul edilebilir |
| R3F scenes | İlk yüklemede yok |
| Images | AVIF/WebP + lazy |

## Animation budget

- Transform ve opacity öncelikli
- Layout animasyonlarından kaçın
- Blur küçük dozda
- Stagger sayısını sınırlı tut
- ScrollTrigger cleanup hook içinde otomatik yapılmalı
- Mobilde heavy shadow/blur azaltılmalı

## Data loading

MVP:

- JSON import
- Static generation friendly
- TypeScript interface ile güvenlik

Production:

- Server Actions veya Route Handlers
- Database read server side
- Attempt event write async
- Dashboard aggregation cached

## Caching

Konu içerikleri:

- Static veya revalidate

Kullanıcı attempt verileri:

- Dynamic
- User scoped
- Cache edilmez veya kısa cache

Dashboard aggregate:

- Kullanıcıya özel
- Session bazlı kısa cache

## Monitoring checklist

Production’da izlenecek metrikler:

- LCP
- INP
- CLS
- TTFB
- Hydration time
- Route bundle size
- Client component count
- Animation long task
- Error rate
