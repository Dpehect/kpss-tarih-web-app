import type { ReactNode } from "react";
import { AppShell } from "@/components/core/AppShell";

export default function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
