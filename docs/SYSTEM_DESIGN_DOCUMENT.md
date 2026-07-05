# KPSS Tarih Akademi — System Design Document

## 1. Vizyon

KPSS Tarih Akademi, klasik konu anlatımı ve soru bankası mantığını premium, adaptif ve görsel bir çalışma deneyimine dönüştüren modern bir EdTech platformudur.

Ürün hedefi:

- Kullanıcıya “ne çalışmalıyım?” belirsizliğini yaşatmamak
- Tarih konularını kronolojik ve ilişkisel olarak öğretmek
- Yanlış cevaplardan öğrenme sinyali üretmek
- Premium, minimalist ve tipografi odaklı bir arayüz sunmak
- Zengin animasyona rağmen hızlı ve hafif kalmak

Teknoloji hedefi:

- Next.js 15 App Router
- React 19
- Tailwind CSS
- Framer Motion
- GSAP ScrollTrigger
- Lenis smooth scroll
- Zustand
- JSON-first veri mimarisi
- shadcn/ui uyumlu component katmanı

## 2. Ürün Modülleri

### 2.1 Dashboard

Dashboard, kullanıcının günlük öğrenme ritmini tek bakışta gösterir.

Ana bileşenler:

- Günlük soru halkası
- Aktif hatırlama halkası
- Mastery halkası
- Odak süresi halkası
- Haftalık trend grafiği
- Zayıf konu paneli
- Önerilen çalışma planı

Dashboard’un amacı yalnızca veri göstermek değil, kullanıcının bir sonraki doğru hamlesini belirlemektir.

### 2.2 Konu Sayfaları

Konu sayfaları şunları içerecek şekilde tasarlanır:

- Kısa ve yoğun konu özeti
- Tarihsel bağlam
- Neden-sonuç ilişkileri
- Kavram haritası
- İlgili flashcard setleri
- İlgili soru bankası filtreleri
- Timeline deep-link

### 2.3 Flashcard Sistemi

Flashcard sistemi aktif hatırlama prensibine dayanır.

Her kart:

- Ön yüz: soru, ipucu, medya
- Arka yüz: cevap, açıklama, memory hook
- Confidence rating
- Spaced repetition metadata
- Analytics sinyalleri

3D flip animasyonu Framer Motion ile yapılır. State machine mimarisi ileride rating, next card, review scheduling ve analytics event akışını taşıyacak şekilde hazırlanmıştır.

### 2.4 Soru Bankası

Soru bankası sabit sırayla soru göstermez. Kullanıcının geçmiş denemelerine göre adaptif mini setler üretir.

Sinyaller:

- Doğru/yanlış
- Güven skoru
- Yanıt süresi
- Konu
- Kognitif beceri
- Kavram yanılgısı etiketi
- Son deneme zamanı

### 2.5 Deneme Sınavları

Deneme modülü KPSS formatına yakın süreli oturumlar üretir.

Analiz çıktıları:

- Genel net
- Konu bazlı doğruluk
- Beceri bazlı doğruluk
- Zaman yönetimi
- Güven/başarı uyuşmazlığı
- Sonraki çalışma önerileri

### 2.6 Scrollytelling Timeline

Timeline modülü tarihsel dönemleri scroll ile açılan bir anlatıya dönüştürür.

Örneğin Osmanlı timeline:

- Kuruluş
- Kurumsallaşma
- Balkan hakimiyeti
- İstanbul’un fethi
- Yükselme
- Duraklama
- Gerileme
- Dağılma
- Yenileşme

Her chapter:

- Tarih aralığı
- Anlatı
- Kilit olaylar
- Neden-sonuç çiftleri
- Aktörler
- KPSS bağlantısı
- İlgili soru/konu deep-link’i

## 3. Klasör Mimarisi

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── providers.tsx
│   ├── globals.css
│   └── (main)/
│       ├── layout.tsx
│       ├── loading.tsx
│       ├── page.tsx
│       ├── topics/
│       ├── timeline/
│       ├── flashcards/
│       ├── question-bank/
│       └── exams/
├── components/
│   ├── core/
│   ├── animations/
│   └── ui/
├── features/
│   ├── dashboard/
│   ├── topics/
│   ├── flashcards/
│   ├── questions/
│   ├── exams/
│   └── scrollytelling/
├── lib/
│   ├── adaptive/
│   └── utils.ts
├── store/
├── types/
└── data/
```

## 4. Mimari Kararlar

### 4.1 Feature-first yapı

Domain bazlı klasörleme tercih edilmiştir. Bu, büyüyen projede component ve logic dağınıklığını azaltır.

Yanlış yaklaşım:

```txt
components/
  Card.tsx
  Timeline.tsx
  Quiz.tsx
  Dashboard.tsx
