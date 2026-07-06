"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
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
    window.location.href = "/";
  }

  if (!supabase || !user) {
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
        className="max-w-[180px] truncate rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-2 text-sm font-black text-[var(--foreground)]"
      >
        {user.user_metadata?.full_name ?? user.email}
      </a>
      <button
        type="button"
        onClick={signOut}
        className="rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-2 text-sm font-black text-[var(--muted-foreground)] transition hover:bg-[var(--surface-strong)]"
      >
        Çıkış
      </button>
    </div>
  );
}
