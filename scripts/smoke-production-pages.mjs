#!/usr/bin/env node
const base = (process.env.SMOKE_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const routes = [
  { path: "/", mustContain: ["KPSS", "Tarih"] },
  { path: "/dashboard", mustContain: ["Hoş geldin", "Çözülen Soru"] },
  { path: "/topics", mustContain: ["12", "İslamiyet Öncesi"] },
  { path: "/question-bank", mustContain: ["Konu Testleri", "Teste gir"] },
  { path: "/flashcards", mustContain: ["Kart"] },
  { path: "/analytics", mustContain: ["Analiz"] },
];

const failures = [];
console.log(`Smoke testing ${base}`);
for (const route of routes) {
  const url = `${base}${route.path}`;
  const started = Date.now();
  try {
    const response = await fetch(url, { redirect: "follow" });
    const elapsed = Date.now() - started;
    const text = await response.text();
    const missing = route.mustContain.filter((needle) => !text.includes(needle));
    if (!response.ok) failures.push(`${route.path}: HTTP ${response.status}`);
    if (missing.length) failures.push(`${route.path}: missing content markers: ${missing.join(", ")}`);
    if (elapsed > 2500) failures.push(`${route.path}: slow response ${elapsed}ms`);
    console.log(`  ${route.path.padEnd(16)} ${response.status} ${elapsed}ms`);
  } catch (error) {
    failures.push(`${route.path}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.log("\nSmoke test failures:");
  for (const failure of failures) console.log(`  - ${failure}`);
  process.exit(1);
}
console.log("\nSmoke test passed. Core pages respond and expected data markers are present.\n");
