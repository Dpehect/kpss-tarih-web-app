"use client";

import { Lock, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/core/PageHeader";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function AchievementsPage() {
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const reviews = useStudyProgressStore((state) => state.flashcardReviews);
  const exams = useStudyProgressStore((state) => state.examResults);
  const notes = useStudyProgressStore((state) => state.notes);

  const achievements = [
    {
      title: "İlk Adım",
      description: "İlk konuyu tamamla.",
      unlocked: completedTopicIds.length > 0
    },
    {
      title: "Soru Masası",
      description: "En az 10 soru çöz.",
      unlocked: attempts.length >= 10
    },
    {
      title: "Kart Disiplini",
      description: "En az 10 flashcard tekrar et.",
      unlocked: reviews.length >= 10
    },
    {
      title: "Deneme Ritmi",
      description: "İlk denemeyi bitir.",
      unlocked: exams.length > 0
    },
    {
      title: "Kendi Defteri",
      description: "İlk çalışma notunu ekle.",
      unlocked: notes.length > 0
    },
    {
      title: "Tam Platform Kullanıcısı",
      description: "Konu, soru, kart ve deneme modüllerinin hepsini kullan.",
      unlocked: completedTopicIds.length > 0 && attempts.length > 0 && reviews.length > 0 && exams.length > 0
    }
  ];

  const unlockedCount = achievements.filter((item) => item.unlocked).length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Rozetler"
        title="İlerlemeyi görünür başarıya çevir."
        description="Çalışma alışkanlıkların rozetlere dönüşür. Kilitli rozetler sıradaki hedefini gösterir."
      />

      <section className="surface-dark rounded-[2.5rem] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Başarı durumu</p>
            <h2 className="mt-3 text-5xl font-black tracking-[-0.08em] text-[var(--text-inverse)]">
              {unlockedCount} / {achievements.length}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-[var(--text-inverse-muted)]">
              Açılan rozetler aktif çalışmayı, kilitli rozetler ise sıradaki çalışma hedefini gösterir.
            </p>
          </div>
          <Trophy size={54} className="text-[var(--gold-500)]" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement, index) => (
          <motion.article
            key={achievement.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className={`relative overflow-hidden rounded-[2rem] border p-6 shadow-[var(--shadow-sm)] backdrop-blur-2xl ${
              achievement.unlocked
                ? "border-[rgba(201,162,39,.32)] bg-[rgba(255,248,234,.94)]"
                : "border-[var(--border-soft)] bg-white/55 grayscale"
            }`}
          >
            <div className="absolute right-[-3rem] top-[-3rem] size-32 rounded-full bg-[var(--gold-soft)] blur-3xl" />
            <span className={`relative z-10 grid size-14 place-items-center rounded-2xl ${
              achievement.unlocked ? "bg-[var(--gold-500)] text-[var(--navy-900)]" : "bg-[rgba(11,18,32,.08)] text-[var(--text-muted)]"
            }`}>
              {achievement.unlocked ? <ShieldCheck size={24} /> : <Lock size={24} />}
            </span>
            <h2 className="relative z-10 mt-6 text-2xl font-black tracking-[-0.05em] text-[var(--navy-900)]">{achievement.title}</h2>
            <p className="relative z-10 mt-3 text-sm font-semibold leading-7 text-[var(--text-secondary)]">{achievement.description}</p>
            {achievement.unlocked ? (
              <div className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full bg-[#dff8ef] px-3 py-1 text-xs font-black text-[#047857]">
                <Sparkles size={14} />
                Açıldı
              </div>
            ) : (
              <div className="relative z-10 mt-5 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-[var(--text-muted)]">
                Kilitli
              </div>
            )}
          </motion.article>
        ))}
      </section>
    </div>
  );
}
