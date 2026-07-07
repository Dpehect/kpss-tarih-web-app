import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function update(file, updater) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    console.warn(`Atlandı, dosya yok: ${file}`);
    return;
  }

  const before = fs.readFileSync(full, "utf8");
  const after = updater(before);

  if (after !== before) {
    fs.writeFileSync(full, after, "utf8");
    console.log(`Güncellendi: ${file}`);
  } else {
    console.log(`Zaten temiz: ${file}`);
  }
}

update("src/features/topics/components/TopicDetailPage.tsx", (source) => {
  if (!source.includes('ReactNode')) return source;

  if (!source.includes('import type { ReactNode } from "react";')) {
    source = `import type { ReactNode } from "react";\n${source}`;
  }

  return source;
});

update("src/features/topics/components/TopicsPage.tsx", (source) => {
  if (!source.includes("ReactNode")) return source;

  if (source.includes('import { useMemo, useState } from "react";')) {
    source = source.replace(
      'import { useMemo, useState } from "react";',
      'import { useMemo, useState, type ReactNode } from "react";'
    );
  } else if (
    !source.includes('type ReactNode') &&
    !source.includes('import type { ReactNode } from "react";')
  ) {
    source = source.replace('"use client";\n\n', '"use client";\n\nimport type { ReactNode } from "react";\n');
  }

  return source;
});

update("src/features/dashboard/components/DashboardPage.tsx", (source) => {
  if (!source.includes("React.ReactNode") && !source.includes("ReactNode")) return source;

  source = source.replaceAll("React.ReactNode", "ReactNode");

  if (!source.includes('import type { ReactNode } from "react";')) {
    source = source.replace('"use client";\n\n', '"use client";\n\nimport type { ReactNode } from "react";\n');
  }

  return source;
});

console.log("ReactNode direct build fix tamamlandı.");
