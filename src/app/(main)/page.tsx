import { HeroSection } from "@/features/landing/HeroSection";
import { FeaturesShowcase } from "@/features/landing/FeaturesShowcase";
import { QuickStart } from "@/features/landing/QuickStart";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf7]">
      <HeroSection />
      <FeaturesShowcase />
      <QuickStart />
    </main>
  );
}