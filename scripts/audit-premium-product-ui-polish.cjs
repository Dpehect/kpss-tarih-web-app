const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

function read(relative) {
  const full = path.join(root, relative);
  if (!fs.existsSync(full)) {
    console.error(`Eksik dosya: ${relative}`);
    process.exit(1);
  }
  return fs.readFileSync(full, "utf8");
}

const home = read("src/app/page.tsx");
const shell = read("src/components/core/AppShell.tsx");
const dashboard = read("src/features/dashboard/components/DashboardPage.tsx");
const css = read("src/app/professional-polish.css");
const layout = read("src/app/layout.tsx");

const checks = [
  {
    label: "Ana sayfadan geliştirici dili kaldırıldı",
    ok: !home.includes("Supabase destekli") && !home.includes("Lazy") && !home.includes("local bundle")
  },
  {
    label: "Ana sayfa premium hero ve ürün dili kullanıyor",
    ok: home.includes("KPSS Tarih’i tek ekranda yönet") && home.includes("Kişisel çalışma komuta merkezi")
  },
  {
    label: "Sidebar hover geçişleri eklendi",
    ok: shell.includes("group/sidebar") && shell.includes("group-hover/sidebar") && shell.includes("duration-200")
  },
  {
    label: "Sidebar genişliği ve main offset uyumlu",
    ok: shell.includes("w-[19rem]") && shell.includes("md:ml-[19rem]") && shell.includes("md:left-[19rem]")
  },
  {
    label: "Dashboard tekrar premium görünüme alındı",
    ok: dashboard.includes("Bugünkü rotanı seç") && dashboard.includes("rounded-[2.75rem]")
  },
  {
    label: "Professional polish CSS var",
    ok: css.includes("professional-surface") && css.includes("will-change")
  },
  {
    label: "Professional polish CSS layout'a import edilmiş",
    ok: layout.includes('import "@/app/professional-polish.css";')
  }
];

let failed = 0;
console.log("Premium product UI polish denetimi");
console.log("==================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\n✓ Premium product UI polish hazır.");
