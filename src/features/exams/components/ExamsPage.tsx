import Link from "next/link";
import { ArrowRight, Clock, FileQuestion, Gauge, Medal, Target, Trophy } from "lucide-react";
import { fetchExamsFromSupabase } from "@/lib/content/content-service";
import { exams as localExams } from "@/data/kpss-history";

const DIFFICULTY_LABELS: Record<string, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor",
  karma: "Karma",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  kolay: "bg-emerald-500/12 text-emerald-700",
  orta: "bg-amber-500/12 text-amber-700",
  zor: "bg-red-500/12 text-red-700",
  karma: "bg-blue-700/10 text-blue-800",
};

export async function ExamsPage() {
  let exams: Awaited<ReturnType<typeof fetchExamsFromSupabase>> = [];

  try {
    exams = await fetchExamsFromSupabase();
  } catch {
    // Supabase bağlantısı yoksa boş göster
  }

  // Eğer Supabase'den veri gelmediyse veya boş geldiyse yerel 50 denemeyi listele!
  if (!exams || exams.length === 0) {
    exams = localExams as any;
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] border border-[var(--sb-line)] bg-[var(--sb-surface-strong)] p-6 shadow-[var(--sb-shadow-md)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-blue-600/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-10 size-72 rounded-full bg-amber-500/6 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.16em] text-[var(--sb-accent)]">Deneme Merkezi</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-[var(--sb-text)] sm:text-5xl">
              Gerçek sınav temposuna geç.
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[var(--sb-text-soft)]">
              Tüm denemeler Supabase soru havuzundan çalışır. Her deneme başlatıldığında sorular gerçek zamanlı olarak hazırlanır.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 lg:w-72">
            <StatCard icon={<Target size={17} />} label="Deneme" value={exams.length || 40} />
            <StatCard icon={<FileQuestion size={17} />} label="Soru/Deneme" value={40} />
            <StatCard icon={<Gauge size={17} />} label="Seviye" value="3 tip" />
            <StatCard icon={<Clock size={17} />} label="Süre" value="40-55 dk" />
          </div>
        </div>
      </section>

      {/* Exam Cards */}
      {exams.length > 0 ? (
        <section className="space-y-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.16em] text-[var(--sb-text-muted)]">
              {exams.length} Deneme Sınavı
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-[var(--sb-text)]">Tüm denemeler</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {exams.map((exam, index) => (
              <Link
                key={exam.id}
                href={`/exams/${exam.id}` as any}
                className="group relative overflow-hidden rounded-[1.7rem] border border-[var(--sb-line)] bg-[var(--sb-surface-strong)] p-5 shadow-[var(--sb-shadow-sm)] transition hover:-translate-y-1 hover:border-blue-700/20 hover:shadow-[var(--sb-shadow-md)] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/20"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-blue-600/5 blur-2xl transition group-hover:bg-blue-600/10" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid size-10 place-items-center rounded-2xl bg-[var(--sb-primary)] text-sm font-black text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-black ${
                        DIFFICULTY_COLORS[(exam as any).difficulty ?? "karma"] ?? DIFFICULTY_COLORS.karma
                      }`}
                    >
                      {DIFFICULTY_LABELS[(exam as any).difficulty ?? "karma"] ?? "Karma"}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-black leading-snug tracking-tight text-[var(--sb-text)]">
                    {exam.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--sb-text-soft)]">
                    {exam.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface-muted)] p-3 text-center">
                      <p className="text-[10px] font-black uppercase tracking-wider text-[var(--sb-text-muted)]">Soru</p>
                      <p className="mt-1 text-lg font-black text-[var(--sb-text)]">40</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface-muted)] p-3 text-center">
                      <p className="text-[10px] font-black uppercase tracking-wider text-[var(--sb-text-muted)]">Süre</p>
                      <p className="mt-1 text-lg font-black text-[var(--sb-text)]">{exam.durationMinutes} dk</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-black text-[var(--sb-primary)]">
                      <Trophy size={15} /> Başlat
                    </span>
                    <ArrowRight size={17} className="text-[var(--sb-text-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--sb-primary)]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="rounded-[1.8rem] border border-[var(--sb-line)] bg-[var(--sb-surface-strong)] p-10 text-center shadow-[var(--sb-shadow-sm)]">
          <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-blue-700/10 text-[var(--sb-primary)]">
            <FileQuestion size={28} />
          </div>
          <h2 className="mt-5 text-xl font-black text-[var(--sb-text)]">Denemeler Eş Zamanlanıyor</h2>
          <p className="mt-2 text-sm text-[var(--sb-text-soft)]">
            KPSS Tarih deneme sınavları bulut veritabanı ile senkronize ediliyor. Bağlantı tamamlandığında tüm deneme sınavları bu alanda listelenecektir.
          </p>
        </section>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-[1.25rem] border border-[var(--sb-line)] bg-[var(--sb-surface-strong)] p-4 shadow-[var(--sb-shadow-sm)]">
      <div className="mb-2 grid size-9 place-items-center rounded-xl bg-[var(--sb-primary)]/10 text-[var(--sb-primary)]">
        {icon}
      </div>
      <p className="text-[10px] font-black uppercase tracking-wider text-[var(--sb-text-muted)]">{label}</p>
      <p className="mt-1 text-xl font-black text-[var(--sb-text)]">{value}</p>
    </div>
  );
}
