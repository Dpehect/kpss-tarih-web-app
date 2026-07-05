"use client";

import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";

/**
 * Global client provider.
 * Lenis tüm uygulamada premium smooth-scroll hissini verir.
 * Sonner kullanıcı aksiyonlarında küçük bildirimler gösterir.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.18,
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.25
      }}
    >
      {children}
      <Toaster position="top-center" richColors />
    </ReactLenis>
  );
}
