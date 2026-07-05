"use client";

import { PageHeader } from "@/components/core/PageHeader";
import { useMounted } from "@/hooks/useMounted";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

/**
 * Rozetler sayfası.
 * Öğrenciyi oyunlaştırma ile motive eder.
 */
export function AchievementsPage() {
  const mounted = useMounted();
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const reviews = useStudyProgressStore((state) => state.flashcardReviews);
  const exams = useStudyProgressStore((state) => state.examResults);

  const achievements = [
    { title: "İlk Adım", description: "İlk sorunu çöz.", unlocked: attempts.length >= 1 },
    { title: "Konu Fatihi", description: "3 konuyu tamamla.", unlocked: completedTopicIds.length >= 3 },
    { title: "Soru Ustası", description: "25 soru çöz.", unlocked: attempts.length >= 25 },
    { title: "Hafıza Kartçısı", description: "20 flashcard tekrar et.", unlocked: reviews.length >= 20 },
    { title: "Deneme Savaşçısı", description: "İlk denemeni bitir.", unlocked: exams.length >= 1 },
    { title: "Tam Platform Kullanıcısı", description: "Konu, soru, flashcard ve deneme modüllerini kullan.", unlocked: false }
  ];

  achievements[5].unlocked = completedTopicIds.length > 0 && attempts.length > 0 && reviews.length > 0 && exams.length > 0;

  if (!mounted) {
    return <PageHeader eyebrow="Rozetler" title="Rozetler hazırlanıyor." description="İlerleme verileri okunuyor." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Rozetler"
        title="Çalışma motivasyonunu görünür yap."
        description="Konu tamamlama, soru çözme, flashcard ve deneme alışkanlıkları rozetlere dönüşür."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement) => (
          <article key={achievement.title} className={`rounded-[2rem] p-6 ${achievement.unlocked ? "bg-[#f2c15f] text-[#120b07]" : "parchment-surface"}`}>
            <p className="text-xs font-black uppercase tracking-[0.24em] opacity-70">{achievement.unlocked ? "Açıldı" : "Kilitli"}</p>
            <h2 className="mt-4 text-2xl font-black">{achievement.title}</h2>
            <p className="mt-3 text-sm leading-7 opacity-75">{achievement.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