```

Doğru yaklaşım:

```txt
features/
  dashboard/
  flashcards/
  questions/
  scrollytelling/
```

### 4.2 Server-first rendering

Varsayılan olarak page ve layout dosyaları Server Component kalır.

Client Component yalnızca şu durumlarda kullanılır:

- Framer Motion
- GSAP
- Zustand state
- Browser API
- Gesture/keyboard interaction
- Lenis
- 3D/WebGL

### 4.3 JSON-first content

MVP aşamasında veri JSON dosyalarından gelir. Bu yaklaşım:

- Hızlı prototipleme sağlar
- TypeScript interface’leriyle güvenli kalır
- Sonradan CMS veya database geçişini kolaylaştırır

## 5. Veri Modeli

### 5.1 Flashcard

```ts
interface Flashcard {
  id: string;
  topicId: string;
  period: KpssHistoryPeriod;
  front: {
    prompt: string;
    hint?: string;
    media?: {
      type: "image" | "map" | "timeline";
      src: string;
      alt: string;
    };
  };
  back: {
    answer: string;
    explanation: string;
    memoryHook?: string;
    commonConfusions?: string[];
  };
  cognitiveSkill: CognitiveSkill;
  difficulty: DifficultyBand;
  spacedRepetition: {
    easeFactor: number;
    intervalDays: number;
    repetitions: number;
    dueAt: string;
    lastReviewedAt?: string;
  };
  analytics: {
    totalViews: number;
    correctRecalls: number;
    weakSignals: string[];
  };
}
```

### 5.2 Question

```ts
interface Question {
  id: string;
  topicId: string;
  period: KpssHistoryPeriod;
  stem: string;
  choices: QuestionChoice[];
  correctChoiceId: string;
  explanation: {
    correct: string;
    wrongChoiceRationales: Record<string, string>;
    examTip?: string;
  };
  cognitiveSkill: CognitiveSkill;
  difficulty: DifficultyBand;
  tags: string[];
  source: {
    origin: "original" | "past_kpss_style" | "past_question";
    year?: number;
    citation?: string;
  };
  adaptive: {
    baseWeight: number;
    misconceptionTags: string[];
    prerequisiteTopicIds: string[];
  };
}
```

## 6. Adaptif Öğrenme Algoritması

### 6.1 Veri akışı

```txt
Kullanıcı soruyu çözer
  ↓
Attempt event oluşur
  ↓
Doğru/yanlış, confidence, süre, konu, beceri, misconceptionTags kaydedilir
  ↓
Topic mastery hesaplanır
  ↓
Weak topic priority çıkarılır
  ↓
Weighted random selection yeni soru setini üretir
  ↓
Dashboard önerisi güncellenir
```

### 6.2 Mastery score

```txt
masteryScore =
  accuracy × 0.72
  + confidenceScore × 0.18
  - recencyPenalty
```

### 6.3 Weighted random selection

Her sorunun seçilme ağırlığı:

```txt
finalWeight =
  baseWeight
  × weaknessBoost
  × unattemptedBoost
  × misconceptionBoost
  × skillDiversityBoost
