"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FoxBrandMark } from "@/components/brand/FoxBrandMark";
import { createClient } from "@/lib/supabase/client";

export function AuthPanel() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      toast.error(error);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    const client = supabase;
    let mounted = true;

    client.auth.getUser().then(({ data }) => {
      if (!mounted) return;

      setUser(data.user ?? null);
      setIsLoading(false);
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function signInWithGoogle() {
    if (!supabase) {
      toast.error("Giriş altyapısı henüz yapılandırılmadı.");
      return;
    }

    const client = supabase;
    const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;
    const { error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo }
    });

    if (error) {
      toast.error(error.message);
    }
  }

  async function signOut() {
    if (!supabase) return;

    const client = supabase;
    const { error } = await client.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Oturum kapatıldı.");
    setUser(null);
  }

  if (isLoading) {
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

  if (!supabase) {
    return (
      <div className="mx-auto grid w-full max-w-5xl gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
        <AuthCopy />

        <div className="rounded-[2.5rem] border border-[#e4d8c8] bg-white/80 p-7 shadow-[0_32px_110px_rgba(16,24,40,.10)] backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Kurulum gerekli</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.06em] text-[#101828]">
            Giriş altyapısı için environment variable eksik.
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
            Vercel Project Settings → Environment Variables bölümüne Supabase public URL ve publishable key eklenmeli.
          </p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="mx-auto grid w-full max-w-5xl gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
        <AuthCopy />

        <div className="rounded-[2.5rem] border border-[#e4d8c8] bg-white/84 p-7 shadow-[0_32px_110px_rgba(16,24,40,.10)] backdrop-blur-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#101828] text-white">
              <CheckCircle2 size={23} />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Aktif oturum</p>
              <h2 className="text-2xl font-black tracking-[-0.055em] text-[#101828]">
                {user.user_metadata?.full_name ?? user.email}
              </h2>
            </div>
          </div>

          <p className="text-sm font-semibold leading-7 text-slate-600">
            Çalışma verilerin online saklanır; farklı cihazda tekrar giriş yaptığında panelden devam edebilirsin.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href="/dashboard"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#b4232a] px-5 text-sm font-black text-white shadow-[0_18px_60px_rgba(180,35,42,.20)]"
            >
              Panele geç
              <ArrowRight size={17} />
            </a>
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#e4d8c8] bg-white/80 px-5 text-sm font-black text-[#101828]"
            >
              Oturumu kapat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-5 lg:grid-cols-[minmax(0,1fr)_430px]">
      <AuthCopy />

      <section className="relative overflow-hidden rounded-[2.5rem] border border-[#e4d8c8] bg-white/84 p-7 shadow-[0_32px_110px_rgba(16,24,40,.10)] backdrop-blur-2xl">
        <div className="absolute right-[-5rem] top-[-5rem] size-56 rounded-full bg-[#b4232a]/12 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-3">
            <FoxBrandMark className="size-12 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#101828]">Softbridge Akademi</p>
              <p className="text-xs font-semibold text-slate-500">Güvenli çalışma hesabı</p>
            </div>
          </div>

          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b4232a]">Oturum aç</p>
          <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.075em] text-[#101828] md:text-5xl">
            İlerlemeni güvenli şekilde senkronize et.
          </h1>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
            Konu ilerlemen, test cevapların, yanlışların, deneme sonuçların ve tekrarların hesabına bağlı olarak saklanır.
          </p>

          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#101828] px-5 text-sm font-black text-white shadow-[0_22px_70px_rgba(16,24,40,.22)] transition hover:bg-[#1d2939]"
          >
            <GoogleMark />
            Google hesabıyla güvenli devam et
            <ArrowRight size={17} />
          </button>

          <p className="mt-4 text-center text-xs font-semibold leading-6 text-slate-500">
            İçerikler JSON’da kalır; yalnızca sana ait çalışma verileri online saklanır.
          </p>
        </div>
      </section>
    </div>
  );
}

function AuthCopy() {
  return (
    <section className="rounded-[2.5rem] bg-[#101828] p-7 text-white shadow-[0_32px_110px_rgba(16,24,40,.24)]">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.08] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/70">
        <ShieldCheck size={15} />
        Hesap avantajı
      </div>

      <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.08em] md:text-6xl">
        Aynı yerden devam et.
      </h2>
      <p className="mt-5 text-sm font-semibold leading-7 text-white/68">
        Giriş yaptığında çalışma ilerlemen cihazına bağlı kalmaz. Panel, testler, yanlışlar ve tekrarların daha düzenli takip edilir.
      </p>

      <div className="mt-7 grid gap-3">
        {[
          "Test cevapların ve yanlışların saklanır.",
          "Deneme sonuçların takip edilir.",
          "Flashcard tekrarların kaydedilir."
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.07] p-3">
            <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-white">
              <CheckCircle2 size={18} />
            </span>
            <p className="text-sm font-semibold text-white/76">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GoogleMark() {
  return (
    <svg width="19" height="19" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.8l-6.6 5.1C9.4 39.6 16.1 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
