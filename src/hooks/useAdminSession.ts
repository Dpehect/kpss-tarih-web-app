"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { isAdminEmail } from "@/lib/admin/admin-config";
import { createClient } from "@/lib/supabase/client";

export function useAdminSession() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));

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

    const { data } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  return {
    user,
    isLoading,
    isAdmin: isAdminEmail(user?.email)
  };
}
