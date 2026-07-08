# Vercel SkeletonGrid Build Fix

Bu paket `src/app/(main)/loading.tsx` içindeki `SkeletonGrid` import hatasını düzeltir.

## Düzeltilen hata

```txt
Export SkeletonGrid doesn't exist in target module
src/app/(main)/loading.tsx
```

## Değişen dosyalar

- `src/components/ui/Skeleton.tsx`
- `src/app/(main)/loading.tsx`
- `scripts/vercel-prebuild-fixes.mjs`

`vercel-prebuild-fixes.mjs`, Vercel build başlamadan önce `SkeletonGrid` ve `PageSkeleton` exportlarını garanti eder.
