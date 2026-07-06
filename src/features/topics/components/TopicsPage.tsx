"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, Clock, FileQuestion, Filter, Search, SlidersHorizontal } from "lucide-react";
import { questions, topics } from "@/data/kpss-history";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";
import { useMounted } from "@/hooks/useMounted";

/* ── Dönem filtre verileri ── */
const ERA_FILTERS = [
  { key: "all", label: "Tüm Dönemler" },
  { key: "islamiyet-oncesi", label: "İslamiyet Öncesi" },
  { key: "turk-islam", label: "Selçuklu & Beylikler" },
  { key: "osmanli", label: "Osmanlı" },
  { key: "yenilesme", label: "Yenileşme" },
  { key: "milli-mucadele", label: "Millî Mücadele" },
  { key: "cumhuriyet", label: "Cumhuriyet" },
  { key: "cagdas", label: "Çağdaş Tarih" }
] as const;

/* ── Konu → görsel eşleştirmesi ── */
const TOPIC_IMAGES: Record<string, string> = {
  "t1": "/images/topic-pre-islamic.png",
  "t2": "/images/topic-seljuk.png",
  "t3": "/images/topic-seljuk.png",
  "t4": "/images/topic-ottoman.png",
  "t5": "/images/topic-ottoman.png",
  "t6": "/images/topic-ottoman.png",
  "t7": "/images/topic-ottoman.png",
  "t8": "/images/topic-republic.png",
  "t9": "/images/topic-republic.png",
  "t10": "/images/topic-republic.png",
  "t11": "/images/topic-republic.png",
  "t12": "/images/topic-republic.png",
};

/* ── Dönem → renk eşleştirmesi ── */
const ERA_COLORS: Record<string, { ring: string; badge: string; badgeText: string; label: string }> = {
  "islamiyet-oncesi": { ring: "#B85C38", badge: "bg-[#B85C38]/10 text-[#B85C38] border-[#B85C38]/20", badgeText: "İslam Öncesi", label: "Bozkır Dönemi" },
  "turk-islam": { ring: "#6B7F5D", badge: "bg-[#6B7F5D]/10 text-[#6B7F5D] border-[#6B7F5D]/20", badgeText: "Türk-İslam", label: "Selçuklu Dönemi" },
  "osmanli": { ring: "#D4A574", badge: "bg-[#D4A574]/15 text-[#8B6914] border-[#D4A574]/20", badgeText: "Osmanlı", label: "Osmanlı Dönemi" },
  "yenilesme": { ring: "#7C6FA0", badge: "bg-[#7C6FA0]/10 text-[#7C6FA0] border-[#7C6FA0]/20", badgeText: "Yenileşme", label: "Yenileşme Dönemi" },
  "milli-mucadele": { ring: "#B85C38", badge: "bg-[#B85C38]/10 text-[#B85C38] border-[#B85C38]/20", badgeText: "Millî Mücadele", label: "Mücadele Dönemi" },
  "cumhuriyet": { ring: "#6B7F5D", badge: "bg-[#6B7F5D]/10 text-[#6B7F5D] border-[#6B7F5D]/20", badgeText: "Cumhuriyet", label: "Cumhuriyet Dönemi" },
  "cagdas": { ring: "#3F6B8C", badge: "bg-[#3F6B8C]/10 text-[#3F6B8C] border-[#3F6B8C]/20", badgeText: "Çağdaş", label: "Çağdaş Dönem" }
};

/* ── Animation ── */
const containerVars: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
};

const cardVars: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

