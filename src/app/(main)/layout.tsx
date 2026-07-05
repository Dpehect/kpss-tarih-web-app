import { AppShell } from "@/components/core/AppShell";

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShell>{children}</AppShell>;
}
