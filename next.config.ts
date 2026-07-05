import type { NextConfig } from "next";

/**
 * Next.js genel ayarları.
 * optimizePackageImports, sık kullanılan paketleri daha verimli import etmeye yardımcı olur.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "framer-motion", "@react-three/drei"]
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
