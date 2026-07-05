# Klasör Yapısı

```txt
kpss-tarih-apple-study/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── (main)/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── topics/
│   │       │   ├── page.tsx
│   │       │   └── [slug]/
│   │       │       └── page.tsx
│   │       ├── flashcards/
│   │       │   └── page.tsx
│   │       ├── question-bank/
│   │       │   └── page.tsx
│   │       └── exams/
│   │           ├── page.tsx
│   │           └── [id]/
│   │               └── page.tsx
│   ├── components/
│   │   ├── core/
│   │   └── ui/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── topics/
│   │   ├── flashcards/
│   │   ├── questions/
│   │   ├── exams/
│   │   └── scrollytelling/
│   ├── lib/
│   │   ├── adaptive/
│   │   └── utils.ts
│   ├── store/
│   ├── types/
│   └── data/
├── docs/
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── components.json
```

## Neden bu yapı?

- `app`: routing ve layout sorumluluğu
- `features`: domain bazlı business UI
- `components/core`: app shell, navigation, layout primitives
- `components/ui`: shadcn/ui atomları
- `lib/adaptive`: UI'dan bağımsız öğrenme algoritmaları
- `types`: veri sözleşmeleri
- `data`: JSON-first içerik katmanı
