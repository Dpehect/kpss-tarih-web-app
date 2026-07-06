import { ArrowRight, BarChart3, BookOpen, CreditCard, FileQuestion, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { exams, flashcards, questions, topics } from "@/data/kpss-history";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="content-shell relative flex min-h-screen flex-col items-center justify-center py-24 text-center">
        <div data-premium-parallax className="absolute left-[-8rem] top-24 size-96 rounded-full bg-[var(--accent-sky-soft)] blur-[120px]" />
        <div data-premium-parallax className="absolute right-[-8rem] top-10 size-96 rounded-full bg-[var(--accent-gold-soft)] blur-[120px]" />

        <ScrollReveal>
          <div className="mx-auto max-w-5xl">
            <p className="kicker">KPSS Tarih Akademi</p>
            <h1 className="editorial-title mt-6 text-balance text-5xl md:text-7xl xl:text-8xl">
              Tarihi ezber listesi değil, çalışma sistemi olarak ele al.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[var(--muted-foreground)] md:text-xl">
              Konu özetleri, konu bazlı test sayfaları, açıklamalı sorular, denemeler, flashcard tekrarları, zaman çizelgesi ve online ilerleme takibi tek bir ciddi çalışma deneyiminde birleşir.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/dashboard" variant="primary" size="lg">
                Çalışmaya başla
                <ArrowRight size={19} />
              </ButtonLink>
              <ButtonLink href="/question-bank" variant="ghost" size="lg">
                Konu testlerini gör
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-16 w-full">
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard icon={<BookOpen size={22} />} title="Özet odaklı öğrenme" body="Her konu, test sayfası ve tekrar akışı ayrı düşünülür." />
            <FeatureCard icon={<FileQuestion size={22} />} title="Konu bazlı test sayfaları" body="Side panel yerine her konunun kendi test ekranı bulunur." />
            <FeatureCard icon={<BarChart3 size={22} />} title="Online istatistik" body="Google giriş sonrası ilerleme Supabase üzerinde saklanır." />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.18} className="mt-16 w-full">
          <div className="glass-panel grid gap-4 p-5 md:grid-cols-4 md:p-6">
            <LandingStat label="Konu" value={topics.length} icon={<BookOpen size={18} />} />
            <LandingStat label="Soru" value={questions.length} icon={<FileQuestion size={18} />} />
            <LandingStat label="Flashcard" value={flashcards.length} icon={<CreditCard size={18} />} />
            <LandingStat label="Deneme" value={exams.length} icon={<Sparkles size={18} />} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.24} className="mt-10">
          <ButtonLink href="/topics" variant="gold" size="lg">
            Konuları incele
            <ArrowRight size={19} />
          </ButtonLink>
        </ScrollReveal>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  body
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card className="text-left" data-premium-reveal>
      <span className="grid size-12 place-items-center rounded-2xl bg-[var(--foreground)] text-[var(--background)] shadow-[var(--shadow-sm)]">
        {icon}
      </span>
      <h2 className="mt-7 text-2xl font-black tracking-[-0.055em] text-[var(--foreground)]">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{body}</p>
    </Card>
  );
}

function LandingStat({
  label,
  value,
  icon
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.6rem] border border-[var(--border)] bg-[var(--surface-subtle)] p-5 text-left shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{label}</p>
        <span className="text-[var(--accent-sky)]">{icon}</span>
      </div>
      <p className="mt-4 text-4xl font-black tracking-[-0.08em] text-[var(--foreground)]">{value}</p>
    </div>
  );
}
