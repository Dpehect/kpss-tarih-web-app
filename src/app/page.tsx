import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Flame,
  Layers3,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Zap
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const stats = [
  { label: "Konu", value: "12" },
  { label: "Soru", value: "60" },
  { label: "Flashcard", value: "48" },
  { label: "Deneme", value: "6" }
];

const steps = [
  {
    step: "01",
    title: "Konu seç",
    body: "Müfredatı kısa özetlerle keşfet",
    icon: <BookOpen size={21} />
  },
  {
    step: "02",
    title: "Test çöz",
    body: "Her konunun testine hemen geç",
    icon: <FileQuestion size={21} />
  },
  {
    step: "03",
    title: "Tekrar et",
    body: "Flashcard'larla hızlı tekrar yap",
    icon: <Zap size={21} />
  },
  {
    step: "04",
    title: "Analiz et",
    body: "Yanlışlarını ve ilerlemeni izle",
    icon: <BarChart3 size={21} />
  }
];

const features = [
  {
    title: "Konu Özetleri",
    body: "Müfredat, sade ve okunabilir başlıklara ayrılır.",
    icon: <BookOpen size={24} />
  },
  {
    title: "Test Bankası",
    body: "Konuya özel testlerle bilgini pekiştir.",
    icon: <FileQuestion size={24} />
  },
  {
    title: "İlerleme Takibi",
    body: "Yanlışlar, tekrarlar ve gelişimin tek bakışta.",
    icon: <BarChart3 size={24} />
  }
];

const reasons = [
  "KPSS Tarih müfredatını sade ve yönetilebilir hale getirir.",
  "Konu, test, flashcard ve zaman çizelgesini tek çalışma akışında toplar.",
  "Öğrenciyi dağınık kaynaklar arasında kaybetmeden doğrudan çalışmaya yönlendirir.",
  "Yanlışlar ve ilerleme takibiyle tekrar sürecini daha bilinçli hale getirir."
];

