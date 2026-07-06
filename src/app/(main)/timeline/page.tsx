import type { Metadata } from "next";
import { PremiumTimelinePage } from "@/features/timeline/components/PremiumTimelinePage";

export const metadata: Metadata = {
  title: "Timeline",
  description: "KPSS Tarih olaylarını premium timeline deneyimiyle keşfet."
};

export default function TimelineRoute() {
  return <PremiumTimelinePage />;
}
