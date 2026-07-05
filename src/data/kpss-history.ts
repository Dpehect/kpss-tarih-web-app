import type { Exam, Flashcard, Question, StudyRecommendation, TimelineEvent, Topic } from "@/types/study";

export const topics = [
  {
    "id": "t1",
    "slug": "islamiyet-oncesi-turk-tarihi",
    "title": "İslamiyet Öncesi Türk Tarihi",
    "era": "islamiyet-oncesi",
    "shortDescription": "Bozkır kültürü, kut anlayışı, kurultay, töre, ikili teşkilat ve ilk Türk devletleri.",
    "examImportance": 84,
    "estimatedMinutes": 85,
    "keywords": [
      "kut",
      "töre",
      "kurultay",
      "ikili teşkilat",
      "Orhun Yazıtları"
    ],
    "summary": [
      {
        "heading": "Devlet ve egemenlik",
        "body": "Türklerde hükümdarlık yetkisinin Tanrı tarafından verildiğine inanılırdı. Bu inanç kut kavramıyla açıklanır ve hanedan üyelerine yönetme hakkı tanır.",
        "bullets": [
          "Kut siyasi meşruiyet kaynağıdır.",
          "Kurultay danışma meclisidir.",
          "İkili teşkilat ülke yönetimini kolaylaştırırken bölünme riskini artırır."
        ]
      },
      {
        "heading": "Toplum ve kültür",
        "body": "Konargöçer hayat, atlı savaşçılık, hayvancılık ve boy teşkilatı sosyal hayatı belirlemiştir. Töre yazısız hukuk kurallarıdır.",
        "bullets": [
          "Boy birliği siyasi yapının temelidir.",
          "Orhun Yazıtları Türk adının geçtiği önemli yazılı belgelerdir.",
          "Balbal ve yuğ törenleri ölüm sonrası inançla ilgilidir."
        ]
      }
    ],
    "mustKnow": [
      "Kut",
      "Töre",
      "Kurultay",
      "İkili teşkilat",
      "Orhun Yazıtları"
    ],
    "commonMistakes": [
      "Kurultayı modern parlamento sanmak",
      "Kut ile töreyi karıştırmak",
      "İkili teşkilatı sadece askeri sistem gibi düşünmek"
    ],
    "quickTimeline": [
      {
        "date": "552",
        "event": "I. Göktürk Devleti"
      },
      {
        "date": "682",
        "event": "II. Göktürk Devleti"
      },
      {
        "date": "744",
        "event": "Uygur Devleti"
      }
    ]
  },
  {
    "id": "t2",
    "slug": "ilk-turk-islam-devletleri",
    "title": "İlk Türk İslam Devletleri",
    "era": "turk-islam",
    "shortDescription": "Karahanlı, Gazneli, Büyük Selçuklu ve Türk-İslam kurumları.",
    "examImportance": 80,
    "estimatedMinutes": 90,
    "keywords": [
      "Karahanlı",
      "Gazneli",
      "Dandanakan",
      "Malazgirt",
      "Nizamiye"
    ],
    "summary": [
      {
        "heading": "Türk-İslam sentezi",
        "body": "Türk devlet geleneği İslam kurumlarıyla birleşmiş, devlet teşkilatı ve kültür hayatında yeni bir sentez oluşmuştur.",
        "bullets": [
          "Karahanlılar ilk Müslüman Türk devletidir.",
          "Gazneliler Hindistan'a İslamiyetin yayılmasında etkilidir.",
          "Selçuklularda ikta ve atabeylik önemlidir."
        ]
      },
      {
        "heading": "Selçuklu kurumları",
        "body": "Büyük Selçuklularda Nizamiye Medreseleri, ikta sistemi ve atabeylik sınavlarda sık sorulur.",
        "bullets": [
          "İkta sistemi askeri ve mali işlev taşır.",
          "Atabeyler melikleri yetiştirir.",
          "Nizamiye medreseleri eğitim kurumudur."
        ]
      }
    ],
    "mustKnow": [
      "Satuk Buğra Han",
      "Dandanakan",
      "Malazgirt",
      "İkta",
      "Nizamiye"
    ],
    "commonMistakes": [
      "Karahanlı ve Gazneli rollerini karıştırmak",
      "İkta sistemini yalnızca toprak dağıtımı sanmak"
    ],
    "quickTimeline": [
      {
        "date": "840",
        "event": "Karahanlıların kuruluşu"
      },
      {
        "date": "1040",
        "event": "Dandanakan Savaşı"
      },
      {
        "date": "1071",
        "event": "Malazgirt Savaşı"
      }
    ]
  },
  {
    "id": "t3",
    "slug": "turkiye-selcuklu-ve-beylikler",
    "title": "Türkiye Selçuklu ve Beylikler",
    "era": "turk-islam",
    "shortDescription": "Anadolu'nun Türkleşmesi, Miryokefalon, ticaret yolları, beylikler ve kültür.",
    "examImportance": 76,
    "estimatedMinutes": 80,
    "keywords": [
      "Miryokefalon",
      "kervansaray",
      "Ahilik",
      "beylikler",
      "Kösedağ"
    ],
    "summary": [
      {
        "heading": "Anadolu'nun Türkleşmesi",
        "body": "Malazgirt sonrası Anadolu'da Türk siyasi varlığı güçlenmiş, Türkiye Selçukluları Anadolu'yu bayındır hale getirmiştir.",
        "bullets": [
          "Miryokefalon Anadolu'nun Türk yurdu olduğunu kesinleştirdi.",
          "Kervansaraylar ticareti canlandırdı.",
          "Ahilik ekonomik ve sosyal örgütlenmedir."
        ]
      },
      {
        "heading": "Beylikler dönemi",
        "body": "Kösedağ sonrası Anadolu Selçuklu otoritesi zayıflamış ve beylikler güçlenmiştir.",
        "bullets": [
          "Karamanoğulları Türkçeyi resmi dil ilan etti.",
          "Osmanlı bu ortamda uç beyliği olarak yükseldi.",
          "Beylikler kültürel rekabeti artırdı."
        ]
      }
    ],
    "mustKnow": [
      "Miryokefalon",
      "Kösedağ",
      "Ahilik",
      "Karamanoğulları",
      "Kervansaray"
    ],
    "commonMistakes": [
      "Miryokefalon ile Malazgirt sonuçlarını eşitlemek",
      "Kösedağ'ın etkisini küçümsemek"
    ],
    "quickTimeline": [
      {
        "date": "1176",
        "event": "Miryokefalon Savaşı"
      },
      {
        "date": "1243",
        "event": "Kösedağ Savaşı"
      },
      {
        "date": "1277",
        "event": "Karamanoğlu Mehmet Bey fermanı"
      }
    ]
  },
  {
    "id": "t4",
    "slug": "osmanli-kurulus-yukselis",
    "title": "Osmanlı Kuruluş ve Yükselme",
    "era": "osmanli",
    "shortDescription": "Beylikten imparatorluğa geçiş, Rumeli fetihleri, İstanbul'un fethi ve merkeziyetçilik.",
    "examImportance": 94,
    "estimatedMinutes": 120,
    "keywords": [
      "uç beyliği",
      "Çimpe",
      "Edirne",
      "İstanbul",
      "devşirme"
    ],
    "summary": [
      {
        "heading": "Kuruluş nedenleri",
        "body": "Osmanlı'nın Bizans sınırında bulunması, gaza anlayışı, Anadolu'daki siyasi boşluk ve başarılı iskan politikası büyümeyi kolaylaştırmıştır.",
        "bullets": [
          "Çimpe Kalesi Rumeli'ye geçişte önemli üstür.",
          "Edirne Balkan fetihlerinin merkezidir.",
          "İskan politikası kalıcılığı artırmıştır."
        ]
      },
      {
        "heading": "Yükselme ve merkezileşme",
        "body": "İstanbul'un fethi Osmanlı'nın imparatorluk karakterini güçlendirmiş, Fatih dönemi merkezi otoriteyi pekiştirmiştir.",
        "bullets": [
          "Kanunname-i Ali Osman merkeziyetçilik açısından önemlidir.",
          "Devşirme sistemi merkez ordusunu güçlendirdi.",
          "Boğazların kontrolü stratejik üstünlük sağladı."
        ]
      }
    ],
    "mustKnow": [
      "Çimpe",
      "İstanbul'un Fethi",
      "Kanunname",
      "Devşirme",
      "İskan"
    ],
    "commonMistakes": [
      "Çimpe'yi bir başkent sanmak",
      "Fetih sonuçlarını sadece askeri görmek"
    ],
    "quickTimeline": [
      {
        "date": "1299",
        "event": "Osmanlı Beyliği"
      },
      {
        "date": "1353",
        "event": "Çimpe Kalesi"
      },
      {
        "date": "1453",
        "event": "İstanbul'un Fethi"
      }
    ]
  },
  {
    "id": "t5",
    "slug": "osmanli-kultur-medeniyet",
    "title": "Osmanlı Kültür ve Medeniyet",
    "era": "osmanli",
    "shortDescription": "Merkez-taşra teşkilatı, divan, tımar, ilmiye, kalemiye ve seyfiye.",
    "examImportance": 88,
    "estimatedMinutes": 95,
    "keywords": [
      "divan",
      "tımar",
      "ilmiye",
      "seyfiye",
      "kalemiye"
    ],
    "summary": [
      {
        "heading": "Devlet teşkilatı",
        "body": "Osmanlı merkez teşkilatı padişah, divan ve kapıkulu sistemi etrafında şekillenmiştir. Taşrada eyalet ve sancak düzeni vardır.",
        "bullets": [
          "Divan-ı Hümayun önemli karar organıdır.",
          "Seyfiye askeri-yönetici sınıftır.",
          "Kalemiye bürokrasi ve yazışma sınıfıdır."
        ]
      },
      {
        "heading": "Ekonomi ve toprak",
        "body": "Tımar sistemi üretimi, güvenliği ve asker yetiştirmeyi birlikte sağlar.",
        "bullets": [
          "Dirlik gelirleri hizmet karşılığı verilir.",
          "Tımarlı sipahiler taşra askeridir.",
          "Vakıflar sosyal hizmetleri destekler."
        ]
      }
    ],
    "mustKnow": [
      "Divan",
      "Tımar",
      "İlmiye",
      "Kalemiye",
      "Seyfiye"
    ],
    "commonMistakes": [
      "Tımarı özel mülkiyet sanmak",
      "İlmiye ve kalemiye görevlerini karıştırmak"
    ],
    "quickTimeline": [
      {
        "date": "14. yy",
        "event": "Divan teşkilatı gelişti"
      },
      {
        "date": "15. yy",
        "event": "Merkeziyetçilik arttı"
      },
      {
        "date": "16. yy",
        "event": "Klasik sistem olgunlaştı"
      }
    ]
  },
  {
    "id": "t6",
    "slug": "osmanli-duraklama-gerileme",
    "title": "Osmanlı Duraklama ve Gerileme",
    "era": "osmanli",
    "shortDescription": "Karlofça, Pasarofça, Lale Devri, Nizam-ı Cedid ve ıslahatlar.",
    "examImportance": 90,
    "estimatedMinutes": 105,
    "keywords": [
      "Karlofça",
      "Pasarofça",
      "Lale Devri",
      "Nizam-ı Cedid",
      "ıslahat"
    ],
    "summary": [
      {
        "heading": "Duraklama",
        "body": "Merkezi otoritenin zayıflaması, askeri sistemin bozulması ve mali sorunlar duraklama döneminin temel başlıklarıdır.",
        "bullets": [
          "Karlofça batıda ilk büyük toprak kaybıdır.",
          "Zitvatorok Osmanlı'nın Avusturya karşısındaki üstünlüğünü zayıflatmıştır.",
          "Islahatlar daha çok askeri alandadır."
        ]
      },
      {
        "heading": "Gerileme ve yenilik",
        "body": "18. yüzyılda Avrupa'nın üstünlüğü kabul edilmeye başlanmış, teknik ve askeri yeniliklere ağırlık verilmiştir.",
        "bullets": [
          "Pasarofça sonrası Batı etkisi artar.",
          "Lale Devri kültürel etkileşim dönemidir.",
          "III. Selim Nizam-ı Cedid'i kurmuştur."
        ]
      }
    ],
    "mustKnow": [
      "Karlofça",
      "Pasarofça",
      "Lale Devri",
      "Nizam-ı Cedid",
      "Sened-i İttifak"
    ],
    "commonMistakes": [
      "Karlofça ve Pasarofça'yı karıştırmak",
      "Lale Devri'ni sadece eğlence dönemi sanmak"
    ],
    "quickTimeline": [
      {
        "date": "1699",
        "event": "Karlofça"
      },
      {
        "date": "1718",
        "event": "Pasarofça"
      },
      {
        "date": "1793",
        "event": "Nizam-ı Cedid"
      }
    ]
  },
  {
    "id": "t7",
    "slug": "yenilesme-demokratiklesme",
    "title": "Yenileşme ve Demokratikleşme",
    "era": "yenilesme",
    "shortDescription": "Sened-i İttifak, Tanzimat, Islahat, Meşrutiyet ve anayasal gelişmeler.",
    "examImportance": 92,
    "estimatedMinutes": 110,
    "keywords": [
      "Sened-i İttifak",
      "Tanzimat",
      "Islahat",
      "Kanun-i Esasi",
      "Meşrutiyet"
    ],
    "summary": [
      {
        "heading": "Anayasal süreç",
        "body": "Osmanlı'da padişah yetkilerini sınırlayan ilk belge Sened-i İttifak, ilk anayasa Kanun-i Esasi'dir.",
        "bullets": [
          "Tanzimat hukuki güvenlik vurgular.",
          "Islahat azınlıklara geniş haklar verir.",
          "Meşrutiyet parlamentolu yönetime geçiştir."
        ]
      },
      {
        "heading": "Modernleşme hedefi",
        "body": "Yenileşme hareketleri devleti dağılmaktan kurtarma amacıyla yapılmış, eşitlik ve hukuk alanında yeni düzenlemeler getirmiştir.",
        "bullets": [
          "Tanzimat 1839'da ilan edildi.",
          "Islahat 1856'da ilan edildi.",
          "I. Meşrutiyet 1876'da ilan edildi."
        ]
      }
    ],
    "mustKnow": [
      "Sened-i İttifak",
      "Tanzimat",
      "Islahat",
      "Kanun-i Esasi",
      "II. Meşrutiyet"
    ],
    "commonMistakes": [
      "İlk anayasal belge ve ilk anayasayı karıştırmak",
      "Tanzimat ve Islahat kapsamını eşitlemek"
    ],
    "quickTimeline": [
      {
        "date": "1808",
        "event": "Sened-i İttifak"
      },
      {
        "date": "1839",
        "event": "Tanzimat"
      },
      {
        "date": "1876",
        "event": "Kanun-i Esasi"
      }
    ]
  },
  {
    "id": "t8",
    "slug": "trablusgarp-balkan-birinci-dunya",
    "title": "Trablusgarp, Balkan ve I. Dünya Savaşı",
    "era": "yenilesme",
    "shortDescription": "Osmanlı'nın son savaşları, cepheler, Mondros ve işgallerin zemini.",
    "examImportance": 88,
    "estimatedMinutes": 100,
    "keywords": [
      "Trablusgarp",
      "Uşi",
      "Balkan",
      "Çanakkale",
      "Mondros"
    ],
    "summary": [
      {
        "heading": "Son savaşlar",
        "body": "Trablusgarp ve Balkan savaşları Osmanlı'nın siyasi ve askeri zayıflığını göstermiştir. I. Dünya Savaşı sonunda Mondros imzalanmıştır.",
        "bullets": [
          "Uşi ile Kuzey Afrika'daki son toprak kaybedildi.",
          "Balkan Savaşları Rumeli kaybını hızlandırdı.",
          "Çanakkale savunma başarısıdır."
        ]
      },
      {
        "heading": "Mondros",
        "body": "Mondros Ateşkes Antlaşması'nın 7. maddesi işgallere açık zemin hazırlamıştır.",
        "bullets": [
          "7. madde işgal gerekçesidir.",
          "24. madde doğu illeriyle ilgilidir.",
          "Milli Mücadele'nin koşullarını hazırlamıştır."
        ]
      }
    ],
    "mustKnow": [
      "Uşi",
      "Balkan",
      "Kanal",
      "Çanakkale",
      "Mondros"
    ],
    "commonMistakes": [
      "Uşi ile Londra'yı karıştırmak",
      "Mondros 7. maddeyi atlamak"
    ],
    "quickTimeline": [
      {
        "date": "1912",
        "event": "Uşi Antlaşması"
      },
      {
        "date": "1915",
        "event": "Çanakkale"
      },
      {
        "date": "1918",
        "event": "Mondros"
      }
    ]
  },
  {
    "id": "t9",
    "slug": "milli-mucadele-hazirlik",
    "title": "Milli Mücadele Hazırlık Dönemi",
    "era": "milli-mucadele",
    "shortDescription": "Havza, Amasya, Erzurum, Sivas, Misak-ı Milli ve TBMM'ye giden süreç.",
    "examImportance": 98,
    "estimatedMinutes": 130,
    "keywords": [
      "Havza",
      "Amasya",
      "Erzurum",
      "Sivas",
      "Misak-ı Milli"
    ],
    "summary": [
      {
        "heading": "Genelgeler",
        "body": "Havza Genelgesi milli bilinci artırmayı, Amasya Genelgesi ise Milli Mücadele'nin amaç, gerekçe ve yöntemini açıklamayı hedeflemiştir.",
        "bullets": [
          "Amasya milli egemenlik vurgusu taşır.",
          "Milletin bağımsızlığını milletin kararı kurtaracaktır.",
          "İstanbul Hükümeti'nin yetersizliği belirtilir."
        ]
      },
      {
        "heading": "Kongreler",
        "body": "Erzurum bölgesel, Sivas ulusal niteliktedir. Sivas'ta milli cemiyetler tek çatı altında birleştirilmiştir.",
        "bullets": [
          "Temsil Heyeti Erzurum'da kuruldu.",
          "Sivas'ta tüm yurdu temsil eder hale geldi.",
          "Amasya Görüşmeleri Temsil Heyeti'nin tanınmasıdır."
        ]
      }
    ],
    "mustKnow": [
      "Havza",
      "Amasya",
      "Erzurum",
      "Sivas",
      "Misak-ı Milli"
    ],
    "commonMistakes": [
      "Amasya Genelgesi ile Amasya Görüşmelerini karıştırmak",
      "Erzurum'u doğrudan ulusal kongre sanmak"
    ],
    "quickTimeline": [
      {
        "date": "19 Mayıs 1919",
        "event": "Samsun"
      },
      {
        "date": "22 Haziran 1919",
        "event": "Amasya Genelgesi"
      },
      {
        "date": "4 Eylül 1919",
        "event": "Sivas Kongresi"
      }
    ]
  },
  {
    "id": "t10",
    "slug": "kurtulus-savasi-cepheler",
    "title": "Kurtuluş Savaşı Cepheleri",
    "era": "milli-mucadele",
    "shortDescription": "Doğu, Güney, Batı cepheleri; Gümrü, Sakarya, Büyük Taarruz ve Mudanya.",
    "examImportance": 96,
    "estimatedMinutes": 120,
    "keywords": [
      "Gümrü",
      "İnönü",
      "Sakarya",
      "Büyük Taarruz",
      "Mudanya"
    ],
    "summary": [
      {
        "heading": "Cepheler",
        "body": "Doğu Cephesi Ermenilere, Güney Cephesi Fransız ve Ermenilere, Batı Cephesi Yunanlara karşıdır.",
        "bullets": [
          "Doğu Cephesi Gümrü ile kapanır.",
          "Güney Cephesi Kuvayımilliye ağırlıklıdır.",
          "Batı Cephesi düzenli ordu savaşlarıdır."
        ]
      },
      {
        "heading": "Diplomatik sonuçlar",
        "body": "Askeri başarılar diplomatik kazanımları beraberinde getirmiştir.",
        "bullets": [
          "I. İnönü sonrası Londra Konferansı",
          "Sakarya sonrası Kars ve Ankara Antlaşmaları",
          "Mudanya silahlı mücadeleyi fiilen bitirir."
        ]
      }
    ],
    "mustKnow": [
      "Gümrü",
      "I. İnönü",
      "Sakarya",
      "Başkomutanlık",
      "Mudanya"
    ],
    "commonMistakes": [
      "Gümrü ile Kars'ı karıştırmak",
      "Mudanya'yı barış antlaşması sanmak"
    ],
    "quickTimeline": [
      {
        "date": "1920",
        "event": "Gümrü"
      },
      {
        "date": "1921",
        "event": "Sakarya"
      },
      {
        "date": "1922",
        "event": "Mudanya"
      }
    ]
  },
  {
    "id": "t11",
    "slug": "atatürk-ilke-inkilaplari",
    "title": "Atatürk İlke ve İnkılapları",
    "era": "cumhuriyet",
    "shortDescription": "Siyasi, hukuk, eğitim, kültür, ekonomi inkılapları ve Atatürk ilkeleri.",
    "examImportance": 99,
    "estimatedMinutes": 140,
    "keywords": [
      "Cumhuriyetçilik",
      "Laiklik",
      "Devletçilik",
      "Tevhid-i Tedrisat",
      "Medeni Kanun"
    ],
    "summary": [
      {
        "heading": "İnkılap alanları",
        "body": "Saltanatın kaldırılması siyasi, Tevhid-i Tedrisat eğitim, Medeni Kanun hukuk, aşar vergisinin kaldırılması ekonomi alanındadır.",
        "bullets": [
          "Saltanat 1922'de kaldırıldı.",
          "Cumhuriyet 1923'te ilan edildi.",
          "Medeni Kanun 1926'da kabul edildi."
        ]
      },
      {
        "heading": "Atatürk ilkeleri",
        "body": "İlkeler Cumhuriyet'in temel düşünce sistemini oluşturur ve inkılaplarla birlikte değerlendirilir.",
        "bullets": [
          "Cumhuriyetçilik milli egemenlikle ilgilidir.",
          "Laiklik din-devlet ayrımıdır.",
          "Devletçilik ekonomik kalkınmada devlet öncülüğüdür."
        ]
      }
    ],
    "mustKnow": [
      "Saltanat",
      "Cumhuriyet",
      "Halifelik",
      "Tevhid-i Tedrisat",
      "Medeni Kanun"
    ],
    "commonMistakes": [
      "İlke ve inkılap alanlarını karıştırmak",
      "Laiklik aşamalarını sırasız bilmek"
    ],
    "quickTimeline": [
      {
        "date": "1922",
        "event": "Saltanatın kaldırılması"
      },
      {
        "date": "1923",
        "event": "Cumhuriyet"
      },
      {
        "date": "1926",
        "event": "Medeni Kanun"
      }
    ]
  },
  {
    "id": "t12",
    "slug": "cumhuriyet-donemi-dis-politika-cagdas",
    "title": "Cumhuriyet Dönemi Dış Politika ve Çağdaş Tarih",
    "era": "cagdas",
    "shortDescription": "Lozan sonrası dış politika, II. Dünya Savaşı, Soğuk Savaş, NATO ve Kıbrıs.",
    "examImportance": 82,
    "estimatedMinutes": 95,
    "keywords": [
      "Lozan",
      "Musul",
      "Hatay",
      "NATO",
      "Kıbrıs"
    ],
    "summary": [
      {
        "heading": "Atatürk dönemi dış politika",
        "body": "Lozan sonrası temel hedef bağımsızlığı korumak ve barışçı dış politika yürütmektir.",
        "bullets": [
          "Musul sorunu İngiltere ile ilgilidir.",
          "Hatay Türkiye'ye 1939'da katıldı.",
          "Montrö Boğazlar üzerinde egemenliği güçlendirdi."
        ]
      },
      {
        "heading": "Çağdaş dünya",
        "body": "II. Dünya Savaşı sonrası dünya iki kutuplu yapıya dönüşmüş, Türkiye Batı bloğunda yer almıştır.",
        "bullets": [
          "Türkiye 1952'de NATO'ya girdi.",
          "Kore Savaşı üyelik sürecinde etkili oldu.",
          "Kıbrıs meselesi dış politikanın önemli başlığıdır."
        ]
      }
    ],
    "mustKnow": [
      "Musul",
      "Hatay",
      "Montrö",
      "NATO",
      "Kıbrıs"
    ],
    "commonMistakes": [
      "NATO yılını karıştırmak",
      "Hatay ve Musul sonuçlarını karıştırmak"
    ],
    "quickTimeline": [
      {
        "date": "1936",
        "event": "Montrö"
      },
      {
        "date": "1939",
        "event": "Hatay"
      },
      {
        "date": "1952",
        "event": "NATO"
      }
    ]
  }
] satisfies Topic[];

