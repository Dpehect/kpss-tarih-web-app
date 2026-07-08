import { ArrowLeft, Clock, FileQuestion, Target } from "lucide-react";
import { fetchContentExamQuestions } from "@/lib/content/supabase-content-server";
import { TopicQuestionRunner } from "@/features/question-bank/components/TopicQuestionRunner";

const exams = [
  { id: "deneme-1", title: "Genel Tekrar Denemesi 1", minutes: 60, questionCount: 60 },
  { id: "deneme-2", title: "Siyasi Tarih Denemesi", minutes: 60, questionCount: 60 },
  { id: "deneme-3", title: "Kronoloji Denemesi", minutes: 60, questionCount: 60 },
  { id: "deneme-4", title: "Atatürk İlkeleri Denemesi", minutes: 60, questionCount: 60 },
  { id: "deneme-5", title: "Zorlayıcı Final Denemesi", minutes: 60, questionCount: 60 },
  { id: "deneme-6", title: "Hızlı Kontrol Denemesi", minutes: 45, questionCount: 50 }
];

function getExamIndex(examId: string) {
  const matched = examId.match(/(\d+)/);
  return matched ? Number(matched[1]) : 1;
}

export async function ExamRunnerPage({ examId }: { examId: string }) {
  const preset = exams.find((exam) => exam.id === examId) ?? exams[0];
  const questions = await fetchContentExamQuestions(getExamIndex(examId), preset.questionCount);

  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-white/75 bg-white/78 p-6 shadow-[0_32px_105px_rgba(16,24,40,.12)] backdrop-blur-xl md:p-8">
        <div aria-hidden="true" data-decorative="true" className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#bfdbfe]/70 blur-3xl" />
        <div className="relative z-10">
          <a href="/exams" className="inline-flex items-center gap-2 rounded-full border border-[#e4d8c8] bg-white/85 px-4 py-2 text-sm font-black text-[#101828]">
            <ArrowLeft size={17} />
            Denemeler
          </a>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Süreli deneme</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[#101828] md:text-6xl">{preset.title}</h1>
          <div className="mt-5 flex flex-wrap gap-3">
            <Badge icon={<FileQuestion size={16} />} text={`${questions.length} soru`} />
            <Badge icon={<Clock size={16} />} text={`${preset.minutes} dakika`} />
            <Badge icon={<Target size={16} />} text="Supabase soru havuzu" />
          </div>
        </div>
      </section>

      {questions.length > 0 ? (
        <TopicQuestionRunner questions={questions} topicTitle={preset.title} />
      ) : (
        <section className="rounded-[2rem] border border-[#f7b2b7] bg-[#fff1f2] p-6 text-sm font-black text-[#b4232a]">
          Bu deneme için Supabase’den soru gelmedi. content_questions tablosunu kontrol et.
        </section>
      )}
    </div>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#fffaf3] px-4 py-2 text-sm font-black text-[#101828]">
      {icon}
      {text}
    </span>
  );
}