const testimonials = [
  {
    name: "KPSS Adayı",
    text: "Konu anlatımı kısa, testlere geçiş hızlı. Ne çalışacağımı bulmak için zaman kaybetmiyorum."
  },
  {
    name: "Tarih Çalışan Öğrenci",
    text: "Zaman çizelgesi ve flashcard yapısı tekrarları daha düzenli hale getiriyor."
  },
  {
    name: "Düzenli Çalışmak İsteyen Aday",
    text: "Yanlışları ve gelişimi tek ekranda görmek motivasyonu artırıyor."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f4ec] text-slate-950">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.055)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute left-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#0f766e]/15 blur-3xl" />
        <div className="absolute right-[-12rem] top-[8rem] h-[34rem] w-[34rem] rounded-full bg-[#1e3a8a]/15 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-[35%] h-[32rem] w-[32rem] rounded-full bg-[#b4232a]/10 blur-3xl" />
      </div>

      <Navbar />

      <section className="content-shell relative grid min-h-[calc(100vh-84px)] gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_500px] lg:items-center lg:py-20">
        <ScrollReveal>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b4232a]/20 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a] shadow-sm backdrop-blur">
              <Sparkles size={15} />
              Premium KPSS Tarih Çalışma Platformu
            </div>

            <h1 className="mt-7 text-6xl font-black leading-[0.92] tracking-[-0.085em] text-[#101828] md:text-8xl xl:text-9xl">
              Tarihi Anla,
              <span className="block text-[#b4232a]">Sınavı Kazan.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-slate-600 md:text-xl">
              Konular, testler, flashcard'lar ve zaman çizelgesi — tek bir platformda. Sade, odaklı, etkili.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/dashboard"
                variant="primary"
                size="lg"
                className="min-h-14 rounded-2xl bg-[#b4232a] px-7 text-base shadow-[0_24px_70px_rgba(180,35,42,.28)] hover:bg-[#9f1f26]"
              >
                Ücretsiz Başla
                <ArrowRight size={19} />
              </ButtonLink>

              <ButtonLink
                href="#how-it-works"
                variant="ghost"
                size="lg"
                className="min-h-14 rounded-2xl border-slate-200 bg-white/80 px-7 text-base"
              >
                Nasıl Çalışır?
                <Play size={18} />
              </ButtonLink>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <HeroPreview />
        </ScrollReveal>
      </section>

      <section id="how-it-works" className="content-shell scroll-mt-28 py-12 md:py-16">
        <SectionHeader
          eyebrow="Nasıl çalışır?"
          title="Dört adımda hedefe"
          body="Softbridge Akademi, çalışma sürecini sadeleştirir: önce konuyu gör, sonra test çöz, tekrar et ve ilerlemeni takip et."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 0.05}>
              <StepCard {...step} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="features" className="content-shell py-12 md:py-16">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white/75 p-5 shadow-[0_24px_90px_rgba(15,23,42,.08)] backdrop-blur-xl md:p-8">
          <SectionHeader
            eyebrow="Özellikler"
            title="Tarih çalışmasını tek platformda topla"
            body="Konu anlatımı, soru çözümü ve tekrar akışı birbirinden kopuk değil; aynı hedefe çalışan sade bir sistemdir."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.06}>
                <FeatureCard {...feature} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="content-shell py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start">
          <ScrollReveal>
            <div className="rounded-[2.5rem] bg-[#101828] p-6 text-white shadow-[0_32px_100px_rgba(15,23,42,.22)] md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/75">
                <ShieldCheck size={15} />
                Neden Softbridge Akademi?
              </div>

              <h2 className="mt-6 text-4xl font-black leading-[1] tracking-[-0.07em] md:text-6xl">
                Dağınık çalışma yerine net bir sistem.
              </h2>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/72">
                Softbridge Akademi, KPSS Tarih çalışmasını sadeleştirir. Öğrenci; konu, test, tekrar ve ilerleme takibini aynı akış içinde yönetir.
              </p>

              <div className="mt-8 grid gap-3">
                {reasons.map((reason) => (
                  <div key={reason} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[.07] p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#f04438]" size={19} />
                    <p className="text-sm font-semibold leading-7 text-white/78">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-4">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 0.06}>
                <TestimonialCard {...testimonial} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="content-shell py-12 md:py-16">
        <div className="relative overflow-hidden rounded-[2.75rem] bg-[#b4232a] p-7 text-white shadow-[0_34px_110px_rgba(180,35,42,.28)] md:p-10 lg:p-12">
          <div className="absolute right-[-7rem] top-[-8rem] h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute bottom-[-10rem] left-[20%] h-80 w-80 rounded-full bg-[#101828]/20 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Başlamak için en iyi gün bugün</p>
              <h2 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.08em] md:text-7xl">
                Bugün başla, KPSS Tarih’te fark yarat.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/80">
                Konuları sade şekilde gör, testlerle pekiştir, flashcard'larla tekrar et ve ilerlemeni takip et.
              </p>
            </div>

            <ButtonLink
              href="/dashboard"
              variant="ghost"
              size="lg"
              className="min-h-14 rounded-2xl border-white/20 bg-white px-7 text-base text-[#101828] hover:bg-white/90"
            >
              Hemen Ücretsiz Başla
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
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#f8f4ec]/82 backdrop-blur-2xl">
      <div className="content-shell flex min-h-20 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#101828] text-sm font-black text-white shadow-lg">
            S
          </span>
          <div>
            <p className="text-base font-black tracking-[-0.03em] text-[#101828]">Softbridge Akademi</p>
            <p className="text-xs font-semibold text-slate-500">Premium KPSS Tarih Platformu</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/70 p-1 shadow-sm backdrop-blur-xl lg:flex">
          <NavLink href="/topics">Konular</NavLink>
          <NavLink href="/question-bank">Testler</NavLink>
          <NavLink href="/flashcards">Flashcard'lar</NavLink>
          <NavLink href="/analytics">İlerleme</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/login"
            variant="ghost"
            size="md"
            className="hidden rounded-2xl border-slate-200 bg-white/80 px-5 sm:inline-flex"
          >
            Giriş Yap
          </ButtonLink>
          <ButtonLink
            href="/dashboard"
            variant="primary"
            size="md"
            className="rounded-2xl bg-[#101828] px-5"
          >
            Hemen Başla
          </ButtonLink>
        </div>
      </div>
    </header>
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
    <div className="group rounded-[1.35rem] border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-4xl font-black tracking-[-0.07em] text-[#101828]">{value}</p>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-[#b4232a]/12 blur-xl" />
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#101828] p-5 text-white shadow-[0_35px_110px_rgba(15,23,42,.24)] md:p-6">
        <div className="absolute inset-0 opacity-25">
          <svg viewBox="0 0 620 700" className="h-full w-full">
            <path d="M50 420 C150 250 280 295 370 365 C470 445 520 315 590 355" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
            <path d="M70 510 C180 410 270 470 410 410 C490 374 540 430 600 452" fill="none" stroke="rgba(244,63,94,.75)" strokeWidth="2" strokeDasharray="10 14" />
            <circle cx="135" cy="350" r="42" fill="rgba(244,63,94,.16)" />
            <circle cx="475" cy="232" r="66" fill="rgba(59,130,246,.18)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f04438]">Çalışma Paneli</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.06em]">
                Bugünkü odak: konu + test + tekrar
              </h2>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10">
              <Trophy size={25} />
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            <PanelRow icon={<BookOpen size={18} />} title="Konu Özetleri" body="Müfredat sade başlıklara ayrılır" />
            <PanelRow icon={<FileQuestion size={18} />} title="Test Bankası" body="Konuya özel testlerle pekiştir" />
            <PanelRow icon={<Clock3 size={18} />} title="Zaman Çizelgesi" body="Olayları kronolojik bağla gör" />
            <PanelRow icon={<BarChart3 size={18} />} title="İlerleme Takibi" body="Yanlışlar ve gelişim tek bakışta" />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.07] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-white/58">Hazırlık durumu</span>
              <span className="text-sm font-black text-white">Odaklı</span>
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

function PanelRow({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.07] p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
        {icon}
      </span>
      <div>
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs font-semibold leading-5 text-white/62">{body}</p>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-black leading-[1] tracking-[-0.07em] text-[#101828] md:text-6xl">
        {title}
      </h2>
      <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
        {body}
      </p>
    </div>
  );
}

