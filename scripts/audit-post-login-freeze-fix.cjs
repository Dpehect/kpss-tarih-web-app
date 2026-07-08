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
const deferred = read("src/components/core/DeferredOnlineProgressHydrator.tsx");
const hydrator = read("src/components/core/OnlineProgressHydrator.tsx");
const topicPage = read("src/features/question-bank/components/TopicQuestionPage.tsx");
const callback = read("src/app/auth/callback/route.ts");

const checks = [
  {
    label: "Providers DeferredOnlineProgressHydrator kullanıyor",
    ok: providers.includes("DeferredOnlineProgressHydrator")
  },
  {
    label: "Dashboard için post-login sync gecikmesi var",
    ok: deferred.includes('pathname.startsWith("/dashboard")') && deferred.includes("4200")
  },
  {
    label: "Login/auth route'larında progress hydrator çalışmıyor",
    ok: deferred.includes('"/login"') && deferred.includes('"/auth/callback"')
  },
  {
    label: "OnlineProgressHydrator sync işini timeout ile erteliyor",
    ok: hydrator.includes("window.setTimeout") && hydrator.includes("800")
  },
  {
    label: "Supabase test fetch terminal log'u var",
    ok: topicPage.includes("Supabase’den parça parça yükleniyor")
  },
  {
    label: "Auth callback recent login cookie set ediyor",
    ok: callback.includes("softbridge_recent_login")
  }
];

let failed = 0;

console.log("Post-login freeze + Supabase log denetimi");
console.log("========================================");

for (const check of checks) {
  console.log(`${check.ok ? "✓" : "✗"} ${check.label}`);
  if (!check.ok) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} kontrol başarısız.`);
  process.exit(1);
}

console.log("\nTüm kontroller geçti.");
