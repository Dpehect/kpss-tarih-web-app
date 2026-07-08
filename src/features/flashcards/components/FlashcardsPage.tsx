import type { ReactNode } from "react";
import { ArrowRight, BrainCircuit, Layers3, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { expandedFlashcards as flashcards } from "@/data/expanded-flashcards";
import { topics } from "@/data/kpss-history";
import { FlashcardTrainer } from "@/features/flashcards/components/FlashcardTrainer";

export function FlashcardsPage() {
  const topicCount = new Set(flashcards.map((card) => card.topicId)).size;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.35rem] border border-[rgba(255,250,242,.16)] bg-[var(--bureau-ink)] p-6 text-[var(--bureau-inverse)] shadow-[var(--shadow-stage)] md:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[rgba(4,126,137,.34)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-8 h-80 w-80 rounded-full bg-[rgba(37,63,116,.36)] blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="kicker text-[var(--bureau-inverse)]">Aktif hatırlama laboratuvarı</p>
            <h1 className="bureau-display mt-4 max-w-4xl text-[clamp(2.4rem,7vw,5.7rem)] text-[var(--bureau-inverse)]">
              Flashcard tekrarını sınav hafızasına dönüştür.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-[var(--bureau-inverse-copy)] md:text-lg">
              Kartlar sadece ezber listesi değil; dönem, kavram, ipucu ve tekrar kararını birlikte veren profesyonel bir çalışma oturumu olarak tasarlandı.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/topics" className="btn-ghost bg-[var(--bureau-inverse)] text-[var(--bureau-ink)]">
                Konu anlatımına dön <ArrowRight size={16} />
              </Link>
              <Link href="/question-bank" className="btn-accent" data-dark-button="true">
                Testle pekiştir <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <HeroMetric icon={<Layers3 size={18} />} label="Kart" value={`${flashcards.length}`} />
            <HeroMetric icon={<BrainCircuit size={18} />} label="Konu desteği" value={`${topicCount}`} />
            <HeroMetric icon={<RotateCcw size={18} />} label="Çalışma modeli" value="SRS" />
          </div>
        </div>
      </section>

      <FlashcardTrainer cards={flashcards} topics={topics} />
    </div>
  );
}

function HeroMetric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[1.45rem] border border-[rgba(255,250,242,.16)] bg-[rgba(255,250,242,.08)] p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-[rgba(255,250,242,.12)] text-[var(--bureau-inverse)]">{icon}</span>
        <Sparkles size={16} className="text-[var(--bureau-inverse-muted)]" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[.16em] text-[var(--bureau-inverse-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-black tracking-[-.06em] text-[var(--bureau-inverse)]">{value}</p>
    </div>
  );
}
