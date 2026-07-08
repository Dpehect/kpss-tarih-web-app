import process from "node:process";

const requiredTerms = [
  /gazneli\s+mahmut/i,
  /put\s+kırıcı|put\s+kirici/i,
  /sened[- ]?i\s+ittifak/i,
  /tanzimat/i,
  /i\.?\s*meşrutiyet|1\.?\s*meşrutiyet|kanun[- ]?i\s+esasi/i,
  /miryokefalon/i,
  /kösedağ|kosedag/i,
];

async function main() {
  const { topics, questions } = await import("../src/data/kpss-history.ts");
  const corpus = JSON.stringify({ topics, questions }).toLocaleLowerCase("tr-TR");

  for (const pattern of requiredTerms) {
    if (!pattern.test(corpus)) {
      throw new Error(`Eksik kritik bilgi: ${pattern}`);
    }
  }

  const badQuestions = questions.filter((question) => {
    if (!question?.id || !question?.stem || !question?.explanation) return true;
    const choiceIds = new Set((question.choices ?? []).map((choice) => choice.id));
    return !choiceIds.has(question.correctChoiceId);
  });

  if (badQuestions.length) {
    throw new Error(`correctChoiceId / açıklama problemi olan soru sayısı: ${badQuestions.length}`);
  }

  console.log(`[audit-question-bank-quality] OK: ${topics.length} konu, ${questions.length} soru ve kritik bilgi kontrolleri geçti.`);
}

main().catch((error) => {
  console.error("[audit-question-bank-quality]", error.message ?? error);
  process.exit(1);
});
