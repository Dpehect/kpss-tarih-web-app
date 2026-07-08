import type { Exam, Flashcard, Question, StudyRecommendation, TimelineEvent, Topic } from "@/types/study";

/**
 * Özgün KPSS Tarih veri havuzu.
 * Not: Bu dosya yayıncı ders notlarından doğrudan kopyalama içermez; konu kapsamı genel KPSS müfredatı ve tarihsel olgular temel alınarak özgün biçimde yazılmıştır.
 */
export const topics: Topic[] = [
  {
    "id": "islamiyet-oncesi",
    "slug": "islamiyet-oncesi-turk-tarihi",
    "title": "İslamiyet Öncesi Türk Tarihi",
    "era": "islamiyet-oncesi",
    "shortDescription": "Bozkır kültürü, Türk adının kullanımı, ilk Türk devletleri, töre, kut, kurultay, ikili teşkilat ve Orhun Yazıtları.",
    "examImportance": 95,
    "estimatedMinutes": 90,
    "keywords": [
      "Türk adı",
      "Orta Asya",
      "kut",
      "töre",
      "kurultay",
      "ikili teşkilat",
      "onlu sistem",
      "Orhun Yazıtları",
      "Uygurlar",
      "Kavimler Göçü"
    ],
    "quickTimeline": [
      {
        "date": "MÖ 220",
        "event": "Asya Hun Devleti Orta Asya’da siyasi güç haline geldi."
      },
      {
        "date": "MÖ 209",
        "event": "Mete Han onlu askeri sistemi güçlendirdi."
      },
      {
        "date": "375",
        "event": "Kavimler Göçü Avrupa’nın siyasi yapısını değiştirdi."
      },
      {
        "date": "552",
        "event": "I. Göktürk Devleti kuruldu."
      },
      {
        "date": "681",
        "event": "II. Göktürk / Kutluk Devleti kuruldu."
      },
      {
        "date": "744",
        "event": "Uygur Devleti kuruldu ve yerleşik kültür hızlandı."
      }
    ],
    "mustKnow": [
      "Türk tarihinin ilk bilgileri Çin kaynaklarında görülür; Türk adının geçtiği ilk millî yazılı kaynak Orhun Yazıtlarıdır.",
      "Devlet adı olarak Türk adını kullanan ilk siyasi yapı Göktürklerdir.",
      "Kut hükümdarlık yetkisinin Tanrı tarafından verildiği inancıdır; demokratik seçim değildir.",
      "Töre yazısız hukuk düzenidir ve hükümdarın keyfî davranmasını sınırlar.",
      "Kurultay danışma meclisidir; son söz çoğu zaman kağanındır.",
      "Uygurlar yerleşik yaşama geçiş, matbaa, kâğıt, ticaret ve hukuk belgeleriyle kültür tarihinde öne çıkar."
    ],
    "commonMistakes": [
      "Kut anlayışını halk egemenliği sanmak.",
      "Kurultayı modern meclis gibi bağlayıcı düşünmek.",
      "Göktürk ve Uygur katkılarını karıştırmak.",
      "Kavimler Göçü sonuçlarını yalnızca askerî sonuç gibi görmek."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "İslamiyet öncesi dönem KPSS’de tek tek devlet isimlerinden çok kavramların kurumlarla ilişkisi üzerinden ölçülür. Bozkır coğrafyası siyasi teşkilatı, ekonomik hayatı, sanat anlayışını ve hukuk düzenini biçimlendirmiştir. Hayvancılık ve hareketli yaşam, taşınabilir sanat eserlerini öne çıkarırken uzun süreli hapishane, devasa mimari ve kalıcı şehir kültürünün sınırlı kalmasına yol açmıştır. Buna karşılık ordu-millet anlayışı, bağımsızlık tutkusu ve töreye bağlı devlet düzeni Türk siyasi kültürünün çekirdeğini oluşturur. Sınavda “hangisi göçebe yaşamın sonucudur?” veya “hangi kurum hükümdarın yetkisini sınırlar?” tipinde sorular gelir.",
        "bullets": [
          "Bozkır yaşamı kurumları belirler.",
          "Töre ve kut siyasi meşruiyetin merkezindedir.",
          "Ordu-millet anlayışı askerî gücü açıklar."
        ]
      },
      {
        "heading": "Devletler ve ayırt edici özellikler",
        "body": "Asya Hunları bilinen ilk Türk devleti ve Mete Han ile onlu sistem; Avrupa Hunları Balamir ve Attila; Göktürkler Türk adını devlet adı olarak kullanmaları ve Orhun Yazıtları; Uygurlar yerleşik hayat ve kültür-medeniyet katkılarıyla ayırt edilir. İskit/Sakalar bozkırın kuyumcuları, Tomris ve Alper Tunga ile; Avarlar İstanbul kuşatmalarıyla; Hazarlar Musevilik ve ticari hoşgörüyle; Kırgızlar Manas Destanı ve Uygurları yıkmalarıyla; Peçenek-Kuman-Oğuz gibi topluluklar ise Bizans ve Anadolu tarihindeki rolleriyle sorulur.",
        "bullets": [
          "Asya Hun = ilk Türk devleti.",
          "Göktürk = Türk adını devlet adı yapan ilk yapı.",
          "Uygur = yerleşik hayat ve kültür medeniyeti."
        ]
      },
      {
        "heading": "Kavram haritası",
        "body": "Kut, siyasi iktidarın kaynağını; töre, hukuk düzenini; kurultay, danışma ve devlet işlerinin görüşüldüğü meclisi; ikili teşkilat, ülkenin doğu-batı olarak yönetilmesini; toy/şölen, sosyal dayanışmayı; yuğ, cenaze törenini; balbal, öldürülen düşmanı temsil eden mezar taşı figürlerini anlatır. KPSS çeldiricileri genellikle bu kavramları yanlış dönem veya yanlış anlamla eşleştirir. Mesela kut anlayışı hükümdara yetki verir fakat “sınırsız mutlakiyet” anlamına gelmez; töre, hükümdarın da uyması beklenen geleneksel hukuk çerçevesidir.",
        "bullets": [
          "Kut = meşruiyet.",
          "Töre = yazısız hukuk.",
          "Balbal = mezar kültürü."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konuyu çalışırken önce devletleri kronolojik sıraya diz, sonra her devlet için “ilk/tek/en belirgin” özelliği yaz. Son aşamada kavramları tabloya çevir: kavram, anlam, hangi soru köküyle gelir, karıştırıldığı seçenek. İslamiyet öncesi sorularında tarih aralığından çok kavram-özellik eşleşmesi belirleyicidir. Bu yüzden soru çözerken seçenekleri tek tek dönem ve kurum açısından elemek gerekir.",
        "bullets": [
          "Önce kronoloji, sonra kavram.",
          "Her devlet için ayırt edici özellik çıkar.",
          "Yanlışlarını kavram sözlüğüne ekle."
        ]
      }
    ]
  },
  {
    "id": "turk-islam",
    "slug": "turk-islam-tarihi",
    "title": "Türk-İslam Tarihi",
    "era": "turk-islam",
    "shortDescription": "Karahanlı, Gazneli, Büyük Selçuklu ve ilk Türk-İslam eserleri; ikta, Nizamiye, atabeylik ve kültür kurumları.",
    "examImportance": 94,
    "estimatedMinutes": 95,
    "keywords": [
      "Talas",
      "Karahanlılar",
      "Gazneli Mahmut",
      "Put kırıcı",
      "Dandanakan",
      "Büyük Selçuklu",
      "Nizamiye",
      "İkta",
      "Kutadgu Bilig",
      "Divanü Lügati’t-Türk"
    ],
    "quickTimeline": [
      {
        "date": "751",
        "event": "Talas Savaşı Türklerin İslam dünyasıyla yakınlaşmasını hızlandırdı."
      },
      {
        "date": "840",
        "event": "Karahanlılar ilk Müslüman Türk devleti olarak öne çıktı."
      },
      {
        "date": "963",
        "event": "Gazneliler Hindistan seferleriyle tanındı."
      },
      {
        "date": "1040",
        "event": "Dandanakan Savaşı Büyük Selçuklu Devleti’nin kuruluşunu kesinleştirdi."
      },
      {
        "date": "1071",
        "event": "Malazgirt Zaferi Anadolu’nun kapılarını Türklere açtı."
      }
    ],
    "mustKnow": [
      "İlk Müslüman Türk devleti Karahanlılardır.",
      "Put Kırıcı unvanı Hindistan seferleriyle tanınan Gazneli Mahmut’a aittir.",
      "Dandanakan Savaşı Selçukluların Gaznelilere karşı siyasi üstünlük kazandığı dönüm noktasıdır.",
      "Nizamiye Medreseleri Büyük Selçuklu döneminde örgütlü eğitim kurumudur.",
      "Kutadgu Bilig siyasetname niteliğindedir; Divanü Lügati’t-Türk Türkçenin Araplara öğretilmesi amacıyla yazılmıştır."
    ],
    "commonMistakes": [
      "Put Kırıcıyı Artuklu, Karahanlı veya Anadolu Selçuklu kişisi sanmak.",
      "Karahanlı eserleri ile Selçuklu kurumlarını karıştırmak.",
      "Dandanakan ile Malazgirt’in sonucunu aynılaştırmak."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Türk-İslam tarihi, Türk siyasi kültürünün İslam medeniyet dairesiyle birleştiği dönemdir. KPSS’de bu alan “ilk Müslüman Türk devleti”, “ilk Türk-İslam eserleri”, “eğitim ve devlet kurumları”, “savaşların sonucu” ve “unvan-kişi eşleştirmesi” üzerinden ölçülür. Karahanlılar Türkçeyi ve İslamiyet’i birlikte taşıyan eserleriyle, Gazneliler Hindistan seferleri ve Gazneli Mahmut’un Put Kırıcı unvanıyla, Büyük Selçuklular ise ikta, Nizamiye, atabeylik ve İslam dünyasının siyasi koruyuculuğu ile ayırt edilir.",
        "bullets": [
          "Karahanlı = ilk Müslüman Türk devleti.",
          "Gazneli Mahmut = Put Kırıcı.",
          "Büyük Selçuklu = Nizamiye ve ikta."
        ]
      },
      {
        "heading": "Eser ve kurum mantığı",
        "body": "Kutadgu Bilig devlet yönetimi ve ideal hükümdar anlayışını işler; Divanü Lügati’t-Türk Türk dilini tanıtma amacı taşır; Atabetü’l-Hakayık ahlaki öğütler verir; Divan-ı Hikmet tasavvufi halk söyleyişinin güçlü örneklerindendir. Bu eserleri ezberlerken yazar-eser-amaç şeklinde üçlü tablo kurulmalıdır. Kurumlarda ise ikta askerî ve mali düzen, Nizamiye eğitim, atabeylik şehzade yetiştirme, gulam sistemi merkezî ordu ve saray hizmetleriyle ilişkilidir.",
        "bullets": [
          "Eserleri yazar ve amaçla öğren.",
          "İkta = mali/askerî düzen.",
          "Nizamiye = örgütlü eğitim."
        ]
      },
      {
        "heading": "Savaşların sonucu",
        "body": "Dandanakan, Selçukluların Gaznelilere karşı devletleşme eşiğini geçmesidir; Malazgirt, Anadolu’ya Türk yerleşimini hızlandırır. Talas Savaşı ise yalnızca askerî değil, kültürel sonuçlarıyla önemlidir: Türk-İslam yakınlaşması ve kâğıt üretiminin yayılması bağlamında sorulabilir. KPSS çeldiricisi genellikle savaşı yanlış sonuçla eşleştirir; bu yüzden “savaş-kim kiminle-sonuç” formülüyle tekrar yapılmalıdır.",
        "bullets": [
          "Talas = Türk-İslam yakınlaşması.",
          "Dandanakan = Selçuklu kuruluşu.",
          "Malazgirt = Anadolu kapıları."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konuyu kalıcı öğrenmek için üç liste çıkar: devletler, eserler ve kurumlar. Her maddenin karşısına yalnızca bir ayırt edici cümle yaz. Örneğin “Gazneli Mahmut: Hindistan seferleri ve Put Kırıcı”, “Nizamiye: Büyük Selçuklu eğitim kurumu”. Ardından soru çözerken yanlış seçenekleri neden yanlış olduğunu belirterek ele. Bu yöntem, benzer kavramların birbirine karışmasını azaltır.",
        "bullets": [
          "Devlet-eser-kurum tablosu kur.",
          "Her maddenin tek ayırt edici cümlesi olsun.",
          "Yanlış seçeneği gerekçesiyle ele."
        ]
      }
    ]
  },
  {
    "id": "anadolu-selcuklu",
    "slug": "anadolu-selcuklu-ve-beylikler",
    "title": "Anadolu Selçuklu ve Beylikler",
    "era": "turk-islam",
    "shortDescription": "Anadolu’nun Türkleşmesi, Türkiye Selçukluları, Haçlılar, Miryokefalon, Kösedağ, ticaret, ahilik ve beylikler.",
    "examImportance": 88,
    "estimatedMinutes": 90,
    "keywords": [
      "Malazgirt",
      "Miryokefalon",
      "Kösedağ",
      "Haçlı Seferleri",
      "Kervansaray",
      "Ahilik",
      "Artuklular",
      "Malabadi Köprüsü",
      "El-Cezeri"
    ],
    "quickTimeline": [
      {
        "date": "1075",
        "event": "Türkiye Selçuklu Devleti’nin kuruluş süreci başladı."
      },
      {
        "date": "1096-1270",
        "event": "Haçlı Seferleri Anadolu ve Akdeniz dünyasını etkiledi."
      },
      {
        "date": "1176",
        "event": "Miryokefalon Savaşı Anadolu’nun Türk yurdu oluşunu kesinleştirdi."
      },
      {
        "date": "1243",
        "event": "Kösedağ Savaşı Moğol baskısını ve beyliklerin güçlenmesini getirdi."
      }
    ],
    "mustKnow": [
      "Miryokefalon, Anadolu’nun Türk yurdu olduğunun kesinleşmesiyle ilişkilidir.",
      "Kösedağ, Türkiye Selçuklu merkezi otoritesini zayıflatıp beylikler dönemini güçlendirmiştir.",
      "Kervansaraylar ticaret yollarında güvenlik ve konaklama sağlar.",
      "Ahilik esnaf dayanışması, meslek ahlakı ve şehir ekonomisiyle ilgilidir.",
      "Artuklular Mardin, Diyarbakır, Harput çevresinde; Malabadi Köprüsü ve El-Cezeri ile anılır."
    ],
    "commonMistakes": [
      "Miryokefalon’u Anadolu’nun kapılarının açılması saymak; bu Malazgirt’tir.",
      "Kösedağ’ı Selçukluların güçlenmesi sanmak.",
      "Ahiliği yalnızca dinî tarikat gibi görmek."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Anadolu Selçuklu ve Beylikler konusu, Anadolu’nun askeri fetih alanı olmaktan kalıcı Türk-İslam yurdu haline gelme sürecini anlatır. Malazgirt kapıyı açarken, Miryokefalon Bizans’ın Anadolu’yu geri alma umudunu kırar. Kösedağ ise merkezi otoritenin zayıflaması ve ikinci beylikler döneminin güçlenmesi açısından dönüm noktasıdır. KPSS’de bu üç olayın sonucu mutlaka ayırt edilmelidir.",
        "bullets": [
          "Malazgirt = giriş.",
          "Miryokefalon = kesinleşme.",
          "Kösedağ = Moğol baskısı ve beylikler."
        ]
      },
      {
        "heading": "Kurum ve ekonomi",
        "body": "Türkiye Selçukluları ticaret yollarını canlı tutmak için kervansaraylar, sigorta uygulamaları, liman şehirleri ve yol güvenliği politikalarını kullandı. Ahilik, yalnızca esnaf örgütlenmesi değil; meslek ahlakı, üretim standardı ve şehir toplumsal düzenini kapsayan bir yapıdır. Bu nedenle “ekonomik-sosyal düzen” sorularında güçlü bir ipucudur. Kervansaray soruları ise genellikle ticaret ve güvenlik kavramlarıyla birlikte gelir.",
        "bullets": [
          "Kervansaray = ticaret güvenliği.",
          "Ahilik = esnaf ahlakı ve örgütlenme.",
          "Limanlar ve yollar ekonomik canlılık sağlar."
        ]
      },
      {
        "heading": "Beylikleri ayırma tekniği",
        "body": "Artuklular Malabadi Köprüsü ve El-Cezeri; Saltuklular Erzurum çevresi; Mengücekler Divriği Ulu Camii ve Darüşşifası; Danişmentliler Anadolu’daki ilk medrese örnekleri; Karamanoğulları Türkçeyi resmi dil ilan etmeleri; Osmanoğulları ise kalıcı siyasi birlik kurmalarıyla ayırt edilir. Soru kökünde eser, şehir veya kişi verilirse doğrudan beylik eşleştirmesi yapılır.",
        "bullets": [
          "Artuklu = Malabadi, El-Cezeri.",
          "Mengücek = Divriği.",
          "Karamanoğlu = Türkçe resmi dil."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konuyu öğrenirken bir harita üzerinde şehir-beylik eşleştirmesi yap. Sonra savaşların sonuçlarını tek cümlelik kartlara dönüştür. En sonda “eser-kurum-beylik” testleri çöz. Anadolu Selçuklu sorularında yorum yapılabilse de doğru cevabı belirleyen genellikle tarihsel sonuç veya ayırt edici eserdir.",
        "bullets": [
          "Harita ile çalış.",
          "Savaş-sonuç kartları hazırla.",
          "Eser-beylik tablosu kullan."
        ]
      }
    ]
  },
  {
    "id": "osmanli-kurulus-yukselis",
    "slug": "osmanli-kurulus-ve-yukselis",
    "title": "Osmanlı Kuruluş ve Yükseliş",
    "era": "osmanli",
    "shortDescription": "Beylikten devlete geçiş, Rumeli politikası, iskan, merkezileşme, İstanbul’un fethi ve klasik düzenin kurulması.",
    "examImportance": 93,
    "estimatedMinutes": 90,
    "keywords": [
      "Kayı",
      "Bilecik",
      "Çimpe",
      "İskan",
      "Devşirme",
      "Kapıkulu",
      "İstanbul’un Fethi",
      "Fatih Kanunnamesi"
    ],
    "quickTimeline": [
      {
        "date": "1299",
        "event": "Osmanlı Beyliği’nin kuruluş süreci."
      },
      {
        "date": "1353",
        "event": "Çimpe Kalesi ile Rumeli’ye geçiş."
      },
      {
        "date": "1453",
        "event": "İstanbul’un fethi."
      },
      {
        "date": "1517",
        "event": "Mısır seferiyle hilafet ve kutsal emanetler meselesi."
      }
    ],
    "mustKnow": [
      "Osmanlı’nın kısa sürede büyümesinde Bizans’ın zayıflığı, uç beyliği konumu ve iskan politikası etkilidir.",
      "Çimpe Rumeli’ye geçişte üs niteliğindedir.",
      "İstanbul’un fethi Osmanlı’ya imparatorluk karakteri kazandırmıştır.",
      "Devşirme sistemi kapıkulu ordusu ve merkezî bürokrasiyle ilgilidir."
    ],
    "commonMistakes": [
      "Çimpe’yi başkent sanmak.",
      "İskanı yalnızca nüfus artırma politikası görmek.",
      "Devşirmeyi tımar sistemiyle karıştırmak."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Osmanlı Kuruluş ve Yükseliş konusu KPSS Tarih içinde yalnızca ezber bilgiyle değil; kavram, dönem, neden-sonuç ve belge/olay eşleştirmesiyle ölçülür. Bu başlıkta önce ana kronolojiyi kurmak, sonra ayırt edici kurum ve kavramları doğru döneme yerleştirmek gerekir. Soru köklerinde genellikle “hangisi doğrudur?”, “hangisi bu döneme aittir?”, “hangisi sonuçlarından biridir?” gibi ifadeler bulunur. Doğru cevap, çoğu zaman doğru bilginin doğru zaman ve doğru sonuçla eşleşmesidir.",
        "bullets": [
          "Kronoloji + kavram birlikte çalışılmalı.",
          "Soru kökünün dönem sınırı dikkatle okunmalı.",
          "Doğru bilgi yanlış dönemde verilirse çeldiricidir."
        ]
      },
      {
        "heading": "Derinlemesine sınav mantığı",
        "body": "Osmanlı Kuruluş ve Yükseliş sorularında çeldiriciler genellikle benzer belge, savaş, kurum veya ilkeyi birbirine karıştırır. Bu yüzden her bilgi “kim, ne zaman, ne amaçla, hangi sonuçla?” sorularıyla öğrenilmelidir. Özellikle KPSS’de kısa cümleli öncüller çok kullanıldığı için yalnızca tanım bilmek yetmez; tanımın hangi tarihsel bağlamda ortaya çıktığını da görmek gerekir. Bu çalışma yaklaşımı chatbot yanıtlarında da daha tutarlı açıklama sağlar.",
        "bullets": [
          "Kim? Ne zaman? Ne amaçla? Sonuç ne?",
          "Benzer kavramları karşılaştır.",
          "Öncülleri tek tek ele."
        ]
      },
      {
        "heading": "Sık karışan ayrımlar",
        "body": "Bu başlıkta en çok yapılan hata, olayların sonuçlarını birbirine aktarmaktır. Örneğin bir belge sınırlı bir alanda düzenleme yaparken başka bir belge rejim değişikliği doğurabilir; bir savaş cepheyi kapatırken başka bir savaş diplomatik tanınırlığı artırabilir. Çalışırken “birincil sonuç” ile “dolaylı sonuç” ayrımı kurulmalıdır. Soruda en doğrudan sonucu arayan ifadeler varsa geniş yorum değil, en yakın tarihsel sonuç seçilmelidir.",
        "bullets": [
          "Birincil sonuç ile dolaylı sonucu ayır.",
          "Belge ve savaşları sonuç tablosuyla öğren.",
          "Genel yorum yerine soru köküne en yakın sonucu seç."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konu için etkili yöntem üç aşamalıdır: önce 10 maddelik iskelet kronoloji çıkar, sonra her madde için tek cümlelik ayırt edici not yaz, en son açıklamalı soru çözerek yanlışlarını “neden yanlış?” şeklinde not al. Her tekrar seansında aynı konuyu yeniden okumak yerine, önce kendini test et; hatırlayamadığın kavramı kısa konu anlatımından geri çağır. Bu aktif hatırlama yöntemi uzun süreli kalıcılığı artırır.",
        "bullets": [
          "İskelet kronoloji çıkar.",
          "Ayırt edici tek cümle not tut.",
          "Önce test et, sonra konuya dön."
        ]
      }
    ]
  },
  {
    "id": "osmanli-kultur-medeniyet",
    "slug": "osmanli-kultur-ve-medeniyet",
    "title": "Osmanlı Kültür ve Medeniyet",
    "era": "osmanli",
    "shortDescription": "Merkez-taşra teşkilatı, Divan, seyfiye-ilmiye-kalemiye, tımar, vakıf, millet sistemi ve klasik toplum yapısı.",
    "examImportance": 96,
    "estimatedMinutes": 100,
    "keywords": [
      "Divan-ı Hümayun",
      "Sadrazam",
      "Şeyhülislam",
      "Defterdar",
      "Nişancı",
      "Tımar",
      "Vakıf",
      "Millet sistemi",
      "Enderun"
    ],
    "quickTimeline": [
      {
        "date": "Klasik dönem",
        "event": "Merkez ve taşra düzeni olgunlaştı."
      },
      {
        "date": "XVII. yy",
        "event": "Tımar ve merkezî kurumlarda bozulma belirtileri arttı."
      }
    ],
    "mustKnow": [
      "Divan-ı Hümayun merkez yönetimin danışma ve karar organıdır.",
      "Seyfiye yönetim ve askerlik, ilmiye eğitim-hukuk-din, kalemiye yazışma-maliye bürokrasisidir.",
      "Tımar dirlik gelirleriyle asker yetiştirme ve taşrada güvenliği sağlama düzenidir.",
      "Vakıflar sosyal hizmetleri finanse eder."
    ],
    "commonMistakes": [
      "Tımarı özel mülkiyet sanmak.",
      "İlmiye ve kalemiye görevlerini karıştırmak.",
      "Vakıfları doğrudan devlet hazinesi gibi düşünmek."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Osmanlı Kültür ve Medeniyet konusu KPSS Tarih içinde yalnızca ezber bilgiyle değil; kavram, dönem, neden-sonuç ve belge/olay eşleştirmesiyle ölçülür. Bu başlıkta önce ana kronolojiyi kurmak, sonra ayırt edici kurum ve kavramları doğru döneme yerleştirmek gerekir. Soru köklerinde genellikle “hangisi doğrudur?”, “hangisi bu döneme aittir?”, “hangisi sonuçlarından biridir?” gibi ifadeler bulunur. Doğru cevap, çoğu zaman doğru bilginin doğru zaman ve doğru sonuçla eşleşmesidir.",
        "bullets": [
          "Kronoloji + kavram birlikte çalışılmalı.",
          "Soru kökünün dönem sınırı dikkatle okunmalı.",
          "Doğru bilgi yanlış dönemde verilirse çeldiricidir."
        ]
      },
      {
        "heading": "Derinlemesine sınav mantığı",
        "body": "Osmanlı Kültür ve Medeniyet sorularında çeldiriciler genellikle benzer belge, savaş, kurum veya ilkeyi birbirine karıştırır. Bu yüzden her bilgi “kim, ne zaman, ne amaçla, hangi sonuçla?” sorularıyla öğrenilmelidir. Özellikle KPSS’de kısa cümleli öncüller çok kullanıldığı için yalnızca tanım bilmek yetmez; tanımın hangi tarihsel bağlamda ortaya çıktığını da görmek gerekir. Bu çalışma yaklaşımı chatbot yanıtlarında da daha tutarlı açıklama sağlar.",
        "bullets": [
          "Kim? Ne zaman? Ne amaçla? Sonuç ne?",
          "Benzer kavramları karşılaştır.",
          "Öncülleri tek tek ele."
        ]
      },
      {
        "heading": "Sık karışan ayrımlar",
        "body": "Bu başlıkta en çok yapılan hata, olayların sonuçlarını birbirine aktarmaktır. Örneğin bir belge sınırlı bir alanda düzenleme yaparken başka bir belge rejim değişikliği doğurabilir; bir savaş cepheyi kapatırken başka bir savaş diplomatik tanınırlığı artırabilir. Çalışırken “birincil sonuç” ile “dolaylı sonuç” ayrımı kurulmalıdır. Soruda en doğrudan sonucu arayan ifadeler varsa geniş yorum değil, en yakın tarihsel sonuç seçilmelidir.",
        "bullets": [
          "Birincil sonuç ile dolaylı sonucu ayır.",
          "Belge ve savaşları sonuç tablosuyla öğren.",
          "Genel yorum yerine soru köküne en yakın sonucu seç."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konu için etkili yöntem üç aşamalıdır: önce 10 maddelik iskelet kronoloji çıkar, sonra her madde için tek cümlelik ayırt edici not yaz, en son açıklamalı soru çözerek yanlışlarını “neden yanlış?” şeklinde not al. Her tekrar seansında aynı konuyu yeniden okumak yerine, önce kendini test et; hatırlayamadığın kavramı kısa konu anlatımından geri çağır. Bu aktif hatırlama yöntemi uzun süreli kalıcılığı artırır.",
        "bullets": [
          "İskelet kronoloji çıkar.",
          "Ayırt edici tek cümle not tut.",
          "Önce test et, sonra konuya dön."
        ]
      }
    ]
  },
  {
    "id": "osmanli-duraklama-gerileme",
    "slug": "osmanli-duraklama-gerileme",
    "title": "Osmanlı Duraklama ve Gerileme",
    "era": "osmanli",
    "shortDescription": "XVII ve XVIII. yüzyıl sorunları, ıslahat anlayışları, Karlofça, Pasarofça, Lale Devri ve askerî yenilikler.",
    "examImportance": 89,
    "estimatedMinutes": 95,
    "keywords": [
      "Karlofça",
      "Pasarofça",
      "Lale Devri",
      "Koçi Bey",
      "III. Selim",
      "Nizam-ı Cedid",
      "Askerî ıslahat"
    ],
    "quickTimeline": [
      {
        "date": "1699",
        "event": "Karlofça ile batıda ilk büyük toprak kaybı."
      },
      {
        "date": "1718",
        "event": "Pasarofça ve Lale Devri."
      },
      {
        "date": "1793",
        "event": "Nizam-ı Cedid düzenlemeleri."
      }
    ],
    "mustKnow": [
      "Karlofça Osmanlı’nın batıda ilk büyük toprak kaybıdır.",
      "Lale Devri’nde Batı tarzı yeniliklere ilgi artmıştır.",
      "XVII. yüzyıl ıslahatları çoğunlukla kişilere bağlı, baskıcı ve sınırlı kalmıştır.",
      "III. Selim’in Nizam-ı Cedid’i askeri ve mali yenilikleri içerir."
    ],
    "commonMistakes": [
      "Karlofça ile Pasarofça sonucunu karıştırmak.",
      "Lale Devri’ni tamamen askerî dönem sanmak.",
      "XVII. yüzyıl ıslahatlarını köklü anayasal hareket gibi görmek."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Osmanlı Duraklama ve Gerileme konusu KPSS Tarih içinde yalnızca ezber bilgiyle değil; kavram, dönem, neden-sonuç ve belge/olay eşleştirmesiyle ölçülür. Bu başlıkta önce ana kronolojiyi kurmak, sonra ayırt edici kurum ve kavramları doğru döneme yerleştirmek gerekir. Soru köklerinde genellikle “hangisi doğrudur?”, “hangisi bu döneme aittir?”, “hangisi sonuçlarından biridir?” gibi ifadeler bulunur. Doğru cevap, çoğu zaman doğru bilginin doğru zaman ve doğru sonuçla eşleşmesidir.",
        "bullets": [
          "Kronoloji + kavram birlikte çalışılmalı.",
          "Soru kökünün dönem sınırı dikkatle okunmalı.",
          "Doğru bilgi yanlış dönemde verilirse çeldiricidir."
        ]
      },
      {
        "heading": "Derinlemesine sınav mantığı",
        "body": "Osmanlı Duraklama ve Gerileme sorularında çeldiriciler genellikle benzer belge, savaş, kurum veya ilkeyi birbirine karıştırır. Bu yüzden her bilgi “kim, ne zaman, ne amaçla, hangi sonuçla?” sorularıyla öğrenilmelidir. Özellikle KPSS’de kısa cümleli öncüller çok kullanıldığı için yalnızca tanım bilmek yetmez; tanımın hangi tarihsel bağlamda ortaya çıktığını da görmek gerekir. Bu çalışma yaklaşımı chatbot yanıtlarında da daha tutarlı açıklama sağlar.",
        "bullets": [
          "Kim? Ne zaman? Ne amaçla? Sonuç ne?",
          "Benzer kavramları karşılaştır.",
          "Öncülleri tek tek ele."
        ]
      },
      {
        "heading": "Sık karışan ayrımlar",
        "body": "Bu başlıkta en çok yapılan hata, olayların sonuçlarını birbirine aktarmaktır. Örneğin bir belge sınırlı bir alanda düzenleme yaparken başka bir belge rejim değişikliği doğurabilir; bir savaş cepheyi kapatırken başka bir savaş diplomatik tanınırlığı artırabilir. Çalışırken “birincil sonuç” ile “dolaylı sonuç” ayrımı kurulmalıdır. Soruda en doğrudan sonucu arayan ifadeler varsa geniş yorum değil, en yakın tarihsel sonuç seçilmelidir.",
        "bullets": [
          "Birincil sonuç ile dolaylı sonucu ayır.",
          "Belge ve savaşları sonuç tablosuyla öğren.",
          "Genel yorum yerine soru köküne en yakın sonucu seç."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konu için etkili yöntem üç aşamalıdır: önce 10 maddelik iskelet kronoloji çıkar, sonra her madde için tek cümlelik ayırt edici not yaz, en son açıklamalı soru çözerek yanlışlarını “neden yanlış?” şeklinde not al. Her tekrar seansında aynı konuyu yeniden okumak yerine, önce kendini test et; hatırlayamadığın kavramı kısa konu anlatımından geri çağır. Bu aktif hatırlama yöntemi uzun süreli kalıcılığı artırır.",
        "bullets": [
          "İskelet kronoloji çıkar.",
          "Ayırt edici tek cümle not tut.",
          "Önce test et, sonra konuya dön."
        ]
      }
    ]
  },
  {
    "id": "osmanli-yenilesme",
    "slug": "osmanli-yenilesme",
    "title": "Osmanlı Yenileşme ve Demokratikleşme",
    "era": "yenilesme",
    "shortDescription": "Sened-i İttifak, Tanzimat, Islahat, Kanun-i Esasi, Meşrutiyetler ve anayasal dönüşüm.",
    "examImportance": 96,
    "estimatedMinutes": 100,
    "keywords": [
      "Sened-i İttifak",
      "Tanzimat",
      "Islahat",
      "Kanun-i Esasi",
      "I. Meşrutiyet",
      "II. Meşrutiyet",
      "Jön Türkler"
    ],
    "quickTimeline": [
      {
        "date": "1808",
        "event": "Sened-i İttifak."
      },
      {
        "date": "1839",
        "event": "Tanzimat Fermanı."
      },
      {
        "date": "1856",
        "event": "Islahat Fermanı."
      },
      {
        "date": "1876",
        "event": "Kanun-i Esasi ve I. Meşrutiyet."
      },
      {
        "date": "1908",
        "event": "II. Meşrutiyet."
      }
    ],
    "mustKnow": [
      "Sened-i İttifak padişah yetkilerini sınırlayan ilk belgedir.",
      "Tanzimat can, mal, namus güvenliği ve hukuki eşitlik vurgusuyla öne çıkar.",
      "Islahat gayrimüslim hakları ve Avrupa baskısı bağlamında sorulur.",
      "Kanun-i Esasi ilk Osmanlı anayasasıdır."
    ],
    "commonMistakes": [
      "Sened-i İttifak’ı Tanzimat’tan sonra sanmak.",
      "Islahat ile Kanun-i Esasi’yi karıştırmak.",
      "Meşrutiyeti cumhuriyet yönetimi sanmak."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Osmanlı Yenileşme ve Demokratikleşme konusu KPSS Tarih içinde yalnızca ezber bilgiyle değil; kavram, dönem, neden-sonuç ve belge/olay eşleştirmesiyle ölçülür. Bu başlıkta önce ana kronolojiyi kurmak, sonra ayırt edici kurum ve kavramları doğru döneme yerleştirmek gerekir. Soru köklerinde genellikle “hangisi doğrudur?”, “hangisi bu döneme aittir?”, “hangisi sonuçlarından biridir?” gibi ifadeler bulunur. Doğru cevap, çoğu zaman doğru bilginin doğru zaman ve doğru sonuçla eşleşmesidir.",
        "bullets": [
          "Kronoloji + kavram birlikte çalışılmalı.",
          "Soru kökünün dönem sınırı dikkatle okunmalı.",
          "Doğru bilgi yanlış dönemde verilirse çeldiricidir."
        ]
      },
      {
        "heading": "Derinlemesine sınav mantığı",
        "body": "Osmanlı Yenileşme ve Demokratikleşme sorularında çeldiriciler genellikle benzer belge, savaş, kurum veya ilkeyi birbirine karıştırır. Bu yüzden her bilgi “kim, ne zaman, ne amaçla, hangi sonuçla?” sorularıyla öğrenilmelidir. Özellikle KPSS’de kısa cümleli öncüller çok kullanıldığı için yalnızca tanım bilmek yetmez; tanımın hangi tarihsel bağlamda ortaya çıktığını da görmek gerekir. Bu çalışma yaklaşımı chatbot yanıtlarında da daha tutarlı açıklama sağlar.",
        "bullets": [
          "Kim? Ne zaman? Ne amaçla? Sonuç ne?",
          "Benzer kavramları karşılaştır.",
          "Öncülleri tek tek ele."
        ]
      },
      {
        "heading": "Sık karışan ayrımlar",
        "body": "Bu başlıkta en çok yapılan hata, olayların sonuçlarını birbirine aktarmaktır. Örneğin bir belge sınırlı bir alanda düzenleme yaparken başka bir belge rejim değişikliği doğurabilir; bir savaş cepheyi kapatırken başka bir savaş diplomatik tanınırlığı artırabilir. Çalışırken “birincil sonuç” ile “dolaylı sonuç” ayrımı kurulmalıdır. Soruda en doğrudan sonucu arayan ifadeler varsa geniş yorum değil, en yakın tarihsel sonuç seçilmelidir.",
        "bullets": [
          "Birincil sonuç ile dolaylı sonucu ayır.",
          "Belge ve savaşları sonuç tablosuyla öğren.",
          "Genel yorum yerine soru köküne en yakın sonucu seç."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konu için etkili yöntem üç aşamalıdır: önce 10 maddelik iskelet kronoloji çıkar, sonra her madde için tek cümlelik ayırt edici not yaz, en son açıklamalı soru çözerek yanlışlarını “neden yanlış?” şeklinde not al. Her tekrar seansında aynı konuyu yeniden okumak yerine, önce kendini test et; hatırlayamadığın kavramı kısa konu anlatımından geri çağır. Bu aktif hatırlama yöntemi uzun süreli kalıcılığı artırır.",
        "bullets": [
          "İskelet kronoloji çıkar.",
          "Ayırt edici tek cümle not tut.",
          "Önce test et, sonra konuya dön."
        ]
      }
    ]
  },
  {
    "id": "milli-mucadele-hazirlik",
    "slug": "milli-mucadele-hazirlik-donemi",
    "title": "Milli Mücadele Hazırlık Dönemi",
    "era": "milli-mucadele",
    "shortDescription": "Mondros, işgaller, cemiyetler, genelgeler, kongreler, Misak-ı Milli ve TBMM’nin açılması.",
    "examImportance": 98,
    "estimatedMinutes": 105,
    "keywords": [
      "Mondros",
      "Havza Genelgesi",
      "Amasya Genelgesi",
      "Erzurum Kongresi",
      "Sivas Kongresi",
      "Misak-ı Milli",
      "TBMM"
    ],
    "quickTimeline": [
      {
        "date": "1918",
        "event": "Mondros Ateşkes Antlaşması."
      },
      {
        "date": "19 Mayıs 1919",
        "event": "Mustafa Kemal Samsun’a çıktı."
      },
      {
        "date": "22 Haziran 1919",
        "event": "Amasya Genelgesi."
      },
      {
        "date": "23 Temmuz 1919",
        "event": "Erzurum Kongresi."
      },
      {
        "date": "4 Eylül 1919",
        "event": "Sivas Kongresi."
      },
      {
        "date": "23 Nisan 1920",
        "event": "TBMM açıldı."
      }
    ],
    "mustKnow": [
      "Amasya Genelgesi Milli Mücadele’nin gerekçe, amaç ve yöntemini açıklar.",
      "Erzurum Kongresi bölgesel toplanıp ulusal kararlar almıştır.",
      "Sivas Kongresi cemiyetleri Anadolu ve Rumeli Müdafaa-i Hukuk çatısında birleştirmiştir.",
      "Misak-ı Milli Son Osmanlı Mebusan Meclisi’nde kabul edilmiştir."
    ],
    "commonMistakes": [
      "Havza ile Amasya’nın rolünü karıştırmak.",
      "Erzurum’u tamamen ulusal toplanan kongre sanmak.",
      "Misak-ı Milli’yi TBMM kararı sanmak."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Milli Mücadele Hazırlık Dönemi konusu KPSS Tarih içinde yalnızca ezber bilgiyle değil; kavram, dönem, neden-sonuç ve belge/olay eşleştirmesiyle ölçülür. Bu başlıkta önce ana kronolojiyi kurmak, sonra ayırt edici kurum ve kavramları doğru döneme yerleştirmek gerekir. Soru köklerinde genellikle “hangisi doğrudur?”, “hangisi bu döneme aittir?”, “hangisi sonuçlarından biridir?” gibi ifadeler bulunur. Doğru cevap, çoğu zaman doğru bilginin doğru zaman ve doğru sonuçla eşleşmesidir.",
        "bullets": [
          "Kronoloji + kavram birlikte çalışılmalı.",
          "Soru kökünün dönem sınırı dikkatle okunmalı.",
          "Doğru bilgi yanlış dönemde verilirse çeldiricidir."
        ]
      },
      {
        "heading": "Derinlemesine sınav mantığı",
        "body": "Milli Mücadele Hazırlık Dönemi sorularında çeldiriciler genellikle benzer belge, savaş, kurum veya ilkeyi birbirine karıştırır. Bu yüzden her bilgi “kim, ne zaman, ne amaçla, hangi sonuçla?” sorularıyla öğrenilmelidir. Özellikle KPSS’de kısa cümleli öncüller çok kullanıldığı için yalnızca tanım bilmek yetmez; tanımın hangi tarihsel bağlamda ortaya çıktığını da görmek gerekir. Bu çalışma yaklaşımı chatbot yanıtlarında da daha tutarlı açıklama sağlar.",
        "bullets": [
          "Kim? Ne zaman? Ne amaçla? Sonuç ne?",
          "Benzer kavramları karşılaştır.",
          "Öncülleri tek tek ele."
        ]
      },
      {
        "heading": "Sık karışan ayrımlar",
        "body": "Bu başlıkta en çok yapılan hata, olayların sonuçlarını birbirine aktarmaktır. Örneğin bir belge sınırlı bir alanda düzenleme yaparken başka bir belge rejim değişikliği doğurabilir; bir savaş cepheyi kapatırken başka bir savaş diplomatik tanınırlığı artırabilir. Çalışırken “birincil sonuç” ile “dolaylı sonuç” ayrımı kurulmalıdır. Soruda en doğrudan sonucu arayan ifadeler varsa geniş yorum değil, en yakın tarihsel sonuç seçilmelidir.",
        "bullets": [
          "Birincil sonuç ile dolaylı sonucu ayır.",
          "Belge ve savaşları sonuç tablosuyla öğren.",
          "Genel yorum yerine soru köküne en yakın sonucu seç."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konu için etkili yöntem üç aşamalıdır: önce 10 maddelik iskelet kronoloji çıkar, sonra her madde için tek cümlelik ayırt edici not yaz, en son açıklamalı soru çözerek yanlışlarını “neden yanlış?” şeklinde not al. Her tekrar seansında aynı konuyu yeniden okumak yerine, önce kendini test et; hatırlayamadığın kavramı kısa konu anlatımından geri çağır. Bu aktif hatırlama yöntemi uzun süreli kalıcılığı artırır.",
        "bullets": [
          "İskelet kronoloji çıkar.",
          "Ayırt edici tek cümle not tut.",
          "Önce test et, sonra konuya dön."
        ]
      }
    ]
  },
  {
    "id": "kurtulus-savasi",
    "slug": "kurtulus-savasi-ve-antlasmalar",
    "title": "Kurtuluş Savaşı ve Antlaşmalar",
    "era": "milli-mucadele",
    "shortDescription": "Doğu, Güney ve Batı cepheleri; İnönü, Sakarya, Büyük Taarruz, Mudanya ve Lozan.",
    "examImportance": 98,
    "estimatedMinutes": 100,
    "keywords": [
      "Gümrü",
      "Ankara Antlaşması",
      "İnönü",
      "Sakarya",
      "Tekalif-i Milliye",
      "Büyük Taarruz",
      "Mudanya",
      "Lozan"
    ],
    "quickTimeline": [
      {
        "date": "1920",
        "event": "Gümrü Antlaşması."
      },
      {
        "date": "1921",
        "event": "I. ve II. İnönü; Sakarya."
      },
      {
        "date": "1922",
        "event": "Büyük Taarruz ve Mudanya."
      },
      {
        "date": "1923",
        "event": "Lozan Barış Antlaşması."
      }
    ],
    "mustKnow": [
      "Doğu Cephesi Gümrü Antlaşması ile kapanmıştır.",
      "Güney Cephesi Ankara Antlaşması ile büyük ölçüde kapanmıştır.",
      "Sakarya savunmadan taarruza geçişin dönüm noktasıdır.",
      "Mudanya ateşkes, Lozan barış antlaşmasıdır."
    ],
    "commonMistakes": [
      "Mudanya’yı barış antlaşması sanmak.",
      "Gümrü ve Kars antlaşmalarını karıştırmak.",
      "Sakarya ile Büyük Taarruz sonuçlarını karıştırmak."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Kurtuluş Savaşı ve Antlaşmalar konusu KPSS Tarih içinde yalnızca ezber bilgiyle değil; kavram, dönem, neden-sonuç ve belge/olay eşleştirmesiyle ölçülür. Bu başlıkta önce ana kronolojiyi kurmak, sonra ayırt edici kurum ve kavramları doğru döneme yerleştirmek gerekir. Soru köklerinde genellikle “hangisi doğrudur?”, “hangisi bu döneme aittir?”, “hangisi sonuçlarından biridir?” gibi ifadeler bulunur. Doğru cevap, çoğu zaman doğru bilginin doğru zaman ve doğru sonuçla eşleşmesidir.",
        "bullets": [
          "Kronoloji + kavram birlikte çalışılmalı.",
          "Soru kökünün dönem sınırı dikkatle okunmalı.",
          "Doğru bilgi yanlış dönemde verilirse çeldiricidir."
        ]
      },
      {
        "heading": "Derinlemesine sınav mantığı",
        "body": "Kurtuluş Savaşı ve Antlaşmalar sorularında çeldiriciler genellikle benzer belge, savaş, kurum veya ilkeyi birbirine karıştırır. Bu yüzden her bilgi “kim, ne zaman, ne amaçla, hangi sonuçla?” sorularıyla öğrenilmelidir. Özellikle KPSS’de kısa cümleli öncüller çok kullanıldığı için yalnızca tanım bilmek yetmez; tanımın hangi tarihsel bağlamda ortaya çıktığını da görmek gerekir. Bu çalışma yaklaşımı chatbot yanıtlarında da daha tutarlı açıklama sağlar.",
        "bullets": [
          "Kim? Ne zaman? Ne amaçla? Sonuç ne?",
          "Benzer kavramları karşılaştır.",
          "Öncülleri tek tek ele."
        ]
      },
      {
        "heading": "Sık karışan ayrımlar",
        "body": "Bu başlıkta en çok yapılan hata, olayların sonuçlarını birbirine aktarmaktır. Örneğin bir belge sınırlı bir alanda düzenleme yaparken başka bir belge rejim değişikliği doğurabilir; bir savaş cepheyi kapatırken başka bir savaş diplomatik tanınırlığı artırabilir. Çalışırken “birincil sonuç” ile “dolaylı sonuç” ayrımı kurulmalıdır. Soruda en doğrudan sonucu arayan ifadeler varsa geniş yorum değil, en yakın tarihsel sonuç seçilmelidir.",
        "bullets": [
          "Birincil sonuç ile dolaylı sonucu ayır.",
          "Belge ve savaşları sonuç tablosuyla öğren.",
          "Genel yorum yerine soru köküne en yakın sonucu seç."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konu için etkili yöntem üç aşamalıdır: önce 10 maddelik iskelet kronoloji çıkar, sonra her madde için tek cümlelik ayırt edici not yaz, en son açıklamalı soru çözerek yanlışlarını “neden yanlış?” şeklinde not al. Her tekrar seansında aynı konuyu yeniden okumak yerine, önce kendini test et; hatırlayamadığın kavramı kısa konu anlatımından geri çağır. Bu aktif hatırlama yöntemi uzun süreli kalıcılığı artırır.",
        "bullets": [
          "İskelet kronoloji çıkar.",
          "Ayırt edici tek cümle not tut.",
          "Önce test et, sonra konuya dön."
        ]
      }
    ]
  },
  {
    "id": "ataturk-ilke-inkilap",
    "slug": "ataturk-ilke-ve-inkilaplari",
    "title": "Atatürk İlke ve İnkılapları",
    "era": "cumhuriyet",
    "shortDescription": "Siyasi, hukuk, eğitim, ekonomi ve toplum alanındaki inkılaplar ile altı ilkenin yorumlanması.",
    "examImportance": 99,
    "estimatedMinutes": 110,
    "keywords": [
      "Cumhuriyetçilik",
      "Milliyetçilik",
      "Halkçılık",
      "Devletçilik",
      "Laiklik",
      "İnkılapçılık",
      "Tevhid-i Tedrisat",
      "Halifelik",
      "Medeni Kanun"
    ],
    "quickTimeline": [
      {
        "date": "1922",
        "event": "Saltanat kaldırıldı."
      },
      {
        "date": "1923",
        "event": "Cumhuriyet ilan edildi."
      },
      {
        "date": "1924",
        "event": "Halifelik kaldırıldı; Tevhid-i Tedrisat kabul edildi."
      },
      {
        "date": "1926",
        "event": "Türk Medeni Kanunu kabul edildi."
      },
      {
        "date": "1928",
        "event": "Harf İnkılabı."
      }
    ],
    "mustKnow": [
      "Cumhuriyetçilik milli egemenlik ve seçimle gelen yönetimle ilgilidir.",
      "Laiklik din ve devlet işlerinin ayrılması, hukuk ve eğitimde akılcı düzenle ilgilidir.",
      "Halkçılık ayrıcalıkların reddi ve kanun önünde eşitliktir.",
      "Devletçilik özel girişimi yok saymadan devletin kalkınmada düzenleyici rolünü vurgular."
    ],
    "commonMistakes": [
      "Devletçiliği sosyalizm sanmak.",
      "Halkçılık ile milliyetçiliği her soruda karıştırmak.",
      "Laikliği yalnızca din özgürlüğü olarak dar yorumlamak."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Atatürk İlke ve İnkılapları konusu KPSS Tarih içinde yalnızca ezber bilgiyle değil; kavram, dönem, neden-sonuç ve belge/olay eşleştirmesiyle ölçülür. Bu başlıkta önce ana kronolojiyi kurmak, sonra ayırt edici kurum ve kavramları doğru döneme yerleştirmek gerekir. Soru köklerinde genellikle “hangisi doğrudur?”, “hangisi bu döneme aittir?”, “hangisi sonuçlarından biridir?” gibi ifadeler bulunur. Doğru cevap, çoğu zaman doğru bilginin doğru zaman ve doğru sonuçla eşleşmesidir.",
        "bullets": [
          "Kronoloji + kavram birlikte çalışılmalı.",
          "Soru kökünün dönem sınırı dikkatle okunmalı.",
          "Doğru bilgi yanlış dönemde verilirse çeldiricidir."
        ]
      },
      {
        "heading": "Derinlemesine sınav mantığı",
        "body": "Atatürk İlke ve İnkılapları sorularında çeldiriciler genellikle benzer belge, savaş, kurum veya ilkeyi birbirine karıştırır. Bu yüzden her bilgi “kim, ne zaman, ne amaçla, hangi sonuçla?” sorularıyla öğrenilmelidir. Özellikle KPSS’de kısa cümleli öncüller çok kullanıldığı için yalnızca tanım bilmek yetmez; tanımın hangi tarihsel bağlamda ortaya çıktığını da görmek gerekir. Bu çalışma yaklaşımı chatbot yanıtlarında da daha tutarlı açıklama sağlar.",
        "bullets": [
          "Kim? Ne zaman? Ne amaçla? Sonuç ne?",
          "Benzer kavramları karşılaştır.",
          "Öncülleri tek tek ele."
        ]
      },
      {
        "heading": "Sık karışan ayrımlar",
        "body": "Bu başlıkta en çok yapılan hata, olayların sonuçlarını birbirine aktarmaktır. Örneğin bir belge sınırlı bir alanda düzenleme yaparken başka bir belge rejim değişikliği doğurabilir; bir savaş cepheyi kapatırken başka bir savaş diplomatik tanınırlığı artırabilir. Çalışırken “birincil sonuç” ile “dolaylı sonuç” ayrımı kurulmalıdır. Soruda en doğrudan sonucu arayan ifadeler varsa geniş yorum değil, en yakın tarihsel sonuç seçilmelidir.",
        "bullets": [
          "Birincil sonuç ile dolaylı sonucu ayır.",
          "Belge ve savaşları sonuç tablosuyla öğren.",
          "Genel yorum yerine soru köküne en yakın sonucu seç."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konu için etkili yöntem üç aşamalıdır: önce 10 maddelik iskelet kronoloji çıkar, sonra her madde için tek cümlelik ayırt edici not yaz, en son açıklamalı soru çözerek yanlışlarını “neden yanlış?” şeklinde not al. Her tekrar seansında aynı konuyu yeniden okumak yerine, önce kendini test et; hatırlayamadığın kavramı kısa konu anlatımından geri çağır. Bu aktif hatırlama yöntemi uzun süreli kalıcılığı artırır.",
        "bullets": [
          "İskelet kronoloji çıkar.",
          "Ayırt edici tek cümle not tut.",
          "Önce test et, sonra konuya dön."
        ]
      }
    ]
  },
  {
    "id": "cumhuriyet-dis-politika",
    "slug": "cumhuriyet-donemi-dis-politika",
    "title": "Cumhuriyet Dönemi Dış Politika",
    "era": "cumhuriyet",
    "shortDescription": "Lozan sonrası dış politika sorunları, Musul, Hatay, Montrö, Balkan ve Sadabat paktları.",
    "examImportance": 91,
    "estimatedMinutes": 85,
    "keywords": [
      "Lozan",
      "Musul",
      "Yabancı okullar",
      "Montrö",
      "Hatay",
      "Balkan Antantı",
      "Sadabat Paktı"
    ],
    "quickTimeline": [
      {
        "date": "1926",
        "event": "Musul sorunu Ankara Antlaşması ile çözüldü."
      },
      {
        "date": "1934",
        "event": "Balkan Antantı."
      },
      {
        "date": "1936",
        "event": "Montrö Boğazlar Sözleşmesi."
      },
      {
        "date": "1937",
        "event": "Sadabat Paktı."
      },
      {
        "date": "1939",
        "event": "Hatay Türkiye’ye katıldı."
      }
    ],
    "mustKnow": [
      "Montrö Boğazlar üzerindeki Türk egemenliğini güçlendirmiştir.",
      "Hatay sorunu Atatürk döneminde gündeme gelmiş, 1939’da Türkiye’ye katılmıştır.",
      "Musul sorunu İngiltere ile yaşanmış ve 1926 Ankara Antlaşması ile sonuçlanmıştır.",
      "Balkan Antantı batı sınırı güvenliği, Sadabat Paktı doğu sınırı güvenliği ile ilgilidir."
    ],
    "commonMistakes": [
      "Montrö’yü Lozan’ın yerine geçmiş genel barış antlaşması sanmak.",
      "Hatay’ın katılım tarihini Cumhuriyetin ilanıyla karıştırmak.",
      "Balkan Antantı ve Sadabat Paktı yönlerini karıştırmak."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Cumhuriyet Dönemi Dış Politika konusu KPSS Tarih içinde yalnızca ezber bilgiyle değil; kavram, dönem, neden-sonuç ve belge/olay eşleştirmesiyle ölçülür. Bu başlıkta önce ana kronolojiyi kurmak, sonra ayırt edici kurum ve kavramları doğru döneme yerleştirmek gerekir. Soru köklerinde genellikle “hangisi doğrudur?”, “hangisi bu döneme aittir?”, “hangisi sonuçlarından biridir?” gibi ifadeler bulunur. Doğru cevap, çoğu zaman doğru bilginin doğru zaman ve doğru sonuçla eşleşmesidir.",
        "bullets": [
          "Kronoloji + kavram birlikte çalışılmalı.",
          "Soru kökünün dönem sınırı dikkatle okunmalı.",
          "Doğru bilgi yanlış dönemde verilirse çeldiricidir."
        ]
      },
      {
        "heading": "Derinlemesine sınav mantığı",
        "body": "Cumhuriyet Dönemi Dış Politika sorularında çeldiriciler genellikle benzer belge, savaş, kurum veya ilkeyi birbirine karıştırır. Bu yüzden her bilgi “kim, ne zaman, ne amaçla, hangi sonuçla?” sorularıyla öğrenilmelidir. Özellikle KPSS’de kısa cümleli öncüller çok kullanıldığı için yalnızca tanım bilmek yetmez; tanımın hangi tarihsel bağlamda ortaya çıktığını da görmek gerekir. Bu çalışma yaklaşımı chatbot yanıtlarında da daha tutarlı açıklama sağlar.",
        "bullets": [
          "Kim? Ne zaman? Ne amaçla? Sonuç ne?",
          "Benzer kavramları karşılaştır.",
          "Öncülleri tek tek ele."
        ]
      },
      {
        "heading": "Sık karışan ayrımlar",
        "body": "Bu başlıkta en çok yapılan hata, olayların sonuçlarını birbirine aktarmaktır. Örneğin bir belge sınırlı bir alanda düzenleme yaparken başka bir belge rejim değişikliği doğurabilir; bir savaş cepheyi kapatırken başka bir savaş diplomatik tanınırlığı artırabilir. Çalışırken “birincil sonuç” ile “dolaylı sonuç” ayrımı kurulmalıdır. Soruda en doğrudan sonucu arayan ifadeler varsa geniş yorum değil, en yakın tarihsel sonuç seçilmelidir.",
        "bullets": [
          "Birincil sonuç ile dolaylı sonucu ayır.",
          "Belge ve savaşları sonuç tablosuyla öğren.",
          "Genel yorum yerine soru köküne en yakın sonucu seç."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konu için etkili yöntem üç aşamalıdır: önce 10 maddelik iskelet kronoloji çıkar, sonra her madde için tek cümlelik ayırt edici not yaz, en son açıklamalı soru çözerek yanlışlarını “neden yanlış?” şeklinde not al. Her tekrar seansında aynı konuyu yeniden okumak yerine, önce kendini test et; hatırlayamadığın kavramı kısa konu anlatımından geri çağır. Bu aktif hatırlama yöntemi uzun süreli kalıcılığı artırır.",
        "bullets": [
          "İskelet kronoloji çıkar.",
          "Ayırt edici tek cümle not tut.",
          "Önce test et, sonra konuya dön."
        ]
      }
    ]
  },
  {
    "id": "cagdas-turk-dunya",
    "slug": "cagdas-turk-ve-dunya-tarihi",
    "title": "Çağdaş Türk ve Dünya Tarihi",
    "era": "cagdas",
    "shortDescription": "XX. yüzyıl dünya düzeni, savaşlar, Soğuk Savaş, Türkiye’nin uluslararası örgütlerle ilişkileri ve bölgesel gelişmeler.",
    "examImportance": 86,
    "estimatedMinutes": 90,
    "keywords": [
      "I. Dünya Savaşı",
      "II. Dünya Savaşı",
      "Soğuk Savaş",
      "NATO",
      "BM",
      "Kıbrıs",
      "Küreselleşme"
    ],
    "quickTimeline": [
      {
        "date": "1914-1918",
        "event": "I. Dünya Savaşı."
      },
      {
        "date": "1939-1945",
        "event": "II. Dünya Savaşı."
      },
      {
        "date": "1945 sonrası",
        "event": "Soğuk Savaş iki kutuplu düzeni şekillendirdi."
      },
      {
        "date": "1952",
        "event": "Türkiye NATO’ya üye oldu."
      }
    ],
    "mustKnow": [
      "Soğuk Savaş ABD ve SSCB merkezli iki kutuplu düzeni ifade eder.",
      "Türkiye 1952’de NATO’ya üye olmuştur.",
      "Birleşmiş Milletler II. Dünya Savaşı sonrasında kurulmuştur.",
      "Kıbrıs meselesi Türkiye’nin yakın dönem dış politikasında belirleyicidir."
    ],
    "commonMistakes": [
      "NATO ve BM kuruluş amaçlarını karıştırmak.",
      "Soğuk Savaşı doğrudan sıcak savaş sanmak.",
      "Türkiye’nin NATO üyeliğini 1945 sanmak."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Çağdaş Türk ve Dünya Tarihi konusu KPSS Tarih içinde yalnızca ezber bilgiyle değil; kavram, dönem, neden-sonuç ve belge/olay eşleştirmesiyle ölçülür. Bu başlıkta önce ana kronolojiyi kurmak, sonra ayırt edici kurum ve kavramları doğru döneme yerleştirmek gerekir. Soru köklerinde genellikle “hangisi doğrudur?”, “hangisi bu döneme aittir?”, “hangisi sonuçlarından biridir?” gibi ifadeler bulunur. Doğru cevap, çoğu zaman doğru bilginin doğru zaman ve doğru sonuçla eşleşmesidir.",
        "bullets": [
          "Kronoloji + kavram birlikte çalışılmalı.",
          "Soru kökünün dönem sınırı dikkatle okunmalı.",
          "Doğru bilgi yanlış dönemde verilirse çeldiricidir."
        ]
      },
      {
        "heading": "Derinlemesine sınav mantığı",
        "body": "Çağdaş Türk ve Dünya Tarihi sorularında çeldiriciler genellikle benzer belge, savaş, kurum veya ilkeyi birbirine karıştırır. Bu yüzden her bilgi “kim, ne zaman, ne amaçla, hangi sonuçla?” sorularıyla öğrenilmelidir. Özellikle KPSS’de kısa cümleli öncüller çok kullanıldığı için yalnızca tanım bilmek yetmez; tanımın hangi tarihsel bağlamda ortaya çıktığını da görmek gerekir. Bu çalışma yaklaşımı chatbot yanıtlarında da daha tutarlı açıklama sağlar.",
        "bullets": [
          "Kim? Ne zaman? Ne amaçla? Sonuç ne?",
          "Benzer kavramları karşılaştır.",
          "Öncülleri tek tek ele."
        ]
      },
      {
        "heading": "Sık karışan ayrımlar",
        "body": "Bu başlıkta en çok yapılan hata, olayların sonuçlarını birbirine aktarmaktır. Örneğin bir belge sınırlı bir alanda düzenleme yaparken başka bir belge rejim değişikliği doğurabilir; bir savaş cepheyi kapatırken başka bir savaş diplomatik tanınırlığı artırabilir. Çalışırken “birincil sonuç” ile “dolaylı sonuç” ayrımı kurulmalıdır. Soruda en doğrudan sonucu arayan ifadeler varsa geniş yorum değil, en yakın tarihsel sonuç seçilmelidir.",
        "bullets": [
          "Birincil sonuç ile dolaylı sonucu ayır.",
          "Belge ve savaşları sonuç tablosuyla öğren.",
          "Genel yorum yerine soru köküne en yakın sonucu seç."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konu için etkili yöntem üç aşamalıdır: önce 10 maddelik iskelet kronoloji çıkar, sonra her madde için tek cümlelik ayırt edici not yaz, en son açıklamalı soru çözerek yanlışlarını “neden yanlış?” şeklinde not al. Her tekrar seansında aynı konuyu yeniden okumak yerine, önce kendini test et; hatırlayamadığın kavramı kısa konu anlatımından geri çağır. Bu aktif hatırlama yöntemi uzun süreli kalıcılığı artırır.",
        "bullets": [
          "İskelet kronoloji çıkar.",
          "Ayırt edici tek cümle not tut.",
          "Önce test et, sonra konuya dön."
        ]
      }
    ]
  },
  {
    "id": "tarih-metodu-kronoloji",
    "slug": "tarih-metodu-ve-kronoloji",
    "title": "Tarih Metodu ve Kronoloji Becerisi",
    "era": "cagdas",
    "shortDescription": "KPSS Tarih sorularında kronoloji, kavram okuma, neden-sonuç, belge-olay eşleştirme ve çeldirici ayıklama metodu.",
    "examImportance": 80,
    "estimatedMinutes": 60,
    "keywords": [
      "kronoloji",
      "neden-sonuç",
      "belge-olay",
      "soru kökü",
      "çeldirici",
      "öncül analizi"
    ],
    "quickTimeline": [
      {
        "date": "Çalışma yöntemi",
        "event": "Kavram, dönem ve sonuç üçlüsüyle analiz."
      }
    ],
    "mustKnow": [
      "Tarih sorularında doğru cevap çoğu zaman dönem-sonuç uyumuyla bulunur.",
      "Kronoloji sorularında yılları ezberlemek kadar olayların neden-sonuç sırası önemlidir.",
      "Öncül sorularında her öncülü ayrı doğru/yanlış olarak işaretlemek gerekir."
    ],
    "commonMistakes": [
      "Bütün doğru bilgileri doğru cevap sanmak; soru kökü dönem sınırı koyabilir.",
      "Kronolojide aynı yüzyıldaki olayların sırasını önemsememek.",
      "Belge ile sonucu karıştırmak."
    ],
    "summary": [
      {
        "heading": "Büyük resim",
        "body": "Tarih Metodu ve Kronoloji Becerisi konusu KPSS Tarih içinde yalnızca ezber bilgiyle değil; kavram, dönem, neden-sonuç ve belge/olay eşleştirmesiyle ölçülür. Bu başlıkta önce ana kronolojiyi kurmak, sonra ayırt edici kurum ve kavramları doğru döneme yerleştirmek gerekir. Soru köklerinde genellikle “hangisi doğrudur?”, “hangisi bu döneme aittir?”, “hangisi sonuçlarından biridir?” gibi ifadeler bulunur. Doğru cevap, çoğu zaman doğru bilginin doğru zaman ve doğru sonuçla eşleşmesidir.",
        "bullets": [
          "Kronoloji + kavram birlikte çalışılmalı.",
          "Soru kökünün dönem sınırı dikkatle okunmalı.",
          "Doğru bilgi yanlış dönemde verilirse çeldiricidir."
        ]
      },
      {
        "heading": "Derinlemesine sınav mantığı",
        "body": "Tarih Metodu ve Kronoloji Becerisi sorularında çeldiriciler genellikle benzer belge, savaş, kurum veya ilkeyi birbirine karıştırır. Bu yüzden her bilgi “kim, ne zaman, ne amaçla, hangi sonuçla?” sorularıyla öğrenilmelidir. Özellikle KPSS’de kısa cümleli öncüller çok kullanıldığı için yalnızca tanım bilmek yetmez; tanımın hangi tarihsel bağlamda ortaya çıktığını da görmek gerekir. Bu çalışma yaklaşımı chatbot yanıtlarında da daha tutarlı açıklama sağlar.",
        "bullets": [
          "Kim? Ne zaman? Ne amaçla? Sonuç ne?",
          "Benzer kavramları karşılaştır.",
          "Öncülleri tek tek ele."
        ]
      },
      {
        "heading": "Sık karışan ayrımlar",
        "body": "Bu başlıkta en çok yapılan hata, olayların sonuçlarını birbirine aktarmaktır. Örneğin bir belge sınırlı bir alanda düzenleme yaparken başka bir belge rejim değişikliği doğurabilir; bir savaş cepheyi kapatırken başka bir savaş diplomatik tanınırlığı artırabilir. Çalışırken “birincil sonuç” ile “dolaylı sonuç” ayrımı kurulmalıdır. Soruda en doğrudan sonucu arayan ifadeler varsa geniş yorum değil, en yakın tarihsel sonuç seçilmelidir.",
        "bullets": [
          "Birincil sonuç ile dolaylı sonucu ayır.",
          "Belge ve savaşları sonuç tablosuyla öğren.",
          "Genel yorum yerine soru köküne en yakın sonucu seç."
        ]
      },
      {
        "heading": "Çalışma metodu",
        "body": "Bu konu için etkili yöntem üç aşamalıdır: önce 10 maddelik iskelet kronoloji çıkar, sonra her madde için tek cümlelik ayırt edici not yaz, en son açıklamalı soru çözerek yanlışlarını “neden yanlış?” şeklinde not al. Her tekrar seansında aynı konuyu yeniden okumak yerine, önce kendini test et; hatırlayamadığın kavramı kısa konu anlatımından geri çağır. Bu aktif hatırlama yöntemi uzun süreli kalıcılığı artırır.",
        "bullets": [
          "İskelet kronoloji çıkar.",
          "Ayırt edici tek cümle not tut.",
          "Önce test et, sonra konuya dön."
        ]
      }
    ]
  }
];

