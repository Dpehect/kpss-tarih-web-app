# Faz 1 — System Design Foundation

## Ürün hedefi

KPSS Tarih hazırlığını ezber odaklı soru çözümünden çıkarıp; konu ilişkileri, aktif hatırlama, kronolojik sezgi ve zayıf konu takibi üzerinden premium bir çalışma deneyimine dönüştürmek.

Deneyim dili:
- Minimal
- Tipografi odaklı
- Büyük boşluk kullanımı
- Yumuşak cam/blur yüzeyler
- Az ama anlamlı mikro animasyon
- Veriyi ürkütmeyen, sakin analitik görselleştirme

## Mimari prensipler

### 1. Server-first App Router

Varsayılan yaklaşım:
- Sayfa ve veri getirme bileşenleri Server Component
- Etkileşim, animasyon, gesture ve local session state bileşenleri Client Component
- Ağır animasyon/3D bloklar lazy-loaded client islands

### 2. Feature-first klasörleme

Domain bazlı klasörleme tercih edilir:

```txt
src/
  app/
    (main)/
      topics/
      flashcards/
      question-bank/
      exams/
  features/
    dashboard/
    topics/
    flashcards/
    questions/
    exams/
    scrollytelling/
  lib/
    adaptive/
  types/
    study.ts
  data/
```

Bu yaklaşım büyüyen projede `components` klasörünün çöplüğe dönüşmesini engeller.

### 3. JSON-first veri katmanı

İlk MVP'de veri JSON dosyalarından okunur. Sonraki aşamada aynı interface'ler korunarak:
- SQLite/PostgreSQL
- Supabase
- Headless CMS
- local-first IndexedDB

tarafına geçilebilir.

## Ana modüller

### Topic Summary

Sorumluluk:
- KPSS Tarih müfredatını dönem, konu, alt konu ve kavram ilişkileriyle göstermek.
- Konu sayfasında özet, mini timeline, kavram haritası ve ilişkili soruları bağlamak.

### Flashcard

Sorumluluk:
- 3D flip animasyonlu aktif hatırlama.
- Cevap sonrası kullanıcıdan confidence skoru almak.
- Spaced repetition alanlarını güncellemek.

### Question Bank

Sorumluluk:
- Adaptif soru seçimi.
- Yanlış gerekçesi gösterme.
- Kavram yanılgısı etiketi üretme.
- Sonraki test setine sinyal gönderme.

### Mock Exams

Sorumluluk:
- KPSS formatına yakın süreli deneme.
- Sonuç analizinde konu/kazanım/kognitif beceri kırılımı.
- Dashboard halkalarına performans verisi aktarma.

## Adaptif Öğrenme Veri Akışı

```txt
User answers question
  ↓
Attempt event oluşur
  ↓
questionId, topicId, isCorrect, confidence, elapsedSeconds, misconceptionTags kaydedilir
  ↓
Topic mastery snapshot hesaplanır
  ↓
Zayıf konu + düşük güven + yakın zamanda yanlış yapılan beceri ağırlığı artar
  ↓
Weighted random selection sonraki test setini üretir
```

## Ağırlık mantığı

Her soru için ağırlık:

```txt
finalWeight =
  baseWeight
  × weaknessBoost
  × unattemptedBoost
  × misconceptionBoost
  × skillDiversityBoost
```

### weaknessBoost

Konu mastery skoru düşükse soru daha sık gelir.

### unattemptedBoost

Daha önce çözülmemiş sorular küçük avantaj alır.

### misconceptionBoost

Kullanıcının yanlışlarında görülen kavram yanılgısı etiketiyle eşleşen sorular öne çıkar.

### skillDiversityBoost

Son 20 denemede kronoloji, neden-sonuç veya kavram ilişkisi gibi belirli becerilerde hata varsa o beceriyi ölçen sorular daha sık gelir.

## Faz 1 kararları

- `src/types/study.ts` domain sözleşmesi olarak kabul edildi.
- `src/lib/adaptive/*` adaptif öğrenme çekirdeği olarak ayrıldı.
- JSON veriler demo amaçlı eklendi.
- UI henüz intentionally minimal tutuldu; asıl animasyon mimarisi Faz 2'de kurulacak.
