"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  FileQuestion,
  ListChecks,
  ShieldAlert
} from "lucide-react";
import { getTestCountsForTopic, topicQuestionTests, type TestLevel } from "@/data/generated-30-question-tests";
import { topics } from "@/data/kpss-history";
import type { Topic } from "@/types/study";

type TopicRecord = {
  topic: Topic;
  totalTests: number;
  totalQuestions: number;
  easyTests: number;
  mediumTests: number;
  hardTests: number;
  firstMistake: string;
};

const levelContent: Record<TestLevel, { title: string; body: string; button: string }> = {
  kolay: {
    title: "Kolay testler",
    body: "Temel kavramları ve doğrudan bilgileri ölçen testler.",
    button: "Kolay konuları listele"
  },
  orta: {
    title: "Orta testler",
    body: "Kavram, olay ve sonuç ilişkisini birlikte düşündüren testler.",
    button: "Orta konuları listele"
  },
  zor: {
    title: "Zor testler",
    body: "Karıştırılan kavramlara ve seçici yorumlara odaklanan testler.",
    button: "Zor konuları listele"
  }
};

const levelLabels: Record<TestLevel, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor"
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
  const [activeLevel, setActiveLevel] = useState<TestLevel>("kolay");

  const records: TopicRecord[] = useMemo(
    () =>
      topics.map((topic) => {
        const counts = getTestCountsForTopic(topic.id);

        return {
          topic,
          totalTests: counts.totalTests,
          totalQuestions: counts.totalQuestions,
          easyTests: counts.kolay,
          mediumTests: counts.orta,
          hardTests: counts.zor,
          firstMistake: naturalMistakeNote(topic.commonMistakes[0], topic.title)
        };
      }),
    []
  );

  const totalQuestions = topicQuestionTests.reduce((sum, test) => sum + test.questionCount, 0);
  const totalMinutes = topics.reduce((sum, topic) => sum + topic.estimatedMinutes, 0);
  const activeQuestionCount = records.reduce((sum, record) => sum + getLevelTestCount(record, activeLevel) * 30, 0);

  return (
    <div className="space-y-7">
      <header className="rounded-[2.25rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.86)] p-6 shadow-[var(--shadow-paper)] backdrop-blur-xl md:p-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
          <div>
            <p className="bureau-kicker">Soru Bankası</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.065em] text-[var(--bureau-ink)] md:text-6xl">
              KPSS Tarih testleri.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[var(--bureau-copy)] md:text-lg">
              Her konuda 10 kolay, 10 orta ve 10 zor test bulunur. Her test 30 sorudan oluşur.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={`/question-bank/all?level=${activeLevel}`} className="btn-accent px-5 py-3">
                {levelLabels[activeLevel]} karma testleri gör
                <ArrowRight size={17} />
              </a>
              <a href="#konu-testleri" className="btn-ghost px-5 py-3">
                Konu testlerini gör
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SummaryCard icon={<FileQuestion size={18} />} label="Toplam soru" value={totalQuestions} />
            <SummaryCard icon={<BookOpen size={18} />} label="Konu" value={topics.length} />
            <SummaryCard icon={<ListChecks size={18} />} label="Konu testi" value={topicQuestionTests.length} />
            <SummaryCard icon={<Clock3 size={18} />} label="Tahmini süre" value={`${totalMinutes} dk`} />
          </div>
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-3">
        {(["kolay", "orta", "zor"] as const).map((level) => (
          <LevelPicker
            key={level}
            level={level}
            active={activeLevel === level}
            onClick={() => setActiveLevel(level)}
            title={levelContent[level].title}
            body={levelContent[level].body}
            button={levelContent[level].button}
          />
        ))}
      </section>

      <section className="flex flex-col gap-3 rounded-[1.75rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="bureau-kicker">{levelLabels[activeLevel]} testler</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">
            {levelLabels[activeLevel]} testi olan konular
          </h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
            Aşağıdaki her konuda {getLevelTestCount(records[0], activeLevel)} test bulunur. Toplam {activeQuestionCount} soru listelenir.
          </p>
        </div>

        <a href={`/question-bank/all?level=${activeLevel}`} className="btn-primary shrink-0" data-dark-button="true">
          {levelLabels[activeLevel]} karma testleri
          <ArrowRight size={17} />
        </a>
      </section>

      <motion.section
        id="konu-testleri"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {records.map((record, index) => (
          <TopicCard key={`${record.topic.id}-${activeLevel}`} record={record} index={index} activeLevel={activeLevel} />
        ))}
      </motion.section>
    </div>
  );
}

