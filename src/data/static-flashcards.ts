import type { Flashcard } from "@/types/study";

export const staticFlashcards: Omit<Flashcard, "id">[] = [
  // 1. İslamiyet Öncesi Türk Tarihi
  {
    topicId: "t1",
    front: "Kut",
    back: "İlk Türk devletlerinde hükümdara yönetme yetkisinin Tanrı tarafından verildiğine inanılmasıdır. Egemenliği meşrulaştırır ancak hanedanın ortak malı anlayışı nedeniyle taht kavgalarına yol açar.",
    hint: "Yönetme yetkisinin kan yoluyla hanedan üyelerine geçtiğini unutma.",
    tags: ["İslamiyet Öncesi", "Devlet Yönetimi"]
  },
  {
    topicId: "t1",
    front: "Töre",
    back: "İlk Türk devletlerinde toplum ve devlet düzenini belirleyen yazısız hukuk kurallarıdır. Örf, adet ve kurultay kararlarından oluşur; kağan dahil herkes töreye uymak zorundadır.",
    hint: "Adalet, eşitlik ve iyilik gibi değişmez hükümleri vardır.",
    tags: ["İslamiyet Öncesi", "Hukuk"]
  },
  {
    topicId: "t1",
    front: "Kurultay",
    back: "Devlet işlerinin görüşüldüğü, boy beyleri ve hükümdarın katıldığı danışma meclisidir. Son söz hükümdara ait olsa da kağanın yetkilerini sınırlayabilen demokratik bir danışma organıdır.",
    hint: "Hükümdarın olmadığı durumlarda Hatun kurultaya başkanlık edebilir.",
    tags: ["İslamiyet Öncesi", "Yönetim"]
  },
  {
    topicId: "t1",
    front: "İkili Teşkilat",
    back: "Devletin yönetimini kolaylaştırmak amacıyla ülkenin doğu ve batı olarak ikiye bölünmesidir. Doğu kanadını asıl hakan (kutsal yön), batı kanadını ise yabgu unvanıyla hakanın kardeşi yönetir.",
    hint: "Merkezi otorite zayıfladığında bölünmeyi hızlandıran en temel etkendir.",
    tags: ["İslamiyet Öncesi", "Yönetim"]
  },

  // 2. Türk-İslam Tarihi
  {
    topicId: "t2",
    front: "Talas Savaşı",
    back: "751 yılında Abbasiler ile Çinliler arasında yapılan savaştır. Türklerin (Karluklar) Abbasileri desteklemesiyle kazanılmış ve Türklerin kitleler halinde İslamiyet'e geçişinin kapısını açmıştır.",
    hint: "Kâğıt üretiminin Çin dışında (Semerkant) yayılmasına yol açmıştır.",
    tags: ["Türk-İslam", "Savaş"]
  },
  {
    topicId: "t2",
    front: "Karahanlılar",
    back: "Orta Asya'da kurulan ilk Müslüman Türk devletidir. Satuk Buğra Han döneminde İslamiyet'i kabul etmişlerdir. Resmi dili Türkçe olup, ulusal kimliklerini en güçlü koruyan Türk-İslam devletidir.",
    hint: "İslamiyeti kabul etmelerine rağmen Türk devlet geleneklerini korumuşlardır.",
    tags: ["Türk-İslam", "Devlet"]
  },
  {
    topicId: "t2",
    front: "İkta",
    back: "Devlet görevlilerine ve ordu komutanlarına hizmet karşılığı verilen toprak gelirleri sistemidir. Hazineye yük olmadan büyük bir ordunun beslenmesini ve tarımsal üretimde sürekliliği sağlar.",
    hint: "Osmanlı'daki Tımar sisteminin temelidir; mülkiyeti devlete aittir.",
    tags: ["Türk-İslam", "Toprak Sistemi"]
  },
  {
    topicId: "t2",
    front: "Nizamiye Medreseleri",
    back: "Büyük Selçuklu döneminde kurulan, vezir Nizamülmülk tarafından açılan ve dünyanın ilk üniversiteleri sayılan eğitim kurumlarıdır. Şii Batınilik faaliyetlerine karşı fikri mücadele vermiştir.",
    hint: "Devlet kadrolarına nitelikli memur yetiştirmeyi amaçlamıştır.",
    tags: ["Türk-İslam", "Eğitim"]
  },

  // 3. Anadolu Selçuklu ve Beylikler
  {
    topicId: "t3",
    front: "Miryokefalon",
    back: "1176 yılında Anadolu Selçuklu Devleti ile Bizans arasında yapılan savaştır. Bizans'ın taarruz gücü tamamen kırılmış ve Anadolu'nun Türk yurdu olduğu kesinleşmiştir.",
    hint: "Bizans'ın Anadolu'yu Türklerden geri alma ümitleri tamamen sona ermiştir.",
    tags: ["Anadolu Selçuklu", "Savaş"]
  },
  {
    topicId: "t3",
    front: "Kösedağ",
    back: "1243 yılında Moğollarla yapılan savaştır. Anadolu Selçuklu ordusunun yenilmesiyle devlet yıkılış sürecine girmiş, Anadolu'da Moğol baskısı başlamış ve II. Beylikler Dönemi kurulmuştur.",
    hint: "Anadolu'daki siyasi birliğin tamamen parçalanmasına yol açmıştır.",
    tags: ["Anadolu Selçuklu", "Savaş"]
  },
  {
    topicId: "t3",
    front: "Ahilik",
    back: "Ahi Evran tarafından kurulan esnaf, zanaatkar ve ticaret örgütlenmesidir. Meslek eğitimi (çırak-kalfa-usta), esnaf ahlakı denetimi (narh kesme) ve sosyal dayanışmayı sağlar.",
    hint: "Gerektiğinde vatan savunmasında askeri güç olarak da görev almışlardır.",
    tags: ["Anadolu Selçuklu", "Sosyal Yapı"]
  },
  {
    topicId: "t3",
    front: "Kervansaray",
    back: "Ticaret yolları üzerinde kurulu konaklama ve savunma yapılarıdır. Tüccarların güvenliğini sağlar, 3 gün boyunca yeme-içme ve konaklama hizmetlerini ücretsiz sunar.",
    hint: "Devlet destekli ticari sigortacılığın dünyadaki ilk örneklerindendir.",
    tags: ["Anadolu Selçuklu", "Ticaret"]
  },

  // 4. Osmanlı Kuruluş ve Yükseliş
  {
    topicId: "t4",
    front: "İskan",
    back: "Osmanlı Devleti'nin Balkanlar'da fethettiği yerlere Anadolu'dan gelen Türk nüfusu yerleştirme siyasetidir. Fethedilen bölgelerin Türkleşmesini ve kalıcı olmasını sağlamıştır.",
    hint: "Göçebe Türkmenleri yerleşik yaşama geçirerek üretimi artırmayı hedeflemiştir.",
    tags: ["Osmanlı", "Siyaset"]
  },
  {
    topicId: "t4",
    front: "Çimpe Kalesi",
    back: "Bizans'taki taht kavgalarına yardım karşılığında Osmanlı'ya verilen kaledir. Osmanlı Devleti'nin Rumeli coğrafyasında elde ettiği ilk askeri üs ve toprak parçasıdır.",
    hint: "Orhan Bey döneminde alınarak Balkan fetihlerinin önü açılmıştır.",
    tags: ["Osmanlı", "Balkanlar"]
  },
  {
    topicId: "t4",
    front: "Devşirme",
    back: "Gayrimüslim tebaanın yetenekli çocuklarının devlet hizmeti için saray okulu (Enderun) ve ordu (Yeniçeriler) kadrosuna alınarak eğitilmesidir.",
    hint: "Osmanlı bürokrasisinin ve merkez ordusunun ana kaynağını oluşturur.",
    tags: ["Osmanlı", "Ordu"]
  },
  {
    topicId: "t4",
    front: "Halifelik",
    back: "Yavuz Sultan Selim'in Mısır Seferi (1517) sonucunda Memlük Devleti'ne son vermesiyle Osmanlı padişahlarına geçen İslami liderlik makamıdır.",
    hint: "Osmanlı Devleti'nin teokratik (dini) yönetim yapısını güçlendirmiştir.",
    tags: ["Osmanlı", "Yönetim"]
  },

  // 5. Osmanlı Kültür ve Medeniyet
  {
    topicId: "t5",
    front: "Divan-ı Hümayun",
    back: "Devletin en yüksek karar, yürütme ve yargı organıdır. Padişahın başkanlığında (Fatih sonrası sadrazam başkanlığında) toplanır; son söz her zaman padişaha aittir.",
    hint: "Bir karar meclisi olmasının yanında danışma organı niteliğindedir.",
    tags: ["Osmanlı", "Yönetim"]
  },
  {
    topicId: "t5",
    front: "Miri Arazi",
    back: "Mülkiyeti ve tasarruf yetkisi devlete ait olan topraklardır. Osmanlı topraklarının büyük bir kısmını oluşturur; satılamaz, devredilemez ve miras bırakılamaz.",
    hint: "Özel mülkiyetin gelişmesini engelleyerek feodal yapıların oluşmasını önlemiştir.",
    tags: ["Osmanlı", "Toprak Sistemi"]
  },
  {
    topicId: "t5",
    front: "Tımar",
    back: "Miri arazilerin vergi gelirlerinin hizmet ve askeri görev karşılığı şahıslara verilmesidir. Hazineye yük olmadan tımarlı sipahi ordu yetiştirilmesini ve taşra güvenliğini sağlar.",
    hint: "Üretimin denetimini sağlayarak vergi toplama maliyetini sıfıra indirmiştir.",
    tags: ["Osmanlı", "Toprak Sistemi"]
  },
  {
    topicId: "t5",
    front: "İlmiye",
    back: "Eğitim (medreseler), hukuk (kadı, şeri yargı) ve din (müftü, şeyhülislam) işlerinden sorumlu olan, ulemadan oluşan yönetici sınıftır.",
    hint: "Kazasker ve Şeyhülislam bu sınıfın en üst düzey temsilcileridir.",
    tags: ["Osmanlı", "Sosyal Yapı"]
  },

  // 6. Osmanlı Yenileşme ve Demokratikleşme
  {
    topicId: "t6",
    front: "Sened-i İttifak",
    back: "1808 yılında padişah II. Mahmut ile ayanlar (taşra güçleri) arasında imzalanan belgedir. Padişahın yetkileri ilk kez kendi rızasıyla belgeyle sınırlandırılmıştır.",
    hint: "Osmanlı'daki ilk anayasalcılık veya demokratikleşme adımı kabul edilir.",
    tags: ["Osmanlı", "Demokratikleşme"]
  },
  {
    topicId: "t6",
    front: "Tanzimat",
    back: "1839 yılında ilan edilen, kanun gücünün üstünlüğünü ve tüm vatandaşların (Müslüman ve gayrimüslim) hak eşitliğini savunan fermandır.",
    hint: "Padişah Abdülmecit döneminde ilan edilmiş, hukukun üstünlüğünü getirmiştir.",
    tags: ["Osmanlı", "Hukuk"]
  },
  {
    topicId: "t6",
    front: "I. Meşrutiyet",
    back: "1876 yılında ilan edilen, ilk anayasa (Kanun-i Esasi) ile halkın ilk kez (sınırlı da olsa) yönetime katıldığı ve parlamentonun açıldığı dönemdir.",
    hint: "Osmanlı'da mutlak monarşiden parlamenter monarşiye geçişi temsil eder.",
    tags: ["Osmanlı", "Yönetim"]
  },
  {
    topicId: "t6",
    front: "Nizam-ı Cedid",
    back: "III. Selim döneminde kurulan batı tarzı yeni ordu ve bu ordunun giderlerini karşılamak amacıyla oluşturulan İrad-ı Cedid hazinesidir.",
    hint: "Yeniliklere karşı çıkan Yeniçeriler tarafından isyanla (Kabakçı Mustafa) sonlandırılmıştır.",
    tags: ["Osnyanlı", "Yenileşme"]
  },

  // 7. Milli Mücadele Hazırlık Dönemi
  {
    topicId: "t7",
    front: "Amasya Genelgesi",
    back: "Milli Mücadele'nin amacı, gerekçesi ve yönteminin ilk kez belirtildiği genelgedir. 'Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır' maddesi ulusal egemenliğin ilk ilanıdır.",
    hint: "Aynı zamanda milli ihtilal beyannamesi niteliği taşır.",
    tags: ["Milli Mücadele", "Genelge"]
  },
  {
    topicId: "t7",
    front: "Sivas Kongresi",
    back: "Manda ve himayenin kesin olarak reddedildiği, tüm bölgesel yararlı cemiyetlerin 'Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti' adı altında birleştirildiği ulusal kongredir.",
    hint: "Temsil Heyeti'nin yetkileri tüm ülkeyi kapsayacak şekilde genişletilmiştir.",
    tags: ["Milli Mücadele", "Kongre"]
  },
  {
    topicId: "t7",
    front: "Misakımilli",
    back: "Son Osmanlı Mebusan Meclisi'nde kabul edilen, vatanın sınırlarını çizen ve tam bağımsızlığı hedefleyen ulusal andtır. Sınırlar Mondros mütarekesi imzalandığı sıradaki hatlardır.",
    hint: "Kabul edilmesi üzerine İtilaf Devletleri İstanbul'u resmen işgal etmiştir.",
    tags: ["Milli Mücadele", "Belge"]
  },
  {
    topicId: "t7",
    front: "Erzurum Kongresi",
    back: "Toplanış amacı bakımından bölgesel, aldığı kararlar bakımından ulusal olan kongredir. İlk kez manda ve himaye fikri reddedilmiş ve milli sınırlardan bahsedilmiştir.",
    hint: "Mustafa Kemal'in sivil olarak katıldığı ilk milli faaliyettir.",
    tags: ["Milli Mücadele", "Kongre"]
  },

  // 8. Kurtuluş Savaşı ve Antlaşmalar
  {
    topicId: "t8",
    front: "Mudanya Ateşkesi",
    back: "Kurtuluş Savaşı'nın askeri safhasını bitiren 1922 tarihli ateşkes antlaşmasıdır. İstanbul, Boğazlar ve Doğu Trakya savaş yapılmadan diplomatik yolla geri kazanılmıştır.",
    hint: "Osmanlı Devleti'nin hukuken sona erdiğinin en net göstergesidir.",
    tags: ["Kurtuluş Savaşı", "Antlaşma"]
  },
  {
    topicId: "t8",
    front: "Lozan",
    back: "Yeni Türk devletinin bağımsızlığının uluslararası alanda tescillendiği 1923 antlaşmasıdır. Kapitülasyonlar, Duyun-u Umumiye ve Ermeni yurdu sorunları çözülmüş; Irak sınırı ise sonraya bırakılmıştır.",
    hint: "Lozan'da çözülemeyip sonraki döneme kalan tek konu Irak (Musul) sınırıdır.",
    tags: ["Kurtuluş Savaşı", "Antlaşma"]
  },
  {
    topicId: "t8",
    front: "Sakarya Savaşı",
    back: "Yunan ordusunun Ankara'ya ilerlemesini durduran, Mustafa Kemal'in 'Hattı müdafaa yoktur, sathı müdafaa vardır' dediği, Türk ordusunun son savunma savaşıdır.",
    hint: "Kazanılması üzerine Fransa ile Ankara Antlaşması imzalanarak güney cephesi kapanmıştır.",
    tags: ["Kurtuluş Savaşı", "Savaş"]
  },
  {
    topicId: "t8",
    front: "Gümrü",
    back: "Doğu cephesinde Ermenistan ile imzalanan antlaşmadır. TBMM'nin askeri ve diplomatik alanda elde ettiği ilk uluslararası zaferdir.",
    hint: "Ermeniler Doğu Anadolu'daki hak iddialarından resmen vazgeçmiştir.",
    tags: ["Kurtuluş Savaşı", "Antlaşma"]
  },

  // 9. Atatürk İlkeleri ve İnkılaplar
  {
    topicId: "t9",
    front: "Cumhuriyetçilik",
    back: "Devlet yönetiminde millet iradesini, seçimi ve meclisi esas alan Atatürk ilkesidir. Saltanatın kaldırılması ve Cumhuriyetin ilanı bu ilkeyle doğrudan ilişkilidir.",
    hint: "Milli egemenliği ve seçme-seçilme hakkını doğrudan hedefler.",
    tags: ["Atatürk İlkeleri", "Siyaset"]
  },
  {
    topicId: "t9",
    front: "Halkçılık",
    back: "Kanun önünde eşitliği, toplumsal adaleti ve sosyal devlet anlayışını savunan ilkedir. Sınıfsız bir toplum hedefler; Aşar vergisinin kaldırılması ve Soyadı Kanunu halkçılıkla ilgilidir.",
    hint: "Ayrıcalık bildiren unvanların kaldırılması bu ilkenin sonucudur.",
    tags: ["Atatürk İlkeleri", "Sosyal"]
  },
  {
    topicId: "t9",
    front: "Devletçilik",
    back: "Ekonomik kalkınmanın ve yatırımların özel sektörün yetersiz kaldığı durumlarda doğrudan devlet eliyle yapılmasını öngören ilkedir.",
    hint: "I. Beş Yıllık Sanayi Planı ve Sümerbank'ın kurulması devletçilikle ilgilidir.",
    tags: ["Atatürk İlkeleri", "Ekonomi"]
  },
  {
    topicId: "t9",
    front: "Laiklik",
    back: "Din ve devlet işlerinin ayrılmasını, akılcılığı, bilimselliği ve vicdan özgürlüğünü esas alan ilkedir. Halifeliğin kaldırılması ve Tevhid-i Tedrisat laiklik adımlarıdır.",
    hint: "Devletin resmi dininin olmamasını ve inanç özgürlüğünü garanti eder.",
    tags: ["Atatürk İlkeleri", "Din"]
  },

  // 10. Cumhuriyet Dönemi Dış Politika
  {
    topicId: "t10",
    front: "Montrö",
    back: "1936 yılında imzalanan, Boğazlar Komisyonu'nu kaldırarak Boğazlar üzerinde tam Türk egemenliğini sağlayan sözleşmedir.",
    hint: "Türkiye, Boğazlarda asker bulundurma ve savaş durumunda kapatma yetkisi almıştır.",
    tags: ["Dış Politika", "Sözleşme"]
  },
  {
    topicId: "t10",
    front: "Hatay",
    back: "Mustafa Kemal'in 'Şahsi meselem' dediği, 1939 yılında Hatay Meclisi'nin aldığı kararla Türkiye anavatanına katılan sınır şehridir.",
    hint: "Atatürk'ün ölümünden sonra çözüme kavuşturulabilmiştir.",
    tags: ["Dış Politika", "Sınır"]
  },
  {
    topicId: "t10",
    front: "Balkan Antantı",
    back: "1934 yılında Türkiye, Yunanistan, Yugoslavya ve Romanya arasında imzalanan pakt. Batı sınırının güvenliğini sağlamayı hedeflemiştir.",
    hint: "İtalya ve Almanya'nın yayılmacı politikalarına karşı kurulmuştur.",
    tags: ["Dış Politika", "İttifak"]
  },
  {
    topicId: "t10",
    front: "Sadabat Paktı",
    back: "1937 yılında Türkiye, İran, Irak ve Afganistan arasında imzalanan, doğu sınırının güvenliğini almayı hedefleyen bölgesel ittifaktır.",
    hint: "İtalya'nın Habeşistan'ı işgali üzerine doğu sınırını korumak için kurulmuştur.",
    tags: ["Dış Politika", "İttifak"]
  },

  // 11. Çağdaş Türk ve Dünya Tarihi
  {
    topicId: "t11",
    front: "NATO",
    back: "Türkiye'nin dış tehditlere (özellikle SSCB) karşı batı ittifakına entegre olmak amacıyla 1952 yılında katıldığı Kuzey Atlantik askeri örgütüdür.",
    hint: "NATO'ya girebilmek için Kore'ye asker gönderilmiştir.",
    tags: ["Çağdaş Dünya", "Askeri"]
  },
  {
    topicId: "t11",
    front: "Kıbrıs",
    back: "1974 yılında adadaki Türklerin can güvenliğini korumak amacıyla Bülent Ecevit hükümeti liderliğinde düzenlenen askeri harekattır.",
    hint: "Sonucunda Kuzey Kıbrıs Türk Cumhuriyeti'nin (KKTC) temelleri atılmıştır.",
    tags: ["Çağdaş Dünya", "Askeri"]
  },
  {
    topicId: "t11",
    front: "Birleşmiş Milletler",
    back: "II. Dünya Savaşı sonrasında küresel güvenliği sağlamak amacıyla kurulan ve Türkiye'nin de kurucu üye olduğu uluslararası barış örgütüdür.",
    hint: "Türkiye San Francisco Konferansı'na katılarak kurucu üyeler arasında yer almıştır.",
    tags: ["Çağdaş Dünya", "Siyaset"]
  },
  {
    topicId: "t11",
    front: "Soğuk Savaş",
    back: "II. Dünya Savaşı sonrası ABD liderliğindeki Batı ve SSCB liderliğindeki Doğu blokları arasında süren askeri, siyasi ve ideolojik rekabet dönemidir.",
    hint: "Türkiye bu dönemde Truman Doktrini ve Marshall Planı ile ABD desteği almıştır.",
    tags: ["Çağdaş Dünya", "Siyaset"]
  },

  // 12. Genel Tarih Kronolojisi
  {
    topicId: "t12",
    front: "Cepheler Sıralaması",
    back: "Kurtuluş Savaşı cepheler döneminin kronolojik akışıdır. Sırasıyla I. İnönü Savaşı, II. İnönü Savaşı, Sakarya Meydan Muharebesi ve Büyük Taarruz kazanılmıştır.",
    hint: "Sakarya savunma, Büyük Taarruz ise Türk ordusunun taarruz savaşıdır.",
    tags: ["Kronoloji", "Savaş"]
  },
  {
    topicId: "t12",
    front: "Antlaşmalar Kronolojisi",
    back: "Milli Mücadele'yi bitiren antlaşmaların sıralamasıdır. Mondros Ateşkesi (1918) ile başlar, Gümrü (1920) ve Ankara (1921) ile sürer, Mudanya (1922) ve Lozan (1923) ile tamamlanır.",
    hint: "Gümrü ilk siyasi zafer, Lozan ise nihai barış belgesidir.",
    tags: ["Kronoloji", "Antlaşma"]
  },
  {
    topicId: "t12",
    front: "Demokratikleşme Kronolojisi",
    back: "Osmanlı'da başlayan demokratikleşme adımları sırasıdır. Sened-i İttifak (1808), Tanzimat Fermanı (1839), Islahat Fermanı (1856) ve I. Meşrutiyet (1876).",
    hint: "Her adım padişahın yetkilerini anayasal veya yasal düzeyde sınırlamıştır.",
    tags: ["Kronoloji", "Demokratikleşme"]
  },
  {
    topicId: "t12",
    front: "Atatürk Görev Kronolojisi",
    back: "Mustafa Kemal'in askeri görevlerinin sırasıdır. Trablusgarp Savaşı, Çanakkale Cephesi, Kafkas Cephesi ve Suriye-Filistin Cephesi'nde savaşmıştır.",
    hint: "Milli Mücadele'yi başlatmak için 9. Ordu Müfettişi olarak Samsun'a çıkmıştır.",
    tags: ["Kronoloji", "Biyografi"]
  }
];