export const questions: Question[] = [
  {
    "id": "q-001",
    "topicId": "islamiyet-oncesi",
    "type": "single",
    "difficulty": "temel",
    "stem": "Türk adını devlet adı olarak kullanan ilk Türk devleti hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Asya Hunları"
      },
      {
        "id": "B",
        "text": "Uygurlar"
      },
      {
        "id": "C",
        "text": "Avarlar"
      },
      {
        "id": "D",
        "text": "Hazarlar"
      },
      {
        "id": "E",
        "text": "Göktürkler"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Göktürkler, Türk adını devlet adı olarak kullanan ilk Türk siyasi teşkilatıdır.",
    "examTip": "Türk adı sorularında Göktürk vurgusu aranır.",
    "tags": [
      "islamiyet-oncesi",
      "temel"
    ]
  },
  {
    "id": "q-002",
    "topicId": "islamiyet-oncesi",
    "type": "single",
    "difficulty": "orta",
    "stem": "Bilinen ilk Türk devleti aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Uygurlar"
      },
      {
        "id": "B",
        "text": "Avrupa Hunları"
      },
      {
        "id": "C",
        "text": "Kırgızlar"
      },
      {
        "id": "D",
        "text": "Asya Hunları"
      },
      {
        "id": "E",
        "text": "Göktürkler"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Asya Hunları, bilinen ilk Türk devleti olarak kabul edilir.",
    "examTip": "İlk Türk devleti ile Türk adını kullanan ilk devlet karıştırılmamalıdır.",
    "tags": [
      "islamiyet-oncesi",
      "orta"
    ]
  },
  {
    "id": "q-003",
    "topicId": "islamiyet-oncesi",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Orhun Yazıtları hangi Türk devleti dönemine aittir?",
    "choices": [
      {
        "id": "A",
        "text": "Hazarlar"
      },
      {
        "id": "B",
        "text": "Karahanlılar"
      },
      {
        "id": "C",
        "text": "II. Göktürk Devleti"
      },
      {
        "id": "D",
        "text": "Uygurlar"
      },
      {
        "id": "E",
        "text": "Asya Hunları"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Orhun Yazıtları II. Göktürk döneminde Bilge Kağan, Kül Tigin ve Tonyukuk adına dikilmiştir.",
    "examTip": "Yazıtlar Göktürk dönemiyle ilişkilidir.",
    "tags": [
      "islamiyet-oncesi",
      "ileri"
    ]
  },
  {
    "id": "q-004",
    "topicId": "islamiyet-oncesi",
    "type": "single",
    "difficulty": "temel",
    "stem": "Yerleşik yaşama geçiş ve Maniheizm etkisiyle kültürel faaliyetleri öne çıkan Türk topluluğu hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Avrupa Hunları"
      },
      {
        "id": "B",
        "text": "Uygurlar"
      },
      {
        "id": "C",
        "text": "Avarlar"
      },
      {
        "id": "D",
        "text": "İskitler"
      },
      {
        "id": "E",
        "text": "Peçenekler"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Uygurlar yerleşik hayat, ticaret, hukuk belgeleri ve kültürel üretimle öne çıkar.",
    "examTip": "Yerleşik hayat sorularında Uygurlar güçlü ipucudur.",
    "tags": [
      "islamiyet-oncesi",
      "temel"
    ]
  },
  {
    "id": "q-005",
    "topicId": "islamiyet-oncesi",
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
        "text": "Toprakların özel mülkiyete açılması"
      },
      {
        "id": "C",
        "text": "Modern seçim sistemi"
      },
      {
        "id": "D",
        "text": "Yazılı anayasa"
      },
      {
        "id": "E",
        "text": "Deniz ticareti hukuku"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Kut, iktidarın ilahi kaynaklı meşruiyetini ifade eder.",
    "examTip": "Kut demokrasi veya anayasa değildir.",
    "tags": [
      "islamiyet-oncesi",
      "orta"
    ]
  },
  {
    "id": "q-006",
    "topicId": "islamiyet-oncesi",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Göçebe yaşamın sonuçlarından biri aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Büyük taş mimarinin yaygınlaşması"
      },
      {
        "id": "B",
        "text": "Uzun süreli hapishanelerin gelişmesi"
      },
      {
        "id": "C",
        "text": "Sınıflı toplumun kesinleşmesi"
      },
      {
        "id": "D",
        "text": "Deniz aşırı kolonilerin kurulması"
      },
      {
        "id": "E",
        "text": "Taşınabilir sanat eserlerinin gelişmesi"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Göçebe yaşam taşınabilir sanat eserlerini öne çıkarır; kalıcı mimari sınırlı kalır.",
    "examTip": "Yaşam tarzı ile sanat ve hukuk sonuçlarını bağla.",
    "tags": [
      "islamiyet-oncesi",
      "ileri"
    ]
  },
  {
    "id": "q-007",
    "topicId": "islamiyet-oncesi",
    "type": "single",
    "difficulty": "temel",
    "stem": "Kavimler Göçü’nün Avrupa’daki sonuçlarından biri hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Göktürklerin kurulması"
      },
      {
        "id": "B",
        "text": "Osmanlı Devleti’nin yıkılması"
      },
      {
        "id": "C",
        "text": "Karlofça Antlaşması’nın imzalanması"
      },
      {
        "id": "D",
        "text": "Feodalitenin güçlenmesi"
      },
      {
        "id": "E",
        "text": "İslamiyet’in doğması"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Kavimler Göçü Avrupa’nın siyasi ve sosyal yapısını değiştirerek feodaliteyi güçlendirmiştir.",
    "examTip": "Kavimler Göçü Avrupa Orta Çağ düzeniyle ilişkilidir.",
    "tags": [
      "islamiyet-oncesi",
      "temel"
    ]
  },
  {
    "id": "q-008",
    "topicId": "islamiyet-oncesi",
    "type": "single",
    "difficulty": "orta",
    "stem": "Mete Han ile özdeşleşen askeri düzen aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "İkta sistemi"
      },
      {
        "id": "B",
        "text": "Nizam-ı Cedid"
      },
      {
        "id": "C",
        "text": "Onlu sistem"
      },
      {
        "id": "D",
        "text": "Tımar sistemi"
      },
      {
        "id": "E",
        "text": "Devşirme sistemi"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Mete Han orduda onlu teşkilatlanmayı güçlendirmiştir.",
    "examTip": "Askeri teşkilat sorularında Mete Han-onlu sistem eşleşmesi yapılır.",
    "tags": [
      "islamiyet-oncesi",
      "orta"
    ]
  },
  {
    "id": "q-009",
    "topicId": "islamiyet-oncesi",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Türklerde yazısız hukuk kurallarına verilen ad hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Toy"
      },
      {
        "id": "B",
        "text": "Töre"
      },
      {
        "id": "C",
        "text": "Kut"
      },
      {
        "id": "D",
        "text": "Yuğ"
      },
      {
        "id": "E",
        "text": "Balbal"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Töre, toplum ve devlet düzenini belirleyen yazısız hukuk kurallarıdır.",
    "examTip": "Töre hukuk; kut meşruiyettir.",
    "tags": [
      "islamiyet-oncesi",
      "ileri"
    ]
  },
  {
    "id": "q-010",
    "topicId": "islamiyet-oncesi",
    "type": "single",
    "difficulty": "temel",
    "stem": "İlk Türk kadın hükümdar olarak bilinen Tomris hangi toplulukla ilişkilidir?",
    "choices": [
      {
        "id": "A",
        "text": "İskitler/Sakalar"
      },
      {
        "id": "B",
        "text": "Uygurlar"
      },
      {
        "id": "C",
        "text": "Hazarlar"
      },
      {
        "id": "D",
        "text": "Göktürkler"
      },
      {
        "id": "E",
        "text": "Avarlar"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Tomris, İskit/Saka geleneğinde öne çıkan kadın hükümdardır.",
    "examTip": "Tomris ve Alper Tunga İskit/Saka ipuçlarıdır.",
    "tags": [
      "islamiyet-oncesi",
      "temel"
    ]
  },
  {
    "id": "q-011",
    "topicId": "turk-islam",
    "type": "single",
    "difficulty": "temel",
    "stem": "İlk Müslüman Türk devleti hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Gazneliler"
      },
      {
        "id": "B",
        "text": "Büyük Selçuklular"
      },
      {
        "id": "C",
        "text": "Harzemşahlar"
      },
      {
        "id": "D",
        "text": "Eyyubiler"
      },
      {
        "id": "E",
        "text": "Karahanlılar"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Karahanlılar ilk Müslüman Türk devleti olarak kabul edilir.",
    "examTip": "İlk Müslüman Türk devleti sorusunda Karahanlılar aranır.",
    "tags": [
      "turk-islam",
      "temel"
    ]
  },
  {
    "id": "q-012",
    "topicId": "turk-islam",
    "type": "single",
    "difficulty": "orta",
    "stem": "“Put Kırıcı” unvanı hangi hükümdarla ilişkilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Melikşah"
      },
      {
        "id": "B",
        "text": "Satuk Buğra Han"
      },
      {
        "id": "C",
        "text": "Tuğrul Bey"
      },
      {
        "id": "D",
        "text": "Gazneli Mahmut"
      },
      {
        "id": "E",
        "text": "Alp Arslan"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Gazneli Mahmut Hindistan seferleri nedeniyle Put Kırıcı unvanıyla anılır.",
    "examTip": "Bu bilgi Artuklularla karıştırılmamalıdır.",
    "tags": [
      "turk-islam",
      "orta"
    ]
  },
  {
    "id": "q-013",
    "topicId": "turk-islam",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Dandanakan Savaşı’nın temel sonucu hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Haçlı Seferlerinin başlaması"
      },
      {
        "id": "B",
        "text": "Halifeliğin Osmanlı’ya geçmesi"
      },
      {
        "id": "C",
        "text": "Büyük Selçuklu Devleti’nin kuruluşunun kesinleşmesi"
      },
      {
        "id": "D",
        "text": "Anadolu’nun Türk yurdu olduğunun kesinleşmesi"
      },
      {
        "id": "E",
        "text": "Osmanlı’nın Rumeli’ye geçmesi"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "1040 Dandanakan, Selçukluların Gaznelilere karşı üstünlüğünü ve devletleşmesini kesinleştirmiştir.",
    "examTip": "Dandanakan ile Malazgirt sonuçlarını ayır.",
    "tags": [
      "turk-islam",
      "ileri"
    ]
  },
  {
    "id": "q-014",
    "topicId": "turk-islam",
    "type": "single",
    "difficulty": "temel",
    "stem": "Kutadgu Bilig’in yazarı kimdir?",
    "choices": [
      {
        "id": "A",
        "text": "Nizamülmülk"
      },
      {
        "id": "B",
        "text": "Yusuf Has Hacib"
      },
      {
        "id": "C",
        "text": "Kaşgarlı Mahmut"
      },
      {
        "id": "D",
        "text": "Edip Ahmet Yükneki"
      },
      {
        "id": "E",
        "text": "Ahmet Yesevi"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Kutadgu Bilig, Yusuf Has Hacib tarafından yazılmış siyasetname niteliğinde bir eserdir.",
    "examTip": "Eser-yazar eşleştirmesi sık sorulur.",
    "tags": [
      "turk-islam",
      "temel"
    ]
  },
  {
    "id": "q-015",
    "topicId": "turk-islam",
    "type": "single",
    "difficulty": "orta",
    "stem": "Divanü Lügati’t-Türk hangi amaçla yazılmıştır?",
    "choices": [
      {
        "id": "A",
        "text": "Türkçeyi ve Türk kültürünü Araplara tanıtmak"
      },
      {
        "id": "B",
        "text": "Osmanlı hukukunu düzenlemek"
      },
      {
        "id": "C",
        "text": "Tımar sistemini açıklamak"
      },
      {
        "id": "D",
        "text": "Medrese vakıflarını kaydetmek"
      },
      {
        "id": "E",
        "text": "Meşrutiyeti ilan etmek"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Kaşgarlı Mahmut eseriyle Türkçeyi Araplara öğretmeyi ve Türk kültürünü tanıtmayı amaçlamıştır.",
    "examTip": "Divanü Lügati’t-Türk dil-kültür eseridir.",
    "tags": [
      "turk-islam",
      "orta"
    ]
  },
  {
    "id": "q-016",
    "topicId": "turk-islam",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Nizamiye Medreseleri hangi devlet döneminde kurumsallaşmıştır?",
    "choices": [
      {
        "id": "A",
        "text": "Karahanlı"
      },
      {
        "id": "B",
        "text": "Gazneli"
      },
      {
        "id": "C",
        "text": "Uygur"
      },
      {
        "id": "D",
        "text": "Türkiye Selçuklu"
      },
      {
        "id": "E",
        "text": "Büyük Selçuklu"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Nizamiye Medreseleri Büyük Selçuklu veziri Nizamülmülk ile ilişkilidir.",
    "examTip": "Nizamiye = Büyük Selçuklu.",
    "tags": [
      "turk-islam",
      "ileri"
    ]
  },
  {
    "id": "q-017",
    "topicId": "turk-islam",
    "type": "single",
    "difficulty": "temel",
    "stem": "Talas Savaşı’nın kültürel sonuçlarından biri nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Anadolu Selçuklu’nun yıkılması"
      },
      {
        "id": "B",
        "text": "Cumhuriyetin ilanı"
      },
      {
        "id": "C",
        "text": "Karlofça’nın imzalanması"
      },
      {
        "id": "D",
        "text": "Türklerin İslam dünyasıyla yakınlaşması"
      },
      {
        "id": "E",
        "text": "Osmanlı’nın kurulması"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "751 Talas, Türk-Arap ilişkileri ve İslamiyet’e geçiş süreci bakımından önemlidir.",
    "examTip": "Talas savaşını kültürel sonuçlarıyla öğren.",
    "tags": [
      "turk-islam",
      "temel"
    ]
  },
  {
    "id": "q-018",
    "topicId": "turk-islam",
    "type": "single",
    "difficulty": "orta",
    "stem": "İkta sistemi en çok hangi alanlarla ilişkilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Matbaa tekniği"
      },
      {
        "id": "B",
        "text": "Sanayi devrimi"
      },
      {
        "id": "C",
        "text": "Mali ve askeri düzen"
      },
      {
        "id": "D",
        "text": "Deniz ticareti"
      },
      {
        "id": "E",
        "text": "Anayasal demokrasi"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "İkta, gelir kaynaklarının hizmet karşılığı tahsisi ve asker yetiştirme düzeniyle ilgilidir.",
    "examTip": "İkta ile tımar benzer mantıkta ama farklı dönemdir.",
    "tags": [
      "turk-islam",
      "orta"
    ]
  },
  {
    "id": "q-019",
    "topicId": "turk-islam",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Büyük Selçuklu Devleti’nin en parlak dönemi hangi hükümdar zamanıdır?",
    "choices": [
      {
        "id": "A",
        "text": "I. Murat"
      },
      {
        "id": "B",
        "text": "Melikşah"
      },
      {
        "id": "C",
        "text": "Gazneli Mahmut"
      },
      {
        "id": "D",
        "text": "Satuk Buğra Han"
      },
      {
        "id": "E",
        "text": "Osman Bey"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Melikşah dönemi Büyük Selçuklu Devleti’nin en parlak dönemidir.",
    "examTip": "Melikşah-Nizamülmülk ikilisini birlikte hatırla.",
    "tags": [
      "turk-islam",
      "ileri"
    ]
  },
  {
    "id": "q-020",
    "topicId": "turk-islam",
    "type": "single",
    "difficulty": "temel",
    "stem": "Atabetü’l-Hakayık hangi tür içeriğiyle öne çıkar?",
    "choices": [
      {
        "id": "A",
        "text": "Ahlaki öğütler"
      },
      {
        "id": "B",
        "text": "Askeri talimname"
      },
      {
        "id": "C",
        "text": "Denizcilik haritası"
      },
      {
        "id": "D",
        "text": "Anayasa metni"
      },
      {
        "id": "E",
        "text": "Diplomatik antlaşma"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Atabetü’l-Hakayık ahlaki ve didaktik öğütler içeren bir Türk-İslam eseridir.",
    "examTip": "Eserin amacını yazarla birlikte öğren.",
    "tags": [
      "turk-islam",
      "temel"
    ]
  },
  {
    "id": "q-021",
    "topicId": "anadolu-selcuklu",
    "type": "single",
    "difficulty": "temel",
    "stem": "Anadolu’nun Türk yurdu olduğunun kesinleştiği savaş hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Malazgirt"
      },
      {
        "id": "B",
        "text": "Kösedağ"
      },
      {
        "id": "C",
        "text": "Dandanakan"
      },
      {
        "id": "D",
        "text": "Pasinler"
      },
      {
        "id": "E",
        "text": "Miryokefalon"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "1176 Miryokefalon, Bizans’ın Anadolu’yu geri alma umudunu kırmıştır.",
    "examTip": "Malazgirt kapı açar, Miryokefalon kesinleştirir.",
    "tags": [
      "anadolu-selcuklu",
      "temel"
    ]
  },
  {
    "id": "q-022",
    "topicId": "anadolu-selcuklu",
    "type": "single",
    "difficulty": "orta",
    "stem": "Kösedağ Savaşı’nın sonucu aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "İstanbul’un fethi"
      },
      {
        "id": "B",
        "text": "Talas Savaşı’nın kazanılması"
      },
      {
        "id": "C",
        "text": "Halifeliğin kaldırılması"
      },
      {
        "id": "D",
        "text": "Anadolu Selçuklu Devleti’nin Moğol etkisine girmesi"
      },
      {
        "id": "E",
        "text": "Osmanlı’nın kurulması"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "1243 Kösedağ, Türkiye Selçuklularının Moğol baskısına girmesine ve beyliklerin güçlenmesine yol açmıştır.",
    "examTip": "Kösedağ = merkezi otorite zayıflaması.",
    "tags": [
      "anadolu-selcuklu",
      "orta"
    ]
  },
  {
    "id": "q-023",
    "topicId": "anadolu-selcuklu",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Kervansarayların temel işlevi nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Şer’i hukuk üretmek"
      },
      {
        "id": "B",
        "text": "Avrupa’ya elçi göndermek"
      },
      {
        "id": "C",
        "text": "Ticaret yollarında güvenlik ve konaklama sağlamak"
      },
      {
        "id": "D",
        "text": "Meşrutiyeti ilan etmek"
      },
      {
        "id": "E",
        "text": "Deniz donanması kurmak"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Kervansaraylar ticareti, yol güvenliğini ve konaklamayı desteklemiştir.",
    "examTip": "Kervansaray soruları ekonomi ve ticaretle ilgilidir.",
    "tags": [
      "anadolu-selcuklu",
      "ileri"
    ]
  },
  {
    "id": "q-024",
    "topicId": "anadolu-selcuklu",
    "type": "single",
    "difficulty": "temel",
    "stem": "Ahilik aşağıdakilerden hangisiyle en doğrudan ilgilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Hanedan evlilikleri"
      },
      {
        "id": "B",
        "text": "Esnaf dayanışması ve meslek ahlakı"
      },
      {
        "id": "C",
        "text": "Saltanat veraseti"
      },
      {
        "id": "D",
        "text": "Kapitülasyonlar"
      },
      {
        "id": "E",
        "text": "Denizcilik"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Ahilik şehir esnaf örgütlenmesi, meslek ahlakı ve sosyal dayanışma kurumudur.",
    "examTip": "Ahilik sadece dini yapı değildir.",
    "tags": [
      "anadolu-selcuklu",
      "temel"
    ]
  },
  {
    "id": "q-025",
    "topicId": "anadolu-selcuklu",
    "type": "single",
    "difficulty": "orta",
    "stem": "Malabadi Köprüsü ve El-Cezeri hangi beylikle ilişkilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Artuklular"
      },
      {
        "id": "B",
        "text": "Mengücekler"
      },
      {
        "id": "C",
        "text": "Saltuklular"
      },
      {
        "id": "D",
        "text": "Karamanoğulları"
      },
      {
        "id": "E",
        "text": "Danişmentliler"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Artuklular Mardin, Diyarbakır, Harput çevresi; Malabadi Köprüsü ve El-Cezeri ile anılır.",
    "examTip": "Artuklu ipuçları Malabadi ve El-Cezeri’dir.",
    "tags": [
      "anadolu-selcuklu",
      "orta"
    ]
  },
  {
    "id": "q-026",
    "topicId": "anadolu-selcuklu",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Divriği Ulu Camii ve Darüşşifası hangi beylikle ilişkilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Artuklular"
      },
      {
        "id": "B",
        "text": "Saltuklular"
      },
      {
        "id": "C",
        "text": "Osmanoğulları"
      },
      {
        "id": "D",
        "text": "Karamanoğulları"
      },
      {
        "id": "E",
        "text": "Mengücekler"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Divriği Ulu Camii ve Darüşşifası Mengücekli eseridir.",
    "examTip": "Divriği = Mengücek.",
    "tags": [
      "anadolu-selcuklu",
      "ileri"
    ]
  },
  {
    "id": "q-027",
    "topicId": "anadolu-selcuklu",
    "type": "single",
    "difficulty": "temel",
    "stem": "Türkçeyi resmi dil ilan etmeleriyle bilinen beylik hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Saltuklular"
      },
      {
        "id": "B",
        "text": "Danişmentliler"
      },
      {
        "id": "C",
        "text": "Aydınoğulları"
      },
      {
        "id": "D",
        "text": "Karamanoğulları"
      },
      {
        "id": "E",
        "text": "Artuklular"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Karamanoğulları Türkçeyi resmi dil ilan etmeleriyle ayırt edilir.",
    "examTip": "Türkçe resmi dil sorusu Karamanoğullarıdır.",
    "tags": [
      "anadolu-selcuklu",
      "temel"
    ]
  },
  {
    "id": "q-028",
    "topicId": "anadolu-selcuklu",
    "type": "single",
    "difficulty": "orta",
    "stem": "Türkiye Selçuklularında ticareti canlandıran uygulamalardan biri hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Takrir-i Sükun"
      },
      {
        "id": "B",
        "text": "Müsadere sisteminin kaldırılması"
      },
      {
        "id": "C",
        "text": "Tüccar mallarını güvence altına alan uygulamalar"
      },
      {
        "id": "D",
        "text": "Kapitülasyonların kaldırılması"
      },
      {
        "id": "E",
        "text": "Saltanatın kaldırılması"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Selçuklular ticareti teşvik etmek için yol güvenliği, kervansaray ve bazı güvence uygulamalarına önem verdi.",
    "examTip": "Ticaret sorusunda kervansaray ve güvenlik birlikte düşünülür.",
    "tags": [
      "anadolu-selcuklu",
      "orta"
    ]
  },
  {
    "id": "q-029",
    "topicId": "anadolu-selcuklu",
    "type": "single",
    "difficulty": "ileri",
    "stem": "I. Haçlı Seferi’nin Anadolu Selçukluları açısından sonuçlarından biri nedir?",
    "choices": [
      {
        "id": "A",
        "text": "NATO’ya girildi"
      },
      {
        "id": "B",
        "text": "Başkent İznik’ten Konya’ya taşındı"
      },
      {
        "id": "C",
        "text": "Lozan imzalandı"
      },
      {
        "id": "D",
        "text": "Halifelik kaldırıldı"
      },
      {
        "id": "E",
        "text": "Karlofça imzalandı"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "I. Haçlı Seferi sonrasında Türkiye Selçukluları başkentlerini Konya’ya taşımıştır.",
    "examTip": "Haçlı Seferleri Anadolu siyasi dengesini etkiler.",
    "tags": [
      "anadolu-selcuklu",
      "ileri"
    ]
  },
  {
    "id": "q-030",
    "topicId": "anadolu-selcuklu",
    "type": "single",
    "difficulty": "temel",
    "stem": "Pasinler Savaşı’nın önemi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Bizans ile Büyük Selçuklu arasındaki ilk önemli savaşlardan olması"
      },
      {
        "id": "B",
        "text": "Osmanlı’nın yıkılması"
      },
      {
        "id": "C",
        "text": "Kösedağ’ın kazanılması"
      },
      {
        "id": "D",
        "text": "Montrö’nün imzalanması"
      },
      {
        "id": "E",
        "text": "Tanzimat’ın ilanı"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Pasinler, Selçuklu-Bizans mücadelelerinin erken ve önemli örneklerindendir.",
    "examTip": "Pasinler, Malazgirt öncesi Bizans-Selçuklu ilişkisinde önemlidir.",
    "tags": [
      "anadolu-selcuklu",
      "temel"
    ]
  },
  {
    "id": "q-031",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "single",
    "difficulty": "temel",
    "stem": "Osmanlı Kuruluş ve Yükseliş konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "B",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "C",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "D",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "E",
        "text": "Osmanlı’nın kısa sürede büyümesinde Bizans’ın zayıflığı, uç beyliği konumu ve iskan politikası etkilidir."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Osmanlı’nın kısa sürede büyümesinde Bizans’ın zayıflığı, uç beyliği konumu ve iskan politikası etkilidir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "temel"
    ]
  },
  {
    "id": "q-032",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "single",
    "difficulty": "orta",
    "stem": "Osmanlı Kuruluş ve Yükseliş konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "B",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "C",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "D",
        "text": "Çimpe Rumeli’ye geçişte üs niteliğindedir."
      },
      {
        "id": "E",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Çimpe Rumeli’ye geçişte üs niteliğindedir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "orta"
    ]
  },
  {
    "id": "q-033",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Osmanlı Kuruluş ve Yükseliş konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "B",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "C",
        "text": "İstanbul’un fethi Osmanlı’ya imparatorluk karakteri kazandırmıştır."
      },
      {
        "id": "D",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "E",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "İstanbul’un fethi Osmanlı’ya imparatorluk karakteri kazandırmıştır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "ileri"
    ]
  },
  {
    "id": "q-034",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "single",
    "difficulty": "temel",
    "stem": "Osmanlı Kuruluş ve Yükseliş konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "B",
        "text": "Devşirme sistemi kapıkulu ordusu ve merkezî bürokrasiyle ilgilidir."
      },
      {
        "id": "C",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "D",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "E",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Devşirme sistemi kapıkulu ordusu ve merkezî bürokrasiyle ilgilidir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "temel"
    ]
  },
  {
    "id": "q-035",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "single",
    "difficulty": "orta",
    "stem": "Osmanlıların Rumeli’ye geçişinde üs olarak kullanılan yer neresidir?",
    "choices": [
      {
        "id": "A",
        "text": "Çimpe Kalesi"
      },
      {
        "id": "B",
        "text": "İznik"
      },
      {
        "id": "C",
        "text": "Konya"
      },
      {
        "id": "D",
        "text": "Kars"
      },
      {
        "id": "E",
        "text": "Ankara"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Çimpe Kalesi Rumeli’ye geçişte üs olarak kullanılmıştır.",
    "examTip": "Çimpe = Rumeli’ye geçiş.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "orta"
    ]
  },
  {
    "id": "q-036",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "single",
    "difficulty": "ileri",
    "stem": "İstanbul’un fethi hangi padişah döneminde gerçekleşmiştir?",
    "choices": [
      {
        "id": "A",
        "text": "I. Murat"
      },
      {
        "id": "B",
        "text": "Yıldırım Bayezid"
      },
      {
        "id": "C",
        "text": "Kanuni Sultan Süleyman"
      },
      {
        "id": "D",
        "text": "II. Abdülhamit"
      },
      {
        "id": "E",
        "text": "II. Mehmet / Fatih Sultan Mehmet"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "İstanbul 1453’te II. Mehmet tarafından fethedilmiştir.",
    "examTip": "1453 ve Fatih eşleştirmesini unutma.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "ileri"
    ]
  },
  {
    "id": "q-037",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "single",
    "difficulty": "temel",
    "stem": "Devşirme sistemi en çok hangi yapı ile ilişkilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Ayan meclisi"
      },
      {
        "id": "B",
        "text": "Köy imecesi"
      },
      {
        "id": "C",
        "text": "Kapitülasyonlar"
      },
      {
        "id": "D",
        "text": "Kapıkulu ordusu ve merkez teşkilatı"
      },
      {
        "id": "E",
        "text": "Tımar toprağının özel mülkiyeti"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Devşirme, kapıkulu askerleri ve merkezî bürokrasiyle bağlantılıdır.",
    "examTip": "Devşirme ile tımarı karıştırma.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "temel"
    ]
  },
  {
    "id": "q-038",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "single",
    "difficulty": "orta",
    "stem": "İskan politikasının temel amaçlarından biri nedir?",
    "choices": [
      {
        "id": "A",
        "text": "NATO’ya girmek"
      },
      {
        "id": "B",
        "text": "Montrö’yü imzalamak"
      },
      {
        "id": "C",
        "text": "Fetihleri kalıcı hale getirmek"
      },
      {
        "id": "D",
        "text": "Halifeliği kaldırmak"
      },
      {
        "id": "E",
        "text": "Anayasayı ilan etmek"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "İskan politikası fethedilen bölgelerin Türkleşmesi ve İslamlaşmasına katkı sağlayarak kalıcılık oluşturur.",
    "examTip": "İskan = kalıcılık ve güvenlik.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "orta"
    ]
  },
  {
    "id": "q-039",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "single",
    "difficulty": "temel",
    "stem": "Osmanlı Kültür ve Medeniyet konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "B",
        "text": "Divan-ı Hümayun merkez yönetimin danışma ve karar organıdır."
      },
      {
        "id": "C",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "D",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "E",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Divan-ı Hümayun merkez yönetimin danışma ve karar organıdır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "temel"
    ]
  },
  {
    "id": "q-040",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "single",
    "difficulty": "orta",
    "stem": "Osmanlı Kültür ve Medeniyet konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Seyfiye yönetim ve askerlik, ilmiye eğitim-hukuk-din, kalemiye yazışma-maliye bürokrasisidir."
      },
      {
        "id": "B",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "C",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "D",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "E",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Seyfiye yönetim ve askerlik, ilmiye eğitim-hukuk-din, kalemiye yazışma-maliye bürokrasisidir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "orta"
    ]
  },
  {
    "id": "q-041",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Osmanlı Kültür ve Medeniyet konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "B",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "C",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "D",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "E",
        "text": "Tımar dirlik gelirleriyle asker yetiştirme ve taşrada güvenliği sağlama düzenidir."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Tımar dirlik gelirleriyle asker yetiştirme ve taşrada güvenliği sağlama düzenidir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "ileri"
    ]
  },
  {
    "id": "q-042",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "single",
    "difficulty": "temel",
    "stem": "Osmanlı Kültür ve Medeniyet konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "B",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "C",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "D",
        "text": "Vakıflar sosyal hizmetleri finanse eder."
      },
      {
        "id": "E",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Vakıflar sosyal hizmetleri finanse eder.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "temel"
    ]
  },
  {
    "id": "q-043",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "single",
    "difficulty": "orta",
    "stem": "Osmanlı’da ilmiye sınıfı hangi alanlarla ilgilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Tımar sipahilerinin sefer emri"
      },
      {
        "id": "B",
        "text": "Kapitülasyon pazarlığı"
      },
      {
        "id": "C",
        "text": "Eğitim, hukuk ve din işleri"
      },
      {
        "id": "D",
        "text": "Deniz ticareti"
      },
      {
        "id": "E",
        "text": "Kapıkulu maaşı"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "İlmiye; medrese, kadılık, müftülük ve dinî-hukukî işler ile ilgilidir.",
    "examTip": "İlmiye = eğitim/hukuk/din.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "orta"
    ]
  },
  {
    "id": "q-044",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Tımar sisteminin amaçlarından biri nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Lozan’ı imzalamak"
      },
      {
        "id": "B",
        "text": "Taşrada asker yetiştirmek ve üretimi denetlemek"
      },
      {
        "id": "C",
        "text": "Halifeliği kaldırmak"
      },
      {
        "id": "D",
        "text": "Boğazların statüsünü belirlemek"
      },
      {
        "id": "E",
        "text": "Cumhuriyeti ilan etmek"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Tımar sistemi dirlik gelirleri karşılığında atlı asker yetiştirilmesini ve taşra düzenini sağlar.",
    "examTip": "Tımar = asker + taşra + üretim.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "ileri"
    ]
  },
  {
    "id": "q-045",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "single",
    "difficulty": "temel",
    "stem": "Osmanlı’da defterdar hangi alanla ilgilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Maliye"
      },
      {
        "id": "B",
        "text": "Adalet"
      },
      {
        "id": "C",
        "text": "Denizcilik"
      },
      {
        "id": "D",
        "text": "Dışişleri"
      },
      {
        "id": "E",
        "text": "Eğitim"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Defterdar maliye işlerinden sorumludur.",
    "examTip": "Defterdar = maliye.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "temel"
    ]
  },
  {
    "id": "q-046",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "single",
    "difficulty": "orta",
    "stem": "Vakıfların Osmanlı toplumundaki işlevi nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Saltanatı kaldırmak"
      },
      {
        "id": "B",
        "text": "Anayasa yapmak"
      },
      {
        "id": "C",
        "text": "Cephe komutanı atamak"
      },
      {
        "id": "D",
        "text": "Kapitülasyon vermek"
      },
      {
        "id": "E",
        "text": "Sosyal hizmetleri desteklemek"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Vakıflar eğitim, sağlık, imar ve sosyal yardım hizmetlerini desteklemiştir.",
    "examTip": "Vakıf = sosyal hizmet.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "orta"
    ]
  },
  {
    "id": "q-047",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "single",
    "difficulty": "temel",
    "stem": "Osmanlı Duraklama ve Gerileme konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "B",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "C",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "D",
        "text": "Karlofça Osmanlı’nın batıda ilk büyük toprak kaybıdır."
      },
      {
        "id": "E",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Karlofça Osmanlı’nın batıda ilk büyük toprak kaybıdır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "temel"
    ]
  },
  {
    "id": "q-048",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "single",
    "difficulty": "orta",
    "stem": "Osmanlı Duraklama ve Gerileme konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "B",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "C",
        "text": "Lale Devri’nde Batı tarzı yeniliklere ilgi artmıştır."
      },
      {
        "id": "D",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "E",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Lale Devri’nde Batı tarzı yeniliklere ilgi artmıştır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "orta"
    ]
  },
  {
    "id": "q-049",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Osmanlı Duraklama ve Gerileme konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "B",
        "text": "XVII. yüzyıl ıslahatları çoğunlukla kişilere bağlı, baskıcı ve sınırlı kalmıştır."
      },
      {
        "id": "C",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "D",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "E",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "XVII. yüzyıl ıslahatları çoğunlukla kişilere bağlı, baskıcı ve sınırlı kalmıştır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "ileri"
    ]
  },
  {
    "id": "q-050",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "single",
    "difficulty": "temel",
    "stem": "Osmanlı Duraklama ve Gerileme konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "III. Selim’in Nizam-ı Cedid’i askeri ve mali yenilikleri içerir."
      },
      {
        "id": "B",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "C",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "D",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "E",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "III. Selim’in Nizam-ı Cedid’i askeri ve mali yenilikleri içerir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "temel"
    ]
  },
  {
    "id": "q-051",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "single",
    "difficulty": "orta",
    "stem": "Osmanlı’nın batıda ilk büyük toprak kaybı hangi antlaşmayla olmuştur?",
    "choices": [
      {
        "id": "A",
        "text": "Pasarofça"
      },
      {
        "id": "B",
        "text": "Yaş"
      },
      {
        "id": "C",
        "text": "Küçük Kaynarca"
      },
      {
        "id": "D",
        "text": "Bucaş"
      },
      {
        "id": "E",
        "text": "Karlofça Antlaşması"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "1699 Karlofça Osmanlı’nın batıda ilk büyük toprak kaybıdır.",
    "examTip": "Karlofça = batıda büyük toprak kaybı.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "orta"
    ]
  },
  {
    "id": "q-052",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Lale Devri hangi antlaşmadan sonra başlamıştır?",
    "choices": [
      {
        "id": "A",
        "text": "Lozan"
      },
      {
        "id": "B",
        "text": "Mudanya"
      },
      {
        "id": "C",
        "text": "Gümrü"
      },
      {
        "id": "D",
        "text": "Pasarofça Antlaşması"
      },
      {
        "id": "E",
        "text": "Karlofça"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "1718 Pasarofça sonrası Lale Devri başlamıştır.",
    "examTip": "Pasarofça-Lale Devri eşleşir.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "ileri"
    ]
  },
  {
    "id": "q-053",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "single",
    "difficulty": "temel",
    "stem": "Nizam-ı Cedid hangi padişah döneminin yeniliklerindendir?",
    "choices": [
      {
        "id": "A",
        "text": "Fatih"
      },
      {
        "id": "B",
        "text": "Kanuni"
      },
      {
        "id": "C",
        "text": "III. Selim"
      },
      {
        "id": "D",
        "text": "II. Mahmut"
      },
      {
        "id": "E",
        "text": "Abdülmecit"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Nizam-ı Cedid III. Selim döneminin askerî ve mali yenilikleriyle ilişkilidir.",
    "examTip": "Nizam-ı Cedid = III. Selim.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "temel"
    ]
  },
  {
    "id": "q-054",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "single",
    "difficulty": "orta",
    "stem": "XVII. yüzyıl ıslahatlarının genel özelliği nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Tamamen demokratikleşme sağlamaları"
      },
      {
        "id": "B",
        "text": "Kişilere bağlı ve sınırlı kalmaları"
      },
      {
        "id": "C",
        "text": "Halk egemenliğine dayalı olmaları"
      },
      {
        "id": "D",
        "text": "Sanayi devrimiyle başlamaları"
      },
      {
        "id": "E",
        "text": "Cumhuriyet ilanıyla bitmeleri"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "XVII. yüzyıl ıslahatları çoğu zaman kişilere bağlı, baskıcı ve yüzeysel kalmıştır.",
    "examTip": "Dönem ıslahatlarının niteliğini ayır.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "orta"
    ]
  },
  {
    "id": "q-055",
    "topicId": "osmanli-yenilesme",
    "type": "single",
    "difficulty": "temel",
    "stem": "Osmanlı Yenileşme ve Demokratikleşme konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Sened-i İttifak padişah yetkilerini sınırlayan ilk belgedir."
      },
      {
        "id": "B",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "C",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "D",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "E",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Sened-i İttifak padişah yetkilerini sınırlayan ilk belgedir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-yenilesme",
      "temel"
    ]
  },
  {
    "id": "q-056",
    "topicId": "osmanli-yenilesme",
    "type": "single",
    "difficulty": "orta",
    "stem": "Osmanlı Yenileşme ve Demokratikleşme konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "B",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "C",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "D",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "E",
        "text": "Tanzimat can, mal, namus güvenliği ve hukuki eşitlik vurgusuyla öne çıkar."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Tanzimat can, mal, namus güvenliği ve hukuki eşitlik vurgusuyla öne çıkar.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-yenilesme",
      "orta"
    ]
  },
  {
    "id": "q-057",
    "topicId": "osmanli-yenilesme",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Osmanlı Yenileşme ve Demokratikleşme konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "B",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "C",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "D",
        "text": "Islahat gayrimüslim hakları ve Avrupa baskısı bağlamında sorulur."
      },
      {
        "id": "E",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Islahat gayrimüslim hakları ve Avrupa baskısı bağlamında sorulur.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-yenilesme",
      "ileri"
    ]
  },
  {
    "id": "q-058",
    "topicId": "osmanli-yenilesme",
    "type": "single",
    "difficulty": "temel",
    "stem": "Osmanlı Yenileşme ve Demokratikleşme konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "B",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "C",
        "text": "Kanun-i Esasi ilk Osmanlı anayasasıdır."
      },
      {
        "id": "D",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "E",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Kanun-i Esasi ilk Osmanlı anayasasıdır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "osmanli-yenilesme",
      "temel"
    ]
  },
  {
    "id": "q-059",
    "topicId": "osmanli-yenilesme",
    "type": "single",
    "difficulty": "orta",
    "stem": "Padişah yetkilerini sınırlayan ilk belge olarak kabul edilen gelişme hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Halifeliğin kaldırılması"
      },
      {
        "id": "B",
        "text": "Sened-i İttifak"
      },
      {
        "id": "C",
        "text": "Tanzimat Fermanı"
      },
      {
        "id": "D",
        "text": "Islahat Fermanı"
      },
      {
        "id": "E",
        "text": "Kanun-i Esasi"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "1808 Sened-i İttifak padişahın yetkilerini sınırlayan ilk belge kabul edilir.",
    "examTip": "Sened-i İttifak kronolojide Tanzimat’tan önce gelir.",
    "tags": [
      "osmanli-yenilesme",
      "orta"
    ]
  },
  {
    "id": "q-060",
    "topicId": "osmanli-yenilesme",
    "type": "single",
    "difficulty": "ileri",
    "stem": "İlk Osmanlı anayasası hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kanun-i Esasi"
      },
      {
        "id": "B",
        "text": "Tanzimat Fermanı"
      },
      {
        "id": "C",
        "text": "Sened-i İttifak"
      },
      {
        "id": "D",
        "text": "Islahat Fermanı"
      },
      {
        "id": "E",
        "text": "Takrir-i Sükun"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "1876 Kanun-i Esasi ilk Osmanlı anayasasıdır.",
    "examTip": "Anayasa sorusunda Kanun-i Esasi.",
    "tags": [
      "osmanli-yenilesme",
      "ileri"
    ]
  },
  {
    "id": "q-061",
    "topicId": "osmanli-yenilesme",
    "type": "single",
    "difficulty": "temel",
    "stem": "Tanzimat Fermanı hangi yıl ilan edilmiştir?",
    "choices": [
      {
        "id": "A",
        "text": "1808"
      },
      {
        "id": "B",
        "text": "1856"
      },
      {
        "id": "C",
        "text": "1876"
      },
      {
        "id": "D",
        "text": "1908"
      },
      {
        "id": "E",
        "text": "1839"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Tanzimat Fermanı 1839’da ilan edilmiştir.",
    "examTip": "Tanzimat 1839, Islahat 1856, Kanun-i Esasi 1876.",
    "tags": [
      "osmanli-yenilesme",
      "temel"
    ]
  },
  {
    "id": "q-062",
    "topicId": "osmanli-yenilesme",
    "type": "single",
    "difficulty": "orta",
    "stem": "II. Meşrutiyet hangi yıl ilan edilmiştir?",
    "choices": [
      {
        "id": "A",
        "text": "1839"
      },
      {
        "id": "B",
        "text": "1923"
      },
      {
        "id": "C",
        "text": "1699"
      },
      {
        "id": "D",
        "text": "1908"
      },
      {
        "id": "E",
        "text": "1876"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "II. Meşrutiyet 1908’de ilan edilmiştir.",
    "examTip": "Meşrutiyet yıllarını karıştırma: I. 1876, II. 1908.",
    "tags": [
      "osmanli-yenilesme",
      "orta"
    ]
  },
  {
    "id": "q-063",
    "topicId": "milli-mucadele-hazirlik",
    "type": "single",
    "difficulty": "temel",
    "stem": "Milli Mücadele Hazırlık Dönemi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "B",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "C",
        "text": "Amasya Genelgesi Milli Mücadele’nin gerekçe, amaç ve yöntemini açıklar."
      },
      {
        "id": "D",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "E",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Amasya Genelgesi Milli Mücadele’nin gerekçe, amaç ve yöntemini açıklar.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "milli-mucadele-hazirlik",
      "temel"
    ]
  },
  {
    "id": "q-064",
    "topicId": "milli-mucadele-hazirlik",
    "type": "single",
    "difficulty": "orta",
    "stem": "Milli Mücadele Hazırlık Dönemi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "B",
        "text": "Erzurum Kongresi bölgesel toplanıp ulusal kararlar almıştır."
      },
      {
        "id": "C",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "D",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "E",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Erzurum Kongresi bölgesel toplanıp ulusal kararlar almıştır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "milli-mucadele-hazirlik",
      "orta"
    ]
  },
  {
    "id": "q-065",
    "topicId": "milli-mucadele-hazirlik",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Milli Mücadele Hazırlık Dönemi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Sivas Kongresi cemiyetleri Anadolu ve Rumeli Müdafaa-i Hukuk çatısında birleştirmiştir."
      },
      {
        "id": "B",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "C",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "D",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "E",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Sivas Kongresi cemiyetleri Anadolu ve Rumeli Müdafaa-i Hukuk çatısında birleştirmiştir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "milli-mucadele-hazirlik",
      "ileri"
    ]
  },
  {
    "id": "q-066",
    "topicId": "milli-mucadele-hazirlik",
    "type": "single",
    "difficulty": "temel",
    "stem": "Milli Mücadele Hazırlık Dönemi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "B",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "C",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "D",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "E",
        "text": "Misak-ı Milli Son Osmanlı Mebusan Meclisi’nde kabul edilmiştir."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Misak-ı Milli Son Osmanlı Mebusan Meclisi’nde kabul edilmiştir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "milli-mucadele-hazirlik",
      "temel"
    ]
  },
  {
    "id": "q-067",
    "topicId": "milli-mucadele-hazirlik",
    "type": "single",
    "difficulty": "orta",
    "stem": "Milli Mücadele’nin gerekçe, amaç ve yöntemini açıklayan belge hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Misak-ı Milli"
      },
      {
        "id": "B",
        "text": "Lozan Antlaşması"
      },
      {
        "id": "C",
        "text": "Tevhid-i Tedrisat"
      },
      {
        "id": "D",
        "text": "Amasya Genelgesi"
      },
      {
        "id": "E",
        "text": "Havza Genelgesi"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Amasya Genelgesi, Milli Mücadele’nin gerekçe, amaç ve yöntemini ortaya koyar.",
    "examTip": "Amasya = gerekçe, amaç, yöntem.",
    "tags": [
      "milli-mucadele-hazirlik",
      "orta"
    ]
  },
  {
    "id": "q-068",
    "topicId": "milli-mucadele-hazirlik",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Cemiyetlerin tek çatı altında birleştirildiği kongre hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Balıkesir Kongresi"
      },
      {
        "id": "B",
        "text": "Londra Konferansı"
      },
      {
        "id": "C",
        "text": "Sivas Kongresi"
      },
      {
        "id": "D",
        "text": "Erzurum Kongresi"
      },
      {
        "id": "E",
        "text": "Alaşehir Kongresi"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Sivas Kongresi’nde cemiyetler Anadolu ve Rumeli Müdafaa-i Hukuk adı altında birleştirilmiştir.",
    "examTip": "Birleştirme = Sivas.",
    "tags": [
      "milli-mucadele-hazirlik",
      "ileri"
    ]
  },
  {
    "id": "q-069",
    "topicId": "milli-mucadele-hazirlik",
    "type": "single",
    "difficulty": "temel",
    "stem": "Misak-ı Milli nerede kabul edilmiştir?",
    "choices": [
      {
        "id": "A",
        "text": "Amasya Görüşmeleri"
      },
      {
        "id": "B",
        "text": "Son Osmanlı Mebusan Meclisi"
      },
      {
        "id": "C",
        "text": "TBMM"
      },
      {
        "id": "D",
        "text": "Sivas Kongresi"
      },
      {
        "id": "E",
        "text": "Erzurum Kongresi"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Misak-ı Milli Son Osmanlı Mebusan Meclisi’nde kabul edilmiştir.",
    "examTip": "Misak-ı Milli TBMM kararı değildir.",
    "tags": [
      "milli-mucadele-hazirlik",
      "temel"
    ]
  },
  {
    "id": "q-070",
    "topicId": "milli-mucadele-hazirlik",
    "type": "single",
    "difficulty": "orta",
    "stem": "TBMM hangi tarihte açılmıştır?",
    "choices": [
      {
        "id": "A",
        "text": "23 Nisan 1920"
      },
      {
        "id": "B",
        "text": "19 Mayıs 1919"
      },
      {
        "id": "C",
        "text": "29 Ekim 1923"
      },
      {
        "id": "D",
        "text": "24 Temmuz 1923"
      },
      {
        "id": "E",
        "text": "30 Ağustos 1922"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "TBMM 23 Nisan 1920’de açılmıştır.",
    "examTip": "TBMM tarihi temel kronoloji bilgisidir.",
    "tags": [
      "milli-mucadele-hazirlik",
      "orta"
    ]
  },
  {
    "id": "q-071",
    "topicId": "kurtulus-savasi",
    "type": "single",
    "difficulty": "temel",
    "stem": "Kurtuluş Savaşı ve Antlaşmalar konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "B",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "C",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "D",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "E",
        "text": "Doğu Cephesi Gümrü Antlaşması ile kapanmıştır."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Doğu Cephesi Gümrü Antlaşması ile kapanmıştır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "kurtulus-savasi",
      "temel"
    ]
  },
  {
    "id": "q-072",
    "topicId": "kurtulus-savasi",
    "type": "single",
    "difficulty": "orta",
    "stem": "Kurtuluş Savaşı ve Antlaşmalar konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "B",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "C",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "D",
        "text": "Güney Cephesi Ankara Antlaşması ile büyük ölçüde kapanmıştır."
      },
      {
        "id": "E",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Güney Cephesi Ankara Antlaşması ile büyük ölçüde kapanmıştır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "kurtulus-savasi",
      "orta"
    ]
  },
  {
    "id": "q-073",
    "topicId": "kurtulus-savasi",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Kurtuluş Savaşı ve Antlaşmalar konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "B",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "C",
        "text": "Sakarya savunmadan taarruza geçişin dönüm noktasıdır."
      },
      {
        "id": "D",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "E",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Sakarya savunmadan taarruza geçişin dönüm noktasıdır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "kurtulus-savasi",
      "ileri"
    ]
  },
  {
    "id": "q-074",
    "topicId": "kurtulus-savasi",
    "type": "single",
    "difficulty": "temel",
    "stem": "Kurtuluş Savaşı ve Antlaşmalar konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "B",
        "text": "Mudanya ateşkes, Lozan barış antlaşmasıdır."
      },
      {
        "id": "C",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "D",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "E",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Mudanya ateşkes, Lozan barış antlaşmasıdır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "kurtulus-savasi",
      "temel"
    ]
  },
  {
    "id": "q-075",
    "topicId": "kurtulus-savasi",
    "type": "single",
    "difficulty": "orta",
    "stem": "Doğu Cephesi hangi antlaşmayla kapanmıştır?",
    "choices": [
      {
        "id": "A",
        "text": "Gümrü Antlaşması"
      },
      {
        "id": "B",
        "text": "Ankara Antlaşması"
      },
      {
        "id": "C",
        "text": "Mudanya Ateşkesi"
      },
      {
        "id": "D",
        "text": "Lozan Antlaşması"
      },
      {
        "id": "E",
        "text": "Karlofça Antlaşması"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Doğu Cephesi Ermenistan ile yapılan Gümrü Antlaşması ile kapanmıştır.",
    "examTip": "Doğu = Gümrü.",
    "tags": [
      "kurtulus-savasi",
      "orta"
    ]
  },
  {
    "id": "q-076",
    "topicId": "kurtulus-savasi",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Güney Cephesi hangi antlaşmayla büyük ölçüde kapanmıştır?",
    "choices": [
      {
        "id": "A",
        "text": "Gümrü"
      },
      {
        "id": "B",
        "text": "Lozan"
      },
      {
        "id": "C",
        "text": "Mudanya"
      },
      {
        "id": "D",
        "text": "Montrö"
      },
      {
        "id": "E",
        "text": "Ankara Antlaşması"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "1921 Ankara Antlaşması ile Fransa ile anlaşma sağlanmış ve Güney Cephesi büyük ölçüde kapanmıştır.",
    "examTip": "Güney = Ankara Antlaşması.",
    "tags": [
      "kurtulus-savasi",
      "ileri"
    ]
  },
  {
    "id": "q-077",
    "topicId": "kurtulus-savasi",
    "type": "single",
    "difficulty": "temel",
    "stem": "Mudanya’nın niteliği nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Anayasa"
      },
      {
        "id": "B",
        "text": "Kongre kararı"
      },
      {
        "id": "C",
        "text": "İnkılap kanunu"
      },
      {
        "id": "D",
        "text": "Ateşkes antlaşması"
      },
      {
        "id": "E",
        "text": "Barış antlaşması"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Mudanya bir ateşkes antlaşmasıdır; Lozan ise barış antlaşmasıdır.",
    "examTip": "Mudanya-Lozan ayrımını net tut.",
    "tags": [
      "kurtulus-savasi",
      "temel"
    ]
  },
  {
    "id": "q-078",
    "topicId": "kurtulus-savasi",
    "type": "single",
    "difficulty": "orta",
    "stem": "Sakarya Savaşı’nın önemi nedir?",
    "choices": [
      {
        "id": "A",
        "text": "NATO’ya giriş"
      },
      {
        "id": "B",
        "text": "Karlofça’nın imzalanması"
      },
      {
        "id": "C",
        "text": "Savunmadan taarruza geçişin dönüm noktası olması"
      },
      {
        "id": "D",
        "text": "İstanbul’un fethi"
      },
      {
        "id": "E",
        "text": "Halifeliğin kaldırılması"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Sakarya zaferi Türk ordusunun savunmadan taarruza geçiş sürecinde dönüm noktasıdır.",
    "examTip": "Sakarya sonrası üstünlük psikolojisi değişir.",
    "tags": [
      "kurtulus-savasi",
      "orta"
    ]
  },
  {
    "id": "q-079",
    "topicId": "ataturk-ilke-inkilap",
    "type": "single",
    "difficulty": "temel",
    "stem": "Atatürk İlke ve İnkılapları konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "B",
        "text": "Cumhuriyetçilik milli egemenlik ve seçimle gelen yönetimle ilgilidir."
      },
      {
        "id": "C",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "D",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "E",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Cumhuriyetçilik milli egemenlik ve seçimle gelen yönetimle ilgilidir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "ataturk-ilke-inkilap",
      "temel"
    ]
  },
  {
    "id": "q-080",
    "topicId": "ataturk-ilke-inkilap",
    "type": "single",
    "difficulty": "orta",
    "stem": "Atatürk İlke ve İnkılapları konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Laiklik din ve devlet işlerinin ayrılması, hukuk ve eğitimde akılcı düzenle ilgilidir."
      },
      {
        "id": "B",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "C",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "D",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "E",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Laiklik din ve devlet işlerinin ayrılması, hukuk ve eğitimde akılcı düzenle ilgilidir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "ataturk-ilke-inkilap",
      "orta"
    ]
  },
  {
    "id": "q-081",
    "topicId": "ataturk-ilke-inkilap",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Atatürk İlke ve İnkılapları konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "B",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "C",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "D",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "E",
        "text": "Halkçılık ayrıcalıkların reddi ve kanun önünde eşitliktir."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Halkçılık ayrıcalıkların reddi ve kanun önünde eşitliktir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "ataturk-ilke-inkilap",
      "ileri"
    ]
  },
  {
    "id": "q-082",
    "topicId": "ataturk-ilke-inkilap",
    "type": "single",
    "difficulty": "temel",
    "stem": "Atatürk İlke ve İnkılapları konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "B",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "C",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "D",
        "text": "Devletçilik özel girişimi yok saymadan devletin kalkınmada düzenleyici rolünü vurgular."
      },
      {
        "id": "E",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Devletçilik özel girişimi yok saymadan devletin kalkınmada düzenleyici rolünü vurgular.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "ataturk-ilke-inkilap",
      "temel"
    ]
  },
  {
    "id": "q-083",
    "topicId": "ataturk-ilke-inkilap",
    "type": "single",
    "difficulty": "orta",
    "stem": "Saltanatın kaldırılması en doğrudan hangi ilkeyle ilişkilidir?",
    "choices": [
      {
        "id": "A",
        "text": "İnkılapçılık"
      },
      {
        "id": "B",
        "text": "Halkçılık"
      },
      {
        "id": "C",
        "text": "Cumhuriyetçilik"
      },
      {
        "id": "D",
        "text": "Devletçilik"
      },
      {
        "id": "E",
        "text": "Laiklik"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Saltanatın kaldırılması milli egemenlik ve cumhuriyetçilikle ilgilidir.",
    "examTip": "Egemenlik kaynağı sorusunda cumhuriyetçilik düşünülür.",
    "tags": [
      "ataturk-ilke-inkilap",
      "orta"
    ]
  },
  {
    "id": "q-084",
    "topicId": "ataturk-ilke-inkilap",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Tevhid-i Tedrisat Kanunu hangi alanla ilgilidir?",
    "choices": [
      {
        "id": "A",
        "text": "Boğazlar"
      },
      {
        "id": "B",
        "text": "Eğitim birliği"
      },
      {
        "id": "C",
        "text": "Dış politika"
      },
      {
        "id": "D",
        "text": "Askeri rütbeler"
      },
      {
        "id": "E",
        "text": "Toprak reformu"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Tevhid-i Tedrisat eğitim ve öğretimde birliği sağlamaya yöneliktir.",
    "examTip": "Tevhid-i Tedrisat = eğitim birliği.",
    "tags": [
      "ataturk-ilke-inkilap",
      "ileri"
    ]
  },
  {
    "id": "q-085",
    "topicId": "ataturk-ilke-inkilap",
    "type": "single",
    "difficulty": "temel",
    "stem": "Türk Medeni Kanunu’nun kabulü hangi alanda yeniliktir?",
    "choices": [
      {
        "id": "A",
        "text": "Hukuk ve toplumsal yaşam"
      },
      {
        "id": "B",
        "text": "Dış politika"
      },
      {
        "id": "C",
        "text": "Askeri cephe"
      },
      {
        "id": "D",
        "text": "Kongreler"
      },
      {
        "id": "E",
        "text": "Boğazlar rejimi"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Türk Medeni Kanunu hukuk, aile ve toplumsal yaşam alanında laikleşme ve eşitlik getirmiştir.",
    "examTip": "Medeni Kanun hukuk ve toplumla ilgilidir.",
    "tags": [
      "ataturk-ilke-inkilap",
      "temel"
    ]
  },
  {
    "id": "q-086",
    "topicId": "ataturk-ilke-inkilap",
    "type": "single",
    "difficulty": "orta",
    "stem": "Devletçilik ilkesi neyi ifade eder?",
    "choices": [
      {
        "id": "A",
        "text": "Din ve devlet işlerinin ayrılmasını"
      },
      {
        "id": "B",
        "text": "Milli egemenliği"
      },
      {
        "id": "C",
        "text": "Ayrıcalıksız toplum düzenini"
      },
      {
        "id": "D",
        "text": "Sınır güvenliği paktlarını"
      },
      {
        "id": "E",
        "text": "Kalkınmada devletin düzenleyici ve öncü rolünü"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Devletçilik, özel girişimi tamamen reddetmeden devletin ekonomik kalkınmadaki rolünü vurgular.",
    "examTip": "Devletçilik sosyalizm değildir.",
    "tags": [
      "ataturk-ilke-inkilap",
      "orta"
    ]
  },
  {
    "id": "q-087",
    "topicId": "cumhuriyet-dis-politika",
    "type": "single",
    "difficulty": "temel",
    "stem": "Cumhuriyet Dönemi Dış Politika konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "B",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "C",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "D",
        "text": "Montrö Boğazlar üzerindeki Türk egemenliğini güçlendirmiştir."
      },
      {
        "id": "E",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Montrö Boğazlar üzerindeki Türk egemenliğini güçlendirmiştir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "cumhuriyet-dis-politika",
      "temel"
    ]
  },
  {
    "id": "q-088",
    "topicId": "cumhuriyet-dis-politika",
    "type": "single",
    "difficulty": "orta",
    "stem": "Cumhuriyet Dönemi Dış Politika konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "B",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "C",
        "text": "Hatay sorunu Atatürk döneminde gündeme gelmiş, 1939’da Türkiye’ye katılmıştır."
      },
      {
        "id": "D",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "E",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Hatay sorunu Atatürk döneminde gündeme gelmiş, 1939’da Türkiye’ye katılmıştır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "cumhuriyet-dis-politika",
      "orta"
    ]
  },
  {
    "id": "q-089",
    "topicId": "cumhuriyet-dis-politika",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Cumhuriyet Dönemi Dış Politika konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "B",
        "text": "Musul sorunu İngiltere ile yaşanmış ve 1926 Ankara Antlaşması ile sonuçlanmıştır."
      },
      {
        "id": "C",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "D",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "E",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Musul sorunu İngiltere ile yaşanmış ve 1926 Ankara Antlaşması ile sonuçlanmıştır.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "cumhuriyet-dis-politika",
      "ileri"
    ]
  },
  {
    "id": "q-090",
    "topicId": "cumhuriyet-dis-politika",
    "type": "single",
    "difficulty": "temel",
    "stem": "Cumhuriyet Dönemi Dış Politika konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Balkan Antantı batı sınırı güvenliği, Sadabat Paktı doğu sınırı güvenliği ile ilgilidir."
      },
      {
        "id": "B",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "C",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "D",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "E",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Balkan Antantı batı sınırı güvenliği, Sadabat Paktı doğu sınırı güvenliği ile ilgilidir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "cumhuriyet-dis-politika",
      "temel"
    ]
  },
  {
    "id": "q-091",
    "topicId": "cumhuriyet-dis-politika",
    "type": "single",
    "difficulty": "orta",
    "stem": "Montrö Boğazlar Sözleşmesi’nin önemi nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Musul’u Türkiye’ye katması"
      },
      {
        "id": "B",
        "text": "Hatay’ı bağımsız yapması"
      },
      {
        "id": "C",
        "text": "Saltanatı kaldırması"
      },
      {
        "id": "D",
        "text": "Cumhuriyeti ilan etmesi"
      },
      {
        "id": "E",
        "text": "Boğazlar üzerindeki Türk egemenliğini güçlendirmesi"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "1936 Montrö, Boğazlar rejiminde Türkiye’nin egemenliğini güçlendirmiştir.",
    "examTip": "Montrö = Boğazlar.",
    "tags": [
      "cumhuriyet-dis-politika",
      "orta"
    ]
  },
  {
    "id": "q-092",
    "topicId": "cumhuriyet-dis-politika",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Hatay Türkiye’ye hangi yıl katılmıştır?",
    "choices": [
      {
        "id": "A",
        "text": "1926"
      },
      {
        "id": "B",
        "text": "1936"
      },
      {
        "id": "C",
        "text": "1952"
      },
      {
        "id": "D",
        "text": "1939"
      },
      {
        "id": "E",
        "text": "1923"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Hatay 1939’da Türkiye’ye katılmıştır.",
    "examTip": "Hatay tarihi 1939’dur.",
    "tags": [
      "cumhuriyet-dis-politika",
      "ileri"
    ]
  },
  {
    "id": "q-093",
    "topicId": "cumhuriyet-dis-politika",
    "type": "single",
    "difficulty": "temel",
    "stem": "Türkiye’nin NATO’ya üyelik yılı hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "1960"
      },
      {
        "id": "B",
        "text": "1923"
      },
      {
        "id": "C",
        "text": "1952"
      },
      {
        "id": "D",
        "text": "1945"
      },
      {
        "id": "E",
        "text": "1939"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Türkiye 1952’de NATO’ya üye olmuştur.",
    "examTip": "NATO üyeliği 1952.",
    "tags": [
      "cumhuriyet-dis-politika",
      "temel"
    ]
  },
  {
    "id": "q-094",
    "topicId": "cumhuriyet-dis-politika",
    "type": "single",
    "difficulty": "orta",
    "stem": "Balkan Antantı’nın temel amacı nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Halifeliği kaldırmak"
      },
      {
        "id": "B",
        "text": "Batı sınırlarının güvenliğini desteklemek"
      },
      {
        "id": "C",
        "text": "Doğu sınırında İran-Irak ile iş birliği"
      },
      {
        "id": "D",
        "text": "Boğazları düzenlemek"
      },
      {
        "id": "E",
        "text": "Musul’u almak"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Balkan Antantı Balkan devletleriyle batı sınırı güvenliği bağlamında kuruldu.",
    "examTip": "Balkan = batı, Sadabat = doğu.",
    "tags": [
      "cumhuriyet-dis-politika",
      "orta"
    ]
  },
  {
    "id": "q-095",
    "topicId": "cagdas-turk-dunya",
    "type": "single",
    "difficulty": "temel",
    "stem": "Çağdaş Türk ve Dünya Tarihi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Soğuk Savaş ABD ve SSCB merkezli iki kutuplu düzeni ifade eder."
      },
      {
        "id": "B",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "C",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "D",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "E",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Soğuk Savaş ABD ve SSCB merkezli iki kutuplu düzeni ifade eder.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "cagdas-turk-dunya",
      "temel"
    ]
  },
  {
    "id": "q-096",
    "topicId": "cagdas-turk-dunya",
    "type": "single",
    "difficulty": "orta",
    "stem": "Çağdaş Türk ve Dünya Tarihi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "B",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "C",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "D",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "E",
        "text": "Türkiye 1952’de NATO’ya üye olmuştur."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Türkiye 1952’de NATO’ya üye olmuştur.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "cagdas-turk-dunya",
      "orta"
    ]
  },
  {
    "id": "q-097",
    "topicId": "cagdas-turk-dunya",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Çağdaş Türk ve Dünya Tarihi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "B",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "C",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "D",
        "text": "Birleşmiş Milletler II. Dünya Savaşı sonrasında kurulmuştur."
      },
      {
        "id": "E",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Birleşmiş Milletler II. Dünya Savaşı sonrasında kurulmuştur.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "cagdas-turk-dunya",
      "ileri"
    ]
  },
  {
    "id": "q-098",
    "topicId": "cagdas-turk-dunya",
    "type": "single",
    "difficulty": "temel",
    "stem": "Çağdaş Türk ve Dünya Tarihi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "B",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "C",
        "text": "Kıbrıs meselesi Türkiye’nin yakın dönem dış politikasında belirleyicidir."
      },
      {
        "id": "D",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "E",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Kıbrıs meselesi Türkiye’nin yakın dönem dış politikasında belirleyicidir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "cagdas-turk-dunya",
      "temel"
    ]
  },
  {
    "id": "q-099",
    "topicId": "cagdas-turk-dunya",
    "type": "single",
    "difficulty": "orta",
    "stem": "Birleşmiş Milletler hangi savaş sonrasında kurulmuştur?",
    "choices": [
      {
        "id": "A",
        "text": "Trablusgarp Savaşı"
      },
      {
        "id": "B",
        "text": "II. Dünya Savaşı"
      },
      {
        "id": "C",
        "text": "I. Dünya Savaşı"
      },
      {
        "id": "D",
        "text": "Kurtuluş Savaşı"
      },
      {
        "id": "E",
        "text": "Kırım Savaşı"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "BM, II. Dünya Savaşı sonrasında uluslararası barış ve güvenliği koruma amacıyla kurulmuştur.",
    "examTip": "BM = II. Dünya Savaşı sonrası.",
    "tags": [
      "cagdas-turk-dunya",
      "orta"
    ]
  },
  {
    "id": "q-100",
    "topicId": "cagdas-turk-dunya",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Soğuk Savaş hangi iki güç merkezli düzene dayanır?",
    "choices": [
      {
        "id": "A",
        "text": "ABD ve SSCB"
      },
      {
        "id": "B",
        "text": "İngiltere ve Fransa"
      },
      {
        "id": "C",
        "text": "Osmanlı ve Bizans"
      },
      {
        "id": "D",
        "text": "Türkiye ve Yunanistan"
      },
      {
        "id": "E",
        "text": "Almanya ve İtalya"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Soğuk Savaş ABD ve SSCB merkezli iki kutuplu sistemdir.",
    "examTip": "Soğuk Savaş = iki kutuplu düzen.",
    "tags": [
      "cagdas-turk-dunya",
      "ileri"
    ]
  },
  {
    "id": "q-101",
    "topicId": "cagdas-turk-dunya",
    "type": "single",
    "difficulty": "temel",
    "stem": "Türkiye NATO’ya hangi yıl üye olmuştur?",
    "choices": [
      {
        "id": "A",
        "text": "1945"
      },
      {
        "id": "B",
        "text": "1936"
      },
      {
        "id": "C",
        "text": "1923"
      },
      {
        "id": "D",
        "text": "1974"
      },
      {
        "id": "E",
        "text": "1952"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Türkiye 1952’de NATO’ya üye olmuştur.",
    "examTip": "Bu bilgi dış politika ve çağdaş tarih için kritiktir.",
    "tags": [
      "cagdas-turk-dunya",
      "temel"
    ]
  },
  {
    "id": "q-102",
    "topicId": "cagdas-turk-dunya",
    "type": "single",
    "difficulty": "orta",
    "stem": "II. Dünya Savaşı yılları aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "1919-1922"
      },
      {
        "id": "B",
        "text": "1929-1933"
      },
      {
        "id": "C",
        "text": "1947-1991"
      },
      {
        "id": "D",
        "text": "1939-1945"
      },
      {
        "id": "E",
        "text": "1914-1918"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "II. Dünya Savaşı 1939-1945 yılları arasında gerçekleşmiştir.",
    "examTip": "Savaş yılları kronoloji sorularında çıkar.",
    "tags": [
      "cagdas-turk-dunya",
      "orta"
    ]
  },
  {
    "id": "q-103",
    "topicId": "tarih-metodu-kronoloji",
    "type": "chronology",
    "difficulty": "temel",
    "stem": "Tarih Metodu ve Kronoloji Becerisi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "B",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "C",
        "text": "Tarih sorularında doğru cevap çoğu zaman dönem-sonuç uyumuyla bulunur."
      },
      {
        "id": "D",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "E",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Tarih sorularında doğru cevap çoğu zaman dönem-sonuç uyumuyla bulunur.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "tarih-metodu-kronoloji",
      "temel"
    ]
  },
  {
    "id": "q-104",
    "topicId": "tarih-metodu-kronoloji",
    "type": "chronology",
    "difficulty": "orta",
    "stem": "Tarih Metodu ve Kronoloji Becerisi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      },
      {
        "id": "B",
        "text": "Kronoloji sorularında yılları ezberlemek kadar olayların neden-sonuç sırası önemlidir."
      },
      {
        "id": "C",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "D",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "E",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Kronoloji sorularında yılları ezberlemek kadar olayların neden-sonuç sırası önemlidir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "tarih-metodu-kronoloji",
      "orta"
    ]
  },
  {
    "id": "q-105",
    "topicId": "tarih-metodu-kronoloji",
    "type": "chronology",
    "difficulty": "ileri",
    "stem": "Tarih Metodu ve Kronoloji Becerisi konusunda aşağıdaki bilgilerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Öncül sorularında her öncülü ayrı doğru/yanlış olarak işaretlemek gerekir."
      },
      {
        "id": "B",
        "text": "Bu konu yalnızca İslamiyet öncesi kültürle sınırlıdır."
      },
      {
        "id": "C",
        "text": "Bu gelişme Cumhuriyet sonrası NATO üyeliğiyle aynıdır."
      },
      {
        "id": "D",
        "text": "Bu olay Osmanlı kuruluşundan önce gerçekleşmiştir."
      },
      {
        "id": "E",
        "text": "Bu bilgi kronolojiyle ilgisizdir."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Öncül sorularında her öncülü ayrı doğru/yanlış olarak işaretlemek gerekir.",
    "examTip": "Doğru seçenek konuya ait temel ayırt edici bilgiyi verir.",
    "tags": [
      "tarih-metodu-kronoloji",
      "ileri"
    ]
  },
  {
    "id": "q-106",
    "topicId": "tarih-metodu-kronoloji",
    "type": "chronology",
    "difficulty": "temel",
    "stem": "Kronoloji sorularında en güvenli yöntem hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Seçenekleri rastgele elemek"
      },
      {
        "id": "B",
        "text": "Yalnızca en uzun seçeneği seçmek"
      },
      {
        "id": "C",
        "text": "Kişi adlarını yok saymak"
      },
      {
        "id": "D",
        "text": "Tüm olayları aynı dönemde kabul etmek"
      },
      {
        "id": "E",
        "text": "Olayları neden-sonuç ilişkisiyle sıralamak"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Kronoloji sorularında olayların neden-sonuç sırası yıllardan daha güvenli ipucu sağlar.",
    "examTip": "Sıralama sorusunda önce dönüm noktalarını bul.",
    "tags": [
      "tarih-metodu-kronoloji",
      "temel"
    ]
  },
  {
    "id": "q-107",
    "topicId": "tarih-metodu-kronoloji",
    "type": "single",
    "difficulty": "orta",
    "stem": "Öncül sorularında yapılması gereken ilk işlem nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Tüm öncülleri doğru kabul etmek"
      },
      {
        "id": "B",
        "text": "Konu dışı bilgileri seçmek"
      },
      {
        "id": "C",
        "text": "Aynı kelime geçen seçeneği işaretlemek"
      },
      {
        "id": "D",
        "text": "Her öncülü ayrı ayrı doğru/yanlış değerlendirmek"
      },
      {
        "id": "E",
        "text": "Sadece ilk öncüle bakmak"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Öncül sorularında her madde bağımsız değerlendirilmelidir.",
    "examTip": "Öncül analizi sabır ister.",
    "tags": [
      "tarih-metodu-kronoloji",
      "orta"
    ]
  },
  {
    "id": "q-108",
    "topicId": "tarih-metodu-kronoloji",
    "type": "single",
    "difficulty": "ileri",
    "stem": "Bir tarih bilgisinin doğru cevap olabilmesi için hangisi gerekir?",
    "choices": [
      {
        "id": "A",
        "text": "Modern kavram içermesi"
      },
      {
        "id": "B",
        "text": "Aynı kelimeyi tekrarlaması"
      },
      {
        "id": "C",
        "text": "Soru kökündeki dönem ve sonuçla uyumlu olması"
      },
      {
        "id": "D",
        "text": "Genel olarak doğru olması yeterlidir"
      },
      {
        "id": "E",
        "text": "En uzun seçenek olması"
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Doğru bilgi yanlış döneme aitse çeldirici olabilir.",
    "examTip": "Soru kökü sınır koyar.",
    "tags": [
      "tarih-metodu-kronoloji",
      "ileri"
    ]
  },
  {
    "id": "q-109",
    "topicId": "tarih-metodu-kronoloji",
    "type": "single",
    "difficulty": "temel",
    "stem": "Belge-olay eşleştirmelerinde en önemli kontrol nedir?",
    "choices": [
      {
        "id": "A",
        "text": "Renk uyumu"
      },
      {
        "id": "B",
        "text": "Belgenin tarihsel bağlamı ve sonucu"
      },
      {
        "id": "C",
        "text": "Yazı puntosu"
      },
      {
        "id": "D",
        "text": "Seçenek uzunluğu"
      },
      {
        "id": "E",
        "text": "Alfabetik sıra"
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Belgenin hangi olay veya dönemin sonucu olduğunu bilmek doğru eşleştirme sağlar.",
    "examTip": "Belgeyi sonuçla birlikte öğren.",
    "tags": [
      "tarih-metodu-kronoloji",
      "temel"
    ]
  },
  {
    "id": "q-110",
    "topicId": "osmanli-yenilesme",
    "type": "chronology",
    "difficulty": "ileri",
    "stem": "Aşağıdaki gelişmelerin kronolojik sıralaması hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Sened-i İttifak → Tanzimat Fermanı → Islahat Fermanı → Kanun-i Esasi"
      },
      {
        "id": "B",
        "text": "Tanzimat Fermanı → Sened-i İttifak → Kanun-i Esasi → Islahat Fermanı"
      },
      {
        "id": "C",
        "text": "Islahat Fermanı → Sened-i İttifak → Tanzimat Fermanı → Kanun-i Esasi"
      },
      {
        "id": "D",
        "text": "Kanun-i Esasi → Tanzimat Fermanı → Sened-i İttifak → Islahat Fermanı"
      },
      {
        "id": "E",
        "text": "Sened-i İttifak → Kanun-i Esasi → Tanzimat Fermanı → Islahat Fermanı"
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Doğru sıralama 1808 Sened-i İttifak, 1839 Tanzimat, 1856 Islahat, 1876 Kanun-i Esasi şeklindedir.",
    "examTip": "Kronolojide ana yılları zihinsel çıpa olarak tut.",
    "tags": [
      "osmanli-yenilesme",
      "ileri"
    ]
  },
  {
    "id": "q-111",
    "topicId": "kurtulus-savasi",
    "type": "chronology",
    "difficulty": "ileri",
    "stem": "Kurtuluş Savaşı diplomatik gelişmelerinin doğru sırası hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Lozan → Gümrü → Mudanya → Ankara"
      },
      {
        "id": "B",
        "text": "Ankara → Lozan → Gümrü → Mudanya"
      },
      {
        "id": "C",
        "text": "Mudanya → Gümrü → Lozan → Ankara"
      },
      {
        "id": "D",
        "text": "Gümrü → Lozan → Ankara → Mudanya"
      },
      {
        "id": "E",
        "text": "Gümrü → Ankara Antlaşması → Mudanya → Lozan"
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Doğru sıra 1920 Gümrü, 1921 Ankara, 1922 Mudanya, 1923 Lozan’dır.",
    "examTip": "Antlaşma sıralarında yıl ve cephe bağlantısı kullan.",
    "tags": [
      "kurtulus-savasi",
      "ileri"
    ]
  },
  {
    "id": "q-112",
    "topicId": "cumhuriyet-dis-politika",
    "type": "chronology",
    "difficulty": "ileri",
    "stem": "Cumhuriyet dönemi dış politika gelişmelerinin doğru sırası hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Hatay’ın katılması → Musul’un çözümü → Montrö → Sadabat → Balkan"
      },
      {
        "id": "B",
        "text": "Balkan Antantı → Musul’un çözümü → Sadabat → Montrö → Hatay"
      },
      {
        "id": "C",
        "text": "Musul’un çözümü → Montrö → Balkan Antantı → Hatay → Sadabat"
      },
      {
        "id": "D",
        "text": "Musul’un çözümü → Balkan Antantı → Montrö → Sadabat Paktı → Hatay’ın katılması"
      },
      {
        "id": "E",
        "text": "Montrö → Musul’un çözümü → Hatay’ın katılması → Balkan Antantı → Sadabat"
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Doğru sıra 1926 Musul, 1934 Balkan Antantı, 1936 Montrö, 1937 Sadabat, 1939 Hatay’dır.",
    "examTip": "Dış politikada 1926-1939 çıpalarını kullan.",
    "tags": [
      "cumhuriyet-dis-politika",
      "ileri"
    ]
  },
  {
    "id": "q-113",
    "topicId": "islamiyet-oncesi",
    "type": "case",
    "difficulty": "temel",
    "stem": "İslamiyet Öncesi Türk Tarihi için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Türk tarihinin ilk bilgileri Çin kaynaklarında görülür; Türk adının geçtiği ilk millî yazılı kaynak Orhun Yazıtlarıdır."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "islamiyet-oncesi",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-114",
    "topicId": "islamiyet-oncesi",
    "type": "case",
    "difficulty": "orta",
    "stem": "İslamiyet Öncesi Türk Tarihi çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Devlet adı olarak Türk adını kullanan ilk siyasi yapı Göktürklerdir."
      },
      {
        "id": "B",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "C",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "D",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "E",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "islamiyet-oncesi",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-115",
    "topicId": "islamiyet-oncesi",
    "type": "case",
    "difficulty": "ileri",
    "stem": "İslamiyet Öncesi Türk Tarihi konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "Kut anlayışını halk egemenliği sanmak."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "islamiyet-oncesi",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-116",
    "topicId": "islamiyet-oncesi",
    "type": "case",
    "difficulty": "orta",
    "stem": "İslamiyet Öncesi Türk Tarihi konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "B",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "C",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "D",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "E",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "islamiyet-oncesi",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-117",
    "topicId": "turk-islam",
    "type": "case",
    "difficulty": "temel",
    "stem": "Türk-İslam Tarihi için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "İlk Müslüman Türk devleti Karahanlılardır."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "turk-islam",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-118",
    "topicId": "turk-islam",
    "type": "case",
    "difficulty": "orta",
    "stem": "Türk-İslam Tarihi çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "B",
        "text": "Put Kırıcı unvanı Hindistan seferleriyle tanınan Gazneli Mahmut’a aittir."
      },
      {
        "id": "C",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "D",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "E",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "turk-islam",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-119",
    "topicId": "turk-islam",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Türk-İslam Tarihi konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "B",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "C",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "D",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "E",
        "text": "Put Kırıcıyı Artuklu, Karahanlı veya Anadolu Selçuklu kişisi sanmak."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "turk-islam",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-120",
    "topicId": "turk-islam",
    "type": "case",
    "difficulty": "orta",
    "stem": "Türk-İslam Tarihi konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "turk-islam",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-121",
    "topicId": "anadolu-selcuklu",
    "type": "case",
    "difficulty": "temel",
    "stem": "Anadolu Selçuklu ve Beylikler için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "B",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "C",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "D",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "E",
        "text": "Miryokefalon, Anadolu’nun Türk yurdu olduğunun kesinleşmesiyle ilişkilidir."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "anadolu-selcuklu",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-122",
    "topicId": "anadolu-selcuklu",
    "type": "case",
    "difficulty": "orta",
    "stem": "Anadolu Selçuklu ve Beylikler çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Kösedağ, Türkiye Selçuklu merkezi otoritesini zayıflatıp beylikler dönemini güçlendirmiştir."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "anadolu-selcuklu",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-123",
    "topicId": "anadolu-selcuklu",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Anadolu Selçuklu ve Beylikler konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Miryokefalon’u Anadolu’nun kapılarının açılması saymak; bu Malazgirt’tir."
      },
      {
        "id": "B",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "C",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "D",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "E",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "anadolu-selcuklu",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-124",
    "topicId": "anadolu-selcuklu",
    "type": "case",
    "difficulty": "orta",
    "stem": "Anadolu Selçuklu ve Beylikler konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "anadolu-selcuklu",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-125",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "case",
    "difficulty": "temel",
    "stem": "Osmanlı Kuruluş ve Yükseliş için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Osmanlı’nın kısa sürede büyümesinde Bizans’ın zayıflığı, uç beyliği konumu ve iskan politikası etkilidir."
      },
      {
        "id": "B",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "C",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "D",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "E",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-126",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "case",
    "difficulty": "orta",
    "stem": "Osmanlı Kuruluş ve Yükseliş çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "Çimpe Rumeli’ye geçişte üs niteliğindedir."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-127",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Osmanlı Kuruluş ve Yükseliş konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "B",
        "text": "Çimpe’yi başkent sanmak."
      },
      {
        "id": "C",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "D",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "E",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-128",
    "topicId": "osmanli-kurulus-yukselis",
    "type": "case",
    "difficulty": "orta",
    "stem": "Osmanlı Kuruluş ve Yükseliş konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "B",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "C",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "D",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "E",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "osmanli-kurulus-yukselis",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-129",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "case",
    "difficulty": "temel",
    "stem": "Osmanlı Kültür ve Medeniyet için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "B",
        "text": "Divan-ı Hümayun merkez yönetimin danışma ve karar organıdır."
      },
      {
        "id": "C",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "D",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "E",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-130",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "case",
    "difficulty": "orta",
    "stem": "Osmanlı Kültür ve Medeniyet çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "B",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "C",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "D",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "E",
        "text": "Seyfiye yönetim ve askerlik, ilmiye eğitim-hukuk-din, kalemiye yazışma-maliye bürokrasisidir."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-131",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Osmanlı Kültür ve Medeniyet konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Tımarı özel mülkiyet sanmak."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-132",
    "topicId": "osmanli-kultur-medeniyet",
    "type": "case",
    "difficulty": "orta",
    "stem": "Osmanlı Kültür ve Medeniyet konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "B",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "C",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "D",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "E",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "osmanli-kultur-medeniyet",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-133",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "case",
    "difficulty": "temel",
    "stem": "Osmanlı Duraklama ve Gerileme için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Karlofça Osmanlı’nın batıda ilk büyük toprak kaybıdır."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-134",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "case",
    "difficulty": "orta",
    "stem": "Osmanlı Duraklama ve Gerileme çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Lale Devri’nde Batı tarzı yeniliklere ilgi artmıştır."
      },
      {
        "id": "B",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "C",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "D",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "E",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-135",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Osmanlı Duraklama ve Gerileme konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "Karlofça ile Pasarofça sonucunu karıştırmak."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-136",
    "topicId": "osmanli-duraklama-gerileme",
    "type": "case",
    "difficulty": "orta",
    "stem": "Osmanlı Duraklama ve Gerileme konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "B",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "C",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "D",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "E",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "osmanli-duraklama-gerileme",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-137",
    "topicId": "osmanli-yenilesme",
    "type": "case",
    "difficulty": "temel",
    "stem": "Osmanlı Yenileşme ve Demokratikleşme için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "Sened-i İttifak padişah yetkilerini sınırlayan ilk belgedir."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "osmanli-yenilesme",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-138",
    "topicId": "osmanli-yenilesme",
    "type": "case",
    "difficulty": "orta",
    "stem": "Osmanlı Yenileşme ve Demokratikleşme çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "B",
        "text": "Tanzimat can, mal, namus güvenliği ve hukuki eşitlik vurgusuyla öne çıkar."
      },
      {
        "id": "C",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "D",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "E",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "osmanli-yenilesme",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-139",
    "topicId": "osmanli-yenilesme",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Osmanlı Yenileşme ve Demokratikleşme konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "B",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "C",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "D",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "E",
        "text": "Sened-i İttifak’ı Tanzimat’tan sonra sanmak."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "osmanli-yenilesme",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-140",
    "topicId": "osmanli-yenilesme",
    "type": "case",
    "difficulty": "orta",
    "stem": "Osmanlı Yenileşme ve Demokratikleşme konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "osmanli-yenilesme",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-141",
    "topicId": "milli-mucadele-hazirlik",
    "type": "case",
    "difficulty": "temel",
    "stem": "Milli Mücadele Hazırlık Dönemi için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "B",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "C",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "D",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "E",
        "text": "Amasya Genelgesi Milli Mücadele’nin gerekçe, amaç ve yöntemini açıklar."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "milli-mucadele-hazirlik",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-142",
    "topicId": "milli-mucadele-hazirlik",
    "type": "case",
    "difficulty": "orta",
    "stem": "Milli Mücadele Hazırlık Dönemi çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Erzurum Kongresi bölgesel toplanıp ulusal kararlar almıştır."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "milli-mucadele-hazirlik",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-143",
    "topicId": "milli-mucadele-hazirlik",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Milli Mücadele Hazırlık Dönemi konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Havza ile Amasya’nın rolünü karıştırmak."
      },
      {
        "id": "B",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "C",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "D",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "E",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "milli-mucadele-hazirlik",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-144",
    "topicId": "milli-mucadele-hazirlik",
    "type": "case",
    "difficulty": "orta",
    "stem": "Milli Mücadele Hazırlık Dönemi konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "milli-mucadele-hazirlik",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-145",
    "topicId": "kurtulus-savasi",
    "type": "case",
    "difficulty": "temel",
    "stem": "Kurtuluş Savaşı ve Antlaşmalar için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Doğu Cephesi Gümrü Antlaşması ile kapanmıştır."
      },
      {
        "id": "B",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "C",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "D",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "E",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "kurtulus-savasi",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-146",
    "topicId": "kurtulus-savasi",
    "type": "case",
    "difficulty": "orta",
    "stem": "Kurtuluş Savaşı ve Antlaşmalar çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "Güney Cephesi Ankara Antlaşması ile büyük ölçüde kapanmıştır."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "kurtulus-savasi",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-147",
    "topicId": "kurtulus-savasi",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Kurtuluş Savaşı ve Antlaşmalar konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "B",
        "text": "Mudanya’yı barış antlaşması sanmak."
      },
      {
        "id": "C",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "D",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "E",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "kurtulus-savasi",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-148",
    "topicId": "kurtulus-savasi",
    "type": "case",
    "difficulty": "orta",
    "stem": "Kurtuluş Savaşı ve Antlaşmalar konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "B",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "C",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "D",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "E",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "kurtulus-savasi",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-149",
    "topicId": "ataturk-ilke-inkilap",
    "type": "case",
    "difficulty": "temel",
    "stem": "Atatürk İlke ve İnkılapları için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "B",
        "text": "Cumhuriyetçilik milli egemenlik ve seçimle gelen yönetimle ilgilidir."
      },
      {
        "id": "C",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "D",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "E",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "ataturk-ilke-inkilap",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-150",
    "topicId": "ataturk-ilke-inkilap",
    "type": "case",
    "difficulty": "orta",
    "stem": "Atatürk İlke ve İnkılapları çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "B",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "C",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "D",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "E",
        "text": "Laiklik din ve devlet işlerinin ayrılması, hukuk ve eğitimde akılcı düzenle ilgilidir."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "ataturk-ilke-inkilap",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-151",
    "topicId": "ataturk-ilke-inkilap",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Atatürk İlke ve İnkılapları konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Devletçiliği sosyalizm sanmak."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "ataturk-ilke-inkilap",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-152",
    "topicId": "ataturk-ilke-inkilap",
    "type": "case",
    "difficulty": "orta",
    "stem": "Atatürk İlke ve İnkılapları konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "B",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "C",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "D",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "E",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "ataturk-ilke-inkilap",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-153",
    "topicId": "cumhuriyet-dis-politika",
    "type": "case",
    "difficulty": "temel",
    "stem": "Cumhuriyet Dönemi Dış Politika için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Montrö Boğazlar üzerindeki Türk egemenliğini güçlendirmiştir."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "cumhuriyet-dis-politika",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-154",
    "topicId": "cumhuriyet-dis-politika",
    "type": "case",
    "difficulty": "orta",
    "stem": "Cumhuriyet Dönemi Dış Politika çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Hatay sorunu Atatürk döneminde gündeme gelmiş, 1939’da Türkiye’ye katılmıştır."
      },
      {
        "id": "B",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "C",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "D",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "E",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "cumhuriyet-dis-politika",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-155",
    "topicId": "cumhuriyet-dis-politika",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Cumhuriyet Dönemi Dış Politika konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "Montrö’yü Lozan’ın yerine geçmiş genel barış antlaşması sanmak."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "cumhuriyet-dis-politika",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-156",
    "topicId": "cumhuriyet-dis-politika",
    "type": "case",
    "difficulty": "orta",
    "stem": "Cumhuriyet Dönemi Dış Politika konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "B",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "C",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "D",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "E",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "cumhuriyet-dis-politika",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-157",
    "topicId": "cagdas-turk-dunya",
    "type": "case",
    "difficulty": "temel",
    "stem": "Çağdaş Türk ve Dünya Tarihi için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "Soğuk Savaş ABD ve SSCB merkezli iki kutuplu düzeni ifade eder."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "cagdas-turk-dunya",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-158",
    "topicId": "cagdas-turk-dunya",
    "type": "case",
    "difficulty": "orta",
    "stem": "Çağdaş Türk ve Dünya Tarihi çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "B",
        "text": "Türkiye 1952’de NATO’ya üye olmuştur."
      },
      {
        "id": "C",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "D",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "E",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      }
    ],
    "correctChoiceId": "B",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "cagdas-turk-dunya",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-159",
    "topicId": "cagdas-turk-dunya",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Çağdaş Türk ve Dünya Tarihi konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "B",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "C",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "D",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "E",
        "text": "NATO ve BM kuruluş amaçlarını karıştırmak."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "cagdas-turk-dunya",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-160",
    "topicId": "cagdas-turk-dunya",
    "type": "case",
    "difficulty": "orta",
    "stem": "Çağdaş Türk ve Dünya Tarihi konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "cagdas-turk-dunya",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-161",
    "topicId": "tarih-metodu-kronoloji",
    "type": "case",
    "difficulty": "temel",
    "stem": "Tarih Metodu ve Kronoloji Becerisi için aşağıdaki kavram-eşleştirmelerden hangisi doğrudur?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "B",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "C",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "D",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "E",
        "text": "Tarih sorularında doğru cevap çoğu zaman dönem-sonuç uyumuyla bulunur."
      }
    ],
    "correctChoiceId": "E",
    "explanation": "Konuya ait temel bilgi doğru seçenekte verilmiştir.",
    "examTip": "Kavram-eşleştirme sorularında dönem ve sonuç birlikte kontrol edilir.",
    "tags": [
      "tarih-metodu-kronoloji",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-162",
    "topicId": "tarih-metodu-kronoloji",
    "type": "case",
    "difficulty": "orta",
    "stem": "Tarih Metodu ve Kronoloji Becerisi çalışırken aşağıdaki yargılardan hangisi KPSS açısından ayırt edicidir?",
    "choices": [
      {
        "id": "A",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "B",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "C",
        "text": "Kronoloji sorularında yılları ezberlemek kadar olayların neden-sonuç sırası önemlidir."
      },
      {
        "id": "D",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "E",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      }
    ],
    "correctChoiceId": "C",
    "explanation": "Bu yargı konunun KPSS’de en sık yoklanan ayırt edici bilgisidir.",
    "examTip": "Ayırt edici bilgi genellikle doğru cevabı doğrudan verir.",
    "tags": [
      "tarih-metodu-kronoloji",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-163",
    "topicId": "tarih-metodu-kronoloji",
    "type": "case",
    "difficulty": "ileri",
    "stem": "Tarih Metodu ve Kronoloji Becerisi konusunda öğrencilerin kaçınması gereken hata hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Bütün doğru bilgileri doğru cevap sanmak; soru kökü dönem sınırı koyabilir."
      },
      {
        "id": "B",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      },
      {
        "id": "C",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "D",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "E",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      }
    ],
    "correctChoiceId": "A",
    "explanation": "Doğru seçenek, bu konuda sık yapılan kavram veya kronoloji hatasını ifade eder.",
    "examTip": "Sık hata soruları çeldirici yakalama becerisini ölçer.",
    "tags": [
      "tarih-metodu-kronoloji",
      "ek-genisletme"
    ]
  },
  {
    "id": "q-164",
    "topicId": "tarih-metodu-kronoloji",
    "type": "case",
    "difficulty": "orta",
    "stem": "Tarih Metodu ve Kronoloji Becerisi konusunun doğru çalışma stratejisi aşağıdakilerden hangisidir?",
    "choices": [
      {
        "id": "A",
        "text": "Yalnızca seçenek uzunluğuna göre cevap vermek."
      },
      {
        "id": "B",
        "text": "Kronoloji ve sonuç ilişkisini tamamen yok saymak."
      },
      {
        "id": "C",
        "text": "Her doğru görünen bilgiyi soru kökünden bağımsız kabul etmek."
      },
      {
        "id": "D",
        "text": "Kavramı, dönemi, sonucu ve sık karıştırılan çeldiriciyi birlikte öğrenmek."
      },
      {
        "id": "E",
        "text": "Bütün bilgileri dönem ayrımı yapmadan aynı başlıkta toplamak."
      }
    ],
    "correctChoiceId": "D",
    "explanation": "KPSS Tarih için kalıcı öğrenme kavram-dönem-sonuç-çeldirici ilişkisi kurulduğunda güçlenir.",
    "examTip": "Salt ezber yerine aktif hatırlama ve açıklamalı soru çözümü kullan.",
    "tags": [
      "tarih-metodu-kronoloji",
      "ek-genisletme"
    ]
  }
];

export const flashcards: Flashcard[] = [
  {
    "id": "fc-001",
    "topicId": "islamiyet-oncesi",
    "front": "Türk adı",
    "back": "Türk tarihinin ilk bilgileri Çin kaynaklarında görülür; Türk adının geçtiği ilk millî yazılı kaynak Orhun Yazıtlarıdır.",
    "hint": "İslamiyet Öncesi Türk Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "islamiyet-oncesi",
      "Türk adı"
    ]
  },
  {
    "id": "fc-002",
    "topicId": "islamiyet-oncesi",
    "front": "Orta Asya",
    "back": "Orta Asya, İslamiyet Öncesi Türk Tarihi konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "İslamiyet Öncesi Türk Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "islamiyet-oncesi",
      "Orta Asya"
    ]
  },
  {
    "id": "fc-003",
    "topicId": "islamiyet-oncesi",
    "front": "kut",
    "back": "Kut hükümdarlık yetkisinin Tanrı tarafından verildiği inancıdır; demokratik seçim değildir.",
    "hint": "İslamiyet Öncesi Türk Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "islamiyet-oncesi",
      "kut"
    ]
  },
  {
    "id": "fc-004",
    "topicId": "islamiyet-oncesi",
    "front": "töre",
    "back": "Töre yazısız hukuk düzenidir ve hükümdarın keyfî davranmasını sınırlar.",
    "hint": "İslamiyet Öncesi Türk Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "islamiyet-oncesi",
      "töre"
    ]
  },
  {
    "id": "fc-005",
    "topicId": "islamiyet-oncesi",
    "front": "kurultay",
    "back": "Kurultay danışma meclisidir; son söz çoğu zaman kağanındır.",
    "hint": "İslamiyet Öncesi Türk Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "islamiyet-oncesi",
      "kurultay"
    ]
  },
  {
    "id": "fc-006",
    "topicId": "turk-islam",
    "front": "Talas",
    "back": "Talas, Türk-İslam Tarihi konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Türk-İslam Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "turk-islam",
      "Talas"
    ]
  },
  {
    "id": "fc-007",
    "topicId": "turk-islam",
    "front": "Karahanlılar",
    "back": "İlk Müslüman Türk devleti Karahanlılardır.",
    "hint": "Türk-İslam Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "turk-islam",
      "Karahanlılar"
    ]
  },
  {
    "id": "fc-008",
    "topicId": "turk-islam",
    "front": "Gazneli Mahmut",
    "back": "Put Kırıcı unvanı Hindistan seferleriyle tanınan Gazneli Mahmut’a aittir.",
    "hint": "Türk-İslam Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "turk-islam",
      "Gazneli Mahmut"
    ]
  },
  {
    "id": "fc-009",
    "topicId": "turk-islam",
    "front": "Put kırıcı",
    "back": "Put Kırıcı unvanı Hindistan seferleriyle tanınan Gazneli Mahmut’a aittir.",
    "hint": "Türk-İslam Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "turk-islam",
      "Put kırıcı"
    ]
  },
  {
    "id": "fc-010",
    "topicId": "turk-islam",
    "front": "Dandanakan",
    "back": "Dandanakan Savaşı Selçukluların Gaznelilere karşı siyasi üstünlük kazandığı dönüm noktasıdır.",
    "hint": "Türk-İslam Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "turk-islam",
      "Dandanakan"
    ]
  },
  {
    "id": "fc-011",
    "topicId": "anadolu-selcuklu",
    "front": "Malazgirt",
    "back": "Malazgirt, Anadolu Selçuklu ve Beylikler konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Anadolu Selçuklu ve Beylikler başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "anadolu-selcuklu",
      "Malazgirt"
    ]
  },
  {
    "id": "fc-012",
    "topicId": "anadolu-selcuklu",
    "front": "Miryokefalon",
    "back": "Miryokefalon, Anadolu’nun Türk yurdu olduğunun kesinleşmesiyle ilişkilidir.",
    "hint": "Anadolu Selçuklu ve Beylikler başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "anadolu-selcuklu",
      "Miryokefalon"
    ]
  },
  {
    "id": "fc-013",
    "topicId": "anadolu-selcuklu",
    "front": "Kösedağ",
    "back": "Kösedağ, Türkiye Selçuklu merkezi otoritesini zayıflatıp beylikler dönemini güçlendirmiştir.",
    "hint": "Anadolu Selçuklu ve Beylikler başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "anadolu-selcuklu",
      "Kösedağ"
    ]
  },
  {
    "id": "fc-014",
    "topicId": "anadolu-selcuklu",
    "front": "Haçlı Seferleri",
    "back": "Haçlı Seferleri, Anadolu Selçuklu ve Beylikler konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Anadolu Selçuklu ve Beylikler başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "anadolu-selcuklu",
      "Haçlı Seferleri"
    ]
  },
  {
    "id": "fc-015",
    "topicId": "anadolu-selcuklu",
    "front": "Kervansaray",
    "back": "Kervansaraylar ticaret yollarında güvenlik ve konaklama sağlar.",
    "hint": "Anadolu Selçuklu ve Beylikler başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "anadolu-selcuklu",
      "Kervansaray"
    ]
  },
  {
    "id": "fc-016",
    "topicId": "osmanli-kurulus-yukselis",
    "front": "Kayı",
    "back": "Kayı, Osmanlı Kuruluş ve Yükseliş konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Osmanlı Kuruluş ve Yükseliş başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-kurulus-yukselis",
      "Kayı"
    ]
  },
  {
    "id": "fc-017",
    "topicId": "osmanli-kurulus-yukselis",
    "front": "Bilecik",
    "back": "Bilecik, Osmanlı Kuruluş ve Yükseliş konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Osmanlı Kuruluş ve Yükseliş başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-kurulus-yukselis",
      "Bilecik"
    ]
  },
  {
    "id": "fc-018",
    "topicId": "osmanli-kurulus-yukselis",
    "front": "Çimpe",
    "back": "Çimpe Rumeli’ye geçişte üs niteliğindedir.",
    "hint": "Osmanlı Kuruluş ve Yükseliş başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-kurulus-yukselis",
      "Çimpe"
    ]
  },
  {
    "id": "fc-019",
    "topicId": "osmanli-kurulus-yukselis",
    "front": "İskan",
    "back": "İskan, Osmanlı Kuruluş ve Yükseliş konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Osmanlı Kuruluş ve Yükseliş başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-kurulus-yukselis",
      "İskan"
    ]
  },
  {
    "id": "fc-020",
    "topicId": "osmanli-kurulus-yukselis",
    "front": "Devşirme",
    "back": "Devşirme sistemi kapıkulu ordusu ve merkezî bürokrasiyle ilgilidir.",
    "hint": "Osmanlı Kuruluş ve Yükseliş başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-kurulus-yukselis",
      "Devşirme"
    ]
  },
  {
    "id": "fc-021",
    "topicId": "osmanli-kultur-medeniyet",
    "front": "Divan-ı Hümayun",
    "back": "Divan-ı Hümayun merkez yönetimin danışma ve karar organıdır.",
    "hint": "Osmanlı Kültür ve Medeniyet başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-kultur-medeniyet",
      "Divan-ı Hümayun"
    ]
  },
  {
    "id": "fc-022",
    "topicId": "osmanli-kultur-medeniyet",
    "front": "Sadrazam",
    "back": "Sadrazam, Osmanlı Kültür ve Medeniyet konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Osmanlı Kültür ve Medeniyet başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-kultur-medeniyet",
      "Sadrazam"
    ]
  },
  {
    "id": "fc-023",
    "topicId": "osmanli-kultur-medeniyet",
    "front": "Şeyhülislam",
    "back": "Şeyhülislam, Osmanlı Kültür ve Medeniyet konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Osmanlı Kültür ve Medeniyet başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-kultur-medeniyet",
      "Şeyhülislam"
    ]
  },
  {
    "id": "fc-024",
    "topicId": "osmanli-kultur-medeniyet",
    "front": "Defterdar",
    "back": "Defterdar, Osmanlı Kültür ve Medeniyet konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Osmanlı Kültür ve Medeniyet başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-kultur-medeniyet",
      "Defterdar"
    ]
  },
  {
    "id": "fc-025",
    "topicId": "osmanli-kultur-medeniyet",
    "front": "Nişancı",
    "back": "Nişancı, Osmanlı Kültür ve Medeniyet konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Osmanlı Kültür ve Medeniyet başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-kultur-medeniyet",
      "Nişancı"
    ]
  },
  {
    "id": "fc-026",
    "topicId": "osmanli-duraklama-gerileme",
    "front": "Karlofça",
    "back": "Karlofça Osmanlı’nın batıda ilk büyük toprak kaybıdır.",
    "hint": "Osmanlı Duraklama ve Gerileme başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-duraklama-gerileme",
      "Karlofça"
    ]
  },
  {
    "id": "fc-027",
    "topicId": "osmanli-duraklama-gerileme",
    "front": "Pasarofça",
    "back": "Pasarofça, Osmanlı Duraklama ve Gerileme konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Osmanlı Duraklama ve Gerileme başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-duraklama-gerileme",
      "Pasarofça"
    ]
  },
  {
    "id": "fc-028",
    "topicId": "osmanli-duraklama-gerileme",
    "front": "Lale Devri",
    "back": "Lale Devri’nde Batı tarzı yeniliklere ilgi artmıştır.",
    "hint": "Osmanlı Duraklama ve Gerileme başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-duraklama-gerileme",
      "Lale Devri"
    ]
  },
  {
    "id": "fc-029",
    "topicId": "osmanli-duraklama-gerileme",
    "front": "Koçi Bey",
    "back": "Koçi Bey, Osmanlı Duraklama ve Gerileme konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Osmanlı Duraklama ve Gerileme başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-duraklama-gerileme",
      "Koçi Bey"
    ]
  },
  {
    "id": "fc-030",
    "topicId": "osmanli-duraklama-gerileme",
    "front": "III. Selim",
    "back": "III. Selim’in Nizam-ı Cedid’i askeri ve mali yenilikleri içerir.",
    "hint": "Osmanlı Duraklama ve Gerileme başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-duraklama-gerileme",
      "III. Selim"
    ]
  },
  {
    "id": "fc-031",
    "topicId": "osmanli-yenilesme",
    "front": "Sened-i İttifak",
    "back": "Sened-i İttifak padişah yetkilerini sınırlayan ilk belgedir.",
    "hint": "Osmanlı Yenileşme ve Demokratikleşme başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-yenilesme",
      "Sened-i İttifak"
    ]
  },
  {
    "id": "fc-032",
    "topicId": "osmanli-yenilesme",
    "front": "Tanzimat",
    "back": "Tanzimat can, mal, namus güvenliği ve hukuki eşitlik vurgusuyla öne çıkar.",
    "hint": "Osmanlı Yenileşme ve Demokratikleşme başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-yenilesme",
      "Tanzimat"
    ]
  },
  {
    "id": "fc-033",
    "topicId": "osmanli-yenilesme",
    "front": "Islahat",
    "back": "Islahat gayrimüslim hakları ve Avrupa baskısı bağlamında sorulur.",
    "hint": "Osmanlı Yenileşme ve Demokratikleşme başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-yenilesme",
      "Islahat"
    ]
  },
  {
    "id": "fc-034",
    "topicId": "osmanli-yenilesme",
    "front": "Kanun-i Esasi",
    "back": "Kanun-i Esasi ilk Osmanlı anayasasıdır.",
    "hint": "Osmanlı Yenileşme ve Demokratikleşme başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-yenilesme",
      "Kanun-i Esasi"
    ]
  },
  {
    "id": "fc-035",
    "topicId": "osmanli-yenilesme",
    "front": "I. Meşrutiyet",
    "back": "I. Meşrutiyet, Osmanlı Yenileşme ve Demokratikleşme konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Osmanlı Yenileşme ve Demokratikleşme başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "osmanli-yenilesme",
      "I. Meşrutiyet"
    ]
  },
  {
    "id": "fc-036",
    "topicId": "milli-mucadele-hazirlik",
    "front": "Mondros",
    "back": "Mondros, Milli Mücadele Hazırlık Dönemi konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Milli Mücadele Hazırlık Dönemi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "milli-mucadele-hazirlik",
      "Mondros"
    ]
  },
  {
    "id": "fc-037",
    "topicId": "milli-mucadele-hazirlik",
    "front": "Havza Genelgesi",
    "back": "Havza Genelgesi, Milli Mücadele Hazırlık Dönemi konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Milli Mücadele Hazırlık Dönemi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "milli-mucadele-hazirlik",
      "Havza Genelgesi"
    ]
  },
  {
    "id": "fc-038",
    "topicId": "milli-mucadele-hazirlik",
    "front": "Amasya Genelgesi",
    "back": "Amasya Genelgesi Milli Mücadele’nin gerekçe, amaç ve yöntemini açıklar.",
    "hint": "Milli Mücadele Hazırlık Dönemi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "milli-mucadele-hazirlik",
      "Amasya Genelgesi"
    ]
  },
  {
    "id": "fc-039",
    "topicId": "milli-mucadele-hazirlik",
    "front": "Erzurum Kongresi",
    "back": "Erzurum Kongresi bölgesel toplanıp ulusal kararlar almıştır.",
    "hint": "Milli Mücadele Hazırlık Dönemi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "milli-mucadele-hazirlik",
      "Erzurum Kongresi"
    ]
  },
  {
    "id": "fc-040",
    "topicId": "milli-mucadele-hazirlik",
    "front": "Sivas Kongresi",
    "back": "Sivas Kongresi cemiyetleri Anadolu ve Rumeli Müdafaa-i Hukuk çatısında birleştirmiştir.",
    "hint": "Milli Mücadele Hazırlık Dönemi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "milli-mucadele-hazirlik",
      "Sivas Kongresi"
    ]
  },
  {
    "id": "fc-041",
    "topicId": "kurtulus-savasi",
    "front": "Gümrü",
    "back": "Doğu Cephesi Gümrü Antlaşması ile kapanmıştır.",
    "hint": "Kurtuluş Savaşı ve Antlaşmalar başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "kurtulus-savasi",
      "Gümrü"
    ]
  },
  {
    "id": "fc-042",
    "topicId": "kurtulus-savasi",
    "front": "Ankara Antlaşması",
    "back": "Güney Cephesi Ankara Antlaşması ile büyük ölçüde kapanmıştır.",
    "hint": "Kurtuluş Savaşı ve Antlaşmalar başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "kurtulus-savasi",
      "Ankara Antlaşması"
    ]
  },
  {
    "id": "fc-043",
    "topicId": "kurtulus-savasi",
    "front": "İnönü",
    "back": "İnönü, Kurtuluş Savaşı ve Antlaşmalar konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Kurtuluş Savaşı ve Antlaşmalar başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "kurtulus-savasi",
      "İnönü"
    ]
  },
  {
    "id": "fc-044",
    "topicId": "kurtulus-savasi",
    "front": "Sakarya",
    "back": "Sakarya savunmadan taarruza geçişin dönüm noktasıdır.",
    "hint": "Kurtuluş Savaşı ve Antlaşmalar başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "kurtulus-savasi",
      "Sakarya"
    ]
  },
  {
    "id": "fc-045",
    "topicId": "kurtulus-savasi",
    "front": "Tekalif-i Milliye",
    "back": "Tekalif-i Milliye, Kurtuluş Savaşı ve Antlaşmalar konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Kurtuluş Savaşı ve Antlaşmalar başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "kurtulus-savasi",
      "Tekalif-i Milliye"
    ]
  },
  {
    "id": "fc-046",
    "topicId": "ataturk-ilke-inkilap",
    "front": "Cumhuriyetçilik",
    "back": "Cumhuriyetçilik milli egemenlik ve seçimle gelen yönetimle ilgilidir.",
    "hint": "Atatürk İlke ve İnkılapları başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "ataturk-ilke-inkilap",
      "Cumhuriyetçilik"
    ]
  },
  {
    "id": "fc-047",
    "topicId": "ataturk-ilke-inkilap",
    "front": "Milliyetçilik",
    "back": "Milliyetçilik, Atatürk İlke ve İnkılapları konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Atatürk İlke ve İnkılapları başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "ataturk-ilke-inkilap",
      "Milliyetçilik"
    ]
  },
  {
    "id": "fc-048",
    "topicId": "ataturk-ilke-inkilap",
    "front": "Halkçılık",
    "back": "Halkçılık ayrıcalıkların reddi ve kanun önünde eşitliktir.",
    "hint": "Atatürk İlke ve İnkılapları başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "ataturk-ilke-inkilap",
      "Halkçılık"
    ]
  },
  {
    "id": "fc-049",
    "topicId": "ataturk-ilke-inkilap",
    "front": "Devletçilik",
    "back": "Devletçilik özel girişimi yok saymadan devletin kalkınmada düzenleyici rolünü vurgular.",
    "hint": "Atatürk İlke ve İnkılapları başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "ataturk-ilke-inkilap",
      "Devletçilik"
    ]
  },
  {
    "id": "fc-050",
    "topicId": "ataturk-ilke-inkilap",
    "front": "Laiklik",
    "back": "Laiklik din ve devlet işlerinin ayrılması, hukuk ve eğitimde akılcı düzenle ilgilidir.",
    "hint": "Atatürk İlke ve İnkılapları başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "ataturk-ilke-inkilap",
      "Laiklik"
    ]
  },
  {
    "id": "fc-051",
    "topicId": "cumhuriyet-dis-politika",
    "front": "Lozan",
    "back": "Lozan, Cumhuriyet Dönemi Dış Politika konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Cumhuriyet Dönemi Dış Politika başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "cumhuriyet-dis-politika",
      "Lozan"
    ]
  },
  {
    "id": "fc-052",
    "topicId": "cumhuriyet-dis-politika",
    "front": "Musul",
    "back": "Musul sorunu İngiltere ile yaşanmış ve 1926 Ankara Antlaşması ile sonuçlanmıştır.",
    "hint": "Cumhuriyet Dönemi Dış Politika başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "cumhuriyet-dis-politika",
      "Musul"
    ]
  },
  {
    "id": "fc-053",
    "topicId": "cumhuriyet-dis-politika",
    "front": "Yabancı okullar",
    "back": "Yabancı okullar, Cumhuriyet Dönemi Dış Politika konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Cumhuriyet Dönemi Dış Politika başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "cumhuriyet-dis-politika",
      "Yabancı okullar"
    ]
  },
  {
    "id": "fc-054",
    "topicId": "cumhuriyet-dis-politika",
    "front": "Montrö",
    "back": "Montrö Boğazlar üzerindeki Türk egemenliğini güçlendirmiştir.",
    "hint": "Cumhuriyet Dönemi Dış Politika başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "cumhuriyet-dis-politika",
      "Montrö"
    ]
  },
  {
    "id": "fc-055",
    "topicId": "cumhuriyet-dis-politika",
    "front": "Hatay",
    "back": "Hatay sorunu Atatürk döneminde gündeme gelmiş, 1939’da Türkiye’ye katılmıştır.",
    "hint": "Cumhuriyet Dönemi Dış Politika başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "cumhuriyet-dis-politika",
      "Hatay"
    ]
  },
  {
    "id": "fc-056",
    "topicId": "cagdas-turk-dunya",
    "front": "I. Dünya Savaşı",
    "back": "Birleşmiş Milletler II. Dünya Savaşı sonrasında kurulmuştur.",
    "hint": "Çağdaş Türk ve Dünya Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "cagdas-turk-dunya",
      "I. Dünya Savaşı"
    ]
  },
  {
    "id": "fc-057",
    "topicId": "cagdas-turk-dunya",
    "front": "II. Dünya Savaşı",
    "back": "Birleşmiş Milletler II. Dünya Savaşı sonrasında kurulmuştur.",
    "hint": "Çağdaş Türk ve Dünya Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "cagdas-turk-dunya",
      "II. Dünya Savaşı"
    ]
  },
  {
    "id": "fc-058",
    "topicId": "cagdas-turk-dunya",
    "front": "Soğuk Savaş",
    "back": "Soğuk Savaş ABD ve SSCB merkezli iki kutuplu düzeni ifade eder.",
    "hint": "Çağdaş Türk ve Dünya Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "cagdas-turk-dunya",
      "Soğuk Savaş"
    ]
  },
  {
    "id": "fc-059",
    "topicId": "cagdas-turk-dunya",
    "front": "NATO",
    "back": "Türkiye 1952’de NATO’ya üye olmuştur.",
    "hint": "Çağdaş Türk ve Dünya Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "cagdas-turk-dunya",
      "NATO"
    ]
  },
  {
    "id": "fc-060",
    "topicId": "cagdas-turk-dunya",
    "front": "BM",
    "back": "BM, Çağdaş Türk ve Dünya Tarihi konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Çağdaş Türk ve Dünya Tarihi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "cagdas-turk-dunya",
      "BM"
    ]
  },
  {
    "id": "fc-061",
    "topicId": "tarih-metodu-kronoloji",
    "front": "kronoloji",
    "back": "Kronoloji sorularında yılları ezberlemek kadar olayların neden-sonuç sırası önemlidir.",
    "hint": "Tarih Metodu ve Kronoloji Becerisi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "tarih-metodu-kronoloji",
      "kronoloji"
    ]
  },
  {
    "id": "fc-062",
    "topicId": "tarih-metodu-kronoloji",
    "front": "neden-sonuç",
    "back": "Kronoloji sorularında yılları ezberlemek kadar olayların neden-sonuç sırası önemlidir.",
    "hint": "Tarih Metodu ve Kronoloji Becerisi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "tarih-metodu-kronoloji",
      "neden-sonuç"
    ]
  },
  {
    "id": "fc-063",
    "topicId": "tarih-metodu-kronoloji",
    "front": "belge-olay",
    "back": "belge-olay, Tarih Metodu ve Kronoloji Becerisi konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Tarih Metodu ve Kronoloji Becerisi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "tarih-metodu-kronoloji",
      "belge-olay"
    ]
  },
  {
    "id": "fc-064",
    "topicId": "tarih-metodu-kronoloji",
    "front": "soru kökü",
    "back": "Tarih sorularında doğru cevap çoğu zaman dönem-sonuç uyumuyla bulunur.",
    "hint": "Tarih Metodu ve Kronoloji Becerisi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "tarih-metodu-kronoloji",
      "soru kökü"
    ]
  },
  {
    "id": "fc-065",
    "topicId": "tarih-metodu-kronoloji",
    "front": "çeldirici",
    "back": "çeldirici, Tarih Metodu ve Kronoloji Becerisi konusunun KPSS’de ayırt edici kavramlarından biridir; dönem, kurum ve sonuç ilişkisiyle öğrenilmelidir.",
    "hint": "Tarih Metodu ve Kronoloji Becerisi başlığında hangi dönem/kurum/sonuçla ilişkilidir?",
    "tags": [
      "tarih-metodu-kronoloji",
      "çeldirici"
    ]
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    "id": "ev-001",
    "date": "MÖ 220",
    "title": "Asya Hun Devleti Orta Asya’da siyasi güç haline geldi",
    "description": "Asya Hun Devleti Orta Asya’da siyasi güç haline geldi.",
    "topicId": "islamiyet-oncesi",
    "tone": "turquoise"
  },
  {
    "id": "ev-002",
    "date": "MÖ 209",
    "title": "Mete Han onlu askeri sistemi güçlendirdi",
    "description": "Mete Han onlu askeri sistemi güçlendirdi.",
    "topicId": "islamiyet-oncesi",
    "tone": "parchment"
  },
  {
    "id": "ev-003",
    "date": "375",
    "title": "Kavimler Göçü Avrupa’nın siyasi yapısını değiştirdi",
    "description": "Kavimler Göçü Avrupa’nın siyasi yapısını değiştirdi.",
    "topicId": "islamiyet-oncesi",
    "tone": "turquoise"
  },
  {
    "id": "ev-004",
    "date": "552",
    "title": "I",
    "description": "I. Göktürk Devleti kuruldu.",
    "topicId": "islamiyet-oncesi",
    "tone": "parchment"
  },
  {
    "id": "ev-005",
    "date": "681",
    "title": "II",
    "description": "II. Göktürk / Kutluk Devleti kuruldu.",
    "topicId": "islamiyet-oncesi",
    "tone": "turquoise"
  },
  {
    "id": "ev-006",
    "date": "744",
    "title": "Uygur Devleti kuruldu ve yerleşik kültür hızlandı",
    "description": "Uygur Devleti kuruldu ve yerleşik kültür hızlandı.",
    "topicId": "islamiyet-oncesi",
    "tone": "parchment"
  },
  {
    "id": "ev-007",
    "date": "751",
    "title": "Talas Savaşı Türklerin İslam dünyasıyla yakınlaşmasını hızlandırdı",
    "description": "Talas Savaşı Türklerin İslam dünyasıyla yakınlaşmasını hızlandırdı.",
    "topicId": "turk-islam",
    "tone": "parchment"
  },
  {
    "id": "ev-008",
    "date": "840",
    "title": "Karahanlılar ilk Müslüman Türk devleti olarak öne çıktı",
    "description": "Karahanlılar ilk Müslüman Türk devleti olarak öne çıktı.",
    "topicId": "turk-islam",
    "tone": "turquoise"
  },
  {
    "id": "ev-009",
    "date": "963",
    "title": "Gazneliler Hindistan seferleriyle tanındı",
    "description": "Gazneliler Hindistan seferleriyle tanındı.",
    "topicId": "turk-islam",
    "tone": "parchment"
  },
  {
    "id": "ev-010",
    "date": "1040",
    "title": "Dandanakan Savaşı Büyük Selçuklu Devleti’nin kuruluşunu kesinleştirdi",
    "description": "Dandanakan Savaşı Büyük Selçuklu Devleti’nin kuruluşunu kesinleştirdi.",
    "topicId": "turk-islam",
    "tone": "turquoise"
  },
  {
    "id": "ev-011",
    "date": "1071",
    "title": "Malazgirt Zaferi Anadolu’nun kapılarını Türklere açtı",
    "description": "Malazgirt Zaferi Anadolu’nun kapılarını Türklere açtı.",
    "topicId": "turk-islam",
    "tone": "parchment"
  },
  {
    "id": "ev-012",
    "date": "1075",
    "title": "Türkiye Selçuklu Devleti’nin kuruluş süreci başladı",
    "description": "Türkiye Selçuklu Devleti’nin kuruluş süreci başladı.",
    "topicId": "anadolu-selcuklu",
    "tone": "gold"
  },
  {
    "id": "ev-013",
    "date": "1096-1270",
    "title": "Haçlı Seferleri Anadolu ve Akdeniz dünyasını etkiledi",
    "description": "Haçlı Seferleri Anadolu ve Akdeniz dünyasını etkiledi.",
    "topicId": "anadolu-selcuklu",
    "tone": "crimson"
  },
  {
    "id": "ev-014",
    "date": "1176",
    "title": "Miryokefalon Savaşı Anadolu’nun Türk yurdu oluşunu kesinleştirdi",
    "description": "Miryokefalon Savaşı Anadolu’nun Türk yurdu oluşunu kesinleştirdi.",
    "topicId": "anadolu-selcuklu",
    "tone": "gold"
  },
  {
    "id": "ev-015",
    "date": "1243",
    "title": "Kösedağ Savaşı Moğol baskısını ve beyliklerin güçlenmesini getirdi",
    "description": "Kösedağ Savaşı Moğol baskısını ve beyliklerin güçlenmesini getirdi.",
    "topicId": "anadolu-selcuklu",
    "tone": "crimson"
  },
  {
    "id": "ev-016",
    "date": "1299",
    "title": "Osmanlı Beyliği’nin kuruluş süreci",
    "description": "Osmanlı Beyliği’nin kuruluş süreci.",
    "topicId": "osmanli-kurulus-yukselis",
    "tone": "gold"
  },
  {
    "id": "ev-017",
    "date": "1353",
    "title": "Çimpe Kalesi ile Rumeli’ye geçiş",
    "description": "Çimpe Kalesi ile Rumeli’ye geçiş.",
    "topicId": "osmanli-kurulus-yukselis",
    "tone": "crimson"
  },
  {
    "id": "ev-018",
    "date": "1453",
    "title": "İstanbul’un fethi",
    "description": "İstanbul’un fethi.",
    "topicId": "osmanli-kurulus-yukselis",
    "tone": "gold"
  },
  {
    "id": "ev-019",
    "date": "1517",
    "title": "Mısır seferiyle hilafet ve kutsal emanetler meselesi",
    "description": "Mısır seferiyle hilafet ve kutsal emanetler meselesi.",
    "topicId": "osmanli-kurulus-yukselis",
    "tone": "crimson"
  },
  {
    "id": "ev-020",
    "date": "Klasik dönem",
    "title": "Merkez ve taşra düzeni olgunlaştı",
    "description": "Merkez ve taşra düzeni olgunlaştı.",
    "topicId": "osmanli-kultur-medeniyet",
    "tone": "gold"
  },
  {
    "id": "ev-021",
    "date": "XVII. yy",
    "title": "Tımar ve merkezî kurumlarda bozulma belirtileri arttı",
    "description": "Tımar ve merkezî kurumlarda bozulma belirtileri arttı.",
    "topicId": "osmanli-kultur-medeniyet",
    "tone": "crimson"
  },
  {
    "id": "ev-022",
    "date": "1699",
    "title": "Karlofça ile batıda ilk büyük toprak kaybı",
    "description": "Karlofça ile batıda ilk büyük toprak kaybı.",
    "topicId": "osmanli-duraklama-gerileme",
    "tone": "crimson"
  },
  {
    "id": "ev-023",
    "date": "1718",
    "title": "Pasarofça ve Lale Devri",
    "description": "Pasarofça ve Lale Devri.",
    "topicId": "osmanli-duraklama-gerileme",
    "tone": "gold"
  },
  {
    "id": "ev-024",
    "date": "1793",
    "title": "Nizam-ı Cedid düzenlemeleri",
    "description": "Nizam-ı Cedid düzenlemeleri.",
    "topicId": "osmanli-duraklama-gerileme",
    "tone": "crimson"
  },
  {
    "id": "ev-025",
    "date": "1808",
    "title": "Sened-i İttifak",
    "description": "Sened-i İttifak.",
    "topicId": "osmanli-yenilesme",
    "tone": "turquoise"
  },
  {
    "id": "ev-026",
    "date": "1839",
    "title": "Tanzimat Fermanı",
    "description": "Tanzimat Fermanı.",
    "topicId": "osmanli-yenilesme",
    "tone": "parchment"
  },
  {
    "id": "ev-027",
    "date": "1856",
    "title": "Islahat Fermanı",
    "description": "Islahat Fermanı.",
    "topicId": "osmanli-yenilesme",
    "tone": "turquoise"
  },
  {
    "id": "ev-028",
    "date": "1876",
    "title": "Kanun-i Esasi ve I",
    "description": "Kanun-i Esasi ve I. Meşrutiyet.",
    "topicId": "osmanli-yenilesme",
    "tone": "parchment"
  },
  {
    "id": "ev-029",
    "date": "1908",
    "title": "II",
    "description": "II. Meşrutiyet.",
    "topicId": "osmanli-yenilesme",
    "tone": "turquoise"
  },
  {
    "id": "ev-030",
    "date": "1918",
    "title": "Mondros Ateşkes Antlaşması",
    "description": "Mondros Ateşkes Antlaşması.",
    "topicId": "milli-mucadele-hazirlik",
    "tone": "crimson"
  },
  {
    "id": "ev-031",
    "date": "19 Mayıs 1919",
    "title": "Mustafa Kemal Samsun’a çıktı",
    "description": "Mustafa Kemal Samsun’a çıktı.",
    "topicId": "milli-mucadele-hazirlik",
    "tone": "gold"
  },
  {
    "id": "ev-032",
    "date": "22 Haziran 1919",
    "title": "Amasya Genelgesi",
    "description": "Amasya Genelgesi.",
    "topicId": "milli-mucadele-hazirlik",
    "tone": "crimson"
  },
  {
    "id": "ev-033",
    "date": "23 Temmuz 1919",
    "title": "Erzurum Kongresi",
    "description": "Erzurum Kongresi.",
    "topicId": "milli-mucadele-hazirlik",
    "tone": "gold"
  },
  {
    "id": "ev-034",
    "date": "4 Eylül 1919",
    "title": "Sivas Kongresi",
    "description": "Sivas Kongresi.",
    "topicId": "milli-mucadele-hazirlik",
    "tone": "crimson"
  },
  {
    "id": "ev-035",
    "date": "23 Nisan 1920",
    "title": "TBMM açıldı",
    "description": "TBMM açıldı.",
    "topicId": "milli-mucadele-hazirlik",
    "tone": "gold"
  },
  {
    "id": "ev-036",
    "date": "1920",
    "title": "Gümrü Antlaşması",
    "description": "Gümrü Antlaşması.",
    "topicId": "kurtulus-savasi",
    "tone": "gold"
  },
  {
    "id": "ev-037",
    "date": "1921",
    "title": "I",
    "description": "I. ve II. İnönü; Sakarya.",
    "topicId": "kurtulus-savasi",
    "tone": "crimson"
  },
  {
    "id": "ev-038",
    "date": "1922",
    "title": "Büyük Taarruz ve Mudanya",
    "description": "Büyük Taarruz ve Mudanya.",
    "topicId": "kurtulus-savasi",
    "tone": "gold"
  },
  {
    "id": "ev-039",
    "date": "1923",
    "title": "Lozan Barış Antlaşması",
    "description": "Lozan Barış Antlaşması.",
    "topicId": "kurtulus-savasi",
    "tone": "crimson"
  },
  {
    "id": "ev-040",
    "date": "1922",
    "title": "Saltanat kaldırıldı",
    "description": "Saltanat kaldırıldı.",
    "topicId": "ataturk-ilke-inkilap",
    "tone": "gold"
  },
  {
    "id": "ev-041",
    "date": "1923",
    "title": "Cumhuriyet ilan edildi",
    "description": "Cumhuriyet ilan edildi.",
    "topicId": "ataturk-ilke-inkilap",
    "tone": "crimson"
  },
  {
    "id": "ev-042",
    "date": "1924",
    "title": "Halifelik kaldırıldı; Tevhid-i Tedrisat kabul edildi",
    "description": "Halifelik kaldırıldı; Tevhid-i Tedrisat kabul edildi.",
    "topicId": "ataturk-ilke-inkilap",
    "tone": "gold"
  },
  {
    "id": "ev-043",
    "date": "1926",
    "title": "Türk Medeni Kanunu kabul edildi",
    "description": "Türk Medeni Kanunu kabul edildi.",
    "topicId": "ataturk-ilke-inkilap",
    "tone": "crimson"
  },
  {
    "id": "ev-044",
    "date": "1928",
    "title": "Harf İnkılabı",
    "description": "Harf İnkılabı.",
    "topicId": "ataturk-ilke-inkilap",
    "tone": "gold"
  },
  {
    "id": "ev-045",
    "date": "1926",
    "title": "Musul sorunu Ankara Antlaşması ile çözüldü",
    "description": "Musul sorunu Ankara Antlaşması ile çözüldü.",
    "topicId": "cumhuriyet-dis-politika",
    "tone": "turquoise"
  },
  {
    "id": "ev-046",
    "date": "1934",
    "title": "Balkan Antantı",
    "description": "Balkan Antantı.",
    "topicId": "cumhuriyet-dis-politika",
    "tone": "parchment"
  },
  {
    "id": "ev-047",
    "date": "1936",
    "title": "Montrö Boğazlar Sözleşmesi",
    "description": "Montrö Boğazlar Sözleşmesi.",
    "topicId": "cumhuriyet-dis-politika",
    "tone": "turquoise"
  },
  {
    "id": "ev-048",
    "date": "1937",
    "title": "Sadabat Paktı",
    "description": "Sadabat Paktı.",
    "topicId": "cumhuriyet-dis-politika",
    "tone": "parchment"
  },
  {
    "id": "ev-049",
    "date": "1939",
    "title": "Hatay Türkiye’ye katıldı",
    "description": "Hatay Türkiye’ye katıldı.",
    "topicId": "cumhuriyet-dis-politika",
    "tone": "turquoise"
  },
  {
    "id": "ev-050",
    "date": "1914-1918",
    "title": "I",
    "description": "I. Dünya Savaşı.",
    "topicId": "cagdas-turk-dunya",
    "tone": "crimson"
  },
  {
    "id": "ev-051",
    "date": "1939-1945",
    "title": "II",
    "description": "II. Dünya Savaşı.",
    "topicId": "cagdas-turk-dunya",
    "tone": "gold"
  },
  {
    "id": "ev-052",
    "date": "1945 sonrası",
    "title": "Soğuk Savaş iki kutuplu düzeni şekillendirdi",
    "description": "Soğuk Savaş iki kutuplu düzeni şekillendirdi.",
    "topicId": "cagdas-turk-dunya",
    "tone": "crimson"
  },
  {
    "id": "ev-053",
    "date": "1952",
    "title": "Türkiye NATO’ya üye oldu",
    "description": "Türkiye NATO’ya üye oldu.",
    "topicId": "cagdas-turk-dunya",
    "tone": "gold"
  },
  {
    "id": "ev-054",
    "date": "Çalışma yöntemi",
    "title": "Kavram, dönem ve sonuç üçlüsüyle analiz",
    "description": "Kavram, dönem ve sonuç üçlüsüyle analiz.",
    "topicId": "tarih-metodu-kronoloji",
    "tone": "crimson"
  }
];

