import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CalendarClock,
  FileQuestion,
  Layers3,
  LineChart,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { AuroraBackground } from "@/components/magic/AuroraBackground";
import { BentoCard } from "@/components/aceternity/BentoCard";
import { MovingBorderCard } from "@/components/aceternity/MovingBorderCard";
import { Spotlight } from "@/components/aceternity/Spotlight";
import { flashcards, topics } from "@/data/kpss-history";
import { allQuestionTests, expandedQuestions, QUESTIONS_PER_TEST } from "@/data/generated-30-question-tests";

const nf = new Intl.NumberFormat("tr-TR");

const stats = [
  { label: "Konu", value: nf.format(topics.length) },
  { label: "Soru", value: nf.format(expandedQuestions.length) },
  { label: "Test", value: nf.format(allQuestionTests.length) },
  { label: "Kart", value: nf.format(flashcards.length) }
];

const actions = [
  {
    title: "Konu seç",
    body: "Müfredatı kısa özetlerle keşfet",
    href: "/topics",
    icon: <BookOpen size={22} />,
    cta: "Konuları aç"
  },
  {
    title: "Test çöz",
    body: "Her konunun testine hemen geç",
    href: "/question-bank/all?level=kolay",
    icon: <FileQuestion size={22} />,
    cta: "Hızlı test"
  },
  {
    title: "Tekrar et",
    body: "Flashcard'larla hızlı tekrar yap",
    href: "/flashcards",
    icon: <BrainCircuit size={22} />,
    cta: "Kartları aç"
  },
  {
    title: "Analiz et",
    body: "Yanlışlarını ve ilerlemeni izle",
    href: "/analytics",
    icon: <LineChart size={22} />,
    cta: "Analize git"
  }
];

export default function Home() {
  return (
    <AuroraBackground>
      <Spotlight />
      <Navbar />

      <main className="content-shell grid min-h-[calc(100vh-80px)] gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center lg:py-10">
        <section>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.08] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-200 backdrop-blur-xl">
            <Sparkles size={15} />
            Softbridge Akademi
          </div>

          <h1 className="mt-6 max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.095em] text-white md:text-8xl xl:text-9xl">
            Tarihi anla,
            <span className="block bg-gradient-to-r from-red-300 via-red-500 to-orange-200 bg-clip-text text-transparent">
              sınavı kazan.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/64 md:text-lg">
            Konular, testler, flashcard'lar ve zaman çizelgesi tek bir platformda. Sade, odaklı, etkili.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="/question-bank/all?level=kolay"
              variant="primary"
              size="lg"
              className="min-h-14 rounded-2xl bg-red-500 px-7 text-base text-white shadow-[0_24px_80px_rgba(239,68,68,.30)] hover:bg-red-600"
            >
              <Play size={18} />
              Hızlı Test Aç
            </ButtonLink>

            <ButtonLink
              href="/topics"
              variant="ghost"
              size="lg"
              className="min-h-14 rounded-2xl border-white/10 bg-white/[.08] px-7 text-base text-white hover:bg-white/[.13]"
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
        </section>

        <BentoCard className="min-h-[520px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-300">Çalışma launchpad</p>
              <h2 className="mt-3 text-4xl font-black leading-[0.95] tracking-[-0.075em] text-white">
                Tek ekranda karar ver.
              </h2>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-white">
              <Trophy size={25} />
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            {actions.map((action) => (
              <MiniAction key={action.title} {...action} />
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.07] p-4">
            <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-white/48">
              <span>Oturum akışı</span>
              <span>Hazır</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-red-500 to-orange-300" />
            </div>
          </div>
        </BentoCard>
      </main>

      <section className="content-shell grid gap-4 pb-10 lg:grid-cols-4">
        {actions.map((action, index) => (
          <MovingBorderCard key={action.title} href={action.href}>
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-white">
                {action.icon}
              </span>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-red-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-black tracking-[-0.055em] text-white">{action.title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/58">{action.body}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-red-300">
              {action.cta}
              <ArrowRight size={16} />
            </span>
          </MovingBorderCard>
        ))}
      </section>

      <section className="content-shell grid gap-4 pb-10 lg:grid-cols-3">
        <FeatureCard icon={<Layers3 size={22} />} title="Konu Özetleri" body="Müfredat, sade ve okunabilir başlıklara ayrılır." />
        <FeatureCard icon={<FileQuestion size={22} />} title="Test Bankası" body={`${QUESTIONS_PER_TEST} soruluk testlerle bilgini pekiştir.`} />
        <FeatureCard icon={<BarChart3 size={22} />} title="İlerleme Takibi" body="Yanlışlar, tekrarlar ve gelişimin tek bakışta." />
      </section>
    </AuroraBackground>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060914]/70 backdrop-blur-2xl">
      <div className="content-shell flex min-h-20 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-white text-sm font-black text-[#060914] shadow-[0_16px_50px_rgba(255,255,255,.15)]">
            S
          </span>
          <div>
            <p className="text-base font-black tracking-[-0.03em] text-white">Softbridge Akademi</p>
            <p className="text-xs font-semibold text-white/45">KPSS Tarih</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[.07] p-1 backdrop-blur-xl lg:flex">
          <NavLink href="/topics">Konular</NavLink>
          <NavLink href="/question-bank">Testler</NavLink>
          <NavLink href="/flashcards">Flashcard'lar</NavLink>
          <NavLink href="/analytics">İlerleme</NavLink>
        </nav>

        <ButtonLink href="/dashboard" variant="primary" size="md" className="rounded-2xl bg-white px-5 text-[#060914] hover:bg-white/90">
          Başla
        </ButtonLink>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="rounded-full px-4 py-2 text-sm font-black text-white/62 transition hover:bg-white hover:text-[#060914]">
      {children}
    </a>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[.075] p-4 backdrop-blur-2xl">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/40">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.07em] text-white">{value}</p>
    </div>
  );
}

function MiniAction({
  title,
  body,
  href,
  icon
}: {
  title: string;
  body: string;
  href: string;
  icon: ReactNode;
  cta: string;
}) {
  return (
    <a href={href} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.07] p-3 transition hover:bg-white/[.12]">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 truncate text-xs font-semibold text-white/52">{body}</p>
      </div>
      <ArrowRight className="text-red-300 transition group-hover:translate-x-1" size={17} />
    </a>
  );
}

function FeatureCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <BentoCard className="min-h-[190px]">
      <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-white">{icon}</span>
      <h3 className="mt-5 text-2xl font-black tracking-[-0.055em] text-white">{title}</h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-white/56">{body}</p>
    </BentoCard>
  );
}
