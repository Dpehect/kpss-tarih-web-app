import type { Metadata } from "next";
import { TimelinePage } from "@/features/timeline/components/TimelinePage";

export const metadata: Metadata = {
  title: "KPSS Tarih Kronoloji Atlası",
  description: "KPSS Tarih olaylarını görsel, tıklanabilir ve konu bağlantılı profesyonel kronoloji ekranında çalış.",
};

export default function TimelineRoute() {
  return <TimelinePage />;
}
