import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BookOpen, FileQuestion, Layers3, Shuffle, Target, TriangleAlert } from "lucide-react";
import {
  QUESTIONS_PER_TEST,
  TESTS_PER_LEVEL,
  getTestCountsForTopic,
  mixedQuestionTests,
  topicQuestionTests,
  type TestLevel,
} from "@/data/generated-30-question-tests";
import { topics } from "@/data/kpss-history";
import type { Topic } from "@/types/study";

const levelLabels: Record<TestLevel, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor",
};

const levelDescriptions: Record<TestLevel, string> = {
  kolay: "Temel kavram, doğrudan bilgi ve net tarih bilgisini hızlıca ölçer.",
  orta: "Olay, kurum, sonuç ve dönem ilişkisini birlikte yoklar.",
  zor: "Kronoloji, çeldirici, yorum ve sık karıştırılan ayrımları hedefler.",
};

const levels: TestLevel[] = ["kolay", "orta", "zor"];

export function QuestionBankPage() {
  const topicCount = topics.length;
  const topicTestCount = topicQuestionTests.length;
  const topicQuestionCount = topicQuestionTests.reduce((sum, test) => sum + test.questionCount, 0);
  const mixedTestCount = mixedQuestionTests.length;
  const mixedQuestionCount = mixedQuestionTests.reduce((sum, test) => sum + test.questionCount, 0);

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--bureau-line)] bg-[var(--bureau-ink)] p-6 text-[var(--bureau-inverse)] shadow-[var(--shadow-stage)] sm:p-8 lg:p-10">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute bottom-[-10rem] left-[15%] h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[.06] [background-image:linear-gradient(90deg,rgba(255,255,255,.28)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.24)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <div className="relative z-10 grid gap-8 xl:grid-cols-[1.05fr_.95fr] xl:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.16em] text-amber-400">Soru Bankası</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.055em] text-white sm:text-5xl lg:text-6xl">
              Konu seç, seviyeyi belirle, açıklamalı teste gir.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/75">
              Tüm kartlar tıklanabilir. Önce konu kartını açabilir, sonra kolay-orta-zor seviyelerden birini seçerek testlere geçebilirsin.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/question-bank/all" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-500 px-5 text-sm font-black text-slate-900 shadow transition hover:-translate-y-0.5 hover:bg-amber-400">
                Karma testleri aç <ArrowRight size={17} />
              </Link>
              <Link href="/topics" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/20">
                Konu anlatımlarına dön
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <SummaryCard icon={<BookOpen size={18} />} label="Konu" value={topicCount} />
            <SummaryCard icon={<FileQuestion size={18} />} label="Konu testi" value={topicTestCount} />
            <SummaryCard icon={<Layers3 size={18} />} label="Konu sorusu" value={topicQuestionCount} />
            <SummaryCard icon={<Shuffle size={18} />} label="Karma test" value={`${mixedTestCount} / ${mixedQuestionCount}`} />
          </div>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        {levels.map((level) => (
          <MixedTestCard key={level} level={level} />
        ))}
      </section>

      <section className="space-y-4">
        <SectionTitle
          eyebrow="Konu bazlı çalışma"
          title="Her konu için 60 açıklamalı test"
          description={`Her seviyede ${TESTS_PER_LEVEL} test, her testte ${QUESTIONS_PER_TEST} soru bulunur. Veri Supabase gelmezse JSON tabanlı güvenli fallback otomatik çalışır.`}
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {topics.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>
      </section>
    </section>
  );
}