export function TopicsPage() {
  const mounted = useMounted();
  const [selectedEra, setSelectedEra] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const completedTopicIds = useStudyProgressStore((s) => s.completedTopicIds);
  const completedSet = useMemo(() => new Set(completedTopicIds), [completedTopicIds]);
  const allAttempts = useStudyProgressStore((s) => s.questionAttempts);

  const filteredTopics = useMemo(() => {
    let result = topics;
    if (selectedEra !== "all") {
      result = result.filter((t) => t.era === selectedEra);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return result;
  }, [selectedEra, searchQuery]);

  const completedCount = topics.filter((t) => completedSet.has(t.id)).length;
  const avgCompletion = Math.round((completedCount / topics.length) * 100);
  const totalRelatedQuestions = questions.length;

  return (
    <div className="min-h-screen" style={{ background: "#F8F1E3" }}>
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden rounded-2xl" style={{ background: "#3F2E1E" }}>
        <div className="absolute inset-0">
          <img src="/images/topics-hero.png" alt="" className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #3F2E1E, rgba(63,46,30,.6), transparent)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #3F2E1E, transparent 60%)" }} />
        </div>

        {/* Subtle runic overlay */}
        <svg className="absolute right-8 top-8 h-48 w-48 opacity-[.06]" viewBox="0 0 200 200">
          <text x="20" y="60" fontSize="28" fill="#D4A574" fontFamily="serif">𐰃𐰺𐰴</text>
          <text x="50" y="120" fontSize="32" fill="#D4A574" fontFamily="serif">𐱅𐰇𐰼𐰜</text>
          <text x="30" y="170" fontSize="24" fill="#D4A574" fontFamily="serif">𐰉𐰆𐰕𐰸𐰃𐰺</text>
        </svg>

        <div className="relative z-10 px-6 py-12 md:px-10 md:py-16 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[.18em]" style={{ color: "#D4A574" }}>
            KPSS Tarih Akademi
          </p>
          <h1
            className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
            style={{ color: "#FDF6E9", fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Tarihin Yaşayan Atlası
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "rgba(253,246,233,.6)" }}>
            {topics.length} konuyu keşfet, bozkırdan cumhuriyete uzanan hikâyeyi görsel ve derinlemesine öğren.
          </p>

          {/* Mini stats */}
          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm">
            <span className="flex items-center gap-2" style={{ color: "#D4A574" }}>
              <BookOpen size={15} />
              <strong>{topics.length}</strong> Konu
            </span>
            <span className="h-3 w-px" style={{ background: "rgba(212,165,116,.3)" }} />
            <span style={{ color: "rgba(253,246,233,.5)" }}>
              %{mounted ? avgCompletion : 0} Ortalama Tamamlanma
            </span>
            <span className="h-3 w-px" style={{ background: "rgba(212,165,116,.3)" }} />
            <span style={{ color: "rgba(253,246,233,.5)" }}>
              {totalRelatedQuestions} İlgili Soru
            </span>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="mt-6">
        {/* Search */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex flex-1 items-center gap-2.5 rounded-xl px-4 py-3 text-sm"
            style={{
              background: "#FDF6E9",
              border: "1px solid rgba(63,46,30,.1)",
              boxShadow: "0 1px 3px rgba(63,46,30,.04)"
            }}
          >
            <Search size={16} style={{ color: "#8A7B6E" }} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Konu, dönem veya kavram ara..."
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#8A7B6E]"
              style={{ color: "#3F2E1E" }}
            />
          </div>
          <button
            className="grid size-11 shrink-0 place-items-center rounded-xl transition hover:opacity-80"
            style={{ background: "#FDF6E9", border: "1px solid rgba(63,46,30,.1)" }}
            aria-label="Filtreler"
          >
            <SlidersHorizontal size={16} style={{ color: "#8A7B6E" }} />
          </button>
        </div>

        {/* Era filter buttons */}
        <div className="flex flex-wrap gap-2">
          {ERA_FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedEra(filter.key)}
              className="rounded-lg px-3.5 py-2 text-[13px] font-medium transition"
              style={
                selectedEra === filter.key
                  ? { background: "#B85C38", color: "#FDF6E9", boxShadow: "0 2px 8px rgba(184,92,56,.25)" }
                  : { background: "#FDF6E9", color: "#8A7B6E", border: "1px solid rgba(63,46,30,.08)" }
              }
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Topic Cards Grid ── */}
      <motion.section
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="mt-8 grid grid-cols-1 gap-5 pb-10 md:grid-cols-2 xl:grid-cols-3"
        aria-label="KPSS Tarih konuları"
      >
        {filteredTopics.map((topic, idx) => {
          const eraInfo = ERA_COLORS[topic.era] ?? ERA_COLORS["osmanli"];
          const image = TOPIC_IMAGES[topic.id] ?? "/images/topic-ottoman.png";
          const isCompleted = completedSet.has(topic.id);
          const topicQuestions = questions.filter((q) => q.topicId === topic.id).length;
          const topicAttempts = allAttempts.filter((a) => questions.find((q) => q.id === a.questionId && q.topicId === topic.id));
          const progress = topicQuestions > 0 ? Math.round((topicAttempts.length / topicQuestions) * 100) : 0;
          const displayProgress = mounted ? Math.min(progress, 100) : 0;

          return (
            <motion.a
              key={topic.id}
              variants={cardVars}
              href={`/topics/${topic.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-lg"
              style={{
                background: "#FDF6E9",
                border: "1px solid rgba(63,46,30,.08)",
                boxShadow: "0 2px 12px rgba(63,46,30,.05)"
              }}
            >
              {/* Card Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={image}
                  alt={topic.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #FDF6E9, transparent 50%)" }} />

                {/* Era badge */}
                <span className={`absolute left-3 top-3 rounded-md border px-2.5 py-1 text-[11px] font-medium ${eraInfo.badge}`}>
                  {eraInfo.badgeText}
                </span>

                {/* Progress ring */}
                <div className="absolute bottom-3 right-3">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="rgba(63,46,30,.6)" />
                    <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" />
                    <circle
                      cx="24" cy="24" r="17"
                      fill="none"
                      stroke={eraInfo.ring}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 17}`}
                      strokeDashoffset={`${2 * Math.PI * 17 * (1 - displayProgress / 100)}`}
                      transform="rotate(-90 24 24)"
                      className="transition-all duration-700"
                    />
                    <text x="24" y="26" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">
                      {displayProgress}
                    </text>
                  </svg>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-[11px] font-medium" style={{ color: "#8A7B6E" }}>
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1" style={{ background: "rgba(63,46,30,.08)" }} />
                  <span>{eraInfo.label}</span>
                </div>

                <h2 className="mt-3 text-lg font-bold leading-snug" style={{ color: "#3F2E1E" }}>
                  {topic.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={{ color: "#8A7B6E" }}>
                  {topic.shortDescription}
                </p>

                {/* Keywords */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {topic.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="rounded-md px-2 py-0.5 text-[11px] font-medium"
                      style={{ background: "rgba(107,127,93,.08)", color: "#6B7F5D" }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-4 border-t pt-3 text-xs" style={{ borderColor: "rgba(63,46,30,.06)", color: "#8A7B6E" }}>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {topic.estimatedMinutes} dk
                  </span>
                  <span className="flex items-center gap-1">
                    <FileQuestion size={12} />
                    {topicQuestions} soru
                  </span>
                </div>

                {/* CTA */}
                <button
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-medium transition hover:opacity-90"
                  style={{
                    background: isCompleted ? "#6B7F5D" : "#B85C38",
                    color: "#FDF6E9"
                  }}
                >
                  {isCompleted ? "Tekrar et" : "Yolculuğa başla"}
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.a>
          );
        })}
      </motion.section>

      {/* Empty state */}
      {filteredTopics.length === 0 && (
        <div className="py-16 text-center">
          <Filter size={40} style={{ color: "#8A7B6E" }} className="mx-auto" />
          <h3 className="mt-4 text-lg font-bold" style={{ color: "#3F2E1E" }}>Sonuç bulunamadı</h3>
          <p className="mt-2 text-sm" style={{ color: "#8A7B6E" }}>
            Farklı bir dönem veya arama terimi deneyin.
          </p>
          <button
            onClick={() => { setSelectedEra("all"); setSearchQuery(""); }}
            className="mt-4 rounded-lg px-4 py-2 text-sm font-medium transition hover:opacity-90"
            style={{ background: "#B85C38", color: "#FDF6E9" }}
          >
            Filtreleri temizle
          </button>
        </div>
      )}
    </div>
  );
}
