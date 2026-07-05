import type { Metadata, Viewport } from "next";
import { Providers } from "@/app/providers";
import "./globals.css";

/**
 * Root metadata SEO için kullanılır.
 * Her sayfa özelinde generateMetadata ile geliştirilebilir.
 */
export const metadata: Metadata = {
  title: {
    default: "KPSS Tarih Akademi",
    template: "%s | KPSS Tarih Akademi"
  },
  description:
    "KPSS Tarih sınavına hazırlanan öğrenciler için yaratıcı animasyonlara, WebGL sahnelere ve adaptif öğrenme altyapısına sahip premium web uygulaması.",
  keywords: ["KPSS", "Tarih", "Eğitim", "Soru Bankası", "Flashcard", "Timeline"],
  openGraph: {
    title: "KPSS Tarih Akademi",
    description: "Tarih çalışmayı görsel, dinamik ve akılda kalıcı hale getiren modern çalışma platformu.",
    type: "website",
    locale: "tr_TR"
  }
};

/**
 * Mobil cihazlarda doğru ölçekleme ve tema rengi için viewport ayarları.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#120b07"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
