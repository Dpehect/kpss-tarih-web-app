import type { ReactNode } from "react";

export function BentoCard({
  children,
  className = "",
  href
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const classes =
    "group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.075] p-5 shadow-[0_30px_90px_rgba(0,0,0,.24)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-white/[.10] " +
    className;

  const inner = (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.16),transparent_32%)] opacity-70" />
      <div className="relative z-10">{children}</div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  return <div className={classes}>{inner}</div>;
}
