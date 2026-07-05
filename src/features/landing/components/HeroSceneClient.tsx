"use client";

import dynamic from "next/dynamic";

/**
 * WebGL sahnesini sadece client tarafında yükleyen wrapper.
 * Böylece server render ve ilk HTML hafif kalır.
 */
const HeroScene = dynamic(
  () => import("@/features/landing/components/HeroScene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full min-h-[32rem] place-items-center rounded-[3rem] border border-white/10 bg-white/[0.04] text-[#f2dfbf]/70">
        WebGL tarih sahnesi hazırlanıyor...
      </div>
    )
  }
);

export function HeroSceneClient() {
  return <HeroScene />;
}
