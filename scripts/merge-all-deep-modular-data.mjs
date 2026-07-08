import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const bridgePath = path.join(root, "src/data/kpss-history.ts");
const bridge = `export {
  topics,
  questions,
  flashcards,
  timelineEvents,
  glossary,
  exams,
  recommendations,
  getTopicBySlug,
  getTopicById,
  getQuestionsByTopic,
  getFlashcardsByTopic,
  getTimelineEventsByTopic,
  getGlossaryByTopic,
} from "@/data/kpss";
`;
if (fs.existsSync(path.join(root, "src/data/kpss/index.ts"))) {
  fs.writeFileSync(bridgePath, bridge);
  console.log("[merge-all-deep-modular-data] kpss-history bridge modüler veri havuzuna bağlandı.");
} else {
  console.log("[merge-all-deep-modular-data] modüler veri klasörü bulunamadı, işlem atlandı.");
}
