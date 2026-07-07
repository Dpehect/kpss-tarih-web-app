import { ArrowLeft, ArrowRight, BookOpen, FileQuestion } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import { getQuestionsForTest, getTestsForTopic, type TestLevel } from "@/data/generated-30-question-tests";
import { topics } from "@/data/kpss-history";
import { TopicQuestionRunner } from "@/features/question-bank/components/TopicQuestionRunner";

const levelTitles: Record<TestLevel, string> = {
  kolay: "Kolay Testler",
  orta: "Orta Testler",
  zor: "Zor Testler"
};

export function TopicQuestionPage({ topicId, testId, level }: { topicId: string; testId?: string; level?: TestLevel }) {
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const tests = getTestsForTopic(topicId, level);
  const selectedTest = testId ? tests.find((test) => test.id === testId) : null;
  const title = topic ? `${topic.title} testleri` : "Karma KPSS Tarih testleri";

  if (selectedTest) {
    const selectedQuestions = getQuestionsForTest(selectedTest.id);

    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow={selectedTest.levelLabel}
          title={selectedTest.title}
          description="Bu test 30 sorudan oluşur. Soruları çözdükten sonra kısa açıklamayı okuyarak konuyu pekiştirebilirsin."
          actions={
            <a href={`/question-bank/${topicId}${level ? `?level=${level}` : ""}`} className="btn-ghost px-5 py-3">
              <ArrowLeft size={17} />
              Test listesi
            </a>
          }
        />

        <TopicQuestionRunner questions={selectedQuestions} topicTitle={selectedTest.title} />
      </div>
    );
  }

  if (level) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow={levelTitles[level]}
          title={title}
          description="Bu bölümde seçtiğin zorluk düzeyine ait 10 test bulunur. Her test 30 sorudan oluşur."
          actions={
            <a href="/question-bank" className="btn-ghost px-5 py-3">
              <ArrowLeft size={17} />
              Soru bankası
            </a>
          }
        />

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tests.map((test) => (
            <TestCard key={test.id} topicId={topicId} test={test} level={level} />
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Test Listesi"
        title={title}
        description="Her zorluk düzeyinde 10 test bulunur. Her test 30 sorudan oluşur."
        actions={
          <a href="/question-bank" className="btn-ghost px-5 py-3">
            <ArrowLeft size={17} />
            Soru bankası
          </a>
        }
      />

      <section className="grid gap-5 lg:grid-cols-3">
        <LevelColumn level="kolay" title="Kolay Testler" topicId={topicId} tests={tests.filter((test) => test.level === "kolay")} />
        <LevelColumn level="orta" title="Orta Testler" topicId={topicId} tests={tests.filter((test) => test.level === "orta")} />
        <LevelColumn level="zor" title="Zor Testler" topicId={topicId} tests={tests.filter((test) => test.level === "zor")} />
      </section>
    </div>
  );
}

function LevelColumn({
  title,
  topicId,
  tests,
  level
}: {
  title: string;
  topicId: string;
  level: TestLevel;
  tests: Array<{
    id: string;
    title: string;
    testNo: number;
    questionCount: number;
  }>;
}) {
  const tone = {
    kolay: "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]",
    orta: "bg-[var(--bureau-blue-soft)] text-[var(--bureau-blue)]",
    zor: "bg-[var(--bureau-plum-soft)] text-[var(--bureau-plum)]"
  }[level];

  return (
    <div className="bureau-card rounded-[2rem] p-5">
      <div className="flex items-center gap-3">
        <span className={`grid size-12 place-items-center rounded-[1rem] ${tone}`}>
          <BookOpen size={20} />
        </span>
        <div>
          <p className="bureau-kicker">{tests.length} test</p>
          <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--bureau-ink)]">{title}</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {tests.map((test) => (
          <TestCard key={test.id} topicId={topicId} test={test} level={level} />
        ))}
      </div>
    </div>
  );
}

function TestCard({
  topicId,
  test,
  level
}: {
  topicId: string;
  level: TestLevel;
  test: {
    id: string;
    testNo: number;
    questionCount: number;
  };
}) {
  return (
    <a
      href={`/question-bank/${topicId}?level=${level}&test=${test.id}`}
      className="group rounded-[1.25rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.76)] p-4 transition hover:bg-white"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-black text-[var(--bureau-ink)]">
          <FileQuestion size={17} />
          Test {test.testNo}
        </span>
        <span className="rounded-full bg-[var(--bureau-teal-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-teal)]">
          {test.questionCount} soru
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bureau-copy)]">
        Açıklamalı 30 soruluk çalışma testi.
      </p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[var(--bureau-ink)]">
        Testi aç
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </span>
    </a>
  );
}
