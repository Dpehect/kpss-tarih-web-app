"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  FileQuestion,
  Layers3,
  Shuffle,
  ShieldAlert
} from "lucide-react";
import { mixedQuestionTests, topicQuestionTests, type TestLevel } from "@/data/generated-30-question-tests";
import { topics } from "@/data/kpss-history";
import type { Topic } from "@/types/study";

type TopicRecord = {
  topic: Topic;
  firstMistake: string;
};

const levelLabels: Record<TestLevel, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor"
};

const levelDescriptions: Record<TestLevel, string> = {
  kolay: "Temel bilgileri ve doğrudan kavramları ölçen karışık testler.",
  orta: "Olay, kavram ve sonuç ilişkisini birlikte yoklayan karışık testler.",
  zor: "Seçici yorum, kronoloji ve karıştırılan kavramlara odaklanan karışık testler."
};

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
    y: 22
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
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

function naturalMistakeNote(raw: string | undefined, topicTitle: string) {
  if (!raw) return `${topicTitle} sorularında kavramların hangi döneme ait olduğuna dikkat etmek gerekir.`;

  const text = raw.toLocaleLowerCase("tr-TR");

  if (text.includes("tımar") && text.includes("özel mülkiyet")) {
    return "Tımar sistemi özel mülkiyet değildi; toprak devlete aitti, gelirleri ise hizmet karşılığı kullanılırdı.";
  }

  if (text.includes("sanmak")) {
    const cleaned = raw.replace(/\s+sanmak\.?$/i, "").trim();
    return `${cleaned} şeklinde düşünmek yanıltır; kavramın dönemdeki işlevine bakmak gerekir.`;
  }

  if (text.includes("karıştırmak")) {
    const cleaned = raw.replace(/\s+karıştırmak\.?$/i, "").trim();
    return `${cleaned} ayrımı bu konuda sık karıştırılır; soruda verilen bağlama dikkat edilmelidir.`;
  }

  return raw.endsWith(".") ? raw : `${raw}.`;
}

export function QuestionBankPage() {
  const records: TopicRecord[] = topics.map((topic) => ({
    topic,
    firstMistake: naturalMistakeNote(topic.commonMistakes[0], topic.title)
  }));

  const topicCount = topics.length;
  const topicTestCount = topicQuestionTests.length;
  const topicQuestionCount = topicQuestionTests.reduce((sum, test) => sum + test.questionCount, 0);
  const mixedTestCount = mixedQuestionTests.length;
  const mixedQuestionCount = mixedQuestionTests.reduce((sum, test) => sum + test.questionCount, 0);

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.82)] p-6 shadow-[var(--shadow-paper)] backdrop-blur-xl md:p-7">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="bureau-kicker">Soru Bankası</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.06em] text-[var(--bureau-ink)] md:text-6xl">
              Konu seç, zorluk seç, teste başla.
            </h1>
            <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-[var(--bureau-copy)]">
              Önce çalışmak istediğin konuyu aç. Sonraki ekranda kolay, orta veya zor testlerden birini seçebilirsin.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[520px]">
            <MiniSummary icon={<BookOpen size={17} />} label="Konu" value={topicCount} />
            <MiniSummary icon={<Layers3 size={17} />} label="Konu testi" value={topicTestCount} />
            <MiniSummary icon={<FileQuestion size={17} />} label="Konu sorusu" value={topicQuestionCount} />
            <MiniSummary icon={<Shuffle size={17} />} label="Karma test" value={mixedTestCount} />
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <SectionTitle
          eyebrow="Karışık testler"
          title="Tüm konulardan sorular"
          description={`Karışık testlerde ${topicCount} KPSS Tarih konusu birlikte gelir. Her zorluk düzeyinde 10 test, her testte 30 soru bulunur.`}
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {(["kolay", "orta", "zor"] as const).map((level) => (
            <MixedTestCard
              key={level}
              level={level}
              testCount={mixedQuestionTests.filter((test) => test.level === level).length}
              questionCount={mixedQuestionTests
                .filter((test) => test.level === level)
                .reduce((sum, test) => sum + test.questionCount, 0)}
            />
          ))}
        </div>
      </section>

      <section id="konu-testleri" className="space-y-4">
        <SectionTitle
          eyebrow="Konu testleri"
          title="Çalışmak istediğin konuyu seç"
          description="Konuya girdikten sonra kolay, orta ve zor testler ayrı ayrı karşına çıkar."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {records.map((record, index) => (
            <TopicCard key={record.topic.id} record={record} index={index} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}

function MixedTestCard({
  level,
  testCount,
  questionCount
}: {
  level: TestLevel;
  testCount: number;
  questionCount: number;
}) {
  const includedTopics = topics.map((topic) => topic.title);
  const visibleTopics = includedTopics.slice(0, 6);
  const remainingCount = includedTopics.length - visibleTopics.length;

  return (
    <a
      href={`/question-bank/all?level=${level}`}
      className="group bureau-stage relative min-h-[330px] overflow-hidden rounded-[2rem] p-6"
    >
      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 460 340">
        <path d="M42 216 C114 110 248 116 394 174" fill="none" stroke="rgba(255,250,242,.35)" strokeWidth="2" />
        <path d="M70 264 C152 214 238 234 390 214" fill="none" stroke="rgba(4,126,137,.72)" strokeWidth="2" strokeDasharray="9 12" />
      </svg>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <p className="bureau-kicker">{levelLabels[level]} karma</p>
            <span className="rounded-full border border-white/10 bg-white/[.08] px-3 py-1 text-xs font-black text-[var(--bureau-inverse)]">
              {testCount} test
            </span>
          </div>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.07em] text-[var(--bureau-inverse)]">
            {levelLabels[level]} karışık testler
          </h2>
          <p className="mt-4 text-sm font-medium leading-7 text-[var(--bureau-inverse-copy)]">
            {levelDescriptions[level]}
          </p>
        </div>

        <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-white/[.08] p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bureau-inverse-muted)]">
            İçindeki konular
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-[var(--bureau-inverse-copy)]">
            {visibleTopics.join(", ")}
            {remainingCount > 0 ? ` ve ${remainingCount} konu daha` : ""}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-sm font-black text-[var(--bureau-inverse)]">
            {questionCount} soru
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--bureau-inverse)]">
            Testleri gör
            <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  );
}

