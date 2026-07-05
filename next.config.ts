import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "gsap",
      "@react-three/drei",
      "sonner"
    ]
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
