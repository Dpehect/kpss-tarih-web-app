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

const mainLayout = read("src/app/(main)/layout.tsx");
const appShell = read("src/components/core/AppShell.tsx");
const providers = read("src/app/providers.tsx");
const middleware = read("src/lib/supabase/middleware.ts");
const callback = read("src/app/auth/callback/route.ts");
const authPanel = read("src/features/auth/components/AuthPanel.tsx");
const pageTransition = read("src/components/motion/PageTransition.tsx");
const css = read("src/app/instant-shell-turbo.css");
const layout = read("src/app/layout.tsx");

const checks = [
  {
    label: "Main layout AppShell ile sarıyor",
    ok: mainLayout.includes("<AppShell>{children}</AppShell>")
  },
  {
    label: "AppShell client hook kullanmıyor",
    ok: !appShell.includes('"use client"') && !appShell.includes("usePathname") && !appShell.includes("useUIStore")
  },
  {
    label: "AppShell turbo sidebar ve geniş link hitbox kullanıyor",
    ok: appShell.includes('data-turbo-sidebar="true"') && appShell.includes("min-h-[54px]")
  },
  {
    label: "Providers global hydrator çalıştırmıyor",
    ok: !providers.includes("OnlineProgressHydrator") && !providers.includes("DeferredOnlineProgressHydrator")
  },
  {
    label: "Middleware login olmuş kullanıcıyı /dashboard'a alıyor",
    ok: middleware.includes('pathname === "/"') && middleware.includes('url.pathname = "/dashboard"')
  },
  {
    label: "Auth callback next=/ için dashboard kullanıyor",
    ok: callback.includes('value === "/"') && callback.includes('return "/dashboard"')
  },
  {
    label: "AuthPanel güvenli next ve dashboard redirect kullanıyor",
    ok: authPanel.includes("getSafeNext") && authPanel.includes("window.location.replace(nextPath)")
  },
  {
    label: "PageTransition framer-motion kullanmıyor",
    ok: !pageTransition.includes("framer-motion") && !pageTransition.includes("motion.")
  },
  {
    label: "Instant turbo CSS layout'a import edilmiş",
    ok: layout.includes('import "@/app/instant-shell-turbo.css";')
  },
  {
    label: "Turbo CSS dekoratif katman click yemesini engelliyor",
    ok: css.includes("pointer-events: none !important") && css.includes("blur")
  }
];

let failed = 0;

console.log("Instant auth shell turbo denetimi");
console.log("=================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\n✓ Turbo shell kontrolleri geçti.");
