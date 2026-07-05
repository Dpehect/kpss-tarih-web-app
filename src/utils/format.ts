/**
 * Sayısal değerleri Türkçe locale ile formatlar.
 * Dashboard ve istatistik modüllerinde tekrar kullanılacak.
 */
export function formatNumber(value: number) {
  return new Intl.NumberFormat("tr-TR").format(value);
}
