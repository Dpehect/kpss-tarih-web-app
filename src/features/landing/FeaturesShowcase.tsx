import { SectionHeader } from "@/components/core/SectionHeader";

export function FeaturesShowcase() {
  const features = [
    { title: "Akıllı Tekrar Sistemi", desc: "Spaced repetition ile kalıcı öğrenme", icon: "🔄" },
    { title: "3D Timeline", desc: "Tarihi olayları görselleştir", icon: "📜" },
    { title: "Gerçek Zamanlı İlerleme", desc: "Anlık mastery analizi", icon: "📊" },
    { title: "Cinematic Geçişler", desc: "GSAP + WebGL ile akıcı deneyim", icon: "✨" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          eyebrow="Neden Biz?" 
          title="Premium bir öğrenme deneyimi" 
          description="Sadece soru çözmek değil, tarihin içinde yaşamak." 
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((f, i) => (
            <div 
              key={i}
              className="group p-8 rounded-3xl border border-black/5 bg-white/70 hover:bg-white transition-all hover:-translate-y-2 duration-500"
            >
              <div className="text-5xl mb-6">{f.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
              <p className="text-neutral-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}