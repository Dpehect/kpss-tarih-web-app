"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";
import { GSAPPremiumEffects } from "@/components/motion/GSAPPremiumEffects";
import { OnlineProgressHydrator } from "@/components/core/OnlineProgressHydrator";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.18,
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.18
      }}
    >
      <GSAPPremiumEffects />
      <OnlineProgressHydrator />
      {children}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            borderRadius: "20px",
            border: "1px solid rgba(15,23,42,0.10)",
            backdropFilter: "blur(18px)"
          }
        }}
      />
    </ReactLenis>
  );
}
