export type PastQuestionTrend = {
  id: string;
  year: number;
  exam: string;
  topicId: string;
  topicTitle: string;
  sourceType: "trend";
  legalNote: string;
  pattern: string;
  stem: string;
  choices: Array<{ id: string; text: string }>;
  correctChoiceId: string;
  explanation: string;
  hint: string;
};

export const officialOsymPastQuestionsUrl = "https://www.osym.gov.tr/TR,15071/kpss-cikmis-sorular.html";

export const pastQuestionTrends = [
  {
    "id": "past-2011-01",
    "year": 2011,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t01",
    "topicTitle": "Orta Asya Türk Kültür Merkezleri",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "kültür merkezi - özellik eşleştirme",
    "stem": "2011 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Orta Asya Türk Kültür Merkezleri başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "kültür merkezi - özellik eşleştirme üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Orta Asya Türk Kültür Merkezleri başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: kültür merkezi - özellik eşleştirme."
  },
  {
    "id": "past-2011-02",
    "year": 2011,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t10",
    "topicTitle": "Yükselme Dönemi",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "Fatih-Yavuz-Kanuni dönem ayrımı",
    "stem": "ÖSYM tarzı tarih sorularında Yükselme Dönemi için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Yükselme Dönemi sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: Fatih-Yavuz-Kanuni dönem ayrımı."
  },
  {
    "id": "past-2012-01",
    "year": 2012,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t02",
    "topicTitle": "İlk Türk Devletleri",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "ilk Türk devletleri ve yazılı belgeler",
    "stem": "2012 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, İlk Türk Devletleri başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "ilk Türk devletleri ve yazılı belgeler üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "İlk Türk Devletleri başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: ilk Türk devletleri ve yazılı belgeler."
  },
  {
    "id": "past-2012-02",
    "year": 2012,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t11",
    "topicTitle": "Osmanlı Kültür ve Medeniyeti",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "tımar, devşirme, Divan",
    "stem": "ÖSYM tarzı tarih sorularında Osmanlı Kültür ve Medeniyeti için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Osmanlı Kültür ve Medeniyeti sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: tımar, devşirme, Divan."
  },
  {
    "id": "past-2013-01",
    "year": 2013,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t03",
    "topicTitle": "Türklerde Devlet Yönetimi",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "kut, töre, kurultay ayrımı",
    "stem": "2013 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Türklerde Devlet Yönetimi başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "kut, töre, kurultay ayrımı üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Türklerde Devlet Yönetimi başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: kut, töre, kurultay ayrımı."
  },
  {
    "id": "past-2013-02",
    "year": 2013,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t14",
    "topicTitle": "XIX. Yüzyıl Osmanlı Modernleşmesi",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "Tanzimat-Islahat-Kanun-i Esasi",
    "stem": "ÖSYM tarzı tarih sorularında XIX. Yüzyıl Osmanlı Modernleşmesi için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "XIX. Yüzyıl Osmanlı Modernleşmesi sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: Tanzimat-Islahat-Kanun-i Esasi."
  },
  {
    "id": "past-2014-01",
    "year": 2014,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t05",
    "topicTitle": "İlk Türk-İslam Devletleri",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "Talas, Karahanlı, Selçuklu ilişkisi",
    "stem": "2014 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, İlk Türk-İslam Devletleri başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "Talas, Karahanlı, Selçuklu ilişkisi üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "İlk Türk-İslam Devletleri başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: Talas, Karahanlı, Selçuklu ilişkisi."
  },
  {
    "id": "past-2014-02",
    "year": 2014,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t17",
    "topicTitle": "Hazırlık Dönemi",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "genelgeler ve kongreler",
    "stem": "ÖSYM tarzı tarih sorularında Hazırlık Dönemi için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Hazırlık Dönemi sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: genelgeler ve kongreler."
  },
  {
    "id": "past-2015-01",
    "year": 2015,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t08",
    "topicTitle": "Türkiye Selçuklu Devleti ve Beylikler",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "Anadolu'nun Türkleşmesi",
    "stem": "2015 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Türkiye Selçuklu Devleti ve Beylikler başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "Anadolu'nun Türkleşmesi üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Türkiye Selçuklu Devleti ve Beylikler başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: Anadolu'nun Türkleşmesi."
  },
  {
    "id": "past-2015-02",
    "year": 2015,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t19",
    "topicTitle": "Kurtuluş Savaşı Muharebeleri",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "cepheler ve antlaşmalar",
    "stem": "ÖSYM tarzı tarih sorularında Kurtuluş Savaşı Muharebeleri için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Kurtuluş Savaşı Muharebeleri sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: cepheler ve antlaşmalar."
  },
  {
    "id": "past-2016-01",
    "year": 2016,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t10",
    "topicTitle": "Yükselme Dönemi",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "Fatih-Yavuz-Kanuni dönem ayrımı",
    "stem": "2016 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Yükselme Dönemi başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "Fatih-Yavuz-Kanuni dönem ayrımı üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Yükselme Dönemi başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: Fatih-Yavuz-Kanuni dönem ayrımı."
  },
  {
    "id": "past-2016-02",
    "year": 2016,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t21",
    "topicTitle": "Türk İnkılabı",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "inkılap alanları ve kronoloji",
    "stem": "ÖSYM tarzı tarih sorularında Türk İnkılabı için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Türk İnkılabı sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: inkılap alanları ve kronoloji."
  },
  {
    "id": "past-2017-01",
    "year": 2017,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t11",
    "topicTitle": "Osmanlı Kültür ve Medeniyeti",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "tımar, devşirme, Divan",
    "stem": "2017 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Osmanlı Kültür ve Medeniyeti başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "tımar, devşirme, Divan üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Osmanlı Kültür ve Medeniyeti başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: tımar, devşirme, Divan."
  },
  {
    "id": "past-2017-02",
    "year": 2017,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t22",
    "topicTitle": "Atatürk İlkeleri",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "ilkeler ve uygulamalar",
    "stem": "ÖSYM tarzı tarih sorularında Atatürk İlkeleri için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Atatürk İlkeleri sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: ilkeler ve uygulamalar."
  },
  {
    "id": "past-2018-01",
    "year": 2018,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t14",
    "topicTitle": "XIX. Yüzyıl Osmanlı Modernleşmesi",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "Tanzimat-Islahat-Kanun-i Esasi",
    "stem": "2018 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, XIX. Yüzyıl Osmanlı Modernleşmesi başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "Tanzimat-Islahat-Kanun-i Esasi üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "XIX. Yüzyıl Osmanlı Modernleşmesi başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: Tanzimat-Islahat-Kanun-i Esasi."
  },
  {
    "id": "past-2018-02",
    "year": 2018,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t24",
    "topicTitle": "Atatürk Dönemi Dış Politika",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "Montrö-Hatay-Musul",
    "stem": "ÖSYM tarzı tarih sorularında Atatürk Dönemi Dış Politika için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Atatürk Dönemi Dış Politika sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: Montrö-Hatay-Musul."
  },
  {
    "id": "past-2019-01",
    "year": 2019,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t17",
    "topicTitle": "Hazırlık Dönemi",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "genelgeler ve kongreler",
    "stem": "2019 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Hazırlık Dönemi başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "genelgeler ve kongreler üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Hazırlık Dönemi başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: genelgeler ve kongreler."
  },
  {
    "id": "past-2019-02",
    "year": 2019,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t26",
    "topicTitle": "II. Dünya Savaşı ve Sonrası",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "savaş sonrası kurumlar",
    "stem": "ÖSYM tarzı tarih sorularında II. Dünya Savaşı ve Sonrası için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "II. Dünya Savaşı ve Sonrası sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: savaş sonrası kurumlar."
  },
  {
    "id": "past-2020-01",
    "year": 2020,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t19",
    "topicTitle": "Kurtuluş Savaşı Muharebeleri",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "cepheler ve antlaşmalar",
    "stem": "2020 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Kurtuluş Savaşı Muharebeleri başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "cepheler ve antlaşmalar üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Kurtuluş Savaşı Muharebeleri başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: cepheler ve antlaşmalar."
  },
  {
    "id": "past-2020-02",
    "year": 2020,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t27",
    "topicTitle": "Soğuk Savaş Dönemi",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "NATO, Truman, Marshall",
    "stem": "ÖSYM tarzı tarih sorularında Soğuk Savaş Dönemi için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Soğuk Savaş Dönemi sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: NATO, Truman, Marshall."
  },
  {
    "id": "past-2021-01",
    "year": 2021,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t21",
    "topicTitle": "Türk İnkılabı",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "inkılap alanları ve kronoloji",
    "stem": "2021 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Türk İnkılabı başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "inkılap alanları ve kronoloji üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Türk İnkılabı başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: inkılap alanları ve kronoloji."
  },
  {
    "id": "past-2021-02",
    "year": 2021,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t01",
    "topicTitle": "Orta Asya Türk Kültür Merkezleri",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "kültür merkezi - özellik eşleştirme",
    "stem": "ÖSYM tarzı tarih sorularında Orta Asya Türk Kültür Merkezleri için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Orta Asya Türk Kültür Merkezleri sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: kültür merkezi - özellik eşleştirme."
  },
  {
    "id": "past-2022-01",
    "year": 2022,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t22",
    "topicTitle": "Atatürk İlkeleri",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "ilkeler ve uygulamalar",
    "stem": "2022 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Atatürk İlkeleri başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "ilkeler ve uygulamalar üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Atatürk İlkeleri başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: ilkeler ve uygulamalar."
  },
  {
    "id": "past-2022-02",
    "year": 2022,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t02",
    "topicTitle": "İlk Türk Devletleri",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "ilk Türk devletleri ve yazılı belgeler",
    "stem": "ÖSYM tarzı tarih sorularında İlk Türk Devletleri için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "İlk Türk Devletleri sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: ilk Türk devletleri ve yazılı belgeler."
  },
  {
    "id": "past-2023-01",
    "year": 2023,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t24",
    "topicTitle": "Atatürk Dönemi Dış Politika",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "Montrö-Hatay-Musul",
    "stem": "2023 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Atatürk Dönemi Dış Politika başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "Montrö-Hatay-Musul üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Atatürk Dönemi Dış Politika başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: Montrö-Hatay-Musul."
  },
  {
    "id": "past-2023-02",
    "year": 2023,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t03",
    "topicTitle": "Türklerde Devlet Yönetimi",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "kut, töre, kurultay ayrımı",
    "stem": "ÖSYM tarzı tarih sorularında Türklerde Devlet Yönetimi için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Türklerde Devlet Yönetimi sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: kut, töre, kurultay ayrımı."
  },
  {
    "id": "past-2024-01",
    "year": 2024,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t26",
    "topicTitle": "II. Dünya Savaşı ve Sonrası",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "savaş sonrası kurumlar",
    "stem": "2024 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, II. Dünya Savaşı ve Sonrası başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "savaş sonrası kurumlar üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "II. Dünya Savaşı ve Sonrası başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: savaş sonrası kurumlar."
  },
  {
    "id": "past-2024-02",
    "year": 2024,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t05",
    "topicTitle": "İlk Türk-İslam Devletleri",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "Talas, Karahanlı, Selçuklu ilişkisi",
    "stem": "ÖSYM tarzı tarih sorularında İlk Türk-İslam Devletleri için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "İlk Türk-İslam Devletleri sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: Talas, Karahanlı, Selçuklu ilişkisi."
  },
  {
    "id": "past-2025-01",
    "year": 2025,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t27",
    "topicTitle": "Soğuk Savaş Dönemi",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "NATO, Truman, Marshall",
    "stem": "2025 dönemindeki KPSS tarih soru eğilimleri dikkate alındığında, Soğuk Savaş Dönemi başlığında en çok hangi yaklaşım ayırt edici olur?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı döneminden bağımsız ezberlemek"
      },
      {
        "id": "B",
        "text": "NATO, Truman, Marshall üzerinden kavramı bağlama yerleştirmek"
      },
      {
        "id": "C",
        "text": "Sadece tarih sayısını ezberlemek"
      },
      {
        "id": "D",
        "text": "Konuyu çağdaş dünya tarihiyle sınırlamak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Soğuk Savaş Dönemi başlığında çıkmış soru eğilimi, kavramı yalnızca ezberlemekten çok bağlam, kurum/olay ve dönem ilişkisi kurmayı gerektirir.",
    "hint": "Anahtar: NATO, Truman, Marshall."
  },
  {
    "id": "past-2025-02",
    "year": 2025,
    "exam": "KPSS Genel Kültür - Tarih",
    "topicId": "t08",
    "topicTitle": "Türkiye Selçuklu Devleti ve Beylikler",
    "sourceType": "trend",
    "legalNote": "Birebir ÖSYM sorusu değildir; çıkmış soru eğiliminden özgünleştirilmiş pratik sorudur.",
    "pattern": "Anadolu'nun Türkleşmesi",
    "stem": "ÖSYM tarzı tarih sorularında Türkiye Selçuklu Devleti ve Beylikler için aşağıdakilerden hangisi daha güvenli bir çözüm stratejisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Önce soru kökündeki dönem ve kavram ipucunu bulmak"
      },
      {
        "id": "B",
        "text": "Bütün seçenekleri aynı döneme ait kabul etmek"
      },
      {
        "id": "C",
        "text": "Sadece en uzun seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Olayların sonuçlarını göz ardı etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Türkiye Selçuklu Devleti ve Beylikler sorularında dönem ipucu ve kavram ilişkisi çözümün anahtarıdır. Bu nedenle önce soru kökü ayrıştırılmalıdır.",
    "hint": "Önce dönem, sonra kavram: Anadolu'nun Türkleşmesi."
  }
] satisfies PastQuestionTrend[];

export function getPastQuestionsByYear(year: number) {
  return pastQuestionTrends.filter((question) => question.year === year);
}

export function getPastQuestionsByTopic(topicId: string) {
  return pastQuestionTrends.filter((question) => question.topicId === topicId);
}

export function getPastQuestionYears() {
  return Array.from(new Set(pastQuestionTrends.map((question) => question.year))).sort((a, b) => b - a);
}
