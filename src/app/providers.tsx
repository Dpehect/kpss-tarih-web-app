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
        wheelMultiplier: 0.9,
        touchMultiplier: 1.12
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
            borderRadius: "22px",
            border: "1px solid rgba(11,18,32,0.12)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 20px 70px rgba(11,18,32,0.14)"
          }
        }}
      />
    </ReactLenis>
  );
}