export const exams: Exam[] = [
  {
    "id": "genel-temel",
    "title": "Genel KPSS Tarih Temel Denemesi",
    "durationMinutes": 35,
    "questionIds": [
      "q-001",
      "q-004",
      "q-007",
      "q-010",
      "q-011",
      "q-014",
      "q-017",
      "q-020",
      "q-021",
      "q-024",
      "q-027",
      "q-030",
      "q-031",
      "q-034",
      "q-037",
      "q-039",
      "q-042",
      "q-045",
      "q-047",
      "q-050",
      "q-053",
      "q-055",
      "q-058",
      "q-061",
      "q-063",
      "q-066",
      "q-069",
      "q-071",
      "q-074",
      "q-077"
    ],
    "description": "Temel seviye açıklamalı KPSS Tarih denemesi."
  },
  {
    "id": "genel-orta",
    "title": "Genel KPSS Tarih Orta Denemesi",
    "durationMinutes": 35,
    "questionIds": [
      "q-002",
      "q-005",
      "q-008",
      "q-012",
      "q-015",
      "q-018",
      "q-022",
      "q-025",
      "q-028",
      "q-032",
      "q-035",
      "q-038",
      "q-040",
      "q-043",
      "q-046",
      "q-048",
      "q-051",
      "q-054",
      "q-056",
      "q-059",
      "q-062",
      "q-064",
      "q-067",
      "q-070",
      "q-072",
      "q-075",
      "q-078",
      "q-080",
      "q-083",
      "q-086"
    ],
    "description": "Orta seviye açıklamalı KPSS Tarih denemesi."
  },
  {
    "id": "genel-ileri",
    "title": "Genel KPSS Tarih Ileri Denemesi",
    "durationMinutes": 35,
    "questionIds": [
      "q-003",
      "q-006",
      "q-009",
      "q-013",
      "q-016",
      "q-019",
      "q-023",
      "q-026",
      "q-029",
      "q-033",
      "q-036",
      "q-041",
      "q-044",
      "q-049",
      "q-052",
      "q-057",
      "q-060",
      "q-065",
      "q-068",
      "q-073",
      "q-076",
      "q-081",
      "q-084",
      "q-089",
      "q-092",
      "q-097",
      "q-100",
      "q-105",
      "q-108",
      "q-110"
    ],
    "description": "Ileri seviye açıklamalı KPSS Tarih denemesi."
  }
];

