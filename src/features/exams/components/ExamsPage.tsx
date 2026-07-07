"use client";

import { ArrowRight, Clock3, FileQuestion, Layers3, Timer, TimerOff } from "lucide-react";
import {
  getHistoryExamTopicBreakdown,
  kpssExamReference,
  kpssHistoryExams
} from "@/data/kpss-exam-blueprints";

export function ExamsPage() {
  const totalHistoryQuestions = kpssHistoryExams.reduce((sum, exam) => sum + exam.questionIds.length, 0);

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.84)] p-6 shadow-[var(--shadow-paper)] backdrop-blur-xl md:p-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-end">
          <div>
            <p className="bureau-kicker">Deneme</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1.03] tracking-[-0.06em] text-[var(--bureau-ink)] md:text-6xl">
              KPSS formatına uygun tarih denemeleri.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[var(--bureau-copy)]">
              Genel Yetenek - Genel Kültür oturumu 120 sorudan oluşur. Genel Kültür içinde Tarih için 27 soru ayrılır. Bu sayfadaki her deneme 27 soruluk tarih denemesidir.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SummaryCard icon={<FileQuestion size={18} />} label="Tarih sorusu" value={kpssExamReference.historyQuestions} />
            <SummaryCard icon={<Clock3 size={18} />} label="Tarih süresi" value={`${kpssExamReference.recommendedHistoryMinutes} dk`} />
            <SummaryCard icon={<Layers3 size={18} />} label="Deneme" value={kpssHistoryExams.length} />
            <SummaryCard icon={<Timer size={18} />} label="Soru havuzu" value={totalHistoryQuestions} />
          </div>
        </div>
      </header>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="bureau-stage relative overflow-hidden rounded-[2rem] p-6">
          <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 900 420">
            <path d="M70 245 C178 124 322 132 480 190 C612 240 710 166 830 218" fill="none" stroke="rgba(255,250,242,.32)" strokeWidth="2" />
            <path d="M90 310 C220 250 338 278 490 242 C610 214 704 256 842 288" fill="none" stroke="rgba(4,126,137,.70)" strokeWidth="2" strokeDasharray="10 14" />
          </svg>

          <div className="relative z-10">
            <p className="bureau-kicker">ÖSYM oturum ölçüsü</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.07em] text-[var(--bureau-inverse)]">
              {kpssExamReference.totalQuestions} soru / {kpssExamReference.totalMinutes} dakika
            </h2>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-[var(--bureau-inverse-copy)]">
              Tam oturum Genel Yetenek ve Genel Kültür olarak iki ana bölüme ayrılır. Bu uygulama tarih odaklı olduğu için denemeler Genel Kültür içindeki 27 tarih sorusuna göre hazırlanır.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {kpssExamReference.sections.map((section) => (
                <div key={section.id} className="rounded-[1.2rem] border border-white/10 bg-white/[.08] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bureau-inverse-muted)]">
                    {section.title}
                  </p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--bureau-inverse)]">
                    {section.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="bureau-card rounded-[2rem] p-5">
          <p className="bureau-kicker">Süre seçeneği</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">
            Her denemede iki çözüm modu var.
          </h2>
          <div className="mt-5 grid gap-3">
            <div className="rounded-[1.25rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-4">
              <div className="flex items-center gap-2 text-[var(--bureau-teal)]">
                <Timer size={18} />
                <span className="text-sm font-black">Süreli çöz</span>
              </div>
              <p className="mt-2 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
                30 dakikalık sayaç başlar. Süre bitince deneme otomatik tamamlanır.
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-4">
              <div className="flex items-center gap-2 text-[var(--bureau-blue)]">
                <TimerOff size={18} />
                <span className="text-sm font-black">Süresiz çöz</span>
              </div>
              <p className="mt-2 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
                Soru analizi için zaman baskısı olmadan ilerlersin.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="bureau-kicker">Tarih denemeleri</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--bureau-ink)] md:text-4xl">
              27 soruluk KPSS Tarih denemeleri
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
            Her denemede tarih konuları dengeli dağıtılır. Karttan süreli veya süresiz çözümü seçebilirsin.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {kpssHistoryExams.map((exam) => (
            <ExamCard key={exam.id} examId={exam.id} title={exam.title} duration={exam.durationMinutes} questions={exam.questionIds.length} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ExamCard({
  examId,
  title,
  duration,
  questions
}: {
  examId: string;
  title: string;
  duration: number;
  questions: number;
}) {
  const exam = kpssHistoryExams.find((item) => item.id === examId);
  const breakdown = exam ? getHistoryExamTopicBreakdown(exam).slice(0, 6) : [];

  return (
    <article className="bureau-card group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2rem] p-6">
      <div className="absolute right-[-4rem] top-[-4rem] size-40 rounded-full bg-[var(--bureau-teal-soft)] blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-[var(--bureau-teal-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-teal)]">
            ÖSYM formatı
          </span>
          <span className="rounded-full bg-[var(--bureau-blue-soft)] px-3 py-1 text-xs font-black text-[var(--bureau-blue)]">
            {duration} dk
          </span>
        </div>

        <h3 className="mt-7 text-3xl font-black leading-[1.05] tracking-[-0.065em] text-[var(--bureau-ink)]">
          {title}
        </h3>
        <p className="mt-4 text-sm font-semibold leading-7 text-[var(--bureau-copy)]">
          Genel Kültür içindeki tarih soru sayısına göre hazırlanmış {questions} soruluk deneme.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <MiniStat label="Soru" value={questions} />
          <MiniStat label="Süre" value={`${duration} dk`} />
        </div>

        <div className="mt-4 rounded-[1.25rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.72)] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bureau-muted)]">
            Konu dağılımı
          </p>
          <p className="mt-2 text-xs font-semibold leading-6 text-[var(--bureau-copy)]">
            {breakdown.map((item) => `${item.title} (${item.count})`).join(", ")}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-6 grid gap-3 sm:grid-cols-2">
        <a href={`/exams/${examId}?timer=on`} className="btn-accent px-4 py-3">
          <Timer size={17} />
          Süreli çöz
        </a>
        <a href={`/exams/${examId}?timer=off`} className="btn-ghost px-4 py-3">
          <TimerOff size={17} />
          Süresiz çöz
        </a>
      </div>
    </article>
  );
}

function SummaryCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-[1.35rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] p-4">
      <div className="text-[var(--bureau-teal)]">{icon}</div>
      <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-black tracking-[-0.06em] text-[var(--bureau-ink)]">{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-[1rem] border border-[var(--bureau-line)] bg-[rgba(255,250,242,.74)] px-3 py-2">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bureau-muted)]">{label}</p>
      <p className="mt-1 text-lg font-black text-[var(--bureau-ink)]">{value}</p>
    </div>
  );
}
