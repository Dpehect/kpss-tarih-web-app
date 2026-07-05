import { selectAdaptiveQuestions } from "@/lib/adaptive/select-adaptive-questions";
import questions from "@/data/questions.json";
import attempts from "@/data/user-attempts.seed.json";

export function QuestionBankShell() {
  const selected = selectAdaptiveQuestions({
    questions,
    attempts,
    count: 5,
    nowIso: new Date().toISOString()
  });

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase">Adaptive Engine</p>
        <h2 className="mt-3 text-5xl font-semibold tracking-[-0.06em]">Soru Bankası</h2>
        <p className="mt-4 max-w-2xl text-neutral-600">
          Bu liste kullanıcının yanlışlarına göre ağırlıklı seçim mantığıyla oluşur.
        </p>
      </div>
      <div className="grid gap-4">
        {selected.map((question) => (
          <article key={question.id} className="rounded-[2rem] border border-black/5 bg-white/65 p-6">
            <p className="text-sm text-neutral-500">{question.topicId} · {question.cognitiveSkill}</p>
            <h3 className="mt-2 text-xl font-semibold">{question.stem}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
