"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export function useAdminSession() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    async function checkAdminStatus() {
      if (!supabase) return;
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!mounted) return;
        setUser(currentUser);

        if (currentUser?.email) {
          const res = await fetch("/api/admin/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: currentUser.email }),
          });
          const data = await res.json();
          if (mounted) {
            setIsAdmin(Boolean(data.isAdmin));
          }
        } else {
          if (mounted) setIsAdmin(false);
        }
      } catch (err) {
        console.error("Admin check failed", err);
        if (mounted) setIsAdmin(false);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    void checkAdminStatus();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      if (!sessionUser) {
        setIsAdmin(false);
        setIsLoading(false);
      } else {
        void checkAdminStatus();
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return {
    user,
    isLoading,
    isAdmin
  };
}
