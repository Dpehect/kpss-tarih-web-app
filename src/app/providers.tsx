"use client";

import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        duration: 1.12,
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.35
      }}
    >
      {children}
      <Toaster richColors position="top-center" />
    </ReactLenis>
  );
}
