import type { ReactNode } from "react";
import { ArrowRight, BookOpen, FileQuestion, Flame, Layers3, Timer, Trophy } from "lucide-react";
import { fetchContentFlashcards, fetchContentTopics } from "@/lib/content/supabase-content-server";

export async function DashboardPage() {
  const [topics, cards] = await Promise.all([
    fetchContentTopics(),
    fetchContentFlashcards()
  ]);

  const topicCount = topics.length || 12;
  const flashcardCount = cards.length || 367;

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-white/75 bg-white/78 p-6 shadow-[0_32px_105px_rgba(16,24,40,.12)] backdrop-blur-xl md:p-8">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#fed7aa]/70 blur-3xl" />
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute bottom-[-10rem] left-20 size-80 rounded-full bg-[#bfdbfe]/70 blur-3xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Çalışma paneli</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] text-[#101828] md:text-7xl">
              Bugünkü rotanı seç.
            </h1>
            <p className="mt-5 max-w-3xl text-sm font-bold leading-7 text-[#475467]">
              Konu, test, tekrar ve analiz adımlarını tek panelden yönet. Ekran hafif kalır; çalışma akışı hızlı ilerler.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/question-bank" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#101828] px-6 text-sm font-black text-white shadow-[0_18px_45px_rgba(16,24,40,.18)] transition hover:-translate-y-0.5">
                Test çöz <ArrowRight size={17} />
              </a>
              <a href="/topics" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#e4d8c8] bg-white/85 px-6 text-sm font-black text-[#101828] transition hover:-translate-y-0.5">
                Konu çalış
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Metric icon={<BookOpen size={18} />} label="Konu" value={topicCount} />
            <Metric icon={<FileQuestion size={18} />} label="Test" value={720} />
            <Metric icon={<Layers3 size={18} />} label="Kart" value={flashcardCount} />
            <Metric icon={<Timer size={18} />} label="Oturum" value="30 soru" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <ActionCard icon={<FileQuestion size={22} />} href="/question-bank" title="30 soruluk test akışı" body="Konu ve seviye seç; sınav mantığıyla açıklamalı test çöz." />
        <ActionCard icon={<Flame size={22} />} href="/topics" title="Konu haritası" body="Kavramları, dönemleri ve sık karıştırılan noktaları birlikte gör." />
        <ActionCard icon={<Trophy size={22} />} href="/flashcards" title="Hızlı tekrar" body="Aktif hatırlama kartlarıyla bilgiyi uzun süreli hafızaya taşı." />
      </section>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-3xl border border-white/80 bg-white/84 p-4 shadow-[0_16px_44px_rgba(16,24,40,.08)] transition hover:-translate-y-0.5">
      <div className="mb-3 inline-grid size-10 place-items-center rounded-2xl bg-[#101828] text-white">{icon}</div>
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#667085]">{label}</p>
      <p className="mt-1 text-2xl font-black text-[#101828]">{value}</p>
    </div>
  );
}

function ActionCard({ icon, href, title, body }: { icon: ReactNode; href: string; title: string; body: string }) {
  return (
    <a href={href} className="group rounded-[2rem] border border-white/75 bg-white/80 p-5 shadow-[0_20px_65px_rgba(16,24,40,.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(16,24,40,.12)]">
      <div className="grid size-12 place-items-center rounded-2xl bg-[#101828] text-white transition group-hover:scale-105">{icon}</div>
      <h2 className="mt-5 text-2xl font-black tracking-[-0.045em] text-[#101828]">{title}</h2>
      <p className="mt-3 text-sm font-bold leading-7 text-[#475467]">{body}</p>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#101828]">
        Aç <ArrowRight className="transition group-hover:translate-x-1" size={17} />
      </div>
    </a>
  );
}
