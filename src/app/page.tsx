import { ArrowRight, BarChart3, BookOpen, CreditCard, FileQuestion, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { exams, flashcards, questions, topics } from "@/data/kpss-history";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="content-shell relative flex min-h-screen flex-col items-center justify-center py-24 text-center">
        <div data-premium-parallax className="absolute left-[-9rem] top-24 size-96 rounded-full bg-[rgba(76,141,255,.16)] blur-[120px]" />
        <div data-premium-parallax className="absolute right-[-9rem] top-12 size-96 rounded-full bg-[rgba(201,162,39,.22)] blur-[120px]" />

        <ScrollReveal>
          <div className="mx-auto max-w-6xl">
            <p className="kicker">KPSS Tarih Akademi</p>
            <h1 className="heading-display mt-6 text-balance text-5xl md:text-7xl xl:text-8xl">
              Tarihi ezber listesi değil, yaşayan bir çalışma atlası olarak keşfet.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] md:text-xl">
              Konu özetleri, açıklamalı sorular, denemeler, flashcard tekrarları, zaman çizelgesi ve online ilerleme takibi tek bir ciddi çalışma deneyiminde birleşir.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/dashboard" variant="gold" size="lg">
                Çalışmaya başla
                <ArrowRight size={19} />
              </ButtonLink>
              <ButtonLink href="/topics" variant="ghost" size="lg">
                Müfredatı keşfet
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-16 w-full">
          <MuseumMap />
        </ScrollReveal>

        <ScrollReveal delay={0.16} className="mt-16 w-full">
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard icon={<BookOpen size={22} />} title="Özet odaklı öğrenme" body="Her konu, test sayfası ve tekrar akışı ayrı düşünülür." />
            <FeatureCard icon={<FileQuestion size={22} />} title="Konu bazlı test sayfaları" body="Her konu kendi net ve odaklı test ekranında çözülür." />
            <FeatureCard icon={<BarChart3 size={22} />} title="Online istatistik" body="Google giriş sonrası ilerleme Supabase üzerinde saklanır." />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.22} className="mt-16 w-full">
          <div className="surface-glass grid gap-4 rounded-[2.75rem] p-5 md:grid-cols-4 md:p-6">
            <LandingStat label="Konu" value={topics.length} icon={<BookOpen size={18} />} />
            <LandingStat label="Soru" value={questions.length} icon={<FileQuestion size={18} />} />
            <LandingStat label="Flashcard" value={flashcards.length} icon={<CreditCard size={18} />} />
            <LandingStat label="Deneme" value={exams.length} icon={<Sparkles size={18} />} />
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

function MuseumMap() {
  return (
    <div className="surface-dark relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] p-8 md:p-12">
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 1000 360" className="h-full w-full">
          <path d="M120 205 C230 140, 330 100, 470 132 C610 164, 690 90, 840 135 C915 158, 942 228, 864 258 C720 314, 578 266, 455 282 C322 300, 186 285, 120 205Z" fill="none" stroke="rgba(255,248,234,.34)" strokeWidth="3" />
          <path d="M190 220 C300 180, 390 158, 514 178 C620 196, 710 160, 820 188" fill="none" stroke="rgba(201,162,39,.52)" strokeWidth="2" strokeDasharray="10 14" />
          {Array.from({ length: 14 }).map((_, index) => (
            <circle key={index} cx={170 + index * 55} cy={180 + (index % 4) * 18} r="3.5" fill="rgba(201,162,39,.85)" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_320px] md:items-center">
        <div className="text-left">
          <p className="kicker">Dijital tarih atlası</p>
          <h2 className="heading-display mt-4 text-4xl md:text-6xl">Orta Asya’dan Cumhuriyet’e tek akış.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-inverse-muted)]">
            Müfredat, ezberden çıkıp dönemler arası ilişki kuran bir görsel çalışma deneyimine dönüşür.
          </p>
        </div>
        <div className="rounded-[2rem] border border-white/12 bg-white/[.08] p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.22em] text-[rgba(255,248,234,.62)]">Akış</p>
          <div className="mt-5 space-y-3">
            {["Konu", "Test", "Flashcard", "Deneme"].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-[var(--gold-500)] text-sm font-black text-[var(--navy-900)]">{index + 1}</span>
                <span className="font-black text-[var(--text-inverse)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <Card interactive className="text-left">
      <span className="grid size-12 place-items-center rounded-2xl bg-[var(--navy-900)] text-[var(--text-inverse)] shadow-[var(--shadow-sm)]">
        {icon}
      </span>
      <h2 className="mt-7 text-2xl font-black tracking-[-0.055em] text-[var(--navy-900)]">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{body}</p>
    </Card>
  );
}

function LandingStat({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-[1.6rem] border border-[var(--border-soft)] bg-white/74 p-5 text-left shadow-[var(--shadow-xs)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</p>
        <span className="text-[var(--sky-600)]">{icon}</span>
      </div>
      <p className="mt-4 text-4xl font-black tracking-[-0.08em] text-[var(--navy-900)]">{value}</p>
    </div>
  );
}
