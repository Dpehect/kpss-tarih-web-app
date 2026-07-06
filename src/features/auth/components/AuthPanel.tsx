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
    if (!supabase) {
      setIsLoading(false);
      return;
    }

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
    if (!supabase) {
      toast.error("Supabase env eksik. Vercel Environment Variables ayarlanmalı.");
      return;
    }

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
    if (!supabase) return;

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
        <p className="text-[#425066]">Oturum kontrol ediliyor...</p>
      </section>
    );
  }

  if (!supabase) {
    return (
      <section className="rounded-[2rem] parchment-surface p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#2447d8]">Kurulum gerekli</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#111827]">
          Supabase environment variables eksik.
        </h2>
        <p className="mt-3 text-[#425066]">
          Vercel Project Settings → Environment Variables bölümüne NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY eklenmeli.
        </p>
      </section>
    );
  }

  if (user) {
    return (
      <section className="rounded-[2rem] parchment-surface p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#2447d8]">Aktif oturum</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#111827]">
          {user.user_metadata?.full_name ?? user.email}
        </h2>
        <p className="mt-3 text-[#425066]">
          İstatistiklerin online kaydedilecek ve tekrar giriş yaptığında dashboard'a yüklenecek.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/dashboard" className="btn-primary">Dashboard'a git</a>
          <button type="button" onClick={signOut} className="btn-ghost">Çıkış yap</button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] parchment-surface p-6">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#2447d8]">Google hesabı</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#111827]">
        Giriş yapınca tüm istatistiklerin online kaydedilir.
      </h2>
      <p className="mt-3 text-[#425066]">
        İçerikler JSON'da kalır. Sadece kullanıcıya ait çalışma verileri Supabase'e yazılır.
      </p>

      <button type="button" onClick={signInWithGoogle} className="btn-primary mt-6">
        Google ile giriş yap
      </button>
    </section>
  );
}
