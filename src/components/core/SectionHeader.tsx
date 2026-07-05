type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-4xl font-semibold tracking-[-0.06em] text-neutral-950 md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-neutral-600">{description}</p>
      ) : null}
    </div>
  );
}
