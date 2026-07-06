import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { topics } from "@/data/kpss-history";

export function TopicsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Konu Özetleri"
        title="KPSS Tarih müfredatı tek yerde."
        description="Her konu; kısa özet, kritik bilgi, sık hata, timeline ve ilgili testlerle ayrı sayfada düzenli şekilde hazırlandı."
      />

      <section className="grid gap-4 md:grid-cols-2">
        {topics.map((topic) => (
          <a
            key={topic.id}
            href={`/topics/${topic.slug}`}
            className="group relative overflow-hidden rounded-[2rem] border border-[rgba(11,18,32,.10)] bg-[rgba(255,248,234,.92)] p-6 text-[var(--museum-navy-2)] shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_30px_96px_rgba(11,18,32,.14)]"
          >
            <div className="absolute right-[-3rem] top-[-3rem] size-36 rounded-full bg-[rgba(76,141,255,.10)] blur-3xl transition group-hover:bg-[rgba(76,141,255,.16)]" />
            <div className="relative z-10 flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8d6500]">{topic.era}</p>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.055em] text-[var(--museum-navy-2)] md:text-3xl">{topic.title}</h2>
              </div>
              <span className="shrink-0 rounded-full bg-[var(--museum-navy-2)] px-3 py-1 text-sm font-black text-[var(--museum-cream)]">
                {topic.examImportance}%
              </span>
            </div>
            <p className="relative z-10 mt-5 text-sm font-semibold leading-7 text-[#334155]">{topic.shortDescription}</p>
            <div className="relative z-10 mt-6 flex flex-wrap gap-2">
              {topic.keywords.slice(0, 4).map((keyword) => (
                <span key={keyword} className="rounded-full border border-[rgba(11,18,32,.10)] bg-white/82 px-3 py-1 text-xs font-black text-[#475569]">
                  {keyword}
                </span>
              ))}
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[rgba(11,18,32,.10)] pt-4">
              <span className="text-sm font-black text-[var(--museum-navy-2)]">Konuya gir</span>
              <ArrowRight size={18} className="text-[var(--museum-navy-2)] transition group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