function TopicCard({ record, index }: { record: TopicRecord; index: number }) {
  const mustKnow = record.topic.mustKnow.slice(0, 3);

  return (
    <motion.a
      variants={cardVariants}
      href={`/question-bank/${record.topic.id}`}
      whileHover={{ y: -6, scale: 1.003 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group bureau-card relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[2rem] p-6"
    >
      <div className="absolute right-[-4rem] top-[-4rem] size-40 rounded-full bg-[var(--bureau-teal-soft)] blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-[var(--bureau-line)] bg-[var(--bureau-teal-soft)] px-3 py-1 text-xs font-black tracking-[0.18em] text-[var(--bureau-teal)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full bg-[var(--bureau-blue-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-blue)]">
            30 test
          </span>
        </div>

        <h2 className="mt-8 text-3xl font-black leading-[1.05] tracking-[-0.065em] text-[var(--bureau-ink)]">
          {record.topic.title}
        </h2>
        <p className="mt-4 text-sm font-semibold leading-7 text-[var(--bureau-copy)]" style={clampTwo}>
          {record.topic.shortDescription}
        </p>

        {mustKnow.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {mustKnow.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--bureau-line)] bg-[rgba(255,250,242,.74)] px-3 py-1 text-xs font-black text-[var(--bureau-copy)]"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative z-10 mt-8">
        <div className="grid grid-cols-3 gap-2">
          <Chip label="Kolay" value={10} />
          <Chip label="Orta" value={10} />
          <Chip label="Zor" value={10} />
        </div>

        <div className="mt-4 rounded-[1.25rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert size={17} className="mt-1 shrink-0 text-[var(--bureau-rust)]" />
            <p className="text-xs font-bold leading-6 text-[var(--bureau-copy)]" style={clampThree}>
              {record.firstMistake}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[var(--bureau-line)] pt-5">
          <span className="text-sm font-black text-[var(--bureau-muted)]">
            Zorluk seç
          </span>
          <span className="grid size-9 place-items-center rounded-full bg-[var(--bureau-ink)] text-[var(--bureau-inverse)] transition group-hover:translate-x-1">
            <ArrowRight size={17} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="bureau-kicker">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--bureau-ink)] md:text-4xl">
          {title}
        </h2>
      </div>
      <p className="max-w-2xl text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
        {description}
      </p>
    </div>
  );
}

function MiniSummary({ icon, label, value }: { icon: ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-[1.25rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-4">
      <div className="text-[var(--bureau-teal)]">{icon}</div>
      <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">{value}</p>
    </div>
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
