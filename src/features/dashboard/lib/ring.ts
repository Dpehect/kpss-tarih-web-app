import type { PerformanceRingMetric } from "@/types/dashboard";

export function getRingProgress(metric: PerformanceRingMetric) {
  if (metric.target <= 0) return 0;
  return Math.max(0, Math.min(1, metric.value / metric.target));
}

export function getRingLabel(metric: PerformanceRingMetric) {
  const percent = Math.round(getRingProgress(metric) * 100);
  return `${metric.label}: ${percent}%`;
}
