import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileQuestion,
  KeyRound,
  Lightbulb,
  Map,
  ScrollText,
  Target,
  TriangleAlert
} from "lucide-react";
import { getTestCountsForTopic } from "@/data/generated-30-question-tests";
import {
  getFlashcardsByTopic,
  getGlossaryByTopic,
  getQuestionsByTopic,
  getTopicBySlug
} from "@/data/kpss-history";
import { getTopicVisual } from "@/data/topic-visuals";
import { MarkTopicCompleteButton } from "@/features/topics/components/MarkTopicCompleteButton";

export function TopicDetailPage({ slug }: { slug: string }) {
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const relatedQuestions = getQuestionsByTopic(topic.id);
  const relatedFlashcards = getFlashcardsByTopic(topic.id);
  const terms = getGlossaryByTopic(topic.id);
  const counts = getTestCountsForTopic(topic.id);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[#e4d8c8] bg-white/78 p-6 shadow-[0_28px_100px_rgba(16,24,40,.08)] backdrop-blur-2xl md:p-8">
        <div className="absolute right-[-10rem] top-[-10rem] size-96 rounded-full bg-[#b4232a]/12 blur-3xl" />

        <div className="relative z-10 grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <a href="/topics" className="mb-5 inline-flex items-center gap-2 text-sm font-black text-[#b4232a]">
              Konulara dön
            </a>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Detaylı konu anlatımı</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.08em] text-[#101828] md:text-7xl">
              {topic.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600">
              {topic.shortDescription}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`/question-bank/${topic.id}`}
                data-dark-button="true"
                className="softbridge-dark-action inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[#b4232a] px-6 text-sm font-black"
              >
                Testlere geç
                <ArrowRight size={17} />
              </a>
              <MarkTopicCompleteButton topicId={topic.id} />
            </div>
          </div>

          <TopicHeroVisual index={Number(topic.id.replace(/\D/g, "")) || 0} title={topic.title} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={<Target size={20} />} label="Sınav önemi" value={`%${topic.examImportance}`} helper="Konu ağırlığı" />
        <Metric icon={<Clock3 size={20} />} label="Önerilen süre" value={`${topic.estimatedMinutes} dk`} helper="Odaklı çalışma" />
        <Metric icon={<FileQuestion size={20} />} label="Test / soru" value={`${counts.totalTests} / ${counts.totalQuestions}`} helper="Gerçek soru bankası" />
        <Metric icon={<BrainCircuit size={20} />} label="Flashcard" value={String(relatedFlashcards.length)} helper="Hızlı tekrar" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <main className="space-y-5">
          <DetailPanel icon={<BookOpen size={22} />} title="Konu özeti">
            <div className="space-y-5">
              {topic.summary.map((block, index) => (
                <article key={block.heading} className="rounded-[1.75rem] border border-[#eadfce] bg-[#fffaf3]/76 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-[#101828] text-xs font-black text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl font-black tracking-[-0.055em] text-[#101828]">{block.heading}</h2>
                  </div>
                  <p className="text-sm font-semibold leading-8 text-slate-600">{block.body}</p>
                  <ul className="mt-4 space-y-2">
                    {block.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm font-semibold leading-7 text-slate-600">
                        <CheckCircle2 className="mt-1 shrink-0 text-[#0f766e]" size={17} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </DetailPanel>

          <DetailPanel icon={<ScrollText size={22} />} title="Uzun konu anlatımı">
            <div className="space-y-4 text-sm font-semibold leading-8 text-slate-600">
              <p>
                Bu konu, KPSS Tarih sorularında yalnızca bilgi hatırlama düzeyinde değil; kavram, dönem, kurum ve sonuç ilişkisiyle birlikte ölçülür. Bu yüzden çalışırken önce ana fikri, sonra kavramları ve en son kronolojik akışı birlikte düşünmelisin.
              </p>
              <p>
                {topic.title} başlığında doğru cevap genellikle olayın hangi döneme ait olduğunu, hangi kurumla ilişkili olduğunu ve hangi sonucu doğurduğunu ayırt etmeye dayanır. Soru kökünde verilen küçük bir kavram, doğru seçeneği bulmak için ana ipucu olabilir.
              </p>
              <p>
                Çalışma sırası şu şekilde olmalı: kısa özeti oku, anahtar kavramları eşleştir, sık yapılan hataları kontrol et, mini timeline ile sıralamayı oturt ve ardından bu konuya ait testlere geç. Böylece konu pasif okumadan çıkıp aktif hatırlamaya dönüşür.
              </p>
            </div>
          </DetailPanel>

          <DetailPanel icon={<Target size={22} />} title="Sınavda nasıl gelir?">
            <div className="grid gap-3 md:grid-cols-3">
              <ExamTip title="Bilgi sorusu" body="Tanım, kurum, dönem veya kavramın doğrudan karşılığı sorulabilir." />
              <ExamTip title="Yorum sorusu" body="Verilen gelişmenin sonucu veya hangi ilkeyle ilişkili olduğu istenebilir." />
              <ExamTip title="Kronoloji" body="Olayların önce-sonra ilişkisi veya aynı döneme ait gelişmeler karşılaştırılabilir." />
            </div>
          </DetailPanel>
        </main>

        <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
          <SidePanel icon={<KeyRound size={21} />} title="Anahtar kelimeler">
            <div className="flex flex-wrap gap-2">
              {[...topic.keywords, ...topic.mustKnow].slice(0, 12).map((item) => (
                <span key={item} className="rounded-full bg-[#f3eadc] px-3 py-1 text-xs font-black text-slate-600">
                  {item}
                </span>
              ))}
            </div>
          </SidePanel>

          <SidePanel icon={<Lightbulb size={21} />} title="İpuçları">
            <ul className="space-y-3">
              {topic.mustKnow.slice(0, 6).map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-slate-600">
                  <CheckCircle2 className="mt-1 shrink-0 text-[#0f766e]" size={17} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SidePanel>

          <SidePanel icon={<TriangleAlert size={21} />} title="Sık yapılan hatalar">
            <ul className="space-y-3">
              {topic.commonMistakes.map((mistake) => (
                <li key={mistake} className="flex gap-3 text-sm font-semibold leading-7 text-slate-600">
                  <TriangleAlert className="mt-1 shrink-0 text-[#b4232a]" size={17} />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </SidePanel>

          <SidePanel icon={<Map size={21} />} title="Mini timeline">
            <div className="space-y-3">
              {topic.quickTimeline.map((event) => (
                <div key={`${event.date}-${event.event}`} className="rounded-2xl border border-[#eadfce] bg-[#fffaf3]/76 p-3">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#b4232a]">{event.date}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{event.event}</p>
                </div>
              ))}
            </div>
          </SidePanel>

          <SidePanel icon={<FileQuestion size={21} />} title="Bu konudan pratik">
            <p className="text-sm font-semibold leading-7 text-slate-600">
              Bu konu için {counts.totalTests} test ve {counts.totalQuestions} açıklamalı soru var. Eski temel havuzda {relatedQuestions.length} özgün örnek soru bağlı.
            </p>
            <a
              href={`/question-bank/${topic.id}`}
              data-dark-button="true"
              className="softbridge-dark-action mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#101828] px-5 text-sm font-black"
            >
              Testleri aç
              <ArrowRight size={17} />
            </a>
          </SidePanel>
        </aside>
      </section>
    </div>
  );
}

function TopicHeroVisual({ title, index }: { title: string; index: number }) {
  const visual = getTopicVisual({ id: String(index), title, slug: "", era: "osmanli", shortDescription: "", examImportance: 0, estimatedMinutes: 0, keywords: [], summary: [], mustKnow: [], commonMistakes: [], quickTimeline: [] }, index);

  return (
    <div className={`relative min-h-[280px] overflow-hidden rounded-[2.25rem] bg-gradient-to-br ${visual.gradient} p-6`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,40,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-55" />
      <div className="relative z-10 flex h-full min-h-[230px] flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="grid size-20 place-items-center rounded-[2rem] bg-white/76 text-5xl font-black shadow-[0_18px_60px_rgba(16,24,40,.10)]" style={{ color: visual.accent }}>
            {visual.symbol}
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-600">
            {visual.label}
          </span>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[#101828]">{visual.line}</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[#101828]">{title}</h2>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon, label, value, helper }: { icon: ReactNode; label: string; value: string; helper: string }) {
  return (
    <div className="rounded-[2rem] border border-[#e4d8c8] bg-white/78 p-5 shadow-sm backdrop-blur-xl">
      <span className="grid size-12 place-items-center rounded-2xl bg-[#101828] text-white">{icon}</span>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-[#101828]">{value}</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{helper}</p>
    </div>
  );
}

function DetailPanel({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="rounded-[2.25rem] border border-[#e4d8c8] bg-white/78 p-5 shadow-[0_24px_80px_rgba(16,24,40,.07)] backdrop-blur-xl md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-[#101828] text-white">{icon}</span>
        <h2 className="text-3xl font-black tracking-[-0.065em] text-[#101828]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SidePanel({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-[#e4d8c8] bg-white/78 p-5 shadow-sm backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-[#101828] text-white">{icon}</span>
        <h3 className="text-xl font-black tracking-[-0.045em] text-[#101828]">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function ExamTip({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-[1.5rem] border border-[#eadfce] bg-[#fffaf3]/76 p-4">
      <p className="text-base font-black text-[#101828]">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{body}</p>
    </article>
  );
}
