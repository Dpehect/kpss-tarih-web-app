import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "src");

const forbidden = [
  /yellow-\d+/gi,
  /amber-\d+/gi,
  /lime-\d+/gi,
  /#d7ff4f/gi,
  /#facc15/gi,
  /#fbbf24/gi,
  /#f59e0b/gi,
  /#eab308/gi,
  /#f6c66d/gi,
  /#dba34a/gi,
  /#c9a227/gi
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

  for (const pattern of forbidden) {
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
  console.error("Sarı/amber/lime renk kullanımı tespit edildi:");
  for (const issue of issues) {
    console.error(`- ${issue.file}: ${issue.matches.join(", ")}`);
  }
  process.exit(1);
}

console.log("No-yellow audit başarılı.");
