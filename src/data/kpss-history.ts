import type {
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
    shortDescription: "İlk Türk devletleri, bozkır kültürü, töre hükümleri, kut inancı, meclis yapısı, göç hareketleri ve toplumsal kurumlar.",
    examImportance: 86,
    estimatedMinutes: 45,
    keywords: ["kut", "tore", "kurultay", "ikili teskilat", "Orhun Yazitlari", "balbal", "kurgan", "yug", "kam", "sagu", "kosuk", "uygurlar", "hunlar", "gokturkler", "maniheizm", "yerlesik yasam", "saka", "iskitler", "teoman", "mete han", "bumin kagan", "istemi yabgu", "bilge kagan", "kul tigin", "tonyukuk", "peceknekler", "hazarlar", "karluklar"],
    quickTimeline: [
      { date: "MÖ 220", event: "Teoman tarafından Ötüken merkezli Asya Hun Devleti'nin kurulması" },
      { date: "MÖ 209", event: "Mete Han'ın tahta çıkışı ve ilk düzenli ordu (onlu teşkilat) kuruluşu" },
      { date: "375", event: "Kavimler Göçü ile Avrupa'da Türk devletlerinin kurulması" },
      { date: "552", event: "Bumin Kağan önderliğinde Avar hakimiyetine son verilerek I. Kök Türk Devleti'nin kurulması" },
      { date: "744", event: "Kutluk Bilge Kül Kağan tarafından Uygur Devleti'nin kurulması ve yerleşik yaşama geçiş" },
      { date: "732-735", event: "Kül Tigin, Bilge Kağan ve Vezir Tonyukuk adına Orhun Abideleri'nin dikilmesi" }
    ],
    summary: [
      {
        heading: "1. Siyasi Yapı, Egemenlik ve Kut İnancı",
        body: "İlk Türk devletlerinde hükümdara devleti yönetme yetkisinin Tanrı tarafından verildiğine inanılırdı; bu inanca Kut denirdi. Kut yetkisinin kan yoluyla babadan oğula geçtiğine inanıldığı için hanedan üyesi tüm erkeklerin tahtta hakkı vardı. Bu durum 'ülke hanedanın ortak malıdır' kuralını doğurmuş ve sık sık taht kavgalarına, dolayısıyla devletlerin kısa sürede bölünmesine yol açmıştır. Hükümdarlar Şanşü, Tanhu, Hakan, Han, Kağan, İlteber ve Erkin gibi unvanlar kullanırlardı. Devlet işleri, boy beylerinin katıldığı danışma meclisi niteliğindeki Kurultay'da (Toy/Kengeş) görüşülürdü. Kağan'ın eşi Hatun (Katun) da kurultaya katılabilir, elçi kabul edebilir ve kağan savaştayken devlete vekalet edebilirdi. Ülke yönetimi kolaylaştırılsın diye doğu (kutsal yön, kağan yönetir) ve batı (yabgu yönetir) olarak ikiye bölünürdü (İkili Teşkilat).",
        bullets: [
          "Kut inancı egemenliği ilahi kaynakla meşrulaştırarak kağanın otoritesini artırır.",
          "Veraset yasasının belirsizliği, Türk devletlerinin ömrünü kısaltan en önemli iç nedendir.",
          "Kurultay'da son söz hükümdara ait olduğu için bu meclis bir danışma organı niteliğindedir."
        ]
      },
      {
        heading: "2. Sosyal Hayat, Yazısız Hukuk (Töre) ve Ekonomi",
        body: "İlk Türk devletlerinde toplum yapısı kan bağına dayanan aileden devlete doğru genişlerdi. Aile (Oguş), sülale (Urug), boy (Bod/Boy), millet (Budun) ve devlet (İl/El) şeklinde hiyerarşik bir piramit vardı. Sosyal hayatı ve devlet yönetimini düzenleyen yazısız hukuk kurallarına Töre denirdi. Töre; örf-adetler, kağan fermanları ve kurultay kararlarından oluşurdu. Hakan dahi töreye uymak zorundaydı, bu da ilk Türklerde hukukun üstünlüğü ilkesini gösterir. Töre kurallarından adalet (könilik), eşitlik (tüzlük), iyilik (uzluk) ve insanlık (kişilik) değişmez hükümlerdi. Hayvancılığa dayalı göçebe yaşam tarzı nedeniyle uzun süreli hapis cezaları uygulanamamış, kalıcı mimari eserler yapılamamış ve özel mülkiyet gelişmemiştir. Ancak Uygurlar, Maniheizm ve Budizm dinlerini kabul ederek yerleşik hayata geçmiş, tarım, matbaa, kütüphane ve kalıcı mimari saraylar kurarak Türk kültüründe devrim yapmışlardır.",
        bullets: [
          "Töre, dinamik bir yapıya sahipti; zamanın ihtiyaçlarına göre kurultay kararıyla güncellenebilirdi.",
          "Uygurlarla birlikte savaşçılık özellikleri zayıflamış, ancak ticaret, bilim ve sanat faaliyetleri zirve yapmıştır.",
          "İlk Türk parası Türgişler (Bagat Tarkan) tarafından bastırılmış, Uygurlar ise kağıt para (Böz/Kamdu/Çao) kullanmıştır."
        ]
      },
      {
        heading: "3. Din, İnanış ve Sanat Anlayışı",
        body: "Türklerin en eski inancı Gök Tanrı inancıdır. Bunun yanı sıra doğa güçlerine inanma (Totemizm/Atalar Kültü) yaygındı. Cennet kavramı Uçmağ, cehennem kavramı Tamu olarak adlandırılırdı. Ölen kişiler için Yuğ adı verilen cenaze törenleri düzenlenir, mezarlarına Kurgan denirdi. Kurganlara ölen kişinin atı, silahı ve değerli eşyaları konurdu; bu durum ahiret inancının en doğrudan kanıtıdır. Mezarların etrafına, ölen kişinin hayattayken öldürdüğü düşman sayısı kadar insan biçimli Balbal (mezar taşı) dikilirdi. Dini törenleri ve büyücülük-hekimlik işlerini yürüten din adamlarına Kam, Şaman veya Baksı denirdi. Sanat anlayışı göçebe yaşamın gereği olarak taşınabilir araç gereçler (kemer tokaları, kılıç kınları, halılar) üzerinde yoğunlaşmıştı ve tasvirlerde Hayvan Üslubu egemendi. Dünyanın en eski düğümlü halısı olan Pazırık Halısı Hun kurganlarından çıkarılmıştır.",
        bullets: [
          "Balballar, Türklerde heykel sanatının ilk örnekleri kabul edilir.",
          "Uygurlar döneminde heykel (fresko) ve minyatür sanatı (kitap resmi) gelişim göstermiştir.",
          "Orhun Abideleri (732-735), Türk adının geçtiği, Türk tarihini ve sosyal devlet anlayışını anlatan ilk yazılı Türkçe kaynaklardır."
        ]
      }
    ],
    mustKnow: [
      "Kut anlayışı, veraset sistemi ve taht kavgalarının Türk devletlerinin yıkılışındaki rolü",
      "Törenin değişmez ilkeleri (Könilik, Tüzlük, Uzluk, Kişilik) ve kağanın töreye bağlılığı",
      "Uygurların yerleşik yaşama geçişiyle değişen ekonomik, mimari ve kültürel yapı özellikleri",
      "Orhun Abideleri'nin yazarları (Yolluğ Tigin) ve adına dikilen devlet adamları (Bilge Kağan, Kül Tigin, Tonyukuk)",
      "İskitlerin (Sakalar) ilk Türk boyu olduğu, Alp Er Tunga ve Tomris Hatun gibi liderleri"
    ],
    commonMistakes: [
      "İlk Türk devletlerinde mutlak, demokratik ve kalıcı bir taht veraset kuralı olduğunu düşünmek (Veraset belirsizdir, hanedan üyesi her erkek adaydır).",
      "Tüm ilk Türk topluluklarının göçebe olduğunu sanmak (Uygurlar, Karluklar ve Hazarlar yerleşik hayata geçmiştir).",
      "Kurultay'ın karar organı olduğunu sanmak (Hakan son söz hakkına sahip olduğu için temelde danışma meclisidir)."
    ]
  },
  {
    id: "t2",
    slug: "turk-islam-tarihi",
    title: "Türk-İslam Tarihi",
    era: "turk-islam",
    shortDescription: "Talas Savaşı, Karahanlılar, Gazneliler, Büyük Selçuklu Devleti, Abbasi ilişkileri, İkta ve Gulam sistemleri ile kültür-sanat eserleri.",
    examImportance: 84,
    estimatedMinutes: 48,
    keywords: ["Karahanlilar", "Gazneliler", "Buyuk Selcuklu", "ikta", "Nizamiye", "Talas Savasi", "Dandanakan", "Malazgirt", "gulam", "atabey", "divan-i saltanat", "kutadgu bilig", "ribat", "bimaristan", "satuk bugra han", "sultan mahmut", "tugrul bey", "alparslan", "meliksah", "nizamulmulk"],
    quickTimeline: [
      { date: "751", event: "Talas Savaşı ile Türklerin (Karluklar) Abbasileri desteklemesi ve kitleler halinde İslamiyet'e geçişin başlaması" },
      { date: "840", event: "Satuk Buğra Han liderliğinde Orta Asya'da ilk Müslüman Türk devleti olan Karahanlıların kurulması" },
      { date: "963", event: "Alp Tigin tarafından Gazne merkezli çok uluslu Gazneliler Devleti'nin kurulması" },
      { date: "1040", event: "Dandanakan Savaşı ile Selçukluların Gaznelileri yenerek resmen kurulması" },
      { date: "1055", event: "Tuğrul Bey'in Bağdat Seferi ile halifeyi kurtarması ve 'Doğunun ve Batının Sultanı' unvanını alması" },
      { date: "1071", event: "Sultan Alparslan'ın Malazgirt Savaşı'nda Bizans'ı yenerek Anadolu kapılarını açması" }
    ],
    summary: [
      {
        heading: "1. İlk Türk-İslam Devletleri ve Siyasi Akış",
        body: "Türklerin İslamiyet'i kabulü 751 Talas Savaşı ile hızlanmıştır. Orta Asya'da İslamiyet'i kabul eden ilk Türk devleti Karahanlılar'dır. Satuk Buğra Han döneminde İslamiyet'i resmi din yapmışlardır. Karahanlılar, halkı ve yöneticileri tamamen Türk olduğu için resmi dillerini Türkçe yapmış, ulusal kimliklerini en güçlü şekilde korumuşlardır. Gazneliler ise Afganistan'ın Gazne şehrinde kurulmuş olup çok uluslu bir yapıya sahipti. En parlak dönemlerini yaşayan Sultan Mahmut, Hindistan'a 17 sefer düzenleyerek İslamiyet'i yaymış, kast sistemini sarsmış ve halifeden 'Sultan' unvanını alan ilk Türk hükümdar olmuştur. Büyük Selçuklu Devleti ise Tuğrul ve Çağrı Beyler tarafından kurulmuş, Dandanakan Savaşı (1040) ile Gaznelileri yıkarak bağımsız olmuştur. 1071 Malazgirt Savaşı ile Bizans'ı mağlup ederek Anadolu'nun kapılarını Türklere açmışlardır.",
        bullets: [
          "Karahanlılar ribat adı verilen kervansaraylar ve bimaristan adı verilen hastanelerle sosyal devleti geliştirmişlerdir.",
          "Gazneliler, ordularındaki etnik çeşitlilik ve çok uluslu yapı nedeniyle Selçuklular karşısında yenilerek hızlı yıkılmıştır.",
          "Büyük Selçuklu, en parlak dönemini Melikşah ve ünlü vezir Nizamülmülk döneminde yaşamıştır."
        ]
      },
      {
        heading: "2. Devlet Teşkilatı, Toprak (İkta) ve Ordu Düzeni",
        body: "Türk-İslam devletlerinde kut anlayışı 'Allah'ın takdiri' olarak devam etmiştir. Devlet işlerinin görüşüldüğü en yüksek merci Divan-ı Saltanat'tır. Alt kademelerinde mali işler için Divan-ı İstifa (başında Müstevfi), askeri işler için Divan-ı Arz (başında Arzü'l-Ceyş), iç ve dış yazışmalar için Divan-ı İnşa/Tuğra (başında Münşi) ve denetim için Divan-ı İşraf (başında Müşrif) bulunurdu. Hukuk sistemi Şer'i (dini, başında kadılkudat) ve Örfi (töre, başında emir-i dad) olarak ikiye ayrılırdı. Ordu teşkilatında savaş esirlerinin sarayda eğitilerek ordu ve bürokrasiye alınmasına Gulam Sistemi denirdi. Toprak yönetiminde ise devlet arazilerinin (Miri) vergi gelirlerinin memur ve askerlere hizmet karşılığı verilmesine İkta Sistemi denirdi. İkta sahipleri gelirleriyle Cebelü (atlı asker) yetiştirmek zorundaydı.",
        bullets: [
          "İkta sistemi sayesinde devlet hazinesinden para çıkmadan büyük bir ordu (Eyalet Askerleri) hazır tutulmuştur.",
          "Gulam sistemi, Osmanlı'daki devşirme ve pençik sistemlerinin temeli ve esin kaynağıdır.",
          "Şehzadelerin eğitimi için eyaletlere gönderilen tecrübeli devlet adamlarına Atabey denirdi."
        ]
      },
      {
        heading: "3. Medeniyet, Eğitim ve İlk Edebi Eserler",
        body: "Büyük Selçuklu veziri Nizamülmülk tarafından Şii Batınilik (Hasan Sabbah) tehlikesine karşı fikri mücadele vermek ve memur yetiştirmek amacıyla Nizamiye Medreseleri kurulmuştur. Bu medreseler sistemli eğitim müfredatıyla dünyanın ilk üniversiteleri kabul edilir. Bu dönemde ilk Türk-İslam edebi eserleri yazılmıştır: Yusuf Has Hacip'in Tabgaç Buğra Han'a sunduğu ilk siyasetname olan Kutadgu Bilig (Mutluluk veren bilgi), Kaşgarlı Mahmut'un Türkçe'nin üstünlüğünü kanıtlamak için yazdığı ilk sözlük Divanü Lugati't-Türk, Edip Ahmet Yükneki'nin ahlak kitabı Atabetü'l-Hakayık ve Hoca Ahmet Yesevi'nin tasavvuf şiirleri Divan-ı Hikmet. Karahanlılar döneminde yazılan bu 4 eser geçiş dönemi eserleri olarak bilinir.",
        bullets: [
          "Divanü Lugati't-Türk'ün sonunda ilk Türk dünyası haritası yer almaktadır.",
          "Mimari alanda cami, medrese, darüşşifa, kervansaray ve anıt mezar niteliğindeki kümbetler yaygınlaşmıştır.",
          "Bilim alanında Farabi (Muallim-i Sani), İbn-i Sina (Avicenna), Harezmi ve Gazali gibi isimler yetişmiştir."
        ]
      }
    ],
    mustKnow: [
      "Karahanlıların Türkçeyi resmi dil ilan etmeleri ve ulusal kimlik hassasiyetleri",
      "Sultan unvanını kullanan ilk Türk hükümdarının Gazneli Mahmut olması",
      "İkta sisteminin devlete sağladığı askeri, mali ve asayiş faydaları",
      "Nizamiye Medreselerinin kuruluş amaçları ve eğitim tarihi açısından önemi",
      "Tuğrul Bey'in 'Doğunun ve Batının Sultanı' unvanını alarak dini liderlik ile siyasi liderliği ayırması"
    ],
    commonMistakes: [
      "İslamiyet'in kabulüyle Türklerin milli benliklerini tamamen yitirdiğini sanmak (Karahanlılar gibi devletler töreyi ve dili korumuşlardır).",
      "İkta sisteminde toprağın mülkiyetinin halka veya komutana ait olduğunu düşünmek (Mülkiyet daima devlete aittir; sadece vergi toplama hakkı devredilir).",
      "Büyük Selçuklu döneminde halifeliğin Selçuklu hanedanına geçtiğini düşünmek (Halifelik Abbasilerde kalmış, Selçuklu sadece koruyuculuk üstlenmiştir)."
    ]
  },
  {
    id: "t3",
    slug: "anadolu-selcuklu-ve-beylikler",
    title: "Anadolu Selçuklu ve Beylikler",
    era: "turk-islam",
    shortDescription: "Anadolu'nun Türkleşme süreci, I. ve II. Dönem beylikleri, Miryokefalon ve Kösedağ savaşları, Ahilik teşkilatı ve denizcilik faaliyetleri.",
    examImportance: 78,
    estimatedMinutes: 40,
    keywords: ["kervansaray", "ahilik", "miri arazi", "Kosedag", "beylikler", "Miryokefalon", "danismentliler", "saltuklular", "mengucekliler", "artuklular", "caka bey", "yassicemen", "babailer isyani", "ahi evran", "baciyan-i rum", "tersane", "ticari sigorta"],
    quickTimeline: [
      { date: "1071", event: "Malazgirt zaferi sonrası Anadolu'da ilk Türk beyliklerinin kurulması" },
      { date: "1075", event: "Süleyman Şah tarafından İznik merkezli Anadolu Selçuklu Devleti'nin kurulması" },
      { date: "1096", event: "I. Haçlı Seferi nedeniyle başkentin İznik'ten Konya'ya taşınması" },
      { date: "1176", event: "II. Kılıç Arslan komutasında Bizans'ın Miryokefalon Savaşı'nda yenilmesi ve Anadolu'nun Türk yurdu olduğunun kesinleşmesi" },
      { date: "1230", event: "Yassıçemen Savaşı'nda Harzemşahların yenilerek Moğol tamponunun kalkması" },
      { date: "1240", event: "Milli tarihin ilk büyük dini-sosyal isyanı olan Babailer (Baba İshak) İsyanı'nın çıkması" },
      { date: "1243", event: "Kösedağ Savaşı'nda Moğollara yenilerek Selçuklu'nun yıkılış sürecine girmesi ve II. Beylikler Dönemi'nin başlaması" }
    ],
    summary: [
      {
        heading: "1. Anadolu'nun Fethi, Birinci Dönem Beylikler ve Selçuklu Siyasi Tarihi",
        body: "1071 Malazgirt Savaşı'ndan sonra Alparslan'ın komutanları Anadolu'da ilk beylikleri kurmuştur: Saltuklular (Erzurum'da kurulan ilk beylik), Danişmentliler (Sivas'ta kurulan, ilk medrese Yağıbasan'ı yapan en güçlü beylik), Mengücekliler (Erzincan'da kurulan, Divriği Ulu Camii'ni yapan beylik), Artuklular (Mardin'de kurulan, El Cezeri'nin çalıştığı, Malabadi Köprüsü'nü yapan beylik) ve Çaka Beyliği (İzmir'de kurulan ilk denizci beylik). Anadolu Selçuklu Devleti Süleyman Şah tarafından İznik'te kurulmuş, Haçlı Seferleri nedeniyle merkez Konya'ya kaydırılmıştır. II. Kılıç Arslan döneminde kazanılan Miryokefalon Savaşı (1176) Bizans'ın Anadolu'yu geri alma ümidini bitirmiştir. Alaeddin Keykubad döneminde devlet en parlak dönemini yaşamış, Alanya ve Sudak fethedilerek deniz aşırı ticaret geliştirilmiştir. Ancak 1243 Kösedağ Savaşı ile devlet Moğol egemenliğine girmiş ve yıkılma sürecine girmiştir.",
        bullets: [
          "Danişmentlilere ait Yağıbasan Medresesi, Anadolu'da inşa edilen ilk Türk medresesidir.",
          "Çaka Bey'in donanma kurduğu 1081 yılı, Türk Deniz Kuvvetleri'nin resmi kuruluş yılı kabul edilir.",
          "Yassıçemen Savaşı'nda Harzemşahların yıpratılması, Selçuklu'yu Moğol istilasına doğrudan açık hale getirmiştir."
        ]
      },
      {
        heading: "2. Ticaret Politikaları ve Ahilik Esnaf Teşkilatı",
        body: "Anadolu Selçuklularında ticaret milli bir politika haline getirilmiştir. Yollar üzerine kervansaraylar inşa edilmiş, buralarda konaklayan tüccarlara 3 gün boyunca yeme, içme, barınma ve hayvan bakımı ücretsiz sunulmuştur. Düşman saldırısına uğrayan tüccarların zararlarını karşılamak amacıyla dünya tarihindeki ilk devlet destekli ticari sigortacılık sistemi uygulanmıştır. Şehirlerde esnaf ve zanaatkarların dayanışma ve denetim organı olan Ahilik Teşkilatı kurulmuştur. Ahi Evran tarafından Kırşehir merkezli kurulan bu yapı; mesleki eğitim verir (çırak-kalfa-usta), dükkan açma ruhsatı (gedik) verir, fiyatları belirler (narh sistemi) ve ürün kalitesini denetlerdi. Ahi Evran'ın eşi Fatma Bacı ise dünyanın ilk kadın örgütü olan Bacıyan-ı Rum'u (Anadolu Bacıları) kurarak kadınların üretime katılmasını sağlamıştır.",
        bullets: [
          "Ahilik teşkilatının kuralları fütüvvetname adı verilen ahlaki tüzüklerde toplanmıştır.",
          "Esnaflar savaş zamanında uç beyliklerinde orduyu destekleyen askeri bir güç haline de gelebilirdi.",
          "Ahilik teşkilatına sadece Müslümanlar kabul edilirdi; bu durum Osmanlı'da yerini gayrimüslimleri de kapsayan Lonca teşkilatına bırakmıştır."
        ]
      },
      {
        heading: "3. Anadolu Medeniyeti, Tasavvuf ve Mimari",
        body: "Anadolu'da Moğol baskısının arttığı yıkılış döneminde halka manevi güç veren büyük mutasavvıflar yetişmiştir: Mevlana Celaleddin Rumi (Mesnevi), Yunus Emre (Risaletü'n-Nushiyye) ve Hacı Bektaş-ı Veli (Makalat). Bu isimler Türk İslam kültürünün ve dilinin Anadolu'da kökleşmesini sağlamışlardır. Mimari alanda hastane ve tıp okulu olan darüşşifalar (Kayseri Gevher Nesibe Darüşşifası, Sivas İzzeddin Keykavus Darüşşifası), camiler, medreseler ve kervansaraylar yapılmıştır. Mimari süslemelerde taş işçiliği ön plana çıkmıştır.",
        bullets: [
          "Mevlevilik, Bektaşilik ve Kadirilik gibi tasavvufi ekoller bu dönemde Anadolu'da kurumsallaşmıştır.",
          "Anadolu Selçuklu mimarisinin karakteristik özelliği olan görkemli Taç Kapılar (portal) taş işçiliğinin zirvesidir.",
          "Karamanoğlu Mehmet Bey 1277'de yayınladığı fermanla Türkçe dışında dil konuşulmasını yasaklayarak resmi dil yapmıştır."
        ]
      }
    ],
    mustKnow: [
      "Birinci Dönem beylikleri ve Anadolu'ya kazandırdıkları mimari eserler (Yağıbasan Medresesi, Malabadi Köprüsü, Divriği Ulu Camii)",
      "Miryokefalon Savaşı'nın Anadolu'nun kesin Türk yurdu olduğunu kanıtlayan tapu senedi önemi",
      "Kervansaraylar, devlet sigortası sistemi ve deniz aşırı liman fetihlerinin ticareti canlandırma amacı",
      "Ahilik teşkilatının ekonomik yetkileri (narh sistemi, gedik belgesi, kalite kontrolü)",
      "Kösedağ Savaşı sonrasında Anadolu'da Türk siyasi birliğinin bozularak beylikler döneminin yeniden başlaması"
    ],
    commonMistakes: [
      "Malazgirt Savaşı ile Miryokefalon Savaşı'nın sonuçlarını karıştırmak (Malazgirt kapıyı açar, Miryokefalon tapuyu alır).",
      "Kösedağ Savaşı sonrasında Anadolu'nun tamamen Hristiyanlaştığını veya Türk nüfusunun yok olduğunu sanmak (Aksine, Moğol baskısıyla Anadolu'ya yoğun Türkmen göçü olmuş ve Türk nüfusu artmıştır).",
      "Selçuklularda ilk parayı Alaeddin Keykubad'ın bastırdığını düşünmek (İlk bakır para I. Mesud, ilk altın para ise II. Kılıç Arslan döneminde bastırılmıştır)."
    ]
  },
  {
    id: "t4",
    slug: "osmanli-kurulus-ve-yukselis",
    title: "Osmanlı Kuruluş ve Yükseliş",
    era: "osmanli",
    shortDescription: "Söğüt'ten Cihan İmparatorluğuna: İskân siyaseti, Yeniçeri Ocağı, İstanbul'un fethi, Yavuz'un doğu fetihleri, Kanuni dönemi ve Sokollu projeleri.",
    keywords: ["iskan", "devsirme", "timar", "Istanbulun fethi", "merkeziyetcilik", "Cimpe Kalesi", "Ankara Savasi", "Fetret Devri", "Yavuz Sultan Selim", "halifelik", "Kanuni", "Preveze", "Sokollu", "koyunhisar", "palekanon", "sirpsindigi", "kosova", "nigbolu", "varna", "mohac", "caldiran", "turnadag"],
    examImportance: 88,
    estimatedMinutes: 52,
    quickTimeline: [
      { date: "1299", event: "Osman Bey tarafından Söğüt merkezli beyliğin kurulması" },
      { date: "1302", event: "Bizans tekfurlarına karşı ilk zafer olan Koyunhisar (Bafeus) Savaşı" },
      { date: "1353", event: "Bizans'a yardım karşılığı Rumeli'deki ilk toprak parçası Çimpe Kalesi'nin alınması" },
      { date: "1402", event: "Yıldırım Bayezid'in Timur'a yenilmesiyle Ankara Savaşı ve 11 yıllık Fetret Devri'nin başlaması" },
      { date: "1453", event: "II. Mehmed (Fatih) tarafından İstanbul'un fethedilerek imparatorluk sürecinin başlaması" },
      { date: "1517", event: "Yavuz Sultan Selim'in Ridaniye Savaşı ile Memlükleri yıkarak Halifelik makamını Osmanlı'ya getirmesi" },
      { date: "1526", event: "Kanuni Sultan Süleyman komutasında Macar ordusunun Mohaç Savaşı'nda 2 saatte yenilerek Macaristan'ın alınması" },
      { date: "1538", event: "Barbaros Hayreddin Paşa komutasında Preveze Deniz Zaferi ile Akdeniz'in Türk gölü haline gelmesi" }
    ],
    summary: [
      {
        heading: "1. Kuruluş Dönemi, Balkan Politikası ve Fetret Krizleri",
        body: "Osmanlı Devleti Bizans sınırında bir uç beyliği olarak kurulmuştur. Jeopolitik konumu, gaza ve cihat anlayışı, beylikler arasındaki taht kavgalarına karışmaması ve adil yönetimi sayesinde hızla büyümüştür. Orhan Bey döneminde Bursa alınarak başkent yapılmış, Bizans'la Palekanon Savaşı kazanılmış ve Çimpe Kalesi alınarak Rumeli'ye geçilmiştir. Balkanlarda kalıcı olmak için İskân Politikası (Anadolu'dan getirilen göçebe Türkmenleri Balkanlara yerleştirme) ve İstimalet Politikası (gayrimüslim halka dini serbestlik ve hoşgörü sunma) uygulanmıştır. I. Murad döneminde Edirne alınmış, Sırpsındığı (ilk Haçlı savaşı) ve I. Kosova savaşlarıyla Haçlılar mağlup edilmiştir. Yıldırım Bayezid'in Anadolu Türk birliğini genişletmesi ve Timur ile girdiği Ankara Savaşı (1402) yenilgiyle sonuçlanmış, padişah esir düşmüş ve 11 yıllık Fetret Devri başlamıştır. I. Mehmed (Çelebi) taht kavgalarını bitirerek devleti kurtarmıştır.",
        bullets: [
          "İskân politikası ile fethedilen toprakların Türkleşmesi sağlanmış, göçebelerin yerleşik hayata geçmesiyle üretim artırılmıştır.",
          "II. Kosova Savaşı (1448) ile Balkanlar kesin Türk yurdu olmuş, Haçlılar savunmaya çekilmiştir.",
          "Kuruluş döneminde ilk düzenli ordu (Yaya ve Müsellem) Orhan Bey döneminde kurulmuştur."
        ]
      },
      {
        heading: "2. İstanbul'un Fethi ve Klasik İmparatorluk Düzeni",
        body: "II. Mehmed (Fatih) 29 Mayıs 1453'te İstanbul'u fethederek Bizans İmparatorluğu'na son vermiştir. Fethin sonucunda Karadeniz ticareti güvenceye alınmış, toprak bütünlüğü sağlanmış ve Osmanlı yükselme dönemine girmiştir. Fatih, merkezi otoriteyi mutlaklaştırmak için devşirme kökenli devlet adamlarını sadrazamlığa getirmeyi gelenekleştirmiş, kardeş katli yasasını (Kanunname-i Ali Osman) çıkarmış ve müsadere sistemini (zenginleşen devlet memurlarının mallarına el koyma) uygulayarak feodal odakların doğmasını engellemiştir. Ege adaları, Kırım, Bosna ve Arnavutluk fethedilerek sınırlar genişletilmiştir.",
        bullets: [
          "Kırım'ın fethiyle Karadeniz bir Türk gölü haline gelmiş ve İpek Yolu kontrolü sağlanmıştır.",
          "Otlukbeli Savaşı (1473) ile Akkoyunlu Devleti mağlup edilerek Doğu Anadolu sınırı güvenceye alınmıştır.",
          "Fatih döneminde ilk altın para bastırılmış ve Topkapı Sarayı inşa edilmiştir."
        ]
      },
      {
        heading: "3. Yükseliş Dönemi, Cihan Hakimiyeti ve Denizler",
        body: "Yavuz Sultan Selim 8 yıllık kısa saltanatında tamamen doğu politikasına odaklanmıştır. Şah İsmail'i Çaldıran Savaşı'nda (1514) yenerek Safevi tehdidini durdurmuş, Turnadağ Savaşı (1515) ile Dulkadiroğulları beyliğini yıkarak Anadolu Türk siyasi birliğini kesin olarak sağlamıştır. Mısır Seferi (1516 Mercidabık ve 1517 Ridaniye savaşları) ile Memlük Devleti yıkılmış; kutsal emanetler, Hicaz bölgesi ve Halifelik Osmanlı padişahlarına geçmiştir. Kanuni Sultan Süleyman 46 yıl tahtta kalarak en uzun süre hüküm süren padişah olmuştur. Belgrad ve Rodos'u fethetmiş, Mohaç Meydan Muharebesi (1526) ile Macaristan'ı topraklarına katmıştır. Barbaros Hayreddin Paşa'nın kazandığı Preveze Deniz Zaferi (1538) ile Akdeniz'de üstünlük tamamen Osmanlı'ya geçmiştir. Sokollu Mehmed Paşa'nın sadrazamlık dönemiyle (Kanuni, II. Selim, III. Murad) birlikte yükselme dönemi zirve yapmış ve ölümüyle duraklama dönemi başlamıştır.",
        bullets: [
          "Mısır Seferi sonucunda Baharat Yolu Osmanlı kontrolüne girmiş ve hazine en yüksek doluluk oranına ulaşmıştır.",
          "İstanbul Antlaşması (1533) ile Avusturya kralı protokolde sadrazama eşit sayılarak üstünlük tescil edilmiştir.",
          "Sokollu Mehmed Paşa'nın Don-Volga Kanal Projesi (Rusya'yı engellemek, Orta Asya Türkleriyle birleşmek) ve Süveyş Kanal Projesi (Baharat yolunu canlandırmak) o dönem gerçekleştirilemeyen dahi projelerdir."
        ]
      }
    ],
    mustKnow: [
      "İskân ve istimalet politikalarının Balkanlardaki fetihlerin kalıcılığını sağlayan temel idari roller olduğu",
      "Ankara Savaşı'nın Anadolu Türk birliğini parçalaması ve Fetret Devri'ne yol açan siyasi etkileri",
      "İstanbul'un fethinin dünya tarihi (derebeyliğin yıkılması, coğrafi keşifler) ve Osmanlı merkeziyetçiliği üzerindeki sonuçları",
      "Yavuz Sultan Selim'in doğu seferleri, Turnadağ Savaşı ile Anadolu siyasi birliğinin kesinleşmesi ve Halifeliğin alınması",
      "Preveze Deniz Zaferi'nin Akdeniz egemenliğini sağlayan önemi ve Barbaros Hayreddin Paşa'nın rolü"
    ],
    commonMistakes: [
      "Fetret Devri'nde en çok toprak kaybının Balkanlar'da yaşandığını sanmak (Balkanlarda adil istimalet politikası sayesinde neredeyse hiç toprak kaybedilmemiştir; toprak kayıpları Anadolu'da beyliklerin yeniden kurulmasıyla olmuştur).",
      "Halifeliğin I. Murad döneminde alındığını düşünmek (Halifelik 1517'de Yavuz Sultan Selim döneminde alınmıştır).",
      "Sokollu kanallarının başarıyla açıldığını sanmak (Projeler çizilmiş fakat dönemin yetersiz teknik imkanları ve ilgisizliği nedeniyle tamamlanamamıştır)."
    ]
  },
  {
    id: "t5",
    slug: "osmanli-kultur-ve-medeniyet",
    title: "Osmanlı Kültür ve Medeniyet",
    era: "osmanli",
    shortDescription: "Merkez teşkilatı, padişah yetkileri, Divan-ı Hümayun, eyalet yönetimi, toprak (tımar) sistemi, ordu yapısı, hukuk, vergi ve medrese eğitimi.",
    keywords: ["divan", "timar", "vakif", "enderun", "millet sistemi", "seyfiye", "ilmiye", "kalemiye", "miri arazi", "defterdar", "nisanci", "kazasker", "cizye", "iltizam", "kadi", "sehzade", "enderun", "harem", "yeniceri", "narh", "lonca"],
    examImportance: 92,
    estimatedMinutes: 58,
    quickTimeline: [
      { date: "Klasik Yapı", event: "Padişah mutlak otoritesi, Divan ve Tımar entegrasyonu" },
      { date: "XVII. yüzyıl", event: "Ekber ve Erşed sistemiyle veraset kuralının değişmesi" },
      { date: "XVIII. yüzyıl", event: "İltizamın malikaneye dönüşmesi ve Ayan sınıfının güç kazanması" }
    ],
    summary: [
      {
        heading: "1. Devlet Yönetimi, Saray ve Divan-ı Hümayun",
        body: "Osmanlı Devleti mutlak monarşi ve teokrasiyle yönetilirdi. Egemenlik hanedan erkeklerine aitti; ancak XVII. yüzyılda I. Ahmet döneminde taht kavgalarını önlemek için en yaşlı ve en olgun hanedan üyesinin tahta geçmesini öngören Ekber ve Erşed sistemi getirilmiş, böylece sancağa çıkma usulü (Kafes usulüne dönüşmüştür) sonlandırılmıştır. Saray; padişahın özel hayatının geçtiği Harem, resmi törenlerin yapıldığı dış saray Birun ve devşirme çocukların devlet adamı olmak üzere eğitildiği Enderun Mektebi'nden oluşurdu. Devlet işleri Divan-ı Hümayun'da görüşülürdü. Divan üyeleri üç yönetici sınıfa mensuptu: Seyfiye (Askeri ve idari sınıf: Sadrazam, vezirler, kaptan-ı derya, yeniçeri ağası), İlmiye (Din, hukuk, eğitim sınıfı: Şeyhülislam, kazaskerler) ve Kalemiye (Bürokrasi ve maliye sınıfı: Defterdar, nişancı, reisülküttab).",
        bullets: [
          "Sadrazam padişahın mutlak vekili olup mührünü taşırdı; padişah sefere gitmediğinde Serdar-ı Ekrem unvanıyla orduyu komuta ederdi.",
          "Kazasker, adalet ve eğitim işlerinden sorumlu olup kadı ve müderris atamalarını yapar, divandaki büyük davaları karara bağlardı.",
          "Nişancı, fermanlara padişahın imzası olan tuğrayı çeker ve fethedilen toprakların kayıtlarını Tahrir Defterlerine işlerdi."
        ]
      },
      {
        heading: "2. Toprak Yönetimi (Miri Arazi) ve Eyalet Sistemi",
        body: "Osmanlı'da toprakların mülkiyeti devlete aitti ve bunlara Miri Arazi denirdi. Miri arazilerin en önemlisi dirliktir. Dirlik gelirine göre Has (yüksek bürokratlara), Zeamet (orta düzey memurlara) ve Tımar (taşra askerlerine) olarak ayrılırdı. Tımar sahibi topladığı vergilerle Cebelü adı verilen atlı askerler yetiştirmek ve tarımda üretimin sürekliliğini sağlamakla yükümlüydü. Eyaletler salyanesiz (tımar uygulanan, merkeze yakın eyaletler) ve salyaneli (tımar uygulanmayan, vergilerin iltizam sistemiyle peşin toplandığı uzak eyaletler: Mısır, Yemen, Tunus) olarak ikiye ayrılırdı. Taşrada adalet ve idari koordinasyon padişahın doğrudan atadığı Kadı tarafından sağlanır, güvenlikten ise askeri komutan olan Subaşı sorumlu olurdu.",
        bullets: [
          "Mukataa, geliri doğrudan devlet hazinesine giden miri arazi türü olup vergileri iltizam yoluyla toplanırdı.",
          "İltizam ihalesini kazanan vergi müteahhidine Mültezim, bu ihalenin ömür boyu verilmesine ise Malikane denirdi.",
          "Paşmaklık saray kadınlarına, Yurtluk sınır koruyucularına, Ocaklık ise kale muhafızları ve tersane giderlerine ayrılan arazilerdi."
        ]
      },
      {
        heading: "3. Ordu, Maliye, Hukuk ve Toplum Yapısı",
        body: "Osmanlı ordusu Kapıkulu Askerleri (merkezde bulunan, 3 ayda bir ulufe maaşı alan devşirme yeniçeriler ve süvariler) ve Eyalet Askerleri (taşradaki tımarlı sipahiler) olmak üzere ikiye ayrılırdı. Hukuk sistemi Şer'i (dini, başında kazasker/şeyhülislam) ve Örfi (töre/fermanlar) esasa dayanırdı. Vergiler şer'i (öşür, haraç, cizye) ve örfi (avarız - olağanüstü hal vergisi) olarak toplanırdı. Toplum, ırk esasına göre değil, inanç esasına göre yönetilen Millet Sistemi (Müslümanlar ve gayrimüslimler) çerçevesinde yapılandırılmıştı. Esnaflar, gayrimüslimlerin de katılabildiği Lonca Teşkilatı çatısı altında birleşmişti. Fiyatların devlet tarafından belirlenmesine Narh Sistemi, dükkan açma ruhsatına Gedik denirdi.",
        bullets: [
          "Cizye vergisi gayrimüslimlerin sağlıklı erkeklerinden askere gitmemeleri karşılığında alınan şer'i bir vergidir.",
          "Vakıf sistemi sayesinde okul, hastane, aşevi, cami ve çeşme gibi tüm sosyal hizmetler hazineden para harcanmadan karşılanmıştır.",
          "Eğitim kurumlarının başında gelen Medreselerde dini ilimlerin yanı sıra matematik, astronomi ve tıp gibi akli ilimler de müfredatta yer alırdı."
        ]
      }
    ],
    mustKnow: [
      "Veraset sistemindeki değişim sırası (ülke hanedanın ortak malıdır -> padişah ve oğullarının malıdır -> padişahın malıdır -> ekber ve erşed)",
      "Seyfiye, ilmiye ve kalemiye sınıflarının görevleri ve divandaki temsilcileri",
      "Tımar sisteminin askeri (hazır ordu), mali (sıfır maliyetli vergi) ve idari (asayiş ve üretim) faydaları",
      "Millet sisteminin din esasına dayandığı ve asimilasyonu değil, inanç özgürlüğünü hedeflediği",
      "Salyaneli ve salyanesiz eyaletlerin farkları ile iltizam/mültezim kavramları"
    ],
    commonMistakes: [
      "Kapıkulu askerleri ile Tımarlı Sipahileri karıştırmak (Kapıkulu devşirmedir, maaş alır; Tımarlı Sipahi Türk kökenlidir, dirlik toprak geliriyle yaşar).",
      "Müsadere sisteminin halkın özel mülkiyetini yok ettiğini düşünmek (Sadece haksız kazanç sağlayan veya gücünü padişaha karşı kullanabilecek devlet memurlarına uygulanmıştır).",
      "Şeyhülislamın divanın asli ve daimi üyesi olduğunu sanmak (Klasik dönemde divanın asli üyesi değildi; sadece gerek görüldüğünde çağrılıp fetva istenirdi)."
    ]
  },
  {
    id: "t6",
    slug: "osmanli-yenilesme",
    title: "Osmanlı Yenileşme ve Demokratikleşme",
    era: "yenilesme",
    shortDescription: "18. ve 19. yüzyıl ıslahatları, batılılaşma, II. Mahmut reformları, Tanzimat ve Islahat fermanları, anayasal gelişmeler ve Meşrutiyet.",
    keywords: ["Lale Devri", "Tanzimat", "Islahat", "Kanunuesasi", "Mesrutiyet", "Sened-i Ittifak", "II. Mahmut", "vaka-i hayriye", "nizam-i cedid", "31 Mart Vakasi", "Hunkar Iskelesi", "Baltalimani", "Duyun-u Umumiye", "III. Selim", "genc osmanlilar", "ittihat ve terakki"],
    examImportance: 90,
    estimatedMinutes: 56,
    quickTimeline: [
      { date: "1718", event: "Pasarofça Antlaşması ile Lale Devri'nin ve batılılaşmanın başlaması" },
      { date: "1789", event: "III. Selim'in Nizam-ı Cedid reformlarını başlatması" },
      { date: "1808", event: "II. Mahmut ile Ayanlar arasında Sened-i İttifak'ın imzalanması" },
      { date: "1826", event: "Yeniçeri Ocağı'nın kaldırılarak (Vaka-i Hayriye) Asakir-i Mansure ordusunun kurulması" },
      { date: "1833", event: "Boğazlar sorununu başlatan Osmanlı-Rusya Hünkar İskelesi Antlaşması" },
      { date: "1838", event: "Osmanlı ekonomisini batıya teslim eden Baltalimanı Ticaret Antlaşması" },
      { date: "1839", event: "Sultan Abdülmecit döneminde kanun üstünlüğünü getiren Tanzimat Fermanı'nın ilanı" },
      { date: "1856", event: "Gayrimüslimlere geniş haklar tanıyan Islahat Fermanı'nın ilanı" },
      { date: "1876", event: "II. Abdülhamid döneminde ilk anayasa Kanun-i Esasi'nin ve I. Meşrutiyet'in ilanı" },
      { date: "1909", event: "Rejime karşı çıkan 31 Mart Vakası'nın bastırılması ve II. Abdülhamid'in tahttan indirilmesi" }
    ],
    summary: [
      {
        heading: "1. 18. Yüzyıl Islahatları ve Batılılaşmanın İlk Adımları",
        body: "18. yüzyılda Osmanlı Devleti askeri üstünlüğün batıya geçtiğini kabul etmiştir. Lale Devri (1718-1730) ile başlayan bu süreçte askeri ıslahat yapılmamış; ilk geçici elçilikler (Paris - Yirmisekiz Mehmet Çelebi), ilk özel Türk matbaası (İbrahim Müteferrika), çiçek aşısı ve itfaiye teşkilatı kurulmuştur. Dönem Patrona Halil İsyanı ile kapanmıştır. I. Mahmud ve III. Mustafa dönemlerinde askeri alanda batılı uzmanlar (Humbaracı Ahmet Paşa/Baron de Tott) getirilmiştir. III. Selim dönemi ise radikal ıslahatların yapıldığı Nizam-ı Cedid dönemidir. İlk kalıcı elçilikler (Londra - Yusuf Agah Efendi) açılmış, batı tarzı Nizam-ı Cedid ordusu kurulmuş ve giderleri için İrad-ı Cedid hazinesi oluşturulmuştur. Bu dönem Kabakçı Mustafa İsyanı ile sona ermiştir.",
        bullets: [
          "Lale Devri'ndeki geçici elçilikler batı dünyasının idari ve kültürel yapısını yakından takip etmeyi amaçlamıştır.",
          "Nizam-ı Cedid ordusu, Napolyon'un Mısır işgali sırasında Akka Kalesi'nde (Cezzar Ahmet Paşa) ilk askeri zaferini kazanmıştır.",
          "Matbaada basılan ilk eser vankulu lügatidir."
        ]
      },
      {
        heading: "2. 19. Yüzyıl Islahatları ve II. Mahmut Dönemi Modernleşmesi",
        body: "19. yüzyılda devlet tamamen merkeziyetçi ve modern idari yapıya geçmiştir. II. Mahmut döneminde 1808'de Ayanlar ile Sened-i İttifak imzalanarak padişahın yetkileri ilk kez sınırlandırılmıştır. 1826 yılında Yeniçeri Ocağı kaldırılarak (Vaka-i Hayriye) ıslahatların önündeki en büyük askeri engel temizlenmiş ve Asakir-i Mansure-i Muhammediye ordusu kurulmuştur. Divan-ı Hümayun kaldırılarak yerine bakanlıklar (Nazırlıklar) kurulmuş, ilk nüfus sayımı (sadece erkekler ve hayvanlar) yapılmış, ilk resmi gazete Takvim-i Vekayi çıkarılmış, pasaport ve karantina uygulamaları başlatılmıştır.",
        bullets: [
          "Hünkar İskelesi Antlaşması (1833), Mısır valisi Kavalalı Mehmet Ali Paşa isyanına karşı Rusya ile imzalanmış ve Boğazlar sorununu doğurmuştur.",
          "Baltalimanı Antlaşması (1838) İngiltere ile imzalanmış, iç gümrük vergilerini kaldırarak yerli tüccarı çökertmiş ve devleti açık pazar yapmıştır.",
          "II. Mahmut döneminde ilköğretim zorunlu hale getirilmiş ve Rüştiyeler (ortaokullar) açılmıştır."
        ]
      },
      {
        heading: "3. Fermanlar Dönemi, Anayasacılık ve Meşrutiyet",
        body: "1839 Tanzimat Fermanı (Mustafa Reşit Paşa okumuştur) ile kanun gücünün üstünlüğü padişah tarafından kabul edilmiş, tüm vatandaşların can, mal, namus güvenliği ve adil yargılanma hakkı garanti edilmiştir. 1856 Islahat Fermanı ise Paris Antlaşması kararlarını etkilemek amacıyla yayınlanmış ve gayrimüslim tebaaya memur olma, il meclislerine girme ve bedelli askerlik gibi çok geniş haklar tanımıştır. 1876'da Genç Osmanlılar'ın (Jön Türkler) baskısıyla padişah II. Abdülhamid tarafından ilk anayasa Kanun-i Esasi ilan edilmiş ve I. Meşrutiyet (meclis sistemi) başlamıştır. 93 Harbi bahane edilerek kapatılan meclis, 1908'de İttihat ve Terakki Cemiyeti'nin baskısıyla (II. Meşrutiyet) yeniden açılmıştır. Rejimi yıkmaya yönelik 31 Mart Vakası (1909) isyanı Hareket Ordusu tarafından bastırılmış ve padişah tahttan indirilmiştir.",
        bullets: [
          "Tanzimat ve Islahat fermanlarında anayasal düzene geçişin temelleri atılmış ancak halk yönetime doğrudan katılmamıştır.",
          "Meşrutiyet ile birlikte Osmanlı tebaası ilk kez seçme-seçilme hakkını kullanarak meclise (Mebusan Meclisi) girmiştir.",
          "1909 anayasa değişiklikleri ile padişahın yetkileri daraltılmış, meclisin yetkileri artırılarak demokratikleşme pekiştirilmiştir."
        ]
      }
    ],
    mustKnow: [
      "Batılılaşmanın Lale Devri ile kültürel/sivil alanda başlayıp, III. Selim ve II. Mahmut ile askeri/idari alana kayması",
      "Sened-i İttifak'ın padişah yetkilerini kısıtlayan ilk belge olma özelliği ve Magna Carta ile benzerliği",
      "Vaka-i Hayriye'nin (Yeniçeri Ocağı'nın kaldırılması) ıslahatlar önündeki engelleri kaldıran askeri devrim olması",
      "Tanzimat Fermanı'nın kanun üstünlüğü ve eşitlik getirmesi; Islahat Fermanı'nın ise azınlıklara imtiyaz vermesi farkı",
      "Kanun-i Esasi'nin ilk anayasa, Meşrutiyet'in ise halkın yönetime katıldığı ilk rejim olması"
    ],
    commonMistakes: [
      "Tanzimat Fermanı'nın Avrupalı devletlerin zorlamasıyla imzalandığını sanmak (Tamamen Osmanlı iç dinamikleriyle, Hariciye Nazırı Mustafa Reşit Paşa tarafından hazırlanıp ilan edilmiştir).",
      "Sened-i İttifak'ta anayasal bir halk hareketi olduğunu düşünmek (Sadece padişah ile taşra derebeyleri olan Ayanlar arasında yapılmış elitist bir sözleşmedir; halkın hakları veya meclis yoktur).",
      "Matbaada basılan ilk eserin Kur'an olduğunu sanmak (Hattatların işsiz kalmasını önlemek için dini kitapların basımı yasaklanmış, sözlük basılmıştır)."
    ]
  },
  {
    id: "t7",
    slug: "milli-mucadele-hazirlik-donemi",
    title: "Milli Mücadele Hazirlik Dönemi",
    era: "milli-mucadele",
    shortDescription: "Mondros Ateşkesi, işgaller ve ilk tepkiler, yararlı-zararlı cemiyetler, Havza ve Amasya genelgeleri, Erzurum ve Sivas kongreleri, Misakımilli andı ve TBMM'nin açılışı.",
    keywords: ["Mondros", "Amasya Genelgesi", "Sivas Kongresi", "Misakimilli", "Erzurum Kongresi", "Havza Genelgesi", "Temsil Heyeti", "Amasya Gorusmeleri", "Kuvayimilliye", "Amiral Bristol", "cemiyetler", "mustafa kemal", "general harbord", "sevr", "damat ferit", "mebusan meclisi", "tbmm"],
    examImportance: 88,
    estimatedMinutes: 50,
    quickTimeline: [
      { date: "30 Ekim 1918", event: "Osmanlı'yı fiilen bitiren Mondros Ateşkes Antlaşması'nın imzalanması" },
      { date: "15 Mayıs 1919", event: "İzmir'in işgali ve Gazeteci Hasan Tahsin'in ilk kurşunu atması" },
      { date: "19 Mayıs 1919", event: "Mustafa Kemal'in 9. Ordu Müfettişi olarak Samsun'a ayak basması" },
      { date: "28 Mayıs 1919", event: "Havza Genelgesi ile halkın işgalleri protesto etmeye çağrılması" },
      { date: "22 Haziran 1919", event: "Amasya Genelgesi ile milli mücadelenin amacı, gerekçesi ve yönteminin ilan edilmesi" },
      { date: "23 Temmuz 1919", event: "Erzurum Kongresi ile ilk kez ulusal sınırlardan (Misakımilli) bahsedilmesi" },
      { date: "4 Eylül 1919", event: "Sivas Kongresi ile cemiyetlerin birleştirilmesi ve manda/himayenin kesin olarak reddedilmesi" },
      { date: "22 Ekim 1919", event: "Amasya Görüşmeleri ile İstanbul Hükümeti'nin Temsil Heyeti'ni hukuken tanıması" },
      { date: "28 Ocak 1920", event: "Son Osmanlı Mebusan Meclisi'nde Misakımilli kararlarının kabul edilmesi" },
      { date: "23 Nisan 1920", event: "Ankara'da Büyük Millet Meclisi'nin (TBMM) açılması ve milli iradenin tecellisi" }
    ],
    summary: [
      {
        heading: "1. Mondros Ateşkesi, İşgaller, Raporlar ve Cemiyetler",
        body: "I. Dünya Savaşı'ndan yenik ayrılan Osmanlı Devleti ile imzalanan Mondros Ateşkesi fiili bir işgal belgesidir. 7. madde (güvenliği tehdit eden stratejik noktaların işgali) ve 24. madde (doğu illerinde -Vilayat-ı Sitte: Erzurum, Van, Harput, Diyarbakır, Sivas, Bitlis- karışıklık çıkarsa işgal edilmesi) vatanı parçalama planlarıdır. İzmir'in işgali (15 Mayıs 1919) halkın sabrını taşırmış ve Kuvayımilliye (silahlı halk direnişi) ruhunu doğurmuştur. İşgallerin haksızlığını belirten ilk uluslararası rapor İzmir için Amiral Bristol Raporu, Doğu Anadolu için ise Ermeni iddialarını çürüten General Harbord Raporu'dur. Halk, haklarını savunmak için Müdafaa-i Hukuk cemiyetlerini (yararlı cemiyetler) kurmuştur. Azınlıklar ise devlet kurmak amacıyla zararlı cemiyetleri (Mavri Mira, Pontus Rum, Taşnak) faaliyete geçirmiştir.",
        bullets: [
          "Mondros'un 7. maddesi tüm ülkenin işgaline zemin hazırlayan en tehlikeli hükümdür.",
          "Milli cemiyetler bölgesel kurtuluş amaçlı kurulmuş, Sivas Kongresi'nde Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti olarak birleşmişlerdir.",
          "Türklerin kurduğu zararlı cemiyetler (İngiliz Muhipleri, Wilson Prensipleri) manda yönetimini savunmuşlardır."
        ]
      },
      {
        heading: "2. Genelgeler ve Kongreler Dönemi (Milli Harekâtın Örgütlenmesi)",
        body: "Mustafa Kemal Samsun'a çıktıktan sonra Havza Genelgesi ile milli bilinci mitinglerle uyandırmayı hedeflemiştir. Amasya Genelgesi (22 Haziran 1919) milli mücadelenin yol haritasıdır: 'Vatanın bütünlüğü milletin bağımsızlığı tehlikededir' (Gerekçe), 'Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır' (Amaç ve Yöntem - ilk kez milli egemenlik vurgusu). Erzurum Kongresi bölgesel toplanıp ulusal kararlar almıştır; ilk kez ulusal sınırlardan (Misakımilli) bahsedilmiş ve ilk kez manda-himaye reddedilmiştir. Sivas Kongresi ise her yönüyle ulusal olup manda ve himaye kesin olarak reddedilmiş, Temsil Heyeti tüm yurdu temsil eder hale gelmiş ve Ali Fuat Paşa batı cephesi komutanlığına atanarak yürütme yetkisi kullanılmıştır.",
        bullets: [
          "Mustafa Kemal, Amasya Genelgesi sonrasında İstanbul Hükümeti tarafından görevden alınacağını anlayınca askerlik mesleğinden istifa etmiştir (Sine-i Millete dönüş).",
          "Erzurum Kongresi'ne Mustafa Kemal ve Rauf Orbay sivil delege olarak katılmışlardır.",
          "Sivas Kongresi'nde milli mücadelenin sesini duyurmak amacıyla İrade-i Milliye gazetesi çıkarılmıştır."
        ]
      },
      {
        heading: "3. Misakımilli Kararları ve Meclisin Açılışı",
        body: "Sivas Kongresi sonrasında Damat Ferit hükümeti istifa etmiş, yerine kurulan Ali Rıza Paşa hükümetiyle Amasya Görüşmeleri yapılmıştır. Bu görüşmelerle İstanbul hükümeti Temsil Heyeti'ni hukuken tanımıştır. Görüşmeler sonucu Mebusan Meclisi'nin açılmasına karar verilmiştir. İstanbul'da toplanan son Osmanlı Mebusan Meclisi 28 Ocak 1920'de Misakımilli kararlarını (Milli And) kabul etmiştir. Kararlar; sınırlar, boğazlar, azınlıklar, kapitülasyonların kaldırılması ve borçlar konularını içerir. Misakımilli'nin kabulü üzerine İtilaf Devletleri 16 Mart 1920'de İstanbul'u resmen işgal etmiş ve meclisi dağıtmıştır. Bu gelişme Ankara'da 23 Nisan 1920'de TBMM'nin açılmasına doğrudan zemin hazırlamıştır.",
        bullets: [
          "Misakımilli sınırları Mondros imzalandığı gün Türk ordusunun koruduğu (işgal edilmemiş) sınırlardır.",
          "TBMM'nin açılmasıyla Temsil Heyeti'nin görevi sona ermiş, meclis hükümeti sistemiyle milli egemenlik kurumsallaşmıştır.",
          "Meclis başkanlığına seçilen Mustafa Kemal'in sunduğu 1 Nolu Önerge (Meclisin üstünde güç yoktur) kurucu meclis yapısını gösterir."
        ]
      }
    ],
    mustKnow: [
      "Mondros'un 7. ve 24. maddelerinin işgallerin yayılması ve Ermeni devleti tasarısındaki stratejik rolleri",
      "Amasya Genelgesi'nin milli mücadelenin amacı, gerekçesi ve yöntemini belirten ihtilal beyannamesi olması",
      "Erzurum Kongresi'nin toplanış yönüyle bölgesel, kararlarıyla ulusal niteliği ile sivil delege katılımları",
      "Sivas Kongresi'nde tüm cemiyetlerin birleştirilmesinin 'birlik ve beraberlik' ilkesiyle ilişkisi",
      "Misakımilli'nin tam bağımsızlık andı olması ve kapitülasyonların kaldırılmasını kesin şart koşması"
    ],
    commonMistakes: [
      "Mustafa Kemal'in Samsun'a sivil veya isyancı olarak çıktığını sanmak (Resmi olarak 9. Ordu Müfettişi sıfatıyla, geniş askeri ve mülki yetkilerle gönderilmiştir).",
      "Misakımilli kararlarını ilk TBMM'nin kabul ettiğini düşünmek (Kararlar İstanbul'daki son Osmanlı Mebusan Meclisi tarafından kabul edilmiştir; bu yüzden meclis basılmış ve Ankara'da yeni meclis açılmıştır).",
      "Erzurum Kongresi kararlarında milli egemenlikten ilk kez bahsedildiğini sanmak (İlk kez Amasya Genelgesi'nde bahsedilmiştir)."
    ]
  },
  {
    id: "t8",
    slug: "kurtulus-savasi-ve-antlasmalar",
    title: "Kurtulus Savasi ve Antlasmalar",
    era: "milli-mucadele",
    shortDescription: "Doğu, Güney ve Batı cephelerindeki muharebeler, Gümrü, Kars ve Ankara antlaşmaları, Sakarya ve Büyük Taarruz zaferleri, Mudanya Ateşkesi ve Lozan Barış Antlaşması.",
    keywords: ["Mudanya", "Lozan", "Sakarya Savasi", "Gumru", "I. Inonu", "II. Inonu", "Kutahya-Eskisehir", "Buyuk Taarruz", "Kars Antlasmasi", "Ankara Antlasmasi", "Tekalif-i Milliye", "Baskomutanlik", "ismet inonu", "moskova antlasmasi", "londra konferansi", "sevr", "mudanya"],
    examImportance: 92,
    estimatedMinutes: 55,
    quickTimeline: [
      { date: "3 Aralık 1920", event: "Doğu cephesini kapatan ve TBMM'nin ilk diplomatik zaferi olan Gümrü Antlaşması'nın imzalanması" },
      { date: "6-10 Ocak 1921", event: "Batı cephesinde düzenli ordunun ilk zaferi olan I. İnönü Savaşı" },
      { date: "Mart 1921", event: "I. İnönü sonrası Teşkilat-ı Esasiye, İstiklal Marşı, Afgan Paktı ve Moskova Antlaşması'nın yapılması" },
      { date: "Temmuz 1921", event: "Düzenli ordunun tek yenilgisi olan Kütahya-Eskişehir Savaşları ve Sakarya doğusuna çekilme" },
      { date: "5 Ağustos 1921", event: "Mustafa Kemal'e Başkomutanlık yetkisinin verilmesi ve Tekalif-i Milliye Emirleri'nin yayınlanması" },
      { date: "23 Ağustos 1921", event: "Sakarya Meydan Muharebesi ile Türk ordusunun 238 yıllık savunma safhasının sona ermesi" },
      { date: "13 Ekim 1921", event: "Doğu sınırını kesinleştiren Kars Antlaşması ve güneyi kapatan Ankara Antlaşması'nın imzalanması" },
      { date: "30 Ağustos 1922", event: "Büyük Taarruz (Dumlupınar) zaferiyle Yunan ordusunun Anadolu'dan temizlenmesi" },
      { date: "11 Ekim 1922", event: "Doğu Trakya, İstanbul ve Boğazları savaşsız kurtaran Mudanya Ateşkes Antlaşması" },
      { date: "24 Temmuz 1923", event: "Yeni Türk devletinin bağımsızlık belgesi olan Lozan Barış Antlaşması'nın imzalanması" }
    ],
    summary: [
      {
        heading: "1. Cepheler Dönemi: Doğu ve Güney Cepheleri",
        body: "Kurtuluş Savaşı askeri safhası üç ana cephede şekillenmiştir. Doğu cephesinde Ermenilere karşı 15. Kolordu komutanı Kazım Karabekir savaşmış ve kazanılan zafer sonucunda Gümrü Antlaşması (3 Aralık 1920) imzalanmıştır. Gümrü, TBMM'nin askeri ve siyasi alandaki ilk uluslararası başarısıdır ve Ermeniler Doğu Anadolu toprak taleplerinden vazgeçmişlerdir. Güney cephesinde düzenli ordu bulunmamış, halk Kuvayımilliye direnişiyle (Sütçü İmam - Maraş, Şahin Bey - Antep, Ali Saip - Urfa) Fransız ve Ermeni işgallerini durdurmuştur. Batı cephesindeki Sakarya Meydan Muharebesi zaferinden sonra imzalanan 1921 Ankara Antlaşması ile güney cephesi kapanmış, Hatay hariç güney toprakları kurtarılmıştır (Hatay'ın Suriye'ye bırakılması Misakımilli'den verilen ikinci tavizdir).",
        bullets: [
          "Doğu cephesinin kapanmasıyla buradaki askeri birlikler batı cephesine kaydırılmıştır.",
          "Fransa, TBMM'yi ve Misakımilli'yi tanıyan ilk İtilaf Devleti olmuştur.",
          "Güney cephesinde halkın destansı kahramanlıkları sonucu şehirlere Gazi, Kahraman ve Şanlı unvanları verilmiştir."
        ]
      },
      {
        heading: "2. Batı Cephesi Savaşları ve Topyekün Seferberlik",
        body: "Batı cephesinde Yunanistan'a karşı düzenli ordu savaşmıştır. I. İnönü zaferi sonrasında İtilaf Devletleri TBMM'yi Londra Konferansı'na davet ederek varlığını hukuken tanımış, Sovyet Rusya ile Moskova Antlaşması imzalanmış (Batum'un Gürcistan'a bırakılması Misakımilli'den ilk tavizdir), İstiklal Marşı ve Teşkilat-ı Esasiye anayasası kabul edilmiştir. II. İnönü Savaşı da zaferle sonuçlanmış; ancak Kütahya-Eskişehir muharebelerinde düzenli ordu yenilerek Sakarya Nehri'nin doğusuna çekilmiştir. Bu kriz üzerine meclis Mustafa Kemal'e tüm yetkilerini devrederek Başkomutan yapmış, Mustafa Kemal de ordunun giyim, gıda ve silah ihtiyaçlarını halktan toplamak amacıyla Tekalif-i Milliye Emirleri'ni yayınlamıştır.",
        bullets: [
          "Sakarya Meydan Muharebesi (1921), Mustafa Kemal'in 'Hattı müdafaa yoktur, sathı müdafaa vardır, o satıh bütün vatandır' emriyle topyekün savaş stratejisiyle kazanılmıştır.",
          "Sakarya savaşı sonrasında Kafkas Cumhuriyetleriyle Kars Antlaşması imzalanarak doğu sınırımız kesin halini almıştır.",
          "Kütahya-Eskişehir yenilgisi sürerken Ankara'da I. Maarif Kongresi (Eğitim Kongresi) toplanmış, eğitime verilen önem gösterilmiştir."
        ]
      },
      {
        heading: "3. Büyük Taarruz, Mudanya ve Lozan Barış Antlaşması",
        body: "Bir yıllık hazırlık döneminden sonra 26 Ağustos 1922'de başlayan Büyük Taarruz (Başkomutanlık Meydan Muharebesi) zaferle sonuçlanmış ve Yunan ordusu Anadolu'dan temizlenmiştir. 11 Ekim 1922'de imzalanan Mudanya Ateşkes Antlaşması ile Doğu Trakya, İstanbul ve Boğazlar savaş yapılmadan diplomatik yolla kurtarılmıştır. Mudanya, Osmanlı Devleti'nin hukuken sona erdiğinin kanıtıdır. 24 Temmuz 1923'te imzalanan Lozan Barış Antlaşması ile kapitülasyonlar kaldırılmış, Duyun-u Umumiye borçları taksitlendirilmiş, Ermeni yurdu iddiası bitirilmiş ve azınlıklar Türk vatandaşı sayılarak iç işlerimize karışılması engellenmiştir. Irak sınırı (Musul) çözülemeyip sonraya bırakılmıştır.",
        bullets: [
          "Lozan görüşmelerine giderken TBMM, ikili temsilciliği önlemek amacıyla 1 Kasım 1922'de Saltanatı kaldırmıştır.",
          "Lozan'da taviz verilmemesi istenen iki konu: Ermeni yurdu ve kapitülasyonların kesinlikle kaldırılmasıdır.",
          "Lozan sonrasında çözülemeyip ikili görüşmelere bırakılan tek sınır konusu Irak sınırıdır."
        ]
      }
    ],
    mustKnow: [
      "Gümrü Antlaşması'nın doğu cephesini kapatarak TBMM'nin ilk diplomatik meşruiyetini tescillemesi",
      "I. İnönü Savaşı sonrasında yaşanan anayasal ve diplomatik gelişmelerin sıralaması ve önemi",
      "Tekalif-i Milliye Emirleri'nin meclis yetkisiyle değil, Başkomutanlık şahsi yetkisiyle yayınlandığı",
      "Sakarya Meydan Muharebesi'nin Türk savunma tarihinin son geri çekiliş savaşı olduğu gerçeği",
      "Mudanya ile Osmanlı'nın hukuken bittiği; Lozan ile tam bağımsızlığın tescillendiği"
    ],
    commonMistakes: [
      "Tekalif-i Milliye emirlerinin Sakarya Savaşı'ndan sonra uygulandığını sanmak (Savaştan hemen önce ordunun hazırlanması amacıyla yayınlanmıştır, Sakarya ve Büyük Taarruz'da kullanılmıştır).",
      "Lozan'da tüm sınır sorunlarının çözüldüğünü düşünmek (Irak Musul sınırı çözülememiş, 1926 Ankara Antlaşması ile aleyhimize çözülmüştür; Hatay ise 1939'da anavatana katılmıştır).",
      "Güney cephesinde düzenli ordu birliklerinin savaştığını sanmak (Tamamen yerel sivil Kuvayımilliye direnmiştir)."
    ]
  },
  {
    id: "t9",
    slug: "atatork-ilke-ve-inkilaplari",
    title: "Atatürk İlke ve İnkılapları",
    era: "milli-mucadele",
    shortDescription: "Altı temel ilke (Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık), siyasi, sosyal, eğitim ve hukuk alanındaki devrimler.",
    keywords: ["Cumhuriyetcilik", "Halkcilik", "Devletcilik", "Laiklik", "Milliyetcilik", "Inkilapcilik", "saltanat", "halifelik", "tevhid-i tedrisat", "medeni kanun", "kabotaj", "harf inkilabi", "soyadi kanunu", "asar", "millet mektepleri", "turk tarih kurumu", "turk dil kurumu", "resmi nikah", "kadin haklari", "sapka kanunu"],
    examImportance: 92,
    estimatedMinutes: 58,
    quickTimeline: [
      { date: "1 Kasım 1922", event: "Lozan öncesi ikiliği önlemek amacıyla Saltanatın kaldırılması" },
      { date: "29 Ekim 1923", event: "Cumhuriyetin ilanı ve kabine hükümeti sistemine geçiş" },
      { date: "3 Mart 1924", event: "Halifeliğin kaldırılması, Tevhid-i Tedrisat ve Şer'iye-Evkaf Vekaleti'nin lağvedilmesi" },
      { date: "17 Şubat 1926", event: "İsviçre'den uyarlanan Türk Medeni Kanunu'nun kabul edilmesi" },
      { date: "1 Temmuz 1926", event: "Denizlerde tam bağımsızlığı sağlayan Kabotaj Kanunu'nun yürürlüğe girmesi" },
      { date: "1 Kasım 1928", event: "Harf İnkılabı ile yeni Türk alfabesinin kabulü ve Millet Mektepleri'nin açılışı" },
      { date: "1930-1934", event: "Türk kadınına sırasıyla Belediye, Muhtarlık ve Milletvekilliği seçme-seçilme haklarının verilmesi" },
      { date: "21 Haziran 1934", event: "Soyadı Kanunu'nun kabulü ve ayrıcalıklı unvanların yasaklanması" }
    ],
    summary: [
      {
        heading: "1. Atatürk'ün Altı Temel İlkesi ve Anahtar Kelimeleri",
        body: "Atatürk ilkeleri devrimlerin fikri temelini oluşturur. Cumhuriyetçilik: Milli egemenlik, milli irade, seçim, parlamento, seçme-seçilme hakkı ve çok partili yaşamı hedefler. Milliyetçilik: Milli bağımsızlık, milli kimlik, vatan sevgisi, ortak dil ve tarih şuurudur; ırkçılığı reddeder. Halkçılık: Kanun önünde eşitlik, sınıfsız toplum, sosyal adalet, sosyal devlet ve halk yararıdır (Aşar vergisinin kaldırılması, Soyadı kanunu). Devletçilik: Özel sektörün sermaye yetersizliği nedeniyle yatırımların doğrudan devlet eliyle yapılmasıdır (Sümerbank, Etibank, I. Beş Yıllık Sanayi Planı). Laiklik: Din ve devlet işlerinin ayrılması, din ve vicdan özgürlüğü, akılcılık ve bilimselliktir (Halifeliğin kaldırılması, Medreselerin kapatılması). İnkılapçılık: Çağdaşlaşma, batılılaşma, sürekli yenilenme ve dinamizmdir; durağanlığı reddeder.",
        bullets: [
          "Kabotaj Kanunu, denizlerimizde Türk gemilerine tekel hakkı tanıdığı için doğrudan Milliyetçilik ilkesinin sonucudur.",
          "Kadınlara seçme ve seçilme hakkının verilmesi hem Cumhuriyetçilik (milli irade) hem de Halkçılık (kadın-erkek eşitliği) ilkeleriyle ilgilidir.",
          "Atatürk ilkeleri 1937 yılında yapılan anayasa değişikliği ile Türkiye Cumhuriyeti Anayasası'na resmen eklenmiştir."
        ]
      },
      {
        heading: "2. Siyasi, Hukuk ve Sosyal Alandaki İnkılaplar",
        body: "Siyasi alanda; Saltanat kaldırılmış (1922), Ankara başkent yapılmış (1923), Cumhuriyet ilan edilmiş (1923 - hükümet bunalımı çözülmüş, devlet başkanı sorunu halledilmiştir) ve Halifelik kaldırılmıştır (1924 - laikleşmenin en önemli adımıdır). Hukuk alanında; 1926 yılında İsviçre'den uyarlanan Türk Medeni Kanunu kabul edilmiştir. Medeni Kanun ile; resmi nikah zorunlu olmuş, tek eşle evlilik getirilmiş, kadınlara miras, boşanma, velayet ve mahkemede şahitlik konularında erkeklerle tam eşitlik tanınmıştır. Sosyal alanda; Şapka Kanunu çıkarılmış, tekke, zaviye ve türbeler kapatılmış, takvim, saat, ölçü birimleri ve hafta tatili batı dünyasına uyum için değiştirilmiştir. Soyadı Kanunu (1934) ile ayrıcalık bildiren unvanlar yasaklanmıştır.",
        bullets: [
          "Medeni Kanun kadına sosyal ve ekonomik eşitlik sağlamış ancak seçme ve seçilme (siyasi) haklarını vermemiştir.",
          "Kadınlara siyasi haklar 1930'da Belediye, 1933'te Muhtar, 1934'te Milletvekili seçimleriyle verilmiştir (Şifre: 034 BMM).",
          "Şapka kanunu ve kılık kıyafet düzenlemesi toplumsal alanda laikleşmeyi ve eşitliği sağlamayı amaçlamıştır."
        ]
      },
      {
        heading: "3. Eğitim, Kültür ve Ekonomi Alanındaki İnkılaplar",
        body: "Eğitim ve kültür alanında; 3 Mart 1924 Tevhid-i Tedrisat Kanunu ile ülkedeki tüm okullar MEB'e bağlanarak eğitim birliği sağlanmış, medreseler kapatılmıştır. 1928'de Harf İnkılabı yapılarak yeni Türk alfabesi kabul edilmiş, yeni harfleri yetişkin halka öğretmek amacıyla Millet Mektepleri açılmıştır. Atatürk bu mekteplerin Başöğretmeni unvanını almıştır. Türk Tarih Kurumu (1931) ve Türk Dil Kurumu (1932) milli tarih ve dil şuurunu geliştirmek için kurulmuştur. Ekonomi alanında; İzmir İktisat Kongresi toplanmış, tarımı rahatlatmak için Aşar Vergisi kaldırılmış, Teşvik-i Sanayi Kanunu çıkarılmış (başarısız olunca Devletçilik ilkesine geçilmiştir) ve I. Beş Yıllık Sanayi Planı başarıyla uygulanmıştır.",
        bullets: [
          "Tevhid-i Tedrisat Kanunu ile azınlık ve yabancı okulların dini propaganda yapması yasaklanmış ve denetime alınmıştır.",
          "Tarım sektörünü desteklemek amacıyla köylüye ucuz kredi sağlayan Ziraat Bankası imkanları artırılmıştır (Ziraat Bankası Osmanlı döneminde -Mithat Paşa/Memleket Sandıkları- kurulmuştur, yeni kurulan bir banka değildir).",
          "Kabotaj Kanunu millileşmenin en büyük adımı olup yabancı devletlerin deniz ticareti ayrıcalıklarına son vermiştir."
        ]
      }
    ],
    mustKnow: [
      "Altı ilkenin kavramsal eşleştirmeleri ve devrimlerle olan doğrudan bağlantıları",
      "Medeni Kanun'un içeriğinde siyasi hakların (seçme-seçilme) yer almadığı gerçeği",
      "Halifeliğin kaldırılmasının rejim güvenliği, laiklik ve ulus devlet inşasındaki yeri",
      "Eğitim birliğinin (Tevhid-i Tedrisat) medreselerin kapatılmasına ve laik eğitime zemin hazırlaması",
      "Kadınların siyasi hakları elde ediş sırasının kronolojisi (Belediye -> Muhtar -> Milletvekili)"
    ],
    commonMistakes: [
      "Kadın haklarının tamamının tek bir günde veya Medeni Kanun ile verildiğini sanmak (Medeni Kanun sosyal hakları vermiştir; siyasi haklar anayasa değişiklikleriyle daha sonra verilmiştir).",
      "Harf inkılabıyla okuma yazma oranının düştüğünü veya geçmişin unutturulduğunu sanmak (Aksine, okuma yazma kolaylaşmış ve Millet Mektepleriyle okuma yazma oranı hızla tırmanmıştır).",
      "Ziraat Bankası'nın Atatürk döneminde kurulduğunu düşünmek (Osmanlı döneminde, II. Abdülhamid devrinde Memleket Sandıklarının birleştirilmesiyle kurulmuştur)."
    ]
  },
  {
    id: "t10",
    slug: "cumhuriyet-donemi-dis-politika",
    title: "Cumhuriyet Dönemi Dış Politika",
    era: "milli-mucadele",
    shortDescription: "Lozan sonrası ikili sorunlar (yabancı okullar, Musul sınırı, nüfus mübadelesi, borçlar), barış ittifakları (Milletler Cemiyeti, Balkan Antantı, Sadabat Paktı), Boğazlar egemenliği (Montrö) ve Hatay'ın katılması.",
    keywords: ["Montro", "Hatay", "Balkan Antanti", "Sadabat Pakti", "nufus mubadelesi", "yabanci okullar", "Musul", "Bozkurt-Lotus", "Milletler Cemiyeti", "Hoover Moratoryumu", "adana gorusmesi", "kahire konferansi", "balkan antanti", "briand-kellogg", "nyon konferansi"],
    examImportance: 90,
    estimatedMinutes: 56,
    quickTimeline: [
      { date: "1924-1925", event: "Fransa ile Yabancı Okullar sorununun egemenlik esasına göre çözülmesi" },
      { date: "1926", event: "Bozkurt-Lotus davasında Türkiye'nin Lahey'de haklı bulunması" },
      { date: "5 Haziran 1926", event: "Ankara Antlaşması ile Musul'un Irak'a bırakılması (Misakımilli'den büyük taviz)" },
      { date: "1930", event: "Yunanistan ile Ahali (Nüfus Mübadelesi) sorununun çözülmesi ve dostluk dönemi" },
      { date: "18 Temmuz 1932", event: "Türkiye'nin Milletler Cemiyeti'ne (Cemiyet-i Akvam) resmen üye olması" },
      { date: "9 Şubat 1934", event: "Batı sınırını korumak için Balkan Antantı'nın kurulması" },
      { date: "20 Temmuz 1936", event: "Montrö Boğazlar Sözleşmesi ile Boğazlar Komisyonu'nun kaldırılarak tam egemenlik kurulması" },
      { date: "8 Temmuz 1937", event: "Doğu sınırını korumak için Sadabat Paktı'nın kurulması" },
      { date: "23 Haziran 1939", event: "Hatay Meclisi'nin anavatana katılma kararını onaylaması" }
    ],
    summary: [
      {
        heading: "1. 1923-1930 Dönemi (Lozan'dan Kalan Sorunların Çözümü)",
        body: "Cumhuriyetin ilk yıllarında dış politika, Lozan'da tam çözülemeyen pürüzlerin giderilmesine adanmıştır. Yabancı Okullar Sorunu: Fransa ile yaşanmış, Türkiye bunu egemenlik hakkı ve iç mesele kabul ederek dış devletlerle masaya oturmamış ve okulları Tevhid-i Tedrisat kurallarına bağlamıştır. Musul Sorunu (Irak Sınırı): Lozan'da çözülememiş, ikili görüşmelerde de anlaşma sağlanamayınca Milletler Cemiyeti'ne gitmiştir. Tam bu sırada çıkan Şeyh Sait İsyanı (1925) Türkiye'nin askeri müdahale gücünü zayıflatmış ve 1926 Ankara Antlaşması ile Musul Irak'a bırakılmıştır. Nüfus Mübadelesi Sorunu: Yunanistan ile yaşanan yerleşikler (etablis) krizi 1930 antlaşmasıyla çözülmüş, İstanbul Rumları ile Batı Trakya Türkleri hariç herkes karşılıklı göç etmiştir. Borçlar Sorunu: 1929 dünya buhranında ödemeler zorlaşınca Fransa ile Hoover Moratoryumu kapsamında borçlar taksitlendirilmiştir.",
        bullets: [
          "Bozkurt-Lotus Davası (1926): Ege denizinde çarpışan Türk ve Fransız gemileri sonrası Adliye Nazırı Mahmut Esat Bey'in Lahey Adalet Divanı'nda Türkiye'yi başarıyla temsil edip kazandığı davadır (kendisine Bozkurt soyadı verilmiştir).",
          "Dış borçlar sorunu çözülürken, borcun kağıt para veya frang cinsinden ödenmesi sağlanarak bütçe korunmuştur.",
          "Türkiye bu dönemde dış politikada tamamen barışçıl ve savunmacı bir tutum izlemiştir."
        ]
      },
      {
        heading: "2. 1930-1939 Dönemi (Yaklaşan Dünya Savaşı ve Güvenlik Paktları)",
        body: "İtalya ve Almanya'nın silahlanarak yayılmacı politikalar izlemesi üzerine Türkiye çok yönlü güvenlik paktları kurmuştur. Batı sınırının güvenliği için Balkan Antantı (Türkiye, Yunanistan, Yugoslavya, Romanya) kurulmuştur. Doğu sınırının güvenliği için ise Sadabat Paktı (Türkiye, İran, Irak, Afganistan) kurulmuştur. Türkiye, uluslararası barışa katkı vermek için 1932'de davet üzerine Milletler Cemiyeti'ne üye olmuş; Briand-Kellogg Paktı (savaşın politika aracı olmaktan çıkarılması) ve Litvinov Protokolü'ne de imza atmıştır.",
        bullets: [
          "Balkan Antantı'na Bulgaristan (yayılmacı hedefleri) ve Arnavutluk (İtalya baskısı) katılmamıştır.",
          "Sadabat Paktı'na sınır sorunları nedeniyle Suriye, Basra körfezi endişesiyle de Irak dışındaki diğer Arap devletleri dahil olmamıştır.",
          "Güvenlik paktları sayesinde Türkiye iki cephede de sınır güvenliğini II. Dünya Savaşı öncesinde güvenceye almıştır."
        ]
      },
      {
        heading: "3. Boğazlar Egemenliği (Montrö) ve Hatay'ın Anavatana Katılması",
        body: "Lozan'da Boğazlar yönetimi, başkanı Türk olan uluslararası bir komisyona bırakılmış ve kıyıları askersizleştirilmişti. Bu durum Türkiye'nin güvenliğini tehdit ediyordu. İtalya'nın Habeşistan'ı işgali ve Avrupa'daki silahlanma yarışı üzerine Türkiye diplomatik atağa geçmiştir. 1936 Montrö Boğazlar Sözleşmesi ile Boğazlar Komisyonu kaldırılmış, Boğazlardaki askersiz alanlar sonlandırılmış ve Boğazların yönetimi ile askeri savunması tamamen Türkiye'ye verilmiştir. Hatay Sorunu: Lozan'da dışarıda kalan Hatay için Atatürk 'Şahsi meselem' diyerek büyük çaba harcamıştır. 1938'de Hatay Bağımsız Cumhuriyeti kurulmuş, Cumhurbaşkanı Tayfur Sökmen olmuştur. Hatay Meclisi, II. Dünya Savaşı'nın çıkış arifesinde (23 Haziran 1939) anavatana katılma kararını onaylamış ve Hatay Türkiye sınırlarına katılmıştır.",
        bullets: [
          "Montrö Boğazlar Sözleşmesi ile Lozan'dan kalan en büyük egemenlik kısıtlaması başarıyla kaldırılmıştır.",
          "Atatürk Hatay konusundaki kararlılığını göstermek amacıyla Asım Us takma adıyla Kurun gazetesinde İsmet İnönü hükümetini eleştiren yazılar yazmıştır.",
          "Hatay'ın anavatana katılması Atatürk'ün vefatından (1938) sonra, 1939'da gerçekleşmiştir."
        ]
      }
    ],
    mustKnow: [
      "Yabancı okullar sorununun egemenlik hakları çerçevesinde bir iç sorun kabul edilerek dış müzakerelere kapatılması",
      "Musul sorununun Şeyh Sait isyanı ve iç krizler nedeniyle aleyhimize sonuçlanması",
      "Montrö Sözleşmesi ile Boğazlar Komisyonu'nun kalkarak tam askeri ve idari egemenliğin kurulması",
      "Balkan Antantı ve Sadabat Paktı'na katılan-katılmayan devletler ve katılmama gerekçeleri",
      "Hatay Cumhuriyeti'nin ilk Cumhurbaşkanı (Tayfur Sökmen) ve Başbakanı (Abdurrahman Melek)"
    ],
    commonMistakes: [
      "Balkan Antantı'na Bulgaristan'ın da katıldığını sanmak (Bulgaristan Ege denizine inmek istediği için Yunanistan sınırlarını tanımamış ve katılmamıştır).",
      "Sadabat Paktı'na Suriye'nin de katıldığını düşünmek (Suriye, Türkiye ile yaşadığı Hatay sınırı ve su sorunları nedeniyle katılmamıştır).",
      "Montrö'nün sadece barış zamanı yetki verdiğini sanmak (Savaş zamanında ve savaş tehdidi hissettiğinde Boğazları tamamen kapatma yetkisi Türkiye'ye verilmiştir)."
    ]
  },
  {
    id: "t11",
    slug: "cagdas-turk-ve-dunya-tarihi",
    title: "Çağdaş Türk ve Dünya Tarihi",
    era: "yenilesme",
    shortDescription: "II. Dünya Savaşı yılları ve Türkiye'nin tarafsızlığı, Soğuk Savaş dönemi, Kore Savaşı, NATO'ya giriş, Kıbrıs sorunu ve diplomatik krizler.",
    keywords: ["NATO", "Kibris", "Birlesmis Milletler", "Soguk Savas", "Truman Doktrini", "Marshall Plani", "Kore Savasi", "Bagdat Pakti", "CENTO", "EOKA", "Enosis", "Johnson Mektubu", "Asala", "varlik vergisi", "ekmek karnesi", "koy enstituleri", "cok partili hayat", "demokrat parti", "yunanistan", "eoka"],
    examImportance: 82,
    estimatedMinutes: 42,
    quickTimeline: [
      { date: "1939-1945", event: "II. Dünya Savaşı yılları ve Türkiye'nin aktif tarafsızlık politikası" },
      { date: "1940", event: "Köy öğretmenleri ve tarımsal kalkınma için Köy Enstitüleri'nin kurulması" },
      { date: "1942", event: "II. Dünya Savaşı mali krizinde Varlık Vergisi'nin çıkarılması" },
      { date: "1945", event: "San Francisco Konferansı ile Birleşmiş Milletler'e kurucu üye olarak katılma" },
      { date: "1946", event: "Demokrat Parti'nin kurulması ve çok partili seçimlerin başlaması" },
      { date: "1950", event: "Kore Savaşı'na asker gönderilmesi ve Demokrat Parti'nin iktidara gelmesi (Beyaz İhtilal)" },
      { date: "1952", event: "Kore'deki askeri başarılar sonucu Türkiye'nin NATO'ya kabul edilmesi" },
      { date: "1955", event: "Bağdat Paktı'nın (daha sonra CENTO) kurulması" },
      { date: "1974", event: "Kıbrıs Türklerinin güvenliği için Kıbrıs Barış Harekatı'nın gerçekleştirilmesi" }
    ],
    summary: [
      {
        heading: "1. II. Dünya Savaşı ve Türkiye'nin İdari-Ekonomik Tedbirleri",
        body: "Türkiye, II. Dünya Savaşı boyunca mihver ve müttefik blokların baskılarına rağmen fiilen savaşa girmemiş, aktif tarafsızlık ve denge politikası izlemiştir. Ancak her ihtimale karşı genel seferberlik ilan edilmiş, erkek nüfus silah altına alınmıştır. Bu durum tarımsal ve sanayi üretimini düşürmüş, bütçe açıklarına ve enflasyona yol açmıştır. Ekonomik krizle mücadele için Milli Korunma Kanunu çıkarılmış, enflasyonu önlemek ve karaborsayı engellemek amacıyla Varlık Vergisi yürürlüğe konmuş ve temel gıdalar için Ekmek Karnesi uygulaması başlatılmıştır. Savaşın son aylarında, Birleşmiş Milletler'e kurucu üye olabilmek için sembolik olarak Almanya ve Japonya'ya savaş ilan edilmiştir.",
        bullets: [
          "Köy Enstitüleri (1940), köylere öğretmen yetiştirmek ve modern tarımı yaygınlaştırmak amacıyla Hasan Âli Yücel öncülüğünde bu dönemde açılmıştır.",
          "Adana Görüşmesi (1943): Cumhurbaşkanı İsmet İnönü ile İngiltere Başbakanı Churchill arasında yapılmış, Türkiye askeri malzeme eksikliğini öne sürerek savaşa girmeyi ertelemiştir.",
          "Savaş sonrasında tek parti yönetimine karşı muhalefet başlamış ve çok partili hayata geçilmiştir."
        ]
      },
      {
        heading: "2. Soğuk Savaş Dönemi, NATO Üyeliği ve Çok Partili Hayat",
        body: "Savaş bittiğinde SSCB'nin Türkiye'den Kars ve Ardahan'ı istemesi ve Boğazlarda üs talep etmesi üzerine Türkiye, ABD önderliğindeki batı blokuna katılmıştır. ABD'nin komünizm karşıtı askeri yardımı olan Truman Doktrini ve mali kalkınma planı olan Marshall Planı yardımları alınmıştır. 1950 yılında Demokrat Parti (Adnan Menderes) iktidara gelmiş ve çok partili hayat tam yerleşmiştir. 1950'de patlak veren Kore Savaşı'na BM gücü kapsamında Şimal Yıldızı (Kutup Yıldızı) tugayıyla asker gönderilmiştir. Kore'deki Türk askerinin destansı başarıları sayesinde Türkiye, 1952 yılında NATO'ya (Kuzey Atlantik Paktı) üye olarak kabul edilmiştir.",
        bullets: [
          "1950 seçimleri, CHP iktidarının kansız ve barışçıl bir şekilde Demokrat Parti'ye devredilmesi nedeniyle milli tarihte 'Beyaz İhtilal' olarak anılır.",
          "Orta Doğu'da Sovyet yayılmacılığını engellemek amacıyla Türkiye, Irak, İran, Pakistan ve İngiltere arasında Bağdat Paktı kurulmuş, Irak'ın çekilmesiyle CENTO adını almıştır.",
          "Balkan Paktı (1953) Türkiye, Yunanistan ve Yugoslavya arasında soğuk savaş döneminde kurulan diğer bir savunma ittifakıdır."
        ]
      },
      {
        heading: "3. Kıbrıs Meselesi, Johnson Mektubu ve Dış Krizler",
        body: "1950'lerden itibaren Kıbrıs adasını Yunanistan'a bağlamayı hedefleyen Rumlar (Enosis ülküsü), EOKA terör örgütünü kurarak Türklere karşı katliamlar başlatmıştır. Türkiye buna karşı adadaki Türklerin direnişini örgütleyen Türk Mukavemet Teşkilatı'nı (TMT) kurmuştur. 1959 Zürih ve Londra antlaşmalarıyla garantör devletler (Türkiye, Yunanistan, İngiltere) denetiminde Kıbrıs Cumhuriyeti kurulmuştur. Ancak Rumların saldırılarının sürmesi üzerine Türkiye müdahale kararı almış, 1964'te ABD Başkanı Johnson yazdığı sert mektup (Johnson Mektubu) ile Türkiye'nin müdahalesini engellemiştir. Saldırıların durmaması üzerine 20 Temmuz 1974'te Bülent Ecevit başbakanlığında Kıbrıs Barış Harekatı (Ayşe Tatile Çıksın şifresiyle) düzenlenmiş ve adanın kuzeyinde Türklerin güvenliği sağlanmıştır.",
        bullets: [
          "Kıbrıs Barış Harekâtı sonrasında ABD, Türkiye'ye 3 yıl boyunca ağır silah ambargosu uygulamıştır.",
          "1970 ve 80'lerde ASALA terör örgütü dış temsilciliklerimize saldırarak onlarca diplomatımızı şehit etmiştir.",
          "Yunanistan ile Ege denizinde Kıta Sahanlığı sorunu, Kara Suları (6 mil - 12 mil tartışması) ve Fır Hattı (hava sahası kontrolü) sorunları yaşanmıştır."
        ]
      }
    ],
    mustKnow: [
      "II. Dünya Savaşı'nın Türkiye'deki ekonomik tedbirleri (Varlık Vergisi, Milli Korunma Kanunu, Ekmek Karnesi)",
      "Türkiye'nin NATO'ya girebilmek amacıyla Kore Savaşı'na asker göndermesi gerçeği",
      "Kıbrıs Barış Harekâtı'nın (1974) garantörlük hakkına dayalı hukuki zemini ve sonuçları",
      "Johnson Mektubu'nun (1964) Türk-ABD ilişkilerinde yarattığı ilk büyük diplomatik kriz önemi",
      "Truman Doktrini ve Marshall Planı'nın Soğuk Savaş dönemindeki askeri ve ekonomik rolleri"
    ],
    commonMistakes: [
      "Çok partili hayata ilk kez Demokrat Parti ile geçildiğini sanmak (İlk kurulan parti Nuri Demirağ'ın kurduğu Milli Kalkınma Partisi'dir, DP daha sonra kurulmuştur).",
      "Kıbrıs Barış Harekâtı'nın hemen ardından KKTC'nin kurulduğunu düşünmek (Harekât sonrasında önce Kıbrıs Türk Federe Devleti kurulmuş, KKTC ise 1983 yılında bağımsız ilan edilmiştir).",
      "Varlık Vergisi'nin sadece Müslümanlardan alındığını düşünmek (Aksine, en ağır vergiler gayrimüslim tüccarlardan tahsil edilmiştir)."
    ]
  },
  {
    id: "t12",
    slug: "genel-tarih-kronolojisi",
    title: "Genel Tarih Kronolojisi",
    era: "yenilesme",
    shortDescription: "Selçuklu ve Osmanlı askeri zaferleri, diplomatik antlaşmalar, padişah taht sıralamaları, demokratikleşme belgeleri ve anayasal süreçlerin kronolojik akışı.",
    keywords: ["kronoloji", "savaslar", "antlasmalar", "demokratiklesme", "anayasalar", "padisahlar", "kusatmalar", "baskentler", "balkan savaslari", "trablusgarp", "sevr", "usi", "pasinler", "malazgirt", "miryokefalon", "kosedag", "lozan", "mudanya"],
    estimatedMinutes: 42,
    examImportance: 82,
    quickTimeline: [
      { date: "1048-1243", event: "Selçuklu Kuruluş, Yükseliş ve Moğol İstilası Savaşları kronolojik sırası" },
      { date: "1299-1453", event: "Osmanlı kuruluş dönemi başkent ve savaş kronolojisi" },
      { date: "1808-1876", event: "Osmanlı demokratikleşme belgelerinin yayınlanma sırası" },
      { date: "1918-1923", event: "Milli Mücadele muharebeleri ve diplomatik antlaşmaların kronolojik akışı" }
    ],
    summary: [
      {
        heading: "1. Savaşlar, Kuşatmalar ve Askeri Kronoloji",
        body: "Türk tarihinde askeri gelişmeler neden-sonuç ilişkisi kurmak için kronolojik sırayla bilinmelidir. Selçuklu Dönemi: Pasinler Savaşı (1048 - Bizans'la ilk savaş), Malazgirt Savaşı (1071 - Anadolu kapısının açılması), Miryokefalon Savaşı (1176 - Anadolu tapusunun alınması) ve Kösedağ Savaşı (1243 - Moğol istilası ve Selçuklu yıkılış süreci). Osmanlı Balkan Fetihleri: Sırpsındığı (1364 - ilk Haçlı savaşı), I. Kosova (1389 - ilk kez top kullanımı), Niğbolu (1396), Varna (1444) ve II. Kosova (1448 - Balkanlar kesin Türk yurdu, savunmanın sonu). Osmanlı Yıkılış Dönemi: Trablusgarp Savaşı (1911 - ilk uçak kullanımı, Uşi antlaşmasıyla Kuzey Afrika'nın kaybı) ve Balkan Savaşları (1912-1913 - Türkçülük fikrinin güçlenmesi).",
        bullets: [
          "Osmanlı başkentlerinin sıralaması: Söğüt, Karacahisar, Bilecik, İznik, Bursa, Edirne ve İstanbul'dur.",
          "İstanbul ilk kez Avarlar tarafından kuşatılmış, Fatih Sultan Mehmed tarafından fethedilmiştir.",
          "Sevr Antlaşması (1920) Mebusan Meclisi onaylamadığı için hukuken geçersiz, ölü doğmuş bir antlaşmadır."
        ]
      },
      {
        heading: "2. Demokratikleşme Belgeleri, Anayasalar ve Rütbe Sıralamaları",
        body: "Osmanlı demokratikleşme adımları sırası: Sened-i İttifak (1808 - ayanlarla sözleşme), Tanzimat Fermanı (1839 - kanun üstünlüğü), Islahat Fermanı (1856 - gayrimüslim hakları), I. Meşrutiyet (1876 - anayasa Kanun-i Esasi ve meclis). Türk Anayasaları: 1921 Anayasası (Teşkilat-ı Esasiye - tek yumuşak savaş anayasası), 1924 Anayasası (kabine sistemi, güçler birliği), 1961 Anayasası (en demokratik/çoğulcu anayasa) ve 1982 Anayasası (kazuistik ve sert anayasa).",
        bullets: [
          "Milli Mücadele antlaşmaları sırası: Gümrü (1920 - ilk diplomatik zafer), Moskova (1921), Kars (1921 - doğu sınırı nihai), Ankara (1921 - güney cephesi kapanış), Mudanya (1922 - savaşsız toprak kazanımları) ve Lozan (1923 - nihai bağımsızlık).",
          "Mustafa Kemal'in rütbe sırası: Şam 5. Ordu (Kurmay Yüzbaşı - ilk görev), Trablusgarp (Binbaşı), Çanakkale (Yarbay - Albaylığa yükseliş), Kafkas Cephesi (Tümgeneral), Suriye-Filistin (Yıldırım Orduları Komutanı) ve Başkomutanlık (Sakarya ve Büyük Taarruz).",
          "Bilecik Görüşmesi (1920) ile İstanbul Hükümeti, TBMM'nin varlığını resmen tanımıştır."
        ]
      }
    ],
    mustKnow: [
      "Selçuklu ve Osmanlı savaşlarının kronolojik sebep-sonuç bağları (hangisi kapı açtı, hangisi korudu)",
      "Demokratikleşme belgelerinin padişah yetkilerini kısıtlama sırası ve getirdiği yeni kurumlar",
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
  id: `${card.topicId}-card-${index + 1}`,
  ...card
}));

