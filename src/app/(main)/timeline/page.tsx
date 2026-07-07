import type { Metadata } from "next";
import { TimelinePage } from "@/features/timeline/components/TimelinePage";

export const metadata: Metadata = {
  title: "Zaman Çizelgesi",
  description: "KPSS Tarih olaylarını dönem, konu ve kronolojik ilişkiyle keşfet."
};

export default function TimelineRoute() {
  return <TimelinePage />;
}
