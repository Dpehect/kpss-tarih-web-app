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
            <p className="lab-kicker">ChronoLab / KPSS Tarih</p>
            <h1 className="lab-display mt-6 max-w-5xl text-balance text-5xl text-[var(--lab-ink)] md:text-7xl xl:text-8xl">
              Tarihi çöz, ölç, tekrar et.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--lab-muted)] md:text-xl">
              Konu, test, flashcard, timeline ve analiz modülleri tek bir deney laboratuvarında birleşir. Hızlı karar, net odak, düzenli ilerleme.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/dashboard" variant="gold" size="lg">
                Lab’a gir
                <ArrowRight size={19} />
              </ButtonLink>
              <ButtonLink href="/timeline" variant="ghost" size="lg">
                Zaman akışını aç
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
          <ChronoInstrument />
        </ScrollReveal>
      </section>

      <section className="content-shell pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature icon={<BookOpen size={22} />} title="Konu rotası" body="Müfredat, karar vermesi kolay bir çalışma akışına ayrılır." />
          <Feature icon={<FileQuestion size={22} />} title="Test refleksi" body="Geri bildirimler hızlı, açık ve dikkat dağıtmadan çalışır." />
          <Feature icon={<BarChart3 size={22} />} title="Analiz masası" body="Yanlış, tekrar ve ilerleme sinyalleri tek bakışta okunur." />
        </div>
      </section>
    </main>
  );
}

function ChronoInstrument() {
  return (
    <div className="lab-stage relative overflow-hidden rounded-[2.75rem] p-6 md:p-8">
      <div className="absolute inset-0 opacity-35">
        <svg viewBox="0 0 900 620" className="h-full w-full">
          <circle cx="450" cy="310" r="190" fill="none" stroke="rgba(255,250,240,.22)" strokeWidth="2" />
          <circle cx="450" cy="310" r="92" fill="none" stroke="rgba(255,250,240,.16)" strokeWidth="2" />
          <path d="M126 345 C260 220, 420 206, 584 264 C700 306, 748 250, 822 292" fill="none" stroke="rgba(215,255,79,.75)" strokeWidth="2.5" strokeDasharray="12 16" />
          <path d="M170 414 C330 340, 474 370, 730 330" fill="none" stroke="rgba(0,166,180,.55)" strokeWidth="2.5" />
          {Array.from({ length: 12 }).map((_, index) => (
            <circle key={index} cx={210 + index * 44} cy={348 + (index % 4) * 20} r="4" fill="rgba(215,255,79,.88)" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 grid min-h-[520px] content-between">
        <div>
          <p className="lab-kicker">Temporal instrument</p>
          <h2 className="lab-display mt-4 max-w-xl text-5xl text-[var(--lab-inverse)] md:text-6xl">
            Akışın üstünde çalış.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["01", "Konuyu aç"],
            ["02", "Test et"],
            ["03", "Kartla hatırla"],
            ["04", "Veriye bak"]
          ].map(([step, title]) => (
            <div key={step} className="rounded-[1.45rem] border border-white/10 bg-white/[.08] p-4 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[rgba(255,250,240,.55)]">{step}</p>
              <p className="mt-2 text-lg font-black text-[var(--lab-inverse)]">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--lab-line)] bg-[rgba(255,252,245,.78)] p-4 shadow-[var(--shadow-thin)]">
      <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--lab-soft)]">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-.07em] text-[var(--lab-ink)]">{value}</p>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="lab-card rounded-[1.65rem] p-6">
      <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--lab-ink)] text-[var(--lab-inverse)]">{icon}</span>
      <h2 className="mt-7 text-2xl font-black tracking-[-0.05em] text-[var(--lab-ink)]">{title}</h2>
      <p className="mt-3 text-sm font-medium leading-7 text-[var(--lab-muted)]">{body}</p>
    </div>
  );
}
