import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, FileQuestion, Layers3, Shuffle } from "lucide-react";
import { TopicQuestionRunner } from "@/features/question-bank/components/TopicQuestionRunner";
import { getTopicQuestionPageData, type GeneratedQuestionTest } from "@/lib/kpss/supabase-content-repository";

const levelTitles = { kolay: "Kolay testler", orta: "Orta testler", zor: "Zor testler" } as const;
const levelDescriptions = {
  kolay: "Temel bilgi, doğrudan kavram ve net tarih bilgisini ölçer.",
  orta: "Olay, kavram, dönem ve sonuç ilişkisini birlikte yoklar.",
  zor: "Seçici yorum, kronoloji, çeldirici ve sık karıştırılan kavramlara odaklanır.",
} as const;
const levelOrder = ["kolay", "orta", "zor"] as const;
type TestLevel = (typeof levelOrder)[number];

export async function TopicQuestionPage({ topicId, testId, level }: { topicId: string; testId?: string; level?: TestLevel }) {
  const { topics, topic, allTests, visibleTests, selected } = await getTopicQuestionPageData(topicId, testId, level);
  const isMixed = topicId === "all";
  if (!isMixed && !topic) {
    return <main className="space-y-4"><h1 className="text-3xl font-black text-slate-950 dark:text-white">Konu bulunamadı</h1><Link href="/question-bank" className="rounded-full bg-blue-900 px-4 py-2 text-sm font-black text-white">Soru bankasına dön</Link></main>;
  }

  if (selected) {
    return <main className="space-y-6"><div className="flex flex-wrap gap-2"><Link href={`/question-bank/${topicId}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"><ArrowLeft size={16} /> Test listesi</Link><Link href="/question-bank" className="rounded-full bg-blue-900 px-4 py-2 text-sm font-black text-white">Soru bankası</Link></div><TopicQuestionRunner questions={selected.questions} topicTitle={selected.test.title} /></main>;
  }

  const title = topic ? `${topic.title} testleri` : "Karışık KPSS Tarih testleri";
  if (level) {
    return <main className="space-y-8"><QuestionHeader eyebrow="Hazır Supabase testi" title={`${title} · ${levelTitles[level]}`} description={levelDescriptions[level]} backHref={`/question-bank/${topicId}`} backLabel="Seviye seçimine dön" icon={isMixed ? <Shuffle size={28} /> : <FileQuestion size={28} />} />{isMixed ? <MixedTopicsNotice topics={topics} /> : null}<div className="grid gap-4 lg:grid-cols-2">{visibleTests.map((test) => <TestCard key={test.id} topicId={topicId} test={test} isMixed={isMixed} />)}</div></main>;
  }

  return <main className="space-y-8"><QuestionHeader eyebrow="Soru bankası" title={title} description="Seviyeyi seç; testler Supabase’de hazır bekleyen manifestolardan okunur." backHref="/question-bank" backLabel="Soru bankasına dön" icon={isMixed ? <Shuffle size={28} /> : <FileQuestion size={28} />} />{isMixed ? <MixedTopicsNotice topics={topics} /> : null}<div className="grid gap-4 lg:grid-cols-3">{levelOrder.map((item) => <LevelChoiceCard key={item} topicId={topicId} level={item} isMixed={isMixed} tests={allTests.filter((test) => test.level === item)} />)}</div></main>;
}

function QuestionHeader({ eyebrow, title, description, backHref, backLabel, icon }: { eyebrow: string; title: string; description: string; backHref: string; backLabel: string; icon: ReactNode }) {
  return <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-amber-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 md:p-8"><Link href={backHref} className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"><ArrowLeft size={16} />{backLabel}</Link><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-4xl"><p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">{eyebrow}</p><h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">{title}</h1><p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">{description}</p></div><span className="grid size-16 place-items-center rounded-3xl bg-blue-900 text-white shadow-sm">{icon}</span></div></section>;
}

function LevelChoiceCard({ topicId, level, isMixed, tests }: { topicId: string; level: TestLevel; isMixed: boolean; tests: GeneratedQuestionTest[] }) {
  const questionCount = tests.reduce((sum, test) => sum + test.questionCount, 0);
  return <Link href={`/question-bank/${topicId}/${level}`} className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"><p className="text-xs font-black uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">{isMixed ? "Karma" : "Konu"} {tests.length} test</p><h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{levelTitles[level]}</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{isMixed ? `${levelDescriptions[level]} Sorular farklı konulardan seçilir.` : levelDescriptions[level]}</p><div className="mt-6 flex items-center justify-between"><span className="text-sm font-black text-slate-900 dark:text-white">{questionCount} soru</span><ArrowRight className="transition group-hover:translate-x-1" size={18} /></div></Link>;
}

function TestCard({ topicId, test, isMixed }: { topicId: string; test: GeneratedQuestionTest; isMixed: boolean }) {
  return <Link href={`/question-bank/${topicId}/test/${test.id}`} className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Test {test.testNo} · {test.questionCount} soru</p><h2 className="mt-3 text-xl font-black tracking-tight text-slate-950 dark:text-white">{test.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{isMixed ? "Farklı konulardan hazırlanmış açıklamalı karışık test." : "Konu havuzundan hazırlanmış açıklamalı çalışma testi."}</p><div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-900 px-4 py-2 text-sm font-black text-white">Testi aç <ArrowRight size={16} /></div></Link>;
}

function MixedTopicsNotice({ topics }: { topics: Array<{ id: string; title: string }> }) {
  return <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"><div className="mb-3 flex items-center gap-2"><Layers3 size={18} /><h2 className="font-black text-slate-950 dark:text-white">Karışık test konuları</h2></div><div className="flex flex-wrap gap-2">{topics.map((topic) => <span key={topic.id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-900 dark:text-slate-300">{topic.title}</span>)}</div></section>;
}
