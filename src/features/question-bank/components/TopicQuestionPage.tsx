import { ArrowLeft, ArrowRight, Database, FileQuestion } from "lucide-react";
import {
  fetchContentQuestionsForTest,
  fetchContentTestsForTopic,
  fetchContentTopicById,
  type ContentTest,
  type ContentTestLevel
} from "@/lib/content/supabase-content-server";
import { TopicQuestionRunner } from "@/features/question-bank/components/TopicQuestionRunner";

const levels = ["kolay", "orta", "zor"] as const;

const levelTitles: Record<ContentTestLevel, string> = {
  kolay: "Kolay testler",
  orta: "Orta testler",
  zor: "Zor testler"
};

const levelDescriptions: Record<ContentTestLevel, string> = {
  kolay: "Temel bilgileri ve doğrudan kavramları ölçen açıklamalı testler.",
  orta: "Olay, kavram ve sonuç ilişkisini birlikte yoklayan testler.",
  zor: "Seçici yorum, kronoloji ve karıştırılan kavramlara odaklanan testler."
};

export async function TopicQuestionPage({
  topicId,
  testId,
  level
}: {
  topicId: string;
  testId?: string;
  level?: ContentTestLevel;
}) {
  const topic = await fetchContentTopicById(topicId);
  const tests = await fetchContentTestsForTopic(topicId, level);
  const selectedTest = testId ? tests.find((test) => test.id === testId) : null;

  if (selectedTest) {
    const questions = await fetchContentQuestionsForTest(selectedTest.id);

    console.log(`[question-bank] Supabase’den parça parça yükleniyor | test=${selectedTest.id} | soru=${questions.length}`);

    return (
      <div className="grid gap-6">
        <section className="relative overflow-hidden rounded-[2.75rem] border border-white/75 bg-white/78 p-6 shadow-[0_32px_105px_rgba(16,24,40,.12)] backdrop-blur-xl md:p-8">
          <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#bfdbfe]/70 blur-3xl" />
          <div className="relative z-10">
            <a href={`/question-bank/${topicId}${level ? `?level=${level}` : ""}`} className="inline-flex items-center gap-2 rounded-full border border-[#e4d8c8] bg-white/85 px-4 py-2 text-sm font-black text-[#101828]">
              <ArrowLeft size={17} />
              Test listesi
            </a>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Açıklamalı test</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[#101828] md:text-6xl">{selectedTest.title}</h1>
            <p className="mt-3 max-w-3xl text-sm font-bold leading-7 text-[#475467]">
              Bu testte yalnızca seçili testin soruları yüklenir.
            </p>
          </div>
        </section>

        <div className="rounded-[1.5rem] border border-[#c7d2fe] bg-white/86 p-4 text-[#172554] shadow-[0_16px_44px_rgba(16,24,40,.07)]">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-[#101828] text-white"><Database size={18} /></span>
            <div>
              <p className="text-sm font-black">Test hazırlandı</p>
              <p className="text-xs font-bold opacity-75">Yüklenen soru sayısı: {questions.length}</p>
            </div>
          </div>
        </div>

        {questions.length > 0 ? (
          <TopicQuestionRunner questions={questions} topicTitle={topic?.title ?? selectedTest.title} />
        ) : (
          <div className="rounded-[2rem] border border-[#f7b2b7] bg-[#fff1f2] p-6 text-sm font-black text-[#b4232a]">
            Bu test için soru gelmedi. Supabase content_questions tablosunu kontrol et.
          </div>
        )}
      </div>
    );
  }

  if (level) {
    return (
      <div className="grid gap-6">
        <Header title={levelTitles[level]} href={`/question-bank/${topicId}`} label="Zorluk seçimi" eyebrow={topic?.title ?? "Konu testi"} />
        <p className="max-w-3xl text-sm font-bold leading-7 text-[#475467]">{levelDescriptions[level]}</p>
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tests.map((test) => <TestCard key={test.id} topicId={topicId} level={level} test={test} />)}
        </section>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Header title={topic?.title ?? "Konu testleri"} href="/question-bank" label="Soru bankası" eyebrow="Zorluk seçimi" />
      <section className="grid gap-4 md:grid-cols-3">
        {levels.map((item) => (
          <a key={item} href={`/question-bank/${topicId}?level=${item}`} className="group relative z-10 rounded-[2rem] border border-white/75 bg-white/80 p-5 shadow-[0_20px_65px_rgba(16,24,40,.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(16,24,40,.12)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">20 test</p>
            <h2 className="mt-3 text-2xl font-black text-[#101828]">{levelTitles[item]}</h2>
            <p className="mt-3 text-sm font-bold leading-6 text-[#475467]">{levelDescriptions[item]}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#101828]">
              Testleri gör <ArrowRight className="transition group-hover:translate-x-1" size={17} />
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}

function Header({ title, href, label, eyebrow }: { title: string; href: string; label: string; eyebrow: string }) {
  return (
    <section className="relative overflow-hidden rounded-[2.75rem] border border-white/75 bg-white/78 p-6 shadow-[0_32px_105px_rgba(16,24,40,.12)] backdrop-blur-xl md:p-8">
      <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#fed7aa]/70 blur-3xl" />
      <div className="relative z-10">
        <a href={href} className="inline-flex items-center gap-2 rounded-full border border-[#e4d8c8] bg-white/85 px-4 py-2 text-sm font-black text-[#101828]">
          <ArrowLeft size={17} /> {label}
        </a>
        <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[#101828] md:text-6xl">{title}</h1>
      </div>
    </section>
  );
}

function TestCard({ topicId, level, test }: { topicId: string; level: ContentTestLevel; test: ContentTest }) {
  return (
    <a href={`/question-bank/${topicId}?level=${level}&test=${test.id}`} className="group relative z-10 rounded-[1.7rem] border border-white/75 bg-white/84 p-5 shadow-[0_18px_55px_rgba(16,24,40,.07)] transition hover:-translate-y-1 hover:shadow-[0_26px_76px_rgba(16,24,40,.12)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#101828] px-3 py-1 text-xs font-black text-white">Test {test.testNo}</span>
        <span className="inline-flex items-center gap-1 text-xs font-black text-[#667085]"><FileQuestion size={14} /> {test.questionCount} soru</span>
      </div>
      <h3 className="text-lg font-black text-[#101828]">{test.title}</h3>
      <p className="mt-2 text-sm font-bold text-[#475467]">Açıklamalı çalışma testi.</p>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#101828]">
        Başla <ArrowRight className="transition group-hover:translate-x-1" size={17} />
      </div>
    </a>
  );
}
