import { SectionHeader } from "@/components/core/SectionHeader";
import { GlowCard } from "@/components/common/GlowCard";
import { landingFeatures } from "@/data/landing";

/**
 * Ana sayfadaki değer önerisi kartları.
 * Kartlar data-driven olduğu için yeni özellik eklemek kolaydır.
 */
export function LandingFeatureGrid() {
  return (
    <section id="features" className="relative px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Çalışma Deneyimi"
          title="Kuru konu anlatımı değil, yaşayan bir tarih laboratuvarı."
          description="Bu ilk faz, uygulamanın görsel kimliğini ve ana deneyim hissini kurar. Faz 2 ve Faz 3'te dashboard ve öğrenme modülleri bu görsel sistemin üzerine bağlanacak."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {landingFeatures.map((feature) => (
            <GlowCard key={feature.id} glow={feature.tone} data-cinematic-card>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--gold)]">
                {feature.stat}
              </p>
              <h3 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#fff8e8]">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#ead7b7]/70">
                {feature.description}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
