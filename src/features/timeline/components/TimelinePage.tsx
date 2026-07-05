import { PageHeader } from "@/components/core/PageHeader";
import { timelineEvents, getTopicById } from "@/data/kpss-history";

/**
 * Timeline sayfası.
 * Tarihsel akışı tek sayfada kronolojik ve görsel biçimde gösterir.
 */
export function TimelinePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Zaman Akışı"
        title="Tarihi kronolojiyle öğren."
        description="KPSS Tarih sorularında olayların sırası kritik olduğu için timeline ayrı ve temiz bir sayfa olarak tasarlandı."
      />

      <section className="rounded-[2.5rem] parchment-surface p-6">
        <div className="relative space-y-5 before:absolute before:left-5 before:top-0 before:h-full before:w-px before:bg-[#f2c15f]/35">
          {timelineEvents.map((event) => {
            const topic = getTopicById(event.topicId);
            return (
              <a key={event.id} href={topic ? `/topics/${topic.slug}` : "/topics"} className="relative block pl-14">
                <span className="absolute left-[13px] top-2 size-4 rounded-full bg-[#f2c15f] shadow-[0_0_30px_rgba(242,193,95,0.6)]" />
                <article className="rounded-[2rem] bg-white/[0.055] p-5 transition hover:bg-white/[0.09]">
                  <p className="text-3xl font-black tracking-[-0.06em] text-[#f6c465]">{event.date}</p>
                  <h2 className="mt-2 text-2xl font-black">{event.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#ead7b7]/66">{event.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#52f2d0]">{topic?.title}</p>
                </article>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
