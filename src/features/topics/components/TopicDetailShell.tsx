import { SectionHeader } from "@/components/core/SectionHeader";

export function TopicDetailShell({ slug }: { slug: string }) {
  return (
    <article className="rounded-[2.5rem] border border-black/5 bg-white/60 p-8 backdrop-blur-xl">
      <SectionHeader
        eyebrow="Konu Detayı"
        title={slug.replaceAll("-", " ")}
        description="Faz 2'de scrollytelling timeline, dönem kartları, concept map ve ilişkili soru blokları eklenecek."
      />
    </article>
  );
}
