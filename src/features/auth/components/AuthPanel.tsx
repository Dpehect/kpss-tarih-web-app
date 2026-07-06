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
      toast.error("Supabase env eksik. Vercel Environment Variables ayarlanmalı.");
      return;
    }

    const client = supabase;
    const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;

    const { error } = await client.auth.signInWithOAuth({
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

    const client = supabase;
    const { error } = await client.auth.signOut();

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
        <p className="text-[var(--muted-foreground)]">Oturum kontrol ediliyor...</p>
      </section>
    );
  }

  if (!supabase) {
    return (
      <section className="rounded-[2rem] parchment-surface p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--accent-sky)]">
          Kurulum gerekli
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--foreground)]">
          Supabase environment variables eksik.
        </h2>
        <p className="mt-3 text-[var(--muted-foreground)]">
          Vercel Project Settings → Environment Variables bölümüne NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY eklenmeli.
        </p>
      </section>
    );
  }

  if (user) {
    return (
      <section className="rounded-[2rem] parchment-surface p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--accent-sky)]">
          Aktif oturum
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--foreground)]">
          {user.user_metadata?.full_name ?? user.email}
        </h2>
        <p className="mt-3 text-[var(--muted-foreground)]">
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
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--accent-sky)]">
        Google hesabı
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--foreground)]">
        Giriş yapınca tüm istatistiklerin online kaydedilir.
      </h2>
      <p className="mt-3 text-[var(--muted-foreground)]">
        İçerikler JSON'da kalır. Sadece kullanıcıya ait çalışma verileri Supabase'e yazılır.
      </p>

      <button type="button" onClick={signInWithGoogle} className="btn-primary mt-6">
        Google ile giriş yap
      </button>
    </section>
  );
}
