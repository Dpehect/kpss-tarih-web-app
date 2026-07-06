import { PageHeader } from "@/components/core/PageHeader";
import { exams } from "@/data/kpss-history";

/**
 * Deneme sınavları listesi.
 */
export function ExamsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`${exams.length} Deneme`}
        title="Süreli denemelerle sınav ritmi kazan."
        description="Genel tarama, Osmanlı, Milli Mücadele, İnkılap ve tam tekrar denemeleri hazır. Sonuçların dashboard ve analiz ekranına kaydedilir."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {exams.map((exam) => (
          <a key={exam.id} href={`/exams/${exam.id}`} className="rounded-xl parchment-surface p-6 transition hover:-translate-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[#f6c465]">{exam.durationMinutes} dk</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">{exam.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#ead7b7]/66">{exam.description}</p>
            <p className="mt-5 w-fit rounded-full bg-white/[0.07] px-3 py-1 text-sm">{exam.questionIds.length} soru</p>
          </a>
        ))}
      </div>
    </div>
  );
}
