"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function AuthStatusButton() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Çıkış yapıldı");
    setUser(null);
    window.location.href = "/";
  }

  if (!user) {
    return (
      <a href="/auth" className="btn-gold hidden sm:inline-flex">
        Google giriş
      </a>
    );
  }

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <a
        href="/profile"
        className="max-w-[180px] truncate rounded-full border border-black/[0.08] bg-white/70 px-4 py-2 text-sm font-black text-[#111827]"
      >
        {user.user_metadata?.full_name ?? user.email}
      </a>
      <button
        type="button"
        onClick={signOut}
        className="rounded-full border border-black/[0.08] bg-white/70 px-4 py-2 text-sm font-black text-[#425066] transition hover:bg-white"
      >
        Çıkış
      </button>
    </div>
  );
}
