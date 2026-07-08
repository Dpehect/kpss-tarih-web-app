import { readFileSync } from "node:fs";
const source = readFileSync("src/data/kpss-history.ts", "utf8");
const required = ["Put Kırıcı", "Gazneli Mahmut", "Sened-i İttifak", "Tanzimat Fermanı", "Kanun-i Esasi", "Miryokefalon", "Kösedağ", "Montrö", "Hatay"];
const missing = required.filter((item) => !source.includes(item));
if (missing.length) {
  console.error(`[audit-expanded-kpss-history] Eksik kritik bilgi: ${missing.join(", ")}`);
  process.exit(1);
}
const qCount = (source.match(/"id": "q-/g) || []).length;
const topicCount = (source.match(/"slug":/g) || []).length;
if (topicCount < 13 || qCount < 150) {
  console.error(`[audit-expanded-kpss-history] Veri havuzu yetersiz: ${topicCount} konu, ${qCount} soru`);
  process.exit(1);
}
if (/site havuzunda net eşleştiremedim|model anahtarı|api key|sallama cevap/i.test(source)) {
  console.error("[audit-expanded-kpss-history] Kullanıcıya gösterilmemesi gereken teknik/kötü chatbot metni bulundu.");
  process.exit(1);
}
console.log(`[audit-expanded-kpss-history] OK: ${topicCount} konu, ${qCount} özgün soru ve kritik bilgi kontrolü geçti.`);
