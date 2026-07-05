import { PageHeader } from "@/components/core/PageHeader";
import { MetricCard } from "@/components/common/MetricCard";

/**
 * Profil sayfası.
 * Kullanıcının çalışma kimliği ve genel istatistiklerini toplar.
 */
export function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Profil"
        title="Çalışma kimliğin."
        description="Faz 2'de mock profil; ileride auth ve gerçek kullanıcı verisiyle bağlanacak."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Seri" value="12 gün" helper="Aralıksız çalışma serisi." />
        <MetricCard label="Doğruluk" value="74%" helper="Genel soru doğruluk oranı." tone="turquoise" />
        <MetricCard label="Seviye" value="Orta+" helper="Hazırlık ilerleme profili." tone="crimson" />
      </div>

      <section className="rounded-[2rem] parchment-surface p-6">
        <h2 className="text-2xl font-black">Hedef</h2>
        <p className="mt-3 leading-8 text-[#ead7b7]/70">
          Her gün 45 dakika odak, 40 soru, 15 flashcard ve en az bir konu özeti tekrarı.
        </p>
      </section>
    </div>
  );
}
