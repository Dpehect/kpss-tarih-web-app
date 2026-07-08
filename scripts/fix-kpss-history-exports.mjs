import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const filePath = path.join(root, "src/data/kpss-history.ts");

if (!fs.existsSync(filePath)) {
  console.error("src/data/kpss-history.ts bulunamadi. Bu komutu proje kok klasorunde calistir.");
  process.exit(1);
}

let source = fs.readFileSync(filePath, "utf8");

function hasNamedExport(name) {
  const declaration = new RegExp(`export\\s+(?:const|let|var|function|class|type|interface)\\s+${name}\\b`);
  const grouped = new RegExp(`export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`, "s");
  return declaration.test(source) || grouped.test(source);
}

function hasLocalDeclaration(name) {
  const declaration = new RegExp(`(?:const|let|var|function|class|type|interface)\\s+${name}\\b`);
  return declaration.test(source);
}

const additions = [];

if (!hasNamedExport("glossary")) {
  if (hasLocalDeclaration("glossary")) {
    additions.push("export { glossary };");
  } else {
    additions.push(`export const glossary = flashcards.map((card, index) => {
  const source = card as Record<string, unknown>;

  const readText = (keys: string[], fallback = "") => {
    for (const key of keys) {
      const value = source[key];
      if (typeof value === "string" && value.trim()) return value;
      if (typeof value === "number") return String(value);
    }
    return fallback;
  };

  return {
    id: readText(["id"], \`glossary-\${index + 1}\`),
    term: readText(["term", "front", "question", "title"], \`Kavram \${index + 1}\`),
    definition: readText(["definition", "back", "answer", "content"], ""),
    topicId: readText(["topicId", "topic_id"], topics[0]?.id ?? "general"),
    relatedTerms: [],
    tags: [],
    example: "",
    whyImportant: ""
  };
});`);
  }
}

if (!hasNamedExport("getGlossaryByTopic")) {
  if (hasLocalDeclaration("getGlossaryByTopic")) {
    additions.push("export { getGlossaryByTopic };");
  } else {
    additions.push(`export function getGlossaryByTopic(topicId: string) {
  return glossary.filter((item) => item.topicId === topicId);
}`);
  }
}

if (!hasNamedExport("recommendations")) {
  if (hasLocalDeclaration("recommendations")) {
    additions.push("export { recommendations };");
  } else {
    additions.push("export const recommendations = studyRecommendations;");
  }
}

if (additions.length === 0) {
  console.log("src/data/kpss-history.ts zaten gerekli exportlara sahip.");
  process.exit(0);
}

source = `${source.trimEnd()}

// Build compatibility exports.
${additions.join("\n\n")}
`;

fs.writeFileSync(filePath, source, "utf8");
console.log("src/data/kpss-history.ts export uyumlulugu tamamlandi.");
