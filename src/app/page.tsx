import type { ReactNode } from "react";
import { ArrowRight, BarChart3, BookOpen, FileQuestion } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { exams, flashcards, questions, topics } from "@/data/kpss-history";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="content-shell relative grid min-h-screen items-center gap-12 py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <ScrollReveal>
          <div>
            <p className="bureau-kicker">Dossier Bureau / KPSS Tarih</p>
            <h1 className="bureau-display mt-6 max-w-5xl text-balance text-5xl text-[var(--bureau-ink)] md:text-7xl xl:text-8xl">
              Tarihi dosya dosya aç.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--bureau-copy)] md:text-xl">
              Konu, test, flashcard, timeline ve analiz modülleri tek bir çalışma bürosunda birleşir. Net rota, okunabilir veri, hızlı tekrar.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/dashboard" variant="gold" size="lg">
                Çalışma bürosuna gir
                <ArrowRight size={19} />
              </ButtonLink>
              <ButtonLink href="/timeline" variant="ghost" size="lg">
                Zaman dosyasını aç
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
          <DossierInstrument />
        </ScrollReveal>
      </section>

      <section className="content-shell pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature icon={<BookOpen size={22} />} title="Konu dosyaları" body="Müfredat, karar vermesi kolay başlıklara ayrılır." />
          <Feature icon={<FileQuestion size={22} />} title="Test kayıtları" body="Geri bildirimler hızlı, açık ve dikkat dağıtmadan çalışır." />
          <Feature icon={<BarChart3 size={22} />} title="Analiz panosu" body="Yanlış, tekrar ve ilerleme sinyalleri tek bakışta okunur." />
        </div>
      </section>
    </main>
  );
}

function DossierInstrument() {
  return (
    <div className="bureau-stage relative overflow-hidden rounded-[2.75rem] p-6 md:p-8">
      <div className="absolute inset-0 opacity-35">
        <svg viewBox="0 0 900 620" className="h-full w-full">
          <path d="M120 120 H760 Q800 120 800 160 V486 Q800 526 760 526 H140 Q100 526 100 486 V160 Q100 120 140 120Z" fill="none" stroke="rgba(255,250,242,.16)" strokeWidth="2" />
          <path d="M160 220 C294 156, 420 190, 584 252 C700 296, 748 250, 822 292" fill="none" stroke="rgba(4,126,137,.70)" strokeWidth="2.5" strokeDasharray="12 16" />
          <path d="M170 414 C330 340, 474 370, 730 330" fill="none" stroke="rgba(102,52,95,.62)" strokeWidth="2.5" />
          {Array.from({ length: 12 }).map((_, index) => (
            <circle key={index} cx={210 + index * 44} cy={348 + (index % 4) * 20} r="4" fill="rgba(4,126,137,.88)" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 grid min-h-[520px] content-between">
        <div>
          <p className="bureau-kicker">Evidence flow</p>
          <h2 className="bureau-display mt-4 max-w-xl text-5xl text-[var(--bureau-inverse)] md:text-6xl">
            Bilgiyi iz sürerek bağla.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["01", "Konu dosyası"],
            ["02", "Soru kaydı"],
            ["03", "Tekrar kartı"],
            ["04", "Analiz izi"]
          ].map(([step, title]) => (
            <div key={step} className="rounded-[1.45rem] border border-white/10 bg-white/[.08] p-4 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--bureau-inverse-muted)]">{step}</p>
              <p className="mt-2 text-lg font-black text-[var(--bureau-inverse)]">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.80)] p-4 shadow-[var(--shadow-paper)]">
      <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-.07em] text-[var(--bureau-ink)]">{value}</p>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="bureau-card rounded-[1.65rem] p-6">
      <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]">{icon}</span>
      <h2 className="mt-7 text-2xl font-black tracking-[-0.05em] text-[var(--bureau-ink)]">{title}</h2>
      <p className="mt-3 text-sm font-medium leading-7 text-[var(--bureau-copy)]">{body}</p>
    </div>
  );
}
