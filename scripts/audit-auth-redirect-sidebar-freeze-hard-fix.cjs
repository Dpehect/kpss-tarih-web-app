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

const providers = read("src/app/providers.tsx");
const callback = read("src/app/auth/callback/route.ts");
const appShell = read("src/components/core/AppShell.tsx");
const css = read("src/app/hard-click-freeze-fix.css");
const layout = read("src/app/layout.tsx");

const checks = [
  {
    label: "Providers global progress hydrator çalıştırmıyor",
    ok: !providers.includes("OnlineProgressHydrator") && !providers.includes("DeferredOnlineProgressHydrator")
  },
  {
    label: "Auth callback next=/ durumunda dashboard'a yönlendiriyor",
    ok: callback.includes('value === "/"') && callback.includes('return "/dashboard"')
  },
  {
    label: "AppShell safe sidebar kullanıyor",
    ok: appShell.includes('data-safe-sidebar="true"') && appShell.includes("z-[1000]")
  },
  {
    label: "Ana içerik desktop'ta sidebar dışına alınıyor",
    ok: appShell.includes("md:ml-72")
  },
  {
    label: "Sidebar linkleri geniş hitbox kullanıyor",
    ok: appShell.includes("min-h-[52px]") && appShell.includes('data-safe-click="true"')
  },
  {
    label: "Hard click CSS layout'a import edilmiş",
    ok: layout.includes('import "@/app/hard-click-freeze-fix.css";')
  },
  {
    label: "Dekoratif katmanlar click yemiyor",
    ok: css.includes("pointer-events: none !important") && css.includes("blur")
  }
];

let failed = 0;

console.log("Auth redirect + sidebar freeze hard fix denetimi");
console.log("================================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\n✓ Hard fix kontrolleri geçti.");
