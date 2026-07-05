import topics from "@/data/topics.json";
import { SectionHeader } from "@/components/core/SectionHeader";

export function TopicIndex() {
  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Müfredat"
        title="KPSS Tarih konuları"
        description="Konu özetleri, timeline anlatımları, flashcard setleri ve soru havuzları aynı domain modeliyle ilişkilendirilir."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic) => (
          <a
            key={topic.id}
            href={`/topics/${topic.slug}`}
            className="rounded-[2rem] border border-black/5 bg-white/65 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm text-neutral-500">{topic.period}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{topic.title}</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">{topic.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
