import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const fixes = [
  {
    file: "src/features/topics/components/TopicDetailPage.tsx",
    run(source) {
      if (!source.includes('import type { ReactNode } from "react";')) {
        source = `import type { ReactNode } from "react";\n${source}`;
      }

      return source;
    }
  },
  {
    file: "src/features/topics/components/TopicsPage.tsx",
    run(source) {
      source = source.replace(
        'import { useMemo, useState } from "react";',
        'import { useMemo, useState, type ReactNode } from "react";'
      );

      if (!source.includes('type ReactNode') && !source.includes('import type { ReactNode } from "react";')) {
        source = source.replace('"use client";\n\n', '"use client";\n\nimport type { ReactNode } from "react";\n');
      }

      return source;
    }
  },
  {
    file: "src/features/dashboard/components/DashboardPage.tsx",
    run(source) {
      if (!source.includes('import type { ReactNode } from "react";')) {
        source = source.replace('"use client";\n\n', '"use client";\n\nimport type { ReactNode } from "react";\n');
      }

      source = source.replaceAll("React.ReactNode", "ReactNode");

      return source;
    }
  }
];

for (const fix of fixes) {
  const absolute = path.join(root, fix.file);

  if (!fs.existsSync(absolute)) {
    console.warn(`Atlandı, dosya yok: ${fix.file}`);
    continue;
  }

  const before = fs.readFileSync(absolute, "utf8");
  const after = fix.run(before);

  if (after !== before) {
    fs.writeFileSync(absolute, after, "utf8");
    console.log(`Güncellendi: ${fix.file}`);
  } else {
    console.log(`Zaten temiz: ${fix.file}`);
  }
}

console.log("ReactNode type import düzeltmesi tamamlandı.");
