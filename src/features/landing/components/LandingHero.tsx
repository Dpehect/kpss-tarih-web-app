import { ArrowRight, Sparkles } from "lucide-react";
import { HeroSceneClient } from "@/features/landing/components/HeroSceneClient";

/**
 * Landing hero bölümü.
 * WebGL sahnesi ayrı client wrapper ile yüklendiği için SEO metinleri server tarafında kalır.
 */
export function LandingHero() {
  return (
    <section
      data-hero-section
      className="relative min-h-screen px-5 py-6 md:px-8"
    >
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative z-10 pt-20 lg:pt-0">
          <div
            data-hero-copy
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-white/[0.06] px-4 py-2 text-sm text-[#f6dfad]/85 backdrop-blur-xl"
          >
            <Sparkles size={16} className="text-[color:var(--gold)]" />
            KPSS Tarih için görsel hafıza odaklı çalışma deneyimi
          </div>

          <h1
            data-hero-copy
            className="mt-7 max-w-4xl text-balance text-5xl font-black leading-[0.92] tracking-[-0.08em] text-[#fff8e8] md:text-7xl xl:text-8xl"
          >
            Tarihi ezberleme.
            <span className="block bg-gradient-to-r from-[#f8d88b] via-[#ff8b3d] to-[#52f2d0] bg-clip-text text-transparent">
              Zamanın içinde öğren.
            </span>
          </h1>

          <p
            data-hero-copy
            className="mt-7 max-w-2xl text-lg leading-8 text-[#ead7b7]/72 md:text-xl"
          >
            Parşömen dokusu, zaman tozu, sinematik scroll geçişleri ve WebGL sahneleriyle KPSS Tarih konularını daha akılda kalıcı, daha canlı ve daha düzenli hale getiren yeni nesil çalışma platformu.
          </p>

          <div data-hero-copy className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#features"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#f2c15f] px-6 py-4 font-bold text-[#160d08] shadow-[0_20px_70px_rgba(230,184,92,0.28)] transition hover:-translate-y-1 hover:bg-[#ffd783]"
            >
              Deneyimi keşfet
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#timeline-ribbon"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white/[0.05] px-6 py-4 font-semibold text-[#fff8e8] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.10]"
            >
              Zaman akışına bak
            </a>
          </div>
        </div>

        <div data-hero-orb className="relative min-h-[32rem] lg:min-h-[44rem]">
          <HeroSceneClient />
          <div className="pointer-events-none absolute inset-x-8 bottom-10 rounded-[2rem] border border-white/10 bg-[#120b07]/55 p-5 text-sm leading-6 text-[#f2dfbf]/72 shadow-2xl backdrop-blur-2xl">
            <strong className="text-[#f7c76a]">Hero sahnesi:</strong> Dönen tarih halkası, parşömen partikülleri ve eski harita atmosferi. Mobilde düşük yoğunluklu çalışacak şekilde tasarlandı.
          </div>
        </div>
      </div>
    </section>
  );
}
