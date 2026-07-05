# Product Experience Architecture

## Deneyim hedefi

Kullanıcı platforma girdiğinde klasik ders sitesi değil, kişisel bir çalışma koçu hissi almalı.

## Temel deneyim akışı

```txt
Dashboard
  ↓
Bugünkü önerilen çalışma
  ↓
Zayıf konu odaklı mini tekrar
  ↓
Flashcard aktif hatırlama
  ↓
Adaptif soru seti
  ↓
Sonuç analizi
  ↓
Dashboard ring progress güncellemesi
```

## Apple-esque tasarım dili

### Görsel prensipler

- Büyük tipografi
- Geniş negatif alan
- Yumuşak yüzeyler
- Hafif cam efekti
- Ölçülü gölge
- Gereksiz ikon kalabalığı yok
- Az renk, yüksek anlam

### Renk kullanımı

- Sky: soru/ilerleme
- Gold: hatırlama
- Mint: mastery
- Rose: odak/enerji
- Neutral: ana yüzey

### Mikro etkileşim

- Hover’da hafif yükselme
- Kartlarda yumuşak spring
- Progress ring’de net yüzde
- Timeline’da scroll ile anlamlı reveal

## Öğrenme deneyimi

### Derin öğrenme sinyalleri

- Kullanıcı yanlış yaptı mı?
- Yanlış yaparken özgüveni yüksek miydi?
- Soru neyi ölçüyordu?
- Yanıt süresi uzun muydu?
- Hangi kavram yanılgısı etiketi üretildi?
- Aynı hata tekrar ediyor mu?

### Çıktı

Sistem şunu üretir:

- Bugünkü öneri
- Zayıf konu paneli
- Adaptif test seti
- Flashcard tekrar önceliği
- Deneme sonrası konu haritası

## Öğrenci psikolojisi

Platform şunlardan kaçınmalı:

- Kullanıcıyı aşırı veriyle boğmak
- Her hatayı kırmızı alarm yapmak
- Sadece net ve puan odaklı hissettirmek
- Çok yoğun animasyonla dikkat dağıtmak

Platform şunları hissettirmeli:

- Kontrol
- İlerleme
- Sakinlik
- Premium odak
- “Ne yapacağım belli” hissi
