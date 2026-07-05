import { PageHeader } from "@/components/core/PageHeader";
import { recommendations } from "@/data/kpss-history";

/**
 * Çalışma planı sayfası.
 * Dashboard önerilerini daha detaylı günlük akışa dönüştürür.
 */
export function StudyPlanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Çalışma Planı"
        title="Bugünün KPSS Tarih rotası."
        description="Kullanıcı ne çalışacağını düşünmeden, sırayla önerilen blokları takip eder."
      />

      <div className="grid gap-4">
        {recommendations.map((item, index) => (
          <a key={item.id} href={item.href} className="rounded-[2rem] parchment-surface p-6 transition hover:-translate-y-1">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f6c465]">Adım {index + 1} · {item.priority} öncelik</p>
                <h2 className="mt-3 text-2xl font-black">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#ead7b7]/66">{item.description}</p>
              </div>
              <span className="rounded-full bg-[#f2c15f] px-4 py-2 font-black text-[#120b07]">{item.minutes} dk</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
