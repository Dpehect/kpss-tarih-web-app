"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { OnlineProgressHydrator } from "@/components/core/OnlineProgressHydrator";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <OnlineProgressHydrator />
      {children}
      <Toaster richColors position="top-center" closeButton />
    </>
  );
}
