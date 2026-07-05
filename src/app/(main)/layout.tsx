import { AppShell } from "@/components/core/AppShell";

/**
 * Main route grubu layout'u.
 * Landing dışındaki tüm sayfalar derli toplu app shell içinde gösterilir.
 */
export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShell>{children}</AppShell>;
}
