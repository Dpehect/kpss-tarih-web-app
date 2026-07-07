import { ArrowLeft, ArrowRight, BookOpen, FileQuestion, Layers3, Shuffle } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import {
  QUESTIONS_PER_TEST,
  getQuestionsForTest,
  getTestCountsForTopic,
  getTestsForTopic,
  type GeneratedQuestionTest,
  type TestLevel
} from "@/data/generated-30-question-tests";
import { topics } from "@/data/kpss-history";
import { TopicQuestionRunner } from "@/features/question-bank/components/TopicQuestionRunner";

const levelTitles: Record<TestLevel, string> = {
  kolay: "Kolay testler",
  orta: "Orta testler",
  zor: "Zor testler"
};

const levelDescriptions: Record<TestLevel, string> = {
  kolay: "Temel bilgi, doğrudan kavram ve net tarih bilgisini ölçer.",
  orta: "Olay, kavram, dönem ve sonuç ilişkisini birlikte yoklar.",
  zor: "Seçici yorum, kronoloji, çeldirici ve karıştırılan kavramlara odaklanır."
};

const levelOrder: TestLevel[] = ["kolay", "orta", "zor"];

export function TopicQuestionPage({
  topicId,
  testId,
  level
}: {
  topicId: string;
  testId?: string;
  level?: TestLevel;
}) {
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const isMixed = topicId === "all";
  const allTests = getTestsForTopic(topicId);
  const tests = getTestsForTopic(topicId, level);
  const selectedTest = testId ? allTests.find((test) => test.id === testId) : null;
  const counts = getTestCountsForTopic(topicId);
  const title = topic ? `${topic.title} testleri` : "Karışık KPSS Tarih testleri";

  if (!isMixed && !topic) {
    return (
      <div className="bureau-card rounded-[2rem] p-6">
        <h1 className="text-3xl font-black text-[var(--bureau-ink)]">Konu bulunamadı</h1>
        <a href="/question-bank" className="btn-primary mt-5" data-dark-button="true">
          Soru bankasına dön
          <ArrowRight size={17} />
        </a>
      </div>
    );
  }

  if (selectedTest) {
    const selectedQuestions = getQuestionsForTest(selectedTest.id);

    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow={selectedTest.levelLabel}
          title={selectedTest.title}
          description={`${selectedTest.questionCount} soruluk açıklamalı çalışma testi. Cevapladıktan sonra gerekçeyi okuyup sonraki soruya geç.`}
          actions={
            <a href={`/question-bank/${topicId}?level=${selectedTest.level}`} className="btn-ghost">
              <ArrowLeft size={17} />
              Test listesi
            </a>
          }
        />

        {isMixed ? <MixedTopicsNotice /> : null}

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
          description={`${tests.length} test, toplam ${tests.length * QUESTIONS_PER_TEST} soru. Her test ${QUESTIONS_PER_TEST} sorudan oluşur.`}
          actions={
            <a href={`/question-bank/${topicId}`} className="btn-ghost">
              <ArrowLeft size={17} />
              Zorluk seçimi
            </a>
          }
        />

        {isMixed ? <MixedTopicsNotice /> : null}

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tests.map((test) => (
            <TestCard key={test.id} topicId={topicId} test={test} isMixed={isMixed} />
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Soru bankası"
        title={title}
        description={
          isMixed
            ? `Karışık testlerde bütün KPSS Tarih konularından soru gelir. Toplam ${counts.totalTests} test ve ${counts.totalQuestions} soru var.`
            : `Önce zorluk seviyesini seç. Bu konuda toplam ${counts.totalTests} test ve ${counts.totalQuestions} soru var.`
        }
        actions={
          <a href="/question-bank" className="btn-ghost">
            <ArrowLeft size={17} />
            Konulara dön
          </a>
        }
      />

      {isMixed ? <MixedTopicsNotice /> : null}

      <section className="grid gap-5 md:grid-cols-3">
        {levelOrder.map((item) => (
          <LevelChoiceCard key={item} topicId={topicId} level={item} isMixed={isMixed} />
        ))}
      </section>
    </div>
  );
}

function LevelChoiceCard({ topicId, level, isMixed }: { topicId: string; level: TestLevel; isMixed: boolean }) {
  const tests = getTestsForTopic(topicId, level);
  const tone = {
    kolay: "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]",
    orta: "bg-[var(--bureau-blue-soft)] text-[var(--bureau-blue)]",
    zor: "bg-[var(--bureau-plum-soft)] text-[var(--bureau-plum)]"
  }[level];

  return (
    <a
      href={`/question-bank/${topicId}?level=${level}`}
      className="bureau-card group flex min-h-[300px] flex-col justify-between rounded-[2rem] p-6"
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className={`grid size-12 place-items-center rounded-[1rem] ${tone}`}>
            {isMixed ? <Shuffle size={20} /> : <BookOpen size={20} />}
          </span>
          <span className="rounded-full bg-[rgba(255,250,242,.78)] px-3 py-1 text-xs font-black text-[var(--bureau-copy)]">
            {tests.length} test
          </span>
        </div>

        <h2 className="mt-7 text-3xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">{levelTitles[level]}</h2>
        <p className="mt-4 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
          {isMixed ? `${levelDescriptions[level]} Sorular farklı konulardan seçilir.` : levelDescriptions[level]}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--bureau-line)] pt-5">
        <span className="text-sm font-black text-[var(--bureau-ink)]">{tests.length * QUESTIONS_PER_TEST} soru</span>
        <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--bureau-teal)]">
          Testleri gör
          <ArrowRight size={17} />
        </span>
      </div>
    </a>
  );
}

function TestCard({
  topicId,
  test,
  isMixed
}: {
  topicId: string;
  test: GeneratedQuestionTest;
  isMixed: boolean;
}) {
  return (
    <a
      href={`/question-bank/${topicId}?level=${test.level}&test=${test.id}`}
      className="bureau-card group flex min-h-[270px] flex-col justify-between rounded-[2rem] p-6"
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[var(--bureau-blue-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-blue)]">
            Test {test.testNo}
          </span>
          <span className="rounded-full bg-[rgba(255,250,242,.78)] px-3 py-1 text-xs font-black text-[var(--bureau-copy)]">
            {test.questionCount} soru
          </span>
        </div>

        <h2 className="mt-7 text-2xl font-black leading-tight tracking-[-0.055em] text-[var(--bureau-ink)]">
          {test.title}
        </h2>
        <p className="mt-4 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
          {isMixed ? "Farklı konulardan hazırlanmış açıklamalı karışık test." : "Açıklamalı 30 soruluk çalışma testi."}
        </p>

        {isMixed ? (
          <div className="mt-4 rounded-[1.2rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bureau-muted)]">Konular</p>
            <p className="mt-2 text-xs font-semibold leading-6 text-[var(--bureau-copy)]">
              {topics.slice(0, 5).map((topic) => topic.title).join(", ")} ve {topics.length - 5} konu daha
            </p>
          </div>
        ) : null}
      </div>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[var(--bureau-teal)]">
        Testi aç
        <ArrowRight size={17} />
      </span>
    </a>
  );
}

function MixedTopicsNotice() {
  return (
    <section className="bureau-card rounded-[2rem] p-5">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-[1rem] bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]">
          <Layers3 size={20} />
        </span>
        <div>
          <p className="bureau-kicker">Karışık test konuları</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.055em] text-[var(--bureau-ink)]">
            Bu testlerde tüm KPSS Tarih konularından soru gelir.
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic.id}
                className="rounded-full border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] px-3 py-1 text-xs font-black text-[var(--bureau-copy)]"
              >
                {topic.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
