import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  FileQuestion,
  Layers3,
  Shuffle,
  Sparkles,
  Target,
  TriangleAlert,
} from "lucide-react";
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
  kolay: "Temel kavramları, doğrudan bilgi sorularını ve net tarih bilgisini hızlıca ölçer.",
  orta: "Olay, kurum, sonuç ve dönem ilişkisini birlikte yoklar; gerçek sınav temposuna yakındır.",
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
    <main className="space-y-8 pb-24 text-[var(--sb-text)]">
      <section
        data-readable="light"
        className="relative overflow-hidden rounded-[2rem] border border-[var(--sb-line)] bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_54%,#dbeafe_100%)] p-6 text-[var(--sb-text)] shadow-[var(--sb-shadow-md)] md:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-amber-100/70 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="kicker">Soru Bankası</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.055em] text-[var(--sb-text)] md:text-6xl">
              Konu seç, seviyeyi belirle, açıklamalı teste gir.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--sb-text-soft)] md:text-lg">
              Tüm kartlar okunabilir ve tıklanabilir. Önce konu kartını açabilir, ardından kolay, orta veya zor seviyelerden biriyle sınav pratiğine geçebilirsin.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/question-bank/all" className="btn-accent">
                Karma testleri aç <ArrowRight size={16} />
              </Link>
              <Link href="/topics" className="btn-light">
                Konu anlatımlarına dön
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SummaryCard icon={<BookOpen size={17} />} label="Konu" value={topicCount} />
            <SummaryCard icon={<FileQuestion size={17} />} label="Konu testi" value={topicTestCount} />
            <SummaryCard icon={<Layers3 size={17} />} label="Konu sorusu" value={topicQuestionCount} />
            <SummaryCard icon={<Shuffle size={17} />} label="Karma test" value={`${mixedTestCount} / ${mixedQuestionCount}`} />
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {levels.map((level) => (
          <MixedTestCard key={level} level={level} />
        ))}
      </section>

      <SectionTitle
        eyebrow="Konu Testleri"
        title="Her konu için net, açıklamalı ve seviyeli test akışı"
        description="Konu kartları KPSS kazanımı, kritik bilgi ve sık hata odağıyla düzenlendi. Karttan konuya, seviyeden teste tek tıkla geçebilirsin."
      />

      <section className="grid gap-5 xl:grid-cols-2">
        {topics.map((topic, index) => (
          <TopicCard key={topic.id} topic={topic} index={index} />
        ))}
      </section>
    </main>
  );
}

function MixedTestCard({ level }: { level: TestLevel }) {
  const tests = mixedQuestionTests.filter((test) => test.level === level);
  const questionCount = tests.reduce((sum, test) => sum + test.questionCount, 0);

  return (
    <Link
      href={`/question-bank/all/${level}`}
      data-readable="light"
      className="group rounded-[1.75rem] border border-[var(--sb-line)] bg-[var(--sb-surface-strong)] p-6 text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/25 hover:shadow-[var(--sb-shadow-md)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-amber-500/12 px-3 py-1 text-xs font-black text-amber-700">Karma</span>
        <span className="text-xs font-black text-[var(--sb-text-muted)]">{tests.length} test</span>
      </div>
      <h2 className="mt-5 text-2xl font-black tracking-tight text-[var(--sb-text)]">{levelLabels[level]} karma testler</h2>
      <p className="mt-3 min-h-16 text-sm leading-7 text-[var(--sb-text-soft)]">
        {levelDescriptions[level]} Sorular farklı konulardan harmanlanır.
      </p>
      <div className="mt-5 rounded-2xl border border-[var(--sb-line)] bg-slate-50 p-4 text-[var(--sb-text)]">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">Kapsam</p>
        <p className="mt-2 text-sm leading-7 text-[var(--sb-text-soft)]">
          {topics.slice(0, 4).map((topic) => topic.title).join(", ")} ve {Math.max(0, topics.length - 4)} konu daha
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-full border border-[var(--sb-line)] bg-white px-4 py-3 text-sm font-black text-[var(--sb-text)]">
        <span>{questionCount} soru</span>
        <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function TopicCard({ topic, index }: { topic: Topic; index: number }) {
  const counts = getTestCountsForTopic(topic.id);
  const mustKnow = topic.mustKnow?.slice(0, 4) ?? [];
  const mistake = topic.commonMistakes?.[0] ?? `${topic.title} sorularında dönem ve kavram ilişkisini karıştırmamaya dikkat et.`;

  return (
    <article
      data-readable="light"
      className="rounded-[1.75rem] border border-[var(--sb-line)] bg-[var(--sb-surface-strong)] p-6 text-[var(--sb-text)] shadow-[var(--sb-shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/25 hover:shadow-[var(--sb-shadow-md)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-black text-blue-700">{String(index + 1).padStart(2, "0")}</span>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-[var(--sb-text)]">{topic.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--sb-text-soft)]">{topic.shortDescription}</p>
        </div>
        <div className="rounded-2xl border border-[var(--sb-line)] bg-slate-50 p-4 text-right text-[var(--sb-text)]">
          <p className="text-2xl font-black text-[var(--sb-text)]">{counts.totalTests}</p>
          <p className="text-xs font-bold text-[var(--sb-text-muted)]">test</p>
          <p className="mt-2 text-sm font-black text-blue-700">{counts.totalQuestions} soru</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_.85fr]">
        <div className="rounded-2xl border border-[var(--sb-line)] bg-slate-50 p-4 text-[var(--sb-text)]">
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
            <Target size={14} /> Bilmen Gerekenler
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {mustKnow.length > 0 ? (
              mustKnow.map((item) => (
                <span key={item} className="rounded-full border border-blue-500/15 bg-white px-3 py-1.5 text-xs font-bold text-[var(--sb-text-soft)]">
                  {item}
                </span>
              ))
            ) : (
              <span className="text-sm text-[var(--sb-text-soft)]">Bu konu için kritik kavramlar konu anlatımında listelenir.</span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-50 p-4 text-[var(--sb-text)]">
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-amber-700">
            <TriangleAlert size={14} /> Sık Hata
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--sb-text-soft)]">{mistake}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href={`/topics/${topic.slug ?? topic.id}`} className="btn-light">
          Konuyu aç <BookOpen size={16} />
        </Link>
        {levels.map((level) => (
          <Link key={level} href={`/question-bank/${topic.id}/${level}`} className="btn-primary">
            {levelLabels[level]}
          </Link>
        ))}
      </div>
    </article>
  );
}

function SummaryCard({ icon, label, value }: { icon: ReactNode; label: string; value: number | string }) {
  return (
    <div data-readable="light" className="rounded-2xl border border-[var(--sb-line)] bg-white/80 p-4 text-[var(--sb-text)] shadow-[var(--sb-shadow-xs)] backdrop-blur">
      <p className="flex items-center gap-2 text-xs font-black text-[var(--sb-text-muted)]">{icon}{label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-[var(--sb-text)]">{value}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="kicker">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--sb-text)] md:text-4xl">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--sb-text-soft)] md:text-base">{description}</p>
      </div>
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--sb-line)] bg-[var(--sb-surface-strong)] px-4 py-2 text-sm font-black text-[var(--sb-text)] shadow-[var(--sb-shadow-xs)]">
        <Sparkles size={16} className="text-amber-600" /> Açıklamalı çözüm modu
      </div>
    </div>
  );
}
