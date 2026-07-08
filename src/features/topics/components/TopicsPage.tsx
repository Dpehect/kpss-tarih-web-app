import { ArrowRight, Clock, FileQuestion, Sparkles } from "lucide-react";
import type { Topic } from "@/types/study";

export function TopicsPage({ topics }: { topics: Topic[] }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/78 p-6 shadow-[0_28px_90px_rgba(16,24,40,.10)] backdrop-blur-xl md:p-8">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#fed7aa]/70 blur-3xl" />
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Konu atlası</p>
          <h1 className="mt-3 text-5xl font-black leading-[0.92] tracking-[-0.08em] text-[#101828] md:text-7xl">
            KPSS Tarih konuları
          </h1>
          <p className="mt-5 max-w-3xl text-sm font-bold leading-7 text-[#475467]">
            Premium görünüm korunur; içerik Supabase’den okunur, localde ağır veri tutulmaz.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((topic, index) => (
          <a key={topic.id} href={`/topics/${topic.slug}`} className="group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/75 bg-white/78 p-5 shadow-[0_20px_65px_rgba(16,24,40,.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(16,24,40,.12)]">
            <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute right-[-3rem] top-[-3rem] size-32 rounded-full bg-[#fff7ed] blur-2xl" />
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#101828] px-3 py-1 text-xs font-black text-white">{String(index + 1).padStart(2, "0")}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fffaf3] px-3 py-1 text-xs font-black text-[#101828]">
                  <FileQuestion size={14} /> %{topic.examImportance}
                </span>
              </div>
              <h2 className="text-2xl font-black leading-tight tracking-[-0.045em] text-[#101828]">{topic.title}</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#475467]">{topic.shortDescription}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {topic.mustKnow.slice(0, 3).map((item) => (
                  <span key={item} className="inline-flex items-center gap-1 rounded-full bg-[#eef6f2] px-3 py-1 text-xs font-black text-[#0f766e]">
                    <Sparkles size={12} /> {item}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#475467]">
                  <Clock size={16} /> {topic.estimatedMinutes} dk
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#101828]">
                  Aç <ArrowRight className="transition group-hover:translate-x-1" size={18} />
                </span>
              </div>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
