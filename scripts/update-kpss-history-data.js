const fs = require("fs");
const path = require("path");

console.log("[Local Data Hydrator] kpss-history.ts zenginleştiriliyor...");

const newHistoryContent = `import type {
  Exam,
  Flashcard,
  Question,
  StudyRecommendation,
  TimelineEvent,
  Topic,
} from "@/types/study";
import { staticQuestions } from "./static-questions";
import { staticFlashcards } from "./static-flashcards";

export const topics: Topic[] = [
  {
    id: "t1",
    slug: "islamiyet-oncesi-turk-tarihi",
    title: "İslamiyet Öncesi Türk Tarihi",
    era: "islamiyet-oncesi",
    shortDescription: "İlk Türk devletleri, bozkır kültürü, töre, kut anlayışı, kurultay yapısı ve sosyal organizasyon.",
    examImportance: 86,
    estimatedMinutes: 45,
    keywords: ["kut", "töre", "kurultay", "ikili teşkilat", "Orhun Yazıtları", "balbal", "kurgan", "yuğ", "kam", "sagu", "koşuk", "uygurlar", "hunlar", "göktürkler", "maniheizm", "yerleşik yaşam"],
    quickTimeline: [
      { date: "MÖ 220", event: "Asya Hun Devleti'nin kuruluşu" },
      { date: "552", event: "I. Kök Türk Devleti'nin kuruluşu" },
      { date: "744", event: "Uygur Devleti'nin yerleşik hayata geçişi" },
      { date: "732-735", event: "Orhun Yazıtları'nın dikilmesi" }
    ],
    summary: [
      {
        heading: "Devlet Yönetimi ve Kut İnancı",
        body: "İlk Türk devletlerinde yönetme yetkisinin Tanrı tarafından hükümdara verildiğine (Kut) inanılırdı. Kut kan yoluyla tüm hanedan üyelerine geçtiği için ülke hanedanın ortak malı kabul edilir ve bu durum taht kavgalarına yol açardı. Devlet doğu ve batı olarak ikili teşkilat ile yönetilir; kutsal doğuda kağan bulunurken, batıyı yabgu unvanıyla kağanın kardeşi idare ederdi.",
        bullets: [
          "Kut yetkisi hükümdara karizma, meşruiyet ve siyasi güç kazandırır.",
          "Veraset sistemi belirsizdir, bu durum devletlerin kısa sürede bölünmesine yol açmıştır.",
          "Devlet işleri danışma meclisi niteliğindeki Kurultay'da (Toy) görüşülürdü."
        ]
      },
      {
        heading: "Hukuk, Sosyal Hayat ve Kültür",
        body: "İlk Türklerde yazısız hukuk kurallarına Töre denirdi. Töre; örf, adet ve kurultay kararlarıyla şekillenirdi ve hükümdar dahil herkes töreye uymak zorundaydı. Toplum yapısı sırasıyla aile (oguş), sülale (urug), boy (bod), millet (budun) ve devlet (il) şeklinde örgütlenmişti. Göçebe hayatın etkisiyle hapis cezaları kısa süreli olmuş ve savaşçı, dayanıklı bir ordu yapısı (onlu teşkilat) gelişmiştir.",
        bullets: [
          "Töre kuralları adalet, eşitlik, iyilik ve insanlık gibi değişmez ilkelere sahipti.",
          "Uygurlar Maniheizm dinini kabul ederek yerleşik hayata geçen, tarım ve mimariyi başlatan ilk Türk devletidir.",
          "Sanatta taşınabilir eşyalar üzerinde hayvan üslubu (hayvan figürleri) kullanılmıştır."
        ]
      }
    ],
    mustKnow: [
      "Kut anlayışı ve taht kavgalarının neden-sonuç ilişkisi",
      "Töre kurallarının bağlayıcılığı ve içeriği",
      "Uygurların Maniheizm ile yaşadığı kültürel ve ekonomik dönüşüm",
      "Orhun Yazıtları'nın ilk Türkçe yazılı kaynak olma özelliği ve içeriği"
    ],
    commonMistakes: [
      "İlk Türk devletlerinde düzenli ve sürekli bir veraset sisteminin olduğunu sanmak (veraset belirsizdir).",
      "Uygurlardan önce kalıcı mimari eserler ve yazılı kütüphanelerin yaygın olduğunu düşünmek (yerleşik yaşam Uygurlarla başlamıştır)."
    ]
  },
  {
    id: "t2",
    slug: "turk-islam-tarihi",
    title: "Türk-İslam Tarihi",
    era: "turk-islam",
    shortDescription: "Karahanlı, Gazneli, Büyük Selçuklu devletleri ve Türk-İslam medeniyetinin kurumsal altyapısı.",
    examImportance: 84,
    estimatedMinutes: 48,
    keywords: ["Karahanlılar", "Gazneliler", "Büyük Selçuklu", "ikta", "Nizamiye", "Talas Savaşı", "Dandanakan", "Malazgirt", "gulam", "atabey", "divan-ı saltanat", "kutadgu bilig", "ribat", "bimaristan"],
    quickTimeline: [
      { date: "751", event: "Talas Savaşı ile Türklerin İslamiyet'e geçişinin hızlanması" },
      { date: "840", event: "İlk Müslüman Türk devleti olan Karahanlıların kuruluşu" },
      { date: "1040", event: "Dandanakan Savaşı ile Büyük Selçuklu'nun kurulması" },
      { date: "1071", event: "Malazgirt Savaşı ile Anadolu kapılarının açılması" }
    ],
    summary: [
      {
        heading: "İlk Türk-İslam Devletleri ve Gelişimi",
        body: "751 Talas Savaşı'nda Karluk Türklerinin Çin'e karşı Abbasileri desteklemesiyle Türk-İslam tarihi başlamıştır. Orta Asya'da kurulan ilk Müslüman Türk devleti Karahanlılar'dır. Karahanlılar resmi dili Türkçe yaparak milli benliklerini korumuş, ribat adı verilen kervansaraylar ve bimaristan hastaneleri açmışlardır. Gazneliler ise Hindistan'a 17 sefer düzenleyerek İslamiyet'i buraya yaymış ve tarihte Sultan unvanını alan ilk hükümdar Sultan Mahmut olmuştur.",
        bullets: [
          "Karahanlılar döneminde Kutadgu Bilig, Divanü Lugati't-Türk gibi ilk edebi eserler yazılmıştır.",
          "Gazneliler çok uluslu yapıları nedeniyle Selçuklular karşısında Dandanakan Savaşı'nda yenilerek yıkılmıştır.",
          "Büyük Selçuklular, Tuğrul Bey döneminde Bağdat Seferi ile İslam dünyasının siyasi lideri olmuştur."
        ]
      },
      {
        heading: "Türk-İslam Devlet Teşkilatı ve Kurumlar",
        body: "Devlet işleri Divan-ı Saltanat'ta görüşülürdü. Maliye için Divan-ı İstifa, askeri işler için Divan-ı Arz, yazışmalar için Divan-ı İnşa ve denetim için Divan-ı İşraf bulunurdu. Askeri ve idari yapı, toprak gelirlerinin hizmet karşılığı dağıtılması esasına dayanan İkta Sistemi ve esirlerin asker yetiştirilmesini sağlayan Gulam Sistemi ile güçlendirilmiştir. Şehzadeleri eğitmekle görevli öğretmenlere Atabey adı verilirdi.",
        bullets: [
          "Nizamiye Medreseleri Şii Batınilik faaliyetlerine karşı fikri mücadele vermek ve memur yetiştirmek için açılmıştır.",
          "Adalet şer'i (başında kadılkudat) ve örfi (başında emir-i dad) olarak ikiye ayrılmıştır.",
          "Hükümdarlık alameti olarak hutbe okutulur, para bastırılır, tıraz ve çetr gönderilirdi."
        ]
      }
    ],
    mustKnow: [
      "Talas Savaşı'nın kültürel ve dini sonuçları",
      "Karahanlıların Türkçeyi resmi dil ilan etmesi ve ulusal kimlik vurgusu",
      "İkta sisteminin askeri, mali ve tarımsal üretimdeki faydaları",
      "Malazgirt Savaşı'nın Anadolu'nun Türkleşmesindeki tarihi önemi"
    ],
    commonMistakes: [
      "İkta sisteminde toprağın mülkiyetinin şahıslara ait olduğunu sanmak (Mülkiyet devlete, vergi geliri görevliye aittir).",
      "Tuğrul Bey'in halifeyi kurtarmasıyla halifelik makamının Selçuklulara geçtiğini düşünmek (Halifelik Abbasilerde kalmış, Selçuklu sadece siyasi lider olmuştur)."
    ]
  },
  {
    id: "t3",
    slug: "anadolu-selcuklu-ve-beylikler",
    title: "Anadolu Selçuklu ve Beylikler",
    era: "turk-islam",
    shortDescription: "Anadolu'nun Türkleşmesi, I. ve II. Beylikler, Miryokefalon ve Kösedağ savaşları ile Ahilik teşkilatı.",
    examImportance: 78,
    estimatedMinutes: 40,
    keywords: ["kervansaray", "ahilik", "mirî arazi", "Kösedağ", "beylikler", "Miryokefalon", "Danişmentliler", "Saltuklular", "Mengücekliler", "Artuklular", "Çaka Bey", "Yassıçemen", "Babailer İsyanı"],
    quickTimeline: [
      { date: "1071", event: "Malazgirt sonrası Anadolu'da ilk Türk beyliklerinin kurulması" },
      { date: "1075", event: "Süleyman Şah tarafından İznik merkezli Anadolu Selçuklu'nun kurulması" },
      { date: "1176", event: "Miryokefalon Savaşı ile Anadolu'nun kesin Türk yurdu olması" },
      { date: "1243", event: "Kösedağ Savaşı ile Anadolu'da Moğol hakimiyetinin başlaması" }
    ],
    summary: [
      {
        heading: "Anadolu'da Siyasi Süreç ve Savaşlar",
        body: "Malazgirt zaferinden sonra Anadolu'da Saltuklular, Danişmentliler, Mengücekliler, Artuklular ve Çaka Beyliği (ilk denizci beylik) gibi I. Dönem beylikleri kurulmuştur. Anadolu Selçuklu Devleti İznik'te kurulmuş, Haçlı Seferleri nedeniyle merkez Konya'ya taşınmıştır. II. Kılıç Arslan döneminde kazanılan Miryokefalon Savaşı ile Anadolu'nun Türk yurdu olduğu kesinleşmiştir. 1243 Kösedağ Savaşı'nda Moğollara yenilen devlet yıkılış sürecine girmiş ve II. Beylikler Dönemi başlamıştır.",
        bullets: [
          "Yassıçemen Savaşı'nda Harzemşahların yenilmesi Moğollarla Selçuklu arasındaki tampon bölgeyi yok etmiştir.",
          "Babailer İsyanı (1240) Selçuklu devletinin zayıfladığını Moğollara kanıtlayan ilk büyük dini-toplumsal isyandır.",
          "Karamanoğlu Mehmet Bey Türkçe'yi resmi dil ilan ederek milli kültüre büyük hizmet etmiştir."
        ]
      },
      {
        heading: "Sosyo-Ekonomik Hayat ve Ahilik Teşkilatı",
        body: "Anadolu Selçuklularında ticaret devlet politikası haline getirilmiştir. Yollar üzerine kervansaraylar yapılmış, tüccarların malları devlet tarafından sigortalanmıştır. Şehirlerde esnaf ve zanaatkarların örgütlendiği Ahilik Teşkilatı kurulmuştur. Ahilik; fiyatları belirler (narh), dükkan açma ruhsatı verir (gedik), esnaf ahlakını denetler ve çırak-kalfa-usta ilişkisiyle meslek eğitimi verirdi. Kadınlar da Bacıyan-ı Rum (Anadolu Kadınları) örgütünü kurmuşlardır.",
        bullets: [
          "Ahilik dini-ahlaki kuralları fütüvvetname adı verilen belgelerle belirlenirdi.",
          "Gevher Nesibe Darüşşifası Kayseri'de açılan ilk büyük tıp medresesi ve hastanesidir.",
          "Selçuklu mimarisinde anıt mezar niteliğindeki kümbetler bozkır çadır kültürünü yansıtır."
        ]
      }
    ],
    mustKnow: [
      "I. Dönem beyliklerinin Anadolu'yu bayındır hale getirmesi (eserler ve medreseler)",
      "Miryokefalon Savaşı'nın tapu senedi niteliğindeki siyasi önemi",
      "Kösedağ Savaşı sonrasında Anadolu'da Türk siyasi birliğinin bozulması",
      "Ahilik teşkilatının esnaf denetimi, narh sistemi ve gedik ruhsatı uygulamaları"
    ],
    commonMistakes: [
      "Malazgirt ile Miryokefalon savaşlarını karıştırmak (Malazgirt kapıyı açar, Miryokefalon tapuyu alır).",
      "Ahilik teşkilatına gayrimüslimlerin üye olabildiğini düşünmek (Ahilik sadece Müslüman esnafa açıktır; Osmanlı lonca sisteminde gayrimüslimler de yer almıştır)."
    ]
  },
  {
    id: "t4",
    slug: "osmanli-kurulus-ve-yukselis",
    title: "Osmanlı Kuruluş ve Yükseliş",
    era: "osmanli",
    shortDescription: "Beylikten devlete geçiş, Balkan fetihleri, iskan siyaseti, İstanbul'un fethi, Mısır seferi ve zirve dönemleri.",
    keywords: ["iskan", "devşirme", "tımar", "İstanbul'un fethi", "merkeziyetçilik", "Çimpe Kalesi", "Ankara Savaşı", "Fetret Devri", "Yavuz Sultan Selim", "halifelik", "Kanuni", "Preveze", "Sokollu"],
    examImportance: 88,
    estimatedMinutes: 52,
    quickTimeline: [
      { date: "1299", event: "Osmanlı Beyliği'nin kuruluşu" },
      { date: "1402", event: "Ankara Savaşı ve Fetret Devri'nin başlaması" },
      { date: "1453", event: "İstanbul'un fethi ve İmparatorluğa geçiş" },
      { date: "1517", event: "Mısır Seferi ile halifeliğin Osmanlı'ya geçmesi" }
    ],
    summary: [
      {
        heading: "Beylikten İmparatorluğa Geçiş ve Balkanlar",
        body: "Osman Bey 1299'da beyliği kurmuş, Bizans'la ilk savaş olan Koyunhisar'ı kazanmıştır. Orhan Bey Bursa'yı alıp başkent yapmış, Çimpe Kalesi'ni alarak Rumeli'ye ilk adımı atmıştır. Balkanlarda kalıcılığı sağlamak için İskan Politikası (Türkmenleri yerleştirme) ve İstimalet Politikası (hoşgörü) uygulanmıştır. I. Murad döneminde Sırpsındığı ve Kosova savaşlarıyla Haçlılar yenilmiş, Yeniçeri Ocağı kurulmuştur. Yıldırım Bayezid'in 1402 Ankara Savaşı'nda Timur'a yenilmesiyle 11 yıllık taht kavgaları dönemi (Fetret Devri) yaşanmıştır.",
        bullets: [
          "I. Mehmed (Çelebi) Fetret Devri'ni bitirdiği için devletin ikinci kurucusu kabul edilir.",
          "II. Kosova Savaşı (1448) ile Balkanların kesin Türk yurdu olduğu kanıtlanmıştır.",
          "Fatih Sultan Mehmed 1453'te İstanbul'u fethederek imparatorluk sürecini ve mutlak merkeziyetçiliği başlatmıştır."
        ]
      },
      {
        heading: "Yükseliş Dönemi ve Dünya Gücü Osmanlı",
        body: "Yavuz Sultan Selim döneminde yapılan Mısır Seferi (Mercidabık ve Ridaniye savaşları) ile Memlük Devleti yıkılmış, kutsal emanetler ve Halifelik makamı Osmanlı padişahlarına geçmiştir. Kanuni Sultan Süleyman döneminde Mohaç zaferiyle Macaristan alınmış, Viyana ilk kez kuşatılmış ve batıda en geniş sınırlara ulaşılmıştır. Barbaros Hayreddin Paşa'nın kazandığı Preveze Deniz Zaferi (1538) ile Akdeniz bir Türk gölü haline gelmiştir. Sokollu Mehmed Paşa'nın ölümüyle yükselme dönemi sona ermiştir.",
        bullets: [
          "Turnadağ Savaşı (1515) ile Anadolu Türk siyasi birliği kesin olarak sağlanmıştır.",
          "İstanbul Antlaşması (1533) ile Avusturya kralı protokolde Osmanlı sadrazamına eşit sayılmıştır.",
          "Sokollu Mehmed Paşa Don-Volga ve Süveyş kanalı projeleriyle jeopolitik stratejiler geliştirmiştir."
        ]
      }
    ],
    mustKnow: [
      "İskan ve istimalet politikalarının Balkan fetihlerindeki kalıcılaştırıcı rolü",
      "Ankara Savaşı'nın Anadolu beyliklerinin canlanmasına ve Fetret Devri'ne yol açan etkileri",
      "İstanbul'un fethinin dünya tarihi ve Osmanlı merkezi otoritesi üzerindeki sonuçları",
      "Mısır Seferi'nin halifelik, ticaret yolları ve hazine gelirleri açısından önemi"
    ],
    commonMistakes: [
      "Fetret Devri'nde Rumeli'de büyük toprak kayıpları yaşandığını sanmak (Adaletli istimalet politikası sayesinde Rumeli halkı Osmanlı'ya bağlı kalmıştır).",
      "Preveze Deniz Zaferi ile İnebahtı bozgununu karıştırmak (Preveze zaferdir, İnebahtı ise donanmamızın yakıldığı ilk yenilgidir)."
    ]
  },
  {
    id: "t5",
    slug: "osmanli-kultur-ve-medeniyet",
    title: "Osmanlı Kültür ve Medeniyet",
    era: "osmanli",
    shortDescription: "Merkez-taşra teşkilatı, saray hayatı, hukuk, maliye, toprak sistemi, ordu ve Millet Sistemi.",
    keywords: ["divan", "tımar", "vakıf", "enderun", "millet sistemi", "seyfiye", "ilmiye", "kalemiye", "miri arazi", "defterdar", "nişancı", "kazasker", "cizye", "iltizam", "kadı"],
    examImportance: 92,
    estimatedMinutes: 58,
    quickTimeline: [
      { date: "Klasik dönem", event: "Merkez, eyalet ve taşra yönetim sisteminin olgunlaşması" },
      { date: "XVII. yüzyıl", event: "İltizam ve malikane sisteminin yaygınlaşmasıyla klasik yapının değişmesi" }
    ],
    summary: [
      {
        heading: "Merkez Teşkilatı, Saray ve Divan",
        body: "Osmanlı'da devlet işleri Divan-ı Hümayun'da görüşülürdü. Yönetici sınıf üç gruba ayrılırdı: Seyfiye (askeri/idari yöneticiler: sadrazam, vezirler, komutanlar), İlmiye (din, hukuk, eğitim: şeyhülislam, kadılar, müderrisler, kazasker) ve Kalemiye (maliye ve bürokrasi: defterdar, nişancı, reisülküttab). Saray, padişahın özel hayatının geçtiği Harem, devlet işlerinin yürütüldüğü Birun ve devşirmelerin eğitildiği Enderun mektebinden oluşurdu.",
        bullets: [
          "Kazasker adalet ve eğitim işlerinden sorumlu olup divandaki davalara bakardı.",
          "Nişancı fermanlara tuğra çeker, fethedilen toprakların kayıtlarını Tahrir Defteri'ne işlerdi.",
          "Reisülküttab, klasik dönemde Nişancı'ya bağlı bir katip iken, dış ilişkilerin önem kazanmasıyla dışişleri bakanı olmuştur."
        ]
      },
      {
        heading: "Toprak Sistemi, Ordu, Maliye ve Toplum",
        body: "Toprakların mülkiyeti devlete ait olup bunlara Miri Arazi denirdi. Bu arazilerin vergi gelirleri hizmet karşılığı dirlik (has, zeamet, tımar) olarak dağıtılırdı. Tımar sistemiyle devlet hazinesinden para çıkmadan taşra güvenliğini sağlayan Tımarlı Sipahiler yetiştirilirdi. Ordu, profesyonel merkez askerleri olan Kapıkulu (yeniçeriler) ve taşra askerlerinden oluşurdu. Toplum yapısı, din esasına göre yönetilen Millet Sistemi (Müslümanlar ve gayrimüslimler) üzerine kurulmuştu.",
        bullets: [
          "Vergiler şer'i (öşür, haraç, cizye) ve örfi (avarız - olağanüstü hal vergisi) olarak toplanırdı.",
          "Nakit ihtiyacını karşılamak için vergilerin peşin satılmasına İltizam, ömür boyu kiralanmasına Malikane denirdi.",
          "Taşra idaresinde kazaları yöneten Kadı, hem hakim, hem belediye başkanı hem de mülki amir konumundaydı."
        ]
      }
    ],
    mustKnow: [
      "Seyfiye, ilmiye ve kalemiye sınıflarının divan üyeleri ve görev yetkileri",
      "Tımar sisteminin askeri, ekonomik ve idari faydaları",
      "Millet sisteminin ırk esasına değil, dini inanç esasına dayandığı",
      "İltizam ve malikane sistemlerinin taşradaki merkezi otoriteyi zayıflatıcı etkileri"
    ],
    commonMistakes: [
      "Şeyhülislamın divan kararlarını veto etme veya fetva verme yetkisinin onu padişahtan üstün kıldığını sanmak (Son söz her zaman padişahındır).",
      "Cizye vergisini tüm gayrimüslimlerden alındığını düşünmek (Sadece sağlıklı, askere gidebilecek yetişkin erkeklerden alınır; kadın, çocuk ve din adamları muaftır)."
    ]
  },
  {
    id: "t6",
    slug: "osmanli-yenilesme",
    title: "Osmanlı Yenileşme ve Demokratikleşme",
    era: "yenilesme",
    shortDescription: "Lale Devri ıslahatları, III. Selim ve II. Mahmut reformları, Tanzimat ve Islahat fermanları ile Meşrutiyet süreci.",
    keywords: ["Lale Devri", "Tanzimat", "Islahat", "Kanunuesasi", "Meşrutiyet", "Sened-i İttifak", "II. Mahmut", "vaka-i hayriye", "nizam-ı cedid", "31 Mart Vakası", "Hünkar İskelesi", "Baltalimanı", "Duyun-u Umumiye"],
    examImportance: 90,
    estimatedMinutes: 56,
    quickTimeline: [
      { date: "1718", event: "Lale Devri ile ilk kez batı tarzı sivil yeniliklerin başlaması" },
      { date: "1808", event: "Sened-i İttifak ile padişah yetkilerinin ilk kez sınırlandırılması" },
      { date: "1839", event: "Tanzimat Fermanı ile kanun üstünlüğünün kabul edilmesi" },
      { date: "1876", event: "I. Meşrutiyet ve ilk anayasa Kanun-i Esasi'nin ilanı" }
    ],
    summary: [
      {
        heading: "Yüzyıllara Göre Islahatlar ve Dönemler",
        body: "18. yüzyılda Lale Devri ile ilk kez batının üstünlüğü kabul edilmiş, geçici elçilikler açılmış ve matbaa getirilmiştir. III. Selim, batı tarzı ilk düzenli ordu olan Nizam-ı Cedid'i kurmuş ve kalıcı elçilikleri açmıştır. 19. yüzyılda II. Mahmut, Yeniçeri Ocağı'nı kaldırarak (Vaka-i Hayriye) ıslahatların önünü açmış, muhtarlıkları kurmuş ve bakanlık sistemine geçmiştir. 1808'de imzalanan Sened-i İttifak ile padişahın yetkileri ilk kez yerel güçler (ayanlar) karşısında sınırlandırılmıştır.",
        bullets: [
          "Hünkar İskelesi Antlaşması (1833), Mısır krizinde Rusya'nın desteğini almak için imzalanan ve Boğazlar sorununu başlatan antlaşmadır.",
          "Baltalimanı Ticaret Antlaşması (1838) ile Osmanlı ekonomisi açık pazar haline gelmiş ve yerli sanayi çökmüştür.",
          "Muharrem Kararnamesi ile devletin iflas etmesi üzerine borçların tahsili için Duyun-u Umumiye (1881) kurulmuştur."
        ]
      },
      {
        heading: "Fermanlar, Anayasa ve Meşrutiyet Dönemi",
        body: "1839 Tanzimat Fermanı ile tüm vatandaşların can, mal ve namus güvenliği kanun güvencesine alınmış; kanun üstünlüğü tescillenmiştir. 1856 Islahat Fermanı ise tamamen gayrimüslimlere yönelik haklar vererek Avrupalı devletlerin iç işlerimize karışmasını önlemeyi amaçlamıştır. 1876'da Genç Osmanlıların baskısıyla ilk anayasa Kanun-i Esasi ilan edilmiş ve meşrutiyet rejimine geçilmiştir. Rejime karşı çıkan ilk irticai isyan olan 31 Mart Vakası (1909), Hareket Ordusu tarafından bastırılmıştır.",
        bullets: [
          "Tanzimat ve Islahat fermanlarında yabancı devletlerin baskısı veya iç işlerine müdahale çabaları etkili olmuştur.",
          "II. Meşrutiyet (1908) sonrasında Türk tarihinde ilk kez çok partili siyasi hayata geçilmiştir.",
          "Kanun-i Esasi padişahın meclisi kapatma ve sürgün yetkisi gibi maddelerle demokratik açıdan sınırlı bir anayasadır."
        ]
      }
    ],
    mustKnow: [
      "Batılılaşma hareketlerinin Lale Devri ile askeri olmayan alanda başlaması",
      "II. Mahmut reformlarının devlet idari mekanizmasındaki köklü modernleştirici etkileri",
      "Tanzimat ve Islahat fermanları arasındaki kapsam farkı (Tanzimat herkes, Islahat gayrimüslim odaklıdır)",
      "Kanun-i Esasi'nin ilk anayasa, meclisin açılmasının ise ilk kez halkın yönetime katılması olduğu"
    ],
    commonMistakes: [
      "Sened-i İttifak'ın Avrupalı devletlerin baskısıyla imzalandığını sanmak (Tamamen iç dinamiklerle, ayanlar ve II. Mahmut arasında imzalanmıştır).",
      "Tanzimat Fermanı'nda gayrimüslimlere siyasi veya yönetimsel haklar verildiğini düşünmek (Siyasi haklar ilk kez Islahat fermanı ile belediye ve il genel meclislerine girme hakkıyla tanınmıştır)."
    ]
  },
  {
    id: "t7",
    slug: "milli-mucadele-hazirlik-donemi",
    title: "Milli Mücadele Hazırlık Dönemi",
    era: "milli-mucadele",
    shortDescription: "Mondros Ateşkesi, işgaller, genelgeler, Erzurum ve Sivas kongreleri ile Misakımilli kararları.",
    keywords: ["Mondros", "Amasya Genelgesi", "Sivas Kongresi", "Misakımilli", "Erzurum Kongresi", "Havza Genelgesi", "Temsil Heyeti", "Amasya Görüşmeleri", "Kuvayımilliye", "Amiral Bristol", "cemiyetler"],
    examImportance: 88,
    estimatedMinutes: 50,
    quickTimeline: [
      { date: "30 Ekim 1918", event: "Mondros Ateşkes Antlaşması'nın imzalanması" },
      { date: "19 Mayıs 1919", event: "Mustafa Kemal'in Samsun'a çıkışı" },
      { date: "22 Haziran 1919", event: "Amasya Genelgesi ile milli mücadelenin ilan edilmesi" },
      { date: "28 Ocak 1920", event: "Misakımilli kararlarının Mebusan Meclisi'nde kabulü" }
    ],
    summary: [
      {
        heading: "Ateşkes, İşgaller ve Milli Bilincin Uyanışı",
        body: "I. Dünya Savaşı'nı bitiren 30 Ekim 1918 Mondros Ateşkes Antlaşması ile Anadolu işgale açık hale gelmiştir. Özellikle 7. madde (stratejik noktaların işgali) ve 24. madde (doğu illerinde Ermeni devleti tasarısı) işgallerin hukuki kılıfı olmuştur. İşgallere karşı halk Kuvayımilliye birliklerini ve Müdafaa-i Hukuk cemiyetlerini kurmuştur. Mustafa Kemal 19 Mayıs 1919'da Samsun'a çıkarak süreci başlatmış, yayınladığı Havza Genelgesi ile halkı mitingler düzenlemeye ve milli bilinci uyandırmaya çağırmıştır.",
        bullets: [
          "Amiral Bristol Raporu, İzmir'in işgalinin haksız olduğunu belirten ilk uluslararası belgedir.",
          "Amasya Genelgesi, milli mücadelenin gerekçesini, amacını ve yöntemini belirten ilk ihtilal beyannamesidir.",
          "Amasya Genelgesi'nde ilk kez milli egemenlik vurgusu yapılmış ve Temsil Heyeti'nin kurulması fikri doğmuştur."
        ]
      },
      {
        heading: "Kongreler Dönemi ve Ulusal And",
        body: "Erzurum Kongresi, toplanış yönüyle bölgesel, aldığı kararlar yönüyle ulusal bir kongredir. İlk kez manda ve himaye fikri reddedilmiş ve milli sınırlardan bahsedilmiştir. Sivas Kongresi ise her yönüyle ulusal tek kongredir. Manda ve himaye kesin olarak reddedilmiş, tüm yararlı cemiyetler Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti adı altında birleştirilmiştir. İstanbul hükümeti ile yapılan Amasya Görüşmeleri ile Temsil Heyeti hukuken tanınmış ve son Mebusan Meclisi'nde vatan sınırlarını çizen Misakımilli kararları kabul edilmiştir.",
        bullets: [
          "Misakımilli sınırları Mondros imzalandığı sırada Türk ordusunun koruduğu sınırlardır.",
          "Misakımilli'nin kabulü üzerine İtilaf Devletleri İstanbul'u resmen işgal etmiş ve Mebusan Meclisi'ni kapatmıştır.",
          "Temsil Heyeti Ankara'ya gelerek meclisin açılış hazırlıklarını yürütmüştür."
        ]
      }
    ],
    mustKnow: [
      "Mondros 7. ve 24. maddelerinin gizli işgal hedefleri",
      "Amasya Genelgesi'nin milli mücadelenin yol haritası olma özelliği",
      "Erzurum ve Sivas kongrelerinin toplanış ve karar niteliği farkları",
      "Misakımilli belgesinin vatan sınırları, kapitülasyonlar ve referandum maddeleri"
    ],
    commonMistakes: [
      "Milli cemiyetlerin ilk kuruldukları anda tek merkezden yönetildiğini sanmak (Bölgesel kurulmuşlar, Sivas Kongresi'nde tek çatı altında birleşmişlerdir).",
      "Misakımilli kararlarının TBMM tarafından kabul edildiğini düşünmek (Henüz TBMM açılmamıştır; kararları kabul eden son Osmanlı Mebusan Meclisi'dir)."
    ]
  },
  {
    id: "t8",
    slug: "kurtulus-savasi-ve-antlasmalar",
    title: "Kurtuluş Savaşı ve Antlaşmalar",
    era: "milli-mucadele",
    shortDescription: "Doğu, Güney ve Batı cepheleri, düzenli ordunun savaşları, Mudanya Ateşkesi ve Lozan Barış Antlaşması.",
    keywords: ["Mudanya", "Lozan", "Sakarya Savaşı", "Gümrü", "I. İnönü", "II. İnönü", "Kütahya-Eskişehir", "Büyük Taarruz", "Kars Antlaşması", "Ankara Antlaşması", "Tekalif-i Milliye", "Başkomutanlık"],
    examImportance: 92,
    estimatedMinutes: 55,
    quickTimeline: [
      { date: "1920", event: "Doğu cephesinin kapanması ve Gümrü Antlaşması" },
      { date: "1921", event: "Sakarya Meydan Muharebesi ve savunmanın sonu" },
      { date: "1922", event: "Büyük Taarruz ve Mudanya Ateşkes Antlaşması" },
      { date: "24 Temmuz 1923", event: "Lozan Barış Antlaşması'nın imzalanması" }
    ],
    summary: [
      {
        heading: "Cepheler Dönemi ve Doğu-Güney Başarıları",
        body: "Kurtuluş Savaşı üç cephede yürütülmüştür. Doğu cephesinde Ermenilere karşı savaşılmış ve kazanılan zafer sonucu Gümrü Antlaşması imzalanmıştır. Bu antlaşma TBMM'nin ilk uluslararası askeri ve siyasi başarısıdır. Güney cephesinde düzenli ordu bulunmamış, tamamen Kuvayımilliye ve halk direnişiyle (Maraş, Antep, Urfa) Fransız ve Ermeni işgali durdurulmuştur. Güney cephesi, batıdaki Sakarya zaferinden sonra imzalanan 1921 Ankara Antlaşması ile resmen kapanmış ve Hatay Fransa mandasındaki Suriye'ye bırakılmıştır (Misakımilli'den ikinci taviz).",
        bullets: [
          "Gümrü antlaşması ile Ermeniler Doğu Anadolu'daki toprak iddialarından resmen vazgeçmiştir.",
          "Fransa, TBMM'yi ve Misakımilli'yi tanıyan ilk İtilaf Devleti olmuştur.",
          "Güney cephesindeki direnişler nedeniyle şehirlere Kahraman, Gazi ve Şanlı unvanları verilmiştir."
        ]
      },
      {
        heading: "Batı Cephesi, Büyük Taarruz ve Lozan Barış Antlaşması",
        body: "Batı cephesinde Yunanistan'a karşı düzenli ordu savaşmıştır. I. İnönü zaferi sonrası Teşkilat-ı Esasiye anayasası ve İstiklal Marşı kabul edilmiş, Moskova Antlaşması ile Batum Sovyet Rusya'ya bırakılmıştır (ilk taviz). Kütahya-Eskişehir yenilgisi sonrası ordu Sakarya'nın doğusuna çekilmiş ve Mustafa Kemal Başkomutan olmuştur. Sakarya Meydan Muharebesi ile 1683'ten beri süren Türk geri çekilişi durdurulmuş, kazanılan Büyük Taarruz ile Anadolu düşmandan temizlenmiştir. Mudanya Ateşkesi askeri safhayı bitirmiş, 1923 Lozan Barış Antlaşması ile yeni devletin bağımsızlığı tescillenmiştir.",
        bullets: [
          "Tekalif-i Milliye Emirleri ordunun ihtiyaçlarını halktan karşılamak için Başkomutan Mustafa Kemal tarafından yayınlanmıştır.",
          "Kars Antlaşması ile doğu sınırımız, Ankara Antlaşması ile güney sınırımız kesinleşmiştir.",
          "Lozan'da kapitülasyonlar, Duyun-u Umumiye, Ermeni yurdu ve azınlık sorunları kesin çözülmüş; Irak sınırı (Musul) çözülemeyip sonraya bırakılmıştır."
        ]
      }
    ],
    mustKnow: [
      "Gümrü Antlaşması'nın TBMM'ye kazandırdığı ilk diplomatik meşruiyet önemi",
      "I. İnönü savaşı sonrasında yaşanan iç ve dış gelişmeler (Londra, Moskova, İstiklal Marşı)",
      "Tekalif-i Milliye emirlerinin milli dayanışma ve topyekün seferberlikteki yeri",
      "Lozan Antlaşması'nda çözülemeyen veya aleyhimize çözülen konular (Musul, Boğazlar komisyonu, Hatay)"
    ],
    commonMistakes: [
      "Sakarya Savaşı ile Büyük Taarruz'un rollerini karıştırmak (Sakarya son savunma savaşıdır; Büyük Taarruz ise ilk ve son genel taarruz meydan muharebesidir).",
      "Lozan'da Boğazlar sorununun tamamen lehimize çözüldüğünü sanmak (Boğazlar yönetimi başkanı Türk olan uluslararası bir komisyona bırakılmıştır; bu komisyon daha sonra Montrö ile kaldırılacaktır)."
    ]
  },
  {
    id: "t9",
    slug: "atatork-ilke-ve-inkilaplari",
    title: "Atatürk İlkeleri ve İnkılaplar",
    era: "milli-mucadele",
    shortDescription: "Altı temel ilke, saltanat ve halifeliğin kaldırılması, eğitim birliği, hukuk devrimi ve toplumsal yenilikler.",
    keywords: ["Cumhuriyetçilik", "Halkçılık", "Devletçilik", "Laiklik", "Milliyetçilik", "İnkılapçılık", "saltanat", "halifelik", "tevhid-i tedrisat", "medeni kanun", "kabotaj", "harf inkılabı", "soyadı kanunu", "aşar"],
    examImportance: 92,
    estimatedMinutes: 58,
    quickTimeline: [
      { date: "1 Kasım 1922", event: "Saltanatın kaldırılması" },
      { date: "29 Ekim 1923", event: "Cumhuriyetin ilanı" },
      { date: "3 Mart 1924", event: "Halifeliğin kaldırılması ve eğitim birliği" },
      { date: "17 Şubat 1926", event: "Türk Medeni Kanunu'nın kabulü" }
    ],
    summary: [
      {
        heading: "Atatürk'ün Altı Temel İlkesi",
        body: "Atatürk ilkeleri altı temel esastan oluşur: Cumhuriyetçilik (milli irade, meclis, seçim), Milliyetçilik (bağımsızlık, milli benlik, ortak dil ve tarih), Halkçılık (kanun önünde eşitlik, sosyal adalet, imtiyazsız toplum), Devletçilik (özel sektörün yetersiz kaldığı yerde devlet yatırımları), Laiklik (din-devlet işlerinin ayrılması, akılcılık, inanç özgürlüğü) ve İnkılapçılık (çağdaşlaşma, sürekli yenilenme, batılılaşma).",
        bullets: [
          "Kabotaj Kanunu denizlerimizde bağımsızlığı sağladığı için doğrudan Milliyetçilik ilkesiyle ilgilidir.",
          "Aşar vergisinin kaldırılması köylüyü rahatlattığı için doğrudan Halkçılık ilkesinin gereğidir.",
          "Yeni Türk Harflerinin kabulü ve Türk Tarih Kurumu'nun kurulması Milliyetçilik ilkesine bağlıdır."
        ]
      },
      {
        heading: "Siyasi, Eğitim ve Hukuk Alanındaki İnkılaplar",
        body: "Saltanatın kaldırılması (1922) ve Halifeliğin kaldırılması (1924) cumhuriyetçiliğin ve laikliğin en büyük adımlarıdır. 3 Mart 1924 Tevhid-i Tedrisat Kanunu ile eğitimde birlik sağlanmış ve laik eğitim sistemine geçilmiştir. 1926 Türk Medeni Kanunu ile kadın ve erkek hakları aile, miras, boşanma ve şahitlikte eşitlenmiş; dini nikah yerine resmi nikah getirilmiştir. Harf İnkılabı (1928) sonrasında okuma yazma oranını artırmak için Millet Mektepleri açılmıştır. Soyadı Kanunu (1934) ile lakaplar yasaklanmış ve eşitlik sağlanmıştır.",
        bullets: [
          "Medeni Kanun kadına sosyal ve ekonomik eşitlik vermiş, ancak seçme-seçilme hakları (siyasi haklar) içermemiştir.",
          "Türk kadını siyasi haklarını sırasıyla 1930'da belediye, 1933'te muhtar ve 1934'te milletvekili seçimleriyle kazanmıştır.",
          "Şapka Kanunu ve tekke-zaviyelerin kapatılması toplumsal yapıyı çağdaşlaştırmak için yapılmıştır."
        ]
      }
    ],
    mustKnow: [
      "Altı ilkenin anahtar kavramları (milli irade, eşitlik, akılcılık, devlet yatırımı)",
      "Medeni Kanun'un kadın haklarındaki sosyal devrimi ve siyasi hak içermediği gerçeği",
      "Halifeliğin kaldırılmasının laikleşme ve rejim güvenliğindeki kritik rolü",
      "Kabotaj Kanunu'nun milli ekonomi ve milliyetçilik ilkesiyle doğrudan bağı"
    ],
    commonMistakes: [
      "Seçme ve seçilme hakkının verilmesini Halkçılık veya Cumhuriyetçilik dışı bir ilke sanmak (Hem halkçılık-eşitlik hem de cumhuriyetçilik-milli irade ile ilgilidir).",
      "Kadınlara siyasi hakların Medeni Kanun ile verildiğini düşünmek (Kadınlara siyasi haklar anayasa değişiklikleriyle 1930-1934 arasında verilmiştir; Medeni Kanun'da siyasi hak yoktur)."
    ]
  },
  {
    id: "t10",
    slug: "cumhuriyet-donemi-dis-politika",
    title: "Cumhuriyet Dönemi Dış Politika",
    era: "milli-mucadele",
    shortDescription: "Lozan sonrası yabancı okullar, nüfus mübadelesi, Musul meselesi, Montrö ve Hatay sorunu.",
    keywords: ["Montrö", "Hatay", "Balkan Antantı", "Sadabat Paktı", "nüfus mübadelesi", "yabancı okullar", "Musul", "Bozkurt-Lotus", "Milletler Cemiyeti", "Hoover Moratoryumu"],
    examImportance: 90,
    estimatedMinutes: 56,
    quickTimeline: [
      { date: "1926", event: "Ankara Antlaşması ile Musul'un Irak'a bırakılması" },
      { date: "1932", event: "Türkiye'nin Milletler Cemiyeti'ne üye olması" },
      { date: "1936", event: "Montrö Boğazlar Sözleşmesi ile tam egemenlik sağlanması" },
      { date: "1939", event: "Hatay'ın anavatana katılması" }
    ],
    summary: [
      {
        heading: "1923-1930 Dönemi (Lozan Sonrası Sorunlar)",
        body: "Bu dönem dış politikası Lozan'dan kalan sorunların çözümüne odaklanmıştır. Yabancı Okullar sorunu (özellikle Fransa ile yaşanan) egemenlik hakkı kabul edilerek dış devletlerle müzakere edilmeden Türk kanunlarına bağlanmıştır. Nüfus Mübadelesi (etapli sorunu) Yunanistan ile yaşanmış, 1930 yılında dostluk antlaşmasıyla çözülmüştür. Musul sorunu, Şeyh Sait İsyanı'nın yarattığı iç kriz nedeniyle İngiltere lehine çözülmüş ve 1926 Ankara Antlaşması ile Musul Irak'a bırakılmıştır (Misakımilli'den taviz).",
        bullets: [
          "Bozkurt-Lotus Davası, Laher Adalet Divanı'nda Türkiye'nin egemenlik haklarını başarıyla savunduğu uluslararası davadır.",
          "Osmanlı borçları sorunu 1929 buhranında taksitlendirilerek Fransa ile çözülmüştür.",
          "Dış politikada 'Yurtta sulh, cihanda sulh' ilkesi temel rehber kabul edilmiştir."
        ]
      },
      {
        heading: "1930-1939 Dönemi (Yaklaşan Savaş Tehdidi)",
        body: "İtalya ve Almanya'nın yayılmacı politikalarına karşı Türkiye bölgesel güvenlik ittifakları kurmuştur. Batı sınırını korumak için Balkan Antantı (Türkiye, Yunanistan, Yugoslavya, Romanya), doğu sınırını korumak için Sadabat Paktı (Türkiye, İran, Irak, Afganistan) imzalanmıştır. 1936 Montrö Boğazlar Sözleşmesi ile Boğazlar Komisyonu kaldırılmış, Boğazların tam yönetimi ve askeri kontrolü Türkiye'ye geçmiştir. 1939'da Hatay Meclisi'nin kararıyla Hatay anavatana katılmıştır.",
        bullets: [
          "Boğazlar komisyonunun kalkması Türkiye'nin Boğazlardaki egemenlik sınırlamasını tamamen kaldırmıştır.",
          "Hatay'ın anavatana katılması Mustafa Kemal'in ölümünden sonra (1939'da) gerçekleşmiştir.",
          "Sadabat Paktı'na sınır sorunları nedeniyle Suriye, Basra körfezi kaygısıyla da Irak harici Arap devletleri katılmamıştır."
        ]
      }
    ],
    mustKnow: [
      "Yabancı okullar sorununun egemenlik hakkı çerçevesinde iç sorun kabul edilmesi",
      "Musul sorununun Şeyh Sait isyanı yüzünden aleyhimize sonuçlanması",
      "Montrö ile Boğazlar üzerinde sağlanan tam ve mutlak egemenlik kazanımları",
      "Balkan Antantı ve Sadabat Paktı'na katılan devletler ve katılmama nedenleri"
    ],
    commonMistakes: [
      "Balkan Antantı'na tüm Balkan ülkelerinin katıldığını sanmak (Bulgaristan yayılmacı emelleri, Arnavutluk ise İtalya korkusu nedeniyle katılmamıştır).",
      "Hatay'ın Atatürk hayattayken anavatana katıldığını düşünmek (Atatürk döneminde Hatay bağımsız cumhuriyet olmuş, ancak anavatana katılması ölümünden sonra 1939'da meclis kararıyla olmuştur)."
    ]
  },
  {
    id: "t11",
    slug: "cagdas-turk-ve-dunya-tarihi",
    title: "Çağdaş Türk ve Dünya Tarihi",
    era: "yenilesme",
    shortDescription: "II. Dünya Savaşı yılları, Soğuk Savaş dönemi, Kore Savaşı, NATO üyeliği ve Kıbrıs Meselesi.",
    keywords: ["NATO", "Kıbrıs", "Birleşmiş Milletler", "Soğuk Savaş", "Truman Doktrini", "Marshall Planı", "Kore Savaşı", "Bağdat Paktı", "CENTO", "EOKA", "Enosis", "Johnson Mektubu", "Asala"],
    examImportance: 82,
    estimatedMinutes: 42,
    quickTimeline: [
      { date: "1939-1945", event: "II. Dünya Savaşı yılları ve Türkiye'de seferberlik" },
      { date: "1950", event: "Kore Savaşı'na asker gönderilmesi" },
      { date: "1952", event: "Türkiye'nin NATO'ya resmen üye olması" },
      { date: "1974", event: "Kıbrıs Barış Harekatı" }
    ],
    summary: [
      {
        heading: "II. Dünya Savaşı ve Türkiye",
        body: "Türkiye II. Dünya Savaşı'na fiilen katılmamış, ancak savaş tehdidi nedeniyle genel seferberlik ilan etmiştir. Bu durum tarımsal üretimi düşürmüş ve ekonomiyi sarsmıştır. Enflasyon ve karaborsayı engellemek için Varlık Vergisi çıkarılmış ve Ekmek Karnesi uygulamasına geçilmiştir. Savaştan sonra kurulan Birleşmiş Milletler'e kurucu üye olmak amacıyla sembolik olarak Almanya ve Japonya'ya savaş ilan edilmiştir. Savaş sonrasında San Francisco Konferansı'na katılarak BM kurucusu olunmuştur.",
        bullets: [
          "Köy Enstitüleri (1940) köylüyü eğitmek ve tarımı kalkındırmak amacıyla bu dönemde açılmıştır.",
          "Savaş sonrasında Nuri Demirağ öncülüğünde çok partili hayata geçişin ilk adımları atılmıştır.",
          "İsmet İnönü döneminde Adana ve Kahire konferanslarında müttefiklerin savaşa girme baskıları başarıyla savuşturulmuştur."
        ]
      },
      {
        heading: "Soğuk Savaş, NATO ve Kıbrıs Meselesi",
        body: "Savaş sonrası SSCB'nin toprak ve Boğazlarda üs talebi tehdidine karşı Türkiye batı bloğuna yanaşmıştır. ABD'nin Truman Doktrini ve Marshall Planı yardımları alınmıştır. Kore Savaşı'na BM bünyesinde asker gönderilmiş, bu askeri başarı sayesinde 1952'de NATO'ya üye olunmuştur. 1950'lerden itibaren Kıbrıs'ta Rumların Enosis (ilhak) ve EOKA terörüne karşı Türk Mukavemet Teşkilatı kurulmuş, 1974 yılında garantörlük hakkı kullanılarak Kıbrıs Barış Harekatı düzenlenmiştir.",
        bullets: [
          "Johnson Mektubu (1964) ABD'nin Kıbrıs müdahalesine karşı yazdığı ve Türk dış politikasında çok yönlü arayışları başlatan belgedir.",
          "Bağdat Paktı, Irak'ın çekilmesiyle CENTO adını almış ve merkezi Ankara olmuştur.",
          "ASALA terör örgütü 70'li ve 80'li yıllarda Türk diplomatlarını hedef alan suikastlar düzenlemiştir."
        ]
      }
    ],
    mustKnow: [
      "II. Dünya Savaşı'nın Türkiye üzerindeki ağır ekonomik etkileri (Varlık vergisi, ekmek karnesi)",
      "Kore Savaşı'na asker gönderilmesinin NATO üyeliği ile doğrudan ilişkisi",
      "Kıbrıs Barış Harekatı'nın nedenleri, garantörlük hukuku ve sonuçları",
      "Truman Doktrini ve Marshall Planı'nın soğuk savaş askeri ve ekonomik yardımları olduğu"
    ],
    commonMistakes: [
      "Çok partili hayata ilk kez Demokrat Parti ile geçildiğini sanmak (İlk kurulan parti Nuri Demirağ'ın Milli Kalkınma Partisi'dir; ancak en güçlü muhalefet DP olmuştur).",
      "Kıbrıs Barış Harekatı sonrasında hemen KKTC'nin kurulduğunu düşünmek (Harekattan sonra önce Kıbrıs Türk Federe Devleti kurulmuş, KKTC ise 1983 yılında ilan edilmiştir)."
    ]
  },
  {
    id: "t12",
    slug: "genel-tarih-kronolojisi",
    title: "Genel Tarih Kronolojisi",
    era: "yenilesme",
    shortDescription: "Savaşlar, antlaşmalar, padişahlar ve demokratikleşme adımlarının kronolojik karşılaştırmalı akışı.",
    keywords: ["kronoloji", "savaşlar", "antlaşmalar", "demokratikleşme", "anayasalar", "padişahlar", "kuşatmalar", "başkentler", "balkan savaşları", "trablusgarp", "sevr", "uşi"],
    examImportance: 82,
    estimatedMinutes: 42,
    quickTimeline: [
      { date: "1048-1243", event: "Selçuklu Kuruluş ve Moğol İstilası Savaşları sıralaması" },
      { date: "1299-1453", event: "Osmanlı Beylikten İmparatorluğa geçiş kronolojisi" },
      { date: "1808-1876", event: "Demokratikleşme ve anayasacılık adımları sıralaması" },
      { date: "1918-1923", event: "Milli Mücadele ve diplomatik antlaşmalar sıralaması" }
    ],
    summary: [
      {
        heading: "Savaşlar, Kuşatmalar ve Dönüm Noktaları",
        body: "Tarih boyunca Türk devletlerinin kaderini belirleyen savaşlar belirli bir kronolojik akışa sahiptir. Selçuklu döneminde Pasinler (1048 - Bizans'la ilk), Malazgirt (1071 - Anadolu kapısı) ve Miryokefalon (1176 - Anadolu tapusu) sırasıyla kazanılmıştır. Osmanlı'da ise Sırpsındığı (1364 - ilk Haçlı), Kosova (1389 - ilk top kullanımı), Niğbolu (1396), Varna (1444) ve II. Kosova (1448 - savunma sonu) Balkan hakimiyetini perçinlemiştir. Trablusgarp (1911 - ilk uçak kullanımı, Uşi antlaşmasıyla kayıp) ve Balkan Savaşları (1912-1913) imparatorluğun son büyük yıkımlarıdır.",
        bullets: [
          "Bursa Orhan Bey döneminde, Edirne I. Murad döneminde başkent yapılmıştır.",
          "İstanbul ilk kez Avarlar tarafından kuşatılmış, Fatih Sultan Mehmed tarafından fethedilmiştir.",
          "Sevr Antlaşması (1920) Mebusan Meclisi onaylamadığı için hukuken geçersiz, ölü doğmuş bir antlaşmadır."
        ]
      },
      {
        heading: "Anayasacılık ve Diploması Kronolojisi",
        body: "Demokratikleşme adımları Sened-i İttifak (1808 - ayanlarla sözleşme), Tanzimat Fermanı (1839 - kanun üstünlüğü), Islahat Fermanı (1856 - gayrimüslim hakları), I. Meşrutiyet (1876 - anayasa Kanun-i Esasi ve meclis) sırasıyla gerçekleşmiştir. Cumhuriyet döneminde ise 1921 Anayasası (savaş dönemi yumuşak anayasası), 1924 Anayasası (güçler birliği, kabine), 1961 Anayasası (en demokratik/çoğulcu) ve 1982 Anayasası (kazuistik/sert) uygulanmıştır.",
        bullets: [
          "Milli Mücadele antlaşmaları sırası: Gümrü (1920 - ilk zafer), Moskova (1921), Kars (1921 - doğu sınırı nihai), Ankara (1921 - güney sınırı), Mudanya (1922) ve Lozan (1923).",
          "Mustafa Kemal'in rütbe sırası: Şam 5. Ordu (ilk görev), Trablusgarp, Çanakkale Cephesi, Kafkas Cephesi, Suriye Cephesi ve Başkomutanlık.",
          "Bilecik Görüşmesi (1920) ile İstanbul Hükümeti, TBMM'nin varlığını resmen tanımıştır."
        ]
      }
    ],
    mustKnow: [
      "Selçuklu ve Osmanlı dönemi savaşlarının kronolojik sebep-sonuç bağları",
      "Demokratikleşme adımlarının padişah yetkilerini kısıtlama sırası",
      "Milli Mücadele dönemi antlaşmalarının kronolojik sırası ve Misakımilli tavizleri",
      "Türk anayasalarının tarihsel gelişim özellikleri ve sertlik dereceleri"
    ],
    commonMistakes: [
      "Trablusgarp Savaşı'ndan sonra Balkan Savaşları'nın bittiğini düşünmek (Balkan Savaşları Trablusgarp Savaşı sürerken başlamış, bu yüzden Uşi Antlaşması aceleyle imzalanmıştır).",
      "1921 Anayasası'nın (Teşkilat-ı Esasiye) laik ve detaylı bir anayasa olduğunu sanmak (Savaş anayasasıdır, laik değildir, devletin dini İslam'dır maddesi yer alır)."
    ]
  }
];

export const questions: Question[] = staticQuestions;

export const flashcards: Flashcard[] = staticFlashcards.map((card, index) => ({
  id: \`\${card.topicId}-card-\${index + 1}\`,
  ...card
}));

export const timelineEvents: TimelineEvent[] = topics.flatMap((topicItem, topicIndex) =>
  topicItem.quickTimeline.map((item, index) => ({
    id: \`\${topicItem.id}-event-\${index + 1}\`,
    topicId: topicItem.id,
    date: item.date,
    title: item.event,
    description: \`\${item.event}, \${topicItem.title} başlığında kronoloji ve neden-sonuç ilişkisini kurmak için kritik bir referans noktasıdır.\`,
    tone: (["gold", "turquoise", "crimson", "parchment"] as const)[(topicIndex + index) % 4],
  }))
);

export const exams: Exam[] = Array.from({ length: 50 }).map((_, index) => {
  const examIndex = index + 1;
  return {
    id: \`kpss-tarih-genel-deneme-\${examIndex}\`,
    title: \`KPSS Tarih Genel Deneme \${examIndex}\`,
    durationMinutes: 45,
    description: \`\${examIndex}. sınav denemesi. Tüm ana dönemlerden dengeli seçilmiş açıklamalı genel tekrar denemesi.\`,
    questionIds: [] // Bu kısım SQL trigger tarafından dinamik doldurulur
  };
});

export const studyRecommendations: StudyRecommendation[] = [
  {
    id: "daily-topic-review",
    title: "Günün konu tekrarı",
    description: "Önce yüksek ağırlıklı konuyu oku, ardından aynı başlıktan açıklamalı test çöz.",
    href: "/topics",
    minutes: 25,
    priority: "yüksek",
  },
  {
    id: "question-bank-focus",
    title: "Soru bankası odak oturumu",
    description: "Yanlış yaptığın başlıklarda 20 dakikalık hedefli test oturumu başlat.",
    href: "/question-bank",
    minutes: 20,
    priority: "orta",
  },
];

const normalizeCompatKey = (value: unknown) => String(value ?? "").trim().toLowerCase();

export function getTopicBySlug(slug: string) {
  const target = normalizeCompatKey(slug);
  return topics.find((topic) => {
    const record = topic as unknown as Record<string, unknown>;
    return normalizeCompatKey(record.slug) === target || normalizeCompatKey(record.id) === target;
  });
}

export function getTopicById(topicId: string) {
  const target = normalizeCompatKey(topicId);
  return topics.find((topic) => normalizeCompatKey((topic as unknown as Record<string, unknown>).id) === target);
}

export function getQuestionsByTopic(topicId: string) {
  const target = normalizeCompatKey(topicId);
  return questions.filter((question) => {
    const record = question as unknown as Record<string, unknown>;
    return normalizeCompatKey(record.topicId ?? record.topic_id ?? record.unitId) === target;
  });
}

export function getFlashcardsByTopic(topicId: string) {
  const target = normalizeCompatKey(topicId);
  return flashcards.filter((card) => {
    const record = card as unknown as Record<string, unknown>;
    return normalizeCompatKey(record.topicId ?? record.topic_id ?? record.unitId) === target;
  });
}

export function getTimelineEventsByTopic(topicId: string) {
  const target = normalizeCompatKey(topicId);
  return timelineEvents.filter((event) => {
    const record = event as unknown as Record<string, unknown>;
    return normalizeCompatKey(record.topicId ?? record.topic_id ?? record.unitId) === target;
  });
}

export const recommendations = typeof studyRecommendations !== "undefined" ? studyRecommendations : [];
`;

const outputPath = path.join(process.cwd(), "src/data/kpss-history.ts");
fs.writeFileSync(outputPath, newHistoryContent, "utf8");

console.log(`[Local Data Hydrator] "${outputPath}" başarıyla zenginleştirildi!`);
