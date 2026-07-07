import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  FileQuestion,
  Layers3,
  LineChart,
  Play,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WebGLHeroPanel } from "@/components/home/WebGLHeroPanel";
import { flashcards, topics } from "@/data/kpss-history";
import { allQuestionTests, expandedQuestions, QUESTIONS_PER_TEST } from "@/data/generated-30-question-tests";

const nf = new Intl.NumberFormat("tr-TR");

const stats = [
  { label: "Konu", value: nf.format(topics.length) },
  { label: "Soru", value: nf.format(expandedQuestions.length) },
  { label: "Test", value: nf.format(allQuestionTests.length) },
  { label: "Kart", value: nf.format(flashcards.length) }
];

const launchActions = [
  {
    title: "Konuya başla",
    body: "Müfredatı kısa özetlerle keşfet.",
    href: "/topics",
    icon: <BookOpen size={21} />,
    cta: "Konuları aç"
  },
  {
    title: "Test çöz",
    body: `${QUESTIONS_PER_TEST} soruluk açıklamalı test aç.`,
    href: "/question-bank/all?level=kolay",
    icon: <FileQuestion size={21} />,
    cta: "Teste gir"
  },
  {
    title: "Tekrar et",
    body: "Flashcard'larla hızlı tekrar yap.",
    href: "/flashcards",
    icon: <BrainCircuit size={21} />,
    cta: "Kartları aç"
  },
  {
    title: "Analiz et",
    body: "Yanlışlarını ve ilerlemeni izle.",
    href: "/analytics",
    icon: <LineChart size={21} />,
    cta: "Analize git"
  }
];

const features = [
  {
    title: "Konu Özetleri",
    body: "Müfredat, sade ve okunabilir başlıklara ayrılır.",
    icon: <Layers3 size={22} />
  },
  {
    title: "Test Bankası",
    body: "Konuya özel testlerle bilgini pekiştir.",
    icon: <FileQuestion size={22} />
  },
  {
    title: "İlerleme Takibi",
    body: "Yanlışlar, tekrarlar ve gelişimin tek bakışta.",
    icon: <BarChart3 size={22} />
  }
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f1e7] text-[#101828]">
      <LightAurora />
      <Navbar />

      <section className="content-shell grid min-h-[calc(100vh-78px)] gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center lg:py-10">
        <ScrollReveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7cbbb] bg-white/72 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#c43136] shadow-sm backdrop-blur-xl">
              <Sparkles size={15} />
              Premium KPSS Tarih Platformu
            </div>

            <h1 className="mt-6 max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.095em] text-[#101828] md:text-8xl xl:text-9xl">
              Tarihi anla,
              <span className="block bg-gradient-to-r from-[#c43136] via-[#e24d42] to-[#f59e0b] bg-clip-text text-transparent">
                sınavı kazan.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-600 md:text-lg">
              Konular, testler, flashcard'lar ve zaman çizelgesi tek bir platformda. Sade, odaklı, etkili.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/question-bank/all?level=kolay"
                variant="primary"
                size="lg"
                className="min-h-14 rounded-2xl bg-[#c43136] px-7 text-base text-white shadow-[0_24px_70px_rgba(196,49,54,.24)] hover:bg-[#ab2730]"
              >
                <Play size={18} />
                Hızlı Test Aç
              </ButtonLink>

              <ButtonLink
                href="/topics"
                variant="ghost"
                size="lg"
                className="min-h-14 rounded-2xl border-[#d7cbbb] bg-white/76 px-7 text-base text-[#101828] hover:bg-white"
              >
                Konuları Gör
                <ArrowRight size={18} />
              </ButtonLink>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((item) => (
                <StatCard key={item.label} {...item} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <WebGLHeroPanel />
        </ScrollReveal>
      </section>

      <section className="content-shell grid gap-4 pb-10 lg:grid-cols-4">
        {launchActions.map((action, index) => (
          <ScrollReveal key={action.title} delay={index * 0.04}>
            <LaunchCard {...action} index={index} />
          </ScrollReveal>
        ))}
      </section>

      <section className="content-shell grid gap-4 pb-16 lg:grid-cols-3">
        {features.map((feature, index) => (
          <ScrollReveal key={feature.title} delay={index * 0.05}>
            <FeatureCard {...feature} />
          </ScrollReveal>
        ))}
      </section>
    </main>
  );
}

function LightAurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,40,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,.055)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(196,49,54,.16),transparent_34rem),radial-gradient(circle_at_86%_20%,rgba(37,99,235,.12),transparent_30rem),radial-gradient(circle_at_48%_96%,rgba(15,118,110,.10),transparent_34rem)]" />
      <div className="absolute left-1/2 top-0 h-px w-[72vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c43136]/35 to-transparent" />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e2d6c7]/80 bg-[#f8f1e7]/82 backdrop-blur-2xl">
      <div className="content-shell flex min-h-[78px] items-center justify-between gap-4">
        <a href="/" className="group flex items-center gap-3">
          <BrandMark />
          <div>
            <p className="text-base font-black tracking-[-0.035em] text-[#101828]">Softbridge Akademi</p>
            <p className="text-xs font-semibold text-slate-500">KPSS Tarih Çalışma Platformu</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-[#ded2c3] bg-white/72 p-1 shadow-sm backdrop-blur-xl lg:flex">
          <NavLink href="/topics">Konular</NavLink>
          <NavLink href="/question-bank">Testler</NavLink>
          <NavLink href="/flashcards">Flashcard'lar</NavLink>
          <NavLink href="/analytics">İlerleme</NavLink>
        </nav>

        <ButtonLink href="/dashboard" variant="primary" size="md" className="rounded-2xl bg-[#101828] px-5 text-white hover:bg-[#1d2939]">
          Başla
        </ButtonLink>
      </div>
    </header>
  );
}

function BrandMark() {
  return (
    <span className="relative grid size-12 place-items-center rounded-[1.15rem] border border-[#ded2c3] bg-white/86 shadow-[0_16px_50px_rgba(16,24,40,.10)]">
      <svg width="30" height="24" viewBox="0 0 30 24" fill="none" aria-hidden="true">
        <path d="M4 16.5C8.7 7.3 21.3 7.3 26 16.5" stroke="#101828" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M7 16.5H23" stroke="#c43136" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M10 16.5V20M15 13.8V20M20 16.5V20" stroke="#101828" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className="absolute -right-1 -top-1 size-3 rounded-full bg-[#c43136] ring-4 ring-[#f8f1e7]" />
    </span>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="rounded-full px-4 py-2 text-sm font-black text-slate-600 transition hover:bg-[#101828] hover:text-white">
      {children}
    </a>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[#ded2c3] bg-white/76 p-4 shadow-sm backdrop-blur-xl">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.07em] text-[#101828]">{value}</p>
    </div>
  );
}

function LaunchCard({
  title,
  body,
  href,
  icon,
  cta,
  index
}: {
  title: string;
  body: string;
  href: string;
  icon: ReactNode;
  cta: string;
  index: number;
}) {
  return (
    <a href={href} className="group relative overflow-hidden rounded-[2rem] border border-[#ded2c3] bg-white/78 p-5 shadow-[0_24px_80px_rgba(16,24,40,.07)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-2xl">
      <div className="absolute right-[-4rem] top-[-4rem] size-32 rounded-full bg-[#c43136]/10 blur-2xl transition group-hover:bg-[#c43136]/16" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#101828] text-white shadow-lg">{icon}</span>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#c43136]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-5 text-2xl font-black tracking-[-0.055em] text-[#101828]">{title}</h3>
        <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{body}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#c43136]">
          {cta}
          <ArrowRight className="transition group-hover:translate-x-1" size={16} />
        </span>
      </div>
    </a>
  );
}

function FeatureCard({ title, body, icon }: { title: string; body: string; icon: ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-[#ded2c3] bg-white/78 p-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <span className="grid size-12 place-items-center rounded-2xl bg-[#101828] text-white shadow-lg">{icon}</span>
      <h3 className="mt-6 text-2xl font-black tracking-[-0.055em] text-[#101828]">{title}</h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{body}</p>
    </div>
  );
}
