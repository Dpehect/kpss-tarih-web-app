-- ============================================================
-- KPSS Tarih: Exams tablosu + 60 gerçek soru + 40 deneme seed
-- Supabase SQL Editor'de çalıştır
-- ============================================================

-- 1. Exams tablosu
create table if not exists public.content_exams (
  id text primary key,
  title text not null,
  description text not null default '',
  duration_minutes integer not null default 50,
  question_count integer not null default 40,
  difficulty text not null default 'karma' check (difficulty in ('kolay', 'orta', 'zor', 'karma')),
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.content_exam_questions (
  id uuid primary key default gen_random_uuid(),
  exam_id text not null references public.content_exams(id) on delete cascade,
  question_id text not null references public.content_questions(id) on delete cascade,
  sort_order integer not null default 0,
  unique(exam_id, question_id)
);

alter table public.content_exams enable row level security;
alter table public.content_exam_questions enable row level security;

drop policy if exists "Public read published exams" on public.content_exams;
create policy "Public read published exams"
on public.content_exams for select
using (is_published = true);

drop policy if exists "Public read exam questions" on public.content_exam_questions;
create policy "Public read exam questions"
on public.content_exam_questions for select
using (
  exists (
    select 1 from public.content_exams e
    where e.id = exam_id and e.is_published = true
  )
);

create index if not exists idx_content_exams_sort
  on public.content_exams(sort_order) where is_published = true;

create index if not exists idx_content_exam_questions_exam
  on public.content_exam_questions(exam_id, sort_order);

-- ============================================================
-- 2. Gerçek KPSS Soruları - topic başına 5 soru (60 toplam)
-- ============================================================

-- İSLAMİYET ÖNCESİ TÜRK TARİHİ (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('islamiyet-oncesi-q1', 'islamiyet-oncesi', 'single', 'temel',
 'Türklerde "kut" anlayışına göre aşağıdakilerden hangisi doğrudur?',
 'B', 'Kut, Tanrı tarafından hükümdara bağışlanan iktidar gücüdür. Kalıtsal değil, Tanrı''nın lütfuna bağlı olduğu için herhangi bir an geri alınabilir.', 'Kut kavramını "kalıtsal" ile ilişkilendiren şıkları eleyerek başla.', '["kut", "Türk siyasi düşüncesi", "iktidar meşruiyeti"]', 1),
('islamiyet-oncesi-q2', 'islamiyet-oncesi', 'chronology', 'orta',
 'Orhun Yazıtları''nın tarihsel önemi bakımından aşağıdaki ifadelerden hangisi yanlıştır?',
 'D', 'Orhun Yazıtları Türklerin bilinen en eski yazılı edebi metinleridir ve Göktürk alfabesiyle yazılmıştır. Çince ile değil, Türkçe ile yazılmış olmaları onları özgün kılar.', 'Yanlışı soruyorsa tüm şıkları tek tek doğrula; genellikle "en eski" veya "çince/Türkçe" gibi ayrımlar tuzaktır.', '["Orhun Yazıtları", "Göktürk", "yazı dili"]', 2),
('islamiyet-oncesi-q3', 'islamiyet-oncesi', 'single', 'orta',
 'İslamiyet öncesi Türk devletlerinde "ikili teşkilat" anlayışının doğurduğu temel sorun aşağıdakilerden hangisidir?',
 'A', 'İkili teşkilatta ülke doğu-batı olarak iki hanedan üyesi arasında paylaşılırdı. Bu durum sürekli taht kavgalarına ve devletin parçalanmasına zemin hazırlamıştır.', 'İkili teşkilatın hem avantajını (yönetim kolaylığı) hem dezavantajını (bölünme) not et.', '["ikili teşkilat", "taht kavgası", "devlet yönetimi"]', 3),
('islamiyet-oncesi-q4', 'islamiyet-oncesi', 'single', 'ileri',
 'Kurultay''ın işlevi düşünüldüğünde, Türklerde aşağıdakilerden hangisi söylenebilir?',
 'E', 'Kurultay; boyların katıldığı ve önemli devlet meselelerinin görüşüldüğü meclisdir. Bu yapı, mutlak monarşi yerine sınırlı bir katılım geleneğinin varlığına işaret eder.', 'Kurultay''ın kimlerden oluştuğunu ve hangi kararları aldığını somut örneklerle hatırla.', '["kurultay", "Türk yönetim anlayışı", "siyasi katılım"]', 4),
('islamiyet-oncesi-q5', 'islamiyet-oncesi', 'case', 'orta',
 'Aşağıdaki eşleştirmelerden hangisi doğrudur?',
 'C', 'I. Kök Türk Devleti 552''de Bumin Kağan tarafından kurulmuştur. Orhun Yazıtları ise Bilge Kağan ve Kül Tigin adına 8. yüzyılda dikilmiştir.', 'Tarih-kurucu-olay üçlüsünü birlikte ezberle; sınav çeldirici olarak karıştırıyor.', '["Kök Türk", "Bumin Kağan", "Bilge Kağan", "kronoloji"]', 5);

-- Şıklar: islamiyet-oncesi-q1
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('islamiyet-oncesi-q1', 'A', 'Kutun hükümdara halkın seçimiyle verildiğini ifade eder.', 1),
('islamiyet-oncesi-q1', 'B', 'Kutun Tanrı tarafından bağışlandığını ve geri alınabileceğini ifade eder.', 2),
('islamiyet-oncesi-q1', 'C', 'Kut, yalnızca askeri başarıyla kazanılabilen bir statüdür.', 3),
('islamiyet-oncesi-q1', 'D', 'Kut, babadan oğula geçen kalıtsal bir liderlik hakkıdır.', 4),
('islamiyet-oncesi-q1', 'E', 'Kutun hükümdara boyların onayıyla verildiğini ifade eder.', 5);

-- Şıklar: islamiyet-oncesi-q2
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('islamiyet-oncesi-q2', 'A', 'Türk dilinin bilinen en eski yazılı belgeleri arasında yer alır.', 1),
('islamiyet-oncesi-q2', 'B', 'Göktürk alfabesiyle yazılmıştır.', 2),
('islamiyet-oncesi-q2', 'C', 'Halkı yöneticilerinden hesap sorabilecek bilinçte gösterir.', 3),
('islamiyet-oncesi-q2', 'D', 'Çince ve Türkçe olmak üzere iki dilde kaleme alınmıştır.', 4),
('islamiyet-oncesi-q2', 'E', 'Türk milletine devleti nasıl koruyacaklarına dair öğütler içerir.', 5);

-- Şıklar: islamiyet-oncesi-q3
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('islamiyet-oncesi-q3', 'A', 'Taht kavgaları ve devletin bölünmesi.', 1),
('islamiyet-oncesi-q3', 'B', 'Ordu komutanlarının nüfuz kazanması.', 2),
('islamiyet-oncesi-q3', 'C', 'Dini otoritenin siyasi iktidara müdahale etmesi.', 3),
('islamiyet-oncesi-q3', 'D', 'Yabancı devletlerin iç işlere karışması.', 4),
('islamiyet-oncesi-q3', 'E', 'Ticaret yollarının kontrol edilememesi.', 5);

-- Şıklar: islamiyet-oncesi-q4
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('islamiyet-oncesi-q4', 'A', 'Türklerde merkezi otorite hiçbir zaman kurulamamıştır.', 1),
('islamiyet-oncesi-q4', 'B', 'Siyasi kararlar yalnızca hükümdar tarafından alınırdı.', 2),
('islamiyet-oncesi-q4', 'C', 'Boylar arasındaki rekabet kurultay aracılığıyla tamamen önlenmiştir.', 3),
('islamiyet-oncesi-q4', 'D', 'Kurultay yalnızca savaş dönemlerinde toplanırdı.', 4),
('islamiyet-oncesi-q4', 'E', 'Hükümdarlık mutlak olmayıp boyların katılımıyla sınırlandırılmıştır.', 5);

-- Şıklar: islamiyet-oncesi-q5
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('islamiyet-oncesi-q5', 'A', 'I. Kök Türk Devleti – 745 – Uygurlar tarafından yıkılmıştır.', 1),
('islamiyet-oncesi-q5', 'B', 'Orhun Yazıtları – 6. yüzyıl – Bumin Kağan adına dikilmiştir.', 2),
('islamiyet-oncesi-q5', 'C', 'I. Kök Türk Devleti – 552 – Bumin Kağan kurmuştur.', 3),
('islamiyet-oncesi-q5', 'D', 'Uygur Devleti – 552 – Göktürklerin mirasçısıdır.', 4),
('islamiyet-oncesi-q5', 'E', 'Orhun Yazıtları – 9. yüzyıl – Kağanlığın çöküşünü anlatır.', 5);

-- TÜRK-İSLAM TARİHİ (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('turk-islam-q1', 'turk-islam', 'single', 'temel',
 'Büyük Selçuklu Devleti''nin kurucusu kimdir?',
 'C', 'Büyük Selçuklu Devleti, Tuğrul Bey tarafından 1040 Dandanakan Savaşı''nın ardından kurulmuştur. Alparslan, Tuğrul Bey''in yeğeni ve halefidir.', '"Kurucu" sorusunda Alparslan ile Tuğrul Bey karıştırılır; Tuğrul kurucu, Alparslan Malazgirt fatihi.', '["Selçuklu", "Tuğrul Bey", "kuruluş"]', 1),
('turk-islam-q2', 'turk-islam', 'single', 'orta',
 'Nizamülmülk''ün kurduğu Nizamiye Medreseleri''nin temel amacı aşağıdakilerden hangisidir?',
 'A', 'Nizamiye Medreseleri; Sünni İslam anlayışını yaymak, devlet için nitelikli yönetici ve din adamı yetiştirmek amacıyla kurulmuştur.', 'Nizamiye = Sünni devlet okulları formülünü hatırla; Şii Fatımilere karşı ideolojik bir araçtır.', '["Nizamiye", "medrese", "Nizamülmülk", "eğitim"]', 2),
('turk-islam-q3', 'turk-islam', 'chronology', 'orta',
 'Aşağıdakilerden hangisi Talas Savaşı''nın (751) sonuçları arasında gösterilemez?',
 'E', 'Talas Savaşı''nda Türk-Arap kuvvetleri Çin''i yenmiştir. Bu savaşın sonuçları arasında kâğıt yapımının İslam dünyasına yayılması sayılabilir. Matbaanın icat edilmesi bu savaşla ilgili değildir.', 'Talas Savaşı = kâğıt formülünü ezberle; matbaa çeldirici olarak gelir.', '["Talas Savaşı", "kâğıt", "Çin-Türk ilişkileri"]', 3),
('turk-islam-q4', 'turk-islam', 'single', 'ileri',
 'Karahanlılar döneminde Türkçe yazılan eserler arasında hangisi hem dilbilgisi hem de bir nasihatname niteliği taşır?',
 'B', 'Kutadgu Bilig, Yusuf Has Hacip tarafından 11. yüzyılda yazılmış olup devlet yönetimi, erdem ve siyasi ahlak üzerine öğütler içerir. Türk İslam literatürünün ilk kapsamlı eseridir.', 'Divan-ı Lügat-it Türk = sözlük; Kutadgu Bilig = nasihatname/siyasetname ayrımını net tut.', '["Kutadgu Bilig", "Karahanlı", "Türkçe eser"]', 4),
('turk-islam-q5', 'turk-islam', 'case', 'orta',
 '1071 Malazgirt Savaşı''nın önemi bakımından aşağıdaki ifadelerden hangisi doğrudur?',
 'D', 'Malazgirt Savaşı''nda Alparslan, Bizans İmparatoru Romanos Diogenes''i esir almıştır. Bu zafer Anadolu''nun Türklere kapısını açan dönüm noktasıdır.', 'Malazgirt: Alparslan vs. Romanos Diogenes; sonuç = Anadolu''nun kapısı açıldı.', '["Malazgirt", "Alparslan", "Anadolu", "Bizans"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('turk-islam-q1', 'A', 'Alparslan', 1), ('turk-islam-q1', 'B', 'Melikşah', 2), ('turk-islam-q1', 'C', 'Tuğrul Bey', 3), ('turk-islam-q1', 'D', 'Selçuk Bey', 4), ('turk-islam-q1', 'E', 'Çağrı Bey', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('turk-islam-q2', 'A', 'Sünni İslam anlayışını yaymak ve nitelikli yönetici yetiştirmek.', 1), ('turk-islam-q2', 'B', 'Hristiyan misyoner faaliyetlerine karşı koymak.', 2), ('turk-islam-q2', 'C', 'Ticaret yollarında güvenliği sağlamak.', 3), ('turk-islam-q2', 'D', 'Abbasi halifelerinin eğitim politikasını uygulamak.', 4), ('turk-islam-q2', 'E', 'Türk dilini ve kültürünü korumak.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('turk-islam-q3', 'A', 'Kâğıt yapım tekniği İslam dünyasına yayılmıştır.', 1), ('turk-islam-q3', 'B', 'Türk-Çin ilişkileri köklü biçimde değişmiştir.', 2), ('turk-islam-q3', 'C', 'Türklerin İslamlaşma süreci hızlanmıştır.', 3), ('turk-islam-q3', 'D', 'Çin''in Orta Asya üzerindeki nüfuzu kırılmıştır.', 4), ('turk-islam-q3', 'E', 'Matbaanın icat edilmesine zemin hazırlamıştır.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('turk-islam-q4', 'A', 'Divan-ı Lügat-it Türk', 1), ('turk-islam-q4', 'B', 'Kutadgu Bilig', 2), ('turk-islam-q4', 'C', 'Atabetü''l-Hakayık', 3), ('turk-islam-q4', 'D', 'Divanü Hikmet', 4), ('turk-islam-q4', 'E', 'Siyasetname', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('turk-islam-q5', 'A', 'Bizans ordusu tamamen imha edilmiş ve İstanbul Türklerin eline geçmiştir.', 1), ('turk-islam-q5', 'B', 'Malazgirt''te yalnızca Türkmen kuvvetleri savaşmıştır.', 2), ('turk-islam-q5', 'C', 'Savaş sonucunda Haçlı Seferleri doğrudan başlamıştır.', 3), ('turk-islam-q5', 'D', 'Alparslan, Bizans İmparatoru''nu esir almış; Anadolu Türklere açılmıştır.', 4), ('turk-islam-q5', 'E', 'Savaş, Selçuklu-Abbasi ittifakı üzerine kurulmuştu.', 5);

-- ANADOLU SELÇUKLU VE BEYLİKLER (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('anadolu-selcuklu-q1', 'anadolu-selcuklu', 'single', 'temel',
 'Anadolu Selçukluları''nın başkenti aşağıdakilerden hangisidir?',
 'C', 'Anadolu Selçuklularının başkenti Konya''dır. Bu şehir hem siyasi hem de kültürel açıdan devletin merkezi olmuştur.', 'Başkent sorusunda Sivas, Kayseri veya Erzurum çeldirici olarak verilir; doğru cevap Konya.', '["Anadolu Selçuklu", "Konya", "başkent"]', 1),
('anadolu-selcuklu-q2', 'anadolu-selcuklu', 'single', 'orta',
 'Anadolu Selçuklularının ticaret politikasında kervansarayların işlevi nedir?',
 'A', 'Kervansaraylar; ticaret yolları boyunca kervanların konakladığı, devletin güvencesini sağladığı yapılardır. Ticaretin teşvik edilmesi ve ekonominin canlandırılması amacıyla inşa edilmiştir.', 'Kervansaray = ticaret güvencesi ve devlet gelirleri ilişkisini net gör.', '["kervansaray", "ticaret", "Anadolu Selçuklu"]', 2),
('anadolu-selcuklu-q3', 'anadolu-selcuklu', 'chronology', 'orta',
 '1243 Kösedağ Savaşı''nın Anadolu Selçukluları açısından en önemli sonucu nedir?',
 'E', 'Kösedağ Savaşı''nda Anadolu Selçukluları Moğollara yenilmiş; bu yenilgi devletin Moğol hâkimiyetine girmesine ve giderek zayıflayarak beylikler dönemine zemin hazırlamasına neden olmuştur.', 'Kösedağ = Moğol hâkimiyeti başlangıcı = Selçuklu''nun çöküş sürecinin başı.', '["Kösedağ", "Moğol", "beylikler"]', 3),
('anadolu-selcuklu-q4', 'anadolu-selcuklu', 'single', 'ileri',
 'Anadolu''da kurulan beylikler arasında Osmanlı Beyliği''nin kısa sürede öne çıkmasının temel nedeni aşağıdakilerden hangisidir?',
 'B', 'Osmanlı Beyliği; Bizans sınırındaki "uç" konumu sayesinde sürekli gaza yapma imkânı bulmuş, gazi nüfusunu kendine çekmiş ve bu sayede hızla güçlenmiştir.', 'Osmanlı''nın avantajı = sınır bölgesi + gaza ideolojisi formülünü hatırla.', '["Osmanlı", "beylik", "uç", "gaza"]', 4),
('anadolu-selcuklu-q5', 'anadolu-selcuklu', 'case', 'orta',
 'Ahilik teşkilatının Anadolu''nun Türkleşmesindeki rolü bakımından aşağıdakilerden hangisi doğrudur?',
 'D', 'Ahilik; esnaf ve zanaatkârları bir çatı altında toplayan, hem mesleki hem ahlaki eğitim veren bir teşkilattır. Şehirlerdeki sosyal dayanışmayı güçlendirmiş ve Türk-İslam kültürünün kentlerde yerleşmesine katkı sağlamıştır.', 'Ahilik = şehir esnafı + ahlak eğitimi + Türkleşmenin şehir ayağı.', '["ahilik", "esnaf", "Anadolu", "Türkleşme"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('anadolu-selcuklu-q1', 'A', 'Ankara', 1), ('anadolu-selcuklu-q1', 'B', 'Sivas', 2), ('anadolu-selcuklu-q1', 'C', 'Konya', 3), ('anadolu-selcuklu-q1', 'D', 'Kayseri', 4), ('anadolu-selcuklu-q1', 'E', 'Erzurum', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('anadolu-selcuklu-q2', 'A', 'Ticaret yollarını güvence altına alarak ekonomiyi canlandırmak.', 1), ('anadolu-selcuklu-q2', 'B', 'Yalnızca askerî kuvvetlerin konaklama ihtiyacını karşılamak.', 2), ('anadolu-selcuklu-q2', 'C', 'Dini eğitim vererek halkın İslamlaşmasını hızlandırmak.', 3), ('anadolu-selcuklu-q2', 'D', 'Yabancı tüccarları ülkeye girişten caydırmak.', 4), ('anadolu-selcuklu-q2', 'E', 'Moğol ilerleyişini engelleyecek savunma hatları oluşturmak.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('anadolu-selcuklu-q3', 'A', 'Haçlı Seferlerinin Anadolu''da hız kazanması.', 1), ('anadolu-selcuklu-q3', 'B', 'Bizans''ın Anadolu''daki topraklarını geri alması.', 2), ('anadolu-selcuklu-q3', 'C', 'Osmanlı Beyliği''nin hemen kurulması.', 3), ('anadolu-selcuklu-q3', 'D', 'Selçuklu merkezi yönetiminin güçlenmesi.', 4), ('anadolu-selcuklu-q3', 'E', 'Devletin Moğol egemenliğine girerek güç kaybetmesi.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('anadolu-selcuklu-q4', 'A', 'Bizans ile kurulan güçlü ittifak.', 1), ('anadolu-selcuklu-q4', 'B', 'Sınır bölgesindeki konumu ve sürekli gazi faaliyetleri.', 2), ('anadolu-selcuklu-q4', 'C', 'Moğol baskısından en uzakta kalması.', 3), ('anadolu-selcuklu-q4', 'D', 'Ticaret yollarını tamamen kontrol altına alması.', 4), ('anadolu-selcuklu-q4', 'E', 'Selçuklu hükümdarının en büyük beyi olarak ilan edilmesi.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('anadolu-selcuklu-q5', 'A', 'Sadece köylülerin örgütlenmesini sağlamıştır.', 1), ('anadolu-selcuklu-q5', 'B', 'Büyük şehirlere göç eden Bizans nüfusunu dönüştürmüştür.', 2), ('anadolu-selcuklu-q5', 'C', 'Yalnızca askeri amaçlarla kurulmuş bir teşkilattır.', 3), ('anadolu-selcuklu-q5', 'D', 'Şehirlerde mesleki dayanışma ve Türk-İslam kültürünün yerleşmesine katkı sağlamıştır.', 4), ('anadolu-selcuklu-q5', 'E', 'Moğol yönetimine karşı silahlı direniş örgütlemiştir.', 5);

-- OSMANLI KURULUŞ VE YÜKSELİŞ (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('osmanli-kurulus-yukselis-q1', 'osmanli-kurulus-yukselis', 'single', 'temel',
 'İstanbul''un fethini (1453) gerçekleştiren Osmanlı padişahı kimdir?',
 'B', 'İstanbul''u fetheden Fatih Sultan Mehmet''tir. Bu fetih, Orta Çağ''ı sona erdirip Yeni Çağ''ı başlatan önemli bir dönüm noktasıdır.', 'Fetih tarihi ve fethedeni birlikte ezberle: 1453 - Fatih Sultan Mehmet.', '["İstanbul fethi", "Fatih", "1453"]', 1),
('osmanli-kurulus-yukselis-q2', 'osmanli-kurulus-yukselis', 'single', 'orta',
 'Devşirme sisteminin temel amacı aşağıdakilerden hangisidir?',
 'D', 'Devşirme; Hristiyan tebaanın çocuklarından toplanan ve İslam terbiyesiyle yetiştirilen bir insan kaynağı sistemidir. Padişaha doğrudan bağlı, sadık bir asker ve yönetici sınıfı oluşturmak amaçlanmıştır.', 'Devşirmenin amacı: sadakat garantisi. Türk ailelerinden değil, Hristiyan çocuklardan alınması da sorulur.', '["devşirme", "Kapıkulu", "yönetici sınıfı"]', 2),
('osmanli-kurulus-yukselis-q3', 'osmanli-kurulus-yukselis', 'chronology', 'orta',
 'Osmanlı''nın Balkanlardaki ilerleyişinde aşağıdaki olayların doğru kronolojik sırası hangisidir?',
 'A', 'Osmanlı Balkanlarda sırasıyla Rumeli''ye geçiş, Edirne''nin alınması, Kosova Savaşı ve İstanbul''un fethiyle ilerler. Kosova 1389, İstanbul 1453''tür.', 'Balkan kronolojisi: Rumeli geçiş → Edirne → Kosova (1389) → İstanbul (1453).', '["Balkan", "kronoloji", "Osmanlı yayılma"]', 3),
('osmanli-kurulus-yukselis-q4', 'osmanli-kurulus-yukselis', 'single', 'ileri',
 'Yavuz Sultan Selim döneminde Mısır''ın fethiyle (1517) Osmanlı Devleti''ne katılan en önemli kazanım aşağıdakilerden hangisidir?',
 'E', 'Mısır''ın fethinin ardından Memlük sultanından Halifelik Osmanlılara devredilmiştir. Bu gelişme Osmanlı''ya İslam dünyasında dini meşruiyet ve liderlik sağlamıştır.', '1517 Mısır seferi = halifelik devri. Padişah + halife unvanı birleşimi KPSS''nin klasik sorusudur.', '["Mısır seferi", "halifelik", "Yavuz Sultan Selim"]', 4),
('osmanli-kurulus-yukselis-q5', 'osmanli-kurulus-yukselis', 'case', 'orta',
 'Tımar sistemi hakkında aşağıdakilerden hangisi doğrudur?',
 'C', 'Tımar; askerlik hizmetine karşılık sipahiye belirli bir bölgenin vergi gelirinin bağışlanması esasına dayanır. Bu sistem hem orduyu finanse etmiş hem de taşra yönetimini düzenlemiştir.', 'Tımar = arazi değil, arazi gelirleri. Sipahi = tımarlı süvari. Doğrudan mülkiyet değil, vergi devri.', '["tımar", "sipahi", "toprak sistemi"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-kurulus-yukselis-q1', 'A', 'II. Murat', 1), ('osmanli-kurulus-yukselis-q1', 'B', 'Fatih Sultan Mehmet', 2), ('osmanli-kurulus-yukselis-q1', 'C', 'Yıldırım Bayezit', 3), ('osmanli-kurulus-yukselis-q1', 'D', 'I. Selim', 4), ('osmanli-kurulus-yukselis-q1', 'E', 'Kanuni Sultan Süleyman', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-kurulus-yukselis-q2', 'A', 'Anadolu''dan asker toplayarak merkezi orduyu güçlendirmek.', 1), ('osmanli-kurulus-yukselis-q2', 'B', 'Hristiyan devletlere karşı dini savaş ilan etmek.', 2), ('osmanli-kurulus-yukselis-q2', 'C', 'Türk köylülerini askere alarak sınırları korumak.', 3), ('osmanli-kurulus-yukselis-q2', 'D', 'Padişaha sadık bir asker ve yönetici sınıfı oluşturmak.', 4), ('osmanli-kurulus-yukselis-q2', 'E', 'Fethedilen bölgelerde halkı yöneticisi yapmak.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-kurulus-yukselis-q3', 'A', 'Rumeli geçişi → Edirne → Kosova → İstanbul''un fethi', 1), ('osmanli-kurulus-yukselis-q3', 'B', 'İstanbul''un fethi → Kosova → Edirne → Rumeli geçişi', 2), ('osmanli-kurulus-yukselis-q3', 'C', 'Kosova → Edirne → Rumeli geçişi → İstanbul''un fethi', 3), ('osmanli-kurulus-yukselis-q3', 'D', 'Edirne → Kosova → İstanbul''un fethi → Rumeli geçişi', 4), ('osmanli-kurulus-yukselis-q3', 'E', 'Kosova → Rumeli geçişi → İstanbul''un fethi → Edirne', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-kurulus-yukselis-q4', 'A', 'Akdeniz ticaretinin tümüyle Osmanlı kontrolüne geçmesi.', 1), ('osmanli-kurulus-yukselis-q4', 'B', 'Afrika''nın fethine zemin hazırlanması.', 2), ('osmanli-kurulus-yukselis-q4', 'C', 'Suriye ve Irak topraklarının Osmanlı''ya bağlanması.', 3), ('osmanli-kurulus-yukselis-q4', 'D', 'Portekiz''in Hint Okyanusu''ndaki etkinliğinin kırılması.', 4), ('osmanli-kurulus-yukselis-q4', 'E', 'Halifeliğin Osmanlı''ya devredilerek dini liderlik kazanılması.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-kurulus-yukselis-q5', 'A', 'Tımar, sipahiye belirli bir bölgede mülk edinme hakkı tanır.', 1), ('osmanli-kurulus-yukselis-q5', 'B', 'Tımarlı sipahiler merkezi ordunun temel süvari kuvvetiydi.', 2), ('osmanli-kurulus-yukselis-q5', 'C', 'Sipahi, askerlik karşılığında bölge vergi geliriyle geçimini sağlar.', 3), ('osmanli-kurulus-yukselis-q5', 'D', 'Tımar sistemi yalnızca savaş dönemlerinde uygulanırdı.', 4), ('osmanli-kurulus-yukselis-q5', 'E', 'Tımarlı sipahi, aynı zamanda bölgesinin yargıcıydı.', 5);

-- OSMANLI KÜLTÜR VE MEDENİYET (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('osmanli-kultur-medeniyet-q1', 'osmanli-kultur-medeniyet', 'single', 'temel',
 'Osmanlı merkez yönetiminin en yüksek idari ve yargı organı aşağıdakilerden hangisidir?',
 'A', 'Divan-ı Hümayun, Osmanlı''nın en yüksek yürütme, yargı ve yasama organıdır. Başlangıçta padişah başkanlık ederken sonraki dönemlerde Sadrazam bu görevi üstlenmiştir.', 'Divan = yürütme + yargı + yasama birlikte. Sadece yargı diyenler yanılır.', '["Divan-ı Hümayun", "merkez yönetim", "Sadrazam"]', 1),
('osmanli-kultur-medeniyet-q2', 'osmanli-kultur-medeniyet', 'single', 'orta',
 'Osmanlı''da millet sisteminin temel işlevi nedir?',
 'D', 'Millet sistemi; gayrimüslim toplulukların kendi dini kurumları aracılığıyla iç işlerini yönetmesine olanak tanıyan bir örgütlenme biçimidir. Bu sayede farklı topluluklar bir arada yaşatılmıştır.', 'Millet sistemi = gayrimüslim özerkliği + dini lider aracılığıyla yönetim.', '["millet sistemi", "gayrimüslim", "hoşgörü"]', 2),
('osmanli-kultur-medeniyet-q3', 'osmanli-kultur-medeniyet', 'chronology', 'orta',
 'Osmanlı toprak sisteminde "mirî arazi" kavramı aşağıdakilerden hangisini ifade eder?',
 'B', 'Mirî arazi; devlete ait olan, mülkiyeti hazineye bağlı olan arazidir. Kullanım hakkı halka veya sipahiye devredilir, ancak mülkiyet devlete aittir.', 'Mirî = devlet mülkü. Mülkiyet hakkı kişiye değil devlete ait.', '["mirî arazi", "toprak mülkiyeti", "Osmanlı ekonomi"]', 3),
('osmanli-kultur-medeniyet-q4', 'osmanli-kultur-medeniyet', 'single', 'ileri',
 'Enderun Mektebi''nin Osmanlı devlet yönetimindeki işlevi nedir?',
 'E', 'Enderun; sarayda devşirme kökenli yetenekli gençlerin eğitildiği ve üst düzey devlet kademelerine hazırlandığı bir iç okuldur.', 'Enderun = saray içi devlet okulu = sadrazam, vezir gibi üst makamların yetiştirme yeri.', '["Enderun", "devşirme", "saray eğitimi"]', 4),
('osmanli-kultur-medeniyet-q5', 'osmanli-kultur-medeniyet', 'case', 'orta',
 'Osmanlı vakıf sisteminin toplumsal işlevi bakımından hangisi doğrudur?',
 'C', 'Vakıflar; eğitim, sağlık, yol, han gibi kamusal hizmetlerin devlet bütçesinden bağımsız olarak finanse edilmesini sağlayan en temel sosyal kurumdur.', 'Vakıf = devletin sağlayamadığı hizmetleri karşılayan sivil finans mekanizması.', '["vakıf", "sosyal hizmet", "Osmanlı kurumları"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-kultur-medeniyet-q1', 'A', 'Divan-ı Hümayun', 1), ('osmanli-kultur-medeniyet-q1', 'B', 'Enderun Mektebi', 2), ('osmanli-kultur-medeniyet-q1', 'C', 'Kazaskerlik', 3), ('osmanli-kultur-medeniyet-q1', 'D', 'Şeyhülislamlık', 4), ('osmanli-kultur-medeniyet-q1', 'E', 'Defterdar', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-kultur-medeniyet-q2', 'A', 'Müslüman topluluklara ayrıcalıklı vergi muafiyeti tanımak.', 1), ('osmanli-kultur-medeniyet-q2', 'B', 'Hristiyan ve Yahudileri zorla asimilasyona tabi tutmak.', 2), ('osmanli-kultur-medeniyet-q2', 'C', 'Tüm dinleri devlet denetimine almak.', 3), ('osmanli-kultur-medeniyet-q2', 'D', 'Gayrimüslimlerin kendi dinî kurumları aracılığıyla iç işlerini yönetmesini sağlamak.', 4), ('osmanli-kultur-medeniyet-q2', 'E', 'Yabancı devletlerle diplomatik ilişki kurmak.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-kultur-medeniyet-q3', 'A', 'Padişaha ait olan ve satılabilen özel arazi.', 1), ('osmanli-kultur-medeniyet-q3', 'B', 'Mülkiyeti devlete ait, kullanım hakkı halka bırakılan arazi.', 2), ('osmanli-kultur-medeniyet-q3', 'C', 'Dini kurumlara bağışlanmış ve vakıf geliri sağlayan arazi.', 3), ('osmanli-kultur-medeniyet-q3', 'D', 'Tımarlı sipahinin kalıtsal olarak devraldığı arazi.', 4), ('osmanli-kultur-medeniyet-q3', 'E', 'Savaş ganimetiyle kazanılmış, askere dağıtılan arazi.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-kultur-medeniyet-q4', 'A', 'Ulema sınıfının dini eğitim kurumu.', 1), ('osmanli-kultur-medeniyet-q4', 'B', 'Taşra yöneticilerini yetiştiren askeri okul.', 2), ('osmanli-kultur-medeniyet-q4', 'C', 'Halk için açık temel eğitim kurumu.', 3), ('osmanli-kultur-medeniyet-q4', 'D', 'Janissary subaylarını yetiştiren teknik okul.', 4), ('osmanli-kultur-medeniyet-q4', 'E', 'Devşirme kökenli gençlerin üst kademe yöneticiliğe hazırlandığı saray okulu.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-kultur-medeniyet-q5', 'A', 'Yalnızca dini eğitim hizmetleri sunmuştur.', 1), ('osmanli-kultur-medeniyet-q5', 'B', 'Padişahın emriyle kurulur, hazine gelirleriyle finanse edilirdi.', 2), ('osmanli-kultur-medeniyet-q5', 'C', 'Eğitim, sağlık ve altyapı gibi kamusal hizmetleri devletten bağımsız biçimde finanse etmiştir.', 3), ('osmanli-kultur-medeniyet-q5', 'D', 'Yalnızca Müslümanlara hizmet verebilecek şekilde düzenlenmişti.', 4), ('osmanli-kultur-medeniyet-q5', 'E', 'Askeri masrafları karşılamak için kurulmuş bir fon mekanizmasıdır.', 5);

-- OSMANLI YENİLEŞME VE DEMOKRATİKLEŞME (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('osmanli-yenilesme-q1', 'osmanli-yenilesme', 'single', 'temel',
 'Tanzimat Fermanı (1839) hangi padişah döneminde ilan edilmiştir?',
 'C', 'Tanzimat Fermanı, Abdülmecit döneminde Mustafa Reşit Paşa tarafından hazırlanmış ve 1839''da ilan edilmiştir.', 'Tanzimat = Abdülmecit + Mustafa Reşit Paşa ikilisini birlikte ezberle.', '["Tanzimat", "Abdülmecit", "Mustafa Reşit Paşa"]', 1),
('osmanli-yenilesme-q2', 'osmanli-yenilesme', 'single', 'orta',
 'Islahat Fermanı (1856) Tanzimat Fermanı''ndan hangi önemli farkla ayrılır?',
 'B', 'Islahat Fermanı, ağırlıklı olarak gayrimüslimlerin haklarını genişletmeye odaklanmıştır. Tanzimat genel hak eşitliğini vurgularken Islahat özellikle gayrimüslim tebaaya yönelik düzenlemeler içermiştir.', 'Islahat = gayrimüslim odak. Avrupa baskısı altında ilan edilmiş olması da sorulur.', '["Islahat Fermanı", "gayrimüslim hakları", "Tanzimat karşılaştırma"]', 2),
('osmanli-yenilesme-q3', 'osmanli-yenilesme', 'chronology', 'orta',
 'I. Meşrutiyet''in ilan edilmesinde (1876) aşağıdaki etkenlerden hangisi doğrudan belirleyici olmuştur?',
 'A', 'I. Meşrutiyet''in ilan edilmesinde Genç Osmanlıların baskısı ve 93 Harbi''nin (1877-78 Osmanlı-Rus Savaşı) getirdiği mali ve siyasi kriz belirleyici olmuştur.', 'I. Meşrutiyet 1876, II. Abdülhamit ilan etti ama 1878''de meclisi kapattı. Tarihler kritik.', '["I. Meşrutiyet", "Kanunuesasi", "Genç Osmanlılar"]', 3),
('osmanli-yenilesme-q4', 'osmanli-yenilesme', 'single', 'ileri',
 'II. Meşrutiyet''in (1908) ilanı sonucunda Osmanlı''da hangi gelişme yaşanmıştır?',
 'E', 'II. Meşrutiyet''in ilanıyla Kanun-i Esasi yeniden yürürlüğe girmiş ve meclis çalışmalarına başlanmıştır. Bu süreçte İttihat ve Terakki Cemiyeti güçlü bir siyasi aktöre dönüşmüştür.', 'II. Meşrutiyet = 1908 = İttihat ve Terakki''nin yükselişi. I. ve II. Meşrutiyet tarihlerini karıştırma.', '["II. Meşrutiyet", "İttihat ve Terakki", "1908"]', 4),
('osmanli-yenilesme-q5', 'osmanli-yenilesme', 'case', 'orta',
 'Lale Devri''nin (1718-1730) Osmanlı yenileşme tarihindeki önemi nedir?',
 'D', 'Lale Devri, Batı''yı yakından tanıma ve Batı''dan teknik unsurlar alma yolunda atılan ilk adımlardır. Matbaa ve çeşitli imar faaliyetleri bu dönemde başlamıştır. Ancak dönem Patrona Halil İsyanı''yla son bulmuştur.', 'Lale Devri = Batılılaşmanın ilk adımı + matbaa + Patrona Halil İsyanı.', '["Lale Devri", "Batılılaşma", "matbaa", "Patrona Halil"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-yenilesme-q1', 'A', 'II. Mahmut', 1), ('osmanli-yenilesme-q1', 'B', 'III. Selim', 2), ('osmanli-yenilesme-q1', 'C', 'Abdülmecit', 3), ('osmanli-yenilesme-q1', 'D', 'Abdülaziz', 4), ('osmanli-yenilesme-q1', 'E', 'II. Abdülhamit', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-yenilesme-q2', 'A', 'Müslümanlara tanınan hakların sınırlandırılmasıdır.', 1), ('osmanli-yenilesme-q2', 'B', 'Gayrimüslimlerin haklarını daha kapsamlı biçimde genişletmesidir.', 2), ('osmanli-yenilesme-q2', 'C', 'İlk kez anayasal düzen getirmesidir.', 3), ('osmanli-yenilesme-q2', 'D', 'Askeri reformları öncelikli hedef olarak belirlemesidir.', 4), ('osmanli-yenilesme-q2', 'E', 'Osmanlı toprak bütünlüğünü güvence altına almasıdır.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-yenilesme-q3', 'A', 'Genç Osmanlıların baskısı ve siyasi kriz.', 1), ('osmanli-yenilesme-q3', 'B', 'Avrupa devletlerinin askeri müdahalesi.', 2), ('osmanli-yenilesme-q3', 'C', 'Mustafa Reşit Paşa''nın reform programı.', 3), ('osmanli-yenilesme-q3', 'D', 'Gayrimüslim azınlıkların Meclis taleplerini dayatması.', 4), ('osmanli-yenilesme-q3', 'E', 'Padişahın Avrupa gezisi sonrası edindikleri izlenimler.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-yenilesme-q4', 'A', 'Abdülhamit meclis kararlarını veto etme yetkisi kazanmıştır.', 1), ('osmanli-yenilesme-q4', 'B', 'Osmanlı anayasası ilk kez yazılı hale getirilmiştir.', 2), ('osmanli-yenilesme-q4', 'C', 'Hilafet makamı lağvedilmiştir.', 3), ('osmanli-yenilesme-q4', 'D', 'Osmanlı taşra yönetimi tamamen yeniden örgütlenmiştir.', 4), ('osmanli-yenilesme-q4', 'E', 'Kanun-i Esasi yeniden yürürlüğe girmiş ve meclis etkin hale gelmiştir.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('osmanli-yenilesme-q5', 'A', 'Osmanlı''nın Batı''ya ilk kez savaş ilan ettiği dönemdir.', 1), ('osmanli-yenilesme-q5', 'B', 'Toprak kayıplarının en yoğun yaşandığı dönemdir.', 2), ('osmanli-yenilesme-q5', 'C', 'Yalnızca sanat ve mimaride Batı etkisi görülmüştür.', 3), ('osmanli-yenilesme-q5', 'D', 'Batı''dan teknik unsurları alma ve matbaa faaliyetlerinin başladığı ilk dönemdir.', 4), ('osmanli-yenilesme-q5', 'E', 'Fransız İhtilali''nin fikirlerinin ilk tartışıldığı ortam olmuştur.', 5);

-- MİLLİ MÜCADELE HAZIRLIK DÖNEMİ (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('milli-mucadele-hazirlik-q1', 'milli-mucadele-hazirlik', 'single', 'temel',
 'Mondros Ateşkesi kaç yılında imzalanmıştır?',
 'A', 'Mondros Ateşkesi 30 Ekim 1918''de imzalanmıştır. Bu tarih, Osmanlı''nın I. Dünya Savaşı''ndan çekildiği ve işgallerin başladığı dönüm noktasıdır.', 'Mondros = 30 Ekim 1918. Lozan (1923) ve Sevr (1920) ile karıştırma.', '["Mondros", "1918", "ateşkes"]', 1),
('milli-mucadele-hazirlik-q2', 'milli-mucadele-hazirlik', 'single', 'orta',
 'Amasya Genelgesi''nde yer alan "Milletin istiklalini yine milletin azim ve kararı kurtaracaktır." ifadesi neyi vurgulamaktadır?',
 'D', 'Bu ifade, kurtuluşun İstanbul Hükümeti veya yabancı devletlerden değil, doğrudan Türk milletinin örgütlü iradesinden geleceğini vurgulamaktadır. Bu yüzden Amasya''da ulusal egemenlik fikrinin ilanı olarak değerlendirilir.', 'Amasya = milletin kendi kaderini tayin etme hakkı + kurtuluşun örgütlü millet ile geleceği.', '["Amasya Genelgesi", "ulusal egemenlik", "milli mücadele"]', 2),
('milli-mucadele-hazirlik-q3', 'milli-mucadele-hazirlik', 'chronology', 'orta',
 'Aşağıdakilerden hangisi Erzurum Kongresi''nin (Temmuz 1919) kararları arasında yer almaz?',
 'B', 'Erzurum Kongresi bölgesel bir kongre olarak başlamış ancak aldığı kararlarla ulusal bir nitelik kazanmıştır. Halifeliğin kaldırılması bu kongrenin değil, Cumhuriyet döneminin 1924 kararıdır.', 'Erzurum = bölgesel + ulusal karar kombinasyonu. Kaldırılan kurumlar (halifelik, saltanat) Cumhuriyet dönemidir.', '["Erzurum Kongresi", "ulusal karar", "Milli Mücadele"]', 3),
('milli-mucadele-hazirlik-q4', 'milli-mucadele-hazirlik', 'single', 'ileri',
 'Sivas Kongresi''nin Erzurum Kongresi''ne göre en önemli farkı nedir?',
 'E', 'Sivas Kongresi, tüm Türkiye genelinden delegelerin katılımıyla gerçekleştirilmiştir ve Erzurum''da alınan bölgesel kararları ulusal düzeye taşımıştır. Bu nedenle Sivas gerçek anlamda ulusal nitelik taşıyan ilk kongre kabul edilir.', 'Erzurum = doğu bölgesi; Sivas = tüm Türkiye. Ulusal olma farkı kritik.', '["Sivas Kongresi", "ulusal kongre", "Erzurum karşılaştırma"]', 4),
('milli-mucadele-hazirlik-q5', 'milli-mucadele-hazirlik', 'case', 'orta',
 'Misakımilli''nin (1920) içeriği bakımından aşağıdaki ifadelerden hangisi doğrudur?',
 'C', 'Misakımilli; Türk milletinin kendi kaderini tayin ettiği ve üzerinde yaşadığı toprakları terk etmeyeceğini ilan ettiği ulusal ant belgesidir. 1920''de son Osmanlı Meclisi tarafından kabul edilmiştir.', 'Misakımilli = ulusal sınır belgesi. Son Osmanlı Meclisi''nde kabul edilmiştir.', '["Misakımilli", "ulusal sınır", "son Osmanlı Meclisi"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('milli-mucadele-hazirlik-q1', 'A', '1918', 1), ('milli-mucadele-hazirlik-q1', 'B', '1919', 2), ('milli-mucadele-hazirlik-q1', 'C', '1920', 3), ('milli-mucadele-hazirlik-q1', 'D', '1922', 4), ('milli-mucadele-hazirlik-q1', 'E', '1923', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('milli-mucadele-hazirlik-q2', 'A', 'İstanbul Hükümeti''nin kurtuluşu yönetmesi gerektiğini.', 1), ('milli-mucadele-hazirlik-q2', 'B', 'Yabancı devletlerin müdahalesinin zaruri olduğunu.', 2), ('milli-mucadele-hazirlik-q2', 'C', 'Saltanat makamının kurtuluşu sağlayacağını.', 3), ('milli-mucadele-hazirlik-q2', 'D', 'Kurtuluşun yalnızca milletin örgütlü iradesinden gelebileceğini.', 4), ('milli-mucadele-hazirlik-q2', 'E', 'Kilisenin ve cemiyetlerin ortak hareket etmesi gerektiğini.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('milli-mucadele-hazirlik-q3', 'A', 'Doğu illerinin işgale karşı silahlı direnişle korunması.', 1), ('milli-mucadele-hazirlik-q3', 'B', 'Halifelik makamının kaldırılması kararı.', 2), ('milli-mucadele-hazirlik-q3', 'C', 'Manda ve himaye tekliflerinin reddedilmesi.', 3), ('milli-mucadele-hazirlik-q3', 'D', 'Temsil Heyeti''nin oluşturulması.', 4), ('milli-mucadele-hazirlik-q3', 'E', 'Ulusal sınırların belirlenip savunulması kararı.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('milli-mucadele-hazirlik-q4', 'A', 'Daha uzun süre devam etmiş ve daha fazla karar almıştır.', 1), ('milli-mucadele-hazirlik-q4', 'B', 'Anadolu''nun Batısında toplanmıştır.', 2), ('milli-mucadele-hazirlik-q4', 'C', 'Yalnızca Doğu Anadolu delegelerini temsil etmiştir.', 3), ('milli-mucadele-hazirlik-q4', 'D', 'İlk kez saltanat karşıtı karar almıştır.', 4), ('milli-mucadele-hazirlik-q4', 'E', 'Tüm Türkiye''den delegelerin katılımıyla gerçek ulusal nitelik kazanmıştır.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('milli-mucadele-hazirlik-q5', 'A', 'Osmanlı''nın tüm topraklarında tam egemenlik talebini içermektedir.', 1), ('milli-mucadele-hazirlik-q5', 'B', 'Yalnızca Doğu Anadolu''nun Türklere bırakılmasını öngörür.', 2), ('milli-mucadele-hazirlik-q5', 'C', 'Türk milletinin kendi kaderini tayin hakkını ve ulusal sınırları ilan eden belgedir.', 3), ('milli-mucadele-hazirlik-q5', 'D', 'Saltanat ve hilafet makamını destekler nitelikte bir bildirge niteliği taşır.', 4), ('milli-mucadele-hazirlik-q5', 'E', 'Yabancı devletlerle yapılacak antlaşmaların çerçevesini önceden çizmiştir.', 5);

-- KURTULUŞ SAVAŞI VE ANTLAŞMALAR (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('kurtulus-savasi-q1', 'kurtulus-savasi', 'single', 'temel',
 'Lozan Barış Antlaşması kaç yılında imzalanmıştır?',
 'D', 'Lozan Barış Antlaşması 24 Temmuz 1923''te imzalanmıştır. Bu antlaşma, Türk bağımsızlığını uluslararası arenada tescil eden belgedir.', 'Lozan = 24 Temmuz 1923. Mudanya (1922) ile karıştırma; Mudanya ateşkes, Lozan barış.', '["Lozan", "1923", "bağımsızlık"]', 1),
('kurtulus-savasi-q2', 'kurtulus-savasi', 'single', 'orta',
 'Sakarya Meydan Muharebesi''nin (Ağustos-Eylül 1921) önemi bakımından aşağıdaki ifadelerden hangisi doğrudur?',
 'A', 'Sakarya Muharebesi; Yunan kuvvetlerinin Ankara''ya kadar ilerleyişini durduran ve savaşın seyrini kesin biçimde değiştiren savunma savaşıdır. Bu zaferden sonra Mustafa Kemal''e Mareşal rütbesi verilmiştir.', 'Sakarya = savunma savaşı + Yunan ilerleyişi durduruldu + Mareşal rütbesi.', '["Sakarya", "1921", "Yunanlılar"]', 2),
('kurtulus-savasi-q3', 'kurtulus-savasi', 'chronology', 'orta',
 'Aşağıdaki olayların doğru kronolojik sırası hangisidir?',
 'E', 'I. İnönü (Ocak 1921) → II. İnönü (Nisan 1921) → Sakarya (Ağustos 1921) → Büyük Taarruz (Ağustos 1922) → Mudanya → Lozan şeklindedir.', 'Cephe muharebeleri: I. İnönü → II. İnönü → Sakarya → Büyük Taarruz → Lozan. Tarihleri sırayla öğren.', '["İnönü", "Sakarya", "Büyük Taarruz", "kronoloji"]', 3),
('kurtulus-savasi-q4', 'kurtulus-savasi', 'single', 'ileri',
 'Mudanya Ateşkes Antlaşması''nın önemi bakımından hangisi söylenebilir?',
 'B', 'Mudanya Ateşkesi (11 Ekim 1922), Büyük Taarruz sonrasında İngiltere, Fransa, İtalya ve Yunanistan ile imzalanmıştır. İstanbul ve Doğu Trakya''nın TBMM kuvvetlerine bırakılmasını öngörür.', 'Mudanya = askeri zafer diplomatik zemine taşındı. Lozan öncesindeki kritik ateşkes.', '["Mudanya", "ateşkes", "Doğu Trakya"]', 4),
('kurtulus-savasi-q5', 'kurtulus-savasi', 'case', 'orta',
 'Lozan Barış Antlaşması''nın önemi bakımından aşağıdakilerden hangisi yanlıştır?',
 'C', 'Lozan''da kapitülasyonlar tamamen kaldırılmıştır, azınlık hakları düzenlenmiştir ve Türkiye''nin uluslararası bağımsızlığı tescil edilmiştir. Ancak nüfus mübadelesi Lozan''la belirlenmekle birlikte uygulama 1923''te başlamıştır; Yunanlıların tamamı daha önceden gitmemiştir.', 'Lozan''da nelerin düzenlendiği kadar nelerin dışarıda kaldığını (Musul, Boğazlar geçici çözüm) da bil.', '["Lozan", "kapitülasyon", "azınlık", "nüfus mübadelesi"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('kurtulus-savasi-q1', 'A', '1920', 1), ('kurtulus-savasi-q1', 'B', '1921', 2), ('kurtulus-savasi-q1', 'C', '1922', 3), ('kurtulus-savasi-q1', 'D', '1923', 4), ('kurtulus-savasi-q1', 'E', '1924', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('kurtulus-savasi-q2', 'A', 'Yunan kuvvetlerinin Ankara''ya ilerleyişini durdurmuştur.', 1), ('kurtulus-savasi-q2', 'B', 'Doğu cephesinde Ermenilere karşı kazanılan zaferdir.', 2), ('kurtulus-savasi-q2', 'C', 'İngilizler ile doğrudan çatışılmış ve galip gelinmiştir.', 3), ('kurtulus-savasi-q2', 'D', 'Lozan''ın hemen ardından gerçekleşen son kara savaşıdır.', 4), ('kurtulus-savasi-q2', 'E', 'Fransız kuvvetlerine karşı güney cephesinde kazanılmıştır.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('kurtulus-savasi-q3', 'A', 'Büyük Taarruz → I. İnönü → Sakarya → Mudanya → Lozan', 1), ('kurtulus-savasi-q3', 'B', 'Sakarya → I. İnönü → II. İnönü → Büyük Taarruz → Lozan', 2), ('kurtulus-savasi-q3', 'C', 'I. İnönü → Sakarya → II. İnönü → Büyük Taarruz → Lozan', 3), ('kurtulus-savasi-q3', 'D', 'Lozan → Mudanya → Büyük Taarruz → Sakarya → I. İnönü', 4), ('kurtulus-savasi-q3', 'E', 'I. İnönü → II. İnönü → Sakarya → Büyük Taarruz → Mudanya → Lozan', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('kurtulus-savasi-q4', 'A', 'Yunan kuvvetleri savaşı resmen Mudanya''da ilan etmiştir.', 1), ('kurtulus-savasi-q4', 'B', 'İstanbul ve Doğu Trakya TBMM''ye bırakılmıştır.', 2), ('kurtulus-savasi-q4', 'C', 'Kapitülasyonlar bu antlaşmayla kaldırılmıştır.', 3), ('kurtulus-savasi-q4', 'D', 'Saltanat bu ateşkesle birlikte kaldırılmıştır.', 4), ('kurtulus-savasi-q4', 'E', 'Antlaşma yalnızca Yunanistan ile imzalanmıştır.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('kurtulus-savasi-q5', 'A', 'Kapitülasyonlar antlaşmayla tamamen kaldırılmıştır.', 1), ('kurtulus-savasi-q5', 'B', 'Azınlıkların hakları ve nüfus mübadelesi düzenlenmiştir.', 2), ('kurtulus-savasi-q5', 'C', 'Antlaşma imzalanmadan önce tüm Rumlar Türkiye''yi terk etmişti.', 3), ('kurtulus-savasi-q5', 'D', 'Türkiye''nin uluslararası bağımsızlığı tescil edilmiştir.', 4), ('kurtulus-savasi-q5', 'E', 'Boğazlar meselesi geçici bir düzenlemeyle çözüme kavuşturulmuştur.', 5);

-- ATATÜRK İLKE VE İNKILAPLARI (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('ataturk-ilke-inkilap-q1', 'ataturk-ilke-inkilap', 'single', 'temel',
 'Halifeliğin kaldırıldığı yıl aşağıdakilerden hangisidir?',
 'B', 'Halifelik 3 Mart 1924''te kaldırılmıştır. Saltanat ise daha önce, 1 Kasım 1922''de kaldırılmıştır. Bu iki tarihin karıştırılmaması kritik öneme sahiptir.', 'Saltanat = 1922; Halifelik = 1924. Birbirinden iki yıl farklı.', '["halifelik", "1924", "saltanat"]', 1),
('ataturk-ilke-inkilap-q2', 'ataturk-ilke-inkilap', 'single', 'orta',
 'Tevhid-i Tedrisat Kanunu''nun (1924) temel amacı nedir?',
 'D', 'Tevhid-i Tedrisat Kanunu; tüm eğitim kurumlarını Millî Eğitim Bakanlığı çatısı altında toplayarak eğitimde birlik sağlamayı ve din dışı laik bir eğitim sistemini oluşturmayı amaçlamıştır.', 'Tevhid-i Tedrisat = eğitim birliği = laik okul sistemi kurulumu.', '["Tevhid-i Tedrisat", "eğitim reformu", "laiklik"]', 2),
('ataturk-ilke-inkilap-q3', 'ataturk-ilke-inkilap', 'chronology', 'orta',
 'Atatürk inkılapları arasında aşağıdakilerden hangisi laiklik ilkesiyle doğrudan ilişkilendirilemez?',
 'A', 'Soyadı Kanunu (1934) laiklikle değil, batılı kimlik düzeniyle ilişkilendirilir. Halifeliğin kaldırılması, tekke ve zaviyelerin kapatılması, medeni kanunun kabulü doğrudan laikliğin ürünleridir.', 'Laiklik inkılapları: halifeliğin kaldırılması, tekkelerin kapatılması, medeni kanun. Soyadı Kanunu = modernleşme ama laiklik değil.', '["laiklik", "Soyadı Kanunu", "inkılaplar"]', 3),
('ataturk-ilke-inkilap-q4', 'ataturk-ilke-inkilap', 'single', 'ileri',
 '1934''te kadınlara verilen seçme-seçilme hakkı hangi ilkeyle en doğrudan ilişkilidir?',
 'E', 'Kadınlara seçme-seçilme hakkı verilmesi, Halkçılık ilkesinin toplumsal boyutunu yansıtmakla birlikte asıl olarak Cumhuriyetçilik ve demokrasinin pekişmesine hizmet eder. Türkiye bu hakla pek çok Avrupa ülkesini geçmiştir.', 'Kadın hakları = halkçılık + cumhuriyetçilik ilişkisi. Türkiye''nin Avrupa''dan önce bu hakkı tanıdığını bil.', '["kadın hakları", "halkçılık", "cumhuriyetçilik"]', 4),
('ataturk-ilke-inkilap-q5', 'ataturk-ilke-inkilap', 'case', 'orta',
 'Atatürk''ün "Devletçilik" ilkesi, Türkiye''deki ekonomik ortam göz önüne alındığında ne amaçla benimsendi?',
 'C', 'Devletçilik; özel sermayenin yetersiz kaldığı sanayileşme sürecinde devletin ekonomiye doğrudan katılarak kalkınmayı sağlamasını öngören bir ilkedir. Komünizm değil, karma ekonomi modelidir.', 'Devletçilik = karma ekonomi; ne tam liberalizm ne tam komünizm.', '["devletçilik", "karma ekonomi", "sanayileşme"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('ataturk-ilke-inkilap-q1', 'A', '1922', 1), ('ataturk-ilke-inkilap-q1', 'B', '1924', 2), ('ataturk-ilke-inkilap-q1', 'C', '1925', 3), ('ataturk-ilke-inkilap-q1', 'D', '1928', 4), ('ataturk-ilke-inkilap-q1', 'E', '1934', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('ataturk-ilke-inkilap-q2', 'A', 'Yabancı dil eğitimini zorunlu kılmak.', 1), ('ataturk-ilke-inkilap-q2', 'B', 'Dini eğitimi devlet kontrolüne almak.', 2), ('ataturk-ilke-inkilap-q2', 'C', 'Eğitim dilini Arapçadan Türkçeye çevirmek.', 3), ('ataturk-ilke-inkilap-q2', 'D', 'Tüm okulları tek bakanlık çatısında toplayarak eğitimde birlik sağlamak.', 4), ('ataturk-ilke-inkilap-q2', 'E', 'Sadece kız çocuklarının eğitime erişimini sağlamak.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('ataturk-ilke-inkilap-q3', 'A', 'Soyadı Kanunu''nun kabulü.', 1), ('ataturk-ilke-inkilap-q3', 'B', 'Halifeliğin kaldırılması.', 2), ('ataturk-ilke-inkilap-q3', 'C', 'Tekke ve zaviyelerin kapatılması.', 3), ('ataturk-ilke-inkilap-q3', 'D', 'Medeni Kanun''un kabulü.', 4), ('ataturk-ilke-inkilap-q3', 'E', 'Şer''iye mahkemelerinin kaldırılması.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('ataturk-ilke-inkilap-q4', 'A', 'Devletçilik', 1), ('ataturk-ilke-inkilap-q4', 'B', 'İnkılapçılık', 2), ('ataturk-ilke-inkilap-q4', 'C', 'Milliyetçilik', 3), ('ataturk-ilke-inkilap-q4', 'D', 'Laiklik', 4), ('ataturk-ilke-inkilap-q4', 'E', 'Halkçılık ve Cumhuriyetçilik', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('ataturk-ilke-inkilap-q5', 'A', 'Özel teşebbüsü tamamen yasaklamak amacıyla.', 1), ('ataturk-ilke-inkilap-q5', 'B', 'Tarım sektörünü millileştirmek için.', 2), ('ataturk-ilke-inkilap-q5', 'C', 'Özel sermayenin yetersiz kaldığı alanlarda devletin sanayiyi bizzat kurması için.', 3), ('ataturk-ilke-inkilap-q5', 'D', 'Komünist ekonomi modeline geçiş için zemin oluşturmak amacıyla.', 4), ('ataturk-ilke-inkilap-q5', 'E', 'Yabancı sermayeyi tamamen dışlamak için.', 5);

-- CUMHURİYET DÖNEMİ DIŞ POLİTİKA (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('cumhuriyet-dis-politika-q1', 'cumhuriyet-dis-politika', 'single', 'temel',
 'Montrö Boğazlar Sözleşmesi kaç yılında imzalanmıştır?',
 'C', 'Montrö Boğazlar Sözleşmesi 1936''da imzalanmış ve Türkiye''ye Boğazlar üzerinde egemenlik hakkını yeniden kazandırmıştır.', '1923 Lozan (geçici) → 1936 Montrö (kalıcı) formülünü ezberle.', '["Montrö", "Boğazlar", "1936"]', 1),
('cumhuriyet-dis-politika-q2', 'cumhuriyet-dis-politika', 'single', 'orta',
 'Balkan Antantı''nın (1934) imzalanmasındaki temel amaç nedir?',
 'A', 'Balkan Antantı; Türkiye, Yunanistan, Romanya ve Yugoslavya''nın bölgedeki statükoyu korumak ve revizyonist devletlere (özellikle Bulgaristan ve İtalya) karşı ortak güvenlik sağlamak amacıyla oluşturduğu ittifaktır.', 'Balkan Antantı = statüko koruma + Bulgaristan/İtalya''ya karşı denge.', '["Balkan Antantı", "1934", "bölgesel güvenlik"]', 2),
('cumhuriyet-dis-politika-q3', 'cumhuriyet-dis-politika', 'chronology', 'orta',
 'Hatay''ın Türkiye''ye katılması hangi yıl gerçekleşmiştir?',
 'E', 'Hatay, 1939''da halkoyuyla Türkiye''ye bağlanmıştır. Fransa''nın kıyısında olması nedeniyle bu süreç diplomatik müzakereleri de içermiştir.', 'Hatay = 1939. Musul meselesi (1926) ve Montrö (1936) ile karıştırma.', '["Hatay", "1939", "Türkiye-Fransa"]', 3),
('cumhuriyet-dis-politika-q4', 'cumhuriyet-dis-politika', 'single', 'ileri',
 'Türkiye''nin II. Dünya Savaşı sürecindeki temel dış politika tutumu aşağıdakilerden hangisidir?',
 'B', 'Türkiye II. Dünya Savaşı''nda aktif taraf tutmaktan kaçınmış, tarafsız (savaş dışı kalma) politikasını benimsemiştir. Hem müttefiklerle hem de Almanya ile ticari ve diplomatik ilişkilerini sürdürmüştür.', 'WWII = Türkiye tarafsız. Savaşın sonunda 1945''te sembolik olarak Almanya''ya savaş ilan etmiştir.', '["II. Dünya Savaşı", "tarafsızlık", "Türkiye"]', 4),
('cumhuriyet-dis-politika-q5', 'cumhuriyet-dis-politika', 'case', 'orta',
 'Sadabat Paktı''nın (1937) önemi bakımından aşağıdakilerden hangisi doğrudur?',
 'D', 'Sadabat Paktı; Türkiye, İran, Irak ve Afganistan arasında imzalanmış ve Orta Doğu''da barışçı sınırlar temelinde bölgesel güvenliği pekiştirmeyi amaçlamıştır.', 'Sadabat = Doğu paktı; Balkan = Batı paktı. İkisi de Atatürk döneminin barışçı dış politika araçları.', '["Sadabat Paktı", "1937", "Orta Doğu güvenliği"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('cumhuriyet-dis-politika-q1', 'A', '1923', 1), ('cumhuriyet-dis-politika-q1', 'B', '1934', 2), ('cumhuriyet-dis-politika-q1', 'C', '1936', 3), ('cumhuriyet-dis-politika-q1', 'D', '1939', 4), ('cumhuriyet-dis-politika-q1', 'E', '1945', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('cumhuriyet-dis-politika-q2', 'A', 'Bölgesel statükoyu korumak ve revizyonist devletlere karşı ortak güvenlik sağlamak.', 1), ('cumhuriyet-dis-politika-q2', 'B', 'Türkiye''nin Balkanlar''da toprak genişlemesini sağlamak.', 2), ('cumhuriyet-dis-politika-q2', 'C', 'İtalya''yı ittifaka dahil etmek.', 3), ('cumhuriyet-dis-politika-q2', 'D', 'Boğazlar''ın ortak yönetimine zemin hazırlamak.', 4), ('cumhuriyet-dis-politika-q2', 'E', 'Sovyet tehdidine karşı askeri ittifak oluşturmak.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('cumhuriyet-dis-politika-q3', 'A', '1923', 1), ('cumhuriyet-dis-politika-q3', 'B', '1926', 2), ('cumhuriyet-dis-politika-q3', 'C', '1934', 3), ('cumhuriyet-dis-politika-q3', 'D', '1936', 4), ('cumhuriyet-dis-politika-q3', 'E', '1939', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('cumhuriyet-dis-politika-q4', 'A', 'Almanya ile askeri ittifak kurmuştur.', 1), ('cumhuriyet-dis-politika-q4', 'B', 'Tarafsız kalmış, her iki blokla da ilişkilerini sürdürmüştür.', 2), ('cumhuriyet-dis-politika-q4', 'C', 'İngiltere ve Fransa''nın yanında aktif olarak savaşmıştır.', 3), ('cumhuriyet-dis-politika-q4', 'D', 'Sovyet Rusya ile birlikte hareket etmiştir.', 4), ('cumhuriyet-dis-politika-q4', 'E', 'Savaşın başından sonuna kadar hiçbir devletle ilişki kurmamıştır.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('cumhuriyet-dis-politika-q5', 'A', 'Türkiye''nin NATO''ya katılımının ön adımıdır.', 1), ('cumhuriyet-dis-politika-q5', 'B', 'Arap devletleriyle kurulan ilk kapsamlı ittifaktır.', 2), ('cumhuriyet-dis-politika-q5', 'C', 'Yalnızca Türkiye-İran ikili ilişkilerini düzenleyen bir belgedir.', 3), ('cumhuriyet-dis-politika-q5', 'D', 'Türkiye, İran, Irak ve Afganistan arasında bölgesel güvenliği pekiştirmeyi amaçlamıştır.', 4), ('cumhuriyet-dis-politika-q5', 'E', 'İngiltere''nin bölgesel nüfuzunu pekiştirmeye hizmet etmiştir.', 5);

-- ÇAĞDAŞ TÜRK VE DÜNYA TARİHİ (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('cagdas-turk-dunya-q1', 'cagdas-turk-dunya', 'single', 'temel',
 'Türkiye NATO''ya hangi yıl katılmıştır?',
 'B', 'Türkiye, Soğuk Savaş döneminde Batı bloğuna katılım kapsamında 1952''de NATO''ya üye olmuştur.', 'NATO üyeliği = 1952. BM = 1945. İkisini karıştırma.', '["NATO", "1952", "Soğuk Savaş"]', 1),
('cagdas-turk-dunya-q2', 'cagdas-turk-dunya', 'single', 'orta',
 'Soğuk Savaş döneminde Türkiye''nin Batı bloğunda yer almasının temel nedeni nedir?',
 'D', 'Türkiye, Sovyetlerin Boğazlar ve Doğu Anadolu''ya yönelik talepleri karşısında güvenlik garantisi arayışına girmiş; bu durum Batı bloğuna yakınlaşmayı zorunlu kılmıştır.', 'Türkiye''nin NATO''ya katılımı = Sovyet tehdidi + Boğazlar sorunu + Truman Doktrini bağlamı.', '["Soğuk Savaş", "Batı bloğu", "Sovyet tehdidi"]', 2),
('cagdas-turk-dunya-q3', 'cagdas-turk-dunya', 'chronology', 'orta',
 '1974 Kıbrıs Barış Harekâtı''nın başlatılmasının doğrudan nedeni nedir?',
 'A', '1974 harekâtı; Yunanistan''ın Kıbrıs''ta Makarios''a karşı gerçekleştirdiği cunta darbesi ve adanın Yunanistan''a bağlanma tehlikesi üzerine gerçekleştirilmiştir.', '1974 = Kıbrıs''taki Yunan darbesi → Türk harekâtı. Harekât iki aşamalı gerçekleşmiştir.', '["Kıbrıs", "1974", "Yunan darbesi"]', 3),
('cagdas-turk-dunya-q4', 'cagdas-turk-dunya', 'single', 'ileri',
 'Birleşmiş Milletler''in kuruluş amacı bakımından aşağıdaki ifadelerden hangisi doğrudur?',
 'E', 'BM, II. Dünya Savaşı''nın ardından 1945''te uluslararası barış ve güvenliği korumak, devletler arasında iş birliğini güçlendirmek amacıyla kurulmuştur.', 'BM = 1945 = II. Dünya Savaşı sonrası barış düzeni. Milletler Cemiyeti ile karıştırma (o 1919 ve başarısız oldu).', '["BM", "1945", "uluslararası barış"]', 4),
('cagdas-turk-dunya-q5', 'cagdas-turk-dunya', 'case', 'orta',
 'Soğuk Savaş''ın sona ermesinin (1991) Türkiye''nin dış politikasına etkisi bakımından aşağıdakilerden hangisi doğrudur?',
 'C', 'Soğuk Savaş''ın sona ermesiyle Türkiye, coğrafi konumundan kaynaklanan stratejik önemi korunurken yeni bölgesel ilişkiler kurmaya başlamıştır. Orta Asya Türk devletleri ve Balkanlar''la ilişkiler önem kazanmıştır.', 'Soğuk Savaş sonu = yeni fırsatlar; Türkiye Orta Asya ve Balkanlar''a açılım politikası.', '["Soğuk Savaş", "1991", "Türkiye dış politika"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('cagdas-turk-dunya-q1', 'A', '1945', 1), ('cagdas-turk-dunya-q1', 'B', '1952', 2), ('cagdas-turk-dunya-q1', 'C', '1955', 3), ('cagdas-turk-dunya-q1', 'D', '1963', 4), ('cagdas-turk-dunya-q1', 'E', '1974', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('cagdas-turk-dunya-q2', 'A', 'Ekonomik kalkınma kredisi sağlamak için.', 1), ('cagdas-turk-dunya-q2', 'B', 'Arap devletleriyle ittifak kurmak için.', 2), ('cagdas-turk-dunya-q2', 'C', 'Sömürgeci devletlere karşı destek almak için.', 3), ('cagdas-turk-dunya-q2', 'D', 'Sovyet tehdidine karşı güvenlik garantisi sağlamak için.', 4), ('cagdas-turk-dunya-q2', 'E', 'Orta Doğu''da Batı''nın çıkarlarını korumak için.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('cagdas-turk-dunya-q3', 'A', 'Yunanistan''ın Kıbrıs''ta gerçekleştirdiği cunta darbesi.', 1), ('cagdas-turk-dunya-q3', 'B', 'Kıbrıslı Türklerin bağımsızlık ilanı.', 2), ('cagdas-turk-dunya-q3', 'C', 'Sovyetlerin adaya müdahale tehdidi.', 3), ('cagdas-turk-dunya-q3', 'D', 'İngiltere''nin adadan çekilme kararı.', 4), ('cagdas-turk-dunya-q3', 'E', 'BM''nin Türkiye''den harekât yapmasını talep etmesi.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('cagdas-turk-dunya-q4', 'A', 'Sömürgeci devletlerin çıkarlarını korumak amacıyla kurulmuştur.', 1), ('cagdas-turk-dunya-q4', 'B', 'Yalnızca Avrupa devletlerini üye olarak kabul eder.', 2), ('cagdas-turk-dunya-q4', 'C', 'I. Dünya Savaşı''nın ardından barışı korumak için kurulmuştur.', 3), ('cagdas-turk-dunya-q4', 'D', 'Ekonomik kalkınmayı teşvik etmek için kurulan ticaret örgütüdür.', 4), ('cagdas-turk-dunya-q4', 'E', 'II. Dünya Savaşı''nın ardından uluslararası barış ve güvenliği sağlamak için kurulmuştur.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('cagdas-turk-dunya-q5', 'A', 'Türkiye NATO''dan çıkmış ve bağımsız bir politika izlemiştir.', 1), ('cagdas-turk-dunya-q5', 'B', 'Sovyetlerle askeri ittifak kurma gündeme gelmiştir.', 2), ('cagdas-turk-dunya-q5', 'C', 'Orta Asya Türk devletleri ve Balkanlar''la yeni ilişkiler kurulmuştur.', 3), ('cagdas-turk-dunya-q5', 'D', 'Türkiye''nin stratejik önemi tamamen azalmıştır.', 4), ('cagdas-turk-dunya-q5', 'E', 'Avrupa Birliği üyeliği otomatik olarak gerçekleşmiştir.', 5);

-- TARİH GENEL KRONOLOJİ (5 soru)
insert into public.content_questions (id, topic_id, type, difficulty, stem, correct_choice_id, explanation, exam_tip, tags, sort_order) values
('genel-kronoloji-q1', 'genel-kronoloji', 'chronology', 'orta',
 'Aşağıdaki olayların kronolojik sıralaması hangisinde doğru verilmiştir?',
 'A', 'Doğru sıralama: Malazgirt (1071) → İstanbul''un fethi (1453) → Tanzimat (1839) → Lozan (1923) → NATO üyeliği (1952).', 'Dönemler arası kronoloji sorularında yüzyıl filtresi kur, sonra tarih sırala.', '["kronoloji", "genel tekrar", "karma"]', 1),
('genel-kronoloji-q2', 'genel-kronoloji', 'case', 'orta',
 'Aşağıdaki eşleştirmelerden hangisi yanlıştır?',
 'D', 'Divan-ı Lügat-it Türk Kaşgarlı Mahmut tarafından yazılmıştır, Yusuf Has Hacip''e değil. Kutadgu Bilig ise Yusuf Has Hacip''in eseridir.', 'Kaşgarlı Mahmut = Divan-ı Lügat-it Türk; Yusuf Has Hacip = Kutadgu Bilig. Bu karıştırma klasik bir KPSS tuzağıdır.', '["Kaşgarlı Mahmut", "Yusuf Has Hacip", "eser eşleştirme"]', 2),
('genel-kronoloji-q3', 'genel-kronoloji', 'single', 'orta',
 'Aşağıdakilerin hangisinde "olay – sonucu" ilişkisi yanlış verilmiştir?',
 'B', 'I. Dünya Savaşı''nın sonucu olarak Osmanlı toprak kaybetmiş, savaştan yenik çıkmıştır. Kapitülasyonların kaldırılması Lozan''ın sonucudur, I. Dünya Savaşı''nın değil.', 'Olay-sonuç sorularında önce "hangi antlaşmayla" sorusunu kendine sor.', '["neden-sonuç", "antlaşma", "karma"]', 3),
('genel-kronoloji-q4', 'genel-kronoloji', 'single', 'ileri',
 'KPSS Tarih sorularında en sık karıştırılan kavram çifti hangisidir?',
 'E', 'Saltanat (kaldırılma 1922) - Halifelik (kaldırılma 1924) karıştırılması sınavda en çok hata yapılan alandır. Bu iki kurumun tarihleri ve kaldırılma gerekçeleri ayrı ayrı öğrenilmelidir.', 'Saltanat = 1922, Halifelik = 1924. İkisi birbirinden tam olarak iki yıl farklı.', '["saltanat", "halifelik", "sık hata"]', 4),
('genel-kronoloji-q5', 'genel-kronoloji', 'case', 'ileri',
 'Aşağıdaki antlaşma-konu eşleştirmelerinden hangisi doğrudur?',
 'C', 'Mondros = Osmanlı''nın I. Dünya Savaşı''ndan çekilişi. Sevr = İstanbul hükümetinin imzaladığı ancak Türkiye''nin tanımadığı antlaşma. Lozan = Yeni Türkiye''nin uluslararası tanınması.', 'Mondros - Sevr - Lozan üçlüsünü tarihleri ve içerikleriyle birlikte karşılaştırmalı öğren.', '["Mondros", "Sevr", "Lozan", "antlaşma"]', 5);

insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('genel-kronoloji-q1', 'A', 'Malazgirt → İstanbul''un fethi → Tanzimat → Lozan → NATO', 1), ('genel-kronoloji-q1', 'B', 'İstanbul''un fethi → Malazgirt → Tanzimat → NATO → Lozan', 2), ('genel-kronoloji-q1', 'C', 'Tanzimat → Malazgirt → Lozan → NATO → İstanbul''un fethi', 3), ('genel-kronoloji-q1', 'D', 'Lozan → İstanbul''un fethi → Malazgirt → Tanzimat → NATO', 4), ('genel-kronoloji-q1', 'E', 'NATO → Lozan → Tanzimat → İstanbul''un fethi → Malazgirt', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('genel-kronoloji-q2', 'A', 'Orhun Yazıtları – Bilge Kağan döneminde dikilmiştir.', 1), ('genel-kronoloji-q2', 'B', 'Kutadgu Bilig – Yusuf Has Hacip tarafından yazılmıştır.', 2), ('genel-kronoloji-q2', 'C', 'Nizamiye Medresesi – Nizamülmülk tarafından kurulmuştur.', 3), ('genel-kronoloji-q2', 'D', 'Divan-ı Lügat-it Türk – Yusuf Has Hacip tarafından yazılmıştır.', 4), ('genel-kronoloji-q2', 'E', 'Kanunuesasi – 1876''da ilan edilmiştir.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('genel-kronoloji-q3', 'A', 'Malazgirt Savaşı – Anadolu''nun Türklere kapısının açılması.', 1), ('genel-kronoloji-q3', 'B', 'I. Dünya Savaşı – Kapitülasyonların kaldırılması.', 2), ('genel-kronoloji-q3', 'C', 'Sivas Kongresi – Ulusal direniş örgütlenmesinin güçlenmesi.', 3), ('genel-kronoloji-q3', 'D', 'Mondros Ateşkesi – Osmanlı''nın I. Dünya Savaşı''ndan çekilmesi.', 4), ('genel-kronoloji-q3', 'E', 'Kösedağ Savaşı – Anadolu Selçuklularının Moğol egemenliğine girmesi.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('genel-kronoloji-q4', 'A', 'Tanzimat – Islahat Fermanı karıştırılması.', 1), ('genel-kronoloji-q4', 'B', 'Erzurum – Sivas Kongresi karıştırılması.', 2), ('genel-kronoloji-q4', 'C', 'Mondros – Lozan Antlaşması karıştırılması.', 3), ('genel-kronoloji-q4', 'D', 'Balkan Antantı – Sadabat Paktı karıştırılması.', 4), ('genel-kronoloji-q4', 'E', 'Saltanat (1922) – Halifelik (1924) kaldırılma tarihleri karıştırılması.', 5);
insert into public.content_question_choices (question_id, choice_id, text, sort_order) values
('genel-kronoloji-q5', 'A', 'Lozan – Osmanlı''nın I. Dünya Savaşı''ndan çekilmesidir.', 1), ('genel-kronoloji-q5', 'B', 'Mondros – Türkiye''nin bağımsızlığını uluslararası arenada tescil eder.', 2), ('genel-kronoloji-q5', 'C', 'Lozan – Yeni Türkiye''nin uluslararası tanınmasını sağlamıştır.', 3), ('genel-kronoloji-q5', 'D', 'Sevr – TBMM hükümeti tarafından kabul edilmiştir.', 4), ('genel-kronoloji-q5', 'E', 'Mudanya – Türkiye''nin nihai barış antlaşmasıdır.', 5);

-- ============================================================
-- 3. 40 DENEME SINAVI
-- ============================================================

insert into public.content_exams (id, title, description, duration_minutes, question_count, difficulty, sort_order) values
('deneme-1', 'KPSS Tarih Karma Deneme 1', 'Tüm dönemlerden dengeli seçilmiş 40 soruluk genel tekrar denemesi.', 50, 40, 'karma', 1),
('deneme-2', 'KPSS Tarih Karma Deneme 2', 'İslamiyet öncesi ve Türk-İslam dönemlerine ağırlık veren 40 soruluk deneme.', 50, 40, 'karma', 2),
('deneme-3', 'KPSS Tarih Karma Deneme 3', 'Osmanlı kuruluş, yükseliş ve kültür konularına odaklanan 40 soruluk deneme.', 50, 40, 'karma', 3),
('deneme-4', 'KPSS Tarih Karma Deneme 4', 'Osmanlı yenileşme ve demokratikleşme sürecini inceleyen 40 soruluk deneme.', 50, 40, 'karma', 4),
('deneme-5', 'KPSS Tarih Karma Deneme 5', 'Milli Mücadele hazırlık ve Kurtuluş Savaşı''na odaklanan 40 soruluk deneme.', 50, 40, 'karma', 5),
('deneme-6', 'KPSS Tarih Karma Deneme 6', 'Atatürk ilke ve inkılaplarına odaklanan 40 soruluk deneme.', 50, 40, 'karma', 6),
('deneme-7', 'KPSS Tarih Karma Deneme 7', 'Cumhuriyet dönemi dış politika ve çağdaş Türk tarihi odaklı 40 soruluk deneme.', 50, 40, 'karma', 7),
('deneme-8', 'KPSS Tarih Kolay Deneme 1', 'Temel bilgi ve doğrudan kavram sorularından oluşan kolay 40 soruluk deneme.', 45, 40, 'kolay', 8),
('deneme-9', 'KPSS Tarih Kolay Deneme 2', 'Kronolojik sıralama ve eşleştirme ağırlıklı kolay 40 soruluk deneme.', 45, 40, 'kolay', 9),
('deneme-10', 'KPSS Tarih Kolay Deneme 3', 'Temel kavram tanımlarına yönelik kolay 40 soruluk deneme.', 45, 40, 'kolay', 10),
('deneme-11', 'KPSS Tarih Orta Deneme 1', 'Neden-sonuç ilişkisi ve dönem karşılaştırması içeren orta 40 soruluk deneme.', 50, 40, 'orta', 11),
('deneme-12', 'KPSS Tarih Orta Deneme 2', 'Kurum ve kişi eşleştirmesi ağırlıklı orta 40 soruluk deneme.', 50, 40, 'orta', 12),
('deneme-13', 'KPSS Tarih Orta Deneme 3', 'Tarihsel gelişme akışı odaklı orta 40 soruluk deneme.', 50, 40, 'orta', 13),
('deneme-14', 'KPSS Tarih Zor Deneme 1', 'Çeldirici şıklar ve yoruma dayalı sorular içeren zor 40 soruluk deneme.', 55, 40, 'zor', 14),
('deneme-15', 'KPSS Tarih Zor Deneme 2', 'Karşılaştırma ve analiz becerisi gerektiren zor 40 soruluk deneme.', 55, 40, 'zor', 15),
('deneme-16', 'KPSS Tarih Zor Deneme 3', 'Dönemler arası bağlantı ve sık hata analizi içeren zor 40 soruluk deneme.', 55, 40, 'zor', 16),
('deneme-17', 'İslamiyet Öncesi Türk Tarihi Odaklı Deneme', 'İslamiyet öncesi konu ve kavramlarına yoğunlaşan 40 soruluk özel deneme.', 50, 40, 'karma', 17),
('deneme-18', 'Türk-İslam Dönemi Odaklı Deneme', 'Karahanlı, Gazneli ve Büyük Selçuklu dönemlerine yönelik 40 soruluk deneme.', 50, 40, 'karma', 18),
('deneme-19', 'Anadolu Selçuklu ve Beylikler Odaklı Deneme', 'Anadolu Selçuklu kurumları ve beylikler dönemine odaklanan 40 soruluk deneme.', 50, 40, 'karma', 19),
('deneme-20', 'Osmanlı Kuruluş ve Yükseliş Odaklı Deneme', 'Osmanlı''nın kuruluşu ve yükseliş dönemini kapsayan 40 soruluk deneme.', 50, 40, 'karma', 20),
('deneme-21', 'Osmanlı Kültür ve Medeniyet Odaklı Deneme', 'Osmanlı kurumları, toprak sistemi ve toplum yapısı odaklı 40 soruluk deneme.', 50, 40, 'karma', 21),
('deneme-22', 'Osmanlı Yenileşme Odaklı Deneme', 'Tanzimat''tan Meşrutiyet''e uzanan yenileşme süreci odaklı 40 soruluk deneme.', 50, 40, 'karma', 22),
('deneme-23', 'Milli Mücadele Hazırlık Odaklı Deneme', 'Mondros''tan TBMM''nin açılışına kadar milli mücadele hazırlık odaklı 40 soruluk deneme.', 50, 40, 'karma', 23),
('deneme-24', 'Kurtuluş Savaşı ve Antlaşmalar Odaklı Deneme', 'Cepheler, diplomatik süreç ve antlaşmalar odaklı 40 soruluk deneme.', 50, 40, 'karma', 24),
('deneme-25', 'Atatürk İlke ve İnkılapları Odaklı Deneme', 'Cumhuriyet inkılaplarını ilkeler çerçevesinde inceleyen 40 soruluk deneme.', 50, 40, 'karma', 25),
('deneme-26', 'Cumhuriyet Dönemi Dış Politika Odaklı Deneme', 'Lozan sonrası dış politika ve uluslararası ilişkiler odaklı 40 soruluk deneme.', 50, 40, 'karma', 26),
('deneme-27', 'Çağdaş Türk ve Dünya Tarihi Odaklı Deneme', 'Soğuk Savaş, NATO ve yakın dönem Türkiye tarihi odaklı 40 soruluk deneme.', 50, 40, 'karma', 27),
('deneme-28', 'KPSS Tarih Hızlı Tekrar Denemesi 1', 'Yoğun tempo için tasarlanmış 40 soruluk hızlı tekrar denemesi.', 40, 40, 'karma', 28),
('deneme-29', 'KPSS Tarih Hızlı Tekrar Denemesi 2', 'Kısa sürede geniş konu taraması yapan 40 soruluk hızlı tekrar denemesi.', 40, 40, 'karma', 29),
('deneme-30', 'KPSS Tarih Hızlı Tekrar Denemesi 3', 'Farklı zorluk seviyelerini harmanlayan 40 soruluk hızlı tekrar denemesi.', 40, 40, 'karma', 30),
('deneme-31', 'KPSS Tarih Simülasyon Denemesi 1', 'Gerçek KPSS sınav koşullarını simüle eden 40 soruluk deneme.', 50, 40, 'karma', 31),
('deneme-32', 'KPSS Tarih Simülasyon Denemesi 2', 'Gerçek sınav ortamını yansıtan 40 soruluk ikinci simülasyon denemesi.', 50, 40, 'karma', 32),
('deneme-33', 'KPSS Tarih Simülasyon Denemesi 3', 'Gerçek sınav ortamını yansıtan 40 soruluk üçüncü simülasyon denemesi.', 50, 40, 'karma', 33),
('deneme-34', 'Kronoloji Ustası Denemesi 1', 'Kronolojik sıralama ve tarih belirleme ağırlıklı 40 soruluk özel deneme.', 50, 40, 'orta', 34),
('deneme-35', 'Kronoloji Ustası Denemesi 2', 'Dönemler arası zaman çizelgesi odaklı 40 soruluk ikinci kronoloji denemesi.', 50, 40, 'zor', 35),
('deneme-36', 'Kavram Analizi Denemesi 1', 'Tarihi kavramların doğru tanımı ve dönem bağlantısını ölçen 40 soruluk deneme.', 50, 40, 'orta', 36),
('deneme-37', 'Kavram Analizi Denemesi 2', 'İleri düzey kavram analizi gerektiren 40 soruluk deneme.', 55, 40, 'zor', 37),
('deneme-38', 'Sınav Öncesi Son Tekrar Denemesi 1', 'Sınav öncesi en kritik konuları kapsayan 40 soruluk son tekrar denemesi.', 50, 40, 'karma', 38),
('deneme-39', 'Sınav Öncesi Son Tekrar Denemesi 2', 'En sık sorulan konu ve kavramları içeren 40 soruluk son tekrar denemesi.', 50, 40, 'karma', 39),
('deneme-40', 'KPSS Tarih Final Denemesi', 'Tüm kazanımları final düzeyinde ölçen 40 soruluk kapsamlı deneme.', 55, 40, 'karma', 40);

-- Deneme-soru bağlantıları (her deneme mevcut soruları döngüsel olarak kullanır)
-- Deneme 1: tüm sorular karma
insert into public.content_exam_questions (exam_id, question_id, sort_order)
select 'deneme-1', id, row_number() over (order by topic_id, sort_order)
from public.content_questions where is_published = true limit 40;

-- Deneme 2-7: konu odaklı denemeler (her biri farklı konu ağırlığı)
insert into public.content_exam_questions (exam_id, question_id, sort_order)
select 'deneme-2', id, row_number() over (order by topic_id, sort_order)
from public.content_questions where topic_id in ('islamiyet-oncesi', 'turk-islam') limit 40;

insert into public.content_exam_questions (exam_id, question_id, sort_order)
select 'deneme-3', id, row_number() over (order by topic_id, sort_order)
from public.content_questions where topic_id in ('osmanli-kurulus-yukselis', 'osmanli-kultur-medeniyet') limit 40;

insert into public.content_exam_questions (exam_id, question_id, sort_order)
select 'deneme-4', id, row_number() over (order by topic_id, sort_order)
from public.content_questions where topic_id in ('osmanli-yenilesme', 'osmanli-kultur-medeniyet') limit 40;

insert into public.content_exam_questions (exam_id, question_id, sort_order)
select 'deneme-5', id, row_number() over (order by topic_id, sort_order)
from public.content_questions where topic_id in ('milli-mucadele-hazirlik', 'kurtulus-savasi') limit 40;

insert into public.content_exam_questions (exam_id, question_id, sort_order)
select 'deneme-6', id, row_number() over (order by topic_id, sort_order)
from public.content_questions where topic_id in ('ataturk-ilke-inkilap', 'milli-mucadele-hazirlik') limit 40;

insert into public.content_exam_questions (exam_id, question_id, sort_order)
select 'deneme-7', id, row_number() over (order by topic_id, sort_order)
from public.content_questions where topic_id in ('cumhuriyet-dis-politika', 'cagdas-turk-dunya') limit 40;

-- Deneme 8-40: döngüsel olarak tüm soruları kullan
do $$
declare
  exam_num int;
  topic_ids text[];
  q_ids text[];
  offset_val int;
begin
  for exam_num in 8..40 loop
    insert into public.content_exam_questions (exam_id, question_id, sort_order)
    select
      'deneme-' || exam_num,
      id,
      row_number() over (order by random())
    from public.content_questions
    where is_published = true
    order by random()
    limit 40
    on conflict (exam_id, question_id) do nothing;
  end loop;
end $$;
