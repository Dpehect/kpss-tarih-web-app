import type { Metadata } from "next";
import { DashboardPage } from "@/features/dashboard/components/DashboardPage";

export const metadata: Metadata = {
  title: "Panel",
  description: "KPSS Tarih çalışma paneli."
};

export default async function DashboardRoute() {
  return <DashboardPage />;
}
