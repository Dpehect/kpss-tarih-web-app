# Softbridge Akademi Premium Redesign Planı

## 1. Analiz
- `AppShell.tsx` çok sıkışık ve tek dosyada sidebar + mobile nav + layout taşıyor.
- `Sidebar.tsx` boş wrapper durumunda olduğu için gerçek ürün hissi AppShell içine dağılmış.
- `globals.css` daha önce çok fazla patch/override almış; buton ve kart kontrastını kıran karmaşa oluşmuş.
- Dashboard işlevsel ama premium ürün hiyerarşisi, KPI, devam et rotası, AI önerisi ve heatmap gibi ürün sinyalleri zayıf.
- `typedRoutes: true`, JSON/dinamik link kullanan bu projede Vercel TypeScript hatalarını seri şekilde tetikliyor.

## 2. Yapılan Tasarım Sistemi Değişiklikleri
- Primary: `#1E3A8A`
- Accent: `#D97706`
- Neutral: Slate tonları
- CSS variables tabanlı light/dark theme
- `html[data-theme="dark"]` desteği
- Eski `bureau-*` değişkenleri backward compatible bırakıldı.

## 3. Yeni/yenilenen bileşenler
- `AppShell.tsx`: Premium shell, sticky topbar, mobile drawer, bottom mobile nav.
- `Sidebar.tsx`: Gerçek sidebar, active state, collapse, profil/auth alanı.
- `SBBrandMark.tsx`: Stabil Softbridge marka işareti.
- `AuthStatusButton.tsx`: Giriş Yap, profil ve çıkış UX'i.
- `PremiumCard.tsx`: Motion destekli premium kart.
- `MetricCard.tsx`: Dashboard KPI bileşeni.
- `ThemeToggle.tsx`: System/light/dark toggle.
- `StreakCounter.tsx`: Seri göstergesi.
- `Skeleton.tsx` ve `EmptyState.tsx`: Loading/empty state standardı.

## 4. Dashboard
- Kişisel hero alanı
- Genel ilerleme paneli
- 4 KPI kartı
- Devam Et konu kartları
- AI önerileri
- 28 günlük çalışma heatmap'i
- Rozet önizlemesi

## 5. Build güvenliği
- `next.config.ts` içinde `typedRoutes: false`.
- `scripts/vercel-prebuild-fixes.mjs` aynı ayarı Vercel build öncesi de garanti eder.
- `middleware.ts -> proxy.ts` uyumu korunur.
- `kpss-history.ts` export uyumlulukları build öncesinde garanti edilir.
