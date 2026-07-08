import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, BookOpen, BrainCircuit, CheckCircle2, Clock3, FileQuestion, KeyRound, Map, Target, TriangleAlert } from "lucide-react";
import { MarkTopicCompleteButton } from "@/features/topics/components/MarkTopicCompleteButton";
import { getTopicDataBySlug } from "@/lib/kpss/supabase-content-repository";

export async function TopicDetailPage({ slug }: { slug: string }) {
  const data = await getTopicDataBySlug(slug);
  if (!data) notFound();

  const { topic, questions, flashcards, glossary, tests } = data;
  const examPattern = buildExamPattern(topic.title);
  const totalQuestions = tests.reduce((sum, test) => sum + test.questionCount, 0) || questions.length;

  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/80 to-amber-50/70 p-6 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 md:p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl space-y-4">
            <Link href="/topics" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <ArrowLeft size={16} /> Konulara dön
            </Link>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Supabase bilgi havuzu</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">{topic.title}</h1>
            <p className="max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">{topic.shortDescription}</p>
            <div className="flex flex-wrap gap-2">
              {topic.keywords.slice(0, 10).map((keyword) => (
                <span key={keyword} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-200">{keyword}</span>
              ))}
            </div>
          </div>
          <MarkTopicCompleteButton topicId={topic.id} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Metric icon={<Target size={18} />} label="Sınav önemi" value={`%${topic.examImportance}`} helper="KPSS ağırlığı" />
        <Metric icon={<Clock3 size={18} />} label="Önerilen süre" value={`${topic.estimatedMinutes} dk`} helper="Odaklı çalışma" />
        <Metric icon={<FileQuestion size={18} />} label="Test / soru" value={`${tests.length} / ${totalQuestions}`} helper="Supabase hazır" />
        <Metric icon={<BrainCircuit size={18} />} label="Tekrar kartı" value={flashcards.length} helper="Aktif hatırlama" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <DetailPanel icon={<BookOpen size={20} />} title="Kitap tarzı konu anlatımı">
            <div className="space-y-7">
              {topic.summary.map((block, index) => (
                <article key={`${block.heading}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-blue-900 text-xs font-black text-white">{String(index + 1).padStart(2, "0")}</span>
                    <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">{block.heading}</h2>
                  </div>
                  <p className="whitespace-pre-line text-sm leading-8 text-slate-700 dark:text-slate-300">{block.body}</p>
                  {block.bullets?.length ? (
                    <ul className="mt-4 grid gap-2 md:grid-cols-2">
                      {block.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={16} /> {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </DetailPanel>
        </div>

        <aside className="space-y-5">
          <SidePanel icon={<Target size={18} />} title="Sınavda nasıl gelir?">
            <div className="space-y-3">
              {examPattern.map((item) => <ExamTip key={item.title} {...item} />)}
            </div>
          </SidePanel>
          <SidePanel icon={<Map size={18} />} title="Mini timeline">
            <div className="space-y-3">
              {topic.quickTimeline.map((event, index) => (
                <div key={`${event.date}-${event.event}`} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">{index + 1}. {event.date}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">{event.event}</p>
                </div>
              ))}
            </div>
          </SidePanel>
          <SidePanel icon={<TriangleAlert size={18} />} title="Sık hata kontrolü">
            <ul className="space-y-2">
              {topic.commonMistakes.map((mistake) => <li key={mistake} className="rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">{mistake}</li>)}
            </ul>
          </SidePanel>
          <SidePanel icon={<KeyRound size={18} />} title="Sözlük ve kartlar">
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">Bu konuya bağlı {glossary.length} sözlük maddesi, {flashcards.length} flashcard ve {questions.length} temel soru Supabase havuzunda hazır bekliyor.</p>
            <div className="mt-4 grid gap-2">
              <Link href={`/question-bank/${topic.id}`} className="rounded-full bg-blue-900 px-4 py-3 text-center text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-800">Açıklamalı test çöz</Link>
              <Link href="/flashcards" className="rounded-full border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">Kartlarla tekrar et</Link>
            </div>
          </SidePanel>
        </aside>
      </section>
    </main>
  );
}

function buildExamPattern(title: string) {
  return [
    { title: "Kavram sorusu", body: `${title} başlığında kavramın tanımı kadar kurum, dönem, savaş veya sonuç ilişkisi de yoklanır.` },
    { title: "Öncül yorumu", body: "I-II-III tipindeki öncüllerde çeldirici genellikle doğru bilgi gibi görünür ama dönem veya sonuç bakımından yanlıştır." },
    { title: "Kronoloji ayrımı", body: "Benzer olaylar arasında önce-sonra ilişkisini kurmak özellikle antlaşma, kongre, savaş ve inkılap sorularında belirleyicidir." },
  ];
}

function Metric({ icon, label, value, helper }: { icon: ReactNode; label: string; value: string | number; helper: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">{icon}{label}</div><p className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{value}</p><p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{helper}</p></div>;
}

function DetailPanel({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return <section className="rounded-[2rem] border border-slate-200 bg-slate-50/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 md:p-5"><div className="mb-5 flex items-center gap-3 px-1"><span className="grid size-10 place-items-center rounded-2xl bg-blue-900 text-white">{icon}</span><h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">{title}</h2></div>{children}</section>;
}

function SidePanel({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"><div className="mb-4 flex items-center gap-2 text-slate-950 dark:text-white">{icon}<h3 className="font-black tracking-tight">{title}</h3></div>{children}</section>;
}

function ExamTip({ title, body }: { title: string; body: string }) {
  return <div className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/40"><h3 className="text-sm font-black text-blue-950 dark:text-blue-100">{title}</h3><p className="mt-2 text-sm leading-6 text-blue-900/80 dark:text-blue-200/85">{body}</p></div>;
}
