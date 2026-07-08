# Vercel BrandMark Type Fix

Bu paket, Vercel build sırasında görülen şu TypeScript hatasını kapatır:

```txt
Type '{ size: string; }' is not assignable to type '{ className?: string | undefined; }'.
Property 'size' does not exist on type 'SBBrandMark'.
```

Düzeltme:

- `src/components/brand/SBBrandMark.tsx` artık `size` prop'unu destekler.
- Desteklenen değerler: `xs`, `sm`, `md`, `lg`, `xl` veya sayı.
- `AppShell.tsx` içindeki `<SBBrandMark size="sm" />` kullanımı artık TypeScript tarafından kabul edilir.
- Logo bileşeni profesyonel, kontrastlı ve responsive görünecek şekilde yeniden düzenlenmiştir.

Bu zip repo köküne çıkarılıp GitHub'a push edildiğinde Vercel otomatik build alır.
