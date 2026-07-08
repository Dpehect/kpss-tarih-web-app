import type { NextConfig } from "next";

/**
 * Production-first Next.js configuration.
 *
 * typedRoutes is intentionally disabled because this project generates several
 * dynamic href values from JSON/fallback data. With typedRoutes enabled, every
 * runtime string href must be narrowed to Next's Route type; otherwise Vercel
 * stops at TypeScript errors such as: string is not assignable to RouteImpl.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "framer-motion", "@react-three/drei"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
