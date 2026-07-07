import type { AdminOverview } from "@/lib/admin/admin-service";

const numberFormatter = new Intl.NumberFormat("tr-TR");

export function AdminMetricGrid({ overview }: { overview: AdminOverview }) {
  const accuracy = overview.totalQuestionAttempts
    ? Math.round((overview.totalCorrectAnswers / overview.totalQuestionAttempts) * 100)
    : 0;

  const metrics = [
    {
      label: "Toplam kullanıcı",
      value: numberFormatter.format(overview.totalUsers),
      helper: `${numberFormatter.format(overview.activeUsers)} aktif kullanıcı`
    },
    {
      label: "Soru çözümü",
      value: numberFormatter.format(overview.totalQuestionAttempts),
      helper: `%${accuracy} doğruluk`
    },
    {
      label: "Flashcard tekrarı",
      value: numberFormatter.format(overview.totalFlashcardReviews),
      helper: "Toplam tekrar"
    },
    {
      label: "Deneme sonucu",
      value: numberFormatter.format(overview.totalExamResults),
      helper: "Tamamlanan deneme"
    },
    {
      label: "Tamamlanan konu",
      value: numberFormatter.format(overview.totalCompletedTopics),
      helper: "Kullanıcı ilerlemesi"
    },
    {
      label: "Not",
      value: numberFormatter.format(overview.totalNotes),
      helper: "Kayıtlı çalışma notu"
    }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="rounded-[1.75rem] border border-[#d8c7ad] bg-white p-5 shadow-[0_18px_50px_rgba(16,24,40,.08)]"
        >
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a5d13]">{metric.label}</p>
          <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#101828]">{metric.value}</p>
          <p className="mt-2 text-sm font-bold text-[#475467]">{metric.helper}</p>
        </article>
      ))}
    </section>
  );
}
