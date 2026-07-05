import type { StudyRecommendation } from "@/types/study";

/**
 * Kullanıcıya bugün ne çalışacağını söyleyen öneri listesi.
 */
export function RecommendationList({ items }: { items: StudyRecommendation[] }) {
  return (
    <section className="rounded-[2rem] bg-[#f2c15f] p-6 text-[#120b07] shadow-[0_28px_100px_rgba(230,184,92,0.22)]">
      <p className="text-xs font-black uppercase tracking-[0.26em] opacity-70">Önerilen Akış</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">Bugün bunu yap.</h2>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <a key={item.id} href={item.href} className="block rounded-[1.5rem] bg-[#120b07]/10 p-4 transition hover:bg-[#120b07]/16">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] opacity-60">{item.priority} · {item.minutes} dk</p>
                <h3 className="mt-2 font-black">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 opacity-75">{item.description}</p>
              </div>
              <span>→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
