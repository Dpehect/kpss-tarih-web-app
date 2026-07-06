import { ArrowRight, FileQuestion } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { questions, topics } from "@/data/kpss-history";

export function QuestionBankPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Konu Testleri"
        title="Her konu kendi test ekranında."
        description="Soru bankası artık side panel mantığıyla değil, her konunun ayrı ve odaklı test sayfası olacak şekilde düzenlendi. Bu yapı hem kullanıcı deneyimi hem SEO için daha temizdir."
        actions={
          <a href="/question-bank/all" className="btn-gold">
            Karma teste başla
            <ArrowRight size={18} />
          </a>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((topic, index) => {
          const topicQuestions = questions.filter((question) => question.topicId === topic.id);

          return (
            <a
              key={topic.id}
              href={`/question-bank/${topic.id}`}
              className="group relative overflow-hidden rounded-xl border border-black/[0.08] bg-[white]/78 p-6 shadow-[0_20px_70px_rgba(18,24,38,0.08)] transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_90px_rgba(18,24,38,0.13)]"
            >
              <div className="absolute right-[-2rem] top-[-2rem] size-28 rounded-full bg-[#2447d8]/10 blur-2xl transition group-hover:bg-[#2447d8]/18" />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[var(--ink)] text-[white]">
                    <FileQuestion size={20} />
                  </span>
                  <span className="rounded-full border border-black/[0.08] bg-white/60 px-3 py-1 text-xs font-semibold text-[#425066]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-semibold tracking-tight">{topic.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#425066]">
                  Bu konu için {topicQuestions.length} açıklamalı soru. Cevap sonrası gerekçe ve KPSS ipucu görünür.
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-black/[0.08] pt-4">
                  <span className="text-sm font-semibold text-[var(--ink)]">Teste gir</span>
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          );
        })}
      </section>
    </div>
  );
}
