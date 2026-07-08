import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, BookOpen, FileQuestion, Layers3, Shuffle } from "lucide-react";
import {
  QUESTIONS_PER_TEST,
  TESTS_PER_LEVEL,
  getQuestionsForTest,
  getTestCountsForTopic,
  getTestsForTopic,
  type GeneratedQuestionTest,
  type TestLevel,
} from "@/data/generated-30-question-tests";
import { topics } from "@/data/kpss-history";
import { TopicQuestionRunner } from "@/features/question-bank/components/TopicQuestionRunner";

const levelTitles: Record<TestLevel, string> = {
  kolay: "Kolay testler",
  orta: "Orta testler",
  zor: "Zor testler",
};

const levelDescriptions: Record<TestLevel, string> = {
  kolay: "Temel bilgi, doğrudan kavram ve net tarih bilgisini ölçer.",
  orta: "Olay, kavram, dönem ve sonuç ilişkisini birlikte yoklar.",
  zor: "Seçici yorum, kronoloji, çeldirici ve sık karıştırılan kavramlara odaklanır.",
};

const levelOrder: TestLevel[] = ["kolay", "orta", "zor"];

export function TopicQuestionPage({ topicId, testId, level }: { topicId: string; testId?: string; level?: TestLevel }) {
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const isMixed = topicId === "all";
  const allTests = getTestsForTopic(topicId);
  const tests = getTestsForTopic(topicId, level);
  const selectedTest = testId ? allTests.find((test) => test.id === testId) : null;
  const counts = getTestCountsForTopic(topicId);
  const title = topic ? `${topic.title} testleri` : "Karışık KPSS Tarih testleri";

  if (!isMixed && !topic) {
    return (
      <section className="rounded-[1.8rem] border border-[var(--bureau-line)] bg-white/80 p-8 text-center shadow-[var(--shadow-paper)]">
        <h1 className="text-2xl font-black text-[var(--bureau-ink)]">Konu bulunamadı</h1>
        <Link href="/question-bank" className="btn-primary mt-5" data-dark-button="true">
          Soru bankasına dön
        </Link>
      </section>
    );
  }

  if (selectedTest) {
    const selectedQuestions = getQuestionsForTest(selectedTest.id);

    return (
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`/question-bank/${topicId}${selectedTest.level ? `?level=${selectedTest.level}` : ""}`} className="btn-ghost">
            <ArrowLeft size={17} /> Test listesi
          </Link>
          <Link href="/question-bank" className="btn-ghost">
            Soru bankası
          </Link>
        </div>
        <TopicQuestionRunner questions={selectedQuestions} topicTitle={selectedTest.title} />
      </section>
    );
  }

  if (level) {
    return (
      <section className="space-y-7">
        <QuestionHeader
          eyebrow={isMixed ? "Karma test" : "Konu testi"}
          title={`${title} · ${levelTitles[level]}`}
          description={`${levelDescriptions[level]} Aşağıdaki test kartlarından birini seçerek 30 soruluk oturuma başlayabilirsin.`}
          backHref={`/question-bank/${topicId}`}
          backLabel="Zorluk seçimi"
          icon={isMixed ? <Shuffle size={20} /> : <FileQuestion size={20} />}
        />

        {isMixed ? <MixedTopicsNotice /> : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tests.map((test) => (
            <TestCard key={test.id} topicId={topicId} test={test} isMixed={isMixed} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-7">
      <QuestionHeader
        eyebrow={isMixed ? "Karma pratik" : "Konu pratik"}
        title={title}
        description={
          isMixed
            ? "Tüm KPSS Tarih konularından harmanlanan testlerle genel tekrar yap."
            : "Bu konu için seviyeni seç. Her seviyede düzenli, açıklamalı ve tıklanabilir test oturumları var."
        }
        backHref="/question-bank"
        backLabel="Konulara dön"
        icon={isMixed ? <Shuffle size={20} /> : <BookOpen size={20} />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniStat label="Kolay" value={counts.kolay} />
        <MiniStat label="Orta" value={counts.orta} />
        <MiniStat label="Zor" value={counts.zor} />
      </div>

      {isMixed ? <MixedTopicsNotice /> : null}

      <div className="grid gap-5 lg:grid-cols-3">
        {levelOrder.map((item) => (
          <LevelChoiceCard key={item} topicId={topicId} level={item} isMixed={isMixed} />
        ))}
      </div>
    </section>
  );
}

function QuestionHeader({ eyebrow, title, description, backHref, backLabel, icon }: { eyebrow: string; title: string; description: string; backHref: string; backLabel: string; icon: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[var(--bureau-line)] bg-[var(--bureau-ink)] p-6 text-[var(--bureau-inverse)] shadow-[var(--shadow-stage)] sm:p-8">
      <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[rgba(4,126,137,.26)] blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-80 w-80 rounded-full bg-[rgba(37,63,116,.25)] blur-3xl" />
      </div>
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <Link href={backHref} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.08] px-4 py-2 text-sm font-black text-[var(--bureau-inverse)] transition hover:bg-white/[.13]">
            <ArrowLeft size={16} /> {backLabel}
          </Link>
          <p className="kicker text-[var(--bureau-inverse)]">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.055em] sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--bureau-inverse-copy)]">{description}</p>
        </div>
        <div className="grid size-20 place-items-center rounded-[1.5rem] border border-white/10 bg-white/[.08] text-[var(--bureau-inverse)]">{icon}</div>
      </div>
    </div>
  );
}

