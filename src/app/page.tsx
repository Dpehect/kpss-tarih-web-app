import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Layers3,
  LineChart,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Zap
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { exams, flashcards, topics } from "@/data/kpss-history";
import { allQuestionTests, expandedQuestions, QUESTIONS_PER_TEST } from "@/data/generated-30-question-tests";

const nf = new Intl.NumberFormat("tr-TR");

const stats = [
  { label: "Konu", value: nf.format(topics.length) },
  { label: "Soru", value: nf.format(expandedQuestions.length) },
  { label: "Test", value: nf.format(allQuestionTests.length) },
  { label: "Kart", value: nf.format(flashcards.length) }
];

const quickActions = [
  {
    title: "Konuya başla",
    body: "Müfredatı kısa özetlerle keşfet.",
    href: "/topics",
    icon: <BookOpen size={22} />,
    cta: "Konuları aç"
  },
  {
    title: "Test çöz",
    body: `${QUESTIONS_PER_TEST} soruluk açıklamalı test aç.`,
    href: "/question-bank/all?level=kolay",
    icon: <FileQuestion size={22} />,
    cta: "Teste gir"
  },
  {
    title: "İlerlemeni gör",
    body: "Yanlışlarını ve gelişimini izle.",
    href: "/analytics",
    icon: <LineChart size={22} />,
    cta: "Analizi aç"
  }
];

const steps = [
  {
    step: "01",
    title: "Konu seç",
    body: "Müfredatı kısa özetlerle keşfet",
    href: "/topics",
    icon: <BookOpen size={20} />
  },
  {
    step: "02",
    title: "Test çöz",
    body: "Her konunun testine hemen geç",
    href: "/question-bank",
    icon: <FileQuestion size={20} />
  },
  {
    step: "03",
    title: "Tekrar et",
    body: "Flashcard'larla hızlı tekrar yap",
    href: "/flashcards",
    icon: <BrainCircuit size={20} />
  },
  {
    step: "04",
    title: "Analiz et",
    body: "Yanlışlarını ve ilerlemeni izle",
    href: "/analytics",
    icon: <BarChart3 size={20} />
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
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1e8] text-[#0d1321]">
      <SpotlightBackground />
      <Navbar />

      <section className="content-shell grid min-h-[calc(100vh-80px)] gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center lg:py-12">
        <ScrollReveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b4232a]/20 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a] shadow-sm backdrop-blur-xl">
              <Sparkles size={15} />
              Softbridge Akademi
            </div>

            <h1 className="mt-6 max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.09em] text-[#0d1321] md:text-8xl xl:text-9xl">
              Tarihi anla,
              <span className="block text-[#b4232a]">sınavı kazan.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
              Konular, testler, flashcard'lar ve zaman çizelgesi tek bir platformda. Sade, odaklı, etkili.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/question-bank/all?level=kolay"
                variant="primary"
                size="lg"
                className="min-h-14 rounded-2xl bg-[#b4232a] px-7 text-base shadow-[0_24px_70px_rgba(180,35,42,.24)] hover:bg-[#9f1f26]"
              >
                Hızlı Test Aç
                <Play size={18} />
              </ButtonLink>

              <ButtonLink
                href="/topics"
                variant="ghost"
                size="lg"
                className="min-h-14 rounded-2xl border-[#d9cfc1] bg-white/80 px-7 text-base"
              >
                Konuları Gör
                <ArrowRight size={18} />
              </ButtonLink>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((item) => (
                <Stat key={item.label} {...item} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <ProductPanel />
        </ScrollReveal>
      </section>

      <section className="content-shell pb-10">
        <div className="grid gap-4 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <ScrollReveal key={action.title} delay={index * 0.05}>
              <ActionCard {...action} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="content-shell grid gap-5 pb-10 xl:grid-cols-[360px_minmax(0,1fr)]">
        <ScrollReveal>
          <BentoIntro />
        </ScrollReveal>

        <div className="grid gap-3 md:grid-cols-2">
          {steps.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 0.04}>
              <StepCard {...step} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="content-shell grid gap-4 pb-12 lg:grid-cols-3">
        {features.map((feature, index) => (
          <ScrollReveal key={feature.title} delay={index * 0.05}>
            <FeatureCard {...feature} />
          </ScrollReveal>
        ))}
      </section>

      <section className="content-shell pb-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1321] p-6 text-white shadow-[0_32px_110px_rgba(13,19,33,.24)] md:p-8">
          <div className="absolute right-[-8rem] top-[-8rem] size-72 rounded-full bg-[#b4232a]/24 blur-3xl" />
          <div className="relative z-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_260px] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f04438]">Son adım</p>
              <h2 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.07em] md:text-6xl">
                Bugün başla, KPSS Tarih’te fark yarat.
              </h2>
            </div>
            <ButtonLink
              href="/dashboard"
              variant="ghost"
              size="lg"
              className="min-h-14 rounded-2xl border-white/20 bg-white text-[#0d1321] hover:bg-white/90"
            >
              Hemen Başla
              <ArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function SpotlightBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,19,33,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,19,33,.055)_1px,transparent_1px)] bg-[size:58px_58px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(180,35,42,.16),transparent_32rem),radial-gradient(circle_at_90%_18%,rgba(13,19,33,.14),transparent_30rem),radial-gradient(circle_at_52%_94%,rgba(15,118,110,.12),transparent_34rem)]" />
      <div className="absolute left-1/2 top-0 h-px w-[70vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#b4232a]/35 to-transparent" />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d9cfc1]/70 bg-[#f7f1e8]/82 backdrop-blur-2xl">
      <div className="content-shell flex min-h-20 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#0d1321] text-sm font-black text-white shadow-lg">
            S
          </span>
          <div>
            <p className="text-base font-black tracking-[-0.03em] text-[#0d1321]">Softbridge Akademi</p>
            <p className="text-xs font-semibold text-slate-500">KPSS Tarih</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-[#d9cfc1] bg-white/70 p-1 shadow-sm backdrop-blur-xl lg:flex">
          <NavLink href="/topics">Konular</NavLink>
          <NavLink href="/question-bank">Testler</NavLink>
          <NavLink href="/flashcards">Flashcard'lar</NavLink>
          <NavLink href="/analytics">İlerleme</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" size="md" className="hidden rounded-2xl border-[#d9cfc1] bg-white/80 px-5 sm:inline-flex">
            Giriş Yap
          </ButtonLink>
          <ButtonLink href="/dashboard" variant="primary" size="md" className="rounded-2xl bg-[#0d1321] px-5">
            Başla
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="rounded-full px-4 py-2 text-sm font-black text-slate-600 transition hover:bg-[#0d1321] hover:text-white">
      {children}
    </a>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[#d9cfc1] bg-white/75 p-4 shadow-sm backdrop-blur-xl">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.07em] text-[#0d1321]">{value}</p>
    </div>
  );
}

function ProductPanel() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-[#b4232a]/12 blur-xl" />
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d1321] p-4 text-white shadow-[0_38px_120px_rgba(13,19,33,.28)]">
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 640 620" className="h-full w-full">
            <path d="M46 355 C150 205 282 270 380 325 C478 382 520 260 606 320" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
            <path d="M70 450 C190 350 292 420 420 365 C520 322 560 420 615 440" fill="none" stroke="rgba(244,63,94,.78)" strokeWidth="2" strokeDasharray="10 14" />
            <circle cx="130" cy="320" r="42" fill="rgba(244,63,94,.16)" />
            <circle cx="485" cy="230" r="72" fill="rgba(59,130,246,.18)" />
          </svg>
        </div>

        <div className="relative z-10 rounded-[2rem] border border-white/10 bg-white/[.07] p-4 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f04438]">Çalışma özeti</p>
              <h2 className="mt-2 text-3xl font-black leading-tight tracking-[-0.065em]">
                Tek ekrandan başla.
              </h2>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10">
              <Trophy size={25} />
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            <PreviewRow icon={<BookOpen size={18} />} title="Konu seç" body="Kısa özetlerle başla" />
            <PreviewRow icon={<FileQuestion size={18} />} title="Test çöz" body={`${QUESTIONS_PER_TEST} soruluk oturum`} />
            <PreviewRow icon={<BrainCircuit size={18} />} title="Tekrar et" body="Flashcard ile hızlı hatırla" />
            <PreviewRow icon={<BarChart3 size={18} />} title="Analiz et" body="Yanlışları ve gelişimi izle" />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.07] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-white/58">Oturum akışı</span>
              <span className="text-sm font-black text-white">Hazır</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[72%] rounded-full bg-[#f04438]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.07] p-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white">{icon}</span>
      <div>
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs font-semibold leading-5 text-white/62">{body}</p>
      </div>
    </div>
  );
}

