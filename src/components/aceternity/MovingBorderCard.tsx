import type { ReactNode } from "react";

export function MovingBorderCard({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a href={href} className="group relative block overflow-hidden rounded-[1.75rem] p-px">
      <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(248,113,113,.9)_80deg,transparent_160deg,rgba(96,165,250,.8)_240deg,transparent_320deg)] opacity-70 transition duration-500 group-hover:rotate-180" />
      <div className="relative rounded-[1.72rem] border border-white/10 bg-[#0b1020]/92 p-4 backdrop-blur-xl">
        {children}
      </div>
    </a>
  );
}