export const recommendations: StudyRecommendation[] = [
  {
    "id": "rec-1",
    "title": "Bugünün 25 dakikalık kronoloji turu",
    "description": "Sened-i İttifak, Tanzimat, Islahat, Kanun-i Esasi, Mudanya, Lozan ve Montrö sıralamalarını aktif hatırlama ile tekrar et.",
    "href": "/timeline",
    "minutes": 25,
    "priority": "yüksek"
  },
  {
    "id": "rec-2",
    "title": "Yanlış yaptığın kavramları kartlaştır",
    "description": "Put Kırıcı, kut, töre, tımar, ikta, ahilik ve meşrutiyet kavramlarını flashcard modunda tekrar et.",
    "href": "/flashcards",
    "minutes": 18,
    "priority": "orta"
  },
  {
    "id": "rec-3",
    "title": "Karma açıklamalı test çöz",
    "description": "Her dönemden seçilmiş sorularla dönem-sonuç ve kavram eşleştirme gücünü ölç.",
    "href": "/question-bank/all",
    "minutes": 35,
    "priority": "yüksek"
  }
];


export const glossary = flashcards.map((card, index) => ({
  id: `glossary-${index + 1}`,
  topicId: card.topicId,
  term: card.front,
  definition: card.back,
  tags: card.tags,
}));

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

