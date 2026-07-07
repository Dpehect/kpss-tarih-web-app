import { Suspense } from "react";
import { LockKeyhole } from "lucide-react";
import { AuthPanel } from "@/features/auth/components/AuthPanel";

export function AuthPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6efe4] text-[#101828]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,40,.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,.045)_1px,transparent_1px)] bg-[size:68px_68px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(180,35,42,.14),transparent_32rem),radial-gradient(circle_at_86%_20%,rgba(37,99,235,.11),transparent_30rem)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-10 md:px-8">
        <Suspense fallback={<AuthLoadingCard />}>
          <AuthPanel />
        </Suspense>
      </div>
    </main>
  );
}

function AuthLoadingCard() {
  return (
    <div className="mx-auto w-full max-w-xl rounded-[2.5rem] border border-[#e4d8c8] bg-white/78 p-8 text-center shadow-[0_32px_110px_rgba(16,24,40,.10)] backdrop-blur-2xl">
      <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-[#101828] text-white">
        <LockKeyhole size={24} />
      </div>
      <h1 className="text-3xl font-black tracking-[-0.06em] text-[#101828]">Oturum hazırlanıyor</h1>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">Güvenli bağlantı kontrol ediliyor.</p>
    </div>
  );
}
