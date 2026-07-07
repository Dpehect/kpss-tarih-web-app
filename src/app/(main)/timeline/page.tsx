import type { Metadata } from "next";
import { TimelinePage } from "@/features/timeline/components/TimelinePage";

export const metadata: Metadata = {
  title: "Zaman Çizelgesi",
  description: "KPSS Tarih olaylarını sade, hızlı ve odaklı bir kronoloji ekranında çalış."
};

export default function TimelineRoute() {
  return <TimelinePage />;
}