function LevelPicker({
  level,
  active,
  title,
  body,
  button,
  onClick
}: {
  level: TestLevel;
  active: boolean;
  title: string;
  body: string;
  button: string;
  onClick: () => void;
}) {
  const testCount = 10;
  const questionCount = 300;

  return (
    <button
      type="button"
      onClick={onClick}
      data-dark-button={active ? "true" : undefined}
      className={`text-left transition ${
        active
          ? "bureau-stage rounded-[1.75rem] p-5"
          : "bureau-card rounded-[1.75rem] p-5 hover:-translate-y-1"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-black tracking-[-0.055em] ${active ? "text-[var(--bureau-inverse)]" : "text-[var(--bureau-ink)]"}`}>
            {title}
          </h2>
          <p className={`mt-3 text-sm font-semibold leading-7 ${active ? "text-[var(--bureau-inverse-copy)]" : "text-[var(--bureau-copy)]"}`}>
            {body}
          </p>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-black ${active ? "bg-white/[.12] text-[var(--bureau-inverse)]" : "bg-[var(--bureau-teal-soft)] text-[var(--bureau-teal)]"}`}>
          {testCount} test
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[var(--bureau-line)] pt-4">
        <span className={`text-sm font-black ${active ? "text-[var(--bureau-inverse)]" : "text-[var(--bureau-ink)]"}`}>
          {button}
        </span>
        <span className={`text-xs font-black ${active ? "text-[var(--bureau-inverse-muted)]" : "text-[var(--bureau-muted)]"}`}>
          {questionCount} soru / konu
        </span>
      </div>
    </button>
  );
}

function TopicCard({ record, index, activeLevel }: { record: TopicRecord; index: number; activeLevel: TestLevel }) {
  const mustKnow = record.topic.mustKnow.slice(0, 3);
  const levelTestCount = getLevelTestCount(record, activeLevel);
  const levelQuestionCount = levelTestCount * 30;

  return (
    <motion.a
      variants={cardVariants}
      href={`/question-bank/${record.topic.id}?level=${activeLevel}`}
      whileHover={{ y: -6, scale: 1.003 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group bureau-card relative flex min-h-[310px] flex-col justify-between overflow-hidden rounded-[2rem] p-6"
    >
      <div className="absolute right-[-4rem] top-[-4rem] size-40 rounded-full bg-[var(--bureau-teal-soft)] blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-[var(--bureau-line)] bg-[var(--bureau-teal-soft)] px-3 py-1 text-xs font-black tracking-[0.18em] text-[var(--bureau-teal)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full bg-[var(--bureau-blue-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-blue)]">
            {levelLabels[activeLevel]}
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
          <Chip label="Test" value={levelTestCount} />
          <Chip label="Soru" value={levelQuestionCount} />
          <Chip label="Toplam" value={record.totalTests} />
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
            {levelLabels[activeLevel]} testleri aç
          </span>
          <span className="grid size-9 place-items-center rounded-full bg-[var(--bureau-ink)] text-[var(--bureau-inverse)] transition group-hover:translate-x-1">
            <ArrowRight size={17} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function getLevelTestCount(record: TopicRecord | undefined, level: TestLevel) {
  if (!record) return 0;

  if (level === "kolay") return record.easyTests;
  if (level === "orta") return record.mediumTests;
  return record.hardTests;
}

function SummaryCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-[1.35rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] p-4">
      <div className="flex items-center gap-2 text-[var(--bureau-teal)]">{icon}</div>
      <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-muted)]">{label}</p>
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
