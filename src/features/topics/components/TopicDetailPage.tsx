import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, Clock3, FileQuestion, Layers3, Lightbulb, ScrollText, TriangleAlert } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { getFlashcardsByTopic, getGlossaryByTopic, getQuestionsByTopic, getTopicBySlug } from "@/data/kpss-history";
import { MarkTopicCompleteButton } from "@/features/topics/components/MarkTopicCompleteButton";

export function TopicDetailPage({ slug }: { slug: string }) {
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const relatedQuestions = getQuestionsByTopic(topic.id);
  const relatedFlashcards = getFlashcardsByTopic(topic.id);
  const terms = getGlossaryByTopic(topic.id);

  return (
    <article className="space-y-6">
      <PageHeader
        eyebrow="Konu Detayı"
        title={topic.title}
        description={topic.shortDescription}
        actions={<MarkTopicCompleteButton topicId={topic.id} />}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <MetricTile icon={<Layers3 size={20} />} label="Sınav Önemi" value={`${topic.examImportance}%`} helper="Konu ağırlığı" tone="gold" />
        <MetricTile icon={<Clock3 size={20} />} label="Önerilen Süre" value={`${topic.estimatedMinutes} dk`} helper="Odaklı çalışma" tone="sky" />
        <MetricTile icon={<FileQuestion size={20} />} label="İlgili Soru" value={String(relatedQuestions.length)} helper="Bağlı soru sayısı" tone="rose" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          {topic.summary.map((block, index) => (
            <section
              key={block.heading}
              className="relative overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[rgba(255,248,234,.94)] p-6 text-[var(--navy-900)] shadow-[var(--shadow-sm)] backdrop-blur-2xl"
            >
              <div className="absolute right-[-4rem] top-[-4rem] size-40 rounded-full bg-[var(--gold-soft)] blur-3xl" />

              <div className="relative z-10 flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--navy-900)] text-sm font-black text-[var(--text-inverse)]">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.04em] text-[var(--navy-900)]">{block.heading}</h2>
                  <p className="mt-4 text-base font-semibold leading-8 text-[var(--text-secondary)]">{block.body}</p>
                </div>
              </div>

              <ul className="relative z-10 mt-6 space-y-3">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm font-semibold leading-7 text-[var(--text-secondary)]">
                    <span className="mt-2.5 size-2.5 shrink-0 rounded-full bg-[var(--gold-500)] shadow-[0_0_24px_rgba(201,162,39,.42)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="space-y-4">
          <SidePanel icon={<Lightbulb size={18} />} title="Mutlaka bil" tone="gold">
            <div className="flex flex-wrap gap-2">
              {topic.mustKnow.map((item) => (
                <span key={item} className="rounded-full bg-[var(--gold-500)] px-3 py-1 text-sm font-black text-[var(--navy-900)]">
                  {item}
                </span>
              ))}
            </div>
          </SidePanel>

          <SidePanel icon={<BookOpen size={18} />} title="Kavramlar" tone="sky">
            <div className="space-y-3">
              {terms.map((term) => (
                <div key={term.term} className="rounded-2xl border border-[var(--border-soft)] bg-white/76 p-4">
                  <p className="font-black text-[#8d6500]">{term.term}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[var(--text-secondary)]">{term.definition}</p>
                </div>
              ))}
            </div>
          </SidePanel>

          <SidePanel icon={<TriangleAlert size={18} />} title="Sık yapılan hatalar" tone="rose">
            <ul className="space-y-3">
              {topic.commonMistakes.map((mistake) => (
                <li key={mistake} className="flex gap-3 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#7f1d1d]" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </SidePanel>

          <SidePanel icon={<ScrollText size={18} />} title="Mini Timeline" tone="mint">
            <div className="space-y-3">
              {topic.quickTimeline.map((event) => (
                <div key={`${event.date}-${event.event}`} className="rounded-2xl border border-[var(--border-soft)] bg-white/76 p-4">
                  <p className="text-sm font-black text-[#8d6500]">{event.date}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">{event.event}</p>
                </div>
              ))}
            </div>
          </SidePanel>

          <section className="rounded-[2rem] bg-[var(--gold-500)] p-6 text-[var(--navy-900)] shadow-[var(--shadow-gold)]">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={22} className="text-[var(--navy-900)]" />
              <h3 className="text-xl font-black text-[var(--navy-900)]">Bu konudan pratik</h3>
            </div>
            <p className="mt-2 text-sm font-semibold text-[rgba(11,18,32,.78)]">
              {relatedQuestions.length} soru, {relatedFlashcards.length} flashcard bağlı.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`/question-bank?topic=${topic.id}`} className="inline-flex items-center gap-2 rounded-full bg-[var(--navy-900)] px-4 py-2 text-sm font-black text-[var(--text-inverse)]">
                Test çöz
                <ArrowRight size={15} />
              </a>
              <a href="/flashcards" className="inline-flex items-center gap-2 rounded-full bg-[var(--navy-900)] px-4 py-2 text-sm font-black text-[var(--text-inverse)]">
                Kart aç
                <ArrowRight size={15} />
              </a>
            </div>
          </section>
        </aside>
      </section>
    </article>
  );
}

function SidePanel({
  icon,
  title,
  children,
  tone
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  tone: "gold" | "sky" | "rose" | "mint";
}) {
  const toneClass = {
    gold: "bg-[var(--gold-soft)] text-[#8d6500]",
    sky: "bg-[var(--sky-soft)] text-[var(--sky-600)]",
    rose: "bg-[var(--burgundy-soft)] text-[#7f1d1d]",
    mint: "bg-[var(--mint-soft)] text-[var(--mint-700)]"
  }[tone];

  return (
    <section className="rounded-[2rem] border border-[var(--border-soft)] bg-[rgba(255,248,234,.94)] p-6 text-[var(--navy-900)] shadow-[var(--shadow-sm)] backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-3">
        <span className={`grid size-10 place-items-center rounded-2xl ${toneClass}`}>{icon}</span>
        <h3 className="text-xl font-black text-[var(--navy-900)]">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function MetricTile({
  icon,
  label,
  value,
  helper,
  tone
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  helper: string;
  tone: "gold" | "sky" | "rose";
}) {
  const toneClass = {
    gold: "bg-[var(--gold-soft)] text-[#8d6500]",
    sky: "bg-[var(--sky-soft)] text-[var(--sky-600)]",
    rose: "bg-[var(--burgundy-soft)] text-[#7f1d1d]"
  }[tone];

  return (
    <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[rgba(255,248,234,.94)] p-5 text-[var(--navy-900)] shadow-[var(--shadow-sm)] backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--text-muted)]">{label}</p>
        <span className={`grid size-10 place-items-center rounded-2xl ${toneClass}`}>{icon}</span>
      </div>
      <p className="mt-4 text-4xl font-black tracking-[-0.07em] text-[var(--navy-900)]">{value}</p>
      <p className="mt-2 text-sm font-semibold text-[var(--text-secondary)]">{helper}</p>
    </div>
  );
}
