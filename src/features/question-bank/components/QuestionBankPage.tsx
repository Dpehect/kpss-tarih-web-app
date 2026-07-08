import { ArrowRight, BookOpen, FileQuestion, Gauge, ShieldCheck } from "lucide-react";
import { topics as fallbackTopics } from "@/data/kpss-history";
import { fetchContentTopics } from "@/lib/content/supabase-content-server";
import type { Topic } from "@/types/study";

export async function QuestionBankPage() {
  const supabaseTopics = await fetchContentTopics();
  const topics = supabaseTopics.length ? supabaseTopics : fallbackTopics;

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/78 p-6 shadow-[0_28px_90px_rgba(16,24,40,.10)] backdrop-blur-xl md:p-8">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#bfdbfe]/70 blur-3xl" />
        <div className="relative z-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Soru bankası</p>
            <h1 className="mt-3 text-5xl font-black leading-[0.92] tracking-[-0.08em] text-[#101828] md:text-7xl">
              Konu seç, seviye seç, teste başla.
            </h1>
            <p className="mt-5 max-w-3xl text-sm font-bold leading-7 text-[#475467]">
              Test açıldığında sadece seçili testin 30 sorusu Supabase’den yüklenir.
            </p>
          </div>

          <div className="grid gap-3">
            <Mini icon={<BookOpen size={18} />} label="Konu" value={topics.length} />
            <Mini icon={<Gauge size={18} />} label="Yükleme" value="30 soru/test" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((topic, index) => <TopicCard key={topic.id} topic={topic} index={index} />)}
      </section>
    </div>
  );
}

function TopicCard({ topic, index }: { topic: Topic; index: number }) {
  return (
    <a href={`/question-bank/${topic.id}`} className="group flex min-h-[260px] flex-col rounded-[2rem] border border-white/75 bg-white/78 p-5 shadow-[0_20px_65px_rgba(16,24,40,.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(16,24,40,.12)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#101828] px-3 py-1 text-xs font-black text-white">{String(index + 1).padStart(2, "0")}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#fffaf3] px-3 py-1 text-xs font-black text-[#101828]">
          <FileQuestion size={14} /> 60 test
        </span>
      </div>
      <h2 className="text-2xl font-black tracking-[-0.045em] text-[#101828]">{topic.title}</h2>
      <p className="mt-3 text-sm font-semibold leading-6 text-[#475467]">{topic.shortDescription}</p>
      <div className="mt-4 rounded-2xl border border-[#e4d8c8] bg-[#fffaf3] p-3">
        <div className="flex items-start gap-2">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#b4232a]" />
          <p className="text-xs font-bold leading-5 text-[#475467]">
            Test açılınca tüm banka değil, yalnızca seçili 30 soru gelir.
          </p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between pt-5">
        <span className="inline-flex items-center gap-2 text-sm font-black text-[#475467]"><BookOpen size={16} /> Seviye seç</span>
        <ArrowRight className="transition group-hover:translate-x-1" size={18} />
      </div>
    </a>
  );
}

function Mini({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-white/80 bg-white/82 p-4 shadow-[0_16px_44px_rgba(16,24,40,.08)]">
      <div className="mb-3 inline-grid size-10 place-items-center rounded-2xl bg-[#101828] text-white">{icon}</div>
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#667085]">{label}</p>
      <p className="mt-1 text-2xl font-black text-[#101828]">{value}</p>
    </div>
  );
}