```

Bu yapı deterministik “hep aynı zayıf konu” hissini engeller. Sistem hem zayıf konulara odaklanır hem de çeşitliliği korur.

## 7. Scrollytelling ve Animasyon Mimarisi

### 7.1 GSAP kullanım alanı

GSAP şu alanlarda kullanılır:

- ScrollTrigger
- Timeline progress
- Sticky chapter visual
- Scrub animasyonlar
- Çok elementli stagger reveal

### 7.2 Framer Motion kullanım alanı

Framer Motion şu alanlarda kullanılır:

- Flashcard flip
- Card hover/tap
- Text reveal
- Modal/sheet transition
- State-driven interaction

### 7.3 Lenis

Lenis, global provider içinde root scroll davranışını yönetir. ScrollTrigger tabanlı anlatıların daha pürüzsüz hissetmesini sağlar.

### 7.4 Reduced motion

Tüm motion componentleri `prefers-reduced-motion` kontrolüne saygı duyar. Hareket hassasiyeti olan kullanıcılar için animasyonlar azaltılır.

## 8. Dashboard Deneyim Mimarisi

Dashboard Apple Fitness halkalarından esinlenir ama eğitim metriklerine uyarlanır.

Ringler:

- Soru
- Hatırlama
- Mastery
- Odak

Her ring:

- Anlık değer
- Hedef
- Yüzde ilerleme
- Kısa yorum
- Görsel ton

Dashboard’un alt kısmında önerilen çalışma planı bulunur. Bu plan adaptif öğrenme motorundan gelen zayıf sinyallere göre şekillenir.

## 9. Performans Stratejisi

### 9.1 Server Components

Server Component olarak kalması gerekenler:

- Route page dosyaları
- Layout
- Statik konu içerikleri
- JSON veri okuyan index sayfaları
- SEO odaklı metin blokları

### 9.2 Client Components

Client Component olması gerekenler:

- Scrollytelling timeline
- GSAP hook’ları
- Framer Motion kartları
- Flashcard flip
- Zustand store kullanan oturum bileşenleri
- Lenis provider

### 9.3 Code splitting

Ağır parçalar route bazlı bölünür:

- Timeline yalnızca `/timeline` route’unda yüklenir
- Flashcard animation yalnızca `/flashcards` route’unda yüklenir
- 3D/WebGL gelecekte dynamic import ile izole edilir
- Exam runner ayrı client island olarak tutulur

### 9.4 Streaming

App Router’da `loading.tsx` dosyaları route segment streaming için kullanılır.

Strateji:

- Dashboard shell hızlı render edilir
- Ağır chart/analytics blokları Suspense boundary içinde geciktirilebilir
- Konu detayında ana başlık önce gelir, ilişkili soru ve kartlar sonra stream edilir
- Timeline’da server sayfa önce gelir, client island sonra hydrate olur

### 9.5 Animation budget

Animasyon bütçesi:

- İlk yüklemede WebGL yok
- Blur efektleri sınırlı
- ScrollTrigger sadece ilgili route’ta
- Transform/opacity animasyonları öncelikli
- Mobilde sticky/blur azaltılabilir
- Büyük medya lazy yüklenir

## 10. Accessibility

- Semantic HTML
- `aria-label` ring progress
- Reduced motion desteği
- Focus outline korunmalı
- Butonlar gerçek `<button>`
- Renk tek başına bilgi taşımaz
- Dashboard metric metinle de açıklanır

## 11. MVP → Production Yol Haritası

### MVP

- JSON veri
- Local Zustand session
- Static adaptive engine
- Demo dashboard
- Timeline scrollytelling

### Beta

- Auth
- Kullanıcı bazlı attempt persistence
- IndexedDB/local-first çalışma geçmişi
- Supabase/Postgres veri katmanı
- Admin content editor

### Production

- Analytics event pipeline
- AI-supported weak topic explanation
- Spaced repetition scheduler
- Item Response Theory tabanlı zorluk kalibrasyonu
- Full offline mode
- Real KPSS curriculum coverage
- Error monitoring
- A/B testing

## 12. Riskler

### Aşırı animasyon riski

Çözüm: Hareket yalnızca öğrenme ilişkisini güçlendirdiğinde kullanılır.

### Bundle şişmesi

Çözüm: GSAP, R3F ve heavy visual parçalar route bazlı bölünür.

### Adaptif algoritmanın tekrar hissi

Çözüm: Weighted random selection, diversity boost ve unattempted boost kullanılır.

### İçerik bakım zorluğu

Çözüm: JSON schema ve TypeScript interface’leri domain sözleşmesi olarak korunur.

## 13. Sonuç

Bu mimari, teknik performans ile premium study experience arasında denge kurar. Server-first Next.js yaklaşımı hızlı ilk yükleme sağlar; Client island mimarisi animasyonlu alanları izole eder; adaptif öğrenme çekirdeği kullanıcının yanlışlarından anlamlı çalışma önerisi üretir.
