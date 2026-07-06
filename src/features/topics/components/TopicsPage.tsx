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
            className="group relative overflow-hidden rounded-[2rem] border border-[#0f172a]/10 bg-[#fffaf0]/94 p-6 text-[#0b1220] shadow-[0_22px_72px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_30px_96px_rgba(15,23,42,0.14)]"
          >
            <div className="absolute right-[-3rem] top-[-3rem] size-36 rounded-full bg-[#2563eb]/10 blur-3xl transition group-hover:bg-[#2563eb]/16" />

            <div className="relative z-10 flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#a76400]">
                  {topic.era}
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.055em] text-[#0b1220] md:text-3xl">
                  {topic.title}
                </h2>
              </div>
              <span className="shrink-0 rounded-full bg-[#0b1220] px-3 py-1 text-sm font-black text-[#fff8ea]">
                {topic.examImportance}%
              </span>
            </div>

            <p className="relative z-10 mt-5 text-sm font-semibold leading-7 text-[#334155]">
              {topic.shortDescription}
            </p>

            <div className="relative z-10 mt-6 flex flex-wrap gap-2">
              {topic.keywords.slice(0, 4).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[#0f172a]/10 bg-white/82 px-3 py-1 text-xs font-black text-[#475569]"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[#0f172a]/10 pt-4">
              <span className="text-sm font-black text-[#0b1220]">Konuya gir</span>
              <ArrowRight size={18} className="text-[#0b1220] transition group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