export const timelineEvents: TimelineEvent[] = topics.flatMap((topicItem, topicIndex) =>
  topicItem.quickTimeline.map((item, index) => ({
    id: `${topicItem.id}-event-${index + 1}`,
    topicId: topicItem.id,
    date: item.date,
    title: item.event,
    description: `${item.event}, ${topicItem.title} başlığında kronoloji ve neden-sonuç ilişkisini kurmak için kritik bir referans noktasıdır.`,
    tone: (["gold", "turquoise", "crimson", "parchment"] as const)[(topicIndex + index) % 4],
  }))
);

export const exams: Exam[] = Array.from({ length: 50 }).map((_, index) => {
  const examIndex = index + 1;
  return {
    id: `kpss-tarih-genel-deneme-${examIndex}`,
    title: `KPSS Tarih Genel Deneme ${examIndex}`,
    durationMinutes: 45,
    description: `${examIndex}. sınav denemesi. Tüm ana dönemlerden dengeli seçilmiş açıklamalı genel tekrar denemesi.`,
    questionIds: []
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

export interface GlossaryTerm {
  id: string;
  topicId: string;
  term: string;
  definition: string;
  whyImportant: string;
}

export const glossary: GlossaryTerm[] = flashcards.map((card) => ({
  id: card.id,
  topicId: card.topicId,
  term: card.front,
  definition: card.back,
  whyImportant: card.hint
}));

export function getGlossaryByTopic(topicId: string): GlossaryTerm[] {
  const target = normalizeCompatKey(topicId);
  return glossary.filter((item) => {
    return item.id.toLowerCase().startsWith(target);
  });
}

export const recommendations = typeof studyRecommendations !== "undefined" ? studyRecommendations : [];
