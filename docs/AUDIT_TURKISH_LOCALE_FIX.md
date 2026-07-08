# KPSS Tarih Audit Turkish Locale Fix

Bu paket `scripts/audit-question-bank-quality.mjs` dosyasını düzeltir.

## Kapanan hata

Vercel logundaki hata:

```txt
[audit-question-bank-quality] Eksik kritik bilgi: i. meşrutiyet
```

Asıl problem veri havuzunun boş olması değil; audit scriptinin Türkçe locale ile `I. Meşrutiyet` ifadesini katı şekilde aramasıydı. `toLocaleLowerCase("tr-TR")` dönüşümünde `I` harfi `ı` olarak normalize olabildiği için script gerçek verideki `I. Meşrutiyet` bilgisini kaçırabiliyordu.

## Yeni davranış

- `I. Meşrutiyet`, `i. meşrutiyet`, `1. Meşrutiyet`, `Birinci Meşrutiyet`, `Kanun-i Esasi` varyantlarını kabul eder.
- Türkçe `I/İ/ı/i` farklarından dolayı yanlış fail vermez.
- Sadece kelime araması değil, kritik bilgi grupları üzerinden kontrol yapar.
- En az 50 `correctChoiceId` ve 50 `explanation` bulunduğunu doğrular.
- Put Kırıcı bilgisinin Gazneli Mahmut ile birlikte veri havuzunda bulunduğunu kontrol eder.

## Uygulama

Zip'i repo köküne çıkarıp dosyaların üzerine yaz. Sonra GitHub'da commit/push yap. Vercel otomatik çalışır.
