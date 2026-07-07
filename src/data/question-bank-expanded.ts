import type { Difficulty, Question, QuestionType } from "@/types/study";

type Spec = {
  id: string;
  tag: string;
  concepts: Array<[string, string]>;
  events: Array<[string, string]>;
  easy: string[];
  medium: string[];
  hard: string[];
  chronology: string[][];
};

const genericWrongs = [
  "Bu ifade farklı bir dönem veya kurumla ilgilidir.",
  "Bu açıklama konunun temel özelliğini doğru yansıtmaz.",
  "Bu bilgi yalnızca askeri sonuçlarla sınırlı bir yorumdur.",
  "Bu seçenek kavramın tarihsel bağlamını karıştırmaktadır."
];

const specs: Spec[] = [
  {
    id: "t1",
    tag: "islamiyet-oncesi",
    concepts: [
      ["Kut anlayışı", "Hükümdarlık yetkisinin Tanrı tarafından verildiğine inanılmasıdır."],
      ["Töre", "Toplum ve devlet hayatını düzenleyen yazısız hukuk kurallarıdır."],
      ["Kurultay", "Hakanın yanında devlet işlerinin görüşüldüğü danışma meclisidir."],
      ["İkili teşkilat", "Ülkenin doğu ve batı olarak iki kanat halinde yönetilmesidir."],
      ["Orhun Yazıtları", "Göktürk dönemini anlatan ve Türk tarihi için önemli olan yazılı kaynaklardır."]
    ],
    events: [["552", "I. Göktürk Devleti'nin kurulması"], ["682", "II. Göktürk Devleti'nin kurulması"], ["744", "Uygur Devleti'nin kurulması"]],
    easy: ["Uygurların yerleşik yaşama geçmesi şehir kültürü ve tarım faaliyetlerini güçlendirmiştir.", "Balbal ve yuğ törenleri ölüm sonrası inançlarla ilgilidir."],
    medium: [
      "Kurultay hükümdarın yanında danışma görevi yapan bir meclistir.",
      "İkili teşkilat yönetimi kolaylaştırsa da parçalanma riskini artırabilir.",
      "Kut anlayışı hanedan üyeleri arasında taht mücadelesine zemin hazırlayabilir.",
      "Konargöçer hayat atlı savaşçılık ve hızlı hareket kabiliyetini öne çıkarmıştır.",
      "Uygurlar yerleşik yaşam ve kültürel üretim açısından önceki Türk topluluklarından ayrılır.",
      "Orhun Yazıtları siyasi olayların yanında devlet anlayışı hakkında da bilgi verir.",
      "Töre hukuk düzenini, kut ise siyasi meşruiyeti ifade eder.",
      "Boylar birliği merkezi otorite zayıfladığında siyasi birliği zorlaştırabilir.",
      "Maniheizmin etkisi Uygurlarda savaşçı yapının yumuşamasıyla ilişkilendirilebilir.",
      "Ülkenin hanedanın ortak malı sayılması taht mücadelelerini artırabilir."
    ],
    hard: [
      "Egemenliğin ilahi kaynaklı olduğu vurgulanıyorsa kut anlayışı aranmalıdır.",
      "Kurultayın varlığı doğrudan demokratik yönetim değil danışma geleneği gösterir.",
      "İkili teşkilat ve ortak hanedan malı anlayışı birlikte düşünülürse bölünme riski artar.",
      "Uygurlarda matbaa ve kâğıt kullanımı yerleşik kültürün geliştiğini destekler.",
      "Orhun Yazıtları yalnızca edebi değil aynı zamanda siyasi bir kaynak niteliği taşır.",
      "Yazısız hukuk ve toplum düzeni vurgusu töre kavramına götürür.",
      "Balbal geleneği ölümden sonra yaşam inancına kanıt olarak kullanılabilir."
    ],
    chronology: [["Asya Hun Devleti", "I. Göktürk Devleti", "Uygur Devleti"], ["I. Göktürk Devleti", "II. Göktürk Devleti", "Uygur Devleti"], ["552 Göktürklerin kuruluşu", "682 II. Göktürklerin kuruluşu", "744 Uygurların kuruluşu"]]
  },
  {
    id: "t2", tag: "turk-islam",
    concepts: [["Karahanlılar", "İlk Müslüman Türk devleti olarak kabul edilir."], ["Gazneliler", "Hindistan seferleriyle İslamiyetin bölgede yayılmasında etkili olmuştur."], ["Dandanakan Savaşı", "Büyük Selçukluların Gaznelilere üstünlük kazandığı savaştır."], ["İkta sistemi", "Devlet gelirlerinin hizmet karşılığı görevlilere bırakılmasıdır."], ["Nizamiye Medreseleri", "Büyük Selçuklu döneminde kurulan önemli eğitim kurumlarıdır."]],
    events: [["840", "Karahanlı Devleti'nin kurulması"], ["1040", "Dandanakan Savaşı"], ["1071", "Malazgirt Savaşı"]],
    easy: ["Atabeylik kurumu meliklerin eğitimiyle ilgilidir.", "Kutadgu Bilig Karahanlılar döneminde yazılmıştır."],
    medium: ["Karahanlılar ilk Müslüman Türk devleti kabul edilmeleriyle öne çıkar.", "Gaznelilerin Hindistan seferleri İslamiyetin yayılmasına katkı sağlamıştır.", "Dandanakan Savaşı Selçukluların bağımsız güç olarak ortaya çıkmasını sağlamıştır.", "İkta sistemi mali düzen ve asker yetiştirme işlevi taşır.", "Nizamiye Medreseleri eğitimli devlet kadrolarının yetişmesine katkı sağlamıştır.", "Atabeylerin güçlenmesi merkezi otoriteyi zayıflatabilir.", "Malazgirt Savaşı Anadolu'nun Türkleşme sürecini hızlandırmıştır.", "Karahanlılar kültür eserleriyle, Gazneliler Hindistan seferleriyle öne çıkar.", "Büyük Selçuklularda vezirlik merkezi bürokrasinin geliştiğini gösterir.", "İkta sistemi gelir karşılığı hizmet anlayışı bakımından tımara benzer."],
    hard: ["Türkçe ilk siyasetname vurgusu Kutadgu Bilig'e götürür.", "Dandanakan Selçuklu-Gazneli üstünlüğünü, Malazgirt Anadolu'nun kapılarını ilgilendirir.", "İkta sistemi maaş yükünü azaltırken taşrada askerî düzeni destekler.", "Nizamiye Medreseleri bilimsel olduğu kadar siyasi ve idari işlev de taşır.", "Atabeylerin bağımsız hareket etmesi yerel otoritelerin güçlenmesine yol açabilir.", "Gazneli Mahmut'un seferleri Hindistan'da İslam kültürünün yayılması bakımından önemlidir.", "Kutadgu Bilig ve Divan-ı Lügati't-Türk Karahanlı kültür çevresinin önemli eserleridir."],
    chronology: [["Karahanlıların kuruluşu", "Dandanakan Savaşı", "Malazgirt Savaşı"], ["Dandanakan Savaşı", "Malazgirt Savaşı", "Türkiye Selçuklularının güçlenmesi"], ["Karahanlılar", "Gazneliler", "Büyük Selçuklular"]]
  },
  {
    id: "t3", tag: "turk-islam",
    concepts: [["Miryokefalon Savaşı", "Anadolu'nun Türk yurdu olduğunun kesinleşmesinde etkili olan savaştır."], ["Kösedağ Savaşı", "Türkiye Selçuklu otoritesini zayıflatıp beylikleri güçlendirmiştir."], ["Kervansaray", "Ticaret yollarında güvenlik ve konaklama sağlayan yapılardır."], ["Ahilik", "Esnaf dayanışması ve meslek ahlakıyla ilgili teşkilattır."], ["Karamanoğlu Mehmet Bey fermanı", "Türkçenin resmi dil olarak kullanılmasını vurgulayan gelişmedir."]],
    events: [["1176", "Miryokefalon Savaşı"], ["1243", "Kösedağ Savaşı"], ["1277", "Karamanoğlu Mehmet Bey'in Türkçe fermanı"]],
    easy: ["Kervansaraylar ticaretin canlanmasını ve yol güvenliğini desteklemiştir.", "Beylikler dönemi Anadolu'da Türkçe ve mimari faaliyetleri geliştirmiştir."],
    medium: ["Miryokefalon Anadolu'da Türk kalıcılığını kesinleştiren gelişme olarak görülür.", "Kösedağ sonrası Türkiye Selçuklu otoritesi zayıflamış ve beylikler güçlenmiştir.", "Kervansaraylar tüccarların güvenli konaklamasını sağlayarak ticareti artırmıştır.", "Ahilik ekonomik olduğu kadar sosyal dayanışma yönü de taşır.", "Karamanoğlu Mehmet Bey fermanı Türkçenin resmî konumuyla ilgilidir.", "Beyliklerin mimari faaliyetleri Anadolu Türk kültürünü güçlendirmiştir.", "Liman şehirlerine yönelme deniz ticaretine önem verildiğini gösterir.", "Moğol etkisi siyasi birliği zayıflatıp beylikleri öne çıkarmıştır.", "Ahilik ve lonca teşkilatı esnaf örgütlenmesiyle ilişkilidir.", "Medrese, kervansaray ve darüşşifa Anadolu'nun bayındır hale gelmesine katkı sağlamıştır."],
    hard: ["Anadolu Türk yurdu oldu sonucu Miryokefalon Savaşı ile daha doğrudan ilişkilidir.", "Kösedağ yalnızca askeri yenilgi değil siyasi çözülme sürecidir.", "Kervansarayların ücretsiz hizmet vermesi ticareti koruyan devlet anlayışını gösterir.", "Ahilik sorularında meslek ahlakı, üretim düzeni ve dayanışma birlikte düşünülmelidir.", "Türkçenin önem kazanması Karamanoğlu Mehmet Bey fermanıyla somutlaşır.", "Kervansarayların yaygınlığı uzun mesafeli ticaret güvenliği ihtiyacını gösterir.", "Moğol baskısından sonra çok sayıda beylik kurulması merkezi otoritenin zayıflamasıyla açıklanır."],
    chronology: [["Malazgirt Savaşı", "Miryokefalon Savaşı", "Kösedağ Savaşı"], ["Miryokefalon Savaşı", "Kösedağ Savaşı", "Beyliklerin güçlenmesi"], ["Kösedağ Savaşı", "Beylikler dönemi", "Osmanlı uç beyliğinin yükselişi"]]
  },
  {
    id: "t4", tag: "osmanli",
    concepts: [["Uç beyliği", "Sınır bölgesinde fetih ve savunma görevi üstlenen beylik yapısıdır."], ["Çimpe Kalesi", "Osmanlıların Rumeli'ye geçişinde önemli bir üs olmuştur."], ["İskan politikası", "Fethedilen yerlere Türk nüfus yerleştirerek kalıcılığı artırma politikasıdır."], ["İstanbul'un Fethi", "Osmanlı'nın imparatorluk karakterini güçlendiren 1453 gelişmesidir."], ["Devşirme sistemi", "Gayrimüslim çocukların devlet hizmeti için yetiştirilmesidir."]],
    events: [["1299", "Osmanlı Beyliği'nin kuruluşu"], ["1353", "Çimpe Kalesi'nin alınması"], ["1453", "İstanbul'un Fethi"]],
    easy: ["Edirne'nin başkent yapılması Balkan fetihleriyle ilgilidir.", "Fatih Kanunnamesi merkezi otoriteyi güçlendirmiştir."],
    medium: ["Osmanlı'nın Bizans sınırında bulunması fetih imkânını artırmıştır.", "İskan politikası fethedilen bölgelerde kalıcılığı sağlamıştır.", "Çimpe Kalesi Rumeli'ye geçişte askeri üs olmuştur.", "İstanbul'un fethi Boğazlar üzerindeki Osmanlı kontrolünü güçlendirmiştir.", "Devşirme sistemi kapıkulu ordusu ve merkez teşkilatıyla ilgilidir.", "Fatih dönemi merkeziyetçiliği Kanunname ile desteklenmiştir.", "Edirne Balkan fetihlerini yönetmek için stratejik merkez olmuştur.", "Ahilerin desteği sosyal grupların Osmanlı'yı desteklediğini gösterir.", "Rumeli'de iskan politikası fetihlerin kalıcı olmasını sağlamıştır.", "İstanbul'un fethi dünya tarihinde Yeni Çağ'ın başlangıcıyla ilişkilendirilir."],
    hard: ["Fethedilen bölgede kalıcı hâkimiyet vurgusu iskan politikasına götürür.", "Çimpe'nin önemi başkent olması değil Rumeli'ye geçiş üssü olmasıdır.", "İstanbul'un fethi Osmanlı'nın merkeziyetçi imparatorluk yapısını güçlendirmiştir.", "Devşirme sistemi merkez ordusuna insan kaynağı sağlamıştır.", "Fatih Kanunnamesi merkezi otoritenin güçlendirilmesiyle ilgilidir.", "Osmanlı'nın uç beyliği olması gaza ve fetih alanı avantajı sağlamıştır.", "Edirne'nin başkent yapılması Balkanlara yönelişi gösterir."],
    chronology: [["Osmanlı Beyliği'nin kuruluşu", "Çimpe Kalesi'nin alınması", "İstanbul'un Fethi"], ["Bursa'nın alınması", "Edirne'nin alınması", "İstanbul'un Fethi"], ["Çimpe Kalesi", "Edirne'nin başkent olması", "İstanbul'un Fethi"]]
  },
  {
    id: "t5", tag: "osmanli",
    concepts: [["Divan-ı Hümayun", "Devlet işlerinin görüşüldüğü en önemli merkezî karar kuruludur."], ["Tımar sistemi", "Dirlik gelirleri karşılığında hizmet ve asker yetiştirme düzenidir."], ["İlmiye sınıfı", "Eğitim, hukuk ve din işleriyle ilgilenen sınıftır."], ["Kalemiye sınıfı", "Yazışma, maliye ve bürokrasi işlerinden sorumlu sınıftır."], ["Seyfiye sınıfı", "Askerî ve idari görevleri üstlenen yönetici sınıftır."]],
    events: [["14. yüzyıl", "Divan teşkilatının gelişmesi"], ["15. yüzyıl", "Merkeziyetçiliğin artması"], ["16. yüzyıl", "Klasik Osmanlı düzeninin olgunlaşması"]],
    easy: ["Vakıflar eğitim, sağlık ve sosyal yardım hizmetlerini desteklemiştir.", "Tımarlı sipahiler tımar sistemiyle doğrudan ilişkilidir."],
    medium: ["Tımar sistemi özel mülkiyet değildir; toprak devlete aittir.", "İlmiye hukuk ve eğitimle, kalemiye yazışma ve maliyeyle ilgilidir.", "Seyfiye askeri ve idari görevleri üstlenir.", "Divan-ı Hümayun devlet meselelerinin görüşüldüğü merkezî kuruldur.", "Tımar sistemi taşrada asker yetiştirilmesini sağlar.", "Vakıflar toplum yararına hizmetleri destekler.", "Nişancı kalemiye sınıfıyla ilişkilidir.", "Kazasker ilmiye sınıfına bağlı hukuk ve eğitim işleriyle ilgilidir.", "Defterdar maliye işleriyle ilgilidir.", "Kapıkulu sistemi merkezî ordu yapısıyla ilişkilidir."],
    hard: ["Üretim, güvenlik ve asker yetiştirme birlikte veriliyorsa tımar sistemi aranır.", "Kadı ve müderris ilmiye sınıfına yazılır.", "Divan'ın işlevi merkez teşkilatının kurumsallaştığını gösterir.", "Tımarın bozulması taşra güvenliği ve üretim düzenini etkiler.", "Vakıflar sosyal hizmetlerin toplum destekli kurumlarla yürütüldüğünü gösterir.", "Nişancı ve defterdarın ortak yönü bürokrasi ve kayıt işleriyle ilgili olmalarıdır.", "Seyfiye sınıfına ait görevliler askeri ve yönetim yetkisine sahiptir."],
    chronology: [["Divan teşkilatının gelişmesi", "Merkeziyetçiliğin artması", "Klasik sistemin olgunlaşması"], ["Tımar düzeninin güçlenmesi", "Klasik düzenin olgunlaşması", "Tımar düzeninin bozulması"], ["Merkez teşkilatının gelişmesi", "Kanunname geleneği", "Klasik Osmanlı düzeni"]]
  },
  {
    id: "t6", tag: "osmanli",
    concepts: [["Karlofça Antlaşması", "Osmanlı'nın batıda ilk büyük toprak kaybını yaşadığı 1699 antlaşmasıdır."], ["Pasarofça Antlaşması", "Batı etkisinin arttığı ve Lale Devri'ne zemin hazırlayan antlaşmadır."], ["Lale Devri", "Avrupa ile kültürel etkileşimin arttığı dönemdir."], ["Nizam-ı Cedid", "III. Selim döneminde kurulan yeni ordu ve yenileşme düzenidir."], ["Sened-i İttifak", "Ayanlarla padişah arasında yapılan ve merkezi otoriteyi sınırlayan belgedir."]],
    events: [["1699", "Karlofça Antlaşması"], ["1718", "Pasarofça Antlaşması"], ["1793", "Nizam-ı Cedid düzeninin kurulması"]],
    easy: ["Zitvatorok Osmanlı'nın Avusturya karşısındaki üstünlüğünün zayıflamasıyla ilişkilidir.", "Lale Devri'nde matbaanın kurulması kültür hayatıyla ilgilidir."],
    medium: ["Karlofça batıda ilk büyük toprak kaybını ifade eder.", "Pasarofça sonrası Avrupa'nın üstünlüğü daha belirgin kabul edilmiştir.", "Lale Devri kültürel etkileşim ve yenilik arayışlarıyla ilgilidir.", "Nizam-ı Cedid III. Selim dönemiyle ilişkilidir.", "Islahatların askeri alanda yoğunlaşması bozulmanın öncelikle orduda görüldüğünü gösterir.", "Sened-i İttifak padişah otoritesinin ayanlar karşısında sınırlanmasıdır.", "Karlofça büyük toprak kaybı, Pasarofça Batı etkisinin artmasıyla öne çıkar.", "Celali isyanları taşrada düzenin bozulmasıyla ilgilidir.", "Matbaanın kurulması yayın ve kültür hayatını etkiler.", "Duraklama ıslahatları genellikle askeri ve sınırlı düzenlemelerdir."],
    hard: ["Batıda ilk büyük toprak kaybı ifadesi Karlofça Antlaşması'na götürür.", "Lale Devri'ni yalnızca eğlence dönemi görmek eksik bir yorumdur.", "Nizam-ı Cedid'e yeniçeri ve geleneksel çevreler tepki göstermiştir.", "Sened-i İttifak padişah yetkisinin belgeyle sınırlanması bakımından önemlidir.", "Zitvatorok Osmanlı-Avusturya dengesinde Osmanlı üstünlüğünün zayıflamasını gösterir.", "Pasarofça sonrası Avrupa'yı tanıma girişimleri artmıştır.", "Halk desteği olmayan ıslahatlar kalıcı sonuç almakta zorlanır."],
    chronology: [["Zitvatorok", "Karlofça", "Pasarofça"], ["Karlofça", "Pasarofça", "Lale Devri"], ["Lale Devri", "Nizam-ı Cedid", "Sened-i İttifak"]]
  },
  {
    id: "t7", tag: "yenilesme",
    concepts: [["Sened-i İttifak", "Padişah yetkilerini ayanlar karşısında sınırlayan ilk belgedir."], ["Tanzimat Fermanı", "Hukuki güvenlik, can ve mal güvenliği gibi ilkeleri vurgulayan 1839 belgesidir."], ["Islahat Fermanı", "Azınlıklara daha geniş haklar tanıyan 1856 düzenlemesidir."], ["Kanun-i Esasi", "Osmanlı Devleti'nin ilk anayasasıdır."], ["Meşrutiyet", "Padişahın yanında meclisin de bulunduğu yönetim biçimidir."]],
    events: [["1808", "Sened-i İttifak"], ["1839", "Tanzimat Fermanı"], ["1876", "Kanun-i Esasi ve I. Meşrutiyet"]],
    easy: ["II. Meşrutiyet 1908'de yeniden ilan edilmiştir.", "Tanzimat hukuk önünde güvenlik ve eşitlik arayışıyla ilgilidir."],
    medium: ["Sened-i İttifak padişah yetkilerini sınırlayan ilk belge kabul edilir.", "Islahat Fermanı azınlık haklarını genişletmesiyle Tanzimat'tan ayrılır.", "Kanun-i Esasi Osmanlı'nın ilk anayasasıdır.", "Meşrutiyet meclisli yönetime geçişi ifade eder.", "Tanzimat can, mal ve namus güvenliği gibi ilkeleri vurgular.", "Islahat Fermanı Avrupa devletlerinin baskısıyla da ilişkilidir.", "I. Meşrutiyet II. Abdülhamit'in meclisi kapatmasıyla kısa sürmüştür.", "II. Meşrutiyetin ilanında İttihat ve Terakki etkili olmuştur.", "Tanzimat'ın amacı devleti dağılmaktan kurtarmaktır.", "Osmanlıcılık farklı unsurları ortak vatandaşlık düşüncesinde birleştirmeyi amaçlar."],
    hard: ["Sened-i İttifak ilk anayasal belge, Kanun-i Esasi ilk anayasadır.", "Tanzimat ve Islahat kapsamını eşitlemek hatalıdır; Islahat azınlık haklarıyla ayrılır.", "Meşrutiyet padişah yetkilerinin meclis ve anayasa ile sınırlandığını gösterir.", "Kanun-i Esasi anayasal ve parlamentolu yönetime geçiştir.", "Milliyetçilik hareketleri Osmanlıcılık düşüncesini zayıflatmıştır.", "Tanzimat'ın hukuk devleti yönü yargısız ceza olmamasıyla ilgilidir.", "Islahat Fermanı azınlık haklarının dış politika konusu haline geldiğini gösterir."],
    chronology: [["Sened-i İttifak", "Tanzimat Fermanı", "Kanun-i Esasi"], ["Tanzimat Fermanı", "Islahat Fermanı", "I. Meşrutiyet"], ["I. Meşrutiyet", "II. Meşrutiyet", "Trablusgarp Savaşı"]]
  },
  {
    id: "t8", tag: "yenilesme",
    concepts: [["Trablusgarp Savaşı", "Osmanlı'nın Kuzey Afrika'daki son toprağını kaybettiği süreçtir."], ["Uşi Antlaşması", "Trablusgarp Savaşı'nı bitiren 1912 antlaşmasıdır."], ["Balkan Savaşları", "Osmanlı'nın Rumeli'de büyük toprak kayıpları yaşadığı savaşlardır."], ["Çanakkale Cephesi", "I. Dünya Savaşı'nda Osmanlı'nın savunma başarısı gösterdiği cephedir."], ["Mondros Ateşkesi", "Osmanlı'nın işgallere açık hale geldiği 1918 ateşkesidir."]],
    events: [["1912", "Uşi Antlaşması"], ["1915", "Çanakkale Cephesi"], ["1918", "Mondros Ateşkesi"]],
    easy: ["Mondros'un 7. maddesi işgallere zemin hazırlamıştır.", "Trablusgarp'ta kara bağlantısının olmaması Osmanlı'yı zorlamıştır."],
    medium: ["Uşi Antlaşması ile Trablusgarp ve Bingazi İtalya'ya bırakılmıştır.", "Balkan Savaşları Rumeli kaybını hızlandırmıştır.", "Çanakkale Cephesi İstanbul'un işgalini geciktirmiş ve savaşın uzamasına yol açmıştır.", "Mondros Ateşkesi Anadolu'nun işgal edilmesine zemin hazırlamıştır.", "Kanal Cephesi İngiltere'nin sömürge yollarını kesme amacı taşır.", "Kafkas Cephesi'ndeki Sarıkamış Harekâtı ağır kayıplarla anılır.", "Balkan Savaşları sonrası Türkçülük fikri güçlenmiştir.", "Osmanlı'nın Almanya yanında savaşa girmesinde kaybedilen toprakları geri alma düşüncesi etkili olmuştur.", "Mondros'un 24. maddesi Doğu Anadolu ile ilgilidir.", "Trablusgarp Savaşı Uşi Antlaşması ile sona ermiştir."],
    hard: ["Mondros 7. madde işgallere gerekçe yapıldığı için Milli Mücadele açısından kritiktir.", "Çanakkale başarısı Rusya'ya yardım ulaşmasını engelleyip savaşın uzamasına etki etmiştir.", "Balkan kayıpları Osmanlı'nın siyasi ve askeri zayıflığını derinleştirmiştir.", "Uşi Trablusgarp'ı, Londra Balkan Savaşları'nı ilgilendirir.", "Son savaşlar işgaller ve direniş ortamı nedeniyle Milli Mücadele'ye zemin hazırlamıştır.", "Kanal Cephesi'nin başarısızlığı İngiltere'nin sömürge bağlantısını kesme hedefinin gerçekleşmediğini gösterir.", "Mondros sonrasında cemiyetlerin kurulması işgallere verilen tepkiyle ilgilidir."],
    chronology: [["Trablusgarp Savaşı", "Balkan Savaşları", "I. Dünya Savaşı"], ["Uşi Antlaşması", "Çanakkale Cephesi", "Mondros Ateşkesi"], ["Balkan Savaşları", "Mondros Ateşkesi", "İşgaller"]]
  },
  {
    id: "t9", tag: "milli-mucadele",
    concepts: [["Havza Genelgesi", "Milli bilinci uyandırmak için protesto mitingleri yapılmasını istemiştir."], ["Amasya Genelgesi", "Milli Mücadele'nin gerekçe, amaç ve yöntemini açıklamıştır."], ["Erzurum Kongresi", "Bölgesel toplanıp ulusal kararlar alan kongredir."], ["Sivas Kongresi", "Milli cemiyetleri tek çatı altında birleştiren ulusal kongredir."], ["Misak-ı Milli", "Milli sınırlar ve bağımsızlık hedefini ortaya koyan kararlardır."]],
    events: [["19 Mayıs 1919", "Mustafa Kemal'in Samsun'a çıkması"], ["22 Haziran 1919", "Amasya Genelgesi"], ["4 Eylül 1919", "Sivas Kongresi"]],
    easy: ["Temsil Heyeti ilk kez Erzurum Kongresi'nde oluşturulmuştur.", "Amasya Görüşmeleri Temsil Heyeti'nin tanınması bakımından önemlidir."],
    medium: ["Amasya Genelgesi milletin bağımsızlığını yine milletin kararının kurtaracağını vurgular.", "Erzurum Kongresi bölgesel toplanıp ulusal kararlar almıştır.", "Sivas Kongresi milli cemiyetleri tek çatı altında birleştirmiştir.", "Havza Genelgesi işgallere karşı halkın bilinçli tepki göstermesini amaçlar.", "Misak-ı Milli Son Osmanlı Mebusan Meclisi'nde kabul edilmiştir.", "Amasya Genelgesi İstanbul Hükümeti'nin görevini yapamadığını belirtir.", "Temsil Heyeti Sivas'ta tüm yurdu temsil eder hale gelmiştir.", "Manda ve himaye Sivas Kongresi'nde kesin olarak reddedilmiştir.", "TBMM'nin açılması milli egemenlik ilkesiyle ilişkilidir.", "Misak-ı Milli İstanbul'un işgal edilmesini hızlandırmıştır."],
    hard: ["Amaç, gerekçe ve yöntem birlikte soruluyorsa Amasya Genelgesi aranır.", "Erzurum Kongresi aldığı kararlar tüm vatanı ilgilendirdiği için ulusal nitelik taşır.", "Sivas Kongresi dağınık direnişi tek merkezde toplamıştır.", "Amasya Görüşmeleri Temsil Heyeti'nin İstanbul Hükümeti tarafından muhatap alınmasıdır.", "Misak-ı Milli Milli Mücadele'nin sınır ve bağımsızlık programıdır.", "TBMM'nin açılması milli egemenliğe dayalı yönetimi güçlendirmiştir.", "Manda ve himayenin reddi tam bağımsızlık ilkesiyle ilgilidir."],
    chronology: [["Samsun'a çıkış", "Amasya Genelgesi", "Sivas Kongresi"], ["Havza Genelgesi", "Amasya Genelgesi", "Erzurum Kongresi"], ["Erzurum Kongresi", "Sivas Kongresi", "Misak-ı Milli"]]
  },
  {
    id: "t10", tag: "milli-mucadele",
    concepts: [["Doğu Cephesi", "Ermenilere karşı mücadele edilen ve Gümrü ile kapanan cephedir."], ["Güney Cephesi", "Fransız ve Ermenilere karşı Kuvayımilliye ağırlıklı mücadelenin verildiği cephedir."], ["Batı Cephesi", "Yunanlara karşı düzenli ordu savaşlarının yapıldığı cephedir."], ["Sakarya Savaşı", "Türk ordusunun savunmadan taarruza geçiş sürecini başlatan dönüm noktasıdır."], ["Mudanya Ateşkesi", "Silahlı mücadeleyi fiilen bitiren ateşkestir."]],
    events: [["1920", "Gümrü Antlaşması"], ["1921", "Sakarya Savaşı"], ["1922", "Mudanya Ateşkesi"]],
    easy: ["Gümrü Antlaşması Doğu Cephesi'ni kapatmıştır.", "Güney Cephesi Kuvayımilliye direnişiyle öne çıkar."],
    medium: ["Doğu Cephesi Gümrü Antlaşması ile kapanmıştır.", "I. İnönü Savaşı Londra Konferansı'nın toplanmasında etkili olmuştur.", "Sakarya sonrası Kars ve Ankara antlaşmaları yapılmıştır.", "Mudanya Ateşkesi silahlı mücadeleyi fiilen bitirmiştir.", "Büyük Taarruz Yunan ordusunun Anadolu'dan çıkarılmasını sağlamıştır.", "Başkomutanlık yetkisi Sakarya Savaşı öncesinde verilmiştir.", "Güney Cephesi Ankara Antlaşması ile kapanmıştır.", "Batı Cephesi'nde düzenli orduya geçiş planlı mücadeleyi sağlamıştır.", "Kars Antlaşması doğu sınırının kesinleşmesiyle ilgilidir.", "Tekalif-i Milliye emirleri ordunun ihtiyaçlarını karşılamak için çıkarılmıştır."],
    hard: ["Mudanya bir barış antlaşması değil ateşkestir; kesin barış Lozan'dır.", "Gümrü Doğu Cephesi'ni kapatır, Kars doğu sınırını kesinleştirir.", "Sakarya savunmadan taarruza geçişin dönüm noktasıdır.", "I. İnönü'nün diplomatik etkisi TBMM'nin Londra Konferansı'na çağrılmasıdır.", "Ankara Antlaşması Fransa ile yapılmıştır.", "Güney Cephesi'nde yerel direniş belirleyicidir.", "Büyük Taarruz'un başarısı Mudanya Ateşkesi'ni hazırlamıştır."],
    chronology: [["Gümrü Antlaşması", "Sakarya Savaşı", "Mudanya Ateşkesi"], ["I. İnönü", "Sakarya", "Büyük Taarruz"], ["Sakarya Savaşı", "Büyük Taarruz", "Mudanya Ateşkesi"]]
  },
  {
    id: "t11", tag: "cumhuriyet",
    concepts: [["Saltanatın kaldırılması", "Osmanlı yönetim anlayışının sona erdirilmesi ve milli egemenliğin güçlenmesidir."], ["Cumhuriyetin ilanı", "Devletin yönetim şeklinin belirlenmesidir."], ["Halifeliğin kaldırılması", "Laikleşme yolunda önemli bir siyasi adımdır."], ["Tevhid-i Tedrisat", "Eğitim ve öğretimin birleştirilmesidir."], ["Medeni Kanun", "Hukuk alanında laik ve çağdaş düzenleme getiren kanundur."]],
    events: [["1922", "Saltanatın kaldırılması"], ["1923", "Cumhuriyetin ilanı"], ["1926", "Medeni Kanun'un kabulü"]],
    easy: ["Aşar vergisinin kaldırılması ekonomi ve tarım alanıyla ilgilidir.", "Harf inkılabı kültür ve eğitim alanıyla ilgilidir."],
    medium: ["Cumhuriyetçilik milli egemenlik kavramıyla ilgilidir.", "Laiklik halifeliğin kaldırılması ve Medeni Kanun ile güçlenmiştir.", "Devletçilik ekonomik kalkınmada devletin öncü rol üstlenmesidir.", "Tevhid-i Tedrisat eğitimde birliği sağlamıştır.", "Medeni Kanun hukuk ve toplumsal yaşam alanında değişiklik yapmıştır.", "Saltanatın kaldırılması ulusal egemenliği güçlendirmiştir.", "Halifeliğin kaldırılması laiklikle doğrudan ilişkilidir.", "Aşar vergisinin kaldırılması köylü ve çiftçiyi rahatlatmıştır.", "Soyadı Kanunu resmi işlemlerde düzen sağlamıştır.", "Halkçılık ayrıcalıksız ve sınıfsız toplum anlayışıyla ilgilidir."],
    hard: ["Tevhid-i Tedrisat eğitim, Medeni Kanun hukuk, Aşar ekonomi alanındadır.", "Halifeliğin kaldırılması laikleşme aşamaları içinde önemlidir.", "Cumhuriyetçilik yönetim biçimini, halkçılık toplumsal eşitliği vurgular.", "Devletçilik özel girişimi tümden reddetmeden kalkınmada devlete öncü rol verir.", "Medeni Kanun hukukun dini kurallardan bağımsız düzenlenmesini destekler.", "Harf inkılabı okuryazarlığı artırma ve kültürel dönüşüm amacı taşır.", "Saltanat siyasi egemenliği, halifelik dini-siyasi makamı ilgilendirir."],
    chronology: [["Saltanatın kaldırılması", "Cumhuriyetin ilanı", "Halifeliğin kaldırılması"], ["Tevhid-i Tedrisat", "Medeni Kanun", "Harf inkılabı"], ["Cumhuriyetin ilanı", "Medeni Kanun", "Soyadı Kanunu"]]
  },
  {
    id: "t12", tag: "cagdas",
    concepts: [["Lozan Antlaşması", "Türkiye'nin uluslararası bağımsızlığını tanıtan barış antlaşmasıdır."], ["Musul Sorunu", "İngiltere ile yaşanan ve Irak sınırıyla ilgili dış politika sorunudur."], ["Montrö Sözleşmesi", "Boğazlar üzerinde Türkiye'nin egemenliğini güçlendiren 1936 sözleşmesidir."], ["Hatay Sorunu", "Hatay'ın 1939'da Türkiye'ye katılmasıyla sonuçlanan dış politika konusudur."], ["NATO üyeliği", "Türkiye'nin 1952'de Batı Bloku güvenlik sistemine katılmasıdır."]],
    events: [["1936", "Montrö Boğazlar Sözleşmesi"], ["1939", "Hatay'ın Türkiye'ye katılması"], ["1952", "Türkiye'nin NATO'ya üye olması"]],
    easy: ["Kıbrıs Barış Harekâtı 1974 tarihiyle ilişkilidir.", "Balkan Antantı bölgesel güvenliği güçlendirme amacı taşır."],
    medium: ["Lozan sonrası dış politikanın temel hedefi bağımsızlığı korumaktır.", "Musul Sorunu İngiltere ile yaşanmıştır.", "Montrö Boğazlar üzerindeki Türk egemenliğini güçlendirmiştir.", "Hatay 1939'da Türkiye'ye katılmıştır.", "NATO üyeliği Soğuk Savaş güvenlik politikasıyla ilgilidir.", "Balkan Antantı bölgesel güvenliği sağlamaya yöneliktir.", "Sadabat Paktı Orta Doğu ülkeleriyle bölgesel iş birliğidir.", "II. Dünya Savaşı'nda Türkiye denge politikası izlemiştir.", "Kıbrıs Barış Harekâtı garantörlük hakkı ve Türklerin güvenliğiyle ilgilidir.", "Lozan'da çözülemeyip sonraya kalan sorunlardan biri Musul'dur."],
    hard: ["Montrö, Lozan Boğazlar düzenine göre Türkiye'nin denetimini güçlendirmiştir.", "Musul Sorunu Irak ve petrol bölgesi üzerindeki çıkarlarla ilgilidir.", "Hatay'ın katılması barışçı yollarla milli çıkarların korunmasına örnektir.", "NATO üyeliği Soğuk Savaş kutuplaşmasının sonucudur.", "Türkiye'nin II. Dünya Savaşı politikasında amaç savaşa girmeden güvenliği korumaktır.", "Balkan Antantı ve Sadabat Paktı bölgesel barış arayışını gösterir.", "Kıbrıs Barış Harekâtı Kıbrıs Türklerinin güvenliğiyle ilişkilidir."],
    chronology: [["Lozan Antlaşması", "Montrö Sözleşmesi", "Hatay'ın katılması"], ["Montrö Sözleşmesi", "Hatay'ın katılması", "NATO üyeliği"], ["II. Dünya Savaşı", "NATO üyeliği", "Kıbrıs Barış Harekâtı"]]
  }
];

