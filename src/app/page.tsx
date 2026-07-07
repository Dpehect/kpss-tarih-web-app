import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Layers3,
  LineChart,
  MapPinned,
  Play,
  ShieldCheck,
  Target,
  Trophy
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { exams, flashcards, timelineEvents, topics } from "@/data/kpss-history";
import { allQuestionTests, expandedQuestions, QUESTIONS_PER_TEST } from "@/data/generated-30-question-tests";

const nf = new Intl.NumberFormat("tr-TR");

const heroStats = [
  { label: "Konu", value: nf.format(topics.length), detail: "KPSS Tarih müfredatı" },
  { label: "Soru", value: nf.format(expandedQuestions.length), detail: "Açıklamalı çalışma havuzu" },
  { label: "Test", value: nf.format(allQuestionTests.length), detail: `${QUESTIONS_PER_TEST} soruluk oturumlar` },
  { label: "Kart", value: nf.format(flashcards.length), detail: "Hızlı tekrar kartı" }
];

const steps = [
  {
    step: "01",
    title: "Konu seç",
    body: "Müfredatı kısa özetlerle keşfet",
    href: "/topics",
    icon: <BookOpen size={22} />
  },
  {
    step: "02",
    title: "Test çöz",
    body: "Her konunun testine hemen geç",
    href: "/question-bank",
    icon: <FileQuestion size={22} />
  },
  {
    step: "03",
    title: "Tekrar et",
    body: "Flashcard'larla hızlı tekrar yap",
    href: "/flashcards",
    icon: <BrainCircuit size={22} />
  },
  {
    step: "04",
    title: "Analiz et",
    body: "Yanlışlarını ve ilerlemeni izle",
    href: "/analytics",
    icon: <BarChart3 size={22} />
  }
];

const entryCards = [
  {
    title: "Çalışmaya sıradan başla",
    body: "Önce konu özetini gör, ardından aynı konuya ait testlere geç.",
    href: "/topics",
    label: "Konu seç",
    icon: <BookOpen size={24} />
  },
  {
    title: "Doğrudan soru çöz",
    body: "Karışık testlerle bilgini hızlıca ölç; cevap açıklamasını aynı ekranda oku.",
    href: "/question-bank/all?level=kolay",
    label: "Teste gir",
    icon: <FileQuestion size={24} />
  },
  {
    title: "Eksikleri kapat",
    body: "Yanlışlarını ve gelişimini takip ederek tekrarını daha bilinçli yap.",
    href: "/mistakes",
    label: "Yanlışlara bak",
    icon: <Target size={24} />
  }
];

const features = [
  {
    title: "Konu Özetleri",
    body: "Müfredat, sade ve okunabilir başlıklara ayrılır. Her konu doğrudan test ve tekrar akışına bağlanır.",
    href: "/topics",
    icon: <Layers3 size={24} />
  },
  {
    title: "Test Bankası",
    body: "Konuya özel testlerle bilgini pekiştir. Kolay, orta, zor ve karışık test akışı ayrı ayrı düzenlenir.",
    href: "/question-bank",
    icon: <FileQuestion size={24} />
  },
  {
    title: "İlerleme Takibi",
    body: "Yanlışlar, tekrarlar ve gelişimin tek bakışta. Çalışma süreci görünür hale gelir.",
    href: "/analytics",
    icon: <LineChart size={24} />
  }
];

const priorityTopics = [...topics]
  .sort((a, b) => b.examImportance - a.examImportance)
  .slice(0, 5);

