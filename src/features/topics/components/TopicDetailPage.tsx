import { notFound } from "next/navigation";
import { PageHeader } from "@/components/core/PageHeader";
import { getFlashcardsByTopic, getGlossaryByTopic, getQuestionsByTopic, getTopicBySlug } from "@/data/kpss-history";
import { MarkTopicCompleteButton } from "@/features/topics/components/MarkTopicCompleteButton";

/**
 * Tek konu detay sayfası.
 */
export function TopicDetailPage({ slug }: { slug: string }) {
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const relatedQuestions = getQuestionsByTopic(topic.id);
  const relatedFlashcards = getFlashcardsByTopic(topic.id);
  const terms = getGlossaryByTopic(topic.id);

  return (
    <article className="space-y-6">
      <PageHeader
        eyebrow="Konu Detayı"
        title={topic.title}
        description={topic.shortDescription}
        actions={<MarkTopicCompleteButton topicId={topic.id} />}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[2rem] parchment-surface p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#ead7b7]/48">Sınav Önemi</p>
          <p className="mt-2 text-4xl font-black text-[#f6c465]">{topic.examImportance}%</p>
        </div>
        <div className="rounded-[2rem] parchment-surface p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#ead7b7]/48">Önerilen Süre</p>
          <p className="mt-2 text-4xl font-black text-[#52f2d0]">{topic.estimatedMinutes} dk</p>
        </div>
        <div className="rounded-[2rem] parchment-surface p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#ead7b7]/48">İlgili Soru</p>
          <p className="mt-2 text-4xl font-black text-[#ff7968]">{relatedQuestions.length}</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          {topic.summary.map((block) => (
            <div key={block.heading} className="rounded-[2rem] parchment-surface p-6">
              <h2 className="text-2xl font-black tracking-[-0.04em]">{block.heading}</h2>
              <p className="mt-4 leading-8 text-[#ead7b7]/70">{block.body}</p>
              <ul className="mt-5 space-y-3">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-7 text-[#ead7b7]/72">
                    <span className="mt-2 size-2 rounded-full bg-[#f6c465]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-[2rem] parchment-surface p-6">
            <h3 className="text-xl font-black">Mutlaka bil</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {topic.mustKnow.map((item) => (
                <span key={item} className="rounded-full bg-[#f2c15f] px-3 py-1 text-sm font-bold text-[#120b07]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] parchment-surface p-6">
            <h3 className="text-xl font-black">Kavramlar</h3>
            <div className="mt-4 space-y-3">
              {terms.map((term) => (
                <div key={term.term} className="rounded-2xl bg-white/[0.06] p-3">
                  <p className="font-black text-[#f6c465]">{term.term}</p>
                  <p className="mt-1 text-sm leading-6 text-[#ead7b7]/66">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] parchment-surface p-6">
            <h3 className="text-xl font-black">Sık yapılan hatalar</h3>
            <ul className="mt-4 space-y-3">
              {topic.commonMistakes.map((mistake) => (
                <li key={mistake} className="text-sm leading-6 text-[#ead7b7]/70">• {mistake}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] parchment-surface p-6">
            <h3 className="text-xl font-black">Mini Timeline</h3>
            <div className="mt-4 space-y-3">
              {topic.quickTimeline.map((event) => (
                <div key={`${event.date}-${event.event}`} className="rounded-2xl bg-white/[0.06] p-3">
                  <p className="text-sm font-black text-[#f6c465]">{event.date}</p>
                  <p className="text-sm text-[#ead7b7]/70">{event.event}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#f2c15f] p-6 text-[#120b07]">
            <h3 className="text-xl font-black">Bu konudan pratik</h3>
            <p className="mt-2 text-sm opacity-80">{relatedQuestions.length} soru, {relatedFlashcards.length} flashcard bağlı.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`/question-bank?topic=${topic.id}`} className="rounded-full bg-[#120b07] px-4 py-2 text-sm font-black text-white">
                Test çöz
              </a>
              <a href="/flashcards" className="rounded-full bg-[#120b07] px-4 py-2 text-sm font-black text-white">
                Kart aç
              </a>
            </div>
          </div>
        </aside>
      </section>
    </article>
  );
}
