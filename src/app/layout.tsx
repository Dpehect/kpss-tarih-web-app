import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Providers } from "@/app/providers";
import "@/app/globals.css";
import "@/app/contrast-fixes.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Softbridge Akademi | Premium KPSS Tarih Çalışma Platformu",
    template: "%s | Softbridge Akademi"
  },
  description:
    "KPSS Tarih için konu özetleri, açıklamalı sorular, denemeler, flashcard tekrarları, timeline ve online ilerleme takibi.",
  keywords: [
    "KPSS Tarih",
    "KPSS tarih konu anlatımı",
    "KPSS tarih test",
    "KPSS tarih deneme",
    "KPSS tarih flashcard"
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title: "Softbridge Akademi",
    description: "Premium KPSS Tarih çalışma platformu.",
    siteName: "Softbridge Akademi"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f1e7" },
    { media: "(prefers-color-scheme: dark)", color: "#101828" }
  ],
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
