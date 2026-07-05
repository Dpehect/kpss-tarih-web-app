export function ExamRunnerShell({ examId }: { examId: string }) {
  return (
    <section className="rounded-[2.5rem] border border-black/5 bg-white/60 p-8">
      <p className="text-sm text-neutral-500">Deneme ID</p>
      <h2 className="mt-3 text-5xl font-semibold tracking-[-0.06em]">{examId}</h2>
    </section>
  );
}
