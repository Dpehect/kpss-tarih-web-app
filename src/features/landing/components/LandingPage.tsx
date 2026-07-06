import { ArrowRight, BookOpen, FileQuestion, LineChart, ShieldCheck } from "lucide-react";
import { exams, flashcards, questions, topics } from "@/data/kpss-history";

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="content-shell relative grid min-h-screen items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="absolute left-[-6rem] top-10 size-96 rounded-full bg-[#2447d8]/10 blur-[120px]" />
        <div className="absolute bottom-10 right-[-6rem] size-96 rounded-full bg-[#be684b]/10 blur-[120px]" />

        <div className="relative z-10">
          <p className="kicker">KPSS Tarih Akademi</p>
          <h1 className="editorial-title mt-5 max-w-5xl text-5xl md:text-7xl xl:text-8xl">
            Tarihi ezber listesi değil, çalışma sistemi olarak ele al.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#425066]">
            Konu özetleri, konu bazlı test sayfaları, açıklamalı sorular, denemeler, flashcard tekrarları, zaman çizelgesi ve online ilerleme takibi tek bir ciddi çalışma deneyiminde birleşir.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="/dashboard" className="btn-primary">
              Çalışmaya başla
              <ArrowRight size={18} />
            </a>
            <a href="/question-bank" className="btn-ghost">
              Konu testlerini gör
            </a>
          </div>
        </div>

        <div className="relative z-10">
          <div className="page-noise rounded-[2.5rem] border border-black/[0.08] bg-[#fffaf0]/82 p-6 shadow-[0_34px_120px_rgba(18,24,38,0.14)] md:p-8">
            <div className="flex items-start justify-between gap-6 border-b border-black/[0.08] pb-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.26em] text-[#2447d8]">Çalışma kapsamı</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.07em]">KPSS Tarih dosyası</h2>
              </div>
              <span className="rounded-full bg-[#111827] px-3 py-1 text-xs font-black text-[#fffaf0]">Online</span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <LandingStat label="Konu" value={topics.length} />
              <LandingStat label="Soru" value={questions.length} />
              <LandingStat label="Flashcard" value={flashcards.length} />
              <LandingStat label="Deneme" value={exams.length} />
            </div>

            <div className="mt-6 space-y-3">
              <FeatureLine icon={<BookOpen size={18} />} title="Özet odaklı öğrenme" body="Her konu, test sayfası ve tekrar akışı ayrı düşünülür." />
              <FeatureLine icon={<FileQuestion size={18} />} title="Konu bazlı test sayfaları" body="Side panel yerine her konunun kendi test ekranı bulunur." />
              <FeatureLine icon={<LineChart size={18} />} title="Online istatistik" body="Google giriş sonrası ilerleme Supabase üzerinde saklanır." />
              <FeatureLine icon={<ShieldCheck size={18} />} title="Admin kontrollü yapı" body="Yetkili hesap kullanıcı verilerini ve içerikleri yönetebilir." />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function LandingStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-black/[0.08] bg-white/55 p-4">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#425066]">{label}</p>
      <p className="mt-2 text-4xl font-black tracking-[-0.08em]">{value}</p>
    </div>
  );
}

function FeatureLine({
  icon,
  title,
  body
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-[1.35rem] border border-black/[0.08] bg-white/45 p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#111827] text-[#fffaf0]">
        {icon}
      </span>
      <div>
        <p className="font-black">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[#425066]">{body}</p>
      </div>
    </div>
  );
}