function LevelChoiceCard({ topicId, level, isMixed }: { topicId: string; level: TestLevel; isMixed: boolean }) {
  const tests = getTestsForTopic(topicId, level);

  return (
    <Link
      href={`/question-bank/${topicId}?level=${level}`}
      className="group overflow-hidden rounded-[1.7rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.92)] p-5 shadow-[var(--shadow-paper)] transition hover:-translate-y-1 hover:border-[rgba(4,126,137,.26)] hover:shadow-[var(--shadow-float)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(4,126,137,.25)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[var(--bureau-ink)] px-3 py-1 text-xs font-black text-[var(--bureau-inverse)]">{isMixed ? "Karma" : "Konu"}</span>
        <span className="text-xs font-black text-[var(--bureau-muted)]">{tests.length} test</span>
      </div>
      <h2 className="mt-5 text-2xl font-black tracking-[-.04em] text-[var(--bureau-ink)]">{levelTitles[level]}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--bureau-copy)]">
        {isMixed ? `${levelDescriptions[level]} Sorular farklı konulardan seçilir.` : levelDescriptions[level]}
      </p>
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-[var(--bureau-ink)] px-4 py-3 text-sm font-black text-[var(--bureau-inverse)]">
        <span>{tests.length * QUESTIONS_PER_TEST} soru</span>
        <ArrowRight size={17} />
      </div>
    </Link>
  );
}

function TestCard({ topicId, test, isMixed }: { topicId: string; test: GeneratedQuestionTest; isMixed: boolean }) {
  return (
    <Link
      href={`/question-bank/${topicId}?level=${test.level}&test=${test.id}`}
      className="group rounded-[1.5rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.92)] p-5 shadow-[var(--shadow-paper)] transition hover:-translate-y-1 hover:border-[rgba(4,126,137,.26)] hover:shadow-[var(--shadow-float)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(4,126,137,.25)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-[var(--bureau-ink)] text-sm font-black text-[var(--bureau-inverse)]">{test.testNo}</span>
        <span className="rounded-full border border-[var(--bureau-line)] bg-white px-3 py-1 text-xs font-black text-[var(--bureau-copy)]">{test.questionCount} soru</span>
      </div>
      <h2 className="mt-5 text-xl font-black tracking-[-.035em] text-[var(--bureau-ink)]">{test.title}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--bureau-copy)]">
        {isMixed ? "Farklı konulardan hazırlanmış açıklamalı karışık test." : "Açıklamalı 30 soruluk çalışma testi."}
      </p>
      <div className="mt-5 flex items-center justify-between text-sm font-black text-[var(--bureau-teal)]">
        <span>Testi aç</span>
        <ArrowRight size={17} />
      </div>
    </Link>
  );
}

function MixedTopicsNotice() {
  return (
    <div className="rounded-[1.5rem] border border-[rgba(4,126,137,.18)] bg-[rgba(4,126,137,.07)] p-5">
      <p className="kicker">Karışık test konuları</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-.04em] text-[var(--bureau-ink)]">Tüm KPSS Tarih konularından soru gelir.</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span key={topic.id} className="rounded-full border border-[var(--bureau-line)] bg-white px-3 py-1.5 text-xs font-black text-[var(--bureau-copy)]">
            {topic.title}
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.35rem] border border-[var(--bureau-line)] bg-white/80 p-5 text-center shadow-[var(--shadow-paper)]">
      <p className="text-xs font-black uppercase tracking-[.16em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-.04em] text-[var(--bureau-ink)]">{value}</p>
      <p className="mt-1 text-xs font-bold text-[var(--bureau-copy)]">{TESTS_PER_LEVEL} testlik set</p>
    </div>
  );
}
