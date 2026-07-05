import { PageHeader } from "@/components/core/PageHeader";
import { topics } from "@/data/kpss-history";

/**
 * Tüm konu özetlerini düzenli kartlarla gösterir.
 */
export function TopicsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Konu Özetleri"
        title="KPSS Tarih müfredatı tek yerde."
        description="Her konu; kısa özet, kritik bilgi, sık hata, timeline ve ilgili testlerle ayrı sayfada düzenli şekilde hazırlandı."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic) => (
          <a key={topic.id} href={`/topics/${topic.slug}`} className="group rounded-[2rem] parchment-surface p-6 transition hover:-translate-y-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f6c465]">{topic.era}</p>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">{topic.title}</h2>
              </div>
              <span className="rounded-full bg-white/[0.08] px-3 py-1 text-sm">{topic.examImportance}%</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#ead7b7]/66">{topic.shortDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {topic.keywords.slice(0, 4).map((keyword) => (
                <span key={keyword} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[#ead7b7]/68">
                  {keyword}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
