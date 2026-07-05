import { GsapLandingController } from "@/components/animations/GsapLandingController";
import { LandingHero } from "@/features/landing/components/LandingHero";
import { LandingFeatureGrid } from "@/features/landing/components/LandingFeatureGrid";
import { TimeRibbon } from "@/features/landing/components/TimeRibbon";
import { LandingCta } from "@/features/landing/components/LandingCta";

/**
 * Faz 1 ana sayfa kompozisyonu.
 * Server component olarak kalır; animasyonlar ve WebGL iç bileşenlerde client island olarak çalışır.
 */
export function LandingPage() {
  return (
    <GsapLandingController>
      <main className="relative isolate overflow-hidden">
        <div className="noise-overlay" aria-hidden="true" />
        <LandingHero />
        <LandingFeatureGrid />
        <TimeRibbon />
        <LandingCta />
      </main>
    </GsapLandingController>
  );
}
