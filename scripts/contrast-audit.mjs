import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "src");

const unsafePatterns = [
  /text-white\/[0-5]\d/g,
  /text-\[#fff8ea\]\/[0-6]\d/g,
  /text-\[#fffaf0\]\/[0-6]\d/g,
  /text-\[#f4efe4\]\/[0-6]\d/g,
  /text-\[#ead7b7\]\/[0-9]\d/g,
  /text-\[#425066\]\/[0-5]\d/g,
  /text-\[var\(--muted-foreground\)\]\/[0-6]\d/g
];

const allowed = new Set(["src/app/globals.css"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.(tsx|ts|css)$/.test(entry.name)) files.push(full);
  }

  return files;
}

const issues = [];

for (const file of walk(root)) {
  const relative = path.relative(process.cwd(), file).replaceAll("\\", "/");
  if (allowed.has(relative)) continue;

  const text = fs.readFileSync(file, "utf8");

  for (const pattern of unsafePatterns) {
    const matches = text.match(pattern);
    if (matches?.length) {
      issues.push({
        file: relative,
        matches: Array.from(new Set(matches))
      });
    }
  }
}

if (issues.length) {
  console.error("Düşük kontrastlı text class tespit edildi:");
  for (const issue of issues) {
    console.error(`- ${issue.file}: ${issue.matches.join(", ")}`);
  }
  process.exit(1);
}

console.log("Contrast audit başarılı.");
