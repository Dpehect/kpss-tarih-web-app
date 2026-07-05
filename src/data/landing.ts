import type { LandingFeature, TimelineTeaser } from "@/types/landing";

/**
 * Landing sayfası feature kartları.
 * Data ayrı dosyada durduğu için tasarım bozulmadan içerik güncellenebilir.
 */
export const landingFeatures: LandingFeature[] = [
  {
    id: "visual-timeline",
    title: "Sinematik tarih akışı",
    description:
      "Osmanlı, Milli Mücadele ve Cumhuriyet dönemlerini düz metin yerine akış, sebep-sonuç ve görsel ritimle öğren.",
    stat: "8 dönem",
    tone: "gold"
  },
  {
    id: "adaptive-recall",
    title: "Akıllı tekrar mantığı",
    description:
      "Yanlış yaptığın konular ileride adaptif testlere daha güçlü sinyal olarak döner.",
    stat: "zayıf konu odaklı",
    tone: "turquoise"
  },
  {
    id: "exam-feeling",
    title: "KPSS odaklı pratik",
    description:
      "Soru bankası, deneme ve flashcard modülleri tek öğrenme sisteminin parçaları gibi çalışacak şekilde hazırlanır.",
    stat: "tek akış",
    tone: "crimson"
  }
];

/**
 * Landing sayfasında tarih atmosferi veren yatay ribbon verisi.
 */
export const timelineTeasers: TimelineTeaser[] = [
  { id: "t1", date: "1299", label: "Kuruluş" },
  { id: "t2", date: "1453", label: "Fetih" },
  { id: "t3", date: "1839", label: "Tanzimat" },
  { id: "t4", date: "1919", label: "Milli Mücadele" },
  { id: "t5", date: "1923", label: "Cumhuriyet" },
  { id: "t6", date: "1937", label: "İlkeler" }
];
