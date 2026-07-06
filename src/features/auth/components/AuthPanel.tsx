"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
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
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user ?? null);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function signInWithGoogle() {
    const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo
      }
    });

    if (error) {
      toast.error(error.message);
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Çıkış yapıldı");
    setUser(null);
  }

  if (isLoading) {
    return (
      <section className="rounded-[2rem] parchment-surface p-6">
        <p className="text-[#ead7b7]/70">Oturum kontrol ediliyor...</p>
      </section>
    );
  }

  if (user) {
    return (
      <section className="rounded-[2rem] parchment-surface p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f6c465]">
          Aktif oturum
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">
          {user.user_metadata?.full_name ?? user.email}
        </h2>
        <p className="mt-3 text-[#ead7b7]/66">
          İstatistiklerin online kaydedilecek ve tekrar giriş yaptığında dashboard'a yüklenecek.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/dashboard"
            className="rounded-full bg-[#f2c15f] px-5 py-3 font-black text-[#120b07]"
          >
            Dashboard'a git
          </a>
          <button
            type="button"
            onClick={signOut}
            className="rounded-full border border-white/10 bg-white/[0.08] px-5 py-3 font-black text-[#fff8e8]"
          >
            Çıkış yap
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] parchment-surface p-6">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f6c465]">
        Google hesabı
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">
        Giriş yapınca tüm istatistiklerin online kaydedilir.
      </h2>
      <p className="mt-3 text-[#ead7b7]/66">
        İçerikler JSON'da kalır. Sadece kullanıcıya ait çalışma verileri Supabase'e yazılır.
      </p>

      <button
        type="button"
        onClick={signInWithGoogle}
        className="mt-6 rounded-full bg-[#f2c15f] px-6 py-3 font-black text-[#120b07] transition hover:-translate-y-1"
      >
        Google ile giriş yap
      </button>
    </section>
  );
}
