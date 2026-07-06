import { ArrowRight } from "lucide-react";

/**
 * Landing kapanış CTA bloğu.
 */
export function LandingCta() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div
        data-cinematic-card
        className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(230,184,92,0.22),transparent_28%),radial-gradient(circle_at_84%_24%,rgba(82,242,208,0.12),transparent_28%),rgba(255,248,232,0.07)] p-8 shadow-[0_40px_140px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-14"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f6c465]">
            Final sürüm
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[0.96] tracking-tight text-[#fff8e8] md:text-6xl">
            KPSS Tarih için tek başına yeterli çalışma platformu.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#ead7b7]/72">
            12 kapsamlı konu, 60 açıklamalı soru, 48 flashcard, 6 deneme, timeline, analiz, yanlış defteri, kavram sözlüğü, notlar ve rozet sistemi tek yerde.
          </p>

          <a
            href="/dashboard"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#fff2cf] px-6 py-4 font-bold text-[#150d08] transition hover:-translate-y-1 hover:bg-white"
          >
            Uygulamaya gir
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
