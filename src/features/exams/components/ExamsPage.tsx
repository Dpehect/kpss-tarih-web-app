import { ArrowRight, Clock, FileQuestion, Gauge, Medal, Target, Trophy } from "lucide-react";
import { fetchContentTests, fetchContentTopics } from "@/lib/content/supabase-content-server";

const examPresets = [
  { id: "deneme-1", title: "Genel Tekrar Denemesi 1", focus: "Tüm dönemlerden dengeli karma ölçüm", minutes: 60, questionCount: 60, level: "Karma" },
  { id: "deneme-2", title: "Siyasi Tarih Denemesi", focus: "Devletler, savaşlar, antlaşmalar", minutes: 60, questionCount: 60, level: "Orta" },
  { id: "deneme-3", title: "Kronoloji Denemesi", focus: "Olay sıralaması ve dönem ilişkisi", minutes: 60, questionCount: 60, level: "Seçici" },
  { id: "deneme-4", title: "Atatürk İlkeleri Denemesi", focus: "İnkılaplar ve temel kavramlar", minutes: 60, questionCount: 60, level: "Orta" },
  { id: "deneme-5", title: "Zorlayıcı Final Denemesi", focus: "Karıştırılan bilgiler ve yorum gücü", minutes: 60, questionCount: 60, level: "Zor" },
  { id: "deneme-6", title: "Hızlı Kontrol Denemesi", focus: "Sınav öncesi kısa net tarama", minutes: 45, questionCount: 50, level: "Hızlı" }
];

export async function ExamsPage() {
  const [topics, tests] = await Promise.all([
    fetchContentTopics(),
    fetchContentTests()
  ]);

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-white/75 bg-white/78 p-6 shadow-[0_32px_105px_rgba(16,24,40,.12)] backdrop-blur-xl md:p-8">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#bfdbfe]/70 blur-3xl" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Deneme merkezi</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] text-[#101828] md:text-7xl">
              Gerçek sınav temposuna geç.
            </h1>
            <p className="mt-5 max-w-3xl text-sm font-bold leading-7 text-[#475467]">
              Denemeler Supabase soru havuzundan çalışır. Her deneme açıldığında soru seti hazırlanır ve “bölüm bulunamadı” hatası oluşmaz.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Metric icon={<Target size={18} />} label="Deneme" value={examPresets.length} />
            <Metric icon={<FileQuestion size={18} />} label="Soru havuzu" value={tests.length ? tests.length * 30 : "Aktif"} />
            <Metric icon={<Gauge size={18} />} label="Konu" value={topics.length || 12} />
            <Metric icon={<Clock size={18} />} label="Süre" value="45-60 dk" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {examPresets.map((exam, index) => (
          <a
            key={exam.id}
            href={`/exams/${exam.id}`}
            className="group relative min-h-[290px] overflow-hidden rounded-[2rem] border border-white/75 bg-white/80 p-5 shadow-[0_20px_65px_rgba(16,24,40,.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(16,24,40,.12)]"
          >
            <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute right-[-3rem] top-[-3rem] size-32 rounded-full bg-[#fff7ed] blur-2xl" />
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#101828] px-3 py-1 text-xs font-black text-white">
                  Deneme {index + 1}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fffaf3] px-3 py-1 text-xs font-black text-[#101828]">
                  <Medal size={14} />
                  {exam.level}
                </span>
              </div>

              <h2 className="text-2xl font-black leading-tight tracking-[-0.045em] text-[#101828]">{exam.title}</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#475467]">{exam.focus}</p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <SmallStat label="Soru" value={exam.questionCount} />
                <SmallStat label="Süre" value={`${exam.minutes} dk`} />
              </div>

              <div className="mt-auto flex items-center justify-between pt-5">
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#475467]">
                  <Trophy size={16} />
                  Başlat
                </span>
                <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </div>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-white/80 bg-white/84 p-4 shadow-[0_16px_44px_rgba(16,24,40,.08)]">
      <div className="mb-3 inline-grid size-10 place-items-center rounded-2xl bg-[#101828] text-white">{icon}</div>
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#667085]">{label}</p>
      <p className="mt-1 text-2xl font-black text-[#101828]">{value}</p>
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-[#e4d8c8] bg-[#fffaf3] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#667085]">{label}</p>
      <p className="mt-1 text-lg font-black text-[#101828]">{value}</p>
    </div>
  );
}
