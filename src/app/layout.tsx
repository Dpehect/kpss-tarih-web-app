import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "KPSS Tarih Akademi | Online KPSS Tarih Çalışma Platformu",
    template: "%s | KPSS Tarih Akademi"
  },
  description:
    "KPSS Tarih için konu özetleri, konu bazlı test sayfaları, açıklamalı sorular, denemeler, flashcard tekrarları, timeline ve online ilerleme takibi.",
  keywords: [
    "KPSS Tarih",
    "KPSS tarih konu anlatımı",
    "KPSS tarih test",
    "KPSS tarih soru bankası",
    "KPSS tarih deneme",
    "KPSS tarih flashcard",
    "KPSS online çalışma"
  ],
  authors: [{ name: "KPSS Tarih Akademi" }],
  creator: "KPSS Tarih Akademi",
  publisher: "KPSS Tarih Akademi",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "KPSS Tarih Akademi",
    title: "KPSS Tarih Akademi",
    description:
      "Konu bazlı test sayfaları, açıklamalı sorular, denemeler, flashcard tekrarları ve online ilerleme takibi.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KPSS Tarih Akademi"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "KPSS Tarih Akademi",
    description:
      "KPSS Tarih için modern çalışma platformu: konu özetleri, testler, denemeler ve online ilerleme.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
