"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublishableKey, getSupabaseUrl, isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Browser Supabase client.
 * Env yoksa null döner; böylece Vercel prerender / _not-found build aşamasında çökmez.
 */
export function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  return createBrowserClient(getSupabaseUrl(), getSupabasePublishableKey());
}
