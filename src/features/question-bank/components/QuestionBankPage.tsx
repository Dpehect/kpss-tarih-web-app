"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  FileQuestion,
  Filter,
  Layers3,
  Search,
  ShieldAlert,
  TimerReset
} from "lucide-react";
import { questions, topics } from "@/data/kpss-history";
import type { HistoryEra, Topic } from "@/types/study";

type TopicRecord = {
  topic: Topic;
  questionCount: number;
  caseCount: number;
  chronologyCount: number;
  firstMistake: string;
};

const eraLabels: Record<HistoryEra | "all", string> = {
  all: "Tüm dönemler",
  "islamiyet-oncesi": "İlk Türk",
  "turk-islam": "Türk-İslam",
  osmanli: "Osmanlı",
  yenilesme: "Yenileşme",
  "milli-mucadele": "Milli Mücadele",
  cumhuriyet: "Cumhuriyet",
  cagdas: "Çağdaş"
};

const eraFilters: Array<HistoryEra | "all"> = [
  "all",
  "islamiyet-oncesi",
  "turk-islam",
  "osmanli",
  "yenilesme",
  "milli-mucadele",
  "cumhuriyet",
  "cagdas"
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045
    }
  }
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: "easeOut"
    }
  }
};

const clampTwo: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden"
};

const clampThree: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden"
};

