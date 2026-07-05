"use client";

import { PageHeader } from "@/components/core/PageHeader";
import { MetricCard } from "@/components/common/MetricCard";
import { topics } from "@/data/kpss-history";
import { useMounted } from "@/hooks/useMounted";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

/**
 * Analiz sayfası.
 * Kullanıcının local progress verisini konu bazında özetler.
 */
export function AnalyticsPage() {
  const mounted = useMounted();
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const examResults = useStudyProgressStore((state) => state.examResults);

  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;

  if (!mounted) {
    return (
      <div className="space-y-6">
        <PageHeader eyebrow="Analiz" title="Veriler hazırlanıyor." description="İlerleme verileri localStorage'dan okunuyor." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analiz"
        title="Nerede güçlüsün, nerede açık var?"
        description="Çözdüğün sorular, tamamladığın konular ve deneme sonuçları tek analiz ekranında toplanır."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Toplam Çözüm" value={`${attempts.length}`} helper="Soru bankasında çözülen soru." />
        <MetricCard label="Doğruluk" value={`%${accuracy}`} helper={`${correct} doğru cevap.`} tone="turquoise" />
        <MetricCard label="Deneme" value={`${examResults.length}`} helper="Kaydedilen deneme sonucu." tone="crimson" />
      </div>

      <section className="rounded-[2rem] parchment-surface p-6">
        <h2 className="text-2xl font-black tracking-[-0.04em]">Konu bazlı durum</h2>
        <div className="mt-6 grid gap-3">
          {topics.map((topic) => {
            const topicAttempts = attempts.filter((attempt) => attempt.topicId === topic.id);
            const topicCorrect = topicAttempts.filter((attempt) => attempt.isCorrect).length;
            const topicAccuracy = topicAttempts.length ? Math.round((topicCorrect / topicAttempts.length) * 100) : 0;
            const completed = completedTopicIds.includes(topic.id);

            return (
              <a key={topic.id} href={`/topics/${topic.slug}`} className="rounded-[1.5rem] bg-white/[0.055] p-4 transition hover:bg-white/[0.09]">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-black">{topic.title}</p>
                    <p className="text-sm text-[#ead7b7]/58">{topicAttempts.length} soru · %{topicAccuracy} doğruluk</p>
                  </div>
                  <span className={`w-fit rounded-full px-3 py-1 text-xs font-black ${completed ? "bg-[#52f2d0] text-[#120b07]" : "bg-white/[0.08]"}`}>
                    {completed ? "tamamlandı" : "bekliyor"}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
