# KPSS Tarih Vercel Stability Patch

Bu yama, Vercel build sırasında arka arkaya gelen TypeScript route hatalarını kapatmak için hazırlandı.

## Ana neden

`next.config.ts` içinde `typedRoutes: true` aktifken Next.js, `<Link href={...}>` değerlerinin statik olarak bilinen route tipleriyle uyumlu olmasını bekler. Projede ise sidebar, konu, soru bankası ve test akışlarında href değerleri JSON/fallback veriden string olarak üretiliyor. Bu yüzden Vercel şu tarz hatalarda duruyordu:

```txt
Type 'string' is not assignable to type 'UrlObject | RouteImpl<string>'.
```

## Uygulanan çözüm

- `typedRoutes: false` yapıldı.
- `scripts/vercel-prebuild-fixes.mjs` Vercel build başlamadan önce bu ayarı otomatik garanti eder.
- Sık görülen dynamic `Link` patternleri ayrıca `Route` cast ile normalize edilir.
- `kpss-history.ts` export uyumluluğu korunur.
- `SBBrandMark size` prop hatasına karşı prebuild koruması eklendi.
- `middleware.ts -> proxy.ts` geçişi korunur.
- Duplicate manifest/route temizliği korunur.

## Kullanım

Zip içeriğini repo köküne çıkar, dosyaların üzerine yaz, GitHub'a commit/push yap. Terminalde ayrıca build/test komutu çalıştırmana gerek yok; Vercel build sırasında prebuild guard otomatik çalışır.
