-- ============================================================
-- KPSS Tarih: ÖNCE topicler, sonra sorular + 40 deneme
-- Supabase SQL Editor'de çalıştır
-- ============================================================

-- ─── 1. TOPICS ──────────────────────────────────────────────
INSERT INTO public.content_topics (id, slug, title, era, short_description, exam_importance, estimated_minutes, keywords, summary, must_know, common_mistakes, quick_timeline, sort_order)
VALUES
(
  'islamiyet-oncesi',
  'islamiyet-oncesi-turk-tarihi',
  'İslamiyet Öncesi Türk Tarihi',
  'islamiyet-oncesi',
  'İlk Türk devletleri, bozkır kültürü, töre, kut anlayışı ve sosyal yapı.',
  86, 45,
  '["kut","töre","kurultay","ikili teşkilat","Orhun Yazıtları"]',
  '[{"heading":"Konu omurgası","body":"İslamiyet öncesi Türk tarihi; devlet yapısı, kut anlayışı, ikili teşkilat ve yazı kültürü açısından KPSS''de sık sorulan temel başlıklardan biridir.","bullets":["Kut anlayışı ve siyasi meşruiyet","Orhun Yazıtları ve önemi","İkili teşkilat ve sorunları"]}]',
  '["Kut anlayışının tanımı ve özellikleri","Orhun Yazıtlarının önemi","İkili teşkilatın yol açtığı sorunlar","Kurultayın işlevi"]',
  '["Kutun kalıtsal olduğunu sanmak","Orhun Yazıtlarının dilini karıştırmak","İkili teşkilatın avantajlarını göz ardı etmek"]',
  '[{"date":"552","event":"I. Kök Türk Devleti kuruldu"},{"date":"732-735","event":"Orhun Yazıtları dikildi"}]',
  1
),
(
  'turk-islam',
  'turk-islam-tarihi',
  'Türk-İslam Tarihi',
  'turk-islam',
  'Karahanlı, Gazneli, Büyük Selçuklu ve Türk-İslam medeniyetinin temel kurumları.',
  84, 48,
  '["Karahanlılar","Gazneliler","Büyük Selçuklu","ikta","Nizamiye"]',
  '[{"heading":"Konu omurgası","body":"Türk-İslam tarihi; Orta Asya Türk devletleri ile İslam medeniyetinin buluşmasını, kurumsal yapıları ve kültürel eserleri kapsar.","bullets":["Karahanlı, Gazneli, Selçuklu karşılaştırması","Nizamiye Medreseleri ve önemi","Malazgirt Savaşı ve sonuçları"]}]',
  '["Büyük Selçuklu kurucusunun kim olduğu","Nizamiye Medreselerinin amacı","Malazgirt Savaşının önemi","Türk-İslam eserlerinin yazarları"]',
  '["Alparslan ile Tuğrul Bey''i karıştırmak","Divan-ı Lügat-it Türk ile Kutadgu Bilig yazarlarını karıştırmak","Talas Savaşının sonuçlarını yanlış öğrenmek"]',
  '[{"date":"751","event":"Talas Savaşı"},{"date":"1040","event":"Dandanakan Savaşı"},{"date":"1071","event":"Malazgirt Savaşı"}]',
  2
),
(
  'anadolu-selcuklu',
  'anadolu-selcuklu-ve-beylikler',
  'Anadolu Selçuklu ve Beylikler',
  'turk-islam',
  'Anadolu''nun Türkleşmesi, kurumlaşma, ticaret yolları ve beylikler dönemi.',
  78, 40,
  '["kervansaray","ahilik","mirî arazi","Kösedağ","beylikler"]',
  '[{"heading":"Konu omurgası","body":"Anadolu Selçuklu Devleti, kervansaray sistemi ve ahilik teşkilatıyla Anadolu''nun Türkleşmesine büyük katkı sağlamıştır.","bullets":["Kervansarayların ticari işlevi","Ahiliğin toplumsal rolü","Kösedağ Savaşı ve sonuçları"]}]',
  '["Anadolu Selçuklu başkentinin Konya olduğu","Kösedağ Savaşının Moğollarla yapıldığı","Ahilik teşkilatının işlevi","Osmanlı''nın öne çıkma nedeni"]',
  '["Başkenti Sivas veya Kayseri sanmak","Kösedağ sonrası süreci yanlış okumak","Ahiliği yalnızca dini bir kurum saymak"]',
  '[{"date":"1176","event":"Miryokefalon Savaşı"},{"date":"1243","event":"Kösedağ Savaşı"}]',
  3
),
(
  'osmanli-kurulus-yukselis',
  'osmanli-kurulus-ve-yukselis',
  'Osmanlı Kuruluş ve Yükseliş',
  'osmanli',
  'Beylikten devlete geçiş, Balkan politikası, İstanbul''un fethi ve merkeziyetçilik.',
  88, 52,
  '["iskan","devşirme","tımar","İstanbul''un fethi","merkeziyetçilik"]',
  '[{"heading":"Konu omurgası","body":"Osmanlı Devleti''nin kuruluş ve yükseliş dönemleri; fetihler, kurumsal yapı ve Balkanlardaki ilerlemeyi kapsar.","bullets":["İstanbul''un fethi ve önemi","Devşirme sisteminin amacı","Tımar sisteminin işleyişi"]}]',
  '["İstanbul''u fetheden padişahın Fatih olduğu","Devşirme sisteminin amacı","Tımar ve sipahi ilişkisi","Mısır seferi ve halifelik"]',
  '["Fatih ile II. Murat''ı karıştırmak","Tımarı mülkiyet saymak","Halifeliğin devir tarihini yanlış bilmek"]',
  '[{"date":"1299","event":"Osmanlı Beyliği''nin kuruluş süreci"},{"date":"1453","event":"İstanbul''un fethi"},{"date":"1517","event":"Mısır Seferi ve halifelik"}]',
  4
),
(
  'osmanli-kultur-medeniyet',
  'osmanli-kultur-ve-medeniyet',
  'Osmanlı Kültür ve Medeniyet',
  'osmanli',
  'Merkez-taşra teşkilatı, hukuk, eğitim, maliye, ordu ve toplum yapısı.',
  92, 58,
  '["divan","tımar","vakıf","enderun","millet sistemi"]',
  '[{"heading":"Konu omurgası","body":"Osmanlı kültür ve medeniyet başlığı; Divan-ı Hümayun, millet sistemi, vakıflar ve Enderun Mektebi gibi kurumları kapsar.","bullets":["Divan-ı Hümayun''un işlevi","Millet sisteminin özellikleri","Vakıf sisteminin toplumsal rolü"]}]',
  '["Divan-ı Hümayun''un işlevi","Millet sisteminin tanımı","Mirî arazinin mülkiyet durumu","Enderun''un amacı"]',
  '["Divan''ı yalnızca yargı organı saymak","Millet sistemini asimilasyon politikası zannetmek","Vakıfları yalnızca dini kurum saymak"]',
  '[{"date":"Klasik dönem","event":"Merkez-taşra düzeninin olgunlaşması"},{"date":"XVII. yy","event":"Kurumlarda bozulma"}]',
  5
),
(
  'osmanli-yenilesme',
  'osmanli-yenilesme',
  'Osmanlı Yenileşme ve Demokratikleşme',
  'yenilesme',
  'Lale Devri''nden Meşrutiyet''e uzanan ıslahatlar, anayasal gelişmeler ve modernleşme.',
  90, 56,
  '["Lale Devri","Tanzimat","Islahat","Kanunuesasi","Meşrutiyet"]',
  '[{"heading":"Konu omurgası","body":"Osmanlı yenileşme süreci; Batı etkisiyle başlayan reformları, Tanzimat ve Islahat fermanlarını, Meşrutiyet ilanlarını kapsar.","bullets":["Tanzimat ile Islahat farkı","I. ve II. Meşrutiyet tarihleri","Lale Devri''nin önemi"]}]',
  '["Tanzimat Fermanının hangi padişah döneminde ilan edildiği","Islahat Fermanının Tanzimat''tan farkı","I. Meşrutiyetin ilan tarihi","Lale Devri''nde başlayan yenilikler"]',
  '["I. ve II. Meşrutiyet tarihlerini karıştırmak","Islahat''ı Tanzimat''ın tekrarı sanmak","Lale Devri''ni yalnızca eğlence dönemi saymak"]',
  '[{"date":"1839","event":"Tanzimat Fermanı"},{"date":"1856","event":"Islahat Fermanı"},{"date":"1876","event":"I. Meşrutiyet"}]',
  6
),
(
  'milli-mucadele-hazirlik',
  'milli-mucadele-hazirlik-donemi',
  'Milli Mücadele Hazırlık Dönemi',
  'milli-mucadele',
  'Mondros sonrası işgaller, cemiyetler, kongreler ve ulusal egemenlik fikrinin oluşumu.',
  94, 55,
  '["Mondros","Amasya","Erzurum","Sivas","Misakımilli"]',
  '[{"heading":"Konu omurgası","body":"Milli Mücadele hazırlık dönemi; Mondros''tan TBMM''nin açılışına uzanan süreçte kongreleri, cemiyetleri ve ulusal örgütlenmeyi kapsar.","bullets":["Amasya Genelgesinin önemi","Erzurum-Sivas kongreleri farkı","Misakımilli''nin içeriği"]}]',
  '["Mondros''un imzalanma tarihi","Amasya Genelgesinin mesajı","Erzurum ve Sivas kongrelerinin farkı","Misakımilli''nin tanımı"]',
  '["Mondros ile Lozan''ı karıştırmak","Erzurum''u ulusal, Sivas''ı bölgesel sanmak","Misakımilli''nin hangi meclis tarafından kabul edildiğini yanlış bilmek"]',
  '[{"date":"1918","event":"Mondros Ateşkesi"},{"date":"1919","event":"Amasya Genelgesi, Erzurum ve Sivas Kongreleri"},{"date":"1920","event":"Misakımilli ve TBMM''nin açılması"}]',
  7
),
(
  'kurtulus-savasi',
  'kurtulus-savasi-ve-antlasmalar',
  'Kurtuluş Savaşı ve Antlaşmalar',
  'milli-mucadele',
  'Cepheler, diplomatik gelişmeler, TBMM''nin otoritesi ve Lozan''a giden süreç.',
  93, 52,
  '["I. İnönü","Sakarya","Büyük Taarruz","Mudanya","Lozan"]',
  '[{"heading":"Konu omurgası","body":"Kurtuluş Savaşı; cephe muharebeleri, diplomatik atılımlar ve Lozan Antlaşması ile sonuçlanan süreçtir.","bullets":["Cephe sıralaması: I. İnönü → Sakarya → Büyük Taarruz","Mudanya ve Lozan farkı","Lozan''da kazanımlar"]}]',
  '["Lozan''ın imzalanma tarihi","Sakarya Muharebesinin önemi","Mudanya ile Lozan farkı","Büyük Taarruz''un ne zaman yapıldığı"]',
  '["Mudanya''yı barış antlaşması zannetmek","Cephe sıralamasını karıştırmak","Lozan''da nüfus mübadelesi maddesini yanlış bilmek"]',
  '[{"date":"1921","event":"Sakarya Meydan Muharebesi"},{"date":"1922","event":"Büyük Taarruz ve Mudanya"},{"date":"1923","event":"Lozan Barış Antlaşması"}]',
  8
),
(
  'ataturk-ilke-inkilap',
  'ataturk-ilke-ve-inkilaplari',
  'Atatürk İlke ve İnkılapları',
  'cumhuriyet',
  'Siyasi, hukuk, eğitim, ekonomi ve toplumsal inkılapların ilke bağlantıları.',
  96, 60,
  '["cumhuriyetçilik","laiklik","halkçılık","devletçilik","inkılapçılık"]',
  '[{"heading":"Konu omurgası","body":"Atatürk''ün Altı İlkesi (Altı Ok) ve bu ilkelere bağlı inkılaplar KPSS''nin en çok soru sorduğu başlıktır.","bullets":["Altı ok ve tanımları","İnkılap-ilke eşleştirmesi","Saltanat ve halifelik kaldırılma tarihleri"]}]',
  '["Saltanat ve halifeliğin kaldırıldığı yıllar","Tevhid-i Tedrisatın amacı","Devletçilik ilkesinin anlamı","Kadın haklarının hangi ilkeyle ilişkili olduğu"]',
  '["Saltanat (1922) ile Halifelik (1924) tarihlerini karıştırmak","Soyadı Kanununu laiklikle ilişkilendirmek","Devletçiliği komünizm zannetmek"]',
  '[{"date":"1924","event":"Halifeliğin kaldırılması"},{"date":"1925","event":"Şapka Kanunu"},{"date":"1934","event":"Soyadı Kanunu"}]',
  9
),
(
  'cumhuriyet-dis-politika',
  'cumhuriyet-donemi-dis-politika',
  'Cumhuriyet Dönemi Dış Politika',
  'cumhuriyet',
  'Lozan sonrası sorunlar, barışçı dış politika, bölgesel ittifaklar ve II. Dünya Savaşı süreci.',
  82, 44,
  '["Musul","Montrö","Sadabat","Balkan Antantı","Hatay"]',
  '[{"heading":"Konu omurgası","body":"Cumhuriyet dönemi dış politikası; Lozan''ın ardından çözüme kavuşturulan sorunları ve bölgesel antlaşmaları kapsar.","bullets":["Montrö''nün önemi","Balkan Antantı ve Sadabat Paktı farkı","Hatay''ın Türkiye''ye katılma tarihi"]}]',
  '["Montrö''nün imzalanma tarihi","Hatay''ın katılım tarihi","Balkan Antantı üyeleri","II. Dünya Savaşında Türkiye''nin tutumu"]',
  '["Montrö ile Lozan''ı karıştırmak","Balkan Antantı ile Sadabat Paktını karıştırmak","Hatay tarihi yanlış bilmek"]',
  '[{"date":"1934","event":"Balkan Antantı"},{"date":"1936","event":"Montrö Boğazlar Sözleşmesi"},{"date":"1939","event":"Hatay''ın Türkiye''ye katılması"}]',
  10
),
(
  'cagdas-turk-dunya',
  'cagdas-turk-ve-dunya-tarihi',
  'Çağdaş Türk ve Dünya Tarihi',
  'cagdas',
  'Soğuk Savaş, uluslararası örgütler, küresel krizler ve Türkiye''nin yakın dönem politikaları.',
  76, 42,
  '["Soğuk Savaş","NATO","BM","Kıbrıs","küreselleşme"]',
  '[{"heading":"Konu omurgası","body":"Çağdaş tarih; Soğuk Savaş, NATO üyeliği, BM ve Kıbrıs meselesi gibi konuları kapsar.","bullets":["NATO üyelik tarihi","BM''nin kuruluş amacı","1974 Kıbrıs Harekâtının nedeni"]}]',
  '["NATO''ya katılım tarihi (1952)","BM''nin kuruluş tarihi","1974 Kıbrıs Harekâtının nedeni","Soğuk Savaşta Türkiye''nin tutumu"]',
  '["BM''yi Milletler Cemiyetiyle karıştırmak","NATO tarihini yanlış bilmek","Kıbrıs Harekâtının nedenini karıştırmak"]',
  '[{"date":"1945","event":"BM''nin kurulması"},{"date":"1952","event":"Türkiye''nin NATO''ya katılması"},{"date":"1974","event":"Kıbrıs Barış Harekâtı"}]',
  11
),
(
  'genel-kronoloji',
  'tarih-genel-kronoloji',
  'Tarih Genel Kronoloji ve Karma Tekrar',
  'cagdas',
  'KPSS Tarih genel tekrarında dönemler arası bağlantı, sıralama ve karma soru pratiği.',
  80, 36,
  '["kronoloji","karma tekrar","eşleştirme","neden-sonuç"]',
  '[{"heading":"Konu omurgası","body":"Genel kronoloji tekrarı; tüm dönemlerdeki olayları birbirine bağlayarak sınav pratiği kazandırır.","bullets":["Dönemler arası kronoloji","Kişi-eser-dönem eşleştirmesi","Neden-sonuç ilişkileri"]}]',
  '["Önemli tarihlerin sıralaması","Kişi-eser eşleştirmeleri","Antlaşmaların içerikleri","Neden-sonuç ilişkileri"]',
  '["Kronoloji sıralamasını karıştırmak","Benzer isimlerin dönemlerini yanlış eşleştirmek"]',
  '[{"date":"Genel","event":"Dönemler arası bağlantılı tekrar"}]',
  12
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  updated_at = now();

-- ─── 2. EXAMS TABLOSU (yoksa oluştur) ──────────────────────
CREATE TABLE IF NOT EXISTS public.content_exams (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  duration_minutes integer NOT NULL DEFAULT 50,
  question_count integer NOT NULL DEFAULT 40,
  difficulty text NOT NULL DEFAULT 'karma' CHECK (difficulty IN ('kolay', 'orta', 'zor', 'karma')),
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.content_exam_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id text NOT NULL REFERENCES public.content_exams(id) ON DELETE CASCADE,
  question_id text NOT NULL REFERENCES public.content_questions(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  UNIQUE(exam_id, question_id)
);

ALTER TABLE public.content_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_exam_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published exams" ON public.content_exams;
CREATE POLICY "Public read published exams" ON public.content_exams FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public read exam questions" ON public.content_exam_questions;
CREATE POLICY "Public read exam questions" ON public.content_exam_questions FOR SELECT
USING (EXISTS (SELECT 1 FROM public.content_exams e WHERE e.id = exam_id AND e.is_published = true));

-- ─── 3. SORULAR ─────────────────────────────────────────────

-- İSLAMİYET ÖNCESİ TÜRK TARİHİ
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('islamiyet-oncesi-q1','islamiyet-oncesi','single','temel','Türklerde "kut" anlayışına göre aşağıdakilerden hangisi doğrudur?','B','Kut, Tanrı tarafından hükümdara bağışlanan iktidar gücüdür. Kalıtsal değil, Tanrı''nın lütfuna bağlı olduğu için herhangi bir an geri alınabilir.','Kut kavramını "kalıtsal" ile ilişkilendiren şıkları eleyerek başla.','["kut","Türk siyasi düşüncesi"]',1),
('islamiyet-oncesi-q2','islamiyet-oncesi','chronology','orta','Orhun Yazıtları hakkında aşağıdaki ifadelerden hangisi yanlıştır?','D','Orhun Yazıtları Türkçe ile yazılmıştır, Çince ile değil. Bu onları özgün kılan en temel özelliktir.','Yanlışı soruyorsa tüm şıkları tek tek doğrula; "Çince/Türkçe" ayrımı klasik tuzaktır.','["Orhun Yazıtları","Göktürk"]',2),
('islamiyet-oncesi-q3','islamiyet-oncesi','single','orta','İslamiyet öncesi Türk devletlerinde "ikili teşkilat" anlayışının doğurduğu temel sorun nedir?','A','İkili teşkilatta ülke doğu-batı olarak iki hanedan üyesi arasında paylaşılırdı. Bu durum sürekli taht kavgalarına ve devletin parçalanmasına zemin hazırlamıştır.','İkili teşkilatın hem avantajını hem dezavantajını not et.','["ikili teşkilat","taht kavgası"]',3),
('islamiyet-oncesi-q4','islamiyet-oncesi','single','ileri','Kurultay''ın işlevi düşünüldüğünde, Türklerde aşağıdakilerden hangisi söylenebilir?','E','Kurultay; boyların katıldığı ve önemli devlet meselelerinin görüşüldüğü meclisdir. Mutlak monarşi yerine sınırlı bir katılım geleneğinin varlığına işaret eder.','Kurultay''ın kimlerden oluştuğunu ve hangi kararları aldığını somut örneklerle hatırla.','["kurultay","Türk yönetim anlayışı"]',4),
('islamiyet-oncesi-q5','islamiyet-oncesi','case','orta','Aşağıdaki eşleştirmelerden hangisi doğrudur?','C','I. Kök Türk Devleti 552''de Bumin Kağan tarafından kurulmuştur. Orhun Yazıtları ise Bilge Kağan ve Kül Tigin adına 8. yüzyılda dikilmiştir.','Tarih-kurucu-olay üçlüsünü birlikte ezberle.','["Kök Türk","Bumin Kağan","kronoloji"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('islamiyet-oncesi-q1','A','Kutun hükümdara halkın seçimiyle verildiğini ifade eder.',1),
('islamiyet-oncesi-q1','B','Kutun Tanrı tarafından bağışlandığını ve geri alınabileceğini ifade eder.',2),
('islamiyet-oncesi-q1','C','Kut, yalnızca askeri başarıyla kazanılabilen bir statüdür.',3),
('islamiyet-oncesi-q1','D','Kut, babadan oğula geçen kalıtsal bir liderlik hakkıdır.',4),
('islamiyet-oncesi-q1','E','Kutun hükümdara boyların onayıyla verildiğini ifade eder.',5),
('islamiyet-oncesi-q2','A','Türk dilinin bilinen en eski yazılı belgeleri arasında yer alır.',1),
('islamiyet-oncesi-q2','B','Göktürk alfabesiyle yazılmıştır.',2),
('islamiyet-oncesi-q2','C','Halkı yöneticilerinden hesap sorabilecek bilinçte gösterir.',3),
('islamiyet-oncesi-q2','D','Çince ve Türkçe olmak üzere iki dilde kaleme alınmıştır.',4),
('islamiyet-oncesi-q2','E','Türk milletine devleti nasıl koruyacaklarına dair öğütler içerir.',5),
('islamiyet-oncesi-q3','A','Taht kavgaları ve devletin bölünmesi.',1),
('islamiyet-oncesi-q3','B','Ordu komutanlarının nüfuz kazanması.',2),
('islamiyet-oncesi-q3','C','Dini otoritenin siyasi iktidara müdahale etmesi.',3),
('islamiyet-oncesi-q3','D','Yabancı devletlerin iç işlere karışması.',4),
('islamiyet-oncesi-q3','E','Ticaret yollarının kontrol edilememesi.',5),
('islamiyet-oncesi-q4','A','Türklerde merkezi otorite hiçbir zaman kurulamamıştır.',1),
('islamiyet-oncesi-q4','B','Siyasi kararlar yalnızca hükümdar tarafından alınırdı.',2),
('islamiyet-oncesi-q4','C','Boylar arasındaki rekabet kurultay aracılığıyla tamamen önlenmiştir.',3),
('islamiyet-oncesi-q4','D','Kurultay yalnızca savaş dönemlerinde toplanırdı.',4),
('islamiyet-oncesi-q4','E','Hükümdarlık mutlak olmayıp boyların katılımıyla sınırlandırılmıştır.',5),
('islamiyet-oncesi-q5','A','I. Kök Türk Devleti – 745 – Uygurlar tarafından yıkılmıştır.',1),
('islamiyet-oncesi-q5','B','Orhun Yazıtları – 6. yüzyıl – Bumin Kağan adına dikilmiştir.',2),
('islamiyet-oncesi-q5','C','I. Kök Türk Devleti – 552 – Bumin Kağan kurmuştur.',3),
('islamiyet-oncesi-q5','D','Uygur Devleti – 552 – Göktürklerin mirasçısıdır.',4),
('islamiyet-oncesi-q5','E','Orhun Yazıtları – 9. yüzyıl – Kağanlığın çöküşünü anlatır.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- TÜRK-İSLAM TARİHİ
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('turk-islam-q1','turk-islam','single','temel','Büyük Selçuklu Devleti''nin kurucusu kimdir?','C','Büyük Selçuklu Devleti, Tuğrul Bey tarafından 1040 Dandanakan Savaşı''nın ardından kurulmuştur.','Tuğrul = kurucu, Alparslan = Malazgirt fatihi.','["Selçuklu","Tuğrul Bey"]',1),
('turk-islam-q2','turk-islam','single','orta','Nizamülmülk''ün kurduğu Nizamiye Medreselerinin temel amacı nedir?','A','Nizamiye Medreseleri; Sünni İslam anlayışını yaymak, devlet için nitelikli yönetici ve din adamı yetiştirmek amacıyla kurulmuştur.','Nizamiye = Sünni devlet okulları. Şii Fatımilere karşı ideolojik araç.','["Nizamiye","medrese","eğitim"]',2),
('turk-islam-q3','turk-islam','chronology','orta','Aşağıdakilerden hangisi Talas Savaşı''nın (751) sonuçları arasında gösterilemez?','E','Talas Savaşı''nda kâğıt yapımı İslam dünyasına yayılmıştır. Matbaanın icadı bu savaşla ilgili değildir.','Talas Savaşı = kâğıt. Matbaa çeldirici olarak gelir.','["Talas Savaşı","kâğıt"]',3),
('turk-islam-q4','turk-islam','single','ileri','Karahanlılar döneminde yazılan hangi eser hem dilbilgisi hem nasihatname niteliği taşır?','B','Kutadgu Bilig, Yusuf Has Hacip tarafından yazılmış olup devlet yönetimi ve siyasi ahlak üzerine öğütler içerir.','Divan-ı Lügat-it Türk = sözlük; Kutadgu Bilig = nasihatname.','["Kutadgu Bilig","Karahanlı"]',4),
('turk-islam-q5','turk-islam','case','orta','1071 Malazgirt Savaşı hakkında aşağıdaki ifadelerden hangisi doğrudur?','D','Malazgirt''te Alparslan, Bizans İmparatoru Romanos Diogenes''i esir almıştır. Bu zafer Anadolu''nun Türklere kapısını açmıştır.','Malazgirt: Alparslan vs. Romanos Diogenes.','["Malazgirt","Alparslan","Anadolu"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('turk-islam-q1','A','Alparslan',1),('turk-islam-q1','B','Melikşah',2),('turk-islam-q1','C','Tuğrul Bey',3),('turk-islam-q1','D','Selçuk Bey',4),('turk-islam-q1','E','Çağrı Bey',5),
('turk-islam-q2','A','Sünni İslam anlayışını yaymak ve nitelikli yönetici yetiştirmek.',1),('turk-islam-q2','B','Hristiyan faaliyetlerine karşı koymak.',2),('turk-islam-q2','C','Ticaret yollarında güvenliği sağlamak.',3),('turk-islam-q2','D','Abbasi halifelerinin eğitim politikasını uygulamak.',4),('turk-islam-q2','E','Türk dilini ve kültürünü korumak.',5),
('turk-islam-q3','A','Kâğıt yapım tekniği İslam dünyasına yayılmıştır.',1),('turk-islam-q3','B','Türk-Çin ilişkileri köklü biçimde değişmiştir.',2),('turk-islam-q3','C','Türklerin İslamlaşma süreci hızlanmıştır.',3),('turk-islam-q3','D','Çin''in Orta Asya üzerindeki nüfuzu kırılmıştır.',4),('turk-islam-q3','E','Matbaanın icat edilmesine zemin hazırlamıştır.',5),
('turk-islam-q4','A','Divan-ı Lügat-it Türk',1),('turk-islam-q4','B','Kutadgu Bilig',2),('turk-islam-q4','C','Atabetü''l-Hakayık',3),('turk-islam-q4','D','Divanü Hikmet',4),('turk-islam-q4','E','Siyasetname',5),
('turk-islam-q5','A','İstanbul Türklerin eline geçmiştir.',1),('turk-islam-q5','B','Yalnızca Türkmen kuvvetleri savaşmıştır.',2),('turk-islam-q5','C','Haçlı Seferleri doğrudan başlamıştır.',3),('turk-islam-q5','D','Alparslan Bizans İmparatoru''nu esir almış; Anadolu açılmıştır.',4),('turk-islam-q5','E','Selçuklu-Abbasi ittifakı üzerine kurulmuştu.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- ANADOLU SELÇUKLU VE BEYLİKLER
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('anadolu-selcuklu-q1','anadolu-selcuklu','single','temel','Anadolu Selçuklularının başkenti aşağıdakilerden hangisidir?','C','Anadolu Selçuklularının başkenti Konya''dır.','Başkent sorusunda Sivas, Kayseri çeldirici olur; doğru cevap Konya.','["Anadolu Selçuklu","Konya"]',1),
('anadolu-selcuklu-q2','anadolu-selcuklu','single','orta','Kervansarayların Anadolu Selçuklularındaki ticari işlevi nedir?','A','Kervansaraylar, ticaret yolları boyunca kervanların güvenle konakladığı devlet güvenceli yapılardır.','Kervansaray = ticaret güvencesi + devlet geliri.','["kervansaray","ticaret"]',2),
('anadolu-selcuklu-q3','anadolu-selcuklu','chronology','orta','1243 Kösedağ Savaşı''nın Anadolu Selçukluları açısından en önemli sonucu nedir?','E','Kösedağ''da Moğollara yenilmek, Selçuklu''nun Moğol hâkimiyetine girmesine ve beylikler dönemine zemin hazırlamasına neden olmuştur.','Kösedağ = Moğol hâkimiyetinin başlangıcı.','["Kösedağ","Moğol","beylikler"]',3),
('anadolu-selcuklu-q4','anadolu-selcuklu','single','ileri','Osmanlı Beyliği''nin kısa sürede öne çıkmasının temel nedeni nedir?','B','Osmanlı Beyliği, Bizans sınırındaki "uç" konumu sayesinde sürekli gaza yapma imkânı bulmuş ve gazi nüfusunu kendine çekmiştir.','Osmanlı avantajı = sınır bölgesi + gaza ideolojisi.','["Osmanlı","beylik","uç","gaza"]',4),
('anadolu-selcuklu-q5','anadolu-selcuklu','case','orta','Ahilik teşkilatının Anadolu''nun Türkleşmesindeki rolü bakımından hangisi doğrudur?','D','Ahilik; esnaf ve zanaatkârları bir çatı altında toplayan, mesleki ve ahlaki eğitim veren teşkilattır. Şehirlerde Türk-İslam kültürünün yerleşmesine katkı sağlamıştır.','Ahilik = şehir esnafı + ahlak eğitimi + Türkleşmenin şehir ayağı.','["ahilik","esnaf","Türkleşme"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('anadolu-selcuklu-q1','A','Ankara',1),('anadolu-selcuklu-q1','B','Sivas',2),('anadolu-selcuklu-q1','C','Konya',3),('anadolu-selcuklu-q1','D','Kayseri',4),('anadolu-selcuklu-q1','E','Erzurum',5),
('anadolu-selcuklu-q2','A','Ticaret yollarını güvence altına alarak ekonomiyi canlandırmak.',1),('anadolu-selcuklu-q2','B','Yalnızca askeri kuvvetlerin konaklama ihtiyacını karşılamak.',2),('anadolu-selcuklu-q2','C','Dini eğitim vererek halkın İslamlaşmasını hızlandırmak.',3),('anadolu-selcuklu-q2','D','Yabancı tüccarları ülkeye girişten caydırmak.',4),('anadolu-selcuklu-q2','E','Moğol ilerleyişini engelleyecek hatlar oluşturmak.',5),
('anadolu-selcuklu-q3','A','Haçlı Seferlerinin Anadolu''da hız kazanması.',1),('anadolu-selcuklu-q3','B','Bizans''ın topraklarını geri alması.',2),('anadolu-selcuklu-q3','C','Osmanlı Beyliği''nin hemen kurulması.',3),('anadolu-selcuklu-q3','D','Selçuklu merkezi yönetiminin güçlenmesi.',4),('anadolu-selcuklu-q3','E','Devletin Moğol egemenliğine girerek güç kaybetmesi.',5),
('anadolu-selcuklu-q4','A','Bizans ile kurulan güçlü ittifak.',1),('anadolu-selcuklu-q4','B','Sınır bölgesindeki konumu ve sürekli gazi faaliyetleri.',2),('anadolu-selcuklu-q4','C','Moğol baskısından en uzakta kalması.',3),('anadolu-selcuklu-q4','D','Ticaret yollarını tamamen kontrol altına alması.',4),('anadolu-selcuklu-q4','E','Selçuklu hükümdarının en büyük bey ilan etmesi.',5),
('anadolu-selcuklu-q5','A','Sadece köylülerin örgütlenmesini sağlamıştır.',1),('anadolu-selcuklu-q5','B','Bizans nüfusunu dönüştürmüştür.',2),('anadolu-selcuklu-q5','C','Yalnızca askeri amaçlarla kurulmuştur.',3),('anadolu-selcuklu-q5','D','Şehirlerde mesleki dayanışma ve Türk-İslam kültürünün yerleşmesine katkı sağlamıştır.',4),('anadolu-selcuklu-q5','E','Moğol yönetimine karşı silahlı direniş örgütlemiştir.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- OSMANLI KURULUŞ VE YÜKSELİŞ
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('osmanli-kurulus-yukselis-q1','osmanli-kurulus-yukselis','single','temel','İstanbul''un fethini (1453) gerçekleştiren Osmanlı padişahı kimdir?','B','İstanbul''u fetheden Fatih Sultan Mehmet''tir.','1453 - Fatih Sultan Mehmet. Bu ikiliyi birlikte ezberle.','["İstanbul fethi","Fatih","1453"]',1),
('osmanli-kurulus-yukselis-q2','osmanli-kurulus-yukselis','single','orta','Devşirme sisteminin temel amacı nedir?','D','Devşirme; padişaha doğrudan bağlı, sadık bir asker ve yönetici sınıfı oluşturmak amacıyla Hristiyan tebaanın çocuklarından toplanan sistemdir.','Devşirmenin amacı: sadakat garantisi. Türk ailelerinden değil Hristiyan çocuklardan alınır.','["devşirme","Kapıkulu"]',2),
('osmanli-kurulus-yukselis-q3','osmanli-kurulus-yukselis','chronology','orta','Osmanlı''nın Balkanlardaki ilerleyişinde doğru kronoloji hangisidir?','A','Osmanlı sırasıyla Rumeli geçişi, Edirne, Kosova Savaşı (1389) ve İstanbul (1453) ile ilerledi.','Balkan kronolojisi: Rumeli → Edirne → Kosova (1389) → İstanbul (1453).','["Balkan","kronoloji"]',3),
('osmanli-kurulus-yukselis-q4','osmanli-kurulus-yukselis','single','ileri','Mısır''ın fethiyle (1517) Osmanlı''ya katılan en önemli kazanım nedir?','E','Mısır''ın fethinin ardından Halifelik Osmanlılara devredilmiştir.','1517 Mısır = halifelik devri. Klasik KPSS sorusu.','["Mısır seferi","halifelik","Yavuz"]',4),
('osmanli-kurulus-yukselis-q5','osmanli-kurulus-yukselis','case','orta','Tımar sistemi hakkında aşağıdakilerden hangisi doğrudur?','C','Tımar; askerlik hizmetine karşılık sipahiye bölgenin vergi gelirinin bırakılması esasına dayanır.','Tımar = arazi değil, vergi geliri devri.','["tımar","sipahi"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('osmanli-kurulus-yukselis-q1','A','II. Murat',1),('osmanli-kurulus-yukselis-q1','B','Fatih Sultan Mehmet',2),('osmanli-kurulus-yukselis-q1','C','Yıldırım Bayezit',3),('osmanli-kurulus-yukselis-q1','D','I. Selim',4),('osmanli-kurulus-yukselis-q1','E','Kanuni Sultan Süleyman',5),
('osmanli-kurulus-yukselis-q2','A','Anadolu''dan asker toplayarak orduyu güçlendirmek.',1),('osmanli-kurulus-yukselis-q2','B','Hristiyan devletlere karşı savaş ilan etmek.',2),('osmanli-kurulus-yukselis-q2','C','Türk köylülerini askere alarak sınırları korumak.',3),('osmanli-kurulus-yukselis-q2','D','Padişaha sadık asker ve yönetici sınıfı oluşturmak.',4),('osmanli-kurulus-yukselis-q2','E','Fethedilen bölgelerde halkı yönetici yapmak.',5),
('osmanli-kurulus-yukselis-q3','A','Rumeli geçişi → Edirne → Kosova → İstanbul''un fethi',1),('osmanli-kurulus-yukselis-q3','B','İstanbul → Kosova → Edirne → Rumeli geçişi',2),('osmanli-kurulus-yukselis-q3','C','Kosova → Edirne → Rumeli → İstanbul',3),('osmanli-kurulus-yukselis-q3','D','Edirne → Kosova → İstanbul → Rumeli geçişi',4),('osmanli-kurulus-yukselis-q3','E','Kosova → Rumeli → İstanbul → Edirne',5),
('osmanli-kurulus-yukselis-q4','A','Akdeniz ticaretinin Osmanlı kontrolüne geçmesi.',1),('osmanli-kurulus-yukselis-q4','B','Afrika''nın fethine zemin hazırlanması.',2),('osmanli-kurulus-yukselis-q4','C','Suriye ve Irak topraklarının bağlanması.',3),('osmanli-kurulus-yukselis-q4','D','Portekiz''in Hint Okyanusu etkinliğinin kırılması.',4),('osmanli-kurulus-yukselis-q4','E','Halifeliğin Osmanlı''ya devredilerek dini liderlik kazanılması.',5),
('osmanli-kurulus-yukselis-q5','A','Sipahiye belirli bir bölgede mülk edinme hakkı tanır.',1),('osmanli-kurulus-yukselis-q5','B','Tımarlı sipahiler merkezi ordunun temel kuvvetiydi.',2),('osmanli-kurulus-yukselis-q5','C','Sipahi, askerlik karşılığında bölge vergi geliriyle geçimini sağlar.',3),('osmanli-kurulus-yukselis-q5','D','Tımar sistemi yalnızca savaş dönemlerinde uygulanırdı.',4),('osmanli-kurulus-yukselis-q5','E','Tımarlı sipahi aynı zamanda bölgesinin yargıcıydı.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- OSMANLI KÜLTÜR VE MEDENİYET
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('osmanli-kultur-medeniyet-q1','osmanli-kultur-medeniyet','single','temel','Osmanlı merkez yönetiminin en yüksek idari ve yargı organı nedir?','A','Divan-ı Hümayun, Osmanlı''nın en yüksek yürütme, yargı ve yasama organıdır.','Divan = yürütme + yargı + yasama. Yalnızca yargı değil.','["Divan-ı Hümayun"]',1),
('osmanli-kultur-medeniyet-q2','osmanli-kultur-medeniyet','single','orta','Osmanlı''da millet sisteminin temel işlevi nedir?','D','Millet sistemi; gayrimüslim toplulukların kendi dini kurumları aracılığıyla iç işlerini yönetmesine olanak tanır.','Millet sistemi = gayrimüslim özerkliği.','["millet sistemi","gayrimüslim"]',2),
('osmanli-kultur-medeniyet-q3','osmanli-kultur-medeniyet','chronology','orta','Osmanlı toprak sisteminde "mirî arazi" kavramı neyi ifade eder?','B','Mirî arazi; devlete ait olan, mülkiyeti hazineye bağlı arazidir.','Mirî = devlet mülkü. Kişiye mülkiyet değil, kullanım hakkı verilir.','["mirî arazi","toprak"]',3),
('osmanli-kultur-medeniyet-q4','osmanli-kultur-medeniyet','single','ileri','Enderun Mektebi''nin Osmanlı devlet yönetimindeki işlevi nedir?','E','Enderun; sarayda devşirme kökenli yetenekli gençlerin eğitildiği ve üst düzey devlet kademelerine hazırlandığı iç okuldur.','Enderun = saray içi devlet okulu.','["Enderun","devşirme","saray"]',4),
('osmanli-kultur-medeniyet-q5','osmanli-kultur-medeniyet','case','orta','Osmanlı vakıf sisteminin toplumsal işlevi bakımından hangisi doğrudur?','C','Vakıflar; eğitim, sağlık, yol gibi kamusal hizmetlerin devlet bütçesinden bağımsız olarak finanse edilmesini sağlar.','Vakıf = devletin sağlayamadığı hizmetleri karşılayan sivil finans mekanizması.','["vakıf","sosyal hizmet"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('osmanli-kultur-medeniyet-q1','A','Divan-ı Hümayun',1),('osmanli-kultur-medeniyet-q1','B','Enderun Mektebi',2),('osmanli-kultur-medeniyet-q1','C','Kazaskerlik',3),('osmanli-kultur-medeniyet-q1','D','Şeyhülislamlık',4),('osmanli-kultur-medeniyet-q1','E','Defterdar',5),
('osmanli-kultur-medeniyet-q2','A','Müslüman topluluklara vergi muafiyeti tanımak.',1),('osmanli-kultur-medeniyet-q2','B','Hristiyan ve Yahudileri asimilasyona tabi tutmak.',2),('osmanli-kultur-medeniyet-q2','C','Tüm dinleri devlet denetimine almak.',3),('osmanli-kultur-medeniyet-q2','D','Gayrimüslimlerin kendi kurumları aracılığıyla iç işlerini yönetmesini sağlamak.',4),('osmanli-kultur-medeniyet-q2','E','Yabancı devletlerle diplomatik ilişki kurmak.',5),
('osmanli-kultur-medeniyet-q3','A','Padişaha ait, satılabilen özel arazi.',1),('osmanli-kultur-medeniyet-q3','B','Mülkiyeti devlete ait, kullanım hakkı halka bırakılan arazi.',2),('osmanli-kultur-medeniyet-q3','C','Dini kurumlara bağışlanmış vakıf arazisi.',3),('osmanli-kultur-medeniyet-q3','D','Tımarlı sipahinin kalıtsal devraldığı arazi.',4),('osmanli-kultur-medeniyet-q3','E','Savaş ganimetiyle kazanılmış asker arazisi.',5),
('osmanli-kultur-medeniyet-q4','A','Ulema sınıfının dini eğitim kurumu.',1),('osmanli-kultur-medeniyet-q4','B','Taşra yöneticilerini yetiştiren askeri okul.',2),('osmanli-kultur-medeniyet-q4','C','Halk için açık temel eğitim kurumu.',3),('osmanli-kultur-medeniyet-q4','D','Yeniçeri subaylarını yetiştiren teknik okul.',4),('osmanli-kultur-medeniyet-q4','E','Devşirme gençlerin üst kademe yöneticiliğe hazırlandığı saray okulu.',5),
('osmanli-kultur-medeniyet-q5','A','Yalnızca dini eğitim hizmetleri sunmuştur.',1),('osmanli-kultur-medeniyet-q5','B','Padişah emriyle kurulur, hazineden finanse edilirdi.',2),('osmanli-kultur-medeniyet-q5','C','Eğitim, sağlık ve altyapı gibi hizmetleri devletten bağımsız finanse etmiştir.',3),('osmanli-kultur-medeniyet-q5','D','Yalnızca Müslümanlara hizmet vermiştir.',4),('osmanli-kultur-medeniyet-q5','E','Askeri masrafları karşılamak için kurulmuş bir fondur.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- OSMANLI YENİLEŞME
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('osmanli-yenilesme-q1','osmanli-yenilesme','single','temel','Tanzimat Fermanı (1839) hangi padişah döneminde ilan edilmiştir?','C','Tanzimat Fermanı, Abdülmecit döneminde Mustafa Reşit Paşa tarafından hazırlanmıştır.','Tanzimat = Abdülmecit + Mustafa Reşit Paşa.','["Tanzimat","Abdülmecit"]',1),
('osmanli-yenilesme-q2','osmanli-yenilesme','single','orta','Islahat Fermanı (1856) Tanzimat''tan hangi önemli farkla ayrılır?','B','Islahat Fermanı, ağırlıklı olarak gayrimüslimlerin haklarını genişletmeye odaklanmıştır.','Islahat = gayrimüslim odak.','["Islahat","gayrimüslim"]',2),
('osmanli-yenilesme-q3','osmanli-yenilesme','chronology','orta','I. Meşrutiyet''in ilanında (1876) belirleyici etken nedir?','A','I. Meşrutiyet''in ilanında Genç Osmanlıların baskısı ve siyasi kriz belirleyici olmuştur.','I. Meşrutiyet 1876, II. Abdülhamit ilan etti ama 1878''de kapattı.','["I. Meşrutiyet","Kanunuesasi"]',3),
('osmanli-yenilesme-q4','osmanli-yenilesme','single','ileri','II. Meşrutiyet''in (1908) ilanı sonucunda ne yaşanmıştır?','E','II. Meşrutiyet''le Kanun-i Esasi yeniden yürürlüğe girmiş, İttihat ve Terakki güçlü bir aktöre dönüşmüştür.','II. Meşrutiyet = 1908 = İttihat ve Terakki''nin yükselişi.','["II. Meşrutiyet","İttihat"]',4),
('osmanli-yenilesme-q5','osmanli-yenilesme','case','orta','Lale Devri''nin (1718-1730) Osmanlı yenileşme tarihindeki önemi nedir?','D','Lale Devri, Batı''yı tanıma ve matbaa gibi teknik unsurları alma yolundaki ilk adımlardır.','Lale Devri = Batılılaşmanın ilk adımı + matbaa + Patrona Halil İsyanı.','["Lale Devri","Batılılaşma","matbaa"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('osmanli-yenilesme-q1','A','II. Mahmut',1),('osmanli-yenilesme-q1','B','III. Selim',2),('osmanli-yenilesme-q1','C','Abdülmecit',3),('osmanli-yenilesme-q1','D','Abdülaziz',4),('osmanli-yenilesme-q1','E','II. Abdülhamit',5),
('osmanli-yenilesme-q2','A','Müslümanlara tanınan hakların sınırlandırılmasıdır.',1),('osmanli-yenilesme-q2','B','Gayrimüslimlerin haklarını daha kapsamlı genişletmesidir.',2),('osmanli-yenilesme-q2','C','İlk kez anayasal düzen getirmesidir.',3),('osmanli-yenilesme-q2','D','Askeri reformları öncelikli hedef belirlemesidir.',4),('osmanli-yenilesme-q2','E','Osmanlı toprak bütünlüğünü güvence altına almasıdır.',5),
('osmanli-yenilesme-q3','A','Genç Osmanlıların baskısı ve siyasi kriz.',1),('osmanli-yenilesme-q3','B','Avrupa devletlerinin askeri müdahalesi.',2),('osmanli-yenilesme-q3','C','Mustafa Reşit Paşa''nın reform programı.',3),('osmanli-yenilesme-q3','D','Gayrimüslim azınlıkların meclis taleplerini dayatması.',4),('osmanli-yenilesme-q3','E','Padişahın Avrupa gezisi sonrası izlenimleri.',5),
('osmanli-yenilesme-q4','A','Abdülhamit meclis kararlarını veto etme yetkisi kazandı.',1),('osmanli-yenilesme-q4','B','Osmanlı anayasası ilk kez yazılı hale getirildi.',2),('osmanli-yenilesme-q4','C','Hilafet makamı lağvedildi.',3),('osmanli-yenilesme-q4','D','Osmanlı taşra yönetimi tamamen yeniden örgütlendi.',4),('osmanli-yenilesme-q4','E','Kanun-i Esasi yeniden yürürlüğe girdi ve meclis etkin hale geldi.',5),
('osmanli-yenilesme-q5','A','Osmanlı''nın Batı''ya ilk kez savaş ilan ettiği dönemdir.',1),('osmanli-yenilesme-q5','B','Toprak kayıplarının en yoğun yaşandığı dönemdir.',2),('osmanli-yenilesme-q5','C','Yalnızca sanat ve mimaride Batı etkisi görülmüştür.',3),('osmanli-yenilesme-q5','D','Batı''dan teknik unsurları alma ve matbaa faaliyetlerinin başladığı ilk dönemdir.',4),('osmanli-yenilesme-q5','E','Fransız İhtilali fikirlerinin ilk tartışıldığı ortam olmuştur.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- MİLLİ MÜCADELE HAZIRLIK
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('milli-mucadele-hazirlik-q1','milli-mucadele-hazirlik','single','temel','Mondros Ateşkesi kaç yılında imzalanmıştır?','A','Mondros Ateşkesi 30 Ekim 1918''de imzalanmıştır.','Mondros = 30 Ekim 1918. Lozan (1923) ile karıştırma.','["Mondros","1918"]',1),
('milli-mucadele-hazirlik-q2','milli-mucadele-hazirlik','single','orta','Amasya Genelgesi''ndeki "Milletin istiklalini yine milletin azim ve kararı kurtaracaktır." ifadesi neyi vurgular?','D','Bu ifade, kurtuluşun yalnızca milletin örgütlü iradesinden gelebileceğini vurgular.','Amasya = milletin kendi kaderini tayin etme hakkı.','["Amasya","ulusal egemenlik"]',2),
('milli-mucadele-hazirlik-q3','milli-mucadele-hazirlik','chronology','orta','Aşağıdakilerden hangisi Erzurum Kongresi''nin kararları arasında yer almaz?','B','Halifeliğin kaldırılması Erzurum''un değil, 1924 Cumhuriyet döneminin kararıdır.','Erzurum = bölgesel + ulusal karar. Kaldırılan kurumlar Cumhuriyet dönemidir.','["Erzurum","kongre"]',3),
('milli-mucadele-hazirlik-q4','milli-mucadele-hazirlik','single','ileri','Sivas Kongresi''nin Erzurum''a göre en önemli farkı nedir?','E','Sivas tüm Türkiye''den delegelerin katılımıyla gerçekleştirilmiş ve gerçek anlamda ulusal nitelik taşıyan ilk kongredir.','Erzurum = doğu bölgesi; Sivas = tüm Türkiye.','["Sivas","ulusal kongre"]',4),
('milli-mucadele-hazirlik-q5','milli-mucadele-hazirlik','case','orta','Misakımilli''nin (1920) içeriği bakımından aşağıdaki ifadelerden hangisi doğrudur?','C','Misakımilli; Türk milletinin ulusal sınırlarını ve kendi kaderini tayin hakkını ilan eden belgedir.','Misakımilli = ulusal sınır belgesi. Son Osmanlı Meclisi''nde kabul edildi.','["Misakımilli","ulusal sınır"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('milli-mucadele-hazirlik-q1','A','1918',1),('milli-mucadele-hazirlik-q1','B','1919',2),('milli-mucadele-hazirlik-q1','C','1920',3),('milli-mucadele-hazirlik-q1','D','1922',4),('milli-mucadele-hazirlik-q1','E','1923',5),
('milli-mucadele-hazirlik-q2','A','İstanbul Hükümeti''nin kurtuluşu yönetmesi gerektiğini.',1),('milli-mucadele-hazirlik-q2','B','Yabancı devletlerin müdahalesi zorunludur.',2),('milli-mucadele-hazirlik-q2','C','Saltanat makamının kurtuluşu sağlayacağını.',3),('milli-mucadele-hazirlik-q2','D','Kurtuluşun yalnızca milletin örgütlü iradesinden gelebileceğini.',4),('milli-mucadele-hazirlik-q2','E','Kilisenin ve cemiyetlerin ortak hareket etmesi gerektiğini.',5),
('milli-mucadele-hazirlik-q3','A','Doğu illerinin işgale karşı silahlı direnişle korunması.',1),('milli-mucadele-hazirlik-q3','B','Halifelik makamının kaldırılması kararı.',2),('milli-mucadele-hazirlik-q3','C','Manda ve himaye tekliflerinin reddedilmesi.',3),('milli-mucadele-hazirlik-q3','D','Temsil Heyeti''nin oluşturulması.',4),('milli-mucadele-hazirlik-q3','E','Ulusal sınırların belirlenip savunulması.',5),
('milli-mucadele-hazirlik-q4','A','Daha uzun süre devam etmiştir.',1),('milli-mucadele-hazirlik-q4','B','Anadolu''nun Batısında toplanmıştır.',2),('milli-mucadele-hazirlik-q4','C','Yalnızca Doğu Anadolu''yu temsil etmiştir.',3),('milli-mucadele-hazirlik-q4','D','İlk kez saltanat karşıtı karar almıştır.',4),('milli-mucadele-hazirlik-q4','E','Tüm Türkiye''den delegelerin katılımıyla gerçek ulusal nitelik kazanmıştır.',5),
('milli-mucadele-hazirlik-q5','A','Osmanlı''nın tüm topraklarında tam egemenlik talebini içerir.',1),('milli-mucadele-hazirlik-q5','B','Yalnızca Doğu Anadolu''nun Türklere bırakılmasını öngörür.',2),('milli-mucadele-hazirlik-q5','C','Türk milletinin kendi kaderini tayin hakkını ve ulusal sınırları ilan eden belgedir.',3),('milli-mucadele-hazirlik-q5','D','Saltanat ve hilafeti destekler nitelikte bildirge niteliği taşır.',4),('milli-mucadele-hazirlik-q5','E','Yabancı devletlerle yapılacak antlaşmaların çerçevesini önceden çizmiştir.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- KURTULUŞ SAVAŞI VE ANTLAŞMALAR
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('kurtulus-savasi-q1','kurtulus-savasi','single','temel','Lozan Barış Antlaşması kaç yılında imzalanmıştır?','D','Lozan Barış Antlaşması 24 Temmuz 1923''te imzalanmıştır.','Lozan = 24 Temmuz 1923. Mudanya (1922) ateşkes, Lozan barış.','["Lozan","1923"]',1),
('kurtulus-savasi-q2','kurtulus-savasi','single','orta','Sakarya Meydan Muharebesi''nin (1921) önemi nedir?','A','Sakarya, Yunan kuvvetlerinin Ankara''ya ilerleyişini durduran ve savaşın seyrini değiştiren savunma savaşıdır.','Sakarya = savunma + Yunan durduruldu + Mareşal rütbesi.','["Sakarya","1921"]',2),
('kurtulus-savasi-q3','kurtulus-savasi','chronology','orta','Cephe olaylarının doğru kronolojik sırası hangisidir?','E','I. İnönü → II. İnönü → Sakarya → Büyük Taarruz → Mudanya → Lozan.','Cephe sırası kesin ezber: I. İnönü → II. İnönü → Sakarya → Büyük Taarruz.','["İnönü","kronoloji"]',3),
('kurtulus-savasi-q4','kurtulus-savasi','single','ileri','Mudanya Ateşkes Antlaşması''nın önemi nedir?','B','Mudanya (11 Ekim 1922), Büyük Taarruz sonrasında imzalanmış; İstanbul ve Doğu Trakya TBMM''ye bırakılmıştır.','Mudanya = askeri zafer diplomatik zemine taşındı.','["Mudanya","ateşkes"]',4),
('kurtulus-savasi-q5','kurtulus-savasi','case','orta','Lozan Barış Antlaşması hakkında aşağıdakilerden hangisi yanlıştır?','C','Antlaşma öncesinde Rumların tamamı Türkiye''yi terk etmemişti; nüfus mübadelesi Lozan''la belirlendi, 1923''te uygulandı.','Lozan''da neler düzenlendi kadar neler dışarıda kaldığını da bil.','["Lozan","nüfus mübadelesi"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('kurtulus-savasi-q1','A','1920',1),('kurtulus-savasi-q1','B','1921',2),('kurtulus-savasi-q1','C','1922',3),('kurtulus-savasi-q1','D','1923',4),('kurtulus-savasi-q1','E','1924',5),
('kurtulus-savasi-q2','A','Yunan kuvvetlerinin Ankara''ya ilerleyişini durdurmuştur.',1),('kurtulus-savasi-q2','B','Doğu cephesinde Ermenilere karşı kazanılmıştır.',2),('kurtulus-savasi-q2','C','İngilizlerle doğrudan çatışılmıştır.',3),('kurtulus-savasi-q2','D','Lozan''ın hemen ardından son kara savaşıdır.',4),('kurtulus-savasi-q2','E','Fransız kuvvetlerine karşı güney cephesinde kazanılmıştır.',5),
('kurtulus-savasi-q3','A','Büyük Taarruz → I. İnönü → Sakarya → Mudanya → Lozan',1),('kurtulus-savasi-q3','B','Sakarya → I. İnönü → II. İnönü → Büyük Taarruz → Lozan',2),('kurtulus-savasi-q3','C','I. İnönü → Sakarya → II. İnönü → Büyük Taarruz → Lozan',3),('kurtulus-savasi-q3','D','Lozan → Mudanya → Büyük Taarruz → Sakarya → I. İnönü',4),('kurtulus-savasi-q3','E','I. İnönü → II. İnönü → Sakarya → Büyük Taarruz → Mudanya → Lozan',5),
('kurtulus-savasi-q4','A','Yunan kuvvetleri savaşı Mudanya''da ilan etti.',1),('kurtulus-savasi-q4','B','İstanbul ve Doğu Trakya TBMM''ye bırakıldı.',2),('kurtulus-savasi-q4','C','Kapitülasyonlar bu antlaşmayla kaldırıldı.',3),('kurtulus-savasi-q4','D','Saltanat ateşkesle birlikte kaldırıldı.',4),('kurtulus-savasi-q4','E','Yalnızca Yunanistan ile imzalandı.',5),
('kurtulus-savasi-q5','A','Kapitülasyonlar antlaşmayla tamamen kaldırıldı.',1),('kurtulus-savasi-q5','B','Azınlıkların hakları ve nüfus mübadelesi düzenlendi.',2),('kurtulus-savasi-q5','C','Antlaşma imzalanmadan önce tüm Rumlar Türkiye''yi terk etmişti.',3),('kurtulus-savasi-q5','D','Türkiye''nin uluslararası bağımsızlığı tescil edildi.',4),('kurtulus-savasi-q5','E','Boğazlar meselesi geçici düzenlemeyle çözüme kavuştu.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- ATATÜRK İLKE VE İNKILAPLARI
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('ataturk-ilke-inkilap-q1','ataturk-ilke-inkilap','single','temel','Halifeliğin kaldırıldığı yıl hangisidir?','B','Halifelik 3 Mart 1924''te kaldırılmıştır. Saltanat ise 1 Kasım 1922''de kaldırılmıştır.','Saltanat = 1922; Halifelik = 1924. İki yıl fark var.','["halifelik","1924"]',1),
('ataturk-ilke-inkilap-q2','ataturk-ilke-inkilap','single','orta','Tevhid-i Tedrisat Kanunu''nun (1924) temel amacı nedir?','D','Tevhid-i Tedrisat; tüm eğitim kurumlarını Millî Eğitim Bakanlığı çatısında toplayarak laik eğitim sistemi oluşturmaktır.','Tevhid-i Tedrisat = eğitim birliği = laik okul sistemi.','["Tevhid-i Tedrisat","eğitim"]',2),
('ataturk-ilke-inkilap-q3','ataturk-ilke-inkilap','chronology','orta','Aşağıdakilerden hangisi laiklik ilkesiyle doğrudan ilişkilendirilemez?','A','Soyadı Kanunu (1934) laiklikle değil, batılı kimlik düzeniyle ilişkilendirilir.','Laiklik: halifelik kaldırma, tekkeler kapatma, medeni kanun. Soyadı = modernleşme, laiklik değil.','["laiklik","inkılaplar"]',3),
('ataturk-ilke-inkilap-q4','ataturk-ilke-inkilap','single','ileri','1934''te kadınlara verilen seçme-seçilme hakkı hangi ilkeyle en doğrudan ilişkilidir?','E','Bu hak Halkçılık ve Cumhuriyetçilik ilkelerinin toplumsal boyutunu yansıtır.','Kadın hakları = halkçılık + cumhuriyetçilik.','["kadın hakları","halkçılık"]',4),
('ataturk-ilke-inkilap-q5','ataturk-ilke-inkilap','case','orta','Devletçilik ilkesi hangi amaçla benimsendi?','C','Devletçilik; özel sermayenin yetersiz kaldığı sanayileşme sürecinde devletin ekonomiye doğrudan katılması esasına dayanan karma ekonomi modelidir.','Devletçilik = karma ekonomi. Ne tam liberalizm ne komünizm.','["devletçilik","karma ekonomi"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('ataturk-ilke-inkilap-q1','A','1922',1),('ataturk-ilke-inkilap-q1','B','1924',2),('ataturk-ilke-inkilap-q1','C','1925',3),('ataturk-ilke-inkilap-q1','D','1928',4),('ataturk-ilke-inkilap-q1','E','1934',5),
('ataturk-ilke-inkilap-q2','A','Yabancı dil eğitimini zorunlu kılmak.',1),('ataturk-ilke-inkilap-q2','B','Dini eğitimi devlet kontrolüne almak.',2),('ataturk-ilke-inkilap-q2','C','Eğitim dilini Arapçadan Türkçeye çevirmek.',3),('ataturk-ilke-inkilap-q2','D','Tüm okulları tek bakanlık çatısında toplayarak eğitimde birlik sağlamak.',4),('ataturk-ilke-inkilap-q2','E','Sadece kız çocuklarının eğitime erişimini sağlamak.',5),
('ataturk-ilke-inkilap-q3','A','Soyadı Kanunu''nun kabulü.',1),('ataturk-ilke-inkilap-q3','B','Halifeliğin kaldırılması.',2),('ataturk-ilke-inkilap-q3','C','Tekke ve zaviyelerin kapatılması.',3),('ataturk-ilke-inkilap-q3','D','Medeni Kanun''un kabulü.',4),('ataturk-ilke-inkilap-q3','E','Şer''iye mahkemelerinin kaldırılması.',5),
('ataturk-ilke-inkilap-q4','A','Devletçilik',1),('ataturk-ilke-inkilap-q4','B','İnkılapçılık',2),('ataturk-ilke-inkilap-q4','C','Milliyetçilik',3),('ataturk-ilke-inkilap-q4','D','Laiklik',4),('ataturk-ilke-inkilap-q4','E','Halkçılık ve Cumhuriyetçilik',5),
('ataturk-ilke-inkilap-q5','A','Özel teşebbüsü tamamen yasaklamak.',1),('ataturk-ilke-inkilap-q5','B','Tarım sektörünü millileştirmek.',2),('ataturk-ilke-inkilap-q5','C','Özel sermayenin yetersiz kaldığı alanlarda devletin sanayiyi kurması.',3),('ataturk-ilke-inkilap-q5','D','Komünist ekonomi modeline geçiş zemini oluşturmak.',4),('ataturk-ilke-inkilap-q5','E','Yabancı sermayeyi tamamen dışlamak.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- CUMHURİYET DIŞ POLİTİKA
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('cumhuriyet-dis-politika-q1','cumhuriyet-dis-politika','single','temel','Montrö Boğazlar Sözleşmesi kaç yılında imzalanmıştır?','C','Montrö 1936''da imzalanmış ve Türkiye''ye Boğazlar üzerinde egemenliği yeniden kazandırmıştır.','1923 Lozan (geçici) → 1936 Montrö (kalıcı).','["Montrö","Boğazlar","1936"]',1),
('cumhuriyet-dis-politika-q2','cumhuriyet-dis-politika','single','orta','Balkan Antantı''nın (1934) temel amacı nedir?','A','Türkiye, Yunanistan, Romanya ve Yugoslavya''nın bölgesel statükoyu korumak ve revizyonist devletlere karşı güvenlik sağlamak için oluşturduğu ittifak.','Balkan Antantı = statüko koruma + Bulgaristan/İtalya''ya karşı denge.','["Balkan Antantı","1934"]',2),
('cumhuriyet-dis-politika-q3','cumhuriyet-dis-politika','chronology','orta','Hatay''ın Türkiye''ye katılması hangi yılda gerçekleşmiştir?','E','Hatay 1939''da halkoyuyla Türkiye''ye bağlanmıştır.','Hatay = 1939. Musul (1926) ve Montrö (1936) ile karıştırma.','["Hatay","1939"]',3),
('cumhuriyet-dis-politika-q4','cumhuriyet-dis-politika','single','ileri','Türkiye''nin II. Dünya Savaşı''ndaki temel dış politika tutumu nedir?','B','Türkiye aktif taraf tutmaktan kaçınmış, tarafsız politikayı benimsemiştir.','WWII = Türkiye tarafsız. 1945''te sembolik olarak Almanya''ya savaş ilan etti.','["II. Dünya Savaşı","tarafsızlık"]',4),
('cumhuriyet-dis-politika-q5','cumhuriyet-dis-politika','case','orta','Sadabat Paktı''nın (1937) önemi bakımından hangisi doğrudur?','D','Türkiye, İran, Irak ve Afganistan arasında imzalanmış; Orta Doğu''da barışçı sınırlar temelinde bölgesel güvenliği pekiştirmiştir.','Sadabat = Doğu paktı; Balkan = Batı paktı.','["Sadabat Paktı","1937"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('cumhuriyet-dis-politika-q1','A','1923',1),('cumhuriyet-dis-politika-q1','B','1934',2),('cumhuriyet-dis-politika-q1','C','1936',3),('cumhuriyet-dis-politika-q1','D','1939',4),('cumhuriyet-dis-politika-q1','E','1945',5),
('cumhuriyet-dis-politika-q2','A','Bölgesel statükoyu korumak ve revizyonist devletlere karşı güvenlik sağlamak.',1),('cumhuriyet-dis-politika-q2','B','Türkiye''nin Balkanlarda toprak genişlemesi.',2),('cumhuriyet-dis-politika-q2','C','İtalya''yı ittifaka dahil etmek.',3),('cumhuriyet-dis-politika-q2','D','Boğazların ortak yönetimine zemin hazırlamak.',4),('cumhuriyet-dis-politika-q2','E','Sovyet tehdidine karşı askeri ittifak.',5),
('cumhuriyet-dis-politika-q3','A','1923',1),('cumhuriyet-dis-politika-q3','B','1926',2),('cumhuriyet-dis-politika-q3','C','1934',3),('cumhuriyet-dis-politika-q3','D','1936',4),('cumhuriyet-dis-politika-q3','E','1939',5),
('cumhuriyet-dis-politika-q4','A','Almanya ile askeri ittifak kurdu.',1),('cumhuriyet-dis-politika-q4','B','Tarafsız kaldı, her iki blokla ilişkilerini sürdürdü.',2),('cumhuriyet-dis-politika-q4','C','İngiltere ve Fransa''nın yanında aktif savaştı.',3),('cumhuriyet-dis-politika-q4','D','Sovyet Rusya ile birlikte hareket etti.',4),('cumhuriyet-dis-politika-q4','E','Hiçbir devletle ilişki kurmadı.',5),
('cumhuriyet-dis-politika-q5','A','NATO''ya katılımın ön adımıdır.',1),('cumhuriyet-dis-politika-q5','B','Arap devletleriyle ilk kapsamlı ittifaktır.',2),('cumhuriyet-dis-politika-q5','C','Yalnızca Türkiye-İran ilişkilerini düzenler.',3),('cumhuriyet-dis-politika-q5','D','Türkiye, İran, Irak ve Afganistan arasında bölgesel güvenliği pekiştirmiştir.',4),('cumhuriyet-dis-politika-q5','E','İngiltere''nin bölgesel nüfuzunu pekiştirmiştir.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- ÇAĞDAŞ TÜRK VE DÜNYA TARİHİ
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('cagdas-turk-dunya-q1','cagdas-turk-dunya','single','temel','Türkiye NATO''ya hangi yıl katılmıştır?','B','Türkiye 1952''de NATO''ya üye olmuştur.','NATO üyeliği = 1952. BM = 1945.','["NATO","1952"]',1),
('cagdas-turk-dunya-q2','cagdas-turk-dunya','single','orta','Türkiye''nin Soğuk Savaş''ta Batı bloğunda yer almasının temel nedeni nedir?','D','Sovyetlerin Boğazlar ve Doğu Anadolu''ya yönelik talepleri, Batı bloğuna yakınlaşmayı zorunlu kıldı.','Türkiye''nin NATO''ya katılımı = Sovyet tehdidi + Truman Doktrini bağlamı.','["Soğuk Savaş","Batı bloğu"]',2),
('cagdas-turk-dunya-q3','cagdas-turk-dunya','chronology','orta','1974 Kıbrıs Barış Harekâtı''nın başlatılmasının doğrudan nedeni nedir?','A','Yunanistan''ın Kıbrıs''ta Makarios''a karşı gerçekleştirdiği cunta darbesi ve adanın Yunanistan''a bağlanma tehlikesi.','1974 = Yunan darbesi → Türk harekâtı.','["Kıbrıs","1974"]',3),
('cagdas-turk-dunya-q4','cagdas-turk-dunya','single','ileri','BM''nin kuruluş amacı bakımından hangisi doğrudur?','E','BM, II. Dünya Savaşı''nın ardından 1945''te uluslararası barış ve güvenliği korumak amacıyla kurulmuştur.','BM = 1945. Milletler Cemiyeti (başarısız) ile karıştırma.','["BM","1945"]',4),
('cagdas-turk-dunya-q5','cagdas-turk-dunya','case','orta','Soğuk Savaş''ın sona ermesinin (1991) Türkiye dış politikasına etkisi bakımından hangisi doğrudur?','C','Soğuk Savaş sonu Türkiye için Orta Asya Türk devletleri ve Balkanlarla yeni ilişkiler kurma fırsatı doğurdu.','Soğuk Savaş sonu = Orta Asya ve Balkan açılımı.','["Soğuk Savaş","1991"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('cagdas-turk-dunya-q1','A','1945',1),('cagdas-turk-dunya-q1','B','1952',2),('cagdas-turk-dunya-q1','C','1955',3),('cagdas-turk-dunya-q1','D','1963',4),('cagdas-turk-dunya-q1','E','1974',5),
('cagdas-turk-dunya-q2','A','Ekonomik kalkınma kredisi sağlamak.',1),('cagdas-turk-dunya-q2','B','Arap devletleriyle ittifak kurmak.',2),('cagdas-turk-dunya-q2','C','Sömürgeci devletlere karşı destek almak.',3),('cagdas-turk-dunya-q2','D','Sovyet tehdidine karşı güvenlik garantisi sağlamak.',4),('cagdas-turk-dunya-q2','E','Orta Doğu''da Batı çıkarlarını korumak.',5),
('cagdas-turk-dunya-q3','A','Yunanistan''ın Kıbrıs''ta gerçekleştirdiği cunta darbesi.',1),('cagdas-turk-dunya-q3','B','Kıbrıslı Türklerin bağımsızlık ilanı.',2),('cagdas-turk-dunya-q3','C','Sovyetlerin adaya müdahale tehdidi.',3),('cagdas-turk-dunya-q3','D','İngiltere''nin adadan çekilme kararı.',4),('cagdas-turk-dunya-q3','E','BM''nin Türkiye''den harekât yapmasını talep etmesi.',5),
('cagdas-turk-dunya-q4','A','Sömürgeci devletlerin çıkarlarını korumak.',1),('cagdas-turk-dunya-q4','B','Yalnızca Avrupa devletlerini üye kabul eder.',2),('cagdas-turk-dunya-q4','C','I. Dünya Savaşı''nın ardından kurulmuştur.',3),('cagdas-turk-dunya-q4','D','Ekonomik kalkınmayı teşvik eden ticaret örgütüdür.',4),('cagdas-turk-dunya-q4','E','II. Dünya Savaşı''nın ardından uluslararası barış ve güvenlik için kurulmuştur.',5),
('cagdas-turk-dunya-q5','A','NATO''dan çıkmış ve bağımsız politika izlemiştir.',1),('cagdas-turk-dunya-q5','B','Sovyetlerle askeri ittifak kurma gündeme geldi.',2),('cagdas-turk-dunya-q5','C','Orta Asya Türk devletleri ve Balkanlarla yeni ilişkiler kuruldu.',3),('cagdas-turk-dunya-q5','D','Türkiye''nin stratejik önemi tamamen azaldı.',4),('cagdas-turk-dunya-q5','E','AB üyeliği otomatik gerçekleşti.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- GENEL KRONOLOJİ
INSERT INTO public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) VALUES
('genel-kronoloji-q1','genel-kronoloji','chronology','orta','Aşağıdaki olayların kronolojik sıralaması hangisinde doğru verilmiştir?','A','Malazgirt (1071) → İstanbul''un fethi (1453) → Tanzimat (1839) → Lozan (1923) → NATO (1952).','Dönemler arası kronolojide yüzyıl filtresi kur, sonra tarih sırala.','["kronoloji","genel"]',1),
('genel-kronoloji-q2','genel-kronoloji','case','orta','Aşağıdaki eşleştirmelerden hangisi yanlıştır?','D','Divan-ı Lügat-it Türk Kaşgarlı Mahmut tarafından yazılmıştır, Yusuf Has Hacip''e değil.','Kaşgarlı Mahmut = Divan-ı Lügat-it Türk; Yusuf Has Hacip = Kutadgu Bilig. Klasik KPSS tuzağı.','["Kaşgarlı Mahmut","eser eşleştirme"]',2),
('genel-kronoloji-q3','genel-kronoloji','single','orta','Aşağıdakilerden hangisinde "olay-sonuç" ilişkisi yanlış verilmiştir?','B','Kapitülasyonların kaldırılması Lozan''ın sonucudur, I. Dünya Savaşı''nın değil.','Olay-sonuç sorularında "hangi antlaşmayla" sorusunu kendinize sorun.','["neden-sonuç","antlaşma"]',3),
('genel-kronoloji-q4','genel-kronoloji','single','ileri','KPSS Tarih sorularında en sık karıştırılan kavram çifti hangisidir?','E','Saltanat (1922) - Halifelik (1924) tarihlerinin karıştırılması sınavda en sık hata yapılan alandır.','Saltanat = 1922, Halifelik = 1924. Birbirinden tam iki yıl farklı.','["saltanat","halifelik","sık hata"]',4),
('genel-kronoloji-q5','genel-kronoloji','case','ileri','Aşağıdaki antlaşma-konu eşleştirmelerinden hangisi doğrudur?','C','Lozan, Yeni Türkiye''nin uluslararası bağımsızlığını tescil eden antlaşmadır.','Mondros-Sevr-Lozan üçlüsünü tarihleri ve içerikleriyle karşılaştırmalı öğren.','["Mondros","Sevr","Lozan"]',5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_question_choices (question_id, choice_id, text, sort_order) VALUES
('genel-kronoloji-q1','A','Malazgirt → İstanbul''un fethi → Tanzimat → Lozan → NATO',1),('genel-kronoloji-q1','B','İstanbul''un fethi → Malazgirt → Tanzimat → NATO → Lozan',2),('genel-kronoloji-q1','C','Tanzimat → Malazgirt → Lozan → NATO → İstanbul''un fethi',3),('genel-kronoloji-q1','D','Lozan → İstanbul''un fethi → Malazgirt → Tanzimat → NATO',4),('genel-kronoloji-q1','E','NATO → Lozan → Tanzimat → İstanbul''un fethi → Malazgirt',5),
('genel-kronoloji-q2','A','Orhun Yazıtları – Bilge Kağan döneminde dikilmiştir.',1),('genel-kronoloji-q2','B','Kutadgu Bilig – Yusuf Has Hacip yazmıştır.',2),('genel-kronoloji-q2','C','Nizamiye Medresesi – Nizamülmülk kurmuştur.',3),('genel-kronoloji-q2','D','Divan-ı Lügat-it Türk – Yusuf Has Hacip yazmıştır.',4),('genel-kronoloji-q2','E','Kanunuesasi – 1876''da ilan edilmiştir.',5),
('genel-kronoloji-q3','A','Malazgirt Savaşı – Anadolu''nun Türklere açılması.',1),('genel-kronoloji-q3','B','I. Dünya Savaşı – Kapitülasyonların kaldırılması.',2),('genel-kronoloji-q3','C','Sivas Kongresi – Ulusal direniş örgütlenmesinin güçlenmesi.',3),('genel-kronoloji-q3','D','Mondros Ateşkesi – Osmanlı''nın I. Dünya Savaşı''ndan çekilmesi.',4),('genel-kronoloji-q3','E','Kösedağ Savaşı – Selçuklu''nun Moğol egemenliğine girmesi.',5),
('genel-kronoloji-q4','A','Tanzimat – Islahat Fermanı karıştırılması.',1),('genel-kronoloji-q4','B','Erzurum – Sivas Kongresi karıştırılması.',2),('genel-kronoloji-q4','C','Mondros – Lozan karıştırılması.',3),('genel-kronoloji-q4','D','Balkan Antantı – Sadabat Paktı karıştırılması.',4),('genel-kronoloji-q4','E','Saltanat (1922) – Halifelik (1924) kaldırılma tarihleri karıştırılması.',5),
('genel-kronoloji-q5','A','Lozan – Osmanlı''nın I. Dünya Savaşı''ndan çekilmesidir.',1),('genel-kronoloji-q5','B','Mondros – Türkiye''nin bağımsızlığını tescil eder.',2),('genel-kronoloji-q5','C','Lozan – Yeni Türkiye''nin uluslararası tanınmasını sağladı.',3),('genel-kronoloji-q5','D','Sevr – TBMM hükümeti tarafından kabul edildi.',4),('genel-kronoloji-q5','E','Mudanya – Türkiye''nin nihai barış antlaşmasıdır.',5)
ON CONFLICT (question_id, choice_id) DO NOTHING;

-- ─── 4. 40 DENEME ────────────────────────────────────────────
INSERT INTO public.content_exams (id, title, description, duration_minutes, question_count, difficulty, sort_order) VALUES
('deneme-1','KPSS Tarih Karma Deneme 1','Tüm dönemlerden dengeli seçilmiş 40 soruluk genel tekrar.',50,40,'karma',1),
('deneme-2','KPSS Tarih Karma Deneme 2','İslamiyet öncesi ve Türk-İslam ağırlıklı deneme.',50,40,'karma',2),
('deneme-3','KPSS Tarih Karma Deneme 3','Osmanlı kuruluş ve yükseliş odaklı deneme.',50,40,'karma',3),
('deneme-4','KPSS Tarih Karma Deneme 4','Osmanlı yenileşme ve demokratikleşme odaklı.',50,40,'karma',4),
('deneme-5','KPSS Tarih Karma Deneme 5','Milli Mücadele ve Kurtuluş Savaşı odaklı.',50,40,'karma',5),
('deneme-6','KPSS Tarih Karma Deneme 6','Atatürk ilke ve inkılapları odaklı.',50,40,'karma',6),
('deneme-7','KPSS Tarih Karma Deneme 7','Cumhuriyet dönemi ve çağdaş tarih odaklı.',50,40,'karma',7),
('deneme-8','KPSS Tarih Kolay Deneme 1','Temel bilgi ve doğrudan kavram soruları.',45,40,'kolay',8),
('deneme-9','KPSS Tarih Kolay Deneme 2','Kronolojik sıralama ve eşleştirme ağırlıklı.',45,40,'kolay',9),
('deneme-10','KPSS Tarih Kolay Deneme 3','Temel kavram tanımları odaklı.',45,40,'kolay',10),
('deneme-11','KPSS Tarih Orta Deneme 1','Neden-sonuç ve dönem karşılaştırması.',50,40,'orta',11),
('deneme-12','KPSS Tarih Orta Deneme 2','Kurum ve kişi eşleştirmesi ağırlıklı.',50,40,'orta',12),
('deneme-13','KPSS Tarih Orta Deneme 3','Tarihsel gelişme akışı odaklı.',50,40,'orta',13),
('deneme-14','KPSS Tarih Zor Deneme 1','Çeldirici şıklar ve yoruma dayalı sorular.',55,40,'zor',14),
('deneme-15','KPSS Tarih Zor Deneme 2','Karşılaştırma ve analiz becerisi gerektiren.',55,40,'zor',15),
('deneme-16','KPSS Tarih Zor Deneme 3','Dönemler arası bağlantı ve sık hata analizi.',55,40,'zor',16),
('deneme-17','İslamiyet Öncesi Odaklı Deneme','İslamiyet öncesi konu ve kavramlarına odaklı.',50,40,'karma',17),
('deneme-18','Türk-İslam Dönemi Odaklı Deneme','Karahanlı, Gazneli ve Büyük Selçuklu dönemi.',50,40,'karma',18),
('deneme-19','Anadolu Selçuklu Odaklı Deneme','Anadolu Selçuklu ve beylikler dönemi.',50,40,'karma',19),
('deneme-20','Osmanlı Kuruluş Odaklı Deneme','Osmanlı kuruluş ve yükseliş dönemi.',50,40,'karma',20),
('deneme-21','Osmanlı Kültür Odaklı Deneme','Osmanlı kurumları ve toplum yapısı.',50,40,'karma',21),
('deneme-22','Osmanlı Yenileşme Odaklı Deneme','Tanzimat''tan Meşrutiyet''e yenileşme süreci.',50,40,'karma',22),
('deneme-23','Milli Mücadele Hazırlık Odaklı','Mondros''tan TBMM''ye milli örgütlenme.',50,40,'karma',23),
('deneme-24','Kurtuluş Savaşı Odaklı Deneme','Cepheler, diplomasi ve antlaşmalar.',50,40,'karma',24),
('deneme-25','Atatürk İnkılapları Odaklı Deneme','Cumhuriyet inkılapları ve ilkeler.',50,40,'karma',25),
('deneme-26','Cumhuriyet Dış Politika Odaklı','Lozan sonrası dış politika ve antlaşmalar.',50,40,'karma',26),
('deneme-27','Çağdaş Tarih Odaklı Deneme','Soğuk Savaş, NATO ve yakın dönem.',50,40,'karma',27),
('deneme-28','Hızlı Tekrar Denemesi 1','Yoğun tempo için hızlı tekrar.',40,40,'karma',28),
('deneme-29','Hızlı Tekrar Denemesi 2','Kısa sürede geniş konu taraması.',40,40,'karma',29),
('deneme-30','Hızlı Tekrar Denemesi 3','Farklı zorlukları harmanlayan hızlı tekrar.',40,40,'karma',30),
('deneme-31','Simülasyon Denemesi 1','Gerçek KPSS koşullarını simüle eden deneme.',50,40,'karma',31),
('deneme-32','Simülasyon Denemesi 2','Gerçek sınav ortamını yansıtan 2. simülasyon.',50,40,'karma',32),
('deneme-33','Simülasyon Denemesi 3','Gerçek sınav ortamını yansıtan 3. simülasyon.',50,40,'karma',33),
('deneme-34','Kronoloji Ustası Denemesi 1','Kronolojik sıralama ağırlıklı özel deneme.',50,40,'orta',34),
('deneme-35','Kronoloji Ustası Denemesi 2','Dönemler arası kronoloji odaklı.',50,40,'zor',35),
('deneme-36','Kavram Analizi Denemesi 1','Tarihi kavramların doğru tanımını ölçen.',50,40,'orta',36),
('deneme-37','Kavram Analizi Denemesi 2','İleri düzey kavram analizi.',55,40,'zor',37),
('deneme-38','Sınav Öncesi Son Tekrar 1','En kritik konuları kapsayan son tekrar.',50,40,'karma',38),
('deneme-39','Sınav Öncesi Son Tekrar 2','En sık sorulan konu ve kavramlar.',50,40,'karma',39),
('deneme-40','KPSS Tarih Final Denemesi','Tüm kazanımları final düzeyinde ölçen kapsamlı deneme.',55,40,'karma',40)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, updated_at = now();

-- ─── 5. DENEME-SORU BAĞLANTILARI ────────────────────────────
-- Tüm denemeler mevcut 60 soruyu döngüsel paylaşır
DO $$
DECLARE
  exam_rec RECORD;
  q_ids text[];
  q_count int;
  i int;
  idx int;
BEGIN
  SELECT ARRAY(SELECT id FROM public.content_questions WHERE is_published = true ORDER BY topic_id, sort_order) INTO q_ids;
  q_count := array_length(q_ids, 1);

  IF q_count IS NULL OR q_count = 0 THEN
    RAISE NOTICE 'Soru bulunamadı, bağlantı oluşturulamadı.';
    RETURN;
  END IF;

  FOR exam_rec IN SELECT id, sort_order FROM public.content_exams WHERE is_published = true ORDER BY sort_order LOOP
    FOR i IN 1..40 LOOP
      idx := ((exam_rec.sort_order * 3 + i - 1) % q_count) + 1;
      INSERT INTO public.content_exam_questions (exam_id, question_id, sort_order)
      VALUES (exam_rec.id, q_ids[idx], i)
      ON CONFLICT (exam_id, question_id) DO NOTHING;
    END LOOP;
  END LOOP;

  RAISE NOTICE 'Deneme-soru bağlantıları oluşturuldu.';
END $$;
