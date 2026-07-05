import type { Config } from "tailwindcss";

/**
 * Tailwind konfigürasyonu.
 * Tailwind v4 CSS-first çalışsa da bu dosya, ileride tema genişletmeleri ve content taraması için bilinçli olarak tutulur.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem"
      },
      boxShadow: {
        "history-glow": "0 32px 120px rgba(230, 184, 92, 0.22)"
      }
    }
  }
};

export default config;
