# KPSS Tarih Professional UI + Audit Fix Patch

Bu zip tam repo değildir; mevcut `Dpehect/kpss-tarih-web-app` proje köküne açılıp uygulanacak üretim düzeltme paketidir.

## Uygulama

```bash
node apply-kpss-tarih-professional-ui-audit-fix.mjs
npm install
npm run typecheck
npm run build
npm run audit:prod
SMOKE_BASE_URL=https://kpss-tarih-web-app.vercel.app npm run smoke:prod
```

## Ne düzeltir?

- Açık butonlarda koyu text, koyu butonlarda açık text standardını global olarak zorlar.
- `Button` ve `ButtonLink` componentlerini profesyonel, kontrast-güvenli hale getirir.
- Screenshot'taki beyaz/pale buton üzerinde okunmayan text problemini kapatır.
- `src/data/kpss-history.ts` içindeki Vercel TypeScript cast hatasını otomatik düzeltir.
- Amatör placeholder/debug/TODO metinleri, riskli contrast kombinasyonları, büyük görseller ve veri sayıları için audit scripti ekler.
- Ana sayfalar için runtime smoke test ekler.
