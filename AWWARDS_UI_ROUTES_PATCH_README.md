# KPSS Tarih — Awwwards UI + Konu Bazlı Test Sayfaları Patch

Bu patch, önceki görünümdeki amatör/AI-template hissini azaltmak için daha sade, okunaklı ve profesyonel bir ürün kabuğu getirir.

## Net düzeltmeler

- `Çalışmaya başla` CTA kontrastı düzeltildi.
- `Online ilerleme senkronize edildi` toast mesajı kaldırıldı.
- Dashboard'daki `1000/60` gibi duplicate/şişmiş metrik görünümü düzeltildi:
  - soru metriği artık unique questionId üzerinden hesaplanır
  - flashcard metriği unique cardId üzerinden hesaplanır
  - deneme metriği unique examId üzerinden hesaplanır
- Local progress senkronizasyonu tekrar tekrar insert atmayacak hale getirildi.
- Soru bankası side-panel mantığından çıkarıldı.
- Her konu için ayrı test route'u eklendi:

```txt
/question-bank
/question-bank/all
/question-bank/[topicId]
```

## Ana değişen dosyalar

```txt
src/app/globals.css
src/app/layout.tsx
src/components/core/AppShell.tsx
src/components/core/TopNav.tsx
src/components/core/Sidebar.tsx
src/components/core/PageHeader.tsx
src/components/common/MetricCard.tsx
src/components/core/OnlineProgressHydrator.tsx
src/features/auth/components/AuthStatusButton.tsx
src/features/landing/components/LandingPage.tsx
src/features/dashboard/components/DashboardPage.tsx
src/features/question-bank/components/QuestionBankPage.tsx
src/features/question-bank/components/TopicQuestionPage.tsx
src/features/question-bank/components/TopicQuestionRunner.tsx
src/app/(main)/question-bank/page.tsx
src/app/(main)/question-bank/[topicId]/page.tsx
```

## İsteğe bağlı database temizliği

Eğer önceki sync yüzünden Supabase'de aynı timestamp'e sahip duplicate satırlar oluştuysa şu SQL'i Supabase SQL Editor'da çalıştır:

```txt
supabase/sql/cleanup_duplicate_progress_rows.sql
```

Bu SQL yalnızca birebir aynı timestamp ve aynı cevap/kart/deneme kayıtlarını temizler.

## Dürüst not

Bu patch genel kabuğu, dashboard'u, landing'i ve test mimarisini ciddi biçimde toparlar. Tam anlamıyla her sayfanın birbirinden tamamen özgün mikro tasarıma sahip olması ayrı bir ürün tasarım sprintidir. Bunun için sonraki adımda `topics`, `exams`, `flashcards`, `timeline`, `analytics`, `mistakes`, `profile` sayfalarını tek tek redesign etmek gerekir.
