import { cn } from "@/lib/cn";

/**
 * İç sayfalar için standart başlık.
 * Her sayfada aynı bilgi hiyerarşisini korur.
 */
type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({ eyebrow, title, description, actions, className }: PageHeaderProps) {
  return (
    <header className={cn("rounded-[2.5rem] parchment-surface p-6 md:p-8", className)}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#f6c465]">{eyebrow}</p>
          <h1 className="mt-4 text-balance text-4xl font-black leading-[0.96] tracking-[-0.07em] md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-8 text-[#ead7b7]/68 md:text-lg">{description}</p>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </header>
  );
}