export function QuestionBankPage() {
  const [activeEra, setActiveEra] = useState<HistoryEra | "all">("all");
  const [query, setQuery] = useState("");

  const records = useMemo<TopicRecord[]>(
    () =>
      topics.map((topic) => {
        const topicQuestions = questions.filter((question) => question.topicId === topic.id);

        return {
          topic,
          questionCount: topicQuestions.length,
          caseCount: topicQuestions.filter((question) => String(question.type) === "case").length,
          chronologyCount: topicQuestions.filter((question) => String(question.type) === "chronology").length,
          firstMistake: topic.commonMistakes[0] ?? "Bu konu için belirgin hata notu yok."
        };
      }),
    []
  );

  const filtered = records.filter(({ topic }) => {
    const normalized = query.toLocaleLowerCase("tr-TR").trim();
    const matchesEra = activeEra === "all" || topic.era === activeEra;

    if (!matchesEra) return false;
    if (!normalized) return true;

    return [
      topic.title,
      topic.shortDescription,
      topic.keywords.join(" "),
      topic.mustKnow.join(" "),
      topic.commonMistakes.join(" ")
    ]
      .join(" ")
      .toLocaleLowerCase("tr-TR")
      .includes(normalized);
  });

  const totalMinutes = topics.reduce((sum, topic) => sum + topic.estimatedMinutes, 0);
  const averageImportance = Math.round(topics.reduce((sum, topic) => sum + topic.examImportance, 0) / topics.length);
  const highPriorityTopics = [...topics].sort((a, b) => b.examImportance - a.examImportance).slice(0, 3);
  const totalCaseQuestions = questions.filter((question) => String(question.type) === "case").length;
  const totalChronologyQuestions = questions.filter((question) => String(question.type) === "chronology").length;

  return (
    <div className="space-y-6">
      <section className="bureau-stage relative overflow-hidden rounded-[2.5rem] p-6 md:p-8 xl:p-10">
        <DossierBoard records={records} />

        <div className="relative z-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_410px] xl:items-end">
          <div>
            <p className="bureau-kicker">Soru Dosyaları</p>
            <h1 className="bureau-display mt-5 max-w-5xl text-balance text-5xl text-[var(--bureau-inverse)] md:text-7xl">
              Soruları konu listesinden çıkar, çalışma dosyasına dönüştür.
            </h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[var(--bureau-inverse-copy)] md:text-lg">
              Her konu artık yalnızca “teste gir” kartı değil; soru yoğunluğu, kritik kavram, hata riski, kronoloji izi ve çalışma önceliğiyle okunabilir bir karar ekranı.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/question-bank/all" className="btn-accent px-5 py-3">
                Karma dosyayı aç
                <ArrowRight size={17} />
              </a>
              <a href="#topic-dossiers" className="btn-ghost px-5 py-3">
                Konu dosyalarına in
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <HeroMetric icon={<FileQuestion size={18} />} label="Açıklamalı soru" value={questions.length} />
            <HeroMetric icon={<BookOpen size={18} />} label="Konu dosyası" value={topics.length} />
            <HeroMetric icon={<BarChart3 size={18} />} label="Ortalama önem" value={`%${averageImportance}`} />
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="bureau-surface rounded-[2.1rem] p-4 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="flex min-h-13 flex-1 items-center gap-3 rounded-[1.15rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] px-4">
              <Search size={18} className="text-[var(--bureau-copy)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Konu, kavram, hata veya anahtar kelime ara"
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[var(--bureau-ink)] outline-none placeholder:text-[var(--bureau-muted)]"
              />
            </label>

            <div className="flex items-center gap-2 rounded-[1.15rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] px-3 py-3 text-sm font-black text-[var(--bureau-copy)]">
              <Filter size={17} />
              {filtered.length} dosya
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-clean">
            {eraFilters.map((era) => (
              <button
                key={era}
                type="button"
                onClick={() => setActiveEra(era)}
                data-dark-button={activeEra === era ? "true" : undefined}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-black transition ${
                  activeEra === era
                    ? "border-[var(--bureau-ink)] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]"
                    : "border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] text-[var(--bureau-copy)] hover:bg-white hover:text-[var(--bureau-ink)]"
                }`}
              >
                {eraLabels[era]}
              </button>
            ))}
          </div>
        </div>

        <aside className="bureau-card rounded-[2.1rem] p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]">
              <Brain size={20} />
            </span>
            <div>
              <p className="bureau-kicker">Akıllı öncelik</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--bureau-ink)]">
                Önce bunları çöz
              </h2>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {highPriorityTopics.map((topic, index) => (
              <a
                key={topic.id}
                href={`/question-bank/${topic.id}`}
                className="group rounded-[1.2rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.74)] p-4 transition hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-black tracking-[0.18em] text-[var(--bureau-teal)]">
                    0{index + 1}
                  </span>
                  <span className="rounded-full bg-[var(--bureau-blue-soft)] px-2.5 py-1 text-xs font-black text-[var(--bureau-blue)]">
                    %{topic.examImportance}
                  </span>
                </div>
                <p className="mt-3 text-sm font-black leading-6 text-[var(--bureau-ink)]">
                  {topic.title}
                </p>
                <p className="mt-1 text-xs font-semibold leading-5 text-[var(--bureau-copy)]">
                  {topic.mustKnow.slice(0, 3).join(" · ")}
                </p>
              </a>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <InfoPanel
          icon={<Layers3 size={19} />}
          label="Dosya Yapısı"
          title={`${questions.length} soru, ${topics.length} ayrı konu`}
          body="Kullanıcı doğrudan konuya göre ilerler; karma test ise sınav refleksi için ayrı tutulur."
        />
        <InfoPanel
          icon={<ShieldAlert size={19} />}
          label="Hata Riski"
          title="Karıştırılan nokta görünür"
          body="Her dosya, ilgili konudaki en yaygın hatayı göstererek kullanıcıyı cevaptan önce uyarır."
        />
        <InfoPanel
          icon={<TimerReset size={19} />}
          label="Çalışma Yükü"
          title={`${totalMinutes} dk toplam konu yükü`}
          body={`Sayfada ${totalCaseQuestions} vaka ve ${totalChronologyQuestions} kronoloji sorusu ayrı sinyal olarak gösterilir.`}
        />
      </section>

      <motion.section
        id="topic-dossiers"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        <motion.a
          variants={cardVariants}
          href="/question-bank/all"
          className="group bureau-stage relative min-h-[340px] overflow-hidden rounded-[2.1rem] p-6"
        >
          <div className="absolute right-[-5rem] top-[-5rem] size-52 rounded-full bg-[rgba(4,126,137,.20)] blur-3xl" />
          <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 420 340">
            <path d="M40 210 C110 90 250 112 366 166" fill="none" stroke="rgba(255,250,242,.28)" strokeWidth="2" />
            <path d="M66 260 C148 202 230 230 358 214" fill="none" stroke="rgba(4,126,137,.62)" strokeWidth="2" strokeDasharray="9 12" />
          </svg>

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="bureau-kicker">Karma Sınav Dosyası</p>
              <h3 className="mt-4 text-4xl font-black tracking-[-0.07em] text-[var(--bureau-inverse)]">
                Tüm konuları tek oturumda karıştır.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--bureau-inverse-copy)]">
                Konu ayrımı olmadan sınav refleksini ölçmek için tüm açıklamalı sorular tek akışta birleşir.
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[var(--bureau-inverse)]">
              Karma teste başla
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </span>
          </div>
        </motion.a>

        {filtered.map((record, index) => (
          <TopicDossierCard key={record.topic.id} record={record} index={index} />
        ))}
      </motion.section>
    </div>
  );
}

function DossierBoard({ records }: { records: TopicRecord[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-35">
      <svg viewBox="0 0 1200 720" className="h-full w-full">
        <path
          d="M110 430 C245 238 438 228 628 302 C792 366 888 226 1070 320"
          fill="none"
          stroke="rgba(255,250,242,.24)"
          strokeWidth="2"
        />
        <path
          d="M140 520 C316 402 462 458 648 390 C788 338 902 402 1080 455"
          fill="none"
          stroke="rgba(4,126,137,.68)"
          strokeWidth="2"
          strokeDasharray="13 17"
        />
        {records.slice(0, 12).map((record, index) => {
          const x = 155 + index * 82;
          const y = 398 + (index % 4) * 34;
          const r = 8 + Math.round(record.topic.examImportance / 18);

          return (
            <g key={record.topic.id}>
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={index % 3 === 0 ? "rgba(4,126,137,.88)" : index % 3 === 1 ? "rgba(37,63,116,.82)" : "rgba(102,52,95,.80)"}
              />
              <circle cx={x} cy={y} r={r + 12} fill="none" stroke="rgba(255,250,242,.12)" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function TopicDossierCard({ record, index }: { record: TopicRecord; index: number }) {
  const importance = Math.max(10, Math.min(96, record.topic.examImportance));
  const timeline = record.topic.quickTimeline.slice(0, 3);
  const mustKnow = record.topic.mustKnow.slice(0, 4);

  return (
    <motion.a
      variants={cardVariants}
      href={`/question-bank/${record.topic.id}`}
      whileHover={{ y: -7, scale: 1.003 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group bureau-card relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[2.1rem] p-6"
    >
      <div className="pointer-events-none absolute inset-x-6 top-6 h-24">
        <div className="absolute inset-x-0 top-1/2 h-px bg-[rgba(14,17,23,.10)]" />
        <div
          className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full border border-[var(--bureau-teal)] bg-[var(--bureau-bone-2)] shadow-[0_0_0_8px_rgba(4,126,137,.10)]"
          style={{ left: `${importance}%` }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-[var(--bureau-line)] bg-[var(--bureau-teal-soft)] px-3 py-1 text-xs font-black tracking-[0.18em] text-[var(--bureau-teal)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full bg-[var(--bureau-blue-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-blue)]">
            önem %{record.topic.examImportance}
          </span>
        </div>

        <h3 className="mt-20 text-3xl font-black leading-[1.05] tracking-[-0.065em] text-[var(--bureau-ink)]">
          {record.topic.title}
        </h3>
        <p className="mt-4 text-sm font-semibold leading-7 text-[var(--bureau-copy)]" style={clampTwo}>
          {record.topic.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {mustKnow.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] px-3 py-1 text-xs font-black text-[var(--bureau-copy)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8">
        <div className="grid grid-cols-3 gap-2">
          <Chip label="Soru" value={record.questionCount} />
          <Chip label="Vaka" value={record.caseCount} />
          <Chip label="Sıra" value={record.chronologyCount} />
        </div>

        <div className="mt-4 rounded-[1.25rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert size={17} className="mt-1 shrink-0 text-[var(--bureau-rust)]" />
            <p className="text-xs font-bold leading-6 text-[var(--bureau-copy)]" style={clampThree}>
              {record.firstMistake}
            </p>
          </div>
        </div>

        {timeline.length > 0 ? (
          <div className="mt-4 flex items-center gap-2 overflow-hidden">
            {timeline.map((item) => (
              <span
                key={`${item.date}-${item.event}`}
                className="shrink-0 rounded-full bg-[var(--bureau-plum-soft)] px-3 py-1 text-[11px] font-black text-[var(--bureau-plum)]"
              >
                {item.date}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex items-center justify-between border-t border-[var(--bureau-line)] pt-5">
          <span className="text-sm font-black text-[var(--bureau-muted)]">
            Test dosyasını aç
          </span>
          <span className="grid size-9 place-items-center rounded-full bg-[var(--bureau-ink)] text-[var(--bureau-inverse)] transition group-hover:translate-x-1">
            <ArrowRight size={17} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function HeroMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[.08] p-4 backdrop-blur-2xl">
      <div className="flex items-center gap-2 text-[var(--bureau-inverse)]">
        {icon}
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-inverse-muted)]">
          {label}
        </span>
      </div>
      <p className="mt-3 text-3xl font-black tracking-[-0.07em] text-[var(--bureau-inverse)]">
        {value}
      </p>
    </div>
  );
}

function InfoPanel({
  icon,
  label,
  title,
  body
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      className="bureau-card rounded-[1.75rem] p-5"
    >
      <span className="grid size-12 place-items-center rounded-[1rem] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)]">
        {icon}
      </span>
      <p className="mt-6 bureau-kicker">{label}</p>
      <h2 className="mt-3 text-2xl font-black tracking-[-0.055em] text-[var(--bureau-ink)]">
        {title}
      </h2>
      <p className="mt-3 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
        {body}
      </p>
    </motion.article>
  );
}

function Chip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.74)] px-3 py-2">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-1 text-lg font-black text-[var(--bureau-ink)]">{value}</p>
    </div>
  );
}
