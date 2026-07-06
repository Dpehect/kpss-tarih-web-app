import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const dataFile = path.join(process.cwd(), "src/data/kpss-history.ts");

if (!fs.existsSync(dataFile)) {
  console.error("src/data/kpss-history.ts bulunamadı.");
  process.exit(1);
}

const content = fs.readFileSync(dataFile);
const hash = crypto.createHash("sha256").update(content).digest("hex");

console.log(`kpss-history.ts sha256: ${hash}`);
console.log("Bu script hash bildirir; data değişmediğini doğrulamak için patch öncesi/sonrası hash'i karşılaştır.");
