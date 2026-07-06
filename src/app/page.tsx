import { ArrowRight, BarChart3, BookOpen, CreditCard, FileQuestion } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { exams, flashcards, questions, topics } from "@/data/kpss-history";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="content-shell relative grid min-h-screen items-center gap-12 py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <ScrollReveal>
          <div>
            <p className="kicker">KPSS Tarih Akademi</p>
            <h1 className="heading-display mt-6 max-w-5xl text-balance text-5xl text-[var(--atlas-ink)] md:text-7xl xl:text-8xl">
              Tarihi bir veri listesi değil, etkileşimli bir arşiv olarak çalış.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] md:text-xl">
              Konu, test, flashcard, timeline ve analiz modülleri tek bir çalışma rotasında birleşir. Amaç daha çok ekran değil; daha iyi odak.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/dashboard" variant="gold" size="lg">
                Çalışma masasına geç
                <ArrowRight size={19} />
              </ButtonLink>
              <ButtonLink href="/timeline" variant="ghost" size="lg">
                Timeline’ı keşfet
              </ButtonLink>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              <LandingStat label="Konu" value={topics.length} />
              <LandingStat label="Soru" value={questions.length} />
              <LandingStat label="Kart" value={flashcards.length} />
              <LandingStat label="Deneme" value={exams.length} />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <AtlasArtifact />
        </ScrollReveal>
      </section>

      <section className="content-shell pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature icon={<BookOpen size={22} />} title="Konu rotası" body="Her başlık temiz bir öğrenme akışına bağlanır." />
          <Feature icon={<FileQuestion size={22} />} title="Test refleksi" body="Soru geçişleri ve geri bildirimler odak kaybettirmez." />
          <Feature icon={<BarChart3 size={22} />} title="Analiz masası" body="İlerleme, yanlışlar ve tekrarlar tek bakışta okunur." />
        </div>
      </section>
    </main>
  );
}

function AtlasArtifact() {
  return (
    <div className="atlas-dark relative overflow-hidden rounded-[2.75rem] p-6 md:p-8">
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 900 620" className="h-full w-full">
          <path d="M86 346 C196 230, 327 215, 470 258 C613 301, 716 191, 820 270 C923 348, 775 478, 610 450 C445 422, 359 542, 220 476 C115 426, 30 405, 86 346Z" fill="none" stroke="rgba(255,248,234,.35)" strokeWidth="3" />
          <path d="M150 388 C282 318, 380 334, 516 310 C633 290, 730 328, 815 381" fill="none" stroke="rgba(219,163,74,.70)" strokeWidth="2" strokeDasharray="12 16" />
          {Array.from({ length: 16 }).map((_, index) => (
            <circle key={index} cx={158 + index * 42} cy={360 + (index % 5) * 16} r="3.8" fill="rgba(219,163,74,.88)" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 grid min-h-[520px] content-between">
        <div>
          <p className="kicker">Interactive archive</p>
          <h2 className="heading-display mt-4 max-w-xl text-5xl text-[var(--text-inverse)] md:text-6xl">
            Dönemler arası bağlantı kur.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["01", "Konu haritası"],
            ["02", "Soru bankası"],
            ["03", "Aktif hatırlama"],
            ["04", "Timeline"]
          ].map(([step, title]) => (
            <div key={step} className="rounded-[1.45rem] border border-white/10 bg-white/[.08] p-4 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[rgba(255,248,234,.55)]">{step}</p>
              <p className="mt-2 text-lg font-black text-[var(--text-inverse)]">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--border-soft)] bg-[rgba(255,250,240,.78)] p-4 shadow-[var(--shadow-xs)]">
      <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--atlas-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-.07em] text-[var(--atlas-ink)]">{value}</p>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="atlas-card rounded-[1.65rem] p-6">
      <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--atlas-ink)] text-[var(--text-inverse)]">{icon}</span>
      <h2 className="mt-7 text-2xl font-black tracking-[-0.05em] text-[var(--atlas-ink)]">{title}</h2>
      <p className="mt-3 text-sm font-medium leading-7 text-[var(--text-secondary)]">{body}</p>
    </div>
  );
}
