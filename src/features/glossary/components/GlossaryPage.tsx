import { PageHeader } from "@/components/core/PageHeader";
import { getTopicById, glossary } from "@/data/kpss-history";

/**
 * Kavram sözlüğü.
 * KPSS Tarih kısa bilgi tekrarları için ayrı sayfa.
 */
export function GlossaryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Kavram Sözlüğü"
        title="Kısa bilgi tuzaklarını burada çöz."
        description="Kut, töre, ikta, Karlofça, Amasya, Mudanya gibi KPSS'de sık karıştırılan kavramlar tek yerde."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {glossary.map((item) => {
          const topic = getTopicById(item.topicId);
          return (
            <a key={item.term} href={topic ? `/topics/${topic.slug}` : "/topics"} className="rounded-[2rem] parchment-surface p-6 transition hover:-translate-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f6c465]">{topic?.title}</p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">{item.term}</h2>
              <p className="mt-3 text-sm leading-7 text-[#ead7b7]/68">{item.definition}</p>
            </a>
          );
        })}
      </section>
    </div>
  );
}
