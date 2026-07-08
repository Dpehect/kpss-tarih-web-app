"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { LogIn, LogOut, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/cn";

type AuthStatusButtonProps = {
  variant?: "header" | "sidebar" | "compact";
  className?: string;
};

export function AuthStatusButton({ variant = "header", className }: AuthStatusButtonProps) {
  const pathname = usePathname();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const nextPath = pathname && pathname !== "/login" ? pathname : "/dashboard";
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
    window.location.href = "/login";
  }

  const baseClass = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-black transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(4,126,137,.25)]",
    variant === "sidebar" && "w-full",
    variant === "compact" && "min-h-10 rounded-xl px-3 text-xs",
    className,
  );

  if (!ready) {
    return (
      <span
        className={cn(
          baseClass,
          "border border-[var(--bureau-line)] bg-[rgba(255,250,242,.78)] text-[var(--bureau-ink)] shadow-[var(--shadow-paper)]",
        )}
      >
        <UserRound size={16} /> Hesap
      </span>
    );
  }

  if (!user) {
    return (
      <Link
        href={`/login?next=${encodeURIComponent(nextPath)}`}
        className={cn(
          baseClass,
          "border border-[var(--bureau-ink)] bg-[var(--bureau-ink)] text-[var(--bureau-inverse)] shadow-[0_18px_54px_rgba(14,17,23,.16)] hover:-translate-y-0.5 hover:bg-[var(--bureau-ink-2)]",
        )}
        data-dark-button="true"
      >
        <LogIn size={16} /> Giriş Yap
      </Link>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", variant === "sidebar" && "w-full flex-col items-stretch")}>
      <Link
        href="/profile"
        className={cn(
          baseClass,
          "min-w-0 border border-[var(--bureau-line)] bg-[rgba(255,250,242,.82)] text-[var(--bureau-ink)] shadow-[var(--shadow-paper)] hover:-translate-y-0.5 hover:bg-[var(--bureau-bone-2)]",
        )}
      >
        <UserRound size={16} />
        <span className="max-w-[12rem] truncate">{displayName}</span>
      </Link>
      <button
        type="button"
        onClick={signOut}
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[rgba(158,63,63,.22)] bg-[rgba(158,63,63,.10)] px-4 text-sm font-black text-[var(--bureau-rust)] transition hover:bg-[rgba(158,63,63,.16)]",
          variant === "compact" && "min-h-10 rounded-xl px-3 text-xs",
          variant === "sidebar" && "w-full",
        )}
      >
        <LogOut size={16} /> Çıkış
      </button>
    </div>
  );
}
