import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
  isSupabaseConfigured
} from "@/lib/supabase/env";

const publicRoutes = new Set([
  "/",
  "/login",
  "/auth",
  "/auth/callback",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest"
]);

function isPublicRoute(pathname: string) {
  if (publicRoutes.has(pathname)) return true;
  if (pathname.startsWith("/auth/callback")) return true;
  if (pathname.startsWith("/api/auth")) return true;
  return false;
}

function createLoginRedirect(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  redirectUrl.pathname = "/login";
  redirectUrl.search = "";

  if (nextPath && nextPath !== "/") {
    redirectUrl.searchParams.set("next", nextPath);
  }

  return NextResponse.redirect(redirectUrl);
}

function createDashboardRedirect(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  const requestedNext = request.nextUrl.searchParams.get("next");

  redirectUrl.pathname = requestedNext && requestedNext.startsWith("/") ? requestedNext : "/dashboard";
  redirectUrl.search = "";

  return NextResponse.redirect(redirectUrl);
}

/**
 * Supabase SSR session middleware.
 *
 * Girişsiz kullanıcılar landing ve auth ekranları dışındaki app sayfalarına giremez.
 */
export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicRoute = isPublicRoute(pathname);

  if (!isSupabaseConfigured()) {
    if (publicRoute) {
      return NextResponse.next({ request });
    }

    return createLoginRedirect(request);
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        supabaseResponse = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user && !publicRoute) {
    return createLoginRedirect(request);
  }

  if (user && (pathname === "/login" || pathname === "/auth")) {
    return createDashboardRedirect(request);
  }

  return supabaseResponse;
}