export default function Home() {
  const totalStudyUnits = topics.length + allQuestionTests.length + flashcards.length + timelineEvents.length;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f0e5] text-[#0d1321]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,19,33,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,19,33,.055)_1px,transparent_1px)] bg-[size:58px_58px]" />
        <div className="absolute left-[-16rem] top-[-12rem] h-[42rem] w-[42rem] rounded-full bg-[#0b3a67]/14 blur-3xl" />
        <div className="absolute right-[-16rem] top-[8rem] h-[38rem] w-[38rem] rounded-full bg-[#b4232a]/12 blur-3xl" />
        <div className="absolute bottom-[-18rem] left-[28%] h-[44rem] w-[44rem] rounded-full bg-[#0f766e]/10 blur-3xl" />
      </div>

      <Navbar />

      <section className="content-shell grid min-h-[calc(100vh-84px)] gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center lg:py-20">
        <ScrollReveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b4232a]/20 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a] shadow-sm backdrop-blur">
              <ShieldCheck size={15} />
              Premium KPSS Tarih Çalışma Platformu
            </div>

            <h1 className="mt-7 max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.09em] text-[#0d1321] md:text-8xl xl:text-9xl">
              Tarihi anla,
              <span className="block text-[#b4232a]">sınavı kazan.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-slate-650 md:text-xl">
              Konular, testler, flashcard'lar ve zaman çizelgesi tek bir platformda. Sade, odaklı, etkili.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/dashboard"
                variant="primary"
                size="lg"
                className="min-h-14 rounded-2xl bg-[#b4232a] px-7 text-base shadow-[0_24px_80px_rgba(180,35,42,.26)] hover:bg-[#9f1f26]"
              >
                Hemen Başla
                <ArrowRight size={19} />
              </ButtonLink>

              <ButtonLink
                href="/question-bank/all?level=kolay"
                variant="ghost"
                size="lg"
                className="min-h-14 rounded-2xl border-[#d9cfc1] bg-white/80 px-7 text-base"
              >
                Hızlı Test Aç
                <Play size={18} />
              </ButtonLink>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroStats.map((item) => (
                <StatCard key={item.label} {...item} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <ProductShowcase />
        </ScrollReveal>
      </section>

      <section className="content-shell pb-14">
        <ScrollReveal>
          <div className="grid gap-4 lg:grid-cols-3">
            {entryCards.map((card) => (
              <EntryCard key={card.title} {...card} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="how-it-works" className="content-shell scroll-mt-28 py-14">
        <SectionHeader
          eyebrow="Nasıl çalışır?"
          title="Dört adımda hedefe"
          body="Süreç basit tutulur: konuyu gör, testle kontrol et, kartlarla tekrar et ve gelişimini izle."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 0.05}>
              <StepCard {...step} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="content-shell py-14">
        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-stretch">
          <ScrollReveal>
            <div className="flex h-full flex-col justify-between rounded-[2.5rem] bg-[#0d1321] p-6 text-white shadow-[0_34px_110px_rgba(13,19,33,.24)] md:p-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f04438]">Showcase</p>
                <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.08em] md:text-6xl">
                  Bir çalışma sistemi gibi görünür, öyle çalışır.
                </h2>
                <p className="mt-5 text-base font-medium leading-8 text-white/70">
                  Ana sayfa vitrin olmakla kalmaz; kullanıcıyı konu, test, tekrar ve analize bağlayan net girişler sunar.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <DarkMetric label="Çalışma birimi" value={nf.format(totalStudyUnits)} />
                <DarkMetric label="Deneme" value={nf.format(exams.length)} />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.06}>
                <FeatureCard {...feature} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="content-shell py-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start">
          <ScrollReveal>
            <div className="rounded-[2.5rem] border border-[#d9cfc1] bg-white/76 p-6 shadow-[0_28px_90px_rgba(13,19,33,.09)] backdrop-blur-xl md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Öncelik sırası</p>
              <h2 className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.08em] text-[#0d1321] md:text-6xl">
                Önce sınav değeri yüksek konular.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600">
                Başlangıç ekranı rastgele yönlendirme yapmaz. Konuları önem değerine göre öne çıkarır ve doğrudan çalışma ekranına taşır.
              </p>

              <div className="mt-8 grid gap-3">
                {priorityTopics.map((topic, index) => (
                  <a
                    key={topic.id}
                    href={`/topics/${topic.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[#d9cfc1] bg-[#fbf8f1] p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#0d1321] text-sm font-black text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-black text-[#0d1321]">{topic.title}</p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">%{topic.examImportance} sınav önemi</p>
                      </div>
                    </div>
                    <ArrowRight className="text-[#b4232a] transition group-hover:translate-x-1" size={18} />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <aside className="sticky top-28 rounded-[2.5rem] bg-[#b4232a] p-6 text-white shadow-[0_34px_110px_rgba(180,35,42,.26)] md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-white/12">
                  <Trophy size={24} />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/68">Odak</p>
                  <h3 className="text-2xl font-black tracking-[-0.06em]">Bugün başla</h3>
                </div>
              </div>

              <p className="mt-5 text-base font-semibold leading-8 text-white/82">
                Konu seç, test çöz, yanlışlarını gör. Ana sayfanın görevi kullanıcıyı sayfada tutmak değil; doğru ekrana hızlı götürmek.
              </p>

              <ButtonLink
                href="/study-plan"
                variant="ghost"
                size="lg"
                className="mt-6 min-h-14 w-full rounded-2xl border-white/20 bg-white text-[#0d1321] hover:bg-white/90"
              >
                Çalışma Rotası Aç
                <ArrowRight size={19} />
              </ButtonLink>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      <section className="content-shell py-14">
        <div className="relative overflow-hidden rounded-[2.75rem] bg-[#0d1321] p-7 text-white shadow-[0_40px_130px_rgba(13,19,33,.26)] md:p-10 lg:p-12">
          <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-[#b4232a]/25 blur-3xl" />
          <div className="absolute bottom-[-10rem] left-[15%] h-80 w-80 rounded-full bg-[#0f766e]/16 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f04438]">Son çağrı</p>
              <h2 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.08em] md:text-7xl">
                Bugün başla, KPSS Tarih’te fark yarat.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/72">
                Konuları sade şekilde gör, testlerle pekiştir, flashcard'larla tekrar et ve ilerlemeni takip et.
              </p>
            </div>

            <ButtonLink
              href="/dashboard"
              variant="ghost"
              size="lg"
              className="min-h-14 rounded-2xl border-white/20 bg-white px-7 text-base text-[#0d1321] hover:bg-white/90"
            >
              Hemen Başla
              <ArrowRight size={19} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d9cfc1]/70 bg-[#f7f0e5]/84 backdrop-blur-2xl">
      <div className="content-shell flex min-h-20 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#0d1321] text-sm font-black text-white shadow-lg">
            S
          </span>
          <div>
            <p className="text-base font-black tracking-[-0.03em] text-[#0d1321]">Softbridge Akademi</p>
            <p className="text-xs font-semibold text-slate-500">KPSS Tarih Çalışma Platformu</p>
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
            Hemen Başla
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

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="group rounded-[1.35rem] border border-[#d9cfc1] bg-white/76 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-4xl font-black tracking-[-0.07em] text-[#0d1321]">{value}</p>
      <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{detail}</p>
    </div>
  );
}

function ProductShowcase() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rotate-3 rounded-[2.75rem] bg-[#b4232a]/12 blur-xl" />
      <div className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-[#0d1321] p-4 text-white shadow-[0_38px_120px_rgba(13,19,33,.28)] md:p-5">
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 680 760" className="h-full w-full">
            <path d="M50 430 C150 250 280 295 390 365 C500 435 544 315 640 358" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
            <path d="M70 540 C190 425 290 486 430 420 C520 378 582 440 650 468" fill="none" stroke="rgba(244,63,94,.75)" strokeWidth="2" strokeDasharray="10 14" />
            <circle cx="136" cy="350" r="42" fill="rgba(244,63,94,.16)" />
            <circle cx="484" cy="232" r="72" fill="rgba(59,130,246,.18)" />
            <circle cx="560" cy="560" r="58" fill="rgba(20,184,166,.13)" />
          </svg>
        </div>

        <div className="relative z-10 rounded-[2rem] border border-white/10 bg-white/[.07] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f04438]">Çalışma paneli</p>
              <h2 className="mt-2 text-3xl font-black leading-tight tracking-[-0.065em]">
                Konu, test ve analiz aynı akışta.
              </h2>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10">
              <Trophy size={25} />
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            <PreviewRow icon={<BookOpen size={18} />} title="Sıradaki konu" body={priorityTopics[0]?.title ?? "KPSS Tarih"} value="%92" />
            <PreviewRow icon={<FileQuestion size={18} />} title="Açıklamalı test" body={`${QUESTIONS_PER_TEST} soruluk oturum`} value="Hazır" />
            <PreviewRow icon={<CalendarClock size={18} />} title="Kronoloji bağı" body={`${timelineEvents.length} olaylık zaman çizelgesi`} value="Aktif" />
            <PreviewRow icon={<BarChart3 size={18} />} title="İlerleme takibi" body="Yanlışlar ve tekrarlar tek ekranda" value="Canlı" />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.07] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-white/58">Çalışma tamamlanma hissi</span>
              <span className="text-sm font-black text-white">Odaklı</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[74%] rounded-full bg-[#f04438]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({ icon, title, body, value }: { icon: ReactNode; title: string; body: string; value: string }) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/[.07] p-3">
      <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-white">{icon}</span>
      <div>
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs font-semibold leading-5 text-white/62">{body}</p>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white">{value}</span>
    </div>
  );
}

function EntryCard({ title, body, href, label, icon }: { title: string; body: string; href: string; label: string; icon: ReactNode }) {
  return (
    <a href={href} className="group relative min-h-[240px] overflow-hidden rounded-[2.25rem] border border-[#d9cfc1] bg-white/78 p-6 shadow-[0_24px_80px_rgba(13,19,33,.07)] backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute right-[-4rem] top-[-4rem] h-36 w-36 rounded-full bg-[#b4232a]/10 blur-2xl transition group-hover:bg-[#b4232a]/18" />
      <div className="relative z-10">
        <span className="grid size-14 place-items-center rounded-2xl bg-[#0d1321] text-white shadow-lg">{icon}</span>
        <h3 className="mt-7 text-3xl font-black leading-tight tracking-[-0.065em] text-[#0d1321]">{title}</h3>
        <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{body}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#b4232a]">
          {label}
          <ArrowRight className="transition group-hover:translate-x-1" size={17} />
        </span>
      </div>
    </a>
  );
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-black leading-[1] tracking-[-0.07em] text-[#0d1321] md:text-6xl">{title}</h2>
      <p className="mt-4 text-base font-semibold leading-8 text-slate-600">{body}</p>
    </div>
  );
}

function StepCard({ step, title, body, href, icon }: { step: string; title: string; body: string; href: string; icon: ReactNode }) {
  return (
    <a href={href} className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-[#d9cfc1] bg-white/78 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute right-[-3rem] top-[-3rem] h-28 w-28 rounded-full bg-[#b4232a]/10 blur-2xl transition group-hover:bg-[#b4232a]/18" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">{step}</span>
        <span className="grid size-12 place-items-center rounded-2xl bg-[#0d1321] text-white shadow-lg">{icon}</span>
      </div>
      <h3 className="relative z-10 mt-8 text-2xl font-black tracking-[-0.055em] text-[#0d1321]">{title}</h3>
      <p className="relative z-10 mt-3 text-sm font-semibold leading-7 text-slate-600">{body}</p>
    </a>
  );
}

function DarkMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.07] p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.07em] text-white">{value}</p>
    </div>
  );
}

function FeatureCard({ title, body, href, icon }: { title: string; body: string; href: string; icon: ReactNode }) {
  return (
    <a href={href} className="group flex min-h-[350px] flex-col justify-between rounded-[2.25rem] border border-[#d9cfc1] bg-white/78 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:shadow-2xl">
      <div>
        <span className="grid size-14 place-items-center rounded-2xl bg-[#0d1321] text-white shadow-lg transition group-hover:bg-[#b4232a]">{icon}</span>
        <h3 className="mt-7 text-3xl font-black tracking-[-0.065em] text-[#0d1321]">{title}</h3>
        <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{body}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#b4232a]">
        İncele
        <ArrowRight className="transition group-hover:translate-x-1" size={17} />
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#d9cfc1] bg-white/45 py-10 backdrop-blur-xl">
      <div className="content-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-[#0d1321] text-sm font-black text-white">S</span>
          <div>
            <p className="text-sm font-black text-[#0d1321]">Softbridge Akademi</p>
            <p className="text-xs font-semibold text-slate-500">KPSS Tarih Çalışma Platformu</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-bold text-slate-600">
          <a href="/topics" className="hover:text-[#b4232a]">Konular</a>
          <a href="/question-bank" className="hover:text-[#b4232a]">Testler</a>
          <a href="/flashcards" className="hover:text-[#b4232a]">Flashcard'lar</a>
          <a href="/analytics" className="hover:text-[#b4232a]">İlerleme</a>
        </div>
        <p className="text-xs font-semibold text-slate-500">© 2026 Softbridge Akademi. Sade, odaklı, etkili.</p>
      </div>
    </footer>
  );
}
