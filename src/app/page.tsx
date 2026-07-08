import { ArrowRight, BarChart3, BookOpen, CheckCircle2, Clock, FileQuestion, Layers3, ShieldCheck, Sparkles, Target } from "lucide-react";
import { SBBrandMark } from "@/components/brand/SBBrandMark";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,#fff7ed_0,#f7efe3_34%,#edf4f7_100%)] px-4 py-5 text-[#101828]">
      <div aria-hidden="true" className="pointer-events-none fixed left-[-8rem] top-[-10rem] size-[32rem] rounded-full bg-[#fed7aa]/55 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none fixed bottom-[-14rem] right-[-10rem] size-[36rem] rounded-full bg-[#bfdbfe]/60 blur-3xl" />

      <section className="relative mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl place-items-center">
        <div className="w-full rounded-[2.75rem] border border-white/75 bg-white/76 p-5 shadow-[0_38px_120px_rgba(16,24,40,.13)] backdrop-blur-2xl md:p-8 lg:p-10">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3">
              <SBBrandMark className="size-14 shrink-0" />
              <div>
                <p className="text-sm font-black text-[#101828]">Softbridge Akademi</p>
                <p className="text-xs font-bold text-[#667085]">KPSS Tarih Çalışma Platformu</p>
              </div>
            </a>

            <nav className="hidden items-center gap-2 rounded-full border border-[#e4d8c8] bg-white/78 p-1 shadow-[0_12px_34px_rgba(16,24,40,.06)] md:flex">
              <a href="/topics" className="rounded-full px-4 py-2 text-xs font-black text-[#475467] transition hover:bg-[#101828] hover:text-white">Konular</a>
              <a href="/question-bank" className="rounded-full px-4 py-2 text-xs font-black text-[#475467] transition hover:bg-[#101828] hover:text-white">Testler</a>
              <a href="/flashcards" className="rounded-full px-4 py-2 text-xs font-black text-[#475467] transition hover:bg-[#101828] hover:text-white">Kartlar</a>
            </nav>
          </header>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_460px] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f3dcc7] bg-[#fff7ed] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#b4232a]">
                <Sparkles size={15} />
                Kişisel çalışma komuta merkezi
              </div>

              <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.085em] text-[#101828] md:text-7xl lg:text-8xl">
                KPSS Tarih’i tek ekranda yönet.
              </h1>

              <p className="mt-6 max-w-2xl text-base font-bold leading-8 text-[#475467]">
                Konu çalış, test çöz, yanlışlarını takip et ve tekrarlarını planla. Gereksiz kalabalık yok; sadece sınava götüren net bir çalışma akışı var.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/login" className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#101828] px-6 py-3 text-sm font-black text-white shadow-[0_20px_52px_rgba(16,24,40,.20)] transition hover:-translate-y-0.5">
                  Giriş Yap <ArrowRight size={17} />
                </a>
                <a href="/dashboard" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-[#e4d8c8] bg-white/82 px-6 py-3 text-sm font-black text-[#101828] shadow-[0_12px_34px_rgba(16,24,40,.07)] transition hover:-translate-y-0.5">
                  Panele git
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <TrustChip icon={<CheckCircle2 size={16} />} text="Rehberli akış" />
                <TrustChip icon={<ShieldCheck size={16} />} text="Açıklamalı test" />
                <TrustChip icon={<BarChart3 size={16} />} text="İlerleme takibi" />
              </div>
            </div>

            <aside className="rounded-[2.25rem] border border-white/80 bg-white/82 p-4 shadow-[0_30px_90px_rgba(16,24,40,.12)] backdrop-blur-xl">
              <div className="rounded-[1.8rem] bg-[#101828] p-5 text-white shadow-[0_22px_60px_rgba(16,24,40,.25)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f9c784]">Bugünkü öneri</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.055em]">Milli Mücadele odak turu</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/72">
                  25 dakika konu özeti, 30 soruluk test ve hızlı yanlış analizi.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <MiniStat label="Süre" value="25 dk" />
                  <MiniStat label="Test" value="30" />
                  <MiniStat label="Odak" value="1" />
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <FlowItem icon={<BookOpen size={18} />} title="Konu haritası" body="Dönemleri ve kavramları düzenli sırayla çalış." />
                <FlowItem icon={<FileQuestion size={18} />} title="Seçili test" body="Sadece açtığın test yüklenir; ekran hızlı kalır." />
                <FlowItem icon={<Target size={18} />} title="Yanlış takibi" body="Karıştırdığın kavramları tekrar planına ekle." />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function TrustChip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-white/80 bg-white/78 px-4 text-sm font-black text-[#101828] shadow-[0_12px_34px_rgba(16,24,40,.07)]">
      <span className="grid size-8 place-items-center rounded-xl bg-[#101828] text-white">{icon}</span>
      {text}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white/55">{label}</p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}

function FlowItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-3 rounded-[1.4rem] border border-[#e4d8c8] bg-[#fffaf3] p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-[#101828] shadow-[0_10px_28px_rgba(16,24,40,.08)]">{icon}</span>
      <div>
        <p className="text-sm font-black text-[#101828]">{title}</p>
        <p className="mt-1 text-xs font-bold leading-5 text-[#667085]">{body}</p>
      </div>
    </div>
  );
}
