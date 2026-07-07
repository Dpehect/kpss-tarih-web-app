"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { IdleOnlineProgressHydrator } from "@/components/core/IdleOnlineProgressHydrator";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <IdleOnlineProgressHydrator />
      {children}
      <Toaster richColors position="top-center" closeButton />
    </>
  );
}
