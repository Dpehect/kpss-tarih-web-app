import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "KPSS Tarih Akademi | Premium KPSS Tarih Çalışma Platformu",
    template: "%s | KPSS Tarih Akademi"
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
    title: "KPSS Tarih Akademi",
    description: "Premium KPSS Tarih çalışma platformu.",
    siteName: "KPSS Tarih Akademi"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8ea" },
    { media: "(prefers-color-scheme: dark)", color: "#050814" }
  ],
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
