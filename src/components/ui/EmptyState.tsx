import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-[var(--border-soft)] bg-white/75 p-8 text-center shadow-[var(--shadow-sm)] backdrop-blur-2xl">
      <h2 className="text-3xl font-black tracking-[-0.05em] text-[var(--navy-900)]">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl leading-7 text-[var(--text-secondary)]">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  );
}
