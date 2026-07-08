# Vercel typed route fix

Bu paket şu Vercel TypeScript hatasını kapatır:

```txt
Type error: Type 'string' is not assignable to type 'UrlObject | RouteImpl<string>'.
```

Sebep: `next.config.ts` içinde `typedRoutes: true` aktif olduğu için `next/link` bileşenine dinamik `string` gönderilemez. `AppShell.tsx` içindeki sidebar ve mobil nav linkleri `as Route` helper ile güvenli şekilde tiplenmiştir.

Ek olarak `SBBrandMark` bileşeni `size` prop desteğiyle güncellendi. Böylece `<SBBrandMark size="sm" />` ve benzeri kullanımlar Vercel build sırasında TypeScript hatası üretmez.
