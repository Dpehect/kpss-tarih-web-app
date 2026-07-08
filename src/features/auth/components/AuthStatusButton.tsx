"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { LogOut, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AuthStatusButton() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const displayName = user?.user_metadata?.full_name ?? user?.email ?? "Profil";

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
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setReady(true);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function signOut() {
    if (supabase) {
      await supabase.auth.signOut();
    }

    window.location.href = "/";
  }

  if (!ready) {
    return (
      <span className="hidden min-h-11 items-center rounded-full border border-[#e4d8c8] bg-white/80 px-4 text-sm font-black text-[#667085] sm:inline-flex">
        Hesap
      </span>
    );
  }

  if (!user) {
    return (
      <a
        href="/login"
        data-ultra-click="true"
        className="inline-flex min-h-11 items-center rounded-full bg-[#101828] px-4 text-sm font-black text-white shadow-[0_12px_32px_rgba(16,24,40,.18)]"
      >
        Giriş Yap
      </a>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href="/profile"
        data-ultra-click="true"
        className="hidden min-h-11 max-w-[220px] items-center gap-2 truncate rounded-full border border-[#e4d8c8] bg-white/85 px-4 text-sm font-black text-[#101828] shadow-[0_10px_28px_rgba(16,24,40,.08)] sm:inline-flex"
        title={displayName}
      >
        <UserRound size={16} />
        <span className="truncate">{displayName}</span>
      </a>

      <button
        type="button"
        data-ultra-click="true"
        onClick={() => void signOut()}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#f3c7c9] bg-[#fff1f2] px-4 text-sm font-black text-[#b4232a] shadow-[0_10px_28px_rgba(180,35,42,.08)]"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Çıkış Yap</span>
        <span className="sm:hidden">Çıkış</span>
      </button>
    </div>
  );
}