export const questions = [
  {
    "id": "q1",
    "topicId": "t1",
    "type": "single",
    "difficulty": "orta",
    "stem": "Kut anlayışı aşağıdakilerden hangisiyle ilgilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Hükümdarlık yetkisinin Tanrı tarafından verildiği inancı"
      },
      {
        "id": "B",
        "text": "Yazılı hukuk kuralları"
      },
      {
        "id": "C",
        "text": "Mezar taşı geleneği"
      },
      {
        "id": "D",
        "text": "Ticaret örgütü"
      },
      {
        "id": "E",
        "text": "Din adamı sınıfı"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Kut, siyasi meşruiyet kaynağıdır.",
    "examTip": "Kut = egemenlik yetkisi.",
    "tags": [
      "islamiyet",
      "kut"
    ]
  },
  {
    "id": "q2",
    "topicId": "t1",
    "type": "single",
    "difficulty": "ileri",
    "stem": "İslamiyet öncesi Türklerde yazısız hukuk kurallarına ne ad verilir?",
    "choices": [
      {
        "id": "A",
        "text": "Töre"
      },
      {
        "id": "B",
        "text": "Kut"
      },
      {
        "id": "C",
        "text": "Yuğ"
      },
      {
        "id": "D",
        "text": "Balbal"
      },
      {
        "id": "E",
        "text": "Kurgan"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Töre toplum düzenini sağlayan yazısız hukuk kurallarıdır.",
    "examTip": "Töre = hukuk.",
    "tags": [
      "islamiyet",
      "kut"
    ]
  },
  {
    "id": "q3",
    "topicId": "t1",
    "type": "single",
    "difficulty": "temel",
    "stem": "Kurultayın temel özelliği hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Danışma meclisi niteliği taşıması"
      },
      {
        "id": "B",
        "text": "Tam demokratik yasama organı olması"
      },
      {
        "id": "C",
        "text": "Sadece dini törenleri yönetmesi"
      },
      {
        "id": "D",
        "text": "Vergi toplaması"
      },
      {
        "id": "E",
        "text": "Orduyu tamamen kaldırması"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Kurultay danışma organıdır; son söz çoğu kez hükümdardadır.",
    "examTip": "Kurultay = danışma.",
    "tags": [
      "islamiyet",
      "kut"
    ]
  },
  {
    "id": "q4",
    "topicId": "t1",
    "type": "single",
    "difficulty": "orta",
    "stem": "İkili teşkilatın en önemli olumsuz sonucu nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Ülkenin bölünme riskini artırması"
      },
      {
        "id": "B",
        "text": "Ticareti tamamen bitirmesi"
      },
      {
        "id": "C",
        "text": "Hükümdarlığı kaldırması"
      },
      {
        "id": "D",
        "text": "Töreyi yazılı hale getirmesi"
      },
      {
        "id": "E",
        "text": "Orhun Yazıtlarını oluşturması"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "İkili teşkilat yönetimi kolaylaştırır fakat merkezi otoriteyi zayıflatabilir.",
    "examTip": "İkili teşkilat = kolay yönetim + bölünme riski.",
    "tags": [
      "islamiyet",
      "kut"
    ]
  },
  {
    "id": "q5",
    "topicId": "t1",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Orhun Yazıtları hangi açıdan önemlidir?",
    "choices": [
      {
        "id": "A",
        "text": "Türk tarihinin önemli yazılı kaynaklarından olması"
      },
      {
        "id": "B",
        "text": "İlk Osmanlı anayasası olması"
      },
      {
        "id": "C",
        "text": "İlk İslam hukuku metni olması"
      },
      {
        "id": "D",
        "text": "Tımar sistemini açıklaması"
      },
      {
        "id": "E",
        "text": "TBMM kararlarını içermesi"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Orhun Yazıtları Türk adı ve devlet anlayışı hakkında bilgi verir.",
    "examTip": "Orhun = yazılı kaynak.",
    "tags": [
      "islamiyet",
      "kut"
    ]
  },
  {
    "id": "q6",
    "topicId": "t2",
    "type": "single",
    "difficulty": "temel",
    "stem": "İlk Müslüman Türk devleti hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Karahanlılar"
      },
      {
        "id": "B",
        "text": "Gazneliler"
      },
      {
        "id": "C",
        "text": "Büyük Selçuklular"
      },
      {
        "id": "D",
        "text": "Harzemşahlar"
      },
      {
        "id": "E",
        "text": "Tolunoğulları"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Karahanlılar ilk Müslüman Türk devleti kabul edilir.",
    "examTip": "İlk Müslüman Türk devleti = Karahanlı.",
    "tags": [
      "ilk",
      "Karahanlı"
    ]
  },
  {
    "id": "q7",
    "topicId": "t2",
    "type": "single",
    "difficulty": "orta",
    "stem": "Gaznelilerin İslam tarihindeki önemli rolü nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Hindistan'a İslamiyetin yayılmasında etkili olmaları"
      },
      {
        "id": "B",
        "text": "İstanbul'u fethetmeleri"
      },
      {
        "id": "C",
        "text": "İlk Osmanlı anayasasını ilan etmeleri"
      },
      {
        "id": "D",
        "text": "Karlofça'yı imzalamaları"
      },
      {
        "id": "E",
        "text": "Cumhuriyeti ilan etmeleri"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Gazneliler Hindistan seferleriyle İslamiyetin yayılmasında rol oynadı.",
    "examTip": "Gazneli = Hindistan.",
    "tags": [
      "ilk",
      "Karahanlı"
    ]
  },
  {
    "id": "q8",
    "topicId": "t2",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Dandanakan Savaşı'nın sonucu aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Büyük Selçuklu Devleti'nin kuruluş sürecinin hızlanması"
      },
      {
        "id": "B",
        "text": "Osmanlı'nın yıkılması"
      },
      {
        "id": "C",
        "text": "NATO üyeliği"
      },
      {
        "id": "D",
        "text": "Tanzimat'ın ilanı"
      },
      {
        "id": "E",
        "text": "TBMM'nin açılması"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1040 Dandanakan, Selçukluların Gaznelilere karşı üstünlük kurduğu savaştır.",
    "examTip": "Dandanakan = Selçuklu yükselişi.",
    "tags": [
      "ilk",
      "Karahanlı"
    ]
  },
  {
    "id": "q9",
    "topicId": "t2",
    "type": "single",
    "difficulty": "temel",
    "stem": "Malazgirt Savaşı'nın temel sonucu nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Anadolu'nun Türkleşme sürecinin hızlanması"
      },
      {
        "id": "B",
        "text": "Karlofça'nın imzalanması"
      },
      {
        "id": "C",
        "text": "İlk anayasanın ilanı"
      },
      {
        "id": "D",
        "text": "İstanbul'un fethi"
      },
      {
        "id": "E",
        "text": "Sened-i İttifak"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1071 Malazgirt Anadolu'nun Türk yurdu olma sürecini hızlandırdı.",
    "examTip": "Malazgirt = Anadolu.",
    "tags": [
      "ilk",
      "Karahanlı"
    ]
  },
  {
    "id": "q10",
    "topicId": "t2",
    "type": "single",
    "difficulty": "orta",
    "stem": "Nizamiye Medreseleri hangi devlet döneminde öne çıkmıştır?",
    "choices": [
      {
        "id": "A",
        "text": "Büyük Selçuklular"
      },
      {
        "id": "B",
        "text": "Uygurlar"
      },
      {
        "id": "C",
        "text": "Osmanlı Duraklama"
      },
      {
        "id": "D",
        "text": "TBMM"
      },
      {
        "id": "E",
        "text": "Türkiye Cumhuriyeti"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Nizamiye Medreseleri Büyük Selçuklu döneminin önemli eğitim kurumlarıdır.",
    "examTip": "Nizamiye = Selçuklu eğitim.",
    "tags": [
      "ilk",
      "Karahanlı"
    ]
  },
  {
    "id": "q11",
    "topicId": "t3",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Miryokefalon Savaşı'nın önemi nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Anadolu'nun Türk yurdu olduğunun kesinleşmesi"
      },
      {
        "id": "B",
        "text": "İlk anayasanın ilanı"
      },
      {
        "id": "C",
        "text": "Rumeli'ye geçiş"
      },
      {
        "id": "D",
        "text": "Kapitülasyonların kaldırılması"
      },
      {
        "id": "E",
        "text": "NATO'ya giriş"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1176 Miryokefalon, Bizans'ın Anadolu'yu geri alma umudunu zayıflattı.",
    "examTip": "Miryokefalon = Anadolu kesinleşti.",
    "tags": [
      "turkiye",
      "Miryokefalon"
    ]
  },
  {
    "id": "q12",
    "topicId": "t3",
    "type": "single",
    "difficulty": "temel",
    "stem": "Kervansarayların temel amacı nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Ticareti güvenli ve canlı tutmak"
      },
      {
        "id": "B",
        "text": "Padişah yetkisini sınırlamak"
      },
      {
        "id": "C",
        "text": "Sadece asker yetiştirmek"
      },
      {
        "id": "D",
        "text": "Deniz ticaretini bitirmek"
      },
      {
        "id": "E",
        "text": "Anayasa yapmak"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Kervansaraylar ticaret yollarında güvenlik ve konaklama sağlar.",
    "examTip": "Kervansaray = ticaret.",
    "tags": [
      "turkiye",
      "Miryokefalon"
    ]
  },
  {
    "id": "q13",
    "topicId": "t3",
    "type": "single",
    "difficulty": "orta",
    "stem": "Kösedağ Savaşı'nın sonucu nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Türkiye Selçuklu otoritesinin zayıflaması"
      },
      {
        "id": "B",
        "text": "İstanbul'un alınması"
      },
      {
        "id": "C",
        "text": "Cumhuriyetin ilanı"
      },
      {
        "id": "D",
        "text": "Karlofça'nın imzalanması"
      },
      {
        "id": "E",
        "text": "Kanun-i Esasi"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1243 Kösedağ sonrası Anadolu'da Moğol etkisi ve beylikleşme arttı.",
    "examTip": "Kösedağ = Selçuklu zayıfladı.",
    "tags": [
      "turkiye",
      "Miryokefalon"
    ]
  },
  {
    "id": "q14",
    "topicId": "t3",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Ahilik hangi alanla yakından ilgilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Ekonomik ve sosyal örgütlenme"
      },
      {
        "id": "B",
        "text": "Sadece dış politika"
      },
      {
        "id": "C",
        "text": "Deniz savaşları"
      },
      {
        "id": "D",
        "text": "Anayasa hukuku"
      },
      {
        "id": "E",
        "text": "Kapitülasyonlar"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Ahilik esnaf, üretim, ahlak ve sosyal dayanışmayla ilgilidir.",
    "examTip": "Ahilik = esnaf + ahlak.",
    "tags": [
      "turkiye",
      "Miryokefalon"
    ]
  },
  {
    "id": "q15",
    "topicId": "t3",
    "type": "single",
    "difficulty": "temel",
    "stem": "Türkçeyi resmi dil ilan eden beylik hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Karamanoğulları"
      },
      {
        "id": "B",
        "text": "Osmanoğulları"
      },
      {
        "id": "C",
        "text": "Germiyanoğulları"
      },
      {
        "id": "D",
        "text": "Dulkadiroğulları"
      },
      {
        "id": "E",
        "text": "Candaroğulları"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Karamanoğlu Mehmet Bey'in fermanı Türkçe açısından önemlidir.",
    "examTip": "Karamanoğulları = Türkçe.",
    "tags": [
      "turkiye",
      "Miryokefalon"
    ]
  },
  {
    "id": "q16",
    "topicId": "t4",
    "type": "single",
    "difficulty": "orta",
    "stem": "Osmanlı'nın Rumeli'ye geçişinde ilk önemli üs hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Çimpe Kalesi"
      },
      {
        "id": "B",
        "text": "Bursa"
      },
      {
        "id": "C",
        "text": "İznik"
      },
      {
        "id": "D",
        "text": "Amasra"
      },
      {
        "id": "E",
        "text": "Sinop"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Çimpe Kalesi Rumeli fetihleri için üs niteliğindedir.",
    "examTip": "Rumeli geçişi = Çimpe.",
    "tags": [
      "osmanli",
      "uç beyliği"
    ]
  },
  {
    "id": "q17",
    "topicId": "t4",
    "type": "single",
    "difficulty": "ileri",
    "stem": "İstanbul'un fethinin Osmanlı açısından sonucu nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Anadolu-Rumeli bütünlüğünün güçlenmesi"
      },
      {
        "id": "B",
        "text": "İlk anayasanın ilanı"
      },
      {
        "id": "C",
        "text": "NATO üyeliği"
      },
      {
        "id": "D",
        "text": "Lale Devri'nin başlaması"
      },
      {
        "id": "E",
        "text": "Sened-i İttifak"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Fetih stratejik bütünlük ve imparatorluk karakterini güçlendirdi.",
    "examTip": "Fetih sonuçlarını alanlara ayır.",
    "tags": [
      "osmanli",
      "uç beyliği"
    ]
  },
  {
    "id": "q18",
    "topicId": "t4",
    "type": "single",
    "difficulty": "temel",
    "stem": "Osmanlı'nın kısa sürede büyümesinde hangisi etkilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Bizans sınırında uç beyliği olması"
      },
      {
        "id": "B",
        "text": "NATO desteği"
      },
      {
        "id": "C",
        "text": "Sanayi İnkılabı"
      },
      {
        "id": "D",
        "text": "Meşrutiyet"
      },
      {
        "id": "E",
        "text": "Marshall Planı"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Uç beyliği konumu askeri ve ekonomik fırsat sağladı.",
    "examTip": "Kuruluş nedenlerinde coğrafi avantaj önemlidir.",
    "tags": [
      "osmanli",
      "uç beyliği"
    ]
  },
  {
    "id": "q19",
    "topicId": "t4",
    "type": "single",
    "difficulty": "orta",
    "stem": "Fatih döneminde merkeziyetçiliği güçlendiren düzenleme hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kanunname-i Ali Osman"
      },
      {
        "id": "B",
        "text": "Tanzimat Fermanı"
      },
      {
        "id": "C",
        "text": "Islahat Fermanı"
      },
      {
        "id": "D",
        "text": "Misak-ı Milli"
      },
      {
        "id": "E",
        "text": "Montrö"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Kanunname hanedan ve yönetim düzeniyle merkezi otoriteyi güçlendirir.",
    "examTip": "Fatih = merkeziyetçilik.",
    "tags": [
      "osmanli",
      "uç beyliği"
    ]
  },
  {
    "id": "q20",
    "topicId": "t4",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Devşirme sisteminin temel amacı nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Merkez ordusu ve yönetici kadro yetiştirmek"
      },
      {
        "id": "B",
        "text": "Ticaret yollarını kapatmak"
      },
      {
        "id": "C",
        "text": "Padişah yetkisini sınırlamak"
      },
      {
        "id": "D",
        "text": "Anayasayı ilan etmek"
      },
      {
        "id": "E",
        "text": "Halifeliği kaldırmak"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Devşirme kapıkulu ordusu ve saray kadroları için kullanıldı.",
    "examTip": "Devşirme = merkez kadro.",
    "tags": [
      "osmanli",
      "uç beyliği"
    ]
  },
  {
    "id": "q21",
    "topicId": "t5",
    "type": "single",
    "difficulty": "temel",
    "stem": "Divan-ı Hümayun hangi işleve sahiptir?",
    "choices": [
      {
        "id": "A",
        "text": "Devlet işlerinin görüşüldüğü kurul olması"
      },
      {
        "id": "B",
        "text": "Sadece dini tören düzenlemesi"
      },
      {
        "id": "C",
        "text": "Köy vergilerini kaldırması"
      },
      {
        "id": "D",
        "text": "NATO'ya giriş kararı"
      },
      {
        "id": "E",
        "text": "Kapitülasyonları bitirmesi"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Divan önemli devlet meselelerinin görüşüldüğü merkez organıdır.",
    "examTip": "Divan = yönetim kurulu.",
    "tags": [
      "osmanli",
      "divan"
    ]
  },
  {
    "id": "q22",
    "topicId": "t5",
    "type": "single",
    "difficulty": "orta",
    "stem": "Tımar sisteminin temel amacı nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Üretimi sürdürmek ve asker yetiştirmek"
      },
      {
        "id": "B",
        "text": "Anayasa ilan etmek"
      },
      {
        "id": "C",
        "text": "Azınlıklara hak vermek"
      },
      {
        "id": "D",
        "text": "Dış borç almak"
      },
      {
        "id": "E",
        "text": "Saltanatı kaldırmak"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Tımar sistemi mali, askeri ve üretim işlevi taşır.",
    "examTip": "Tımar = toprak geliri + sipahi.",
    "tags": [
      "osmanli",
      "divan"
    ]
  },
  {
    "id": "q23",
    "topicId": "t5",
    "type": "single",
    "difficulty": "ileri",
    "stem": "İlmiye sınıfı hangi alanla ilgilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Eğitim, hukuk ve din işleri"
      },
      {
        "id": "B",
        "text": "Askeri seferler"
      },
      {
        "id": "C",
        "text": "Yazışma ve maliye"
      },
      {
        "id": "D",
        "text": "Sadece ticaret"
      },
      {
        "id": "E",
        "text": "Dış politika"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "İlmiye ulema, kadı, müderris gibi görevleri kapsar.",
    "examTip": "İlmiye = eğitim/hukuk/din.",
    "tags": [
      "osmanli",
      "divan"
    ]
  },
  {
    "id": "q24",
    "topicId": "t5",
    "type": "single",
    "difficulty": "temel",
    "stem": "Kalemiye sınıfının görevi nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Bürokrasi ve yazışma işleri"
      },
      {
        "id": "B",
        "text": "Savaş meydanı komutanlığı"
      },
      {
        "id": "C",
        "text": "Medrese dersleri"
      },
      {
        "id": "D",
        "text": "Esnaf denetimi"
      },
      {
        "id": "E",
        "text": "Denizcilik"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Kalemiye Osmanlı bürokrasisinin yazışma ve mali işlerini yürütür.",
    "examTip": "Kalemiye = kalem/bürokrasi.",
    "tags": [
      "osmanli",
      "divan"
    ]
  },
  {
    "id": "q25",
    "topicId": "t5",
    "type": "single",
    "difficulty": "orta",
    "stem": "Vakıfların Osmanlı toplumundaki işlevi nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Sosyal hizmetleri desteklemek"
      },
      {
        "id": "B",
        "text": "Sadece ordu kurmak"
      },
      {
        "id": "C",
        "text": "Padişahı seçmek"
      },
      {
        "id": "D",
        "text": "Anayasa yazmak"
      },
      {
        "id": "E",
        "text": "Savaş ilan etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Vakıflar eğitim, sağlık, imaret gibi sosyal hizmetleri destekler.",
    "examTip": "Vakıf = sosyal hizmet.",
    "tags": [
      "osmanli",
      "divan"
    ]
  },
  {
    "id": "q26",
    "topicId": "t6",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Osmanlı'nın batıda ilk büyük toprak kaybı hangi antlaşmadır?",
    "choices": [
      {
        "id": "A",
        "text": "Karlofça"
      },
      {
        "id": "B",
        "text": "Pasarofça"
      },
      {
        "id": "C",
        "text": "Zitvatorok"
      },
      {
        "id": "D",
        "text": "Yaş"
      },
      {
        "id": "E",
        "text": "Bükreş"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1699 Karlofça batıda ilk büyük toprak kaybıdır.",
    "examTip": "Karlofça = ilk büyük kayıp.",
    "tags": [
      "osmanli",
      "Karlofça"
    ]
  },
  {
    "id": "q27",
    "topicId": "t6",
    "type": "single",
    "difficulty": "temel",
    "stem": "Pasarofça sonrası öne çıkan dönem hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Lale Devri"
      },
      {
        "id": "B",
        "text": "Tanzimat"
      },
      {
        "id": "C",
        "text": "Milli Mücadele"
      },
      {
        "id": "D",
        "text": "Cumhuriyet"
      },
      {
        "id": "E",
        "text": "Soğuk Savaş"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1718 Pasarofça sonrası Lale Devri başlamıştır.",
    "examTip": "Pasarofça = Lale Devri.",
    "tags": [
      "osmanli",
      "Karlofça"
    ]
  },
  {
    "id": "q28",
    "topicId": "t6",
    "type": "single",
    "difficulty": "orta",
    "stem": "Nizam-ı Cedid hangi padişah dönemindedir?",
    "choices": [
      {
        "id": "A",
        "text": "III. Selim"
      },
      {
        "id": "B",
        "text": "II. Mahmut"
      },
      {
        "id": "C",
        "text": "Abdülmecit"
      },
      {
        "id": "D",
        "text": "II. Abdülhamit"
      },
      {
        "id": "E",
        "text": "I. Murad"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "III. Selim döneminde Nizam-ı Cedid ordusu kurulmuştur.",
    "examTip": "III. Selim = Nizam-ı Cedid.",
    "tags": [
      "osmanli",
      "Karlofça"
    ]
  },
  {
    "id": "q29",
    "topicId": "t6",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Zitvatorok Antlaşması'nın önemi nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Osmanlı'nın Avusturya karşısındaki üstünlüğünün zayıflaması"
      },
      {
        "id": "B",
        "text": "İlk anayasa olması"
      },
      {
        "id": "C",
        "text": "Cumhuriyeti ilan etmesi"
      },
      {
        "id": "D",
        "text": "NATO üyeliği"
      },
      {
        "id": "E",
        "text": "Kapitülasyonların kaldırılması"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Zitvatorok Osmanlı-Avusturya ilişkilerinde eşitlik algısını güçlendirdi.",
    "examTip": "Zitvatorok = Avusturya eşitliği.",
    "tags": [
      "osmanli",
      "Karlofça"
    ]
  },
  {
    "id": "q30",
    "topicId": "t6",
    "type": "single",
    "difficulty": "temel",
    "stem": "Lale Devri'nin belirgin özelliği nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Batı kültürüyle etkileşimin artması"
      },
      {
        "id": "B",
        "text": "İlk Türk devletinin kurulması"
      },
      {
        "id": "C",
        "text": "TBMM'nin açılması"
      },
      {
        "id": "D",
        "text": "Sakarya Savaşı"
      },
      {
        "id": "E",
        "text": "Medeni Kanun"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Lale Devri kültür, sanat ve teknik alanda Batı etkisinin arttığı dönemdir.",
    "examTip": "Lale Devri = Batı etkisi.",
    "tags": [
      "osmanli",
      "Karlofça"
    ]
  },
  {
    "id": "q31",
    "topicId": "t7",
    "type": "single",
    "difficulty": "orta",
    "stem": "Padişah yetkilerini sınırlayan ilk belge hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Sened-i İttifak"
      },
      {
        "id": "B",
        "text": "Tanzimat"
      },
      {
        "id": "C",
        "text": "Islahat"
      },
      {
        "id": "D",
        "text": "Kanun-i Esasi"
      },
      {
        "id": "E",
        "text": "Misak-ı Milli"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1808 Sened-i İttifak padişah yetkilerini sınırlayan ilk belgedir.",
    "examTip": "İlk belge = Sened-i İttifak.",
    "tags": [
      "yenilesme",
      "Sened-i İttifak"
    ]
  },
  {
    "id": "q32",
    "topicId": "t7",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Osmanlı'nın ilk anayasası hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kanun-i Esasi"
      },
      {
        "id": "B",
        "text": "Teşkilat-ı Esasiye"
      },
      {
        "id": "C",
        "text": "Tanzimat"
      },
      {
        "id": "D",
        "text": "Islahat"
      },
      {
        "id": "E",
        "text": "Sened-i İttifak"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1876 Kanun-i Esasi Osmanlı'nın ilk anayasasıdır.",
    "examTip": "İlk anayasa = Kanun-i Esasi.",
    "tags": [
      "yenilesme",
      "Sened-i İttifak"
    ]
  },
  {
    "id": "q33",
    "topicId": "t7",
    "type": "single",
    "difficulty": "temel",
    "stem": "Tanzimat Fermanı'nın temel vurgularından biri nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Can ve mal güvenliği"
      },
      {
        "id": "B",
        "text": "NATO üyeliği"
      },
      {
        "id": "C",
        "text": "Halifeliğin kaldırılması"
      },
      {
        "id": "D",
        "text": "Çimpe'nin alınması"
      },
      {
        "id": "E",
        "text": "Karlofça"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Tanzimat hukuki güvenlik ve eşitlik vurgusu taşır.",
    "examTip": "Tanzimat = hukuki güvenlik.",
    "tags": [
      "yenilesme",
      "Sened-i İttifak"
    ]
  },
  {
    "id": "q34",
    "topicId": "t7",
    "type": "single",
    "difficulty": "orta",
    "stem": "Islahat Fermanı hangi gruba daha geniş haklar vermiştir?",
    "choices": [
      {
        "id": "A",
        "text": "Azınlıklara"
      },
      {
        "id": "B",
        "text": "Tımarlı sipahilere"
      },
      {
        "id": "C",
        "text": "Göktürklere"
      },
      {
        "id": "D",
        "text": "Temsil Heyeti'ne"
      },
      {
        "id": "E",
        "text": "NATO üyelerine"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1856 Islahat Fermanı gayrimüslimlere geniş haklar vermiştir.",
    "examTip": "Islahat = azınlık hakları.",
    "tags": [
      "yenilesme",
      "Sened-i İttifak"
    ]
  },
  {
    "id": "q35",
    "topicId": "t7",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Meşrutiyetin temel özelliği nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Parlamentolu yönetime geçilmesi"
      },
      {
        "id": "B",
        "text": "Konargöçer yaşama dönüş"
      },
      {
        "id": "C",
        "text": "Tımarın kurulması"
      },
      {
        "id": "D",
        "text": "İlk Türk yazıtının dikilmesi"
      },
      {
        "id": "E",
        "text": "İstanbul'un fethi"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Meşrutiyet parlamentonun açılması ve anayasal yönetimle ilgilidir.",
    "examTip": "Meşrutiyet = parlamento.",
    "tags": [
      "yenilesme",
      "Sened-i İttifak"
    ]
  },
  {
    "id": "q36",
    "topicId": "t8",
    "type": "single",
    "difficulty": "temel",
    "stem": "Trablusgarp Savaşı sonunda hangi antlaşma imzalandı?",
    "choices": [
      {
        "id": "A",
        "text": "Uşi"
      },
      {
        "id": "B",
        "text": "Mondros"
      },
      {
        "id": "C",
        "text": "Sevr"
      },
      {
        "id": "D",
        "text": "Lozan"
      },
      {
        "id": "E",
        "text": "Mudanya"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1912 Uşi Antlaşması Trablusgarp Savaşı sonunda imzalandı.",
    "examTip": "Trablusgarp = Uşi.",
    "tags": [
      "trablusgarp",
      "Trablusgarp"
    ]
  },
  {
    "id": "q37",
    "topicId": "t8",
    "type": "single",
    "difficulty": "orta",
    "stem": "Mondros'un işgallere zemin hazırlayan maddesi hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "7. madde"
      },
      {
        "id": "B",
        "text": "1. madde"
      },
      {
        "id": "C",
        "text": "12. madde"
      },
      {
        "id": "D",
        "text": "24. madde"
      },
      {
        "id": "E",
        "text": "30. madde"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "7. madde güvenliği tehdit eden yerlerin işgaline imkan verdi.",
    "examTip": "Mondros 7. madde çok kritik.",
    "tags": [
      "trablusgarp",
      "Trablusgarp"
    ]
  },
  {
    "id": "q38",
    "topicId": "t8",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Çanakkale Cephesi'nin sonuçlarından biri nedir?",
    "choices": [
      {
        "id": "A",
        "text": "I. Dünya Savaşı'nın uzaması"
      },
      {
        "id": "B",
        "text": "Karlofça'nın imzalanması"
      },
      {
        "id": "C",
        "text": "Cumhuriyetin ilanı"
      },
      {
        "id": "D",
        "text": "Sened-i İttifak"
      },
      {
        "id": "E",
        "text": "NATO üyeliği"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Çanakkale'deki başarı savaşın uzamasına ve Rusya'ya yardımın gecikmesine yol açtı.",
    "examTip": "Çanakkale = savaş uzadı.",
    "tags": [
      "trablusgarp",
      "Trablusgarp"
    ]
  },
  {
    "id": "q39",
    "topicId": "t8",
    "type": "single",
    "difficulty": "temel",
    "stem": "Balkan Savaşları'nın Osmanlı açısından sonucu nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Rumeli topraklarının büyük ölçüde kaybedilmesi"
      },
      {
        "id": "B",
        "text": "Anadolu'nun Türk yurdu olması"
      },
      {
        "id": "C",
        "text": "İlk anayasanın ilanı"
      },
      {
        "id": "D",
        "text": "İstanbul'un alınması"
      },
      {
        "id": "E",
        "text": "NATO'ya giriş"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Balkan Savaşları Rumeli kayıplarını hızlandırmıştır.",
    "examTip": "Balkan = Rumeli kaybı.",
    "tags": [
      "trablusgarp",
      "Trablusgarp"
    ]
  },
  {
    "id": "q40",
    "topicId": "t8",
    "type": "single",
    "difficulty": "orta",
    "stem": "I. Dünya Savaşı sonunda Osmanlı hangi belgeyi imzaladı?",
    "choices": [
      {
        "id": "A",
        "text": "Mondros Ateşkesi"
      },
      {
        "id": "B",
        "text": "Mudanya"
      },
      {
        "id": "C",
        "text": "Lozan"
      },
      {
        "id": "D",
        "text": "Ankara Antlaşması"
      },
      {
        "id": "E",
        "text": "Gümrü"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Osmanlı I. Dünya Savaşı sonunda Mondros Ateşkes Antlaşması'nı imzaladı.",
    "examTip": "I. Dünya sonu = Mondros.",
    "tags": [
      "trablusgarp",
      "Trablusgarp"
    ]
  },
  {
    "id": "q41",
    "topicId": "t9",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Milli Mücadele'nin amaç, gerekçe ve yöntemi ilk kez nerede belirtildi?",
    "choices": [
      {
        "id": "A",
        "text": "Amasya Genelgesi"
      },
      {
        "id": "B",
        "text": "Havza Genelgesi"
      },
      {
        "id": "C",
        "text": "Erzurum Kongresi"
      },
      {
        "id": "D",
        "text": "Sivas Kongresi"
      },
      {
        "id": "E",
        "text": "Lozan"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Amasya Genelgesi amaç, gerekçe ve yöntemi ortaya koyar.",
    "examTip": "Amasya = amaç/gerekçe/yöntem.",
    "tags": [
      "milli",
      "Havza"
    ]
  },
  {
    "id": "q42",
    "topicId": "t9",
    "type": "single",
    "difficulty": "temel",
    "stem": "Milli cemiyetler nerede tek çatı altında birleştirildi?",
    "choices": [
      {
        "id": "A",
        "text": "Sivas Kongresi"
      },
      {
        "id": "B",
        "text": "Erzurum Kongresi"
      },
      {
        "id": "C",
        "text": "Havza Genelgesi"
      },
      {
        "id": "D",
        "text": "Amasya Görüşmeleri"
      },
      {
        "id": "E",
        "text": "Londra Konferansı"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Sivas Kongresi milli cemiyetleri Anadolu ve Rumeli Müdafaa-i Hukuk adıyla birleştirdi.",
    "examTip": "Sivas = cemiyetlerin birleşmesi.",
    "tags": [
      "milli",
      "Havza"
    ]
  },
  {
    "id": "q43",
    "topicId": "t9",
    "type": "single",
    "difficulty": "orta",
    "stem": "Temsil Heyeti ilk kez nerede oluşturuldu?",
    "choices": [
      {
        "id": "A",
        "text": "Erzurum Kongresi"
      },
      {
        "id": "B",
        "text": "Sivas Kongresi"
      },
      {
        "id": "C",
        "text": "Amasya Genelgesi"
      },
      {
        "id": "D",
        "text": "TBMM"
      },
      {
        "id": "E",
        "text": "Lozan"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Temsil Heyeti Erzurum'da oluşturulmuş, Sivas'ta tüm yurdu temsil eder hale gelmiştir.",
    "examTip": "Temsil Heyeti ilk = Erzurum.",
    "tags": [
      "milli",
      "Havza"
    ]
  },
  {
    "id": "q44",
    "topicId": "t9",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Amasya Görüşmelerinin önemi nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Temsil Heyeti'nin İstanbul Hükümeti tarafından tanınması"
      },
      {
        "id": "B",
        "text": "İlk anayasanın ilanı"
      },
      {
        "id": "C",
        "text": "NATO üyeliği"
      },
      {
        "id": "D",
        "text": "Karlofça"
      },
      {
        "id": "E",
        "text": "Çimpe'nin alınması"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Amasya Görüşmeleri Temsil Heyeti'nin tanınması açısından önemlidir.",
    "examTip": "Amasya Görüşmeleri = tanınma.",
    "tags": [
      "milli",
      "Havza"
    ]
  },
  {
    "id": "q45",
    "topicId": "t9",
    "type": "single",
    "difficulty": "temel",
    "stem": "Misak-ı Milli nerede kabul edilmiştir?",
    "choices": [
      {
        "id": "A",
        "text": "Son Osmanlı Mebusan Meclisi"
      },
      {
        "id": "B",
        "text": "Sivas Kongresi"
      },
      {
        "id": "C",
        "text": "Erzurum Kongresi"
      },
      {
        "id": "D",
        "text": "TBMM II. dönem"
      },
      {
        "id": "E",
        "text": "Saltanat Şurası"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Misak-ı Milli Son Osmanlı Mebusan Meclisi'nde kabul edildi.",
    "examTip": "Misak-ı Milli = Son Osmanlı Mebusan.",
    "tags": [
      "milli",
      "Havza"
    ]
  },
  {
    "id": "q46",
    "topicId": "t10",
    "type": "single",
    "difficulty": "orta",
    "stem": "TBMM'nin imzaladığı ilk antlaşma hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Gümrü"
      },
      {
        "id": "B",
        "text": "Kars"
      },
      {
        "id": "C",
        "text": "Ankara"
      },
      {
        "id": "D",
        "text": "Mudanya"
      },
      {
        "id": "E",
        "text": "Lozan"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Gümrü Antlaşması TBMM'nin imzaladığı ilk antlaşmadır.",
    "examTip": "Gümrü = ilk antlaşma.",
    "tags": [
      "kurtulus",
      "Gümrü"
    ]
  },
  {
    "id": "q47",
    "topicId": "t10",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Güney Cephesi'nin karakteri nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Kuvayımilliye ağırlıklı olması"
      },
      {
        "id": "B",
        "text": "Tamamen düzenli ordu savaşı olması"
      },
      {
        "id": "C",
        "text": "Sadece deniz savaşı olması"
      },
      {
        "id": "D",
        "text": "NATO operasyonu olması"
      },
      {
        "id": "E",
        "text": "Padişah tarafından yönetilmesi"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Güney Cephesi'nde halk direnişi ve Kuvayımilliye öne çıkar.",
    "examTip": "Güney = Kuvayımilliye.",
    "tags": [
      "kurtulus",
      "Gümrü"
    ]
  },
  {
    "id": "q48",
    "topicId": "t10",
    "type": "single",
    "difficulty": "temel",
    "stem": "Sakarya Savaşı sonrası hangi antlaşmalar imzalandı?",
    "choices": [
      {
        "id": "A",
        "text": "Kars ve Ankara"
      },
      {
        "id": "B",
        "text": "Uşi ve Mondros"
      },
      {
        "id": "C",
        "text": "Karlofça ve Pasarofça"
      },
      {
        "id": "D",
        "text": "Tanzimat ve Islahat"
      },
      {
        "id": "E",
        "text": "Sevr ve Lozan"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Sakarya sonrası Kars ve Ankara Antlaşmaları diplomatik kazanımlardır.",
    "examTip": "Sakarya sonrası = Kars/Ankara.",
    "tags": [
      "kurtulus",
      "Gümrü"
    ]
  },
  {
    "id": "q49",
    "topicId": "t10",
    "type": "single",
    "difficulty": "orta",
    "stem": "Silahlı mücadeleyi fiilen bitiren gelişme nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Mudanya Ateşkes Antlaşması"
      },
      {
        "id": "B",
        "text": "Lozan Antlaşması"
      },
      {
        "id": "C",
        "text": "Amasya Genelgesi"
      },
      {
        "id": "D",
        "text": "I. İnönü"
      },
      {
        "id": "E",
        "text": "Misak-ı Milli"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Mudanya Ateşkesi silahlı mücadeleyi fiilen sona erdirmiştir.",
    "examTip": "Mudanya = ateşkes.",
    "tags": [
      "kurtulus",
      "Gümrü"
    ]
  },
  {
    "id": "q50",
    "topicId": "t10",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Batı Cephesi'nde düzenli ordunun ilk başarısı hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "I. İnönü"
      },
      {
        "id": "B",
        "text": "Sakarya"
      },
      {
        "id": "C",
        "text": "Büyük Taarruz"
      },
      {
        "id": "D",
        "text": "Başkomutanlık"
      },
      {
        "id": "E",
        "text": "Kütahya-Eskişehir"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "I. İnönü düzenli ordunun ilk başarısıdır.",
    "examTip": "Düzenli ordu ilk başarı = I. İnönü.",
    "tags": [
      "kurtulus",
      "Gümrü"
    ]
  },
  {
    "id": "q51",
    "topicId": "t11",
    "type": "single",
    "difficulty": "temel",
    "stem": "Saltanatın kaldırılması hangi alandadır?",
    "choices": [
      {
        "id": "A",
        "text": "Siyasi"
      },
      {
        "id": "B",
        "text": "Hukuk"
      },
      {
        "id": "C",
        "text": "Eğitim"
      },
      {
        "id": "D",
        "text": "Ekonomi"
      },
      {
        "id": "E",
        "text": "Kültür"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Saltanatın kaldırılması siyasi alanda yapılan inkılaptır.",
    "examTip": "Saltanat = siyasi.",
    "tags": [
      "atatürk",
      "Cumhuriyetçilik"
    ]
  },
  {
    "id": "q52",
    "topicId": "t11",
    "type": "single",
    "difficulty": "orta",
    "stem": "Tevhid-i Tedrisat hangi alanla ilgilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Eğitim"
      },
      {
        "id": "B",
        "text": "Hukuk"
      },
      {
        "id": "C",
        "text": "Ekonomi"
      },
      {
        "id": "D",
        "text": "Dış politika"
      },
      {
        "id": "E",
        "text": "Askeri"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Tevhid-i Tedrisat eğitim ve öğretimin birleştirilmesidir.",
    "examTip": "Tevhid = eğitim birliği.",
    "tags": [
      "atatürk",
      "Cumhuriyetçilik"
    ]
  },
  {
    "id": "q53",
    "topicId": "t11",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Medeni Kanun hangi alanda yapılan inkılaptır?",
    "choices": [
      {
        "id": "A",
        "text": "Hukuk"
      },
      {
        "id": "B",
        "text": "Siyasi"
      },
      {
        "id": "C",
        "text": "Eğitim"
      },
      {
        "id": "D",
        "text": "Askeri"
      },
      {
        "id": "E",
        "text": "Dış politika"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Medeni Kanun hukuk alanında yapılan inkılaptır.",
    "examTip": "Medeni Kanun = hukuk.",
    "tags": [
      "atatürk",
      "Cumhuriyetçilik"
    ]
  },
  {
    "id": "q54",
    "topicId": "t11",
    "type": "single",
    "difficulty": "temel",
    "stem": "Devletçilik ilkesi hangi alanla doğrudan ilgilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Ekonomi"
      },
      {
        "id": "B",
        "text": "Din"
      },
      {
        "id": "C",
        "text": "Askerlik"
      },
      {
        "id": "D",
        "text": "Dış politika"
      },
      {
        "id": "E",
        "text": "Yazı dili"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Devletçilik ekonomik kalkınmada devlet öncülüğünü ifade eder.",
    "examTip": "Devletçilik = ekonomi.",
    "tags": [
      "atatürk",
      "Cumhuriyetçilik"
    ]
  },
  {
    "id": "q55",
    "topicId": "t11",
    "type": "single",
    "difficulty": "orta",
    "stem": "Laiklik ilkesi neyi ifade eder?",
    "choices": [
      {
        "id": "A",
        "text": "Din ve devlet işlerinin ayrılması"
      },
      {
        "id": "B",
        "text": "Sadece halk yönetimi"
      },
      {
        "id": "C",
        "text": "Devletin ekonomiden çekilmesi"
      },
      {
        "id": "D",
        "text": "Saltanatın güçlenmesi"
      },
      {
        "id": "E",
        "text": "Tımar sistemi"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Laiklik din ve devlet işlerinin ayrılmasıyla ilgilidir.",
    "examTip": "Laiklik = din/devlet ayrımı.",
    "tags": [
      "atatürk",
      "Cumhuriyetçilik"
    ]
  },
  {
    "id": "q56",
    "topicId": "t12",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Montrö Boğazlar Sözleşmesi'nin önemi nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Boğazlar üzerindeki Türk egemenliğini güçlendirmesi"
      },
      {
        "id": "B",
        "text": "İlk anayasa olması"
      },
      {
        "id": "C",
        "text": "Cumhuriyeti ilan etmesi"
      },
      {
        "id": "D",
        "text": "Çimpe'nin alınması"
      },
      {
        "id": "E",
        "text": "Karlofça'yı bitirmesi"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Montrö ile Türkiye Boğazlar üzerindeki egemenliğini güçlendirdi.",
    "examTip": "Montrö = Boğazlar egemenliği.",
    "tags": [
      "cumhuriyet",
      "Lozan"
    ]
  },
  {
    "id": "q57",
    "topicId": "t12",
    "type": "single",
    "difficulty": "temel",
    "stem": "Hatay hangi yıl Türkiye'ye katıldı?",
    "choices": [
      {
        "id": "A",
        "text": "1939"
      },
      {
        "id": "B",
        "text": "1923"
      },
      {
        "id": "C",
        "text": "1936"
      },
      {
        "id": "D",
        "text": "1952"
      },
      {
        "id": "E",
        "text": "1974"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Hatay 1939 yılında Türkiye'ye katılmıştır.",
    "examTip": "Hatay = 1939.",
    "tags": [
      "cumhuriyet",
      "Lozan"
    ]
  },
  {
    "id": "q58",
    "topicId": "t12",
    "type": "single",
    "difficulty": "orta",
    "stem": "Türkiye hangi yıl NATO'ya üye oldu?",
    "choices": [
      {
        "id": "A",
        "text": "1952"
      },
      {
        "id": "B",
        "text": "1945"
      },
      {
        "id": "C",
        "text": "1947"
      },
      {
        "id": "D",
        "text": "1960"
      },
      {
        "id": "E",
        "text": "1974"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Türkiye 1952 yılında NATO'ya üye oldu.",
    "examTip": "NATO = 1952.",
    "tags": [
      "cumhuriyet",
      "Lozan"
    ]
  },
  {
    "id": "q59",
    "topicId": "t12",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Kore Savaşı Türkiye açısından hangi süreci etkiledi?",
    "choices": [
      {
        "id": "A",
        "text": "NATO üyeliği"
      },
      {
        "id": "B",
        "text": "Tanzimat"
      },
      {
        "id": "C",
        "text": "İstanbul'un fethi"
      },
      {
        "id": "D",
        "text": "Sened-i İttifak"
      },
      {
        "id": "E",
        "text": "Karlofça"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Kore Savaşı'na asker gönderilmesi Türkiye'nin NATO üyelik sürecini etkiledi.",
    "examTip": "Kore = NATO süreci.",
    "tags": [
      "cumhuriyet",
      "Lozan"
    ]
  },
  {
    "id": "q60",
    "topicId": "t12",
    "type": "single",
    "difficulty": "temel",
    "stem": "Musul sorunu hangi devletle yaşanmıştır?",
    "choices": [
      {
        "id": "A",
        "text": "İngiltere"
      },
      {
        "id": "B",
        "text": "Fransa"
      },
      {
        "id": "C",
        "text": "İtalya"
      },
      {
        "id": "D",
        "text": "Yunanistan"
      },
      {
        "id": "E",
        "text": "Rusya"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Musul sorunu Lozan sonrası Türkiye ile İngiltere arasında yaşanmıştır.",
    "examTip": "Musul = İngiltere.",
    "tags": [
      "cumhuriyet",
      "Lozan"
    ]
  }
] satisfies Question[];

export const flashcards = [
  {
    "id": "f1",
    "topicId": "t1",
    "front": "Kut nedir / neden önemlidir?",
    "back": "İslamiyet Öncesi Türk Tarihi konusunda 'Kut' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Bozkır kültürü, kut anlayışı, kurultay, töre, ikili teşkilat ve ilk Türk devletleri.",
    "tags": [
      "kut",
      "islamiyet-oncesi"
    ]
  },
  {
    "id": "f2",
    "topicId": "t1",
    "front": "Töre nedir / neden önemlidir?",
    "back": "İslamiyet Öncesi Türk Tarihi konusunda 'Töre' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Bozkır kültürü, kut anlayışı, kurultay, töre, ikili teşkilat ve ilk Türk devletleri.",
    "tags": [
      "töre",
      "islamiyet-oncesi"
    ]
  },
  {
    "id": "f3",
    "topicId": "t1",
    "front": "Kurultay nedir / neden önemlidir?",
    "back": "İslamiyet Öncesi Türk Tarihi konusunda 'Kurultay' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Bozkır kültürü, kut anlayışı, kurultay, töre, ikili teşkilat ve ilk Türk devletleri.",
    "tags": [
      "kurultay",
      "islamiyet-oncesi"
    ]
  },
  {
    "id": "f4",
    "topicId": "t1",
    "front": "İkili teşkilat nedir / neden önemlidir?",
    "back": "İslamiyet Öncesi Türk Tarihi konusunda 'İkili teşkilat' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Bozkır kültürü, kut anlayışı, kurultay, töre, ikili teşkilat ve ilk Türk devletleri.",
    "tags": [
      "i̇kili teşkilat",
      "islamiyet-oncesi"
    ]
  },
  {
    "id": "f5",
    "topicId": "t2",
    "front": "Satuk Buğra Han nedir / neden önemlidir?",
    "back": "İlk Türk İslam Devletleri konusunda 'Satuk Buğra Han' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Karahanlı, Gazneli, Büyük Selçuklu ve Türk-İslam kurumları.",
    "tags": [
      "satuk buğra han",
      "turk-islam"
    ]
  },
  {
    "id": "f6",
    "topicId": "t2",
    "front": "Dandanakan nedir / neden önemlidir?",
    "back": "İlk Türk İslam Devletleri konusunda 'Dandanakan' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Karahanlı, Gazneli, Büyük Selçuklu ve Türk-İslam kurumları.",
    "tags": [
      "dandanakan",
      "turk-islam"
    ]
  },
  {
    "id": "f7",
    "topicId": "t2",
    "front": "Malazgirt nedir / neden önemlidir?",
    "back": "İlk Türk İslam Devletleri konusunda 'Malazgirt' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Karahanlı, Gazneli, Büyük Selçuklu ve Türk-İslam kurumları.",
    "tags": [
      "malazgirt",
      "turk-islam"
    ]
  },
  {
    "id": "f8",
    "topicId": "t2",
    "front": "İkta nedir / neden önemlidir?",
    "back": "İlk Türk İslam Devletleri konusunda 'İkta' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Karahanlı, Gazneli, Büyük Selçuklu ve Türk-İslam kurumları.",
    "tags": [
      "i̇kta",
      "turk-islam"
    ]
  },
  {
    "id": "f9",
    "topicId": "t3",
    "front": "Miryokefalon nedir / neden önemlidir?",
    "back": "Türkiye Selçuklu ve Beylikler konusunda 'Miryokefalon' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Anadolu'nun Türkleşmesi, Miryokefalon, ticaret yolları, beylikler ve kültür.",
    "tags": [
      "miryokefalon",
      "turk-islam"
    ]
  },
  {
    "id": "f10",
    "topicId": "t3",
    "front": "Kösedağ nedir / neden önemlidir?",
    "back": "Türkiye Selçuklu ve Beylikler konusunda 'Kösedağ' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Anadolu'nun Türkleşmesi, Miryokefalon, ticaret yolları, beylikler ve kültür.",
    "tags": [
      "kösedağ",
      "turk-islam"
    ]
  },
  {
    "id": "f11",
    "topicId": "t3",
    "front": "Ahilik nedir / neden önemlidir?",
    "back": "Türkiye Selçuklu ve Beylikler konusunda 'Ahilik' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Anadolu'nun Türkleşmesi, Miryokefalon, ticaret yolları, beylikler ve kültür.",
    "tags": [
      "ahilik",
      "turk-islam"
    ]
  },
  {
    "id": "f12",
    "topicId": "t3",
    "front": "Karamanoğulları nedir / neden önemlidir?",
    "back": "Türkiye Selçuklu ve Beylikler konusunda 'Karamanoğulları' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Anadolu'nun Türkleşmesi, Miryokefalon, ticaret yolları, beylikler ve kültür.",
    "tags": [
      "karamanoğulları",
      "turk-islam"
    ]
  },
  {
    "id": "f13",
    "topicId": "t4",
    "front": "Çimpe nedir / neden önemlidir?",
    "back": "Osmanlı Kuruluş ve Yükselme konusunda 'Çimpe' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Beylikten imparatorluğa geçiş, Rumeli fetihleri, İstanbul'un fethi ve merkeziyetçilik.",
    "tags": [
      "çimpe",
      "osmanli"
    ]
  },
  {
    "id": "f14",
    "topicId": "t4",
    "front": "İstanbul'un Fethi nedir / neden önemlidir?",
    "back": "Osmanlı Kuruluş ve Yükselme konusunda 'İstanbul'un Fethi' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Beylikten imparatorluğa geçiş, Rumeli fetihleri, İstanbul'un fethi ve merkeziyetçilik.",
    "tags": [
      "i̇stanbul'un fethi",
      "osmanli"
    ]
  },
  {
    "id": "f15",
    "topicId": "t4",
    "front": "Kanunname nedir / neden önemlidir?",
    "back": "Osmanlı Kuruluş ve Yükselme konusunda 'Kanunname' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Beylikten imparatorluğa geçiş, Rumeli fetihleri, İstanbul'un fethi ve merkeziyetçilik.",
    "tags": [
      "kanunname",
      "osmanli"
    ]
  },
  {
    "id": "f16",
    "topicId": "t4",
    "front": "Devşirme nedir / neden önemlidir?",
    "back": "Osmanlı Kuruluş ve Yükselme konusunda 'Devşirme' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Beylikten imparatorluğa geçiş, Rumeli fetihleri, İstanbul'un fethi ve merkeziyetçilik.",
    "tags": [
      "devşirme",
      "osmanli"
    ]
  },
  {
    "id": "f17",
    "topicId": "t5",
    "front": "Divan nedir / neden önemlidir?",
    "back": "Osmanlı Kültür ve Medeniyet konusunda 'Divan' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Merkez-taşra teşkilatı, divan, tımar, ilmiye, kalemiye ve seyfiye.",
    "tags": [
      "divan",
      "osmanli"
    ]
  },
  {
    "id": "f18",
    "topicId": "t5",
    "front": "Tımar nedir / neden önemlidir?",
    "back": "Osmanlı Kültür ve Medeniyet konusunda 'Tımar' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Merkez-taşra teşkilatı, divan, tımar, ilmiye, kalemiye ve seyfiye.",
    "tags": [
      "tımar",
      "osmanli"
    ]
  },
  {
    "id": "f19",
    "topicId": "t5",
    "front": "İlmiye nedir / neden önemlidir?",
    "back": "Osmanlı Kültür ve Medeniyet konusunda 'İlmiye' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Merkez-taşra teşkilatı, divan, tımar, ilmiye, kalemiye ve seyfiye.",
    "tags": [
      "i̇lmiye",
      "osmanli"
    ]
  },
  {
    "id": "f20",
    "topicId": "t5",
    "front": "Kalemiye nedir / neden önemlidir?",
    "back": "Osmanlı Kültür ve Medeniyet konusunda 'Kalemiye' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Merkez-taşra teşkilatı, divan, tımar, ilmiye, kalemiye ve seyfiye.",
    "tags": [
      "kalemiye",
      "osmanli"
    ]
  },
  {
    "id": "f21",
    "topicId": "t6",
    "front": "Karlofça nedir / neden önemlidir?",
    "back": "Osmanlı Duraklama ve Gerileme konusunda 'Karlofça' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Karlofça, Pasarofça, Lale Devri, Nizam-ı Cedid ve ıslahatlar.",
    "tags": [
      "karlofça",
      "osmanli"
    ]
  },
  {
    "id": "f22",
    "topicId": "t6",
    "front": "Pasarofça nedir / neden önemlidir?",
    "back": "Osmanlı Duraklama ve Gerileme konusunda 'Pasarofça' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Karlofça, Pasarofça, Lale Devri, Nizam-ı Cedid ve ıslahatlar.",
    "tags": [
      "pasarofça",
      "osmanli"
    ]
  },
  {
    "id": "f23",
    "topicId": "t6",
    "front": "Lale Devri nedir / neden önemlidir?",
    "back": "Osmanlı Duraklama ve Gerileme konusunda 'Lale Devri' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Karlofça, Pasarofça, Lale Devri, Nizam-ı Cedid ve ıslahatlar.",
    "tags": [
      "lale devri",
      "osmanli"
    ]
  },
  {
    "id": "f24",
    "topicId": "t6",
    "front": "Nizam-ı Cedid nedir / neden önemlidir?",
    "back": "Osmanlı Duraklama ve Gerileme konusunda 'Nizam-ı Cedid' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Karlofça, Pasarofça, Lale Devri, Nizam-ı Cedid ve ıslahatlar.",
    "tags": [
      "nizam-ı cedid",
      "osmanli"
    ]
  },
  {
    "id": "f25",
    "topicId": "t7",
    "front": "Sened-i İttifak nedir / neden önemlidir?",
    "back": "Yenileşme ve Demokratikleşme konusunda 'Sened-i İttifak' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Sened-i İttifak, Tanzimat, Islahat, Meşrutiyet ve anayasal gelişmeler.",
    "tags": [
      "sened-i i̇ttifak",
      "yenilesme"
    ]
  },
  {
    "id": "f26",
    "topicId": "t7",
    "front": "Tanzimat nedir / neden önemlidir?",
    "back": "Yenileşme ve Demokratikleşme konusunda 'Tanzimat' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Sened-i İttifak, Tanzimat, Islahat, Meşrutiyet ve anayasal gelişmeler.",
    "tags": [
      "tanzimat",
      "yenilesme"
    ]
  },
  {
    "id": "f27",
    "topicId": "t7",
    "front": "Islahat nedir / neden önemlidir?",
    "back": "Yenileşme ve Demokratikleşme konusunda 'Islahat' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Sened-i İttifak, Tanzimat, Islahat, Meşrutiyet ve anayasal gelişmeler.",
    "tags": [
      "islahat",
      "yenilesme"
    ]
  },
  {
    "id": "f28",
    "topicId": "t7",
    "front": "Kanun-i Esasi nedir / neden önemlidir?",
    "back": "Yenileşme ve Demokratikleşme konusunda 'Kanun-i Esasi' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Sened-i İttifak, Tanzimat, Islahat, Meşrutiyet ve anayasal gelişmeler.",
    "tags": [
      "kanun-i esasi",
      "yenilesme"
    ]
  },
  {
    "id": "f29",
    "topicId": "t8",
    "front": "Uşi nedir / neden önemlidir?",
    "back": "Trablusgarp, Balkan ve I. Dünya Savaşı konusunda 'Uşi' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Osmanlı'nın son savaşları, cepheler, Mondros ve işgallerin zemini.",
    "tags": [
      "uşi",
      "yenilesme"
    ]
  },
  {
    "id": "f30",
    "topicId": "t8",
    "front": "Balkan nedir / neden önemlidir?",
    "back": "Trablusgarp, Balkan ve I. Dünya Savaşı konusunda 'Balkan' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Osmanlı'nın son savaşları, cepheler, Mondros ve işgallerin zemini.",
    "tags": [
      "balkan",
      "yenilesme"
    ]
  },
  {
    "id": "f31",
    "topicId": "t8",
    "front": "Kanal nedir / neden önemlidir?",
    "back": "Trablusgarp, Balkan ve I. Dünya Savaşı konusunda 'Kanal' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Osmanlı'nın son savaşları, cepheler, Mondros ve işgallerin zemini.",
    "tags": [
      "kanal",
      "yenilesme"
    ]
  },
  {
    "id": "f32",
    "topicId": "t8",
    "front": "Çanakkale nedir / neden önemlidir?",
    "back": "Trablusgarp, Balkan ve I. Dünya Savaşı konusunda 'Çanakkale' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Osmanlı'nın son savaşları, cepheler, Mondros ve işgallerin zemini.",
    "tags": [
      "çanakkale",
      "yenilesme"
    ]
  },
  {
    "id": "f33",
    "topicId": "t9",
    "front": "Havza nedir / neden önemlidir?",
    "back": "Milli Mücadele Hazırlık Dönemi konusunda 'Havza' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Havza, Amasya, Erzurum, Sivas, Misak-ı Milli ve TBMM'ye giden süreç.",
    "tags": [
      "havza",
      "milli-mucadele"
    ]
  },
  {
    "id": "f34",
    "topicId": "t9",
    "front": "Amasya nedir / neden önemlidir?",
    "back": "Milli Mücadele Hazırlık Dönemi konusunda 'Amasya' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Havza, Amasya, Erzurum, Sivas, Misak-ı Milli ve TBMM'ye giden süreç.",
    "tags": [
      "amasya",
      "milli-mucadele"
    ]
  },
  {
    "id": "f35",
    "topicId": "t9",
    "front": "Erzurum nedir / neden önemlidir?",
    "back": "Milli Mücadele Hazırlık Dönemi konusunda 'Erzurum' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Havza, Amasya, Erzurum, Sivas, Misak-ı Milli ve TBMM'ye giden süreç.",
    "tags": [
      "erzurum",
      "milli-mucadele"
    ]
  },
  {
    "id": "f36",
    "topicId": "t9",
    "front": "Sivas nedir / neden önemlidir?",
    "back": "Milli Mücadele Hazırlık Dönemi konusunda 'Sivas' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Havza, Amasya, Erzurum, Sivas, Misak-ı Milli ve TBMM'ye giden süreç.",
    "tags": [
      "sivas",
      "milli-mucadele"
    ]
  },
  {
    "id": "f37",
    "topicId": "t10",
    "front": "Gümrü nedir / neden önemlidir?",
    "back": "Kurtuluş Savaşı Cepheleri konusunda 'Gümrü' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Doğu, Güney, Batı cepheleri; Gümrü, Sakarya, Büyük Taarruz ve Mudanya.",
    "tags": [
      "gümrü",
      "milli-mucadele"
    ]
  },
  {
    "id": "f38",
    "topicId": "t10",
    "front": "I. İnönü nedir / neden önemlidir?",
    "back": "Kurtuluş Savaşı Cepheleri konusunda 'I. İnönü' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Doğu, Güney, Batı cepheleri; Gümrü, Sakarya, Büyük Taarruz ve Mudanya.",
    "tags": [
      "i. i̇nönü",
      "milli-mucadele"
    ]
  },
  {
    "id": "f39",
    "topicId": "t10",
    "front": "Sakarya nedir / neden önemlidir?",
    "back": "Kurtuluş Savaşı Cepheleri konusunda 'Sakarya' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Doğu, Güney, Batı cepheleri; Gümrü, Sakarya, Büyük Taarruz ve Mudanya.",
    "tags": [
      "sakarya",
      "milli-mucadele"
    ]
  },
  {
    "id": "f40",
    "topicId": "t10",
    "front": "Başkomutanlık nedir / neden önemlidir?",
    "back": "Kurtuluş Savaşı Cepheleri konusunda 'Başkomutanlık' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Doğu, Güney, Batı cepheleri; Gümrü, Sakarya, Büyük Taarruz ve Mudanya.",
    "tags": [
      "başkomutanlık",
      "milli-mucadele"
    ]
  },
  {
    "id": "f41",
    "topicId": "t11",
    "front": "Saltanat nedir / neden önemlidir?",
    "back": "Atatürk İlke ve İnkılapları konusunda 'Saltanat' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Siyasi, hukuk, eğitim, kültür, ekonomi inkılapları ve Atatürk ilkeleri.",
    "tags": [
      "saltanat",
      "cumhuriyet"
    ]
  },
  {
    "id": "f42",
    "topicId": "t11",
    "front": "Cumhuriyet nedir / neden önemlidir?",
    "back": "Atatürk İlke ve İnkılapları konusunda 'Cumhuriyet' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Siyasi, hukuk, eğitim, kültür, ekonomi inkılapları ve Atatürk ilkeleri.",
    "tags": [
      "cumhuriyet",
      "cumhuriyet"
    ]
  },
  {
    "id": "f43",
    "topicId": "t11",
    "front": "Halifelik nedir / neden önemlidir?",
    "back": "Atatürk İlke ve İnkılapları konusunda 'Halifelik' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Siyasi, hukuk, eğitim, kültür, ekonomi inkılapları ve Atatürk ilkeleri.",
    "tags": [
      "halifelik",
      "cumhuriyet"
    ]
  },
  {
    "id": "f44",
    "topicId": "t11",
    "front": "Tevhid-i Tedrisat nedir / neden önemlidir?",
    "back": "Atatürk İlke ve İnkılapları konusunda 'Tevhid-i Tedrisat' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Siyasi, hukuk, eğitim, kültür, ekonomi inkılapları ve Atatürk ilkeleri.",
    "tags": [
      "tevhid-i tedrisat",
      "cumhuriyet"
    ]
  },
  {
    "id": "f45",
    "topicId": "t12",
    "front": "Musul nedir / neden önemlidir?",
    "back": "Cumhuriyet Dönemi Dış Politika ve Çağdaş Tarih konusunda 'Musul' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Lozan sonrası dış politika, II. Dünya Savaşı, Soğuk Savaş, NATO ve Kıbrıs.",
    "tags": [
      "musul",
      "cagdas"
    ]
  },
  {
    "id": "f46",
    "topicId": "t12",
    "front": "Hatay nedir / neden önemlidir?",
    "back": "Cumhuriyet Dönemi Dış Politika ve Çağdaş Tarih konusunda 'Hatay' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Lozan sonrası dış politika, II. Dünya Savaşı, Soğuk Savaş, NATO ve Kıbrıs.",
    "tags": [
      "hatay",
      "cagdas"
    ]
  },
  {
    "id": "f47",
    "topicId": "t12",
    "front": "Montrö nedir / neden önemlidir?",
    "back": "Cumhuriyet Dönemi Dış Politika ve Çağdaş Tarih konusunda 'Montrö' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Lozan sonrası dış politika, II. Dünya Savaşı, Soğuk Savaş, NATO ve Kıbrıs.",
    "tags": [
      "montrö",
      "cagdas"
    ]
  },
  {
    "id": "f48",
    "topicId": "t12",
    "front": "NATO nedir / neden önemlidir?",
    "back": "Cumhuriyet Dönemi Dış Politika ve Çağdaş Tarih konusunda 'NATO' KPSS için kritik kavramlardan biridir. Konu özetindeki bağlamıyla birlikte tekrar edilmelidir.",
    "hint": "Lozan sonrası dış politika, II. Dünya Savaşı, Soğuk Savaş, NATO ve Kıbrıs.",
    "tags": [
      "nato",
      "cagdas"
    ]
  }
] satisfies Flashcard[];

export const exams = [
  {
    "id": "mini-genel-1",
    "title": "Mini Deneme: Genel Tarama",
    "durationMinutes": 15,
    "questionIds": [
      "q1",
      "q2",
      "q3",
      "q4",
      "q5",
      "q6",
      "q7",
      "q8",
      "q9",
      "q10",
      "q11",
      "q12"
    ],
    "description": "İlk 12 soruyla temel kavramları hızlı kontrol eder."
  },
  {
    "id": "osmanli-odak",
    "title": "Osmanlı Odak Denemesi",
    "durationMinutes": 20,
    "questionIds": [
      "q16",
      "q17",
      "q18",
      "q19",
      "q20",
      "q21",
      "q22",
      "q23",
      "q24",
      "q25",
      "q26",
      "q27",
      "q28",
      "q29",
      "q30"
    ],
    "description": "Osmanlı kuruluş, medeniyet, duraklama ve gerileme ağırlıklı deneme."
  },
  {
    "id": "milli-mucadele-odak",
    "title": "Milli Mücadele Odak Denemesi",
    "durationMinutes": 18,
    "questionIds": [
      "q41",
      "q42",
      "q43",
      "q44",
      "q45",
      "q46",
      "q47",
      "q48",
      "q49",
      "q50"
    ],
    "description": "Hazırlık dönemi ve cepheleri ölçer."
  },
  {
    "id": "inkilap-cagdas",
    "title": "İnkılap + Çağdaş Denemesi",
    "durationMinutes": 20,
    "questionIds": [
      "q51",
      "q52",
      "q53",
      "q54",
      "q55",
      "q56",
      "q57",
      "q58",
      "q59",
      "q60"
    ],
    "description": "Atatürk ilkeleri, inkılaplar ve çağdaş tarih başlıklarını ölçer."
  },
  {
    "id": "karma-30",
    "title": "Karma Deneme: 30 Soru",
    "durationMinutes": 35,
    "questionIds": [
      "q1",
      "q2",
      "q3",
      "q4",
      "q5",
      "q6",
      "q7",
      "q8",
      "q9",
      "q10",
      "q11",
      "q12",
      "q13",
      "q14",
      "q15",
      "q16",
      "q17",
      "q18",
      "q19",
      "q20",
      "q21",
      "q22",
      "q23",
      "q24",
      "q25",
      "q26",
      "q27",
      "q28",
      "q29",
      "q30"
    ],
    "description": "Tüm ana konulardan dengeli 30 soruluk deneme."
  },
  {
    "id": "tam-genel",
    "title": "Tam Genel Tekrar: 60 Soru",
    "durationMinutes": 70,
    "questionIds": [
      "q1",
      "q2",
      "q3",
      "q4",
      "q5",
      "q6",
      "q7",
      "q8",
      "q9",
      "q10",
      "q11",
      "q12",
      "q13",
      "q14",
      "q15",
      "q16",
      "q17",
      "q18",
      "q19",
      "q20",
      "q21",
      "q22",
      "q23",
      "q24",
      "q25",
      "q26",
      "q27",
      "q28",
      "q29",
      "q30",
      "q31",
      "q32",
      "q33",
      "q34",
      "q35",
      "q36",
      "q37",
      "q38",
      "q39",
      "q40",
      "q41",
      "q42",
      "q43",
      "q44",
      "q45",
      "q46",
      "q47",
      "q48",
      "q49",
      "q50",
      "q51",
      "q52",
      "q53",
      "q54",
      "q55",
      "q56",
      "q57",
      "q58",
      "q59",
      "q60"
    ],
    "description": "Final tekrar için tüm soru havuzunu kapsar."
  }
] satisfies Exam[];

export const timelineEvents = [
  {
    "id": "e1",
    "date": "552",
    "title": "I. Göktürk Devleti",
    "description": "Türk adını devlet adı olarak kullanan ilk büyük siyasal yapı.",
    "topicId": "t1",
    "tone": "gold"
  },
  {
    "id": "e2",
    "date": "682",
    "title": "II. Göktürk Devleti",
    "description": "Kutluk Devleti olarak da bilinir; bağımsızlık vurgusu güçlüdür.",
    "topicId": "t1",
    "tone": "turquoise"
  },
  {
    "id": "e3",
    "date": "840",
    "title": "Karahanlılar",
    "description": "İlk Müslüman Türk devleti kabul edilir.",
    "topicId": "t2",
    "tone": "gold"
  },
  {
    "id": "e4",
    "date": "1040",
    "title": "Dandanakan",
    "description": "Büyük Selçuklu yükselişini hızlandırdı.",
    "topicId": "t2",
    "tone": "crimson"
  },
  {
    "id": "e5",
    "date": "1071",
    "title": "Malazgirt",
    "description": "Anadolu'nun Türkleşme sürecini hızlandırdı.",
    "topicId": "t2",
    "tone": "turquoise"
  },
  {
    "id": "e6",
    "date": "1176",
    "title": "Miryokefalon",
    "description": "Anadolu'nun Türk yurdu olduğu kesinleşti.",
    "topicId": "t3",
    "tone": "gold"
  },
  {
    "id": "e7",
    "date": "1243",
    "title": "Kösedağ",
    "description": "Türkiye Selçuklu otoritesi zayıfladı.",
    "topicId": "t3",
    "tone": "crimson"
  },
  {
    "id": "e8",
    "date": "1299",
    "title": "Osmanlı Kuruluşu",
    "description": "Beylikten imparatorluğa giden süreç başladı.",
    "topicId": "t4",
    "tone": "gold"
  },
  {
    "id": "e9",
    "date": "1353",
    "title": "Çimpe",
    "description": "Rumeli'ye geçiş için önemli üs elde edildi.",
    "topicId": "t4",
    "tone": "turquoise"
  },
  {
    "id": "e10",
    "date": "1453",
    "title": "İstanbul'un Fethi",
    "description": "Osmanlı imparatorluk karakteri güçlendi.",
    "topicId": "t4",
    "tone": "crimson"
  },
  {
    "id": "e11",
    "date": "1699",
    "title": "Karlofça",
    "description": "Batıda ilk büyük toprak kaybı.",
    "topicId": "t6",
    "tone": "parchment"
  },
  {
    "id": "e12",
    "date": "1718",
    "title": "Pasarofça",
    "description": "Lale Devri ve Batı etkisi arttı.",
    "topicId": "t6",
    "tone": "gold"
  },
  {
    "id": "e13",
    "date": "1808",
    "title": "Sened-i İttifak",
    "description": "Padişah yetkilerini sınırlayan ilk belge.",
    "topicId": "t7",
    "tone": "turquoise"
  },
  {
    "id": "e14",
    "date": "1839",
    "title": "Tanzimat",
    "description": "Hukuki güvenlik ve modernleşme adımı.",
    "topicId": "t7",
    "tone": "gold"
  },
  {
    "id": "e15",
    "date": "1876",
    "title": "Kanun-i Esasi",
    "description": "Osmanlı'nın ilk anayasası.",
    "topicId": "t7",
    "tone": "crimson"
  },
  {
    "id": "e16",
    "date": "1912",
    "title": "Uşi",
    "description": "Trablusgarp Savaşı sona erdi.",
    "topicId": "t8",
    "tone": "parchment"
  },
  {
    "id": "e17",
    "date": "1918",
    "title": "Mondros",
    "description": "İşgallere zemin hazırladı.",
    "topicId": "t8",
    "tone": "crimson"
  },
  {
    "id": "e18",
    "date": "1919",
    "title": "Amasya",
    "description": "Milli Mücadele'nin amaç, gerekçe ve yöntemi.",
    "topicId": "t9",
    "tone": "gold"
  },
  {
    "id": "e19",
    "date": "1920",
    "title": "Gümrü",
    "description": "TBMM'nin imzaladığı ilk antlaşma.",
    "topicId": "t10",
    "tone": "turquoise"
  },
  {
    "id": "e20",
    "date": "1922",
    "title": "Mudanya",
    "description": "Silahlı mücadele fiilen sona erdi.",
    "topicId": "t10",
    "tone": "crimson"
  },
  {
    "id": "e21",
    "date": "1923",
    "title": "Cumhuriyet",
    "description": "Milli egemenlik yönetim biçimine dönüştü.",
    "topicId": "t11",
    "tone": "gold"
  },
  {
    "id": "e22",
    "date": "1926",
    "title": "Medeni Kanun",
    "description": "Hukuk alanında modernleşme.",
    "topicId": "t11",
    "tone": "turquoise"
  },
  {
    "id": "e23",
    "date": "1936",
    "title": "Montrö",
    "description": "Boğazlar egemenliği güçlendi.",
    "topicId": "t12",
    "tone": "gold"
  },
  {
    "id": "e24",
    "date": "1939",
    "title": "Hatay",
    "description": "Türkiye'ye katıldı.",
    "topicId": "t12",
    "tone": "crimson"
  },
  {
    "id": "e25",
    "date": "1952",
    "title": "NATO",
    "description": "Türkiye Batı güvenlik sistemine katıldı.",
    "topicId": "t12",
    "tone": "turquoise"
  }
] satisfies TimelineEvent[];

export const recommendations = [
  {
    "id": "r1",
    "title": "Milli Mücadele zincirini güçlendir",
    "description": "Amasya, Erzurum, Sivas, Misak-ı Milli ve TBMM akışını tekrar et.",
    "href": "/topics/milli-mucadele-hazirlik",
    "minutes": 24,
    "priority": "yüksek"
  },
  {
    "id": "r2",
    "title": "Osmanlı kronolojisini sabitle",
    "description": "Çimpe, İstanbul, Karlofça, Pasarofça ve Nizam-ı Cedid sırasını timeline üzerinden gör.",
    "href": "/timeline",
    "minutes": 18,
    "priority": "orta"
  },
  {
    "id": "r3",
    "title": "20 flashcard aktif hatırlama",
    "description": "Kısa kavramları kartlarla hızlıca kontrol et.",
    "href": "/flashcards",
    "minutes": 12,
    "priority": "orta"
  },
  {
    "id": "r4",
    "title": "Genel tarama denemesi çöz",
    "description": "Farklı dönemlerden karışık sorularla net durumunu ölç.",
    "href": "/exams/mini-genel-1",
    "minutes": 15,
    "priority": "yüksek"
  }
] satisfies StudyRecommendation[];

export const glossary = [
  {
    "term": "Kut",
    "definition": "Hükümdarlık yetkisinin Tanrı tarafından verildiği inancı.",
    "topicId": "t1"
  },
  {
    "term": "Töre",
    "definition": "İslamiyet öncesi Türklerde yazısız hukuk kuralları.",
    "topicId": "t1"
  },
  {
    "term": "Kurultay",
    "definition": "Devlet meselelerinin görüşüldüğü danışma meclisi.",
    "topicId": "t1"
  },
  {
    "term": "İkta",
    "definition": "Selçuklularda askeri ve mali amaçlı toprak gelir sistemi.",
    "topicId": "t2"
  },
  {
    "term": "Atabey",
    "definition": "Selçuklularda melikleri eğiten görevli devlet adamı.",
    "topicId": "t2"
  },
  {
    "term": "Ahilik",
    "definition": "Anadolu'da esnaf, üretim ve ahlak örgütlenmesi.",
    "topicId": "t3"
  },
  {
    "term": "Çimpe",
    "definition": "Osmanlı'nın Rumeli'ye geçişinde ilk önemli askeri üs.",
    "topicId": "t4"
  },
  {
    "term": "Devşirme",
    "definition": "Osmanlı merkez ordusu ve yönetici sınıf için insan kaynağı sistemi.",
    "topicId": "t4"
  },
  {
    "term": "Tımar",
    "definition": "Osmanlı'da üretim ve asker yetiştirme işlevi olan dirlik sistemi.",
    "topicId": "t5"
  },
  {
    "term": "Karlofça",
    "definition": "1699'da imzalanan, batıda ilk büyük toprak kaybı sayılan antlaşma.",
    "topicId": "t6"
  },
  {
    "term": "Nizam-ı Cedid",
    "definition": "III. Selim döneminde kurulan yeni düzen ve ordu.",
    "topicId": "t6"
  },
  {
    "term": "Sened-i İttifak",
    "definition": "Padişah yetkilerini sınırlayan ilk belge.",
    "topicId": "t7"
  },
  {
    "term": "Kanun-i Esasi",
    "definition": "Osmanlı Devleti'nin ilk anayasası.",
    "topicId": "t7"
  },
  {
    "term": "Mondros",
    "definition": "I. Dünya Savaşı sonunda imzalanan ve işgallere zemin hazırlayan ateşkes.",
    "topicId": "t8"
  },
  {
    "term": "Amasya Genelgesi",
    "definition": "Milli Mücadele'nin amaç, gerekçe ve yöntemini açıklayan belge.",
    "topicId": "t9"
  },
  {
    "term": "Misak-ı Milli",
    "definition": "Milli sınırları ve bağımsızlık hedeflerini belirleyen kararlar.",
    "topicId": "t9"
  },
  {
    "term": "Gümrü",
    "definition": "TBMM'nin imzaladığı ilk antlaşma.",
    "topicId": "t10"
  },
  {
    "term": "Mudanya",
    "definition": "Kurtuluş Savaşı'nda silahlı mücadeleyi fiilen bitiren ateşkes.",
    "topicId": "t10"
  },
  {
    "term": "Tevhid-i Tedrisat",
    "definition": "Eğitim ve öğretimin birleştirilmesi kanunu.",
    "topicId": "t11"
  },
  {
    "term": "Montrö",
    "definition": "Boğazlar üzerinde Türk egemenliğini güçlendiren sözleşme.",
    "topicId": "t12"
  },
  {
    "term": "NATO",
    "definition": "Türkiye'nin 1952'de üye olduğu savunma örgütü.",
    "topicId": "t12"
  }
] as const;

export function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function getTopicById(id: string) {
  return topics.find((topic) => topic.id === id);
}

export function getQuestionsByTopic(topicId: string) {
  return questions.filter((question) => question.topicId === topicId);
}

export function getFlashcardsByTopic(topicId: string) {
  return flashcards.filter((card) => card.topicId === topicId);
}

export function getExamById(id: string) {
  return exams.find((exam) => exam.id === id);
}

export function getQuestionsByIds(ids: string[]) {
  const idSet = new Set(ids);
  return questions.filter((question) => idSet.has(question.id));
}

export function getGlossaryByTopic(topicId: string) {
  return glossary.filter((item) => item.topicId === topicId);
}
