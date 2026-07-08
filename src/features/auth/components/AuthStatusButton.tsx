"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { LogIn, LogOut, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/cn";

export function AuthStatusButton({ compact = false, className }: { compact?: boolean; className?: string }) {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? "Profil";
  const initials = getInitials(displayName);

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
    if (supabase) await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (!ready) {
    return (
      <div className={cn("flex min-h-11 items-center gap-3 rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface)] px-3 shadow-[var(--sb-shadow-sm)]", compact && "justify-center px-0", className)}>
        <span className="size-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        {!compact ? <span className="h-3 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" /> : null}
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-blue-700/20 bg-blue-700/10 px-4 text-sm font-black text-[var(--sb-primary)] shadow-[var(--sb-shadow-sm)] transition hover:-translate-y-0.5 hover:bg-blue-700/15 hover:shadow-[var(--sb-shadow-md)]",
          compact && "size-11 px-0",
          className,
        )}
        aria-label="Giriş yap"
      >
        <LogIn size={18} />
        {!compact ? <span>Giriş Yap</span> : null}
      </Link>
    );
  }

  return (
    <div className={cn("flex items-center gap-2 rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface)] p-1.5 shadow-[var(--sb-shadow-sm)]", compact && "justify-center p-1", className)}>
      <Link href="/profile" className={cn("flex min-w-0 items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-black text-[var(--sb-text)] transition hover:bg-slate-900/[.04] dark:hover:bg-white/[.06]", compact && "px-1")}>
        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[var(--sb-primary)] text-xs font-black text-white">
          {initials || <UserRound size={16} />}
        </span>
        {!compact ? <span className="max-w-[128px] truncate">{displayName}</span> : null}
      </Link>
      {!compact ? (
        <button
          type="button"
          onClick={signOut}
          className="grid size-9 place-items-center rounded-xl text-[var(--sb-text-muted)] transition hover:bg-red-500/10 hover:text-red-600"
          aria-label="Çıkış yap"
        >
          <LogOut size={16} />
        </button>
      ) : null}
    </div>
  );
}

function getInitials(value: string) {
  return value
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase("tr-TR"))
    .join("");
}