export function getTimelineEventsByTopic(topicId: string) {
  return timelineEvents.filter((event) => event.topicId === topicId);
}

export function getGlossaryByTopic(topicId: string) {
  return glossary.filter((item) => item.topicId === topicId || item.tags?.includes(topicId));
}

export function searchKnowledgeBase(query: string) {
  const normalized = query.toLocaleLowerCase("tr-TR").trim();
  if (!normalized) return [];

  const topicHits = topics
    .filter((topic) => {
      const haystack = [topic.title, topic.shortDescription, ...topic.keywords, ...topic.mustKnow, ...topic.commonMistakes, ...topic.summary.flatMap((block) => [block.heading, block.body, ...block.bullets])]
        .join(" ")
        .toLocaleLowerCase("tr-TR");
      return haystack.includes(normalized) || normalized.split(/\s+/).some((token) => token.length > 3 && haystack.includes(token));
    })
    .map((topic) => ({ type: "topic" as const, id: topic.id, title: topic.title, body: topic.summary.map((block) => `${block.heading}: ${block.body}`).join("\n") }));

  const questionHits = questions
    .filter((question) => [question.stem, question.explanation, question.examTip, ...question.tags].join(" ").toLocaleLowerCase("tr-TR").includes(normalized))
    .map((question) => ({ type: "question" as const, id: question.id, title: question.stem, body: question.explanation }));

  const cardHits = flashcards
    .filter((card) => [card.front, card.back, card.hint, ...card.tags].join(" ").toLocaleLowerCase("tr-TR").includes(normalized))
    .map((card) => ({ type: "flashcard" as const, id: card.id, title: card.front, body: card.back }));

  return [...topicHits, ...questionHits, ...cardHits].slice(0, 12);
}
