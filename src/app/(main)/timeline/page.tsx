import type { Metadata } from "next";
import { TimelinePage } from "@/features/timeline/components/TimelinePage";

export const metadata: Metadata = {
  title: "Timeline",
  description: "KPSS Tarih olaylarını premium timeline deneyimiyle keşfet."
};

export default function TimelineRoute() {
  return <TimelinePage />;
}