function rotate<T>(items: T[], id: string) {
  const offset = Array.from(id).reduce((sum, char) => sum + char.charCodeAt(0), 0) % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

function choices(id: string, correct: string) {
  const base = [{ text: correct, correct: true }, ...genericWrongs.map((text) => ({ text, correct: false }))];
  const rotated = rotate(base, id);
  return {
    choices: rotated.map((item, index) => ({ id: "ABCDE"[index], text: item.text })),
    correctChoiceId: "ABCDE"[rotated.findIndex((item) => item.correct)]
  };
}

function question(id: string, topicId: string, difficulty: Difficulty, type: QuestionType, stem: string, correct: string, tags: string[]): Question {
  const built = choices(id, correct);
  return {
    id,
    topicId,
    difficulty,
    type,
    stem,
    choices: built.choices,
    correctChoiceId: built.correctChoiceId,
    explanation: correct,
    examTip: "Soruda verilen kavramı dönem, kurum ve sonuç ilişkisiyle birlikte düşün.",
    tags
  };
}

function buildQuestions(spec: Spec) {
  const result: Question[] = [];
  spec.concepts.forEach(([term, correct], index) => {
    result.push(question(`${spec.id}-k-${index + 1}`, spec.id, "temel", "single", `${term} aşağıdakilerden hangisiyle doğru açıklanır?`, correct, [spec.tag]));
  });
  spec.events.forEach(([date, event], index) => {
    result.push(question(`${spec.id}-k-${index + 6}`, spec.id, "temel", "single", `${date} tarihi hangi gelişmeyle ilişkilidir?`, `${date} tarihi ${event} gelişmesiyle ilişkilidir.`, [spec.tag, "kronoloji"]));
  });
  spec.easy.forEach((correct, index) => {
    result.push(question(`${spec.id}-k-${index + 9}`, spec.id, "temel", "single", "Aşağıdaki ifadelerden hangisi doğrudur?", correct, [spec.tag]));
  });
  spec.medium.forEach((correct, index) => {
    result.push(question(`${spec.id}-o-${index + 1}`, spec.id, "orta", index % 3 === 0 ? "case" : "single", "Verilen konuya göre aşağıdaki yorumlardan hangisi doğrudur?", correct, [spec.tag]));
  });
  spec.hard.forEach((correct, index) => {
    result.push(question(`${spec.id}-z-${index + 1}`, spec.id, "ileri", "case", "Bu konuyla ilgili seçici bir soruda hangi yargıya ulaşılabilir?", correct, [spec.tag]));
  });
  spec.chronology.forEach((items, index) => {
    result.push(question(`${spec.id}-z-${index + 8}`, spec.id, "ileri", "chronology", "Aşağıdaki sıralamalardan hangisi kronolojik olarak doğrudur?", items.join(" → "), [spec.tag, "kronoloji"]));
  });
  return result;
}

export const questionBankQuestions = specs.flatMap(buildQuestions) satisfies Question[];

const difficultyOrder: Record<Difficulty, number> = {
  temel: 0,
  orta: 1,
  ileri: 2
};

export function getQuestionBankQuestions(topicId?: string) {
  const scoped = topicId && topicId !== "all"
    ? questionBankQuestions.filter((question) => question.topicId === topicId)
    : questionBankQuestions;

  return [...scoped].sort((a, b) => {
    const difficultyDiff = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    if (difficultyDiff !== 0) return difficultyDiff;
    return a.id.localeCompare(b.id, "tr");
  });
}

export function getQuestionBankCountByTopic(topicId: string) {
  return questionBankQuestions.filter((question) => question.topicId === topicId).length;
}
