import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "src", "app", "page.tsx");

if (!fs.existsSync(file)) {
  console.error("Bulunamadı:", path.relative(process.cwd(), file));
  process.exit(1);
}

let source = fs.readFileSync(file, "utf8");

const replacements = [
  ["Tembel kullanıcı modu", "Akıllı başlangıç modu"],
  ["Düşünme.", "Karar yükünü azalt."],
  ["Çalışmaya gir.", "Çalışmaya başla."],
  [
    "KPSS Tarih için konu, test, tekrar, deneme ve analiz tek kokpitte. Karar vermekle uğraşma; sayfa seni en kısa yoldan çalışmaya sokar.",
    "KPSS Tarih için konu, test, tekrar, deneme ve analiz tek kokpitte. Kullanıcıyı kararsız bırakmadan en kısa yoldan çalışmaya başlatır."
  ],
  ["Bana çalışma seç", "Çalışma rotası oluştur"],
  ["30 soruluk hızlı test", "30 soruluk hızlı başlangıç"],
  ["Bugünün görevi", "Bugünün çalışma rotası"],
  ["25 dakikalık net çalışma", "25 dakikalık odak oturumu"],
  [
    "Ne çalışacağım diye düşünme. Plan ekranı seni sıraya sokar.",
    "Konu seçme yükünü azaltır; plan ekranı sıradaki mantıklı adımı gösterir."
  ],
  [
    "Konu seçmeden 30 soruluk karışık testle ısın.",
    "Konu seçmeden 30 soruluk karışık testle hızlı durum kontrolü yap."
  ],
  [
    "Yeni konu açmadan önce eksiklerini kapat.",
    "Yeni konuya geçmeden önce eksik kalan noktaları kapat."
  ],
  ["Dört değil, tek karar: başla.", "Tek karar: başla."],
  [
    "Bu ana sayfa her girişte sana üç şey sunar: hızlı başlangıç, net rota ve öncelikli konu. Bu yüzden sayfa artık boş değil; yönlendiren bir kontrol merkezi.",
    "Bu ana sayfa her girişte üç şeyi netleştirir: hızlı başlangıç, çalışma rotası ve öncelikli konu. Böylece ekran sadece güzel görünmez; kullanıcıyı doğrudan aksiyona taşır."
  ],
  ["Az karar", "Az sürtünme"],
  ["Ana aksiyonlar tek yerde.", "Ana aksiyonlar tek ekranda."],
  ["Tasarım için değil, seni hızlıca çalışmaya sokmak için düzenlendi.", "Sadece vitrin değil; kullanıcıyı hızlıca çalışmaya başlatan bir kontrol merkezi olarak düzenlendi."]
];

for (const [from, to] of replacements) {
  source = source.split(from).join(to);
}

fs.writeFileSync(file, source, "utf8");

console.log("Ana sayfa metinleri profesyonel tona çekildi.");
