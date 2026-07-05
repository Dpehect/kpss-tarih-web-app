import { SectionHeader } from "@/components/core/SectionHeader";
import timelineChapters from "@/features/scrollytelling/data/osmanli-timeline.json";
import { ScrollytellingTimelineClient } from "@/features/scrollytelling/components/ScrollytellingTimelineClient";

export default function TimelinePage() {
  return (
    <section className="space-y-10">
      <SectionHeader
        eyebrow="Scrollytelling"
        title="Osmanlı zaman çizelgesi"
        description="Kullanıcı sayfayı kaydırdıkça dönemler, kırılma noktaları ve neden-sonuç ilişkileri interaktif bir hikayeye dönüşür."
      />
      <ScrollytellingTimelineClient chapters={timelineChapters} />
    </section>
  );
}
