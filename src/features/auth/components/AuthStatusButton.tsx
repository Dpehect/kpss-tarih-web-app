"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { LogOut, UserRound } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function AuthStatusButton() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (!supabase) return;

    const client = supabase;
    let mounted = true;

    client.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user ?? null);
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

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
    window.location.href = "/login";
  }

  if (!supabase || !user) {
    return (
      <a
        href="/login"
        data-dark-button="true"
        className="inline-flex min-h-10 items-center justify-center rounded-2xl bg-[#0f766e] px-4 text-sm font-black text-white shadow-[0_14px_38px_rgba(15,118,110,.22)] transition hover:bg-[#115e59]"
      >
        Giriş Yap
      </a>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href="/profile"
        className="hidden min-h-10 items-center gap-2 rounded-2xl border border-[#e4d8c8] bg-white/76 px-3 text-sm font-bold text-[#101828] shadow-sm transition hover:bg-white md:inline-flex"
      >
        <UserRound size={16} />
        <span className="max-w-[150px] truncate">{user.user_metadata?.full_name ?? user.email}</span>
      </a>

      <button
        type="button"
        onClick={() => void signOut()}
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-[#e4d8c8] bg-white/76 px-3 text-sm font-black text-[#101828] shadow-sm transition hover:bg-white"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Çıkış</span>
      </button>
    </div>
  );
}
