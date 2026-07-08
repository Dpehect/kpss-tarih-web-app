import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, BookOpen, BrainCircuit, CheckCircle2, Clock3, FileQuestion, KeyRound, Lightbulb, Map, ScrollText, Target, TriangleAlert } from "lucide-react";
import { getTestCountsForTopic } from "@/data/generated-30-question-tests";
import { getFlashcardsByTopic, getGlossaryByTopic, getQuestionsByTopic, getTopicBySlug } from "@/data/kpss-history";

export function TopicDetailPage({ slug }: { slug: string }) {
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const relatedQuestions = getQuestionsByTopic(topic.id);
  const relatedFlashcards = getFlashcardsByTopic(topic.id);
  const glossary = getGlossaryByTopic(topic.id);
  const counts = getTestCountsForTopic(topic.id);
  const examPattern = buildExamPattern(topic.title);

  return (
    <article className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/topics" className="btn-ghost">
          <ArrowLeft size={17} /> Konulara dön
        </Link>
        <Link href={`/question-bank/${topic.id}`} className="btn-primary" data-dark-button="true">
          Testlere geç <ArrowRight size={17} />
        </Link>
      </div>

      <section className="relative overflow-hidden rounded-[2.2rem] border border-[var(--bureau-line)] bg-[var(--bureau-ink)] p-6 text-[var(--bureau-inverse)] shadow-[var(--shadow-stage)] sm:p-8 lg:p-10">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[rgba(4,126,137,.25)] blur-3xl" />
          <div className="absolute -bottom-28 left-10 h-96 w-96 rounded-full bg-[rgba(37,63,116,.28)] blur-3xl" />
          <div className="absolute inset-0 opacity-[.08] [background-image:linear-gradient(90deg,rgba(255,255,255,.28)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.24)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="kicker text-[var(--bureau-inverse)]">Detaylı konu anlatımı</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.055em] sm:text-5xl lg:text-6xl">{topic.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--bureau-inverse-copy)]">{topic.shortDescription}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {topic.keywords.slice(0, 7).map((keyword) => (
                <span key={keyword} className="rounded-full border border-white/10 bg-white/[.08] px-3 py-1.5 text-xs font-black text-[var(--bureau-inverse)]">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Metric icon={<Target size={18} />} label="Sınav önemi" value={`%${topic.examImportance}`} helper="KPSS ağırlığı" />
            <Metric icon={<Clock3 size={18} />} label="Önerilen süre" value={`${topic.estimatedMinutes} dk`} helper="Odaklı çalışma" />
            <Metric icon={<FileQuestion size={18} />} label="Test / soru" value={`${counts.totalTests} / ${counts.totalQuestions}`} helper="Açıklamalı pratik" />
            <Metric icon={<BrainCircuit size={18} />} label="Tekrar kartı" value={relatedFlashcards.length} helper="Aktif hatırlama" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <DetailPanel icon={<BookOpen size={20} />} title="Konu anlatımı">
            <div className="space-y-5">
              {topic.summary.map((block, index) => (
                <section key={`${block.heading}-${index}`} className="kpss-light-container rounded-[1.4rem] border border-[var(--bureau-line)] bg-white/70 p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-2xl bg-[var(--bureau-ink)] text-sm font-black text-[var(--bureau-inverse)]">{String(index + 1).padStart(2, "0")}</span>
                    <h2 className="text-xl font-black tracking-[-.03em] text-[var(--bureau-ink)]">{block.heading}</h2>
                  </div>
                  <p className="mt-4 text-[15px] leading-8 text-[var(--bureau-copy)]">{block.body}</p>
                  <ul className="mt-4 grid gap-3">
                    {block.bullets.map((bullet) => (
                      <li key={bullet} className="kpss-light-container flex gap-3 rounded-2xl bg-[rgba(4,126,137,.07)] p-3 text-sm leading-7 text-[var(--bureau-copy)]">
                        <CheckCircle2 className="mt-1 shrink-0 text-[var(--bureau-teal)]" size={17} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </DetailPanel>

          <DetailPanel icon={<ScrollText size={20} />} title="Derin öğrenme notu">
            <div className="grid gap-4 md:grid-cols-3">
              <DeepNote title="1. Kavramı bağla" body={`${topic.title} sorularında tek kavram çoğu zaman dönem, kurum ve sonuç bilgisini birlikte ister. Anahtar kelimeleri sadece tanım olarak değil, hangi olayla ilişkilendiğiyle öğren.`} />
              <DeepNote title="2. Kronolojiyi sabitle" body="KPSS Tarih'te doğru cevap genellikle olay sırasını bilmekle netleşir. Önce ana dönemi, sonra dönemin içindeki kırılma olayını konumlandır." />
              <DeepNote title="3. Çeldiriciyi yakala" body="Soru kökündeki küçük ifade, iki benzer kavramı ayırmak için verilir. Sık yapılan hata listesini çözüm öncesi kontrol etmek net artırır." />
            </div>
          </DetailPanel>

          <DetailPanel icon={<Lightbulb size={20} />} title="Sınavda nasıl gelir?">
            <div className="grid gap-4 md:grid-cols-3">
              {examPattern.map((item) => (
                <ExamTip key={item.title} title={item.title} body={item.body} />
              ))}
            </div>
          </DetailPanel>

          <DetailPanel icon={<Map size={20} />} title="Mini timeline">
            <div className="relative grid gap-4">
              <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute left-[1.15rem] top-4 h-[calc(100%-2rem)] w-px bg-[var(--bureau-line-2)]" />
              {topic.quickTimeline.map((event, index) => (
                <div key={`${event.date}-${event.event}`} className="relative z-10 flex gap-4 rounded-[1.25rem] border border-[var(--bureau-line)] bg-white/70 p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--bureau-ink)] text-xs font-black text-[var(--bureau-inverse)]">{index + 1}</span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.14em] text-[var(--bureau-teal)]">{event.date}</p>
                    <p className="mt-1 text-sm font-extrabold leading-6 text-[var(--bureau-ink)]">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </DetailPanel>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-8 xl:self-start">
          <SidePanel icon={<KeyRound size={18} />} title="Anahtar kavramlar">
            <div className="flex flex-wrap gap-2">
              {[...new Set([...topic.keywords, ...topic.mustKnow])].slice(0, 16).map((item) => (
                <span key={item} className="rounded-full border border-[var(--bureau-line)] bg-white px-3 py-1.5 text-xs font-black text-[var(--bureau-copy)]">
                  {item}
                </span>
              ))}
            </div>
          </SidePanel>

          <SidePanel icon={<TriangleAlert size={18} />} title="Sık hata kontrolü">
            <ul className="space-y-3">
              {topic.commonMistakes.map((mistake) => (
                <li key={mistake} className="rounded-2xl bg-[rgba(158,63,63,.08)] p-3 text-sm leading-6 text-[var(--bureau-copy)]">
                  {mistake}
                </li>
              ))}
            </ul>
          </SidePanel>

          <SidePanel icon={<BrainCircuit size={18} />} title="Sözlük ve kartlar">
            <p className="text-sm leading-7 text-[var(--bureau-copy)]">
              Bu konuya bağlı {glossary.length} sözlük maddesi, {relatedFlashcards.length} flashcard ve {relatedQuestions.length} temel soru bulunuyor.
            </p>
            <div className="mt-4 grid gap-2">
              <Link href={`/question-bank/${topic.id}`} className="btn-primary w-full" data-dark-button="true">
                Açıklamalı test çöz <ArrowRight size={16} />
              </Link>
              <Link href="/flashcards" className="btn-ghost w-full">
                Kartlarla tekrar et
              </Link>
            </div>
          </SidePanel>
        </aside>
      </section>
    </article>
  );
}

function buildExamPattern(title: string) {
  return [
    {
      title: "Kavram sorusu",
      body: `${title} başlığında kavramın tanımı kadar hangi kurum, savaş, belge veya dönemle ilişkili olduğu da yoklanır.`,
    },
    {
      title: "Öncül yorumu",
      body: "I-II-III tipindeki öncüllerde çeldirici genellikle doğru bilgi gibi görünür ama dönem veya sonuç bakımından yanlıştır.",
    },
    {
      title: "Kronoloji ayrımı",
      body: "Benzer olaylar arasında önce-sonra ilişkisini kurmak, özellikle antlaşma, kongre, savaş ve inkılap sorularında belirleyicidir.",
    },
  ];
}

function Metric({ icon, label, value, helper }: { icon: ReactNode; label: string; value: string | number; helper: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[.08] p-4">
      <div className="flex items-center gap-2 text-[var(--bureau-inverse-copy)]">{icon}<span className="text-xs font-bold">{label}</span></div>
      <p className="mt-3 text-2xl font-black text-[var(--bureau-inverse)]">{value}</p>
      <p className="mt-1 text-xs font-bold text-[var(--bureau-inverse-muted)]">{helper}</p>
    </div>
  );
}

function DetailPanel({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="kpss-light-container rounded-[1.8rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.88)] p-5 shadow-[var(--shadow-paper)] sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-[rgba(4,126,137,.10)] text-[var(--bureau-teal)]">{icon}</span>
        <h2 className="text-2xl font-black tracking-[-.04em] text-[var(--bureau-ink)]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SidePanel({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="kpss-light-container rounded-[1.6rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.92)] p-5 shadow-[var(--shadow-paper)]">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-[rgba(4,126,137,.10)] text-[var(--bureau-teal)]">{icon}</span>
        <h3 className="text-lg font-black tracking-[-.03em] text-[var(--bureau-ink)]">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function DeepNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="kpss-light-container rounded-[1.25rem] border border-[var(--bureau-line)] bg-white/70 p-4">
      <h3 className="text-sm font-black text-[var(--bureau-ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--bureau-copy)]">{body}</p>
    </div>
  );
}

function ExamTip({ title, body }: { title: string; body: string }) {
  return (
    <div className="kpss-light-container rounded-[1.25rem] border border-[rgba(4,126,137,.18)] bg-[rgba(4,126,137,.07)] p-4">
      <h3 className="text-sm font-black text-[var(--bureau-ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--bureau-copy)]">{body}</p>
    </div>
  );
}
