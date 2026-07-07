import { AuthPanel } from "@/features/auth/components/AuthPanel";

export function AuthPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6efe4] text-[#101828]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,40,.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,.045)_1px,transparent_1px)] bg-[size:68px_68px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(180,35,42,.14),transparent_32rem),radial-gradient(circle_at_86%_20%,rgba(37,99,235,.11),transparent_30rem)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-10 md:px-8">
        <AuthPanel />
      </div>
    </main>
  );
}
