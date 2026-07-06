type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[2.2rem] border border-black/[0.08] bg-[#111827] p-6 text-[#fffaf0] shadow-[0_30px_110px_rgba(17,24,39,0.22)] md:p-9">
      <div className="absolute right-[-4rem] top-[-4rem] size-56 rounded-full bg-[#2447d8]/30 blur-3xl" />
      <div className="absolute bottom-[-5rem] left-[20%] size-64 rounded-full bg-[#be684b]/24 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f0bd59]">{eyebrow}</p>
          <h1 className="editorial-title mt-4 max-w-5xl text-4xl md:text-6xl xl:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#fffaf0]/68 md:text-lg">
            {description}
          </p>
        </div>
        {actions ? <div className="relative z-10 shrink-0">{actions}</div> : null}
      </div>
    </header>
  );
}
