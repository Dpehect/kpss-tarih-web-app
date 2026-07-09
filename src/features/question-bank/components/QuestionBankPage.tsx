import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BookOpen, FileQuestion, Layers3, Shuffle, Target } from "lucide-react";
import { getQuestionBankPageData } from "@/lib/kpss/supabase-content-repository";
import type { Topic } from "@/types/study";

const levelLabels = { kolay: "Kolay", orta: "Orta", zor: "Zor" } as const;
const levelDescriptions = {
  kolay: "Temel kavramları, doğrudan bilgi sorularını ve net tarih bilgisini hızlıca ölçer.",
  orta: "Olay, kurum, sonuç ve dönem ilişkisini birlikte yoklar; gerçek sınav temposuna yakındır.",
  zor: "Kronoloji, çeldirici, yorum ve sık karıştırılan ayrımları hedefler.",
} as const;
const levels = ["kolay", "orta", "zor"] as const;

export async function QuestionBankPage() {
  const { topics, topicQuestionTests, mixedQuestionTests } = await getQuestionBankPageData();
  const topicQuestionCount = topicQuestionTests.reduce((sum, test) => sum + test.questionCount, 0);
  const mixedQuestionCount = mixedQuestionTests.reduce((sum, test) => sum + test.questionCount, 0);

  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-amber-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 md:p-8">
        <div className="relative z-10 max-w-4xl space-y-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Supabase hazır soru bankası</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">Konu seç, seviyeyi belirle, açıklamalı teste gir.</h1>
          <p className="text-base leading-8 text-slate-700 dark:text-slate-300">Sorular deploy sırasında tekrar üretilmez. Supabase’de hazır bekleyen test manifestoları okunur; her testte tekrar kontrolü ve doğru cevap eşleşmesi audit edilir.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/question-bank/all" className="rounded-full bg-blue-900 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-800">Karma testleri aç</Link>
            <Link href="/topics" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">Konu anlatımlarına dön</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <SummaryCard icon={<BookOpen size={18} />} label="Konu" value={topics.length} />
        <SummaryCard icon={<FileQuestion size={18} />} label="Konu testi" value={topicQuestionTests.length} />
        <SummaryCard icon={<Target size={18} />} label="Konu sorusu" value={topicQuestionCount} />
        <SummaryCard icon={<Shuffle size={18} />} label="Karma test" value={`${mixedQuestionTests.length} / ${mixedQuestionCount}`} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {levels.map((level) => (
          <MixedTestCard key={level} level={level} tests={mixedQuestionTests.filter((test) => test.level === level)} topics={topics} />
        ))}
      </section>

      <section className="space-y-4">
        <SectionTitle eyebrow="Konu testleri" title="Her konu kendi soru havuzundan çalışır." description="Kolay, orta ve zor testler konu dışına taşmadan ilgili havuzdan çekilir." />
        <div className="grid gap-5 lg:grid-cols-2">
          {topics.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} tests={topicQuestionTests.filter((test) => test.topicId === topic.id)} />
          ))}
        </div>
      </section>
    </main>
  );
}

function MixedTestCard({ level, tests, topics }: { level: keyof typeof levelLabels; tests: Array<{ questionCount: number }>; topics: Topic[] }) {
  const questionCount = tests.reduce((sum, test) => sum + test.questionCount, 0);
  return <Link href={`/question-bank/all/${level}` as any} className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"><p className="text-xs font-black uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">Karma {tests.length} test</p><h2 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{levelLabels[level]} karma testler</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{levelDescriptions[level]} Sorular farklı konulardan harmanlanır.</p><p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Kapsam</p><p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{topics.slice(0, 4).map((topic) => topic.title).join(", ")} ve {Math.max(0, topics.length - 4)} konu daha</p><div className="mt-6 flex items-center justify-between"><span className="text-sm font-black text-slate-900 dark:text-white">{questionCount} soru</span><ArrowRight className="transition group-hover:translate-x-1" size={18} /></div></Link>;
}

function TopicCard({ topic, index, tests }: { topic: Topic; index: number; tests: Array<{ level: string; questionCount: number }> }) {
  const totalQuestions = tests.reduce((sum, test) => sum + test.questionCount, 0);
  const mustKnow = topic.mustKnow?.slice(0, 4) ?? [];
  return <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{topic.title}</h2></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-800 dark:bg-blue-950 dark:text-blue-200">{tests.length} test</span></div><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{topic.shortDescription}</p><div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Bilmen gerekenler</p><ul className="mt-3 space-y-2">{mustKnow.map((item) => <li key={item} className="flex gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300"><Layers3 className="mt-0.5 shrink-0 text-amber-600" size={15} />{item}</li>)}</ul></div><div className="mt-5 flex flex-wrap items-center gap-2"><Link href={`/topics/${topic.slug}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">Konuyu aç</Link>{levels.map((level) => <Link key={level} href={`/question-bank/${topic.slug}/${level}` as any} className="rounded-full bg-blue-900 px-4 py-2 text-sm font-black text-white shadow-sm hover:bg-blue-800">{levelLabels[level]}</Link>)}</div><p className="mt-4 text-xs font-bold text-slate-500">{totalQuestions} hazır soru · Supabase’den okunur</p></article>;
}

function SummaryCard({ icon, label, value }: { icon: ReactNode; label: string; value: number | string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">{icon}{label}</div><p className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{value}</p></div>;
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div><p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">{eyebrow}</p><h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{title}</h2><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p></div>;
}
