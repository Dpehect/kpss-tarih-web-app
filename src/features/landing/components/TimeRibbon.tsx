import { timelineTeasers } from "@/data/landing";

/**
 * Scroll sırasında yatay akan tarih şeridi.
 * Kullanıcıya zaman akışı hissi verir; Faz 3'te gerçek Timeline modülüne bağlanabilir.
 */
export function TimeRibbon() {
  return (
    <section
      id="timeline-ribbon"
      data-ribbon-section
      className="relative overflow-hidden border-y border-white/10 py-12"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(230,184,92,0.12),rgba(82,242,208,0.08),rgba(221,75,57,0.10))]" />

      <div data-time-ribbon className="relative flex w-[180%] gap-4 px-5">
        {[...timelineTeasers, ...timelineTeasers].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="min-w-64 rounded-[1.7rem] border border-white/10 bg-[#120b07]/62 p-5 shadow-xl backdrop-blur-xl"
          >
            <p className="text-4xl font-semibold tracking-tight text-[#f6c465]">{item.date}</p>
            <p className="mt-2 text-sm uppercase tracking-wider text-[#ead7b7]/64">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