function ActionCard({ title, body, href, icon, cta }: { title: string; body: string; href: string; icon: ReactNode; cta: string }) {
  return (
    <a href={href} className="group relative min-h-[210px] overflow-hidden rounded-[2rem] border border-[#d9cfc1] bg-white/78 p-5 shadow-[0_24px_80px_rgba(13,19,33,.07)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute right-[-4rem] top-[-4rem] size-32 rounded-full bg-[#b4232a]/10 blur-2xl transition group-hover:bg-[#b4232a]/18" />
      <div className="relative z-10">
        <span className="grid size-12 place-items-center rounded-2xl bg-[#0d1321] text-white shadow-lg">{icon}</span>
        <h3 className="mt-5 text-2xl font-black tracking-[-0.055em] text-[#0d1321]">{title}</h3>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{body}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#b4232a]">
          {cta}
          <ArrowRight className="transition group-hover:translate-x-1" size={17} />
        </span>
      </div>
    </a>
  );
}

function BentoIntro() {
  return (
    <div className="h-full rounded-[2rem] bg-[#0d1321] p-6 text-white shadow-[0_30px_100px_rgba(13,19,33,.24)]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f04438]">Nasıl çalışır?</p>
      <h2 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.07em]">
        Dört adımda hedefe.
      </h2>
      <p className="mt-4 text-sm font-semibold leading-7 text-white/68">
        Uzun açıklama yok. Her adım tek tıkla ilgili ekrana gider.
      </p>
    </div>
  );
}

function StepCard({
  step,
  title,
  body,
  href,
  icon
}: {
  step: string;
  title: string;
  body: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <a href={href} className="flex min-h-[165px] flex-col justify-between rounded-[1.6rem] border border-[#d9cfc1] bg-white/78 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">{step}</p>
        <span className="grid size-10 place-items-center rounded-xl bg-[#0d1321] text-white">{icon}</span>
      </div>
      <div>
        <h3 className="mt-4 text-2xl font-black tracking-[-0.055em] text-[#0d1321]">{title}</h3>
        <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{body}</p>
      </div>
    </a>
  );
}

function FeatureCard({ title, body, icon }: { title: string; body: string; icon: ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-[#d9cfc1] bg-white/78 p-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <span className="grid size-12 place-items-center rounded-2xl bg-[#0d1321] text-white shadow-lg">{icon}</span>
      <h3 className="mt-6 text-2xl font-black tracking-[-0.055em] text-[#0d1321]">{title}</h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{body}</p>
    </div>
  );
}
