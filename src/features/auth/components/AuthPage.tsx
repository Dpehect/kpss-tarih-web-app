import { PageHeader } from "@/components/core/PageHeader";
import { AuthPanel } from "@/features/auth/components/AuthPanel";

export function AuthPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Giriş"
        title="Google ile giriş yap, ilerlemeni online sakla."
        description="Konu ilerlemen, soru cevapların, yanlışların, deneme sonuçların, flashcard tekrarların ve notların Supabase üzerinde saklanır."
      />

      <AuthPanel />
    </div>
  );
}