function MixedTestCard({ level }: { level: TestLevel }) {
  const tests = mixedQuestionTests.filter((test) => test.level === level);
  const questionCount = tests.reduce((sum, test) => sum + test.questionCount, 0);

  return (
    <Link
      href={`/question-bank/all?level=${level}`}
      className="group relative overflow-hidden rounded-[1.7rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.92)] p-5 shadow-[var(--shadow-paper)] transition hover:-translate-y-1 hover:border-[rgba(4,126,137,.26)] hover:shadow-[var(--shadow-float)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(4,126,137,.25)]"
    >
      <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[rgba(4,126,137,.12)] blur-3xl transition group-hover:bg-[rgba(4,126,137,.20)]" />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[var(--bureau-ink)] px-3 py-1 text-xs font-black text-[var(--bureau-inverse)]">Karma</span>
          <span className="text-xs font-black text-[var(--bureau-muted)]">{tests.length} test</span>
        </div>
        <h2 className="mt-5 text-2xl font-black tracking-[-.04em] text-[var(--bureau-ink)]">{levelLabels[level]} karma testler</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--bureau-copy)]">{levelDescriptions[level]} Sorular farklı konulardan harmanlanır.</p>
        <div className="mt-5 rounded-2xl border border-[var(--bureau-line)] bg-white/70 p-4">
          <p className="text-[11px] font-black uppercase tracking-[.16em] text-[var(--bureau-teal)]">Kapsam</p>
          <p className="mt-2 text-sm leading-6 text-[var(--bureau-copy)]">
            {topics.slice(0, 4).map((topic) => topic.title).join(", ")} ve {Math.max(0, topics.length - 4)} konu daha
          </p>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-[var(--bureau-ink)] px-4 py-3 text-sm font-black text-[var(--bureau-inverse)]">
          <span>{questionCount} soru</span>
          <ArrowRight size={17} />
        </div>
      </div>
    </Link>
  );
}

function TopicCard({ topic, index }: { topic: Topic; index: number }) {
  const counts = getTestCountsForTopic(topic.id);
  const mustKnow = topic.mustKnow.slice(0, 4);
  const mistake = topic.commonMistakes[0] ?? `${topic.title} sorularında dönem ve kavram ilişkisini karıştırmamaya dikkat et.`;

  return (
    <article className="group overflow-hidden rounded-[1.7rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.92)] shadow-[var(--shadow-paper)] transition hover:-translate-y-1 hover:border-[rgba(4,126,137,.26)] hover:shadow-[var(--shadow-float)]">
      <Link href={`/question-bank/${topic.id}`} className="block p-5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(4,126,137,.25)]">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-2xl bg-[var(--bureau-ink)] text-sm font-black text-[var(--bureau-inverse)]">{String(index + 1).padStart(2, "0")}</span>
          <div className="text-right">
            <p className="text-sm font-black text-[var(--bureau-ink)]">{counts.totalTests} test</p>
            <p className="text-xs font-bold text-[var(--bureau-muted)]">{counts.totalQuestions} soru</p>
          </div>
        </div>

        <h2 className="mt-5 text-2xl font-black tracking-[-.04em] text-[var(--bureau-ink)]">{topic.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--bureau-copy)]">{topic.shortDescription}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {mustKnow.map((item) => (
            <span key={item} className="rounded-full border border-[var(--bureau-line)] bg-white px-3 py-1 text-[11px] font-extrabold text-[var(--bureau-copy)]">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 rounded-[1.25rem] border border-[rgba(158,63,63,.18)] bg-[rgba(158,63,63,.07)] p-4">
          <div className="flex items-start gap-2">
            <TriangleAlert className="mt-1 shrink-0 text-[var(--bureau-rust)]" size={16} />
            <p className="text-xs leading-6 text-[var(--bureau-copy)]">{mistake}</p>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-3 gap-2 border-t border-[var(--bureau-line)] bg-white/50 p-3">
        {levels.map((level) => (
          <Link
            key={level}
            href={`/question-bank/${topic.id}?level=${level}` as any}
            className="rounded-2xl border border-[var(--bureau-line)] bg-white px-3 py-3 text-center text-xs font-black text-[var(--bureau-ink)] transition hover:bg-[var(--sb-primary)] hover:border-[var(--sb-primary)] hover:text-white"
          >
            {levelLabels[level]}
          </Link>
        ))}
      </div>
    </article>
  );
}

function SummaryCard({ icon, label, value }: { icon: ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[.08] p-4">
      <div className="flex items-center gap-2 text-[var(--bureau-inverse-copy)]">{icon}<span className="text-xs font-bold">{label}</span></div>
      <p className="mt-3 text-3xl font-black text-[var(--bureau-inverse)]">{value}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="kicker">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-[-.045em] text-[var(--bureau-ink)] sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--bureau-copy)]">{description}</p>
    </div>
  );
}
