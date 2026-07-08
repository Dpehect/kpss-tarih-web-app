import { ArrowLeft, ClipboardList, Clock, FileQuestion } from "lucide-react";
import type { Topic } from "@/types/study";

export function TopicDetailPage({ topic }: { topic: Topic }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="rounded-[2rem] border border-[#e4d8c8] bg-white p-6 shadow-[0_24px_80px_rgba(16,24,40,.08)]">
        <a href="/topics" className="inline-flex items-center gap-2 rounded-full border border-[#e4d8c8] bg-[#fffaf3] px-4 py-2 text-sm font-black text-[#101828]">
          <ArrowLeft size={17} /> Konular
        </a>
        <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Supabase konu detayı</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[#101828] md:text-6xl">{topic.title}</h1>
        <p className="mt-4 max-w-3xl text-sm font-bold leading-7 text-[#475467]">{topic.shortDescription}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Badge icon={<Clock size={16} />} text={`${topic.estimatedMinutes} dk`} />
          <Badge icon={<FileQuestion size={16} />} text={`Önem %${topic.examImportance}`} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-4">
          {topic.summary.map((block) => (
            <article key={block.heading} className="rounded-[1.75rem] border border-[#e4d8c8] bg-white p-5">
              <h2 className="text-2xl font-black tracking-[-0.045em] text-[#101828]">{block.heading}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#475467]">{block.body}</p>
              <ul className="mt-4 grid gap-2">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-2xl bg-[#fffaf3] px-4 py-3 text-sm font-bold leading-6 text-[#344054]">{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <aside className="grid content-start gap-4">
          <Panel title="Mutlaka bil" items={topic.mustKnow} />
          <Panel title="Sık hata" items={topic.commonMistakes} />
          <a href={`/question-bank/${topic.id}`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#101828] px-5 text-sm font-black text-white">
            Bu konudan test çöz
          </a>
        </aside>
      </section>
    </div>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <span className="inline-flex items-center gap-2 rounded-full bg-[#fffaf3] px-4 py-2 text-sm font-black text-[#101828]">{icon}{text}</span>;
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[1.75rem] border border-[#e4d8c8] bg-white p-5">
      <div className="mb-4 flex items-center gap-2 text-[#101828]">
        <ClipboardList size={18} />
        <h2 className="text-sm font-black uppercase tracking-[0.12em]">{title}</h2>
      </div>
      <div className="grid gap-2">
        {items.map((item) => <p key={item} className="rounded-2xl bg-[#fffaf3] p-3 text-xs font-bold leading-5 text-[#475467]">{item}</p>)}
      </div>
    </section>
  );
}
