import { ArrowLeft, ArrowRight, BookOpen, FileQuestion, Shuffle } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import {
  getQuestionsForTest,
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
  kolay: "Temel bilgileri ve doğrudan kavramları ölçen testler.",
  orta: "Olay, kavram ve sonuç ilişkisini birlikte yoklayan testler.",
  zor: "Seçici yorum, kronoloji ve karıştırılan kavramlara odaklanan testler."
};

export function TopicQuestionPage({ topicId, testId, level }: { topicId: string; testId?: string; level?: TestLevel }) {
  const topic = topicId === "all" ? null : topics.find((item) => item.id === topicId);
  const tests = getTestsForTopic(topicId, level);
  const selectedTest = testId ? tests.find((test) => test.id === testId) : null;
  const title = topic ? `${topic.title} testleri` : "Karışık KPSS Tarih testleri";
  const isMixed = topicId === "all";

  if (selectedTest) {
    const selectedQuestions = getQuestionsForTest(selectedTest.id);

    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow={selectedTest.levelLabel}
          title={selectedTest.title}
          description={
            isMixed
              ? "Bu karışık test 30 sorudan oluşur. Sorular farklı KPSS Tarih konularından gelir."
              : "Bu test 30 sorudan oluşur. Soruları çözdükten sonra kısa açıklamayı okuyarak konuyu pekiştirebilirsin."
          }
          actions={
            <a href={`/question-bank/${topicId}${level ? `?level=${level}` : ""}`} className="btn-ghost px-5 py-3">
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
          description={
            isMixed
              ? "Bu bölümde seçtiğin zorluk düzeyine ait 10 karışık test bulunur. Her test 30 sorudur."
              : "Bu bölümde seçtiğin zorluk düzeyine ait 10 test bulunur. Her test 30 sorudan oluşur."
          }
          actions={
            <a href={`/question-bank/${topicId}`} className="btn-ghost px-5 py-3">
              <ArrowLeft size={17} />
              Zorluk seçimi
            </a>
          }
        />

        {isMixed ? <MixedTopicsNotice /> : null}

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tests.map((test) => (
            <TestCard key={test.id} topicId={topicId} test={test} level={level} isMixed={isMixed} />
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={isMixed ? "Karışık testler" : "Konu testleri"}
        title={isMixed ? "Karışık testlerde zorluk seç" : title}
        description={
          isMixed
            ? "Karışık testlerde sorular farklı konulardan gelir. Önce zorluk düzeyini seç, sonra testlerden birini aç."
            : "Önce zorluk düzeyini seç. Her zorlukta 10 test, her testte 30 soru bulunur."
        }
        actions={
          <a href="/question-bank" className="btn-ghost px-5 py-3">
            <ArrowLeft size={17} />
            Soru bankası
          </a>
        }
      />

      {isMixed ? <MixedTopicsNotice /> : null}

      <section className="grid gap-5 lg:grid-cols-3">
        {(["kolay", "orta", "zor"] as const).map((item) => (
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
    <a href={`/question-bank/${topicId}?level=${level}`} className="group bureau-card rounded-[2rem] p-5">
      <div className="flex items-start justify-between gap-4">
        <span className={`grid size-12 place-items-center rounded-[1rem] ${tone}`}>
          {isMixed ? <Shuffle size={20} /> : <BookOpen size={20} />}
        </span>
        <span className="rounded-full bg-[var(--bureau-teal-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-teal)]">
          {tests.length} test
        </span>
      </div>

      <h2 className="mt-6 text-3xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">
        {levelTitles[level]}
      </h2>
      <p className="mt-3 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
        {isMixed ? `${levelDescriptions[level]} Sorular farklı konulardan seçilir.` : levelDescriptions[level]}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-[var(--bureau-line)] pt-5">
        <span className="text-sm font-black text-[var(--bureau-ink)]">
          Testleri gör
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--bureau-muted)]">
          300 soru
          <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}

function TestCard({
  topicId,
  test,
  level,
  isMixed
}: {
  topicId: string;
  level: TestLevel;
  test: GeneratedQuestionTest;
  isMixed: boolean;
}) {
  return (
    <a
      href={`/question-bank/${topicId}?level=${level}&test=${test.id}`}
      className="group bureau-card rounded-[1.6rem] p-5 transition hover:-translate-y-1"
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

      <p className="mt-4 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
        {isMixed ? "Farklı konulardan hazırlanmış açıklamalı karışık test." : "Açıklamalı 30 soruluk çalışma testi."}
      </p>

      {isMixed ? (
        <div className="mt-4 rounded-[1.15rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-3">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bureau-muted)]">
            Konular
          </p>
          <p className="mt-2 text-xs font-semibold leading-6 text-[var(--bureau-copy)]">
            {topics.slice(0, 5).map((topic) => topic.title).join(", ")} ve {topics.length - 5} konu daha
          </p>
        </div>
      ) : null}

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--bureau-ink)]">
        Testi aç
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </span>
    </a>
  );
}

function MixedTopicsNotice() {
  return (
    <section className="rounded-[1.75rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] p-5">
      <p className="bureau-kicker">Karışık test konuları</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-[var(--bureau-ink)]">
        Bu testlerde tüm KPSS Tarih konularından soru gelir.
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            key={topic.id}
            className="rounded-full border border-[var(--bureau-line)] bg-[rgba(255,250,242,.80)] px-3 py-1 text-xs font-black text-[var(--bureau-copy)]"
          >
            {topic.title}
          </span>
        ))}
      </div>
    </section>
  );
}
