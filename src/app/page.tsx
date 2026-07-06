import type { ReactNode } from "react";
import { ArrowRight, BarChart3, BookOpen, FileQuestion } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { exams, flashcards, questions, topics } from "@/data/kpss-history";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Nav ── */}
      <nav className="content-shell flex items-center justify-between py-5">
        <a href="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-[var(--ink)] text-sm font-semibold text-white">T</span>
          <span className="text-sm font-semibold text-[var(--ink)]">Tarih</span>
        </a>
        <ButtonLink href="/dashboard" variant="primary" size="sm">
          Giriş yap
        </ButtonLink>
      </nav>

      {/* ── Hero ── */}
      <section className="content-shell py-20 md:py-28 lg:py-36">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="kicker">KPSS Tarih</p>
            <h1 className="heading-display mt-5 text-4xl text-[var(--ink)] md:text-5xl lg:text-6xl">
              Tarihi anla,<br />sınavı kazan.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--graphite)]">
              Konular, testler, flashcard'lar ve zaman çizelgesi — tek bir platformda. Sade, odaklı, etkili.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/dashboard" variant="accent" size="lg">
                Çalışmaya başla
                <ArrowRight size={16} />
              </ButtonLink>
              <ButtonLink href="/topics" variant="ghost" size="lg">
                Konuları gör
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-xl">
            <Stat label="Konu" value={topics.length} />
            <Stat label="Soru" value={questions.length} />
            <Stat label="Kart" value={flashcards.length} />
            <Stat label="Deneme" value={exams.length} />
          </div>
        </ScrollReveal>
      </section>

      {/* ── Steps ── */}
      <section className="content-shell pb-20">
        <ScrollReveal>
          <div className="rounded-2xl bg-[var(--ink)] p-8 md:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-[var(--sage)]">Nasıl çalışır</p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Dört adımda hedefe.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Konu seç", "Müfredatı kısa özetlerle keşfet."],
                ["02", "Test çöz", "Her konunun testine hemen geç."],
                ["03", "Tekrar et", "Flashcard'larla hızlı tekrar yap."],
                ["04", "Analiz et", "Yanlışlarını ve ilerlemeni izle."]
              ].map(([step, title, desc]) => (
                <div key={step} className="rounded-xl border border-white/10 bg-white/[.05] p-5">
                  <p className="text-xs font-semibold text-[var(--sage)]">{step}</p>
                  <p className="mt-2 text-[15px] font-semibold text-white">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Features ── */}
      <section className="content-shell pb-24">
        <ScrollReveal>
          <div className="grid gap-4 md:grid-cols-3">
            <Feature icon={<BookOpen size={20} />} title="Konu özetleri" body="Müfredat, sade ve okunabilir başlıklara ayrılır." />
            <Feature icon={<FileQuestion size={20} />} title="Test bankası" body="Konuya özel testlerle bilgini pekiştir." />
            <Feature icon={<BarChart3 size={20} />} title="İlerleme takibi" body="Yanlışlar, tekrarlar ve gelişimin tek bakışta." />
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--warm-white)] p-4">
      <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--slate)]">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tracking-tight text-[var(--ink)]">{value}</p>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--warm-white)] p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-md)]">
      <span className="grid size-10 place-items-center rounded-lg bg-[var(--cream)] text-[var(--ink)]">{icon}</span>
      <h2 className="mt-5 text-lg font-semibold text-[var(--ink)]">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--graphite)]">{body}</p>
    </div>
  );
}
