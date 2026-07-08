"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, LogIn, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { SBBrandMark } from "@/components/brand/SBBrandMark";
import { createClient } from "@/lib/supabase/client";

export function AuthPanel() {
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) toast.error(error);
  }, [searchParams]);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }

    let mounted = true;

    void supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user ?? null);
      setReady(true);

      if (data.user) {
        window.location.replace("/dashboard");
      }
    });

    return () => {
      mounted = false;
    };
  }, [supabase]);

  async function signInWithGoogle() {
    if (!supabase) {
      toast.error("Giriş yapılandırması eksik.");
      return;
    }

    const redirectTo = `${window.location.origin}/auth/callback`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: false
      }
    });

    if (error) toast.error(error.message);
  }

  if (!ready) {
    return (
      <div className="rounded-[2.25rem] border border-white/70 bg-white/80 p-6 text-sm font-black text-[#475467] shadow-[0_28px_90px_rgba(16,24,40,.10)] backdrop-blur-xl">
        Oturum kontrol ediliyor...
      </div>
    );
  }

  if (user) {
    return (
      <div className="rounded-[2.25rem] border border-white/70 bg-white/80 p-6 text-sm font-black text-[#101828] shadow-[0_28px_90px_rgba(16,24,40,.10)] backdrop-blur-xl">
        Panele yönlendiriliyorsun...
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-stretch">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/75 p-8 shadow-[0_28px_90px_rgba(16,24,40,.10)] backdrop-blur-xl">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-[#fed7aa]/70 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-10 size-72 rounded-full bg-[#bfdbfe]/70 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <SBBrandMark className="size-14 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#101828]">Softbridge Akademi</p>
              <p className="text-xs font-bold text-[#667085]">KPSS Tarih</p>
            </div>
          </div>

          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Güvenli giriş</p>
          <h1 className="mt-3 max-w-2xl text-5xl font-black leading-[0.94] tracking-[-0.08em] text-[#101828] md:text-6xl">
            Çalışma paneline hızlı giriş yap.
          </h1>
          <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-[#475467]">
            Giriş yaptıktan sonra direkt dashboard açılır. İçerik Supabase’den parça parça gelir; büyük veri dosyaları local bundle’a yüklenmez.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <Info icon={<ShieldCheck size={18} />} title="Güvenli" body="Google OAuth" />
            <Info icon={<Sparkles size={18} />} title="Hafif" body="Ultra-lite shell" />
            <Info icon={<CheckCircle2 size={18} />} title="Hızlı" body="30 soru/test" />
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-white/70 bg-white/85 p-6 shadow-[0_28px_90px_rgba(16,24,40,.10)] backdrop-blur-xl">
        <div className="rounded-[2rem] border border-[#e4d8c8] bg-[#fffaf3] p-5">
          <div className="grid size-12 place-items-center rounded-2xl bg-[#101828] text-white">
            <LogIn size={22} />
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.055em] text-[#101828]">Giriş Yap</h2>
          <p className="mt-3 text-sm font-bold leading-7 text-[#475467]">
            Hesabınla giriş yapınca doğrudan çalışma paneline geçersin.
          </p>

          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#101828] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(16,24,40,.18)]"
          >
            Google ile giriş yap
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}

function Info({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/78 p-4 shadow-[0_12px_34px_rgba(16,24,40,.07)]">
      <div className="mb-3 grid size-9 place-items-center rounded-xl bg-[#101828] text-white">{icon}</div>
      <p className="text-sm font-black text-[#101828]">{title}</p>
      <p className="mt-1 text-xs font-bold text-[#667085]">{body}</p>
    </div>
  );
}
