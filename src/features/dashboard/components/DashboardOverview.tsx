import dashboardSnapshot from "@/features/dashboard/data/dashboard-snapshot.json";
import { SectionHeader } from "@/components/core/SectionHeader";
import { ProgressRing } from "@/features/dashboard/charts/ProgressRing";
import { WeeklyTrend } from "@/features/dashboard/charts/WeeklyTrend";
import { RecommendedStudyPlan } from "@/features/dashboard/components/RecommendedStudyPlan";
import { WeakTopicsPanel } from "@/features/dashboard/components/WeakTopicsPanel";

export function DashboardOverview() {
  return (
    <section className="space-y-10">
      <div className="rounded-[2.5rem] border border-black/5 bg-white/60 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <SectionHeader
          eyebrow="Study Experience"
          title="Bugünün tarih ritmini kur."
          description="Günlük soru hedefi, aktif hatırlama, mastery ilerlemesi ve odak süresi tek ekranda sakin bir premium dashboard deneyimine dönüşür."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardSnapshot.rings.map((metric) => (
          <ProgressRing key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <WeeklyTrend trend={dashboardSnapshot.weeklyTrend} />
        <RecommendedStudyPlan recommendations={dashboardSnapshot.recommendations} />
      </div>

      <WeakTopicsPanel topics={dashboardSnapshot.weakTopics} />
    </section>
  );
}