function StepCard({ step, title, body, icon }: { step: string; title: string; body: string; icon: ReactNode }) {
  return (
    <div className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white/78 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute right-[-3rem] top-[-3rem] h-28 w-28 rounded-full bg-[#b4232a]/10 blur-2xl transition group-hover:bg-[#b4232a]/18" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">{step}</span>
        <span className="grid size-12 place-items-center rounded-2xl bg-[#101828] text-white shadow-lg">
          {icon}
        </span>
      </div>

      <h3 className="relative z-10 mt-8 text-2xl font-black tracking-[-0.055em] text-[#101828]">
        {title}
      </h3>
      <p className="relative z-10 mt-3 text-sm font-semibold leading-7 text-slate-600">
        {body}
      </p>
    </div>
  );
}

function FeatureCard({ title, body, icon }: { title: string; body: string; icon: ReactNode }) {
  return (
    <div className="group rounded-[2rem] border border-slate-200 bg-[#fbf8f1] p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <span className="grid size-14 place-items-center rounded-2xl bg-[#101828] text-white shadow-lg transition group-hover:bg-[#b4232a]">
        {icon}
      </span>
      <h3 className="mt-7 text-3xl font-black tracking-[-0.065em] text-[#101828]">
        {title}
      </h3>
      <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
        {body}
      </p>
    </div>
  );
}

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-1 text-[#b4232a]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="mt-5 text-base font-semibold leading-8 text-slate-700">“{text}”</p>
      <div className="mt-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-[#101828] text-sm font-black text-white">
          {name[0]}
        </span>
        <div>
          <p className="text-sm font-black text-[#101828]">{name}</p>
          <p className="text-xs font-semibold text-slate-500">Softbridge Akademi kullanıcısı</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/45 py-10 backdrop-blur-xl">
      <div className="content-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-[#101828] text-sm font-black text-white">
            S
          </span>
          <div>
            <p className="text-sm font-black text-[#101828]">Softbridge Akademi</p>
            <p className="text-xs font-semibold text-slate-500">Premium KPSS Tarih Çalışma Platformu</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm font-bold text-slate-600">
          <a href="/topics" className="hover:text-[#b4232a]">Konular</a>
          <a href="/question-bank" className="hover:text-[#b4232a]">Testler</a>
          <a href="/flashcards" className="hover:text-[#b4232a]">Flashcard'lar</a>
          <a href="/analytics" className="hover:text-[#b4232a]">İlerleme</a>
        </div>

        <p className="text-xs font-semibold text-slate-500">
          © 2026 Softbridge Akademi. Sade, odaklı, etkili.
        </p>
      </div>
    </footer>
  );
}
