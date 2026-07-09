import { loadEncyclopedia } from "../src/data/kpss/encyclopedia/loader";
import { scoreEntries } from "../src/lib/search/scorer";

const runTest = (query: string) => {
  const entries = loadEncyclopedia();
  const scored = scoreEntries(query, entries);
  console.log(`\nQuery: "${query}"`);
  scored.slice(0, 3).forEach((item, idx) => {
    console.log(`  ${idx + 1}. Title: "${item.entry.title}" (Score: ${item.score})`);
  });
  if (scored.length === 0) console.log("  No matches.");
};

runTest("Tlas savasi");
runTest("talas savasi ne zaman oldu");
runTest("maniheizm yerlesik hayata gecen ilk devlet hangisi");
runTest("xyz savasi");
runTest("bunun hakkinda bilgi verir misin");


