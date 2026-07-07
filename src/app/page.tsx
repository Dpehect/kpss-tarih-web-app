import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  FileQuestion,
  LineChart,
  Play,
  Sparkles
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SBBrandMark } from "@/components/brand/SBBrandMark";
import { SoftbridgeOrb } from "@/components/home/SoftbridgeOrb";
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
    icon: <BookOpen size={20} />
  },
  {
    title: "Test çöz",
    body: `${QUESTIONS_PER_TEST} soruluk açıklamalı test aç`,
    href: "/question-bank/all?level=kolay",
    icon: <FileQuestion size={20} />
  },
  {
    title: "Tekrar et",
    body: "Flashcard'larla hızlı tekrar yap",
    href: "/flashcards",
    icon: <BrainCircuit size={20} />
  },
  {
    title: "Analiz et",
    body: "Yanlışlarını ve ilerlemeni izle",
    href: "/analytics",
    icon: <LineChart size={20} />
  }
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6efe4] text-[#101828]">
      <Background />

      <header className="relative z-30">
        <div className="mx-auto flex min-h-[78px] w-full max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="/" className="flex items-center gap-3">
            <SBBrandMark className="size-12" />
            <div>
              <p className="text-base font-black tracking-[-0.035em] text-[#101828]">Softbridge Akademi</p>
              <p className="text-xs font-semibold text-slate-500">KPSS Tarih Çalışma Platformu</p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 rounded-full border border-[#e0d2c2] bg-white/72 px-2 py-2 shadow-[0_12px_34px_rgba(16,24,40,.06)] backdrop-blur-xl lg:flex">
            <HomeNavLink href="/topics">Konular</HomeNavLink>
            <HomeNavLink href="/question-bank">Testler</HomeNavLink>
            <HomeNavLink href="/flashcards">Flashcard&apos;lar</HomeNavLink>
            <HomeNavLink href="/analytics">İlerleme</HomeNavLink>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="/login"
              variant="ghost"
              size="md"
              className="hidden rounded-2xl border-[#e0d2c2] bg-white/72 px-5 text-[#101828] hover:bg-white sm:inline-flex"
            >
              Giriş Yap
            </ButtonLink>
            <ButtonLink
              href="/dashboard"
              variant="primary"
              size="md"
              data-dark-button="true"
              className="softbridge-dark-action rounded-2xl bg-[#101828] px-5 text-white hover:bg-[#1d2939]"
            >
              Başla
            </ButtonLink>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-78px)] w-full max-w-7xl gap-8 px-5 pb-8 pt-5 md:px-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(400px,.72fr)] lg:items-center">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e0d2c2] bg-white/74 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a] shadow-sm backdrop-blur-xl">
            <Sparkles size={15} />
            Premium KPSS Tarih Platformu
          </div>

          <h1 className="mt-6 max-w-4xl text-6xl font-black leading-[0.88] tracking-[-0.095em] text-[#101828] md:text-8xl xl:text-[7.6rem]">
            Tarihi anla,
            <span className="block bg-gradient-to-r from-[#b4232a] via-[#d94b42] to-[#f59e0b] bg-clip-text text-transparent">
              sınavı kazan.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-600 md:text-lg">
            Konular, testler, flashcard&apos;lar ve zaman çizelgesi tek bir platformda. Sade, odaklı, etkili.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="/question-bank/all?level=kolay"
              variant="primary"
              size="lg"
              data-dark-button="true"
              className="softbridge-dark-action min-h-14 rounded-2xl bg-[#b4232a] px-7 text-base text-white shadow-[0_24px_70px_rgba(180,35,42,.22)] hover:bg-[#9f1f26]"
            >
              <Play size={18} />
              Hızlı Test Aç
            </ButtonLink>

            <ButtonLink
              href="/topics"
              variant="ghost"
              size="lg"
              className="min-h-14 rounded-2xl border-[#e0d2c2] bg-white/76 px-7 text-base text-[#101828] hover:bg-white"
            >
              Konuları Gör
              <ArrowRight size={18} />
            </ButtonLink>
          </div>

          <div className="mt-7 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((item) => (
              <Stat key={item.label} {...item} />
            ))}
          </div>
        </div>

        <aside className="relative">
          <div className="absolute inset-0 rotate-2 rounded-[2.75rem] bg-[#b4232a]/12 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.75rem] border border-[#e2d6c7] bg-white/72 p-4 shadow-[0_34px_120px_rgba(16,24,40,.12)] backdrop-blur-2xl">
            <div className="absolute right-[-3rem] top-[-4rem] h-[22rem] w-[22rem] opacity-85">
              <SoftbridgeOrb />
            </div>

            <div className="relative z-10 rounded-[2.1rem] border border-white/80 bg-[#fffaf3]/80 p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Çalışma paneli</p>
                  <h2 className="mt-3 max-w-sm text-4xl font-black leading-[0.96] tracking-[-0.075em] text-[#101828]">
                    Nereden başlayacağını tek ekranda seç.
                  </h2>
                </div>
                <span className="hidden rounded-full border border-[#eadfce] bg-white/80 px-3 py-1 text-xs font-black text-slate-500 sm:inline-flex">
                  Hazır
                </span>
              </div>

              <div className="mt-7 grid gap-3">
                {actions.map((action, index) => (
                  <CommandRow key={action.title} {...action} index={index} />
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#eadfce] bg-white/76 p-4">
                <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  <span>Oturum akışı</span>
                  <span className="text-[#b4232a]">Odaklı</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#eee2d4]">
                  <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-[#b4232a] to-[#f59e0b]" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-4 px-5 pb-8 md:px-8 lg:grid-cols-3">
        <FeatureCard
          icon={<BookOpen size={22} />}
          title="Konu Özetleri"
          body="Müfredat, sade ve okunabilir başlıklara ayrılır."
        />
        <FeatureCard
          icon={<FileQuestion size={22} />}
          title="Test Bankası"
          body="Konuya özel testlerle bilgini pekiştir."
        />
        <FeatureCard
          icon={<BarChart3 size={22} />}
          title="İlerleme Takibi"
          body="Yanlışlar, tekrarlar ve gelişimin tek bakışta."
        />
      </section>
    </main>
  );
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,40,.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,.045)_1px,transparent_1px)] bg-[size:68px_68px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(180,35,42,.14),transparent_32rem),radial-gradient(circle_at_86%_20%,rgba(37,99,235,.11),transparent_30rem),radial-gradient(circle_at_50%_96%,rgba(15,118,110,.09),transparent_34rem)]" />
      <div className="absolute left-1/2 top-0 h-px w-[72vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#b4232a]/30 to-transparent" />
    </div>
  );
}

function HomeNavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="softbridge-nav-link inline-flex min-h-10 items-center rounded-full px-4 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b4232a]/40"
    >
      {children}
    </a>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[#e0d2c2] bg-white/76 p-4 shadow-sm backdrop-blur-xl">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.07em] text-[#101828]">{value}</p>
    </div>
  );
}

function CommandRow({
  title,
  body,
  href,
  icon,
  index
}: {
  title: string;
  body: string;
  href: string;
  icon: ReactNode;
  index: number;
}) {
  return (
    <a href={href} className="group grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-[#eadfce] bg-white/78 p-3 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
      <span className="grid size-11 place-items-center rounded-xl bg-[#101828] text-white">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-black text-[#101828]">{title}</p>
        <p className="mt-1 truncate text-xs font-semibold text-slate-500">{body}</p>
      </div>
      <span className="hidden text-[10px] font-black uppercase tracking-[0.16em] text-[#b4232a] sm:inline">
        {String(index + 1).padStart(2, "0")}
      </span>
    </a>
  );
}

function FeatureCard({ title, body, icon }: { title: string; body: string; icon: ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-[#e0d2c2] bg-white/76 p-6 shadow-[0_22px_70px_rgba(16,24,40,.07)] backdrop-blur-xl">
      <span className="grid size-12 place-items-center rounded-2xl bg-[#101828] text-white shadow-lg">
        {icon}
      </span>
      <h3 className="mt-5 text-2xl font-black tracking-[-0.055em] text-[#101828]">{title}</h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{body}</p>
    </div>
  );
}
