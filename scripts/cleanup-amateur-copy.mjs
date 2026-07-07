import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const replacements = [
  [
    "İçerikler JSON’da kalır; yalnızca sana ait çalışma verileri online saklanır.",
    "İlerlemen güvenli şekilde hesabınla eşleşir; kaldığın yerden devam edersin."
  ],
  [
    "İçerikler JSON'da kalır. Sadece kullanıcıya ait çalışma verileri Supabase'e yazılır.",
    "İlerlemen güvenli şekilde hesabınla eşleşir; kaldığın yerden devam edersin."
  ],
  [
    "Konu ilerlemen, soru cevapların, yanlışların, deneme sonuçların, flashcard tekrarların ve notların Supabase üzerinde saklanır.",
    "Konu ilerlemen, test sonuçların, yanlışların ve tekrarların kişisel çalışma hesabında tutulur."
  ],
  [
    "Giriş yapınca tüm istatistiklerin online kaydedilir.",
    "Kişisel çalışma panelin her cihazda seninle gelir."
  ],
  [
    "Google ile giriş yap, ilerlemeni online sakla.",
    "Hesabınla giriş yap, çalışmaya kaldığın yerden devam et."
  ],
  [
    "Supabase üzerinde saklanır.",
    "kişisel çalışma hesabında tutulur."
  ],
  [
    "Supabase'e yazılır",
    "çalışma hesabınla eşleşir"
  ],
  [
    "Supabase’e yazılır",
    "çalışma hesabınla eşleşir"
  ],
  [
    "JSON’da kalır",
    "platform içinde yönetilir"
  ],
  [
    "JSON'da kalır",
    "platform içinde yönetilir"
  ],
  [
    "online saklanır",
    "hesabınla eşleşir"
  ],
  [
    "online kaydedilir",
    "hesabınla eşleşir"
  ]
];

const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".md"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(full);
    }
  }

  return files;
}

let changed = 0;

for (const file of walk(path.join(root, "src"))) {
  const before = fs.readFileSync(file, "utf8");
  let after = before;

  for (const [from, to] of replacements) {
    after = after.split(from).join(to);
  }

  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed += 1;
    console.log(`Temizlendi: ${path.relative(root, file)}`);
  }
}

console.log(`Profesyonel metin temizliği tamamlandı. Güncellenen dosya: ${changed}`);
