# Animation Guidelines

## Genel ilke

Animasyon kullanıcının dikkatini dağıtmamalı; öğrenilecek ilişkileri görünür kılmalıdır.

## Kullanım alanları

### GSAP

Kullan:
- Scroll-bound timeline
- Pin/sticky sahneler
- Çok elementli stagger animasyonlar
- Progress rail
- Scrub kontrollü visual dönüşümler

Kullanma:
- Basit hover efektleri
- Form state geçişleri
- Sadece opacity/y reveal gereken küçük bloklar

### Framer Motion

Kullan:
- Kart hover/tap
- Flashcard flip
- Modal/Sheet geçişleri
- Liste item giriş-çıkışları
- State-driven UI transitions

### CSS transition

Kullan:
- Basit renk, border, shadow, translate hover
- Navigation feedback
- Button state

## Hareket dili

- Duration: 0.45–0.85s
- Ease: `[0.22, 1, 0.36, 1]`
- Blur reveal: az ve kontrollü
- Scale: 0.92–1.02 aralığını aşma
- Rotate: bilgi kartlarında maksimum 8 derece
- Scroll scrub: dramatik değil, sakin

## Reduced motion

Tüm önemli motion componentleri `prefers-reduced-motion` kontrolüne saygı duymalıdır.

## Performans checklist

- ScrollTrigger sadece ilgili route’ta register edilmeli.
- Ağır timeline componentleri dynamic import ile yüklenmeli.
- WebGL sadece gerçekten anlam kattığında kullanılmalı.
- Mobilde sticky ve blur efektleri azaltılmalı.
- Transform ve opacity öncelikli animasyon tercih edilmeli.
