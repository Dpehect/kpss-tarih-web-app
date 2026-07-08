# KPSS Tarih Readability + Vercel Auto Fix

Bu paket, sayfalarda beyaz/açık arka plan üzerine beyaz metin görünmesi sorununu ve Vercel build scriptlerinin otomatik çalışmaması riskini kapatır.

## Değişen ana dosyalar

- `src/app/globals.css`
  - Geniş ve hatalı dark-text guard seçicileri kaldırıldı.
  - Light surface guard eklendi: açık zeminlerde metin koyu kalır.
  - Dark surface guard sadece explicit dark class/data-tone için çalışır.
  - Button kontrast kuralı korundu.

- `src/features/question-bank/components/QuestionBankPage.tsx`
  - Soru bankası hero/kartları okunabilir, açık zemin + koyu metin yapısına alındı.
  - Kartlar tıklanabilir ve profesyonel SaaS hiyerarşisine uygun hale getirildi.

- `src/data/generated-30-question-tests.ts`
  - `getTestsForTopic("all")` karma testleri döndürecek şekilde düzeltildi.

- `scripts/vercel-prebuild-fixes.mjs`
  - Vercel build öncesi typedRoutes, proxy, skeleton exports, kpss-history helpers, readability CSS ve build command zincirini garanti eder.

- `scripts/audit-readability-and-vercel.mjs`
  - Okunabilirliği bozan CSS seçicileri ve eksik Vercel build chain durumunu build sırasında yakalar.

- `package.json` ve `vercel.json`
  - Vercel build komutu otomatik olarak prebuild + question-bank fix + duplicate route clean + readability audit + next build zincirine bağlandı.

## Kullanım

Zip'i repo köküne çıkar, dosyaların üzerine yaz, GitHub'da commit/push yap. Vercel otomatik çalışır.
