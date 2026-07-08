# KPSS Tarih Interaction + Professional UI Fix

Bu paket şu sorunları düzeltir:

- Konu kartlarının tıklanmaması
- Soru bankasında konu/test kartlarına geçilememesi
- Dekoratif overlay katmanlarının tıklamayı engellemesi
- Sidebar'ın amatör görünmesi ve mobil/desktop navigasyonun dağınık olması
- `generated-30-question-tests.ts` dosyasındaki boş test havuzu yüzünden test listelerinin işlevsiz kalması
- Timeline ekranının zayıf görsel/işlevsel kalması
- Konu detay anlatımının yüzeysel görünmesi

## Uygulama

Zip'i proje köküne çıkar ve çalıştır:

```bash
node apply-kpss-tarih-interaction-pro-fix.mjs
npm install
npm run typecheck
npm run build
npm run audit:interactions
```

Ardından:

```bash
git add .
git commit -m "Fix interactions and professionalize KPSS History UI"
git push origin main
```

## Değişen ana dosyalar

- `src/components/core/AppShell.tsx`
- `src/components/core/Sidebar.tsx`
- `src/features/topics/components/TopicsPage.tsx`
- `src/features/topics/components/TopicDetailPage.tsx`
- `src/features/question-bank/components/QuestionBankPage.tsx`
- `src/features/question-bank/components/TopicQuestionPage.tsx`
- `src/features/timeline/components/TimelinePage.tsx`
- `src/data/generated-30-question-tests.ts`
- `src/app/(main)/**/page.tsx`
- `src/app/globals.css` içine interaction hardening patch eklenir
- `scripts/audit-interactions.mjs`

## Kritik düzeltme

Soru bankası dosyan repo üzerinde boş görünüyor: `topicQuestionTests`, `mixedQuestionTests`, `allQuestionTests` boş array dönüyor. Bu paket, mevcut JSON `questions` verisinden deterministik 20 test x 3 seviye x 30 soru fallback üretir. Böylece Supabase veri çekmese bile konu ve test kartları tıklanabilir ve dolu kalır.
