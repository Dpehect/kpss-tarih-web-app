import { PageHeader } from "@/components/core/PageHeader";

/**
 * Auth placeholder.
 * Faz 2'de görünür sayfa olarak hazır; üretimde giriş/kayıt akışına genişletilebilir.
 */
export default function AuthRoute() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Giriş"
        title="Hesap sistemi için hazır alan."
        description="Şimdilik mock sayfadır. İleride kullanıcı ilerlemesini kaydetmek için auth entegrasyonu buraya bağlanır."
      />
      <div className="rounded-[2rem] parchment-surface p-6">
        <p className="text-[#ead7b7]/70">Demo modunda uygulamayı giriş yapmadan kullanabilirsin.</p>
        <a href="/dashboard" className="mt-5 inline-flex rounded-full bg-[#f2c15f] px-5 py-3 font-black text-[#120b07]">
          Dashboard'a dön
        </a>
      </div>
    </div>
  );
}
