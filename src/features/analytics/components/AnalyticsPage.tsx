"use client";

import { BarChart3, BookOpen, CreditCard, FileQuestion, Target, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/core/PageHeader";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/StatCard";
import { exams, flashcards, questions, topics } from "@/data/kpss-history";
import { useMounted } from "@/hooks/useMounted";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

export function AnalyticsPage() {
  const mounted = useMounted();
  const completedTopicIds = useStudyProgressStore((state) => state.completedTopicIds);
  const attempts = useStudyProgressStore((state) => state.questionAttempts);
  const reviews = useStudyProgressStore((state) => state.flashcardReviews);
  const examResults = useStudyProgressStore((state) => state.examResults);

  const latestAttempts = Array.from(new Map(attempts.map((attempt) => [attempt.questionId, attempt])).values());
  const answered = latestAttempts.length;
  const correct = latestAttempts.filter((attempt) => attempt.isCorrect).length;
  const wrong = answered - correct;
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
  const reviewedCards = new Set(reviews.map((review) => review.cardId)).size;
  const rememberedCards = reviews.filter((review) => review.remembered).length;
  const flashcardRate = reviews.length ? Math.round((rememberedCards / reviews.length) * 100) : 0;

  const topicProgress = Math.round((new Set(completedTopicIds).size / topics.length) * 100);
  const questionProgress = Math.round((answered / questions.length) * 100);
  const flashcardProgress = Math.round((reviewedCards / flashcards.length) * 100);
  const examProgress = Math.round((new Set(examResults.map((result) => result.examId)).size / exams.length) * 100);

  const weakestTopics = topics
    .map((topic) => {
      const topicAttempts = latestAttempts.filter((attempt) => attempt.topicId === topic.id);
      const topicWrong = topicAttempts.filter((attempt) => !attempt.isCorrect).length;
      return { topic, attempts: topicAttempts.length, wrong: topicWrong };
    })
    .filter((item) => item.attempts > 0)
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analiz"
        title="Çalışma verilerini net gör."
        description="Konu, soru, flashcard ve deneme ilerlemen tek ekranda okunabilir şekilde özetlenir."
      />

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <StatCard icon={<BookOpen size={21} />} label="Konu" value={`${mounted ? new Set(completedTopicIds).size : 0}/${topics.length}`} helper="Tamamlanan konu sayısı." tone="gold" />
        <StatCard icon={<FileQuestion size={21} />} label="Doğruluk" value={`%${mounted ? accuracy : 0}`} helper={`${answered} soru üzerinden.`} tone="sky" />
        <StatCard icon={<CreditCard size={21} />} label="Kart Başarısı" value={`%${mounted ? flashcardRate : 0}`} helper={`${reviewedCards} kart tekrar edildi.`} tone="mint" />
        <StatCard icon={<Trophy size={21} />} label="Deneme" value={`${mounted ? examResults.length : 0}`} helper="Kaydedilen deneme sonucu." tone="rose" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <Card>
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="kicker">İlerleme Haritası</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--navy-900)]">Platform geneli durum</h2>
            </div>
            <BarChart3 className="text-[var(--sky-600)]" size={28} />
          </div>

          <div className="mt-8 grid gap-5">
            <ProgressRow label="Konu" value={topicProgress} />
            <ProgressRow label="Test" value={questionProgress} />
            <ProgressRow label="Flashcard" value={flashcardProgress} />
            <ProgressRow label="Deneme" value={examProgress} />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="kicker">Odak Alanları</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[var(--navy-900)]">Zayıf konular</h2>
            </div>
            <Target className="text-[#7f1d1d]" size={28} />
          </div>

          <div className="mt-7 space-y-3">
            {weakestTopics.length > 0 ? (
              weakestTopics.map((item, index) => (
                <a
                  key={item.topic.id}
                  href={`/topics/${item.topic.slug}`}
                  className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-[var(--border-soft)] bg-white/74 p-4 transition hover:bg-white"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--navy-900)] text-sm font-black text-[var(--text-inverse)]">
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-black text-[var(--navy-900)]">{item.topic.title}</span>
                      <span className="block text-sm text-[var(--text-secondary)]">{item.wrong} yanlış / {item.attempts} deneme</span>
                    </span>
                  </span>
                </a>
              ))
            ) : (
              <p className="rounded-[1.35rem] border border-[var(--border-soft)] bg-white/74 p-5 text-sm font-semibold leading-7 text-[var(--text-secondary)]">
                Henüz yeterli soru verisi yok. Birkaç konu testi çözdükten sonra odak alanları burada görünür.
              </p>
            )}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MiniInsight label="Doğru" value={correct} tone="mint" />
        <MiniInsight label="Yanlış" value={wrong} tone="rose" />
        <MiniInsight label="Toplam cevap" value={answered} tone="sky" />
      </section>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  const normalized = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-black">
        <span className="text-[var(--navy-900)]">{label}</span>
        <span className="text-[var(--text-muted)]">{normalized}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[rgba(11,18,32,.10)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${normalized}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-[var(--sky-500)] via-[var(--mint-500)] to-[var(--gold-500)]"
        />
      </div>
    </div>
  );
}

function MiniInsight({ label, value, tone }: { label: string; value: number; tone: "mint" | "rose" | "sky" }) {
  const toneClass = {
    mint: "bg-[#dff8ef] text-[#047857]",
    rose: "bg-[#fff0e9] text-[#9a3412]",
    sky: "bg-[rgba(76,141,255,.12)] text-[var(--sky-600)]"
  }[tone];

  return (
    <div className="rounded-[2rem] border border-[var(--border-soft)] bg-white/74 p-6 shadow-[var(--shadow-xs)]">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--text-muted)]">{label}</p>
      <p className={`mt-4 w-fit rounded-2xl px-4 py-2 text-4xl font-black tracking-[-0.08em] ${toneClass}`}>{value}</p>
    </div>
  );
}
